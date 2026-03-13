import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const accountingNav = [
  { label: 'Dashboard', icon: 'dashboard', path: '/accounting' },
  { label: 'Transaksi', icon: 'receipt_long', path: '/accounting/transaksi' },
  { label: 'Pemasukan', icon: 'trending_up', path: '/accounting/pemasukan' },
  { label: 'Pengeluaran', icon: 'trending_down', path: '/accounting/pengeluaran' },
  { type: 'divider', label: 'Operasional' },
  { label: 'Gaji Karyawan', icon: 'groups', path: '/accounting/gaji' },
  { label: 'Biaya Produksi', icon: 'factory', path: '/accounting/produksi' },
  { type: 'divider', label: 'Reports' },
  { label: 'Laporan Keuangan', icon: 'assessment', path: '/accounting/laporan' },
  { label: 'Riwayat Transaksi', icon: 'history', path: '/accounting/riwayat' },
];

const inventoryNav = [
  { label: 'Dashboard', icon: 'dashboard', path: '/inventory' },
  { label: 'Stok Bahan Baku', icon: 'inventory_2', path: '/inventory/bahan-baku' },
  { label: 'Stok Sparepart', icon: 'settings_input_component', path: '/inventory/sparepart' },
  { label: 'Stok Produk Jadi', icon: 'check_circle', path: '/inventory/produk-jadi' },
  { type: 'divider', label: 'Transaksi' },
  { label: 'Transaksi Stok', icon: 'swap_horiz', path: '/inventory/transaksi' },
  { label: 'Laporan Stok', icon: 'assessment', path: '/inventory/laporan' },
  { label: 'Riwayat Pergerakan', icon: 'history', path: '/inventory/riwayat' },
];

export default function Sidebar({ module = 'accounting' }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const navItems = module === 'accounting' ? accountingNav : inventoryNav;
  const moduleLabel = module === 'accounting' ? 'Accounting System' : 'Inventory System';
  const moduleIcon = module === 'accounting' ? 'account_balance' : 'factory';

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 h-screen sticky top-0`}>
      {/* Logo */}
      <div className="p-4 flex items-center gap-3">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white flex-shrink-0">
          <span className="material-symbols-outlined text-lg">{moduleIcon}</span>
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <h1 className="text-sm font-bold leading-none text-primary dark:text-slate-100 truncate">PT Anak Kembar</h1>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{moduleLabel}</span>
          </div>
        )}
      </div>

      {/* Toggle & Back */}
      <div className="px-3 flex gap-1 mb-2">
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Toggle sidebar">
          <span className="material-symbols-outlined text-lg">{collapsed ? 'menu_open' : 'menu'}</span>
        </button>
        {!collapsed && (
          <Link to="/admin" className="p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Kembali ke menu utama">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item, i) => {
          if (item.type === 'divider') {
            return !collapsed ? (
              <div key={i} className="pt-4 pb-2 px-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
              </div>
            ) : <div key={i} className="my-2 border-t border-slate-100 dark:border-slate-800" />;
          }
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle + User */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
        <button onClick={toggleTheme} className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors ${collapsed ? 'justify-center' : ''}`}>
          <span className="material-symbols-outlined text-lg">{isDark ? 'light_mode' : 'dark_mode'}</span>
          {!collapsed && (isDark ? 'Light Mode' : 'Dark Mode')}
        </button>
        {!collapsed && user && (
          <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0 text-xs">
              {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold truncate">{user.name}</span>
              <span className="text-[10px] text-slate-500 truncate">{user.role}</span>
            </div>
            <button onClick={logout} className="p-1 text-slate-400 hover:text-red-500 rounded" title="Logout">
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        )}
        {collapsed && (
          <button onClick={logout} className="flex items-center justify-center w-full p-2 text-slate-400 hover:text-red-500 rounded-lg" title="Logout">
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
