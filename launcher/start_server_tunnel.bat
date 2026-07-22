@echo off
title GeoPulse Server + Tunnel
echo.
echo    [ GEOPULSE TUNNEL LAUNCHER ]
echo    ------------------------------
echo    Setting up environment...

:: Dynamic Path (Parent Folder)
set "PROJECT_DIR=%~dp0.."

:: Configuration
set "NGROK_TOKEN=1jbhpJKgyiv7KVuQF2mTzDiu5uf_3tMAjA22bvgVAa3GTjza6"
set "NGROK_DOMAIN=unrayed-brusquely-enid.ngrok-free.dev"

if "%NGROK_TOKEN%"=="" (
    echo [!] Ngrok token is not defined in the script.
    pause
    exit /b
)

echo    Token Found: %NGROK_TOKEN:~0,10%...
echo    Domain:      %NGROK_DOMAIN%
echo.

:: Configure Ngrok Token
echo    Configuring Ngrok authtoken...
call ngrok config add-authtoken %NGROK_TOKEN%

:: Change to project directory
cd /d "%PROJECT_DIR%"

:: Check for node_modules
if not exist "node_modules" (
    echo [!] node_modules not found. Running pnpm install first...
    call pnpm install
)

echo    Starting Ngrok Tunnel...
:: Start ngrok in a separate window
start "GeoPulse Ngrok Tunnel" ngrok http --url=%NGROK_DOMAIN% 3000

echo    Starting Development Server...
echo.

:: Run the dev server
call pnpm dev

pause
