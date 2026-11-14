// Prueba del backend simulado contra docs/contrato-api.md. Uso: node scripts/probar-backend.mjs
import * as api from '../app/backend/api.js';

let fallos = 0;
const ok = (cond, msg) => { if (!cond) { fallos++; console.error('✗', msg); } };
const campos = (obj, lista, ctx) => lista.forEach((c) => ok(obj && c in obj, `${ctx}: falta campo "${c}"`));
const lista = (arr, lista_, ctx) => { ok(Array.isArray(arr) && arr.length > 0, `${ctx}: lista vacía`); (arr || []).forEach((x, i) => campos(x, lista_, `${ctx}[${i}]`)); };

const FUNCS = ['getPueblo','getCalendario','getPrevision','getAlertas','getLugares','getRutas','getFincas','getOfertas','getTemporeros','solicitarOferta','getSolicitudes','getEmparejamientosIA','decidirEmparejamiento','getIdiomas','traducir','getTextos','getTramites','reservarCompra','getIndicadores'];
FUNCS.forEach((f) => ok(typeof api[f] === 'function', `falta función ${f}`));
ok(api.HOY === '2026-11-14', 'HOY');
FUNCS.forEach((f) => ok(api.FUENTES[f], `FUENTES.${f}`));

const p = await api.getPueblo();
campos(p, ['nombre','comarca','provincia','habitantes','lat','lng','zoom','cultivos','dinamizador'], 'pueblo');
lista(p.cultivos, ['id','nombre','emoji','color'], 'cultivos');
campos(p.dinamizador, ['nombre','telefono','horario','lugar'], 'dinamizador');

const cal = await api.getCalendario();
lista(cal, ['cultivoId','nombre','inicio','fin','estado','trabajadoresNecesarios','trabajadoresConfirmados','nota'], 'calendario');
ok(cal.find((c) => c.cultivoId === 'oliva').estado === 'en_curso', 'oliva en curso');

const prev = await api.getPrevision();
ok(prev.length === 10 && prev[0].fecha === api.HOY, 'previsión 10 días desde HOY');
lista(prev, ['fecha','tMax','tMin','lluviaProb','lluviaMm','vientoKmh','cielo','aptoCosecha'], 'previsión');
ok(prev.filter((d) => !d.aptoCosecha).length >= 2, 'días no aptos');

const al = await api.getAlertas();
lista(al, ['id','tipo','fecha','nivel','datoTecnico','mensajeSencillo','accion'], 'alertas');
ok(al.some((a) => a.tipo === 'lluvia') && al.some((a) => a.tipo === 'viento'), 'alertas lluvia y viento');
console.log('Alertas:', al.map((a) => `${a.fecha} ${a.tipo}: ${a.datoTecnico} | ${a.mensajeSencillo} | ${a.accion}`));

const lug = await api.getLugares();
lista(lug, ['id','tipo','nombre','lat','lng','descripcion'], 'lugares');
const tipos = { alojamiento: ['plazas','plazasLibres','cedidoPor','precioNoche','desde','hasta'], comercio: ['horarioNormal','horarioCampana','ofertaTemporero'], finca: ['fincaId'], recogida: ['hora'], servicio: [] };
for (const [t, cs] of Object.entries(tipos)) { const l = await api.getLugares(t); ok(l.length && l.every((x) => x.tipo === t), `filtro ${t}`); lista(l, cs, t); }
// Distancia al centro < 3 km
const km = (a, b) => Math.hypot((a.lat - b.lat) * 111, (a.lng - b.lng) * 83.5);
lug.forEach((l) => ok(km(l, p) < 3, `${l.id} a más de 3 km`));

