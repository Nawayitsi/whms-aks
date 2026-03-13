import { useData } from '../../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const chartData = [
  { month: 'JAN', pemasukan: 60, pengeluaran: 40 },
  { month: 'FEB', pemasukan: 75, pengeluaran: 50 },
  { month: 'MAR', pemasukan: 65, pengeluaran: 45 },
  { month: 'APR', pemasukan: 85, pengeluaran: 35 },
  { month: 'MAY', pemasukan: 90, pengeluaran: 55 },
  { month: 'JUN', pemasukan: 70, pengeluaran: 60 },
  { month: 'JUL', pemasukan: 80, pengeluaran: 40 },
];

const fmt = (n) => {
  if (n >= 1e9) return `Rp ${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `Rp ${(n / 1e6).toFixed(1)}M`;
  return `Rp ${n.toLocaleString('id-ID')}`;
};

export default function AccountingDashboard() {
  const { transactions, productionCosts, salaries } = useData();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const profitLoss = totalIncome - totalExpense;
  const totalProdCost = productionCosts.reduce((s, pc) => s + pc.totalCost, 0);
  const totalSalary = salaries.reduce((s, sal) => s + sal.totalSalary, 0);

  const kpis = [
    { label: 'Total Pemasukan', value: fmt(totalIncome), icon: 'arrow_upward', color: 'green', change: '+12.5%' },
    { label: 'Total Pengeluaran', value: fmt(totalExpense), icon: 'arrow_downward', color: 'red', change: '-4.2%' },
    { label: 'Laba / Rugi', value: fmt(profitLoss), icon: 'payments', color: 'blue', change: '+18.1%' },
    { label: 'Biaya Produksi', value: fmt(totalProdCost), icon: 'precision_manufacturing', color: 'amber', change: '+2.4%' },
    { label: 'Total Penggajian', value: fmt(totalSalary), icon: 'badge', color: 'purple', change: '0.0%' },
  ];

  const costBreakdown = [
    { label: 'Tembakau & Cengkeh', pct: 45 },
    { label: 'Pita Cukai', pct: 35 },
    { label: 'Kemasan & Printing', pct: 15 },
    { label: 'Lain-lain', pct: 5 },
  ];

  const statusColor = (s) => s === 'Lunas' ? 'green' : s === 'Menunggu' ? 'amber' : 'red';

  return (
    <div className="p-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Dashboard Keuangan</h2>
          <p className="text-slate-500 text-sm">Ringkasan performa finansial bulan ini.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined text-lg">calendar_today</span> Nov 2023
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-lg">download</span> Download
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="flex items-center justify-between mb-4">
              <span className={`size-10 bg-${kpi.color}-100 dark:bg-${kpi.color}-900/30 text-${kpi.color}-600 rounded-lg flex items-center justify-center`}>
                <span className="material-symbols-outlined">{kpi.icon}</span>
              </span>
              <span className={`text-xs font-bold text-${kpi.color}-600`}>{kpi.change}</span>
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className="text-xl font-bold dark:text-white">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold dark:text-white">Tren Keuangan Bulanan</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-primary" /><span className="text-xs text-slate-500">Pemasukan</span></div>
              <div className="flex items-center gap-2"><span className="size-3 rounded-full bg-slate-300" /><span className="text-xs text-slate-500">Pengeluaran</span></div>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Bar dataKey="pemasukan" fill="#1d283a" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="pengeluaran" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold dark:text-white">Alokasi Biaya Produksi</h3>
          </div>
          <div className="p-6 space-y-6">
            {costBreakdown.map((c, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">{c.label}</span>
                  <span className="dark:text-white">{c.pct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Budget Produksi</span>
                  <span className="text-sm font-bold dark:text-white">Rp 200.000.000</span>
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Aman</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold dark:text-white">Transaksi Terbaru</h3>
          <button className="text-xs font-bold text-primary dark:text-slate-400 hover:underline">Lihat Semua</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4">ID Transaksi</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Keterangan</th>
                <th className="px-6 py-4">Jumlah</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.slice(0, 5).map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-primary dark:text-slate-300">#{t.id}</td>
                  <td className="px-6 py-4 text-slate-500">{t.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      t.category === 'Penjualan' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' :
                      t.category === 'Gaji' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600' :
                      'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                    }`}>{t.category}</span>
                  </td>
                  <td className="px-6 py-4 dark:text-slate-300">{t.description}</td>
                  <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'income' ? '+ ' : '- '}Rp {t.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-${statusColor(t.status)}-600 font-medium`}>
                      <span className={`size-1.5 bg-${statusColor(t.status)}-500 rounded-full`} />
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
