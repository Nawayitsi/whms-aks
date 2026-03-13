import { useData } from '../../context/DataContext';

export default function InventoryDashboard() {
  const { inventoryRaw, inventorySparepart, inventoryProduct, stockMovements, activityLog } = useData();

  const totalRaw = inventoryRaw.reduce((s, i) => s + i.stock, 0);
  const totalSparepart = inventorySparepart.reduce((s, i) => s + i.stock, 0);
  const totalProduct = inventoryProduct.reduce((s, i) => s + i.stock, 0);
  const todayIn = stockMovements.filter(m => m.movementType === 'in').reduce((s, m) => s + Math.abs(m.quantity), 0);
  const todayOut = stockMovements.filter(m => m.movementType === 'out').reduce((s, m) => s + Math.abs(m.quantity), 0);

  const lowStock = inventoryRaw.filter(i => i.stock <= (i.minStock || 50));

  const kpis = [
    { label: 'Bahan Baku', value: `${totalRaw.toLocaleString()}`, unit: 'Unit', icon: 'layers', color: 'blue', change: '+5.2%', changeColor: 'green' },
    { label: 'Sparepart', value: `${totalSparepart.toLocaleString()}`, unit: 'Pcs', icon: 'settings_input_component', color: 'orange', change: '-2.1%', changeColor: 'red' },
    { label: 'Produk Jadi', value: `${totalProduct.toLocaleString()}`, unit: 'Unit', icon: 'inventory', color: 'green', change: '+12.5%', changeColor: 'green' },
    { label: 'Stok Masuk', value: `${todayIn}`, unit: 'Total', icon: 'input', color: 'indigo' },
    { label: 'Stok Keluar', value: `${todayOut}`, unit: 'Total', icon: 'output', color: 'purple' },
  ];

  const recentMov = stockMovements.slice(0, 3);

  const colorMap = { green: 'bg-green-500', primary: 'bg-primary', red: 'bg-red-500', blue: 'bg-blue-500', slate: 'bg-slate-300' };

  return (
    <div className="p-8 animate-fade-in space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Dashboard Overview</h2>
        <div className="relative w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Cari stok atau SKU..." />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 animate-slide-up" style={{ animationDelay: `${i*0.05}s` }}>
            <div className="flex justify-between items-start mb-4">
              <span className={`p-2 rounded-lg bg-${k.color}-50 dark:bg-${k.color}-900/20 text-${k.color}-600`}><span className="material-symbols-outlined">{k.icon}</span></span>
              {k.change && <span className={`text-xs font-bold text-${k.changeColor}-600 bg-${k.changeColor}-50 dark:bg-${k.changeColor}-900/20 px-2 py-1 rounded-full`}>{k.change}</span>}
            </div>
            <p className="text-slate-500 text-sm font-medium">{k.label}</p>
            <h3 className="text-2xl font-bold mt-1">{k.value} <span className="text-sm font-normal text-slate-400">{k.unit}</span></h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Low Stock + Recent Transactions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Low Stock Alerts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2"><span className="material-symbols-outlined text-orange-500">warning</span>Peringatan Stok Rendah</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lowStock.map(item => {
                const pct = item.minStock ? Math.min(100, Math.round((item.stock / item.minStock) * 100)) : 50;
                return (
                  <div key={item.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
                    <div className="size-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-slate-400 text-2xl">inventory_2</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2">
                        <div className={`h-full rounded-full ${pct < 30 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Sisa: <span className={`font-bold ${pct < 30 ? 'text-red-500' : 'text-orange-500'}`}>{item.stock} {item.unit}</span> / Limit: {item.minStock}</p>
                    </div>
                  </div>
                );
              })}
              {lowStock.length === 0 && <p className="text-slate-400 text-sm col-span-2 py-4">Semua stok dalam kondisi aman.</p>}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800"><h3 className="font-bold">Transaksi Terakhir</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr><th className="px-6 py-3 font-semibold">Produk</th><th className="px-6 py-3 font-semibold">Tipe</th><th className="px-6 py-3 font-semibold">Jumlah</th><th className="px-6 py-3 font-semibold">Status</th><th className="px-6 py-3 font-semibold text-right">Tanggal</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentMov.map(m => (
                    <tr key={m.id} className="text-sm">
                      <td className="px-6 py-4 font-medium">{m.itemName}</td>
                      <td className="px-6 py-4"><span className={`font-medium ${m.movementType === 'in' ? 'text-green-600' : m.movementType === 'out' ? 'text-red-600' : 'text-amber-600'}`}>{m.movementType === 'in' ? 'Masuk' : m.movementType === 'out' ? 'Keluar' : 'Adj'}</span></td>
                      <td className="px-6 py-4">{Math.abs(m.quantity)} {m.unit}</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 rounded text-[11px] font-bold bg-green-100 text-green-700">Completed</span></td>
                      <td className="px-6 py-4 text-right text-slate-500">{m.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2"><span className="material-symbols-outlined text-primary">history</span>Aktivitas Terbaru</h2>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">
              {activityLog.map(a => (
                <div key={a.id} className="relative pl-8">
                  <div className={`absolute left-0 top-1 size-6 rounded-full ${colorMap[a.color] || 'bg-slate-300'} border-4 border-white dark:border-slate-900 z-10`} />
                  <div className="flex flex-col">
                    <p className="text-sm"><span className="font-bold">{a.user}</span> {a.action} <span className="font-medium text-primary">{a.target}</span></p>
                    <span className="text-xs text-slate-500 mt-1">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Card */}
          <div className="bg-primary p-6 rounded-xl text-white">
            <h4 className="font-bold text-lg mb-2">Butuh Bantuan?</h4>
            <p className="text-slate-300 text-sm mb-4">Akses panduan sistem atau hubungi tim IT.</p>
            <button className="w-full bg-white text-primary py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"><span className="material-symbols-outlined text-lg">book</span>Panduan Sistem</button>
          </div>
        </div>
      </div>
    </div>
  );
}
