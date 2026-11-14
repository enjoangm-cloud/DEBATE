# Contrato frontend ↔ backend (demo simulada)

Todo es **simulado**: no hay llamadas reales a APIs. El backend son módulos ES en `app/backend/`
que el navegador importa directamente. En producción, cada función se sustituiría por la API
de Google indicada en `FUENTES`.

Punto de entrada único: `app/backend/api.js`. El frontend **solo** importa de ese archivo.

## Reglas
- Módulos ES puros (`export`), sin dependencias, sin `fetch`, sin build. Deben funcionar en navegador y en Node 18+.
- Todas las funciones son `async` y devuelven **copias** de los datos (no referencias internas).
- Latencia simulada de 100–250 ms con `await espera()` para que la demo parezca real.
- Estado en memoria (módulo). Cambios (solicitudes, decisiones, reservas) se mantienen mientras la página está abierta.
- Fecha "hoy" de la demo: `HOY = '2026-11-14'` (exportada en api.js). Campaña activa: **oliva**.
- Textos en castellano. Nombres de fincas y personas **ficticios** y marcados como ejemplo; lugares públicos del pueblo, reales.
- Nunca puntuaciones públicas de empresarios ni de temporeros.

## Pueblo
Vila-rodona (Alt Camp, Tarragona). 41.3128 N, 1.3594 E. ~1.382 hab. (INE 2025).
Secano: viña, olivo, almendro, avellano. Río Gaià. Celler Cooperatiu modernista (Cèsar Martinell).

## Funciones exportadas por `api.js`

| Función | Devuelve | En producción |
|---|---|---|
| `HOY` (const) | `'2026-11-14'` | — |
| `FUENTES` (const) | `{ nombreFuncion: 'texto de la fuente' }` | — |
| `getPueblo()` | `{ nombre, comarca, provincia, habitantes, lat, lng, zoom, cultivos:[{id,nombre,emoji,color}], dinamizador:{nombre,telefono,horario,lugar} }` | — |
| `getCalendario()` | `[{ cultivoId, nombre, inicio, fin, estado:'terminado'\|'en_curso'\|'proximo', trabajadoresNecesarios, trabajadoresConfirmados, nota }]` (fechas ISO) | Weather + agrónomo |
| `getPrevision()` | 10 días: `[{ fecha, tMax, tMin, lluviaProb, lluviaMm, vientoKmh, cielo:'sol'\|'nubes'\|'lluvia'\|'tormenta'\|'niebla', aptoCosecha:boolean }]` | Google Weather API (daily) |
| `getAlertas()` | `[{ id, tipo:'lluvia'\|'calor'\|'helada'\|'viento', fecha, nivel:'aviso'\|'importante', datoTecnico, mensajeSencillo, accion }]` | Weather API + Vertex AI (Gemini) redacta `mensajeSencillo` |
| `getLugares(tipo?)` | `[{ id, tipo:'alojamiento'\|'finca'\|'comercio'\|'recogida'\|'servicio', nombre, lat, lng, descripcion, ...extra }]` alojamiento: `plazas, plazasLibres, cedidoPor, precioNoche, desde, hasta`; comercio: `horarioNormal, horarioCampana, ofertaTemporero`; finca: `fincaId`; recogida: `hora` | Google Maps (Places) + Business Profile |
| `getRutas()` | `[{ id, nombre, tipo:'transporte'\|'cosechas'\|'visitante', color, puntos:[[lat,lng],...], descripcion }]` | Google Maps (Routes) |
| `getFincas()` | `[{ id, nombre, propietario, cultivos:[cultivoId], hectareas, lat, lng, telefono, descripcion, campanaDigna:boolean, ventaDirecta:{ activa, diasRecogida, productos:[{id,nombre,precio,unidad,stock}] } }]` | Business Profile |
| `getOfertas()` | `[{ id, fincaId, cultivoId, titulo, inicio, fin, plazas, plazasCubiertas, salarioHora, horario, contrato:true, alojamiento:{incluido,lugarId\|null}, transporte:{incluido,recogidaId\|null}, tareas, idiomasEncargado:[] }]` | Business Profile (publicaciones) |
| `getTemporeros()` | `[{ id, nombre, origen, idiomas:[codigo], experiencia:[cultivoId], disponibleDesde, necesitaAlojamiento, necesitaTransporte, estado:'busca'\|'contratado' }]` | Base propia |
| `solicitarOferta(ofertaId, temporeroId)` | `{ ok, solicitud:{id,ofertaId,temporeroId,estado:'pendiente',fecha} }` | — |
| `getSolicitudes()` | lista de solicitudes | — |
| `getEmparejamientosIA()` | `[{ id, temporeroId, ofertaId, alojamientoId\|null, motivo, confianza:0..1, estado:'propuesto'\|'aprobado'\|'rechazado' }]` | Vertex AI (Gemini) propone; **decide el dinamizador** |
| `decidirEmparejamiento(id, decision)` | `decision: 'aprobado'\|'rechazado'` → `{ ok, emparejamiento }`; si se aprueba, baja `plazasLibres` del alojamiento y sube `plazasCubiertas` | — |
| `getIdiomas()` | `[{codigo,nombre,dir:'ltr'\|'rtl'}]` es, ca, ro, ar, fr, en | — |
| `traducir(clave, idioma)` | string traducido de un diccionario de frases clave de la interfaz y avisos; si no existe, devuelve el castellano | Vertex AI (Gemini) traducción |
| `getTextos(idioma)` | objeto `{clave: texto}` completo para ese idioma | Vertex AI |
| `getTramites()` | `[{ id, titulo, para:'temporero'\|'agricultor', pasos:[texto], dondeSeHace, documentos:[texto] }]` | Google Forms/Drive (extra) |
| `reservarCompra(fincaId, items:[{productoId,cantidad}])` | `{ ok, codigo, total, recogida }` y baja stock | Business Profile |
| `getIndicadores()` | `{ camasDisponibles, camasOcupadas, temporerosConContrato, temporerosBuscando, ofertasAbiertas, diasTrabajoMedio, ventaDirectaPct, comerciosActualizados, kgVendidosDirecto }` calculado del estado | — |
