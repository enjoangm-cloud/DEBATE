// Servicio simulado de la CAMPAÑA: pueblo, calendario, ofertas, temporeros, solicitudes y emparejamientos.
// En producción: ofertas publicadas como posts de Google Business Profile; temporeros en base propia;
// calendario con Google Weather + criterio del agrónomo; emparejamientos propuestos por Vertex AI (Gemini).
import { estado, HOY } from './estado.js';
import { espera, copia } from './comun.js';

export async function getPueblo() {
  await espera();
  return copia(estado.pueblo);
}

// Estado de una etapa según la fecha de la demo
const estadoFechas = (inicio, fin) => (fin < HOY ? 'terminado' : inicio > HOY ? 'proximo' : 'en_curso');

// Calendario: la etapa en curso cuenta los confirmados a partir de las ofertas
export async function getCalendario() {
  await espera();
  return copia(estado.calendario.map((c) => {
    const est = estadoFechas(c.inicio, c.fin);
    let confirmados = c.trabajadoresConfirmados;
    if (est === 'en_curso') {
      confirmados = estado.ofertas
        .filter((o) => o.cultivoId === c.cultivoId && o.inicio <= c.fin && o.fin >= c.inicio)
        .reduce((s, o) => s + o.plazasCubiertas, 0);
    }
    return { ...c, estado: est, trabajadoresConfirmados: confirmados };
  }));
}

export async function getOfertas() {
  await espera();
  return copia(estado.ofertas);
}

export async function getTemporeros() {
  await espera();
  // ofertaId es un campo extra interno; se mantiene por utilidad
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

  // Aprobación: se comprueban plazas y cama antes de cambiar nada
  const oferta = estado.ofertas.find((o) => o.id === emp.ofertaId);
  const temporero = estado.temporeros.find((t) => t.id === emp.temporeroId);
  const aloj = emp.alojamientoId ? estado.lugares.find((l) => l.id === emp.alojamientoId) : null;
  if (!oferta || !temporero) return { ok: false, error: 'Datos incompletos' };
  if (temporero.estado === 'contratado') return { ok: false, error: 'El temporero ya tiene contrato' };
  if (oferta.plazasCubiertas >= oferta.plazas) return { ok: false, error: 'La oferta ya está completa' };
  if (emp.alojamientoId && (!aloj || aloj.plazasLibres <= 0)) return { ok: false, error: 'No quedan camas en ese alojamiento' };

  emp.estado = 'aprobado';
  oferta.plazasCubiertas += 1;
  if (aloj) aloj.plazasLibres -= 1;
  temporero.estado = 'contratado';
  temporero.ofertaId = oferta.id;
  // Su solicitud a esa oferta (si la había) queda aceptada
  for (const s of estado.solicitudes) if (s.temporeroId === temporero.id && s.ofertaId === oferta.id) s.estado = 'aceptada';
  // Otras propuestas para el mismo temporero dejan de tener sentido
  for (const e of estado.emparejamientos) if (e !== emp && e.temporeroId === temporero.id && e.estado === 'propuesto') e.estado = 'rechazado';
  return { ok: true, emparejamiento: copia(emp) };
}
