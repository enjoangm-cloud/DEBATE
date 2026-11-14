// Trabajo (vista del temporero): ofertas de todos los sectores, vivienda del empleador y camino anual
import { getPueblos, getSectores, getOfertas, getEmpleadores, getAlojamientos, getLugares, getTemporeros,
  solicitarOferta, getSolicitudes, getCaminoAnual } from '../../../backend/api.js';
import { t, esc, fuente, fechaCorta, euros, aviso, porId, filtroPueblo, nombrePueblo, etiquetaSector } from '../util.js';

let temporeroActual = null; // "quién soy" en la demo
let sectorActual = 'todos'; // filtro de sector

export default {
  async html() {
    const [pueblos, sectores, temporeros, solicitudes] = await Promise.all([getPueblos(), getSectores(), getTemporeros(), getSolicitudes()]);
    temporeroActual ??= temporeros.find(x => x.estado === 'busca')?.id || temporeros[0]?.id;
    if (!sectores.some(s => s.id === sectorActual)) sectorActual = 'todos';
    const filtro = { puebloId: filtroPueblo(), sector: sectorActual === 'todos' ? undefined : sectorActual };

    const [ofertas, empleadores, alojamientos, recogidas, camino] = await Promise.all([
      getOfertas(filtro), getEmpleadores(), getAlojamientos(), getLugares({ tipo: 'recogida' }), getCaminoAnual(temporeroActual)]);
    const yo = porId(temporeros, temporeroActual);
    const np = (id) => nombrePueblo(pueblos, id);
    const yaPedida = (ofertaId) => solicitudes.some(s => s.ofertaId === ofertaId && s.temporeroId === temporeroActual);

    return `
      <h2>🧑‍🌾 ${esc(t('nav_trabajo', 'Trabajo'))}</h2>
      <div class="tarjeta fila" style="margin-bottom:1rem">
        <label>Demo · soy:
          <select id="sel-temporero">
            ${temporeros.map(x => `<option value="${esc(x.id)}" ${x.id === temporeroActual ? 'selected' : ''}>${esc(x.nombre)} (${esc(x.origen)})</option>`).join('')}
          </select>
        </label>
        ${yo ? `<span class="muted">Idiomas: ${esc(yo.idiomas.join(', '))} · Experiencia: ${(yo.sectores || []).map(s => esc(sectores.find(x => x.id === s)?.emoji || s)).join(' ')}
          ${yo.necesitaAlojamiento ? ' · necesita casa' : ''}${yo.necesitaTransporte ? ' · sin coche' : ''}</span>` : ''}
      </div>

      ${camino && camino.tramos?.length ? `
      <section class="tarjeta destacada" style="margin-bottom:1.25rem">
        <h3>🗓️ ${esc(t('camino_anual', 'Tu año de trabajo'))}: <strong>${camino.mesesConTrabajo}</strong> ${esc(t('meses_trabajo', 'meses con trabajo'))} · ${camino.diasTrabajo} días</h3>
        <ul class="camino">
          ${camino.tramos.map(tr => `<li><strong>${fechaCorta(tr.inicio)} → ${fechaCorta(tr.fin)}</strong> ·
            ${esc(np(tr.puebloId))} ${etiquetaSector(sectores, tr.sector)}<br>
            <span class="muted">${esc(tr.tarea)} · ${esc(porId(empleadores, tr.empleadorId)?.nombre || '')}</span></li>`).join('')}
        </ul>
        <p class="muted">Encadenando trabajos de la red, el temporero no tiene que irse a otra provincia entre campaña y campaña.</p>
        ${fuente('getCaminoAnual')}
      </section>` : ''}

      <div class="chips" role="group" aria-label="${esc(t('sector', 'Sector'))}">
        <button class="chip ${sectorActual === 'todos' ? 'activo' : ''}" data-sector="todos">${esc(t('todos', 'Todos'))}</button>
        ${sectores.map(s => `<button class="chip ${sectorActual === s.id ? 'activo' : ''}" data-sector="${esc(s.id)}">${esc(s.emoji)} ${esc(t('sector_' + s.id, s.nombre))}</button>`).join('')}
      </div>
      <p class="muted">💡 Cambia el idioma arriba: la app traduce botones y avisos al idioma del temporero (Vertex AI, simulado).</p>

      <div class="rejilla">
        ${ofertas.map(o => {
          const e = porId(empleadores, o.empleadorId) || {};
          const aloj = o.alojamiento?.alojamientoId ? porId(alojamientos, o.alojamiento.alojamientoId) : null;
          const rec = o.transporte?.recogidaId ? porId(recogidas, o.transporte.recogidaId) : null;
          const libres = o.plazas - o.plazasCubiertas;
          return `
          <article class="tarjeta ${libres > 0 ? 'destacada' : ''}">
            <div>${etiquetaSector(sectores, o.sector)}<span class="etiqueta gris">📍 ${esc(np(o.puebloId))}</span></div>
            <h3 style="margin-top:.4rem">${esc(o.titulo)}</h3>
            <p><strong>${esc(e.nombre || '')}</strong>${e.campanaDigna ? ' <span class="etiqueta">✅ Campaña digna</span>' : ''}</p>
            <p>📅 ${fechaCorta(o.inicio)} → ${fechaCorta(o.fin)} · 🕐 ${esc(t('horario', 'Horario'))}: ${esc(o.horario)}</p>
            <p>💶 ${esc(t('salario_hora', 'Salario/hora'))}: <strong>${euros(o.salarioHora)}</strong> brutos</p>
            <div>
              ${o.contrato ? `<span class="etiqueta">📄 ${esc(t('contrato', 'Contrato'))}</span>` : ''}
              ${o.alojamiento?.incluido ? `<span class="etiqueta">🏠 ${esc(t('alojamiento_empleador', 'Vivienda del empleador'))}</span>` : '<span class="etiqueta gris">🏠 Para gente de la zona</span>'}
              ${o.transporte?.incluido ? `<span class="etiqueta">🚐 ${esc(t('transporte_incluido', 'Transporte incluido'))}</span>` : ''}
            </div>
            ${aloj ? `<p class="muted">🏠 ${esc(aloj.nombre)} · ${aloj.verificado ? '✅ ' + esc(t('verificado', 'Verificada')) + ' por ' + esc(aloj.verificadoPor) : '⏳ ' + esc(t('pendiente_verificar', 'Pendiente de verificar'))}
              · ${esc(t('coste_temporero', 'Te cuesta'))}: <strong>${euros(aloj.costeTemporero)}</strong></p>` : ''}
            ${rec ? `<p class="muted">🚐 Recogida: ${esc(rec.nombre)} a las ${esc(rec.hora || '')}</p>` : ''}
            <p class="muted">${esc(o.tareas || '')} · Encargado habla: ${esc((o.idiomasEncargado || []).join(', '))}</p>
            <p><strong>${libres}</strong> ${esc(t('plazas_libres', 'plazas libres'))} de ${o.plazas}</p>
            <div class="fila">
              <button class="btn" data-oferta="${esc(o.id)}" ${libres <= 0 || yaPedida(o.id) ? 'disabled' : ''}>
                ${yaPedida(o.id) ? '✔ ' + esc(t('solicitado', 'Solicitado')) : esc(t('solicitar', 'Solicitar'))}</button>
              ${e.telefono ? `<a class="btn sec" href="tel:${esc(e.telefono)}">📞 ${esc(t('llamar', 'Llamar'))}</a>` : ''}
              <a class="btn sec" href="#mapa">🗺️ ${esc(t('como_llegar', 'Cómo llegar'))}</a>
            </div>
          </article>`;
        }).join('') || '<p class="muted">No hay ofertas con este filtro. Prueba otro sector o "Toda la red".</p>'}
      </div>
      ${fuente('getOfertas')}
      <p class="muted seccion">Tu solicitud llega al dinamizador de la red, que la revisa con el empleador y te llama. Ninguna máquina decide por ti.</p>`;
  },

  activar(raiz, repintar) {
    raiz.querySelector('#sel-temporero').onchange = (e) => { temporeroActual = e.target.value; repintar(); };
    raiz.querySelectorAll('[data-sector]').forEach(b => b.onclick = () => { sectorActual = b.dataset.sector; repintar(); });
    raiz.querySelectorAll('[data-oferta]').forEach(b => b.onclick = async () => {
      b.disabled = true;
      const r = await solicitarOferta(b.dataset.oferta, temporeroActual);
      aviso(r.ok ? '✔ Solicitud enviada al dinamizador de la red' : '⚠️ ' + (r.error || 'No se pudo enviar'));
      repintar();
    });
  },
};
