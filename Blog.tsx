import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';

export function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 pb-12">
      <h1 className="font-display font-bold text-ink text-4xl mb-2">Blog</h1>
      <p className="text-ink/50 text-sm mb-10">Guides, tips, and deep dives on content creation and marketing.</p>

      <div className="space-y-6">
        {BLOG_POSTS.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block bg-slate border border-white/5 rounded-xl p-6 hover:border-amber/30 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-amber bg-amber/10 px-2 py-0.5 rounded">{post.category}</span>
              <span className="font-mono text-xs text-ink/40">{post.date} · {post.readTime}</span>
            </div>
            <h2 className="font-display font-bold text-ink text-xl group-hover:text-amber transition-colors">{post.title}</h2>
            <p className="text-ink/60 text-sm mt-2 leading-relaxed">{post.excerpt}</p>
            <span className="text-amber text-sm font-medium flex items-center gap-1 mt-4">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
