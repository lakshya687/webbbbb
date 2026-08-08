import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Star, TrendingUp, Eye } from 'lucide-react';
import type { PromptRow } from '@/lib/supabase';
import { getCategoryBySlug } from '@/lib/prompt-categories';
import { GlassCard } from './AuroraBackground';

interface PromptCardProps {
  prompt: PromptRow;
  index?: number;
}

export function PromptCard({ prompt, index = 0 }: PromptCardProps) {
  const category = getCategoryBySlug(prompt.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.4 }}
    >
      <Link to={`/prompt/${prompt.slug}`}>
        <GlassCard className="p-5 h-full flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {category && (
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-lg"
                  style={{ backgroundColor: `${category.color}15`, color: category.color }}
                >
                  {category.name}
                </span>
              )}
              <span className="text-xs text-pv-muted px-2 py-1 rounded-lg bg-white/5">
                {prompt.difficulty}
              </span>
            </div>
            {prompt.trending && (
              <span className="flex items-center gap-1 text-xs text-pv-pink">
                <TrendingUp className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <h3 className="font-display font-semibold text-pv-text text-lg leading-tight mb-2 line-clamp-2">
            {prompt.title}
          </h3>

          <p className="text-pv-muted text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {prompt.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {prompt.ai_models.slice(0, 3).map((model) => (
              <span key={model} className="text-[10px] font-mono uppercase tracking-wide text-pv-muted bg-white/5 px-2 py-0.5 rounded">
                {model}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-3 text-xs text-pv-muted">
              <span className="flex items-center gap-1">
                <Copy className="w-3.5 h-3.5" />
                {formatCount(prompt.copies_count)}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                {Number(prompt.rating_avg).toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {formatCount(prompt.likes_count)}
              </span>
            </div>
            <span className="text-lg">{prompt.author_avatar}</span>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}
