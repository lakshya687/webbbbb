import { SEED_PROMPTS } from './prompt-data';
import { SEED_PROMPTS_BATCH_2 } from './prompt-data-2';
import { SEED_PROMPTS_BATCH_3 } from './prompt-data-3';
import { supabase } from './supabase';
import type { PromptRow } from './supabase';
import type { SeedPrompt } from './prompt-data';

export const ALL_SEED_PROMPTS: SeedPrompt[] = [
  ...SEED_PROMPTS,
  ...SEED_PROMPTS_BATCH_2,
  ...SEED_PROMPTS_BATCH_3,
];

export async function seedPromptsIfNeeded(): Promise<void> {
  const { count } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true });

  if (count && count > 0) return;

  const rows = ALL_SEED_PROMPTS.map((p): Omit<PromptRow, 'id' | 'created_at'> => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    content: p.content,
    category: p.category,
    ai_models: p.ai_models,
    difficulty: p.difficulty,
    tags: p.tags,
    author_name: p.author_name,
    author_avatar: p.author_avatar,
    featured: p.featured,
    trending: p.trending,
    copies_count: p.copies_count,
    likes_count: p.likes_count,
    rating_avg: p.rating_avg,
    rating_count: p.rating_count,
    expected_output: p.expected_output,
    tips: p.tips,
  }));

  const { error } = await supabase.from('prompts').insert(rows);
  if (error) {
    console.error('Failed to seed prompts:', error.message);
  }
}

export async function fetchPrompts(): Promise<PromptRow[]> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .order('copies_count', { ascending: false });

  if (error) {
    console.error('Failed to fetch prompts:', error.message);
    return [];
  }
  return data || [];
}

export async function fetchPromptBySlug(slug: string): Promise<PromptRow | null> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('Failed to fetch prompt:', error.message);
    return null;
  }
  return data;
}

export async function fetchComments(promptId: string) {
  const { data, error } = await supabase
    .from('prompt_comments')
    .select('*')
    .eq('prompt_id', promptId)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data || [];
}

export async function addComment(promptId: string, authorName: string, content: string) {
  const { data, error } = await supabase
    .from('prompt_comments')
    .insert({ prompt_id: promptId, author_name: authorName, content })
    .select('*')
    .single();

  if (error) return null;
  return data;
}

export async function incrementCopyCount(promptId: string) {
  const { error } = await supabase.rpc('increment_copy_count', { prompt_id: promptId });
  if (error) {
    // Fallback: fetch and update
    const { data } = await supabase
      .from('prompts')
      .select('copies_count')
      .eq('id', promptId)
      .maybeSingle();
    if (data) {
      await supabase
        .from('prompts')
        .update({ copies_count: (data.copies_count || 0) + 1 })
        .eq('id', promptId);
    }
  }
}

export async function ratePrompt(promptId: string, rating: number) {
  const { error } = await supabase
    .from('prompt_ratings')
    .insert({ prompt_id: promptId, rating });

  if (!error) {
    // Update the prompt's rating_avg and rating_count
    const { data: ratings } = await supabase
      .from('prompt_ratings')
      .select('rating')
      .eq('prompt_id', promptId);

    if (ratings && ratings.length > 0) {
      const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
      await supabase
        .from('prompts')
        .update({ rating_avg: Math.round(avg * 10) / 10, rating_count: ratings.length })
        .eq('id', promptId);
    }
  }
}
