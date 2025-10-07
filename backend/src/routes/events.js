import express from 'express';
import { executeQuery, executeInsert, executeUpdate, executeDelete } from '../database/mysql-init.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { validateRequest, eventSchema } from '../middleware/validation.js';

const router = express.Router();

// Get all events
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { status, category, upcoming } = req.query;
    
    let query = `
      SELECT e.*, ec.name as category_name, 
             CASE 
               WHEN e.event_date > CURDATE() THEN 'upcoming'
               WHEN e.event_date = CURDATE() AND e.start_time > CURTIME() THEN 'upcoming'
               WHEN e.event_date = CURDATE() AND e.start_time <= CURTIME() AND e.end_time > CURTIME() THEN 'ongoing'
               WHEN e.event_date < CURDATE() OR (e.event_date = CURDATE() AND e.end_time <= CURTIME()) THEN 'completed'
               ELSE 'upcoming'
             END as calculated_status
      FROM events e
      LEFT JOIN event_categories ec ON e.category_id = ec.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (status) {
      query += ` AND e.status = ?`;
      params.push(status);
    }
    
    if (category) {
      query += ` AND e.category_id = ?`;
      params.push(category);
    }
    
    if (upcoming === 'true') {
      query += ` AND e.event_date >= CURDATE()`;
    }
    
    query += ` ORDER BY e.event_date ASC, e.start_time ASC`;
    
    const events = await executeQuery(query, params);
    
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    next(error);
  }
});

// Get single event
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const events = await executeQuery(`
      SELECT e.*, ec.name as category_name,
             CASE 
               WHEN e.event_date > CURDATE() THEN 'upcoming'
               WHEN e.event_date = CURDATE() AND e.start_time > CURTIME() THEN 'upcoming'
               WHEN e.event_date = CURDATE() AND e.start_time <= CURTIME() AND e.end_time > CURTIME() THEN 'ongoing'
               WHEN e.event_date < CURDATE() OR (e.event_date = CURDATE() AND e.end_time <= CURTIME()) THEN 'completed'
               ELSE 'upcoming'
             END as calculated_status
      FROM events e
      LEFT JOIN event_categories ec ON e.category_id = ec.id
      WHERE e.id = ?
    `, [id]);
    
    const event = events[0];
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
});

// Create event (admin only)
router.post('/', authenticateToken, validateRequest(eventSchema), async (req, res, next) => {
  try {
    const db = getDatabase();
    const eventData = req.body;
    
    const result = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO events (
          title, description, short_description, event_date, start_time, end_time,
          venue, venue_address, price, max_capacity, category_id, image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        eventData.title,
        eventData.description,
        eventData.short_description,
        eventData.event_date,
        eventData.start_time,
        eventData.end_time,
        eventData.venue,
        eventData.venue_address,
        eventData.price,
        eventData.max_capacity,
        eventData.category_id,
        eventData.image_url
      ], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
    
    // Get the created event
    const event = await new Promise((resolve, reject) => {
      db.get(`
        SELECT e.*, ec.name as category_name
        FROM events e
        LEFT JOIN event_categories ec ON e.category_id = ec.id
        WHERE e.id = ?
      `, [result.id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
});

// Update event (admin only)
router.put('/:id', authenticateToken, validateRequest(eventSchema), async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    const eventData = req.body;
    
    const result = await new Promise((resolve, reject) => {
      db.run(`
        UPDATE events SET
          title = ?, description = ?, short_description = ?, event_date = ?,
          start_time = ?, end_time = ?, venue = ?, venue_address = ?,
          price = ?, max_capacity = ?, category_id = ?, image_url = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        eventData.title,
        eventData.description,
        eventData.short_description,
        eventData.event_date,
        eventData.start_time,
        eventData.end_time,
        eventData.venue,
        eventData.venue_address,
        eventData.price,
        eventData.max_capacity,
        eventData.category_id,
        eventData.image_url,
        id
      ], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Get the updated event
    const event = await new Promise((resolve, reject) => {
      db.get(`
        SELECT e.*, ec.name as category_name
        FROM events e
        LEFT JOIN event_categories ec ON e.category_id = ec.id
        WHERE e.id = ?
      `, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
});

// Delete event (admin only)
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    
    const result = await new Promise((resolve, reject) => {
      db.run('DELETE FROM events WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get event categories
router.get('/categories/all', async (req, res, next) => {
  try {
    const db = getDatabase();
    
    const categories = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM event_categories ORDER BY name', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

export default router;


