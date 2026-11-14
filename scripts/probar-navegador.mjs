// Prueba "de navegador": carga index.html en jsdom, arranca la app y pulsa los botones de cada pantalla.
// Uso: NODE_PATH=<carpeta con jsdom>/node_modules node scripts/probar-navegador.mjs
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const require = createRequire(process.env.NODE_PATH ? process.env.NODE_PATH + '/' : import.meta.url);
const { JSDOM } = require('jsdom');

const raiz = fileURLToPath(new URL('../app/', import.meta.url));
const html = readFileSync(raiz + 'index.html', 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
const dom = new JSDOM(html, { url: 'https://demo.local/', pretendToBeVisual: true });
const { window } = dom;
// Exponer lo que usa la app como globales de Node
for (const k of ['window', 'document', 'location', 'localStorage', 'HTMLElement', 'FormData', 'CSS', 'Event']) {
  globalThis[k] = k === 'window' ? window : window[k];
}
globalThis.CSS ??= { escape: (s) => String(s).replace(/["\\]/g, '\\$&') };
globalThis.addEventListener = window.addEventListener.bind(window);
const errores = [];
process.on('unhandledRejection', (e) => errores.push('Promesa: ' + e.message));
const espera = (ms) => new Promise(r => setTimeout(r, ms));
const vista = () => document.getElementById('vista');
const ir = async (h) => { window.location.hash = h; window.dispatchEvent(new window.HashChangeEvent('hashchange')); await espera(1200); };
const revisar = (nombre) => {
  const txt = vista().innerHTML;
  const malos = txt.match(/undefined|NaN|\[object Object\]|Invalid Date|Error al cargar/g);
  if (malos) errores.push(`${nombre}: ${[...new Set(malos)].join(', ')}`);
  if (txt.includes('Cargando…') && txt.length < 60) errores.push(`${nombre}: se quedó cargando`);
};
const clic = async (sel, nombre) => {
  const b = vista().querySelector(sel);
  if (!b) { errores.push(`${nombre}: no encuentro ${sel}`); return false; }
  b.click(); await espera(1200); revisar(nombre); return true;
};
const toast = () => [...document.querySelectorAll('.toast')].map(t => t.textContent).pop() || '';

await import(raiz + 'frontend/js/main.js');
await espera(1500);
revisar('inicio');

// Recorrido por todas las pantallas en "toda la red" y en cada pueblo
const sel = document.getElementById('sel-pueblo');
const pueblos = [...sel.options].map(o => o.value);
for (const p of pueblos) {
  sel.value = p; sel.dispatchEvent(new window.Event('change')); await espera(900);
  for (const h of ['inicio', 'espana', 'jovenes', 'calendario', 'mapa', 'trabajo', 'red', 'turismo', 'pueblo', 'tramites']) { await ir(h); revisar(`${p}/${h}`); }
}
sel.value = 'red'; sel.dispatchEvent(new window.Event('change')); await espera(900);

// Acciones
await ir('trabajo');
await clic('[data-sector="turismo"]', 'filtro turismo');
await clic('[data-sector="todos"]', 'filtro todos');
await clic('button[data-oferta]:not([disabled])', 'solicitar oferta'); console.log('  solicitar →', toast());
await ir('pueblo');
await clic('[data-alquilar]', 'alquilar vivienda'); console.log('  alquilar →', toast());
await clic('[data-verificar]', 'verificar vivienda'); console.log('  verificar →', toast());
await clic('[data-emp][data-dec="aprobado"]', 'aprobar emparejamiento'); console.log('  aprobar →', toast());
await ir('red');
await clic('[data-ayuda]', 'aceptar ayuda'); console.log('  ayuda →', toast());
await ir('turismo');
const fExp = vista().querySelector('form[data-exp] button:not([disabled])')?.closest('form');
if (fExp) { fExp.dispatchEvent(new window.Event('submit', { cancelable: true })); await espera(1200); console.log('  experiencia →', toast()); } else errores.push('turismo: sin experiencia reservable');
const fCompra = vista().querySelector('form[data-empleador]');
if (fCompra) { fCompra.querySelector('input[type=number]').value = '1'; fCompra.dispatchEvent(new window.Event('submit', { cancelable: true })); await espera(1200); console.log('  compra →', toast()); } else errores.push('turismo: sin compra directa');

await ir('jovenes');
const test = vista().querySelector('#test');
if (test) {
  test.querySelectorAll('fieldset').forEach(fs => { const r = fs.querySelectorAll('input[type=radio]'); r[r.length - 1].checked = true; });
  test.dispatchEvent(new window.Event('submit', { cancelable: true })); await espera(1200); revisar('test jóvenes');
  console.log('  test jóvenes →', vista().querySelector('.ia')?.textContent?.slice(0, 80) || 'SIN RESULTADO');
  if (!vista().querySelector('.ia')) errores.push('test jóvenes: sin recomendación');
} else errores.push('jóvenes: no encuentro el test');
const fOp = vista().querySelector('form[data-op] button:not([disabled])')?.closest('form');
if (fOp) { fOp.elements.nombre.value = 'Laia'; fOp.dispatchEvent(new window.Event('submit', { cancelable: true })); await espera(1200); console.log('  apuntarse →', toast()); }
else errores.push('jóvenes: sin oportunidad para apuntarse');

// Idiomas (árabe = derecha a izquierda)
const selI = document.getElementById('sel-idioma');
for (const code of [...selI.options].map(o => o.value)) {
  selI.value = code; selI.dispatchEvent(new window.Event('change')); await espera(900); revisar('idioma ' + code);
}
console.log('  dir en árabe:', (selI.value = 'ar', selI.dispatchEvent(new window.Event('change')), await espera(900), document.documentElement.dir));

// Tamaño de texto
document.getElementById('txt-mas').click();
console.log('  tamaño texto:', document.documentElement.style.getPropertyValue('--tam'));

console.log(errores.length ? '❌ ERRORES:\n - ' + errores.join('\n - ') : '✅ NAVEGADOR OK');
process.exit(errores.length ? 1 : 0);
