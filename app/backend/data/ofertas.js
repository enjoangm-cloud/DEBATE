// Ofertas de trabajo de la red. Salario orientativo ~9–10,5 €/h brutos (convenios de la provincia).
// Regla: si alojamiento.incluido, alojamientoId pertenece al MISMO empleador.
const aloj = (id) => ({ incluido: !!id, alojamientoId: id || null });
const bus = (id) => ({ incluido: !!id, recogidaId: id || null });

export const OFERTAS = [
  // --- Actuales (noviembre) ---
  { id: 'of-oliva-garriga', puebloId: 'vila-rodona', empleadorId: 'emp-garriga', sector: 'agricultura', cultivoId: 'oliva', titulo: 'Recogida de oliva (vareo y lonas)', inicio: '2026-11-03', fin: '2026-12-19', plazas: 8, plazasCubiertas: 5, salarioHora: 9.6,
    horario: 'L–S 8:00–15:30 (30 min descanso)', contrato: true, alojamiento: aloj('aloj-masgarriga'), transporte: bus('rec-placa'),
    tareas: ['Extender lonas', 'Varear con vara o vibrador', 'Llenar cajas y cargar'], idiomasEncargado: ['ca', 'es', 'fr'] },
  { id: 'of-oliva-pujol', puebloId: 'vila-rodona', empleadorId: 'emp-pujol', sector: 'agricultura', cultivoId: 'oliva', titulo: 'Oliva en olivos centenarios', inicio: '2026-11-09', fin: '2026-12-12', plazas: 6, plazasCubiertas: 3, salarioHora: 9.4,
    horario: 'L–V 8:00–15:00', contrato: true, alojamiento: aloj('aloj-pujol'), transporte: bus('rec-celler'),
    tareas: ['Vareo manual', 'Recogida en lonas', 'Limpieza de hoja'], idiomasEncargado: ['ca', 'es', 'ar'] },
  { id: 'of-oliva-sala', puebloId: 'vila-rodona', empleadorId: 'emp-sala', sector: 'agricultura', cultivoId: 'oliva', titulo: 'Oliva en espaldera (apoyo a máquina)', inicio: '2026-11-16', fin: '2026-12-18', plazas: 5, plazasCubiertas: 2, salarioHora: 9.5,
    horario: 'L–V 7:45–15:15', contrato: true, alojamiento: aloj(null), transporte: bus('rec-placa'),
    tareas: ['Repaso manual tras la máquina', 'Carga de remolque'], idiomasEncargado: ['es', 'ro'] },
  { id: 'of-oliva-hort', puebloId: 'aiguamurcia', empleadorId: 'emp-hort-ai', sector: 'agricultura', cultivoId: 'oliva', titulo: 'Recogida de oliva en finca pequeña', inicio: '2026-11-09', fin: '2026-12-12', plazas: 4, plazasCubiertas: 2, salarioHora: 9.5,
    horario: 'L–V 8:15–15:15', contrato: true, alojamiento: aloj(null), transporte: bus('rec-celler'),
    tareas: ['Vareo', 'Recogida en lonas', 'Carga de cajas'], idiomasEncargado: ['ca', 'es'] },
  { id: 'of-bodega-ai', puebloId: 'aiguamurcia', empleadorId: 'emp-celler-ai', sector: 'bodega', cultivoId: null, titulo: 'Bodega: trasiego, limpieza y embotellado', inicio: '2026-11-09', fin: '2027-02-26', plazas: 2, plazasCubiertas: 1, salarioHora: 10.2,
    horario: 'L–V 8:00–16:00', contrato: true, alojamiento: aloj('aloj-celler-ai'), transporte: bus(null),
    tareas: ['Trasiego y limpieza de depósitos', 'Embotellado y etiquetado', 'Preparar pedidos'], idiomasEncargado: ['ca', 'es', 'fr'] },
  { id: 'of-oliva-bosch', puebloId: 'montferri', empleadorId: 'emp-bosch-mo', sector: 'agricultura', cultivoId: 'oliva', titulo: 'Recogida de oliva', inicio: '2026-11-10', fin: '2026-12-15', plazas: 4, plazasCubiertas: 1, salarioHora: 9.4,
    horario: 'L–V 8:00–15:00', contrato: true, alojamiento: aloj(null), transporte: bus('rec-mo'),
    tareas: ['Vareo', 'Recogida en lonas'], idiomasEncargado: ['ca', 'es'] },
  { id: 'of-oliva-mestre', puebloId: 'brafim', empleadorId: 'emp-mestre-br', sector: 'agricultura', cultivoId: 'oliva', titulo: 'Recogida de oliva (sigue la poda en enero)', inicio: '2026-11-16', fin: '2026-12-18', plazas: 4, plazasCubiertas: 1, salarioHora: 9.5,
    horario: 'L–V 8:00–15:00', contrato: true, alojamiento: aloj('aloj-mestre-br'), transporte: bus(null),
    tareas: ['Vareo con vibrador', 'Recogida en lonas', 'Llevar la oliva al molino'], idiomasEncargado: ['ca', 'es', 'fr'] },
  { id: 'of-oliva-rull', puebloId: 'vilabella', empleadorId: 'emp-rull-vb', sector: 'agricultura', cultivoId: 'oliva', titulo: 'Recogida de oliva', inicio: '2026-11-12', fin: '2026-12-19', plazas: 5, plazasCubiertas: 2, salarioHora: 9.6,
    horario: 'L–S 8:00–15:00', contrato: true, alojamiento: aloj('aloj-rull-vb'), transporte: bus('rec-vb'),
    tareas: ['Vareo', 'Recogida en lonas', 'Limpieza de hoja'], idiomasEncargado: ['ca', 'es', 'ro'] },
  { id: 'of-cocina-fonda', puebloId: 'vila-rodona', empleadorId: 'emp-fonda', sector: 'hosteleria', cultivoId: null, titulo: 'Ayudante de cocina (fines de semana y fiestas)', inicio: '2026-11-21', fin: '2027-01-06', plazas: 1, plazasCubiertas: 0, salarioHora: 9.8,
    horario: 'V–D 11:00–16:00', contrato: true, alojamiento: aloj(null), transporte: bus(null),
    tareas: ['Preparar verduras y fondos', 'Emplatar', 'Limpieza de cocina'], idiomasEncargado: ['ca', 'es', 'en'] },

  // --- Próximas (invierno, primavera, verano) ---
  { id: 'of-poda-mestre', puebloId: 'brafim', empleadorId: 'emp-mestre-br', sector: 'agricultura', cultivoId: 'uva', titulo: 'Poda de viña', inicio: '2027-01-07', fin: '2027-02-26', plazas: 4, plazasCubiertas: 0, salarioHora: 10,
    horario: 'L–V 8:30–15:00', contrato: true, alojamiento: aloj('aloj-mestre-br'), transporte: bus(null),
    tareas: ['Poda en vaso y espaldera', 'Retirar sarmientos'], idiomasEncargado: ['ca', 'es', 'fr'] },
  { id: 'of-poda-vidal', puebloId: 'vila-rodona', empleadorId: 'emp-vidal', sector: 'agricultura', cultivoId: 'uva', titulo: 'Poda de viña en invierno', inicio: '2027-01-11', fin: '2027-02-26', plazas: 3, plazasCubiertas: 0, salarioHora: 10,
    horario: 'L–V 8:30–15:00', contrato: true, alojamiento: aloj(null), transporte: bus(null),
    tareas: ['Poda en vaso y espaldera', 'Retirar sarmientos'], idiomasEncargado: ['ca', 'es'] },
  { id: 'of-forestal-br', puebloId: 'brafim', empleadorId: 'emp-forestal-br', sector: 'forestal', cultivoId: null, titulo: 'Limpieza forestal y prevención de incendios', inicio: '2027-01-11', fin: '2027-03-31', plazas: 4, plazasCubiertas: 0, salarioHora: 10.5,
    horario: 'L–V 8:00–15:00', contrato: true, alojamiento: aloj('aloj-forestal-br'), transporte: bus('rec-br'),
    tareas: ['Desbroce con desbrozadora', 'Apilar y triturar ramas', 'Mantener franjas cortafuegos'], idiomasEncargado: ['ca', 'es', 'ro'] },
  { id: 'of-poda-garriga', puebloId: 'vila-rodona', empleadorId: 'emp-garriga', sector: 'agricultura', cultivoId: 'oliva', titulo: 'Poda de olivo', inicio: '2027-02-01', fin: '2027-03-12', plazas: 2, plazasCubiertas: 0, salarioHora: 9.8,
    horario: 'L–V 8:00–15:00', contrato: true, alojamiento: aloj('aloj-masgarriga'), transporte: bus(null),
    tareas: ['Poda con tijera y motosierra pequeña', 'Triturar ramas'], idiomasEncargado: ['ca', 'es', 'fr'] },
  { id: 'of-turismo-mirador', puebloId: 'montferri', empleadorId: 'emp-mirador-mo', sector: 'turismo', cultivoId: null, titulo: 'Atención a visitantes y limpieza (primavera)', inicio: '2027-03-26', fin: '2027-06-30', plazas: 1, plazasCubiertas: 0, salarioHora: 9.6,
    horario: 'J–D 9:00–15:00', contrato: true, alojamiento: aloj(null), transporte: bus(null),
    tareas: ['Recibir a los huéspedes', 'Limpieza y cambio de ropa', 'Acompañar rutas cortas'], idiomasEncargado: ['ca', 'es', 'en', 'fr'] },
  { id: 'of-turismo-camping', puebloId: 'aiguamurcia', empleadorId: 'emp-camping-ai', sector: 'turismo', cultivoId: null, titulo: 'Recepción y mantenimiento del càmping (temporada)', inicio: '2027-04-01', fin: '2027-09-30', plazas: 3, plazasCubiertas: 0, salarioHora: 9.7,
    horario: 'Turnos de 7 h, 5 días por semana', contrato: true, alojamiento: aloj('aloj-camping-ai'), transporte: bus(null),
    tareas: ['Recepción y reservas', 'Mantenimiento de parcelas', 'Limpieza de zonas comunes'], idiomasEncargado: ['ca', 'es', 'en', 'fr'] },
  { id: 'of-cocina-verano', puebloId: 'vila-rodona', empleadorId: 'emp-fonda', sector: 'hosteleria', cultivoId: null, titulo: 'Cocina y sala en verano', inicio: '2027-07-01', fin: '2027-09-15', plazas: 2, plazasCubiertas: 0, salarioHora: 9.8,
    horario: 'X–D, turno partido 12:00–16:00 y 20:00–23:00', contrato: true, alojamiento: aloj(null), transporte: bus(null),
    tareas: ['Ayudante de cocina', 'Servicio de sala'], idiomasEncargado: ['ca', 'es', 'en'] }
];
