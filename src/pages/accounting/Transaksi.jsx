import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function Transaksi() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ type: 'income', category: '', amount: '', description: '', date: '', status: 'Lunas' });

  const filtered = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || t.type === filterType;
    return matchSearch && matchType;
  });

  const openAdd = () => { setEditItem(null); setForm({ type: 'income', category: 'Penjualan', amount: '', description: '', date: new Date().toISOString().split('T')[0], status: 'Lunas' }); setIsModalOpen(true); };
  const openEdit = (t) => { setEditItem(t); setForm({ ...t, amount: String(t.amount) }); setIsModalOpen(true); };

  const handleSave = () => {
    const data = { ...form, amount: Number(form.amount) };
    if (editItem) { updateTransaction(editItem.id, data); addToast('Transaksi berhasil diperbarui'); }
    else { addTransaction(data); addToast('Transaksi baru berhasil ditambahkan'); }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Hapus transaksi ini?')) { deleteTransaction(id); addToast('Transaksi dihapus', 'warning'); }
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Semua Transaksi</h2>
          <p className="text-slate-500 text-sm">Kelola semua pemasukan dan pengeluaran</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90"><span className="material-symbols-outlined text-lg">add</span>Tambah Transaksi</button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Cari transaksi..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            {['all', 'income', 'expense'].map(f => (
              <button key={f} onClick={() => setFilterType(f)} className={`px-4 py-2 rounded-lg text-sm font-semibold ${filterType === f ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                {f === 'all' ? 'Semua' : f === 'income' ? 'Pemasukan' : 'Pengeluaran'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">Tanggal</th>
                <th className="px-6 py-4 font-semibold">Tipe</th>
                <th className="px-6 py-4 font-semibold">Kategori</th>
                <th className="px-6 py-4 font-semibold">Keterangan</th>
                <th className="px-6 py-4 font-semibold">Jumlah</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-primary dark:text-slate-300">#{t.id}</td>
                  <td className="px-6 py-4 text-slate-500">{t.date}</td>
                  <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${t.type === 'income' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-red-50 dark:bg-red-900/20 text-red-600'}`}>{t.type === 'income' ? 'Masuk' : 'Keluar'}</span></td>
                  <td className="px-6 py-4">{t.category}</td>
                  <td className="px-6 py-4 dark:text-slate-300 max-w-[200px] truncate">{t.description}</td>
                  <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{t.type === 'income' ? '+' : '-'} Rp {t.amount.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4"><span className={`flex items-center gap-1.5 font-medium ${t.status === 'Lunas' ? 'text-green-600' : 'text-amber-600'}`}><span className={`size-1.5 rounded-full ${t.status === 'Lunas' ? 'bg-green-500' : 'bg-amber-500'}`} />{t.status}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(t)} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button onClick={() => handleDelete(t.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500">Menampilkan {filtered.length} transaksi</div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Tipe</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none"><option value="income">Pemasukan</option><option value="expense">Pengeluaran</option></select></div>
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Kategori</label><input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          </div>
          <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Jumlah (Rp)</label><input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Keterangan</label><input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Tanggal</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Status</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none"><option>Lunas</option><option>Menunggu</option></select></div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold">Batal</button>
            <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90">Simpan</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
