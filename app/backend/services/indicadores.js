// Indicadores de la red o de un pueblo, SIEMPRE calculados a partir del estado actual.
// En producción: agregación propia (p. ej. BigQuery / Looker Studio) sobre los datos anteriores.
import { estado, HOY } from './estado.js';
import { espera, copia, enPueblo, diasLaborables } from './comun.js';
import { previsionActual } from './weather.js';
import { caminoAnual } from './campana.js';

const suma = (arr, f) => arr.reduce((s, x) => s + f(x), 0);
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const media = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

export async function getIndicadores(puebloId) {
  await espera();
  const f = (x) => enPueblo(x, puebloId);
  const oferta = (id) => estado.ofertas.find((o) => o.id === id);

  // Vivienda (siempre de los empleadores)
  const alojamientos = estado.alojamientos.filter(f);
  const camasEmpleadores = suma(alojamientos, (a) => a.plazas);
  const camasLibres = suma(alojamientos, (a) => a.plazasLibres);
  const camasOcupadas = camasEmpleadores - camasLibres;
  const camasVerificadas = suma(alojamientos.filter((a) => a.verificado), (a) => a.plazas);
  const empleadoresConAlojamiento = new Set(alojamientos.map((a) => a.empleadorId)).size;
  const viviendasBolsaLibres = estado.viviendas.filter((v) => f(v) && !v.alquiladaPor && v.disponibleHasta >= HOY).length;

  // Ofertas vigentes
  const vigentes = estado.ofertas.filter((o) => f(o) && o.fin >= HOY);
  const ofertasAbiertas = vigentes.filter((o) => o.plazasCubiertas < o.plazas).length;
  const ofertasConAlojamientoPct = pct(vigentes.filter((o) => o.alojamiento.incluido).length, vigentes.length);
  const sectoresActivos = new Set(vigentes.map((o) => o.sector)).size;

  // Temporeros: contratados según el pueblo de su oferta; los que buscan según dónde están
  const contratados = estado.temporeros.filter((t) => t.estado === 'contratado' && oferta(t.ofertaId) && f(oferta(t.ofertaId)));
  const temporerosBuscando = estado.temporeros.filter((t) => t.estado === 'busca' && (!puebloId || puebloId === 'red' || t.puebloId === puebloId)).length;
  const solicitudesPendientes = estado.solicitudes.filter((s) => s.estado === 'pendiente' && oferta(s.ofertaId) && f(oferta(s.ofertaId))).length;

  // Días de trabajo medio de los contratados (lunes–sábado menos días no aptos)
  const noAptos = new Set(previsionActual().filter((d) => !d.aptoCosecha).map((d) => d.fecha));
  const diasTrabajoMedio = Math.round(media(contratados.map((t) => { const o = oferta(t.ofertaId); return diasLaborables(o.inicio, o.fin, noAptos); })));

  // Meses con trabajo en el camino anual (contratados; si no hay, todos los temporeros)
  const base = contratados.length ? contratados : estado.temporeros;
  const mesesTrabajoMedio = Math.round(media(base.map((t) => caminoAnual(t.id).mesesConTrabajo)) * 10) / 10;

  // Venta directa: % de empleadores que venden directamente y kg vendidos (previos + reservas)
  const empleadores = estado.empleadores.filter(f);
  const ventaDirectaPct = pct(empleadores.filter((e) => e.ventaDirecta?.activa).length, empleadores.length);
  const kgVendidosDirecto = Math.round((suma(empleadores, (e) => e.ventasPreviasKg || 0) + suma(estado.reservas.filter(f), (r) => r.kg)) * 10) / 10;

  const comerciosActualizados = estado.lugares.filter((l) => l.tipo === 'comercio' && l.horarioCampana && f(l)).length;
  const ayudasAceptadas = estado.ayudas.filter((a) => a.estado === 'aceptada' && (!puebloId || puebloId === 'red' || a.desdePuebloId === puebloId || a.haciaPuebloId === puebloId)).length;
  const reservasTurismo = estado.reservasTurismo.filter(f).length;

  return copia({
    // v1
    camasLibres, camasOcupadas, temporerosConContrato: contratados.length, temporerosBuscando, ofertasAbiertas,
    diasTrabajoMedio, ventaDirectaPct, comerciosActualizados, kgVendidosDirecto,
    // v2
    pueblosEnRed: estado.pueblos.length, empleadoresConAlojamiento, ofertasConAlojamientoPct, camasEmpleadores, camasVerificadas,
    viviendasBolsaLibres, mesesTrabajoMedio, ayudasAceptadas, reservasTurismo, sectoresActivos,
    // extra
    solicitudesPendientes
  });
}
