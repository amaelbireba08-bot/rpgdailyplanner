/*
# Create Quest Planner RPG Schema (single-tenant, no auth)

## Overview
This migration creates the database schema for an autonomous daily planning,
anti-procrastination, and RPG gamification PWA. The app is single-tenant
(no sign-in screen), so all policies use `TO anon, authenticated`.

## New Tables

### player_profiles
- `id` (uuid, primary key)
- `character_name` (text, the hero's name)
- `avatar_emoji` (text, emoji representing the avatar)
- `level` (int, current level 1-100)
- `xp` (int, total experience points)
- `streak` (int, consecutive days completed)
- `last_completed_date` (date, last day a quest was validated)
- `total_quests_completed` (int, lifetime quest count)
- `created_at` (timestamptz)

### time_blocks
- `id` (uuid, primary key)
- `day_of_week` (int 0-6, Mon-Sun)
- `start_hour` (decimal, e.g. 8.5 = 8:30)
- `end_hour` (decimal)
- `block_type` (text: 'work' | 'study' | 'sport' | 'break' | 'rest')
- `title` (text, label for the block)
- `xp_reward` (int, XP earned on completion)
- `completed` (boolean, default false)
- `completed_at` (timestamptz, when validated)
- `completed_date` (date, which day it was completed)
- `created_at` (timestamptz)

### daily_quotes
- `id` (uuid, primary key)
- `quote_text` (text, the quote)
- `author` (text, who said it)
- `category` (text: 'motivation' | 'discipline' | 'anime' | 'teamwork' | 'serenity' | 'focus' | 'overcome')
- `quote_date` (date, which day the quote is for)
- `created_at` (timestamptz)

## Security
- RLS enabled on all tables.
- All policies use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`
  because this is a single-tenant app with intentionally shared data (no sign-in).
*/

-- Player profiles table
CREATE TABLE IF NOT EXISTS player_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  character_name text NOT NULL DEFAULT 'Hero',
  avatar_emoji text NOT NULL DEFAULT '⚔️',
  level int NOT NULL DEFAULT 1,
  xp int NOT NULL DEFAULT 0,
  streak int NOT NULL DEFAULT 0,
  last_completed_date date,
  total_quests_completed int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_profiles" ON player_profiles;
CREATE POLICY "anon_select_profiles" ON player_profiles FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_profiles" ON player_profiles;
CREATE POLICY "anon_insert_profiles" ON player_profiles FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_profiles" ON player_profiles;
CREATE POLICY "anon_update_profiles" ON player_profiles FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_profiles" ON player_profiles;
CREATE POLICY "anon_delete_profiles" ON player_profiles FOR DELETE
  TO anon, authenticated USING (true);

-- Time blocks table
CREATE TABLE IF NOT EXISTS time_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week int NOT NULL DEFAULT 0,
  start_hour decimal NOT NULL DEFAULT 9,
  end_hour decimal NOT NULL DEFAULT 10,
  block_type text NOT NULL DEFAULT 'work',
  title text NOT NULL DEFAULT 'Task',
  xp_reward int NOT NULL DEFAULT 50,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  completed_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE time_blocks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_blocks" ON time_blocks;
CREATE POLICY "anon_select_blocks" ON time_blocks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_blocks" ON time_blocks;
CREATE POLICY "anon_insert_blocks" ON time_blocks FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_blocks" ON time_blocks;
CREATE POLICY "anon_update_blocks" ON time_blocks FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_blocks" ON time_blocks;
CREATE POLICY "anon_delete_blocks" ON time_blocks FOR DELETE
  TO anon, authenticated USING (true);

-- Daily quotes table
CREATE TABLE IF NOT EXISTS daily_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_text text NOT NULL,
  author text NOT NULL DEFAULT 'Unknown',
  category text NOT NULL DEFAULT 'motivation',
  quote_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE daily_quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_quotes" ON daily_quotes;
CREATE POLICY "anon_select_quotes" ON daily_quotes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_quotes" ON daily_quotes;
CREATE POLICY "anon_insert_quotes" ON daily_quotes FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_quotes" ON daily_quotes;
CREATE POLICY "anon_update_quotes" ON daily_quotes FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_quotes" ON daily_quotes;
CREATE POLICY "anon_delete_quotes" ON daily_quotes FOR DELETE
  TO anon, authenticated USING (true);

-- Index for quick quote lookup by date
CREATE INDEX IF NOT EXISTS idx_daily_quotes_date ON daily_quotes (quote_date);
CREATE INDEX IF NOT EXISTS idx_time_blocks_day ON time_blocks (day_of_week);
