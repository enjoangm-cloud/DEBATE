// Prueba del backend simulado contra docs/contrato-api.md (v2 + v3). Uso: node scripts/probar-backend.mjs
import * as api from '../app/backend/api.js';

let fallos = 0;
const ok = (cond, msg) => { if (!cond) { fallos++; console.error('✗', msg); } };
const campos = (obj, lista, ctx) => lista.forEach((c) => ok(obj && c in obj, `${ctx}: falta campo "${c}"`));
const lista = (arr, lista_, ctx) => { ok(Array.isArray(arr) && arr.length > 0, `${ctx}: lista vacía`); (arr || []).forEach((x, i) => campos(x, lista_, `${ctx}[${x?.id ?? i}]`)); };
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const km = (a, b) => Math.hypot((a.lat - b.lat) * 111, (a.lng - b.lng) * 83.5);

// --- Funciones y constantes ---
const FUNCS = ['getRed', 'getPueblos', 'getPueblo', 'getSectores', 'getCalendario', 'getTemporadaAnual', 'getPrevision', 'getAlertas',
  'getLugares', 'getRutas', 'getEmpleadores', 'getFincas', 'getOfertas', 'getAlojamientos', 'getViviendasParaEmpleadores', 'alquilarVivienda',
  'verificarAlojamiento', 'getTemporeros', 'solicitarOferta', 'getSolicitudes', 'getEmparejamientosIA', 'decidirEmparejamiento', 'getCaminoAnual',
  'getAyudaMutua', 'aceptarAyuda', 'getExperiencias', 'reservarExperiencia', 'reservarCompra', 'getIdiomas', 'traducir', 'getTextos', 'getTramites', 'getIndicadores'];
FUNCS.forEach((f) => ok(typeof api[f] === 'function', `falta función ${f}`));
FUNCS.forEach((f) => ok(api.FUENTES?.[f], `FUENTES.${f}`));
ok(api.HOY === '2026-11-14', 'HOY');

// --- Red y pueblos (datos reales del contrato) ---
const REALES = {
  'vila-rodona': ['Vila-rodona', 1382, 2025, 41.3128, 1.3594], aiguamurcia: ['Aiguamúrcia', 987, 2025, 41.3290, 1.3590],
  montferri: ['Montferri', 473, 2024, 41.2672, 1.3669], brafim: ['Bràfim', 696, 2024, 41.2706, 1.3417], vilabella: ['Vilabella', 723, 2024, 41.2492, 1.3314]
};
const red = await api.getRed();
campos(red, ['id', 'nombre', 'descripcion', 'centro', 'pueblos', 'dinamizador', 'costeDinamizador', 'comoSumarse'], 'red');
ok(red.id === 'red-gaia', 'red.id');
campos(red.centro, ['lat', 'lng', 'zoom'], 'red.centro'); ok(red.centro.zoom === 12, 'zoom red 12');
campos(red.dinamizador, ['nombre', 'telefono', 'horario', 'lugar'], 'dinamizador');
campos(red.costeDinamizador, ['anualEuros', 'reparto'], 'costeDinamizador');
ok(red.costeDinamizador.reparto.reduce((s, r) => s + r.euros, 0) === red.costeDinamizador.anualEuros, 'reparto suma el coste anual');
ok(red.comoSumarse.length >= 5 && red.comoSumarse.length <= 6, 'comoSumarse 5–6 pasos');

const pueblos = await api.getPueblos();
const PID = new Set(pueblos.map((p) => p.id));
ok(pueblos.length === 5, '5 pueblos');
lista(pueblos, ['id', 'nombre', 'comarca', 'provincia', 'habitantes', 'anyoPadron', 'lat', 'lng', 'zoom', 'cultivos', 'sectores', 'destacados', 'puntoAtencion'], 'pueblos');
for (const p of pueblos) {
  const r = REALES[p.id];
  ok(r && p.nombre === r[0] && p.habitantes === r[1] && p.anyoPadron === r[2] && p.lat === r[3] && p.lng === r[4], `datos reales de ${p.id}`);
  ok(p.habitantes < 5000 && p.comarca === 'Alt Camp' && p.zoom === 14, `pueblo ${p.id} comarca/zoom`);
  lista(p.cultivos, ['id', 'nombre', 'emoji', 'color'], `cultivos ${p.id}`);
}
red.costeDinamizador.reparto.forEach((r) => ok(PID.has(r.puebloId), `reparto ${r.puebloId}`));
const pv = await api.getPueblo();
ok(pv.id === 'vila-rodona' && pv.dinamizador?.nombre, 'getPueblo() compatibilidad v1');
ok((await api.getPueblo('brafim')).nombre === 'Bràfim', 'getPueblo(brafim)');

const sectores = await api.getSectores();
lista(sectores, ['id', 'nombre', 'emoji', 'color'], 'sectores');
const SID = new Set(sectores.map((s) => s.id));
ok(['agricultura', 'turismo', 'hosteleria', 'bodega', 'forestal'].every((s) => SID.has(s)) && SID.size === 5, '5 sectores');
pueblos.forEach((p) => p.sectores.forEach((s) => ok(SID.has(s), `sector ${s} de ${p.id}`)));
const CULT = new Set(pueblos.flatMap((p) => p.cultivos.map((c) => c.id)));
const centro = Object.fromEntries(pueblos.map((p) => [p.id, p]));
const puebloDe = (id) => pueblos.find((p) => p.id === id);

// --- Calendario y temporada ---
const cal = await api.getCalendario();
lista(cal, ['id', 'puebloId', 'cultivoId', 'nombre', 'inicio', 'fin', 'estado', 'trabajadoresNecesarios', 'trabajadoresConfirmados', 'nota'], 'calendario');
cal.forEach((c) => {
  ok(PID.has(c.puebloId), `cal ${c.id} puebloId`);
  ok(puebloDe(c.puebloId)?.cultivos.some((x) => x.id === c.cultivoId), `cal ${c.id} cultivo del pueblo`);
  ok(ISO.test(c.inicio) && ISO.test(c.fin) && c.inicio <= c.fin, `cal ${c.id} fechas`);
  const esperado = c.fin < api.HOY ? 'terminado' : c.inicio > api.HOY ? 'proximo' : 'en_curso';
  ok(c.estado === esperado, `cal ${c.id} estado`);
  ok(c.trabajadoresConfirmados <= c.trabajadoresNecesarios, `cal ${c.id} confirmados <= necesarios`);
});
ok(cal.some((c) => c.nombre.includes('Poda') && c.inicio.startsWith('2027-01') && c.estado === 'proximo'), 'poda de viña ene 2027 próxima');
ok(cal.filter((c) => c.cultivoId === 'oliva').every((c) => c.estado === 'en_curso' || c.inicio > api.HOY), 'oliva en curso');
ok((await api.getCalendario('montferri')).every((c) => c.puebloId === 'montferri'), 'filtro calendario');

