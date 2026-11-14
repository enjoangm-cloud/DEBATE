# Contrato frontend ↔ backend · v2 (demo simulada)

Todo es **simulado**: no hay llamadas reales a APIs. El backend son módulos ES en `app/backend/`
que el navegador importa directamente. Punto de entrada único: `app/backend/api.js`.

## Cambios de modelo en v2
1. **Red de pueblos** (no solo Vila-rodona): 5 pueblos reales vecinos que se ayudan. Todo dato lleva `puebloId`.
   La app es una **plantilla**: cualquier pueblo < 5.000 hab. se suma con su configuración.
2. **No solo agricultura**: también turismo rural, hostelería, bodega y forestal. Ofertas con `sector`.
   Objetivo: **trabajo encadenado todo el año** entre pueblos y sectores.
3. **Vivienda: la pone quien contrata.** El pueblo NO da camas. Cada alojamiento pertenece a un **empleador**
   (propio o alquilado por él). La app ofrece a los empleadores una **bolsa de viviendas** (casas rurales fuera
   de temporada, viviendas vacías) para alquilar; el ayuntamiento solo **verifica** requisitos mínimos.
   Coste para el temporero: 0 €.

## Reglas
- Módulos ES puros, sin dependencias, sin `fetch`, sin build. Navegador y Node 18+.
- Funciones `async`, latencia simulada 100–250 ms determinista, devuelven copias (`structuredClone`).
- Estado en memoria. Errores: `{ ok:false, error:'texto' }`.
- `HOY = '2026-11-14'`. Castellano. Empresas y personas **ficticias** con "(ejemplo)"; pueblos y monumentos, reales.
- Nunca puntuaciones públicas de personas ni empresas.
- Filtro `puebloId` opcional en todas las funciones de lista: `undefined` o `'red'` = toda la red.

## Pueblos de la red (datos reales; no cambiar)
| id | nombre | habitantes | año padrón | lat, lng | notas reales |
|---|---|---|---|---|---|
| `vila-rodona` | Vila-rodona | 1382 | 2025 | 41.3128, 1.3594 | viña, olivo, almendro, avellano; Celler Cooperatiu modernista (Cèsar Martinell) |
| `aiguamurcia` | Aiguamúrcia | 987 | 2025 | 41.3290, 1.3590 | capital municipal en Santes Creus; Reial Monestir de Santes Creus (Ruta del Cister) aprox. 41.3475, 1.3606; viña DO Penedès; càmping en Santes Creus |
| `montferri` | Montferri | 473 | 2024 | 41.2672, 1.3669 | santuario modernista de la Mare de Déu de Montserrat (Josep M. Jujol) |
| `brafim` | Bràfim | 696 | 2024 | 41.2706, 1.3417 | vino; santuario de la Mare de Déu del Lloret |
| `vilabella` | Vilabella | 723 | 2024 | 41.2492, 1.3314 | tradición agrícola |
Todos en la comarca **Alt Camp** (Tarragona), en la cuenca del río **Gaià**. Red: "Red de pueblos del Gaià (ejemplo)".
No inventar coordenadas de monumentos salvo el monasterio (aprox. indicada). El resto de puntos: a < 1,5 km del centro de su pueblo.

## Funciones de `api.js`

### Generales
| Función | Devuelve |
|---|---|
| `HOY`, `FUENTES` (const) | igual que v1; añadir fuentes de las funciones nuevas |
| `getRed()` | `{ id:'red-gaia', nombre, descripcion, centro:{lat,lng,zoom:12}, pueblos:[Pueblo], dinamizador:{nombre,telefono,horario,lugar}, costeDinamizador:{anualEuros, reparto:[{puebloId, euros}]}, comoSumarse:[texto] }` (5–6 pasos para que otro pueblo se una) |
| `getPueblos()` | `[Pueblo]` donde `Pueblo = { id, nombre, comarca, provincia, habitantes, anyoPadron, lat, lng, zoom:14, cultivos:[{id,nombre,emoji,color}], sectores:[sector], destacados:[texto], puntoAtencion }` |
| `getPueblo(puebloId='vila-rodona')` | `Pueblo` + `dinamizador` (el de la red). Compatibilidad v1. |
| `getSectores()` | `[{ id:'agricultura'\|'turismo'\|'hosteleria'\|'bodega'\|'forestal', nombre, emoji, color }]` |

