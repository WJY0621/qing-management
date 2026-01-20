
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { resetPassword } = useAppState();

  const handleReset = async () => {
    if (!email) {
      setError('请输入您的注册邮箱');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await resetPassword(email);
      setMessage('重置密码链接已发送至您的邮箱，请查收。');
    } catch (err: any) {
      setError(err.message || '发送失败，请检查邮箱是否正确');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative">
      <header className="absolute top-0 left-0 right-0 h-16 flex items-center px-4 z-10">
        <button 
          onClick={() => navigate('/login')}
          className="size-10 flex items-center justify-center text-slate-400 active:scale-90 transition-all -ml-2"
        >
          <span className="material-symbols-outlined text-3xl font-light">chevron_left</span>
        </button>
      </header>

      <div className="flex flex-col items-center px-6 pt-24 pb-8 flex-1">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-[22px] flex items-center justify-center mb-6 shadow-sm border border-primary/20">
            <span className="material-symbols-outlined text-primary text-5xl filled">lock_reset</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">找回密码</h1>
          <p className="text-slate-500 text-sm mt-2 font-bold">请输入您的注册邮箱</p>
        </div>

        <div className="w-full space-y-5">
          {message ? (
             <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3 items-start">
               <span className="material-symbols-outlined text-green-500 mt-0.5">check_circle</span>
               <div>
                 <p className="text-green-800 font-bold text-sm">{message}</p>
                 <button 
                   onClick={() => navigate('/login')}
                   className="text-green-600 text-xs font-bold mt-2 hover:underline"
                 >
                   返回登录
                 </button>
               </div>
             </div>
          ) : (
            <>
              <div className="flex flex-col">
                <p className="text-slate-700 text-sm font-black pb-2 pl-1">邮箱地址</p>
                <input
                  className={`w-full rounded-[18px] border-slate-200 bg-[#f1f5f9] h-14 px-5 text-base focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-300 shadow-inner ${error ? 'border-red-400' : ''}`}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                />
              </div>

              {error && (
                <div className="flex items-center gap-1.5 pl-1">
                   <span className="material-symbols-outlined text-red-500 text-sm filled">error</span>
                   <p className="text-red-500 text-xs font-black">{error}</p>
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="w-full h-14 bg-primary text-white font-black rounded-full shadow-xl shadow-primary/30 active:scale-[0.98] transition-all tracking-tight disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {loading && <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  发送重置链接
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