for (const amb of [undefined, 'red', ...PID]) {
  const ta = await api.getTemporadaAnual(amb);
  ok(ta.length === 12, `temporada ${amb} 12 meses`);
  lista(ta, ['mes', 'nombre', 'agricultura', 'turismo', 'hosteleria', 'bodega', 'forestal'], `temporada ${amb}`);
  ta.forEach((m, i) => {
    ok(m.mes === i + 1, `mes ${i + 1}`);
    const total = m.agricultura + m.turismo + m.hosteleria + m.bodega + m.forestal;
    ok(total > 0, `temporada ${amb ?? 'red'}: ${m.nombre} con total 0`);
    if (amb && amb !== 'red') ['agricultura', 'turismo', 'hosteleria', 'bodega', 'forestal'].forEach((s) => ok(!m[s] || puebloDe(amb).sectores.includes(s), `temporada ${amb} ${m.nombre}: ${s} no es sector del pueblo`));
  });
}

// --- Tiempo ---
const prev = await api.getPrevision();
ok(prev.length === 10 && prev[0].fecha === api.HOY, 'previsión 10 días desde HOY');
lista(prev, ['fecha', 'tMax', 'tMin', 'lluviaProb', 'lluviaMm', 'vientoKmh', 'cielo', 'aptoCosecha'], 'previsión');
const noApto = prev.filter((d) => !d.aptoCosecha).map((d) => d.fecha);
ok(JSON.stringify(noApto) === JSON.stringify(['2026-11-17', '2026-11-18', '2026-11-20']), 'no aptos: mar 17, mié 18 (lluvia) y vie 20 (mestral) → ' + noApto);
ok(new Date('2026-11-17T12:00:00Z').getUTCDay() === 2 && new Date('2026-11-20T12:00:00Z').getUTCDay() === 5, 'días de la semana');
const APTOS = new Set(prev.filter((d) => d.aptoCosecha).map((d) => d.fecha));
for (const id of PID) {
  const pp = await api.getPrevision(id);
  ok(pp.length === 10 && pp.every((d, i) => Math.abs(d.tMax - prev[i].tMax) <= 1 && Math.abs(d.tMin - prev[i].tMin) <= 1 && d.aptoCosecha === prev[i].aptoCosecha && d.lluviaMm === prev[i].lluviaMm && d.vientoKmh === prev[i].vientoKmh), `previsión ${id} ±1 °C y mismos días`);
}
const al = await api.getAlertas();
lista(al, ['id', 'puebloId', 'tipo', 'fecha', 'nivel', 'datoTecnico', 'mensajeSencillo', 'accion'], 'alertas');
ok(al.some((a) => a.tipo === 'lluvia') && al.some((a) => a.tipo === 'viento'), 'alertas lluvia y viento');
ok(new Set(al.map((a) => a.id)).size === al.length, 'ids de alerta únicos');
al.forEach((a) => ok(a.puebloId === 'red' || PID.has(a.puebloId), `alerta ${a.id} puebloId`));
const alB = await api.getAlertas('brafim');
ok(alB.length && alB.every((a) => a.puebloId === 'brafim'), 'alertas filtradas por pueblo');
console.log('Alertas:', al.map((a) => `${a.fecha} ${a.tipo} [${a.puebloId}]: ${a.mensajeSencillo}`));

// --- Empleadores, ofertas, vivienda ---
const empleadores = await api.getEmpleadores();
ok(empleadores.length >= 10 && empleadores.length <= 14, '10–14 empleadores');
lista(empleadores, ['id', 'puebloId', 'tipo', 'sector', 'nombre', 'propietario', 'lat', 'lng', 'telefono', 'descripcion', 'campanaDigna', 'cultivos', 'ventaDirecta'], 'empleadores');
const EID = new Set(empleadores.map((e) => e.id));
const TIPO_EMP = ['finca', 'casa_rural', 'bodega', 'restaurante', 'camping', 'empresa_forestal'];
empleadores.forEach((e) => {
  ok(PID.has(e.puebloId), `emp ${e.id} puebloId`);
  ok(TIPO_EMP.includes(e.tipo) && SID.has(e.sector), `emp ${e.id} tipo/sector`);
  ok(puebloDe(e.puebloId).sectores.includes(e.sector), `emp ${e.id}: sector ${e.sector} no está en sectores de ${e.puebloId}`);
  ok(e.nombre.includes('(ejemplo)') && e.propietario.includes('(ejemplo)'), `emp ${e.id} ficticio "(ejemplo)"`);
  ok(typeof e.campanaDigna === 'boolean', `emp ${e.id} campanaDigna`);
  if (e.tipo === 'finca') { ok(e.cultivos.length && e.cultivos.every((c) => CULT.has(c)), `emp ${e.id} cultivos`); ok(e.hectareas > 0, `emp ${e.id} hectáreas`); }
  else ok(e.cultivos.length === 0, `emp ${e.id}: cultivos solo en fincas`);
  if (e.ventaDirecta !== null) {
    campos(e.ventaDirecta, ['activa', 'diasRecogida', 'productos'], `ventaDirecta ${e.id}`);
    lista(e.ventaDirecta.productos, ['id', 'nombre', 'precio', 'unidad', 'stock'], `productos ${e.id}`);
  }
});
ok(new Set(empleadores.map((e) => e.puebloId)).size === 5 && new Set(empleadores.map((e) => e.sector)).size === 5, 'empleadores en los 5 pueblos y 5 sectores');
ok((await api.getEmpleadores({ sector: 'bodega' })).every((e) => e.sector === 'bodega'), 'filtro sector empleadores');
const fincas = await api.getFincas();
ok(fincas.length && fincas.every((f) => f.tipo === 'finca'), 'getFincas solo fincas');
ok((await api.getFincas('vila-rodona')).every((f) => f.puebloId === 'vila-rodona'), 'getFincas(pueblo)');

const alojs = await api.getAlojamientos();
lista(alojs, ['id', 'puebloId', 'empleadorId', 'nombre', 'modalidad', 'viviendaId', 'lat', 'lng', 'plazas', 'plazasLibres', 'verificado', 'verificadoPor', 'requisitos', 'costeTemporero', 'costeEmpleadorMes', 'desde', 'hasta', 'descripcion'], 'alojamientos');
const viviendas = await api.getViviendasParaEmpleadores();
lista(viviendas, ['id', 'puebloId', 'tipo', 'nombre', 'propietario', 'lat', 'lng', 'plazas', 'precioMes', 'disponibleDesde', 'disponibleHasta', 'nota', 'alquiladaPor'], 'viviendas');
const AID = new Set(alojs.map((a) => a.id)), VID = new Set(viviendas.map((v) => v.id));
alojs.forEach((a) => {
  ok(PID.has(a.puebloId) && EID.has(a.empleadorId), `aloj ${a.id} puebloId/empleadorId`);
  ok(['propio', 'alquilado'].includes(a.modalidad), `aloj ${a.id} modalidad`);
  ok(a.costeTemporero === 0, `aloj ${a.id} coste temporero 0`);
  ok(a.plazasLibres >= 0 && a.plazasLibres <= a.plazas, `aloj ${a.id} plazas`);
  ok(a.verificadoPor.startsWith('Ajuntament ') && a.verificadoPor.includes(puebloDe(a.puebloId).nombre), `aloj ${a.id} verificadoPor del pueblo`);
  campos(a.requisitos, ['camasIndividuales', 'banos', 'cocina', 'calefaccion', 'lavadora'], `requisitos ${a.id}`);
  ok(a.requisitos.camasIndividuales >= a.plazas, `aloj ${a.id}: una cama por plaza`);
  if (a.modalidad === 'alquilado') {
    const v = viviendas.find((x) => x.id === a.viviendaId);
    ok(v && v.alquiladaPor === a.empleadorId && v.puebloId === a.puebloId && v.plazas === a.plazas, `aloj ${a.id}: vivienda alquilada por su empleador`);
    ok(a.costeEmpleadorMes === v?.precioMes, `aloj ${a.id} coste empleador = precio`);
  } else ok(a.viviendaId === null && a.costeEmpleadorMes === null, `aloj ${a.id} propio sin vivienda`);
});
ok(!('cedidoPor' in alojs[0]) && !('precioNoche' in alojs[0]), 'sin modelo v1 de camas cedidas');
viviendas.forEach((v) => {
  ok(PID.has(v.puebloId) && ['casa_rural', 'vivienda_vacia', 'albergue'].includes(v.tipo), `viv ${v.id} pueblo/tipo`);
  ok(v.alquiladaPor === null || EID.has(v.alquiladaPor), `viv ${v.id} alquiladaPor`);
  if (v.alquiladaPor) ok(alojs.some((a) => a.viviendaId === v.id && a.empleadorId === v.alquiladaPor), `viv ${v.id}: alquilada sin alojamiento`);
  ok(v.disponibleDesde <= v.disponibleHasta, `viv ${v.id} fechas`);
});

