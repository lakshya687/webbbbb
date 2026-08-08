import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { AuroraBackground, GlassCard, GradientButton } from '@/components/pv/AuroraBackground';
import { PromptCard } from '@/components/pv/PromptCard';
import { PROMPT_CATEGORIES, AI_MODELS } from '@/lib/prompt-categories';
import { fetchPrompts, seedPromptsIfNeeded } from '@/lib/prompt-api';
import type { PromptRow } from '@/lib/supabase';

export function Prompts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [prompts, setPrompts] = useState<PromptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || '');
  const [selectedModel, setSelectedModel] = useState(searchParams.get('model') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'recent'>('popular');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    (async () => {
      await seedPromptsIfNeeded();
      const data = await fetchPrompts();
      setPrompts(data);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (selectedCategory) params.cat = selectedCategory;
    if (selectedModel) params.model = selectedModel;
    setSearchParams(params, { replace: true });
  }, [search, selectedCategory, selectedModel, setSearchParams]);

  const filtered = useMemo(() => {
    let result = [...prompts];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedModel) {
      result = result.filter(p => p.ai_models.includes(selectedModel));
    }

    if (selectedDifficulty) {
      result = result.filter(p => p.difficulty === selectedDifficulty);
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.copies_count - a.copies_count);
        break;
      case 'rating':
        result.sort((a, b) => Number(b.rating_avg) - Number(a.rating_avg));
        break;
      case 'recent':
        result.reverse();
        break;
    }

    return result;
  }, [prompts, search, selectedCategory, selectedModel, selectedDifficulty, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedModel('');
    setSelectedDifficulty('');
  };

  const hasFilters = search || selectedCategory || selectedModel || selectedDifficulty;

  return (
    <AuroraBackground>
      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
          <h1 className="font-display font-bold text-pv-text text-4xl mb-2">Explore Prompts</h1>
          <p className="text-pv-muted">Discover {prompts.length}+ high-quality AI prompts across all categories</p>
        </div>

        {/* Search bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
          <div className="pv-glass-strong rounded-2xl p-2 flex items-center gap-2">
            <Search className="w-5 h-5 text-pv-muted ml-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, description, or tag..."
              className="flex-1 bg-transparent text-pv-text placeholder:text-pv-muted outline-none px-2 py-2"
            />
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-pv-muted hover:text-pv-text text-sm px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Clear
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="pv-glass rounded-xl px-3 py-2 text-sm text-pv-text flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
            <GlassCard className="p-5" hover={false}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category filter */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-pv-muted mb-2 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pv-glass rounded-xl px-3 py-2.5 text-pv-text outline-none text-sm"
                  >
                    <option value="">All Categories</option>
                    {PROMPT_CATEGORIES.map(c => (
                      <option key={c.slug} value={c.slug} className="bg-pv-surface">{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Model filter */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-pv-muted mb-2 block">AI Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full pv-glass rounded-xl px-3 py-2.5 text-pv-text outline-none text-sm"
                  >
                    <option value="">All Models</option>
                    {AI_MODELS.map(m => (
                      <option key={m.slug} value={m.slug} className="bg-pv-surface">{m.name}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty filter */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-pv-muted mb-2 block">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full pv-glass rounded-xl px-3 py-2.5 text-pv-text outline-none text-sm"
                  >
                    <option value="">All Levels</option>
                    <option value="Beginner" className="bg-pv-surface">Beginner</option>
                    <option value="Intermediate" className="bg-pv-surface">Intermediate</option>
                    <option value="Advanced" className="bg-pv-surface">Advanced</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Sort and count */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex items-center justify-between">
          <p className="text-pv-muted text-sm">{filtered.length} prompts found</p>
          <div className="flex items-center gap-2">
            <span className="text-pv-muted text-sm">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'rating' | 'recent')}
              className="pv-glass rounded-lg px-3 py-1.5 text-pv-text outline-none text-sm"
            >
              <option value="popular" className="bg-pv-surface">Most Popular</option>
              <option value="rating" className="bg-pv-surface">Highest Rated</option>
              <option value="recent" className="bg-pv-surface">Most Recent</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="pv-glass rounded-2xl p-5 h-48 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <GlassCard className="p-12 text-center" hover={false}>
              <p className="text-pv-muted text-lg mb-4">No prompts found matching your filters.</p>
              <GradientButton onClick={clearFilters}>Clear Filters</GradientButton>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p, i) => (
                <PromptCard key={p.id} prompt={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AuroraBackground>
  );
}
