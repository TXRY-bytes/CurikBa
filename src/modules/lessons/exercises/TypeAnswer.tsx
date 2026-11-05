'use client';

import { useState } from 'react';
import { Exercise } from '@/types';
import { cn } from '@/lib/utils';

interface TypeAnswerProps {
  exercise: Exercise;
  onAnswerChange: (answer: string) => void;
  showResult: boolean;
  isCorrect: boolean;
}

export default function TypeAnswer({ exercise, onAnswerChange, showResult, isCorrect }: TypeAnswerProps) {
  const [value, setValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (showResult) return;
    setValue(e.target.value);
    onAnswerChange(e.target.value);
  }

  const borderColor = showResult
    ? isCorrect ? '#3CC48A' : '#EF6B63'
    : value ? '#5DB8F5' : '#DAE5EF';

  const bgColor = showResult
    ? isCorrect ? '#E1F7EC' : '#FDE9E7'
    : '#FFFFFF';

  return (
    <div>
      <h2 className="font-display text-[clamp(22px,4vw,30px)] font-bold text-[#14304A] mb-6">
        {exercise.question}
      </h2>

      {/* Illustration */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-2xl bg-[#EDF6FD] flex items-center justify-center">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" fill="#DDEFFC" />
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="36" fill="#1273BC">
              ✍️
            </text>
          </svg>
        </div>
      </div>

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        disabled={showResult}
        placeholder="Tulis jawaban di sini..."
        className="w-full px-4 py-4 rounded-xl border-2 font-bold text-[17px] outline-none transition-colors"
        style={{
          borderColor,
          background: bgColor,
          color: showResult ? (isCorrect ? '#137A4B' : '#B02F28') : '#14304A',
        }}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />

      {showResult && !isCorrect && (
        <div className="mt-3 text-sm font-bold text-[#56708A]">
          Jawaban benar: <span className="text-[#137A4B] font-black">{exercise.correctAnswer}</span>
        </div>
      )}
    </div>
  );
}

