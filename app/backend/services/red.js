// Servicio simulado de la RED DE PUEBLOS: red, pueblos y sectores.
// En producción: datos municipales (INE) + Google Maps Platform (geocodificación y mapa base).
import { estado } from './estado.js';
import { espera, copia } from './comun.js';
import { SECTORES } from '../data/red.js';

export async function getRed() {
  await espera();
  return copia({ ...estado.red, pueblos: estado.pueblos, dinamizador: estado.dinamizador });
}

export async function getPueblos() {
  await espera();
  return copia(estado.pueblos);
}

// Compatibilidad v1: un pueblo (Vila-rodona por defecto) con el dinamizador de la red
export async function getPueblo(puebloId = 'vila-rodona') {
  await espera();
  const p = estado.pueblos.find((x) => x.id === puebloId) || estado.pueblos[0];
  return copia({ ...p, dinamizador: estado.dinamizador });
}

export async function getSectores() {
  await espera();
  return copia(SECTORES);
}
