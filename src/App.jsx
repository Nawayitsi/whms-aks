import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import AdminMain from './pages/AdminMain';
import AccDashboard from './pages/accounting/Dashboard';
import Transaksi from './pages/accounting/Transaksi';
import Pemasukan from './pages/accounting/Pemasukan';
import Pengeluaran from './pages/accounting/Pengeluaran';
import Gaji from './pages/accounting/Gaji';
import BiayaProduksi from './pages/accounting/BiayaProduksi';
import Laporan from './pages/accounting/Laporan';
import Riwayat from './pages/accounting/Riwayat';
import InvDashboard from './pages/inventory/Dashboard';
import BahanBaku from './pages/inventory/BahanBaku';
import Sparepart from './pages/inventory/Sparepart';
import ProdukJadi from './pages/inventory/ProdukJadi';
import TransaksiStok from './pages/inventory/TransaksiStok';
import LaporanStok from './pages/inventory/LaporanStok';
import RiwayatStok from './pages/inventory/RiwayatStok';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/admin" replace />;
  return children;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <Login />} />
      <Route path="/admin" element={<ProtectedRoute><AdminMain /></ProtectedRoute>} />
      <Route path="/accounting" element={<ProtectedRoute allowedRoles={['ADMIN','STAFF_AKUNTING']}><Layout module="accounting" /></ProtectedRoute>}>
        <Route index element={<AccDashboard />} />
        <Route path="transaksi" element={<Transaksi />} />
        <Route path="pemasukan" element={<Pemasukan />} />
        <Route path="pengeluaran" element={<Pengeluaran />} />
        <Route path="gaji" element={<Gaji />} />
        <Route path="produksi" element={<BiayaProduksi />} />
        <Route path="laporan" element={<Laporan />} />
        <Route path="riwayat" element={<Riwayat />} />
      </Route>
      <Route path="/inventory" element={<ProtectedRoute allowedRoles={['ADMIN','STAFF_GUDANG']}><Layout module="inventory" /></ProtectedRoute>}>
        <Route index element={<InvDashboard />} />
        <Route path="bahan-baku" element={<BahanBaku />} />
        <Route path="sparepart" element={<Sparepart />} />
        <Route path="produk-jadi" element={<ProdukJadi />} />
        <Route path="transaksi" element={<TransaksiStok />} />
        <Route path="laporan" element={<LaporanStok />} />
        <Route path="riwayat" element={<RiwayatStok />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
