import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const DB = process.env.DB_NAME || 'aks';

async function seed() {
  // Connect to the database directly (database should already exist)
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: DB,
  });

  console.log(`🔧 Connected to database '${DB}'`);

  console.log('📋 Creating tables...');

  await conn.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN','STAFF_AKUNTING','STAFF_GUDANG') NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('income','expense') NOT NULL,
    category VARCHAR(100),
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_by VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Lunas'
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS salaries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    division VARCHAR(50),
    nik VARCHAR(20),
    base_salary DECIMAL(15,2) DEFAULT 0,
    bonus DECIMAL(15,2) DEFAULT 0,
    deduction DECIMAL(15,2) DEFAULT 0,
    total_salary DECIMAL(15,2) DEFAULT 0,
    date DATE
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS production_costs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    batch VARCHAR(50),
    tobacco_cost DECIMAL(15,2) DEFAULT 0,
    clove_cost DECIMAL(15,2) DEFAULT 0,
    paper_cost DECIMAL(15,2) DEFAULT 0,
    filter_cost DECIMAL(15,2) DEFAULT 0,
    packaging_cost DECIMAL(15,2) DEFAULT 0,
    labor_cost DECIMAL(15,2) DEFAULT 0,
    machine_cost DECIMAL(15,2) DEFAULT 0,
    total_cost DECIMAL(15,2) DEFAULT 0,
    date DATE
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS inventory_raw (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    stock INT DEFAULT 0,
    unit VARCHAR(20) DEFAULT 'Kg',
    supplier VARCHAR(100),
    min_stock INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS inventory_sparepart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    stock INT DEFAULT 0,
    unit VARCHAR(20) DEFAULT 'Pcs',
    location VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS inventory_product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    stock INT DEFAULT 0,
    unit VARCHAR(20) DEFAULT 'Karton',
    selling_price DECIMAL(15,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);

  await conn.query(`CREATE TABLE IF NOT EXISTS stock_movements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    item_name VARCHAR(100),
    item_type VARCHAR(20),
    movement_type ENUM('in','out','adjustment') NOT NULL,
    quantity INT NOT NULL,
    unit VARCHAR(20),
    date DATE DEFAULT (CURRENT_DATE),
    created_by VARCHAR(50),
    notes TEXT
  )`);

  // Seed data
  console.log('🌱 Seeding data...');

  // Check if users already exist
  const [existingUsers] = await conn.query('SELECT COUNT(*) as cnt FROM users');
  if (existingUsers[0].cnt === 0) {
    const hash = await bcrypt.hash('admin123', 10);
    const hashAk = await bcrypt.hash('akunting123', 10);
    const hashGd = await bcrypt.hash('gudang123', 10);
    await conn.query('INSERT INTO users (username, password_hash, role, name) VALUES (?,?,?,?),(?,?,?,?),(?,?,?,?)', [
      'admin', hash, 'ADMIN', 'Super Admin',
      'akunting', hashAk, 'STAFF_AKUNTING', 'Sari Dewi',
      'gudang', hashGd, 'STAFF_GUDANG', 'Andi Wijaya',
    ]);
    console.log('  ✅ Users seeded');
  }

  const [existingTx] = await conn.query('SELECT COUNT(*) as cnt FROM transactions');
  if (existingTx[0].cnt === 0) {
    await conn.query(`INSERT INTO transactions (type, category, amount, description, date, created_by, status) VALUES
      ('expense','Biaya Produksi',45000000,'Pembelian Pita Cukai Batch 112','2023-11-12','admin','Lunas'),
      ('income','Penjualan',120500000,'Distribusi Agen Jawa Tengah','2023-11-11','admin','Lunas'),
      ('expense','Gaji',85000000,'Gaji Karyawan Bagian Produksi','2023-11-10','admin','Menunggu'),
      ('expense','Biaya Produksi',12000000,'Pembelian Tembakau Virginia 200kg','2023-11-09','admin','Lunas'),
      ('income','Penjualan',95000000,'Penjualan Rokok Kretek - Surabaya','2023-11-08','akunting','Lunas'),
      ('expense','Operasional',8500000,'Biaya Listrik & Air Pabrik','2023-11-07','akunting','Lunas'),
      ('income','Penjualan',78000000,'Distribusi Agen Jakarta','2023-11-06','admin','Lunas'),
      ('expense','Pajak & Cukai',35000000,'Pembayaran Pajak Cukai Rokok','2023-11-05','akunting','Lunas'),
      ('income','Pendapatan Lain',5200000,'Penjualan Sisa Bahan Baku','2023-11-04','admin','Lunas'),
      ('expense','Biaya Produksi',22000000,'Pembelian Cengkeh Grade A 500kg','2023-11-03','akunting','Lunas')
    `);
    console.log('  ✅ Transactions seeded');
  }

  const [existingSal] = await conn.query('SELECT COUNT(*) as cnt FROM salaries');
  if (existingSal[0].cnt === 0) {
    await conn.query(`INSERT INTO salaries (employee_name, division, nik, base_salary, bonus, deduction, total_salary, date) VALUES
      ('Ahmad Fauzi','Produksi','2021001',4500000,750000,100000,5150000,'2023-10-01'),
      ('Siti Aminah','Produksi','2021042',4200000,820000,50000,4970000,'2023-10-01'),
      ('Budi Santoso','Produksi','2021015',4500000,450000,250000,4700000,'2023-10-01'),
      ('Dewi Lestari','Produksi','2022008',4200000,900000,0,5100000,'2023-10-01'),
      ('Eko Prasetyo','Gudang','2020033',4000000,300000,100000,4200000,'2023-10-01'),
      ('Rina Wulandari','Administrasi','2021050',4800000,500000,0,5300000,'2023-10-01')
    `);
    console.log('  ✅ Salaries seeded');
  }

  const [existingPC] = await conn.query('SELECT COUNT(*) as cnt FROM production_costs');
  if (existingPC[0].cnt === 0) {
    await conn.query(`INSERT INTO production_costs (batch, tobacco_cost, clove_cost, paper_cost, filter_cost, packaging_cost, labor_cost, machine_cost, total_cost, date) VALUES
      ('BATCH-112',25000000,18000000,5000000,3500000,8000000,12000000,3500000,75000000,'2023-11-01'),
      ('BATCH-111',22000000,16000000,4800000,3200000,7500000,11000000,3000000,67500000,'2023-10-01'),
      ('BATCH-110',27000000,19500000,5200000,3800000,8500000,13000000,4000000,81000000,'2023-09-01')
    `);
    console.log('  ✅ Production costs seeded');
  }

  const [existingIR] = await conn.query('SELECT COUNT(*) as cnt FROM inventory_raw');
  if (existingIR[0].cnt === 0) {
    await conn.query(`INSERT INTO inventory_raw (name, category, stock, unit, supplier, min_stock) VALUES
      ('Tembakau Virginia','Tembakau',500,'Kg','PT Tembakau Nusantara',100),
      ('Tembakau Madura','Tembakau',350,'Kg','CV Madura Jaya',100),
      ('Cengkeh Grade A','Cengkeh',200,'Kg','PT Cengkeh Maluku',50),
      ('Cengkeh Grade B','Cengkeh',80,'Kg','PT Cengkeh Maluku',50),
      ('Kertas Rokok Premium','Kertas Rokok',10000,'Lembar','PT Paper Indo',2000),
      ('Filter Acetate','Filter',15000,'Pcs','PT Filter Indonesia',3000),
      ('Dus Kemasan Kretek','Kemasan',5000,'Pcs','CV Karton Mas',1000),
      ('Plastik Seal','Kemasan',25,'Roll','CV Plastik Jaya',30)
    `);
    console.log('  ✅ Raw materials seeded');
  }

  const [existingIS] = await conn.query('SELECT COUNT(*) as cnt FROM inventory_sparepart');
  if (existingIS[0].cnt === 0) {
    await conn.query(`INSERT INTO inventory_sparepart (name, category, stock, unit, location) VALUES
      ('Bearing Mesin Linting','Mesin Linting',12,'Pcs','Gudang B - Rak 3'),
      ('Pisau Potong Rokok','Mesin Potong',5,'Pcs','Gudang B - Rak 1'),
      ('Belt Conveyor','Conveyor',3,'Pcs','Gudang B - Rak 5'),
      ('Motor Listrik 2HP','Motor',2,'Unit','Gudang C')
    `);
    console.log('  ✅ Spareparts seeded');
  }

  const [existingIP] = await conn.query('SELECT COUNT(*) as cnt FROM inventory_product');
  if (existingIP[0].cnt === 0) {
    await conn.query(`INSERT INTO inventory_product (name, category, stock, unit, selling_price) VALUES
      ('AKS Kretek Premium','Rokok Kretek',150,'Karton',850000),
      ('AKS Kretek Original','Rokok Kretek',200,'Karton',720000),
      ('AKS Filter Gold','Rokok Filter',180,'Karton',900000),
      ('AKS Mild Light','Rokok Mild',120,'Karton',950000),
      ('AKS Mild Menthol','Rokok Mild',90,'Karton',980000)
    `);
    console.log('  ✅ Products seeded');
  }

  const [existingSM] = await conn.query('SELECT COUNT(*) as cnt FROM stock_movements');
  if (existingSM[0].cnt === 0) {
    await conn.query(`INSERT INTO stock_movements (item_id, item_name, item_type, movement_type, quantity, unit, date, created_by, notes) VALUES
      (1,'Tembakau Virginia','raw','in',200,'Kg','2023-11-12','Andi Wijaya','Pembelian dari PT Tembakau Nusantara'),
      (6,'Filter Acetate','raw','out',5000,'Pcs','2023-11-12','Bambang S.','Pemakaian produksi Batch 112'),
      (1,'AKS Kretek Premium','product','in',50,'Karton','2023-11-11','Sistem','Hasil produksi Batch 112'),
      (2,'AKS Kretek Original','product','out',100,'Karton','2023-11-10','Eko P.','Distribusi Agen Jawa Tengah'),
      (3,'Cengkeh Grade A','raw','in',100,'Kg','2023-11-09','Andi Wijaya','Pembelian dari PT Cengkeh Maluku'),
      (8,'Plastik Seal','raw','adjustment',-5,'Roll','2023-11-08','Andi Wijaya','Koreksi stok - barang rusak')
    `);
    console.log('  ✅ Stock movements seeded');
  }

  console.log('✅ Database seeded successfully!');
  await conn.end();
}

seed().catch(err => { console.error('❌ Seed error:', err.message); process.exit(1); });
