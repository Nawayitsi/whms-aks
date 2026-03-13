============================================================
PRODUCT REQUIREMENTS DOCUMENT (PRD)
SISTEM ACCOUNTING & MANAJEMEN STOK TERINTEGRASI
PT ANAK KEMBAR SEJATI (PABRIK ROKOK)
============================================================

> PRODUCT NAME
AKS Integrated Accounting & Inventory System

> OBJECTIVE
Membangun sistem berbasis web untuk mengintegrasikan sistem
Accounting dan Manajemen Stok pada PABRIK ROKOK
PT Anak Kembar Sejati agar pencatatan keuangan,
biaya produksi rokok, dan pergerakan barang menjadi
real-time, akurat, dan terpusat.

============================================================
1. TECH STACK
============================================================

FRONTEND  : React + Vite + TailwindCSS
BACKEND   : Node.js (Express.js)
DATABASE  : MySQL
AUTH      : JWT Authentication
ROLE      : RBAC (Role Based Access Control)

============================================================
2. USER ROLES
============================================================

1. ADMIN
   - Akses penuh Accounting & Stok
   - CRUD semua data
   - Download laporan

2. STAFF_AKUNTING
   - Akses hanya modul Accounting
   - CRUD transaksi & gaji
   - Generate & download laporan

3. STAFF_GUDANG
   - Akses hanya modul Stok Barang
   - CRUD stok & transaksi barang
   - Generate laporan stok

============================================================
3. SYSTEM FLOW
============================================================

[LOGIN PAGE]
-----------------------------------------
- Logo Aplikasi
- Nama Perusahaan: PT Anak Kembar Sejati
- Input Username
- Input Password
- Button LOGIN
- Validasi Role & Redirect sesuai role

[ADMIN MAIN PAGE]
-----------------------------------------
- Button: Accounting System
- Button: Stok Barang System

============================================================
4. MODULE: ACCOUNTING SYSTEM
============================================================

> DASHBOARD
-----------------------------------------
Menampilkan:
- Total Pemasukan
- Total Pengeluaran
- Laba / Rugi
- Total Biaya Produksi Rokok
- Total Penggajian
- Grafik Keuangan
- Transaksi Terbaru
- Search Bar

> MENU STRUCTURE
-----------------------------------------

1. Transaksi (All)
   - Semua pemasukan & pengeluaran
   - Filter tanggal & kategori
   - CRUD

2. Pemasukan
   - Penjualan rokok
   - Pendapatan lain-lain
   - CRUD

3. Pengeluaran
   - Pembelian bahan baku
   - Biaya operasional pabrik
   - Pajak & cukai
   - CRUD

4. Gaji Karyawan
   - Gaji Pokok
   - Bonus Produksi
   - Potongan
   - Total Otomatis
   - CRUD

5. Biaya Produksi Rokok
   - Tembakau
   - Cengkeh
   - Kertas Rokok
   - Filter
   - Kemasan
   - Tenaga Kerja
   - Operasional Mesin
   - Total Otomatis

6. Laporan Keuangan
   - Harian / Mingguan / Bulanan / Tahunan
   - Total Pendapatan
   - Total Pengeluaran
   - Laba Kotor
   - Laba Bersih
   - Detail Transaksi
   - Download PDF / Excel

7. Riwayat Transaksi
   - Log perubahan data
   - User & Timestamp

============================================================
5. MODULE: STOK BARANG SYSTEM
============================================================

> DASHBOARD
-----------------------------------------
- Total Bahan Baku
- Total Sparepart Mesin
- Total Produk Jadi (Rokok)
- Stok Masuk
- Stok Keluar
- Notifikasi Stok Menipis
- Aktivitas Terbaru

> MENU STRUCTURE
-----------------------------------------

1. Stok Bahan Baku
   Kategori:
   - Tembakau
   - Cengkeh
   - Kertas Rokok
   - Filter
   - Kemasan (Dus, Plastik, Bungkus)

   Fitur:
   - Jumlah Stok
   - Supplier
   - CRUD

2. Stok Sparepart
   - Part Mesin Produksi
   - Kategori
   - Lokasi Penyimpanan
   - CRUD

3. Stok Produk Jadi
   - Rokok Kretek
   - Rokok Filter
   - Rokok Mild
   - Jumlah Karton
   - Harga Jual
   - CRUD

4. Transaksi Stok
   - Stok Masuk (Pembelian / Produksi)
   - Stok Keluar (Penjualan / Distribusi)
   - Adjustment
   - Update otomatis jumlah stok

5. Laporan Stok
   - Pergerakan Barang
   - Total per kategori
   - Filter tanggal
   - Download PDF / Excel

6. Riwayat Pergerakan Barang
   - Log user
   - Timestamp
   - Jenis transaksi

============================================================
6. DATABASE STRUCTURE (HIGH LEVEL)
============================================================

TABLE USERS
- id
- username
- password_hash
- role
- created_at

TABLE TRANSACTIONS
- id
- type (income/expense)
- category
- amount
- description
- date
- created_by

TABLE SALARIES
- id
- employee_name
- base_salary
- bonus
- deduction
- total_salary
- date

TABLE PRODUCTION_COST
- id
- tobacco_cost
- clove_cost
- paper_cost
- filter_cost
- packaging_cost
- labor_cost
- machine_cost
- total_cost
- date

TABLE INVENTORY_RAW
- id
- name
- category
- stock
- supplier
- updated_at

TABLE INVENTORY_SPAREPART
- id
- name
- category
- stock
- location
- updated_at

TABLE INVENTORY_PRODUCT
- id
- name
- category
- stock
- selling_price
- updated_at

TABLE STOCK_MOVEMENTS
- id
- item_id
- item_type
- movement_type (in/out/adjustment)
- quantity
- date
- created_by

============================================================
7. UI/UX REQUIREMENTS
============================================================

- Modern, Clean, Professional
- Dashboard Interaktif (Chart.js / Recharts)
- Sidebar Navigation
- KPI Summary Cards
- Responsive Layout
- Toast Notification
- Dark / Light Mode
- Search & Filter pada setiap tabel

============================================================
8. SECURITY
============================================================

- JWT Authentication
- Password Hash (bcrypt)
- Role Based Access Control
- Protected Routes
- SQL Injection Prevention
- Activity Logging

============================================================
END OF DOCUMENT
============================================================