
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';

const UpdatePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { updatePassword } = useAppState();

  const handleUpdate = async () => {
    if (!password || !confirmPassword) {
      setError('请填写新密码');
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
      setLoading(true);
      setError('');
      await updatePassword(password);
      setMessage('密码修改成功！');
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (err: any) {
      setError(err.message || '密码修改失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative">
      <header className="absolute top-0 left-0 right-0 h-16 flex items-center px-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="size-10 flex items-center justify-center text-slate-400 active:scale-90 transition-all -ml-2"
        >
          <span className="material-symbols-outlined text-3xl font-light">chevron_left</span>
        </button>
      </header>

      <div className="flex flex-col items-center px-6 pt-24 pb-8 flex-1">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-[22px] flex items-center justify-center mb-6 shadow-sm border border-primary/20">
            <span className="material-symbols-outlined text-primary text-5xl filled">key</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">修改密码</h1>
          <p className="text-slate-500 text-sm mt-2 font-bold">请设置您的新密码</p>
        </div>

        <div className="w-full space-y-5">
           {message ? (
             <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex flex-col items-center gap-3 text-center animate-in fade-in zoom-in duration-300">
               <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
               <p className="text-green-800 font-black text-lg">{message}</p>
             </div>
          ) : (
            <>
              <div className="flex flex-col">
                <p className="text-slate-700 text-sm font-black pb-2 pl-1">新密码</p>
                <div className="relative">
                  <input
                    className={`w-full rounded-[18px] border-slate-200 bg-[#f1f5f9] h-14 px-5 pr-12 text-base focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-300 shadow-inner ${error ? 'border-red-400' : ''}`}
                    placeholder="请输入新密码"
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
                <p className="text-slate-700 text-sm font-black pb-2 pl-1">确认新密码</p>
                <div className="relative">
                  <input
                    className={`w-full rounded-[18px] border-slate-200 bg-[#f1f5f9] h-14 px-5 pr-12 text-base focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-300 shadow-inner ${error ? 'border-red-400' : ''}`}
                    placeholder="请再次输入新密码"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError('');
                    }}
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 pl-1">
                   <span className="material-symbols-outlined text-red-500 text-sm filled">error</span>
                   <p className="text-red-500 text-xs font-black">{error}</p>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="w-full h-14 bg-primary text-white font-black rounded-full shadow-xl shadow-primary/30 active:scale-[0.98] transition-all tracking-tight disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {loading && <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  确认修改
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
