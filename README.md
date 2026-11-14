# DEBATE · Temporada del Gaià

Prototipo para un reto de pueblos de menos de 5.000 habitantes: una **red de 5 pueblos** del Alt Camp
(Vila-rodona, Aiguamúrcia, Montferri, Bràfim, Vilabella) que organiza el trabajo de temporada **todo el año**
en campo, turismo rural, hostelería, bodega y forestal. La vivienda la pone quien contrata.

**Todo es simulado** (sin APIs reales). En producción usaría Google Maps, Business Profile, Weather API y Vertex AI.

## Pantallas
| Pantalla | Para quién | Google (en producción) |
|---|---|---|
| Inicio | Todos | — |
| Calendario | Empleador | Weather API + Vertex AI |
| Mapa | Temporero | Maps |
| Trabajo | Temporero | Business Profile + Vertex AI (traducción) |
| Red | Dinamizador y ayuntamientos | Maps (+ datos propios) |
| Turismo | Visitante y comprador | Business Profile + Maps + Weather |
| Gestión | Empleador y dinamizador | Business Profile + Vertex AI (propuestas) |
| Trámites | Temporero y agricultor | Forms / Drive |

## Pruebas
```bash
node scripts/probar-backend.mjs
node scripts/probar-pantallas.mjs
NODE_PATH=<jsdom>/node_modules node scripts/probar-navegador.mjs
```

## Ver en local
```bash
cd app && python3 -m http.server 8000
# abrir http://localhost:8000
```

## Publicar
Firebase Hosting (Google) publica la carpeta `app/` con `firebase.json`. Cada `git push` a `main` lanza la
GitHub Action, que pasa las pruebas y publica. La demo se incrusta en el Google Site del proyecto.

Más detalle: `docs/idea.md` (problemas, soluciones y Business Model Canvas) y `docs/contrato-api.md`.