const ofertas = await api.getOfertas();
lista(ofertas, ['id', 'puebloId', 'empleadorId', 'sector', 'cultivoId', 'titulo', 'inicio', 'fin', 'plazas', 'plazasCubiertas', 'salarioHora', 'horario', 'contrato', 'alojamiento', 'transporte', 'tareas', 'idiomasEncargado'], 'ofertas');
const OID = new Set(ofertas.map((o) => o.id));
const lugares = await api.getLugares();
const LID = new Set(lugares.map((l) => l.id));
const RECOG = new Set(lugares.filter((l) => l.tipo === 'recogida').map((l) => l.id));
ofertas.forEach((o) => {
  const e = empleadores.find((x) => x.id === o.empleadorId);
  ok(e, `oferta ${o.id} empleadorId`);
  ok(e && e.puebloId === o.puebloId, `oferta ${o.id} pueblo = pueblo del empleador`);
  ok(SID.has(o.sector) && (o.cultivoId === null || CULT.has(o.cultivoId)), `oferta ${o.id} sector/cultivo`);
  ok(o.sector !== 'agricultura' || o.cultivoId, `oferta ${o.id}: agrícola con cultivo`);
  ok(o.contrato === true, `oferta ${o.id} contrato`);
  ok(o.salarioHora >= 9 && o.salarioHora <= 10.5, `oferta ${o.id} salario 9–10,5`);
  ok(o.plazasCubiertas <= o.plazas && o.plazas <= 10, `oferta ${o.id} plazas`);
  ok(ISO.test(o.inicio) && o.inicio <= o.fin && o.fin >= api.HOY, `oferta ${o.id} fechas`);
  campos(o.alojamiento, ['incluido', 'alojamientoId'], `oferta ${o.id}.alojamiento`);
  campos(o.transporte, ['incluido', 'recogidaId'], `oferta ${o.id}.transporte`);
  if (o.alojamiento.incluido) {
    const a = alojs.find((x) => x.id === o.alojamiento.alojamientoId);
    ok(a, `oferta ${o.id} alojamientoId existe`);
    ok(a && a.empleadorId === o.empleadorId, `oferta ${o.id}: alojamiento de OTRO empleador`);
    ok(a && a.desde <= o.inicio && a.hasta >= o.fin, `oferta ${o.id}: el alojamiento cubre las fechas`);
  } else ok(o.alojamiento.alojamientoId === null, `oferta ${o.id} sin alojamiento → null`);
  if (o.transporte.incluido) ok(RECOG.has(o.transporte.recogidaId), `oferta ${o.id} recogidaId`);
  else ok(o.transporte.recogidaId === null, `oferta ${o.id} sin transporte → null`);
});
ok(ofertas.some((o) => o.inicio <= api.HOY && o.fin >= api.HOY) && ofertas.some((o) => o.inicio > api.HOY), 'ofertas actuales y próximas');
ok(new Set(ofertas.map((o) => o.sector)).size === 5, 'ofertas de los 5 sectores');
ok((await api.getOfertas({ sector: 'turismo' })).every((o) => o.sector === 'turismo'), 'filtro sector ofertas');
ok((await api.getOfertas({ puebloId: 'brafim' })).every((o) => o.puebloId === 'brafim'), 'filtro pueblo ofertas');
// Camas ocupadas de cada alojamiento <= personas contratadas en ofertas actuales (o que empiezan esta semana) con ese alojamiento
alojs.forEach((a) => {
  const cub = ofertas.filter((o) => o.alojamiento.alojamientoId === a.id && o.inicio <= '2026-11-21' && o.fin >= api.HOY).reduce((s, o) => s + o.plazasCubiertas, 0);
  ok(a.plazas - a.plazasLibres <= cub, `aloj ${a.id}: ocupadas (${a.plazas - a.plazasLibres}) > contratados (${cub})`);
});

// --- Mapa ---
lista(lugares, ['id', 'puebloId', 'tipo', 'nombre', 'lat', 'lng', 'descripcion'], 'lugares');
ok(new Set(lugares.map((l) => l.id)).size === lugares.length, 'ids de lugar únicos');
const TIPOS = { alojamiento: ['empleadorId', 'plazas', 'plazasLibres', 'verificado', 'costeTemporero'], empleador: ['empleadorId'], comercio: ['horarioNormal', 'horarioCampana', 'ofertaTemporero'], recogida: ['hora'], servicio: [], patrimonio: [] };
for (const [t, cs] of Object.entries(TIPOS)) {
  const l = await api.getLugares({ tipo: t });
  ok(l.length && l.every((x) => x.tipo === t), `filtro ${t}`); lista(l, cs, t);
}
ok((await api.getLugares('alojamiento')).every((x) => x.tipo === 'alojamiento'), 'getLugares(tipo) compatibilidad v1');
ok((await api.getLugares({ puebloId: 'montferri', tipo: 'patrimonio' })).length >= 1, 'patrimonio en Montferri');
lugares.forEach((l) => ok(PID.has(l.puebloId), `lugar ${l.id} puebloId`));
lugares.filter((l) => l.tipo === 'empleador').forEach((l) => ok(EID.has(l.empleadorId), `lugar ${l.id} empleadorId`));
ok(alojs.every((a) => LID.has(a.id)) && empleadores.every((e) => lugares.some((l) => l.empleadorId === e.id)), 'alojamientos y empleadores en el mapa');
// Distancia al centro de su pueblo < 1,5 km (salvo el monasterio)
const EXENTOS = new Set(['pat-santes-creus']);
const monasterio = lugares.find((l) => l.id === 'pat-santes-creus');
ok(monasterio && monasterio.lat === 41.3475 && monasterio.lng === 1.3606 && monasterio.puebloId === 'aiguamurcia', 'monasterio de Santes Creus');
for (const x of [...lugares, ...empleadores, ...alojs, ...viviendas]) {
  if (EXENTOS.has(x.id)) continue;
  const d = km(x, centro[x.puebloId]);
  ok(d < 1.5, `${x.id} a ${d.toFixed(2)} km del centro de ${x.puebloId}`);
}
const rutas = await api.getRutas();
lista(rutas, ['id', 'nombre', 'tipo', 'color', 'puntos', 'descripcion'], 'rutas');
rutas.forEach((r) => { ok(r.puntos.length >= 2 && r.puntos.every((p) => p.length === 2), `ruta ${r.id} puntos`); (r.pueblos || []).forEach((p) => ok(PID.has(p), `ruta ${r.id} pueblo ${p}`)); });
ok(rutas.some((r) => r.tipo === 'transporte' && r.pueblos?.length === 5), 'ruta de transporte compartido entre los 5 pueblos');
ok(rutas.some((r) => r.tipo === 'cosechas'), 'ruta de cosechas encadenadas');
const tur = rutas.find((r) => r.tipo === 'visitante');
ok(tur && ['aiguamurcia', 'vila-rodona', 'montferri'].every((p) => tur.pueblos.includes(p)), 'ruta turística Santes Creus – celler – Montferri');
ok((await api.getRutas('vilabella')).every((r) => r.pueblos.includes('vilabella')), 'filtro rutas');

