import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Star, Lightbulb } from 'lucide-react';
import { TOOLS, CATEGORIES } from '@/lib/tools';
import { ToolCard } from '@/components/ToolCard';
import { useFavorites } from '@/lib/hooks';

export function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const [query, setQuery] = useState('');

  const activeCat = searchParams.get('cat') || 'all';
  const showFavorites = activeCat === 'favorites';

  const filtered = useMemo(() => {
    let tools = TOOLS;
    if (showFavorites) {
      tools = tools.filter(t => favorites.includes(t.slug));
    } else if (activeCat !== 'all') {
      const catName = CATEGORIES.find(c => c.slug === activeCat)?.name;
      if (catName) tools = tools.filter(t => t.category === catName);
    }
    if (query) {
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    return tools;
  }, [activeCat, query, favorites, showFavorites]);

  const tabs = [
    { slug: 'all', name: 'All' },
    { slug: 'favorites', name: 'Favorites' },
    ...CATEGORIES.map(c => ({ slug: c.slug, name: c.name })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <h1 className="font-display font-bold text-ink text-4xl mb-2">All Tools</h1>
      <p className="text-ink/50 text-sm mb-8 font-mono">{TOOLS.length} tools across {CATEGORIES.length} categories</p>

      {/* Search */}
      <div className="flex items-center gap-2 bg-slate border border-white/10 rounded-lg px-4 py-3 mb-6">
        <Search className="w-4 h-4 text-ink/40" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search tools by name or description..."
          className="flex-1 bg-transparent text-ink placeholder-ink/30 outline-none text-sm"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.slug}
            onClick={() => setSearchParams(tab.slug === 'all' ? {} : { cat: tab.slug })}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCat === tab.slug
                ? 'bg-amber text-bg'
                : 'bg-white/5 text-ink/60 hover:bg-white/10 hover:text-ink'
            }`}
          >
            {tab.slug === 'favorites' && <Star className="w-3.5 h-3.5" fill={showFavorites ? '#14161B' : 'none'} />}
            {tab.name}
            {tab.slug === 'favorites' && favorites.length > 0 && (
              <span className="font-mono text-[10px] opacity-60">{favorites.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          {showFavorites ? (
            <>
              <Star className="w-10 h-10 text-ink/20 mx-auto mb-4" />
              <p className="text-ink/40 text-lg">No favorites yet</p>
              <p className="text-ink/30 text-sm mt-1">Star tools you use often to find them here.</p>
            </>
          ) : (
            <>
              <Lightbulb className="w-10 h-10 text-ink/20 mx-auto mb-4" />
              <p className="text-ink/40 text-lg">No tools found</p>
              <p className="text-ink/30 text-sm mt-1">Try a different search or category.</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(tool => (
            <ToolCard key={tool.slug} tool={tool} favorited={isFavorite(tool.slug)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
}
