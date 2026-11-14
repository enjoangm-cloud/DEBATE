# Seguridad de la web

## Lo que ya está aplicado (prototipo)
| Riesgo | Medida |
|---|---|
| Código malicioso desde webs de terceros (CDN comprometido) | Sin CDNs: Leaflet y la fuente están copiados en `app/frontend/vendor/` |
| Inyección de código (XSS) | Todo dato se escapa con `esc()` antes de entrar en el HTML · CSP `script-src 'self'` (sin scripts inline, sin `eval`) · colores validados (solo `#hex`) |
| Que otra web meta la nuestra en un marco (clickjacking) | `X-Frame-Options: DENY` + `frame-ancestors 'none'` |
| Conexiones sin cifrar | HTTPS obligatorio (HSTS 2 años) + `upgrade-insecure-requests` |
| Fugas a otras webs | `Referrer-Policy` estricta · enlaces externos con `noopener noreferrer` · `connect-src 'self'` |
| IP del visitante enviada a Google por las fuentes (RGPD) | Fuente Atkinson Hyperlegible (Google Fonts, OFL) **alojada en nuestro servidor** |
| Permisos del navegador | `Permissions-Policy`: sin cámara, micro, ubicación ni pagos |
| Datos manipulados en el navegador | Tamaño de texto, idioma y pantalla se validan contra listas cerradas; cantidades de compra limitadas |
| Ficheros internos publicados | Vercel solo publica `app/`. `docs/`, `scripts/` y `CLAUDE.md` no son accesibles desde la web |
| Secretos en el repositorio | No hay claves. `.env*` está en `.gitignore` |

Única excepción: las imágenes del mapa vienen de `tile.openstreetmap.org` (prototipo). En producción se cambia por Google Maps.

## En producción (cuando haya APIs reales)
- **Weather API y Vertex AI: nunca desde el navegador.** Se llaman desde funciones del servidor
  (`/api/*` en Vercel). Las claves van en *Environment Variables* de Vercel, nunca en el código.
- **Vertex AI:** cuenta de servicio de Google Cloud con el permiso mínimo (`Vertex AI User`).
- **Google Maps JavaScript API:** su clave sí llega al navegador (así funciona Google), por eso se **restringe**
  en Google Cloud: solo el dominio `debateideathonm.vercel.app` y solo la API de Maps. Con tope de gasto.
- Límite de peticiones por usuario en las funciones `/api/*` y registro de errores sin datos personales.
- Datos de temporeros (nombre, teléfono, origen): mínimo necesario, consentimiento y borrado al acabar la campaña (RGPD).

Comprobar las cabeceras: https://securityheaders.com/?q=debateideathonm.vercel.app
