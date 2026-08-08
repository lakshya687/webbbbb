import { useEffect } from 'react';
import { CHANGELOG } from '@/lib/changelog';
import { setLastChangelogView } from '@/lib/hooks';

export function Changelog() {
  useEffect(() => {
    setLastChangelogView(CHANGELOG[0]?.date || '');
  }, []);

  const grouped: Record<string, typeof CHANGELOG> = {};
  CHANGELOG.forEach(entry => {
    const month = new Date(entry.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(entry);
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <h1 className="font-display font-bold text-ink text-4xl mb-2">Changelog</h1>
      <p className="text-ink/50 text-sm mb-10">What's new on Workbench.</p>

      {Object.entries(grouped).map(([month, entries]) => (
        <div key={month} className="mb-10">
          <h2 className="font-mono text-xs uppercase tracking-wider text-ink/40 mb-4">{month}</h2>
          <div className="space-y-6">
            {entries.map(entry => (
              <div key={entry.date} className="border-l-2 border-amber/30 pl-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-amber">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <h3 className="font-display font-semibold text-ink text-lg">{entry.title}</h3>
                <p className="text-ink/60 text-sm mt-1 leading-relaxed">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
