
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import { Gender, Goal, UserProfile } from '../types';

// New Scientific Recommendation Standards
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

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    gender: Gender.MALE,
    age: 25,
    height: 175,
    weight: 70,
    goal: Goal.BUILD_MUSCLE
  });

  const navigate = useNavigate();
  const { updateProfile } = useAppState();

  // Calculate recommendation ranges based on the new logic
  const recommendation = useMemo(() => {
    const weight = profile.weight || 70;
    const goal = profile.goal || Goal.MAINTAIN;
    const std = NUTRITION_STANDARDS[goal];

    // 1. Calculate Protein and Carbs (Fixed g/kg)
    const pMin = Math.round(weight * std.protein[0]);
    const pMax = Math.round(weight * std.protein[1]);
    const cMin = Math.round(weight * std.carbs[0]);
    const cMax = Math.round(weight * std.carbs[1]);

    const pCalMin = pMin * 4;
    const pCalMax = pMax * 4;
    const cCalMin = cMin * 4;
    const cCalMax = cMax * 4;

    // 2. Calculate Total Calories based on Fat Percentage
    // Calorie = (P + C) / (1 - Fat%)
    const calMin = Math.round((pCalMin + cCalMin) / (1 - std.fatPercent[0]));
    const calMax = Math.round((pCalMax + cCalMax) / (1 - std.fatPercent[1]));

    // 3. Calculate Fat Grams
    const fMin = Math.round((calMin * std.fatPercent[0]) / 9);
    const fMax = Math.round((calMax * std.fatPercent[1]) / 9);

    // Medians for storage and visuals
    const calMid = Math.round((calMin + calMax) / 2);
    const pMid = Math.round((pMin + pMax) / 2);
    const cMid = Math.round((cMin + cMax) / 2);
    const fMid = Math.round((fMin + fMax) / 2);

    return {
      calories: { min: calMin, max: calMax, mid: calMid },
      protein: { min: pMin, max: pMax, mid: pMid },
      carbs: { min: cMin, max: cMax, mid: cMid },
      fat: { min: fMin, max: fMax, mid: fMid },
      ratios: {
        protein: (pMid * 4) / calMid,
        carbs: (cMid * 4) / calMid,
        fat: (fMid * 9) / calMid
      }
    };
  }, [profile]);

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      const finalProfile: UserProfile = {
        gender: profile.gender || Gender.MALE,
        age: profile.age || 25,
        height: profile.height || 175,
        weight: profile.weight || 70,
        goal: profile.goal || Goal.MAINTAIN,
        dailyCalories: recommendation.calories.mid,
        macros: {
          protein: recommendation.protein.mid,
          carbs: recommendation.carbs.mid,
          fat: recommendation.fat.mid
        }
      };

      try {
        await updateProfile(finalProfile);
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to save profile:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto">
      <header className="px-6 pt-10 pb-4">
        <div className="h-10 flex items-center mb-2">
          {step > 1 && (
            <button onClick={handleBack} className="text-gray-400 active:scale-90 transition-all -ml-2">
              <span className="material-symbols-outlined text-3xl">chevron_left</span>
            </button>
          )}
        </div>
        <div className="flex gap-2 h-1.5 w-full mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className={`flex-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-primary' : 'bg-gray-100'}`} />
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {step === 1 && '让我们开始吧'}
          {step === 2 && '选择你的饮食目标'}
          {step === 3 && '推荐营养方案'}
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          {step === 3 ? '基于区间推荐，您可以根据饥饿感微调' : '这些数据将帮助我们为您计算每日所需的营养目标。'}
        </p>
      </header>

      <main className="flex-1 px-6 pt-4 overflow-y-auto no-scrollbar">
        {step === 1 && (
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-bold text-gray-400 mb-4 px-1 uppercase tracking-wider">性别</h3>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setProfile({ ...profile, gender: Gender.MALE })} className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all h-36 border-2 ${profile.gender === Gender.MALE ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50'}`}>
                  <span className={`material-symbols-outlined text-4xl mb-2 ${profile.gender === Gender.MALE ? 'text-primary' : 'text-gray-300'}`}>male</span>
                  <span className={`font-bold ${profile.gender === Gender.MALE ? 'text-primary' : 'text-gray-400'}`}>男</span>
                </button>
                <button onClick={() => setProfile({ ...profile, gender: Gender.FEMALE })} className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all h-36 border-2 ${profile.gender === Gender.FEMALE ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50'}`}>
                  <span className={`material-symbols-outlined text-4xl mb-2 ${profile.gender === Gender.FEMALE ? 'text-primary' : 'text-gray-300'}`}>female</span>
                  <span className={`font-bold ${profile.gender === Gender.FEMALE ? 'text-primary' : 'text-gray-400'}`}>女</span>
                </button>
              </div>
            </section>
            <section className="space-y-6 pb-10">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 px-1 uppercase tracking-wider">年龄</label>
                <div className="flex items-center rounded-2xl p-4 bg-gray-50 ios-shadow">
                  <input type="number" className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-bold" value={profile.age || ''} onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })} />
                  <span className="text-gray-400 font-medium ml-2">岁</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 px-1 uppercase tracking-wider">身高</label>
                  <div className="flex items-center rounded-2xl p-4 bg-gray-50 ios-shadow">
                    <input type="number" className="w-full bg-transparent border-none focus:ring-0 text-xl font-bold" value={profile.height || ''} onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })} />
                    <span className="text-gray-400 font-medium ml-2">cm</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 px-1 uppercase tracking-wider">体重</label>
                  <div className="flex items-center rounded-2xl p-4 bg-gray-50 ios-shadow">
                    <input type="number" className="w-full bg-transparent border-none focus:ring-0 text-xl font-bold" value={profile.weight || ''} onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })} />
                    <span className="text-gray-400 font-medium ml-2">kg</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {(['BUILD_MUSCLE', 'FAT_LOSS', 'MAINTAIN'] as Goal[]).map((key) => (
              <button key={key} onClick={() => setProfile({ ...profile, goal: key })} className={`flex items-center gap-4 w-full p-5 rounded-2xl ios-shadow border-2 transition-all ${profile.goal === key ? 'border-primary bg-primary/5' : 'border-transparent bg-gray-50'}`}>
                <div className={`size-14 rounded-full flex items-center justify-center shrink-0 ${profile.goal === key ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-400'}`}>
                  <span className="material-symbols-outlined text-3xl">{key === 'BUILD_MUSCLE' ? 'fitness_center' : key === 'FAT_LOSS' ? 'local_fire_department' : 'favorite'}</span>
                </div>
                <div className="flex flex-col text-left flex-1">
                  <p className={`text-lg font-bold ${profile.goal === key ? 'text-primary' : 'text-slate-800'}`}>{key === 'BUILD_MUSCLE' ? '增肌' : key === 'FAT_LOSS' ? '减脂' : '保持'}</p>
                  <p className="text-gray-500 text-sm">{key === 'BUILD_MUSCLE' ? '盈余热量，助力肌肉生长' : key === 'FAT_LOSS' ? '制造缺口，高效燃烧脂肪' : '均衡摄入，维持身体最佳状态'}</p>
                </div>
                {profile.goal === key && <span className="material-symbols-outlined text-primary filled">check_circle</span>}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 pt-2">
            <div className="bg-[#f0f9ff] rounded-[2.5rem] p-8 flex flex-col items-center justify-center relative shadow-sm border border-sky-100">
               <span className="material-symbols-outlined text-primary text-3xl mb-1">bolt</span>
               <div className="flex items-baseline gap-2">
                 <h2 className="text-3xl font-black text-primary tracking-tight">
                   {recommendation.calories.min.toLocaleString()} - {recommendation.calories.max.toLocaleString()}
                 </h2>
               </div>
               <p className="text-primary/60 font-bold text-[10px] mt-2 tracking-widest uppercase">KCAL 建议摄入范围 / 日</p>
            </div>

            <div className="border-2 border-sky-200 bg-sky-50/20 rounded-[2.5rem] p-6">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { 
                    label: '蛋白质', 
                    range: `${recommendation.protein.min} - ${recommendation.protein.max}g`, 
                    color: 'bg-protein',
                    ratio: recommendation.ratios.protein
                  },
                  { 
                    label: '碳水', 
                    range: `${recommendation.carbs.min} - ${recommendation.carbs.max}g`, 
                    color: 'bg-carbs',
                    ratio: recommendation.ratios.carbs
                  },
                  { 
                    label: '脂肪', 
                    range: `${recommendation.fat.min} - ${recommendation.fat.max}g`, 
                    color: 'bg-fat',
                    ratio: recommendation.ratios.fat
                  },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{m.label}</p>
                      <p className="text-lg font-black text-slate-800">{m.range}</p>
                    </div>
                    <div className="h-2 w-full bg-white rounded-full overflow-hidden border border-sky-100 shadow-inner">
                      <div className={`h-full ${m.color} rounded-full`} style={{ width: `${m.ratio * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 pb-12">
        <button onClick={handleNext} className="w-full h-14 bg-primary text-white font-bold rounded-full shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
          {step === 3 ? '开始健康生活' : '下一步'}
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </footer>
    </div>
  );
};

export default Onboarding;
