import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function AuroraBackground({ children }: { children?: ReactNode }) {
  return (
    <div className="relative overflow-hidden pv-bg min-h-screen">
      {/* Aurora blobs */}
      <div
        className="pv-aurora-blob animate-aurora"
        style={{
          width: 500,
          height: 500,
          top: -100,
          left: -100,
          background: 'rgba(168, 85, 247, 0.15)',
        }}
      />
      <div
        className="pv-aurora-blob animate-aurora"
        style={{
          width: 400,
          height: 400,
          top: 100,
          right: -50,
          background: 'rgba(59, 130, 246, 0.12)',
          animationDelay: '5s',
        }}
      />
      <div
        className="pv-aurora-blob animate-aurora"
        style={{
          width: 350,
          height: 350,
          bottom: -80,
          left: '40%',
          background: 'rgba(34, 211, 238, 0.08)',
          animationDelay: '10s',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function FloatingSpheres() {
  const spheres = [
    { size: 80, x: '10%', y: '20%', delay: 0, color: 'rgba(168, 85, 247, 0.3)' },
    { size: 60, x: '85%', y: '15%', delay: 1, color: 'rgba(59, 130, 246, 0.25)' },
    { size: 100, x: '75%', y: '70%', delay: 2, color: 'rgba(34, 211, 238, 0.2)' },
    { size: 50, x: '20%', y: '75%', delay: 1.5, color: 'rgba(236, 72, 153, 0.2)' },
    { size: 70, x: '50%', y: '50%', delay: 3, color: 'rgba(168, 85, 247, 0.15)' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {spheres.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: s.size,
            height: s.size,
            left: s.x,
            top: s.y,
            background: `radial-gradient(circle at 30% 30%, ${s.color}, transparent 70%)`,
            boxShadow: `0 0 60px ${s.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`pv-glass rounded-2xl ${hover ? 'pv-card-hover pv-glow-border' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function GradientButton({
  children,
  onClick,
  className = '',
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`pv-gradient-button text-white font-semibold px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`pv-glass text-pv-text font-medium px-6 py-3 rounded-xl transition-all hover:bg-white/10 ${className}`}
    >
      {children}
    </button>
  );
}

export function StatCard({ value, label, icon }: { value: string; label: string; icon?: ReactNode }) {
  return (
    <GlassCard className="p-6 text-center">
      {icon && <div className="mb-2 flex justify-center">{icon}</div>}
      <div className="font-display font-bold text-3xl pv-gradient-text">{value}</div>
      <div className="text-pv-muted text-sm mt-1">{label}</div>
    </GlassCard>
  );
}
