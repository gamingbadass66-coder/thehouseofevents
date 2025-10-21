import sqlite3 from 'sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

export const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    const dbPath = process.env.DB_PATH || './database/events.db';
    
    // Ensure database directory exists
    const dbDir = path.dirname(dbPath);
    import('fs').then(fs => {
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }
    });

    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        reject(err);
        return;
      }
      
      console.log('📊 Connected to SQLite database');
      
      // Enable foreign keys
      db.run('PRAGMA foreign_keys = ON');
      
      // Create tables from schema
      createTables()
        .then(() => {
          console.log('✅ Database tables created successfully');
          resolve();
        })
        .catch(reject);
    });
  });
};

const createTables = async () => {
  return new Promise((resolve, reject) => {
    try {
      // Read schema file
      const schemaPath = path.join(__dirname, '../../database/schema.sql');
      const schema = readFileSync(schemaPath, 'utf8');
      
      // Split schema into individual statements
      const statements = schema
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
      
      let completed = 0;
      const total = statements.length;
      
      if (total === 0) {
        resolve();
        return;
      }
      
      statements.forEach((statement, index) => {
        db.run(statement, (err) => {
          if (err) {
            console.error(`Error executing statement ${index + 1}:`, err.message);
            console.error('Statement:', statement);
            reject(err);
            return;
          }
          
          completed++;
          if (completed === total) {
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Error reading schema file:', error.message);
      reject(error);
    }
  });
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
};

export const closeDatabase = () => {
  return new Promise((resolve) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
        } else {
          console.log('📊 Database connection closed');
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
};

// Promisify database methods
export const dbRun = promisify(db?.run?.bind(db) || (() => {}));
export const dbGet = promisify(db?.get?.bind(db) || (() => {}));
export const dbAll = promisify(db?.all?.bind(db) || (() => {}));



