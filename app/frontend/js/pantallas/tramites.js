// Trámites explicados paso a paso (alivia la burocracia, no la elimina)
import { getTramites, getPueblo } from '../../../backend/api.js';
import { t, esc, fuente } from '../util.js';

export default {
  async html() {
    const [tramites, p] = await Promise.all([getTramites(), getPueblo()]);
    const bloque = (para, titulo) => `
      <h2 class="seccion">${titulo}</h2>
      ${tramites.filter(x => x.para === para).map(x => `
        <details class="tarjeta" style="margin-bottom:.75rem">
          <summary>${esc(x.titulo)}</summary>
          <h3 style="margin-top:.75rem">${esc(t('pasos', 'Pasos'))}</h3>
          <ol class="pasos">${x.pasos.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
          ${x.documentos?.length ? `<h3>${esc(t('documentos', 'Documentos'))}</h3><ul>${x.documentos.map(d => `<li>${esc(d)}</li>`).join('')}</ul>` : ''}
          <p><strong>${esc(t('donde', 'Dónde'))}:</strong> ${esc(x.dondeSeHace)}</p>
        </details>`).join('')}`;

    return `
      <h2>📋 ${esc(t('nav_tramites', 'Trámites'))}</h2>
      <p class="muted">Los papeles de la campaña, explicados en corto. ¿Dudas? ${esc(p.dinamizador.nombre)} te ayuda en ${esc(p.dinamizador.lugar)} (${esc(p.dinamizador.horario || '')}).</p>
      ${bloque('temporero', '🧑‍🌾 Si vienes a trabajar')}
      ${bloque('agricultor', '🚜 Si contratas')}
      ${fuente('getTramites')}
      <p class="muted">Información orientativa del prototipo. Confirmar siempre con la Seguridad Social, el SEPE o el ayuntamiento.</p>`;
  },
};
