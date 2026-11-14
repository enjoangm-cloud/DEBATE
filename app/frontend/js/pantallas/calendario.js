// Calendario de cosecha del año + previsión a 10 días + avisos (Weather + Vertex AI)
import { HOY, getPueblo, getCalendario, getPrevision, getAlertas } from '../../../backend/api.js';
import { t, esc, fuente, fechaCorta, diaSemana, ICONO_CIELO } from '../util.js';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Posición (0–100 %) de una fecha dentro del año
const pctAnyo = (iso) => {
  const d = new Date(iso + 'T12:00:00');
  const ini = new Date(d.getFullYear(), 0, 1);
  return ((d - ini) / (365 * 864e5)) * 100;
};

const ESTADO = { en_curso: ['en_curso', 'En curso', ''], terminado: ['terminado', 'Terminado', 'gris'], proximo: ['proximo', 'Próximo', 'ambar'] };

export default {
  async html() {
    const [p, cal, prev, alertas] = await Promise.all([getPueblo(), getCalendario(), getPrevision(), getAlertas()]);
    const color = (id) => p.cultivos.find(c => c.id === id)?.color || '#3f6b2a';
    const emoji = (id) => p.cultivos.find(c => c.id === id)?.emoji || '🌱';

    return `
      <h2>📅 ${esc(t('nav_calendario', 'Calendario de cosecha'))}</h2>
      <p class="muted">Cuándo se recoge cada cultivo en ${esc(p.nombre)} y cuánta gente hace falta. La línea roja es hoy.</p>

      <div class="timeline">
        <div class="tl-meses"><div></div>${MESES.map(m => `<div>${m}</div>`).join('')}</div>
        ${cal.map(c => `
          <div class="tl-fila">
            <div class="tl-nombre">${emoji(c.cultivoId)} ${esc(c.nombre)}</div>
            <div class="tl-pista">
              <div class="tl-barra" style="left:${pctAnyo(c.inicio)}%;width:${Math.max(2, pctAnyo(c.fin) - pctAnyo(c.inicio))}%;background:${color(c.cultivoId)}">
                ${fechaCorta(c.inicio)}–${fechaCorta(c.fin)}</div>
              <div class="tl-hoy" style="left:${pctAnyo(HOY)}%" title="Hoy"></div>
            </div>
          </div>`).join('')}
      </div>
      ${fuente('getCalendario')}

      <div class="rejilla seccion">
        ${cal.map(c => {
          const [k, txt, cls] = ESTADO[c.estado] || ESTADO.proximo;
          const pct = Math.round(100 * c.trabajadoresConfirmados / Math.max(1, c.trabajadoresNecesarios));
          return `
          <div class="tarjeta ${c.estado === 'en_curso' ? 'destacada' : ''}">
            <h3>${emoji(c.cultivoId)} ${esc(c.nombre)} <span class="etiqueta ${cls}">${esc(t(k, txt))}</span></h3>
            <p>${fechaCorta(c.inicio)} → ${fechaCorta(c.fin)}</p>
            <p><strong>${c.trabajadoresConfirmados}</strong> de ${c.trabajadoresNecesarios} personas</p>
            <div class="barra"><span style="width:${Math.min(100, pct)}%"></span></div>
            ${c.nota ? `<p class="muted">${esc(c.nota)}</p>` : ''}
          </div>`;
        }).join('')}
      </div>

      <h2>🌦️ Próximos 10 días</h2>
      <p class="muted">Verde = se puede recoger. Rojo = mejor parar (lluvia o viento fuerte).</p>
      <div class="dias">
        ${prev.map(d => `
          <div class="dia ${d.aptoCosecha ? 'apto' : 'noapto'}">
            <div><strong>${d.fecha === HOY ? esc(t('hoy', 'Hoy')) : diaSemana(d.fecha)}</strong></div>
            <div class="muted">${fechaCorta(d.fecha)}</div>
            <div class="ico">${ICONO_CIELO[d.cielo] || '🌤️'}</div>
            <div><strong>${d.tMax}°</strong> / ${d.tMin}°</div>
            <div class="muted">💧 ${d.lluviaProb} % · 💨 ${d.vientoKmh}</div>
            <div class="etiqueta ${d.aptoCosecha ? '' : 'rojo'}">${d.aptoCosecha ? esc(t('apto', 'Apto')) : esc(t('no_apto', 'No apto'))}</div>
          </div>`).join('')}
      </div>
      ${fuente('getPrevision')}

      <h2 class="seccion">⚠️ Avisos</h2>
      <div class="rejilla">
        ${alertas.map(a => `
          <div class="tarjeta alerta ${a.nivel}">
            <h3>${esc(diaSemana(a.fecha))} ${fechaCorta(a.fecha)} · ${esc(a.tipo)}</h3>
            <p class="muted">Dato: ${esc(a.datoTecnico)}</p>
            <div class="ia">${esc(a.mensajeSencillo)}</div>
            <p><strong>Qué hacer:</strong> ${esc(a.accion)}</p>
          </div>`).join('') || '<p>Sin avisos.</p>'}
      </div>
      ${fuente('getAlertas')}
      <p class="muted">👩‍🌾 El agrónomo de la cooperativa confirma la fecha real de inicio mirando el fruto. El tiempo ayuda a planificar, pero no decide la madurez.</p>`;
  },
};
