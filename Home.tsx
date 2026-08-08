import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Hash, Play, BarChart3, Search, Type, Mail, Target, ArrowRight, Star, Zap, FileText } from 'lucide-react';
import { TOOLS, CATEGORIES } from '@/lib/tools';
import { ToolCard } from '@/components/ToolCard';
import { TiltCard } from '@/components/TiltCard';
import { useFavorites } from '@/lib/hooks';

interface HomeProps {
  onOpenPalette: () => void;
}

export function Home({ onOpenPalette }: HomeProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const featuredTools = TOOLS.filter(t => t.featured).slice(0, 6);
  const favoriteTools = TOOLS.filter(t => favorites.includes(t.slug));

  const heroIcons = [Sparkles, Hash, Play, BarChart3, Search, Type, Mail, Target];

  return (
    <div>
      {/* Hero */}
      <section className="blueprint-grid min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber/80 bg-amber/10 px-3 py-1.5 rounded-full">
              159 tools · free forever
            </span>
            <h1 className="font-display font-bold text-ink text-5xl sm:text-6xl md:text-7xl mt-6 leading-[1.05] tracking-tight">
              The workbench for
              <br />
              <span className="text-amber">creators who ship.</span>
            </h1>
            <p className="text-ink/60 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
              AI-powered tools for YouTube, Instagram, TikTok, LinkedIn, SEO, writing, branding, and more.
              Paste a link or answer a few questions — get results in seconds.
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <Link
                to="/tools"
                className="bg-amber text-bg font-semibold px-6 py-3 rounded-lg hover:scale-[0.98] active:scale-95 transition-transform"
              >
                Browse all tools
              </Link>
              <button
                onClick={onOpenPalette}
                className="bg-white/5 border border-white/10 text-ink font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                Press ⌘K to search
              </button>
            </div>
          </motion.div>

          {/* Floating tool cards */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mt-16 max-w-3xl mx-auto">
            {heroIcons.map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              >
                <TiltCard glowColor="#F2A93B" className="p-4 aspect-square flex items-center justify-center">
                  <Icon className="w-6 h-6 text-amber" />
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* My Tools (favorites) */}
      {favoriteTools.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-amber fill-amber" />
            <h2 className="font-display font-bold text-ink text-2xl">My Tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteTools.slice(0, 3).map(tool => (
              <ToolCard key={tool.slug} tool={tool} favorited={isFavorite(tool.slug)} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-ink text-2xl">Featured Tools</h2>
          <Link to="/tools" className="text-amber text-sm font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} favorited={isFavorite(tool.slug)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-display font-bold text-ink text-2xl mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const count = TOOLS.filter(t => t.category === cat.name).length;
            return (
              <Link
                key={cat.slug}
                to={`/tools?cat=${cat.slug}`}
                className="group bg-slate border border-white/5 rounded-xl p-4 hover:border-amber/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-amber/10 transition-colors">
                    <Icon className="w-4.5 h-4.5 text-amber" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-ink text-sm">{cat.name}</h3>
                    <p className="font-mono text-[10px] text-ink/40">{count} tools</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Workflows teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-display font-bold text-ink text-2xl mb-6">Workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Full YouTube Upload Kit', desc: 'Title, description, tags, and thumbnail text from one video link.', tools: ['Title', 'Description', 'Tags', 'Thumbnail'] },
            { name: 'Instagram Launch Pack', desc: 'Caption, hashtags, and story ideas from a single post.', tools: ['Caption', 'Hashtags', 'Story'] },
            { name: 'Blog Publish Kit', desc: 'Title, outline, meta title, and meta description from one topic.', tools: ['Title', 'Outline', 'Meta Title', 'Meta Desc'] },
          ].map((wf, i) => (
            <Link key={i} to="/workflows">
              <TiltCard glowColor="#4C7EA8" className="p-5 h-full">
                <Zap className="w-5 h-5 text-blueprint" />
                <h3 className="font-display font-semibold text-ink mt-3">{wf.name}</h3>
                <p className="text-ink/60 text-sm mt-1.5">{wf.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {wf.tools.map(t => (
                    <span key={t} className="font-mono text-[10px] text-ink/50 bg-white/5 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </section>

      {/* PromptVerse AI teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/promptverse" className="block">
          <TiltCard glowColor="#A855F7" className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-ink text-xl">PromptVerse AI — The Ultimate Prompt Library</h3>
                <p className="text-ink/60 text-sm mt-1">Discover thousands of high-quality prompts for ChatGPT, Claude, Gemini, Midjourney, and more.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </div>
          </TiltCard>
        </Link>
      </section>

      {/* Quiz teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <Link to="/quizzes" className="block">
          <TiltCard glowColor="#F2A93B" className="p-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-ink text-xl">Not sure which tool you need?</h3>
                <p className="text-ink/60 text-sm mt-1">Take a 2-minute quiz and get matched to the exact tool for your situation.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-amber" />
            </div>
          </TiltCard>
        </Link>
      </section>
    </div>
  );
}