// --- Temporeros, emparejamientos, camino anual ---
const temps = await api.getTemporeros();
lista(temps, ['id', 'nombre', 'origen', 'idiomas', 'experiencia', 'sectores', 'disponibleDesde', 'necesitaAlojamiento', 'necesitaTransporte', 'estado', 'puebloId'], 'temporeros');
const TID = new Set(temps.map((t) => t.id));
temps.forEach((t) => {
  ok(t.nombre.includes('(ejemplo)'), `tmp ${t.id} ficticio`);
  ok(!('puntuacion' in t) && !('valoracion' in t), `tmp ${t.id} sin puntuaciones`);
  ok(t.puebloId === null || PID.has(t.puebloId), `tmp ${t.id} puebloId`);
  t.sectores.forEach((s) => ok(SID.has(s), `tmp ${t.id} sector ${s}`));
  if (t.estado === 'contratado') ok(OID.has(t.ofertaId), `tmp ${t.id} ofertaId`);
});
const sols = await api.getSolicitudes();
sols.forEach((s) => ok(OID.has(s.ofertaId) && TID.has(s.temporeroId), `solicitud ${s.id} refs`));
const emps = await api.getEmparejamientosIA();
lista(emps, ['id', 'temporeroId', 'ofertaId', 'alojamientoId', 'motivo', 'confianza', 'estado'], 'emparejamientos');
emps.forEach((e) => {
  const o = ofertas.find((x) => x.id === e.ofertaId);
  ok(TID.has(e.temporeroId) && o, `emparejamiento ${e.id} refs`);
  if (e.alojamientoId) ok(alojs.find((a) => a.id === e.alojamientoId)?.empleadorId === o?.empleadorId, `emparejamiento ${e.id}: alojamiento del empleador de la oferta`);
  else ok(!o?.alojamiento.incluido || !temps.find((t) => t.id === e.temporeroId).necesitaAlojamiento, `emparejamiento ${e.id} sin alojamiento`);
  if (o?.alojamiento.incluido && e.alojamientoId) ok(e.alojamientoId === o.alojamiento.alojamientoId, `emparejamiento ${e.id} = alojamiento de la oferta`);
});
ok(emps.some((e) => /\d+\/\d+.*\d+\/\d+/.test(e.motivo)), 'algún motivo cita encadenamiento con fechas');
ok((await api.getEmparejamientosIA('brafim')).every((e) => ofertas.find((o) => o.id === e.ofertaId).puebloId === 'brafim'), 'filtro emparejamientos');

let acordados = 0;
for (const t of temps) {
  const c = await api.getCaminoAnual(t.id);
  campos(c, ['temporeroId', 'tramos', 'mesesConTrabajo', 'diasTrabajo'], `camino ${t.id}`);
  ok(c.tramos.length > 0, `camino ${t.id} con tramos`);
  if (!c.propuesto) acordados++;
  let prevFin = '';
  c.tramos.forEach((tr, i) => {
    campos(tr, ['inicio', 'fin', 'puebloId', 'empleadorId', 'sector', 'tarea'], `camino ${t.id}[${i}]`);
    ok(PID.has(tr.puebloId) && EID.has(tr.empleadorId) && SID.has(tr.sector), `camino ${t.id}[${i}] refs`);
    ok(empleadores.find((e) => e.id === tr.empleadorId)?.puebloId === tr.puebloId, `camino ${t.id}[${i}] pueblo del empleador`);
    ok(tr.inicio <= tr.fin && tr.inicio > prevFin, `camino ${t.id}[${i}] fechas encadenadas sin solaparse`);
    prevFin = tr.fin;
  });
  if (t.estado === 'contratado') { const o = ofertas.find((x) => x.id === t.ofertaId); ok(c.tramos[0].empleadorId === o.empleadorId && c.tramos[0].fin === o.fin, `camino ${t.id} empieza por su contrato`); }
  ok(c.mesesConTrabajo >= 1 && c.mesesConTrabajo <= 12 && c.diasTrabajo > 0, `camino ${t.id} meses/días`);
}
ok(acordados >= 2, 'al menos 2 caminos anuales de ejemplo');
const caminoEj = await api.getCaminoAnual('tmp-05');
ok(caminoEj.mesesConTrabajo === 12 && new Set(caminoEj.tramos.map((t) => t.puebloId)).size >= 3 && new Set(caminoEj.tramos.map((t) => t.sector)).size >= 3, 'camino tmp-05: 12 meses, 3+ pueblos y sectores');
ok(!(await api.getCaminoAnual('tmp-99')).ok, 'camino de temporero inexistente');

// --- Ayuda mutua y turismo ---
const ayudas = await api.getAyudaMutua();
lista(ayudas, ['id', 'fecha', 'desdePuebloId', 'haciaPuebloId', 'personas', 'motivo', 'tipo', 'estado'], 'ayuda mutua');
ayudas.forEach((a) => {
  ok(PID.has(a.desdePuebloId) && PID.has(a.haciaPuebloId) && a.desdePuebloId !== a.haciaPuebloId, `ayuda ${a.id} pueblos`);
  ok(['cuadrilla', 'transporte', 'maquinaria', 'alojamiento'].includes(a.tipo) && ['propuesta', 'aceptada'].includes(a.estado), `ayuda ${a.id} tipo/estado`);
  ok(a.fecha >= api.HOY, `ayuda ${a.id} fecha futura`);
});
ok(ayudas.some((a) => a.fecha === '2026-11-17' && a.tipo === 'cuadrilla' && a.desdePuebloId === 'vila-rodona' && a.haciaPuebloId === 'aiguamurcia'), 'ayuda: lluvia del 17 → bodega de Aiguamúrcia');
ok(['transporte', 'maquinaria'].every((t) => ayudas.some((a) => a.tipo === t)), 'ayuda de transporte y maquinaria');

