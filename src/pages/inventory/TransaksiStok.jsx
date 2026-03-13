import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function TransaksiStok() {
  const { stockMovements, addStockMovement } = useData();
  const { addToast } = useToast();
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ itemName: '', itemType: 'raw', movementType: 'in', quantity: '', unit: 'Kg', createdBy: '', notes: '' });

  const filtered = stockMovements.filter(m => filter === 'all' || m.movementType === filter);

  const handleSave = () => {
    addStockMovement({ ...form, quantity: Number(form.quantity) });
    addToast('Transaksi stok berhasil dicatat');
    setIsModalOpen(false);
    setForm({ itemName: '', itemType: 'raw', movementType: 'in', quantity: '', unit: 'Kg', createdBy: '', notes: '' });
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-2xl font-extrabold dark:text-white">Transaksi Stok</h2><p className="text-slate-500 text-sm">Catat pergerakan stok masuk, keluar, dan adjustment</p></div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg"><span className="material-symbols-outlined text-lg">add</span>Catat Transaksi</button>
      </div>
      <div className="flex gap-2 mb-6">
        {['all', 'in', 'out', 'adjustment'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${filter === f ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600'}`}>
            {f === 'all' ? 'Semua' : f === 'in' ? 'Masuk' : f === 'out' ? 'Keluar' : 'Adjustment'}
          </button>
        ))}
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-4 font-semibold">Item</th><th className="px-6 py-4 font-semibold">Tipe</th><th className="px-6 py-4 font-semibold">Jumlah</th><th className="px-6 py-4 font-semibold">Tanggal</th><th className="px-6 py-4 font-semibold">User</th><th className="px-6 py-4 font-semibold">Catatan</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 font-bold">{m.itemName}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${m.movementType === 'in' ? 'bg-green-50 text-green-600' : m.movementType === 'out' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>{m.movementType === 'in' ? 'Masuk' : m.movementType === 'out' ? 'Keluar' : 'Adj'}</span></td>
                  <td className="px-6 py-4 font-medium">{Math.abs(m.quantity)} {m.unit}</td>
                  <td className="px-6 py-4 text-slate-500">{m.date}</td>
                  <td className="px-6 py-4">{m.createdBy}</td>
                  <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">{m.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Catat Transaksi Stok">
        <div className="space-y-4">
          <div><label className="text-sm font-semibold mb-1 block">Nama Item</label><input value={form.itemName} onChange={e => setForm({...form, itemName: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-sm font-semibold mb-1 block">Tipe Gerakan</label><select value={form.movementType} onChange={e => setForm({...form, movementType: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none"><option value="in">Masuk</option><option value="out">Keluar</option><option value="adjustment">Adjustment</option></select></div>
            <div><label className="text-sm font-semibold mb-1 block">Jumlah</label><input type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
            <div><label className="text-sm font-semibold mb-1 block">Satuan</label><input value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          </div>
          <div><label className="text-sm font-semibold mb-1 block">Pencatat</label><input value={form.createdBy} onChange={e => setForm({...form, createdBy: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div><label className="text-sm font-semibold mb-1 block">Catatan</label><input value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div className="flex justify-end gap-3 pt-4"><button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-semibold">Batal</button><button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">Simpan</button></div>
        </div>
      </Modal>
    </div>
  );
}
