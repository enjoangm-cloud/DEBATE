// Servicio simulado de la TEMPORADA: calendario, demanda anual, ofertas, temporeros, solicitudes,
// decisiones y camino anual. En producción: ofertas como publicaciones de Google Business Profile;
// calendario con Google Weather + criterio del agrónomo; emparejamientos y caminos propuestos por Vertex AI (Gemini).
import { estado, HOY } from './estado.js';
import { espera, copia, enPueblo, opciones, diasLaborables, sumarDias } from './comun.js';
import { TEMPORADA, MESES, ORDEN_SECTORES } from '../data/temporada.js';

// Estado de una etapa según la fecha de la demo
const estadoFechas = (inicio, fin) => (fin < HOY ? 'terminado' : inicio > HOY ? 'proximo' : 'en_curso');

// Calendario: la etapa en curso cuenta los confirmados a partir de las ofertas agrícolas del pueblo
export async function getCalendario(puebloId) {
  await espera();
  return copia(estado.calendario.filter((c) => enPueblo(c, puebloId)).map((c) => {
    const est = estadoFechas(c.inicio, c.fin);
    let confirmados = c.trabajadoresConfirmados;
    if (est === 'en_curso') {
      confirmados = estado.ofertas
        .filter((o) => o.puebloId === c.puebloId && o.sector === 'agricultura' && o.cultivoId === c.cultivoId && o.inicio <= c.fin && o.fin >= c.inicio)
        .reduce((s, o) => s + o.plazasCubiertas, 0);
    }
    return { ...c, estado: est, trabajadoresConfirmados: confirmados };
  }));
}

// Puestos demandados por mes y sector (suma de los pueblos del filtro)
export function temporadaAnual(puebloId) {
  const ids = Object.keys(TEMPORADA).filter((id) => enPueblo({ puebloId: id }, puebloId));
  return MESES.map((nombre, i) => {
    const fila = { mes: i + 1, nombre };
    ORDEN_SECTORES.forEach((s, k) => { fila[s] = ids.reduce((t, id) => t + TEMPORADA[id][i][k], 0); });
    return fila;
  });
}

export async function getTemporadaAnual(puebloId) {
  await espera();
  return copia(temporadaAnual(puebloId));
}

export async function getOfertas(arg) {
  await espera();
  const { puebloId, sector } = opciones(arg);
  return copia(estado.ofertas.filter((o) => enPueblo(o, puebloId) && (!sector || o.sector === sector)));
}

export async function getTemporeros() {
  await espera();
  return copia(estado.temporeros);
}

// Un temporero solicita una oferta (si ya la había solicitado, se devuelve la misma)
export async function solicitarOferta(ofertaId, temporeroId) {
  await espera();
  const oferta = estado.ofertas.find((o) => o.id === ofertaId);
  const temporero = estado.temporeros.find((t) => t.id === temporeroId);
  if (!oferta) return { ok: false, error: 'Oferta no encontrada' };
  if (!temporero) return { ok: false, error: 'Temporero no encontrado' };
  const previa = estado.solicitudes.find((s) => s.ofertaId === ofertaId && s.temporeroId === temporeroId);
  if (previa) return { ok: true, solicitud: copia(previa) };
  const solicitud = { id: 'sol-' + String(estado.solicitudes.length + 1).padStart(3, '0'), ofertaId, temporeroId, estado: 'pendiente', fecha: HOY };
  estado.solicitudes.push(solicitud);
  return { ok: true, solicitud: copia(solicitud) };
}

export async function getSolicitudes() {
  await espera();
  return copia(estado.solicitudes);
}

