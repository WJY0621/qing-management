
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import Layout from '../components/Layout';
import { GOAL_CONFIG } from '../constants';

const Profile: React.FC = () => {
  const { user, logout } = useAppState();
  const navigate = useNavigate();

  if (!user) return null;

  const bmi = (user.weight / ((user.height / 100) ** 2)).toFixed(1);

  const bmiStatus = useMemo(() => {
    const val = parseFloat(bmi);
    if (val < 18.5) return { color: 'bg-blue-400', label: '偏瘦' };
    if (val < 24) return { color: 'bg-emerald-500', label: '正常' };
    return { color: 'bg-orange-500', label: '偏胖' };
  }, [bmi]);

  return (
    <Layout>
      <header className="px-6 pt-10 pb-6">
        <h2 className="text-[22px] font-black text-slate-900 tracking-tight text-center">个人中心</h2>
      </header>

      <div className="px-6 space-y-6 pb-12">
        {/* Body Data Card - Enhanced Contrast */}
        <div className="bg-[#f2f6f9] rounded-[2.8rem] shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-8 pb-10 bg-white rounded-b-[2.5rem] shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-[12px] font-black text-slate-500 uppercase tracking-[0.2em]">身体数据</h3>
              <button 
                onClick={() => navigate('/profile/edit')}
                className="bg-primary/10 text-primary text-[11px] font-black px-4 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <span>修改</span>
                <span className="material-symbols-outlined text-[16px]">settings_accessibility</span>
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-y-12">
              <div className="flex flex-col">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">性别</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">
                  {user.gender === 'MALE' ? '男' : '女'}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">年龄</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">
                  {user.age} <span className="text-[10px] font-black text-slate-300 uppercase ml-0.5">Yrs</span>
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">BMI</p>
                <div className="flex items-center gap-2">
                   <p className="text-2xl font-black text-slate-900 tracking-tight">{bmi}</p>
                   <div className={`size-3 rounded-full ${bmiStatus.color} shadow-sm ring-4 ring-white transition-colors duration-500`} title={bmiStatus.label} />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">身高</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">
                  {user.height} <span className="text-[10px] font-black text-slate-300 uppercase ml-0.5">cm</span>
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">体重</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">
                  {user.weight} <span className="text-[10px] font-black text-slate-300 uppercase ml-0.5">kg</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-[12px] font-black mb-8 text-slate-500 uppercase tracking-[0.2em]">饮食目标状态</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="size-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined text-3xl filled">{GOAL_CONFIG[user.goal].icon}</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">当前目标</p>
                    <p className="text-[18px] font-black text-slate-900 tracking-tight">{GOAL_CONFIG[user.goal].label}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full border border-emerald-200">进行中</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button - Higher Contrast */}
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 h-14 rounded-[2rem] bg-slate-900 text-white font-black text-sm active:scale-[0.98] transition-all shadow-xl shadow-slate-200"
        >
          <span className="material-symbols-outlined text-xl">power_settings_new</span>
          <span className="tracking-widest uppercase">退出当前账号</span>
        </button>
      </div>
    </Layout>
  );
};

export default Profile;
