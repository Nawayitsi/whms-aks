import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function AdminMain() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 md:px-10 py-4 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">AKS System</h2>
          </div>
          <div className="flex flex-1 justify-end gap-4 items-center">
            <div className="flex gap-2">
              <button onClick={toggleTheme} className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">{isDark ? 'light_mode' : 'dark_mode'}</span>
              </button>
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
              </button>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">{user?.name || 'Admin'}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'AD'}
              </div>
              <button onClick={logout} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500" title="Logout">
                <span className="material-symbols-outlined">logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-12">
          {/* Hero */}
          <div className="mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-primary dark:text-slate-100">
              Welcome back, {user?.name?.split(' ')[0] || 'Administrator'}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Silahkan pilih modul sistem yang ingin Anda akses.
            </p>
          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Accounting */}
            {(user?.role === 'ADMIN' || user?.role === 'STAFF_AKUNTING') && (
              <Link to="/accounting" className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-slide-up">
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <div className="h-full w-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="material-symbols-outlined text-white text-7xl opacity-40">account_balance_wallet</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary dark:bg-primary dark:text-slate-100">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <h3 className="text-2xl font-bold">Accounting System</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Kelola laporan keuangan, transaksi harian, gaji karyawan, biaya produksi, dan pelaporan fiskal.
                  </p>
                  <div className="flex items-center text-primary dark:text-slate-100 font-bold group-hover:gap-2 transition-all">
                    <span>Akses Modul</span>
                    <span className="material-symbols-outlined ml-2">arrow_forward</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Inventory */}
            {(user?.role === 'ADMIN' || user?.role === 'STAFF_GUDANG') && (
              <Link to="/inventory" className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <div className="h-full w-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="material-symbols-outlined text-white text-7xl opacity-40">inventory_2</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100">
                      <span className="material-symbols-outlined">package_2</span>
                    </div>
                    <h3 className="text-2xl font-bold">Stok Barang System</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Monitor stok realtime, kelola pengadaan supplier, lacak pergerakan gudang, dan notifikasi stok.
                  </p>
                  <div className="flex items-center text-primary dark:text-slate-100 font-bold group-hover:gap-2 transition-all">
                    <span>Akses Modul</span>
                    <span className="material-symbols-outlined ml-2">arrow_forward</span>
                  </div>
                </div>
              </Link>
            )}
          </div>

          {/* System Health */}
          <div className="mt-auto border-t border-slate-200 dark:border-slate-800 pt-10">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">System Health & Overview</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="size-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">check_circle</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">System Status</p>
                  <p className="text-sm font-bold">All Operational</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="size-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">group</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Active Sessions</p>
                  <p className="text-sm font-bold">3 Users Online</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="size-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">update</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Last Sync</p>
                  <p className="text-sm font-bold">2 minutes ago</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="size-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">security</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Security Level</p>
                  <p className="text-sm font-bold">High (Encrypted)</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 py-8 px-6 text-center">
          <p className="text-sm text-slate-500">© 2024 AKS System Management. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
