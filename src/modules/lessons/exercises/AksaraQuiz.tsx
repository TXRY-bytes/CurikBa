'use client';

import { Exercise } from '@/types';
import { cn } from '@/lib/utils';

interface AksaraQuizProps {
  exercise: Exercise;
  selected: string | null;
  onSelect: (answer: string) => void;
  showResult: boolean;
}

export default function AksaraQuiz({ exercise, selected, onSelect, showResult }: AksaraQuizProps) {
  const options = exercise.options ?? [];

  return (
    <div>
      {/* Label */}
      <div className="inline-flex items-center gap-2 font-black text-xs tracking-widest uppercase text-[#1273BC] mb-4">
        <div className="w-6 h-6 rounded-full bg-[#DDEFFC] grid place-items-center">
          <span>ᬅ</span>
        </div>
        Aksara Bali
      </div>

      <h2 className="font-display text-[clamp(20px,3vw,26px)] font-bold text-[#14304A] mb-6">
        {exercise.question}
      </h2>

      {/* Large aksara display */}
      {exercise.questionBali && (
        <div className="flex justify-center mb-8">
          <div className="w-40 h-40 rounded-3xl bg-[#EDF6FD] border-2 border-[#DDEFFC] grid place-items-center shadow-inner">
            <span
              className="select-none leading-none"
              style={{ fontSize: '90px', fontFamily: 'serif, sans-serif' }}
              aria-label={`Aksara: ${exercise.questionBali}`}
            >
              {exercise.questionBali}
            </span>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === exercise.correctAnswer;

          let optClass = 'bg-white border-[#DAE5EF] text-[#14304A] hover:bg-[#EDF3F9]';
          if (showResult) {
            if (isCorrect) optClass = 'bg-[#E1F7EC] border-[#3CC48A] text-[#137A4B]';
            else if (isSelected && !isCorrect) optClass = 'bg-[#FDE9E7] border-[#EF6B63] text-[#B02F28]';
            else optClass = 'bg-white border-[#DAE5EF] text-[#14304A] opacity-50';
          } else if (isSelected) {
            optClass = 'bg-[#EDF6FD] border-[#5DB8F5] text-[#1273BC]';
          }

          return (
            <button
              key={opt}
              onClick={() => !showResult && onSelect(opt)}
              disabled={showResult}
              aria-pressed={isSelected}
              className={cn(
                'flex items-center justify-center px-4 py-5 rounded-2xl border-2 border-b-[5px] font-black text-xl transition-colors duration-100',
                optClass
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

