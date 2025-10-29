import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import bookingRoutes from './routes/bookings.js';
import partnershipRoutes from './routes/partnerships.js';
import userRoutes from './routes/users.js';
import subscriberRoutes from './routes/subscribers.js';
import contactRoutes from './routes/contact.js';
import mysqlDataRoutes from './routes/mysql-data.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Import database initialization
import { initializeMySQLDatabase } from './database/mysql-init.js';
import { initializeDatabase } from './database/init.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Set correct port for Render or local
const PORT = process.env.PORT || 3000;

// ✅ Initialize MySQL database
try {
  await initializeMySQLDatabase();
  console.log('✅ MySQL connected successfully');
} catch (error) {
  console.log('❌ MySQL connection failed:', error.message);
  console.log('Make sure MySQL is running and the "house_of_events" database exists');
}

// ✅ Initialize SQLite (optional)
try {
  await initializeDatabase();
  console.log('✅ SQLite database initialized');
} catch (error) {
  console.error('❌ SQLite initialization failed:', error.message);
}

// ✅ Security middleware
app.use(helmet());

// ✅ Allow correct frontend origins
app.use(cors({
  origin: [
    'https://thehouseofevents.onrender.com', // Render frontend
    'https://thehouseofevents.net',           // your custom domain
    'http://localhost:5173',                  // local frontend (Vite)
    'https://thehouseofevents.onrender.com',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

// ✅ Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

// ✅ Logging middleware
app.use(morgan('dev'));

// ✅ Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ✅ Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/partnerships', partnershipRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', mysqlDataRoutes);

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'The House of Events API',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

// ✅ Error handling
app.use(notFound);
app.use(errorHandler);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
  console.log(`🌐 Base URL: ${process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`}`);
  console.log(`🏥 Health: ${process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`}/health`);
});

export default app;
