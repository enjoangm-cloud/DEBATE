// Caminos anuales ya acordados (trabajo encadenado entre pueblos y sectores). Para el resto de
// temporeros, services/campana.js propone un camino con las ofertas de la red.
export const CAMINOS = {
  'tmp-05': [
    { inicio: '2026-11-03', fin: '2026-12-19', puebloId: 'vila-rodona', empleadorId: 'emp-garriga', sector: 'agricultura', tarea: 'Recogida de oliva' },
    { inicio: '2027-01-07', fin: '2027-02-26', puebloId: 'brafim', empleadorId: 'emp-mestre-br', sector: 'agricultura', tarea: 'Poda de viña' },
    { inicio: '2027-03-01', fin: '2027-03-31', puebloId: 'brafim', empleadorId: 'emp-forestal-br', sector: 'forestal', tarea: 'Limpieza forestal' },
    { inicio: '2027-04-01', fin: '2027-08-14', puebloId: 'aiguamurcia', empleadorId: 'emp-camping-ai', sector: 'turismo', tarea: 'Mantenimiento del càmping' },
    { inicio: '2027-08-20', fin: '2027-09-25', puebloId: 'vila-rodona', empleadorId: 'emp-vidal', sector: 'agricultura', tarea: 'Recogida de avellana' },
    { inicio: '2027-09-27', fin: '2027-10-29', puebloId: 'aiguamurcia', empleadorId: 'emp-hort-ai', sector: 'agricultura', tarea: 'Vendimia' }
  ],
  'tmp-11': [
    { inicio: '2026-11-09', fin: '2027-02-26', puebloId: 'aiguamurcia', empleadorId: 'emp-celler-ai', sector: 'bodega', tarea: 'Trasiego y embotellado' },
    { inicio: '2027-03-26', fin: '2027-06-30', puebloId: 'montferri', empleadorId: 'emp-mirador-mo', sector: 'turismo', tarea: 'Atención a visitantes' },
    { inicio: '2027-07-01', fin: '2027-09-15', puebloId: 'vila-rodona', empleadorId: 'emp-fonda', sector: 'hosteleria', tarea: 'Cocina y sala en verano' },
    { inicio: '2027-09-16', fin: '2027-10-31', puebloId: 'aiguamurcia', empleadorId: 'emp-celler-ai', sector: 'bodega', tarea: 'Vendimia en bodega' }
  ],
  'tmp-12': [
    { inicio: '2026-11-16', fin: '2026-12-18', puebloId: 'brafim', empleadorId: 'emp-mestre-br', sector: 'agricultura', tarea: 'Recogida de oliva' },
    { inicio: '2027-01-11', fin: '2027-03-31', puebloId: 'brafim', empleadorId: 'emp-forestal-br', sector: 'forestal', tarea: 'Limpieza forestal y prevención de incendios' },
    { inicio: '2027-04-12', fin: '2027-06-30', puebloId: 'vilabella', empleadorId: 'emp-rull-vb', sector: 'agricultura', tarea: 'Mantenimiento del olivar' },
    { inicio: '2027-08-24', fin: '2027-09-18', puebloId: 'montferri', empleadorId: 'emp-bosch-mo', sector: 'agricultura', tarea: 'Recogida de almendra' },
    { inicio: '2027-09-20', fin: '2027-10-15', puebloId: 'brafim', empleadorId: 'emp-mestre-br', sector: 'agricultura', tarea: 'Vendimia' }
  ]
};
