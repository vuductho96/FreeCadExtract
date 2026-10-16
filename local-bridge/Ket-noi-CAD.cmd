@echo off
setlocal
cd /d "%~dp0"
set "FREESCAN_NODE="
for /f "delims=" %%N in ('where node.exe 2^>nul') do if not defined FREESCAN_NODE set "FREESCAN_NODE=%%N"
if not defined FREESCAN_NODE if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "FREESCAN_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not defined FREESCAN_NODE (
 echo Can Node.js 18+ da cai. Khong tu cai EXE.
 pause
 exit /b 1
)
"%FREESCAN_NODE%" "%~dp0launch-suite.mjs"
pause
