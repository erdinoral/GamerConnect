@echo off
title GamerConnect - Quick Start
color 0A

echo.
echo   ╔═══════════════════════════════════════╗
echo   ║   GAMERCONNECT PLATFORM              ║
echo   ║   Hizli Baslatma                     ║
echo   ╚═══════════════════════════════════════╝
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
    echo [*] Ilk kurulum yapiliyor, lutfen bekleyin...
    call npm install
    if errorlevel 1 (
        echo.
        echo [X] HATA: Kurulum basarisiz!
        pause
        exit /b 1
    )
)

echo.
echo [*] Sunucu baslatiliyor...
echo [*] Tarayici otomatik acilacak...
echo [*] Durdurmak icin: Ctrl+C
echo.

timeout /t 2 /nobreak >nul

start "" cmd /k "npm run react-dev"

echo.
echo [OK] Sunucu baslatildi!
echo [*] Bu pencereyi kapatabilirsiniz.
echo.

timeout /t 3
