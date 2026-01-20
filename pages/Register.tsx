
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';

const Register: React.FC = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { register, isLoggedIn, isLoading } = useAppState();

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

  const handleRegister = async () => {
    if (!account || !password || !confirmPassword) {
      setError('请完整填写所有信息');
      return;
    }
    
    if (password.length < 6) {
      setError('密码长度至少需要 6 位');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    try {
      await register(account, password);
      navigate('/onboarding');
    } catch (err: any) {
      console.error('Registration error:', err);
      // Handle "User already registered" error from Supabase
      if (err.message && (err.message.includes('already registered') || err.message.includes('User already exists'))) {
        setError('该邮箱已被注册，请直接登录');
      } else if (err.message && err.message.includes('Password should be at least')) {
        setError('密码长度至少需要 6 位');
      } else {
        setError(err.message || '注册失败，请稍后重试');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative">
      {/* 返回按钮头部 */}
      <header className="absolute top-0 left-0 right-0 h-16 flex items-center px-4 z-10">
        <button 
          onClick={() => navigate('/login')}
          className="size-10 flex items-center justify-center text-slate-400 active:scale-90 transition-all -ml-2"
        >
          <span className="material-symbols-outlined text-3xl font-light">chevron_left</span>
        </button>
      </header>

      <div className="flex flex-col items-center px-6 pt-24 pb-8 flex-1">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-[22px] flex items-center justify-center mb-6 shadow-sm border border-primary/20">
            <span className="material-symbols-outlined text-primary text-5xl filled">eco</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">快速注册</h1>
          <p className="text-slate-500 text-sm mt-2 font-bold">加入我们的健康营养社区</p>
        </div>

        <div className="w-full space-y-5">
          <div className="flex flex-col">
            <p className="text-slate-700 text-sm font-black pb-2 pl-1">邮箱</p>
            <input
              className={`w-full rounded-[18px] border-slate-200 bg-[#f1f5f9] h-14 px-5 text-base focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-300 shadow-inner ${error && error.includes('账号') ? 'border-red-400' : ''}`}
              placeholder="请输入您的邮箱"
              value={account}
              onChange={(e) => {
                setAccount(e.target.value);
                setError('');
              }}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-slate-700 text-sm font-black pb-2 pl-1">设置密码</p>
            <div className="relative">
              <input
                className={`w-full rounded-[18px] border-slate-200 bg-[#f1f5f9] h-14 px-5 pr-12 text-base focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-300 shadow-inner ${error && error.includes('一致') ? 'border-red-400' : ''}`}
                placeholder="请输入 6-16 位密码"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
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

          <div className="flex flex-col">
            <p className="text-slate-700 text-sm font-black pb-2 pl-1">确认密码</p>
            <div className="relative">
              <input
                className={`w-full rounded-[18px] border-slate-200 bg-[#f1f5f9] h-14 px-5 pr-12 text-base focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-300 shadow-inner ${error && error.includes('一致') ? 'border-red-400' : ''}`}
                placeholder="请再次输入密码"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-1 hover:text-slate-600 transition-colors"
              >
                <span className={`material-symbols-outlined ${showConfirmPassword ? 'filled text-primary' : ''}`}>
                  {showConfirmPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 pl-1">
               <span className="material-symbols-outlined text-red-500 text-sm filled">error</span>
               <p className="text-red-500 text-xs font-black">{error}</p>
            </div>
          )}

          <div className="pt-6">
            <button
              onClick={handleRegister}
              className="w-full h-14 bg-primary text-white font-black rounded-full shadow-xl shadow-primary/30 active:scale-[0.98] transition-all tracking-tight"
            >
              立即注册
            </button>
          </div>
        </div>

        <div className="mt-auto pt-20 pb-10 flex flex-col items-center">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <span>已有账号？</span>
            <button 
              onClick={() => navigate('/login')}
              className="text-primary font-black decoration-2 underline-offset-4 hover:underline"
            >
              立即登录
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
