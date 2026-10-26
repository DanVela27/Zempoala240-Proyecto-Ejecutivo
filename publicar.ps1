param([string]$Mensaje = 'Actualizar dashboard de Zempoala 240')
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
function Confirmar-Comando {
    if ($LASTEXITCODE -ne 0) { throw 'La publicación se detuvo. Revisa el mensaje anterior.' }
}
node verificar.cjs
Confirmar-Comando
git rev-parse --show-toplevel
Confirmar-Comando
$ramaActual = git branch --show-current
Confirmar-Comando
if ($ramaActual -ne 'main') { throw 'La publicación requiere estar en la rama main.' }
git remote get-url origin
Confirmar-Comando
git add -- dashboard.html index.html .nojekyll .gitignore README.md verificar.cjs publicar.ps1
Confirmar-Comando
git diff --cached --quiet
if ($LASTEXITCODE -eq 1) {
    git commit -m $Mensaje
    Confirmar-Comando
} elseif ($LASTEXITCODE -ne 0) {
    throw 'No se pudieron revisar los cambios.'
}
git push -u origin main
Confirmar-Comando
Write-Host 'Cambios enviados a GitHub. Revisa el despliegue de Pages en el repositorio.'
