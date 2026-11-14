// Datos v3 · Jóvenes: cifras reales, ruta de arraigo, preguntas para recomendar red y oportunidades.
// Cifras: solo las reales de docs/contrato-api.md (v3). Negocios, fincas y cursos son ficticios "(ejemplo)".
// Las oportunidades del Gaià usan puebloId de v2; las de otras redes, puebloId null.

export const DATOS_JOVENES = [
  { cifra: '6.329', texto: 'municipios de España tienen menos de 5.000 habitantes: el 77,8 % de los municipios.', fuente: 'MAPA, Informe Anual de Indicadores 2025' },
  { cifra: '~9 %', texto: 'de la población de España vive en esos municipios.', fuente: 'MAPA, Informe Anual de Indicadores 2025' },
  { cifra: '1.000 €/mes', texto: 'brutos en las prácticas Campus Rural (~3 meses en municipios < 5.000 hab.).', fuente: 'Programa Campus Rural (MITECO + universidades públicas)' },
  { cifra: '750', texto: 'estudiantes de 44 universidades hicieron prácticas Campus Rural en 2025.', fuente: 'Programa Campus Rural (MITECO + universidades públicas)' },
  { cifra: '< 9 %', texto: 'de los titulares de explotaciones agrarias tienen menos de 41 años.', fuente: 'Censo Agrario 2020' },
  { cifra: '~41 %', texto: 'de los titulares de explotaciones agrarias tienen 65 años o más.', fuente: 'Censo Agrario 2020' },
  { cifra: '80.000–90.000', texto: 'pastores de ovino y caprino quedan en España.', fuente: 'Estimaciones, 2026' },
  { cifra: '2026', texto: 'es el Año Internacional de los Pastizales y los Pastores.', fuente: 'ONU' },
  { cifra: 'Panticosa', texto: 'construye vivienda pública para trabajadores de temporada: en el Pirineo aragonés falta vivienda para ellos.', fuente: 'Programa "Más Vivienda, Mejor Turismo"' }
];

export const PASOS_ARRAIGO = [
  {
    id: 'probar', titulo: 'Probar', duracion: '1–3 meses',
    queOfrece: [
      'Prácticas del programa Campus Rural (1.000 € brutos/mes, ~3 meses, municipios < 5.000 hab.)',
      'Una primera temporada con contrato en una red',
      'Vivienda a cargo de quien contrata: 0 € para ti'
    ],
    quienPaga: [
      'Prácticas: programa Campus Rural (MITECO + universidades públicas)',
      'Temporada: el empleador paga el salario y la vivienda'
    ]
  },
  {
    id: 'anyo', titulo: 'Año completo', duracion: '12 meses',
    queOfrece: [
      'Encadenar temporadas de varias redes con el corredor nacional',
      'Formación práctica en el oficio (poda, pastoreo, resina, montaña)',
      'Un dinamizador que te ayuda a pasar de un trabajo al siguiente'
    ],
    quienPaga: [
      'Cada empleador paga su tramo: salario y vivienda',
      'Los pueblos de la red comparten el coste del dinamizador'
    ]
  },
  {
    id: 'quedarse', titulo: 'Quedarse', duracion: 'A partir del segundo año',
    queOfrece: [
      'Vivienda estable de alquiler en el pueblo',
      'Relevo de un negocio o explotación cuyo dueño se jubila',
      'Apoyo para emprender un negocio propio en el pueblo'
    ],
    quienPaga: [
      'Tú pagas tu alquiler de vivienda estable',
      'Relevo: acuerdo entre la persona joven y quien se jubila',
      'El ayuntamiento pone en contacto y acompaña'
    ]
  }
];

