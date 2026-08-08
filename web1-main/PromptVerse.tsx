import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, ArrowRight, Sparkles, Copy, Star, TrendingUp,
  MessageSquare, Code2, Megaphone, PenLine, Users, Zap,
  ChevronDown, Check,
} from 'lucide-react';
import { AuroraBackground, FloatingSpheres, GlassCard, GradientButton, GhostButton, StatCard } from '@/components/pv/AuroraBackground';
import { PromptCard } from '@/components/pv/PromptCard';
import { PROMPT_CATEGORIES, AI_MODELS } from '@/lib/prompt-categories';
import { fetchPrompts, seedPromptsIfNeeded } from '@/lib/prompt-api';
import type { PromptRow } from '@/lib/supabase';

export function PromptVerse() {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<PromptRow[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await seedPromptsIfNeeded();
      const data = await fetchPrompts();
      setPrompts(data);
      setLoading(false);
    })();
  }, []);

  const featuredPrompts = prompts.filter(p => p.featured).slice(0, 6);
  const trendingPrompts = prompts.filter(p => p.trending).slice(0, 4);
  const latestPrompts = [...prompts].reverse().slice(0, 4);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/prompts?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/prompts');
    }
  };

  const stats = [
    { value: '250,000+', label: 'Prompts', icon: <Copy className="w-5 h-5 text-pv-purple" /> },
    { value: '50+', label: 'Categories', icon: <Sparkles className="w-5 h-5 text-pv-blue" /> },
    { value: '10+', label: 'AI Models', icon: <Zap className="w-5 h-5 text-pv-cyan" /> },
    { value: '1M+', label: 'Monthly Copies', icon: <TrendingUp className="w-5 h-5 text-pv-pink" /> },
  ];

  const modelIcons: Record<string, typeof MessageSquare> = {
    chatgpt: MessageSquare, claude: Sparkles, gemini: Zap,
    midjourney: PenLine, 'stable-diffusion': PenLine, flux: PenLine,
    veo: TrendingUp, sora: TrendingUp,
  };

  const faqs = [
    { q: 'What is PromptVerse AI?', a: 'PromptVerse AI is a curated library of high-quality AI prompts for leading models like ChatGPT, Claude, Gemini, Midjourney, and more. Discover, copy, and save prompts that work.' },
    { q: 'Is PromptVerse AI free?', a: 'Yes! Browsing, searching, and copying prompts is completely free. Create a free account to save prompts to collections and access them anytime.' },
    { q: 'How do I use a prompt?', a: 'Click any prompt to view its details, then click the Copy button. Paste it into your AI tool of choice and replace the bracketed placeholders with your specific information.' },
    { q: 'Can I submit my own prompts?', a: 'Absolutely! We welcome community contributions. Use the Suggest page to submit your prompts for review and featuring.' },
    { q: 'Which AI models are supported?', a: 'We support ChatGPT, Claude, Gemini, Midjourney, Stable Diffusion, Flux, Veo, Sora, DALL-E, and more. Each prompt is tagged with compatible models.' },
  ];

  return (
    <AuroraBackground>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16">
        <FloatingSpheres />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-pv-cyan bg-pv-cyan/10 px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              The AI Prompt Hub
            </span>
            <h1 className="font-display font-bold text-pv-text text-5xl sm:text-6xl md:text-7xl mt-6 leading-[1.05] tracking-tight">
              The Ultimate
              <br />
              <span className="pv-gradient-text">AI Prompt Library</span>
            </h1>
            <p className="text-pv-muted text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              Discover thousands of high-quality prompts for ChatGPT, Claude, Gemini,
              Midjourney, Veo, Sora, and more.
            </p>

            {/* Search bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="pv-glass-strong rounded-2xl p-2 flex items-center gap-2">
                <Search className="w-5 h-5 text-pv-muted ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search prompts, categories, AI models..."
                  className="flex-1 bg-transparent text-pv-text placeholder:text-pv-muted outline-none px-2 py-2"
                />
                <GradientButton onClick={handleSearch} className="!py-2 !px-4">
                  Search
                </GradientButton>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <Link to="/prompts">
                <GradientButton>
                  Explore Prompts
                </GradientButton>
              </Link>
              <Link to="/dashboard">
                <GhostButton>Start Free</GhostButton>
              </Link>
            </div>
          </motion.div>

          {/* AI Model icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12 max-w-3xl mx-auto">
            {AI_MODELS.slice(0, 8).map((model, i) => {
              const Icon = modelIcons[model.slug] || MessageSquare;
              return (
                <motion.div
                  key={model.slug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="pv-glass rounded-xl px-4 py-2.5 flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" style={{ color: model.color }} />
                  <span className="text-sm font-medium text-pv-text">{model.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCard value={stat.value} label={stat.label} icon={stat.icon} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-pv-text text-2xl">Featured Prompt Collections</h2>
          <Link to="/prompts?filter=featured" className="text-pv-cyan text-sm font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="pv-glass rounded-2xl p-5 h-48 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPrompts.map((p, i) => (
              <PromptCard key={p.id} prompt={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-display font-bold text-pv-text text-2xl mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PROMPT_CATEGORIES.slice(0, 12).map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/prompts?cat=${cat.slug}`}>
                  <GlassCard className="p-4 text-center">
                    <div
                      className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                      style={{ backgroundColor: `${cat.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                    <div className="text-sm font-medium text-pv-text">{cat.name}</div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trending This Week */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-pv-pink" />
          <h2 className="font-display font-bold text-pv-text text-2xl">Trending This Week</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingPrompts.map((p, i) => (
            <PromptCard key={p.id} prompt={p} index={i} />
          ))}
        </div>
      </section>

      {/* Latest Prompts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-display font-bold text-pv-text text-2xl mb-6">Latest Prompts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestPrompts.map((p, i) => (
            <PromptCard key={p.id} prompt={p} index={i} />
          ))}
        </div>
      </section>

      {/* AI Models */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-display font-bold text-pv-text text-2xl mb-6">Supported AI Models</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {AI_MODELS.map((model, i) => {
            const Icon = modelIcons[model.slug] || MessageSquare;
            return (
              <motion.div
                key={model.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/prompts?model=${model.slug}`}>
                  <GlassCard className="p-4 flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${model.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: model.color }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-pv-text">{model.name}</div>
                      <div className="text-xs text-pv-muted">View prompts</div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Creators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-display font-bold text-pv-text text-2xl mb-6">Featured Creators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getTopCreators(prompts).map((creator, i) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-5 text-center">
                <div className="text-4xl mb-3">{creator.avatar}</div>
                <div className="font-display font-semibold text-pv-text">{creator.name}</div>
                <div className="text-pv-muted text-sm mt-1">{creator.promptCount} prompts</div>
                <div className="flex items-center justify-center gap-3 mt-3 text-xs text-pv-muted">
                  <span className="flex items-center gap-1">
                    <Copy className="w-3 h-3" /> {formatCount(creator.totalCopies)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" /> {creator.avgRating}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-display font-bold text-pv-text text-2xl mb-6">Loved by Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-pv-cyan fill-pv-cyan" />
                  ))}
                </div>
                <p className="text-pv-text text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{t.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-pv-text">{t.name}</div>
                    <div className="text-xs text-pv-muted">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-display font-bold text-pv-text text-2xl mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <GlassCard className="p-8 text-center">
          <h2 className="font-display font-bold text-pv-text text-2xl mb-2">Stay in the Loop</h2>
          <p className="text-pv-muted text-sm mb-6">Get the best new prompts delivered to your inbox weekly.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 pv-glass rounded-xl px-4 py-3 text-pv-text placeholder:text-pv-muted outline-none focus:border-pv-purple/50"
            />
            <GradientButton>Subscribe</GradientButton>
          </div>
        </GlassCard>
      </section>
    </AuroraBackground>
  );
}

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <GlassCard className="overflow-hidden" hover={false}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium text-pv-text">{faq.q}</span>
        <ChevronDown className={`w-5 h-5 text-pv-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-5 pb-5"
        >
          <p className="text-pv-muted text-sm leading-relaxed">{faq.a}</p>
        </motion.div>
      )}
    </GlassCard>
  );
}

