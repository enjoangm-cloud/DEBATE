// Panel del dinamizador: indicadores, propuestas de la IA (decide la persona), camas y comercios
import { getPueblo, getIndicadores, getEmparejamientosIA, decidirEmparejamiento, getTemporeros, getOfertas, getLugares, getSolicitudes, getFincas } from '../../../backend/api.js';
import { t, esc, fuente, aviso, porId } from '../util.js';

export default {
  async html() {
    const [p, ind, emp, temporeros, ofertas, lugares, solicitudes, fincas] = await Promise.all([
      getPueblo(), getIndicadores(), getEmparejamientosIA(), getTemporeros(), getOfertas(), getLugares(), getSolicitudes(), getFincas()]);
    const alojamientos = lugares.filter(l => l.tipo === 'alojamiento');
    const comercios = lugares.filter(l => l.tipo === 'comercio');
    const nombreT = (id) => porId(temporeros, id)?.nombre || id;
    const tituloO = (id) => porId(ofertas, id)?.titulo || id;
    const finca = (ofertaId) => porId(fincas, porId(ofertas, ofertaId)?.fincaId)?.nombre || '';

    return `
      <h2>🏛️ ${esc(t('nav_pueblo', 'Panel del pueblo'))}</h2>
      <p class="muted">Para ${esc(p.dinamizador.nombre)}, la persona que coordina la campaña en ${esc(p.nombre)}.</p>

      <div class="rejilla">
        <div class="tarjeta"><div class="cifra">${ind.camasDisponibles}</div>camas libres · ${ind.camasOcupadas} ocupadas</div>
        <div class="tarjeta"><div class="cifra">${ind.temporerosConContrato}</div>con contrato · ${ind.temporerosBuscando} buscando</div>
        <div class="tarjeta"><div class="cifra">${ind.diasTrabajoMedio}</div>días de trabajo medio por temporero</div>
        <div class="tarjeta"><div class="cifra">${ind.comerciosActualizados}</div>comercios con horario de campaña</div>
      </div>
      ${fuente('getIndicadores')}

      <h2 class="seccion">✨ Propuestas de emparejamiento</h2>
      <p class="muted">La IA sugiere temporero + oferta + cama. <strong>Tú apruebas o rechazas.</strong></p>
      <div class="rejilla">
        ${emp.map(e => `
          <div class="tarjeta ${e.estado === 'propuesto' ? 'destacada' : ''}">
            <h3>${esc(nombreT(e.temporeroId))}</h3>
            <p>→ ${esc(tituloO(e.ofertaId))}<br><span class="muted">${esc(finca(e.ofertaId))}</span></p>
            ${e.alojamientoId ? `<p>🛏️ ${esc(porId(lugares, e.alojamientoId)?.nombre || '')}</p>` : ''}
            <div class="ia">${esc(e.motivo)}</div>
            <p class="muted">Confianza: ${Math.round(e.confianza * 100)} %</p>
            ${e.estado === 'propuesto' ? `
              <div class="fila">
                <button class="btn" data-emp="${e.id}" data-dec="aprobado">✔ ${esc(t('aprobar', 'Aprobar'))}</button>
                <button class="btn sec" data-emp="${e.id}" data-dec="rechazado">✖ ${esc(t('rechazar', 'Rechazar'))}</button>
              </div>` : `<span class="etiqueta ${e.estado === 'aprobado' ? '' : 'gris'}">${e.estado === 'aprobado' ? '✔ Aprobado' : '✖ Rechazado'}</span>`}
          </div>`).join('')}
      </div>
      ${fuente('getEmparejamientosIA')}

      <h2 class="seccion">📨 Solicitudes recibidas</h2>
      ${solicitudes.length ? `<table class="tabla"><thead><tr><th>Temporero</th><th>Oferta</th><th>Estado</th></tr></thead><tbody>
        ${solicitudes.map(s => `<tr><td>${esc(nombreT(s.temporeroId))}</td><td>${esc(tituloO(s.ofertaId))}</td><td><span class="etiqueta ambar">${esc(s.estado)}</span></td></tr>`).join('')}
        </tbody></table>` : '<p class="muted">Aún no hay solicitudes. Prueba a solicitar una oferta en la pestaña Trabajo.</p>'}

      <h2 class="seccion">🛏️ Camas del pueblo</h2>
      <div style="overflow-x:auto"><table class="tabla">
        <thead><tr><th>Lugar</th><th>Cede</th><th>Libres</th><th>Fechas</th><th>Precio</th></tr></thead>
        <tbody>${alojamientos.map(a => `<tr><td>${esc(a.nombre)}</td><td>${esc(a.cedidoPor || '')}</td>
          <td><strong>${a.plazasLibres}</strong> / ${a.plazas}</td><td>${esc(a.desde || '')} → ${esc(a.hasta || '')}</td>
          <td>${a.precioNoche ? a.precioNoche + ' €/noche' : 'Gratis'}</td></tr>`).join('')}</tbody>
      </table></div>
      ${fuente('getLugares')}

      <h2 class="seccion">🛒 Pueblo abierto a la campaña</h2>
      <div class="rejilla">
        ${comercios.map(c => `<div class="tarjeta"><h3>${esc(c.nombre)}</h3>
          <p class="muted">Normal: ${esc(c.horarioNormal || '')}</p>
          <p>Campaña: <strong>${esc(c.horarioCampana || '')}</strong></p>
          ${c.ofertaTemporero ? `<p>🎁 ${esc(c.ofertaTemporero)}</p>` : ''}
          <span class="etiqueta">Business Profile actualizado</span></div>`).join('')}
      </div>`;
  },

  activar(raiz, repintar) {
    raiz.querySelectorAll('[data-emp]').forEach(b => b.onclick = async () => {
      raiz.querySelectorAll(`[data-emp="${b.dataset.emp}"]`).forEach(x => x.disabled = true);
      const r = await decidirEmparejamiento(b.dataset.emp, b.dataset.dec);
      aviso(r.ok ? (b.dataset.dec === 'aprobado' ? '✔ Aprobado: se reserva la cama y se avisa a la finca' : 'Propuesta rechazada') : '⚠️ No se pudo guardar');
      repintar();
    });
  },
};
