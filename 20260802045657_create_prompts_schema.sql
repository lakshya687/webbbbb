/*
# Create PromptVerse AI Prompt Hub Schema

## Overview
Creates the database schema for an AI Prompt Hub where users can discover, search,
organize, copy, and save prompts for leading AI models (ChatGPT, Claude, Gemini, etc.).

## New Tables

1. **prompts** — The core table storing all AI prompts
   - id (uuid, PK)
   - slug (text, unique) — URL-friendly identifier
   - title (text) — Prompt title
   - description (text) — Short description of what the prompt does
   - content (text) — The actual prompt text
   - category (text) — Category slug (e.g., "chatgpt", "coding", "marketing")
   - ai_models (text[]) — Array of compatible AI model slugs
   - difficulty (text) — "Beginner", "Intermediate", "Advanced"
   - tags (text[]) — Array of tag strings
   - author_name (text) — Creator display name
   - author_avatar (text) — Avatar URL or emoji
   - featured (boolean) — Whether this prompt is featured
   - trending (boolean) — Whether this prompt is trending
   - copies_count (integer) — Number of times copied
   - likes_count (integer) — Number of likes
   - rating_avg (numeric) — Average rating (1-5)
   - rating_count (integer) — Number of ratings
   - expected_output (text) — Description of expected output
   - tips (text) — Usage tips
   - created_at (timestamptz)

2. **prompt_comments** — Comments on prompts
   - id (uuid, PK)
   - prompt_id (uuid, FK to prompts)
   - author_name (text)
   - content (text)
   - created_at (timestamptz)

3. **prompt_ratings** — Individual ratings (1-5 stars)
   - id (uuid, PK)
   - prompt_id (uuid, FK to prompts)
   - rating (integer, 1-5)
   - created_at (timestamptz)

## Security
- RLS enabled on all tables
- All tables allow anon + authenticated read (public prompt library)
- All tables allow anon + authenticated write (community contributions)
- No user auth required — this is a public prompt hub
*/

-- Create prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  ai_models text[] DEFAULT '{}',
  difficulty text DEFAULT 'Beginner',
  tags text[] DEFAULT '{}',
  author_name text DEFAULT 'PromptVerse',
  author_avatar text DEFAULT '✨',
  featured boolean DEFAULT false,
  trending boolean DEFAULT false,
  copies_count integer DEFAULT 0,
  likes_count integer DEFAULT 0,
  rating_avg numeric DEFAULT 5.0,
  rating_count integer DEFAULT 1,
  expected_output text,
  tips text,
  created_at timestamptz DEFAULT now()
);

-- Create prompt_comments table
CREATE TABLE IF NOT EXISTS prompt_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid REFERENCES prompts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create prompt_ratings table
CREATE TABLE IF NOT EXISTS prompt_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id uuid REFERENCES prompts(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_ratings ENABLE ROW LEVEL SECURITY;

-- Policies for prompts (public read, public write)
DROP POLICY IF EXISTS "anon_select_prompts" ON prompts;
CREATE POLICY "anon_select_prompts" ON prompts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_prompts" ON prompts;
CREATE POLICY "anon_insert_prompts" ON prompts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_prompts" ON prompts;
CREATE POLICY "anon_update_prompts" ON prompts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_prompts" ON prompts;
CREATE POLICY "anon_delete_prompts" ON prompts FOR DELETE
  TO anon, authenticated USING (true);

-- Policies for prompt_comments
DROP POLICY IF EXISTS "anon_select_comments" ON prompt_comments;
CREATE POLICY "anon_select_comments" ON prompt_comments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_comments" ON prompt_comments;
CREATE POLICY "anon_insert_comments" ON prompt_comments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_comments" ON prompt_comments;
CREATE POLICY "anon_delete_comments" ON prompt_comments FOR DELETE
  TO anon, authenticated USING (true);

-- Policies for prompt_ratings
DROP POLICY IF EXISTS "anon_select_ratings" ON prompt_ratings;
CREATE POLICY "anon_select_ratings" ON prompt_ratings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_ratings" ON prompt_ratings;
CREATE POLICY "anon_insert_ratings" ON prompt_ratings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_prompts_category ON prompts(category);
CREATE INDEX IF NOT EXISTS idx_prompts_slug ON prompts(slug);
CREATE INDEX IF NOT EXISTS idx_prompts_featured ON prompts(featured);
CREATE INDEX IF NOT EXISTS idx_prompts_trending ON prompts(trending);
CREATE INDEX IF NOT EXISTS idx_comments_prompt_id ON prompt_comments(prompt_id);
CREATE INDEX IF NOT EXISTS idx_ratings_prompt_id ON prompt_ratings(prompt_id);
