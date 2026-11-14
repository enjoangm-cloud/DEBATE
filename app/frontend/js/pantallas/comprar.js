// Venta directa al comprador final (Business Profile) + reserva para recoger en la finca
import { getFincas, getPueblo, reservarCompra } from '../../../backend/api.js';
import { t, esc, fuente, euros, aviso } from '../util.js';

export default {
  async html() {
    const [p, fincas] = await Promise.all([getPueblo(), getFincas()]);
    const conVenta = fincas.filter(f => f.ventaDirecta?.activa);
    const cultivo = (id) => p.cultivos.find(c => c.id === id);

    return `
      <h2>🧺 ${esc(t('nav_comprar', 'Comprar directo'))}</h2>
      <p class="muted">Aceite, almendra, avellana y vino de ${esc(p.nombre)}, sin intermediarios. Reservas y lo recoges en la finca.</p>
      <div class="rejilla">
        ${conVenta.map(f => `
          <article class="tarjeta">
            <h3>${esc(f.nombre)}</h3>
            <div>${f.cultivos.map(id => `<span class="etiqueta">${cultivo(id)?.emoji || ''} ${esc(cultivo(id)?.nombre || id)}</span>`).join('')}
              ${f.campanaDigna ? '<span class="etiqueta">✅ Campaña digna</span>' : ''}</div>
            <p class="muted">${esc(f.descripcion || '')}</p>
            <p>📦 Recogida: <strong>${esc(f.ventaDirecta.diasRecogida)}</strong></p>
            <form data-finca="${f.id}">
              ${f.ventaDirecta.productos.map(pr => `
                <label class="fila" style="justify-content:space-between;margin:.3rem 0">
                  <span>${esc(pr.nombre)} · <strong>${euros(pr.precio)}</strong>/${esc(pr.unidad)} <span class="muted">(${pr.stock} disp.)</span></span>
                  <input type="number" min="0" max="${pr.stock}" value="0" name="${pr.id}" style="width:4.5rem" aria-label="Cantidad de ${esc(pr.nombre)}">
                </label>`).join('')}
              <div class="fila" style="margin-top:.5rem">
                <button class="btn" type="submit">${esc(t('reservar', 'Reservar'))}</button>
                <a class="btn sec" href="https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}" target="_blank" rel="noopener">🗺️ ${esc(t('como_llegar', 'Cómo llegar'))}</a>
              </div>
            </form>
          </article>`).join('') || '<p>Ninguna finca tiene venta directa activa.</p>'}
      </div>
      ${fuente('getFincas')}

      <div class="tarjeta seccion">
        <h3>🍇 Vive la cosecha</h3>
        <p>Fines de semana de vendimia y de recogida de oliva para visitantes, con comida en el bar del pueblo.
        La fecha se elige con la previsión del tiempo para que no llueva. <span class="muted">(Complementa el trabajo de los temporeros, no lo sustituye.)</span></p>
      </div>`;
  },

  activar(raiz, repintar) {
    raiz.querySelectorAll('form[data-finca]').forEach(form => form.onsubmit = async (e) => {
      e.preventDefault();
      const items = [...new FormData(form)].map(([productoId, cantidad]) => ({ productoId, cantidad: Number(cantidad) })).filter(i => i.cantidad > 0);
      if (!items.length) return aviso('Elige al menos un producto');
      const r = await reservarCompra(form.dataset.finca, items);
      aviso(r.ok ? `✔ Reserva ${r.codigo} · ${euros(r.total)} · ${r.recogida}` : '⚠️ ' + (r.error || 'No se pudo reservar'));
      if (r.ok) repintar();
    });
  },
};
