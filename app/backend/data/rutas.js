// Rutas simuladas (en producción: Google Maps Routes API).
export const RUTAS = [
  { id: 'ruta-sur', nombre: 'Furgoneta sur-oeste', tipo: 'transporte', color: '#1a73e8', descripcion: "Sale 7:30 de la Plaça de l'Església hacia Mas Sala, Mas Garriga y Mas Vidal. Vuelta 15:30.",
    puntos: [[41.3127, 1.3594], [41.3105, 1.3580], [41.3040, 1.3570], [41.2985, 1.3560], [41.3010, 1.3500], [41.3040, 1.3455], [41.3080, 1.3380]] },
  { id: 'ruta-norte', nombre: 'Furgoneta norte', tipo: 'transporte', color: '#34a853', descripcion: 'Sale 7:45 del Celler Cooperatiu hacia Cal Pujol y Cal Roca. Vuelta 15:30.',
    puntos: [[41.3117, 1.3572], [41.3150, 1.3555], [41.3215, 1.3520], [41.3205, 1.3470], [41.3190, 1.3430]] },
  { id: 'ruta-cosechas', nombre: 'Ruta de las cosechas', tipo: 'cosechas', color: '#6b8e23', descripcion: 'Recorrido por las fincas con oliva en recogida esta semana.',
    puntos: [[41.3215, 1.3520], [41.3190, 1.3430], [41.3080, 1.3380], [41.3040, 1.3455], [41.2985, 1.3560]] },
  { id: 'ruta-visitante', nombre: 'Paseo del visitante', tipo: 'visitante', color: '#ea4335', descripcion: 'Celler Cooperatiu modernista, plaza, comercios y venta directa en finca.',
    puntos: [[41.3115, 1.3570], [41.3124, 1.3586], [41.3128, 1.3596], [41.3134, 1.3588], [41.3168, 1.3509], [41.3215, 1.3520]] }
];
