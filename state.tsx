
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { UserProfile, Recipe, WeightLog } from './types';
import { supabase } from './lib/supabase';
import * as authService from './services/authService';
import * as dataService from './services/dataService';

interface AppState {
  user: UserProfile | null;
  recipes: Recipe[];
  weightLogs: WeightLog[];
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginGuest: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  updateProfile: (profile: UserProfile) => Promise<void>;
  addRecipe: (recipe: Recipe) => Promise<void>;
  updateRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (id: string) => Promise<void>;
  addWeightLog: (log: WeightLog) => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Data Fetch & Auth Subscription
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.warn('Supabase session check failed:', error);
        setIsLoading(false);
        return;
      }
      
      setIsLoggedIn(!!session);
      if (session) {
        fetchUserData(session.user.id);
      } else {
        setIsLoading(false);
      }
    }).catch(err => {
      console.error('Unexpected error checking session:', err);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'TOKEN_REFRESHED') return;

      setIsLoggedIn(!!session);
      if (session) {
        fetchUserData(session.user.id);
      } else {
        setUser(null);
        setRecipes([]);
        setWeightLogs([]);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      setIsLoading(true);
      const [profileData, recipesData, weightLogsData] = await Promise.all([
        dataService.getProfile(userId),
        dataService.getRecipes(userId),
        dataService.getWeightLogs(userId)
      ]);
      
      setUser(profileData);
      setRecipes(recipesData);
      setWeightLogs(weightLogsData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    await authService.signIn(email, password);
    // State update handled by onAuthStateChange
  }, []);

  const loginGuest = useCallback(async () => {
    await authService.signInAnonymously();
  }, []);

  const logout = useCallback(async () => {
    await authService.signOut();
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    await authService.signUp(email, password);
    // If auto-login enabled by Supabase, onAuthStateChange will trigger.
    // Otherwise user might need to check email.
  }, []);

  const updateProfile = useCallback(async (profile: UserProfile) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.error("No authenticated user found when updating profile");
        return;
    }

    try {
        await dataService.upsertProfile(user.id, profile);
        setUser(profile); // Optimistic update
    } catch (error) {
        console.error("Error updating profile in state:", error);
        throw error; // Re-throw to handle in UI
    }
  }, []);

  const addRecipe = useCallback(async (recipe: Recipe) => {
    const currentUser = (await supabase.auth.getUser()).data.user;
    if (!currentUser) return;

    await dataService.createRecipe(currentUser.id, recipe);
    // Refresh recipes to get generated ID or just re-fetch
    const updatedRecipes = await dataService.getRecipes(currentUser.id);
    setRecipes(updatedRecipes);
  }, []);

  const updateRecipe = useCallback(async (recipe: Recipe) => {
    const currentUser = (await supabase.auth.getUser()).data.user;
    if (!currentUser) return;

    await dataService.updateRecipeInDb(currentUser.id, recipe);
    setRecipes(prev => prev.map(r => r.id === recipe.id ? recipe : r));
  }, []);

  const deleteRecipe = useCallback(async (id: string) => {
    await dataService.deleteRecipeFromDb(id);
    setRecipes(prev => prev.filter(r => r.id !== id));
  }, []);

  const addWeightLog = useCallback(async (log: WeightLog) => {
    const currentUser = (await supabase.auth.getUser()).data.user;
    if (!currentUser) return;

    await dataService.addWeightLogToDb(currentUser.id, log);
    // Refresh logs to ensure sort order and consistency
    const updatedLogs = await dataService.getWeightLogs(currentUser.id);
    setWeightLogs(updatedLogs);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    await authService.resetPasswordForEmail(email);
  }, []);

  const updatePassword = useCallback(async (password: string) => {
    await authService.updatePassword(password);
  }, []);

  const value = useMemo(() => ({
    user,
    recipes,
    weightLogs,
    isLoggedIn,
    isLoading,
    login,
    loginGuest,
    logout,
    register,
    updateProfile,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    addWeightLog,
    resetPassword,
    updatePassword
  }), [user, recipes, weightLogs, isLoggedIn, isLoading, login, logout, register, updateProfile, addRecipe, updateRecipe, deleteRecipe, addWeightLog, resetPassword, updatePassword]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState must be used within AppProvider');
  return context;
};
