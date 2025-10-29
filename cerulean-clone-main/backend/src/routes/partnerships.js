import express from 'express';
import { getDatabase } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest, partnershipSchema } from '../middleware/validation.js';

const router = express.Router();

// Submit partnership proposal
router.post('/', validateRequest(partnershipSchema), async (req, res, next) => {
  try {
    const db = getDatabase();
    const partnershipData = req.body;
    
    const result = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO partnerships (
          partner_name, contact_person, email, phone, organization,
          partnership_type_id, proposal
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        partnershipData.partner_name,
        partnershipData.contact_person,
        partnershipData.email,
        partnershipData.phone,
        partnershipData.organization,
        partnershipData.partnership_type_id,
        partnershipData.proposal
      ], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
    
    // Get the created partnership with type details
    const partnership = await new Promise((resolve, reject) => {
      db.get(`
        SELECT p.*, pt.name as partnership_type_name
        FROM partnerships p
        LEFT JOIN partnership_types pt ON p.partnership_type_id = pt.id
        WHERE p.id = ?
      `, [result.id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.status(201).json({
      success: true,
      data: partnership,
      message: 'Partnership proposal submitted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get partnership types
router.get('/types', async (req, res, next) => {
  try {
    const db = getDatabase();
    
    const types = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM partnership_types ORDER BY name', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json({
      success: true,
      data: types
    });
  } catch (error) {
    next(error);
  }
});

// Get all partnerships (admin only)
router.get('/admin/all', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { status } = req.query;
    
    let query = `
      SELECT p.*, pt.name as partnership_type_name
      FROM partnerships p
      LEFT JOIN partnership_types pt ON p.partnership_type_id = pt.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (status) {
      query += ` AND p.status = ?`;
      params.push(status);
    }
    
    query += ` ORDER BY p.created_at DESC`;
    
    const partnerships = await new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json({
      success: true,
      data: partnerships
    });
  } catch (error) {
    next(error);
  }
});

// Get single partnership (admin only)
router.get('/admin/:id', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    
    const partnership = await new Promise((resolve, reject) => {
      db.get(`
        SELECT p.*, pt.name as partnership_type_name
        FROM partnerships p
        LEFT JOIN partnership_types pt ON p.partnership_type_id = pt.id
        WHERE p.id = ?
      `, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!partnership) {
      return res.status(404).json({
        success: false,
        message: 'Partnership not found'
      });
    }
    
    res.json({
      success: true,
      data: partnership
    });
  } catch (error) {
    next(error);
  }
});

// Update partnership status (admin only)
router.patch('/admin/:id/status', authenticateToken, async (req, res, next) => {
  try {
    const db = getDatabase();
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'approved', 'rejected', 'active', 'inactive'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const result = await new Promise((resolve, reject) => {
      db.run(`
        UPDATE partnerships 
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [status, id], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
    
    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Partnership not found'
      });
    }
    
    // Get updated partnership
    const partnership = await new Promise((resolve, reject) => {
      db.get(`
        SELECT p.*, pt.name as partnership_type_name
        FROM partnerships p
        LEFT JOIN partnership_types pt ON p.partnership_type_id = pt.id
        WHERE p.id = ?
      `, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.json({
      success: true,
      data: partnership,
      message: 'Partnership status updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;





