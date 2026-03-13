import { Router } from 'express';
import pool from '../config/db.js';
import authenticate from '../middleware/auth.js';
import authorize from '../middleware/rbac.js';

const router = Router();
router.use(authenticate);
router.use(authorize('ADMIN', 'STAFF_AKUNTING'));

// GET all
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM transactions ORDER BY date DESC, id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM transactions WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Tidak ditemukan' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const { type, category, amount, description, date, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO transactions (type, category, amount, description, date, created_by, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [type, category, amount, description, date, req.user.username, status || 'Lunas']
    );
    const [rows] = await pool.query('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const { type, category, amount, description, date, status } = req.body;
    await pool.query(
      'UPDATE transactions SET type=?, category=?, amount=?, description=?, date=?, status=? WHERE id=?',
      [type, category, amount, description, date, status, req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM transactions WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM transactions WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
