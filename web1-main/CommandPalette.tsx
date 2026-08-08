import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, ArrowRight } from 'lucide-react';
import { TOOLS, CATEGORIES } from '@/lib/tools';
import { useFavorites } from '@/lib/hooks';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, results.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
      else if (e.key === 'Enter') { e.preventDefault(); if (results[selectedIndex]) { navigate(`/tool/${results[selectedIndex].slug}`); onClose(); } }
      else if (e.key === 'Escape') { onClose(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const results = query
    ? TOOLS.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : TOOLS.filter(t => favorites.includes(t.slug)).slice(0, 3);

  const grouped: Record<string, typeof TOOLS> = {};
  results.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-xl bg-slate border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <Search className="w-4 h-4 text-ink/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                placeholder="Search 159 tools..."
                className="flex-1 bg-transparent text-ink placeholder-ink/30 outline-none text-sm"
              />
              <kbd className="font-mono text-[10px] text-ink/30 bg-white/5 px-1.5 py-0.5 rounded">ESC</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {!query && results.length > 0 && (
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink/30 px-3 py-1.5">Quick Access</p>
              )}
              {results.length === 0 && (
                <p className="text-ink/40 text-sm px-4 py-8 text-center">No tools found. Try a different search.</p>
              )}
              {Object.entries(grouped).map(([cat, tools]) => (
                <div key={cat}>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink/30 px-3 py-1.5 mt-1">{cat}</p>
                  {tools.map(tool => {
                    const idx = results.indexOf(tool);
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.slug}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => { navigate(`/tool/${tool.slug}`); onClose(); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${selectedIndex === idx ? 'bg-amber/10' : 'hover:bg-white/5'}`}
                      >
                        <Icon className={`w-4 h-4 ${selectedIndex === idx ? 'text-amber' : 'text-ink/50'}`} />
                        <span className="text-ink text-sm flex-1">{tool.name}</span>
                        {favorites.includes(tool.slug) && <Star className="w-3.5 h-3.5 text-amber fill-amber" />}
                        <ArrowRight className={`w-3.5 h-3.5 ${selectedIndex === idx ? 'text-amber' : 'text-ink/20'}`} />
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
