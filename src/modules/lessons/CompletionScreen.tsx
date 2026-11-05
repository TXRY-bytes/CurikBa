'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Button from '@/components/ui/Button';
import Mascot from '@/components/ui/Mascot';

interface CompletionScreenProps {
  xpEarned: number;
  stars: number;
  correct: number;
  total: number;
  lessonTitle: string;
  onContinue: () => void;
  /**
   * Slot untuk file animasi .rif (Rive Animation) di masa depan.
   * Contoh: '/animations/curik_celebrate.riv'
   */
  rifAnimationUrl?: string;
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill={filled ? '#F59A3D' : '#DAE5EF'}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export default function CompletionScreen({
  xpEarned,
  stars,
  correct,
  total,
  lessonTitle,
  onContinue,
  rifAnimationUrl,
}: CompletionScreenProps) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#5DB8F5', '#3CC48A', '#F59A3D', '#9B59B6', '#F0576A'],
      });
    } catch {
      // ignore
    }
  }, []);

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="flex flex-col items-center text-center px-4 pt-8 pb-8 animate-fade-in">
      {/* 
        Slot Animasi: Jika ada file .rif / .riv di masa depan,
        komponen @rive-app/react-canvas dapat dipasang di sini.
        Saat ini menggunakan maskot CurikBA dinamis SVG beranimasi bob.
      */}
      <div className="mb-4 animate-bob relative">
        {rifAnimationUrl ? (
          <div className="w-32 h-32 flex items-center justify-center">
            {/* Placeholder / Canvas loader untuk file .rif */}
            <canvas id="rive-canvas" width={128} height={128} />
          </div>
        ) : (
          <Mascot mood="cheer" size={120} />
        )}
      </div>

      <h1 className="font-display font-bold text-4xl text-[#14304A] mb-2">Luar Biasa!</h1>
      <p className="text-[#56708A] font-bold text-base mb-6">{lessonTitle} selesai!</p>

      {/* Stars */}
      <div className="flex gap-1 mb-8">
        {[1, 2, 3].map((s) => (
          <Star key={s} filled={s <= stars} />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm mb-8">
        <div className="bg-white border-2 border-[#DAE5EF] rounded-2xl p-4 text-center">
          <div className="font-display font-bold text-2xl text-[#1273BC] tabular-nums">+{xpEarned}</div>
          <div className="text-xs font-black text-[#56708A] uppercase tracking-wider mt-1">XP</div>
        </div>
        <div className="bg-white border-2 border-[#DAE5EF] rounded-2xl p-4 text-center">
          <div className="font-display font-bold text-2xl text-[#3CC48A] tabular-nums">{accuracy}%</div>
          <div className="text-xs font-black text-[#56708A] uppercase tracking-wider mt-1">Akurasi</div>
        </div>
        <div className="bg-white border-2 border-[#DAE5EF] rounded-2xl p-4 text-center">
          <div className="font-display font-bold text-2xl text-[#F59A3D] tabular-nums">
            {correct}/{total}
          </div>
          <div className="text-xs font-black text-[#56708A] uppercase tracking-wider mt-1">Benar</div>
        </div>
      </div>

      <Button size="lg" block onClick={onContinue} className="max-w-sm">
        Lanjutkan
      </Button>
    </div>
  );
}
