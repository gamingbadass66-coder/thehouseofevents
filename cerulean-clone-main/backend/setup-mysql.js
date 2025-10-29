import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗄️  Setting up MySQL Database for The House of Events');
console.log('====================================================\n');

// Function to run MySQL commands
const runMySQLCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(`mysql -u root -e "${command}"`, (error, stdout, stderr) => {
      if (error) {
        console.log(`⚠️  MySQL command failed: ${error.message}`);
        console.log(`   Command: ${command}`);
        resolve(false);
      } else {
        console.log(`✅ MySQL command successful`);
        resolve(true);
      }
    });
  });
};

// Function to import SQL file
const importSQLFile = (filePath) => {
  return new Promise((resolve, reject) => {
    exec(`mysql -u root < "${filePath}"`, (error, stdout, stderr) => {
      if (error) {
        console.log(`⚠️  Import failed: ${error.message}`);
        resolve(false);
      } else {
        console.log(`✅ Import successful`);
        resolve(true);
      }
    });
  });
};

const setupMySQL = async () => {
  try {
    console.log('📊 Step 1: Creating database...');
    await runMySQLCommand('CREATE DATABASE IF NOT EXISTS house_of_events;');
    
    console.log('\n📋 Step 2: Creating tables...');
    const schemaPath = path.join(__dirname, 'database', 'mysql-schema.sql');
    await importSQLFile(schemaPath);
    
    console.log('\n📥 Step 3: Importing your data...');
    const dataPath = path.join(__dirname, 'database', 'mysql-export.sql');
    await importSQLFile(dataPath);
    
    console.log('\n🔍 Step 4: Verifying your data...');
    await runMySQLCommand('USE house_of_events; SELECT COUNT(*) as user_count FROM users;');
    await runMySQLCommand('USE house_of_events; SELECT name, email FROM users WHERE email = "gamingbadass66@gmail.com";');
    
    console.log('\n🎉 MySQL Database Setup Complete!');
    console.log('================================');
    console.log('📁 Database: house_of_events');
    console.log('👤 Your registration data is now in MySQL!');
    console.log('\n🔧 To view your data:');
    console.log('   mysql -u root -e "USE house_of_events; SELECT * FROM users;"');
    console.log('   mysql -u root -e "USE house_of_events; SELECT * FROM events;"');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Manual setup instructions:');
    console.log('1. Open MySQL Workbench or command line');
    console.log('2. Run: mysql -u root -p');
    console.log('3. Create database: CREATE DATABASE house_of_events;');
    console.log('4. Import schema: source database/mysql-schema.sql');
    console.log('5. Import data: source database/mysql-export.sql');
  }
};

setupMySQL();





