import type { Tool } from '@/lib/tools';
import { TOOLS } from '@/lib/tools';

export interface GenerateResult {
  text: string;
  isList?: boolean;
}

interface GenerateParams {
  tool: Tool;
  input: string;
  scratchPicks?: Record<string, string>;
}

const HOOKS = [
  'The one thing nobody tells you about',
  'Stop making this mistake with',
  'I tried this for 30 days — here\'s what happened with',
  'The truth about',
  'Why everyone is wrong about',
  'This changed everything about',
  'You\'ve been doing this wrong:',
  'The secret to',
  'What they don\'t want you to know about',
  'How I finally figured out',
];

const ADJECTIVES = ['ultimate', 'complete', 'definitive', 'essential', 'proven', 'surprising', 'hidden', 'real', 'smart', 'simple'];
const NOUNS = ['guide', 'checklist', 'framework', 'system', 'blueprint', 'playbook', 'formula', 'strategy', 'method', 'approach'];

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function titleCase(s: string): string {
  return s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function cleanInput(input: string): string {
  return input.trim().replace(/^https?:\/\/\S+/i, '').replace(/\s+/g, ' ').trim() || 'your topic';
}

function getNiche(picks?: Record<string, string>): string {
  return picks?.niche || picks?.industry || 'your niche';
}

function getTone(picks?: Record<string, string>): string {
  return picks?.tone || 'professional';
}

export async function generate(params: GenerateParams): Promise<GenerateResult> {
  const { tool, input, scratchPicks } = params;
  const seed = hashString(input + tool.slug + JSON.stringify(scratchPicks || {}));
  const topic = cleanInput(input);
  const niche = getNiche(scratchPicks);
  const tone = getTone(scratchPicks);

  await new Promise(r => setTimeout(r, 400 + Math.random() * 600));

  const generator = GENERATORS[tool.slug] || GENERATORS._default;
  const result = generator({ topic, niche, tone, seed, picks: scratchPicks || {}, tool });
  return result;
}

interface GenCtx {
  topic: string;
  niche: string;
  tone: string;
  seed: number;
  picks: Record<string, string>;
  tool: Tool;
}

type GeneratorFn = (ctx: GenCtx) => GenerateResult;

function listOutput(items: string[]): GenerateResult {
  return { text: items.join('\n'), isList: true };
}

const GENERATORS: Record<string, GeneratorFn> = {
  'youtube-title-generator': ({ topic, seed }) => {
    const titles = [
      `${pick(HOOKS, seed)} ${topic}`,
      `${pick(ADJECTIVES, seed).charAt(0).toUpperCase() + pick(ADJECTIVES, seed).slice(1)} ${topic} ${pick(NOUNS, seed)}`,
      `${topic}: What I Wish I Knew Sooner`,
      `${topic} — A ${pick(ADJECTIVES, seed + 1)} Beginner's Guide`,
      `This Is How You Actually Master ${topic}`,
    ];
    return { text: titles.map((t, i) => `${i + 1}. ${t}`).join('\n') };
  },

  'youtube-description-generator': ({ topic, niche }) => ({
    text: `In this video, we break down everything you need to know about ${topic}. Whether you're just getting started in ${niche} or looking to level up, this guide covers the essentials.\n\n⏱️ Chapters:\n0:00 Intro\n0:45 Why ${topic} matters\n3:20 The fundamentals\n7:15 Common mistakes to avoid\n10:30 Pro tips\n12:45 Final thoughts\n\n🔗 Resources mentioned:\n- Free starter guide: [link]\n- Recommended tools: [link]\n\nFollow for more ${niche} content every week!\n\n#${niche.replace(/\s+/g, '')} #${topic.split(' ')[0]} #contentcreation`
  }),

  'youtube-script-generator': ({ topic, niche, tone }) => ({
    text: `[HOOK - 0:00]\nHey, what if I told you that ${topic} is easier than you think? Stick around, because by the end of this video, you'll know exactly how to get started.\n\n[INTRO - 0:15]\nWelcome back to the channel. Today we're diving into ${topic} — and if you're new here, this is where we simplify ${niche} so you can actually take action.\n\n[BODY - 1:00]\nLet's start with the basics. The number one thing to understand about ${topic} is that consistency beats perfection. Here are the three key steps:\n\n1. Start with a clear goal in mind\n2. Break it down into small, manageable tasks\n3. Track your progress weekly\n\n[EXAMPLE - 5:00]\nLet me show you a real example of how this works in practice...\n\n[OUTRO - 9:30]\nIf you found this helpful, hit subscribe — I post ${tone.toLowerCase()} ${niche} content every week. Drop a comment with your biggest takeaway, and I'll see you in the next one.`
  }),

  'youtube-outline-generator': ({ topic }) => ({
    text: `Video Outline: ${topic}\n\n1. HOOK (0:00-0:15)\n   - Bold statement or question about ${topic}\n   - Promise of what viewer will learn\n\n2. INTRO (0:15-0:45)\n   - Quick context\n   - Why this matters now\n\n3. MAIN SECTION 1: The Basics (0:45-3:00)\n   - What ${topic} is\n   - Why people get it wrong\n\n4. MAIN SECTION 2: The Method (3:00-7:00)\n   - Step-by-step breakdown\n   - Real example\n\n5. MAIN SECTION 3: Pro Tips (7:00-9:00)\n   - Advanced techniques\n   - Common pitfalls\n\n6. OUTRO & CTA (9:00-10:00)\n   - Recap key points\n   - Subscribe CTA`
  }),

  'youtube-thumbnail-text': ({ topic, seed }) => {
    const words = topic.split(' ').slice(0, 3);
    return { text: `1. ${pick(['WAIT...', 'WOW!', 'REALLY?', 'NO WAY', 'THIS?!'], seed)}\n2. ${words.join(' ').toUpperCase()}\n3. ${pick(['$0 vs $1000', 'BEFORE/AFTER', 'THE TRUTH', 'I WAS WRONG'], seed + 1)}\n4. ${pick(["DON'T", 'STOP!', 'WATCH THIS', 'MUST SEE'], seed + 2)}` };
  },

  'youtube-hook-generator': ({ topic, seed }) => ({
    text: `1. "Nobody talks about this, but ${topic} is the reason most people fail."\n2. "I spent 6 months figuring out ${topic} so you don't have to."\n3. "This is the ${topic} hack that changed everything for me."\n4. "If you're still doing ${topic} the old way, you're losing time."\n5. "${pick(['Stop scrolling', 'Wait —', 'Real talk'], seed)}: ${topic} is not what you think."`
  }),

  'youtube-idea-generator': ({ niche, seed }) => {
    const ideas = [
      `I tried ${niche} for 30 days — here's what happened`,
      `The ${niche} mistake that cost me 6 months`,
      `Ranking every ${niche} tool from worst to best`,
      `Why your ${niche} strategy isn't working (and how to fix it)`,
      `${niche} for complete beginners: start here`,
      `The ${niche} trend everyone is sleeping on`,
      `I asked pros for their #1 ${niche} tip`,
    ];
    return { text: ideas.slice(0, 6).map((t, i) => `${i + 1}. ${t}`).join('\n') };
  },

  'youtube-tag-generator': ({ topic, niche }) => {
    const base = topic.toLowerCase().split(' ').filter(w => w.length > 3);
    return listOutput([
      ...base,
      niche.toLowerCase(),
      `${niche.toLowerCase()} tips`,
      `${niche.toLowerCase()} tutorial`,
      `${niche.toLowerCase()} for beginners`,
      'how to',
      'guide',
      `${topic.toLowerCase()} explained`,
      `${niche.toLowerCase()} 2026`,
      `${niche.toLowerCase()} hacks`,
    ]);
  },

  'youtube-channel-name': ({ niche, picks, seed }) => {
    const personality = picks.personality || '';
    const keyword = picks.keyword || niche;
    return { text: `1. ${keyword} ${pick(['Lab', 'Hub', 'HQ', 'Studio', 'Co'], seed)}\n2. The ${pick(['Daily', 'Smart', 'Real', 'Bold'], seed + 1)} ${keyword}\n3. ${keyword}${pick(['Pro', 'Mastery', 'Craft', 'Works'], seed + 2)}\n4. ${pick(['Hey', 'Hello', 'Simply'], seed + 3)} ${keyword}\n5. ${personality || pick(['Honest', 'Practical', 'No-Nonsense'], seed + 4)} ${keyword}` };
  },

  'instagram-caption-generator': ({ topic, niche, tone }) => ({
    text: `${pick(['Okay but', 'Real talk:', 'POV:', 'Can we talk about'], Math.floor(Math.random() * 5))} ${topic} 🎯\n\nIf you're in ${niche}, you already know the struggle. But here's the thing — it doesn't have to be complicated.\n\nSave this for later and share with someone who needs it today ✨\n\n#${niche.replace(/\s+/g, '')} #${topic.split(' ')[0].toLowerCase()} #contentcreator #${tone.toLowerCase()}tips`
  }),

  'instagram-hashtag-generator': ({ topic, niche }) => listOutput([
    `#${niche.replace(/\s+/g, '').toLowerCase()}`,
    `#${niche.replace(/\s+/g, '').toLowerCase()}community`,
    `#${niche.replace(/\s+/g, '').toLowerCase()}tips`,
    `#${topic.split(' ')[0].toLowerCase()}`,
    `#${topic.split(' ').join('').toLowerCase()}`,
    '#contentcreator',
    '#creatoreconomy',
    `#${niche.replace(/\s+/g, '').toLowerCase()}life`,
    `#${niche.replace(/\s+/g, '').toLowerCase()}lover`,
    '#explore',
  ]),

  'tiktok-hook-generator': ({ topic, seed }) => ({
    text: `1. "Nobody's going to tell you this about ${topic}..."\n2. "I can't believe ${topic} actually works"\n3. "POV: you just discovered ${topic}"\n4. "This ${topic} hack is going viral for a reason"\n5. "Stop doing ${topic} wrong — here's the right way"`
  }),

  'linkedin-post-generator': ({ topic, niche, tone }) => ({
    text: `I've been working in ${niche} for years, and here's what I've learned about ${topic}:\n\nMost people get this wrong because they focus on the wrong things.\n\nAfter testing multiple approaches, three things consistently work:\n\n1. Start with the problem, not the solution\n2. Measure what matters (and ignore vanity metrics)\n3. Iterate based on real feedback, not assumptions\n\nThe ${tone.toLowerCase()} approach isn't about doing more — it's about doing what counts.\n\nWhat's your experience with ${topic}? Agree or disagree?\n\n#${niche.replace(/\s+/g, '')} #${topic.split(' ')[0]}`
  }),

  'blog-title-generator': ({ topic, seed }) => ({
    text: `1. ${pick(ADJECTIVES, seed).charAt(0).toUpperCase() + pick(ADJECTIVES, seed).slice(1)} Guide to ${topic} in 2026\n2. ${pick(HOOKS, seed + 1)} ${topic}\n3. ${topic}: ${pick(NOUNS, seed + 2).charAt(0).toUpperCase() + pick(NOUNS, seed + 2).slice(1)} for Beginners\n4. How to Master ${topic} (Even If You're Starting from Zero)\n5. The ${pick(ADJECTIVES, seed + 3).charAt(0).toUpperCase() + pick(ADJECTIVES, seed + 3).slice(1)} ${topic} ${pick(NOUNS, seed + 4).charAt(0).toUpperCase() + pick(NOUNS, seed + 4).slice(1)}`
  }),

  'blog-outline-generator': ({ topic }) => ({
    text: `# ${titleCase(topic)}: The Complete Guide\n\n## Introduction\n- What is ${topic} and why it matters\n- Who this guide is for\n\n## Section 1: The Fundamentals\n- Key concepts and terminology\n- Common misconceptions\n\n## Section 2: Getting Started\n- Step-by-step setup\n- Tools and resources you'll need\n\n## Section 3: Best Practices\n- Proven strategies that work\n- Mistakes to avoid\n\n## Section 4: Advanced Techniques\n- Taking ${topic} to the next level\n- Real-world case studies\n\n## Conclusion\n- Key takeaways\n- Next steps\n- Further reading`
  }),

  'meta-title-generator': ({ topic }) => ({
    text: `1. ${titleCase(topic)}: The Complete Guide (2026)\n2. How to ${titleCase(topic)} — Step by Step\n3. ${titleCase(topic)} Tips: ${'Essential Best Practices'}\n4. The Best ${titleCase(topic)} Strategies | Free Guide`
  }),

  'meta-description-generator': ({ topic }) => ({
    text: `1. Learn ${topic} with our complete guide. Discover proven strategies, expert tips, and actionable steps to get started today.\n2. Master ${topic} in 2026. Step-by-step tutorials, best practices, and real examples to help you succeed.\n3. Everything you need to know about ${topic}. Free guide with practical tips, tools, and resources for beginners.`
  }),

  'email-subject-line-generator': ({ topic, seed }) => ({
    text: `1. ${pick(['Quick question about', 'Don\'t miss', 'Your guide to', 'Inside:'], seed)} ${topic}\n2. ${pick(['This', 'The truth about', 'Why', 'How'], seed + 1)} ${topic} ${pick(['works', 'matters', 'changed things', 'is easier'], seed + 2)}\n3. ${topic} — ${pick(['here\'s what I learned', 'you\'re doing it wrong', 'the right way', 'simplified'], seed + 3)}\n4. ${pick(['🚀', '💡', '✅'], seed + 4)} ${pick(['Ultimate', 'Complete', 'Essential'], seed + 5)} ${topic} guide inside`
  }),

  'brand-name-generator': ({ niche, picks, seed }) => {
    const keyword = picks.keyword || niche;
    return { text: `1. ${pick(['Nova', 'Lumen', 'Vertex', 'Orbit', 'Quill'], seed)}${keyword.charAt(0)}\n2. ${keyword} ${pick(['Labs', 'Works', 'Studio', 'Collective', 'House'], seed + 1)}\n3. ${pick(['The', 'Hey', 'Simply', 'Bold'], seed + 2)} ${keyword}\n4. ${keyword}${pick(['ify', 'ly', 'io', 'hub', 'ster'], seed + 3)}\n5. ${pick(['Bright', 'Clear', 'True', 'Wild'], seed + 4)}${keyword}` };
  },

  'tagline-generator': ({ topic, niche }) => ({
    text: `1. ${titleCase(niche)}, simplified.\n2. Where ${topic} meets results.\n3. Built for ${niche.toLowerCase()}.\n4. Your ${topic}, done right.\n5. The ${niche} advantage.\n6. ${titleCase(topic)}, reimagined.`
  }),

  'cold-email-generator': ({ topic }) => ({
    text: `Subject: Quick idea for ${topic}\n\nHi [Name],\n\nI noticed your work in ${topic} and had a thought I wanted to share.\n\nWe helped [similar company] achieve [specific result] by implementing a simple change to their approach. I think something similar could work for you.\n\nWorth a 10-minute chat next week?\n\nBest,\n[Your Name]`
  }),

  'product-description-generator': ({ topic }) => ({
    text: `${titleCase(topic)} — designed for people who care about the details.\n\nBuilt with premium materials and a focus on what actually matters, this is ${topic} done right. No gimmicks, no fluff — just real value you can feel from day one.\n\nKey features:\n- Thoughtful design that fits your daily routine\n- Durable construction that lasts\n- Easy to use, right out of the box\n- Backed by our satisfaction guarantee\n\nPerfect for anyone who wants ${topic} without the hassle.`
  }),

  'faq-generator': ({ topic }) => ({
    text: `Q: What is ${topic}?\nA: ${topic} is a approach to [specific outcome] that helps you [benefit] without [common pain point].\n\nQ: Is ${topic} suitable for beginners?\nA: Yes. While ${topic} can be advanced, our guide breaks it down into simple steps anyone can follow.\n\nQ: How long does it take to see results with ${topic}?\nA: Most people see meaningful results within 2-4 weeks of consistent practice.\n\nQ: Do I need any special tools for ${topic}?\nA: No. You can get started with ${topic} using free tools and resources.\n\nQ: What's the biggest mistake people make with ${topic}?\nA: The most common mistake is rushing through the fundamentals. Take your time with the basics and everything else gets easier.`
  }),

  _default: ({ topic, niche, tone, tool, seed }) => {
    const variations = [
      `Here are 3 options for your ${tool.name.toLowerCase()}:\n\n1. ${titleCase(topic)}: The ${pick(ADJECTIVES, seed)} ${pick(NOUNS, seed)}\n2. ${pick(HOOKS, seed + 1)} ${topic}\n3. ${titleCase(niche)} ${titleCase(topic)}: A ${tone} ${pick(NOUNS, seed + 2)}`,
      `Option 1:\n${titleCase(topic)} — the ${tone} approach for ${niche.toLowerCase()} professionals.\n\nOption 2:\nWhy ${topic} matters more than you think (and what to do about it).\n\nOption 3:\nThe ${pick(ADJECTIVES, seed + 3)} ${pick(NOUNS, seed + 4)} to ${topic} in 2026.`,
      `1. ${pick(HOOKS, seed)} ${topic}\n2. ${titleCase(topic)} for ${niche}: A ${tone} ${pick(NOUNS, seed + 1)}\n3. The ${pick(ADJECTIVES, seed + 2)} way to approach ${topic}`,
    ];
    return { text: pick(variations, seed) };
  },
};

// Calculator functions
export const calculatorFunctions: Record<string, (inputs: Record<string, number>) => { result: number; label: string; breakdown: string }> = {
  'roi-calculator': (i) => {
    const roi = ((i.revenue - i.cost) / i.cost) * 100;
    return { result: roi, label: 'ROI', breakdown: `((${i.revenue} - ${i.cost}) / ${i.cost}) × 100 = ${roi.toFixed(1)}%` };
  },
  'roas-calculator': (i) => {
    const roas = i.revenue / i.cost;
    return { result: roas, label: 'ROAS', breakdown: `${i.revenue} / ${i.cost} = ${roas.toFixed(2)}x` };
  },
  'cpm-calculator': (i) => {
    const cpm = (i.cost / i.impressions) * 1000;
    return { result: cpm, label: 'CPM', breakdown: `(${i.cost} / ${i.impressions}) × 1000 = $${cpm.toFixed(2)}` };
  },
  'cpc-calculator': (i) => {
    const cpc = i.cost / i.clicks;
    return { result: cpc, label: 'CPC', breakdown: `${i.cost} / ${i.clicks} = $${cpc.toFixed(2)}` };
  },
  'cpa-calculator': (i) => {
    const cpa = i.cost / i.conversions;
    return { result: cpa, label: 'CPA', breakdown: `${i.cost} / ${i.conversions} = $${cpa.toFixed(2)}` };
  },
  'engagement-rate-calculator': (i) => {
    const er = (i.engagements / i.followers) * 100;
    return { result: er, label: 'Engagement Rate', breakdown: `(${i.engagements} / ${i.followers}) × 100 = ${er.toFixed(2)}%` };
  },
  'conversion-rate-calculator': (i) => {
    const cr = (i.conversions / i.visitors) * 100;
    return { result: cr, label: 'Conversion Rate', breakdown: `(${i.conversions} / ${i.visitors}) × 100 = ${cr.toFixed(2)}%` };
  },
  'budget-calculator': (i) => {
    const perChannel = i.budget / i.channels;
    return { result: perChannel, label: 'Per Channel', breakdown: `${i.budget} / ${i.channels} channels = $${perChannel.toFixed(2)} each` };
  },
  'sponsorship-rate-calculator': (i) => {
    const rate = i.cpm * (i.views / 1000);
    return { result: rate, label: 'Sponsorship Rate', breakdown: `$${i.cpm} CPM × (${i.views} / 1000) = $${rate.toFixed(2)}` };
  },
  'income-goal-calculator': (i) => {
    const monthly = i.yearly / 12;
    return { result: monthly, label: 'Monthly Target', breakdown: `${i.yearly} / 12 = $${monthly.toFixed(2)}/month` };
  },
  'bounce-rate-calculator': (i) => {
    const br = (i.singlePage / i.totalSessions) * 100;
    return { result: br, label: 'Bounce Rate', breakdown: `(${i.singlePage} / ${i.totalSessions}) × 100 = ${br.toFixed(1)}%` };
  },
  'clv-calculator': (i) => {
    const clv = i.avgOrderValue * i.purchaseFrequency * i.lifespan;
    return { result: clv, label: 'Customer Lifetime Value', breakdown: `$${i.avgOrderValue} × ${i.purchaseFrequency} × ${i.lifespan} = $${clv.toFixed(2)}` };
  },
  'churn-rate-calculator': (i) => {
    const cr = (i.lost / i.startCount) * 100;
    return { result: cr, label: 'Churn Rate', breakdown: `(${i.lost} / ${i.startCount}) × 100 = ${cr.toFixed(1)}%` };
  },
  'aov-calculator': (i) => {
    const aov = i.revenue / i.orders;
    return { result: aov, label: 'Average Order Value', breakdown: `$${i.revenue} / ${i.orders} = $${aov.toFixed(2)}` };
  },
  'growth-rate-calculator': (i) => {
    const gr = ((i.endValue - i.startValue) / i.startValue) * 100;
    return { result: gr, label: 'Growth Rate', breakdown: `((${i.endValue} - ${i.startValue}) / ${i.startValue}) × 100 = ${gr.toFixed(1)}%` };
  },
  'nps-calculator': (i) => {
    const total = i.promoters + i.passives + i.detractors;
    const nps = ((i.promoters - i.detractors) / total) * 100;
    return { result: nps, label: 'NPS', breakdown: `((${i.promoters} - ${i.detractors}) / ${total}) × 100 = ${nps.toFixed(0)}` };
  },
  'cac-calculator': (i) => {
    const cac = i.totalCost / i.newCustomers;
    return { result: cac, label: 'Customer Acquisition Cost', breakdown: `$${i.totalCost} / ${i.newCustomers} = $${cac.toFixed(2)}` };
  },
  'break-even-calculator': (i) => {
    const units = i.fixedCosts / (i.price - i.variableCost);
    return { result: units, label: 'Break-Even Units', breakdown: `${i.fixedCosts} / ($${i.price} - $${i.variableCost}) = ${units.toFixed(0)} units` };
  },
  'ab-significance-calculator': (i) => {
    const crA = i.conversionsA / i.visitorsA;
    const crB = i.conversionsB / i.visitorsB;
    const lift = ((crB - crA) / crA) * 100;
    return { result: lift, label: 'Lift', breakdown: `Variation B is ${lift.toFixed(1)}% ${lift >= 0 ? 'better' : 'worse'} than control` };
  },
  'ltv-cac-ratio-calculator': (i) => {
    const ratio = i.ltv / i.cac;
    return { result: ratio, label: 'LTV:CAC Ratio', breakdown: `$${i.ltv} / $${i.cac} = ${ratio.toFixed(1)}:1` };
  },
  'ad-budget-calculator': (i) => {
    const perChannel = i.budget / i.channels;
    return { result: perChannel, label: 'Per Channel', breakdown: `${i.budget} / ${i.channels} = $${perChannel.toFixed(2)} per channel` };
  },
};

export interface CalculatorInput {
  key: string;
  label: string;
}

export const calculatorInputs: Record<string, CalculatorInput[]> = {
  'roi-calculator': [{ key: 'cost', label: 'Campaign cost ($)' }, { key: 'revenue', label: 'Revenue generated ($)' }],
  'roas-calculator': [{ key: 'cost', label: 'Ad spend ($)' }, { key: 'revenue', label: 'Revenue ($)' }],
  'cpm-calculator': [{ key: 'cost', label: 'Total cost ($)' }, { key: 'impressions', label: 'Total impressions' }],
  'cpc-calculator': [{ key: 'cost', label: 'Total ad cost ($)' }, { key: 'clicks', label: 'Total clicks' }],
  'cpa-calculator': [{ key: 'cost', label: 'Total ad cost ($)' }, { key: 'conversions', label: 'Total conversions' }],
  'engagement-rate-calculator': [{ key: 'engagements', label: 'Total engagements' }, { key: 'followers', label: 'Total followers' }],
  'conversion-rate-calculator': [{ key: 'conversions', label: 'Total conversions' }, { key: 'visitors', label: 'Total visitors' }],
  'budget-calculator': [{ key: 'budget', label: 'Total budget ($)' }, { key: 'channels', label: 'Number of channels' }],
  'sponsorship-rate-calculator': [{ key: 'cpm', label: 'Your CPM ($)' }, { key: 'views', label: 'Average views per video' }],
  'income-goal-calculator': [{ key: 'yearly', label: 'Yearly income goal ($)' }],
  'bounce-rate-calculator': [{ key: 'singlePage', label: 'Single-page sessions' }, { key: 'totalSessions', label: 'Total sessions' }],
  'clv-calculator': [{ key: 'avgOrderValue', label: 'Average order value ($)' }, { key: 'purchaseFrequency', label: 'Purchases per year' }, { key: 'lifespan', label: 'Customer lifespan (years)' }],
  'churn-rate-calculator': [{ key: 'lost', label: 'Customers lost' }, { key: 'startCount', label: 'Customers at start' }],
  'aov-calculator': [{ key: 'revenue', label: 'Total revenue ($)' }, { key: 'orders', label: 'Number of orders' }],
  'growth-rate-calculator': [{ key: 'startValue', label: 'Starting value' }, { key: 'endValue', label: 'Ending value' }],
  'nps-calculator': [{ key: 'promoters', label: 'Promoters (9-10)' }, { key: 'passives', label: 'Passives (7-8)' }, { key: 'detractors', label: 'Detractors (0-6)' }],
  'cac-calculator': [{ key: 'totalCost', label: 'Total acquisition cost ($)' }, { key: 'newCustomers', label: 'New customers acquired' }],
  'break-even-calculator': [{ key: 'fixedCosts', label: 'Fixed costs ($)' }, { key: 'price', label: 'Price per unit ($)' }, { key: 'variableCost', label: 'Variable cost per unit ($)' }],
  'ab-significance-calculator': [{ key: 'visitorsA', label: 'Visitors (A)' }, { key: 'conversionsA', label: 'Conversions (A)' }, { key: 'visitorsB', label: 'Visitors (B)' }, { key: 'conversionsB', label: 'Conversions (B)' }],
  'ltv-cac-ratio-calculator': [{ key: 'ltv', label: 'Customer LTV ($)' }, { key: 'cac', label: 'Customer CAC ($)' }],
  'ad-budget-calculator': [{ key: 'budget', label: 'Total ad budget ($)' }, { key: 'channels', label: 'Number of channels' }],
};

// Seeded usage counts for social proof
const usageCounts: Record<string, number> = {};
TOOLS.forEach((t, i) => {
  usageCounts[t.slug] = 800 + ((i * 137) % 14200);
});

export function getUsageCount(slug: string): number {
  return usageCounts[slug] || 1000;
}

export function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'm';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}
