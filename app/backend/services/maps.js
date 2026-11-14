// Servicio simulado de MAPAS.
// En producción: Google Maps Platform — Places API (lugares) y Routes API (rutas de furgoneta).
import { estado } from './estado.js';
import { espera, copia } from './comun.js';

// Lista de lugares, opcionalmente filtrada por tipo
export async function getLugares(tipo) {
  await espera();
  const lista = tipo ? estado.lugares.filter((l) => l.tipo === tipo) : estado.lugares;
  return copia(lista);
}

export async function getRutas() {
  await espera();
  return copia(estado.rutas);
}
