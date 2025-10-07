import { initializeDatabase } from './init.js';

const migrate = async () => {
  try {
    console.log('🗄️  Initializing database...');
    await initializeDatabase();
    console.log('✅ Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

migrate();



