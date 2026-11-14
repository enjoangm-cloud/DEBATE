# Guía paso a paso · Firebase + GitHub + Google Sites

Tiempo total: unos 20 minutos. Usad **la misma cuenta de Google** en todos los pasos.

## A. Crear el proyecto de Firebase (5 min)
1. Entrad en https://console.firebase.google.com
2. **Crear un proyecto** → nombre: `debateideathon` (si está ocupado, Google añade unas letras; no pasa nada).
3. Google Analytics: **desactivado** (no hace falta).
4. Dentro del proyecto: menú **Compilación → Hosting → Comenzar**. Pulsad **Siguiente** hasta el final, sin ejecutar nada en la terminal.
5. Apuntad el **ID del proyecto** (Configuración del proyecto ⚙️ → General). La demo estará en `https://<ID>.web.app`.

## B. Crear la llave para que GitHub publique solo (5 min)
1. En la consola de Firebase: ⚙️ **Configuración del proyecto → Cuentas de servicio**.
2. Pulsad **Generar nueva clave privada** → se descarga un archivo `.json`.
   ⚠️ Es una contraseña: no la subáis al repositorio ni la paséis por WhatsApp.

## C. Guardar la llave en GitHub (3 min)
1. Abrid https://github.com/enjoangm-cloud/DEBATE/settings/secrets/actions
2. **New repository secret**
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Secret: abrid el `.json` con el Bloc de notas, **copiad todo** y pegadlo.
3. **Add secret**. Después, borrad el `.json` de Descargas.

## D. Publicar (1 min)
1. Abrid https://github.com/enjoangm-cloud/DEBATE/actions
2. **Publicar en Firebase → Run workflow → Run workflow**.
3. En 1–2 minutos sale ✅. La demo ya está en `https://<ID>.web.app`.
   Desde ahora, **cada cambio que suba Claude se publica solo** (y antes pasa las pruebas).

> Si sale ❌ en el paso "Publicar" con un error de permisos: en https://console.cloud.google.com/iam-admin/iam
> (mismo proyecto), editad la cuenta que termina en `firebase-adminsdk-...` y añadid el rol **Administrador de Firebase Hosting**.
> Volved a lanzar el paso D.

## E. Montar el Google Site (10 min)
1. https://sites.google.com → **+ En blanco**.
2. Pegad los textos de `01-textos-del-site.md`, sección por sección.
3. Sección Demo: **Insertar → Insertar → Por URL** → `https://<ID>.web.app` → **Toda la página**.
4. **Publicar** (arriba a la derecha) → elegid la dirección, p. ej. `temporada-gaia`.
5. En **Compartir → Publicado**: visible para **cualquier usuario**.

## F. El QR para la presentación
1. En Chrome, con el Site publicado abierto: **⋮ → Compartir → Crear código QR** → Descargar.
2. Probad el QR con 2 móviles distintos antes de presentar.

## G. Cuando todo funcione
- Avisad a Claude con el **ID del proyecto** y la **URL del Site**: actualizará los textos y quitará Vercel.
- En https://vercel.com, proyecto `temporadaruralideathon` → Settings → **Delete Project**.
