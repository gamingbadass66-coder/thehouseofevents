import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let connection;

export const initializeMySQLDatabase = async () => {
  try {
    // Create connection to MySQL
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'house_of_events'
    });

    console.log('📊 Connected to MySQL database: house_of_events');
    
    // Test the connection
    await connection.execute('SELECT 1');
    console.log('✅ MySQL connection successful');
    
    return connection;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    throw error;
  }
};

export const getMySQLConnection = () => {
  if (!connection) {
    throw new Error('MySQL database not initialized. Call initializeMySQLDatabase() first.');
  }
  return connection;
};

export const closeMySQLConnection = async () => {
  if (connection) {
    await connection.end();
    console.log('📊 MySQL connection closed');
  }
};

// Helper functions for database operations
export const executeQuery = async (sql, params = []) => {
  const conn = getMySQLConnection();
  try {
    const [rows] = await conn.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
};

export const executeInsert = async (sql, params = []) => {
  const conn = getMySQLConnection();
  try {
    const [result] = await conn.execute(sql, params);
    return result.insertId;
  } catch (error) {
    console.error('Database insert error:', error.message);
    throw error;
  }
};

export const executeUpdate = async (sql, params = []) => {
  const conn = getMySQLConnection();
  try {
    const [result] = await conn.execute(sql, params);
    return result.affectedRows;
  } catch (error) {
    console.error('Database update error:', error.message);
    throw error;
  }
};

export const executeDelete = async (sql, params = []) => {
  const conn = getMySQLConnection();
  try {
    const [result] = await conn.execute(sql, params);
    return result.affectedRows;
  } catch (error) {
    console.error('Database delete error:', error.message);
    throw error;
  }
};


