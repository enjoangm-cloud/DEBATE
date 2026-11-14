// Emparejamientos propuestos por la "IA" (simula Vertex AI / Gemini). Decide siempre el dinamizador.
// alojamientoId es siempre del empleador de la oferta (o null si la oferta no incluye alojamiento).
export const EMPAREJAMIENTOS = [
  { id: 'emp-01', temporeroId: 'tmp-02', ofertaId: 'of-oliva-pujol', alojamientoId: 'aloj-pujol',
    motivo: 'Habla árabe como el encargado de Cal Pujol y tiene experiencia en oliva. Cal Pujol le da cama en su casa alquilada (2 libres) y furgoneta.', confianza: 0.91, estado: 'propuesto' },
  { id: 'emp-02', temporeroId: 'tmp-01', ofertaId: 'of-oliva-rull', alojamientoId: 'aloj-rull-vb',
    motivo: 'Habla rumano como el encargado de Mas Rull y ya ha recogido oliva. Acaba la oliva en Vilabella el 19/12 y empieza la poda en Bràfim el 7/1.', confianza: 0.88, estado: 'propuesto' },
  { id: 'emp-03', temporeroId: 'tmp-04', ofertaId: 'of-oliva-mestre', alojamientoId: 'aloj-mestre-br',
    motivo: 'Habla francés como el encargado de Cal Mestre y sabe varear. Acaba la oliva en Bràfim el 18/12 y sigue con la poda en la misma finca el 7/1, en la misma casa.', confianza: 0.85, estado: 'propuesto' },
  { id: 'emp-04', temporeroId: 'tmp-06', ofertaId: 'of-oliva-bosch', alojamientoId: null,
    motivo: 'Vive en la comarca y no necesita cama ni furgoneta. Tiene experiencia en oliva y habla catalán como la encargada de Mas Bosch.', confianza: 0.79, estado: 'propuesto' },
  { id: 'emp-05', temporeroId: 'tmp-03', ofertaId: 'of-oliva-garriga', alojamientoId: 'aloj-masgarriga',
    motivo: 'Habla francés como el encargado. Solo ha hecho vendimia, pero Mas Garriga forma en vareo y le queda 1 cama en la masía.', confianza: 0.62, estado: 'propuesto' },
  { id: 'emp-06', temporeroId: 'tmp-10', ofertaId: 'of-oliva-pujol', alojamientoId: 'aloj-pujol',
    motivo: 'Ya pidió esta oferta, sabe recoger oliva y habla castellano. Cama en la casa de Cal Pujol.', confianza: 0.74, estado: 'propuesto' },
  { id: 'emp-07', temporeroId: 'tmp-09', ofertaId: 'of-poda-vidal', alojamientoId: null,
    motivo: 'Vive en Vila-rodona y conoce la viña. Queda libre en invierno: la poda de Mas Vidal empieza el 11/1.', confianza: 0.81, estado: 'propuesto' }
];
