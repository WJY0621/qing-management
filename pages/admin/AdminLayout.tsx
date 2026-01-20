
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppState } from '../../state';
import { supabase } from '../../lib/supabase';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAppState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isLoggedIn || !user) {
        navigate('/admin/login');
        return;
      }

      // Check if user has admin role
      // Note: We need to fetch the role specifically if it's not in the User object yet.
      // Since we just added it to the DB schema, we might need to fetch it manually here.
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || data?.role !== 'admin') {
        alert('无权访问后台管理系统');
        navigate('/dashboard'); // Go back to mobile app
        return;
      }

      setIsAdmin(true);
      setChecking(false);
    };

    checkAdmin();
  }, [isLoggedIn, user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const navItems = [
    { label: '数据概览', path: '/admin/dashboard', icon: 'dashboard' },
    { label: '用户管理', path: '/admin/users', icon: 'group' },
    { label: '食谱管理', path: '/admin/recipes', icon: 'menu_book' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="material-symbols-outlined text-primary mr-2">admin_panel_settings</span>
          <h1 className="font-bold text-lg tracking-wide">轻管理后台</h1>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            退出登录
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
