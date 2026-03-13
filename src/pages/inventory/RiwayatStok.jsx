import { useData } from '../../context/DataContext';

export default function RiwayatStok() {
  const { stockMovements } = useData();
  return (
    <div className="p-8 animate-fade-in">
      <div className="mb-6"><h2 className="text-2xl font-extrabold dark:text-white">Riwayat Pergerakan Barang</h2><p className="text-slate-500 text-sm">Log pergerakan stok lengkap</p></div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead><tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-4">#</th><th className="px-6 py-4">Item</th><th className="px-6 py-4">Tipe</th><th className="px-6 py-4">Jumlah</th><th className="px-6 py-4">Pencatat</th><th className="px-6 py-4">Catatan</th><th className="px-6 py-4">Tanggal</th></tr></thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {stockMovements.map((m, i) => (
              <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-6 py-4 text-slate-400">{i+1}</td>
                <td className="px-6 py-4 font-bold">{m.itemName}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${m.movementType==='in'?'bg-green-50 text-green-600':m.movementType==='out'?'bg-red-50 text-red-600':'bg-amber-50 text-amber-600'}`}>{m.movementType==='in'?'Masuk':m.movementType==='out'?'Keluar':'Adj'}</span></td>
                <td className="px-6 py-4">{Math.abs(m.quantity)} {m.unit}</td>
                <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="size-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">{m.createdBy?.[0]?.toUpperCase()}</div>{m.createdBy}</div></td>
                <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">{m.notes}</td>
                <td className="px-6 py-4 text-slate-500">{m.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
