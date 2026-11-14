// Comprueba que cada pantalla genera su HTML sin errores (Node, sin navegador)
import { getTextos } from '../app/backend/api.js';
import { estado } from '../app/frontend/js/util.js';
const nombres = ['inicio','calendario','mapa','trabajo','pueblo','comprar','tramites'];
estado.textos = await getTextos('es');
let ok = true;
for (const n of nombres) {
  try {
    const p = (await import(`../app/frontend/js/pantallas/${n}.js`)).default;
    const html = await p.html();
    const malos = (html.match(/undefined|NaN|\[object Object\]/g) || []);
    console.log(n.padEnd(11), html.length, 'chars', malos.length ? '⚠️ ' + [...new Set(malos)].join(',') : 'OK');
    if (malos.length) ok = false;
  } catch (e) { ok = false; console.log(n, 'ERROR', e.message); }
}
console.log(ok ? 'PANTALLAS OK' : 'HAY PROBLEMAS');
