// Gestión (empleador y dinamizador): vivienda de los trabajadores, propuestas de la IA, solicitudes y comercios
import { getPueblos, getIndicadores, getEmparejamientosIA, decidirEmparejamiento, getTemporeros, getOfertas,
  getLugares, getSolicitudes, getEmpleadores, getAlojamientos, getViviendasParaEmpleadores, alquilarVivienda,
  verificarAlojamiento } from '../../../backend/api.js';
import { t, esc, fuente, aviso, porId, euros, fechaCorta, filtroPueblo, nombrePueblo } from '../util.js';

let empleadorActual = null; // "quién soy" en la demo (para alquilar vivienda)

const TIPO_VIVIENDA = { casa_rural: '🏡 Casa rural', vivienda_vacia: '🏠 Vivienda vacía', albergue: '🛏️ Albergue' };

export default {
  async html() {
    const fp = filtroPueblo();
    const [pueblos, ind, emp, temporeros, ofertas, comercios, solicitudes, empleadores, alojamientos, viviendas] = await Promise.all([
      getPueblos(), getIndicadores(fp), getEmparejamientosIA(fp), getTemporeros(), getOfertas(), getLugares({ puebloId: fp, tipo: 'comercio' }),
      getSolicitudes(), getEmpleadores(), getAlojamientos(fp), getViviendasParaEmpleadores(fp)]);
    if (!porId(empleadores, empleadorActual)) empleadorActual = empleadores[0]?.id;
    const np = (id) => nombrePueblo(pueblos, id);
    const nombreT = (id) => porId(temporeros, id)?.nombre || id;
    const oferta = (id) => porId(ofertas, id);
    const nombreE = (id) => porId(empleadores, id)?.nombre || '';
    const solicitudesVisibles = fp ? solicitudes.filter(s => oferta(s.ofertaId)?.puebloId === fp) : solicitudes;

    return `
      <h2>🏛️ ${esc(t('nav_pueblo', 'Gestión'))}</h2>
      <p class="muted">Para los empleadores y para el dinamizador de la red.</p>

      <div class="rejilla">
        <div class="tarjeta"><div class="cifra">${ind.camasLibres}</div>camas libres en viviendas de empleadores</div>
        <div class="tarjeta"><div class="cifra">${ind.camasVerificadas}/${ind.camasEmpleadores}</div>camas verificadas por el ayuntamiento</div>
        <div class="tarjeta"><div class="cifra">${ind.viviendasBolsaLibres}</div>viviendas libres en la bolsa</div>
        <div class="tarjeta"><div class="cifra">${ind.ayudasAceptadas}</div>ayudas entre pueblos aceptadas</div>
      </div>
      ${fuente('getIndicadores')}

      <h2 class="seccion">🏠 La vivienda la pone quien contrata</h2>
      <div class="tarjeta" style="margin-bottom:1rem">
        <ol class="pasos">
          <li><strong>El empleador</strong> aloja a sus trabajadores: en una casa suya o alquilando una de la bolsa.</li>
          <li><strong>El ayuntamiento</strong> la visita y la verifica (camas, baño, cocina, calefacción).</li>
          <li><strong>El temporero</strong> no paga nada y sabe dónde dormirá antes de venir.</li>
        </ol>
        <p class="muted">La bolsa son casas rurales vacías en invierno y viviendas cerradas del pueblo: el propietario cobra un alquiler y la casa no se pierde.</p>
      </div>

      <h3>Viviendas de los empleadores</h3>
      <div style="overflow-x:auto"><table class="tabla">
        <thead><tr><th>Vivienda</th><th>Empleador</th><th>Pueblo</th><th>Libres</th><th>Tipo</th><th>Estado</th></tr></thead>
        <tbody>${alojamientos.map(a => `<tr>
          <td>${esc(a.nombre)}<br><span class="muted">${a.requisitos.camasIndividuales} camas · ${a.requisitos.banos} baño(s)${a.requisitos.cocina ? ' · cocina' : ''}${a.requisitos.calefaccion ? ' · calefacción' : ''}</span></td>
          <td>${esc(nombreE(a.empleadorId))}</td><td>${esc(np(a.puebloId))}</td>
          <td><strong>${a.plazasLibres}</strong> / ${a.plazas}</td>
          <td>${a.modalidad === 'propio' ? 'Propia' : 'Alquilada' + (a.costeEmpleadorMes ? ` (${euros(a.costeEmpleadorMes)}/mes)` : '')}</td>
          <td>${a.verificado ? `<span class="etiqueta">✅ ${esc(t('verificado', 'Verificada'))}</span>`
            : `<button class="btn sec" data-verificar="${esc(a.id)}">✅ Verificar</button>`}</td>
        </tr>`).join('') || '<tr><td colspan="6" class="muted">Sin viviendas en este pueblo.</td></tr>'}</tbody>
      </table></div>
      ${fuente('getAlojamientos')}

      <h3 class="seccion">Bolsa de viviendas para empleadores</h3>
      <div class="tarjeta fila" style="margin-bottom:1rem">
        <label>Demo · soy el empleador:
          <select id="sel-empleador">
            ${empleadores.map(e => `<option value="${esc(e.id)}" ${e.id === empleadorActual ? 'selected' : ''}>${esc(e.nombre)} · ${esc(np(e.puebloId))}</option>`).join('')}
          </select>
        </label>
      </div>
      <div class="rejilla">
        ${viviendas.map(v => `
          <article class="tarjeta ${v.alquiladaPor ? '' : 'destacada'}">
            <h3>${esc(TIPO_VIVIENDA[v.tipo] || v.tipo)} · ${esc(np(v.puebloId))}</h3>
            <p><strong>${esc(v.nombre)}</strong></p>
            <p>🛏️ ${v.plazas} plazas · ${euros(v.precioMes)}/mes <span class="muted">(lo paga el empleador)</span></p>
            <p class="muted">Libre ${fechaCorta(v.disponibleDesde)} → ${fechaCorta(v.disponibleHasta)}${v.nota ? ' · ' + esc(v.nota) : ''}</p>
            ${v.alquiladaPor
              ? `<span class="etiqueta gris">Alquilada por ${esc(nombreE(v.alquiladaPor))}</span>`
              : `<button class="btn" data-alquilar="${esc(v.id)}">🔑 ${esc(t('alquilar', 'Alquilar'))} para mis trabajadores</button>`}
          </article>`).join('') || '<p class="muted">No hay viviendas en la bolsa para este pueblo.</p>'}
      </div>
      ${fuente('getViviendasParaEmpleadores')}

      <h2 class="seccion">✨ Propuestas de emparejamiento</h2>
      <p class="muted">La IA sugiere temporero + oferta + vivienda del empleador. <strong>Una persona aprueba o rechaza.</strong></p>
      <div class="rejilla">
        ${emp.map(e => `
          <div class="tarjeta ${e.estado === 'propuesto' ? 'destacada' : ''}">
            <h3>${esc(nombreT(e.temporeroId))}</h3>
            <p>→ ${esc(oferta(e.ofertaId)?.titulo || '')}<br><span class="muted">${esc(nombreE(oferta(e.ofertaId)?.empleadorId))} · ${esc(np(oferta(e.ofertaId)?.puebloId))}</span></p>
            ${e.alojamientoId ? `<p>🏠 ${esc(porId(alojamientos, e.alojamientoId)?.nombre || '')}</p>` : ''}
            <div class="ia">${esc(e.motivo)}</div>
            <p class="muted">Confianza: ${Math.round(e.confianza * 100)} %</p>
            ${e.estado === 'propuesto' ? `
              <div class="fila">
                <button class="btn" data-emp="${esc(e.id)}" data-dec="aprobado">✔ ${esc(t('aprobar', 'Aprobar'))}</button>
                <button class="btn sec" data-emp="${esc(e.id)}" data-dec="rechazado">✖ ${esc(t('rechazar', 'Rechazar'))}</button>
              </div>` : `<span class="etiqueta ${e.estado === 'aprobado' ? '' : 'gris'}">${e.estado === 'aprobado' ? '✔ Aprobado' : '✖ Rechazado'}</span>`}
          </div>`).join('') || '<p class="muted">Sin propuestas.</p>'}
      </div>
      ${fuente('getEmparejamientosIA')}

      <h2 class="seccion">📨 Solicitudes recibidas</h2>
      ${solicitudesVisibles.length ? `<div style="overflow-x:auto"><table class="tabla"><thead><tr><th>Temporero</th><th>Oferta</th><th>Pueblo</th><th>Estado</th></tr></thead><tbody>
        ${solicitudesVisibles.map(s => `<tr><td>${esc(nombreT(s.temporeroId))}</td><td>${esc(oferta(s.ofertaId)?.titulo || '')}</td><td>${esc(np(oferta(s.ofertaId)?.puebloId))}</td><td><span class="etiqueta ambar">${esc(s.estado)}</span></td></tr>`).join('')}
        </tbody></table></div>` : '<p class="muted">Aún no hay solicitudes. Prueba a solicitar una oferta en Trabajo.</p>'}

      <h2 class="seccion">🛒 Comercios abiertos a la temporada</h2>
      <div class="rejilla">
        ${comercios.map(c => `<div class="tarjeta"><h3>${esc(c.nombre)}</h3>
          <p class="muted">📍 ${esc(np(c.puebloId))} · Normal: ${esc(c.horarioNormal || '')}</p>
          <p>Temporada: <strong>${esc(c.horarioCampana || '')}</strong></p>
          ${c.ofertaTemporero ? `<p>🎁 ${esc(c.ofertaTemporero)}</p>` : ''}
          <span class="etiqueta">Business Profile actualizado</span></div>`).join('') || '<p class="muted">Sin comercios en este pueblo.</p>'}
      </div>`;
  },

  activar(raiz, repintar) {
    const accion = async (b, fn, ok) => {
      b.disabled = true;
      const r = await fn();
      aviso(r.ok ? ok : '⚠️ ' + (r.error || 'No se pudo guardar'));
      repintar();
    };
    raiz.querySelector('#sel-empleador')?.addEventListener('change', (e) => { empleadorActual = e.target.value; });
    raiz.querySelectorAll('[data-alquilar]').forEach(b => b.onclick = () =>
      accion(b, () => alquilarVivienda(b.dataset.alquilar, empleadorActual), '🔑 Alquilada. El ayuntamiento la visitará para verificarla'));
    raiz.querySelectorAll('[data-verificar]').forEach(b => b.onclick = () =>
      accion(b, () => verificarAlojamiento(b.dataset.verificar), '✅ Vivienda verificada'));
    raiz.querySelectorAll('[data-emp]').forEach(b => b.onclick = () => {
      raiz.querySelectorAll(`[data-emp="${CSS.escape(b.dataset.emp)}"]`).forEach(x => x.disabled = true);
      accion(b, () => decidirEmparejamiento(b.dataset.emp, b.dataset.dec),
        b.dataset.dec === 'aprobado' ? '✔ Aprobado: se reserva la cama en la vivienda del empleador' : 'Propuesta rechazada');
    });
  },
};
