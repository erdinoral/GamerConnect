# GamerConnect Platform Auto Start Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   GamerConnect Platform Baslatiliyor" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Check if node_modules exists
Write-Host "[1/3] Node modulleri kontrol ediliyor..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Node modulleri bulunamadi, yukleniyor..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "HATA: npm install basarisiz!" -ForegroundColor Red
        Read-Host "Devam etmek icin Enter basin"
        exit 1
    }
} else {
    Write-Host "Node modulleri mevcut." -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/3] React gelistirme sunucusu baslatiliyor..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Tarayiciniz otomatik olarak acilacak..." -ForegroundColor Cyan
Write-Host "Sunucuyu durdurmak icin Ctrl+C basin" -ForegroundColor Yellow
Write-Host ""

# Start React dev server
npm run react-dev
