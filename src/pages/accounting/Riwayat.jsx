import { useData } from '../../context/DataContext';

export default function Riwayat() {
  const { transactions } = useData();
  const logs = transactions.map((t, i) => ({
    id: i + 1,
    action: t.type === 'income' ? 'Menambah pemasukan' : 'Menambah pengeluaran',
    target: `${t.description} (${t.id})`,
    user: t.createdBy || 'admin',
    timestamp: t.date + ' 08:' + String(30 + i).padStart(2, '0'),
    type: t.type,
  }));

  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold dark:text-white">Riwayat Transaksi</h2>
        <p className="text-slate-500 text-sm">Log perubahan data dan audit trail</p>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 font-semibold">#</th><th className="px-6 py-4 font-semibold">Aksi</th><th className="px-6 py-4 font-semibold">Detail</th><th className="px-6 py-4 font-semibold">User</th><th className="px-6 py-4 font-semibold">Timestamp</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 text-slate-400">{log.id}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${log.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{log.action}</span></td>
                  <td className="px-6 py-4 dark:text-slate-300">{log.target}</td>
                  <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="size-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">{log.user[0].toUpperCase()}</div><span className="font-medium">{log.user}</span></div></td>
                  <td className="px-6 py-4 text-slate-500">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
