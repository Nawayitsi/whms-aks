import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] bg-white dark:bg-slate-900 shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in">
        {/* Left Side: Branding */}
        <div className="hidden md:flex md:w-1/2 relative bg-primary flex-col justify-between p-12 text-white">
          <div className="z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary font-bold">account_balance</span>
              </div>
              <span className="text-2xl font-black tracking-tight">AKS System</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              The Smart Way to Manage Your Business.
            </h1>
            <p className="text-slate-300 text-lg">
              Integrated Accounting &amp; Inventory solutions tailored for excellence.
            </p>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-primary to-transparent"></div>
          </div>
          <div className="z-10 mt-auto">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>© 2024 PT Anak Kembar Sejati. All rights reserved.</span>
            </div>
          </div>
        </div>
        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white dark:bg-slate-900">
          <div className="mb-10">
            <div className="md:hidden flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
              <span className="text-xl font-black tracking-tight text-primary">AKS System</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-slate-500 dark:text-slate-400">Please enter your credentials to access your account.</p>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">person</span>
                </div>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-3.5 pl-11 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="Enter your username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Password</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">lock</span>
                </div>
                <input
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-3.5 pl-11 pr-12 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-primary/10" type="submit">
              <span>Sign In to Dashboard</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-400 text-center">Demo: admin/admin123 • akunting/akunting123 • gudang/gudang123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
