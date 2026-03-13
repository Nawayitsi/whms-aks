import { Router } from 'express';
import pool from '../config/db.js';
import authenticate from '../middleware/auth.js';
import authorize from '../middleware/rbac.js';

const router = Router();
router.use(authenticate);
router.use(authorize('ADMIN', 'STAFF_GUDANG'));

router.get('/', async (req, res) => {
  try { const [rows] = await pool.query('SELECT * FROM inventory_raw ORDER BY updated_at DESC'); res.json(rows); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, stock, unit, supplier, min_stock } = req.body;
    const [result] = await pool.query(
      'INSERT INTO inventory_raw (name, category, stock, unit, supplier, min_stock) VALUES (?,?,?,?,?,?)',
      [name, category, stock, unit, supplier, min_stock || 0]
    );
    const [rows] = await pool.query('SELECT * FROM inventory_raw WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, category, stock, unit, supplier, min_stock } = req.body;
    await pool.query(
      'UPDATE inventory_raw SET name=?, category=?, stock=?, unit=?, supplier=?, min_stock=?, updated_at=NOW() WHERE id=?',
      [name, category, stock, unit, supplier, min_stock, req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM inventory_raw WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try { await pool.query('DELETE FROM inventory_raw WHERE id = ?', [req.params.id]); res.json({ success: true }); }
  catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