### Calendario y tiempo (Weather + Vertex AI)
| Función | Devuelve |
|---|---|
| `getCalendario(puebloId?)` | `[{ id, puebloId, cultivoId, nombre, inicio, fin, estado:'terminado'\|'en_curso'\|'proximo', trabajadoresNecesarios, trabajadoresConfirmados, nota }]` cosechas 2026 + poda de viña ene–feb 2027 (`proximo`) |
| `getTemporadaAnual(puebloId?)` | 12 meses: `[{ mes:1..12, nombre:'Ene', agricultura, turismo, hosteleria, bodega, forestal }]` = nº de puestos demandados en la red ese mes. Debe mostrar que **ningún mes queda a 0** gracias a combinar sectores (verano: turismo/hostelería; sep–oct: vendimia/bodega; nov–dic: oliva; ene–mar: poda y forestal; abr–jun: tratamientos, turismo de primavera) |
| `getPrevision(puebloId='vila-rodona')` | igual que v1 (10 días). Pequeñas variaciones por pueblo (±1 °C), mismos días de lluvia/viento |
| `getAlertas(puebloId?)` | igual que v1 + `puebloId` |

### Mapa (Maps)
| Función | Devuelve |
|---|---|
| `getLugares({puebloId, tipo}?)` | `[{ id, puebloId, tipo:'alojamiento'\|'empleador'\|'comercio'\|'recogida'\|'servicio'\|'patrimonio', nombre, lat, lng, descripcion, ...extra }]`. `alojamiento` = ver Alojamiento (abajo, mismos campos). `empleador`: `empleadorId`. `comercio`: `horarioNormal, horarioCampana, ofertaTemporero`. `recogida`: `hora`. `patrimonio`: monumentos reales. |
| `getRutas(puebloId?)` | igual que v1. Incluir: **ruta de transporte compartido entre los 5 pueblos**, ruta de cosechas encadenadas y ruta turística (monasterio de Santes Creus, celler de Vila-rodona, santuario de Montferri) |

### Empleadores, ofertas y vivienda (Business Profile)
| Función | Devuelve |
|---|---|
| `getEmpleadores({puebloId, sector}?)` | `[{ id, puebloId, tipo:'finca'\|'casa_rural'\|'bodega'\|'restaurante'\|'camping'\|'empresa_forestal', sector, nombre, propietario, lat, lng, telefono, descripcion, campanaDigna:boolean, cultivos:[cultivoId] (solo fincas), hectareas?, ventaDirecta:{activa, diasRecogida, productos:[{id,nombre,precio,unidad,stock}]}\|null }` 10–14 empleadores repartidos por los 5 pueblos y sectores |
| `getFincas(puebloId?)` | empleadores `tipo:'finca'` (compatibilidad v1) |
| `getOfertas({puebloId, sector}?)` | `[{ id, puebloId, empleadorId, sector, cultivoId\|null, titulo, inicio, fin, plazas, plazasCubiertas, salarioHora, horario, contrato:true, alojamiento:{ incluido:boolean, alojamientoId\|null }, transporte:{ incluido, recogidaId\|null }, tareas, idiomasEncargado:[] }]` Regla: si `alojamiento.incluido`, `alojamientoId` pertenece al **mismo** `empleadorId`. Ofertas actuales (nov) + próximas de varios sectores |
| `getAlojamientos(puebloId?)` | `[Alojamiento]` = `{ id, puebloId, empleadorId, nombre, modalidad:'propio'\|'alquilado', viviendaId\|null, lat, lng, plazas, plazasLibres, verificado:boolean, verificadoPor:'Ajuntament de …', requisitos:{ camasIndividuales, banos, cocina, calefaccion, lavadora }, costeTemporero:0, costeEmpleadorMes\|null, desde, hasta, descripcion }` |
| `getViviendasParaEmpleadores(puebloId?)` | bolsa: `[{ id, puebloId, tipo:'casa_rural'\|'vivienda_vacia'\|'albergue', nombre, propietario, lat, lng, plazas, precioMes, disponibleDesde, disponibleHasta, nota, alquiladaPor:null\|empleadorId }]` (p. ej. casa rural vacía de nov a mar porque en invierno hay poco turismo) |
| `alquilarVivienda(viviendaId, empleadorId)` | marca `alquiladaPor`, crea un `Alojamiento` (`modalidad:'alquilado'`, `verificado:false` hasta inspección) y lo devuelve: `{ ok, alojamiento }`. Error si ya está alquilada. |
| `verificarAlojamiento(alojamientoId)` | pone `verificado:true` → `{ ok, alojamiento }` (lo hace el ayuntamiento/dinamizador) |

