// Jóvenes: ruta de arraigo (probar → año completo → quedarse), test rápido y oportunidades
import { getJovenes, getEspana, getOportunidadesJovenes, recomendarRed, apuntarseOportunidad, getPueblos } from '../../../backend/api.js';
import { t, esc, fuente, aviso, nombrePueblo } from '../util.js';

const ICONO_PASO = { probar: '🌱', anyo: '🌳', quedarse: '🏡' };
const ICONO_OP = { practicas: '🎓', primera_temporada: '🧺', formacion: '🛠️', relevo: '🔑', vivienda_estable: '🏠', emprender: '💡' };
const NOMBRE_OP = { practicas: 'Prácticas', primera_temporada: 'Primera temporada', formacion: 'Formación', relevo: 'Relevo', vivienda_estable: 'Vivienda estable', emprender: 'Emprender' };

let recomendacion = null; // resultado del test

export default {
  async html() {
    const [jv, es, pueblos] = await Promise.all([getJovenes(), getEspana(), getPueblos()]);
    const ops = await getOportunidadesJovenes(recomendacion?.arquetipoId);
    const red = (id) => es.redes.find(r => r.id === id);
    const recomendadas = new Set(recomendacion?.oportunidades || []);
    // Las recomendadas primero
    ops.sort((a, b) => Number(recomendadas.has(b.id)) - Number(recomendadas.has(a.id)));

    return `
      <section class="hero">
        <h2>🧑‍🎓 ${esc(t('nav_jovenes', 'Jóvenes'))}: ven a probar, quédate si te gusta</h2>
        <p style="font-size:1.15rem">El campo y los pueblos necesitan gente joven. Te proponemos una
        <strong>${esc(t('ruta_arraigo', 'ruta de arraigo'))}</strong> en tres pasos, sin saltar al vacío.</p>
      </section>

      <div class="rejilla">
        ${jv.datos.map(d => `<div class="tarjeta"><div class="cifra">${esc(d.cifra)}</div>${esc(d.texto)}<br><span class="muted" style="font-size:.8rem">${esc(d.fuente)}</span></div>`).join('')}
      </div>

      <h2 class="seccion">🪜 ${esc(t('ruta_arraigo', 'Ruta de arraigo'))}</h2>
      <div class="rejilla">
        ${jv.pasos.map((p, i) => `
          <article class="tarjeta destacada">
            <h3>${ICONO_PASO[p.id] || '•'} ${i + 1}. ${esc(p.titulo)}</h3>
            <p class="muted">⏱️ ${esc(p.duracion)}</p>
            <p><strong>Qué tienes:</strong></p><ul class="pasos">${p.queOfrece.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
            <p><strong>Quién lo paga:</strong></p><ul class="pasos">${p.quienPaga.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </article>`).join('')}
      </div>
      ${fuente('getJovenes')}

      <h2 class="seccion">🧭 ¿Qué red va contigo?</h2>
      <form id="test" class="tarjeta">
        ${jv.preguntas.map(q => `
          <fieldset style="border:0;padding:0;margin:0 0 1rem">
            <legend style="font-weight:700;margin-bottom:.4rem">${esc(q.texto)}</legend>
            <div class="chips">${q.opciones.map((o, i) => `
              <label class="chip"><input type="radio" name="${esc(q.id)}" value="${esc(o.id)}" ${i === 0 ? 'required' : ''}> ${esc(o.texto)}</label>`).join('')}
            </div>
          </fieldset>`).join('')}
        <button class="btn" type="submit">${esc(t('recomendar', 'Recomiéndame'))}</button>
      </form>
      ${recomendacion ? `
        <div class="tarjeta destacada seccion">
          <h3>✨ Te va: ${esc(red(recomendacion.redId)?.nombre || '')}</h3>
          <div class="ia">${esc(recomendacion.motivo)}</div>
          <button class="btn sec" id="borrar-test">Volver a empezar</button>
        </div>` : ''}

      <h2 class="seccion">📌 ${esc(t('oportunidades', 'Oportunidades'))}${recomendacion ? ' para ti' : ''}</h2>
      <div class="rejilla">
        ${ops.map(o => `
          <article class="tarjeta ${recomendadas.has(o.id) ? 'destacada' : ''}">
            <div><span class="etiqueta">${ICONO_OP[o.tipo] || '•'} ${esc(NOMBRE_OP[o.tipo] || o.tipo)}</span>
              <span class="etiqueta gris">📍 ${esc(red(o.redId)?.nombre || '')}${o.puebloId ? ' · ' + esc(nombrePueblo(pueblos, o.puebloId)) : ''}</span></div>
            <h3 style="margin-top:.4rem">${esc(o.titulo)}</h3>
            <p>${esc(o.descripcion)}</p>
            <p class="muted">⏱️ ${esc(o.duracion)} · ${o.plazas} plazas</p>
            <ul class="pasos">${o.condiciones.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
            <form class="fila" data-op="${esc(o.id)}">
              <input name="nombre" maxlength="60" required placeholder="Tu nombre" aria-label="Tu nombre" style="padding:.5rem;border-radius:8px;border:1px solid var(--borde)">
              <button class="btn" type="submit" ${o.plazas <= 0 ? 'disabled' : ''}>${esc(t('apuntarme', 'Me apunto'))}</button>
            </form>
          </article>`).join('') || '<p class="muted">No hay oportunidades para este perfil.</p>'}
      </div>
      ${fuente('getOportunidadesJovenes')}`;
  },

  activar(raiz, repintar) {
    raiz.querySelector('#test').onsubmit = async (e) => {
      e.preventDefault();
      const respuestas = Object.fromEntries(new FormData(e.target));
      const r = await recomendarRed(respuestas);
      if (!r.ok) return aviso('⚠️ ' + (r.error || 'Responde las preguntas'));
      recomendacion = r;
      repintar();
    };
    raiz.querySelector('#borrar-test')?.addEventListener('click', () => { recomendacion = null; repintar(); });
    raiz.querySelectorAll('form[data-op]').forEach(f => f.onsubmit = async (e) => {
      e.preventDefault();
      const nombre = f.elements.nombre.value.trim().slice(0, 60);
      if (!nombre) return aviso('Escribe tu nombre');
      const r = await apuntarseOportunidad(f.dataset.op, nombre);
      aviso(r.ok ? `✔ Apuntado. Código ${r.codigo}: el dinamizador te llamará` : '⚠️ ' + (r.error || 'No se pudo apuntar'));
      if (r.ok) repintar();
    });
  },
};
