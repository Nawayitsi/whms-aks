import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function Pengeluaran() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ type: 'expense', category: '', amount: '', description: '', date: '', status: 'Lunas' });

  const filtered = transactions.filter(t => t.type === 'expense' && (t.description.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())));
  const total = filtered.reduce((s, t) => s + t.amount, 0);

  const openAdd = () => { setEditItem(null); setForm({ type: 'expense', category: 'Operasional', amount: '', description: '', date: new Date().toISOString().split('T')[0], status: 'Lunas' }); setIsModalOpen(true); };
  const openEdit = (t) => { setEditItem(t); setForm({ ...t, amount: String(t.amount) }); setIsModalOpen(true); };
  const handleSave = () => { const data = { ...form, amount: Number(form.amount) }; if (editItem) { updateTransaction(editItem.id, data); addToast('Berhasil diperbarui'); } else { addTransaction(data); addToast('Berhasil ditambahkan'); } setIsModalOpen(false); };
  const handleDelete = (id) => { if (confirm('Hapus?')) { deleteTransaction(id); addToast('Dihapus', 'warning'); } };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-2xl font-extrabold dark:text-white">Pengeluaran</h2><p className="text-slate-500 text-sm">Semua biaya dan pengeluaran operasional</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg"><span className="material-symbols-outlined text-lg">add</span>Tambah</button>
      </div>
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-4 flex items-center gap-4">
        <div className="flex-1 relative"><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span><input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-3 text-sm outline-none" placeholder="Cari pengeluaran..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <div className="px-4 py-2 rounded-lg text-sm font-bold bg-red-100 text-red-700">Total: Rp {total.toLocaleString('id-ID')}</div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-4 font-semibold">ID</th><th className="px-6 py-4 font-semibold">Tanggal</th><th className="px-6 py-4 font-semibold">Kategori</th><th className="px-6 py-4 font-semibold">Keterangan</th><th className="px-6 py-4 font-semibold">Jumlah</th><th className="px-6 py-4 font-semibold">Status</th><th className="px-6 py-4 font-semibold text-right">Aksi</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 font-bold text-primary dark:text-slate-300">#{t.id}</td>
                  <td className="px-6 py-4 text-slate-500">{t.date}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-600">{t.category}</span></td>
                  <td className="px-6 py-4 dark:text-slate-300">{t.description}</td>
                  <td className="px-6 py-4 font-bold text-red-600">- Rp {t.amount.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4"><span className={`flex items-center gap-1.5 font-medium ${t.status === 'Lunas' ? 'text-green-600' : 'text-amber-600'}`}><span className={`size-1.5 rounded-full ${t.status === 'Lunas' ? 'bg-green-500' : 'bg-amber-500'}`} />{t.status}</span></td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-1"><button onClick={() => openEdit(t)} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg"><span className="material-symbols-outlined text-lg">edit</span></button><button onClick={() => handleDelete(t.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><span className="material-symbols-outlined text-lg">delete</span></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? 'Edit Pengeluaran' : 'Tambah Pengeluaran'}>
        <div className="space-y-4">
          <div><label className="text-sm font-semibold mb-1 block">Kategori</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none"><option>Biaya Produksi</option><option>Operasional</option><option>Pajak & Cukai</option><option>Gaji</option></select></div>
          <div><label className="text-sm font-semibold mb-1 block">Jumlah (Rp)</label><input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div><label className="text-sm font-semibold mb-1 block">Keterangan</label><input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div><label className="text-sm font-semibold mb-1 block">Tanggal</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div className="flex justify-end gap-3 pt-4"><button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-semibold">Batal</button><button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">Simpan</button></div>
        </div>
      </Modal>
    </div>
  );
}
