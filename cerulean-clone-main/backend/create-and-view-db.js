import sqlite3 from 'sqlite3';

console.log('🗄️  The House of Events Database Creator & Viewer');
console.log('================================================\n');

// Create a new database
const db = new sqlite3.Database('./database/events.db');

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Create tables
const createTables = async () => {
  console.log('📊 Creating database tables...');
  
  const tables = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT 1
    )`,
    
    // Event categories
    `CREATE TABLE IF NOT EXISTS event_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Events table
    `CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      short_description TEXT,
      event_date DATE NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      venue VARCHAR(255) NOT NULL,
      venue_address TEXT,
      price DECIMAL(10,2) NOT NULL,
      max_capacity INTEGER,
      current_bookings INTEGER DEFAULT 0,
      category_id INTEGER,
      image_url VARCHAR(500),
      status VARCHAR(20) DEFAULT 'upcoming',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES event_categories(id)
    )`,
    
    // Bookings table
    `CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      number_of_tickets INTEGER NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      booking_status VARCHAR(20) DEFAULT 'pending',
      payment_status VARCHAR(20) DEFAULT 'pending',
      booking_reference VARCHAR(50) UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (event_id) REFERENCES events(id)
    )`,
    
    // Partnership types
    `CREATE TABLE IF NOT EXISTS partnership_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Partnerships table
    `CREATE TABLE IF NOT EXISTS partnerships (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      partner_name VARCHAR(255) NOT NULL,
      contact_person VARCHAR(255),
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      organization VARCHAR(255),
      partnership_type_id INTEGER,
      proposal TEXT NOT NULL,
      status VARCHAR(20) DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (partnership_type_id) REFERENCES partnership_types(id)
    )`,
    
    // Newsletter subscribers
    `CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT 1,
      unsubscribe_token VARCHAR(100) UNIQUE
    )`,
    
    // Team members
    `CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(100) NOT NULL,
      bio TEXT,
      image_url VARCHAR(500),
      social_links TEXT,
      is_founder BOOLEAN DEFAULT 0,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Contact messages
    `CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(20) DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    
    // Social media links
    `CREATE TABLE IF NOT EXISTS social_links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform VARCHAR(50) NOT NULL,
      url VARCHAR(500) NOT NULL,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  ];
  
  for (const table of tables) {
    await new Promise((resolve, reject) => {
      db.run(table, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  
  console.log('✅ All tables created successfully\n');
};

// Insert sample data
const insertSampleData = async () => {
  console.log('🌱 Inserting sample data...');
  
  // Insert event categories
  const categories = [
    ['Art & Creativity', 'Painting, drawing, and creative workshops'],
    ['Music & Performance', 'Concerts, open mics, and musical events'],
    ['Community & Networking', 'Meetups, discussions, and community building'],
    ['Workshops & Learning', 'Educational and skill-building sessions'],
    ['Cultural Events', 'Traditional and cultural celebrations']
  ];
  
  for (const [name, description] of categories) {
    await new Promise((resolve, reject) => {
      db.run('INSERT OR IGNORE INTO event_categories (name, description) VALUES (?, ?)', [name, description], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  // Insert partnership types
  const partnershipTypes = [
    ['Collaborator (Artist/Performer/Educator)', 'Creative professionals and educators'],
    ['Cultural Sponsor', 'Organizations supporting cultural initiatives'],
    ['Brand Partnership', 'Commercial brand collaborations'],
    ['Venue Partner', 'Venue owners and managers'],
    ['Media Partner', 'Media and marketing partners']
  ];
  
  for (const [name, description] of partnershipTypes) {
    await new Promise((resolve, reject) => {
      db.run('INSERT OR IGNORE INTO partnership_types (name, description) VALUES (?, ?)', [name, description], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  // Insert team members
  const teamMembers = [
    ['Anish Saherwala', 'Co-Founder', 'Passionate about creating meaningful experiences for youth in Ahmedabad.', 1],
    ['Samya Gandhi', 'Co-Founder', 'Dedicated to fostering creativity and community connections.', 1],
    ['Nirmal Moryani', 'Co-Founder', 'Committed to enriching the cultural landscape of Ahmedabad.', 1]
  ];
  
  for (const [name, role, bio, isFounder] of teamMembers) {
    await new Promise((resolve, reject) => {
      db.run('INSERT OR IGNORE INTO team_members (name, role, bio, is_founder) VALUES (?, ?, ?, ?)', [name, role, bio, isFounder], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  // Insert sample events
  const events = [
    ['SIP — Share. Inspire. Paint.', 'Join us for our signature event, "SIP – Share. Inspire. Paint," an evening where creativity flows freely and connections are forged over strokes of colour and heartfelt conversations. Immerse yourself in a relaxing painting session while enjoying stimulating discussions and delightful refreshments. No prior art experience is necessary — just bring your enthusiasm!', 'An evening of painting, conversation, and creative connection.', '2024-09-12', '16:00', '18:30', 'Creative Studio', 'Ahmedabad, Gujarat', 150.00, 30, 1, '/assets/sip-event.jpg'],
    ['Youth Poetry Slam', 'Express yourself through the power of words! Join us for an evening of spoken word poetry where young voices share their stories, dreams, and perspectives. Whether you\'re a seasoned poet or just starting out, this is your platform to be heard.', 'An evening of spoken word poetry and self-expression.', '2024-10-15', '18:00', '20:00', 'Community Center', 'Ahmedabad, Gujarat', 100.00, 50, 2, '/assets/gallery-1.jpg'],
    ['Digital Art Workshop', 'Learn the basics of digital art and design in this hands-on workshop. We\'ll cover tools, techniques, and creative processes used by professional digital artists. Perfect for beginners and those looking to expand their creative skills.', 'Hands-on digital art and design workshop.', '2024-11-20', '14:00', '17:00', 'Tech Hub', 'Ahmedabad, Gujarat', 200.00, 25, 4, '/assets/gallery-2.jpg']
  ];
  
  for (const event of events) {
    await new Promise((resolve, reject) => {
      db.run('INSERT OR IGNORE INTO events (title, description, short_description, event_date, start_time, end_time, venue, venue_address, price, max_capacity, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', event, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  // Insert sample users
  const users = [
    ['Priya Patel', 'priya.patel@example.com', '+91 98765 43210'],
    ['Rahul Sharma', 'rahul.sharma@example.com', '+91 87654 32109'],
    ['Sneha Gupta', 'sneha.gupta@example.com', '+91 76543 21098']
  ];
  
  for (const [name, email, phone] of users) {
    await new Promise((resolve, reject) => {
      db.run('INSERT OR IGNORE INTO users (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  // Insert social media links
  const socialLinks = [
    ['Instagram', 'https://instagram.com/thehouseofevents'],
    ['Facebook', 'https://facebook.com/thehouseofevents'],
    ['Twitter', 'https://twitter.com/thehouseofevents']
  ];
  
  for (const [platform, url] of socialLinks) {
    await new Promise((resolve, reject) => {
      db.run('INSERT OR IGNORE INTO social_links (platform, url) VALUES (?, ?)', [platform, url], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  console.log('✅ Sample data inserted successfully\n');
};

// Display database contents
const displayData = async () => {
  console.log('📊 Database Contents:');
  console.log('='.repeat(60));
  
  // Display users
  const users_data = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  console.log('\n👥 Users:');
  console.table(users_data);
  
  // Display event categories
  const categories_data = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM event_categories', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  console.log('\n📂 Event Categories:');
  console.table(categories_data);
  
  // Display events
  const events_data = await new Promise((resolve, reject) => {
    db.all('SELECT id, title, event_date, start_time, venue, price, max_capacity, current_bookings FROM events', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  console.log('\n🎉 Events:');
  console.table(events_data);
  
  // Display team members
  const team_data = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM team_members', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  console.log('\n👨‍💼 Team Members:');
  console.table(team_data);
  
  // Display social links
  const social_data = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM social_links', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  console.log('\n🔗 Social Media Links:');
  console.table(social_data);
  
  // Display partnership types
  const partnership_types_data = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM partnership_types', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
  console.log('\n🤝 Partnership Types:');
  console.table(partnership_types_data);
  
  // Database statistics
  const stats = await new Promise((resolve, reject) => {
    db.get(`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM events) as total_events,
        (SELECT COUNT(*) FROM event_categories) as total_categories,
        (SELECT COUNT(*) FROM team_members) as total_team_members,
        (SELECT COUNT(*) FROM social_links) as total_social_links,
        (SELECT COUNT(*) FROM partnership_types) as total_partnership_types
    `, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
  
  console.log('\n📊 Database Statistics:');
  console.table([stats]);
};

// Main function
const main = async () => {
  try {
    await createTables();
    await insertSampleData();
    await displayData();
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    db.close((err) => {
      if (err) {
        console.error('❌ Error closing database:', err.message);
      } else {
        console.log('\n✅ Database connection closed');
        console.log('\n🎉 Your database is now ready!');
        console.log('📁 Database location: ./database/events.db');
        console.log('🔄 To view the database again, run: node create-and-view-db.js');
      }
    });
  }
};

// Run the main function
main();





