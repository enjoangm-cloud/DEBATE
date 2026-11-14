// Calendario de la campaña 2026 (fechas aproximadas para secano del Alt Camp).
// El estado y los confirmados de la campaña activa se calculan en services/campana.js.
export const CALENDARIO = [
  { cultivoId: 'avellana', nombre: 'Avellana', inicio: '2026-08-20', fin: '2026-09-25', trabajadoresNecesarios: 12, trabajadoresConfirmados: 12, nota: 'Recogida con barredora y a mano en fincas pequeñas.' },
  { cultivoId: 'almendra', nombre: 'Almendra', inicio: '2026-08-25', fin: '2026-09-20', trabajadoresNecesarios: 15, trabajadoresConfirmados: 14, nota: 'Vareo y lonas; secado al sol antes de descascarar.' },
  { cultivoId: 'uva', nombre: 'Vendimia', inicio: '2026-09-01', fin: '2026-10-10', trabajadoresNecesarios: 60, trabajadoresConfirmados: 58, nota: 'Entrega en el Celler Cooperatiu. Campaña cerrada.' },
  { cultivoId: 'oliva', nombre: 'Oliva', inicio: '2026-11-03', fin: '2026-12-20', trabajadoresNecesarios: 25, trabajadoresConfirmados: null, nota: 'Campaña activa. No se varea con lluvia ni con mestral fuerte.' },
  { cultivoId: 'uva', nombre: 'Poda de viña', inicio: '2027-01-11', fin: '2027-02-26', trabajadoresNecesarios: 10, trabajadoresConfirmados: 2, nota: 'Trabajo de invierno; se buscan podadores con experiencia.' }
];
