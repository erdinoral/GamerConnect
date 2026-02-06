@echo off
echo ========================================
echo    GamerConnect Platform Baslatiliyor
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Node modulleri kontrol ediliyor...
if not exist "node_modules" (
    echo Node modulleri bulunamadi, yukleniyor...
    call npm install
    if errorlevel 1 (
        echo HATA: npm install basarisiz!
        pause
        exit /b 1
    )
) else (
    echo Node modulleri mevcut.
)

echo.
echo [2/3] React gelistirme sunucusu baslatiliyor...
echo.
echo Tarayiciniz otomatik olarak acilacak...
echo Sunucuyu durdurmak icin Ctrl+C basin
echo.

call npm run react-dev

pause
