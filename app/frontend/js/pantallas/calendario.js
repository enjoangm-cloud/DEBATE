// Calendario de cosechas + previsión a 10 días + avisos (Weather + Vertex AI)
import { HOY, getPueblos, getCalendario, getPrevision, getAlertas } from '../../../backend/api.js';
import { t, esc, fuente, fechaCorta, diaSemana, ICONO_CIELO, filtroPueblo, nombrePueblo, colorSeguro, estado } from '../util.js';

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const ANYO = Number(HOY.slice(0, 4));

// Posición (0–100 %) de una fecha dentro del año de la demo (recortada a ese año)
const pctAnyo = (iso) => {
  const d = new Date(iso + 'T12:00:00');
  const ini = new Date(ANYO, 0, 1), fin = new Date(ANYO + 1, 0, 1);
  return Math.min(100, Math.max(0, ((d - ini) / (fin - ini)) * 100));
};

const ESTADO = { en_curso: ['en_curso', 'En curso', ''], terminado: ['terminado', 'Terminado', 'gris'], proximo: ['proximo', 'Próximo', 'ambar'] };

export default {
  async html() {
    const fp = filtroPueblo();
    const puebloTiempo = fp || 'vila-rodona'; // en "toda la red" se muestra el tiempo de referencia
    const [pueblos, cal, prev, alertas] = await Promise.all([getPueblos(), getCalendario(fp), getPrevision(puebloTiempo), getAlertas(fp)]);
    const cultivos = pueblos.flatMap(p => p.cultivos);
    const color = (id) => colorSeguro(cultivos.find(c => c.id === id)?.color);
    const emoji = (id) => cultivos.find(c => c.id === id)?.emoji || '🌱';
    const np = (id) => nombrePueblo(pueblos, id);
    const red = estado.pueblo === 'red';
    // Las tareas del año siguiente (p. ej. poda de enero) no caben en la línea de este año: van solo en tarjetas
    const enEsteAnyo = cal.filter(c => c.inicio.startsWith(String(ANYO)));

    return `
      <h2>📅 ${esc(t('nav_calendario', 'Calendario'))}</h2>
      <p class="muted">Cuándo se recoge cada cultivo ${red ? 'en la red' : 'en ' + esc(np(fp))} y cuánta gente hace falta. La línea roja es hoy.</p>

      <div class="timeline">
        <div class="tl-meses"><div></div>${MESES.map(m => `<div>${m}</div>`).join('')}</div>
        ${enEsteAnyo.map(c => `
          <div class="tl-fila">
            <div class="tl-nombre">${emoji(c.cultivoId)} ${esc(c.nombre)}${red ? `<br><span class="muted" style="font-weight:400;font-size:.8rem">${esc(np(c.puebloId))}</span>` : ''}</div>
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
            <p class="muted">📍 ${esc(np(c.puebloId))}</p>
            <p>${fechaCorta(c.inicio)} → ${fechaCorta(c.fin)}</p>
            <p><strong>${c.trabajadoresConfirmados}</strong> de ${c.trabajadoresNecesarios} personas</p>
            <div class="barra"><span style="width:${Math.min(100, pct)}%"></span></div>
            ${c.nota ? `<p class="muted">${esc(c.nota)}</p>` : ''}
          </div>`;
        }).join('')}
      </div>

      <h2>🌦️ Próximos 10 días · ${esc(np(puebloTiempo))}${red ? ' <span class="muted" style="font-size:1rem">(referencia de la red)</span>' : ''}</h2>
      <p class="muted">Verde = se puede trabajar en el campo. Rojo = mejor parar (lluvia o viento fuerte).</p>
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
          <div class="tarjeta alerta ${esc(a.nivel)}">
            <h3>${esc(diaSemana(a.fecha))} ${fechaCorta(a.fecha)} · ${esc(a.tipo)}${a.puebloId ? ' · ' + esc(np(a.puebloId)) : ''}</h3>
            <p class="muted">Dato: ${esc(a.datoTecnico)}</p>
            <div class="ia">${esc(a.mensajeSencillo)}</div>
            <p><strong>Qué hacer:</strong> ${esc(a.accion)}</p>
          </div>`).join('') || '<p>Sin avisos.</p>'}
      </div>
      ${fuente('getAlertas')}
      <p class="muted">👩‍🌾 El técnico de la cooperativa confirma la fecha real mirando el fruto. El tiempo ayuda a planificar, pero no decide la madurez.</p>`;
  },
};
