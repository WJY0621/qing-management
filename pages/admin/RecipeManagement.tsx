
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const RecipeManagement: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRecipes(data || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900">食谱管理</h2>
          <p className="text-slate-500 font-medium mt-1">查看平台所有食谱</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-600">
          共 {recipes.length} 个食谱
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           <p className="text-slate-400 col-span-full text-center py-10">加载中...</p>
        ) : recipes.length === 0 ? (
           <p className="text-slate-400 col-span-full text-center py-10">暂无数据（或无权限查看）</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-black text-lg text-slate-800 line-clamp-1">{recipe.name}</h3>
                <span className="bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded">
                  {recipe.total_calories} kcal
                </span>
              </div>
              
              <div className="flex gap-2 text-xs text-slate-500 mb-4">
                <span className="bg-slate-50 px-2 py-1 rounded">蛋白质 {recipe.total_protein}g</span>
                <span className="bg-slate-50 px-2 py-1 rounded">碳水 {recipe.total_carbs}g</span>
                <span className="bg-slate-50 px-2 py-1 rounded">脂肪 {recipe.total_fat}g</span>
              </div>

              <div className="text-xs text-slate-400 border-t border-slate-50 pt-3 flex justify-between items-center">
                <span>ID: {recipe.id.slice(0, 6)}</span>
                <span>{new Date(recipe.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeManagement;
