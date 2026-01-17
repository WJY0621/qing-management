
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import { Gender, Goal, UserProfile } from '../types';
import { GOAL_CONFIG } from '../constants';

// Updated Scientific Recommendation Standards
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

const ProfileEditor: React.FC = () => {
  const { user, updateProfile } = useAppState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    gender: user?.gender || Gender.MALE,
    age: user?.age || 25,
    height: user?.height || 175,
    weight: user?.weight || 70,
    goal: user?.goal || Goal.MAINTAIN,
  });

  if (!user) return null;

  const handleSave = () => {
    const weight = formData.weight || 70;
    const goal = formData.goal || Goal.MAINTAIN;
    const std = NUTRITION_STANDARDS[goal];

    // Calculate ranges to find medians
    const pMin = weight * std.protein[0];
    const pMax = weight * std.protein[1];
    const cMin = weight * std.carbs[0];
    const cMax = weight * std.carbs[1];

    const calMin = ((pMin * 4) + (cMin * 4)) / (1 - std.fatPercent[0]);
    const calMax = ((pMax * 4) + (cMax * 4)) / (1 - std.fatPercent[1]);

    const fMin = (calMin * std.fatPercent[0]) / 9;
    const fMax = (calMax * std.fatPercent[1]) / 9;

    // Medians for stored values
    const protein = Math.round((pMin + pMax) / 2);
    const carbs = Math.round((cMin + cMax) / 2);
    const fat = Math.round((fMin + fMax) / 2);
    const calories = Math.round((calMin + calMax) / 2);

    const updatedProfile: UserProfile = {
      ...user,
      gender: formData.gender as Gender,
      age: formData.age || 25,
      height: formData.height || 175,
      weight: formData.weight || 70,
      goal: goal,
      dailyCalories: calories,
      macros: { protein, carbs, fat }
    };

    updateProfile(updatedProfile);
    navigate('/profile');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative overflow-hidden">
      <header className="flex items-center justify-between px-6 pt-10 pb-6 bg-white">
        <button onClick={() => navigate('/profile')} className="text-gray-400 active:scale-90 transition-all">
          <span className="material-symbols-outlined text-3xl font-light">close</span>
        </button>
        <h2 className="text-xl font-bold text-slate-800">修改身体数据</h2>
        <div className="w-9" /> {/* Spacer */}
      </header>

      <main className="flex-1 px-8 pt-4 space-y-8 overflow-y-auto no-scrollbar pb-32">
        {/* Gender Selection */}
        <section>
          <label className="block text-sm font-bold text-gray-400 mb-4 px-1">性别</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setFormData({ ...formData, gender: Gender.MALE })}
              className={`flex flex-col items-center justify-center p-4 rounded-[1.5rem] transition-all h-28 border-2 ${formData.gender === Gender.MALE ? 'border-primary bg-white shadow-lg shadow-primary/10' : 'border-transparent bg-slate-50'}`}
            >
              <span className={`material-symbols-outlined text-3xl mb-1 ${formData.gender === Gender.MALE ? 'text-primary' : 'text-slate-300'}`}>male</span>
              <span className={`text-sm font-bold ${formData.gender === Gender.MALE ? 'text-primary' : 'text-slate-400'}`}>男</span>
            </button>
            <button
              onClick={() => setFormData({ ...formData, gender: Gender.FEMALE })}
              className={`flex flex-col items-center justify-center p-4 rounded-[1.5rem] transition-all h-28 border-2 ${formData.gender === Gender.FEMALE ? 'border-primary bg-white shadow-lg shadow-primary/10' : 'border-transparent bg-slate-50'}`}
            >
              <span className={`material-symbols-outlined text-3xl mb-1 ${formData.gender === Gender.FEMALE ? 'text-primary' : 'text-slate-300'}`}>female</span>
              <span className={`text-sm font-bold ${formData.gender === Gender.FEMALE ? 'text-primary' : 'text-slate-400'}`}>女</span>
            </button>
          </div>
        </section>

        {/* Age Input */}
        <section>
          <label className="block text-sm font-bold text-gray-400 mb-2 px-1">年龄</label>
          <div className="flex items-center rounded-2xl p-5 bg-slate-50 border border-slate-100/50">
            <input
              type="number"
              className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-black text-slate-800 p-0"
              value={formData.age || ''}
              onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            />
            <span className="text-slate-400 font-bold text-xs">岁</span>
          </div>
        </section>

        {/* Height & Weight */}
        <section className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 px-1">身高</label>
            <div className="flex items-center rounded-2xl p-5 bg-slate-50 border border-slate-100/50">
              <input
                type="number"
                className="w-full bg-transparent border-none focus:ring-0 text-xl font-black text-slate-800 p-0"
                value={formData.height || ''}
                onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
              />
              <span className="text-slate-400 font-bold text-[10px] uppercase">cm</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 px-1">体重</label>
            <div className="flex items-center rounded-2xl p-5 bg-slate-50 border border-slate-100/50">
              <input
                type="number"
                className="w-full bg-transparent border-none focus:ring-0 text-xl font-black text-slate-800 p-0"
                value={formData.weight || ''}
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
              />
              <span className="text-slate-400 font-bold text-[10px] uppercase">kg</span>
            </div>
          </div>
        </section>

        {/* Dietary Goal */}
        <section>
          <label className="block text-sm font-bold text-gray-400 mb-4 px-1">饮食目标</label>
          <div className="space-y-3">
            {(Object.keys(GOAL_CONFIG) as Goal[]).map((goalKey) => (
              <button
                key={goalKey}
                onClick={() => setFormData({ ...formData, goal: goalKey })}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all border-2 ${formData.goal === goalKey ? 'border-primary bg-primary/5' : 'border-transparent bg-slate-50'}`}
              >
                <div className={`size-10 rounded-xl flex items-center justify-center ${formData.goal === goalKey ? 'bg-primary text-white' : 'bg-white text-slate-400'}`}>
                  <span className="material-symbols-outlined text-xl filled">{GOAL_CONFIG[goalKey].icon}</span>
                </div>
                <div className="flex flex-col text-left">
                  <p className={`text-sm font-bold ${formData.goal === goalKey ? 'text-primary' : 'text-slate-800'}`}>
                    {GOAL_CONFIG[goalKey].label}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {GOAL_CONFIG[goalKey].description}
                  </p>
                </div>
                {formData.goal === goalKey && (
                  <span className="material-symbols-outlined text-primary ml-auto text-xl">check_circle</span>
                )}
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 p-8 pb-10 bg-white/90 ios-blur">
        <button
          onClick={handleSave}
          className="w-full h-14 bg-primary text-white font-bold rounded-full shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          保存更改
          <span className="material-symbols-outlined text-xl">check</span>
        </button>
      </footer>
    </div>
  );
};

export default ProfileEditor;
