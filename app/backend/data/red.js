// Red de pueblos del Gaià (Alt Camp, Tarragona). Pueblos y monumentos REALES (datos del contrato);
// dinamizador y cifras de coste FICTICIOS. La app es una plantilla: otro pueblo < 5.000 hab. se suma con su configuración.
export const HOY = '2026-11-14';

// Cultivos (ids comunes a toda la red)
export const CULTIVOS = {
  uva: { id: 'uva', nombre: 'Uva (viña)', emoji: '🍇', color: '#7b2d5b' },
  oliva: { id: 'oliva', nombre: 'Oliva', emoji: '🫒', color: '#6b8e23' },
  almendra: { id: 'almendra', nombre: 'Almendra', emoji: '🌰', color: '#c49a6c' },
  avellana: { id: 'avellana', nombre: 'Avellana', emoji: '🥜', color: '#8b5a2b' }
};

export const SECTORES = [
  { id: 'agricultura', nombre: 'Agricultura', emoji: '🌾', color: '#6b8e23' },
  { id: 'turismo', nombre: 'Turismo rural', emoji: '🏡', color: '#1a73e8' },
  { id: 'hosteleria', nombre: 'Hostelería', emoji: '🍽️', color: '#ea4335' },
  { id: 'bodega', nombre: 'Bodega', emoji: '🍷', color: '#8e2453' },
  { id: 'forestal', nombre: 'Forestal', emoji: '🌲', color: '#2e7d32' }
];

const base = { comarca: 'Alt Camp', provincia: 'Tarragona', zoom: 14 };
const c = (...ids) => ids.map((id) => CULTIVOS[id]);

// Habitantes, año del padrón y coordenadas: tabla del contrato (no cambiar)
export const PUEBLOS = [
  { id: 'vila-rodona', nombre: 'Vila-rodona', ...base, habitantes: 1382, anyoPadron: 2025, lat: 41.3128, lng: 1.3594,
    cultivos: c('uva', 'oliva', 'almendra', 'avellana'), sectores: ['agricultura', 'hosteleria'],
    destacados: ['Viña, olivo, almendro y avellano', 'Celler Cooperatiu modernista (Cèsar Martinell)'],
    puntoAtencion: "Ajuntament de Vila-rodona (Plaça de l'Església) · lunes, miércoles y viernes con el dinamizador", puntoAtencionId: 'serv-ajuntament-vr' },
  { id: 'aiguamurcia', nombre: 'Aiguamúrcia', ...base, habitantes: 987, anyoPadron: 2025, lat: 41.3290, lng: 1.3590,
    cultivos: c('uva', 'oliva'), sectores: ['agricultura', 'bodega', 'turismo'],
    destacados: ['Reial Monestir de Santes Creus (Ruta del Cister)', 'Viña de la DO Penedès', 'Càmping en Santes Creus', 'La capital municipal está en Santes Creus'],
    puntoAtencion: 'Punto de atención de la red en Aiguamúrcia (ejemplo) · martes por la mañana', puntoAtencionId: 'serv-punto-ai' },
  { id: 'montferri', nombre: 'Montferri', ...base, habitantes: 473, anyoPadron: 2024, lat: 41.2672, lng: 1.3669,
    cultivos: c('oliva', 'almendra'), sectores: ['agricultura', 'turismo'],
    destacados: ['Santuario modernista de la Mare de Déu de Montserrat (Josep M. Jujol)'],
    puntoAtencion: 'Ajuntament de Montferri · martes por la tarde', puntoAtencionId: 'serv-ajuntament-mo' },
  { id: 'brafim', nombre: 'Bràfim', ...base, habitantes: 696, anyoPadron: 2024, lat: 41.2706, lng: 1.3417,
    cultivos: c('uva', 'oliva'), sectores: ['agricultura', 'forestal'],
    destacados: ['Pueblo de tradición de vino', 'Santuario de la Mare de Déu del Lloret'],
    puntoAtencion: 'Ajuntament de Bràfim · jueves por la mañana', puntoAtencionId: 'serv-ajuntament-br' },
  { id: 'vilabella', nombre: 'Vilabella', ...base, habitantes: 723, anyoPadron: 2024, lat: 41.2492, lng: 1.3314,
    cultivos: c('oliva', 'almendra', 'uva'), sectores: ['agricultura'],
    destacados: ['Pueblo de tradición agrícola'],
    puntoAtencion: 'Ajuntament de Vilabella · jueves por la tarde', puntoAtencionId: 'serv-ajuntament-vb' }
];

// Nombre oficial del ayuntamiento (quien verifica los alojamientos)
export const AJUNTAMENT = {
  'vila-rodona': 'Ajuntament de Vila-rodona', aiguamurcia: "Ajuntament d'Aiguamúrcia", montferri: 'Ajuntament de Montferri',
  brafim: 'Ajuntament de Bràfim', vilabella: 'Ajuntament de Vilabella'
};

export const DINAMIZADOR = {
  nombre: 'Marta Puig (ejemplo)',
  telefono: '600 000 000',
  horario: 'L, X y V en Vila-rodona; martes en Aiguamúrcia y Montferri; jueves en Bràfim y Vilabella (8:00–14:00)',
  lugar: "Ajuntament de Vila-rodona (Plaça de l'Església) y visitas semanales a los otros 4 pueblos"
};

export const RED = {
  id: 'red-gaia',
  nombre: 'Red de pueblos del Gaià (ejemplo)',
  descripcion: 'Cinco pueblos vecinos del Alt Camp, en la cuenca del río Gaià, comparten un dinamizador, una furgoneta y una bolsa de viviendas para que haya trabajo de temporada todo el año. Quien contrata pone la vivienda; el ayuntamiento la verifica.',
  centro: { lat: 41.2890, lng: 1.3480, zoom: 12 },
  // Coste anual del dinamizador (media jornada, ficticio) repartido según habitantes
  costeDinamizador: { anualEuros: 24000, reparto: [
    { puebloId: 'vila-rodona', euros: 7780 }, { puebloId: 'aiguamurcia', euros: 5560 }, { puebloId: 'montferri', euros: 2670 },
    { puebloId: 'brafim', euros: 3920 }, { puebloId: 'vilabella', euros: 4070 }
  ] },
  comoSumarse: [
    'El pleno del ayuntamiento aprueba sumarse a la red (pueblo de menos de 5.000 habitantes).',
    'Se rellena la configuración del pueblo: cultivos, sectores, punto de atención y coordenadas.',
    'Los empleadores del pueblo dan de alta su ficha y sus ofertas (con contrato y salario claros).',
    'Quien contrata registra su alojamiento o alquila uno en la bolsa de viviendas.',
    'El ayuntamiento verifica los alojamientos y nombra a una persona de contacto.',
    'El pueblo paga su parte del dinamizador según habitantes y entra en la furgoneta compartida.'
  ]
};
