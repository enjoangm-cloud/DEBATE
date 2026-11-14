// Comprueba que cada pantalla genera su HTML sin errores (Node, sin navegador)
import { getTextos } from '../app/backend/api.js';
import { estado } from '../app/frontend/js/util.js';
const nombres = ['inicio','espana','jovenes','calendario','mapa','trabajo','red','turismo','pueblo','tramites'];
// Se prueba cada pantalla con toda la red y con cada pueblo
const { getPueblos } = await import('../app/backend/api.js');
const ambitos = ['red', ...(await getPueblos()).map(p => p.id)];
estado.textos = await getTextos('es');
let ok = true;
for (const amb of ambitos) {
  estado.pueblo = amb;
  for (const n of nombres) {
    try {
      const p = (await import(`../app/frontend/js/pantallas/${n}.js`)).default;
      const html = await p.html();
      const malos = (html.match(/undefined|NaN|\[object Object\]|Invalid Date/g) || []);
      if (malos.length) { ok = false; console.log(amb.padEnd(12), n.padEnd(11), '⚠️ ' + [...new Set(malos)].join(',')); }
    } catch (e) { ok = false; console.log(amb.padEnd(12), n.padEnd(11), 'ERROR', e.message); }
  }
  console.log(amb.padEnd(12), 'revisado');
}
console.log(ok ? 'PANTALLAS OK' : 'HAY PROBLEMAS');
