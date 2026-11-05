'use client';

import { UserProgress } from '@/types';
import { cn } from '@/lib/utils';

interface StatsBarProps {
  progress: UserProgress;
  className?: string;
}

export default function StatsBar({ progress, className }: StatsBarProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* Streak */}
      <div className="flex items-center gap-1.5 font-black text-[15px] tabular-nums" style={{ color: '#F59A3D' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32C8.63 6.15 7.75 9.25 7.52 11.11c-.78-.07-1.53-.32-2.1-.8-.63-.53-.98-1.26-1.1-2.03-.3 1.51-.01 3.09.76 4.42C5.9 14.49 7.3 16.1 9 16.74c-2.1-1.1-2.98-3.42-2.33-5.7.56 1.44 1.47 2.56 2.68 3.1C8.68 17.08 8.74 20.52 11 22c-1.52-3-.3-5.95 1.52-7.19.74-.48 1.5-.88 2.1-1.5.47-.48.86-1.1 1.04-1.74.65 1.3 1.26 3.11.9 4.63.95-.9 1.56-2.14 1.7-3.42.17-1.47-.22-2.98-.9-4.3l-.7.72z" />
        </svg>
        <span>{progress.streak}</span>
      </div>

      {/* Gems */}
      <div className="flex items-center gap-1.5 font-black text-[15px] tabular-nums" style={{ color: '#1273BC' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2l-6 7 12 13L24 9 18 2H6zm1.5 2h9l3.9 5H3.6L7.5 4zm4.5 12.5L4.1 11h15.8L12 16.5z" />
        </svg>
        <span>{progress.gems}</span>
      </div>

      {/* Hearts */}
      <div className="flex items-center gap-1.5 font-black text-[15px] tabular-nums" style={{ color: '#F0576A' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <span>{progress.hearts}</span>
      </div>
    </div>
  );
}

