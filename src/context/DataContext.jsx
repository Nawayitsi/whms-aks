import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../api/client';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [productionCosts, setProductionCosts] = useState([]);
  const [inventoryRaw, setInventoryRaw] = useState([]);
  const [inventorySparepart, setInventorySparepart] = useState([]);
  const [inventoryProduct, setInventoryProduct] = useState([]);
  const [stockMovements, setStockMovements] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all data on mount
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        apiGet('/transactions'),
        apiGet('/salaries'),
        apiGet('/production-costs'),
        apiGet('/inventory/raw'),
        apiGet('/inventory/sparepart'),
        apiGet('/inventory/product'),
        apiGet('/stock-movements'),
      ]);
      if (results[0].status === 'fulfilled') setTransactions(results[0].value);
      if (results[1].status === 'fulfilled') setSalaries(results[1].value);
      if (results[2].status === 'fulfilled') setProductionCosts(results[2].value);
      if (results[3].status === 'fulfilled') setInventoryRaw(results[3].value);
      if (results[4].status === 'fulfilled') setInventorySparepart(results[4].value);
      if (results[5].status === 'fulfilled') setInventoryProduct(results[5].value);
      if (results[6].status === 'fulfilled') setStockMovements(results[6].value);
    } catch (err) { console.error('Fetch error:', err); }
    setLoading(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('aks_token');
    if (token) fetchAll();
  }, [fetchAll]);

  // --- Transactions ---
  const addTransaction = async (t) => { const r = await apiPost('/transactions', t); setTransactions(prev => [r, ...prev]); return r; };
  const updateTransaction = async (id, data) => { const r = await apiPut(`/transactions/${id}`, data); setTransactions(prev => prev.map(t => t.id === id ? r : t)); };
  const deleteTransaction = async (id) => { await apiDelete(`/transactions/${id}`); setTransactions(prev => prev.filter(t => t.id !== id)); };

  // --- Salaries ---
  const addSalary = async (s) => { const r = await apiPost('/salaries', s); setSalaries(prev => [...prev, r]); return r; };
  const updateSalary = async (id, data) => { const r = await apiPut(`/salaries/${id}`, data); setSalaries(prev => prev.map(s => s.id === id ? r : s)); };
  const deleteSalary = async (id) => { await apiDelete(`/salaries/${id}`); setSalaries(prev => prev.filter(s => s.id !== id)); };

  // --- Production Costs ---
  const addProductionCost = async (pc) => { const r = await apiPost('/production-costs', pc); setProductionCosts(prev => [r, ...prev]); return r; };
  const updateProductionCost = async (id, data) => { const r = await apiPut(`/production-costs/${id}`, data); setProductionCosts(prev => prev.map(pc => pc.id === id ? r : pc)); };
  const deleteProductionCost = async (id) => { await apiDelete(`/production-costs/${id}`); setProductionCosts(prev => prev.filter(pc => pc.id !== id)); };

  // --- Inventory Raw ---
  const addInventoryRaw = async (item) => { const r = await apiPost('/inventory/raw', item); setInventoryRaw(prev => [...prev, r]); };
  const updateInventoryRaw = async (id, data) => { const r = await apiPut(`/inventory/raw/${id}`, data); setInventoryRaw(prev => prev.map(i => i.id === id ? r : i)); };
  const deleteInventoryRaw = async (id) => { await apiDelete(`/inventory/raw/${id}`); setInventoryRaw(prev => prev.filter(i => i.id !== id)); };

  // --- Inventory Sparepart ---
  const addInventorySparepart = async (item) => { const r = await apiPost('/inventory/sparepart', item); setInventorySparepart(prev => [...prev, r]); };
  const updateInventorySparepart = async (id, data) => { const r = await apiPut(`/inventory/sparepart/${id}`, data); setInventorySparepart(prev => prev.map(i => i.id === id ? r : i)); };
  const deleteInventorySparepart = async (id) => { await apiDelete(`/inventory/sparepart/${id}`); setInventorySparepart(prev => prev.filter(i => i.id !== id)); };

  // --- Inventory Product ---
  const addInventoryProduct = async (item) => { const r = await apiPost('/inventory/product', item); setInventoryProduct(prev => [...prev, r]); };
  const updateInventoryProduct = async (id, data) => { const r = await apiPut(`/inventory/product/${id}`, data); setInventoryProduct(prev => prev.map(i => i.id === id ? r : i)); };
  const deleteInventoryProduct = async (id) => { await apiDelete(`/inventory/product/${id}`); setInventoryProduct(prev => prev.filter(i => i.id !== id)); };

  // --- Stock Movements ---
  const addStockMovement = async (mov) => { const r = await apiPost('/stock-movements', mov); setStockMovements(prev => [r, ...prev]); };

  // Activity log (derived from movements)
  const activityLog = stockMovements.slice(0, 5).map((m, i) => ({
    id: m.id, user: m.created_by || 'Sistem',
    action: m.movement_type === 'in' ? 'mencatat penerimaan' : m.movement_type === 'out' ? 'mencatat pengeluaran' : 'melakukan adjustment',
    target: `${m.item_name} (${Math.abs(m.quantity)} ${m.unit})`,
    time: m.date, color: m.movement_type === 'in' ? 'green' : m.movement_type === 'out' ? 'red' : 'blue',
  }));

  return (
    <DataContext.Provider value={{
      loading, fetchAll,
      transactions, addTransaction, updateTransaction, deleteTransaction,
      salaries, addSalary, updateSalary, deleteSalary,
      productionCosts, addProductionCost, updateProductionCost, deleteProductionCost,
      inventoryRaw, addInventoryRaw, updateInventoryRaw, deleteInventoryRaw,
      inventorySparepart, addInventorySparepart, updateInventorySparepart, deleteInventorySparepart,
      inventoryProduct, addInventoryProduct, updateInventoryProduct, deleteInventoryProduct,
      stockMovements, addStockMovement,
      activityLog,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
