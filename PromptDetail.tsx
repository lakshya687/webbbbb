import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Copy, Check, Star, Share2, Play, ArrowLeft, Lightbulb,
  MessageSquare, Send, ThumbsUp, Clock, Tag,
} from 'lucide-react';
import { AuroraBackground, GlassCard, GradientButton } from '@/components/pv/AuroraBackground';
import { PromptCard } from '@/components/pv/PromptCard';
import { getCategoryBySlug } from '@/lib/prompt-categories';
import { fetchPromptBySlug, fetchPrompts, fetchComments, addComment, incrementCopyCount, ratePrompt, seedPromptsIfNeeded } from '@/lib/prompt-api';
import type { PromptRow, PromptComment } from '@/lib/supabase';

export function PromptDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [prompt, setPrompt] = useState<PromptRow | null>(null);
  const [allPrompts, setAllPrompts] = useState<PromptRow[]>([]);
  const [comments, setComments] = useState<PromptComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentPosted, setCommentPosted] = useState(false);

  useEffect(() => {
    (async () => {
      if (!slug) return;
      await seedPromptsIfNeeded();
      const [p, all] = await Promise.all([
        fetchPromptBySlug(slug),
        fetchPrompts(),
      ]);
      setPrompt(p);
      setAllPrompts(all);
      if (p) {
        const c = await fetchComments(p.id);
        setComments(c);
      }
      setLoading(false);
    })();
  }, [slug]);

  const handleCopy = async () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    await incrementCopyCount(prompt.id);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(`${window.location.origin}/prompt/${prompt.slug}`);
  };

  const handleRate = async (rating: number) => {
    if (!prompt) return;
    setUserRating(rating);
    await ratePrompt(prompt.id, rating);
  };

  const handleComment = async () => {
    if (!prompt || !commentText.trim() || !commentName.trim()) return;
    const newComment = await addComment(prompt.id, commentName, commentText);
    if (newComment) {
      setComments([newComment, ...comments]);
      setCommentText('');
      setCommentName('');
      setCommentPosted(true);
      setTimeout(() => setCommentPosted(false), 3000);
    }
  };

  if (loading) {
    return (
      <AuroraBackground>
        <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pv-glass rounded-2xl p-8 h-96 animate-pulse" />
        </div>
      </AuroraBackground>
    );
  }

  if (!prompt) {
    return (
      <AuroraBackground>
        <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-pv-text text-3xl mb-4">Prompt not found</h1>
          <Link to="/prompts">
            <GradientButton>Browse all prompts</GradientButton>
          </Link>
        </div>
      </AuroraBackground>
    );
  }

  const category = getCategoryBySlug(prompt.category);
  const related = allPrompts
    .filter(p => p.category === prompt.category && p.id !== prompt.id)
    .slice(0, 3);

  return (
    <AuroraBackground>
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <Link to="/prompts" className="text-pv-muted hover:text-pv-text flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Prompts
            </Link>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {category && (
                <Link to={`/prompts?cat=${category.slug}`}>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                  >
                    {category.name}
                  </span>
                </Link>
              )}
              <span className="text-xs text-pv-muted px-2 py-1 rounded-lg bg-white/5">
                {prompt.difficulty}
              </span>
              {prompt.featured && (
                <span className="text-xs text-pv-cyan px-2 py-1 rounded-lg bg-pv-cyan/10">
                  Featured
                </span>
              )}
              {prompt.trending && (
                <span className="text-xs text-pv-pink px-2 py-1 rounded-lg bg-pv-pink/10">
                  Trending
                </span>
              )}
            </div>

            <h1 className="font-display font-bold text-pv-text text-3xl sm:text-4xl leading-tight mb-3">
              {prompt.title}
            </h1>
            <p className="text-pv-muted text-lg leading-relaxed mb-4">{prompt.description}</p>

            {/* Author and stats */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{prompt.author_avatar}</span>
                <div>
                  <div className="text-sm font-medium text-pv-text">{prompt.author_name}</div>
                  <div className="text-xs text-pv-muted">
                    {new Date(prompt.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-pv-muted">
                <span className="flex items-center gap-1">
                  <Copy className="w-4 h-4" /> {prompt.copies_count.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> {Number(prompt.rating_avg).toFixed(1)} ({prompt.rating_count})
                </span>
              </div>
            </div>

            {/* Compatible models */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-pv-muted">Compatible:</span>
              {prompt.ai_models.map(model => (
                <span key={model} className="text-xs font-mono uppercase tracking-wide text-pv-cyan bg-pv-cyan/10 px-2 py-1 rounded">
                  {model}
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Tag className="w-4 h-4 text-pv-muted" />
              {prompt.tags.map(tag => (
                <span key={tag} className="text-xs text-pv-muted bg-white/5 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Prompt Editor */}
          <GlassCard className="p-6 mb-6" hover={false}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-pv-text text-lg">Prompt</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="pv-glass rounded-lg p-2 text-pv-muted hover:text-pv-text transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopy}
                  className={`rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-2 transition-all ${
                    copied ? 'bg-green-500/20 text-green-400' : 'pv-gradient-button text-white'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <pre className="text-pv-text text-sm leading-relaxed whitespace-pre-wrap font-mono bg-black/30 rounded-xl p-4 border border-white/5 max-h-96 overflow-y-auto">
              {prompt.content}
            </pre>
            <div className="flex items-center gap-2 mt-4">
              <button className="pv-glass rounded-lg px-4 py-2 text-sm text-pv-text flex items-center gap-2 hover:bg-white/10 transition-colors">
                <Play className="w-4 h-4" /> Run Prompt
              </button>
              <span className="text-xs text-pv-muted">Opens in your AI tool (placeholder)</span>
            </div>
          </GlassCard>

          {/* Expected Output */}
          {prompt.expected_output && (
            <GlassCard className="p-6 mb-6" hover={false}>
              <h2 className="font-display font-semibold text-pv-text text-lg mb-3">Expected Output</h2>
              <p className="text-pv-muted text-sm leading-relaxed">{prompt.expected_output}</p>
            </GlassCard>
          )}

          {/* Tips */}
          {prompt.tips && (
            <GlassCard className="p-6 mb-6" hover={false}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-pv-cyan" />
                <h2 className="font-display font-semibold text-pv-text text-lg">Tips</h2>
              </div>
              <p className="text-pv-muted text-sm leading-relaxed">{prompt.tips}</p>
            </GlassCard>
          )}

          {/* Rating */}
          <GlassCard className="p-6 mb-6" hover={false}>
            <h2 className="font-display font-semibold text-pv-text text-lg mb-4">Rate this Prompt</h2>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => handleRate(n)}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 ${
                      n <= (hoverRating || userRating)
                        ? 'text-pv-cyan fill-pv-cyan'
                        : 'text-pv-muted'
                    }`}
                  />
                </button>
              ))}
              {userRating > 0 && (
                <span className="text-pv-muted text-sm ml-3">Thanks for rating!</span>
              )}
            </div>
          </GlassCard>

          {/* Comments */}
          <GlassCard className="p-6 mb-6" hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-pv-purple" />
              <h2 className="font-display font-semibold text-pv-text text-lg">Comments ({comments.length})</h2>
            </div>

            {/* Comment form */}
            <div className="mb-6">
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your name"
                className="w-full pv-glass rounded-xl px-4 py-2.5 text-pv-text placeholder:text-pv-muted outline-none text-sm mb-2"
              />
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full pv-glass rounded-xl px-4 py-2.5 text-pv-text placeholder:text-pv-muted outline-none text-sm mb-2 resize-none"
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim() || !commentName.trim()}
                  className="pv-gradient-button rounded-xl px-4 py-2 text-sm font-medium text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" /> Post Comment
                </button>
                {commentPosted && (
                  <span className="text-green-400 text-sm flex items-center gap-1">
                    <Check className="w-4 h-4" /> Comment posted!
                  </span>
                )}
              </div>
            </div>

            {/* Comment list */}
            <div className="space-y-3">
              {comments.length === 0 ? (
                <p className="text-pv-muted text-sm text-center py-4">Be the first to comment!</p>
              ) : (
                comments.map(c => (
                  <div key={c.id} className="pv-glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-pv-text">{c.author_name}</span>
                      <span className="text-xs text-pv-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-pv-muted text-sm leading-relaxed">{c.content}</p>
                    <button className="mt-2 text-xs text-pv-muted hover:text-pv-text flex items-center gap-1 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                    </button>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          {/* Related Prompts */}
          {related.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-pv-text text-2xl mb-4">Related Prompts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((p, i) => (
                  <PromptCard key={p.id} prompt={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuroraBackground>
  );
}