// 3 preguntas: cada opción vota por uno o varios arquetipos (ids de data/espana.js)
export const PREGUNTAS = [
  {
    id: 'p-paisaje', texto: '¿Qué paisaje te gusta más?',
    opciones: [
      { id: 'paisaje-montana', texto: 'Montaña y nieve', arquetipos: ['nieve-montana'] },
      { id: 'paisaje-dehesa', texto: 'Campo abierto con animales', arquetipos: ['ganaderia-ovina'] },
      { id: 'paisaje-bosque', texto: 'Bosque de pinos', arquetipos: ['forestal-resina'] },
      { id: 'paisaje-vinas', texto: 'Viñas y olivos', arquetipos: ['agricola-turismo', 'olivar'] }
    ]
  },
  {
    id: 'p-trabajo', texto: '¿Con qué te gusta trabajar?',
    opciones: [
      { id: 'trabajo-gente', texto: 'Con gente: visitantes y clientes', arquetipos: ['agricola-turismo', 'nieve-montana'] },
      { id: 'trabajo-animales', texto: 'Con animales', arquetipos: ['ganaderia-ovina'] },
      { id: 'trabajo-arboles', texto: 'Con árboles, al aire libre', arquetipos: ['forestal-resina', 'olivar'] },
      { id: 'trabajo-variado', texto: 'Un poco de todo', arquetipos: ['agricola-turismo'] }
    ]
  },
  {
    id: 'p-cuando', texto: '¿Cuándo puedes empezar?',
    opciones: [
      { id: 'cuando-invierno', texto: 'En invierno', arquetipos: ['nieve-montana', 'olivar'] },
      { id: 'cuando-primavera', texto: 'En primavera', arquetipos: ['ganaderia-ovina', 'forestal-resina'] },
      { id: 'cuando-verano', texto: 'En verano', arquetipos: ['forestal-resina', 'nieve-montana'] },
      { id: 'cuando-otono', texto: 'En otoño', arquetipos: ['agricola-turismo', 'olivar'] }
    ]
  }
];

const PRACTICAS = ['Programa Campus Rural', '1.000 € brutos/mes', '~3 meses', 'Municipios < 5.000 hab.'];