### Temporeros, solicitudes y emparejamientos (Vertex AI propone, decide una persona)
| Función | Devuelve |
|---|---|
| `getTemporeros()` | igual que v1 + `sectores:[sector]` de experiencia y `puebloId` donde está ahora (o `null`) |
| `solicitarOferta(ofertaId, temporeroId)`, `getSolicitudes()` | igual que v1 |
| `getEmparejamientosIA(puebloId?)` | igual que v1. `alojamientoId` siempre del empleador de la oferta. `motivo` puede citar encadenamiento ("Acaba la oliva en Vila-rodona el 20/12 y empieza la poda en Bràfim el 7/1") |
| `decidirEmparejamiento(id, decision)` | igual que v1 (al aprobar baja `plazasLibres` del alojamiento y sube `plazasCubiertas`) |
| `getCaminoAnual(temporeroId)` | `{ temporeroId, tramos:[{ inicio, fin, puebloId, empleadorId, sector, tarea }], mesesConTrabajo, diasTrabajo }` para al menos 2 temporeros ejemplo; para el resto, un camino propuesto coherente con su experiencia |

### Ayuda mutua entre pueblos
| Función | Devuelve |
|---|---|
| `getAyudaMutua()` | `[{ id, fecha, desdePuebloId, haciaPuebloId, personas, motivo, tipo:'cuadrilla'\|'transporte'\|'maquinaria'\|'alojamiento', estado:'propuesta'\|'aceptada' }]` ej.: martes 17 llueve en Vila-rodona → la cuadrilla de oliva trabaja en la bodega de Aiguamúrcia (a cubierto); furgoneta compartida; trituradora de poda prestada |
| `aceptarAyuda(id)` | `{ ok, ayuda }` |

### Turismo y compra directa
| Función | Devuelve |
|---|---|
| `getExperiencias(puebloId?)` | `[{ id, puebloId, empleadorId, titulo, tipo:'cosecha'\|'enoturismo'\|'patrimonio'\|'ruta'\|'gastronomia', fechas:[iso], precioPersona, plazasLibres, duracion, descripcion, dependeDelTiempo:boolean }]` 6–8 (ej. "Un día de oliva" en Vila-rodona, visita a Santes Creus + comida, ruta modernista Vila-rodona–Montferri). Fechas solo en días aptos de la previsión cuando `dependeDelTiempo` |
| `reservarExperiencia(id, fecha, personas)` | `{ ok, codigo, total }` baja `plazasLibres`; error si fecha no válida o sin plazas |
| `reservarCompra(empleadorId, items)` | igual que v1 (antes `fincaId`) |

### Idiomas, trámites, indicadores
| Función | Devuelve |
|---|---|
| `getIdiomas()`, `traducir()`, `getTextos(idioma)` | igual que v1; añadir claves de abajo en los 6 idiomas |
| `getTramites()` | igual que v1 + 1 trámite para el empleador: "Preparar el alojamiento de tus trabajadores" (requisitos mínimos, verificación del ayuntamiento) — orientativo, sin inventar normas concretas |
| `getIndicadores(puebloId?)` | v1 + `{ pueblosEnRed, empleadoresConAlojamiento, ofertasConAlojamientoPct, camasEmpleadores, camasVerificadas, viviendasBolsaLibres, mesesTrabajoMedio, ayudasAceptadas, reservasTurismo, sectoresActivos }`. Eliminar `camasDisponibles` del pueblo → renombrar a `camasLibres` (de alojamientos de empleadores). Calculado siempre del estado. |

### Claves de texto nuevas (además de las de v1)
`nav_red, nav_turismo, pueblo, red, todos, sector, sector_agricultura, sector_turismo, sector_hosteleria, sector_bodega, sector_forestal, alojamiento_empleador, verificado, pendiente_verificar, alquilar, coste_temporero, ayuda_mutua, aceptar, camino_anual, meses_trabajo, reservar_experiencia, personas, fecha`

---

# v3 · España entera, más sectores y jóvenes (se AÑADE a v2; nada de v2 cambia)

## Idea
- **Una plataforma, muchas redes.** España se organiza en **redes comarcales** de pueblos < 5.000 hab. (como la del Gaià).
  Cada red elige su **arquetipo** según su economía y usa la misma app. El Gaià es la red de demostración completa;
  las demás son **ejemplos de plantilla** (datos ilustrativos, marcados "(ejemplo)").
- **Corredor nacional de temporadas:** una persona encadena temporadas de distintas redes y trabaja los 12 meses.
- **Ruta de arraigo para jóvenes:** probar (1–3 meses) → año completo → quedarse (vivienda estable, relevo, emprender).

## Datos reales que se pueden usar (no inventar otros)
- España: 6.329 municipios < 5.000 hab. = 77,8 % de los municipios, ~9 % de la población (MAPA, 2025).
- Campus Rural (MITECO + universidades públicas): prácticas de ~3 meses en municipios < 5.000 hab., 1.000 € brutos/mes; en 2025, 750 estudiantes de 44 universidades.
- Relevo: < 9 % de titulares de explotaciones agrarias tienen menos de 41 años; ~41 % tienen 65 o más (Censo Agrario 2020).
- Pastores de ovino y caprino: quedan entre 80.000 y 90.000 (estimaciones, 2026). 2026 = Año Internacional de los Pastizales y los Pastores (ONU).
- Pirineo aragonés: falta de vivienda para trabajadores de temporada; Panticosa construye vivienda pública para ellos (programa "Más Vivienda, Mejor Turismo").

