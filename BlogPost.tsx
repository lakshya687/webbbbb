import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';
import { TOOLS } from '@/lib/tools';
import { TiltCard } from '@/components/TiltCard';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-32 pb-20 text-center">
        <h1 className="font-display font-bold text-ink text-3xl">Article not found</h1>
        <Link to="/blog" className="text-amber mt-4 inline-block">Back to blog</Link>
      </div>
    );
  }

  const relatedTools = post.relatedToolSlugs
    .map(s => TOOLS.find(t => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <Link to="/blog" className="flex items-center gap-2 text-ink/50 hover:text-ink text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> All articles
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-wider text-amber bg-amber/10 px-2 py-0.5 rounded">{post.category}</span>
        <span className="font-mono text-xs text-ink/40">{post.date} · {post.readTime}</span>
      </div>

      <h1 className="font-display font-bold text-ink text-4xl leading-tight mb-6">{post.title}</h1>

      <div className="prose prose-invert max-w-none">
        {post.content.split('\n').map((line, i) => {
          if (line.startsWith('# ')) return <h1 key={i} className="font-display font-bold text-ink text-2xl mt-8 mb-4">{line.slice(2)}</h1>;
          if (line.startsWith('## ')) return <h2 key={i} className="font-display font-semibold text-ink text-xl mt-8 mb-3">{line.slice(3)}</h2>;
          if (line.startsWith('- ')) return <li key={i} className="text-ink/70 text-sm leading-relaxed ml-4 list-disc">{line.slice(2)}</li>;
          if (line.trim() === '') return <div key={i} className="h-4" />;
          return <p key={i} className="text-ink/70 text-sm leading-relaxed mb-3">{line}</p>;
        })}
      </div>

      {relatedTools.length > 0 && (
        <div className="mt-12 pt-8 border-t border-white/5">
          <h2 className="font-display font-semibold text-ink text-lg mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map(t => {
              const Icon = t.icon;
              return (
                <Link key={t.slug} to={`/tool/${t.slug}`}>
                  <TiltCard glowColor="#F2A93B" className="p-4 h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-amber" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-ink text-sm">{t.name}</h3>
                        <p className="text-ink/50 text-xs mt-0.5 line-clamp-1">{t.description}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
