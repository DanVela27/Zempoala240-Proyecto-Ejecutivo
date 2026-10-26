# Zempoala 240 · Seguimiento ejecutivo

Dashboard estático para gestionar los planos del proyecto ejecutivo.

## Editar desde este chat

El archivo principal es `dashboard.html`. Se puede pedir un cambio en este chat,
revisar el resultado local y después pedir «Publica esta versión en GitHub».
`index.html` abre el dashboard y conserva su dirección `dashboard.html`.

## Configuración inicial de GitHub Pages

1. Vincular esta carpeta a un repositorio de GitHub en la rama `main`.
2. En el repositorio, abrir **Settings → Pages**.
3. Elegir **Deploy from a branch**, rama **main**, carpeta **/(root)** y guardar.
4. Usar la dirección que GitHub muestra cuando termina la publicación.

Después, cada envío a `main` publicará una nueva versión. No se requiere instalar
dependencias ni compilar el sitio. `.nojekyll` permite servir los archivos estáticos.

## Verificar y publicar

Verificar los archivos con `node verificar.cjs`.

Una vez configurado el repositorio y el acceso a GitHub, ejecutar desde PowerShell:

```powershell
.\publicar.ps1 -Mensaje 'Agregar gestión de planos'
```

También se puede pedir la publicación directamente en este chat. El script agrega
los archivos del sitio, guarda una versión y la envía a `main`. Si hay un error,
se detiene sin forzar ni sobrescribir el historial remoto.

## Datos y avances

Los porcentajes, responsables, altas y bajas capturados en la página se guardan
en el navegador. No se envían a GitHub ni se comparten entre usuarios. El código
incluye la lista inicial y sus responsables provisionales, que serán visibles
para quienes tengan acceso al sitio publicado.

Antes de pasar de la versión local a la página publicada, descargar un respaldo
desde el dashboard local y después importarlo en la página publicada. Repetir
esto si se cambia de navegador o computadora. Los cambios de diseño publicados
en la misma dirección conservan el guardado de ese navegador.

Los respaldos JSON y los documentos están excluidos del seguimiento de Git.

Referencia: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
