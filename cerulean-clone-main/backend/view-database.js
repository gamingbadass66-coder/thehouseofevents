import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = './database/events.db';

console.log('🗄️  The House of Events Database Viewer');
console.log('=====================================\n');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
    return;
  }
  console.log('✅ Connected to database successfully\n');
});

// Function to run queries and display results
function runQuery(query, description) {
  return new Promise((resolve, reject) => {
    console.log(`📊 ${description}`);
    console.log('─'.repeat(50));
    
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('❌ Error:', err.message);
        reject(err);
        return;
      }
      
      if (rows.length === 0) {
        console.log('No data found\n');
      } else {
        console.table(rows);
        console.log(`\n📈 Total records: ${rows.length}\n`);
      }
      resolve(rows);
    });
  });
}

// Main function to display all data
async function viewDatabase() {
  try {
    // Check if database exists and has data
    const tables = await runQuery(
      "SELECT name FROM sqlite_master WHERE type='table'",
      'Database Tables'
    );

    if (tables.length === 0) {
      console.log('❌ No tables found. Database might not be initialized.');
      return;
    }

    // Display data from each table
    await runQuery(
      "SELECT * FROM users",
      '👥 Users'
    );

    await runQuery(
      "SELECT * FROM event_categories",
      '📂 Event Categories'
    );

    await runQuery(
      "SELECT id, title, event_date, start_time, venue, price, status FROM events",
      '🎉 Events'
    );

    await runQuery(
      "SELECT b.id, u.name as user_name, e.title as event_title, b.number_of_tickets, b.total_amount, b.booking_status FROM bookings b JOIN users u ON b.user_id = u.id JOIN events e ON b.event_id = e.id",
      '🎫 Bookings'
    );

    await runQuery(
      "SELECT * FROM partnerships",
      '🤝 Partnerships'
    );

    await runQuery(
      "SELECT * FROM subscribers",
      '📧 Newsletter Subscribers'
    );

    await runQuery(
      "SELECT * FROM contact_messages",
      '📞 Contact Messages'
    );

    await runQuery(
      "SELECT * FROM team_members",
      '👨‍💼 Team Members'
    );

    await runQuery(
      "SELECT * FROM social_links",
      '🔗 Social Media Links'
    );

    // Database statistics
    console.log('📊 Database Statistics');
    console.log('─'.repeat(50));
    
    const stats = await runQuery(`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM events) as total_events,
        (SELECT COUNT(*) FROM bookings) as total_bookings,
        (SELECT COUNT(*) FROM partnerships) as total_partnerships,
        (SELECT COUNT(*) FROM subscribers) as total_subscribers,
        (SELECT COUNT(*) FROM contact_messages) as total_contact_messages
    `, 'Overall Statistics');

  } catch (error) {
    console.error('❌ Error viewing database:', error);
  } finally {
    db.close((err) => {
      if (err) {
        console.error('❌ Error closing database:', err.message);
      } else {
        console.log('\n✅ Database connection closed');
      }
    });
  }
}

// Run the viewer
viewDatabase();





