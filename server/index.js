import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transactions.js';
import salaryRoutes from './routes/salaries.js';
import productionCostRoutes from './routes/productionCosts.js';
import inventoryRawRoutes from './routes/inventoryRaw.js';
import inventorySparepartRoutes from './routes/inventorySparepart.js';
import inventoryProductRoutes from './routes/inventoryProduct.js';
import stockMovementRoutes from './routes/stockMovements.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/production-costs', productionCostRoutes);
app.use('/api/inventory/raw', inventoryRawRoutes);
app.use('/api/inventory/sparepart', inventorySparepartRoutes);
app.use('/api/inventory/product', inventoryProductRoutes);
app.use('/api/stock-movements', stockMovementRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static frontend in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 AKS Backend running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints: http://localhost:${PORT}/api`);
  console.log(`🌐 CORS allowed: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
});
