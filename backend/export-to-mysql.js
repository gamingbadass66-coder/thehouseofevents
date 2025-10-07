import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database path
const dbPath = path.join(__dirname, 'database', 'events.db');

// Create MySQL export script
const exportToMySQL = () => {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
      return;
    }
    console.log('📊 Connected to SQLite database');
  });

  let mysqlScript = `-- MySQL Export from SQLite Database
-- Generated on: ${new Date().toISOString()}
-- Database: The House of Events

USE house_of_events;

`;

  // Export Users
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return;
    }

    mysqlScript += `-- Users Data\n`;
    mysqlScript += `INSERT INTO users (id, name, email, phone, created_at, updated_at, is_active) VALUES\n`;
    
    const userValues = rows.map(row => 
      `(${row.id}, '${row.name.replace(/'/g, "\\'")}', '${row.email}', '${row.phone || ''}', '${row.created_at}', '${row.updated_at}', ${row.is_active})`
    ).join(',\n');
    
    mysqlScript += userValues + ';\n\n';

    // Export Event Categories
    db.all("SELECT * FROM event_categories", [], (err, rows) => {
      if (err) {
        console.error('Error fetching categories:', err.message);
        return;
      }

      mysqlScript += `-- Event Categories Data\n`;
      mysqlScript += `INSERT INTO event_categories (id, name, description, created_at) VALUES\n`;
      
      const categoryValues = rows.map(row => 
        `(${row.id}, '${row.name.replace(/'/g, "\\'")}', '${(row.description || '').replace(/'/g, "\\'")}', '${row.created_at}')`
      ).join(',\n');
      
      mysqlScript += categoryValues + ';\n\n';

      // Export Events
      db.all("SELECT * FROM events", [], (err, rows) => {
        if (err) {
          console.error('Error fetching events:', err.message);
          return;
        }

        mysqlScript += `-- Events Data\n`;
        mysqlScript += `INSERT INTO events (id, title, description, short_description, event_date, start_time, end_time, venue, address, price, max_capacity, current_bookings, category_id, image_url, status, created_at, updated_at) VALUES\n`;
        
        const eventValues = rows.map(row => 
          `(${row.id}, '${row.title.replace(/'/g, "\\'")}', '${(row.description || '').replace(/'/g, "\\'")}', '${(row.short_description || '').replace(/'/g, "\\'")}', '${row.event_date}', '${row.start_time}', '${row.end_time || ''}', '${(row.venue || '').replace(/'/g, "\\'")}', '${(row.address || '').replace(/'/g, "\\'")}', ${row.price}, ${row.max_capacity}, ${row.current_bookings}, ${row.category_id || 'NULL'}, '${row.image_url || ''}', '${row.status || 'upcoming'}', '${row.created_at}', '${row.updated_at}')`
        ).join(',\n');
        
        mysqlScript += eventValues + ';\n\n';

        // Export Team Members
        db.all("SELECT * FROM team_members", [], (err, rows) => {
          if (err) {
            console.error('Error fetching team members:', err.message);
            return;
          }

          mysqlScript += `-- Team Members Data\n`;
          mysqlScript += `INSERT INTO team_members (id, name, role, bio, image_url, social_links, is_founder, is_active, created_at) VALUES\n`;
          
          const teamValues = rows.map(row => 
            `(${row.id}, '${row.name.replace(/'/g, "\\'")}', '${(row.role || '').replace(/'/g, "\\'")}', '${(row.bio || '').replace(/'/g, "\\'")}', '${row.image_url || ''}', '${row.social_links || 'NULL'}', ${row.is_founder}, ${row.is_active}, '${row.created_at}')`
          ).join(',\n');
          
          mysqlScript += teamValues + ';\n\n';

          // Export Social Media Links
          db.all("SELECT * FROM social_media_links", [], (err, rows) => {
            if (err) {
              console.log('⚠️  Social media links table not found, skipping...');
              rows = [];
            }

            if (rows.length > 0) {
              mysqlScript += `-- Social Media Links Data\n`;
              mysqlScript += `INSERT INTO social_media_links (id, platform, url, is_active, created_at) VALUES\n`;
              
              const socialValues = rows.map(row => 
                `(${row.id}, '${row.platform}', '${row.url}', ${row.is_active}, '${row.created_at}')`
              ).join(',\n');
              
              mysqlScript += socialValues + ';\n\n';
            } else {
              mysqlScript += `-- Social Media Links Data (empty)\n\n`;
            }

            // Export Partnership Types
            db.all("SELECT * FROM partnership_types", [], (err, rows) => {
              if (err) {
                console.log('⚠️  Partnership types table not found, skipping...');
                rows = [];
              }

              if (rows.length > 0) {
                mysqlScript += `-- Partnership Types Data\n`;
                mysqlScript += `INSERT INTO partnership_types (id, name, description, created_at) VALUES\n`;
                
                const partnershipValues = rows.map(row => 
                  `(${row.id}, '${row.name.replace(/'/g, "\\'")}', '${(row.description || '').replace(/'/g, "\\'")}', '${row.created_at}')`
                ).join(',\n');
                
                mysqlScript += partnershipValues + ';\n\n';
              } else {
                mysqlScript += `-- Partnership Types Data (empty)\n\n`;
              }

              // Write the complete MySQL script to file
              const outputPath = path.join(__dirname, 'database', 'mysql-export.sql');
              fs.writeFileSync(outputPath, mysqlScript);
              
              console.log('✅ MySQL export completed!');
              console.log(`📁 MySQL script saved to: ${outputPath}`);
              console.log(`📁 MySQL schema saved to: ${path.join(__dirname, 'database', 'mysql-schema.sql')}`);
              console.log('\n🔧 To use with MySQL:');
              console.log('1. Create MySQL database: mysql -u root -p < mysql-schema.sql');
              console.log('2. Import data: mysql -u root -p house_of_events < mysql-export.sql');
              
              db.close();
            });
          });
        });
      });
    });
  });
};

exportToMySQL();
