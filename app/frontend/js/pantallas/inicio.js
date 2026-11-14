// Inicio: qué es la red, quién la usa y cómo está la temporada hoy
import { getRed, getIndicadores, getAlertas, getSectores } from '../../../backend/api.js';
import { t, esc, estado, fuente, filtroPueblo, nombrePueblo } from '../util.js';

// Rol → pantalla a la que lleva
const ROLES = [
  { id: 'temporero',   ico: '🧑‍🌾', destino: 'trabajo', texto: 'Busco trabajo todo el año, con casa y transporte' },
  { id: 'agricultor',  ico: '🚜',  destino: 'pueblo',  texto: 'Contrato gente y les busco vivienda' },
  { id: 'dinamizador', ico: '🏛️', destino: 'red',     texto: 'Coordino la red de pueblos' },
  { id: 'comprador',   ico: '🧺',  destino: 'turismo', texto: 'Quiero visitar, vivir la cosecha y comprar directo' },
  { id: 'joven',       ico: '🧑‍🎓', destino: 'jovenes', texto: 'Quiero probar a vivir y trabajar en un pueblo' },
];

export default {
  async html() {
    const [red, ind, alertas, sectores] = await Promise.all([
      getRed(), getIndicadores(filtroPueblo()), getAlertas(filtroPueblo()), getSectores()]);
    const total = red.pueblos.reduce((s, p) => s + p.habitantes, 0);
    const alerta = alertas[0];
    const ambito = estado.pueblo === 'red' ? 'toda la red' : nombrePueblo(red.pueblos, estado.pueblo);

    return `
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
              <strong>${esc(t('rol_' + r.id, r.id))}</strong>
              <span class="muted">${esc(r.texto)}</span>
            </button>`).join('')}
        </div>
      </section>

      <section class="seccion">
        <h2>Así está ${esc(ambito)} hoy</h2>
        <div class="rejilla">
          <div class="tarjeta"><div class="cifra">${ind.ofertasAbiertas}</div>ofertas abiertas en ${ind.sectoresActivos} sectores</div>
          <div class="tarjeta"><div class="cifra">${ind.ofertasConAlojamientoPct} %</div>de las ofertas incluyen vivienda del empleador</div>
          <div class="tarjeta"><div class="cifra">${ind.mesesTrabajoMedio}</div>meses de trabajo encadenado por temporero</div>
          <div class="tarjeta"><div class="cifra">${ind.temporerosConContrato}</div>temporeros con contrato</div>
        </div>
        ${fuente('getIndicadores')}
      </section>`;
  },

  activar(raiz) {
    raiz.querySelectorAll('[data-rol]').forEach(b => b.onclick = () => {
      estado.rol = b.dataset.rol;
      location.hash = b.dataset.destino;
    });
  },
};
