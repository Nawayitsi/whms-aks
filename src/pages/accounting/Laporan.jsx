import { useData } from '../../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Laporan() {
  const { transactions } = useData();
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const labaKotor = totalIncome - totalExpense;
  const pajak = Math.round(labaKotor * 0.1);
  const labaBersih = labaKotor - pajak;

  const monthlyData = [
    { month: 'Jul', income: 450, expense: 280 },
    { month: 'Aug', income: 520, expense: 310 },
    { month: 'Sep', income: 480, expense: 290 },
    { month: 'Oct', income: 540, expense: 312 },
    { month: 'Nov', income: 580, expense: 340 },
  ];

  const fmt = (n) => `Rp ${n.toLocaleString('id-ID')}`;

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-extrabold dark:text-white">Laporan Keuangan</h2>
          <p className="text-slate-500 text-sm">Ringkasan laporan finansial periode berjalan</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-lg outline-none">
            <option>Bulanan</option><option>Mingguan</option><option>Tahunan</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-sm font-bold rounded-lg"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg"><span className="material-symbols-outlined text-lg">table_chart</span>Excel</button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total Pendapatan', value: fmt(totalIncome), color: 'green', icon: 'trending_up' },
          { label: 'Total Pengeluaran', value: fmt(totalExpense), color: 'red', icon: 'trending_down' },
          { label: 'Laba Kotor', value: fmt(labaKotor), color: 'blue', icon: 'account_balance' },
          { label: 'Pajak (10%)', value: fmt(pajak), color: 'amber', icon: 'receipt' },
          { label: 'Laba Bersih', value: fmt(labaBersih), color: 'emerald', icon: 'savings' },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className={`size-10 bg-${item.color}-100 dark:bg-${item.color}-900/30 text-${item.color}-600 rounded-lg flex items-center justify-center mb-3`}>
              <span className="material-symbols-outlined">{item.icon}</span>
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase mb-1">{item.label}</p>
            <p className="text-xl font-bold dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-8">
        <h3 className="font-bold mb-6 dark:text-white">Tren Pendapatan vs Pengeluaran (Juta Rp)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <Tooltip />
            <Bar dataKey="income" name="Pendapatan" fill="#1d283a" radius={[4,4,0,0]} barSize={20} />
            <Bar dataKey="expense" name="Pengeluaran" fill="#cbd5e1" radius={[4,4,0,0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detail */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold dark:text-white">Detail Transaksi Periode Ini</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-3 font-semibold">Tanggal</th><th className="px-6 py-3 font-semibold">Kategori</th><th className="px-6 py-3 font-semibold">Keterangan</th><th className="px-6 py-3 font-semibold">Tipe</th><th className="px-6 py-3 font-semibold text-right">Jumlah</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 text-sm">
                  <td className="px-6 py-3 text-slate-500">{t.date}</td>
                  <td className="px-6 py-3">{t.category}</td>
                  <td className="px-6 py-3 dark:text-slate-300">{t.description}</td>
                  <td className="px-6 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{t.type === 'income' ? 'Masuk' : 'Keluar'}</span></td>
                  <td className={`px-6 py-3 text-right font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{t.type === 'income' ? '+' : '-'} {fmt(t.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
