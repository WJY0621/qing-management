
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state.tsx';
import Layout from '../components/Layout.tsx';
import { Goal } from '../types.ts';

const NUTRITION_STANDARDS = {
  [Goal.BUILD_MUSCLE]: { protein: [1.6, 2.2], carbs: [4.0, 7.0], fatPercent: [0.2, 0.3] },
  [Goal.FAT_LOSS]: { protein: [1.8, 2.5], carbs: [2.0, 4.0], fatPercent: [0.2, 0.35] },
  [Goal.MAINTAIN]: { protein: [1.6, 2.0], carbs: [3.0, 5.0], fatPercent: [0.2, 0.3] }
};

const Dashboard: React.FC = () => {
  const { user } = useAppState();
  const navigate = useNavigate();

  const recommendation = useMemo(() => {
    // Provide default values if user data is incomplete (e.g. guest or new user)
    const weight = user?.weight || 70;
    const goal = user?.goal || Goal.MAINTAIN;
    const std = NUTRITION_STANDARDS[goal];

    const pMin = Math.round(weight * std.protein[0]);
    const pMax = Math.round(weight * std.protein[1]);
    const cMin = Math.round(weight * std.carbs[0]);
    const cMax = Math.round(weight * std.carbs[1]);

    const calMin = Math.round(((pMin * 4) + (cMin * 4)) / (1 - std.fatPercent[0]));
    const calMax = Math.round(((pMax * 4) + (cMax * 4)) / (1 - std.fatPercent[1]));

    const fMin = Math.round((calMin * std.fatPercent[0]) / 9);
    const fMax = Math.round((calMax * std.fatPercent[1]) / 9);

    // Medians for calculations
    const pMid = Math.round((pMin + pMax) / 2);
    const cMid = Math.round((cMin + cMax) / 2);
    const fMid = Math.round((fMin + fMax) / 2);

    return {
      proteinRange: `${pMin}-${pMax}`,
      carbsRange: `${cMin}-${cMax}`,
      fatRange: `${fMin}-${fMax}`,
      calRange: `${calMin.toLocaleString()} - ${calMax.toLocaleString()}`,
      calMin: calMin.toLocaleString(),
      calMax: calMax.toLocaleString(),
      pMid,
      cMid,
      fMid
    };
  }, [user]);

  if (!user || !recommendation) return null;

  const radius = 75;
  const strokeWidth = 14; 
  const circumference = 2 * Math.PI * radius;
  const gap = 2; 
  const totalGrams = recommendation.pMid + recommendation.cMid + recommendation.fMid;
  const totalAvailableArc = circumference - (3 * gap);
  
  const cVisual = (recommendation.cMid / totalGrams) * totalAvailableArc;
  const pVisual = (recommendation.pMid / totalGrams) * totalAvailableArc;
  const fVisual = (recommendation.fMid / totalGrams) * totalAvailableArc;

  const cDash = Math.max(1, cVisual - strokeWidth);
  const pDash = Math.max(1, pVisual - strokeWidth);
  const fDash = Math.max(1, fVisual - strokeWidth);

  const cOffset = -(strokeWidth / 2);
  const pOffset = -(cVisual + gap + strokeWidth / 2);
  const fOffset = -(cVisual + gap + pVisual + gap + strokeWidth / 2);

  return (
    <Layout mainClassName="bg-[#f0f4f9]">
      <div className="flex flex-col flex-1 px-6 pt-6 pb-2">
        {/* Header */}
        <header className="mb-4">
          <h2 className="text-[22px] font-black text-slate-900 tracking-tight">今日营养目标</h2>
        </header>

        {/* Main Chart Card */}
        <section className="mb-6 flex-shrink-0">
          <div className="p-6 bg-white rounded-[2.5rem] shadow-[0_6px_35px_rgba(0,0,0,0.06)] border border-slate-200 relative flex flex-col items-center animate-slide-up">
            <div className="relative size-56 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="size-full -rotate-90">
                <circle cx="100" cy="100" r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth - 4} />
                <circle 
                  cx="100" cy="100" r={radius} fill="none" 
                  stroke="#47C16F" strokeWidth={strokeWidth} 
                  strokeDasharray={`${cDash} ${circumference}`} 
                  strokeDashoffset={cOffset} 
                  strokeLinecap="round" 
                />
                <circle 
                  cx="100" cy="100" r={radius} fill="none" 
                  stroke="#1d8fc9" strokeWidth={strokeWidth} 
                  strokeDasharray={`${pDash} ${circumference}`} 
                  strokeDashoffset={pOffset} 
                  strokeLinecap="round" 
                />
                <circle 
                  cx="100" cy="100" r={radius} fill="none" 
                  stroke="#f28c38" strokeWidth={strokeWidth} 
                  strokeDasharray={`${fDash} ${circumference}`} 
                  strokeDashoffset={fOffset} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <p className="text-[9px] text-slate-400 font-black tracking-[0.2em] uppercase mb-1.5">RECOMMENDED</p>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{recommendation.calMin}</span>
                  <span className="text-slate-300 font-bold text-xl">-</span>
                  <span className="text-xl font-bold text-slate-500 tracking-tighter leading-none">{recommendation.calMax}</span>
                </div>
                <p className="text-[10px] font-black text-slate-400 tracking-[0.1em] uppercase">KCAL / DAY</p>
              </div>
            </div>
          </div>
        </section>

        {/* Macro Section */}
        <section className="flex-1 flex flex-col justify-start min-h-0">
          <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest">宏量营养素区间</h3>
            <p className="text-[10px] text-slate-400 font-bold tracking-tight">单位: 克(g)</p>
          </div>
          
          <div className="space-y-3 overflow-hidden">
            {[
              { label: '蛋白质', val: recommendation.proteinRange, color: 'text-protein', bg: 'bg-protein', pct: '48%', sub: '优质蛋白' },
              { label: '碳水化合物', val: recommendation.carbsRange, color: 'text-success', bg: 'bg-success', pct: '65%', sub: '慢卡碳水' },
              { label: '脂肪', val: recommendation.fatRange, color: 'text-fat', bg: 'bg-fat', pct: '30%', sub: '健康油脂' }
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-[1.8rem] px-6 py-4 border border-slate-200 shadow-sm flex flex-col gap-2 transition-all active:scale-[0.98]">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-black text-slate-800 leading-tight">{item.label}</span>
                    <span className="text-[10px] font-bold text-slate-400 leading-tight">{item.sub}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[18px] font-black tracking-tight ${item.color}`}>{item.val}</span>
                    <span className="text-[10px] font-black text-slate-400">g</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className={`h-full ${item.bg} rounded-full transition-all duration-1000 ease-out`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
