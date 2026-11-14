// Lugares fijos del mapa: comercios, puntos de recogida, servicios y patrimonio.
// Empleadores y alojamientos se añaden desde su propio estado (services/maps.js).
// Comercios de Vila-rodona: genéricos sin marca (v1); los de otros pueblos, "(ejemplo)".
// Patrimonio: monumentos reales; salvo el monasterio, la posición en el mapa es aproximada.
export const LUGARES = [
  // --- Comercios ---
  { id: 'com-forn', puebloId: 'vila-rodona', tipo: 'comercio', nombre: 'Forn de pa', lat: 41.3130, lng: 1.3591, descripcion: 'Panadería del pueblo.', horarioNormal: '7:30–13:30', horarioCampana: '6:30–13:30 (abre antes en campaña)', ofertaTemporero: 'Bocadillo + café para la cuadrilla, precio de campaña' },
  { id: 'com-bar', puebloId: 'vila-rodona', tipo: 'comercio', nombre: 'Bar de la plaça', lat: 41.3126, lng: 1.3598, descripcion: 'Bar en la plaza, junto al Ajuntament.', horarioNormal: '8:00–22:00', horarioCampana: '6:30–22:00', ofertaTemporero: 'Menú de mediodía para cuadrillas' },
  { id: 'com-farmacia', puebloId: 'vila-rodona', tipo: 'comercio', nombre: 'Farmàcia', lat: 41.3133, lng: 1.3597, descripcion: 'Farmacia del pueblo.', horarioNormal: '9:00–13:30 y 17:00–20:00', horarioCampana: '9:00–13:30 y 17:00–20:30', ofertaTemporero: null },
  { id: 'com-botiga', puebloId: 'vila-rodona', tipo: 'comercio', nombre: "Botiga d'alimentació", lat: 41.3124, lng: 1.3586, descripcion: 'Tienda de alimentación y productos básicos.', horarioNormal: '8:30–13:30 y 17:00–20:00', horarioCampana: '8:00–14:00 y 17:00–20:30', ofertaTemporero: 'Lote de desayuno semanal para los alojamientos de temporeros' },
  { id: 'com-bugaderia', puebloId: 'vila-rodona', tipo: 'comercio', nombre: 'Bugaderia (lavandería)', lat: 41.3137, lng: 1.3583, descripcion: 'Lavandería de autoservicio.', horarioNormal: '8:00–21:00', horarioCampana: '7:00–22:00', ofertaTemporero: 'Lavado de ropa de trabajo a precio reducido' },
  { id: 'com-carnisseria', puebloId: 'vila-rodona', tipo: 'comercio', nombre: 'Carnisseria', lat: 41.3121, lng: 1.3592, descripcion: 'Carnicería y charcutería.', horarioNormal: '8:30–13:30', horarioCampana: null, ofertaTemporero: null },
  { id: 'com-ai-botiga', puebloId: 'aiguamurcia', tipo: 'comercio', nombre: 'Botiga del poble (ejemplo)', lat: 41.3287, lng: 1.3595, descripcion: 'Tienda pequeña de alimentación.', horarioNormal: '9:00–13:30', horarioCampana: '8:00–13:30 y 17:30–19:30', ofertaTemporero: 'Encargos de comida para la semana' },
  { id: 'com-mo-bar', puebloId: 'montferri', tipo: 'comercio', nombre: 'Bar del poble (ejemplo)', lat: 41.2675, lng: 1.3665, descripcion: 'Bar y punto de encuentro del pueblo.', horarioNormal: '9:00–21:00 (cierra lunes)', horarioCampana: '7:00–21:00', ofertaTemporero: 'Café y bocadillo antes de la furgoneta' },
  { id: 'com-br-forn', puebloId: 'brafim', tipo: 'comercio', nombre: 'Forn del poble (ejemplo)', lat: 41.2704, lng: 1.3421, descripcion: 'Panadería y productos básicos.', horarioNormal: '7:30–13:30', horarioCampana: '6:45–13:30', ofertaTemporero: 'Pan y bocadillos para la cuadrilla' },
  { id: 'com-vb-botiga', puebloId: 'vilabella', tipo: 'comercio', nombre: 'Botiga del poble (ejemplo)', lat: 41.2489, lng: 1.3310, descripcion: 'Tienda de alimentación.', horarioNormal: '8:30–13:30 y 17:00–19:30', horarioCampana: null, ofertaTemporero: null },

  // --- Puntos de recogida de la furgoneta compartida ---
  { id: 'rec-vb', puebloId: 'vilabella', tipo: 'recogida', nombre: 'Recogida: Vilabella (plaza)', lat: 41.2493, lng: 1.3312, descripcion: 'Primera parada de la furgoneta de la red.', hora: '7:00' },
  { id: 'rec-br', puebloId: 'brafim', tipo: 'recogida', nombre: 'Recogida: Bràfim (plaza)', lat: 41.2707, lng: 1.3415, descripcion: 'Parada de la furgoneta de la red.', hora: '7:10' },
  { id: 'rec-mo', puebloId: 'montferri', tipo: 'recogida', nombre: 'Recogida: Montferri (plaza)', lat: 41.2673, lng: 1.3667, descripcion: 'Parada de la furgoneta de la red.', hora: '7:20' },
  { id: 'rec-placa', puebloId: 'vila-rodona', tipo: 'recogida', nombre: "Recogida: Plaça de l'Església", lat: 41.3127, lng: 1.3594, descripcion: 'Parada de la furgoneta de la red y salida hacia las fincas del sur y oeste.', hora: '7:30' },
  { id: 'rec-celler', puebloId: 'vila-rodona', tipo: 'recogida', nombre: 'Recogida: Celler Cooperatiu', lat: 41.3117, lng: 1.3572, descripcion: 'Salida hacia las fincas del norte y Aiguamúrcia.', hora: '7:45' },
  { id: 'rec-ai', puebloId: 'aiguamurcia', tipo: 'recogida', nombre: 'Recogida: Aiguamúrcia (plaza)', lat: 41.3291, lng: 1.3593, descripcion: 'Última parada de la furgoneta de la red.', hora: '7:45' },

  // --- Servicios ---
  { id: 'serv-ajuntament-vr', puebloId: 'vila-rodona', tipo: 'servicio', nombre: 'Ajuntament de Vila-rodona · Punto de atención', lat: 41.3128, lng: 1.3596, descripcion: 'Punto de atención al temporero y a quien contrata. Sede del dinamizador de la red.' },
  { id: 'serv-consultori', puebloId: 'vila-rodona', tipo: 'servicio', nombre: 'Consultori mèdic local', lat: 41.3136, lng: 1.3603, descripcion: 'Consultorio médico del pueblo. Urgencias: 112.' },
  { id: 'serv-punto-ai', puebloId: 'aiguamurcia', tipo: 'servicio', nombre: 'Punto de atención de la red (ejemplo)', lat: 41.3289, lng: 1.3588, descripcion: "El dinamizador atiende aquí los martes. El Ajuntament d'Aiguamúrcia está en Santes Creus." },
  { id: 'serv-ajuntament-mo', puebloId: 'montferri', tipo: 'servicio', nombre: 'Ajuntament de Montferri · Punto de atención', lat: 41.2672, lng: 1.3671, descripcion: 'El dinamizador atiende aquí los martes por la tarde.' },
  { id: 'serv-ajuntament-br', puebloId: 'brafim', tipo: 'servicio', nombre: 'Ajuntament de Bràfim · Punto de atención', lat: 41.2706, lng: 1.3419, descripcion: 'El dinamizador atiende aquí los jueves por la mañana.' },
  { id: 'serv-ajuntament-vb', puebloId: 'vilabella', tipo: 'servicio', nombre: 'Ajuntament de Vilabella · Punto de atención', lat: 41.2491, lng: 1.3316, descripcion: 'El dinamizador atiende aquí los jueves por la tarde.' },

  // --- Patrimonio (real) ---
  { id: 'pat-celler-vr', puebloId: 'vila-rodona', tipo: 'patrimonio', nombre: 'Celler Cooperatiu de Vila-rodona', lat: 41.3115, lng: 1.3570, descripcion: 'Bodega cooperativa modernista, obra de Cèsar Martinell. Posición aproximada.', ubicacionAproximada: true },
  { id: 'pat-santes-creus', puebloId: 'aiguamurcia', tipo: 'patrimonio', nombre: 'Reial Monestir de Santes Creus', lat: 41.3475, lng: 1.3606, descripcion: 'Monasterio cisterciense de la Ruta del Cister, en Santes Creus (Aiguamúrcia).', ubicacionAproximada: true },
  { id: 'pat-santuari-mo', puebloId: 'montferri', tipo: 'patrimonio', nombre: 'Santuari de la Mare de Déu de Montserrat de Montferri', lat: 41.2640, lng: 1.3655, descripcion: 'Santuario modernista de Josep M. Jujol. Posición aproximada.', ubicacionAproximada: true },
  { id: 'pat-lloret-br', puebloId: 'brafim', tipo: 'patrimonio', nombre: 'Santuari de la Mare de Déu del Lloret', lat: 41.2760, lng: 1.3450, descripcion: 'Santuario de Bràfim. Posición aproximada.', ubicacionAproximada: true }
];

// Lugares exentos de la regla "< 1,5 km del centro" (posición indicada en el contrato)
export const EXENTOS_DISTANCIA = ['pat-santes-creus'];
