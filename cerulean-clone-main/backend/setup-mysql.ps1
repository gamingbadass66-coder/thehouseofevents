Write-Host "🗄️  MySQL Database Setup for The House of Events" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📊 Step 1: Creating database..." -ForegroundColor Yellow
$createDb = Read-Host "Enter MySQL root password to create database"
mysql -u root -p$createDb -e "CREATE DATABASE IF NOT EXISTS house_of_events;"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database created successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Database creation failed. Please check your password." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Step 2: Creating tables..." -ForegroundColor Yellow
mysql -u root -p$createDb house_of_events < database\mysql-schema.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Tables created successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Table creation failed. Please check your password." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📥 Step 3: Importing your data..." -ForegroundColor Yellow
mysql -u root -p$createDb house_of_events < database\mysql-export.sql

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Data imported successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Data import failed. Please check your password." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔍 Step 4: Verifying your data..." -ForegroundColor Yellow
mysql -u root -p$createDb -e "USE house_of_events; SELECT COUNT(*) as user_count FROM users;"
mysql -u root -p$createDb -e "USE house_of_events; SELECT name, email FROM users WHERE email = 'gamingbadass66@gmail.com';"

Write-Host ""
Write-Host "🎉 MySQL Database Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "📁 Database: house_of_events" -ForegroundColor White
Write-Host "👤 Your registration data is now in MySQL!" -ForegroundColor White
Write-Host ""
Write-Host "🔧 To view your data:" -ForegroundColor Cyan
Write-Host "   mysql -u root -p -e 'USE house_of_events; SELECT * FROM users;'" -ForegroundColor Gray
Write-Host "   mysql -u root -p -e 'USE house_of_events; SELECT * FROM events;'" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")