## Redes de ejemplo (arquetipos). Centro aproximado para el mapa de España.
| id | nombre | provincia | arquetipo | centro aprox. | temporada fuerte (meses) |
|---|---|---|---|---|---|
| `red-gaia` | Red del Gaià | Tarragona | agrícola + turismo rural | 41.30, 1.35 | todo el año (demo completa) |
| `red-tena` | Valle de Tena (ejemplo) | Huesca | nieve y montaña | 42.76, -0.33 | dic–abr esquí; jul–ago montaña |
| `red-tajo-salor` | Tajo-Salor-Almonte (ejemplo) | Cáceres | ganadería ovina y quesería | 39.56, -6.42 | todo el año; mar–may partos y queso; may–jun esquileo |
| `red-pinares` | Tierra de Pinares (ejemplo) | Segovia | forestal y resina | 41.20, -4.43 | abr–oct resina; nov–mar trabajos forestales |
| `red-magina` | Sierra Mágina (ejemplo) | Jaén | olivar | 37.80, -3.40 | nov–feb aceituna; mar–abr poda |
No dar cifras de habitantes ni nombres de pueblos de las redes de ejemplo salvo los citados aquí (Sallent de Gállego y Panticosa en Tena).

## Funciones nuevas en `api.js`
| Función | Devuelve |
|---|---|
| `getEspana()` | `{ municipiosPequenos:6329, pctMunicipios:77.8, pctPoblacion:9, fuente:'MAPA, Informe Anual de Indicadores 2025', redes:[RedEspana], arquetipos:[{id, nombre, emoji, color, sectores:[texto], ejemploRedId, problema, comoAyuda}], comoCrearRed:[texto] }` (6–7 pasos para crear una red nueva en cualquier comarca) |
| RedEspana | `{ id, nombre, provincia, comunidad, arquetipoId, lat, lng, esDemo:boolean, sectores:[texto], temporadas:[{ mesInicio:1..12, mesFin:1..12, texto }], pueblosEjemplo:[texto], destacado }` |
| `getCorredor()` | `{ titulo, persona:'(ejemplo)', tramos:[{ mesInicio, mesFin, redId, sector, tarea, viviendaDe:'empleador'\|'estación'\|... }], meses:12, nota }` — ruta de ejemplo de 12 meses: dic–abr nieve (Tena) → may–jun esquileo/queso (Tajo-Salor) → jul–ago resina (Pinares) → sep–oct vendimia (Gaià) → nov oliva (Gaià/Mágina). Meses consecutivos, sin huecos ni solapes, cubren 12 meses. |
| `getJovenes()` | `{ datos:[{ cifra, texto, fuente }] (solo los reales de arriba), pasos:[{ id:'probar'\|'anyo'\|'quedarse', titulo, duracion, queOfrece:[texto], quienPaga:[texto] }], preguntas:[{ id, texto, opciones:[{ id, texto, arquetipos:[arquetipoId] }] }] (3 preguntas para recomendar una red) }` |
| `getOportunidadesJovenes(arquetipoId?)` | `[{ id, tipo:'practicas'\|'primera_temporada'\|'formacion'\|'relevo'\|'vivienda_estable'\|'emprender', titulo, redId, puebloId\|null, descripcion, duracion, condiciones:[texto], plazas }]` 10–14, repartidas por redes y tipos. Prácticas = dentro del programa Campus Rural (1.000 €/mes, 3 meses). Relevo = negocios/explotaciones ficticias "(ejemplo)" cuyo dueño se jubila (rebaño, bar del pueblo, finca de almendros en Vilabella, quesería…). Formación = escuela de pastores, monitor de montaña, poda, resinación (genérico, sin inventar títulos oficiales). |
| `recomendarRed(respuestas)` | `respuestas: { [preguntaId]: opcionId }` → `{ ok, arquetipoId, redId, motivo, oportunidades:[id] }` (cuenta votos de arquetipo; empate → la red del Gaià) |
| `apuntarseOportunidad(id, nombre)` | `{ ok, codigo }`; error si sin plazas o nombre vacío/ > 60 caracteres; baja `plazas` |

## Claves de texto nuevas (6 idiomas)
`nav_espana, nav_jovenes, arquetipo, corredor, ruta_arraigo, probar, anyo_completo, quedarse, apuntarme, recomendar, oportunidades, relevo, practicas`
