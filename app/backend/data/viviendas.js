// Bolsa de viviendas para EMPLEADORES (ficticias): casas rurales vacías en invierno, viviendas vacías, albergue.
// Quien contrata la alquila y la paga; el temporero no paga nada. requisitos (extra) pasa al alojamiento al alquilar.
export const VIVIENDAS = [
  { id: 'viv-vr-casa', puebloId: 'vila-rodona', tipo: 'vivienda_vacia', nombre: 'Casa de pueblo de la família Rovira (ejemplo)', propietario: 'Família Rovira (ejemplo)', lat: 41.3134, lng: 1.3588,
    plazas: 5, precioMes: 600, disponibleDesde: '2026-11-01', disponibleHasta: '2027-03-31', nota: 'Casa vacía desde hace dos años. Alquilada por Cal Pujol para la oliva.', alquiladaPor: 'emp-pujol',
    requisitos: { camasIndividuales: 5, banos: 2, cocina: true, calefaccion: true, lavadora: true } },
  { id: 'viv-vr-rural', puebloId: 'vila-rodona', tipo: 'casa_rural', nombre: 'Casa rural Cal Vinyes (ejemplo)', propietario: 'Carme Vinyes (ejemplo)', lat: 41.3168, lng: 1.3509,
    plazas: 6, precioMes: 750, disponibleDesde: '2026-11-15', disponibleHasta: '2027-03-15', nota: 'En invierno casi no hay turistas: prefiere un alquiler estable de noviembre a marzo.', alquiladaPor: null,
    requisitos: { camasIndividuales: 6, banos: 2, cocina: true, calefaccion: true, lavadora: true } },
  { id: 'viv-ai-albergue', puebloId: 'aiguamurcia', tipo: 'albergue', nombre: 'Albergue de grupos (ejemplo)', propietario: 'Associació Gaià Jove (ejemplo)', lat: 41.3296, lng: 1.3584,
    plazas: 10, precioMes: 1100, disponibleDesde: '2026-11-01', disponibleHasta: '2027-03-31', nota: 'Sin grupos escolares en invierno. Literas, cocina común y duchas.', alquiladaPor: null,
    requisitos: { camasIndividuales: 10, banos: 3, cocina: true, calefaccion: true, lavadora: true } },
  { id: 'viv-mo-mirador', puebloId: 'montferri', tipo: 'casa_rural', nombre: 'Casa rural El Mirador (ejemplo)', propietario: 'Pere Vives (ejemplo)', lat: 41.2690, lng: 1.3690,
    plazas: 5, precioMes: 600, disponibleDesde: '2026-11-15', disponibleHasta: '2027-03-20', nota: 'La casa rural cierra en invierno; su dueño la alquila a quien contrata hasta Semana Santa.', alquiladaPor: null,
    requisitos: { camasIndividuales: 5, banos: 2, cocina: true, calefaccion: true, lavadora: true } },
  { id: 'viv-br-casa', puebloId: 'brafim', tipo: 'vivienda_vacia', nombre: 'Casa de la família Bonet (ejemplo)', propietario: 'Família Bonet (ejemplo)', lat: 41.2709, lng: 1.3420,
    plazas: 4, precioMes: 500, disponibleDesde: '2026-11-01', disponibleHasta: '2027-02-28', nota: 'Alquilada por Cal Mestre para la oliva y la poda.', alquiladaPor: 'emp-mestre-br',
    requisitos: { camasIndividuales: 4, banos: 1, cocina: true, calefaccion: true, lavadora: true } },
  { id: 'viv-br-pis', puebloId: 'brafim', tipo: 'vivienda_vacia', nombre: 'Piso vacío en el centro (ejemplo)', propietario: 'Marc Ferrer (ejemplo)', lat: 41.2703, lng: 1.3412,
    plazas: 4, precioMes: 450, disponibleDesde: '2027-01-04', disponibleHasta: '2027-03-31', nota: 'Alquilado por Boscos del Gaià para la campaña forestal de invierno.', alquiladaPor: 'emp-forestal-br',
    requisitos: { camasIndividuales: 4, banos: 1, cocina: true, calefaccion: true, lavadora: false } },
  { id: 'viv-vb-casa', puebloId: 'vilabella', tipo: 'vivienda_vacia', nombre: 'Casa heredada sin uso (ejemplo)', propietario: 'Família Sabaté (ejemplo)', lat: 41.2495, lng: 1.3318,
    plazas: 4, precioMes: 480, disponibleDesde: '2026-11-15', disponibleHasta: '2027-06-30', nota: 'Los dueños viven en Tarragona; la alquilan por meses a quien contrata.', alquiladaPor: null,
    requisitos: { camasIndividuales: 4, banos: 1, cocina: true, calefaccion: true, lavadora: true } }
];
