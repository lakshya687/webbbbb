import { TOOLS, type Tool } from '@/lib/tools';

export interface ScratchFieldOption {
  key: string;
  label: string;
  options: string[];
}

const CATEGORY_DEFAULTS: Record<string, { placeholder: string; fields: ScratchFieldOption[] }> = {
  'YouTube Tools': {
    placeholder: 'Paste a YouTube video or channel URL...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['Tech', 'Gaming', 'Cooking', 'Fitness', 'Education', 'Vlog', 'Finance', 'Beauty'] },
      { key: 'tone', label: 'Tone', options: ['Energetic', 'Calm/Informative', 'Funny', 'Professional', 'Dramatic'] },
      { key: 'goal', label: 'Goal', options: ['Subscribers', 'Watch time', 'Comments', 'CTR'] },
    ],
  },
  'Instagram Tools': {
    placeholder: 'Paste an Instagram post, reel, or profile URL...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['Fashion', 'Fitness', 'Food', 'Travel', 'Business', 'Lifestyle', 'Beauty'] },
      { key: 'tone', label: 'Tone', options: ['Playful', 'Aspirational', 'Relatable', 'Bold', 'Minimal'] },
      { key: 'goal', label: 'Goal', options: ['Followers', 'Saves', 'Shares', 'DMs/leads'] },
    ],
  },
  'TikTok Tools': {
    placeholder: 'Paste a TikTok video or profile URL...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['Comedy', 'Dance', 'Education', 'Product', 'Storytime', 'Trends'] },
      { key: 'tone', label: 'Tone', options: ['Funny', 'Shocking', 'Wholesome', 'Fast-paced', 'Deadpan'] },
      { key: 'goal', label: 'Goal', options: ['Views', 'Shares', 'Follows', 'Trend participation'] },
    ],
  },
  'LinkedIn Tools': {
    placeholder: 'Paste a LinkedIn post or profile URL...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['Career advice', 'Industry insight', 'Company news', 'Thought leadership', 'Job search'] },
      { key: 'tone', label: 'Tone', options: ['Professional', 'Conversational', 'Bold/contrarian', 'Data-driven'] },
      { key: 'goal', label: 'Goal', options: ['Engagement', 'Profile views', 'Leads', 'Connection requests'] },
    ],
  },
  'AI Writing': {
    placeholder: 'Paste a blog post, article, or product page URL...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['SaaS', 'E-commerce', 'Agency', 'Personal brand', 'Local business'] },
      { key: 'tone', label: 'Tone', options: ['Professional', 'Friendly', 'Persuasive', 'Technical', 'Storytelling'] },
      { key: 'goal', label: 'Goal', options: ['Conversions', 'SEO ranking', 'Brand awareness', 'Replies/leads'] },
    ],
  },
  'SEO Tools': {
    placeholder: 'Paste the page URL this is for...',
    fields: [
      { key: 'page_topic', label: 'Page topic', options: ['Product', 'Service', 'Blog post', 'Landing page', 'Homepage'] },
      { key: 'target_keyword', label: 'Target keyword', options: ['Brand name', 'Product category', 'How-to query', 'Comparison', 'Local'] },
    ],
  },
  'Thumbnail Tools': {
    placeholder: 'Paste your video URL or upload a thumbnail...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['Tech', 'Gaming', 'Vlog', 'Tutorial', 'News/commentary'] },
      { key: 'tone', label: 'Tone', options: ['Bold/shocking', 'Clean/minimal', 'Curiosity-driven', 'Emotional'] },
      { key: 'goal', label: 'Goal', options: ['CTR', 'Watch time', 'Brand consistency'] },
    ],
  },
  'Creator Utilities': {
    placeholder: 'Paste your channel/profile URL for context (optional)...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['Tech', 'Gaming', 'Lifestyle', 'Education', 'Business', 'Fitness'] },
      { key: 'tone', label: 'Tone', options: ['Casual', 'Professional'] },
      { key: 'goal', label: 'Goal', options: ['Consistency', 'Growth', 'Engagement', 'Monetization'] },
    ],
  },
  'Marketing Tools': {
    placeholder: 'Paste a relevant link...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['General', 'Business', 'Personal', 'Creative'] },
      { key: 'tone', label: 'Tone', options: ['Professional', 'Casual', 'Playful'] },
      { key: 'goal', label: 'Goal', options: ['Engagement', 'Growth', 'Conversions'] },
    ],
  },
  'Social Media Tools': {
    placeholder: 'Paste a relevant link...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['Fashion', 'Fitness', 'Food', 'Travel', 'Business', 'Lifestyle', 'Beauty'] },
      { key: 'tone', label: 'Tone', options: ['Playful', 'Aspirational', 'Relatable', 'Bold', 'Minimal'] },
      { key: 'goal', label: 'Goal', options: ['Followers', 'Saves', 'Shares', 'DMs/leads'] },
    ],
  },
  'Advertising Tools': {
    placeholder: 'Paste a relevant link...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['SaaS', 'E-commerce', 'Agency', 'Local business', 'B2B'] },
      { key: 'tone', label: 'Tone', options: ['Professional', 'Persuasive', 'Bold', 'Data-driven'] },
      { key: 'goal', label: 'Goal', options: ['Clicks', 'Conversions', 'Brand awareness', 'Leads'] },
    ],
  },
  'Email Marketing': {
    placeholder: 'Paste a relevant link...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['SaaS', 'E-commerce', 'Agency', 'Newsletter', 'Course creator'] },
      { key: 'tone', label: 'Tone', options: ['Professional', 'Friendly', 'Persuasive', 'Urgent'] },
      { key: 'goal', label: 'Goal', options: ['Open rate', 'Click rate', 'Conversions', 'Re-engagement'] },
    ],
  },
  'Analytics Tools': {
    placeholder: 'Paste a relevant link...',
    fields: [],
  },
  'Branding Tools': {
    placeholder: 'Paste a relevant link...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['Tech', 'Fashion', 'Food', 'Fitness', 'Finance', 'Lifestyle', 'B2B'] },
      { key: 'tone', label: 'Tone', options: ['Bold', 'Minimal', 'Playful', 'Luxury', 'Trustworthy'] },
    ],
  },
  'Business Tools': {
    placeholder: 'Paste a relevant link...',
    fields: [
      { key: 'industry', label: 'Industry', options: ['SaaS', 'E-commerce', 'Agency', 'Local business', 'Startup', 'Enterprise'] },
      { key: 'tone', label: 'Tone', options: ['Professional', 'Persuasive', 'Data-driven', 'Conversational'] },
    ],
  },
  'Website Tools': {
    placeholder: 'Paste a relevant link...',
    fields: [
      { key: 'niche', label: 'Niche', options: ['SaaS', 'E-commerce', 'Agency', 'Personal brand', 'Local business'] },
      { key: 'tone', label: 'Tone', options: ['Professional', 'Friendly', 'Persuasive', 'Minimal'] },
    ],
  },
};

