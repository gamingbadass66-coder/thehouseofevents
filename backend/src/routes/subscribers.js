import express from 'express';
import { getDatabase } from '../database/init.js';
import { validateRequest, subscriberSchema } from '../middleware/validation.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Subscribe to newsletter
router.post('/', validateRequest(subscriberSchema), async (req, res, next) => {
  try {
    const db = getDatabase();
    const { email, name } = req.body;
    
    // Check if already subscribed
    const existingSubscriber = await new Promise((resolve, reject) => {
      db.get('SELECT id, is_active FROM subscribers WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return res.status(409).json({
          success: false,
          message: 'Email is already subscribed'
        });
      } else {
        // Reactivate subscription
        const result = await new Promise((resolve, reject) => {
          db.run(`
            UPDATE subscribers 
            SET name = ?, is_active = 1, subscribed_at = CURRENT_TIMESTAMP
            WHERE email = ?
          `, [name, email], function(err) {
            if (err) reject(err);
            else resolve({ changes: this.changes });
          });
        });
        
        return res.json({
          success: true,
          message: 'Subscription reactivated successfully'
        });
      }
    }
    
    // Create new subscription
    const unsubscribeToken = uuidv4();
    const result = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO subscribers (email, name, unsubscribe_token)
        VALUES (?, ?, ?)
      `, [email, name, unsubscribeToken], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
    
    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    next(error);
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res, next) => {
  try {
    const db = getDatabase();
    const { email, token } = req.body;
    
    if (!email && !token) {
      return res.status(400).json({
        success: false,
        message: 'Email or unsubscribe token required'
      });
    }
    
    let query, params;
    if (token) {
      query = 'UPDATE subscribers SET is_active = 0 WHERE unsubscribe_token = ?';
      params = [token];
    } else {
      query = 'UPDATE subscribers SET is_active = 0 WHERE email = ?';
      params = [email];
    }
    
    const result = await new Promise((resolve, reject) => {
      db.run(query, params, function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    next(error);
  }
});

// Get all subscribers (admin only)
router.get('/admin/all', async (req, res, next) => {
  try {
    const db = getDatabase();
    const { active } = req.query;
    
    let query = 'SELECT * FROM subscribers WHERE 1=1';
    const params = [];
    
    if (active !== undefined) {
      query += ' AND is_active = ?';
      params.push(active === 'true' ? 1 : 0);
    }
    
    query += ' ORDER BY subscribed_at DESC';
    
    const subscribers = await new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json({
      success: true,
      data: subscribers
    });
  } catch (error) {
    next(error);
  }
});

// Get subscriber count (admin only)
router.get('/admin/count', async (req, res, next) => {
  try {
    const db = getDatabase();
    
    const counts = await new Promise((resolve, reject) => {
      db.get(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active,
          SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive
        FROM subscribers
      `, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.json({
      success: true,
      data: counts
    });
  } catch (error) {
    next(error);
  }
});

export default router;




