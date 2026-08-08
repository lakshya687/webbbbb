import {
  MessageSquare, Bot, Sparkles, Image, Code2, Megaphone,
  Briefcase, ShoppingCart, GraduationCap, Zap, PenLine,
  Share2, Search, Mail, Scale, DollarSign, Heart, Palette,
  Camera, Video, FileCode, Table, Workflow, Link2, User,
  FileText, Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface PromptCategory {
  name: string;
  slug: string;
  icon: LucideIcon;
  color: string;
}

export const PROMPT_CATEGORIES: PromptCategory[] = [
  { name: 'ChatGPT', slug: 'chatgpt', icon: MessageSquare, color: '#10A37F' },
  { name: 'Claude', slug: 'claude', icon: Bot, color: '#D97757' },
  { name: 'Gemini', slug: 'gemini', icon: Sparkles, color: '#4285F4' },
  { name: 'Midjourney', slug: 'midjourney', icon: Image, color: '#7289DA' },
  { name: 'Stable Diffusion', slug: 'stable-diffusion', icon: Image, color: '#A855F7' },
  { name: 'Flux', slug: 'flux', icon: Image, color: '#22D3EE' },
  { name: 'Veo', slug: 'veo', icon: Video, color: '#F2A93B' },
  { name: 'Sora', slug: 'sora', icon: Video, color: '#0EA5E9' },
  { name: 'Coding', slug: 'coding', icon: Code2, color: '#22D3EE' },
  { name: 'Marketing', slug: 'marketing', icon: Megaphone, color: '#F2A93B' },
  { name: 'Business', slug: 'business', icon: Briefcase, color: '#4C7EA8' },
  { name: 'Sales', slug: 'sales', icon: ShoppingCart, color: '#F2A93B' },
  { name: 'Education', slug: 'education', icon: GraduationCap, color: '#4285F4' },
  { name: 'Productivity', slug: 'productivity', icon: Zap, color: '#22D3EE' },
  { name: 'Writing', slug: 'writing', icon: PenLine, color: '#A855F7' },
  { name: 'Social Media', slug: 'social-media', icon: Share2, color: '#F2A93B' },
  { name: 'SEO', slug: 'seo', icon: Search, color: '#4C7EA8' },
  { name: 'Email', slug: 'email', icon: Mail, color: '#F2A93B' },
  { name: 'Legal', slug: 'legal', icon: Scale, color: '#4C7EA8' },
  { name: 'Finance', slug: 'finance', icon: DollarSign, color: '#22D3EE' },
  { name: 'Health', slug: 'health', icon: Heart, color: '#F2A93B' },
  { name: 'Design', slug: 'design', icon: Palette, color: '#A855F7' },
  { name: 'Photography', slug: 'photography', icon: Camera, color: '#F2A93B' },
  { name: 'Video', slug: 'video', icon: Video, color: '#0EA5E9' },
  { name: 'Programming', slug: 'programming', icon: FileCode, color: '#22D3EE' },
  { name: 'Excel', slug: 'excel', icon: Table, color: '#22D3EE' },
  { name: 'Automation', slug: 'automation', icon: Workflow, color: '#A855F7' },
  { name: 'n8n', slug: 'n8n', icon: Workflow, color: '#EA4B71' },
  { name: 'Zapier', slug: 'zapier', icon: Link2, color: '#FF4F00' },
  { name: 'Career', slug: 'career', icon: User, color: '#4C7EA8' },
  { name: 'Resume', slug: 'resume', icon: FileText, color: '#4C7EA8' },
  { name: 'Interview', slug: 'interview', icon: Users, color: '#F2A93B' },
];

export const AI_MODELS = [
  { name: 'ChatGPT', slug: 'chatgpt', color: '#10A37F' },
  { name: 'Claude', slug: 'claude', color: '#D97757' },
  { name: 'Gemini', slug: 'gemini', color: '#4285F4' },
  { name: 'Midjourney', slug: 'midjourney', color: '#7289DA' },
  { name: 'Stable Diffusion', slug: 'stable-diffusion', color: '#A855F7' },
  { name: 'Flux', slug: 'flux', color: '#22D3EE' },
  { name: 'Veo', slug: 'veo', color: '#F2A93B' },
  { name: 'Sora', slug: 'sora', color: '#0EA5E9' },
  { name: 'DALL-E', slug: 'dall-e', color: '#22D3EE' },
  { name: 'Perplexity', slug: 'perplexity', color: '#22D3EE' },
];

export function getCategoryBySlug(slug: string): PromptCategory | undefined {
  return PROMPT_CATEGORIES.find(c => c.slug === slug);
}
