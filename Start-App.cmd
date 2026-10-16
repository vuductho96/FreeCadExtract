@echo off
setlocal
cd /d "%~dp0"
set "FREESCAN_NODE="
for /f "delims=" %%N in ('where node.exe 2^>nul') do if not defined FREESCAN_NODE set "FREESCAN_NODE=%%N"
if not defined FREESCAN_NODE if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "FREESCAN_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not defined FREESCAN_NODE if exist "%ProgramFiles%\nodejs\node.exe" set "FREESCAN_NODE=%ProgramFiles%\nodejs\node.exe"
if not defined FREESCAN_NODE (
 echo Can Node.js 18+ da co tren may. Khong cai phan mem tu dong.
 pause
 exit /b 1
)
"%FREESCAN_NODE%" "%~dp0serve.mjs" --open
if errorlevel 1 pause
endlocal
