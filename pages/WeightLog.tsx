
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useAppState } from '../state';
import Layout from '../components/Layout';
import { Goal } from '../types';

const NUTRITION_STANDARDS = {
  [Goal.BUILD_MUSCLE]: { 
    protein: [1.6, 2.2], 
    carbs: [4.0, 7.0], 
    fatPercent: [0.2, 0.3] 
  },
  [Goal.FAT_LOSS]: { 
    protein: [1.8, 2.5], 
    carbs: [2.0, 4.0], 
    fatPercent: [0.2, 0.35] 
  },
  [Goal.MAINTAIN]: { 
    protein: [1.6, 2.0], 
    carbs: [3.0, 5.0], 
    fatPercent: [0.2, 0.3] 
  }
};

const ENCOURAGING_QUOTES = [
  "每一口食物，都是你在为想要的身材投票。",
  "自律不是束缚，而是通向自由的桥梁。",
  "改变需要时间，但只要开始，你就已经在路上了。",
  "坚持比速度更重要。",
  "生活因自律而轻盈，身体因管理而健康。",
  "慢慢来，比较快。",
  "你的每一分汗水，都是在跟平庸告别。",
  "所谓奇迹，不过是努力的另一个名字。",
  "别让现在的偷懒，变成未来的遗憾。",
  "身体是革命的本钱，管理身体就是管理人生。",
  "今天少吃一口肉，明天维密你走秀。",
  "你的身体会诚实地反馈你的每一份付出。",
  "每一个小目标，都是通往大成就的基石。",
  "饮食决定身材，运动决定线条。",
  "不要因为走得太远而忘记为什么出发。",
  "伟大不在于从不跌倒，而在于每次跌倒后都能爬起来。",
  "只要还在进步，再慢的速度也是领先。",
  "你的肌肉不关心你有多累，它们只关心你是否坚持到底。",
  "健康的乞丐比病弱的国王更幸福。",
  "不要在深夜奖励自己食物，要在清晨奖励自己活力。",
  "身材是最好的名片，它诉说着你的自律与毅力。",
  "没有一种痛苦能比得上后悔的痛苦。",
  "当你想要放弃时，想想当初为什么开始。",
  "身体的改变是缓慢的，但它是最公平的投资。",
  "自律是解决人生问题的首要工具。"
];

