// Red de pueblos: quién la forma, trabajo todo el año, ayuda mutua y cómo se suma otro pueblo
import { getRed, getTemporadaAnual, getSectores, getAyudaMutua, aceptarAyuda } from '../../../backend/api.js';
import { t, esc, fuente, fechaCorta, diaSemana, euros, aviso, nombrePueblo, colorSeguro, filtroPueblo, estado } from '../util.js';

const ICONO_AYUDA = { cuadrilla: '👥', transporte: '🚐', maquinaria: '🚜', alojamiento: '🏠' };

// Gráfico de barras apiladas: puestos de trabajo por mes y sector
function graficoAnual(meses, sectores) {
  const totales = meses.map(m => sectores.reduce((s, x) => s + (m[x.id] || 0), 0));
  const max = Math.max(1, ...totales);
  return `
    <div class="anual" role="img" aria-label="Puestos de trabajo por mes y sector">
      ${meses.map((m, i) => `
        <div class="anual-col">
          <div class="anual-total">${totales[i]}</div>
          <div class="anual-barra" style="height:${Math.round(100 * totales[i] / max)}%">
            ${sectores.map(s => m[s.id] ? `<span title="${esc(t('sector_' + s.id, s.nombre))}: ${m[s.id]}" style="flex:${m[s.id]};background:${colorSeguro(s.color)}"></span>` : '').join('')}
          </div>
          <div class="anual-mes">${esc(m.nombre)}</div>
        </div>`).join('')}
    </div>
    <div class="fila" style="margin-top:.5rem">${sectores.map(s => `<span class="leyenda"><i style="background:${colorSeguro(s.color)}"></i>${esc(s.emoji)} ${esc(t('sector_' + s.id, s.nombre))}</span>`).join('')}</div>`;
}

export default {
  async html() {
    const [red, meses, sectores, ayudas] = await Promise.all([
      getRed(), getTemporadaAnual(filtroPueblo()), getSectores(), getAyudaMutua()]);
    const np = (id) => nombrePueblo(red.pueblos, id);
    const totalAnual = meses.reduce((s, m) => s + sectores.reduce((a, x) => a + (m[x.id] || 0), 0), 0);
    const mesMin = meses.reduce((a, m) => {
      const v = sectores.reduce((s, x) => s + (m[x.id] || 0), 0);
      return v < a.v ? { v, n: m.nombre } : a;
    }, { v: Infinity, n: '' });
    const ayudasVisibles = estado.pueblo === 'red' ? ayudas
      : ayudas.filter(a => a.desdePuebloId === estado.pueblo || a.haciaPuebloId === estado.pueblo);

    return `
      <h2>🤝 ${esc(red.nombre)}</h2>
      <p class="muted">${esc(red.descripcion)}</p>

      <div class="rejilla">
        ${red.pueblos.map(p => `
          <article class="tarjeta ${p.id === estado.pueblo ? 'destacada' : ''}">
            <h3>📍 ${esc(p.nombre)}</h3>
            <p><strong>${p.habitantes.toLocaleString('es-ES')}</strong> habitantes <span class="muted">(padrón ${esc(p.anyoPadron)})</span></p>
            <div>${p.cultivos.map(c => `<span class="etiqueta">${esc(c.emoji)} ${esc(c.nombre)}</span>`).join('')}</div>
            <ul class="pasos">${p.destacados.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
          </article>`).join('')}
      </div>
      ${fuente('getRed')}

      <h2 class="seccion">📈 Trabajo todo el año</h2>
      <p>Si cada pueblo va por su cuenta, el trabajo dura semanas. Juntando <strong>5 pueblos y 5 sectores</strong>,
      ningún mes se queda vacío: el mes más flojo (${esc(mesMin.n)}) aún tiene <strong>${mesMin.v}</strong> puestos.
      En total, <strong>${totalAnual}</strong> puestos-mes al año${estado.pueblo === 'red' ? ' en la red' : ' en ' + esc(np(estado.pueblo))}.</p>
      <div class="tarjeta">${graficoAnual(meses, sectores)}</div>
      ${fuente('getTemporadaAnual')}

      <h2 class="seccion">🔁 Ayuda mutua entre pueblos</h2>
      <p class="muted">Cuando un pueblo se para (lluvia, falta de gente, una máquina), otro le echa una mano.</p>
      <div class="rejilla">
        ${ayudasVisibles.map(a => `
          <div class="tarjeta ${a.estado === 'propuesta' ? 'destacada' : ''}">
            <h3>${ICONO_AYUDA[a.tipo] || '🤝'} ${esc(np(a.desdePuebloId))} → ${esc(np(a.haciaPuebloId))}</h3>
            <p class="muted">${esc(diaSemana(a.fecha))} ${fechaCorta(a.fecha)} · ${a.personas ? a.personas + ' personas · ' : ''}${esc(a.tipo)}</p>
            <p>${esc(a.motivo)}</p>
            ${a.estado === 'propuesta'
              ? `<button class="btn" data-ayuda="${esc(a.id)}">✔ ${esc(t('aceptar', 'Aceptar'))}</button>`
              : '<span class="etiqueta">✔ Aceptada</span>'}
          </div>`).join('') || '<p class="muted">Sin propuestas para este pueblo.</p>'}
      </div>
      ${fuente('getAyudaMutua')}

      <h2 class="seccion">💶 Una persona para toda la red</h2>
      <div class="tarjeta">
        <p>El dinamizador (${esc(red.dinamizador.nombre)}) trabaja para los ${red.pueblos.length} pueblos.
        Cuesta <strong>${euros(red.costeDinamizador.anualEuros)}</strong> al año, repartidos así:</p>
        <table class="tabla">
          <thead><tr><th>Pueblo</th><th>Aporta al año</th></tr></thead>
          <tbody>${red.costeDinamizador.reparto.map(r => `<tr><td>${esc(np(r.puebloId))}</td><td>${euros(r.euros)}</td></tr>`).join('')}</tbody>
        </table>
        <p class="muted">Un pueblo de 500 habitantes no puede pagar solo a esta persona. Cinco juntos, sí.</p>
      </div>

      <h2 class="seccion">➕ Cómo se suma otro pueblo</h2>
      <div class="tarjeta">
        <p>La app es una <strong>plantilla</strong>: sirve para cualquier pueblo de menos de 5.000 habitantes de España.
        Solo cambian los cultivos, el calendario y los empleadores.</p>
        <ol class="pasos">${red.comoSumarse.map(p => `<li>${esc(p)}</li>`).join('')}</ol>
      </div>`;
  },

  activar(raiz, repintar) {
    raiz.querySelectorAll('[data-ayuda]').forEach(b => b.onclick = async () => {
      b.disabled = true;
      const r = await aceptarAyuda(b.dataset.ayuda);
      aviso(r.ok ? '✔ Ayuda aceptada: se avisa a los dos pueblos' : '⚠️ ' + (r.error || 'No se pudo aceptar'));
      repintar();
    });
  },
};
