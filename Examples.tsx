import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TOOLS, CATEGORIES } from '@/lib/tools';

export function Examples() {
  const [activeCat, setActiveCat] = useState('all');

  const examples = TOOLS.filter(t => t.exampleInput && t.exampleOutput);
  const filtered = activeCat === 'all' ? examples : examples.filter(t => {
    const cat = CATEGORIES.find(c => c.name === t.category);
    return cat?.slug === activeCat;
  });

  const catsWithExamples = CATEGORIES.filter(c => examples.some(t => t.category === c.name));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <h1 className="font-display font-bold text-ink text-4xl mb-2">Examples Gallery</h1>
      <p className="text-ink/50 text-sm mb-8">Real before/after examples from Workbench tools. Click any to try it yourself.</p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCat('all')}
          className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${activeCat === 'all' ? 'bg-amber text-bg' : 'bg-white/5 text-ink/60 hover:bg-white/10'}`}
        >
          All
        </button>
        {catsWithExamples.map(c => (
          <button
            key={c.slug}
            onClick={() => setActiveCat(c.slug)}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${activeCat === c.slug ? 'bg-amber text-bg' : 'bg-white/5 text-ink/60 hover:bg-white/10'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(tool => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              to={`/tool/${tool.slug}`}
              className="bg-slate border border-white/5 rounded-xl p-5 hover:border-amber/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-amber" />
                </div>
                <h3 className="font-display font-semibold text-ink text-sm">{tool.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40 mb-2">Input</p>
                  <p className="text-ink/70 text-xs leading-relaxed">{tool.exampleInput}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink/40 mb-2">Output</p>
                  <pre className="text-ink/70 text-xs whitespace-pre-wrap font-sans leading-relaxed">{tool.exampleOutput}</pre>
                </div>
              </div>
              <span className="text-amber text-xs font-medium flex items-center gap-1 mt-3 group-hover:gap-2 transition-all">
                Try this tool <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
