import { cn } from '@/lib/utils';

type Mood = 'happy' | 'cheer' | 'sad';

interface MascotProps {
  mood?: Mood;
  className?: string;
  size?: number;
}

export default function Mascot({ mood = 'happy', className, size = 80 }: MascotProps) {
  const eyeOffsetY = mood === 'sad' ? 2 : 0;
  const mouthPath = mood === 'happy'
    ? 'M34 50 Q40 56 46 50'
    : mood === 'cheer'
    ? 'M31 49 Q40 59 49 49'
    : 'M34 55 Q40 49 46 55';

  return (
    <svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 80 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('drop-shadow-md', className)}
      aria-hidden="true"
    >
      {/* Cloud body */}
      <ellipse cx="40" cy="42" rx="34" ry="22" fill="white" />
      <circle cx="22" cy="38" r="16" fill="white" />
      <circle cx="58" cy="38" r="16" fill="white" />
      <circle cx="40" cy="28" r="20" fill="white" />

      {/* Eyes */}
      <circle cx="34" cy={39 + eyeOffsetY} r="4" fill="#14304A" />
      <circle cx="46" cy={39 + eyeOffsetY} r="4" fill="#14304A" />
      {/* Eye shine */}
      <circle cx="35.5" cy={37.5 + eyeOffsetY} r="1.5" fill="white" />
      <circle cx="47.5" cy={37.5 + eyeOffsetY} r="1.5" fill="white" />

      {/* Cheeks */}
      {mood !== 'sad' && (
        <>
          <ellipse cx="29" cy="45" rx="5" ry="3" fill="#F59A3D" opacity="0.4" />
          <ellipse cx="51" cy="45" rx="5" ry="3" fill="#F59A3D" opacity="0.4" />
        </>
      )}

      {/* Mouth */}
      <path d={mouthPath} stroke="#14304A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Stars for cheer */}
      {mood === 'cheer' && (
        <>
          <text x="4" y="20" fontSize="12" fill="#F59A3D">★</text>
          <text x="62" y="16" fontSize="10" fill="#5DB8F5">★</text>
        </>
      )}
    </svg>
  );
}

