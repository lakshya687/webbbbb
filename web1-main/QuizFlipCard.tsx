import { motion, AnimatePresence } from 'framer-motion';

interface QuizFlipCardProps {
  cardKey: string | number;
  children: React.ReactNode;
}

export function QuizFlipCard({ cardKey, children }: QuizFlipCardProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div style={{ perspective: 1200 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={cardKey}
          initial={prefersReducedMotion ? { opacity: 0 } : { rotateY: 90, opacity: 0 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { rotateY: 0, opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="rounded-2xl bg-[#2A2E38] border border-white/5 p-8 shadow-xl"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
