-- Enable Row Level Security (RLS)
-- Users can only see/edit their own data

-- 1. PROFILES Table
create table public.profiles (
  id uuid references auth.users not null primary key,
  gender text,
  age integer,
  height numeric,
  weight numeric,
  goal text,
  daily_calories integer,
  protein_target numeric,
  carbs_target numeric,
  fat_target numeric,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- 2. RECIPES Table
create table public.recipes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  notes text,
  total_calories numeric,
  total_protein numeric,
  total_carbs numeric,
  total_fat numeric,
  ingredients jsonb default '[]'::jsonb, -- Storing ingredients as JSON array for simplicity
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.recipes enable row level security;

create policy "Users can view own recipes" on public.recipes
  for select using (auth.uid() = user_id);

create policy "Users can insert own recipes" on public.recipes
  for insert with check (auth.uid() = user_id);

create policy "Users can update own recipes" on public.recipes
  for update using (auth.uid() = user_id);

create policy "Users can delete own recipes" on public.recipes
  for delete using (auth.uid() = user_id);

-- 3. WEIGHT LOGS Table
create table public.weight_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  date date not null,
  weight numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Add unique constraint for upsert
alter table public.weight_logs add constraint weight_logs_user_date_key unique (user_id, date);

alter table public.weight_logs enable row level security;

create policy "Users can view own weight logs" on public.weight_logs
  for select using (auth.uid() = user_id);

create policy "Users can insert own weight logs" on public.weight_logs
  for insert with check (auth.uid() = user_id);

create policy "Users can update own weight logs" on public.weight_logs
  for update using (auth.uid() = user_id);

-- 4. INGREDIENTS Table (Public Reference)
create table public.ingredients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  calories numeric,
  protein numeric,
  carbs numeric,
  fat numeric,
  category text
);

-- Allow everyone to read ingredients
alter table public.ingredients enable row level security;
create policy "Public ingredients are viewable by everyone" on public.ingredients
  for select using (true);

-- Seed Initial Ingredients (from constants.tsx)
insert into public.ingredients (name, calories, protein, carbs, fat, category) values
  ('鸡胸肉', 133, 24.6, 0, 3.2, '肉禽蛋'),
  ('西兰花', 34, 2.8, 7, 0.4, '蔬菜'),
  ('全麦面包', 246, 9, 45, 3, '谷薯'),
  ('牛油果', 160, 2, 9, 15, '水果'),
  ('鸡蛋', 143, 12.6, 1.1, 9.5, '肉禽蛋'),
  ('燕麦片', 389, 13, 67, 7, '谷薯'),
  ('牛肉', 250, 26, 0, 15, '肉禽蛋'),
  ('三文鱼', 208, 20, 0, 13, '肉禽蛋'),
  ('白米饭', 130, 2.7, 28, 0.3, '谷薯'),
  ('红薯', 86, 1.6, 20, 0.1, '谷薯'),
  ('菠菜', 23, 2.9, 3.6, 0.4, '蔬菜'),
  ('香蕉', 89, 1.1, 23, 0.3, '水果'),
  ('土豆', 77, 2, 17, 0.1, '谷薯'),
  ('玉米', 86, 3.2, 19, 1.2, '谷薯'),
  ('羊肉', 294, 25, 0, 21, '肉禽蛋'),
  ('西红柿', 18, 0.9, 3.9, 0.2, '蔬菜'),
  ('黄瓜', 15, 0.7, 3.6, 0.1, '蔬菜'),
  ('豆腐', 81, 8.1, 4.2, 3.7, '肉禽蛋'),
  ('鸡腿肉', 181, 18, 0, 12, '肉禽蛋'),
  ('意面', 158, 5.8, 31, 0.9, '谷薯'),
  ('混合坚果', 607, 20, 21, 54, '油脂');
