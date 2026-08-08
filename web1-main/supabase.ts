import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PromptRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  ai_models: string[];
  difficulty: string;
  tags: string[];
  author_name: string;
  author_avatar: string;
  featured: boolean;
  trending: boolean;
  copies_count: number;
  likes_count: number;
  rating_avg: number;
  rating_count: number;
  expected_output: string | null;
  tips: string | null;
  created_at: string;
}

export interface PromptComment {
  id: string;
  prompt_id: string;
  author_name: string;
  content: string;
  created_at: string;
}
