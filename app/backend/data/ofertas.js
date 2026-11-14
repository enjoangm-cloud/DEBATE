// Ofertas de trabajo. Salario orientativo según convenio del campo de Tarragona (~9–10 €/h brutos).
export const OFERTAS = [
  { id: 'of-oliva-garriga', fincaId: 'finca-garriga', cultivoId: 'oliva', titulo: 'Recogida de oliva (vareo y lonas)', inicio: '2026-11-03', fin: '2026-12-19', plazas: 8, plazasCubiertas: 5, salarioHora: 9.6,
    horario: 'L–S 8:00–15:30 (30 min descanso)', contrato: true, alojamiento: { incluido: true, lugarId: 'aloj-local' }, transporte: { incluido: true, recogidaId: 'rec-placa' },
    tareas: ['Extender lonas', 'Varear con vara o vibrador', 'Llenar cajas y cargar'], idiomasEncargado: ['ca', 'es', 'fr'] },
  { id: 'of-oliva-pujol', fincaId: 'finca-pujol', cultivoId: 'oliva', titulo: 'Oliva en olivos centenarios', inicio: '2026-11-09', fin: '2026-12-12', plazas: 6, plazasCubiertas: 3, salarioHora: 9.4,
    horario: 'L–V 8:00–15:00', contrato: true, alojamiento: { incluido: true, lugarId: 'aloj-major' }, transporte: { incluido: true, recogidaId: 'rec-celler' },
    tareas: ['Vareo manual', 'Recogida en lonas', 'Limpieza de hoja'], idiomasEncargado: ['ca', 'es', 'ar'] },
  { id: 'of-oliva-sala', fincaId: 'finca-sala', cultivoId: 'oliva', titulo: 'Oliva en espaldera (apoyo a máquina)', inicio: '2026-11-16', fin: '2026-12-18', plazas: 5, plazasCubiertas: 2, salarioHora: 9.5,
    horario: 'L–V 7:45–15:15', contrato: true, alojamiento: { incluido: false, lugarId: null }, transporte: { incluido: true, recogidaId: 'rec-placa' },
    tareas: ['Repaso manual tras la máquina', 'Carga de remolque'], idiomasEncargado: ['es', 'ro'] },
  { id: 'of-oliva-roca', fincaId: 'finca-roca', cultivoId: 'oliva', titulo: 'Recogida de oliva', inicio: '2026-11-10', fin: '2026-12-05', plazas: 6, plazasCubiertas: 2, salarioHora: 9.3,
    horario: 'L–S 8:00–15:00', contrato: true, alojamiento: { incluido: true, lugarId: 'aloj-escoles' }, transporte: { incluido: true, recogidaId: 'rec-celler' },
    tareas: ['Vareo', 'Recogida en lonas', 'Transporte de cajas'], idiomasEncargado: ['ca', 'es', 'fr'] },
  // Próximas
  { id: 'of-poda-vidal', fincaId: 'finca-vidal', cultivoId: 'uva', titulo: 'Poda de viña en invierno', inicio: '2027-01-11', fin: '2027-02-26', plazas: 3, plazasCubiertas: 0, salarioHora: 10,
    horario: 'L–V 8:30–15:00', contrato: true, alojamiento: { incluido: false, lugarId: null }, transporte: { incluido: false, recogidaId: null },
    tareas: ['Poda en vaso y espaldera', 'Retirar sarmientos'], idiomasEncargado: ['ca', 'es'] },
  { id: 'of-poda-garriga', fincaId: 'finca-garriga', cultivoId: 'oliva', titulo: 'Poda de olivo', inicio: '2027-02-01', fin: '2027-03-12', plazas: 2, plazasCubiertas: 0, salarioHora: 9.8,
    horario: 'L–V 8:00–15:00', contrato: true, alojamiento: { incluido: true, lugarId: 'aloj-masgarriga' }, transporte: { incluido: false, recogidaId: null },
    tareas: ['Poda con tijera y motosierra pequeña', 'Triturar ramas'], idiomasEncargado: ['ca', 'es', 'fr'] }
];
