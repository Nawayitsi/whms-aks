// Mock data matching PRD database schema for PT Anak Kembar Sejati

export const mockUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'ADMIN', name: 'Super Admin' },
  { id: 2, username: 'akunting', password: 'akunting123', role: 'STAFF_AKUNTING', name: 'Sari Dewi' },
  { id: 3, username: 'gudang', password: 'gudang123', role: 'STAFF_GUDANG', name: 'Andi Wijaya' },
];

export const mockTransactions = [
  { id: 'TRX-88291', type: 'expense', category: 'Biaya Produksi', amount: 45000000, description: 'Pembelian Pita Cukai Batch 112', date: '2023-11-12', createdBy: 'admin', status: 'Lunas' },
  { id: 'TRX-88290', type: 'income', category: 'Penjualan', amount: 120500000, description: 'Distribusi Agen Jawa Tengah', date: '2023-11-11', createdBy: 'admin', status: 'Lunas' },
  { id: 'TRX-88289', type: 'expense', category: 'Gaji', amount: 85000000, description: 'Gaji Karyawan Bagian Produksi', date: '2023-11-10', createdBy: 'admin', status: 'Menunggu' },
  { id: 'TRX-88288', type: 'expense', category: 'Biaya Produksi', amount: 12000000, description: 'Pembelian Tembakau Virginia 200kg', date: '2023-11-09', createdBy: 'admin', status: 'Lunas' },
  { id: 'TRX-88287', type: 'income', category: 'Penjualan', amount: 95000000, description: 'Penjualan Rokok Kretek - Surabaya', date: '2023-11-08', createdBy: 'akunting', status: 'Lunas' },
  { id: 'TRX-88286', type: 'expense', category: 'Operasional', amount: 8500000, description: 'Biaya Listrik & Air Pabrik', date: '2023-11-07', createdBy: 'akunting', status: 'Lunas' },
  { id: 'TRX-88285', type: 'income', category: 'Penjualan', amount: 78000000, description: 'Distribusi Agen Jakarta', date: '2023-11-06', createdBy: 'admin', status: 'Lunas' },
  { id: 'TRX-88284', type: 'expense', category: 'Pajak & Cukai', amount: 35000000, description: 'Pembayaran Pajak Cukai Rokok', date: '2023-11-05', createdBy: 'akunting', status: 'Lunas' },
  { id: 'TRX-88283', type: 'income', category: 'Pendapatan Lain', amount: 5200000, description: 'Penjualan Sisa Bahan Baku', date: '2023-11-04', createdBy: 'admin', status: 'Lunas' },
  { id: 'TRX-88282', type: 'expense', category: 'Biaya Produksi', amount: 22000000, description: 'Pembelian Cengkeh Grade A 500kg', date: '2023-11-03', createdBy: 'akunting', status: 'Lunas' },
];

export const mockSalaries = [
  { id: 1, employeeName: 'Ahmad Fauzi', division: 'Produksi', nik: '2021001', baseSalary: 4500000, bonus: 750000, deduction: 100000, totalSalary: 5150000, date: '2023-10-01' },
  { id: 2, employeeName: 'Siti Aminah', division: 'Produksi', nik: '2021042', baseSalary: 4200000, bonus: 820000, deduction: 50000, totalSalary: 4970000, date: '2023-10-01' },
  { id: 3, employeeName: 'Budi Santoso', division: 'Produksi', nik: '2021015', baseSalary: 4500000, bonus: 450000, deduction: 250000, totalSalary: 4700000, date: '2023-10-01' },
  { id: 4, employeeName: 'Dewi Lestari', division: 'Produksi', nik: '2022008', baseSalary: 4200000, bonus: 900000, deduction: 0, totalSalary: 5100000, date: '2023-10-01' },
  { id: 5, employeeName: 'Eko Prasetyo', division: 'Gudang', nik: '2020033', baseSalary: 4000000, bonus: 300000, deduction: 100000, totalSalary: 4200000, date: '2023-10-01' },
  { id: 6, employeeName: 'Rina Wulandari', division: 'Administrasi', nik: '2021050', baseSalary: 4800000, bonus: 500000, deduction: 0, totalSalary: 5300000, date: '2023-10-01' },
];

export const mockProductionCosts = [
  { id: 1, tobaccoCost: 25000000, cloveCost: 18000000, paperCost: 5000000, filterCost: 3500000, packagingCost: 8000000, laborCost: 12000000, machineCost: 3500000, totalCost: 75000000, date: '2023-11-01', batch: 'BATCH-112' },
  { id: 2, tobaccoCost: 22000000, cloveCost: 16000000, paperCost: 4800000, filterCost: 3200000, packagingCost: 7500000, laborCost: 11000000, machineCost: 3000000, totalCost: 67500000, date: '2023-10-01', batch: 'BATCH-111' },
  { id: 3, tobaccoCost: 27000000, cloveCost: 19500000, paperCost: 5200000, filterCost: 3800000, packagingCost: 8500000, laborCost: 13000000, machineCost: 4000000, totalCost: 81000000, date: '2023-09-01', batch: 'BATCH-110' },
];