const EncouragingQuote: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ENCOURAGING_QUOTES.length);
        setIsVisible(true);
      }, 600);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-6 pb-8">
      <div className="bg-sky-100/40 rounded-[2.2rem] h-20 border border-sky-200/50 flex items-center justify-center relative overflow-hidden shadow-sm">
        <div className={`transition-all duration-700 ease-in-out transform w-full px-6 flex flex-col items-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <p className="text-[12px] font-bold text-slate-500 leading-relaxed italic text-center">
            {ENCOURAGING_QUOTES[index]}
          </p>
        </div>
      </div>
    </div>
  );
};

const SimpleLineChart: React.FC<{ data: { name: string; weight: number }[], period: string }> = ({ data, period }) => {
  if (data.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-300">
        <span className="material-symbols-outlined text-4xl mb-3 font-light opacity-50">show_chart</span>
        <p className="text-[12px] font-bold">记录更多数据以生成趋势图</p>
      </div>
    );
  }

  const weights = data.map(d => d.weight);
  const minWeight = Math.min(...weights) - 1;
  const maxWeight = Math.max(...weights) + 1;
  const range = maxWeight - minWeight;

  const width = 300;
  const height = 150;
  const padding = 20;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((d.weight - minWeight) / range) * (height - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = ` ${padding},${height} ${points} ${width - padding},${height}`;

  return (
    <div className="w-full h-full flex items-center justify-center animate-in fade-in duration-500">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d8fc9" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1d8fc9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={areaPoints} fill="url(#chartGradient)" />
        <polyline
          points={points}
          fill="none"
          stroke="#1d8fc9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
          const y = height - ((d.weight - minWeight) / range) * (height - padding * 2) - padding;
          return <circle key={i} cx={x} cy={y} r="4" fill="#1d8fc9" stroke="white" strokeWidth="2" />;
        })}
      </svg>
    </div>
  );
};

const WeightLog: React.FC = () => {
  const { user, weightLogs, addWeightLog, updateProfile } = useAppState();
  const [currentWeight, setCurrentWeight] = useState('');
  const [activePeriod, setActivePeriod] = useState('周');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollerDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = -15; i <= 15; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const todayEl = scrollContainerRef.current.querySelector('[data-today="true"]');
      if (todayEl) {
        setTimeout(() => {
          todayEl.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
        }, 50);
      }
    }
  }, []);

  const handleSave = () => {
    const w = parseFloat(currentWeight);
    if (isNaN(w) || w <= 0 || !user) return;

    const today = new Date().toISOString().split('T')[0];
    addWeightLog({ date: today, weight: w });

    const std = NUTRITION_STANDARDS[user.goal];
    const pMin = w * std.protein[0];
    const pMax = w * std.protein[1];
    const cMin = w * std.carbs[0];
    const cMax = w * std.carbs[1];
    const calMin = ((pMin * 4) + (cMin * 4)) / (1 - std.fatPercent[0]);
    const calMax = ((pMax * 4) + (cMax * 4)) / (1 - std.fatPercent[1]);
    
    updateProfile({
      ...user,
      weight: w,
      dailyCalories: Math.round((calMin + calMax) / 2),
      macros: {
        protein: Math.round((pMin + pMax) / 2),
        carbs: Math.round((cMin + cMax) / 2),
        fat: Math.round(((calMin + calMax) / 2 * (std.fatPercent[0] + std.fatPercent[1]) / 2) / 9),
      }
    });
    setCurrentWeight('');
  };

  const chartData = useMemo(() => {
    const logs = [...weightLogs];
    if (activePeriod === '周') return logs.slice(-7).map(l => ({ name: l.date.split('-')[2], weight: l.weight }));
    if (activePeriod === '月') return logs.slice(-30).map(l => ({ name: l.date.split('-')[2], weight: l.weight }));
    return logs.map(l => ({ name: l.date.split('-')[1], weight: l.weight }));
  }, [weightLogs, activePeriod]);

  const diff = useMemo(() => {
    if (weightLogs.length < 2) return '--';

    const sortedLogs = [...weightLogs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const latestLog = sortedLogs[sortedLogs.length - 1];

    const targetDate = new Date(latestLog.date);
    if (activePeriod === '月') targetDate.setDate(targetDate.getDate() - 30);
    else if (activePeriod === '年') targetDate.setDate(targetDate.getDate() - 365);
    else targetDate.setDate(targetDate.getDate() - 7);

    let compareLog = sortedLogs.find(l => l.date === targetDate.toISOString().split('T')[0]);

    if (!compareLog) {
      const firstLog = sortedLogs[0];
      const firstDate = new Date(firstLog.date);

      if (targetDate < firstDate) {
        compareLog = firstLog;
      } else {
        const closestLog = sortedLogs.filter(l => new Date(l.date) <= targetDate).pop();
        compareLog = closestLog || firstLog;
      }
    }

    if (compareLog && compareLog.date === latestLog.date && sortedLogs.length > 1) {
      compareLog = sortedLogs[0];
    }

    return (latestLog.weight - compareLog.weight).toFixed(1);
  }, [weightLogs, activePeriod]);

  return (
    <Layout mainClassName="bg-[#f0f4f9]">
      <header className="px-4 pt-10 pb-1 text-center">
        <h2 className="text-[20px] font-black text-slate-900 tracking-tight">健康打卡</h2>
      </header>

      <div className="flex-1 flex flex-col space-y-4 overflow-y-auto no-scrollbar pb-10">
        
        {/* Horizontal Calendar Scroller - Optimized Height */}
        <section className="relative w-full overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex flex-nowrap overflow-x-auto no-scrollbar gap-3 py-3 px-10 items-center snap-x cursor-grab active:cursor-grabbing scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {scrollerDates.map((d) => {
              const isToday = d.toDateString() === new Date().toDateString();
              const dateStr = d.toISOString().split('T')[0];
              const log = weightLogs.find(l => l.date === dateStr);

              return (
                <div 
                  key={dateStr}
                  data-today={isToday}
                  className={`flex-shrink-0 flex flex-col items-center justify-center transition-all duration-300 snap-center ${isToday ? 'w-14 h-[86px] bg-primary rounded-full shadow-xl shadow-primary/40 z-10' : 'w-10 h-[70px] bg-transparent text-slate-400'}`}
                >
                  <p className={`text-[10px] font-bold mb-1.5 ${isToday ? 'text-white/80' : 'text-slate-400'}`}>
                    {d.getDate()}日
                  </p>
                  <p className={`text-[15px] font-black tracking-tighter leading-none ${isToday ? 'text-white' : 'text-slate-300'}`}>
                    {log ? log.weight : (isToday ? '--' : '-')}
                  </p>
                  {!isToday && (
                     <span className="text-[12px] font-light mt-0.5 text-slate-300 opacity-60">+</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Weight Input Card */}
        <section className="px-6">
          <div className="bg-[#ebf1f6] rounded-[2.5rem] p-6 border border-white/60 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 bg-white rounded-xl text-primary flex items-center justify-center shrink-0 shadow-sm border border-slate-200">
                <span className="material-symbols-outlined text-[20px] filled">monitor_weight</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-900 text-[16px] tracking-tight">今日体重打卡</h3>
                <p className="text-[10px] text-slate-500 font-bold tracking-tight">记录现在的体重，开启健康的一天</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="number"
                  step="0.1"
                  className="w-full bg-white border-slate-200 border rounded-2xl h-12 px-5 text-xl font-black text-slate-900 focus:ring-primary/20 focus:border-primary placeholder:text-slate-200 shadow-inner"
                  placeholder="0.0"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-black text-[10px] uppercase tracking-widest pointer-events-none">kg</span>
              </div>
              <button 
                onClick={handleSave}
                className="h-12 px-6 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-all text-sm tracking-tight"
              >
                保存记录
              </button>
            </div>
          </div>
        </section>

        {/* Analysis Section */}
        <section className="px-6 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">体重趋势分析</h2>
            <div className="flex bg-slate-200/60 p-1 rounded-2xl border border-slate-300/30 shadow-inner">
               {['周', '月', '年'].map((p) => (
                 <button 
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={`px-4 py-1.5 text-[10px] font-bold rounded-xl transition-all duration-300 ${activePeriod === p ? 'bg-white shadow-md text-slate-900' : 'text-slate-500 hover:text-slate-600'}`}
                 >
                   {p}
                 </button>
               ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200/50 h-52 flex flex-col items-center justify-center relative shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <SimpleLineChart data={chartData} period={activePeriod} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#f8fbff] border border-slate-200/50 rounded-[2rem] p-5 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {activePeriod === '周' ? '7天' : (activePeriod === '月' ? '30天' : '1年')}变化
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-black ${Number(diff) > 0 ? 'text-orange-500' : (Number(diff) < 0 ? 'text-emerald-600' : 'text-slate-500')}`}>
                    {Number(diff) > 0 ? `+${diff}` : diff}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">kg</span>
                </div>
              </div>
              <span className={`material-symbols-outlined ${Number(diff) > 0 ? 'text-orange-500' : (Number(diff) < 0 ? 'text-emerald-600' : 'text-slate-500')} font-light text-xl`}>
                {Number(diff) > 0 ? 'trending_up' : (Number(diff) < 0 ? 'trending_down' : 'remove')}
              </span>
            </div>
            <div className="bg-[#f8fbff] border border-slate-200/50 rounded-[2rem] p-5 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">累计打卡</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-primary">{weightLogs.length}</span>
                  <span className="text-[9px] font-bold text-slate-400">天</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary font-light text-xl">event_available</span>
            </div>
          </div>
        </section>

        <EncouragingQuote />
      </div>
    </Layout>
  );
};

export default WeightLog;
