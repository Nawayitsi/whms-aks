import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function ProdukJadi() {
  const { inventoryProduct, addInventoryProduct, updateInventoryProduct, deleteInventoryProduct } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Rokok Kretek', stock: '', unit: 'Karton', sellingPrice: '' });

  const filtered = inventoryProduct.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  const totalKarton = filtered.reduce((s, p) => s + p.stock, 0);
  const totalValue = filtered.reduce((s, p) => s + (p.stock * p.sellingPrice), 0);

  const openAdd = () => { setEditItem(null); setForm({ name: '', category: 'Rokok Kretek', stock: '', unit: 'Karton', sellingPrice: '' }); setIsModalOpen(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item, stock: String(item.stock), sellingPrice: String(item.sellingPrice) }); setIsModalOpen(true); };
  const handleSave = () => { const data = { ...form, stock: Number(form.stock), sellingPrice: Number(form.sellingPrice) }; if (editItem) { updateInventoryProduct(editItem.id, data); addToast('Berhasil diperbarui'); } else { addInventoryProduct(data); addToast('Produk ditambahkan'); } setIsModalOpen(false); };
  const handleDelete = (id) => { if (confirm('Hapus?')) { deleteInventoryProduct(id); addToast('Dihapus', 'warning'); } };

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-2xl font-extrabold dark:text-white">Stok Produk Jadi</h2><p className="text-slate-500 text-sm">Kelola stok rokok siap jual</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg"><span className="material-symbols-outlined text-lg">add</span>Tambah Produk</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Total Produk</p><p className="text-2xl font-black">{filtered.length} <span className="text-sm font-normal text-slate-400">Jenis</span></p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Total Stok</p><p className="text-2xl font-black">{totalKarton.toLocaleString()} <span className="text-sm font-normal text-slate-400">Karton</span></p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Nilai Stok</p><p className="text-2xl font-black">Rp {totalValue.toLocaleString('id-ID')}</p>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
        <div className="relative"><span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span><input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-3 text-sm outline-none" placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} /></div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase border-b border-slate-200 dark:border-slate-800"><th className="px-6 py-4 font-semibold">Produk</th><th className="px-6 py-4 font-semibold">Kategori</th><th className="px-6 py-4 font-semibold">Stok</th><th className="px-6 py-4 font-semibold">Harga Jual</th><th className="px-6 py-4 font-semibold">Nilai</th><th className="px-6 py-4 font-semibold text-right">Aksi</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-6 py-4 font-bold">{item.name}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded text-[10px] font-bold bg-green-50 text-green-600 uppercase">{item.category}</span></td>
                  <td className="px-6 py-4 font-bold">{item.stock} <span className="text-slate-400 font-normal text-xs">{item.unit}</span></td>
                  <td className="px-6 py-4">Rp {item.sellingPrice.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 font-bold text-primary dark:text-white">Rp {(item.stock * item.sellingPrice).toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-1"><button onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg"><span className="material-symbols-outlined text-lg">edit</span></button><button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><span className="material-symbols-outlined text-lg">delete</span></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? 'Edit Produk' : 'Tambah Produk'}>
        <div className="space-y-4">
          <div><label className="text-sm font-semibold mb-1 block">Nama Produk</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          <div><label className="text-sm font-semibold mb-1 block">Kategori</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none"><option>Rokok Kretek</option><option>Rokok Filter</option><option>Rokok Mild</option></select></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold mb-1 block">Jumlah Stok</label><input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
            <div><label className="text-sm font-semibold mb-1 block">Harga Jual (Rp)</label><input type="number" value={form.sellingPrice} onChange={e => setForm({...form, sellingPrice: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          </div>
          <div className="flex justify-end gap-3 pt-4"><button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-semibold">Batal</button><button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">Simpan</button></div>
        </div>
      </Modal>
    </div>
  );
}
