// España: una plataforma, muchas redes. Arquetipos, mapa nacional y corredor de temporadas de 12 meses
import { getEspana, getCorredor } from '../../../backend/api.js';
import { t, esc, fuente, colorSeguro } from '../util.js';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
let mapa = null;

// Meses que ocupa un tramo (admite tramos que cruzan el año, p. ej. dic → abr)
const mesesDe = (ini, fin) => {
  const out = []; let m = ini;
  for (let i = 0; i < 12; i++) { out.push(m); if (m === fin) break; m = m % 12 + 1; }
  return out;
};
const rango = (ini, fin) => `${MESES[ini - 1]}–${MESES[fin - 1]}`;

export default {
  async html() {
    const [es, corredor] = await Promise.all([getEspana(), getCorredor()]);
    const arq = (id) => es.arquetipos.find(a => a.id === id) || {};
    const red = (id) => es.redes.find(r => r.id === id) || {};
    // Para la tira del corredor: qué tramo ocupa cada mes, empezando en el primer mes del corredor
    const orden = corredor.tramos.length ? mesesDe(corredor.tramos[0].mesInicio, ((corredor.tramos[0].mesInicio + 10) % 12) + 1) : [];
    const tramoDe = (m) => corredor.tramos.find(tr => mesesDe(tr.mesInicio, tr.mesFin).includes(m));

    return `
      <section class="hero">
        <h2>🇪🇸 ${esc(t('nav_espana', 'España'))}: una plataforma, muchas redes</h2>
        <p style="font-size:1.15rem">En España hay <strong>${es.municipiosPequenos.toLocaleString('es-ES')}</strong> municipios de menos de 5.000 habitantes:
        el <strong>${esc(String(es.pctMunicipios).replace('.', ','))} %</strong> de todos, donde vive solo el <strong>${esc(es.pctPoblacion)} %</strong> de la población.</p>
        <p>La red del Gaià es el ejemplo completo. Cualquier comarca puede crear la suya con la misma app: cambian los cultivos,
        los oficios y el calendario, pero las reglas son las mismas:</p>
        <ul class="pasos">
          <li>🏠 La vivienda la pone quien contrata.</li>
          <li>🤝 Los pueblos se juntan en red y comparten dinamizador.</li>
          <li>🔁 Se encadenan temporadas para que haya trabajo todo el año.</li>
        </ul>
        <p class="muted">Fuente: ${esc(es.fuente)}</p>
      </section>

      <h2>🧩 Cinco tipos de red</h2>
      <div class="rejilla">
        ${es.arquetipos.map(a => `
          <article class="tarjeta" style="border-top:6px solid ${colorSeguro(a.color)}">
            <h3>${esc(a.emoji)} ${esc(a.nombre)}</h3>
            <div>${a.sectores.map(s => `<span class="etiqueta gris">${esc(s)}</span>`).join('')}</div>
            <p><strong>Problema:</strong> ${esc(a.problema)}</p>
            <p><strong>Cómo ayuda:</strong> ${esc(a.comoAyuda)}</p>
            <p class="muted">Ejemplo: ${esc(red(a.ejemploRedId).nombre || '')}</p>
          </article>`).join('')}
      </div>

      <h2 class="seccion">🗺️ Redes en España</h2>
      <div id="mapa-espana" class="mapa-espana" role="region" aria-label="Mapa de redes en España"></div>
      <div class="rejilla seccion">
        ${es.redes.map(r => `
          <article class="tarjeta ${r.esDemo ? 'destacada' : ''}">
            <h3>${esc(arq(r.arquetipoId).emoji || '📍')} ${esc(r.nombre)}</h3>
            <p class="muted">${esc(r.provincia)} · ${esc(r.comunidad)}${r.esDemo ? ' · <strong>demo completa</strong>' : ''}</p>
            <p>${esc(r.destacado)}</p>
            <ul class="pasos">${r.temporadas.map(tp => `<li><strong>${rango(tp.mesInicio, tp.mesFin)}</strong>: ${esc(tp.texto)}</li>`).join('')}</ul>
            ${r.esDemo ? '<a class="btn" href="#red">Ver la red del Gaià →</a>' : ''}
          </article>`).join('')}
      </div>
      ${fuente('getEspana')}

      <h2 class="seccion">🔁 ${esc(t('corredor', 'Corredor de temporadas'))}</h2>
      <p>${esc(corredor.titulo)} · ${esc(corredor.persona)}</p>
      <div class="corredor" role="img" aria-label="12 meses de trabajo encadenado entre redes">
        ${orden.map(m => { const tr = tramoDe(m); const a = arq(red(tr?.redId).arquetipoId);
          return `<div class="corredor-mes" style="background:${colorSeguro(a.color, '#ccc')}" title="${esc(red(tr?.redId).nombre || '')}">
            <span>${MESES[m - 1]}</span><span>${esc(a.emoji || '')}</span></div>`; }).join('')}
      </div>
      <ul class="camino" style="margin-top:1rem">
        ${corredor.tramos.map(tr => `<li><strong>${rango(tr.mesInicio, tr.mesFin)}</strong> · ${esc(red(tr.redId).nombre || '')} · ${esc(tr.sector)}<br>
          <span class="muted">${esc(tr.tarea)} · Vivienda: ${esc(tr.viviendaDe)}</span></li>`).join('')}
      </ul>
      <p class="muted">${esc(corredor.nota)}</p>
      ${fuente('getCorredor')}

      <h2 class="seccion">➕ Cómo crear una red en tu comarca</h2>
      <div class="tarjeta"><ol class="pasos">${es.comoCrearRed.map(p => `<li>${esc(p)}</li>`).join('')}</ol></div>`;
  },

  async activar(raiz) {
    const es = await getEspana();
    if (!window.L) { raiz.querySelector('#mapa-espana').textContent = 'No se pudo cargar el mapa.'; return; }
    if (mapa) { mapa.remove(); mapa = null; }
    mapa = L.map('mapa-espana', { scrollWheelZoom: false }).setView([40.2, -3.6], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 12, attribution: '© OpenStreetMap · prototipo (producción: Google Maps)',
    }).addTo(mapa);
    for (const r of es.redes) {
      const a = es.arquetipos.find(x => x.id === r.arquetipoId) || {};
      L.circleMarker([r.lat, r.lng], { radius: r.esDemo ? 14 : 10, color: '#fff', weight: 2, fillColor: colorSeguro(a.color), fillOpacity: .9 })
        .bindPopup(`<strong>${esc(a.emoji || '')} ${esc(r.nombre)}</strong><br>${esc(r.provincia)}<br>${esc(r.destacado)}`)
        .bindTooltip(esc(r.nombre), { permanent: true, direction: 'right', className: 'etiqueta-red' })
        .addTo(mapa);
    }
    setTimeout(() => mapa?.invalidateSize(), 100);
  },
};
