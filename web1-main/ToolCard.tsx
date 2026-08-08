import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Tool } from '@/lib/tools';
import { CATEGORIES } from '@/lib/tools';
import { TiltCard } from '@/components/TiltCard';
import { StarButton } from '@/components/StarButton';
import { getUsageCount, formatCount } from '@/lib/generator';

interface ToolCardProps {
  tool: Tool;
  favorited: boolean;
  onToggleFavorite: (slug: string) => void;
}

export function ToolCard({ tool, favorited, onToggleFavorite }: ToolCardProps) {
  const category = CATEGORIES.find(c => c.name === tool.category);
  const glow = category?.glow || '#F2A93B';
  const Icon = tool.icon;
  const count = getUsageCount(tool.slug);

  let hintTag = 'Link optional';
  if (tool.linkRequired) hintTag = 'Needs a link';
  else if (tool.scratchOnly) hintTag = 'No content needed';
  else if (tool.inputType === 'number' || tool.inputType === 'multi-input') hintTag = 'No content needed';

  return (
    <Link to={`/tool/${tool.slug}`} className="block">
      <TiltCard glowColor={glow} className="p-5 h-full">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
            <Icon className="w-5 h-5 text-amber" />
          </div>
          <StarButton favorited={favorited} onToggle={() => onToggleFavorite(tool.slug)} size={18} />
        </div>
        <h3 className="font-display font-semibold text-ink mt-4 text-base">{tool.name}</h3>
        <p className="text-ink/60 text-sm mt-1.5 leading-relaxed">{tool.description}</p>
        <div className="flex items-center gap-2 mt-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-amber/80 bg-amber/10 px-2 py-0.5 rounded">
            {tool.category}
          </span>
          {tool.isNew && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-blueprint bg-blueprint/10 px-2 py-0.5 rounded">
              New
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-mono text-[10px] text-ink/30">{hintTag}</span>
          <span className="font-mono text-[10px] text-ink/30">{formatCount(count)}+ generated</span>
        </div>
      </TiltCard>
    </Link>
  );
}
