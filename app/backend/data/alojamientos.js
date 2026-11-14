// Alojamientos de los EMPLEADORES (propios o alquilados de la bolsa). Coste para el temporero: 0 €.
// El ayuntamiento del pueblo solo verifica los requisitos mínimos.
export const ALOJAMIENTOS = [
  { id: 'aloj-masgarriga', puebloId: 'vila-rodona', empleadorId: 'emp-garriga', nombre: 'Masía de Mas Garriga (ejemplo)', modalidad: 'propio', viviendaId: null, lat: 41.3069, lng: 1.3527,
    plazas: 4, plazasLibres: 1, verificado: true, verificadoPor: 'Ajuntament de Vila-rodona', requisitos: { camasIndividuales: 4, banos: 1, cocina: true, calefaccion: true, lavadora: true },
    costeTemporero: 0, costeEmpleadorMes: null, desde: '2026-11-03', hasta: '2027-03-12', descripcion: 'Habitaciones en la propia finca, incluidas en el contrato.' },
  { id: 'aloj-pujol', puebloId: 'vila-rodona', empleadorId: 'emp-pujol', nombre: 'Casa de pueblo de la família Rovira (ejemplo)', modalidad: 'alquilado', viviendaId: 'viv-vr-casa', lat: 41.3134, lng: 1.3588,
    plazas: 5, plazasLibres: 2, verificado: true, verificadoPor: 'Ajuntament de Vila-rodona', requisitos: { camasIndividuales: 5, banos: 2, cocina: true, calefaccion: true, lavadora: true },
    costeTemporero: 0, costeEmpleadorMes: 600, desde: '2026-11-01', hasta: '2027-03-31', descripcion: 'Casa alquilada por Cal Pujol en la bolsa de viviendas. Cocina, 2 baños y calefacción.' },
  { id: 'aloj-celler-ai', puebloId: 'aiguamurcia', empleadorId: 'emp-celler-ai', nombre: 'Casa del celler (ejemplo)', modalidad: 'propio', viviendaId: null, lat: 41.3279, lng: 1.3566,
    plazas: 3, plazasLibres: 2, verificado: true, verificadoPor: "Ajuntament d'Aiguamúrcia", requisitos: { camasIndividuales: 3, banos: 1, cocina: true, calefaccion: true, lavadora: true },
    costeTemporero: 0, costeEmpleadorMes: null, desde: '2026-11-09', hasta: '2027-10-31', descripcion: 'Vivienda junto a la bodega para el personal de temporada.' },
  { id: 'aloj-camping-ai', puebloId: 'aiguamurcia', empleadorId: 'emp-camping-ai', nombre: 'Bungalows del personal (ejemplo)', modalidad: 'propio', viviendaId: null, lat: 41.3392, lng: 1.3604,
    plazas: 6, plazasLibres: 6, verificado: true, verificadoPor: "Ajuntament d'Aiguamúrcia", requisitos: { camasIndividuales: 6, banos: 2, cocina: true, calefaccion: false, lavadora: true },
    costeTemporero: 0, costeEmpleadorMes: null, desde: '2027-04-01', hasta: '2027-09-30', descripcion: 'Dos bungalows reservados al personal durante la temporada del càmping.' },
  { id: 'aloj-mestre-br', puebloId: 'brafim', empleadorId: 'emp-mestre-br', nombre: 'Casa de la família Bonet (ejemplo)', modalidad: 'alquilado', viviendaId: 'viv-br-casa', lat: 41.2709, lng: 1.3420,
    plazas: 4, plazasLibres: 3, verificado: true, verificadoPor: 'Ajuntament de Bràfim', requisitos: { camasIndividuales: 4, banos: 1, cocina: true, calefaccion: true, lavadora: true },
    costeTemporero: 0, costeEmpleadorMes: 500, desde: '2026-11-01', hasta: '2027-02-28', descripcion: 'Casa alquilada por Cal Mestre para la oliva y la poda.' },
  { id: 'aloj-forestal-br', puebloId: 'brafim', empleadorId: 'emp-forestal-br', nombre: 'Piso vacío en el centro (ejemplo)', modalidad: 'alquilado', viviendaId: 'viv-br-pis', lat: 41.2703, lng: 1.3412,
    plazas: 4, plazasLibres: 4, verificado: false, verificadoPor: 'Ajuntament de Bràfim', requisitos: { camasIndividuales: 4, banos: 1, cocina: true, calefaccion: true, lavadora: false },
    costeTemporero: 0, costeEmpleadorMes: 450, desde: '2027-01-04', hasta: '2027-03-31', descripcion: 'Piso alquilado por Boscos del Gaià. Pendiente de la visita del ayuntamiento.' },
  { id: 'aloj-rull-vb', puebloId: 'vilabella', empleadorId: 'emp-rull-vb', nombre: 'Casa de Mas Rull (ejemplo)', modalidad: 'propio', viviendaId: null, lat: 41.2526, lng: 1.3266,
    plazas: 4, plazasLibres: 2, verificado: true, verificadoPor: 'Ajuntament de Vilabella', requisitos: { camasIndividuales: 4, banos: 1, cocina: true, calefaccion: true, lavadora: true },
    costeTemporero: 0, costeEmpleadorMes: null, desde: '2026-11-12', hasta: '2026-12-22', descripcion: 'Casa propia junto a la finca, incluida en el contrato.' }
];
