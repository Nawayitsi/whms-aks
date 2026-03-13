import { Router } from 'express';
import pool from '../config/db.js';
import authenticate from '../middleware/auth.js';
import authorize from '../middleware/rbac.js';

const router = Router();
router.use(authenticate);
router.use(authorize('ADMIN', 'STAFF_GUDANG'));

router.get('/', async (req, res) => {
  try { const [rows] = await pool.query('SELECT * FROM stock_movements ORDER BY date DESC, id DESC'); res.json(rows); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { item_id, item_name, item_type, movement_type, quantity, unit, created_by, notes } = req.body;
    const [result] = await pool.query(
      'INSERT INTO stock_movements (item_id, item_name, item_type, movement_type, quantity, unit, created_by, notes) VALUES (?,?,?,?,?,?,?,?)',
      [item_id, item_name, item_type, movement_type, quantity, unit, created_by || req.user.username, notes]
    );
    const [rows] = await pool.query('SELECT * FROM stock_movements WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
