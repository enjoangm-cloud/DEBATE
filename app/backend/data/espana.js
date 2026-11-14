// Datos v3 · España: redes comarcales (arquetipos), cifras reales y corredor nacional de temporadas.
// Solo cifras reales citadas en docs/contrato-api.md (v3). Las redes que no son el Gaià son
// EJEMPLOS DE PLANTILLA: textos genéricos, sin cifras de habitantes ni nombres de pueblos inventados.

export const ESPANA_DATOS = {
  municipiosPequenos: 6329,
  pctMunicipios: 77.8,
  pctPoblacion: 9,
  fuente: 'MAPA, Informe Anual de Indicadores 2025'
};

export const ARQUETIPOS = [
  {
    id: 'agricola-turismo', nombre: 'Agrícola + turismo rural', emoji: '🍇', color: '#7b3f8c',
    sectores: ['Agricultura (viña, olivo, almendro)', 'Bodega', 'Turismo rural', 'Hostelería', 'Forestal'],
    ejemploRedId: 'red-gaia',
    problema: 'Las cosechas dan picos de trabajo cortos y dejan meses con poco trabajo.',
    comoAyuda: 'Combina sectores y pueblos vecinos para que haya trabajo encadenado todo el año.'
  },
  {
    id: 'nieve-montana', nombre: 'Nieve y montaña', emoji: '🏔️', color: '#2f6fb0',
    sectores: ['Estación de esquí', 'Hostelería', 'Turismo de montaña'],
    ejemploRedId: 'red-tena',
    problema: 'En el Pirineo aragonés falta vivienda para los trabajadores de temporada.',
    comoAyuda: 'Une la temporada de invierno con la de verano y ayuda a los empleadores a encontrar vivienda para su equipo.'
  },
  {
    id: 'ganaderia-ovina', nombre: 'Ganadería ovina y quesería', emoji: '🐑', color: '#a0702a',
    sectores: ['Ganadería ovina', 'Quesería', 'Esquileo'],
    ejemploRedId: 'red-tajo-salor',
    problema: 'Faltan relevos: quedan entre 80.000 y 90.000 pastores de ovino y caprino (estimaciones, 2026).',
    comoAyuda: 'Conecta a jóvenes con formación, primeras temporadas y rebaños o queserías cuyo dueño se jubila.'
  },
  {
    id: 'forestal-resina', nombre: 'Forestal y resina', emoji: '🌲', color: '#2e7d4f',
    sectores: ['Resinación', 'Trabajos forestales'],
    ejemploRedId: 'red-pinares',
    problema: 'La resina se trabaja de abril a octubre; el resto del año hay que encadenar otras tareas.',
    comoAyuda: 'Encadena la resina con los trabajos forestales de invierno y con temporadas de otras redes.'
  },
  {
    id: 'olivar', nombre: 'Olivar', emoji: '🫒', color: '#6b8e23',
    sectores: ['Recogida de aceituna', 'Poda', 'Almazara'],
    ejemploRedId: 'red-magina',
    problema: 'Mucha mano de obra de noviembre a febrero y poca el resto del año.',
    comoAyuda: 'Ofrece a quien recoge la aceituna seguir con la poda y otras temporadas del corredor.'
  }
];

