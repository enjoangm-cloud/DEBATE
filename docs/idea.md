# La idea en una hoja

**Qué es:** una web para que una **red de pueblos pequeños** organice el trabajo de temporada **todo el año**:
campo, turismo rural, hostelería, bodega y forestal. Quién trabaja, dónde vive, cuándo y a quién se vende.
**Dónde (demo):** Red de pueblos del Gaià (Alt Camp, Tarragona): Vila-rodona (1.382 hab.), Aiguamúrcia (987),
Montferri (473), Bràfim (696) y Vilabella (723). Es una **plantilla**: sirve para cualquier pueblo < 5.000 hab.
**Claves:**
- La **vivienda la pone quien contrata** (propia o alquilada de la bolsa). El ayuntamiento la verifica. El temporero no paga.
- Los pueblos **se ayudan**: comparten dinamizador, transporte, cuadrillas y maquinaria.
- La tecnología ayuda; **decide una persona** (el dinamizador de la red).

## Problemas → soluciones → Google
| # | Problema | Solución | Google |
|---|---|---|---|
| 1 | Falta de alojamiento para temporeros | La pone el empleador; bolsa de casas rurales y viviendas vacías para que la alquile; el ayuntamiento verifica | Business Profile + Maps |
| 2 | Pérdida de cosecha por falta de trabajadores | Calendario con aviso de cuándo y cuánta gente | Weather + Maps |
| 3 | Huecos sin trabajo entre cosechas | Trabajo encadenado entre 5 pueblos y 5 sectores (campo, turismo, hostelería, bodega, forestal) | Maps + Business Profile |
| 4 | Pérdida de cosecha por el tiempo | Previsión 10 días + avisos sencillos | Weather + Vertex AI |
| 5 | Sobrecoste por mala organización | No pagar jornadas de lluvia, transporte compartido | Weather + Maps |
| 6 | Mala comunicación temporero ↔ propietario | Ofertas claras y traducidas | Business Profile + Vertex AI |
| 7 | Desplazamiento a ciegas | Punto de recogida y ruta | Maps |
| 8 | Burocracia | Trámites paso a paso (la alivia, no la elimina) | Forms / Drive |
| A | Llegan sin contrato ni cama | La oferta muestra contrato y cama antes de venir | Business Profile |
| B | Comercios no se adaptan a la campaña | Horarios especiales y menú del temporero | Business Profile |
| C | Dependencia de intermediarios | Venta directa y "vive la cosecha" | Business Profile + Maps |
| D | Un pueblo pequeño no puede pagar solo un coordinador | Red de pueblos: un dinamizador compartido y ayuda mutua | — |
| E | Casas rurales vacías en invierno | Las alquilan los empleadores para sus trabajadores (nov–mar) | Business Profile |

## Business Model Canvas
| Nº | Casilla | Contenido |
|---|---|---|
| 1 | Propuesta de valor | Calendario + mapa + fichas en una sola web: menos cosecha perdida, cama y contrato antes de llegar, venta directa |
| 2 | Segmentos | Empleadores (fincas, casas rurales, bodegas, restaurantes, forestal) · temporeros · ayuntamientos de la red · propietarios de viviendas vacías · comercios · visitantes y compradores |
| 3 | Relaciones | Personal: un dinamizador para toda la red que coordina y responde |
| 4 | Canales | Web móvil, WhatsApp, QR en ayuntamiento y bar, cooperativa |
| 5 | Alianzas | Los 5 ayuntamientos, cooperativas, sindicato agrario, asociación de turismo rural, grupo LEADER, Cáritas/Creu Roja, Google |
| 6 | Actividades | Mantener calendario y mapa, captar empleadores y viviendas para la bolsa, verificar viviendas, conectar temporero y empleador, coordinar ayuda mutua |
| 7 | Recursos | Web, APIs de Google, dinamizador de la red, bolsa de viviendas y empleadores |
| 8 | Costes | Desarrollo, sueldo del dinamizador (repartido entre los pueblos), uso de APIs (bajo en piloto) |
| 9 | Ingresos | Cuota anual de cada ayuntamiento según habitantes · cuota pequeña por temporada del empleador · comisión baja en venta directa y experiencias · **el temporero nunca paga** |

## Escala España (v3)
**Una plataforma, muchas redes.** Cada comarca de pueblos < 5.000 hab. crea su red con la misma app.
Hay 6.329 municipios así en España (77,8 % del total, ~9 % de la población · MAPA 2025).

| Tipo de red | Oficios | Ejemplo |
|---|---|---|
| Agrícola + turismo rural | cosecha, poda, bodega, casas rurales | Red del Gaià (demo completa) |
| Nieve y montaña | remontes, hostelería, monitores; verano: montaña | Valle de Tena, Huesca (ejemplo) |
| Ganadera | pastoreo, ordeño, quesería, esquileo | Tajo-Salor-Almonte, Cáceres (ejemplo) |
| Forestal | resina, prevención de incendios | Tierra de Pinares, Segovia (ejemplo) |
| Olivar | aceituna, poda, almazara | Sierra Mágina, Jaén (ejemplo) |

**Corredor de temporadas:** una persona encadena redes y trabaja 12 meses (nieve → esquileo → resina → vendimia → oliva).

**Ruta de arraigo para jóvenes:**
1. **Probar** (1–3 meses): prácticas Campus Rural (1.000 €/mes) o primera temporada con vivienda del empleador.
2. **Año completo:** trabajo encadenado en la red + formación (escuela de pastores, poda, montaña).
3. **Quedarse:** vivienda estable de la bolsa, **relevo** de explotaciones y negocios sin sucesor, emprender.
Por qué: menos del 9 % de los titulares agrarios tienen menos de 41 años y ~41 % tienen 65 o más (Censo Agrario 2020).
