'use client';

import { Exercise } from '@/types';
import { cn } from '@/lib/utils';

interface MultipleChoiceProps {
  exercise: Exercise;
  selected: string | null;
  onSelect: (answer: string) => void;
  showResult: boolean;
}

export default function MultipleChoice({ exercise, selected, onSelect, showResult }: MultipleChoiceProps) {
  const options = exercise.options ?? [];

  return (
    <div>
      <h2 className="font-display text-[clamp(22px,4vw,30px)] font-bold text-[#14304A] mb-6">
        {exercise.question}
      </h2>

      {exercise.type === 'aksara-quiz' && exercise.questionBali && (
        <div className="text-center mb-6">
          <span
            className="text-[80px] leading-none select-none"
            style={{ fontFamily: 'serif' }}
          >
            {exercise.questionBali}
          </span>
        </div>
      )}

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        {options.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === exercise.correctAnswer;

          let optClass = 'bg-white border-[#DAE5EF] text-[#14304A] hover:bg-[#EDF3F9]';
          if (showResult) {
            if (isCorrect) optClass = 'bg-[#E1F7EC] border-[#3CC48A] text-[#137A4B]';
            else if (isSelected && !isCorrect) optClass = 'bg-[#FDE9E7] border-[#EF6B63] text-[#B02F28]';
            else optClass = 'bg-white border-[#DAE5EF] text-[#14304A] opacity-60';
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
                'flex flex-col gap-3 text-left px-4 py-4 rounded-2xl border-2 border-b-[5px] font-black text-base transition-colors duration-100',
                optClass
              )}
            >
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

