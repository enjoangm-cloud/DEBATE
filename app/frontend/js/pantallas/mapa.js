// Mapa del pueblo: alojamiento, fincas, comercios, recogida y rutas (Google Maps en producción)
import { getPueblo, getLugares, getRutas } from '../../../backend/api.js';
import { t, esc, fuente, ICONO_LUGAR } from '../util.js';

const TIPOS = [
  ['alojamiento', 'Dónde dormir'], ['finca', 'Fincas'], ['comercio', 'Comercios'],
  ['recogida', 'Puntos de recogida'], ['servicio', 'Servicios'],
];

let mapa = null; // instancia de Leaflet (se recrea en cada visita)

// Texto del globo de cada lugar según su tipo
function popup(l) {
  let extra = '';
  if (l.tipo === 'alojamiento') extra = `<br>🛏️ <strong>${l.plazasLibres}</strong> ${esc(t('plazas_libres', 'plazas libres'))} de ${l.plazas}${l.precioNoche ? ` · ${l.precioNoche} €/noche` : ' · gratis'}<br><span>Cede: ${esc(l.cedidoPor || '')}</span>`;
  if (l.tipo === 'comercio') extra = `<br>🕐 Campaña: <strong>${esc(l.horarioCampana)}</strong>${l.ofertaTemporero ? `<br>🎁 ${esc(l.ofertaTemporero)}` : ''}`;
  if (l.tipo === 'recogida') extra = `<br>🚐 Salida: <strong>${esc(l.hora || '')}</strong>`;
  const ir = `https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`;
  return `<strong>${ICONO_LUGAR[l.tipo] || '📍'} ${esc(l.nombre)}</strong><br>${esc(l.descripcion || '')}${extra}
    <br><a href="${esc(ir)}" target="_blank" rel="noopener noreferrer">${esc(t('como_llegar', 'Cómo llegar'))} ↗</a>`;
}

export default {
  async html() {
    return `
      <h2>🗺️ ${esc(t('nav_mapa', 'Mapa del pueblo'))}</h2>
      <p class="muted">Todo lo que necesita un temporero al llegar, en un mapa. Toca un punto para ver detalles.</p>
      <div class="filtros" id="filtros">
        ${TIPOS.map(([k, n]) => `<label><input type="checkbox" value="${esc(k)}" checked> ${ICONO_LUGAR[k]} ${n}</label>`).join('')}
        <label><input type="checkbox" value="rutas" checked> 〰️ Rutas</label>
      </div>
      <div id="mapa-leaflet" role="region" aria-label="Mapa de Vila-rodona"></div>
      ${fuente('getLugares')} ${fuente('getRutas')}
      <div class="rejilla seccion" id="lista-rutas"></div>`;
  },

  async activar(raiz) {
    const [p, lugares, rutas] = await Promise.all([getPueblo(), getLugares(), getRutas()]);
    if (!window.L) { raiz.querySelector('#mapa-leaflet').textContent = 'No se pudo cargar el mapa (sin conexión).'; return; }

    if (mapa) { mapa.remove(); mapa = null; }
    mapa = L.map('mapa-leaflet').setView([p.lat, p.lng], p.zoom || 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap · prototipo (producción: Google Maps)',
    }).addTo(mapa);

    // Una capa por tipo de lugar para poder filtrarlas
    const capas = {};
    for (const [k] of TIPOS) capas[k] = L.layerGroup().addTo(mapa);
    for (const l of lugares) {
      const icono = L.divIcon({ className: '', html: `<div class="pin">${ICONO_LUGAR[l.tipo] || '📍'}</div>`, iconSize: [28, 28], iconAnchor: [14, 14] });
      L.marker([l.lat, l.lng], { icon: icono, title: l.nombre }).bindPopup(popup(l)).addTo(capas[l.tipo] || mapa);
    }
    capas.rutas = L.layerGroup().addTo(mapa);
    for (const r of rutas) {
      L.polyline(r.puntos, { color: /^#[0-9a-f]{3,8}$/i.test(r.color) ? r.color : '#1f5c99', weight: 5, opacity: .8, dashArray: r.tipo === 'cosechas' ? '8 8' : null })
        .bindPopup(`<strong>${esc(r.nombre)}</strong><br>${esc(r.descripcion)}`).addTo(capas.rutas);
    }

    raiz.querySelectorAll('#filtros input').forEach(cb => cb.onchange = () => {
      const capa = capas[cb.value];
      if (!capa) return;
      cb.checked ? capa.addTo(mapa) : mapa.removeLayer(capa);
    });

    raiz.querySelector('#lista-rutas').innerHTML = rutas.map(r => `
      <div class="tarjeta"><h3><span style="color:${esc(r.color)}">〰️</span> ${esc(r.nombre)}</h3>
      <span class="etiqueta">${esc(r.tipo)}</span><p>${esc(r.descripcion)}</p></div>`).join('');

    setTimeout(() => mapa?.invalidateSize(), 100);
  },
};