const TESTIMONIALS = [
  { quote: 'PromptVerse AI has completely transformed my workflow. I find the perfect prompt in seconds instead of writing from scratch.', name: 'Sarah Chen', role: 'Content Strategist', avatar: '👩‍💼' },
  { quote: 'The quality of prompts here is unmatched. Every one I\'ve tried has produced excellent results with my AI tools.', name: 'Marcus Reed', role: 'Startup Founder', avatar: '👨‍💻' },
  { quote: 'As a designer, the Midjourney and Flux prompt collections are a goldmine. My output quality has doubled.', name: 'Aria Patel', role: 'Creative Director', avatar: '🎨' },
];

function getTopCreators(prompts: PromptRow[]) {
  const creators = new Map<string, { name: string; avatar: string; promptCount: number; totalCopies: number; totalRating: number; ratingCount: number }>();
  prompts.forEach(p => {
    const existing = creators.get(p.author_name);
    if (existing) {
      existing.promptCount++;
      existing.totalCopies += p.copies_count;
      existing.totalRating += Number(p.rating_avg) * p.rating_count;
      existing.ratingCount += p.rating_count;
    } else {
      creators.set(p.author_name, {
        name: p.author_name, avatar: p.author_avatar, promptCount: 1,
        totalCopies: p.copies_count, totalRating: Number(p.rating_avg) * p.rating_count,
        ratingCount: p.rating_count,
      });
    }
  });
  return [...creators.values()]
    .map(c => ({ ...c, avgRating: c.ratingCount > 0 ? (c.totalRating / c.ratingCount).toFixed(1) : '5.0' }))
    .sort((a, b) => b.totalCopies - a.totalCopies)
    .slice(0, 4);
}

function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}
