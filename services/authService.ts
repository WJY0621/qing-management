
import { supabase } from '../lib/supabase';
import { upsertProfile } from './dataService';
import { UserProfile } from '../types';

export const signUp = async (email: string, password: string, profile?: UserProfile) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  if (data.user && profile) {
    // Create initial profile
    await upsertProfile(data.user.id, profile);
  }

  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signInAnonymously = async () => {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