const exps = await api.getExperiencias();
ok(exps.length >= 6 && exps.length <= 8, '6–8 experiencias');
lista(exps, ['id', 'puebloId', 'empleadorId', 'titulo', 'tipo', 'fechas', 'precioPersona', 'plazasLibres', 'duracion', 'descripcion', 'dependeDelTiempo'], 'experiencias');
exps.forEach((x) => {
  ok(PID.has(x.puebloId) && EID.has(x.empleadorId), `exp ${x.id} refs`);
  ok(empleadores.find((e) => e.id === x.empleadorId)?.puebloId === x.puebloId, `exp ${x.id} pueblo del empleador`);
  ok(['cosecha', 'enoturismo', 'patrimonio', 'ruta', 'gastronomia'].includes(x.tipo), `exp ${x.id} tipo`);
  ok(x.fechas.length && x.fechas.every((f) => ISO.test(f) && f >= api.HOY), `exp ${x.id} fechas`);
  if (x.dependeDelTiempo) ok(x.fechas.every((f) => APTOS.has(f)), `exp ${x.id}: fechas en días no aptos`);
});
ok((await api.getExperiencias('aiguamurcia')).every((x) => x.puebloId === 'aiguamurcia'), 'filtro experiencias');

// --- Idiomas, textos y trámites ---
const idiomas = await api.getIdiomas();
lista(idiomas, ['codigo', 'nombre', 'dir'], 'idiomas');
ok(['es', 'ca', 'ro', 'ar', 'fr', 'en'].every((c) => idiomas.some((i) => i.codigo === c)), '6 idiomas');
const V1 = 'nav_inicio nav_calendario nav_mapa nav_trabajo nav_pueblo nav_comprar nav_tramites rol_temporero rol_agricultor rol_dinamizador rol_comprador titulo_app subtitulo_app aviso_tiempo apto no_apto solicitar solicitado aprobar rechazar reservar plazas_libres contrato alojamiento_incluido transporte_incluido salario_hora horario llamar como_llegar hoy manana pasos documentos donde en_curso terminado proximo datos_simulados idioma tamano_texto';
const V2 = 'nav_red nav_turismo pueblo red todos sector sector_agricultura sector_turismo sector_hosteleria sector_bodega sector_forestal alojamiento_empleador verificado pendiente_verificar alquilar coste_temporero ayuda_mutua aceptar camino_anual meses_trabajo reservar_experiencia personas fecha';
const OBLIG = `${V1} ${V2}`.split(' ');
const es = await api.getTextos('es');
for (const { codigo } of idiomas) {
  const t = await api.getTextos(codigo);
  OBLIG.forEach((k) => ok(t[k], `texto ${codigo}.${k}`));
  // Las claves v2 deben estar traducidas de verdad (no heredadas del castellano), salvo palabras iguales
  if (codigo !== 'es') {
    const iguales = V2.split(' ').filter((k) => t[k] === es[k]);
    ok(iguales.length <= 5, `textos ${codigo}: demasiadas claves v2 sin traducir (${iguales})`);
  }
}
ok((await api.traducir('apto', 'ro')) === 'Bun pentru recoltat', 'traducir ro');
ok((await api.traducir('ayuda_mutua', 'ca')) === 'Ajuda entre pobles', 'traducir clave v2');
ok((await api.traducir('apto', 'xx')) === 'Apto para cosechar', 'traducir fallback');
const tramites = await api.getTramites();
lista(tramites, ['id', 'titulo', 'para', 'pasos', 'dondeSeHace', 'documentos'], 'trámites');
ok(tramites.some((t) => t.titulo === 'Preparar el alojamiento de tus trabajadores' && t.para !== 'temporero'), 'trámite de alojamiento para el empleador');

// --- Acciones y cambio de indicadores ---
const IND = ['camasLibres', 'camasOcupadas', 'temporerosConContrato', 'temporerosBuscando', 'ofertasAbiertas', 'diasTrabajoMedio', 'ventaDirectaPct', 'comerciosActualizados', 'kgVendidosDirecto',
  'pueblosEnRed', 'empleadoresConAlojamiento', 'ofertasConAlojamientoPct', 'camasEmpleadores', 'camasVerificadas', 'viviendasBolsaLibres', 'mesesTrabajoMedio', 'ayudasAceptadas', 'reservasTurismo', 'sectoresActivos'];
const ind0 = await api.getIndicadores();
campos(ind0, IND, 'indicadores');
ok(!('camasDisponibles' in ind0), 'indicadores sin camasDisponibles (v1)');
IND.forEach((k) => ok(typeof ind0[k] === 'number' && Number.isFinite(ind0[k]), `indicador ${k} numérico`));
ok(ind0.pueblosEnRed === 5, 'pueblosEnRed 5');
for (const id of PID) campos(await api.getIndicadores(id), IND, `indicadores ${id}`);
console.log('Indicadores antes:', ind0);
let ant = ind0;
const tras = async (accion, cambia) => { const n = await api.getIndicadores(); ok(cambia(n, ant), `indicadores tras ${accion}`); ant = n; };

// 1. solicitarOferta
const s = await api.solicitarOferta('of-oliva-mestre', 'tmp-04');
ok(s.ok && s.solicitud.estado === 'pendiente', 'solicitarOferta');
ok((await api.getSolicitudes()).some((x) => x.id === s.solicitud.id), 'solicitud guardada');
ok((await api.solicitarOferta('of-oliva-mestre', 'tmp-04')).solicitud.id === s.solicitud.id, 'solicitud repetida = misma');
ok(!(await api.solicitarOferta('of-x', 'tmp-04')).ok, 'solicitar oferta inexistente');
await tras('solicitarOferta', (n, a) => n.solicitudesPendientes === a.solicitudesPendientes + 1);

// 2. decidirEmparejamiento('aprobado')
const d = await api.decidirEmparejamiento('emp-01', 'aprobado');
ok(d.ok && d.emparejamiento.estado === 'aprobado', 'aprobar emp-01');
ok((await api.getAlojamientos()).find((a) => a.id === 'aloj-pujol').plazasLibres === 1, 'baja plazasLibres del alojamiento del empleador');
ok((await api.getOfertas()).find((o) => o.id === 'of-oliva-pujol').plazasCubiertas === 4, 'sube plazasCubiertas');
ok((await api.getTemporeros()).find((t) => t.id === 'tmp-02').estado === 'contratado', 'temporero contratado');
ok(!(await api.decidirEmparejamiento('emp-01', 'aprobado')).ok, 'no se aprueba dos veces');
await tras('decidirEmparejamiento', (n, a) => n.camasLibres === a.camasLibres - 1 && n.temporerosConContrato === a.temporerosConContrato + 1 && n.camasOcupadas === a.camasOcupadas + 1);
ok((await api.decidirEmparejamiento('emp-05', 'rechazado')).ok, 'rechazar emp-05');

