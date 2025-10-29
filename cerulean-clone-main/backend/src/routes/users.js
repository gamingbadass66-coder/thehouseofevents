import express from 'express';
import { getDatabase } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/admin/all', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { active, search } = req.query;
    
    let query = 'SELECT id, name, email, phone, created_at, is_active FROM users WHERE 1=1';
    const params = [];
    
    if (active !== undefined) {
      query += ' AND is_active = ?';
      params.push(active === 'true' ? 1 : 0);
    }
    
    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const users = await new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
});

// Get user statistics (admin only)
router.get('/admin/stats', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    
    const stats = await new Promise((resolve, reject) => {
      db.get(`
        SELECT 
          COUNT(*) as total_users,
          SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_users,
          SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactive_users,
          SUM(CASE WHEN created_at >= date('now', '-30 days') THEN 1 ELSE 0 END) as new_users_30_days
        FROM users
      `, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
});

// Update user status (admin only)
router.patch('/admin/:id/status', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    const { is_active } = req.body;
    
    if (typeof is_active !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'is_active must be a boolean value'
      });
    }
    
    const result = await new Promise((resolve, reject) => {
      db.run(`
        UPDATE users 
        SET is_active = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [is_active ? 1 : 0, id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      message: `User ${is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    next(error);
  }
});

// Get user with bookings (admin only)
router.get('/admin/:id/details', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    
    // Get user details
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get user's bookings
    const bookings = await new Promise((resolve, reject) => {
      db.all(`
        SELECT b.*, e.title as event_title, e.event_date, e.start_time, e.venue
        FROM bookings b
        JOIN events e ON b.event_id = e.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
      `, [id], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json({
      success: true,
      data: {
        user,
        bookings
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;