export const OPORTUNIDADES = [
  // --- Red del Gaià (puebloId de v2) ---
  {
    id: 'op-practicas-vila-rodona', tipo: 'practicas', titulo: 'Prácticas con el dinamizador de la red (ejemplo)', redId: 'red-gaia', puebloId: 'vila-rodona',
    descripcion: 'Prácticas dentro del programa Campus Rural: ayudar a organizar las temporadas y las viviendas de la red.',
    duracion: '~3 meses', condiciones: [...PRACTICAS], plazas: 2
  },
  {
    id: 'op-temporada-oliva-gaia', tipo: 'primera_temporada', titulo: 'Primera temporada: campaña de oliva (ejemplo)', redId: 'red-gaia', puebloId: 'vila-rodona',
    descripcion: 'Recogida de oliva con una cuadrilla que te enseña el trabajo.',
    duracion: '1–2 meses', condiciones: ['Con contrato', 'Vivienda a cargo del empleador: 0 € para ti', 'Sin experiencia previa'], plazas: 4
  },
  {
    id: 'op-relevo-almendros-vilabella', tipo: 'relevo', titulo: 'Relevo: finca de almendros (ejemplo)', redId: 'red-gaia', puebloId: 'vilabella',
    descripcion: 'El dueño de una finca de almendros se jubila y busca a alguien que la continúe.',
    duracion: 'Acompañamiento de 1 año antes del relevo (ejemplo)', condiciones: ['Acuerdo entre las dos partes', 'Aprendes junto al dueño durante la transición', 'El ayuntamiento pone en contacto'], plazas: 1
  },
  {
    id: 'op-relevo-bar-montferri', tipo: 'relevo', titulo: 'Relevo: el bar del pueblo (ejemplo)', redId: 'red-gaia', puebloId: 'montferri',
    descripcion: 'La persona que lleva el bar del pueblo se jubila y busca relevo.',
    duracion: 'Acompañamiento de 6 meses (ejemplo)', condiciones: ['Acuerdo entre las dos partes', 'El ayuntamiento pone en contacto'], plazas: 1
  },
  {
    id: 'op-vivienda-brafim', tipo: 'vivienda_estable', titulo: 'Vivienda estable para quien se queda (ejemplo)', redId: 'red-gaia', puebloId: 'brafim',
    descripcion: 'Vivienda de alquiler para jóvenes que ya han trabajado un año completo en la red.',
    duracion: 'Alquiler de larga duración', condiciones: ['Haber completado un año en la red', 'Alquiler a tu cargo (vivienda estable)'], plazas: 1
  },
  {
    id: 'op-emprender-aiguamurcia', tipo: 'emprender', titulo: 'Emprender: obrador de productos locales (ejemplo)', redId: 'red-gaia', puebloId: 'aiguamurcia',
    descripcion: 'Montar un pequeño obrador con productos de la red y venderlos a visitantes y vecinos.',
    duracion: 'Acompañamiento de 6 meses (ejemplo)', condiciones: ['Proyecto propio', 'Acompañamiento del dinamizador'], plazas: 2
  },
  // --- Otras redes (ejemplos de plantilla, puebloId null) ---
  {
    id: 'op-practicas-tena', tipo: 'practicas', titulo: 'Prácticas en turismo de montaña (ejemplo)', redId: 'red-tena', puebloId: null,
    descripcion: 'Prácticas dentro del programa Campus Rural en la red del Valle de Tena.',
    duracion: '~3 meses', condiciones: [...PRACTICAS], plazas: 2
  },
  {
    id: 'op-temporada-nieve-tena', tipo: 'primera_temporada', titulo: 'Primera temporada de invierno (ejemplo)', redId: 'red-tena', puebloId: null,
    descripcion: 'Trabajo de temporada de esquí en la estación o en hostelería.',
    duracion: 'dic–abr', condiciones: ['Con contrato', 'Vivienda a cargo de quien contrata: 0 € para ti'], plazas: 5
  },
  {
    id: 'op-formacion-monitor-tena', tipo: 'formacion', titulo: 'Formación de iniciación como monitor de montaña (ejemplo)', redId: 'red-tena', puebloId: null,
    descripcion: 'Formación práctica para acompañar a grupos en verano. No es un título oficial.',
    duracion: 'Unas semanas (ejemplo)', condiciones: ['Formación de iniciación', 'No es un título oficial'], plazas: 6
  },
  {
    id: 'op-formacion-pastores', tipo: 'formacion', titulo: 'Escuela de pastores (ejemplo)', redId: 'red-tajo-salor', puebloId: null,
    descripcion: 'Aprender el oficio de pastor junto a ganaderos de la red.',
    duracion: 'Unos meses (ejemplo)', condiciones: ['Formación práctica con ganaderos', 'No es un título oficial'], plazas: 4
  },
  {
    id: 'op-relevo-queseria', tipo: 'relevo', titulo: 'Relevo: quesería artesana (ejemplo)', redId: 'red-tajo-salor', puebloId: null,
    descripcion: 'La dueña de una pequeña quesería se jubila y busca a alguien que la continúe.',
    duracion: 'Acompañamiento de 1 año (ejemplo)', condiciones: ['Acuerdo entre las dos partes', 'Aprendes junto a la dueña durante la transición'], plazas: 1
  },
  {
    id: 'op-temporada-resina-pinares', tipo: 'primera_temporada', titulo: 'Primera campaña de resina (ejemplo)', redId: 'red-pinares', puebloId: null,
    descripcion: 'Campaña de resinación con formación práctica al empezar.',
    duracion: 'abr–oct', condiciones: ['Con contrato', 'Vivienda a cargo del empleador: 0 € para ti', 'Formación práctica en resinación'], plazas: 3
  },
  {
    id: 'op-temporada-aceituna-magina', tipo: 'primera_temporada', titulo: 'Primera campaña de aceituna (ejemplo)', redId: 'red-magina', puebloId: null,
    descripcion: 'Recogida de aceituna en una cuadrilla.',
    duracion: 'nov–feb', condiciones: ['Con contrato', 'Vivienda a cargo del empleador: 0 € para ti'], plazas: 6
  },
  {
    id: 'op-formacion-poda-magina', tipo: 'formacion', titulo: 'Curso práctico de poda de olivar (ejemplo)', redId: 'red-magina', puebloId: null,
    descripcion: 'Aprender a podar el olivo al acabar la campaña de aceituna.',
    duracion: 'mar–abr', condiciones: ['Formación práctica', 'No es un título oficial'], plazas: 5
  }
];
