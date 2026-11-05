'use client';

import { useState, useEffect } from 'react';
import { Exercise } from '@/types';
import { cn } from '@/lib/utils';

interface WordBankProps {
  exercise: Exercise;
  onAnswerChange: (answer: string) => void;
  showResult: boolean;
  isCorrect: boolean;
}

export default function WordBank({ exercise, onAnswerChange, showResult, isCorrect }: WordBankProps) {
  const words = exercise.wordBank ?? [];
  const [arranged, setArranged] = useState<string[]>([]);
  const [bank, setBank] = useState<string[]>([...words]);

  useEffect(() => {
    // shuffle bank on mount
    setBank([...words].sort(() => Math.random() - 0.5));
    setArranged([]);
  }, [exercise.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function pickWord(word: string, bankIdx: number) {
    if (showResult) return;
    const newArranged = [...arranged, word];
    const newBank = [...bank];
    newBank.splice(bankIdx, 1);
    setArranged(newArranged);
    setBank(newBank);
    onAnswerChange(newArranged.join(' '));
  }

  function removeWord(word: string, arrangedIdx: number) {
    if (showResult) return;
    const newArranged = [...arranged];
    newArranged.splice(arrangedIdx, 1);
    setArranged(newArranged);
    setBank([...bank, word]);
    onAnswerChange(newArranged.join(' '));
  }

  const answerBorderColor = showResult
    ? isCorrect ? '#3CC48A' : '#EF6B63'
    : '#DAE5EF';

  return (
    <div>
      <h2 className="font-display text-[clamp(22px,4vw,28px)] font-bold text-[#14304A] mb-6">
        {exercise.question}
      </h2>

      {/* Answer area */}
      <div
        className="min-h-[90px] p-3 mb-5 rounded-2xl border-2 flex flex-wrap gap-2 content-start transition-colors"
        style={{
          borderColor: answerBorderColor,
          background: showResult
            ? isCorrect ? '#E1F7EC' : '#FDE9E7'
            : '#F6F9FC',
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 55px, #DAE5EF 55px, #DAE5EF 57px)',
        }}
      >
        {arranged.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            onClick={() => removeWord(word, idx)}
            disabled={showResult}
            className={cn(
              'px-4 py-2.5 rounded-xl border-2 border-b-4 font-black text-[17px] transition-colors',
              showResult
                ? isCorrect
                  ? 'bg-[#E1F7EC] border-[#3CC48A] text-[#137A4B]'
                  : 'bg-[#FDE9E7] border-[#EF6B63] text-[#B02F28]'
                : 'bg-white border-[#DAE5EF] text-[#14304A] hover:bg-[#EDF3F9]'
            )}
          >
            {word}
          </button>
        ))}
        {arranged.length === 0 && (
          <span className="text-[#8AA0B4] font-bold text-sm self-center px-2">
            Ketuk kata di bawah untuk menyusun jawaban
          </span>
        )}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 justify-center min-h-[56px]">
        {bank.map((word, idx) => (
          <button
            key={`${word}-${idx}`}
            onClick={() => pickWord(word, idx)}
            disabled={showResult}
            className="px-4 py-2.5 rounded-xl bg-white border-2 border-b-4 border-[#DAE5EF] font-black text-[17px] text-[#14304A] hover:bg-[#EDF3F9] transition-colors disabled:opacity-50"
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}