// El dinamizador aprueba o rechaza una propuesta de la IA
export async function decidirEmparejamiento(id, decision) {
  await espera();
  const emp = estado.emparejamientos.find((e) => e.id === id);
  if (!emp) return { ok: false, error: 'Emparejamiento no encontrado' };
  if (decision !== 'aprobado' && decision !== 'rechazado') return { ok: false, error: 'Decisión no válida' };
  if (emp.estado !== 'propuesto') return { ok: false, error: `Ya estaba ${emp.estado}`, emparejamiento: copia(emp) };

  if (decision === 'rechazado') {
    emp.estado = 'rechazado';
    return { ok: true, emparejamiento: copia(emp) };
  }

  // Aprobación: se comprueban plazas y cama (del empleador de la oferta) antes de cambiar nada
  const oferta = estado.ofertas.find((o) => o.id === emp.ofertaId);
  const temporero = estado.temporeros.find((t) => t.id === emp.temporeroId);
  const aloj = emp.alojamientoId ? estado.alojamientos.find((a) => a.id === emp.alojamientoId) : null;
  if (!oferta || !temporero) return { ok: false, error: 'Datos incompletos' };
  if (temporero.estado === 'contratado') return { ok: false, error: 'El temporero ya tiene contrato' };
  if (oferta.plazasCubiertas >= oferta.plazas) return { ok: false, error: 'La oferta ya está completa' };
  if (emp.alojamientoId && (!aloj || aloj.empleadorId !== oferta.empleadorId)) return { ok: false, error: 'El alojamiento no es del empleador de la oferta' };
  if (aloj && aloj.plazasLibres <= 0) return { ok: false, error: 'No quedan camas en ese alojamiento' };

  emp.estado = 'aprobado';
  oferta.plazasCubiertas += 1;
  if (aloj) aloj.plazasLibres -= 1;
  temporero.estado = 'contratado';
  temporero.ofertaId = oferta.id;
  temporero.puebloId = oferta.puebloId;
  // Su solicitud a esa oferta (si la había) queda aceptada
  for (const s of estado.solicitudes) if (s.temporeroId === temporero.id && s.ofertaId === oferta.id) s.estado = 'aceptada';
  // Otras propuestas para el mismo temporero dejan de tener sentido
  for (const e of estado.emparejamientos) if (e !== emp && e.temporeroId === temporero.id && e.estado === 'propuesto') e.estado = 'rechazado';
  return { ok: true, emparejamiento: copia(emp) };
}

// ¿La oferta encaja con la experiencia del temporero (y con su necesidad de cama)?
function encaja(t, o) {
  if (!t.sectores.includes(o.sector)) return false;
  if (t.necesitaAlojamiento && !o.alojamiento.incluido) return false;
  return o.sector !== 'agricultura' || !o.cultivoId || t.experiencia.includes(o.cultivoId);
}

const tramoDeOferta = (o, desde) => ({ inicio: desde > o.inicio ? desde : o.inicio, fin: o.fin, puebloId: o.puebloId, empleadorId: o.empleadorId, sector: o.sector, tarea: o.titulo });

// Camino propuesto: ofertas de la red que encajan, encadenadas sin solaparse (empieza por su contrato, si lo tiene)
function caminoPropuesto(t) {
  const tramos = [];
  let libreDesde = t.disponibleDesde > HOY ? t.disponibleDesde : HOY;
  const actual = t.ofertaId && estado.ofertas.find((o) => o.id === t.ofertaId);
  if (actual) { tramos.push(tramoDeOferta(actual, actual.inicio)); libreDesde = sumarDias(actual.fin, 1); }
  const candidatas = estado.ofertas.filter((o) => o !== actual && o.fin >= libreDesde && encaja(t, o)).sort((a, b) => a.inicio.localeCompare(b.inicio));
  for (const o of candidatas) {
    if (o.fin < libreDesde || (tramos.length && o.inicio < libreDesde)) continue;
    tramos.push(tramoDeOferta(o, libreDesde));
    libreDesde = sumarDias(o.fin, 1);
  }
  return tramos;
}

// Camino anual (acordado o propuesto) con meses y días de trabajo
export function caminoAnual(temporeroId) {
  const t = estado.temporeros.find((x) => x.id === temporeroId);
  if (!t) return null;
  const acordado = estado.caminos[temporeroId];
  const tramos = acordado ? acordado : caminoPropuesto(t);
  const meses = new Set();
  for (const tr of tramos) for (let f = tr.inicio; f <= tr.fin; f = sumarDias(f, 1)) meses.add(f.slice(0, 7));
  const diasTrabajo = tramos.reduce((s, tr) => s + diasLaborables(tr.inicio, tr.fin), 0);
  return { temporeroId, propuesto: !acordado, tramos, mesesConTrabajo: meses.size, diasTrabajo };
}

export async function getCaminoAnual(temporeroId) {
  await espera();
  const camino = caminoAnual(temporeroId);
  if (!camino) return { ok: false, error: 'Temporero no encontrado' };
  return copia(camino);
}
