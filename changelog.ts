export interface ChangelogEntry {
  date: string;
  title: string;
  description: string;
}

export const CHANGELOG: ChangelogEntry[] = [
  { date: '2026-08-01', title: 'Added 70 new tools', description: 'Expanded the toolkit with 70 new tools across Social Media, Advertising, Email Marketing, Analytics, Branding, Business, and Website categories. That brings us to 159 total tools.' },
  { date: '2026-07-22', title: 'Link or scratch input toggle', description: 'Every text-based tool now lets you paste a link or start from scratch with quick-pick options. The site remembers which mode you used last per category.' },
  { date: '2026-07-15', title: 'Favorites and command palette', description: 'Star your favorite tools for quick access, and press Cmd+K (or Ctrl+K) to jump to any tool instantly.' },
  { date: '2026-07-08', title: 'Workflows launched', description: 'Added guided multi-tool workflows that chain tools together with a shared input — like the Full YouTube Upload Kit and Blog Publish Kit.' },
  { date: '2026-07-01', title: 'Workbench redesign', description: 'Rolled out the new workbench visual theme with blueprint grid, 3D tilt cards, and the amber-on-graphite color palette.' },
];

export function getLatestChangelogDate(): string {
  return CHANGELOG[0]?.date || '';
}
