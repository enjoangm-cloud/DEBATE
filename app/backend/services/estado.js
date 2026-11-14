// Estado en memoria de la demo. Se copia de data/ al cargar y se modifica con las acciones
// (solicitudes, decisiones, alquileres, verificaciones, ayudas y reservas). Dura mientras la página está abierta.
import { HOY, RED, PUEBLOS, DINAMIZADOR } from '../data/red.js';
import { CALENDARIO } from '../data/calendario.js';
import { PREVISION_BASE } from '../data/prevision.js';
import { LUGARES } from '../data/lugares.js';
import { RUTAS } from '../data/rutas.js';
import { EMPLEADORES } from '../data/empleadores.js';
import { ALOJAMIENTOS } from '../data/alojamientos.js';
import { VIVIENDAS } from '../data/viviendas.js';
import { OFERTAS } from '../data/ofertas.js';
import { TEMPOREROS, SOLICITUDES } from '../data/temporeros.js';
import { EMPAREJAMIENTOS } from '../data/emparejamientos.js';
import { CAMINOS } from '../data/caminos.js';
import { AYUDA_MUTUA } from '../data/ayuda.js';
import { EXPERIENCIAS } from '../data/experiencias.js';

export { HOY };

const c = structuredClone;
export const estado = {
  red: c(RED),
  pueblos: c(PUEBLOS),
  dinamizador: c(DINAMIZADOR),
  calendario: c(CALENDARIO),
  prevision: c(PREVISION_BASE),
  lugares: c(LUGARES),         // solo comercio, recogida, servicio y patrimonio
  rutas: c(RUTAS),
  empleadores: c(EMPLEADORES),
  alojamientos: c(ALOJAMIENTOS),
  viviendas: c(VIVIENDAS),
  ofertas: c(OFERTAS),
  temporeros: c(TEMPOREROS),
  solicitudes: c(SOLICITUDES),
  emparejamientos: c(EMPAREJAMIENTOS),
  caminos: c(CAMINOS),
  ayudas: c(AYUDA_MUTUA),
  experiencias: c(EXPERIENCIAS),
  reservas: [],         // compra directa: { codigo, empleadorId, puebloId, items, total, kg, fecha }
  reservasTurismo: []   // { codigo, experienciaId, puebloId, fecha, personas, total }
};
