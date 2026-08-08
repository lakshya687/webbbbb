export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  featured: boolean;
  isNew: boolean;
  inputType: 'text' | 'textarea' | 'number' | 'multi-input';
  outputType: string;
}

export const CATEGORIES = [
  { name: 'YouTube Tools', icon: 'Youtube', slug: 'youtube' },
  { name: 'Instagram Tools', icon: 'Instagram', slug: 'instagram' },
  { name: 'TikTok Tools', icon: 'Music', slug: 'tiktok' },
  { name: 'LinkedIn Tools', icon: 'Linkedin', slug: 'linkedin' },
  { name: 'AI Writing', icon: 'Sparkles', slug: 'ai-writing' },
  { name: 'SEO Tools', icon: 'Search', slug: 'seo' },
  { name: 'Marketing Tools', icon: 'TrendingUp', slug: 'marketing' },
  { name: 'Thumbnail Tools', icon: 'Image', slug: 'thumbnail' },
  { name: 'Creator Calculators', icon: 'Calculator', slug: 'calculators' },
  { name: 'Creator Utilities', icon: 'Zap', slug: 'utilities' },
];

export const TOOLS: Tool[] = [
  // YouTube Tools (20)
  { id: 'yt-1', slug: 'youtube-title-generator', name: 'YouTube Title Generator', description: 'Generate compelling YouTube titles that boost CTR', category: 'YouTube Tools', icon: 'Sparkles', featured: true, isNew: true, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-2', slug: 'youtube-description-generator', name: 'Description Generator', description: 'Create engaging video descriptions with keywords', category: 'YouTube Tools', icon: 'FileText', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-3', slug: 'youtube-script-generator', name: 'Script Generator', description: 'Write compelling video scripts in minutes', category: 'YouTube Tools', icon: 'BookOpen', featured: false, isNew: true, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-4', slug: 'youtube-outline-generator', name: 'Video Outline Generator', description: 'Structure your video content effectively', category: 'YouTube Tools', icon: 'List', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-5', slug: 'youtube-thumbnail-text', name: 'Thumbnail Text Generator', description: 'Generate attention-grabbing thumbnail text', category: 'YouTube Tools', icon: 'Type', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'yt-6', slug: 'youtube-thumbnail-headline', name: 'Thumbnail Headline Generator', description: 'Create impactful thumbnail headlines', category: 'YouTube Tools', icon: 'Heading2', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-7', slug: 'youtube-intro-generator', name: 'Intro Generator', description: 'Write engaging video intros', category: 'YouTube Tools', icon: 'Play', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-8', slug: 'youtube-outro-generator', name: 'Outro Generator', description: 'Create memorable video outros', category: 'YouTube Tools', icon: 'SkipForward', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-9', slug: 'youtube-hook-generator', name: 'Hook Generator', description: 'Generate powerful video hooks', category: 'YouTube Tools', icon: 'Zap', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-10', slug: 'youtube-idea-generator', name: 'Video Idea Generator', description: 'Get fresh video ideas for your channel', category: 'YouTube Tools', icon: 'Lightbulb', featured: false, isNew: true, inputType: 'text', outputType: 'text' },
  { id: 'yt-11', slug: 'youtube-tag-generator', name: 'Tag Generator', description: 'Generate SEO-optimized YouTube tags', category: 'YouTube Tools', icon: 'Tags', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-12', slug: 'youtube-keyword-generator', name: 'Keyword Generator', description: 'Find high-volume keywords for your videos', category: 'YouTube Tools', icon: 'Key', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'yt-13', slug: 'youtube-shorts-idea', name: 'Shorts Idea Generator', description: 'Generate viral YouTube Shorts ideas', category: 'YouTube Tools', icon: 'Video', featured: false, isNew: true, inputType: 'text', outputType: 'text' },
  { id: 'yt-14', slug: 'youtube-playlist-name', name: 'Playlist Name Generator', description: 'Create catchy playlist names', category: 'YouTube Tools', icon: 'ListMusic', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'yt-15', slug: 'youtube-channel-name', name: 'Channel Name Generator', description: 'Generate unique YouTube channel names', category: 'YouTube Tools', icon: 'Users', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'yt-16', slug: 'youtube-channel-description', name: 'Channel Description Generator', description: 'Write compelling channel descriptions', category: 'YouTube Tools', icon: 'FileText', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-17', slug: 'youtube-community-post', name: 'Community Post Generator', description: 'Create engaging community posts', category: 'YouTube Tools', icon: 'MessageCircle', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-18', slug: 'youtube-chapter-generator', name: 'Video Chapter Generator', description: 'Generate video chapters for better UX', category: 'YouTube Tools', icon: 'Clock', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-19', slug: 'youtube-summary-generator', name: 'Video Summary Generator', description: 'Create concise video summaries', category: 'YouTube Tools', icon: 'Minimize2', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'yt-20', slug: 'youtube-cta-generator', name: 'CTA Generator', description: 'Generate effective call-to-actions', category: 'YouTube Tools', icon: 'Send', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },

  // Instagram Tools (12)
  { id: 'ig-1', slug: 'instagram-caption-generator', name: 'Caption Generator', description: 'Write engaging Instagram captions', category: 'Instagram Tools', icon: 'MessageSquare', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ig-2', slug: 'instagram-hashtag-generator', name: 'Hashtag Generator', description: 'Generate trending hashtags for posts', category: 'Instagram Tools', icon: 'Hash', featured: true, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'ig-3', slug: 'instagram-bio-generator', name: 'Bio Generator', description: 'Create a compelling Instagram bio', category: 'Instagram Tools', icon: 'User', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ig-4', slug: 'instagram-username-generator', name: 'Username Generator', description: 'Generate unique Instagram usernames', category: 'Instagram Tools', icon: 'AtSign', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'ig-5', slug: 'instagram-reel-hook', name: 'Reel Hook Generator', description: 'Create viral reel hooks', category: 'Instagram Tools', icon: 'Zap', featured: false, isNew: true, inputType: 'textarea', outputType: 'text' },
  { id: 'ig-6', slug: 'instagram-carousel-generator', name: 'Carousel Generator', description: 'Plan engaging carousel posts', category: 'Instagram Tools', icon: 'Grid', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ig-7', slug: 'instagram-story-idea', name: 'Story Idea Generator', description: 'Get creative Instagram story ideas', category: 'Instagram Tools', icon: 'Image', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'ig-8', slug: 'instagram-comment-generator', name: 'Comment Generator', description: 'Generate engaging comments', category: 'Instagram Tools', icon: 'MessageCircle', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ig-9', slug: 'instagram-dm-generator', name: 'DM Generator', description: 'Write effective direct messages', category: 'Instagram Tools', icon: 'Mail', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ig-10', slug: 'instagram-cta-generator', name: 'CTA Generator', description: 'Create conversion-focused CTAs', category: 'Instagram Tools', icon: 'Send', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ig-11', slug: 'instagram-giveaway-caption', name: 'Giveaway Caption Generator', description: 'Write giveaway captions that drive engagement', category: 'Instagram Tools', icon: 'Gift', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ig-12', slug: 'instagram-pitch-generator', name: 'Influencer Pitch Generator', description: 'Create compelling influencer pitches', category: 'Instagram Tools', icon: 'Megaphone', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },

  // TikTok Tools (7)
  { id: 'tt-1', slug: 'tiktok-hook-generator', name: 'Hook Generator', description: 'Generate viral TikTok hooks', category: 'TikTok Tools', icon: 'Zap', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'tt-2', slug: 'tiktok-caption-generator', name: 'Caption Generator', description: 'Write engaging TikTok captions', category: 'TikTok Tools', icon: 'MessageSquare', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'tt-3', slug: 'tiktok-hashtag-generator', name: 'Hashtag Generator', description: 'Generate trending TikTok hashtags', category: 'TikTok Tools', icon: 'Hash', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'tt-4', slug: 'tiktok-idea-generator', name: 'Video Idea Generator', description: 'Get viral TikTok video ideas', category: 'TikTok Tools', icon: 'Lightbulb', featured: false, isNew: true, inputType: 'text', outputType: 'text' },
  { id: 'tt-5', slug: 'tiktok-script-generator', name: 'Script Generator', description: 'Write TikTok video scripts', category: 'TikTok Tools', icon: 'BookOpen', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'tt-6', slug: 'tiktok-trending-planner', name: 'Trending Content Planner', description: 'Plan trending content strategies', category: 'TikTok Tools', icon: 'TrendingUp', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'tt-7', slug: 'tiktok-sound-idea', name: 'Sound Idea Generator', description: 'Find trending sounds for your videos', category: 'TikTok Tools', icon: 'Music', featured: false, isNew: true, inputType: 'text', outputType: 'text' },

  // LinkedIn Tools (7)
  { id: 'li-1', slug: 'linkedin-post-generator', name: 'LinkedIn Post Generator', description: 'Write professional LinkedIn posts', category: 'LinkedIn Tools', icon: 'Linkedin', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'li-2', slug: 'linkedin-headline-generator', name: 'Headline Generator', description: 'Create compelling LinkedIn headlines', category: 'LinkedIn Tools', icon: 'Heading1', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'li-3', slug: 'linkedin-about-generator', name: 'About Section Generator', description: 'Write professional about sections', category: 'LinkedIn Tools', icon: 'User', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'li-4', slug: 'linkedin-connection-request', name: 'Connection Request Generator', description: 'Write personalized connection requests', category: 'LinkedIn Tools', icon: 'UserPlus', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'li-5', slug: 'linkedin-cold-message', name: 'Cold Message Generator', description: 'Create effective cold messages', category: 'LinkedIn Tools', icon: 'Mail', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'li-6', slug: 'linkedin-comment-generator', name: 'Comment Generator', description: 'Write engaging LinkedIn comments', category: 'LinkedIn Tools', icon: 'MessageCircle', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'li-7', slug: 'linkedin-poll-generator', name: 'Poll Generator', description: 'Create engaging LinkedIn polls', category: 'LinkedIn Tools', icon: 'BarChart3', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },

  // AI Writing Tools (12)
  { id: 'ai-1', slug: 'blog-title-generator', name: 'Blog Title Generator', description: 'Generate SEO-friendly blog titles', category: 'AI Writing', icon: 'Sparkles', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-2', slug: 'blog-outline-generator', name: 'Blog Outline Generator', description: 'Create structured blog outlines', category: 'AI Writing', icon: 'List', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-3', slug: 'article-generator', name: 'Article Generator', description: 'Write full-length articles', category: 'AI Writing', icon: 'BookOpen', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-4', slug: 'email-generator', name: 'Email Generator', description: 'Write professional emails', category: 'AI Writing', icon: 'Mail', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-5', slug: 'cold-email-generator', name: 'Cold Email Generator', description: 'Create effective cold emails', category: 'AI Writing', icon: 'Send', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-6', slug: 'sales-copy-generator', name: 'Sales Copy Generator', description: 'Write persuasive sales copy', category: 'AI Writing', icon: 'DollarSign', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-7', slug: 'landing-page-generator', name: 'Landing Page Generator', description: 'Create landing page copy', category: 'AI Writing', icon: 'Globe', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-8', slug: 'ad-copy-generator', name: 'Ad Copy Generator', description: 'Write high-converting ad copy', category: 'AI Writing', icon: 'Megaphone', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-9', slug: 'product-description-generator', name: 'Product Description Generator', description: 'Write compelling product descriptions', category: 'AI Writing', icon: 'Package', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-10', slug: 'website-copy-generator', name: 'Website Copy Generator', description: 'Create website copy', category: 'AI Writing', icon: 'Globe', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-11', slug: 'press-release-generator', name: 'Press Release Generator', description: 'Write professional press releases', category: 'AI Writing', icon: 'Newspaper', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'ai-12', slug: 'proposal-generator', name: 'Business Proposal Generator', description: 'Create business proposals', category: 'AI Writing', icon: 'FileText', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },

  // SEO Tools (10)
  { id: 'seo-1', slug: 'meta-title-generator', name: 'Meta Title Generator', description: 'Generate SEO-optimized meta titles', category: 'SEO Tools', icon: 'Sparkles', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'seo-2', slug: 'meta-description-generator', name: 'Meta Description Generator', description: 'Create compelling meta descriptions', category: 'SEO Tools', icon: 'FileText', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'seo-3', slug: 'keyword-cluster-generator', name: 'Keyword Cluster Generator', description: 'Generate keyword clusters', category: 'SEO Tools', icon: 'Layers', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'seo-4', slug: 'slug-generator', name: 'Slug Generator', description: 'Generate SEO-friendly URL slugs', category: 'SEO Tools', icon: 'Link', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'seo-5', slug: 'schema-generator', name: 'Schema Generator', description: 'Generate schema markup', category: 'SEO Tools', icon: 'Code', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'seo-6', slug: 'faq-generator', name: 'FAQ Generator', description: 'Create SEO-optimized FAQs', category: 'SEO Tools', icon: 'HelpCircle', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'seo-7', slug: 'robots-txt-generator', name: 'Robots.txt Generator', description: 'Generate robots.txt file', category: 'SEO Tools', icon: 'Bot', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'seo-8', slug: 'sitemap-generator', name: 'XML Sitemap Generator', description: 'Generate XML sitemaps', category: 'SEO Tools', icon: 'Map', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'seo-9', slug: 'canonical-url-generator', name: 'Canonical URL Generator', description: 'Generate canonical URLs', category: 'SEO Tools', icon: 'Link2', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'seo-10', slug: 'og-generator', name: 'Open Graph Generator', description: 'Generate Open Graph tags', category: 'SEO Tools', icon: 'Share2', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },

  // Marketing Tools (9)
  { id: 'mkt-1', slug: 'utm-builder', name: 'UTM Builder', description: 'Create UTM parameters for tracking', category: 'Marketing Tools', icon: 'Link', featured: true, isNew: false, inputType: 'multi-input', outputType: 'text' },
  { id: 'mkt-2', slug: 'roi-calculator', name: 'ROI Calculator', description: 'Calculate marketing ROI', category: 'Marketing Tools', icon: 'Calculator', featured: false, isNew: false, inputType: 'number', outputType: 'number' },
  { id: 'mkt-3', slug: 'roas-calculator', name: 'ROAS Calculator', description: 'Calculate return on ad spend', category: 'Marketing Tools', icon: 'TrendingUp', featured: false, isNew: false, inputType: 'number', outputType: 'number' },
  { id: 'mkt-4', slug: 'cpm-calculator', name: 'CPM Calculator', description: 'Calculate cost per mille', category: 'Marketing Tools', icon: 'DollarSign', featured: false, isNew: false, inputType: 'number', outputType: 'number' },
  { id: 'mkt-5', slug: 'cpc-calculator', name: 'CPC Calculator', description: 'Calculate cost per click', category: 'Marketing Tools', icon: 'Mouse', featured: false, isNew: false, inputType: 'number', outputType: 'number' },
  { id: 'mkt-6', slug: 'cpa-calculator', name: 'CPA Calculator', description: 'Calculate cost per acquisition', category: 'Marketing Tools', icon: 'ShoppingCart', featured: false, isNew: false, inputType: 'number', outputType: 'number' },
  { id: 'mkt-7', slug: 'engagement-rate-calculator', name: 'Engagement Rate Calculator', description: 'Calculate social media engagement', category: 'Marketing Tools', icon: 'Heart', featured: false, isNew: false, inputType: 'number', outputType: 'number' },
  { id: 'mkt-8', slug: 'conversion-rate-calculator', name: 'Conversion Rate Calculator', description: 'Calculate conversion rates', category: 'Marketing Tools', icon: 'Target', featured: false, isNew: false, inputType: 'number', outputType: 'number' },
  { id: 'mkt-9', slug: 'budget-calculator', name: 'Marketing Budget Calculator', description: 'Plan your marketing budget', category: 'Marketing Tools', icon: 'Wallet', featured: false, isNew: false, inputType: 'number', outputType: 'number' },

  // Thumbnail Tools (4)
  { id: 'thumb-1', slug: 'thumbnail-text-generator', name: 'Thumbnail Text Generator', description: 'Generate attention-grabbing thumbnail text', category: 'Thumbnail Tools', icon: 'Type', featured: true, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'thumb-2', slug: 'thumbnail-analyzer', name: 'Thumbnail Analyzer', description: 'Analyze and improve thumbnails', category: 'Thumbnail Tools', icon: 'Eye', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'thumb-3', slug: 'headline-score-checker', name: 'Headline Score Checker', description: 'Check headline effectiveness', category: 'Thumbnail Tools', icon: 'CheckCircle2', featured: false, isNew: false, inputType: 'text', outputType: 'number' },
  { id: 'thumb-4', slug: 'ctr-suggestions', name: 'CTR Improvement Suggestions', description: 'Get CTR improvement tips', category: 'Thumbnail Tools', icon: 'Lightbulb', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },

  // Creator Utilities (8)
  { id: 'util-1', slug: 'content-calendar-generator', name: 'Content Calendar Generator', description: 'Generate content calendars', category: 'Creator Utilities', icon: 'Calendar', featured: true, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'util-2', slug: 'posting-schedule-planner', name: 'Posting Schedule Planner', description: 'Plan optimal posting times', category: 'Creator Utilities', icon: 'Clock', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'util-3', slug: 'brand-color-generator', name: 'Brand Color Generator', description: 'Generate brand color palettes', category: 'Creator Utilities', icon: 'Palette', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'util-4', slug: 'font-pair-generator', name: 'Font Pair Generator', description: 'Find complementary font pairs', category: 'Creator Utilities', icon: 'Type', featured: false, isNew: false, inputType: 'text', outputType: 'text' },
  { id: 'util-5', slug: 'sponsorship-rate-calculator', name: 'Sponsorship Rate Calculator', description: 'Calculate sponsorship rates', category: 'Creator Utilities', icon: 'DollarSign', featured: false, isNew: false, inputType: 'number', outputType: 'number' },
  { id: 'util-6', slug: 'income-goal-calculator', name: 'Income Goal Calculator', description: 'Plan income goals', category: 'Creator Utilities', icon: 'TrendingUp', featured: false, isNew: false, inputType: 'number', outputType: 'number' },
  { id: 'util-7', slug: 'publishing-checklist', name: 'Video Publishing Checklist', description: 'Pre-publish video checklist', category: 'Creator Utilities', icon: 'CheckSquare', featured: false, isNew: false, inputType: 'textarea', outputType: 'text' },
  { id: 'util-8', slug: 'idea-vault', name: 'Idea Vault', description: 'Store and organize content ideas', category: 'Creator Utilities', icon: 'BookMarked', featured: false, isNew: true, inputType: 'textarea', outputType: 'text' },
];

export const getFeaturedTools = () => TOOLS.filter(t => t.featured).slice(0, 6);
export const getNewTools = () => TOOLS.filter(t => t.isNew).slice(0, 6);
export const getToolsByCategory = (category: string) => TOOLS.filter(t => t.category === category);
export const getToolBySlug = (slug: string) => TOOLS.find(t => t.slug === slug);
