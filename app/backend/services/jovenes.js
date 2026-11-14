// Servicio simulado v3 · JÓVENES: ruta de arraigo, oportunidades y recomendación de red.
// En producción: Vertex AI (Gemini) recomendaría la red a partir de las respuestas;
// las oportunidades y las inscripciones irían en la base de datos propia (+ Google Business Profile para negocios).
import { espera, copia } from './comun.js';
import { DATOS_JOVENES, PASOS_ARRAIGO, PREGUNTAS, OPORTUNIDADES } from '../data/jovenes.js';
import { ARQUETIPOS, REDES_ESPANA } from '../data/espana.js';

// Estado en memoria (plazas bajan al apuntarse)
const oportunidades = structuredClone(OPORTUNIDADES);
let inscripciones = 0;

const arquetipoDeRed = (redId) => REDES_ESPANA.find((r) => r.id === redId)?.arquetipoId;

export async function getJovenes() {
  await espera();
  return copia({ datos: DATOS_JOVENES, pasos: PASOS_ARRAIGO, preguntas: PREGUNTAS });
}

// Filtro opcional por arquetipo (el de la red de cada oportunidad)
export async function getOportunidadesJovenes(arquetipoId) {
  await espera();
  return copia(arquetipoId ? oportunidades.filter((o) => arquetipoDeRed(o.redId) === arquetipoId) : oportunidades);
}

// respuestas: { [preguntaId]: opcionId }. Cuenta votos por arquetipo; empate (o sin votos) → red del Gaià.
export async function recomendarRed(respuestas) {
  await espera();
  if (!respuestas || typeof respuestas !== 'object' || Array.isArray(respuestas)) return { ok: false, error: 'Respuestas no válidas' };
  const votos = Object.fromEntries(ARQUETIPOS.map((a) => [a.id, 0]));
  for (const [preguntaId, opcionId] of Object.entries(respuestas)) {
    const p = PREGUNTAS.find((x) => x.id === preguntaId);
    if (!p) return { ok: false, error: `Pregunta desconocida: ${String(preguntaId)}` };
    const o = p.opciones.find((x) => x.id === opcionId);
    if (!o) return { ok: false, error: `Opción no válida para ${preguntaId}` };
    o.arquetipos.forEach((a) => { votos[a]++; });
  }
  const max = Math.max(...Object.values(votos));
  const ganadores = Object.keys(votos).filter((a) => votos[a] === max);
  const empate = max === 0 || ganadores.length > 1;
  const arquetipo = ARQUETIPOS.find((a) => a.id === (empate ? 'agricola-turismo' : ganadores[0]));
  const red = REDES_ESPANA.find((r) => r.id === (empate ? 'red-gaia' : arquetipo.ejemploRedId));
  const motivo = empate
    ? 'Tus respuestas encajan con varias redes. Te proponemos empezar en la Red del Gaià: tiene trabajo todo el año en varios sectores.'
    : `Tus respuestas encajan con el arquetipo "${arquetipo.nombre}" (${max} coincidencias). Red de ejemplo: ${red.nombre}.`;
  return copia({ ok: true, arquetipoId: arquetipo.id, redId: red.id, motivo, oportunidades: oportunidades.filter((o) => o.redId === red.id).map((o) => o.id) });
}

export async function apuntarseOportunidad(id, nombre) {
  await espera();
  const o = oportunidades.find((x) => x.id === id);
  if (!o) return { ok: false, error: 'Oportunidad no encontrada' };
  const n = typeof nombre === 'string' ? nombre.trim() : '';
  if (!n) return { ok: false, error: 'Escribe tu nombre' };
  if (n.length > 60) return { ok: false, error: 'El nombre no puede pasar de 60 caracteres' };
  if (o.plazas <= 0) return { ok: false, error: 'No quedan plazas' };
  o.plazas--;
  inscripciones++;
  return { ok: true, codigo: `JOV-${String(inscripciones).padStart(3, '0')}` };
}
