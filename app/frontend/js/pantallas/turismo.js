// Turismo rural y compra directa: experiencias en la red (eligiendo días buenos) y productos de los empleadores
import { getPueblos, getExperiencias, reservarExperiencia, getEmpleadores, reservarCompra, getPrevision } from '../../../backend/api.js';
import { t, esc, fuente, euros, aviso, fechaCorta, diaSemana, filtroPueblo, nombrePueblo, porId, ICONO_CIELO } from '../util.js';

const ICONO_EXP = { cosecha: '🧺', enoturismo: '🍷', patrimonio: '🏛️', ruta: '🥾', gastronomia: '🍽️' };

export default {
  async html() {
    const fp = filtroPueblo();
    const [pueblos, experiencias, empleadores, prev] = await Promise.all([
      getPueblos(), getExperiencias(fp), getEmpleadores({ puebloId: fp }), getPrevision(fp || 'vila-rodona')]);
    const np = (id) => nombrePueblo(pueblos, id);
    const conVenta = empleadores.filter(e => e.ventaDirecta?.activa);
    const tiempo = (iso) => { const d = prev.find(x => x.fecha === iso); return d ? (ICONO_CIELO[d.cielo] || '') : ''; };
    const todos = await getEmpleadores();

    return `
      <h2>🧺 ${esc(t('nav_turismo', 'Turismo'))}</h2>
      <p class="muted">Turismo rural en la red: vivir la cosecha, el patrimonio y la gastronomía. Da trabajo a la gente del pueblo
      y llena las casas rurales. Las actividades al aire libre solo se ofrecen en días con buen tiempo (Weather).</p>

      <div class="rejilla">
        ${experiencias.map(x => `
          <article class="tarjeta">
            <div><span class="etiqueta">${ICONO_EXP[x.tipo] || '✨'} ${esc(x.tipo)}</span><span class="etiqueta gris">📍 ${esc(np(x.puebloId))}</span>
              ${x.dependeDelTiempo ? '<span class="etiqueta ambar">☀️ Según el tiempo</span>' : ''}</div>
            <h3 style="margin-top:.4rem">${esc(x.titulo)}</h3>
            <p class="muted">${esc(x.descripcion)}</p>
            <p>⏱️ ${esc(x.duracion)} · <strong>${euros(x.precioPersona)}</strong>/persona · ${x.plazasLibres} ${esc(t('plazas_libres', 'plazas libres'))}</p>
            <p class="muted">Organiza: ${esc(porId(todos, x.empleadorId)?.nombre || '')}</p>
            <form class="fila" data-exp="${esc(x.id)}">
              <label>${esc(t('fecha', 'Fecha'))}
                <select name="fecha">${x.fechas.map(f => `<option value="${esc(f)}">${esc(diaSemana(f))} ${fechaCorta(f)} ${tiempo(f)}</option>`).join('')}</select>
              </label>
              <label>${esc(t('personas', 'Personas'))}
                <input type="number" name="personas" min="1" max="${esc(Math.max(1, Math.min(10, x.plazasLibres)))}" value="2" style="width:4rem">
              </label>
              <button class="btn" type="submit" ${x.plazasLibres <= 0 || !x.fechas.length ? 'disabled' : ''}>${esc(t('reservar_experiencia', 'Reservar'))}</button>
            </form>
          </article>`).join('') || '<p class="muted">No hay experiencias en este pueblo.</p>'}
      </div>
      ${fuente('getExperiencias')}

      <h2 class="seccion">🛒 Compra directa al productor</h2>
      <p class="muted">Aceite, almendra, avellana y vino sin intermediarios. Reservas y lo recoges en la finca o la bodega.</p>
      <div class="rejilla">
        ${conVenta.map(e => `
          <article class="tarjeta">
            <h3>${esc(e.nombre)}</h3>
            <div><span class="etiqueta gris">📍 ${esc(np(e.puebloId))}</span>${e.campanaDigna ? '<span class="etiqueta">✅ Campaña digna</span>' : ''}</div>
            <p class="muted">${esc(e.descripcion || '')}</p>
            <p>📦 Recogida: <strong>${esc(e.ventaDirecta.diasRecogida)}</strong></p>
            <form data-empleador="${esc(e.id)}">
              ${e.ventaDirecta.productos.map(pr => `
                <label class="fila" style="justify-content:space-between;margin:.3rem 0">
                  <span>${esc(pr.nombre)} · <strong>${euros(pr.precio)}</strong>/${esc(pr.unidad)} <span class="muted">(${esc(pr.stock)} disp.)</span></span>
                  <input type="number" min="0" max="${esc(pr.stock)}" value="0" name="${esc(pr.id)}" style="width:4.5rem" aria-label="Cantidad de ${esc(pr.nombre)}">
                </label>`).join('')}
              <div class="fila" style="margin-top:.5rem">
                <button class="btn" type="submit">${esc(t('reservar', 'Reservar'))}</button>
                <a class="btn sec" href="${esc(`https://www.google.com/maps/dir/?api=1&destination=${Number(e.lat)},${Number(e.lng)}`)}" target="_blank" rel="noopener noreferrer">🗺️ ${esc(t('como_llegar', 'Cómo llegar'))}</a>
              </div>
            </form>
          </article>`).join('') || '<p class="muted">Nadie vende directo en este pueblo todavía.</p>'}
      </div>
      ${fuente('getEmpleadores')}`;
  },

  activar(raiz, repintar) {
    raiz.querySelectorAll('form[data-exp]').forEach(form => form.onsubmit = async (e) => {
      e.preventDefault();
      const fecha = form.elements.fecha.value;
      const personas = Math.floor(Number(form.elements.personas.value));
      if (!Number.isFinite(personas) || personas < 1 || personas > 10) return aviso('Elige entre 1 y 10 personas');
      const r = await reservarExperiencia(form.dataset.exp, fecha, personas);
      aviso(r.ok ? `✔ Reserva ${r.codigo} · ${euros(r.total)}` : '⚠️ ' + (r.error || 'No se pudo reservar'));
      if (r.ok) repintar();
    });
    raiz.querySelectorAll('form[data-empleador]').forEach(form => form.onsubmit = async (e) => {
      e.preventDefault();
      const items = [...new FormData(form)].map(([productoId, cantidad]) => ({ productoId, cantidad: Math.floor(Number(cantidad)) }))
        .filter(i => Number.isFinite(i.cantidad) && i.cantidad > 0 && i.cantidad <= 1000);
      if (!items.length) return aviso('Elige al menos un producto');
      const r = await reservarCompra(form.dataset.empleador, items);
      aviso(r.ok ? `✔ Reserva ${r.codigo} · ${euros(r.total)} · ${r.recogida}` : '⚠️ ' + (r.error || 'No se pudo reservar'));
      if (r.ok) repintar();
    });
  },
};
