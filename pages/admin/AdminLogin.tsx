
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../../state';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAppState();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('请输入邮箱和密码');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // 1. Login normally
      const { user } = await login(email, password);
      
      if (!user) throw new Error('登录失败');

      // 2. Check admin role
      const { data, error: roleError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (roleError || data?.role !== 'admin') {
        throw new Error('该账号没有管理员权限');
      }

      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-slate-900/20">
            <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">后台管理系统</h1>
          <p className="text-slate-500 text-sm mt-1">请使用管理员账号登录</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-0 transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-0 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-bold px-4 py-3 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading && <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            登录系统
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <button onClick={() => navigate('/login')} className="text-sm text-slate-400 hover:text-slate-600">返回 App 登录</button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
