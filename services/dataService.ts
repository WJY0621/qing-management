
import { supabase } from '../lib/supabase';
import { UserProfile, Recipe, WeightLog, Ingredient } from '../types';

// Profile Services
export const getProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  if (!data) return null;

  // Map DB columns to UserProfile interface (camelCase)
  return {
    gender: data.gender,
    age: data.age,
    height: data.height,
    weight: data.weight,
    goal: data.goal,
    dailyCalories: data.daily_calories,
    macros: {
      protein: data.protein_target,
      carbs: data.carbs_target,
      fat: data.fat_target
    }
  };
};

export const upsertProfile = async (userId: string, profile: UserProfile) => {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      gender: profile.gender,
      age: profile.age,
      height: profile.height,
      weight: profile.weight,
      goal: profile.goal,
      daily_calories: profile.dailyCalories,
      protein_target: profile.macros.protein,
      carbs_target: profile.macros.carbs,
      fat_target: profile.macros.fat,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
};

// Recipe Services
export const getRecipes = async (userId: string): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }

  return data.map((r: any) => ({
    id: r.id,
    name: r.name,
    ingredients: r.ingredients, // JSONB handles structure
    notes: r.notes,
    totalCalories: r.total_calories,
    totalMacros: {
      protein: r.total_protein,
      carbs: r.total_carbs,
      fat: r.total_fat
    }
  }));
};

export const createRecipe = async (userId: string, recipe: Recipe) => {
  const { error } = await supabase.from('recipes').insert({
    user_id: userId,
    name: recipe.name,
    ingredients: recipe.ingredients,
    notes: recipe.notes,
    total_calories: recipe.totalCalories,
    total_protein: recipe.totalMacros.protein,
    total_carbs: recipe.totalMacros.carbs,
    total_fat: recipe.totalMacros.fat
  });

  if (error) throw error;
};

export const updateRecipeInDb = async (userId: string, recipe: Recipe) => {
  const { error } = await supabase
    .from('recipes')
    .update({
      name: recipe.name,
      ingredients: recipe.ingredients,
      notes: recipe.notes,
      total_calories: recipe.totalCalories,
      total_protein: recipe.totalMacros.protein,
      total_carbs: recipe.totalMacros.carbs,
      total_fat: recipe.totalMacros.fat
    })
    .eq('id', recipe.id)
    .eq('user_id', userId);

  if (error) throw error;
};

export const deleteRecipeFromDb = async (id: string) => {
  const { error } = await supabase.from('recipes').delete().eq('id', id);
  if (error) throw error;
};

// Weight Log Services
export const getWeightLogs = async (userId: string): Promise<WeightLog[]> => {
  const { data, error } = await supabase
    .from('weight_logs')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching weight logs:', error);
    return [];
  }

  return data.map((l: any) => ({
    date: l.date,
    weight: l.weight
  }));
};

export const addWeightLogToDb = async (userId: string, log: WeightLog) => {
  // Check if log exists for date to update or insert
  const { error } = await supabase.from('weight_logs').upsert(
    {
      user_id: userId,
      date: log.date,
      weight: log.weight
    },
    { onConflict: 'user_id,date' } // requires unique constraint on (user_id, date) which we might need to add or handle via logic
  );

  // Note: Standard upsert works if there's a unique constraint. 
  // If not, we might create duplicates. For now assuming application logic handles it or we add constraint.
  // Ideally: alter table weight_logs add unique (user_id, date);
  if (error) throw error;
};

// Ingredient Services (Public)
export const searchIngredients = async (query: string): Promise<Ingredient[]> => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .ilike('name', `%${query}%`)
    .limit(20);

  if (error) {
    console.error('Error searching ingredients:', error);
    return [];
  }

  return data.map((i: any) => ({
    id: i.id,
    name: i.name,
    calories: i.calories,
    protein: i.protein,
    carbs: i.carbs,
    fat: i.fat,
    category: i.category
  }));
};
