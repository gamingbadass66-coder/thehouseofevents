import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../database/init.js';
import { validateRequest, userRegistrationSchema, userLoginSchema } from '../middleware/validation.js';

const router = express.Router();

// Register user
router.post('/register', validateRequest(userRegistrationSchema), async (req, res, next) => {
  try {
    const db = getDatabase();
    const { name, email, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    // Create user (no password for now, just basic info)
    const result = await new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO users (name, email, phone)
        VALUES (?, ?, ?)
      `, [name, email, phone], function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID });
      });
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: result.id, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    // Get user data
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT id, name, email, phone, created_at FROM users WHERE id = ?', [result.id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.status(201).json({
      success: true,
      data: {
        user,
        token
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Login user (simplified - just email verification for now)
router.post('/login', validateRequest(userLoginSchema), async (req, res, next) => {
  try {
    const db = getDatabase();
    const { email } = req.body;
    
    // Find user by email
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT id, name, email, phone, is_active FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email'
      });
    }
    
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        token
      },
      message: 'Login successful'
    });
  } catch (error) {
    next(error);
  }
});

// Get current user profile
router.get('/me', async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = getDatabase();
    
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT id, name, email, phone, created_at FROM users WHERE id = ?', [decoded.userId], (err, row) => {
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
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    next(error);
  }
});

// Update user profile
router.put('/profile', async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = getDatabase();
    const { name, phone } = req.body;
    
    const result = await new Promise((resolve, reject) => {
      db.run(`
        UPDATE users 
        SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [name, phone, decoded.userId], function(err) {
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
    
    // Get updated user
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT id, name, email, phone, updated_at FROM users WHERE id = ?', [decoded.userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.json({
      success: true,
      data: user,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    next(error);
  }
});

export default router;





