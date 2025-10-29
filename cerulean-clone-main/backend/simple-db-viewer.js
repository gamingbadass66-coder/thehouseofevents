import sqlite3 from 'sqlite3';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗄️  The House of Events Database Viewer');
console.log('=====================================\n');

// Create a new database
const db = new sqlite3.Database('./database/events.db');

// Read and execute schema
try {
  const schema = readFileSync('./database/schema.sql', 'utf8');
  const statements = schema.split(';').filter(stmt => stmt.trim().length > 0);
  
  console.log('📊 Creating database tables...');
  
  for (const statement of statements) {
    if (statement.trim()) {
      await new Promise((resolve, reject) => {
        db.run(statement, (err) => {
          if (err) {
            console.error('Error executing statement:', err.message);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  }
  
  console.log('✅ Database tables created successfully\n');
  
  // Insert sample data
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
      db.run('INSERT INTO event_categories (name, description) VALUES (?, ?)', [name, description], (err) => {
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
      db.run('INSERT INTO partnership_types (name, description) VALUES (?, ?)', [name, description], (err) => {
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
      db.run('INSERT INTO team_members (name, role, bio, is_founder) VALUES (?, ?, ?, ?)', [name, role, bio, isFounder], (err) => {
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
      db.run('INSERT INTO events (title, description, short_description, event_date, start_time, end_time, venue, venue_address, price, max_capacity, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', event, (err) => {
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
      db.run('INSERT INTO users (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  // Insert social media links
  const socialLinks = [
    ['Instagram', 'https://www.instagram.com/thehouseofeventts'],
    ['Facebook', ''],
    ['Twitter', '']
  ];
  
  for (const [platform, url] of socialLinks) {
    await new Promise((resolve, reject) => {
      db.run('INSERT INTO social_links (platform, url) VALUES (?, ?)', [platform, url], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
  
  console.log('✅ Sample data inserted successfully\n');
  
  // Now display all data
  console.log('📊 Database Contents:');
  console.log('='.repeat(50));
  
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
    db.all('SELECT id, title, event_date, start_time, venue, price, max_capacity FROM events', (err, rows) => {
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
  
  // Database statistics
  const stats = await new Promise((resolve, reject) => {
    db.get(`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM events) as total_events,
        (SELECT COUNT(*) FROM event_categories) as total_categories,
        (SELECT COUNT(*) FROM team_members) as total_team_members,
        (SELECT COUNT(*) FROM social_links) as total_social_links
    `, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
  
  console.log('\n📊 Database Statistics:');
  console.table([stats]);
  
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err.message);
    } else {
      console.log('\n✅ Database connection closed');
      console.log('\n🎉 Your database is now ready! You can view it anytime by running: node simple-db-viewer.js');
    }
  });
}





