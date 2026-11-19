# PowerShell script to build and deploy to greenseatour.vn VPS

$ErrorActionPreference = "Stop"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Starting deployment to greenseatour.vn VPS..." -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# 1. Build the production files
Write-Host "[1/2] Building React production files..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm run build failed. Aborting deployment." -ForegroundColor Red
    exit 1
}

# 2. Sync files to the VPS using SCP
Write-Host "[2/2] Transferring built files to VPS (160.236.192.239)..." -ForegroundColor Yellow
scp -o StrictHostKeyChecking=no -r dist/* root@160.236.192.239:/var/www/greenseatour.vn/html/

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Success: App deployed successfully to https://greenseatour.vn" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Error: Failed to copy files to VPS. Make sure your SSH key is authorized." -ForegroundColor Red
    exit 1
}
