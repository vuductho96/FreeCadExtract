$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) { $nodePath = $nodeCommand.Source } else {
    $bundledNode = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
    if (Test-Path -LiteralPath $bundledNode) { $nodePath = $bundledNode } else {
        throw 'Node.js 18+ is required. No software has been installed. You can also run this folder with an existing Node runtime.'
    }
}
Write-Host 'Open FreeCAD, run the FreeCAD-Web.FCMacro in this folder, then open http://127.0.0.1:8766/pair'
& $nodePath (Join-Path $PSScriptRoot 'server.mjs')
