// Arranque de la app: idioma, tamaño de texto y navegación entre pantallas
import { HOY, getIdiomas, getTextos, getPueblos } from '../../backend/api.js';
import { estado, fechaLarga, esc } from './util.js';
import inicio from './pantallas/inicio.js';
import calendario from './pantallas/calendario.js';
import mapa from './pantallas/mapa.js';
import trabajo from './pantallas/trabajo.js';
import pueblo from './pantallas/pueblo.js';
import red from './pantallas/red.js';
import turismo from './pantallas/turismo.js';
import espana from './pantallas/espana.js';
import jovenes from './pantallas/jovenes.js';
import tramites from './pantallas/tramites.js';

const PANTALLAS = { inicio, espana, jovenes, calendario, mapa, trabajo, red, turismo, pueblo, tramites, comprar: turismo }; // 'comprar' = enlace antiguo
const vista = document.getElementById('vista');

// --- Preferencias guardadas en el navegador (si se puede) ---
const leer = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } };

// --- Tamaño del texto (A− / A+) ---
let tam = Number(leer('tam', 18));
if (!Number.isFinite(tam) || tam < 14 || tam > 30) tam = 18; // ignora valores manipulados
const aplicarTam = () => { document.documentElement.style.setProperty('--tam', tam + 'px'); guardar('tam', tam); };
document.getElementById('txt-menos').onclick = () => { tam = Math.max(14, tam - 2); aplicarTam(); };
document.getElementById('txt-mas').onclick = () => { tam = Math.min(30, tam + 2); aplicarTam(); };
aplicarTam();

// --- Idioma (traducción simulada con Vertex AI) ---
const selIdioma = document.getElementById('sel-idioma');
let idiomas = [];
async function cambiarIdioma(codigo) {
  if (!idiomas.some(i => i.codigo === codigo)) codigo = 'es'; // solo idiomas de la lista
  estado.idioma = codigo;
  estado.textos = await getTextos(codigo);
  const info = idiomas.find(i => i.codigo === codigo);
  document.documentElement.lang = codigo;
  document.documentElement.dir = info?.dir || 'ltr';
  // Textos fijos de la cabecera y el menú
  document.querySelectorAll('[data-t]').forEach(el => {
    const k = el.dataset.t;
    if (estado.textos[k]) el.textContent = estado.textos[k];
  });
  guardar('idioma', codigo);
  if (pueblos.length) rellenarPueblos(); // traduce 'Toda la red'
  pintar();
}
selIdioma.onchange = () => cambiarIdioma(selIdioma.value);

// --- Pueblo seleccionado ('red' = los 5 pueblos) ---
const selPueblo = document.getElementById('sel-pueblo');
let pueblos = [];
selPueblo.onchange = () => {
  estado.pueblo = (selPueblo.value === 'red' || pueblos.some(p => p.id === selPueblo.value)) ? selPueblo.value : 'red';
  guardar('pueblo', estado.pueblo);
  pintar();
};
function rellenarPueblos() {
  selPueblo.innerHTML = `<option value="red">${esc(estado.textos.red || 'Toda la red')}</option>` +
    pueblos.map(p => `<option value="${esc(p.id)}">${esc(p.nombre)}</option>`).join('');
  selPueblo.value = estado.pueblo;
}

// --- Navegación por #hash ---
let pintando = 0;
async function pintar() {
  const nombre = (location.hash.slice(1) || 'inicio');
  const pantalla = Object.hasOwn(PANTALLAS, nombre) ? PANTALLAS[nombre] : inicio; // nunca usa nombres desconocidos
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('activo', a.getAttribute('href') === '#' + nombre));
  const turno = ++pintando;
  vista.innerHTML = '<p class="cargando">Cargando…</p>';
  try {
    const html = await pantalla.html();
    if (turno !== pintando) return;          // el usuario ya cambió de pantalla
    vista.innerHTML = html;
    await pantalla.activar?.(vista, pintar); // eventos de la pantalla
  } catch (e) {
    console.error(e);
    vista.innerHTML = `<div class="tarjeta">⚠️ Error al cargar esta pantalla: ${esc(e.message)}</div>`;
  }
}
window.addEventListener('hashchange', () => { pintar(); vista.focus(); });

// --- Inicio ---
(async () => {
  document.getElementById('fecha-hoy').textContent = fechaLarga(HOY);
  [idiomas, pueblos] = await Promise.all([getIdiomas(), getPueblos()]);
  const pGuardado = leer('pueblo', 'red');
  estado.pueblo = (pGuardado === 'red' || pueblos.some(p => p.id === pGuardado)) ? pGuardado : 'red';
  rellenarPueblos();
  selIdioma.innerHTML = idiomas.map(i => `<option value="${esc(i.codigo)}">${esc(i.nombre)}</option>`).join('');
  const inicial = leer('idioma', 'es');
  selIdioma.value = idiomas.some(i => i.codigo === inicial) ? inicial : 'es';
  await cambiarIdioma(selIdioma.value);
})();
