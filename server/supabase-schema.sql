create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  account_name text not null unique,
  username text not null,
  password_hash text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  score integer not null check (score >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists scores_user_id_score_idx
  on public.scores (user_id, score desc, created_at asc);

create index if not exists scores_score_idx
  on public.scores (score desc, created_at asc);
