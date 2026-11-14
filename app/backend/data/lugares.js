// Lugares del mapa. Públicos y comercios: reales y genéricos (sin marca). Casas cedidas y fincas: ficticias.
// Coordenadas aproximadas, todas al oeste del río Gaià o lejos de su cauce.
export const LUGARES = [
  // --- Alojamientos ---
  { id: 'aloj-major', tipo: 'alojamiento', nombre: 'Casa del carrer Major (ejemplo)', lat: 41.3134, lng: 1.3588, descripcion: 'Casa vacía cedida por una vecina. Cocina, 2 baños y calefacción.', plazas: 6, plazasLibres: 2, cedidoPor: 'Família Rovira (ejemplo)', precioNoche: 0, desde: '2026-11-01', hasta: '2026-12-22' },
  { id: 'aloj-local', tipo: 'alojamiento', nombre: 'Local municipal de acogida', lat: 41.3122, lng: 1.3601, descripcion: 'Local del Ajuntament habilitado con literas, duchas y lavadora.', plazas: 10, plazasLibres: 4, cedidoPor: 'Ajuntament de Vila-rodona', precioNoche: 0, desde: '2026-11-01', hasta: '2026-12-22' },
  { id: 'aloj-escoles', tipo: 'alojamiento', nombre: 'Casa del carrer de les Escoles (ejemplo)', lat: 41.3141, lng: 1.3577, descripcion: 'Planta baja con 2 habitaciones. Cerca de la parada de recogida.', plazas: 4, plazasLibres: 1, cedidoPor: 'Sr. Jordi Ferrer (ejemplo)', precioNoche: 0, desde: '2026-11-03', hasta: '2026-12-20' },
  { id: 'aloj-rural', tipo: 'alojamiento', nombre: 'Casa rural (precio campaña)', lat: 41.3168, lng: 1.3509, descripcion: 'Casa rural de las afueras con precio reducido para temporeros en campaña.', plazas: 5, plazasLibres: 3, cedidoPor: 'Propietaria de la casa rural (ejemplo)', precioNoche: 12, desde: '2026-11-01', hasta: '2026-12-20' },
  { id: 'aloj-masgarriga', tipo: 'alojamiento', nombre: 'Masía de Mas Garriga (ejemplo)', lat: 41.3045, lng: 1.3462, descripcion: 'Habitaciones en la propia finca, incluidas en el contrato.', plazas: 4, plazasLibres: 0, cedidoPor: 'Mas Garriga (ejemplo)', precioNoche: 0, desde: '2026-11-03', hasta: '2026-12-20' },

  // --- Fincas (detalle en data/fincas.js) ---
  { id: 'lug-finca-garriga', tipo: 'finca', nombre: 'Mas Garriga (ejemplo)', lat: 41.3040, lng: 1.3455, descripcion: 'Olivar y viña al suroeste del núcleo.', fincaId: 'finca-garriga' },
  { id: 'lug-finca-pujol', tipo: 'finca', nombre: 'Cal Pujol (ejemplo)', lat: 41.3215, lng: 1.3520, descripcion: 'Olivos centenarios y almendros, camino del norte.', fincaId: 'finca-pujol' },
  { id: 'lug-finca-vidal', tipo: 'finca', nombre: 'Mas Vidal (ejemplo)', lat: 41.3080, lng: 1.3380, descripcion: 'Avellanos y viña en terrazas.', fincaId: 'finca-vidal' },
  { id: 'lug-finca-roca', tipo: 'finca', nombre: 'Cal Roca (ejemplo)', lat: 41.3190, lng: 1.3430, descripcion: 'Viña para el Celler Cooperatiu y algo de olivo.', fincaId: 'finca-roca' },
  { id: 'lug-finca-sala', tipo: 'finca', nombre: 'Mas Sala (ejemplo)', lat: 41.2985, lng: 1.3560, descripcion: 'Olivar joven en espaldera, al sur.', fincaId: 'finca-sala' },

  // --- Comercios (reales y genéricos, sin marca) ---
  { id: 'com-forn', tipo: 'comercio', nombre: 'Forn de pa', lat: 41.3130, lng: 1.3591, descripcion: 'Panadería del pueblo.', horarioNormal: '7:30–13:30', horarioCampana: '6:30–13:30 (abre antes en campaña)', ofertaTemporero: 'Bocadillo + café para la cuadrilla, precio de campaña' },
  { id: 'com-bar', tipo: 'comercio', nombre: 'Bar de la plaça', lat: 41.3126, lng: 1.3598, descripcion: 'Bar en la plaza, junto al Ajuntament.', horarioNormal: '8:00–22:00', horarioCampana: '6:30–22:00', ofertaTemporero: 'Menú de mediodía para cuadrillas' },
  { id: 'com-farmacia', tipo: 'comercio', nombre: 'Farmàcia', lat: 41.3133, lng: 1.3597, descripcion: 'Farmacia del pueblo.', horarioNormal: '9:00–13:30 y 17:00–20:00', horarioCampana: '9:00–13:30 y 17:00–20:30', ofertaTemporero: null },
  { id: 'com-botiga', tipo: 'comercio', nombre: "Botiga d'alimentació", lat: 41.3124, lng: 1.3586, descripcion: 'Tienda de alimentación y productos básicos.', horarioNormal: '8:30–13:30 y 17:00–20:00', horarioCampana: '8:00–14:00 y 17:00–20:30', ofertaTemporero: 'Lote de desayuno semanal para casas de acogida' },
  { id: 'com-bugaderia', tipo: 'comercio', nombre: 'Bugaderia (lavandería)', lat: 41.3137, lng: 1.3583, descripcion: 'Lavandería de autoservicio.', horarioNormal: '8:00–21:00', horarioCampana: '7:00–22:00', ofertaTemporero: 'Lavado de ropa de trabajo a precio reducido' },
  { id: 'com-carnisseria', tipo: 'comercio', nombre: 'Carnisseria', lat: 41.3121, lng: 1.3592, descripcion: 'Carnicería y charcutería.', horarioNormal: '8:30–13:30', horarioCampana: null, ofertaTemporero: null },

  // --- Puntos de recogida (furgoneta a las fincas) ---
  { id: 'rec-placa', tipo: 'recogida', nombre: "Recogida: Plaça de l'Església", lat: 41.3127, lng: 1.3594, descripcion: 'Salida de la furgoneta hacia las fincas del sur y oeste.', hora: '7:30' },
  { id: 'rec-celler', tipo: 'recogida', nombre: 'Recogida: Celler Cooperatiu', lat: 41.3117, lng: 1.3572, descripcion: 'Salida hacia las fincas del norte.', hora: '7:45' },

  // --- Servicios y lugares de interés ---
  { id: 'serv-ajuntament', tipo: 'servicio', nombre: 'Ajuntament de Vila-rodona · Punto de acogida', lat: 41.3128, lng: 1.3596, descripcion: 'Punto de atención al temporero y al agricultor. Aquí está el dinamizador.' },
  { id: 'serv-consultori', tipo: 'servicio', nombre: 'Consultori mèdic local', lat: 41.3136, lng: 1.3603, descripcion: 'Consultorio médico del pueblo. Urgencias: 112.' },
  { id: 'serv-celler', tipo: 'servicio', nombre: 'Celler Cooperatiu de Vila-rodona', lat: 41.3115, lng: 1.3570, descripcion: 'Bodega cooperativa modernista, obra de Cèsar Martinell. Lugar de interés y entrega de uva en vendimia.' }
];
