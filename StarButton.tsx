import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarButtonProps {
  favorited: boolean;
  onToggle: () => void;
  size?: number;
}

export function StarButton({ favorited, onToggle, size = 20 }: StarButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        size={size}
        className={favorited ? 'text-amber fill-amber' : 'text-ink/40'}
        fill={favorited ? '#F2A93B' : 'none'}
      />
    </motion.button>
  );
}
