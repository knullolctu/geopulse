@echo off
title GeoPulse Attendance Server
echo.
echo    [ GEOPULSE ATTENDANCE SYSTEM ]
echo    ------------------------------
echo    Setting up environment...

:: Dynamic Path (Parent Folder)
set "PROJECT_DIR=%~dp0.."

:: Change to project directory
cd /d "%PROJECT_DIR%"

echo    Starting Development Server...
echo.

:: Check for node_modules
if not exist "node_modules" (
    echo [!] node_modules not found. Running pnpm install first...
    call pnpm install
)

:: Run the dev server
call pnpm dev

pause
