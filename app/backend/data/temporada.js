// Puestos de trabajo demandados cada mes por pueblo y sector (estimación ficticia para la demo).
// Orden de cada fila: [agricultura, turismo, hosteleria, bodega, forestal]. Ningún mes queda a 0 en la red.
export const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
export const ORDEN_SECTORES = ['agricultura', 'turismo', 'hosteleria', 'bodega', 'forestal'];

export const TEMPORADA = {
  //               Ene          Feb          Mar          Abr          May          Jun          Jul          Ago          Sep           Oct           Nov           Dic
  'vila-rodona': [[8,0,2,0,0], [8,0,2,0,0], [4,0,2,0,0], [3,0,2,0,0], [3,0,3,0,0], [3,0,3,0,0], [2,0,4,0,0], [12,0,4,0,0], [30,0,3,0,0], [22,0,2,0,0], [19,0,1,0,0], [14,0,3,0,0]],
  aiguamurcia:   [[3,0,0,2,0], [3,0,0,2,0], [2,1,0,1,0], [2,3,0,1,0], [2,3,0,1,0], [2,4,0,1,0], [1,5,0,1,0], [2,5,0,2,0], [20,3,0,4,0], [12,2,0,4,0], [4,0,0,2,0], [4,0,0,2,0]],
  montferri:     [[1,0,0,0,0], [1,0,0,0,0], [1,1,0,0,0], [1,1,0,0,0], [1,1,0,0,0], [0,1,0,0,0], [0,1,0,0,0], [5,1,0,0,0], [4,1,0,0,0], [1,1,0,0,0], [4,0,0,0,0], [4,0,0,0,0]],
  brafim:        [[4,0,0,0,4], [4,0,0,0,4], [2,0,0,0,4], [2,0,0,0,0], [2,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [16,0,0,0,0], [10,0,0,0,0], [4,0,0,0,0], [4,0,0,0,0]],
  vilabella:     [[2,0,0,0,0], [2,0,0,0,0], [2,0,0,0,0], [2,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [6,0,0,0,0], [6,0,0,0,0], [2,0,0,0,0], [5,0,0,0,0], [5,0,0,0,0]]
};
