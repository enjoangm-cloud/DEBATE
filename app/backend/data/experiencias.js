// Experiencias de turismo rural (ficticias, organizadas por empleadores de la red).
// Si dependeDelTiempo, las fechas son solo días aptos de la previsión (no el 17, 18 ni 20 de noviembre).
export const EXPERIENCIAS = [
  { id: 'exp-dia-oliva', puebloId: 'vila-rodona', empleadorId: 'emp-garriga', titulo: 'Un día de oliva en Mas Garriga', tipo: 'cosecha', fechas: ['2026-11-15', '2026-11-21', '2026-11-22'],
    precioPersona: 35, plazasLibres: 8, duracion: '4 h (9:00–13:00)', descripcion: 'Varea con la cuadrilla, almuerza en la finca y llévate 1 l de aceite nuevo.', dependeDelTiempo: true },
  { id: 'exp-santes-creus', puebloId: 'aiguamurcia', empleadorId: 'emp-celler-ai', titulo: 'Visita a Santes Creus + comida en la bodega', tipo: 'patrimonio', fechas: ['2026-11-15', '2026-11-22', '2026-11-29'],
    precioPersona: 28, plazasLibres: 12, duracion: 'Mañana y comida', descripcion: 'Visita libre al Reial Monestir de Santes Creus (entrada no incluida) y comida de temporada en el Celler Mas del Gaià.', dependeDelTiempo: false },
  { id: 'exp-cata-ai', puebloId: 'aiguamurcia', empleadorId: 'emp-celler-ai', titulo: 'Cata de vinos nuevos en la bodega', tipo: 'enoturismo', fechas: ['2026-11-20', '2026-11-21', '2026-11-28'],
    precioPersona: 18, plazasLibres: 10, duracion: '1 h 30 min', descripcion: 'Visita a la bodega y cata de 4 vinos de la DO Penedès.', dependeDelTiempo: false },
  { id: 'exp-ruta-modernista', puebloId: 'montferri', empleadorId: 'emp-mirador-mo', titulo: 'Ruta modernista Vila-rodona – Montferri', tipo: 'ruta', fechas: ['2026-11-21', '2026-11-22'],
    precioPersona: 15, plazasLibres: 10, duracion: '3 h', descripcion: 'Del Celler Cooperatiu de Cèsar Martinell al santuario de Josep M. Jujol, con guía y en coche compartido.', dependeDelTiempo: true },
  { id: 'exp-menu-aceite', puebloId: 'vila-rodona', empleadorId: 'emp-fonda', titulo: 'Menú del aceite nuevo', tipo: 'gastronomia', fechas: ['2026-11-21', '2026-11-22', '2026-11-28', '2026-11-29'],
    precioPersona: 25, plazasLibres: 20, duracion: 'Comida (2 h)', descripcion: 'Menú de temporada con aceite recién molido de las fincas de la red.', dependeDelTiempo: false },
  { id: 'exp-lloret', puebloId: 'brafim', empleadorId: 'emp-mestre-br', titulo: 'Paseo entre viñas hasta el santuario del Lloret', tipo: 'ruta', fechas: ['2026-11-15', '2026-11-22'],
    precioPersona: 10, plazasLibres: 12, duracion: '2 h 30 min', descripcion: 'Paseo guiado por las viñas de Cal Mestre y cata de vino a granel.', dependeDelTiempo: true },
  { id: 'exp-oliva-vb', puebloId: 'vilabella', empleadorId: 'emp-rull-vb', titulo: 'Recoge tu oliva y llévate tu aceite', tipo: 'cosecha', fechas: ['2026-11-21', '2026-11-22'],
    precioPersona: 40, plazasLibres: 6, duracion: '5 h con almuerzo', descripcion: 'Una mañana de recogida en Mas Rull y una garrafa de 2 l de aceite.', dependeDelTiempo: true }
];
