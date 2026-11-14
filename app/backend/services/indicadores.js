// Indicadores de la campaña, SIEMPRE calculados a partir del estado actual.
// En producción: agregación propia (p. ej. BigQuery / Looker Studio) sobre los datos anteriores.
import { estado, HOY } from './estado.js';
import { espera, copia, dias } from './comun.js';
import { previsionActual } from './weather.js';

// Días de trabajo de una oferta: lunes–sábado del periodo, menos días no aptos de la previsión
function diasTrabajo(oferta, noAptos) {
  let n = 0;
  const total = dias(oferta.inicio, oferta.fin);
  for (let i = 0; i <= total; i++) {
    const f = new Date(Date.parse(oferta.inicio + 'T12:00:00Z') + i * 86400000).toISOString().slice(0, 10);
    if (new Date(f + 'T12:00:00Z').getUTCDay() !== 0 && !noAptos.has(f)) n++;
  }
  return n;
}

export async function getIndicadores() {
  await espera();
  const alojamientos = estado.lugares.filter((l) => l.tipo === 'alojamiento');
  const camasDisponibles = alojamientos.reduce((s, a) => s + a.plazasLibres, 0);
  const camasOcupadas = alojamientos.reduce((s, a) => s + (a.plazas - a.plazasLibres), 0);

  const contratados = estado.temporeros.filter((t) => t.estado === 'contratado');
  const temporerosBuscando = estado.temporeros.filter((t) => t.estado === 'busca').length;
  const ofertasAbiertas = estado.ofertas.filter((o) => o.fin >= HOY && o.plazasCubiertas < o.plazas).length;

  // Media de días de trabajo de los temporeros con contrato
  const noAptos = new Set(previsionActual().filter((d) => !d.aptoCosecha).map((d) => d.fecha));
  const diasLista = contratados.map((t) => estado.ofertas.find((o) => o.id === t.ofertaId)).filter(Boolean).map((o) => diasTrabajo(o, noAptos));
  const diasTrabajoMedio = diasLista.length ? Math.round(diasLista.reduce((a, b) => a + b, 0) / diasLista.length) : 0;

  // Venta directa: % de fincas que venden directamente y kg vendidos (previos + reservas)
  const conVenta = estado.fincas.filter((f) => f.ventaDirecta.activa).length;
  const ventaDirectaPct = estado.fincas.length ? Math.round((conVenta / estado.fincas.length) * 100) : 0;
  const kgPrevios = estado.fincas.reduce((s, f) => s + (f.ventasPreviasKg || 0), 0);
  const kgReservas = estado.reservas.reduce((s, r) => s + r.kg, 0);
  const kgVendidosDirecto = Math.round((kgPrevios + kgReservas) * 10) / 10;

  const comerciosActualizados = estado.lugares.filter((l) => l.tipo === 'comercio' && l.horarioCampana).length;

  return copia({ camasDisponibles, camasOcupadas, temporerosConContrato: contratados.length, temporerosBuscando,
    ofertasAbiertas, diasTrabajoMedio, ventaDirectaPct, comerciosActualizados, kgVendidosDirecto });
}
