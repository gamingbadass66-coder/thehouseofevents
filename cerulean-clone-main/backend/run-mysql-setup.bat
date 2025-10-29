@echo off
echo 🗄️  MySQL Database Setup for The House of Events
echo ================================================
echo.
echo This will set up your MySQL database with your registration data.
echo You'll need to enter your MySQL root password 3 times.
echo.
pause

echo.
echo 📊 Step 1: Creating database...
echo Please enter your MySQL root password when prompted:
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS house_of_events;"

echo.
echo 📋 Step 2: Creating tables...
echo Please enter your MySQL root password when prompted:
mysql -u root -p house_of_events < database\mysql-schema.sql

echo.
echo 📥 Step 3: Importing your data...
echo Please enter your MySQL root password when prompted:
mysql -u root -p house_of_events < database\mysql-export.sql

echo.
echo 🎉 Setup Complete!
echo =================
echo Your database 'house_of_events' is now ready with your registration data.
echo.
echo To view your data, run:
echo mysql -u root -p -e "USE house_of_events; SELECT * FROM users;"
echo.
pause





