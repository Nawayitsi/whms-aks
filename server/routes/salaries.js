import { Router } from 'express';
import pool from '../config/db.js';
import authenticate from '../middleware/auth.js';
import authorize from '../middleware/rbac.js';

const router = Router();
router.use(authenticate);
router.use(authorize('ADMIN', 'STAFF_AKUNTING'));

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM salaries ORDER BY date DESC, id DESC');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { employee_name, division, nik, base_salary, bonus, deduction, date } = req.body;
    const total_salary = (base_salary || 0) + (bonus || 0) - (deduction || 0);
    const [result] = await pool.query(
      'INSERT INTO salaries (employee_name, division, nik, base_salary, bonus, deduction, total_salary, date) VALUES (?,?,?,?,?,?,?,?)',
      [employee_name, division, nik, base_salary, bonus, deduction, total_salary, date]
    );
    const [rows] = await pool.query('SELECT * FROM salaries WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const { employee_name, division, nik, base_salary, bonus, deduction, date } = req.body;
    const total_salary = (base_salary || 0) + (bonus || 0) - (deduction || 0);
    await pool.query(
      'UPDATE salaries SET employee_name=?, division=?, nik=?, base_salary=?, bonus=?, deduction=?, total_salary=?, date=? WHERE id=?',
      [employee_name, division, nik, base_salary, bonus, deduction, total_salary, date, req.params.id]
    );
    const [rows] = await pool.query('SELECT * FROM salaries WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM salaries WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
