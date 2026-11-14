// Utilidades compartidas por todas las pantallas
import { FUENTES } from '../../backend/api.js';

// Estado de la interfaz (idioma, textos traducidos, rol elegido)
export const estado = { idioma: 'es', textos: {}, rol: null };

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
export const ICONO_LUGAR = { alojamiento: '🛏️', finca: '🌳', comercio: '🛒', recogida: '🚐', servicio: 'ℹ️' };

// Aviso flotante breve
export function aviso(texto) {
  const d = document.createElement('div');
  d.className = 'toast'; d.textContent = texto;
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 3200);
}

// Busca un elemento por id en una lista
export const porId = (lista, id) => lista.find(x => x.id === id);
