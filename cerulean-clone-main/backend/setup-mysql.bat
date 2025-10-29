@echo off
echo 🗄️  MySQL Database Setup for The House of Events
echo ================================================
echo.

echo 📊 Step 1: Creating database...
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS house_of_events;"
if %errorlevel% neq 0 (
    echo ❌ Database creation failed. Please check your MySQL password.
    pause
    exit /b 1
)

echo.
echo 📋 Step 2: Creating tables...
mysql -u root -p house_of_events < database\mysql-schema.sql
if %errorlevel% neq 0 (
    echo ❌ Table creation failed. Please check your MySQL password.
    pause
    exit /b 1
)

echo.
echo 📥 Step 3: Importing your data...
mysql -u root -p house_of_events < database\mysql-export.sql
if %errorlevel% neq 0 (
    echo ❌ Data import failed. Please check your MySQL password.
    pause
    exit /b 1
)

echo.
echo 🎉 MySQL Database Setup Complete!
echo ================================
echo 📁 Database: house_of_events
echo 👤 Your registration data is now in MySQL!
echo.
echo 🔧 To view your data:
echo    mysql -u root -p -e "USE house_of_events; SELECT * FROM users;"
echo    mysql -u root -p -e "USE house_of_events; SELECT * FROM events;"
echo.
pause





