@echo off
title ATW WEB FLOW Server (Stage 1 - Multi-Device)
color 0B
cd /d "%~dp0"

set PORT=5173

echo ======================================================================
echo   ATW WEB FLOW: 4D WEB FLOW EXPLORER - STAGE 1 (KID WONDER)
echo   Local Network & Mobile Phone Access Edition
echo ======================================================================
echo.
echo [*] Checking for existing server on port %PORT%...

:: Stop any process currently listening on port 5173
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-NetTCPConnection -LocalPort %PORT% -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }" 2>nul

:: Extra fallback check with netstat
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":%PORT% " ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [*] Port %PORT% is clear and ready!
echo.

:: Detect the computer's Local Area Network IPv4 address for mobile access
set LAN_IP=
for /f "tokens=*" %%i in ('python -c "import socket; s=socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('8.8.8.8', 80)); print(s.getsockname()[0]); s.close()" 2^>nul') do set LAN_IP=%%i

if "%LAN_IP%"=="" (
    for /f "tokens=*" %%i in ('python -c "import socket; print(socket.gethostbyname(socket.gethostname()))" 2^>nul') do set LAN_IP=%%i
)

echo ======================================================================
echo   HOW TO OPEN & ACCESS ON YOUR DEVICES:
echo ======================================================================
echo   💻 On this PC        : http://localhost:%PORT%/
if not "%LAN_IP%"=="" (
    echo   📱 On your Mobile    : http://%LAN_IP%:%PORT%/
)
echo ======================================================================
echo.
if not "%LAN_IP%"=="" (
    echo   👉 MOBILE PHONE INSTRUCTIONS:
    echo      1. Connect your phone / tablet to the SAME Wi-Fi network.
    echo      2. Open Chrome, Safari, or any browser on your phone.
    echo      3. Type in: http://%LAN_IP%:%PORT%/
    echo.
)

echo [*] Opening ATW WEB FLOW in your PC default browser...
start "" "http://localhost:%PORT%/"

echo [*] Starting web server bound to all network interfaces (0.0.0.0)...
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [*] Python server active on port %PORT% (all network interfaces).
    echo [*] Press CTRL+C in this window anytime to stop the server.
    echo.
    python -m http.server %PORT% --bind 0.0.0.0
) else (
    where npx >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [*] Server running with npx serve on port %PORT% (all interfaces)...
        npx -y serve -p %PORT% -l 0.0.0.0 .
    ) else (
        echo [!] Neither Python nor Node/npx was found in PATH.
        echo [!] You can still open index.html directly in your browser.
        pause
    )
)
