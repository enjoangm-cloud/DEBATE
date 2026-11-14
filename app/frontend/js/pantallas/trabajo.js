// Ofertas de trabajo (vista del temporero): contrato, cama, transporte y solicitud
import { getPueblo, getOfertas, getFincas, getLugares, getTemporeros, solicitarOferta, getSolicitudes } from '../../../backend/api.js';
import { t, esc, fuente, fechaCorta, euros, aviso, porId } from '../util.js';

let temporeroActual = null; // "quién soy" en la demo

export default {
  async html() {
    const [p, ofertas, fincas, lugares, temporeros, solicitudes] =
      await Promise.all([getPueblo(), getOfertas(), getFincas(), getLugares(), getTemporeros(), getSolicitudes()]);
    temporeroActual ??= temporeros.find(x => x.estado === 'busca')?.id || temporeros[0]?.id;
    const yo = porId(temporeros, temporeroActual);
    const cultivo = (id) => p.cultivos.find(c => c.id === id);
    const yaPedida = (ofertaId) => solicitudes.some(s => s.ofertaId === ofertaId && s.temporeroId === temporeroActual);

    return `
      <h2>🧑‍🌾 ${esc(t('nav_trabajo', 'Trabajo'))}</h2>
      <div class="tarjeta fila" style="margin-bottom:1rem">
        <label>Demo · soy:
          <select id="sel-temporero">
            ${temporeros.map(x => `<option value="${esc(x.id)}" ${x.id === temporeroActual ? 'selected' : ''}>${esc(x.nombre)} (${esc(x.origen)})</option>`).join('')}
          </select>
        </label>
        ${yo ? `<span class="muted">Idiomas: ${yo.idiomas.join(', ')} · Experiencia: ${yo.experiencia.map(id => cultivo(id)?.emoji || id).join(' ')}
          ${yo.necesitaAlojamiento ? ' · necesita cama' : ''}${yo.necesitaTransporte ? ' · sin coche' : ''}</span>` : ''}
      </div>
      <p class="muted">💡 Cambia el idioma arriba: la app traduce botones y avisos al idioma del temporero (Vertex AI, simulado).</p>

      <div class="rejilla">
        ${ofertas.map(o => {
          const f = porId(fincas, o.fincaId) || {};
          const aloj = o.alojamiento?.lugarId ? porId(lugares, o.alojamiento.lugarId) : null;
          const rec = o.transporte?.recogidaId ? porId(lugares, o.transporte.recogidaId) : null;
          const libres = o.plazas - o.plazasCubiertas;
          const c = cultivo(o.cultivoId);
          return `
          <article class="tarjeta ${esc(libres > 0 ? 'destacada' : '')}">
            <h3>${c?.emoji || ''} ${esc(o.titulo)}</h3>
            <p><strong>${esc(f.nombre || '')}</strong>${f.campanaDigna ? ' <span class="etiqueta">✅ Campaña digna</span>' : ''}</p>
            <p>📅 ${fechaCorta(o.inicio)} → ${fechaCorta(o.fin)} · 🕐 ${esc(t('horario', 'Horario'))}: ${esc(o.horario)}</p>
            <p>💶 ${esc(t('salario_hora', 'Salario/hora'))}: <strong>${euros(o.salarioHora)}</strong> brutos</p>
            <div>
              ${o.contrato ? `<span class="etiqueta">📄 ${esc(t('contrato', 'Contrato'))}</span>` : ''}
              ${o.alojamiento?.incluido ? `<span class="etiqueta">🛏️ ${esc(t('alojamiento_incluido', 'Alojamiento incluido'))}</span>` : '<span class="etiqueta ambar">🛏️ Sin alojamiento</span>'}
              ${o.transporte?.incluido ? `<span class="etiqueta">🚐 ${esc(t('transporte_incluido', 'Transporte incluido'))}</span>` : ''}
            </div>
            ${aloj ? `<p class="muted">Dormirás en: ${esc(aloj.nombre)}</p>` : ''}
            ${rec ? `<p class="muted">Recogida: ${esc(rec.nombre)} a las ${esc(rec.hora || '')}</p>` : ''}
            <p class="muted">${esc(o.tareas || '')} · Encargado habla: ${(o.idiomasEncargado || []).join(', ')}</p>
            <p><strong>${libres}</strong> ${esc(t('plazas_libres', 'plazas libres'))} de ${o.plazas}</p>
            <div class="fila">
              <button class="btn" data-oferta="${esc(o.id)}" ${libres <= 0 || yaPedida(o.id) ? 'disabled' : ''}>
                ${yaPedida(o.id) ? '✔ ' + esc(t('solicitado', 'Solicitado')) : esc(t('solicitar', 'Solicitar'))}</button>
              ${f.telefono ? `<a class="btn sec" href="tel:${esc(f.telefono)}">📞 ${esc(t('llamar', 'Llamar'))}</a>` : ''}
              <a class="btn sec" href="#mapa">🗺️ ${esc(t('como_llegar', 'Cómo llegar'))}</a>
            </div>
          </article>`;
        }).join('')}
      </div>
      ${fuente('getOfertas')}
      <p class="muted seccion">Tu solicitud llega a ${esc(p.dinamizador.nombre)}, que la revisa con la finca y te llama. Ninguna máquina decide por ti.</p>`;
  },

  activar(raiz, repintar) {
    raiz.querySelector('#sel-temporero').onchange = (e) => { temporeroActual = e.target.value; repintar(); };
    raiz.querySelectorAll('[data-oferta]').forEach(b => b.onclick = async () => {
      b.disabled = true;
      const r = await solicitarOferta(b.dataset.oferta, temporeroActual);
      aviso(r.ok ? '✔ Solicitud enviada al dinamizador del pueblo' : '⚠️ No se pudo enviar');
      repintar();
    });
  },
};
