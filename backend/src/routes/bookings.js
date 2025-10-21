import express from 'express';
import { getDatabase } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest, bookingSchema } from '../middleware/validation.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get user's bookings
router.get('/my-bookings', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const userId = req.user.id;
    
    const bookings = await new Promise((resolve, reject) => {
      db.all(`
        SELECT b.*, e.title as event_title, e.event_date, e.start_time, e.end_time, e.venue, e.price
        FROM bookings b
        JOIN events e ON b.event_id = e.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
      `, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
});

// Create booking
router.post('/', authenticateToken, validateRequest(bookingSchema), async (req, res, next) => {
  try {
    const db = getDatabase();
    const userId = req.user.id;
    const { event_id, number_of_tickets } = req.body;
    
    // Check if event exists and get details
    const event = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM events WHERE id = ?', [event_id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Check if event is still available
    if (event.status !== 'upcoming') {
      return res.status(400).json({
        success: false,
        message: 'Event is not available for booking'
      });
    }
    
    // Check capacity
    if (event.max_capacity && (event.current_bookings + number_of_tickets) > event.max_capacity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough tickets available'
      });
    }
    
    const total_amount = event.price * number_of_tickets;
    const booking_reference = `HOE-${Date.now()}-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Start transaction
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      // Create booking
      db.run(`
        INSERT INTO bookings (user_id, event_id, number_of_tickets, total_amount, booking_reference)
        VALUES (?, ?, ?, ?, ?)
      `, [userId, event_id, number_of_tickets, total_amount, booking_reference], function(err) {
        if (err) {
          db.run('ROLLBACK');
          return next(err);
        }
        
        const bookingId = this.lastID;
        
        // Update event booking count
        db.run(`
          UPDATE events 
          SET current_bookings = current_bookings + ?
          WHERE id = ?
        `, [number_of_tickets, event_id], function(err) {
          if (err) {
            db.run('ROLLBACK');
            return next(err);
          }
          
          db.run('COMMIT', (err) => {
            if (err) {
              return next(err);
            }
            
            // Get the created booking with event details
            db.get(`
              SELECT b.*, e.title as event_title, e.event_date, e.start_time, e.end_time, e.venue
              FROM bookings b
              JOIN events e ON b.event_id = e.id
              WHERE b.id = ?
            `, [bookingId], (err, booking) => {
              if (err) return next(err);
              
              res.status(201).json({
                success: true,
                data: booking,
                message: 'Booking created successfully'
              });
            });
          });
        });
      });
    });
  } catch (error) {
    next(error);
  }
});

// Get single booking
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    const userId = req.user.id;
    
    const booking = await new Promise((resolve, reject) => {
      db.get(`
        SELECT b.*, e.title as event_title, e.event_date, e.start_time, e.end_time, e.venue, e.price
        FROM bookings b
        JOIN events e ON b.event_id = e.id
        WHERE b.id = ? AND b.user_id = ?
      `, [id, userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
});

// Cancel booking
router.patch('/:id/cancel', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    const userId = req.user.id;
    
    // Get booking details
    const booking = await new Promise((resolve, reject) => {
      db.get(`
        SELECT b.*, e.event_date, e.start_time
        FROM bookings b
        JOIN events e ON b.event_id = e.id
        WHERE b.id = ? AND b.user_id = ?
      `, [id, userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    if (booking.booking_status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }
    
    // Check if cancellation is allowed (e.g., 24 hours before event)
    const eventDateTime = new Date(`${booking.event_date} ${booking.start_time}`);
    const now = new Date();
    const hoursUntilEvent = (eventDateTime - now) / (1000 * 60 * 60);
    
    if (hoursUntilEvent < 24) {
      return res.status(400).json({
        success: false,
        message: 'Cancellation not allowed within 24 hours of event'
      });
    }
    
    // Start transaction
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      
      // Cancel booking
      db.run(`
        UPDATE bookings 
        SET booking_status = 'cancelled', updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [id], function(err) {
        if (err) {
          db.run('ROLLBACK');
          return next(err);
        }
        
        // Update event booking count
        db.run(`
          UPDATE events 
          SET current_bookings = current_bookings - ?
          WHERE id = ?
        `, [booking.number_of_tickets, booking.event_id], function(err) {
          if (err) {
            db.run('ROLLBACK');
            return next(err);
          }
          
          db.run('COMMIT', (err) => {
            if (err) return next(err);
            
            res.json({
              success: true,
              message: 'Booking cancelled successfully'
            });
          });
        });
      });
    });
  } catch (error) {
    next(error);
  }
});

// Get all bookings (admin only)
router.get('/admin/all', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { status, event_id } = req.query;
    
    let query = `
      SELECT b.*, e.title as event_title, e.event_date, e.start_time, e.venue,
             u.name as user_name, u.email as user_email
      FROM bookings b
      JOIN events e ON b.event_id = e.id
      JOIN users u ON b.user_id = u.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (status) {
      query += ` AND b.booking_status = ?`;
      params.push(status);
    }
    
    if (event_id) {
      query += ` AND b.event_id = ?`;
      params.push(event_id);
    }
    
    query += ` ORDER BY b.created_at DESC`;
    
    const bookings = await new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
});

export default router;




