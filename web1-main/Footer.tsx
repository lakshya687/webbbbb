import { Link } from 'react-router-dom';
import { Wrench, Github, Twitter } from 'lucide-react';
import { CATEGORIES } from '@/lib/tools';
import { CHANGELOG, getLatestChangelogDate } from '@/lib/changelog';
import { getLastChangelogView } from '@/lib/hooks';

export function Footer() {
  const latestDate = getLatestChangelogDate();
  const lastViewed = getLastChangelogView();
  const hasNew = latestDate && (!lastViewed || lastViewed < latestDate);

  return (
    <footer className="blueprint-grid mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber flex items-center justify-center">
                <Wrench className="w-4.5 h-4.5 text-bg" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-ink text-lg">Workbench</span>
            </Link>
            <p className="text-ink/50 text-sm leading-relaxed">159 free AI-powered tools for creators, marketers, and builders.</p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink/40 mb-3">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map(c => (
                <li key={c.slug}>
                  <Link to={`/tools?cat=${c.slug}`} className="text-ink/60 hover:text-amber text-sm transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink/40 mb-3">More</h4>
            <ul className="space-y-2">
              <li><Link to="/tools" className="text-ink/60 hover:text-amber text-sm transition-colors">All Tools</Link></li>
              <li><Link to="/promptverse" className="text-ink/60 hover:text-amber text-sm transition-colors">PromptVerse AI</Link></li>
              <li><Link to="/prompts" className="text-ink/60 hover:text-amber text-sm transition-colors">Browse Prompts</Link></li>
              <li><Link to="/dashboard" className="text-ink/60 hover:text-amber text-sm transition-colors">Dashboard</Link></li>
              <li><Link to="/workflows" className="text-ink/60 hover:text-amber text-sm transition-colors">Workflows</Link></li>
              <li><Link to="/quizzes" className="text-ink/60 hover:text-amber text-sm transition-colors">Quizzes</Link></li>
              <li><Link to="/blog" className="text-ink/60 hover:text-amber text-sm transition-colors">Blog</Link></li>
              <li>
                <Link to="/changelog" className="text-ink/60 hover:text-amber text-sm transition-colors flex items-center gap-1.5">
                  Changelog
                  {hasNew && <span className="w-1.5 h-1.5 rounded-full bg-amber" />}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-ink/40 mb-3">About</h4>
            <ul className="space-y-2">
              <li><Link to="/suggest" className="text-ink/60 hover:text-amber text-sm transition-colors">Suggest a Tool</Link></li>
              <li><Link to="/examples" className="text-ink/60 hover:text-amber text-sm transition-colors">Examples Gallery</Link></li>
            </ul>
            <p className="font-mono text-[10px] text-ink/30 mt-4">Last updated: {new Date(latestDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
          <p className="text-ink/40 text-xs font-mono">© 2026 Workbench. Built for creators.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-ink/40 hover:text-amber transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="text-ink/40 hover:text-amber transition-colors"><Github className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
