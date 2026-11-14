// Servicio simulado de TRÁMITES (guías paso a paso).
// En producción: Google Forms / Drive (formularios y documentos compartidos por el Ajuntament).
import { espera, copia } from './comun.js';
import { TRAMITES } from '../data/tramites.js';

export async function getTramites() {
  await espera();
  return copia(TRAMITES);
}
