// Emparejamientos propuestos por la "IA" (simula Vertex AI / Gemini). Decide siempre el dinamizador.
export const EMPAREJAMIENTOS = [
  { id: 'emp-01', temporeroId: 'tmp-02', ofertaId: 'of-oliva-pujol', alojamientoId: 'aloj-major',
    motivo: 'Habla árabe como el encargado, tiene experiencia en oliva y necesita cama: Casa del carrer Major tiene 2 libres.', confianza: 0.91, estado: 'propuesto' },
  { id: 'emp-02', temporeroId: 'tmp-01', ofertaId: 'of-oliva-sala', alojamientoId: 'aloj-local',
    motivo: 'Habla rumano como la encargada de Mas Sala y ya ha recogido oliva. Necesita cama: el local municipal tiene 4 libres y la furgoneta sale de la plaza.', confianza: 0.88, estado: 'propuesto' },
  { id: 'emp-03', temporeroId: 'tmp-04', ofertaId: 'of-oliva-roca', alojamientoId: 'aloj-escoles',
    motivo: 'Habla francés como el encargado de Cal Roca y sabe varear. Necesita cama: la casa del carrer de les Escoles tiene 1 libre.', confianza: 0.84, estado: 'propuesto' },
  { id: 'emp-04', temporeroId: 'tmp-06', ofertaId: 'of-oliva-garriga', alojamientoId: null,
    motivo: 'Vive en la comarca y no necesita cama ni furgoneta. Tiene experiencia en oliva y habla catalán como el encargado.', confianza: 0.79, estado: 'propuesto' },
  { id: 'emp-05', temporeroId: 'tmp-03', ofertaId: 'of-oliva-garriga', alojamientoId: 'aloj-local',
    motivo: 'Habla francés como el encargado. Solo ha hecho vendimia, pero Mas Garriga forma en vareo. Cama en el local municipal.', confianza: 0.62, estado: 'propuesto' }
];
