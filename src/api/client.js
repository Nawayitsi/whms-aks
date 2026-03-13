const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  const saved = localStorage.getItem('aks_token');
  return saved || null;
}

export async function api(endpoint, options = {}) {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

export const apiGet = (endpoint) => api(endpoint);
export const apiPost = (endpoint, body) => api(endpoint, { method: 'POST', body: JSON.stringify(body) });
export const apiPut = (endpoint, body) => api(endpoint, { method: 'PUT', body: JSON.stringify(body) });
export const apiDelete = (endpoint) => api(endpoint, { method: 'DELETE' });
