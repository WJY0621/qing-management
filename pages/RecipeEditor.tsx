
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppState } from '../state';
import { Recipe, RecipeIngredient, Ingredient } from '../types';
import { MOCK_INGREDIENTS } from '../constants';
import { searchIngredients } from '../services/dataService';

const RecipeEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, addRecipe, updateRecipe } = useAppState();

  const existingRecipe = useMemo(() => recipes.find(r => r.id === id), [recipes, id]);

  const [name, setName] = useState(existingRecipe?.name || '');
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(existingRecipe?.ingredients || []);
  const [notes, setNotes] = useState(existingRecipe?.notes || '');
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState('');
  // Hybrid ingredients list (Local Mock + Remote DB)
  const [displayIngredients, setDisplayIngredients] = useState<Ingredient[]>(MOCK_INGREDIENTS);
  const [isSearching, setIsSearching] = useState(false);

  // Search Effect
  useEffect(() => {
    let isMounted = true;

    const performSearch = async () => {
      // 1. Local Filter (Instant)
      const localResults = MOCK_INGREDIENTS.filter(i => 
        i.name.toLowerCase().includes(search.toLowerCase())
      );

      // If search is empty, just show local list (or maybe top 20 local)
      if (!search.trim()) {
        if (isMounted) {
            setDisplayIngredients(MOCK_INGREDIENTS);
            setIsSearching(false);
        }
        return;
      }

      setIsSearching(true);

      try {
        // 2. Remote Search (Supabase)
        const remoteResults = await searchIngredients(search);
        
        if (isMounted) {
          // 3. Merge results (Remote first, then Local, remove duplicates by ID or Name)
          const merged = [...remoteResults];
          
          localResults.forEach(local => {
            // Check if already exists in remote results (by name or id)
            const exists = merged.some(r => r.name === local.name || r.id === local.id);
            if (!exists) {
              merged.push(local);
            }
          });
          
          setDisplayIngredients(merged);
        }
      } catch (error) {
        console.error("Search failed", error);
        // Fallback to local if remote fails
        if (isMounted) setDisplayIngredients(localResults);
      } finally {
        if (isMounted) setIsSearching(false);
      }
    };

    // Debounce remote search slightly to avoid too many requests
    const timeoutId = setTimeout(performSearch, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [search]);

  const nutrition = useMemo(() => {
    return ingredients.reduce((acc, curr) => ({
      calories: acc.calories + Math.round((curr.calories * curr.amount) / 100),
      protein: acc.protein + Number(((curr.protein * curr.amount) / 100).toFixed(1)),
      carbs: acc.carbs + Number(((curr.carbs * curr.amount) / 100).toFixed(1)),
      fat: acc.fat + Number(((curr.fat * curr.amount) / 100).toFixed(1)),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }, [ingredients]);

  const handleSave = () => {
    if (!name.trim()) return;
    const recipe: Recipe = {
      id: existingRecipe?.id || Date.now().toString(),
      name,
      ingredients,
      notes,
      totalCalories: nutrition.calories,
      totalMacros: {
        protein: Math.round(nutrition.protein),
        carbs: Math.round(nutrition.carbs),
        fat: Math.round(nutrition.fat),
      }
    };
    if (existingRecipe) {
      updateRecipe(recipe);
    } else {
      addRecipe(recipe);
    }
    navigate('/recipes');
  };

  const addIngredient = (ing: Ingredient) => {
    if (!ingredients.find(i => i.id === ing.id)) {
      setIngredients([...ingredients, { ...ing, amount: 100 }]);
    }
    setShowPicker(false);
  };

  const updateAmount = (ingId: string, value: string) => {
    // 处理前导零：将其转换为数字再转回字符串，或者直接解析
    const parsed = parseInt(value, 10);
    const amount = isNaN(parsed) ? 0 : parsed;
    setIngredients(prev => prev.map(i => i.id === ingId ? { ...i, amount } : i));
  };

  const removeIngredient = (ingId: string) => {
    setIngredients(prev => prev.filter(i => i.id !== ingId));
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fbff] max-w-md mx-auto relative overflow-hidden">
      <header 
        className="flex items-center justify-between px-6 pb-4 bg-white transition-all"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}
      >
        <button onClick={() => navigate('/recipes')} className="text-slate-400 text-sm font-medium">取消</button>
        <h2 className="text-lg font-bold text-slate-800">{existingRecipe ? '编辑食谱' : '新建食谱'}</h2>
        <button onClick={handleSave} className="text-primary text-sm font-bold">完成</button>
      </header>

      <main className="flex-1 overflow-y-auto pb-48 no-scrollbar">
        <section className="px-6 pt-8 pb-6">
          <input
            className="w-full bg-transparent border-none p-0 text-4xl font-black placeholder:text-slate-200 focus:ring-0 text-slate-900 tracking-tight"
            placeholder="请输入名称..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </section>

        <section className="px-6 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">食材列表</h3>
            <span className="text-[10px] font-bold bg-sky-50 text-primary px-2.5 py-1 rounded-full">{ingredients.length} 个项目</span>
          </div>

          <div className="space-y-4">
            {ingredients.map(ing => (
              <div key={ing.id} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-50 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <p className="font-bold text-slate-800 text-base">{ing.name}</p>
                    <div className="flex items-center gap-1.5 bg-sky-50/50 rounded-xl px-2 py-1 border border-primary/20">
                      <input
                        type="number"
                        className="w-14 bg-transparent border-none p-0 text-primary text-lg font-black text-center focus:ring-0"
                        value={ing.amount === 0 ? '' : ing.amount.toString()}
                        onChange={(e) => updateAmount(ing.id, e.target.value)}
                        placeholder="0"
                      />
                      <span className="text-xs text-slate-400 font-bold">g</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    蛋白质 {((ing.protein * ing.amount) / 100).toFixed(1)}g · 
                    脂肪 {((ing.fat * ing.amount) / 100).toFixed(1)}g · 
                    碳水 {((ing.carbs * ing.amount) / 100).toFixed(1)}g
                  </p>
                </div>
                <button 
                  onClick={() => removeIngredient(ing.id)} 
                  className="size-10 flex items-center justify-center bg-red-50 rounded-full text-red-500 active:scale-90 transition-transform ml-2"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            ))}

            <button
              onClick={() => setShowPicker(true)}
              className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[24px] flex flex-col items-center justify-center gap-2 text-primary/80 font-bold hover:bg-primary/5 transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-3xl">add_circle</span>
              <span className="text-sm">添加食材</span>
            </button>
          </div>
        </section>

        <section className="px-6 py-8">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">做法备注</p>
           <textarea
             className="w-full rounded-[24px] border-none bg-white p-5 text-sm focus:ring-primary/10 min-h-[140px] placeholder:text-slate-200 shadow-sm text-slate-700"
             placeholder="在这里记录您的烹饪心得或注意事项..."
             value={notes}
             onChange={(e) => setNotes(e.target.value)}
           />
        </section>
      </main>

      {/* Summary Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-white/95 ios-blur px-6 pt-6 pb-12 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.04)] z-20 border-t border-slate-50">
        <div className="flex items-center justify-between mb-5 px-1">
          <h4 className="text-sm font-bold text-slate-800">实时营养汇总</h4>
          <div className="h-1 w-8 bg-slate-100 rounded-full" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: '热量', value: nutrition.calories, unit: 'kcal', active: false },
            { label: '蛋白质', value: Math.round(nutrition.protein * 10) / 10, unit: 'g', active: true },
            { label: '脂肪', value: Math.round(nutrition.fat * 10) / 10, unit: 'g', active: false },
            { label: '碳水', value: Math.round(nutrition.carbs * 10) / 10, unit: 'g', active: false },
          ].map((s, idx) => (
            <div key={idx} className={`flex flex-col items-center py-4 rounded-[20px] transition-all ${s.active ? 'bg-[#f0f9ff] ring-1 ring-primary/10' : 'bg-slate-50'}`}>
              <p className={`text-[10px] font-bold uppercase mb-1 ${s.active ? 'text-primary' : 'text-slate-400'}`}>{s.label}</p>
              <div className="flex items-baseline gap-0.5">
                <span className={`text-xl font-black ${s.active ? 'text-primary' : 'text-slate-800'}`}>{s.value}</span>
                <span className="text-[10px] text-slate-400 font-bold">{s.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </footer>

      {/* Ingredient Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-50 bg-black/30 ios-blur flex flex-col items-center justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-[3rem] h-[85%] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-50">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">选择食材</h3>
                <button 
                  onClick={() => setShowPicker(false)} 
                  className="size-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-400 active:scale-90 transition-transform"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">search</span>
                <input
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm focus:ring-primary/10 text-slate-800 placeholder:text-slate-300"
                  placeholder="搜索库中的健康食材..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-slate-50/30">
              {isSearching && (
                 <div className="flex items-center justify-center py-4 text-slate-400 gap-2">
                   <div className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                   <span className="text-xs font-bold">正在云端搜索...</span>
                 </div>
              )}
              {displayIngredients.map(ing => (
                <div key={ing.id} className="flex items-center justify-between p-5 bg-white rounded-[28px] border border-slate-50 shadow-sm">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-lg mb-1">{ing.name}</h4>
                    <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
                      <span className="text-primary font-bold">{ing.calories} kcal</span>
                      <span className="opacity-20 text-slate-300">|</span>
                      <span>100g 含量</span>
                    </p>
                  </div>
                  <button
                    onClick={() => addIngredient(ing)}
                    className="flex items-center gap-1.5 text-primary font-bold text-sm px-6 py-3 bg-primary/5 rounded-2xl active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                    添加
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeEditor;
