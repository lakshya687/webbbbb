export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
  relatedToolSlugs: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'youtube-titles-that-actually-get-clicks',
    title: 'YouTube Titles That Actually Get Clicks (Not Just Views)',
    excerpt: 'The difference between a good title and a great one comes down to three things — and none of them are clickbait.',
    date: '2026-07-28',
    readTime: '5 min read',
    category: 'YouTube',
    content: `# YouTube Titles That Actually Get Clicks\n\nLet's be honest: most YouTube title advice is just "use a number and be exciting." That's not wrong, but it's not enough either.\n\n## The three things that matter\n\n**1. Front-load the hook.** The first 3-4 words of your title are what show up in search results and the browse feed. If those words don't create curiosity or promise value, the rest of the title doesn't matter.\n\n**2. Match the thumbnail, don't repeat it.** Your title and thumbnail should complement each other, not say the same thing. If your thumbnail says "I tried it," your title should say what "it" is and what happened.\n\n**3. Keep it under 60 characters.** YouTube truncates titles around 60 characters in search results. Your most important words need to fit before the cutoff.\n\n## What doesn't work\n\n- All-caps titles (YouTube may suppress them)\n- Titles that don't match the content (kills watch time, which kills ranking)\n- Vague titles like "My New Video" or "Episode 12"\n\n## The fix\n\nUse the Title Generator to get 4-5 options instantly, then pick the one that best matches your thumbnail. The tool front-loads hooks and stays under character limits automatically.`,
    relatedToolSlugs: ['youtube-title-generator', 'youtube-thumbnail-text', 'youtube-hook-generator'],
  },
  {
    slug: 'instagram-reels-vs-posts-2026',
    title: 'Reels vs Posts: What Actually Performs in 2026',
    excerpt: 'The algorithm has shifted again. Here\'s what the data says about where to put your effort.',
    date: '2026-07-20',
    readTime: '4 min read',
    category: 'Instagram',
    content: `# Reels vs Posts in 2026\n\nInstagram's algorithm has gone through several shifts, but one thing has stayed consistent: Reels get the most reach, while carousel posts get the most saves.\n\n## When to use Reels\n\nReels are your discovery engine. If your goal is new followers, Reels are the fastest path. The key is the first 3 seconds — if you don't hook them by then, they scroll.\n\n## When to use carousels\n\nCarousels get saved more than any other format. Saves are a strong signal to the algorithm that your content is valuable. Use carousels for educational content, tips, and step-by-step guides.\n\n## The best strategy? Both.\n\nUse Reels to attract new followers and carousels to deepen the relationship. Repurpose one idea into both formats using the Content Repurposing Generator.`,
    relatedToolSlugs: ['instagram-caption-generator', 'instagram-reel-hook', 'instagram-carousel-generator'],
  },
  {
    slug: 'seo-meta-descriptions-that-work',
    title: 'How to Write Meta Descriptions That Actually Improve CTR',
    excerpt: 'Meta descriptions don\'t affect rankings directly, but they\'re the single biggest lever for getting more clicks from the traffic you already rank for.',
    date: '2026-07-12',
    readTime: '6 min read',
    category: 'SEO',
    content: `# Meta Descriptions That Work\n\nHere's the truth most SEO guides skip: meta descriptions don't directly affect your rankings. But they do affect your click-through rate from search results — and CTR is a ranking signal.\n\n## The formula\n\nA good meta description has four parts:\n\n1. **A hook** — a question, a bold claim, or a specific benefit\n2. **The value** — what the reader gets by clicking\n3. **A keyword** — naturally placed, not stuffed\n4. **A nudge** — "learn how," "see examples," "get the guide"\n\nKeep it under 155 characters or Google will truncate it.\n\n## The common mistake\n\nMost people write meta descriptions as summaries. That's a waste. Your meta description is ad copy for your page — it should sell the click, not describe the content.\n\nUse the Meta Description Generator to get 3 optimized options that stay under the character limit and include your target keyword naturally.`,
    relatedToolSlugs: ['meta-description-generator', 'meta-title-generator', 'faq-generator'],
  },
  {
    slug: 'email-subject-lines-open-rates',
    title: 'The Subject Line Formula That Doubled Our Open Rate',
    excerpt: 'After testing 200+ subject lines, one pattern consistently outperformed everything else. Here\'s what it is.',
    date: '2026-07-05',
    readTime: '4 min read',
    category: 'Email',
    content: `# The Subject Line Formula\n\nWe tested over 200 email subject lines across 12 campaigns. One pattern consistently outperformed the rest by a wide margin.\n\n## The winning formula\n\n**[Curiosity gap] + [specific number or time frame] + [relevance cue]**\n\nExamples:\n- "The one mistake costing you 30% of your opens"\n- "I tried this for 14 days — here's what happened"\n- "3 tools that replaced our entire workflow"\n\n## Why it works\n\nThe curiosity gap makes them need to know the answer. The specific number adds credibility. The relevance cue tells them it's for them.\n\n## What doesn't work\n\n- "Newsletter #47" (no curiosity, no value)\n- ALL CAPS or excessive punctuation (looks spammy)\n- Vague teasers with no substance\n\nGenerate 4 subject line variants instantly with the Email Subject Line Generator and A/B test the top two.`,
    relatedToolSlugs: ['email-subject-line-generator', 'subject-line-ab-generator', 'email-preview-text-generator'],
  },
];
