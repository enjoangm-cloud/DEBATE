// Ayuda mutua entre pueblos de la red (ficticia). desde = pueblo que presta la ayuda; hacia = pueblo que la recibe.
export const AYUDA_MUTUA = [
  { id: 'ayu-01', fecha: '2026-11-17', desdePuebloId: 'vila-rodona', haciaPuebloId: 'aiguamurcia', personas: 4, tipo: 'cuadrilla', estado: 'propuesta',
    motivo: 'El martes 17 llueve (12 mm) y no se puede varear en Vila-rodona: la cuadrilla de oliva de Mas Garriga trabaja ese día a cubierto en el Celler Mas del Gaià (ejemplo).' },
  { id: 'ayu-02', fecha: '2026-11-16', desdePuebloId: 'vila-rodona', haciaPuebloId: 'montferri', personas: 3, tipo: 'transporte', estado: 'aceptada',
    motivo: 'Furgoneta compartida: la ruta de la red recoge en Montferri a las 7:20 y lleva a 3 personas a Mas Bosch; los empleadores pagan por plaza usada.' },
  { id: 'ayu-03', fecha: '2026-11-20', desdePuebloId: 'vilabella', haciaPuebloId: 'aiguamurcia', personas: 2, tipo: 'cuadrilla', estado: 'propuesta',
    motivo: 'El viernes 20 sopla mestral (55 km/h) y no se varea: 2 personas de Mas Rull ayudan a preparar pedidos en la bodega de Aiguamúrcia y recuperan la jornada.' },
  { id: 'ayu-04', fecha: '2027-01-11', desdePuebloId: 'brafim', haciaPuebloId: 'vila-rodona', personas: 1, tipo: 'maquinaria', estado: 'propuesta',
    motivo: 'Boscos del Gaià (ejemplo) presta su trituradora de poda, con su operario, a Mas Vidal para triturar los sarmientos.' },
  { id: 'ayu-05', fecha: '2026-11-16', desdePuebloId: 'brafim', haciaPuebloId: 'montferri', personas: 1, tipo: 'alojamiento', estado: 'propuesta',
    motivo: 'Cal Mestre (Bràfim) tiene camas libres en su casa y aloja 3 semanas a un trabajador de Mas Bosch (Montferri) mientras Mas Bosch alquila vivienda en la bolsa; Mas Bosch paga su parte. Para el temporero, 0 €.' }
];
