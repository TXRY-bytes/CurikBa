import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
  color?: string;
}

export default function ProgressBar({ value, className, showLabel = false, color = '#5DB8F5' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn('h-4 rounded-full bg-[#EDF3F9] relative overflow-hidden', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%`, background: color, minWidth: clamped > 0 ? '8px' : '0' }}
      >
        <div className="absolute left-2 right-2 top-1 h-1 rounded-full bg-white/40" />
      </div>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-[#56708A]">
          {clamped}%
        </div>
      )}
    </div>
  );
}

