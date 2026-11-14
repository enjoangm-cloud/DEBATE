// Servicio simulado v3 · ESPAÑA: redes comarcales, arquetipos y corredor nacional de temporadas.
// En producción: Google Maps Platform (mapa nacional de redes, geocodificación) + datos del MAPA;
// el corredor lo encadenaría Vertex AI (Gemini) con Google Maps (Routes API) para las distancias.
import { espera, copia } from './comun.js';
import { ESPANA_DATOS, ARQUETIPOS, REDES_ESPANA, COMO_CREAR_RED, CORREDOR } from '../data/espana.js';

export async function getEspana() {
  await espera();
  return copia({ ...ESPANA_DATOS, redes: REDES_ESPANA, arquetipos: ARQUETIPOS, comoCrearRed: COMO_CREAR_RED });
}

export async function getCorredor() {
  await espera();
  return copia(CORREDOR);
}
