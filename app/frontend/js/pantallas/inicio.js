// Inicio: qué es la red, quién la usa y cómo está la temporada hoy
import { getRed, getIndicadores, getAlertas, getSectores, getPueblos, getCalendario, getRutas, getPueblo } from '../../../backend/api.js';
import { lineaTiempo } from './calendario.js';
import { t, esc, estado, fuente, filtroPueblo, nombrePueblo, colorSeguro } from '../util.js';

let mapa = null; // mapa de la vista rápida (solo en el móvil)

// Rol → pantalla a la que lleva
const ROLES = [
  { id: 'temporero',   nombre: 'Temporero',   ico: '🧑‍🌾', destino: 'trabajo', texto: 'Busco trabajo todo el año, con casa y transporte' },
  { id: 'agricultor',  nombre: 'Empleador',   ico: '🚜',  destino: 'pueblo',  texto: 'Contrato gente y les busco vivienda' },
  { id: 'dinamizador', nombre: 'Dinamizador', ico: '🏛️', destino: 'red',     texto: 'Coordino la red de pueblos' },
  { id: 'comprador',   nombre: 'Visitante',   ico: '🧺',  destino: 'turismo', texto: 'Quiero visitar, vivir la cosecha y comprar directo' },
  { id: 'joven',       nombre: 'Joven',       ico: '🧑‍🎓', destino: 'jovenes', texto: 'Quiero probar a vivir y trabajar en un pueblo' },
];

export default {
  async html() {
    const [red, ind, alertas, sectores, pueblos, cal] = await Promise.all([
      getRed(), getIndicadores(filtroPueblo()), getAlertas(filtroPueblo()), getSectores(), getPueblos(), getCalendario(filtroPueblo())]);
    const total = red.pueblos.reduce((s, p) => s + p.habitantes, 0);
    const alerta = alertas[0];
    const ambito = estado.pueblo === 'red' ? 'toda la red' : nombrePueblo(red.pueblos, estado.pueblo);

    return `
      <section class="vista-rapida" aria-label="La red de un vistazo">
        <h2>📍 ${esc(red.nombre)}</h2>
        <div id="mapa-inicio" class="mapa-inicio" role="region" aria-label="Mapa de la red de pueblos"></div>
        <h3 class="seccion-mini">📅 ${esc(t('nav_calendario', 'Calendario'))} · ${esc(t('hoy', 'Hoy'))}</h3>
        ${lineaTiempo(cal, pueblos, estado.pueblo === 'red')}
        <p><a href="#calendario">${esc(t('nav_calendario', 'Calendario'))} →</a> · <a href="#mapa">${esc(t('nav_mapa', 'Mapa'))} →</a></p>
      </section>

      <section class="hero">
        <h2>${esc(red.nombre)}</h2>
        <p style="font-size:1.15rem">${red.pueblos.length} pueblos del Alt Camp
        (${total.toLocaleString('es-ES')} habitantes en total) que se unen para ofrecer
        <strong>trabajo de temporada todo el año</strong>: campo, turismo rural, hostelería, bodega y bosque.</p>
        <div class="fila">${red.pueblos.map(p => `<span class="etiqueta">📍 ${esc(p.nombre)} · ${p.habitantes.toLocaleString('es-ES')} hab.</span>`).join('')}</div>
        <div class="fila" style="margin-top:.4rem">${sectores.map(s => `<span class="etiqueta gris">${esc(s.emoji)} ${esc(t('sector_' + s.id, s.nombre))}</span>`).join('')}</div>
        <p class="muted" style="margin-top:.8rem">🏠 <strong>La vivienda la pone quien contrata.</strong> El ayuntamiento la verifica. El temporero no paga nada.</p>
        <p class="muted">🤝 La app ayuda; <strong>decide una persona</strong>: ${esc(red.dinamizador.nombre)} · ${esc(red.dinamizador.telefono)}</p>
        <div class="fila" style="margin-top:.8rem">
          <a class="btn" href="#espana">🇪🇸 Llevarlo a toda España</a>
          <a class="btn sec" href="#jovenes">🧑‍🎓 Soy joven y quiero probar</a>
        </div>
      </section>

      ${alerta ? `
      <section class="tarjeta alerta ${esc(alerta.nivel)}" style="margin-bottom:1.25rem">
        <strong>⚠️ ${esc(t('aviso_tiempo', 'Aviso del tiempo'))}${alerta.puebloId ? ' · ' + esc(nombrePueblo(red.pueblos, alerta.puebloId)) : ''}</strong>
        <div class="ia">${esc(alerta.mensajeSencillo)}</div>
        <a href="#calendario">${esc(t('nav_calendario', 'Calendario'))} →</a>
      </section>` : ''}

      <section class="seccion">
        <h2>¿Quién eres?</h2>
        <div class="roles">
          ${ROLES.map(r => `
            <button class="rol ${estado.rol === r.id ? 'activo' : ''}" data-rol="${esc(r.id)}" data-destino="${esc(r.destino)}">
              <span class="ico">${r.ico}</span>
              <strong>${esc(t('rol_' + r.id, r.nombre))}</strong>
              <span class="muted">${esc(r.texto)}</span>
            </button>`).join('')}
        </div>
      </section>

      <section class="seccion">
        <h2>Así está ${esc(ambito)} hoy</h2>
        <div class="rejilla">
          <div class="tarjeta"><div class="cifra">${ind.ofertasAbiertas}</div>ofertas abiertas en ${ind.sectoresActivos} sectores</div>
          <div class="tarjeta"><div class="cifra">${ind.ofertasConAlojamientoPct} %</div>de las ofertas incluyen vivienda del empleador</div>
          <div class="tarjeta"><div class="cifra">${Number(ind.mesesTrabajoMedio).toLocaleString('es-ES')}</div>meses de trabajo encadenado por temporero</div>
          <div class="tarjeta"><div class="cifra">${ind.temporerosConContrato}</div>temporeros con contrato</div>
        </div>
        ${fuente('getIndicadores')}
      </section>`;
  },

  async activar(raiz) {
    raiz.querySelectorAll('[data-rol]').forEach(b => b.onclick = () => {
      estado.rol = b.dataset.rol;
      location.hash = b.dataset.destino;
    });
    // Mapa de la vista rápida: solo si se ve (pantallas estrechas)
    const caja = raiz.querySelector('#mapa-inicio');
    if (mapa) { mapa.remove(); mapa = null; }
    if (!caja || caja.offsetParent === null) return;
    if (!window.L) { caja.textContent = 'No se pudo cargar el mapa.'; return; }
    const fp = filtroPueblo();
    const [red, rutas] = await Promise.all([getRed(), getRutas(fp)]);
    const centro = fp ? await getPueblo(fp) : red.centro;
    mapa = L.map(caja, { scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false })
      .setView([centro.lat, centro.lng], fp ? 13 : (centro.zoom || 12) - 1);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '© OpenStreetMap · prototipo (producción: Google Maps)',
    }).addTo(mapa);
    for (const r of rutas) {
      L.polyline(r.puntos, { color: colorSeguro(r.color, '#1f5c99'), weight: 4, opacity: .8, dashArray: r.tipo === 'cosechas' ? '8 8' : null }).addTo(mapa);
    }
    for (const p of red.pueblos) {
      if (fp && p.id !== fp) continue;
      L.marker([p.lat, p.lng], { icon: L.divIcon({ className: '', html: `<div class="pin-pueblo">${esc(p.nombre)}</div>`, iconSize: null }), interactive: false }).addTo(mapa);
    }
    setTimeout(() => mapa?.invalidateSize(), 100);
  },
};
