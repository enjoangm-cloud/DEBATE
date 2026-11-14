// Utilidades comunes de la simulación: latencia y copias.
const LATENCIAS = [120, 180, 150, 210, 140, 230, 110, 190]; // ms, ciclo determinista
let turno = 0;

// Latencia simulada (100–250 ms) para que la demo parezca una llamada real
export function espera() {
  const ms = LATENCIAS[turno++ % LATENCIAS.length];
  return new Promise((r) => setTimeout(r, ms));
}

// Copia profunda: el frontend nunca recibe referencias al estado interno
export const copia = (x) => structuredClone(x);

// Días entre dos fechas ISO (b - a)
export function dias(a, b) {
  return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86400000);
}

// Nombre del día de la semana en castellano
const NOMBRES_DIA = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
export const nombreDia = (fecha) => NOMBRES_DIA[new Date(fecha + 'T12:00:00Z').getUTCDay()];

// Suma n días a una fecha ISO
export const sumarDias = (f, n) => new Date(Date.parse(f + 'T12:00:00Z') + n * 86400000).toISOString().slice(0, 10);

// Filtro de pueblo: undefined, null o 'red' = toda la red
export const enPueblo = (x, puebloId) => !puebloId || puebloId === 'red' || x.puebloId === puebloId;

// Acepta ({ puebloId, ... }) o, por compatibilidad, un texto con el puebloId
export const opciones = (arg) => (typeof arg === 'string' ? { puebloId: arg } : arg || {});

// Días de trabajo (lunes–sábado) entre dos fechas, opcionalmente sin los días no aptos
export function diasLaborables(inicio, fin, noAptos = new Set()) {
  let n = 0;
  for (let f = inicio; f <= fin; f = sumarDias(f, 1)) {
    if (new Date(f + 'T12:00:00Z').getUTCDay() !== 0 && !noAptos.has(f)) n++;
  }
  return n;
}
