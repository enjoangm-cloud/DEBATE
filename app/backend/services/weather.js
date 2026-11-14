// Servicio simulado del TIEMPO.
// En producción: Google Weather API (forecast daily) + Vertex AI (Gemini) para el texto sencillo.
import { estado } from './estado.js';
import { espera, copia, nombreDia } from './comun.js';
import { redactarAlerta } from './vertex.js';

// Umbrales para decidir si se puede varear la oliva
const LLUVIA_PROB_MAX = 50; // %
const LLUVIA_MM_MAX = 2;    // mm
const VIENTO_MAX = 40;      // km/h

const esApto = (d) => d.lluviaProb < LLUVIA_PROB_MAX && d.lluviaMm < LLUVIA_MM_MAX && d.vientoKmh < VIENTO_MAX;

// Previsión síncrona (la usan otros servicios)
export function previsionActual() {
  return estado.prevision.map((d) => ({ ...d, aptoCosecha: esApto(d) }));
}

export async function getPrevision() {
  await espera();
  return copia(previsionActual());
}

// Alertas derivadas de la previsión (dato técnico + mensaje humano + acción)
export function alertasActuales() {
  const alertas = [];
  for (const d of previsionActual()) {
    const dia = nombreDia(d.fecha);
    if (d.lluviaProb >= LLUVIA_PROB_MAX || d.lluviaMm >= LLUVIA_MM_MAX) {
      alertas.push({ id: `alerta-lluvia-${d.fecha}`, tipo: 'lluvia', fecha: d.fecha, nivel: d.lluviaMm >= 10 ? 'importante' : 'aviso',
        datoTecnico: `Lluvia ${d.lluviaProb} %, ${d.lluviaMm} mm`, ...redactarAlerta('lluvia', d, dia) });
    }
    if (d.vientoKmh >= VIENTO_MAX) {
      alertas.push({ id: `alerta-viento-${d.fecha}`, tipo: 'viento', fecha: d.fecha, nivel: d.vientoKmh >= 50 ? 'importante' : 'aviso',
        datoTecnico: `Viento del noroeste (mestral) ${d.vientoKmh} km/h`, ...redactarAlerta('viento', d, dia) });
    }
    if (d.tMin <= 0) {
      alertas.push({ id: `alerta-helada-${d.fecha}`, tipo: 'helada', fecha: d.fecha, nivel: 'aviso',
        datoTecnico: `Mínima ${d.tMin} °C`, ...redactarAlerta('helada', d, dia) });
    }
    if (d.tMax >= 30) {
      alertas.push({ id: `alerta-calor-${d.fecha}`, tipo: 'calor', fecha: d.fecha, nivel: 'importante',
        datoTecnico: `Máxima ${d.tMax} °C`, ...redactarAlerta('calor', d, dia) });
    }
  }
  return alertas;
}

export async function getAlertas() {
  await espera();
  return copia(alertasActuales());
}
