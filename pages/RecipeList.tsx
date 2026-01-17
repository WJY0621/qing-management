
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../state';
import Layout from '../components/Layout';

const RecipeList: React.FC = () => {
  const { recipes } = useAppState();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="sticky top-0 z-20 bg-white/95 ios-blur px-6 pt-10 pb-5 border-b border-slate-200">
        <h2 className="text-[20px] font-black text-center text-slate-900 tracking-tight">我的健康食谱</h2>
      </div>

      <div className="p-6 space-y-5">
        {recipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="size-20 bg-slate-100 rounded-[28px] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">menu_book</span>
            </div>
            <p className="text-sm font-bold text-slate-400">暂无食谱，立即开启健康饮食吧</p>
          </div>
        ) : (
          recipes.map(recipe => (
            <div key={recipe.id} className="bg-[#f8fbff] rounded-[2.5rem] p-6 shadow-md border border-slate-200 active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-start mb-5">
                <div className="flex-1">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">{recipe.name}</h3>
                  <p className="text-[11px] font-bold text-slate-500 mt-1.5 line-clamp-2 leading-relaxed opacity-80">
                    {recipe.ingredients.map(i => `${i.name} ${i.amount}g`).join(', ')}
                  </p>
                </div>
                <button 
                  onClick={() => navigate(`/recipes/edit/${recipe.id}`)}
                  className="size-11 bg-white flex items-center justify-center text-primary rounded-2xl shadow-sm border border-slate-100"
                >
                  <span className="material-symbols-outlined filled text-xl">edit_note</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 pt-5 border-t border-slate-200">
                <div className="flex flex-col items-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">能量</p>
                  <p className="text-sm font-black text-primary">{recipe.totalCalories}</p>
                  <p className="text-[8px] font-bold text-slate-300">kcal</p>
                </div>
                <div className="flex flex-col items-center border-l border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">蛋白</p>
                  <p className="text-sm font-black text-slate-800">{recipe.totalMacros.protein}g</p>
                </div>
                <div className="flex flex-col items-center border-l border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">碳水</p>
                  <p className="text-sm font-black text-slate-800">{recipe.totalMacros.carbs}g</p>
                </div>
                <div className="flex flex-col items-center border-l border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">脂肪</p>
                  <p className="text-sm font-black text-slate-800">{recipe.totalMacros.fat}g</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-full max-w-md z-30 px-6 pointer-events-none flex justify-end">
        <button 
          onClick={() => navigate('/recipes/new')}
          className="size-16 bg-primary text-white rounded-[24px] flex items-center justify-center shadow-xl shadow-primary/40 active:scale-90 transition-all border-2 border-white/20 pointer-events-auto"
        >
          <span className="material-symbols-outlined text-4xl">add</span>
        </button>
      </div>
    </Layout>
  );
};

export default RecipeList;
