# Contexto del proyecto DEBATE (léelo primero)

## Qué es
Reto de un concurso de ideas (zona Madrid): usar servicios de Google para resolver problemas de
pueblos de **menos de 5.000 habitantes**. Nuestra idea: una **red de pueblos** que organiza el **trabajo de
temporada todo el año** (campo, turismo rural, hostelería, bodega, forestal) uniendo temporeros, empleadores,
ayuntamientos, visitantes y compradores.
Escala: **una plataforma, muchas redes** en toda España (5 tipos: agrícola, nieve/montaña, ganadera, forestal, olivar),
**corredor de temporadas** de 12 meses y **ruta de arraigo para jóvenes** (probar → año completo → quedarse).
Nombre del producto: **pendiente** (provisional "Temporada del Gaià").

## Demo
- Red real de 5 pueblos del Alt Camp (Gaià): Vila-rodona 1.382 · Aiguamúrcia 987 · Montferri 473 · Bràfim 696 · Vilabella 723 hab.
  Es una **plantilla** para cualquier pueblo < 5.000 hab. Selector de pueblo arriba ("Toda la red" o uno).
- **Vivienda: la pone quien contrata** (propia o alquilada de la bolsa). El ayuntamiento verifica. Temporero paga 0 €.
  El pueblo NO da camas.
- Fecha "hoy" de la demo: 2026-11-14 → campaña de **oliva** en curso.
- **Todo simulado**: sin llamadas a APIs. Cada dato lleva su etiqueta "🧪 Google X (simulado)".
- Fincas y personas ficticias marcadas "(ejemplo)". Lugares públicos, reales.

## Google que usamos (simulado en la demo)
Maps (mapa, rutas, lugares) · Business Profile (fichas de fincas y comercios, ofertas, venta directa) ·
Weather API (previsión 10 días, avisos) · Vertex AI / Gemini (traducción, avisos en lenguaje sencillo,
propuestas de emparejamiento que **aprueba una persona**).
Mensaje clave: *la tecnología ayuda, decide una persona del pueblo (el dinamizador).*

## Criterios del jurado (20 % cada uno)
Adecuación al reto · Innovación y originalidad · Viabilidad técnica · Impacto y valor · Coherencia y sostenibilidad.
También rellenamos un **Business Model Canvas** (ver `docs/idea.md`).

## Estructura
```
app/                 ← lo que se publica (Vercel ahora; Firebase preparado)
  index.html
  frontend/css, frontend/js/main.js, frontend/js/pantallas/*.js
  frontend/vendor/   ← Leaflet y fuente Atkinson Hyperlegible alojados aquí (sin CDNs)
  backend/api.js     ← único punto de entrada del backend simulado
  backend/services/  ← un archivo por servicio de Google simulado
  backend/data/      ← datos de ejemplo (módulos ES, no JSON)
docs/                ← idea, canvas, contrato frontend↔backend, seguridad
scripts/             ← pruebas: probar-backend, probar-pantallas, probar-navegador (jsdom, NODE_PATH)
```
Sin build ni dependencias. Probar en local: `cd app && python3 -m http.server 8000`.

## Forma de trabajar
- Hilo principal = alto nivel. Tareas de backend → agente backend, contra `docs/contrato-api.md`.
- Respuestas al equipo: castellano, frases cortas, concretas, fáciles de copiar en papel.
- Dudas → preguntas de opción múltiple.
- Texto grande y controles A−/A+ en la interfaz (preferencia del equipo).

## Seguridad (no romper)
- Nada de scripts inline ni CDNs: la CSP de `vercel.json` / `firebase.json` los bloquea.
- Solo Google Sites puede incrustar la demo (frame-ancestors).
- Escapar con `esc()` todo dato que entre en HTML.
- Ninguna clave de API en el código. Ver `docs/seguridad.md`.

## Publicación
- **Ahora: Vercel** (`vercel.json`) → https://temporadaruralideathon.vercel.app. Cada push a `main` se publica solo.
- **Google Site** = portada del proyecto con la demo incrustada ("Insertar → URL") y el QR. Solo Google Sites puede incrustarla.
- **Firebase: en pausa.** `firebase.json` y la Action (solo manual) están listos; se activará si sobra tiempo
  (guía en `google-sites/02-guia-firebase-github-sites.md`).
