import { getDatabase } from './init.js';

const seedDatabase = async () => {
  try {
    const db = getDatabase();
    
    console.log('🌱 Seeding database...');
    
    // Insert event categories
    const categories = [
      { name: 'Art & Creativity', description: 'Painting, drawing, and creative workshops' },
      { name: 'Music & Performance', description: 'Concerts, open mics, and musical events' },
      { name: 'Community & Networking', description: 'Meetups, discussions, and community building' },
      { name: 'Workshops & Learning', description: 'Educational and skill-building sessions' },
      { name: 'Cultural Events', description: 'Traditional and cultural celebrations' }
    ];
    
    for (const category of categories) {
      await new Promise((resolve, reject) => {
        db.run(`
          INSERT OR IGNORE INTO event_categories (name, description)
          VALUES (?, ?)
        `, [category.name, category.description], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    
    // Insert partnership types
    const partnershipTypes = [
      { name: 'Collaborator (Artist/Performer/Educator)', description: 'Creative professionals and educators' },
      { name: 'Cultural Sponsor', description: 'Organizations supporting cultural initiatives' },
      { name: 'Brand Partnership', description: 'Commercial brand collaborations' },
      { name: 'Venue Partner', description: 'Venue owners and managers' },
      { name: 'Media Partner', description: 'Media and marketing partners' }
    ];
    
    for (const type of partnershipTypes) {
      await new Promise((resolve, reject) => {
        db.run(`
          INSERT OR IGNORE INTO partnership_types (name, description)
          VALUES (?, ?)
        `, [type.name, type.description], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    
    // Insert team members (founders)
    const teamMembers = [
      {
        name: 'Anish Saherwala',
        role: 'Co-Founder',
        bio: 'Passionate about creating meaningful experiences for youth in Ahmedabad.',
        is_founder: true
      },
      {
        name: 'Samya Gandhi',
        role: 'Co-Founder',
        bio: 'Dedicated to fostering creativity and community connections.',
        is_founder: true
      },
      {
        name: 'Nirmal Moryani',
        role: 'Co-Founder',
        bio: 'Committed to enriching the cultural landscape of Ahmedabad.',
        is_founder: true
      }
    ];
    
    for (const member of teamMembers) {
      await new Promise((resolve, reject) => {
        db.run(`
          INSERT OR IGNORE INTO team_members (name, role, bio, is_founder)
          VALUES (?, ?, ?, ?)
        `, [member.name, member.role, member.bio, member.is_founder], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    
    // Insert sample events
    const events = [
      {
        title: 'SIP — Share. Inspire. Paint.',
        description: 'Join us for our signature event, "SIP – Share. Inspire. Paint," an evening where creativity flows freely and connections are forged over strokes of colour and heartfelt conversations. Immerse yourself in a relaxing painting session while enjoying stimulating discussions and delightful refreshments. No prior art experience is necessary — just bring your enthusiasm!',
        short_description: 'An evening of painting, conversation, and creative connection.',
        event_date: '2024-09-12',
        start_time: '16:00',
        end_time: '18:30',
        venue: 'Creative Studio',
        venue_address: 'Ahmedabad, Gujarat',
        price: 150.00,
        max_capacity: 30,
        category_id: 1,
        image_url: '/assets/sip-event.jpg'
      },
      {
        title: 'Youth Poetry Slam',
        description: 'Express yourself through the power of words! Join us for an evening of spoken word poetry where young voices share their stories, dreams, and perspectives. Whether you\'re a seasoned poet or just starting out, this is your platform to be heard.',
        short_description: 'An evening of spoken word poetry and self-expression.',
        event_date: '2024-10-15',
        start_time: '18:00',
        end_time: '20:00',
        venue: 'Community Center',
        venue_address: 'Ahmedabad, Gujarat',
        price: 100.00,
        max_capacity: 50,
        category_id: 2,
        image_url: '/assets/gallery-1.jpg'
      },
      {
        title: 'Digital Art Workshop',
        description: 'Learn the basics of digital art and design in this hands-on workshop. We\'ll cover tools, techniques, and creative processes used by professional digital artists. Perfect for beginners and those looking to expand their creative skills.',
        short_description: 'Hands-on digital art and design workshop.',
        event_date: '2024-11-20',
        start_time: '14:00',
        end_time: '17:00',
        venue: 'Tech Hub',
        venue_address: 'Ahmedabad, Gujarat',
        price: 200.00,
        max_capacity: 25,
        category_id: 4,
        image_url: '/assets/gallery-2.jpg'
      }
    ];
    
    for (const event of events) {
      await new Promise((resolve, reject) => {
        db.run(`
          INSERT OR IGNORE INTO events (
            title, description, short_description, event_date, start_time, end_time,
            venue, venue_address, price, max_capacity, category_id, image_url
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          event.title,
          event.description,
          event.short_description,
          event.event_date,
          event.start_time,
          event.end_time,
          event.venue,
          event.venue_address,
          event.price,
          event.max_capacity,
          event.category_id,
          event.image_url
        ], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    
    // Insert sample users
    const users = [
      {
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        phone: '+91 98765 43210'
      },
      {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91 87654 32109'
      },
      {
        name: 'Sneha Gupta',
        email: 'sneha.gupta@example.com',
        phone: '+91 76543 21098'
      }
    ];
    
    for (const user of users) {
      await new Promise((resolve, reject) => {
        db.run(`
          INSERT OR IGNORE INTO users (name, email, phone)
          VALUES (?, ?, ?)
        `, [user.name, user.email, user.phone], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    
    // Insert social media links
    const socialLinks = [
      { platform: 'Instagram', url: 'https://instagram.com/thehouseofevents' },
      { platform: 'Facebook', url: 'https://facebook.com/thehouseofevents' },
      { platform: 'Twitter', url: 'https://twitter.com/thehouseofevents' }
    ];
    
    for (const link of socialLinks) {
      await new Promise((resolve, reject) => {
        db.run(`
          INSERT OR IGNORE INTO social_links (platform, url)
          VALUES (?, ?)
        `, [link.platform, link.url], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }
    
    console.log('✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;




