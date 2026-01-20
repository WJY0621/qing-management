
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';

const Login: React.FC = () => {
  const [account, setAccount] = useState('');
  const [password, setAccountPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login, loginGuest, isLoggedIn, isLoading } = useAppState();

  React.useEffect(() => {
    if (isLoggedIn && !isLoading) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  const handleLogin = async () => {
    if (!account || !password) {
      setError('请输入邮箱和密码');
      return;
    }

    try {
      await login(account, password);
      navigate('/dashboard');
    } catch (err: any) {
      // Check for specific Supabase error messages
      if (err.message === 'Invalid login credentials') {
        setError('您输入的邮箱或密码存在错误');
      } else {
        setError(err.message || '登录失败，请检查邮箱和密码');
      }
    }
  };

  const handleGuestLogin = async () => {
    try {
      await loginGuest();
      // Wait for auth state change to trigger user fetch in AppProvider
      // Then navigation will happen automatically or manually here
      // But we should check if profile exists first
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.message || '游客登录失败');
    }
  };

  return (
    <div className="flex flex-col items-center px-6 pt-20 pb-8 min-h-screen bg-white max-w-md mx-auto">
      <div className="mb-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-20 h-20 bg-sky-100 rounded-[22px] flex items-center justify-center mb-6 shadow-sm border border-sky-200/50">
          <span className="material-symbols-outlined text-primary text-5xl filled">analytics</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">轻管理</h1>
        <p className="text-slate-500 text-sm mt-2 font-bold">极简身体管理专家</p>
      </div>

      <div className="w-full space-y-6">
        <div className="flex flex-col">
          <p className="text-slate-600 text-[11px] font-black uppercase tracking-widest pb-2 pl-1">邮箱</p>
          <input
            className={`w-full rounded-[18px] border-slate-200 bg-[#f1f5f9] h-14 px-5 text-base focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-300 shadow-inner ${error ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            placeholder="请输入您的邮箱"
            value={account}
            onChange={(e) => {
              setAccount(e.target.value);
              setError('');
            }}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center pb-2 pl-1">
            <p className="text-slate-600 text-[11px] font-black uppercase tracking-widest">密码</p>
            <button 
              onClick={() => navigate('/forgot-password')}
              className="text-primary text-[11px] font-black hover:opacity-70 transition-opacity"
            >
              忘记密码？
            </button>
          </div>
          <div className="relative">
            <input
              className={`w-full rounded-[18px] border-slate-200 bg-[#f1f5f9] h-14 px-5 pr-12 text-base focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-300 shadow-inner ${error ? 'border-red-400 ring-2 ring-red-100' : ''}`}
              placeholder="请输入您的密码"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setAccountPassword(e.target.value);
                setError('');
              }}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-1 hover:text-slate-600 transition-colors"
            >
              <span className={`material-symbols-outlined ${showPassword ? 'filled text-primary' : ''}`}>
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-1.5 pl-1 animate-in fade-in slide-in-from-top-1 duration-300">
            <span className="material-symbols-outlined text-red-500 text-sm filled">error</span>
            <p className="text-red-500 text-xs font-bold">{error}</p>
          </div>
        )}

        <div className="pt-4 space-y-3">
          <button
            onClick={handleLogin}
            className="w-full h-14 bg-primary text-white font-black rounded-full shadow-xl shadow-primary/30 active:scale-[0.98] transition-all tracking-tight"
          >
            进入轻管理
          </button>
          <button
            onClick={handleGuestLogin}
            className="w-full h-14 bg-slate-50 text-slate-500 font-bold rounded-full border border-slate-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">travel_explore</span>
            游客试用
          </button>
        </div>
      </div>

      <div className="mt-auto pb-10 flex flex-col items-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="font-medium">还没有账号？</span>
          <button 
            onClick={() => navigate('/register')}
            className="text-primary font-black decoration-2 underline-offset-4 hover:underline"
          >
            快速注册
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
