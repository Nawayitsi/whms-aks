import { createContext, useContext, useState, useEffect } from 'react';
import { apiPost } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aks_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('aks_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aks_user');
      localStorage.removeItem('aks_token');
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      const data = await apiPost('/auth/login', { username, password });
      if (data.success) {
        localStorage.setItem('aks_token', data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      }
      return { success: false, error: 'Login gagal' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
