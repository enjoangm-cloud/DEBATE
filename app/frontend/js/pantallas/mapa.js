// Mapa de la red: viviendas de empleadores, empleadores, comercios, recogida, patrimonio y rutas
import { getRed, getLugares, getRutas, getPueblo } from '../../../backend/api.js';
import { t, esc, fuente, ICONO_LUGAR, euros, filtroPueblo, nombrePueblo, colorSeguro } from '../util.js';

const TIPOS = [
  ['alojamiento', 'Viviendas de empleadores'], ['empleador', 'Empleadores'], ['comercio', 'Comercios'],
  ['recogida', 'Puntos de recogida'], ['servicio', 'Servicios'], ['patrimonio', 'Patrimonio'],
];

let mapa = null; // instancia de Leaflet (se recrea en cada visita)

// Texto del globo de cada lugar según su tipo
function popup(l, pueblos) {
  let extra = `<br><span>📍 ${esc(nombrePueblo(pueblos, l.puebloId))}</span>`;
  if (l.tipo === 'alojamiento') extra += `<br>🛏️ <strong>${esc(l.plazasLibres)}</strong> ${esc(t('plazas_libres', 'plazas libres'))} de ${esc(l.plazas)}
    <br>${l.verificado ? '✅ ' + esc(t('verificado', 'Verificada')) : '⏳ ' + esc(t('pendiente_verificar', 'Pendiente de verificar'))}
    · ${esc(t('coste_temporero', 'Coste temporero'))}: ${euros(l.costeTemporero ?? 0)}`;
  if (l.tipo === 'comercio') extra += `<br>🕐 Temporada: <strong>${esc(l.horarioCampana)}</strong>${l.ofertaTemporero ? `<br>🎁 ${esc(l.ofertaTemporero)}` : ''}`;
  if (l.tipo === 'recogida') extra += `<br>🚐 Salida: <strong>${esc(l.hora || '')}</strong>`;
  const lat = Number(l.lat), lng = Number(l.lng);
  const ir = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  return `<strong>${ICONO_LUGAR[l.tipo] || '📍'} ${esc(l.nombre)}</strong><br>${esc(l.descripcion || '')}${extra}
    <br><a href="${esc(ir)}" target="_blank" rel="noopener noreferrer">${esc(t('como_llegar', 'Cómo llegar'))} ↗</a>`;
}

export default {
  async html() {
    return `
      <h2>🗺️ ${esc(t('nav_mapa', 'Mapa'))}</h2>
      <p class="muted">Todo lo que necesita quien llega a trabajar: dónde vivirá, dónde trabaja, cómo llega y qué hay cerca.</p>
      <div class="filtros" id="filtros">
        ${TIPOS.map(([k, n]) => `<label><input type="checkbox" value="${esc(k)}" checked> ${ICONO_LUGAR[k]} ${esc(n)}</label>`).join('')}
        <label><input type="checkbox" value="rutas" checked> 〰️ Rutas</label>
      </div>
      <div id="mapa-leaflet" role="region" aria-label="Mapa de la red de pueblos"></div>
      ${fuente('getLugares')} ${fuente('getRutas')}
      <div class="rejilla seccion" id="lista-rutas"></div>`;
  },

  async activar(raiz) {
    const fp = filtroPueblo();
    const [red, lugares, rutas] = await Promise.all([getRed(), getLugares({ puebloId: fp }), getRutas(fp)]);
    const centro = fp ? await getPueblo(fp) : red.centro;
    if (!window.L) { raiz.querySelector('#mapa-leaflet').textContent = 'No se pudo cargar el mapa.'; return; }

    if (mapa) { mapa.remove(); mapa = null; }
    mapa = L.map('mapa-leaflet').setView([centro.lat, centro.lng], centro.zoom || (fp ? 14 : 12));
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap · prototipo (producción: Google Maps)',
    }).addTo(mapa);

    // Nombre de cada pueblo sobre el mapa
    for (const p of red.pueblos) {
      if (fp && p.id !== fp) continue;
      L.marker([p.lat, p.lng], { icon: L.divIcon({ className: '', html: `<div class="pin-pueblo">${esc(p.nombre)}</div>`, iconSize: null }), interactive: false }).addTo(mapa);
    }

    // Una capa por tipo de lugar para poder filtrarlas
    const capas = {};
    for (const [k] of TIPOS) capas[k] = L.layerGroup().addTo(mapa);
    for (const l of lugares) {
      const icono = L.divIcon({ className: '', html: `<div class="pin">${ICONO_LUGAR[l.tipo] || '📍'}</div>`, iconSize: [28, 28], iconAnchor: [14, 14] });
      L.marker([l.lat, l.lng], { icon: icono, title: l.nombre }).bindPopup(popup(l, red.pueblos)).addTo(capas[l.tipo] || mapa);
    }
    capas.rutas = L.layerGroup().addTo(mapa);
    for (const r of rutas) {
      L.polyline(r.puntos, { color: colorSeguro(r.color, '#1f5c99'), weight: 5, opacity: .8, dashArray: r.tipo === 'cosechas' ? '8 8' : null })
        .bindPopup(`<strong>${esc(r.nombre)}</strong><br>${esc(r.descripcion)}`).addTo(capas.rutas);
    }

    raiz.querySelectorAll('#filtros input').forEach(cb => cb.onchange = () => {
      const capa = capas[cb.value];
      if (!capa) return;
      cb.checked ? capa.addTo(mapa) : mapa.removeLayer(capa);
    });

    raiz.querySelector('#lista-rutas').innerHTML = rutas.map(r => `
      <div class="tarjeta"><h3><span style="color:${colorSeguro(r.color, '#1f5c99')}">〰️</span> ${esc(r.nombre)}</h3>
      <span class="etiqueta">${esc(r.tipo)}</span><p>${esc(r.descripcion)}</p></div>`).join('');

    setTimeout(() => mapa?.invalidateSize(), 100);
  },
};
