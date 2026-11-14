// Utilidades compartidas por todas las pantallas
import { FUENTES } from '../../backend/api.js';

// Estado de la interfaz (idioma, textos traducidos, rol elegido)
export const estado = { idioma: 'es', textos: {}, rol: null, pueblo: 'red' };

// Filtro de pueblo para el backend: 'red' = toda la red (undefined)
export const filtroPueblo = () => (estado.pueblo === 'red' ? undefined : estado.pueblo);

// Solo colores hexadecimales (evita inyectar CSS desde los datos)
export const colorSeguro = (c, porDefecto = '#3f6b2a') => (/^#[0-9a-f]{3,8}$/i.test(c || '') ? c : porDefecto);

// Traduce una clave de interfaz; si no existe, usa el texto por defecto
export const t = (clave, porDefecto = clave) => estado.textos[clave] || porDefecto;

// Escapa texto para meterlo en HTML sin riesgos
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Etiqueta "Datos simulados · Google X" para cada bloque
export const fuente = (nombreFuncion) =>
  FUENTES?.[nombreFuncion] ? `<span class="fuente">🧪 ${esc(FUENTES[nombreFuncion])}</span>` : '';

// Fechas en castellano
const opcionesCortas = { day: 'numeric', month: 'short' };
export const fechaCorta = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('es-ES', opcionesCortas);
export const diaSemana = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short' });
export const fechaLarga = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export const euros = (n) => Number(n).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

// Iconos por tipo de cielo y de lugar
export const ICONO_CIELO = { sol: '☀️', nubes: '⛅', lluvia: '🌧️', tormenta: '⛈️', niebla: '🌫️' };
export const ICONO_LUGAR = { alojamiento: '🛏️', empleador: '🏷️', finca: '🌳', comercio: '🛒', recogida: '🚐', servicio: 'ℹ️', patrimonio: '🏛️' };

// Aviso flotante breve
export function aviso(texto) {
  const d = document.createElement('div');
  d.className = 'toast'; d.textContent = texto;
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 3200);
}

// Busca un elemento por id en una lista
export const porId = (lista, id) => lista.find(x => x.id === id);

// Nombre de un pueblo a partir de su id
export const nombrePueblo = (pueblos, id) =>
  id === 'red' ? t('red', 'Toda la red') : (pueblos.find(p => p.id === id)?.nombre || id || '');

// Etiqueta de sector con su emoji
export const etiquetaSector = (sectores, id) => {
  const s = sectores.find(x => x.id === id);
  return s ? `<span class="etiqueta">${esc(s.emoji)} ${esc(t('sector_' + id, s.nombre))}</span>` : '';
};
