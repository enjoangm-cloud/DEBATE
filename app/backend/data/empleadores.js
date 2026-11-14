// Empleadores FICTICIOS ("(ejemplo)") de los 5 pueblos y 5 sectores. Teléfonos ficticios.
// Extras internos: ventasPreviasKg (venta directa antes de hoy) y kgPorUnidad en productos.
const sinVenta = null;
export const EMPLEADORES = [
  // --- Vila-rodona ---
  { id: 'emp-garriga', puebloId: 'vila-rodona', tipo: 'finca', sector: 'agricultura', nombre: 'Mas Garriga (ejemplo)', propietario: 'Josep Garriga (ejemplo)', lat: 41.3065, lng: 1.3520, telefono: '600 000 101',
    descripcion: 'Olivar de arbequina y viña de macabeo. Contrato, cama en la masía y formación en vareo.', campanaDigna: true, cultivos: ['oliva', 'uva'], hectareas: 14, ventasPreviasKg: 120,
    ventaDirecta: { activa: true, diasRecogida: 'Sábados 10:00–13:00', productos: [
      { id: 'garriga-aceite5', nombre: 'Aceite de oliva virgen extra (garrafa 5 l)', precio: 45, unidad: 'garrafa 5 l', stock: 40, kgPorUnidad: 4.6 },
      { id: 'garriga-aceite1', nombre: 'Aceite de oliva virgen extra (botella 1 l)', precio: 10, unidad: 'botella 1 l', stock: 60, kgPorUnidad: 0.92 }
    ] } },
  { id: 'emp-pujol', puebloId: 'vila-rodona', tipo: 'finca', sector: 'agricultura', nombre: 'Cal Pujol (ejemplo)', propietario: 'Núria Pujol (ejemplo)', lat: 41.3195, lng: 1.3530, telefono: '600 000 102',
    descripcion: 'Olivos centenarios y almendros. Contrato, casa alquilada en el pueblo para su cuadrilla y furgoneta.', campanaDigna: true, cultivos: ['oliva', 'almendra'], hectareas: 9, ventasPreviasKg: 85,
    ventaDirecta: { activa: true, diasRecogida: 'Viernes 17:00–19:00 y sábados 10:00–13:00', productos: [
      { id: 'pujol-almendra-grano', nombre: 'Almendra en grano', precio: 14, unidad: 'kg', stock: 50, kgPorUnidad: 1 },
      { id: 'pujol-almendra-cascara', nombre: 'Almendra con cáscara', precio: 4.5, unidad: 'kg', stock: 120, kgPorUnidad: 1 },
      { id: 'pujol-aceite1', nombre: 'Aceite de oliva virgen extra (botella 1 l)', precio: 9.5, unidad: 'botella 1 l', stock: 30, kgPorUnidad: 0.92 }
    ] } },
  { id: 'emp-vidal', puebloId: 'vila-rodona', tipo: 'finca', sector: 'agricultura', nombre: 'Mas Vidal (ejemplo)', propietario: 'Ramon Vidal (ejemplo)', lat: 41.3100, lng: 1.3470, telefono: '600 000 103',
    descripcion: 'Avellanos y viña en terrazas. Contrata gente del pueblo para la poda; vende avellana y vino a granel.', campanaDigna: false, cultivos: ['avellana', 'uva'], hectareas: 7, ventasPreviasKg: 60,
    ventaDirecta: { activa: true, diasRecogida: 'Domingos 10:00–13:00', productos: [
      { id: 'vidal-avellana-tostada', nombre: 'Avellana tostada', precio: 13, unidad: 'kg', stock: 25, kgPorUnidad: 1 },
      { id: 'vidal-avellana-cascara', nombre: 'Avellana con cáscara', precio: 5, unidad: 'kg', stock: 80, kgPorUnidad: 1 },
      { id: 'vidal-vino-granel', nombre: 'Vino blanco a granel (traed garrafa)', precio: 2.5, unidad: 'l', stock: 300, kgPorUnidad: 1 }
    ] } },
  { id: 'emp-sala', puebloId: 'vila-rodona', tipo: 'finca', sector: 'agricultura', nombre: 'Mas Sala (ejemplo)', propietario: 'Albert Sala (ejemplo)', lat: 41.3040, lng: 1.3600, telefono: '600 000 104',
    descripcion: 'Olivar joven en espaldera. Contrato y furgoneta; contrata a gente que ya vive en la zona.', campanaDigna: false, cultivos: ['oliva'], hectareas: 6, ventasPreviasKg: 0, ventaDirecta: sinVenta },
  { id: 'emp-fonda', puebloId: 'vila-rodona', tipo: 'restaurante', sector: 'hosteleria', nombre: 'Fonda de la Plaça (ejemplo)', propietario: 'Rosa Batet (ejemplo)', lat: 41.3126, lng: 1.3601, telefono: '600 000 105',
    descripcion: 'Restaurante de cocina de temporada. Refuerza la cocina en fiestas, fines de semana de otoño y verano.', campanaDigna: true, cultivos: [], hectareas: null, ventasPreviasKg: 0, ventaDirecta: sinVenta },

  // --- Aiguamúrcia ---
  { id: 'emp-celler-ai', puebloId: 'aiguamurcia', tipo: 'bodega', sector: 'bodega', nombre: 'Celler Mas del Gaià (ejemplo)', propietario: 'Anna Soler (ejemplo)', lat: 41.3275, lng: 1.3560, telefono: '600 000 201',
    descripcion: 'Bodega pequeña de la DO Penedès. Trabajo de bodega en invierno (trasiego, embotellado) y enoturismo.', campanaDigna: true, cultivos: [], hectareas: null, ventasPreviasKg: 140,
    ventaDirecta: { activa: true, diasRecogida: 'Sábados 10:00–14:00', productos: [
      { id: 'celler-blanc', nombre: 'Vino blanco DO Penedès (botella 75 cl)', precio: 9, unidad: 'botella', stock: 120, kgPorUnidad: 1.3 },
      { id: 'celler-negre', nombre: 'Vino tinto DO Penedès (botella 75 cl)', precio: 11, unidad: 'botella', stock: 90, kgPorUnidad: 1.3 }
    ] } },
  { id: 'emp-camping-ai', puebloId: 'aiguamurcia', tipo: 'camping', sector: 'turismo', nombre: 'Càmping del Gaià (ejemplo)', propietario: 'Jordi Mas (ejemplo)', lat: 41.3395, lng: 1.3600, telefono: '600 000 202',
    descripcion: 'Càmping de temporada en el camino de Santes Creus. Abre de abril a septiembre; aloja a su personal en bungalows.', campanaDigna: true, cultivos: [], hectareas: null, ventasPreviasKg: 0, ventaDirecta: sinVenta },
  { id: 'emp-hort-ai', puebloId: 'aiguamurcia', tipo: 'finca', sector: 'agricultura', nombre: "Mas de l'Hort (ejemplo)", propietario: 'Pere Gil (ejemplo)', lat: 41.3240, lng: 1.3500, telefono: '600 000 203',
    descripcion: 'Viña y olivar. Su cuadrilla llega en la furgoneta de la red desde Vila-rodona.', campanaDigna: false, cultivos: ['uva', 'oliva'], hectareas: 10, ventasPreviasKg: 0, ventaDirecta: sinVenta },

  // --- Montferri ---
  { id: 'emp-mirador-mo', puebloId: 'montferri', tipo: 'casa_rural', sector: 'turismo', nombre: 'Casa rural El Mirador (ejemplo)', propietario: 'Pere Vives (ejemplo)', lat: 41.2690, lng: 1.3690, telefono: '600 000 301',
    descripcion: 'Casa rural abierta de primavera a otoño. En invierno la ofrece en la bolsa de viviendas y organiza rutas.', campanaDigna: true, cultivos: [], hectareas: null, ventasPreviasKg: 0, ventaDirecta: sinVenta },
  { id: 'emp-bosch-mo', puebloId: 'montferri', tipo: 'finca', sector: 'agricultura', nombre: 'Mas Bosch (ejemplo)', propietario: 'Teresa Bosch (ejemplo)', lat: 41.2620, lng: 1.3600, telefono: '600 000 302',
    descripcion: 'Olivos y almendros. Busca vivienda en la bolsa para alojar a su cuadrilla.', campanaDigna: false, cultivos: ['oliva', 'almendra'], hectareas: 8, ventasPreviasKg: 30,
    ventaDirecta: { activa: true, diasRecogida: 'Sábados 11:00–13:00', productos: [
      { id: 'bosch-almendra-grano', nombre: 'Almendra en grano', precio: 13.5, unidad: 'kg', stock: 30, kgPorUnidad: 1 }
    ] } },

  // --- Bràfim ---
  { id: 'emp-mestre-br', puebloId: 'brafim', tipo: 'finca', sector: 'agricultura', nombre: 'Cal Mestre (ejemplo)', propietario: 'Lluís Mestre (ejemplo)', lat: 41.2745, lng: 1.3360, telefono: '600 000 401',
    descripcion: 'Viña y olivar. Encadena oliva (nov–dic) y poda de viña (ene–feb) con la misma cuadrilla y la misma casa.', campanaDigna: true, cultivos: ['uva', 'oliva'], hectareas: 12, ventasPreviasKg: 40,
    ventaDirecta: { activa: true, diasRecogida: 'Sábados 10:00–12:00', productos: [
      { id: 'mestre-vino-granel', nombre: 'Vino tinto a granel (traed garrafa)', precio: 2.8, unidad: 'l', stock: 200, kgPorUnidad: 1 },
      { id: 'mestre-aceite1', nombre: 'Aceite de oliva virgen extra (botella 1 l)', precio: 9.8, unidad: 'botella 1 l', stock: 40, kgPorUnidad: 0.92 }
    ] } },
  { id: 'emp-forestal-br', puebloId: 'brafim', tipo: 'empresa_forestal', sector: 'forestal', nombre: 'Boscos del Gaià SCCL (ejemplo)', propietario: 'Cooperativa Boscos del Gaià (ejemplo)', lat: 41.2690, lng: 1.3460, telefono: '600 000 402',
    descripcion: 'Limpieza de bosque y franjas de prevención de incendios en invierno. Presta su trituradora de poda a la red.', campanaDigna: true, cultivos: [], hectareas: null, ventasPreviasKg: 0, ventaDirecta: sinVenta },

  // --- Vilabella ---
  { id: 'emp-rull-vb', puebloId: 'vilabella', tipo: 'finca', sector: 'agricultura', nombre: 'Mas Rull (ejemplo)', propietario: 'Carles Rull (ejemplo)', lat: 41.2530, lng: 1.3260, telefono: '600 000 501',
    descripcion: 'Olivar y almendros. Contrato y casa propia junto a la finca.', campanaDigna: true, cultivos: ['oliva', 'almendra'], hectareas: 10, ventasPreviasKg: 50,
    ventaDirecta: { activa: true, diasRecogida: 'Domingos 10:00–13:00', productos: [
      { id: 'rull-aceite5', nombre: 'Aceite de oliva virgen extra (garrafa 5 l)', precio: 44, unidad: 'garrafa 5 l', stock: 20, kgPorUnidad: 4.6 },
      { id: 'rull-almendra-cascara', nombre: 'Almendra con cáscara', precio: 4.5, unidad: 'kg', stock: 60, kgPorUnidad: 1 }
    ] } }
];