// 3. alquilarVivienda (+ error al repetir)
const alq = await api.alquilarVivienda('viv-mo-mirador', 'emp-bosch-mo');
ok(alq.ok && alq.alojamiento.modalidad === 'alquilado' && alq.alojamiento.verificado === false && alq.alojamiento.empleadorId === 'emp-bosch-mo' && alq.alojamiento.viviendaId === 'viv-mo-mirador', 'alquilarVivienda crea alojamiento');
ok(alq.alojamiento.costeTemporero === 0 && alq.alojamiento.costeEmpleadorMes === 600 && alq.alojamiento.verificadoPor === 'Ajuntament de Montferri', 'alojamiento alquilado: costes y ayuntamiento');
campos(alq.alojamiento, ['id', 'puebloId', 'empleadorId', 'nombre', 'modalidad', 'viviendaId', 'lat', 'lng', 'plazas', 'plazasLibres', 'verificado', 'verificadoPor', 'requisitos', 'costeTemporero', 'costeEmpleadorMes', 'desde', 'hasta', 'descripcion'], 'alojamiento nuevo');
ok((await api.getViviendasParaEmpleadores()).find((v) => v.id === 'viv-mo-mirador').alquiladaPor === 'emp-bosch-mo', 'marca alquiladaPor');
ok((await api.getLugares({ tipo: 'alojamiento' })).some((l) => l.id === alq.alojamiento.id), 'nuevo alojamiento en el mapa');
const rep = await api.alquilarVivienda('viv-mo-mirador', 'emp-garriga');
ok(!rep.ok && rep.error, 'error al alquilar una vivienda ya alquilada');
ok(!(await api.alquilarVivienda('viv-x', 'emp-garriga')).ok && !(await api.alquilarVivienda('viv-vb-casa', 'emp-x')).ok, 'errores de referencia al alquilar');
await tras('alquilarVivienda', (n, a) => n.viviendasBolsaLibres === a.viviendasBolsaLibres - 1 && n.camasEmpleadores === a.camasEmpleadores + 5 && n.empleadoresConAlojamiento === a.empleadoresConAlojamiento + 1);

// 4. verificarAlojamiento
const ver = await api.verificarAlojamiento(alq.alojamiento.id);
ok(ver.ok && ver.alojamiento.verificado === true, 'verificarAlojamiento');
ok(!(await api.verificarAlojamiento(alq.alojamiento.id)).ok, 'no se verifica dos veces');
ok(!(await api.verificarAlojamiento('aloj-x')).ok, 'verificar inexistente');
await tras('verificarAlojamiento', (n, a) => n.camasVerificadas === a.camasVerificadas + 5);

// 5. aceptarAyuda
const ay = await api.aceptarAyuda('ayu-01');
ok(ay.ok && ay.ayuda.estado === 'aceptada', 'aceptarAyuda');
ok(!(await api.aceptarAyuda('ayu-01')).ok && !(await api.aceptarAyuda('ayu-x')).ok, 'errores de aceptarAyuda');
await tras('aceptarAyuda', (n, a) => n.ayudasAceptadas === a.ayudasAceptadas + 1);

// 6. reservarExperiencia (+ errores sin plazas y fecha inválida)
const ex0 = (await api.getExperiencias()).find((x) => x.id === 'exp-dia-oliva');
const re = await api.reservarExperiencia('exp-dia-oliva', '2026-11-21', 2);
ok(re.ok && re.codigo && re.total === ex0.precioPersona * 2, 'reservarExperiencia ' + JSON.stringify(re));
ok((await api.getExperiencias()).find((x) => x.id === 'exp-dia-oliva').plazasLibres === ex0.plazasLibres - 2, 'baja plazasLibres de la experiencia');
ok(!(await api.reservarExperiencia('exp-dia-oliva', '2026-11-17', 1)).ok, 'error: fecha no válida (día de lluvia)');
ok(!(await api.reservarExperiencia('exp-dia-oliva', '2026-12-25', 1)).ok, 'error: fecha fuera de las fechas');
ok(!(await api.reservarExperiencia('exp-dia-oliva', '2026-11-22', 999)).ok, 'error: sin plazas suficientes');
ok(!(await api.reservarExperiencia('exp-dia-oliva', '2026-11-22', 0)).ok, 'error: personas no válidas');
ok(!(await api.reservarExperiencia('exp-x', '2026-11-22', 1)).ok, 'error: experiencia inexistente');
await tras('reservarExperiencia', (n, a) => n.reservasTurismo === a.reservasTurismo + 1);

// 7. reservarCompra (ahora con empleadorId)
const r = await api.reservarCompra('emp-pujol', [{ productoId: 'pujol-almendra-grano', cantidad: 2 }, { productoId: 'pujol-aceite1', cantidad: 1 }]);
ok(r.ok && r.total === 37.5 && r.codigo && r.recogida, 'reservarCompra ' + JSON.stringify(r));
ok((await api.getEmpleadores()).find((e) => e.id === 'emp-pujol').ventaDirecta.productos[0].stock === 48, 'baja stock');
ok(!(await api.reservarCompra('emp-pujol', [{ productoId: 'pujol-almendra-grano', cantidad: 999 }])).ok, 'stock insuficiente rechazado');
ok(!(await api.reservarCompra('emp-sala', [{ productoId: 'x', cantidad: 1 }])).ok, 'empleador sin venta directa rechazado');
await tras('reservarCompra', (n, a) => n.kgVendidosDirecto > a.kgVendidosDirecto);
console.log('Indicadores después:', ant);

// Integridad tras las acciones (el alojamiento nuevo también cumple las reglas)
const alojs2 = await api.getAlojamientos();
const viv2 = await api.getViviendasParaEmpleadores();
alojs2.forEach((a) => ok(a.modalidad === 'propio' || viv2.find((v) => v.id === a.viviendaId)?.alquiladaPor === a.empleadorId, `tras acciones: aloj ${a.id} coherente`));

// Copias: modificar lo devuelto no altera el estado
const e1 = await api.getEmpleadores(); e1[0].nombre = 'X';
ok((await api.getEmpleadores())[0].nombre !== 'X', 'devuelve copias');


