import { Link, useNavigate } from 'react-router-dom';
import { Search, Wrench, BookOpen, HelpCircle, Sparkles, LayoutDashboard } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  onOpenPalette: () => void;
}

export function Header({ onOpenPalette }: HeaderProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-bg/80 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center">
            <Wrench className="w-4.5 h-4.5 text-bg" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-ink text-lg tracking-tight">Workbench</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/tools" className="text-ink/70 hover:text-ink text-sm font-medium transition-colors">Tools</Link>
          <Link to="/promptverse" className="flex items-center gap-1 text-ink/70 hover:text-ink text-sm font-medium transition-colors">
            <Sparkles className="w-3.5 h-3.5" />
            PromptVerse
          </Link>
          <Link to="/workflows" className="text-ink/70 hover:text-ink text-sm font-medium transition-colors">Workflows</Link>
          <Link to="/quizzes" className="text-ink/70 hover:text-ink text-sm font-medium transition-colors">Quizzes</Link>
          <Link to="/blog" className="text-ink/70 hover:text-ink text-sm font-medium transition-colors">Blog</Link>
          <Link to="/changelog" className="text-ink/70 hover:text-ink text-sm font-medium transition-colors">Changelog</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="hidden sm:flex items-center gap-1.5 pv-glass rounded-lg px-3 py-1.5 text-pv-text text-sm hover:bg-white/10 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <button
            onClick={onOpenPalette}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-ink/50 text-sm transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search tools...</span>
            <kbd className="font-mono text-[10px] bg-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
