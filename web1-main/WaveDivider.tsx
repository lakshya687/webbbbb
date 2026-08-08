interface WaveDividerProps {
  variant?: 'top' | 'bottom';
  className?: string;
  flip?: boolean;
}

export function WaveDivider({ variant = 'bottom', className = '', flip = false }: WaveDividerProps) {
  const transform = flip ? 'scaleY(-1)' : 'none';
  
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg
        className="w-full h-auto"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ transform }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          opacity="0.1"
        />
      </svg>
    </div>
  );
}
