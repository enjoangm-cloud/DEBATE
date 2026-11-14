# DEBATE · La cosecha del pueblo, organizada

Prototipo para un reto de pueblos de menos de 5.000 habitantes.
Demo en **Vila-rodona** (Alt Camp, Tarragona): uva, oliva, almendra y avellana.

**Todo es simulado** (sin APIs reales). En producción usaría Google Maps, Business Profile, Weather API y Vertex AI.

## Pantallas
| Pantalla | Para quién | Google (en producción) |
|---|---|---|
| Inicio | Todos | — |
| Calendario | Agricultor | Weather API + Vertex AI |
| Mapa | Temporero | Maps |
| Trabajo | Temporero | Business Profile + Vertex AI (traducción) |
| Pueblo | Dinamizador | Vertex AI (propuestas) + Business Profile |
| Comprar | Comprador final | Business Profile + Maps |
| Trámites | Temporero y agricultor | Forms / Drive |

## Ver en local
```bash
cd app && python3 -m http.server 8000
# abrir http://localhost:8000
```

## Publicar
Vercel lee `vercel.json` y publica la carpeta `app/`. Cada `git push` actualiza la demo.

Más detalle: `docs/idea.md` (problemas, soluciones y Business Model Canvas) y `docs/contrato-api.md`.
