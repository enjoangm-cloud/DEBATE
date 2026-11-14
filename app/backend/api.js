// ÚNICO punto de entrada del backend simulado (ver docs/contrato-api.md).
// Todo es simulado: ninguna función llama a APIs reales. FUENTES indica qué API la sustituiría.
export { HOY } from './data/pueblo.js';
export { getPueblo, getCalendario, getOfertas, getTemporeros, solicitarOferta, getSolicitudes, decidirEmparejamiento } from './services/campana.js';
export { getPrevision, getAlertas } from './services/weather.js';
export { getLugares, getRutas } from './services/maps.js';
export { getFincas, reservarCompra } from './services/business.js';
export { getEmparejamientosIA, getIdiomas, traducir, getTextos } from './services/vertex.js';
export { getTramites } from './services/tramites.js';
export { getIndicadores } from './services/indicadores.js';

// Fuente que usaría cada función en producción
export const FUENTES = {
  getPueblo: 'Datos municipales (INE 2025) + Google Maps',
  getCalendario: 'Google Weather API + criterio del agrónomo',
  getPrevision: 'Google Weather API (previsión diaria)',
  getAlertas: 'Google Weather API + Vertex AI (Gemini) redacta el mensaje sencillo',
  getLugares: 'Google Maps Platform (Places API) + Google Business Profile',
  getRutas: 'Google Maps Platform (Routes API)',
  getFincas: 'Google Business Profile (fichas y productos)',
  getOfertas: 'Google Business Profile (publicaciones)',
  getTemporeros: 'Base de datos propia del Ajuntament',
  solicitarOferta: 'Base de datos propia',
  getSolicitudes: 'Base de datos propia',
  getEmparejamientosIA: 'Vertex AI (Gemini) propone; decide el dinamizador',
  decidirEmparejamiento: 'Base de datos propia (decisión humana)',
  getIdiomas: 'Configuración de la app',
  traducir: 'Vertex AI (Gemini) traducción',
  getTextos: 'Vertex AI (Gemini) traducción',
  getTramites: 'Google Forms / Drive',
  reservarCompra: 'Google Business Profile',
  getIndicadores: 'Cálculo propio sobre el estado de la campaña'
};