// ================= v3 · España entera, más sectores y jóvenes =================
{ // ámbito propio de v3 (sin chocar con nombres de v2)
const F3 = ['getEspana', 'getCorredor', 'getJovenes', 'getOportunidadesJovenes', 'recomendarRed', 'apuntarseOportunidad'];
F3.forEach((f) => { ok(typeof api[f] === 'function', `v3: falta función ${f}`); ok(api.FUENTES?.[f], `v3: FUENTES.${f}`); });

const esp = await api.getEspana();
campos(esp, ['municipiosPequenos', 'pctMunicipios', 'pctPoblacion', 'fuente', 'redes', 'arquetipos', 'comoCrearRed'], 'getEspana');
ok(esp.municipiosPequenos === 6329 && esp.pctMunicipios === 77.8 && esp.pctPoblacion === 9, 'v3: cifras reales MAPA');
ok(esp.fuente === 'MAPA, Informe Anual de Indicadores 2025', 'v3: fuente MAPA');
ok(esp.comoCrearRed.length >= 6 && esp.comoCrearRed.length <= 7, 'v3: comoCrearRed 6–7 pasos');
lista(esp.arquetipos, ['id', 'nombre', 'emoji', 'color', 'sectores', 'ejemploRedId', 'problema', 'comoAyuda'], 'arquetipos');
lista(esp.redes, ['id', 'nombre', 'provincia', 'comunidad', 'arquetipoId', 'lat', 'lng', 'esDemo', 'sectores', 'temporadas', 'pueblosEjemplo', 'destacado'], 'redesEspana');
const RID = new Set(esp.redes.map((r) => r.id));
const AID = new Set(esp.arquetipos.map((a) => a.id));
const TABLA = { 'red-gaia': ['Red del Gaià', 'Tarragona', 41.30, 1.35], 'red-tena': ['Valle de Tena (ejemplo)', 'Huesca', 42.76, -0.33],
  'red-tajo-salor': ['Tajo-Salor-Almonte (ejemplo)', 'Cáceres', 39.56, -6.42], 'red-pinares': ['Tierra de Pinares (ejemplo)', 'Segovia', 41.20, -4.43],
  'red-magina': ['Sierra Mágina (ejemplo)', 'Jaén', 37.80, -3.40] };
ok(esp.redes.length === 5 && Object.keys(TABLA).every((id) => RID.has(id)), 'v3: 5 redes del contrato');
for (const r of esp.redes) {
  const t = TABLA[r.id];
  ok(t && r.nombre === t[0] && r.provincia === t[1] && r.lat === t[2] && r.lng === t[3], `v3: datos de la red ${r.id}`);
  ok(AID.has(r.arquetipoId), `v3: arquetipoId de ${r.id}`);
  ok(r.esDemo === (r.id === 'red-gaia'), `v3: esDemo ${r.id}`);
  lista(r.temporadas, ['mesInicio', 'mesFin', 'texto'], `temporadas ${r.id}`);
  r.temporadas.forEach((x) => ok(x.mesInicio >= 1 && x.mesInicio <= 12 && x.mesFin >= 1 && x.mesFin <= 12, `v3: meses de ${r.id}`));
}
esp.arquetipos.forEach((a) => ok(RID.has(a.ejemploRedId) && esp.redes.find((r) => r.id === a.ejemploRedId).arquetipoId === a.id, `v3: ejemploRedId de ${a.id}`));
ok(JSON.stringify(esp.redes.find((r) => r.id === 'red-gaia').pueblosEjemplo) === JSON.stringify(pueblos.map((p) => p.nombre)), 'v3: pueblos del Gaià = los de v2');
ok(JSON.stringify(esp.redes.find((r) => r.id === 'red-tena').pueblosEjemplo) === '["Sallent de Gállego","Panticosa"]', 'v3: Tena solo Sallent y Panticosa');
['red-tajo-salor', 'red-pinares', 'red-magina'].forEach((id) => ok(esp.redes.find((r) => r.id === id).pueblosEjemplo.length === 0, `v3: ${id} sin pueblos inventados`));
// Temporadas fuertes del contrato
const tiene = (id, i, f) => esp.redes.find((r) => r.id === id).temporadas.some((x) => x.mesInicio === i && x.mesFin === f);
ok(tiene('red-tena', 12, 4) && tiene('red-tena', 7, 8), 'v3: temporadas Tena');
ok(tiene('red-tajo-salor', 1, 12) && tiene('red-tajo-salor', 3, 5) && tiene('red-tajo-salor', 5, 6), 'v3: temporadas Tajo-Salor');
ok(tiene('red-pinares', 4, 10) && tiene('red-pinares', 11, 3), 'v3: temporadas Pinares');
ok(tiene('red-magina', 11, 2) && tiene('red-magina', 3, 4), 'v3: temporadas Mágina');
const mesesDe = (i, f) => { const m = []; for (let x = i; ; x = x % 12 + 1) { m.push(x); if (x === f) break; } return m; };
const cubreGaia = new Set(esp.redes.find((r) => r.id === 'red-gaia').temporadas.flatMap((x) => mesesDe(x.mesInicio, x.mesFin)));
ok(cubreGaia.size === 12, 'v3: Gaià todo el año');

// Corredor: 12 meses exactamente una vez, consecutivos, dic → nov
const cor = await api.getCorredor();
campos(cor, ['titulo', 'persona', 'tramos', 'meses', 'nota'], 'corredor');
ok(cor.meses === 12 && cor.persona === '(ejemplo)', 'v3: corredor meses/persona');
lista(cor.tramos, ['mesInicio', 'mesFin', 'redId', 'sector', 'tarea', 'viviendaDe'], 'corredor.tramos');
cor.tramos.forEach((t) => ok(RID.has(t.redId), `v3: redId del tramo ${t.redId}`));
const cuenta = Array(13).fill(0);
cor.tramos.forEach((t) => mesesDe(t.mesInicio, t.mesFin).forEach((m) => cuenta[m]++));
ok(cuenta.slice(1).every((n) => n === 1), 'v3: corredor cubre cada mes exactamente una vez ' + cuenta.slice(1));
ok(cor.tramos[0].mesInicio === 12 && cor.tramos.at(-1).mesFin === 11, 'v3: corredor dic → nov');
cor.tramos.slice(1).forEach((t, i) => ok(t.mesInicio === cor.tramos[i].mesFin % 12 + 1, `v3: tramo ${i + 1} consecutivo`));
ok(JSON.stringify(cor.tramos.map((t) => t.redId)) === '["red-tena","red-tajo-salor","red-pinares","red-gaia","red-gaia"]', 'v3: orden de redes del corredor');

// Jóvenes
const jov = await api.getJovenes();
campos(jov, ['datos', 'pasos', 'preguntas'], 'getJovenes');
lista(jov.datos, ['cifra', 'texto', 'fuente'], 'jovenes.datos');
lista(jov.pasos, ['id', 'titulo', 'duracion', 'queOfrece', 'quienPaga'], 'jovenes.pasos');
ok(jov.pasos.map((p) => p.id).join() === 'probar,anyo,quedarse', 'v3: pasos probar/anyo/quedarse');
ok(jov.preguntas.length === 3, 'v3: 3 preguntas');
lista(jov.preguntas, ['id', 'texto', 'opciones'], 'preguntas');
const OPC = new Set();
jov.preguntas.forEach((p) => { lista(p.opciones, ['id', 'texto', 'arquetipos'], `opciones ${p.id}`);
  p.opciones.forEach((o) => { ok(!OPC.has(o.id), `v3: opción repetida ${o.id}`); OPC.add(o.id); o.arquetipos.forEach((a) => ok(AID.has(a), `v3: arquetipo ${a} en ${o.id}`)); }); });
const opsJ = await api.getOportunidadesJovenes();
lista(opsJ, ['id', 'tipo', 'titulo', 'redId', 'puebloId', 'descripcion', 'duracion', 'condiciones', 'plazas'], 'oportunidades');
ok(opsJ.length >= 10 && opsJ.length <= 14, 'v3: 10–14 oportunidades');
const TIPOS = ['practicas', 'primera_temporada', 'formacion', 'relevo', 'vivienda_estable', 'emprender'];
TIPOS.forEach((t) => ok(opsJ.some((o) => o.tipo === t), `v3: hay oportunidad de tipo ${t}`));
RID.forEach((r) => ok(opsJ.some((o) => o.redId === r), `v3: hay oportunidades en ${r}`));
for (const o of opsJ) {
  ok(TIPOS.includes(o.tipo) && RID.has(o.redId), `v3: tipo/redId de ${o.id}`);
  ok(o.redId === 'red-gaia' ? PID.has(o.puebloId) : o.puebloId === null, `v3: puebloId de ${o.id}`);
  ok(o.titulo.includes('(ejemplo)'), `v3: ${o.id} marcado (ejemplo)`);
  ok(Number.isInteger(o.plazas) && o.plazas > 0, `v3: plazas ${o.id}`);
  if (o.tipo === 'practicas') ok(['Programa Campus Rural', '1.000 € brutos/mes', '~3 meses', 'Municipios < 5.000 hab.'].every((c) => o.condiciones.includes(c)), `v3: condiciones Campus Rural ${o.id}`);
}
ok(opsJ.some((o) => o.tipo === 'relevo' && o.puebloId === 'vilabella' && /almendro/.test(o.titulo)), 'v3: relevo finca de almendros en Vilabella');
const opsOv = await api.getOportunidadesJovenes('ganaderia-ovina');
ok(opsOv.length > 0 && opsOv.every((o) => o.redId === 'red-tajo-salor'), 'v3: filtro por arquetipo');
ok((await api.getOportunidadesJovenes('xx')).length === 0, 'v3: arquetipo desconocido → lista vacía');

// recomendarRed: varias combinaciones
const rec = async (r) => api.recomendarRed(r);
const r1 = await rec({ 'p-paisaje': 'paisaje-montana', 'p-trabajo': 'trabajo-gente', 'p-cuando': 'cuando-invierno' });
ok(r1.ok && r1.arquetipoId === 'nieve-montana' && r1.redId === 'red-tena', 'v3: recomendar nieve ' + JSON.stringify(r1));
campos(r1, ['ok', 'arquetipoId', 'redId', 'motivo', 'oportunidades'], 'recomendarRed');
const r2 = await rec({ 'p-paisaje': 'paisaje-dehesa', 'p-trabajo': 'trabajo-animales', 'p-cuando': 'cuando-primavera' });
ok(r2.ok && r2.arquetipoId === 'ganaderia-ovina' && r2.redId === 'red-tajo-salor', 'v3: recomendar ovino');
const r3 = await rec({ 'p-paisaje': 'paisaje-bosque', 'p-trabajo': 'trabajo-arboles', 'p-cuando': 'cuando-verano' });
ok(r3.ok && r3.arquetipoId === 'forestal-resina' && r3.redId === 'red-pinares', 'v3: recomendar forestal');
const r4 = await rec({ 'p-paisaje': 'paisaje-vinas', 'p-trabajo': 'trabajo-arboles', 'p-cuando': 'cuando-invierno' });
ok(r4.ok && r4.arquetipoId === 'olivar' && r4.redId === 'red-magina', 'v3: recomendar olivar');
const r5 = await rec({ 'p-paisaje': 'paisaje-vinas', 'p-trabajo': 'trabajo-variado', 'p-cuando': 'cuando-otono' });
ok(r5.ok && r5.arquetipoId === 'agricola-turismo' && r5.redId === 'red-gaia', 'v3: recomendar agrícola');
const r6 = await rec({ 'p-paisaje': 'paisaje-montana', 'p-trabajo': 'trabajo-animales' }); // empate 1–1
ok(r6.ok && r6.redId === 'red-gaia', 'v3: empate → Gaià');
ok((await rec({})).redId === 'red-gaia', 'v3: sin respuestas → Gaià');
for (const r of [r1, r2, r3, r4, r5, r6]) {
  ok(AID.has(r.arquetipoId) && RID.has(r.redId) && r.motivo && r.oportunidades.length > 0, 'v3: recomendación válida');
  r.oportunidades.forEach((id) => ok(opsJ.find((o) => o.id === id)?.redId === r.redId, `v3: oportunidad ${id} de la red recomendada`));
}
for (const malo of [null, undefined, 'x', 42, [], { 'p-paisaje': 'nada' }, { 'p-xx': 'paisaje-montana' }, { 'p-paisaje': 'trabajo-gente' }]) {
  let res; try { res = await rec(malo); } catch (e) { res = { roto: e.message }; }
  ok(res && !res.roto && (res.ok === false ? !!res.error : res.redId === 'red-gaia'), 'v3: respuesta inválida sin romper ' + JSON.stringify(malo));
}

// apuntarseOportunidad
const plazasBar = opsJ.find((o) => o.id === 'op-relevo-bar-montferri').plazas;
const ap = await api.apuntarseOportunidad('op-practicas-vila-rodona', 'Persona (ejemplo)');
ok(ap.ok && ap.codigo, 'v3: apuntarse ok ' + JSON.stringify(ap));
ok((await api.getOportunidadesJovenes()).find((o) => o.id === 'op-practicas-vila-rodona').plazas === opsJ.find((o) => o.id === 'op-practicas-vila-rodona').plazas - 1, 'v3: baja plazas');
for (let i = 0; i < plazasBar; i++) ok((await api.apuntarseOportunidad('op-relevo-bar-montferri', `Persona ${i}`)).ok, 'v3: apuntarse hasta llenar');
const sinPl = await api.apuntarseOportunidad('op-relevo-bar-montferri', 'Otra persona');
ok(!sinPl.ok && sinPl.error, 'v3: error sin plazas');
ok((await api.getOportunidadesJovenes()).find((o) => o.id === 'op-relevo-bar-montferri').plazas === 0, 'v3: plazas no bajan de 0');
for (const n of ['', '   ', null, undefined, 'a'.repeat(61)]) ok(!(await api.apuntarseOportunidad('op-formacion-pastores', n)).ok, `v3: nombre inválido (${String(n).length})`);
ok((await api.apuntarseOportunidad('op-formacion-pastores', 'a'.repeat(60))).ok, 'v3: nombre de 60 caracteres vale');
ok(!(await api.apuntarseOportunidad('op-xx', 'Ana')).ok, 'v3: oportunidad inexistente');
const cj = await api.getJovenes(); cj.datos[0].cifra = 'X';
ok((await api.getJovenes()).datos[0].cifra !== 'X', 'v3: devuelve copias');

// Textos v3 en 6 idiomas (traducidos de verdad)
const V3 = 'nav_espana nav_jovenes arquetipo corredor ruta_arraigo probar anyo_completo quedarse apuntarme recomendar oportunidades relevo practicas'.split(' ');
for (const { codigo } of idiomas) {
  const t = await api.getTextos(codigo);
  V3.forEach((k) => ok(typeof t[k] === 'string' && t[k].trim(), `v3: texto ${codigo}.${k}`));
  if (codigo !== 'es') { const ig = V3.filter((k) => t[k] === es[k]); ok(ig.length <= 2, `v3: textos ${codigo} sin traducir (${ig})`); }
}
} // fin v3

console.log(fallos ? `\n${fallos} FALLOS` : '\nTODO OK');
process.exit(fallos ? 1 : 0);
