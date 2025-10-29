import mysql from 'mysql2/promise';
import readline from 'readline';

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get password from user
function getPassword() {
  return new Promise((resolve) => {
    rl.question('Enter your MySQL root password: ', (password) => {
      resolve(password);
    });
  });
}

// Function to display table data
async function displayTableData(connection, tableName) {
  try {
    console.log(`\n📊 Data in table: ${tableName}`);
    console.log('='.repeat(50));
    
    const [rows] = await connection.execute(`SELECT * FROM ${tableName} LIMIT 10`);
    
    if (rows.length === 0) {
      console.log('No data found in this table.');
      return;
    }
    
    // Display column headers
    const columns = Object.keys(rows[0]);
    console.log(columns.join(' | '));
    console.log('-'.repeat(columns.join(' | ').length));
    
    // Display rows
    rows.forEach(row => {
      const values = columns.map(col => {
        const value = row[col];
        if (value === null) return 'NULL';
        if (typeof value === 'string' && value.length > 20) {
          return value.substring(0, 17) + '...';
        }
        return value;
      });
      console.log(values.join(' | '));
    });
    
    // Get total count
    const [countResult] = await connection.execute(`SELECT COUNT(*) as total FROM ${tableName}`);
    console.log(`\nTotal records: ${countResult[0].total}`);
    
  } catch (error) {
    console.error(`Error reading table ${tableName}:`, error.message);
  }
}

// Function to list all tables
async function listTables(connection) {
  try {
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📋 Available tables in house_of_events database:');
    console.log('='.repeat(50));
    tables.forEach((table, index) => {
      const tableName = Object.values(table)[0];
      console.log(`${index + 1}. ${tableName}`);
    });
    return tables.map(table => Object.values(table)[0]);
  } catch (error) {
    console.error('Error listing tables:', error.message);
    return [];
  }
}

// Main function
async function main() {
  let connection;
  
  try {
    console.log('🔍 MySQL Database Viewer for "house_of_events"');
    console.log('='.repeat(50));
    
    const password = await getPassword();
    
    // Create connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: password,
      database: 'house_of_events'
    });
    
    console.log('✅ Connected to MySQL database successfully!');
    
    // List all tables
    const tables = await listTables(connection);
    
    if (tables.length === 0) {
      console.log('No tables found in the database.');
      return;
    }
    
    // Display data for each table
    for (const tableName of tables) {
      await displayTableData(connection, tableName);
    }
    
    console.log('\n✅ Database viewing complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Make sure your MySQL root password is correct.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 Make sure the "house_of_events" database exists.');
    }
  } finally {
    if (connection) {
      await connection.end();
    }
    rl.close();
  }
}

// Run the viewer
main().catch(console.error);
