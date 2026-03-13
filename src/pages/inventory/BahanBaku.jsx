import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function BahanBaku() {
  const { inventoryRaw, addInventoryRaw, updateInventoryRaw, deleteInventoryRaw } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Tembakau', stock: '', unit: 'Kg', supplier: '', minStock: '' });

  const categories = ['all', ...new Set(inventoryRaw.map(i => i.category))];
  const filtered = inventoryRaw.filter(i => {
    const ms = i.name.toLowerCase().includes(search.toLowerCase()) || i.supplier?.toLowerCase().includes(search.toLowerCase());
    return ms && (filterCat === 'all' || i.category === filterCat);
  });

  const openAdd = () => { setEditItem(null); setForm({ name: '', category: 'Tembakau', stock: '', unit: 'Kg', supplier: '', minStock: '' }); setIsModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item, stock: String(item.stock), minStock: String(item.minStock || '') }); setIsModalOpen(true); };
  const handleSave = () => {
    const data = { ...form, stock: Number(form.stock), minStock: Number(form.minStock) };
    if (editItem) { updateInventoryRaw(editItem.id, data); addToast('Data berhasil diperbarui'); }
    else { addInventoryRaw(data); addToast('Bahan baku baru ditambahkan'); }
    setIsModalOpen(false);
  };
  const handleDelete = (id) => { if (confirm('Hapus?')) { deleteInventoryRaw(id); addToast('Dihapus', 'warning'); } };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-2xl font-extrabold dark:text-white">Stok Bahan Baku</h2><p className="text-slate-500 text-sm">Kelola stok bahan baku produksi rokok</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg"><span className="material-symbols-outlined text-lg">add</span>Tambah Bahan Baku</button>
      </div>
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative"><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span><input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-3 text-sm outline-none" placeholder="Cari bahan baku..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${filterCat === cat ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>{cat === 'all' ? 'Semua' : cat}</button>
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-4 font-semibold">Nama</th><th className="px-6 py-4 font-semibold">Kategori</th><th className="px-6 py-4 font-semibold">Stok</th><th className="px-6 py-4 font-semibold">Supplier</th><th className="px-6 py-4 font-semibold">Status</th><th className="px-6 py-4 font-semibold text-right">Aksi</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(item => {
                const pct = item.minStock ? Math.round((item.stock / item.minStock) * 100) : 100;
                const isLow = pct <= 100;
                return (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center"><span className="material-symbols-outlined text-slate-400">inventory_2</span></div><span className="font-bold">{item.name}</span></div></td>
                    <td className="px-6 py-4"><span className="px-2 py-1 rounded text-[10px] font-bold bg-blue-50 text-blue-600 uppercase">{item.category}</span></td>
                    <td className="px-6 py-4 font-bold">{item.stock.toLocaleString()} <span className="text-slate-400 font-normal text-xs">{item.unit}</span></td>
                    <td className="px-6 py-4 text-slate-500">{item.supplier}</td>
                    <td className="px-6 py-4">{item.stock <= (item.minStock || 0) ? <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">Low Stock</span> : <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">Aman</span>}</td>
                    <td className="px-6 py-4 text-right"><div className="flex justify-end gap-1"><button onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg"><span className="material-symbols-outlined text-lg">edit</span></button><button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><span className="material-symbols-outlined text-lg">delete</span></button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500">Total: {filtered.length} item</div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? 'Edit Bahan Baku' : 'Tambah Bahan Baku'}>
        <div className="space-y-4">
          <div><label className="text-sm font-semibold mb-1 block">Nama</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold mb-1 block">Kategori</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none"><option>Tembakau</option><option>Cengkeh</option><option>Kertas Rokok</option><option>Filter</option><option>Kemasan</option></select></div>
            <div><label className="text-sm font-semibold mb-1 block">Satuan</label><input value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold mb-1 block">Jumlah Stok</label><input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
            <div><label className="text-sm font-semibold mb-1 block">Min. Stok</label><input type="number" value={form.minStock} onChange={e => setForm({...form, minStock: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          </div>
          <div><label className="text-sm font-semibold mb-1 block">Supplier</label><input value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div className="flex justify-end gap-3 pt-4"><button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-semibold">Batal</button><button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">Simpan</button></div>
        </div>
      </Modal>
    </div>
  );
}
