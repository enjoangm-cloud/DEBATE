// Arranque de la app: idioma, tamaño de texto y navegación entre pantallas
import { HOY, getIdiomas, getTextos } from '../../backend/api.js';
import { estado, fechaLarga } from './util.js';
import inicio from './pantallas/inicio.js';
import calendario from './pantallas/calendario.js';
import mapa from './pantallas/mapa.js';
import trabajo from './pantallas/trabajo.js';
import pueblo from './pantallas/pueblo.js';
import comprar from './pantallas/comprar.js';
import tramites from './pantallas/tramites.js';

const PANTALLAS = { inicio, calendario, mapa, trabajo, pueblo, comprar, tramites };
const vista = document.getElementById('vista');

// --- Preferencias guardadas en el navegador (si se puede) ---
const leer = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } };

// --- Tamaño del texto (A− / A+) ---
let tam = Number(leer('tam', 18));
const aplicarTam = () => { document.documentElement.style.setProperty('--tam', tam + 'px'); guardar('tam', tam); };
document.getElementById('txt-menos').onclick = () => { tam = Math.max(14, tam - 2); aplicarTam(); };
document.getElementById('txt-mas').onclick = () => { tam = Math.min(30, tam + 2); aplicarTam(); };
aplicarTam();

// --- Idioma (traducción simulada con Vertex AI) ---
const selIdioma = document.getElementById('sel-idioma');
let idiomas = [];
async function cambiarIdioma(codigo) {
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
  pintar();
}
selIdioma.onchange = () => cambiarIdioma(selIdioma.value);

// --- Navegación por #hash ---
let pintando = 0;
async function pintar() {
  const nombre = (location.hash.slice(1) || 'inicio');
  const pantalla = PANTALLAS[nombre] || inicio;
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
    vista.innerHTML = `<div class="tarjeta">⚠️ Error al cargar esta pantalla: ${e.message}</div>`;
  }
}
window.addEventListener('hashchange', () => { pintar(); vista.focus(); });

// --- Inicio ---
(async () => {
  document.getElementById('fecha-hoy').textContent = fechaLarga(HOY);
  idiomas = await getIdiomas();
  selIdioma.innerHTML = idiomas.map(i => `<option value="${i.codigo}">${i.nombre}</option>`).join('');
  const inicial = leer('idioma', 'es');
  selIdioma.value = idiomas.some(i => i.codigo === inicial) ? inicial : 'es';
  await cambiarIdioma(selIdioma.value);
})();
