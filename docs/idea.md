# La idea en una hoja

**Qué es:** una web para que un pueblo pequeño organice su campaña de cosecha: quién trabaja,
dónde duerme, cuándo se recoge y a quién se vende.
**Dónde (demo):** Vila-rodona, Alt Camp, Tarragona (~1.382 hab.). Uva, oliva, almendra, avellana.
**Clave:** la tecnología ayuda; decide una persona del pueblo (el dinamizador).

## Problemas → soluciones → Google
| # | Problema | Solución | Google |
|---|---|---|---|
| 1 | Falta de alojamiento para temporeros | Mapa de casas vacías y locales cedidos | Maps |
| 2 | Pérdida de cosecha por falta de trabajadores | Calendario con aviso de cuándo y cuánta gente | Weather + Maps |
| 3 | Huecos sin trabajo entre cosechas | Cosechas encadenadas almendra → avellana → uva → oliva → poda | Maps |
| 4 | Pérdida de cosecha por el tiempo | Previsión 10 días + avisos sencillos | Weather + Vertex AI |
| 5 | Sobrecoste por mala organización | No pagar jornadas de lluvia, transporte compartido | Weather + Maps |
| 6 | Mala comunicación temporero ↔ propietario | Ofertas claras y traducidas | Business Profile + Vertex AI |
| 7 | Desplazamiento a ciegas | Punto de recogida y ruta | Maps |
| 8 | Burocracia | Trámites paso a paso (la alivia, no la elimina) | Forms / Drive |
| A | Llegan sin contrato ni cama | La oferta muestra contrato y cama antes de venir | Business Profile |
| B | Comercios no se adaptan a la campaña | Horarios especiales y menú del temporero | Business Profile |
| C | Dependencia de intermediarios | Venta directa y "vive la cosecha" | Business Profile + Maps |

## Business Model Canvas
| Nº | Casilla | Contenido |
|---|---|---|
| 1 | Propuesta de valor | Calendario + mapa + fichas en una sola web: menos cosecha perdida, cama y contrato antes de llegar, venta directa |
| 2 | Segmentos | Agricultores y cooperativa · temporeros · ayuntamiento/comarca · comercios del pueblo · comprador final |
| 3 | Relaciones | Personal: un dinamizador por pueblo que coordina y responde |
| 4 | Canales | Web móvil, WhatsApp, QR en ayuntamiento y bar, cooperativa |
| 5 | Alianzas | Ayuntamiento, cooperativa, sindicato agrario, grupo LEADER, Cáritas/Creu Roja, Google |
| 6 | Actividades | Mantener calendario y mapa, captar camas y fincas, conectar temporero y finca |
| 7 | Recursos | Web, APIs de Google, dinamizador, base de camas y fincas |
| 8 | Costes | Desarrollo, sueldo (parcial) del dinamizador, uso de APIs (bajo en piloto) |
| 9 | Ingresos | Cuota anual del ayuntamiento/comarca · cuota pequeña por campaña del agricultor · comisión baja en venta directa · **el temporero nunca paga** |
