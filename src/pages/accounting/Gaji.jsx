import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/Modal';

export default function Gaji() {
  const { salaries, addSalary, updateSalary, deleteSalary } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ employeeName: '', division: 'Produksi', nik: '', baseSalary: '', bonus: '', deduction: '', date: '' });

  const filtered = salaries.filter(s => s.employeeName.toLowerCase().includes(search.toLowerCase()) || s.nik.includes(search));
  const totalGaji = filtered.reduce((s, sal) => s + sal.totalSalary, 0);
  const totalBonus = filtered.reduce((s, sal) => s + sal.bonus, 0);
  const totalPotongan = filtered.reduce((s, sal) => s + sal.deduction, 0);

  const openAdd = () => { setEditItem(null); setForm({ employeeName: '', division: 'Produksi', nik: '', baseSalary: '', bonus: '', deduction: '0', date: new Date().toISOString().split('T')[0] }); setIsModalOpen(true); };
  const openEdit = (s) => { setEditItem(s); setForm({ ...s, baseSalary: String(s.baseSalary), bonus: String(s.bonus), deduction: String(s.deduction) }); setIsModalOpen(true); };

  const handleSave = () => {
    const data = { ...form, baseSalary: Number(form.baseSalary), bonus: Number(form.bonus), deduction: Number(form.deduction) };
    if (editItem) { updateSalary(editItem.id, data); addToast('Data gaji berhasil diperbarui'); }
    else { addSalary(data); addToast('Data gaji baru berhasil ditambahkan'); }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => { if (confirm('Hapus data gaji ini?')) { deleteSalary(id); addToast('Data gaji dihapus', 'warning'); } };

  const kpis = [
    { label: 'Total Pengeluaran Gaji', value: `Rp ${totalGaji.toLocaleString('id-ID')}`, icon: 'payments', color: 'emerald', badge: '+12% vs bln lalu' },
    { label: 'Total Karyawan Dibayar', value: `${filtered.length} Orang`, icon: 'groups', color: 'amber', badge: 'Tetap' },
    { label: 'Rata-rata Bonus', value: `Rp ${filtered.length ? Math.round(totalBonus / filtered.length).toLocaleString('id-ID') : 0}`, icon: 'precision_manufacturing', color: 'blue', badge: 'Target Tercapai' },
  ];

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white">Gaji Karyawan</h2>
          <p className="text-slate-500">Manajemen penggajian bulanan</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-sm font-bold rounded-lg hover:bg-slate-300"><span className="material-symbols-outlined text-lg">file_download</span>Export PDF</button>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90"><span className="material-symbols-outlined text-lg">add</span>Tambah Gaji Baru</button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Cari nama atau NIK karyawan..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-4 py-4 font-semibold">Karyawan</th>
                <th className="px-4 py-4 font-semibold">Gaji Pokok</th>
                <th className="px-4 py-4 font-semibold">Bonus Produksi</th>
                <th className="px-4 py-4 font-semibold">Potongan</th>
                <th className="px-4 py-4 font-semibold">Total Gaji</th>
                <th className="px-4 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">{s.employeeName.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                      <div><p className="font-bold">{s.employeeName}</p><p className="text-slate-500 text-xs">{s.division} • NIK: {s.nik}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-700 dark:text-slate-300 font-medium">Rp {s.baseSalary.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-4 text-emerald-600 font-medium">+ Rp {s.bonus.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-4 text-rose-600 font-medium">- Rp {s.deduction.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-4 font-bold">Rp {s.totalSalary.toLocaleString('id-ID')}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(s)} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><span className="material-symbols-outlined">edit</span></button>
                      <button onClick={() => handleDelete(s.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg"><span className="material-symbols-outlined">delete</span></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 dark:bg-slate-800/30 font-bold">
                <td className="px-4 py-4">Total Periode Ini</td>
                <td className="px-4 py-4">Rp {filtered.reduce((s, sal) => s + sal.baseSalary, 0).toLocaleString('id-ID')}</td>
                <td className="px-4 py-4 text-emerald-600">Rp {totalBonus.toLocaleString('id-ID')}</td>
                <td className="px-4 py-4 text-rose-600">Rp {totalPotongan.toLocaleString('id-ID')}</td>
                <td className="px-4 py-4 text-primary dark:text-white text-lg">Rp {totalGaji.toLocaleString('id-ID')}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-${k.color}-100 dark:bg-${k.color}-900/30 text-${k.color}-600 rounded-lg`}><span className="material-symbols-outlined">{k.icon}</span></div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${k.badge.includes('+') ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-100 dark:bg-slate-800'}`}>{k.badge}</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{k.label}</p>
            <p className="text-2xl font-black mt-1">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editItem ? 'Edit Data Gaji' : 'Tambah Data Gaji'}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Nama Karyawan</label><input value={form.employeeName} onChange={e => setForm({...form, employeeName: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">NIK</label><input value={form.nik} onChange={e => setForm({...form, nik: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
          </div>
          <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Divisi</label><select value={form.division} onChange={e => setForm({...form, division: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none"><option>Produksi</option><option>Gudang</option><option>Administrasi</option></select></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Gaji Pokok</label><input type="number" value={form.baseSalary} onChange={e => setForm({...form, baseSalary: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Bonus</label><input type="number" value={form.bonus} onChange={e => setForm({...form, bonus: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
            <div><label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Potongan</label><input type="number" value={form.deduction} onChange={e => setForm({...form, deduction: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm outline-none" /></div>
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
