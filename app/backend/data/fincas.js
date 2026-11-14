// Fincas FICTICIAS (nombres y propietarios marcados "(ejemplo)"). Teléfonos ficticios.
// kgPorUnidad (extra) sirve para calcular kg vendidos en directo; ventasPreviasKg = ventas antes de hoy.
export const FINCAS = [
  { id: 'finca-garriga', nombre: 'Mas Garriga (ejemplo)', propietario: 'Josep Garriga (ejemplo)', cultivos: ['oliva', 'uva'], hectareas: 14, lat: 41.3040, lng: 1.3455, telefono: '600 000 101',
    descripcion: 'Olivar de arbequina y viña de macabeo. Ofrece contrato, cama en la masía y formación en vareo.', campanaDigna: true, ventasPreviasKg: 120,
    ventaDirecta: { activa: true, diasRecogida: 'Sábados 10:00–13:00', productos: [
      { id: 'garriga-aceite5', nombre: 'Aceite de oliva virgen extra (garrafa 5 l)', precio: 45, unidad: 'garrafa 5 l', stock: 40, kgPorUnidad: 4.6 },
      { id: 'garriga-aceite1', nombre: 'Aceite de oliva virgen extra (botella 1 l)', precio: 10, unidad: 'botella 1 l', stock: 60, kgPorUnidad: 0.92 }
    ] } },
  { id: 'finca-pujol', nombre: 'Cal Pujol (ejemplo)', propietario: 'Núria Pujol (ejemplo)', cultivos: ['oliva', 'almendra'], hectareas: 9, lat: 41.3215, lng: 1.3520, telefono: '600 000 102',
    descripcion: 'Olivos centenarios y almendros. Contrato, casa cedida en el pueblo y furgoneta.', campanaDigna: true, ventasPreviasKg: 85,
    ventaDirecta: { activa: true, diasRecogida: 'Viernes 17:00–19:00 y sábados 10:00–13:00', productos: [
      { id: 'pujol-almendra-grano', nombre: 'Almendra en grano', precio: 14, unidad: 'kg', stock: 50, kgPorUnidad: 1 },
      { id: 'pujol-almendra-cascara', nombre: 'Almendra con cáscara', precio: 4.5, unidad: 'kg', stock: 120, kgPorUnidad: 1 },
      { id: 'pujol-aceite1', nombre: 'Aceite de oliva virgen extra (botella 1 l)', precio: 9.5, unidad: 'botella 1 l', stock: 30, kgPorUnidad: 0.92 }
    ] } },
  { id: 'finca-vidal', nombre: 'Mas Vidal (ejemplo)', propietario: 'Ramon Vidal (ejemplo)', cultivos: ['avellana', 'uva'], hectareas: 7, lat: 41.3080, lng: 1.3380, telefono: '600 000 103',
    descripcion: 'Avellanos y viña en terrazas. Vende avellana y vino a granel en la finca.', campanaDigna: false, ventasPreviasKg: 60,
    ventaDirecta: { activa: true, diasRecogida: 'Domingos 10:00–13:00', productos: [
      { id: 'vidal-avellana-tostada', nombre: 'Avellana tostada', precio: 13, unidad: 'kg', stock: 25, kgPorUnidad: 1 },
      { id: 'vidal-avellana-cascara', nombre: 'Avellana con cáscara', precio: 5, unidad: 'kg', stock: 80, kgPorUnidad: 1 },
      { id: 'vidal-vino-granel', nombre: 'Vino blanco a granel (traed garrafa)', precio: 2.5, unidad: 'l', stock: 300, kgPorUnidad: 1 }
    ] } },
  { id: 'finca-roca', nombre: 'Cal Roca (ejemplo)', propietario: 'Montse Roca (ejemplo)', cultivos: ['uva', 'oliva'], hectareas: 11, lat: 41.3190, lng: 1.3430, telefono: '600 000 104',
    descripcion: 'Viña para el Celler Cooperatiu y olivar. Contrato y casa cedida en el pueblo.', campanaDigna: true, ventasPreviasKg: 0,
    ventaDirecta: { activa: false, diasRecogida: null, productos: [] } },
  { id: 'finca-sala', nombre: 'Mas Sala (ejemplo)', propietario: 'Albert Sala (ejemplo)', cultivos: ['oliva'], hectareas: 6, lat: 41.2985, lng: 1.3560, telefono: '600 000 105',
    descripcion: 'Olivar joven en espaldera. Contrato y furgoneta desde la plaza; sin alojamiento propio.', campanaDigna: false, ventasPreviasKg: 0,
    ventaDirecta: { activa: false, diasRecogida: null, productos: [] } }
];
