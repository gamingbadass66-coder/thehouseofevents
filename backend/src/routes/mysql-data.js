import express from 'express';
import { executeQuery } from '../database/mysql-init.js';

const router = express.Router();

// Get all events from MySQL
router.get('/events', async (req, res, next) => {
  try {
    const events = await executeQuery('SELECT * FROM events ORDER BY event_date ASC');
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get all team members from MySQL
router.get('/team_members', async (req, res, next) => {
  try {
    const teamMembers = await executeQuery('SELECT * FROM team_members ORDER BY name ASC');
    res.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error.message);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

// Get all partners from MySQL
router.get('/partners', async (req, res, next) => {
  try {
    const partners = await executeQuery('SELECT * FROM partners ORDER BY name ASC');
    res.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error.message);
    res.status(500).json({ error: 'Failed to fetch partners' });
  }
});

// Get all gallery items from MySQL
router.get('/gallery', async (req, res, next) => {
  try {
    const gallery = await executeQuery('SELECT * FROM gallery ORDER BY created_at DESC');
    res.json(gallery);
  } catch (error) {
    console.error('Error fetching gallery:', error.message);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// Get all testimonials from MySQL
router.get('/testimonials', async (req, res, next) => {
  try {
    const testimonials = await executeQuery('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error.message);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

export default router;