export const mockInventoryRaw = [
  { id: 1, name: 'Tembakau Virginia', category: 'Tembakau', stock: 500, unit: 'Kg', supplier: 'PT Tembakau Nusantara', minStock: 100, updatedAt: '2023-11-12' },
  { id: 2, name: 'Tembakau Madura', category: 'Tembakau', stock: 350, unit: 'Kg', supplier: 'CV Madura Jaya', minStock: 100, updatedAt: '2023-11-11' },
  { id: 3, name: 'Cengkeh Grade A', category: 'Cengkeh', stock: 200, unit: 'Kg', supplier: 'PT Cengkeh Maluku', minStock: 50, updatedAt: '2023-11-10' },
  { id: 4, name: 'Cengkeh Grade B', category: 'Cengkeh', stock: 80, unit: 'Kg', supplier: 'PT Cengkeh Maluku', minStock: 50, updatedAt: '2023-11-09' },
  { id: 5, name: 'Kertas Rokok Premium', category: 'Kertas Rokok', stock: 10000, unit: 'Lembar', supplier: 'PT Paper Indo', minStock: 2000, updatedAt: '2023-11-08' },
  { id: 6, name: 'Filter Acetate', category: 'Filter', stock: 15000, unit: 'Pcs', supplier: 'PT Filter Indonesia', minStock: 3000, updatedAt: '2023-11-07' },
  { id: 7, name: 'Dus Kemasan Kretek', category: 'Kemasan', stock: 5000, unit: 'Pcs', supplier: 'CV Karton Mas', minStock: 1000, updatedAt: '2023-11-06' },
  { id: 8, name: 'Plastik Seal', category: 'Kemasan', stock: 25, unit: 'Roll', supplier: 'CV Plastik Jaya', minStock: 30, updatedAt: '2023-11-05' },
];

export const mockInventorySparepart = [
  { id: 1, name: 'Bearing Mesin Linting', category: 'Mesin Linting', stock: 12, unit: 'Pcs', location: 'Gudang B - Rak 3', updatedAt: '2023-11-12' },
  { id: 2, name: 'Pisau Potong Rokok', category: 'Mesin Potong', stock: 5, unit: 'Pcs', location: 'Gudang B - Rak 1', updatedAt: '2023-11-10' },
  { id: 3, name: 'Belt Conveyor', category: 'Conveyor', stock: 3, unit: 'Pcs', location: 'Gudang B - Rak 5', updatedAt: '2023-11-08' },
  { id: 4, name: 'Motor Listrik 2HP', category: 'Motor', stock: 2, unit: 'Unit', location: 'Gudang C', updatedAt: '2023-11-05' },
];

export const mockInventoryProduct = [
  { id: 1, name: 'AKS Kretek Premium', category: 'Rokok Kretek', stock: 150, unit: 'Karton', sellingPrice: 850000, updatedAt: '2023-11-12' },
  { id: 2, name: 'AKS Kretek Original', category: 'Rokok Kretek', stock: 200, unit: 'Karton', sellingPrice: 720000, updatedAt: '2023-11-11' },
  { id: 3, name: 'AKS Filter Gold', category: 'Rokok Filter', stock: 180, unit: 'Karton', sellingPrice: 900000, updatedAt: '2023-11-10' },
  { id: 4, name: 'AKS Mild Light', category: 'Rokok Mild', stock: 120, unit: 'Karton', sellingPrice: 950000, updatedAt: '2023-11-09' },
  { id: 5, name: 'AKS Mild Menthol', category: 'Rokok Mild', stock: 90, unit: 'Karton', sellingPrice: 980000, updatedAt: '2023-11-08' },
];

export const mockStockMovements = [
  { id: 1, itemId: 1, itemName: 'Tembakau Virginia', itemType: 'raw', movementType: 'in', quantity: 200, unit: 'Kg', date: '2023-11-12', createdBy: 'Andi Wijaya', notes: 'Pembelian dari PT Tembakau Nusantara' },
  { id: 2, itemId: 6, itemName: 'Filter Acetate', itemType: 'raw', movementType: 'out', quantity: 5000, unit: 'Pcs', date: '2023-11-12', createdBy: 'Bambang S.', notes: 'Pemakaian produksi Batch 112' },
  { id: 3, itemId: 1, itemName: 'AKS Kretek Premium', itemType: 'product', movementType: 'in', quantity: 50, unit: 'Karton', date: '2023-11-11', createdBy: 'Sistem', notes: 'Hasil produksi Batch 112' },
  { id: 4, itemId: 2, itemName: 'AKS Kretek Original', itemType: 'product', movementType: 'out', quantity: 100, unit: 'Karton', date: '2023-11-10', createdBy: 'Eko P.', notes: 'Distribusi Agen Jawa Tengah' },
  { id: 5, itemId: 3, itemName: 'Cengkeh Grade A', itemType: 'raw', movementType: 'in', quantity: 100, unit: 'Kg', date: '2023-11-09', createdBy: 'Andi Wijaya', notes: 'Pembelian dari PT Cengkeh Maluku' },
  { id: 6, itemId: 8, itemName: 'Plastik Seal', itemType: 'raw', movementType: 'adjustment', quantity: -5, unit: 'Roll', date: '2023-11-08', createdBy: 'Andi Wijaya', notes: 'Koreksi stok - barang rusak' },
];

export const mockActivityLog = [
  { id: 1, user: 'Bambang S.', action: 'mengkonfirmasi penerimaan', target: 'Bahan Baku Plastik (2 ton)', time: '10 Menit yang lalu', color: 'green' },
  { id: 2, user: 'Sistem', action: 'memperbarui status stok', target: 'Plastik Seal ke level rendah', time: '1 Jam yang lalu', color: 'primary' },
  { id: 3, user: 'Eko P.', action: 'mencatat pengeluaran', target: 'Ban Forklift untuk maintenance', time: '3 Jam yang lalu', color: 'red' },
  { id: 4, user: 'Riana K.', action: 'membuat laporan bulanan', target: 'Stok Sparepart November', time: '5 Jam yang lalu', color: 'blue' },
  { id: 5, user: 'Inventory Sync', action: 'selesai untuk', target: 'Gudang C', time: 'Kemarin', color: 'slate' },
];
