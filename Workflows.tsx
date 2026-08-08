import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';
import { TiltCard } from '@/components/TiltCard';
import { TOOLS } from '@/lib/tools';

const WORKFLOWS = [
  {
    name: 'Full YouTube Upload Kit',
    desc: 'Generate your title, description, tags, and thumbnail text from a single video topic.',
    toolSlugs: ['youtube-title-generator', 'youtube-description-generator', 'youtube-tag-generator', 'youtube-thumbnail-text'],
    glow: '#F2A93B',
  },
  {
    name: 'Instagram Launch Pack',
    desc: 'Create your caption, hashtags, and story ideas from one post concept.',
    toolSlugs: ['instagram-caption-generator', 'instagram-hashtag-generator', 'instagram-story-idea'],
    glow: '#F2A93B',
  },
  {
    name: 'Blog Publish Kit',
    desc: 'Write your title, outline, meta title, and meta description from one topic.',
    toolSlugs: ['blog-title-generator', 'blog-outline-generator', 'meta-title-generator', 'meta-description-generator'],
    glow: '#4C7EA8',
  },
];

export function Workflows() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <h1 className="font-display font-bold text-ink text-4xl mb-2">Workflows</h1>
      <p className="text-ink/50 text-sm mb-10">Chain multiple tools into one guided flow with a shared input.</p>

      <div className="space-y-6">
        {WORKFLOWS.map((wf, i) => {
          const tools = wf.toolSlugs.map(s => TOOLS.find(t => t.slug === s)).filter((t): t is NonNullable<typeof t> => t !== undefined);
          return (
            <TiltCard key={i} glowColor={wf.glow} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber" />
                </div>
                <h2 className="font-display font-bold text-ink text-xl">{wf.name}</h2>
              </div>
              <p className="text-ink/60 text-sm mb-5">{wf.desc}</p>

              {/* Steps */}
              <div className="flex flex-wrap items-center gap-2">
                {tools.map((t, idx) => {
                  const Icon = t.icon;
                  return (
                    <div key={t.slug} className="flex items-center gap-2">
                      <Link
                        to={`/tool/${t.slug}`}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 transition-colors"
                      >
                        <span className="font-mono text-xs text-amber">{idx + 1}</span>
                        <Icon className="w-4 h-4 text-amber" />
                        <span className="text-ink/80 text-sm">{t.name}</span>
                      </Link>
                      {idx < tools.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-ink/30" />}
                    </div>
                  );
                })}
              </div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}
