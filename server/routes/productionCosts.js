import { Router } from 'express';
import pool from '../config/db.js';
import authenticate from '../middleware/auth.js';
import authorize from '../middleware/rbac.js';

const router = Router();
router.use(authenticate);
router.use(authorize('ADMIN', 'STAFF_AKUNTING'));

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM production_costs ORDER BY date DESC, id DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { batch, tobacco_cost, clove_cost, paper_cost, filter_cost, packaging_cost, labor_cost, machine_cost, date } = req.body;
    const total_cost = (tobacco_cost||0) + (clove_cost||0) + (paper_cost||0) + (filter_cost||0) + (packaging_cost||0) + (labor_cost||0) + (machine_cost||0);
    const [result] = await pool.query(
      'INSERT INTO production_costs (batch, tobacco_cost, clove_cost, paper_cost, filter_cost, packaging_cost, labor_cost, machine_cost, total_cost, date) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [batch, tobacco_cost, clove_cost, paper_cost, filter_cost, packaging_cost, labor_cost, machine_cost, total_cost, date]
    );
    const [rows] = await pool.query('SELECT * FROM production_costs WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { batch, tobacco_cost, clove_cost, paper_cost, filter_cost, packaging_cost, labor_cost, machine_cost, date } = req.body;
    const total_cost = (tobacco_cost||0) + (clove_cost||0) + (paper_cost||0) + (filter_cost||0) + (packaging_cost||0) + (labor_cost||0) + (machine_cost||0);
    await pool.query(
      'UPDATE production_costs SET batch=?, tobacco_cost=?, clove_cost=?, paper_cost=?, filter_cost=?, packaging_cost=?, labor_cost=?, machine_cost=?, total_cost=?, date=? WHERE id=?',
      [batch, tobacco_cost, clove_cost, paper_cost, filter_cost, packaging_cost, labor_cost, machine_cost, total_cost, date, req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM production_costs WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM production_costs WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