export const REDES_ESPANA = [
  {
    id: 'red-gaia', nombre: 'Red del Gaià', provincia: 'Tarragona', comunidad: 'Cataluña', arquetipoId: 'agricola-turismo',
    lat: 41.30, lng: 1.35, esDemo: true,
    sectores: ['Agricultura', 'Turismo rural', 'Hostelería', 'Bodega', 'Forestal'],
    temporadas: [
      { mesInicio: 1, mesFin: 3, texto: 'Poda de viña y trabajos forestales' },
      { mesInicio: 4, mesFin: 6, texto: 'Tratamientos en el campo y turismo de primavera' },
      { mesInicio: 7, mesFin: 8, texto: 'Turismo rural y hostelería' },
      { mesInicio: 9, mesFin: 10, texto: 'Vendimia y bodega' },
      { mesInicio: 11, mesFin: 12, texto: 'Oliva' }
    ],
    pueblosEjemplo: ['Vila-rodona', 'Aiguamúrcia', 'Montferri', 'Bràfim', 'Vilabella'],
    destacado: 'Red de demostración completa: 5 pueblos reales del Alt Camp con trabajo todo el año.'
  },
  {
    id: 'red-tena', nombre: 'Valle de Tena (ejemplo)', provincia: 'Huesca', comunidad: 'Aragón', arquetipoId: 'nieve-montana',
    lat: 42.76, lng: -0.33, esDemo: false,
    sectores: ['Estación de esquí', 'Hostelería', 'Turismo de montaña'],
    temporadas: [
      { mesInicio: 12, mesFin: 4, texto: 'Esquí' },
      { mesInicio: 7, mesFin: 8, texto: 'Montaña' }
    ],
    pueblosEjemplo: ['Sallent de Gállego', 'Panticosa'],
    destacado: 'Panticosa construye vivienda pública para trabajadores de temporada (programa "Más Vivienda, Mejor Turismo").'
  },
  {
    id: 'red-tajo-salor', nombre: 'Tajo-Salor-Almonte (ejemplo)', provincia: 'Cáceres', comunidad: 'Extremadura', arquetipoId: 'ganaderia-ovina',
    lat: 39.56, lng: -6.42, esDemo: false,
    sectores: ['Ganadería ovina', 'Quesería', 'Esquileo'],
    temporadas: [
      { mesInicio: 1, mesFin: 12, texto: 'Cuidado del rebaño todo el año' },
      { mesInicio: 3, mesFin: 5, texto: 'Partos y queso' },
      { mesInicio: 5, mesFin: 6, texto: 'Esquileo' }
    ],
    pueblosEjemplo: [],
    destacado: '2026 es el Año Internacional de los Pastizales y los Pastores (ONU).'
  },
  {
    id: 'red-pinares', nombre: 'Tierra de Pinares (ejemplo)', provincia: 'Segovia', comunidad: 'Castilla y León', arquetipoId: 'forestal-resina',
    lat: 41.20, lng: -4.43, esDemo: false,
    sectores: ['Resinación', 'Trabajos forestales'],
    temporadas: [
      { mesInicio: 4, mesFin: 10, texto: 'Resina' },
      { mesInicio: 11, mesFin: 3, texto: 'Trabajos forestales' }
    ],
    pueblosEjemplo: [],
    destacado: 'Plantilla de ejemplo: resina en temporada y trabajos forestales en invierno.'
  },
  {
    id: 'red-magina', nombre: 'Sierra Mágina (ejemplo)', provincia: 'Jaén', comunidad: 'Andalucía', arquetipoId: 'olivar',
    lat: 37.80, lng: -3.40, esDemo: false,
    sectores: ['Recogida de aceituna', 'Poda', 'Almazara'],
    temporadas: [
      { mesInicio: 11, mesFin: 2, texto: 'Aceituna' },
      { mesInicio: 3, mesFin: 4, texto: 'Poda' }
    ],
    pueblosEjemplo: [],
    destacado: 'Plantilla de ejemplo: campaña de aceituna en invierno y poda en primavera.'
  }
];

export const COMO_CREAR_RED = [
  'Varios pueblos vecinos de < 5.000 hab. de la misma comarca deciden unirse.',
  'Eligen el arquetipo que mejor encaja con su economía (o combinan varios).',
  'Apuntan sus temporadas: qué trabajo hay cada mes y en qué sector.',
  'Los empleadores dan de alta sus ofertas y la vivienda que ponen para sus trabajadores.',
  'Cada ayuntamiento nombra a una persona que verifica las viviendas.',
  'La red comparte un dinamizador que revisa las propuestas de la IA y decide.',
  'La red se conecta al corredor nacional para encadenar temporadas con otras redes.'
];

// Corredor nacional: ruta de EJEMPLO de 12 meses, consecutivos, sin huecos ni solapes (dic → nov).
export const CORREDOR = {
  titulo: 'Corredor nacional de temporadas: 12 meses de trabajo',
  persona: '(ejemplo)',
  tramos: [
    { mesInicio: 12, mesFin: 4, redId: 'red-tena', sector: 'Nieve y montaña', tarea: 'Temporada de esquí: estación y hostelería', viviendaDe: 'estación' },
    { mesInicio: 5, mesFin: 6, redId: 'red-tajo-salor', sector: 'Ganadería ovina', tarea: 'Esquileo y quesería', viviendaDe: 'empleador' },
    { mesInicio: 7, mesFin: 8, redId: 'red-pinares', sector: 'Forestal y resina', tarea: 'Resinación', viviendaDe: 'empleador' },
    { mesInicio: 9, mesFin: 10, redId: 'red-gaia', sector: 'Bodega', tarea: 'Vendimia y bodega', viviendaDe: 'empleador' },
    { mesInicio: 11, mesFin: 11, redId: 'red-gaia', sector: 'Agricultura', tarea: 'Oliva (también hay campaña en Sierra Mágina)', viviendaDe: 'empleador' }
  ],
  meses: 12,
  nota: 'Ruta de ejemplo. Cada tramo tiene su contrato y la vivienda la pone quien contrata: 0 € para la persona trabajadora.'
};
