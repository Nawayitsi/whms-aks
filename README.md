<<<<<<< HEAD
# whms-aks
=======
# AKS Integrated Accounting & Inventory System

Sistem Akuntansi & Manajemen Stok Terintegrasi - PT Anak Kembar Sejati (Pabrik Rokok)

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **Auth**: JWT + bcrypt + RBAC

## Quick Start (Lokal)

### 1. Install dependencies
```bash
npm install
```

### 2. Setup MySQL
Pastikan MySQL sudah berjalan. Edit `.env` sesuai konfigurasi MySQL Anda:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=aks_db
```

### 3. Seed database
```bash
npm run db:seed
```

### 4. Jalankan (2 terminal)
```bash
# Terminal 1: Backend
npm run server:dev

# Terminal 2: Frontend
npm run dev
```

Buka: **http://localhost:5173**

## Demo Login

| Username | Password | Role | Akses |
|---|---|---|---|
| admin | admin123 | ADMIN | Semua |
| akunting | akunting123 | STAFF_AKUNTING | Accounting |
| gudang | gudang123 | STAFF_GUDANG | Inventory |

## Deploy ke Server (VM Proxmox)

### Requirements
- Ubuntu 22.04+ / Debian 12
- Node.js 18+, MySQL 8, Nginx, PM2

### One-click deploy
```bash
# Clone/upload project ke server
sudo bash deploy/deploy.sh
```

## NPM Scripts

| Script | Keterangan |
|---|---|
| `npm run dev` | Jalankan frontend (Vite dev server) |
| `npm run server:dev` | Jalankan backend (auto-reload) |
| `npm run db:seed` | Buat database & seed data |
| `npm run build` | Build frontend |
| `npm start` | Build + jalankan production |

## API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| GET/POST/PUT/DELETE | /api/transactions | Transaksi keuangan |
| GET/POST/PUT/DELETE | /api/salaries | Gaji karyawan |
| GET/POST/PUT/DELETE | /api/production-costs | Biaya produksi |
| GET/POST/PUT/DELETE | /api/inventory/raw | Bahan baku |
| GET/POST/PUT/DELETE | /api/inventory/sparepart | Sparepart |
| GET/POST/PUT/DELETE | /api/inventory/product | Produk jadi |
| GET/POST | /api/stock-movements | Pergerakan stok |
| GET | /api/health | Health check |
>>>>>>> 78c16ba (initial commit)
