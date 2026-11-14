// Calendario de cosechas 2026 y poda de viña 2027 por pueblo (fechas aproximadas para secano del Alt Camp).
// El estado y los confirmados de la etapa en curso se calculan en services/campana.js.
export const CALENDARIO = [
  { id: 'cal-vr-avellana', puebloId: 'vila-rodona', cultivoId: 'avellana', nombre: 'Avellana', inicio: '2026-08-20', fin: '2026-09-25', trabajadoresNecesarios: 6, trabajadoresConfirmados: 6, nota: 'Recogida con barredora y a mano en fincas pequeñas.' },
  { id: 'cal-vr-almendra', puebloId: 'vila-rodona', cultivoId: 'almendra', nombre: 'Almendra', inicio: '2026-08-25', fin: '2026-09-20', trabajadoresNecesarios: 6, trabajadoresConfirmados: 6, nota: 'Vareo y lonas; secado al sol antes de descascarar.' },
  { id: 'cal-vr-uva', puebloId: 'vila-rodona', cultivoId: 'uva', nombre: 'Vendimia', inicio: '2026-09-01', fin: '2026-10-10', trabajadoresNecesarios: 24, trabajadoresConfirmados: 23, nota: 'Entrega en el Celler Cooperatiu. Campaña cerrada.' },
  { id: 'cal-vr-oliva', puebloId: 'vila-rodona', cultivoId: 'oliva', nombre: 'Oliva', inicio: '2026-11-03', fin: '2026-12-20', trabajadoresNecesarios: 19, trabajadoresConfirmados: null, nota: 'Campaña activa. No se varea con lluvia ni con mestral fuerte.' },
  { id: 'cal-vr-poda', puebloId: 'vila-rodona', cultivoId: 'uva', nombre: 'Poda de viña', inicio: '2027-01-11', fin: '2027-02-26', trabajadoresNecesarios: 5, trabajadoresConfirmados: 0, nota: 'Trabajo de invierno; se buscan podadores con experiencia.' },

  { id: 'cal-ai-uva', puebloId: 'aiguamurcia', cultivoId: 'uva', nombre: 'Vendimia', inicio: '2026-09-05', fin: '2026-10-08', trabajadoresNecesarios: 18, trabajadoresConfirmados: 18, nota: 'Viña de la DO Penedès. Campaña cerrada.' },
  { id: 'cal-ai-oliva', puebloId: 'aiguamurcia', cultivoId: 'oliva', nombre: 'Oliva', inicio: '2026-11-09', fin: '2026-12-12', trabajadoresNecesarios: 4, trabajadoresConfirmados: null, nota: 'Campaña corta en fincas pequeñas.' },
  { id: 'cal-ai-poda', puebloId: 'aiguamurcia', cultivoId: 'uva', nombre: 'Poda de viña', inicio: '2027-01-07', fin: '2027-02-19', trabajadoresNecesarios: 3, trabajadoresConfirmados: 0, nota: 'Se combina con el trabajo de bodega.' },

  { id: 'cal-mo-almendra', puebloId: 'montferri', cultivoId: 'almendra', nombre: 'Almendra', inicio: '2026-08-24', fin: '2026-09-18', trabajadoresNecesarios: 5, trabajadoresConfirmados: 5, nota: 'Campaña cerrada.' },
  { id: 'cal-mo-oliva', puebloId: 'montferri', cultivoId: 'oliva', nombre: 'Oliva', inicio: '2026-11-10', fin: '2026-12-15', trabajadoresNecesarios: 4, trabajadoresConfirmados: null, nota: 'Campaña activa; furgoneta de la red desde Vila-rodona.' },

  { id: 'cal-br-uva', puebloId: 'brafim', cultivoId: 'uva', nombre: 'Vendimia', inicio: '2026-09-03', fin: '2026-10-06', trabajadoresNecesarios: 16, trabajadoresConfirmados: 15, nota: 'Campaña cerrada.' },
  { id: 'cal-br-oliva', puebloId: 'brafim', cultivoId: 'oliva', nombre: 'Oliva', inicio: '2026-11-16', fin: '2026-12-18', trabajadoresNecesarios: 4, trabajadoresConfirmados: 1, nota: 'Empieza el lunes 16.' },
  { id: 'cal-br-poda', puebloId: 'brafim', cultivoId: 'uva', nombre: 'Poda de viña', inicio: '2027-01-07', fin: '2027-02-26', trabajadoresNecesarios: 4, trabajadoresConfirmados: 0, nota: 'Encadena con la oliva de diciembre.' },

  { id: 'cal-vb-almendra', puebloId: 'vilabella', cultivoId: 'almendra', nombre: 'Almendra', inicio: '2026-08-27', fin: '2026-09-22', trabajadoresNecesarios: 6, trabajadoresConfirmados: 6, nota: 'Campaña cerrada.' },
  { id: 'cal-vb-oliva', puebloId: 'vilabella', cultivoId: 'oliva', nombre: 'Oliva', inicio: '2026-11-12', fin: '2026-12-19', trabajadoresNecesarios: 5, trabajadoresConfirmados: null, nota: 'Campaña activa.' },
  { id: 'cal-vb-poda', puebloId: 'vilabella', cultivoId: 'uva', nombre: 'Poda de viña', inicio: '2027-01-18', fin: '2027-02-26', trabajadoresNecesarios: 2, trabajadoresConfirmados: 0, nota: 'Viña pequeña; poda en vaso.' }
];
