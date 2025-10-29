import express from 'express';
import { getDatabase } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest, contactSchema } from '../middleware/validation.js';

const router = express.Router();

// Submit contact message
router.post('/', validateRequest(contactSchema), async (req, res, next) => {
  try {
    const db = getDatabase();
    const contactData = req.body;
    
    const result = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
      `, [
        contactData.name,
        contactData.email,
        contactData.subject,
        contactData.message
      ], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully. We will get back to you soon!'
    });
  } catch (error) {
    next(error);
  }
});

// Get all contact messages (admin only)
router.get('/admin/all', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { status } = req.query;
    
    let query = 'SELECT * FROM contact_messages WHERE 1=1';
    const params = [];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const messages = await new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
});

// Get single contact message (admin only)
router.get('/admin/:id', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    
    const message = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM contact_messages WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
});

// Update message status (admin only)
router.patch('/admin/:id/status', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['new', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const result = await new Promise((resolve, reject) => {
      db.run(`
        UPDATE contact_messages 
        SET status = ?
        WHERE id = ?
      `, [status, id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Message status updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get message counts (admin only)
router.get('/admin/counts', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    
    const counts = await new Promise((resolve, reject) => {
      db.get(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_messages,
          SUM(CASE WHEN status = 'read' THEN 1 ELSE 0 END) as read_messages,
          SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied_messages,
          SUM(CASE WHEN status = 'archived' THEN 1 ELSE 0 END) as archived_messages
        FROM contact_messages
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




