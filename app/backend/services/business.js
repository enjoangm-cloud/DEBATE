// Servicio simulado de NEGOCIOS: empleadores (fincas, casas rurales, bodega, restaurante, càmping, forestal)
// y venta directa. En producción: Google Business Profile API (fichas, productos y publicaciones).
import { estado, HOY } from './estado.js';
import { espera, copia, enPueblo, opciones } from './comun.js';

let contadorReservas = 0;

export async function getEmpleadores(arg) {
  await espera();
  const { puebloId, sector } = opciones(arg);
  return copia(estado.empleadores.filter((e) => enPueblo(e, puebloId) && (!sector || e.sector === sector)));
}

// Compatibilidad v1: solo las fincas
export async function getFincas(puebloId) {
  await espera();
  return copia(estado.empleadores.filter((e) => e.tipo === 'finca' && enPueblo(e, puebloId)));
}

// Reserva de compra directa: valida stock, lo descuenta y devuelve código y recogida
export async function reservarCompra(empleadorId, items) {
  await espera();
  const emp = estado.empleadores.find((e) => e.id === empleadorId);
  if (!emp) return { ok: false, error: 'Empleador no encontrado' };
  if (!emp.ventaDirecta?.activa) return { ok: false, error: 'Este empleador no tiene venta directa' };
  if (!Array.isArray(items) || items.length === 0) return { ok: false, error: 'No hay productos en la reserva' };

  // Primero se comprueba todo; solo después se descuenta (operación atómica)
  const lineas = [];
  for (const { productoId, cantidad } of items) {
    const p = emp.ventaDirecta.productos.find((x) => x.id === productoId);
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
  const codigo = 'CD-' + String(++contadorReservas).padStart(4, '0');
  const recogida = `${emp.nombre} · ${emp.ventaDirecta.diasRecogida}`;
  estado.reservas.push({ codigo, empleadorId, puebloId: emp.puebloId, items: copia(items), total, kg, fecha: HOY });
  return { ok: true, codigo, total, recogida };
}
