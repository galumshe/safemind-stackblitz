import express from 'express';
import pool from '../config/database.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT id, name, email FROM user WHERE id = ?',
      [req.session.userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', isAuthenticated, async (req, res) => {
  try {
    const { name, email } = req.body;

    await pool.query('UPDATE user SET name = ?, email = ? WHERE id = ?', [
      name,
      email,
      req.session.userId,
    ]);

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
