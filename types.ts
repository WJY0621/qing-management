
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum Goal {
  BUILD_MUSCLE = 'BUILD_MUSCLE',
  FAT_LOSS = 'FAT_LOSS',
  MAINTAIN = 'MAINTAIN'
}

export interface UserProfile {
  gender: Gender;
  age: number;
  height: number;
  weight: number;
  goal: Goal;
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  calories: number; // per 100g
  protein: number;
  carbs: number;
  fat: number;
  category: string;
}

export interface RecipeIngredient extends Ingredient {
  amount: number; // in grams
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: RecipeIngredient[];
  notes: string;
  totalCalories: number;
  totalMacros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface WeightLog {
  date: string; // YYYY-MM-DD
  weight: number;
}