const DEFAULT_FALLBACK = {
  placeholder: 'Paste a relevant link...',
  fields: [
    { key: 'niche', label: 'Niche', options: ['General', 'Business', 'Personal', 'Creative'] },
    { key: 'tone', label: 'Tone', options: ['Professional', 'Casual', 'Playful'] },
    { key: 'goal', label: 'Goal', options: ['Engagement', 'Growth', 'Conversions'] },
  ] as ScratchFieldOption[],
};

export function getLinkPlaceholder(tool: Tool): string {
  return tool.linkHint || CATEGORY_DEFAULTS[tool.category]?.placeholder || DEFAULT_FALLBACK.placeholder;
}

export function getScratchFields(tool: Tool): ScratchFieldOption[] {
  const catDefaults = CATEGORY_DEFAULTS[tool.category]?.fields || DEFAULT_FALLBACK.fields;
  if (!tool.scratchFields || tool.scratchFields.length === 0) return catDefaults;

  const fieldMap = new Map(catDefaults.map(f => [f.key, f]));
  return tool.scratchFields
    .map(key => fieldMap.get(key))
    .filter((f): f is ScratchFieldOption => f !== undefined);
}

export function hasLinkMode(tool: Tool): boolean {
  return !tool.scratchOnly && tool.inputType !== 'number' && tool.inputType !== 'multi-input';
}

export function hasScratchMode(tool: Tool): boolean {
  return tool.inputType !== 'number' && tool.inputType !== 'multi-input';
}
