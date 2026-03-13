import { useData } from '../../context/DataContext';

export default function LaporanStok() {
  const { inventoryRaw, inventorySparepart, inventoryProduct, stockMovements } = useData();
  const totalRaw = inventoryRaw.reduce((s, i) => s + i.stock, 0);
  const totalSp = inventorySparepart.reduce((s, i) => s + i.stock, 0);
  const totalPr = inventoryProduct.reduce((s, i) => s + i.stock, 0);
  const cats = {};
  inventoryRaw.forEach(i => { cats[i.category] = (cats[i.category] || 0) + i.stock; });

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div><h2 className="text-2xl font-extrabold dark:text-white">Laporan Stok</h2><p className="text-slate-500 text-sm">Ringkasan stok barang</p></div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-sm font-bold rounded-lg"><span className="material-symbols-outlined text-lg">picture_as_pdf</span>PDF</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg"><span className="material-symbols-outlined text-lg">table_chart</span>Excel</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[{l:'Bahan Baku',v:totalRaw,u:'unit'},{l:'Sparepart',v:totalSp,u:'pcs'},{l:'Produk Jadi',v:totalPr,u:'karton'}].map((k,i)=>(
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800"><p className="text-xs text-slate-500 uppercase font-semibold mb-1">{k.l}</p><p className="text-2xl font-black">{k.v.toLocaleString()} <span className="text-sm text-slate-400 font-normal">{k.u}</span></p></div>
        ))}
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-8">
        <h3 className="font-bold mb-4">Per Kategori</h3>
        <div className="space-y-3">
          {Object.entries(cats).map(([c,t])=>(<div key={c} className="flex items-center gap-4"><span className="text-sm text-slate-500 w-32">{c}</span><div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{width:`${Math.min(100,(t/totalRaw)*100)}%`}}/></div><span className="text-sm font-bold w-20 text-right">{t.toLocaleString()}</span></div>))}
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800"><h3 className="font-bold">Pergerakan Terbaru</h3></div>
        <table className="w-full text-left text-sm"><thead><tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase border-b"><th className="px-6 py-3">Item</th><th className="px-6 py-3">Tipe</th><th className="px-6 py-3">Jumlah</th><th className="px-6 py-3">Tanggal</th></tr></thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">{stockMovements.map(m=>(<tr key={m.id} className="text-sm"><td className="px-6 py-3 font-medium">{m.itemName}</td><td className="px-6 py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${m.movementType==='in'?'bg-green-100 text-green-700':m.movementType==='out'?'bg-red-100 text-red-700':'bg-amber-100 text-amber-700'}`}>{m.movementType==='in'?'Masuk':m.movementType==='out'?'Keluar':'Adj'}</span></td><td className="px-6 py-3">{Math.abs(m.quantity)} {m.unit}</td><td className="px-6 py-3 text-slate-500">{m.date}</td></tr>))}</tbody></table>
      </div>
    </div>
  );
}
