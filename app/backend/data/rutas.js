// Rutas simuladas (en producción: Google Maps Routes API). pueblos = pueblos por los que pasa.
export const RUTAS = [
  { id: 'ruta-red', nombre: 'Furgoneta compartida de la red', tipo: 'transporte', color: '#1a73e8', puebloId: 'red',
    pueblos: ['vilabella', 'brafim', 'montferri', 'vila-rodona', 'aiguamurcia'],
    descripcion: 'Vilabella 7:00 · Bràfim 7:10 · Montferri 7:20 · Vila-rodona 7:30 · Aiguamúrcia 7:45. Vuelta 15:30. Los empleadores pagan por plaza usada.',
    puntos: [[41.2493, 1.3312], [41.2600, 1.3360], [41.2707, 1.3415], [41.2673, 1.3667], [41.2900, 1.3640], [41.3127, 1.3594], [41.3200, 1.3600], [41.3291, 1.3593]] },
  { id: 'ruta-sur', nombre: 'Furgoneta sur-oeste (Vila-rodona)', tipo: 'transporte', color: '#0b8043', puebloId: 'vila-rodona',
    pueblos: ['vila-rodona'],
    descripcion: "Sale 7:30 de la Plaça de l'Església hacia Mas Sala, Mas Garriga y Mas Vidal. Vuelta 15:30.",
    puntos: [[41.3127, 1.3594], [41.3085, 1.3598], [41.3040, 1.3600], [41.3055, 1.3550], [41.3065, 1.3520], [41.3100, 1.3470]] },
  { id: 'ruta-norte', nombre: 'Furgoneta norte (Vila-rodona – Aiguamúrcia)', tipo: 'transporte', color: '#34a853', puebloId: 'vila-rodona',
    pueblos: ['vila-rodona', 'aiguamurcia'],
    descripcion: "Sale 7:45 del Celler Cooperatiu hacia Cal Pujol y Mas de l'Hort. Vuelta 15:30.",
    puntos: [[41.3117, 1.3572], [41.3150, 1.3555], [41.3195, 1.3530], [41.3240, 1.3500]] },
  { id: 'ruta-cosechas', nombre: 'Cosechas encadenadas en la red', tipo: 'cosechas', color: '#6b8e23', puebloId: 'red',
    pueblos: ['montferri', 'vila-rodona', 'brafim', 'aiguamurcia', 'vilabella'],
    descripcion: 'Almendra en Montferri (ago) → avellana en Vila-rodona (ago–sep) → vendimia en Bràfim y Aiguamúrcia (sep–oct) → oliva en Vila-rodona y Vilabella (nov–dic) → poda y bosque en Bràfim (ene–mar).',
    puntos: [[41.2620, 1.3600], [41.3100, 1.3470], [41.2745, 1.3360], [41.3240, 1.3500], [41.3065, 1.3520], [41.2530, 1.3260], [41.2690, 1.3460]] },
  { id: 'ruta-turistica', nombre: 'Ruta turística: Cister y modernismo', tipo: 'visitante', color: '#ea4335', puebloId: 'red',
    pueblos: ['aiguamurcia', 'vila-rodona', 'montferri'],
    descripcion: 'Reial Monestir de Santes Creus → Celler Cooperatiu de Vila-rodona (Cèsar Martinell) → santuario de Montferri (Josep M. Jujol).',
    puntos: [[41.3475, 1.3606], [41.3290, 1.3590], [41.3115, 1.3570], [41.2900, 1.3640], [41.2640, 1.3655]] }
];
