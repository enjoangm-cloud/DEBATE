// Servicio simulado de MAPAS.
// En producción: Google Maps Platform — Places API (lugares) y Routes API (rutas de la furgoneta compartida).
import { estado } from './estado.js';
import { espera, copia, enPueblo } from './comun.js';

const TIPOS = ['alojamiento', 'empleador', 'comercio', 'recogida', 'servicio', 'patrimonio'];

// Todos los lugares del mapa: fijos + empleadores + alojamientos (siempre del estado actual)
export function lugaresActuales() {
  const empleadores = estado.empleadores.map((e) => ({ id: 'lug-' + e.id, puebloId: e.puebloId, tipo: 'empleador', nombre: e.nombre,
    lat: e.lat, lng: e.lng, descripcion: e.descripcion, empleadorId: e.id, sector: e.sector, tipoEmpleador: e.tipo }));
  const alojamientos = estado.alojamientos.map((a) => ({ ...a, tipo: 'alojamiento' }));
  return [...alojamientos, ...empleadores, ...estado.lugares];
}

// getLugares({ puebloId, tipo }) — por compatibilidad v1 acepta getLugares('alojamiento') o getLugares('montferri')
export async function getLugares(arg) {
  await espera();
  let { puebloId, tipo } = typeof arg === 'string' ? (TIPOS.includes(arg) ? { tipo: arg } : { puebloId: arg }) : arg || {};
  return copia(lugaresActuales().filter((l) => enPueblo(l, puebloId) && (!tipo || l.tipo === tipo)));
}

// Rutas que pasan por el pueblo (o todas)
export async function getRutas(puebloId) {
  await espera();
  return copia(estado.rutas.filter((r) => !puebloId || puebloId === 'red' || r.pueblos.includes(puebloId)));
}
