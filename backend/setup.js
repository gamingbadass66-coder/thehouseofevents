#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up The House of Events Backend...\n');

try {
  // Check if .env file exists
  if (!existsSync('.env')) {
    console.log('📝 Creating .env file from template...');
    copyFileSync('env.example', '.env');
    console.log('✅ .env file created. Please edit it with your configuration.\n');
  } else {
    console.log('✅ .env file already exists.\n');
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed.\n');

  // Create database directory
  console.log('📁 Creating database directory...');
  const dbDir = path.join(__dirname, 'database');
  if (!existsSync(dbDir)) {
    execSync(`mkdir -p "${dbDir}"`, { stdio: 'inherit' });
  }
  console.log('✅ Database directory created.\n');

  // Initialize database
  console.log('🗄️  Initializing database...');
  execSync('node src/database/init.js', { stdio: 'inherit' });
  console.log('✅ Database initialized.\n');

  // Seed database
  console.log('🌱 Seeding database with sample data...');
  execSync('node src/database/seed.js', { stdio: 'inherit' });
  console.log('✅ Database seeded.\n');

  console.log('🎉 Backend setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Edit .env file with your configuration');
  console.log('2. Run "npm run dev" to start the development server');
  console.log('3. API will be available at fetch("https://your-backend-render-url.onrender.com/api/..."');
  console.log('4. Check README.md for API documentation\n');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}
