// ÚNICO punto de entrada del backend simulado (ver docs/contrato-api.md, v2).
// Todo es simulado: ninguna función llama a APIs reales. FUENTES indica qué API la sustituiría.
export { HOY } from './data/red.js';
export { getRed, getPueblos, getPueblo, getSectores } from './services/red.js';
export { getCalendario, getTemporadaAnual, getOfertas, getTemporeros, solicitarOferta, getSolicitudes, decidirEmparejamiento, getCaminoAnual } from './services/campana.js';
export { getPrevision, getAlertas } from './services/weather.js';
export { getLugares, getRutas } from './services/maps.js';
export { getEmpleadores, getFincas, reservarCompra } from './services/business.js';
export { getAlojamientos, getViviendasParaEmpleadores, alquilarVivienda, verificarAlojamiento } from './services/vivienda.js';
export { getAyudaMutua, aceptarAyuda } from './services/ayuda.js';
export { getExperiencias, reservarExperiencia } from './services/turismo.js';
export { getEmparejamientosIA, getIdiomas, traducir, getTextos } from './services/vertex.js';
export { getTramites } from './services/tramites.js';
export { getIndicadores } from './services/indicadores.js';

// Fuente que usaría cada función en producción
export const FUENTES = {
  getRed: 'Datos municipales (INE) + Google Maps Platform',
  getPueblos: 'Datos municipales (INE 2024–2025) + Google Maps Platform',
  getPueblo: 'Datos municipales (INE) + Google Maps',
  getSectores: 'Configuración de la red',
  getCalendario: 'Google Weather API + criterio del agrónomo',
  getTemporadaAnual: 'Vertex AI (Gemini) a partir de ofertas y campañas de años anteriores',
  getPrevision: 'Google Weather API (previsión diaria)',
  getAlertas: 'Google Weather API + Vertex AI (Gemini) redacta el mensaje sencillo',
  getLugares: 'Google Maps Platform (Places API) + Google Business Profile',
  getRutas: 'Google Maps Platform (Routes API)',
  getEmpleadores: 'Google Business Profile (fichas y productos)',
  getFincas: 'Google Business Profile (fichas y productos)',
  getOfertas: 'Google Business Profile (publicaciones)',
  getAlojamientos: 'Google Business Profile + Google Maps (Places) + registro del ayuntamiento',
  getViviendasParaEmpleadores: 'Google Business Profile (casas rurales) + Google Maps (Places)',
  alquilarVivienda: 'Base de datos propia (contrato entre propietario y empleador)',
  verificarAlojamiento: 'Base de datos propia (visita del ayuntamiento)',
  getTemporeros: 'Base de datos propia de la red',
  solicitarOferta: 'Base de datos propia',
  getSolicitudes: 'Base de datos propia',
  getEmparejamientosIA: 'Vertex AI (Gemini) propone; decide el dinamizador',
  decidirEmparejamiento: 'Base de datos propia (decisión humana)',
  getCaminoAnual: 'Vertex AI (Gemini) encadena ofertas + Google Maps (distancias)',
  getAyudaMutua: 'Google Weather API + Vertex AI (Gemini) propone; decide el dinamizador',
  aceptarAyuda: 'Base de datos propia (decisión humana)',
  getExperiencias: 'Google Business Profile + Google Weather API (días aptos)',
  reservarExperiencia: 'Google Business Profile (reservas)',
  getIdiomas: 'Configuración de la app',
  traducir: 'Vertex AI (Gemini) traducción',
  getTextos: 'Vertex AI (Gemini) traducción',
  getTramites: 'Google Forms / Drive',
  reservarCompra: 'Google Business Profile',
  getIndicadores: 'Cálculo propio sobre el estado de la red'
};