lista(await api.getRutas(), ['id','nombre','tipo','color','puntos','descripcion'], 'rutas');
const fincas = await api.getFincas();
lista(fincas, ['id','nombre','propietario','cultivos','hectareas','lat','lng','telefono','descripcion','campanaDigna','ventaDirecta'], 'fincas');
fincas.forEach((f) => campos(f.ventaDirecta, ['activa','diasRecogida','productos'], `ventaDirecta ${f.id}`));
const ofertas = await api.getOfertas();
lista(ofertas, ['id','fincaId','cultivoId','titulo','inicio','fin','plazas','plazasCubiertas','salarioHora','horario','contrato','alojamiento','transporte','tareas','idiomasEncargado'], 'ofertas');
// Integridad de referencias
const ids = new Set(lug.map((l) => l.id)), fids = new Set(fincas.map((f) => f.id));
ofertas.forEach((o) => { ok(fids.has(o.fincaId), `oferta ${o.id} finca`); if (o.alojamiento.lugarId) ok(ids.has(o.alojamiento.lugarId), `oferta ${o.id} aloj`); if (o.transporte.recogidaId) ok(ids.has(o.transporte.recogidaId), `oferta ${o.id} recogida`); });
lug.filter((l) => l.fincaId).forEach((l) => ok(fids.has(l.fincaId), `lugar ${l.id} fincaId`));
const temps = await api.getTemporeros();
lista(temps, ['id','nombre','origen','idiomas','experiencia','disponibleDesde','necesitaAlojamiento','necesitaTransporte','estado'], 'temporeros');
const emps = await api.getEmparejamientosIA();
lista(emps, ['id','temporeroId','ofertaId','alojamientoId','motivo','confianza','estado'], 'emparejamientos');
const idiomas = await api.getIdiomas();
lista(idiomas, ['codigo','nombre','dir'], 'idiomas');
const OBLIG = 'nav_inicio nav_calendario nav_mapa nav_trabajo nav_pueblo nav_comprar nav_tramites rol_temporero rol_agricultor rol_dinamizador rol_comprador titulo_app subtitulo_app aviso_tiempo apto no_apto solicitar solicitado aprobar rechazar reservar plazas_libres contrato alojamiento_incluido transporte_incluido salario_hora horario llamar como_llegar hoy manana pasos documentos donde en_curso terminado proximo datos_simulados idioma tamano_texto'.split(' ');
for (const { codigo } of idiomas) { const t = await api.getTextos(codigo); OBLIG.forEach((k) => ok(t[k], `texto ${codigo}.${k}`)); }
ok((await api.traducir('apto', 'ro')) === 'Bun pentru recoltat', 'traducir ro');
ok((await api.traducir('apto', 'xx')) === 'Apto para cosechar', 'traducir fallback');
lista(await api.getTramites(), ['id','titulo','para','pasos','dondeSeHace','documentos'], 'trámites');

// --- Acciones y cambio de indicadores ---
const ind0 = await api.getIndicadores();
campos(ind0, ['camasDisponibles','camasOcupadas','temporerosConContrato','temporerosBuscando','ofertasAbiertas','diasTrabajoMedio','ventaDirectaPct','comerciosActualizados','kgVendidosDirecto'], 'indicadores');
console.log('Indicadores antes:', ind0);

const s = await api.solicitarOferta('of-oliva-roca', 'tmp-04');
ok(s.ok && s.solicitud.estado === 'pendiente', 'solicitarOferta');
ok((await api.getSolicitudes()).some((x) => x.id === s.solicitud.id), 'solicitud guardada');

const d = await api.decidirEmparejamiento('emp-01', 'aprobado');
ok(d.ok && d.emparejamiento.estado === 'aprobado', 'aprobar emp-01');
ok((await api.getLugares('alojamiento')).find((a) => a.id === 'aloj-major').plazasLibres === 1, 'baja plazasLibres');
ok((await api.getOfertas()).find((o) => o.id === 'of-oliva-pujol').plazasCubiertas === 4, 'sube plazasCubiertas');
ok((await api.decidirEmparejamiento('emp-05', 'rechazado')).ok, 'rechazar emp-05');

const r = await api.reservarCompra('finca-pujol', [{ productoId: 'pujol-almendra-grano', cantidad: 2 }, { productoId: 'pujol-aceite1', cantidad: 1 }]);
ok(r.ok && r.total === 37.5 && r.codigo && r.recogida, 'reservarCompra ' + JSON.stringify(r));
ok((await api.getFincas()).find((f) => f.id === 'finca-pujol').ventaDirecta.productos[0].stock === 48, 'baja stock');
ok(!(await api.reservarCompra('finca-pujol', [{ productoId: 'pujol-almendra-grano', cantidad: 999 }])).ok, 'stock insuficiente rechazado');

const ind1 = await api.getIndicadores();
console.log('Indicadores después:', ind1);
ok(ind1.camasDisponibles === ind0.camasDisponibles - 1 && ind1.temporerosConContrato === ind0.temporerosConContrato + 1 && ind1.kgVendidosDirecto > ind0.kgVendidosDirecto, 'indicadores cambian');

// Copias: modificar lo devuelto no altera el estado
const f1 = await api.getFincas(); f1[0].nombre = 'X';
ok((await api.getFincas())[0].nombre !== 'X', 'devuelve copias');

console.log(fallos ? `\n${fallos} FALLOS` : '\nTODO OK');
process.exit(fallos ? 1 : 0);
