# Guía rápida: cómo actualizar la web

La web está en **https://karliox.github.io/casa-manjavacas-trazabilidad/** y se publica sola cada vez que cambia algo en este repositorio (tarda 1-2 minutos).

## Páginas

| Página | Para qué |
|---|---|
| `index.html` | Portada de la marca |
| `la-carne.html` | Por qué buey, Rubia Gallega y maduración |
| `restaurantes.html` | Propuesta para restaurantes de alta gama, con formulario de contacto |
| `club.html` | Club de fundadores y formulario de reserva |
| `ficha.html?id=CM-001` | Ficha pública de cada buey (a la que lleva el QR) |
| `panel.html` | Panel del ganadero |
| `registrar.html` | Apuntar eventos desde el móvil (solo se guardan en ese móvil) |
| `etiquetas.html` | Imprimir etiquetas A4 con QR para cada pieza |
| `precios.html` | Calculadora: a qué precio vender cada tipo de pieza para llegar al objetivo por kilo de canal |
| `inversores.html` | Sala de inversores con las cifras del modelo |
| `presentacion.html` | Modo presentación: 10 diapositivas principales y un anexo de 40 gráficos con las cifras del modelo (`assets/anexo.js`, datos en `data/presentacion_datos.js`) |
| `Casa_Manjavacas_Resumen.pdf` | Resumen de una página para dejar en la reunión (se genera desde `resumen.html`) |
| `Casa_Manjavacas_Presentacion.pdf` | La presentación completa en PDF (51 páginas), para enviar después de la reunión |
| `Casa_Manjavacas_Dossier_Inversores.pdf` | Dossier descargable (se genera desde `dossier.html`) |

## Cambiar los animales: hoja de Google

1. Abre en tu Drive la hoja **«Casa Manjavacas · Trazabilidad»**.
2. Pestaña **Bueyes**: una fila por animal. Pestaña **Eventos**: una fila por cada cosa que le pasa.
3. Para que la web la lea: **Compartir → Acceso general → Cualquier persona con el enlace → Lector**.
4. Cuando metas animales reales, en `data/config.js` deja `fechaSimulada: ""` y desaparecerá el aviso de simulación.

Si la hoja no está compartida, la web usa los bueyes de ejemplo de `data/bueyes.js`.

## Club de fundadores

En `data/config.js`:
- `plazasReservadas`: cámbialo a mano al confirmar plazas.
- `formularioGoogle` y `campos`: para que las reservas lleguen a tu Google Form.

## Cifras de inversores

Todas salen de `assets/modelo.js`, copiadas de `Casa_Manjavacas_Modelo_completo.xlsx` (Plan actual). Si cambias el Excel, hay que actualizar ese archivo y volver a generar el PDF.

## Instalar el panel en el móvil

Abre `panel.html` en el móvil → menú del navegador → **Añadir a pantalla de inicio**. Se abre como una app.

## Buscadores

Las páginas de inversores, dossier, presentación, panel, registro, etiquetas y precios llevan `noindex`: Google no las muestra en sus resultados, aunque cualquiera con el enlace puede abrirlas.

## Presentar

En `presentacion.html`: flechas o deslizar para pasar, **N** abre las notas del presentador con cronómetro, **Fin** va al final y el índice del anexo salta a cada bloque de gráficos.

## Correos

Borradores para la ayuda de joven agricultor, el despiece real y los restaurantes: `docs/correos.md`.
