// Previsión simulada de 10 días desde HOY (noviembre en el Camp de Tarragona). Determinista.
// Lluvia mar 17 y mié 18, mestral vie 20. aptoCosecha se calcula en services/weather.js.
export const PREVISION_BASE = [
  { fecha: '2026-11-14', tMax: 18, tMin: 8, lluviaProb: 5, lluviaMm: 0, vientoKmh: 10, cielo: 'sol' },
  { fecha: '2026-11-15', tMax: 17, tMin: 7, lluviaProb: 10, lluviaMm: 0, vientoKmh: 12, cielo: 'nubes' },
  { fecha: '2026-11-16', tMax: 16, tMin: 9, lluviaProb: 35, lluviaMm: 0.5, vientoKmh: 15, cielo: 'nubes' },
  { fecha: '2026-11-17', tMax: 14, tMin: 9, lluviaProb: 80, lluviaMm: 12, vientoKmh: 20, cielo: 'lluvia' },
  { fecha: '2026-11-18', tMax: 15, tMin: 8, lluviaProb: 60, lluviaMm: 4, vientoKmh: 18, cielo: 'lluvia' },
  { fecha: '2026-11-19', tMax: 16, tMin: 6, lluviaProb: 15, lluviaMm: 0, vientoKmh: 25, cielo: 'nubes' },
  { fecha: '2026-11-20', tMax: 15, tMin: 4, lluviaProb: 0, lluviaMm: 0, vientoKmh: 55, cielo: 'sol' }, // mestral
  { fecha: '2026-11-21', tMax: 16, tMin: 5, lluviaProb: 0, lluviaMm: 0, vientoKmh: 30, cielo: 'sol' },
  { fecha: '2026-11-22', tMax: 18, tMin: 6, lluviaProb: 5, lluviaMm: 0, vientoKmh: 12, cielo: 'niebla' },
  { fecha: '2026-11-23', tMax: 19, tMin: 7, lluviaProb: 10, lluviaMm: 0, vientoKmh: 10, cielo: 'sol' }
];

// Pequeña variación de temperatura por pueblo (°C). Lluvia y viento iguales en toda la red.
export const AJUSTE_TEMPERATURA = { 'vila-rodona': 0, aiguamurcia: -1, montferri: 1, brafim: 0, vilabella: 1 };
