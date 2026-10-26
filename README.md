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

## Publicación de avances para el equipo

La página pública muestra una instantánea de solo lectura, cargada desde datos-publicados.js.
No lee borradores del navegador. Todos ven los mismos datos al recargar.

Para editar, abre dashboard.html localmente o añade ?editar=1 a la dirección del dashboard.
Este modo solo guarda un borrador personal: no concede permisos para modificar GitHub.

1. Realiza cambios en el modo edición.
2. Pulsa Descargar actualización para publicar.
3. Adjunta el archivo en este chat y pide publicar los avances.
4. Prepara la instantánea con node preparar-actualizacion.cjs RUTA_DEL_RESPALDO.
5. Verifica y publica con publicar.ps1. GitHub Pages actualizará la vista del equipo.

Los respaldos no se suben al repositorio. Al publicar, sus planos, notas, responsables,
fechas y avances pasan a la instantánea pública: revisar su contenido antes del envío.
El borrador local se conserva al publicar nuevas versiones y puede diferir de la instantánea.

Repositorio: https://github.com/DanVela27/Zempoala240-Proyecto-Ejecutivo
Página: https://danvela27.github.io/Zempoala240-Proyecto-Ejecutivo/
