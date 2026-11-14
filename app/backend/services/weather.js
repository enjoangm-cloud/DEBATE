// Servicio simulado del TIEMPO.
// En producción: Google Weather API (forecast daily) + Vertex AI (Gemini) para el texto sencillo.
import { estado } from './estado.js';
import { espera, copia, nombreDia } from './comun.js';
import { redactarAlerta } from './vertex.js';
import { AJUSTE_TEMPERATURA } from '../data/prevision.js';

// Umbrales para decidir si se puede trabajar en el campo (vareo, poda)
const LLUVIA_PROB_MAX = 50; // %
const LLUVIA_MM_MAX = 2;    // mm
const VIENTO_MAX = 40;      // km/h

const esApto = (d) => d.lluviaProb < LLUVIA_PROB_MAX && d.lluviaMm < LLUVIA_MM_MAX && d.vientoKmh < VIENTO_MAX;

// Previsión síncrona de un pueblo (la usan otros servicios). ±1 °C según el pueblo; lluvia y viento iguales.
export function previsionActual(puebloId = 'vila-rodona') {
  const ajuste = AJUSTE_TEMPERATURA[puebloId] ?? 0;
  return estado.prevision.map((d) => ({ ...d, puebloId: AJUSTE_TEMPERATURA[puebloId] === undefined ? 'vila-rodona' : puebloId,
    tMax: d.tMax + ajuste, tMin: d.tMin + ajuste, aptoCosecha: esApto(d) }));
}

// Fechas aptas para el campo (iguales en toda la red)
export const fechasAptas = () => new Set(previsionActual().filter((d) => d.aptoCosecha).map((d) => d.fecha));

export async function getPrevision(puebloId = 'vila-rodona') {
  await espera();
  return copia(previsionActual(puebloId));
}

// Alertas de un pueblo (dato técnico + mensaje humano + acción)
function alertasPueblo(puebloId) {
  const alertas = [];
  for (const d of previsionActual(puebloId)) {
    const dia = nombreDia(d.fecha);
    const base = { fecha: d.fecha, puebloId };
    if (d.lluviaProb >= LLUVIA_PROB_MAX || d.lluviaMm >= LLUVIA_MM_MAX) {
      alertas.push({ id: `alerta-lluvia-${d.fecha}`, tipo: 'lluvia', ...base, nivel: d.lluviaMm >= 10 ? 'importante' : 'aviso',
        datoTecnico: `Lluvia ${d.lluviaProb} %, ${d.lluviaMm} mm`, ...redactarAlerta('lluvia', d, dia) });
    }
    if (d.vientoKmh >= VIENTO_MAX) {
      alertas.push({ id: `alerta-viento-${d.fecha}`, tipo: 'viento', ...base, nivel: d.vientoKmh >= 50 ? 'importante' : 'aviso',
        datoTecnico: `Viento del noroeste (mestral) ${d.vientoKmh} km/h`, ...redactarAlerta('viento', d, dia) });
    }
    if (d.tMin <= 0) {
      alertas.push({ id: `alerta-helada-${d.fecha}`, tipo: 'helada', ...base, nivel: 'aviso',
        datoTecnico: `Mínima ${d.tMin} °C`, ...redactarAlerta('helada', d, dia) });
    }
    if (d.tMax >= 30) {
      alertas.push({ id: `alerta-calor-${d.fecha}`, tipo: 'calor', ...base, nivel: 'importante',
        datoTecnico: `Máxima ${d.tMax} °C`, ...redactarAlerta('calor', d, dia) });
    }
  }
  return alertas;
}

// Con filtro: alertas de ese pueblo (id con sufijo del pueblo). Sin filtro: una alerta por aviso;
// si afecta a los 5 pueblos lleva puebloId 'red', si no, una por pueblo afectado. pueblos = afectados.
export function alertasActuales(puebloId) {
  const ids = estado.pueblos.map((p) => p.id);
  if (puebloId && puebloId !== 'red') {
    return alertasPueblo(puebloId).map((a) => ({ ...a, id: `${a.id}-${puebloId}`, pueblos: [puebloId] }));
  }
  const grupos = new Map();
  for (const id of ids) for (const a of alertasPueblo(id)) {
    if (!grupos.has(a.id)) grupos.set(a.id, []);
    grupos.get(a.id).push(a);
  }
  const lista = [];
  for (const [gid, alertas] of grupos) {
    const pueblos = alertas.map((a) => a.puebloId);
    if (pueblos.length === ids.length) lista.push({ ...alertas[0], puebloId: 'red', pueblos });
    else alertas.forEach((a) => lista.push({ ...a, id: `${gid}-${a.puebloId}`, pueblos: [a.puebloId] }));
  }
  return lista.sort((a, b) => a.fecha.localeCompare(b.fecha));
}

export async function getAlertas(puebloId) {
  await espera();
  return copia(alertasActuales(puebloId));
}
