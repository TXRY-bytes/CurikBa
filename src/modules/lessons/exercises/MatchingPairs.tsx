'use client';

import { useState, useEffect } from 'react';
import { Exercise } from '@/types';
import { cn } from '@/lib/utils';

interface MatchingPairsProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
  showResult: boolean;
}

export default function MatchingPairs({ exercise, onComplete, showResult }: MatchingPairsProps) {
  const pairs = exercise.pairs ?? [];
  const lefts = pairs.map(p => p[0]);
  const rights = pairs.map(p => p[1]);

  const [shuffledRights, setShuffledRights] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({}); // left -> right
  const [flashing, setFlashing] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setShuffledRights([...rights].sort(() => Math.random() - 0.5));
    setMatched({});
    setSelectedLeft(null);
    setSelectedRight(null);
    setCompleted(false);
  }, [exercise.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSelectLeft(word: string) {
    if (showResult || completed) return;
    if (Object.keys(matched).includes(word)) return;
    setSelectedLeft(word);
  }

  function handleSelectRight(word: string) {
    if (showResult || completed) return;
    if (Object.values(matched).includes(word)) return;
    if (!selectedLeft) {
      setSelectedRight(word);
      return;
    }

    // Check if correct
    const pairIdx = lefts.indexOf(selectedLeft);
    const correctRight = rights[pairIdx];

    if (word === correctRight) {
      const newMatched = { ...matched, [selectedLeft]: word };
      setMatched(newMatched);
      setSelectedLeft(null);
      setSelectedRight(null);

      if (Object.keys(newMatched).length === pairs.length) {
        setCompleted(true);
        onComplete(true);
      }
    } else {
      // Flash wrong
      setFlashing(word);
      setTimeout(() => {
        setFlashing(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  }

  return (
    <div>
      <h2 className="font-display text-[clamp(22px,4vw,28px)] font-bold text-[#14304A] mb-6">
        {exercise.question}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="flex flex-col gap-3">
          {lefts.map((word) => {
            const isMatched = !!matched[word];
            const isSelected = selectedLeft === word;
            return (
              <button
                key={word}
                onClick={() => handleSelectLeft(word)}
                disabled={isMatched || completed}
                aria-pressed={isSelected}
                className={cn(
                  'px-3 py-3.5 rounded-xl border-2 border-b-4 font-black text-base text-center transition-colors overflow-wrap-anywhere',
                  isMatched && 'opacity-40 border-[#3CC48A] bg-[#E1F7EC] text-[#137A4B]',
                  isSelected && !isMatched && 'border-[#5DB8F5] bg-[#EDF6FD] text-[#1273BC]',
                  !isSelected && !isMatched && 'bg-white border-[#DAE5EF] text-[#14304A] hover:bg-[#EDF3F9]'
                )}
              >
                {word}
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3">
          {shuffledRights.map((word) => {
            const isMatched = Object.values(matched).includes(word);
            const isSelected = selectedRight === word;
            const isFlashing = flashing === word;
            return (
              <button
                key={word}
                onClick={() => handleSelectRight(word)}
                disabled={isMatched || completed}
                aria-pressed={isSelected}
                className={cn(
                  'px-3 py-3.5 rounded-xl border-2 border-b-4 font-black text-base text-center transition-colors overflow-wrap-anywhere',
                  isMatched && 'opacity-40 border-[#3CC48A] bg-[#E1F7EC] text-[#137A4B]',
                  isFlashing && 'border-[#EF6B63] bg-[#FDE9E7] text-[#B02F28]',
                  isSelected && !isMatched && !isFlashing && 'border-[#5DB8F5] bg-[#EDF6FD] text-[#1273BC]',
                  !isSelected && !isMatched && !isFlashing && 'bg-white border-[#DAE5EF] text-[#14304A] hover:bg-[#EDF3F9]'
                )}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {completed && (
        <div className="mt-5 text-center font-black text-[#137A4B] text-lg animate-fade-in">
          🎉 Semua pasangan cocok!
        </div>
      )}
    </div>
  );
}

