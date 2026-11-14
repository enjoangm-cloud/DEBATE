// Estado en memoria de la demo. Se copia de data/ al cargar y se modifica con las acciones
// (solicitudes, decisiones, reservas). Dura mientras la página está abierta.
import { HOY, PUEBLO } from '../data/pueblo.js';
import { CALENDARIO } from '../data/calendario.js';
import { PREVISION_BASE } from '../data/prevision.js';
import { LUGARES } from '../data/lugares.js';
import { RUTAS } from '../data/rutas.js';
import { FINCAS } from '../data/fincas.js';
import { OFERTAS } from '../data/ofertas.js';
import { TEMPOREROS, SOLICITUDES } from '../data/temporeros.js';
import { EMPAREJAMIENTOS } from '../data/emparejamientos.js';

export { HOY };

export const estado = {
  pueblo: structuredClone(PUEBLO),
  calendario: structuredClone(CALENDARIO),
  prevision: structuredClone(PREVISION_BASE),
  lugares: structuredClone(LUGARES),
  rutas: structuredClone(RUTAS),
  fincas: structuredClone(FINCAS),
  ofertas: structuredClone(OFERTAS),
  temporeros: structuredClone(TEMPOREROS),
  solicitudes: structuredClone(SOLICITUDES),
  emparejamientos: structuredClone(EMPAREJAMIENTOS),
  reservas: [] // { codigo, fincaId, items, total, kg, fecha }
};
