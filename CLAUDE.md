# Contexto del proyecto DEBATE (léelo primero)

## Qué es
Reto de un concurso de ideas (zona Madrid): usar servicios de Google para resolver problemas de
pueblos de **menos de 5.000 habitantes**. Nuestra idea: organizar la **campaña de cosecha** uniendo
temporeros, agricultores, el pueblo y compradores finales.
Nombre del producto: **pendiente** (provisional "Campaña Vila-rodona").

## Demo
- Pueblo real: **Vila-rodona** (Alt Camp, Tarragona), ~1.382 hab. Cultivos: uva, oliva, almendra, avellana.
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
app/                 ← lo que publica Vercel (vercel.json → outputDirectory: app)
  index.html
  frontend/css, frontend/js/main.js, frontend/js/pantallas/*.js
  backend/api.js     ← único punto de entrada del backend simulado
  backend/services/  ← un archivo por servicio de Google simulado
  backend/data/      ← datos de ejemplo (módulos ES, no JSON)
docs/                ← idea, canvas, contrato frontend↔backend
scripts/             ← pruebas en Node (node scripts/probar-backend.mjs)
```
Sin build ni dependencias. Probar en local: `cd app && python3 -m http.server 8000`.

## Forma de trabajar
- Hilo principal = alto nivel. Tareas de backend → agente backend, contra `docs/contrato-api.md`.
- Respuestas al equipo: castellano, frases cortas, concretas, fáciles de copiar en papel.
- Dudas → preguntas de opción múltiple.
- Texto grande y controles A−/A+ en la interfaz (preferencia del equipo).
