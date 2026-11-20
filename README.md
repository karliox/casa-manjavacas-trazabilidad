# Casa Manjavacas — Trazabilidad

Demo de un sistema de trazabilidad para buey de ceba extensiva (Rubia Gallega) en la Montaña Palentina.

**Los animales de esta demo son ficticios (simulación de junio de 2033). Las cifras de inversores vienen del modelo económico y son previsiones, no resultados.**

## Qué incluye

- `index.html` — Página de marca Casa Manjavacas.
- `inversores.html` — Sala de inversores con las cifras del modelo económico (Plan actual), simulador y escenarios.
- `panel.html` — Panel del ganadero: indicadores, lista de animales y QR de cada uno.
- `ficha.html?id=CM-001` — Página pública a la que lleva el QR del producto: la historia de ese buey.
- `registrar.html` — Formulario para apuntar eventos desde el móvil. En la demo se guardan solo en el navegador.
- `data/bueyes.js` — Los datos de los animales. Aquí se cambian por los reales.

## Publicarlo con GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/ (root)` → Save.
La web quedará en `https://karliox.github.io/casa-manjavacas-trazabilidad/`.

## Importante

Complementa la trazabilidad oficial obligatoria (identificación, documento de identificación bovina, SITRAN); no la sustituye.

## Siguientes pasos (versión real)

- Base de datos compartida en lugar del navegador, con acceso con contraseña al panel.
- Fotos por animal.
- Conectar kilos y ventas con el modelo financiero.
