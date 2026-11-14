// Servicio simulado de NEGOCIOS (fincas y venta directa).
// En producción: Google Business Profile API (fichas de fincas, productos y publicaciones).
import { estado, HOY } from './estado.js';
import { espera, copia } from './comun.js';

let contadorReservas = 0;

export async function getFincas() {
  await espera();
  return copia(estado.fincas);
}

// Reserva de compra directa: valida stock, lo descuenta y devuelve código y recogida
export async function reservarCompra(fincaId, items) {
  await espera();
  const finca = estado.fincas.find((f) => f.id === fincaId);
  if (!finca) return { ok: false, error: 'Finca no encontrada' };
  if (!finca.ventaDirecta.activa) return { ok: false, error: 'Esta finca no tiene venta directa' };
  if (!Array.isArray(items) || items.length === 0) return { ok: false, error: 'No hay productos en la reserva' };

  // Primero se comprueba todo; solo después se descuenta (operación atómica)
  const lineas = [];
  for (const { productoId, cantidad } of items) {
    const p = finca.ventaDirecta.productos.find((x) => x.id === productoId);
    const n = Number(cantidad);
    if (!p) return { ok: false, error: `Producto no encontrado: ${productoId}` };
    if (!(n > 0)) return { ok: false, error: `Cantidad no válida para ${p.nombre}` };
    if (n > p.stock) return { ok: false, error: `Solo quedan ${p.stock} de ${p.nombre}` };
    lineas.push({ p, n });
  }
  let total = 0, kg = 0;
  for (const { p, n } of lineas) {
    p.stock -= n;
    total += p.precio * n;
    kg += (p.kgPorUnidad ?? 1) * n;
  }
  total = Math.round(total * 100) / 100;
  const codigo = 'VR-' + String(++contadorReservas).padStart(4, '0');
  const recogida = `${finca.nombre} · ${finca.ventaDirecta.diasRecogida}`;
  estado.reservas.push({ codigo, fincaId, items: copia(items), total, kg, fecha: HOY });
  return { ok: true, codigo, total, recogida };
}
