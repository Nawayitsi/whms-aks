import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function BiayaProduksi() {
  const { productionCosts, addProductionCost, updateProductionCost, deleteProductionCost } = useData();
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ batch: '', tobaccoCost: '', cloveCost: '', paperCost: '', filterCost: '', packagingCost: '', laborCost: '', machineCost: '', date: '' });

  const costLabels = [
    { key: 'tobaccoCost', label: 'Tembakau', icon: 'eco' },
    { key: 'cloveCost', label: 'Cengkeh', icon: 'spa' },
    { key: 'paperCost', label: 'Kertas Rokok', icon: 'description' },
    { key: 'filterCost', label: 'Filter', icon: 'filter_alt' },
    { key: 'packagingCost', label: 'Kemasan', icon: 'inventory_2' },
    { key: 'laborCost', label: 'Tenaga Kerja', icon: 'engineering' },
    { key: 'machineCost', label: 'Operasional Mesin', icon: 'precision_manufacturing' },
  ];

  const openAdd = () => { setEditItem(null); setForm({ batch: '', tobaccoCost: '', cloveCost: '', paperCost: '', filterCost: '', packagingCost: '', laborCost: '', machineCost: '', date: new Date().toISOString().split('T')[0] }); setIsModalOpen(true); };
  const openEdit = (pc) => {
    setEditItem(pc);
    const f = { ...pc };
    costLabels.forEach(cl => f[cl.key] = String(f[cl.key]));
    setForm(f);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const data = { ...form };
    costLabels.forEach(cl => data[cl.key] = Number(data[cl.key]) || 0);
    if (editItem) { updateProductionCost(editItem.id, data); addToast('Biaya produksi berhasil diperbarui'); }
    else { addProductionCost(data); addToast('Data biaya produksi ditambahkan'); }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => { if (confirm('Hapus data ini?')) { deleteProductionCost(id); addToast('Data dihapus', 'warning'); } };

  const totalAll = productionCosts.reduce((s, pc) => s + pc.totalCost, 0);

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Biaya Produksi Rokok</h2>
          <p className="text-slate-500 text-sm">Rincian biaya produksi per batch</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90"><span className="material-symbols-outlined text-lg">add</span>Tambah Data</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 col-span-1">
          <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Total Biaya Produksi</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">Rp {totalAll.toLocaleString('id-ID')}</p>
          <p className="text-xs text-slate-400 mt-1">{productionCosts.length} batch tercatat</p>
        </div>
        {costLabels.slice(0, 3).map((cl, i) => {
          const total = productionCosts.reduce((s, pc) => s + (pc[cl.key] || 0), 0);
          return (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2"><span className="material-symbols-outlined text-slate-400 text-lg">{cl.icon}</span><p className="text-xs text-slate-500 uppercase font-semibold">{cl.label}</p></div>
              <p className="text-xl font-bold">Rp {total.toLocaleString('id-ID')}</p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="px-4 py-4 font-semibold">Batch</th>
                <th className="px-4 py-4 font-semibold">Tanggal</th>
                {costLabels.map(cl => <th key={cl.key} className="px-4 py-4 font-semibold">{cl.label}</th>)}
                <th className="px-4 py-4 font-semibold">Total</th>
                <th className="px-4 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {productionCosts.map(pc => (
                <tr key={pc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-4 font-bold text-primary dark:text-slate-300">{pc.batch}</td>
                  <td className="px-4 py-4 text-slate-500">{pc.date}</td>
                  {costLabels.map(cl => <td key={cl.key} className="px-4 py-4 text-slate-700 dark:text-slate-300 whitespace-nowrap">Rp {(pc[cl.key] || 0).toLocaleString('id-ID')}</td>)}
                  <td className="px-4 py-4 font-bold text-primary dark:text-white whitespace-nowrap">Rp {pc.totalCost.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(pc)} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg"><span className="material-symbols-outlined text-lg">edit</span></button>
                      <button onClick={() => handleDelete(pc.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><span className="material-symbols-outlined text-lg">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? 'Edit Biaya Produksi' : 'Tambah Biaya Produksi'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Batch</label><input value={form.batch} onChange={e => setForm({...form, batch: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" placeholder="BATCH-XXX" /></div>
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Tanggal</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {costLabels.map(cl => (
              <div key={cl.key}><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">{cl.label}</label><input type="number" value={form[cl.key]} onChange={e => setForm({...form, [cl.key]: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-semibold">Batal</button>
            <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold">Simpan</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
