-- ============================================
-- FORGE DATABASE SCHEMA
-- ============================================

-- PROFILES TABLE
-- Extends Supabase auth.users with app-specific data
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  plan text default 'free' check (plan in ('free', 'starter', 'builder', 'pro')),
  brands_used integer default 0,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- BRANDS TABLE
-- Every brand a user creates lives here
create table if not exists public.brands (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  idea text not null,
  industry text,
  target_audience text,
  price_point text,
  status text default 'active' check (status in ('active', 'archived')),
  launch_readiness integer default 0,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);

-- SIGNAL RESULTS TABLE
-- Stores AI market intelligence results per brand
create table if not exists public.signal_results (
  id uuid default gen_random_uuid() primary key,
  brand_id uuid references public.brands(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  demand_score integer,
  competition_level text,
  audience_heat text,
  market_gap text,
  opportunity_window text,
  insights jsonb,
  competitor_map jsonb,
  pain_points jsonb,
  raw_response text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- CRAFT RESULTS TABLE
-- Stores AI brand identity results per brand
create table if not exists public.craft_results (
  id uuid default gen_random_uuid() primary key,
  brand_id uuid references public.brands(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  brand_names jsonb,
  selected_name text,
  taglines jsonb,
  selected_tagline text,
  brand_voice jsonb,
  color_palette jsonb,
  typography jsonb,
  product_concepts jsonb,
  raw_response text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

alter table public.profiles enable row level security;
alter table public.brands enable row level security;
alter table public.signal_results enable row level security;
alter table public.craft_results enable row level security;

-- PROFILES POLICIES
create policy "Users can view own profile"
  on public.profiles for select
  using ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.profiles for update
  using ((select auth.uid()) = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check ((select auth.uid()) = id);

-- BRANDS POLICIES
create policy "Users can view own brands"
  on public.brands for select
  using ((select auth.uid()) = user_id);

create policy "Users can create brands"
  on public.brands for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update own brands"
  on public.brands for update
  using ((select auth.uid()) = user_id);

create policy "Users can delete own brands"
  on public.brands for delete
  using ((select auth.uid()) = user_id);

-- SIGNAL RESULTS POLICIES
create policy "Users can view own signal results"
  on public.signal_results for select
  using ((select auth.uid()) = user_id);

create policy "Users can create signal results"
  on public.signal_results for insert
  with check ((select auth.uid()) = user_id);

-- CRAFT RESULTS POLICIES
create policy "Users can view own craft results"
  on public.craft_results for select
  using ((select auth.uid()) = user_id);

create policy "Users can create craft results"
  on public.craft_results for insert
  with check ((select auth.uid()) = user_id);

-- ============================================
-- PERFORMANCE INDEXES
-- ============================================

create index if not exists brands_user_id_idx on public.brands(user_id);
create index if not exists signal_results_brand_id_idx on public.signal_results(brand_id);
create index if not exists signal_results_user_id_idx on public.signal_results(user_id);
create index if not exists craft_results_brand_id_idx on public.craft_results(brand_id);
create index if not exists craft_results_user_id_idx on public.craft_results(user_id);

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
