'use client';

import { useState, useCallback } from 'react';
import { Lesson, Exercise } from '@/types';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';
import MultipleChoice from './exercises/MultipleChoice';
import WordBank from './exercises/WordBank';
import MatchingPairs from './exercises/MatchingPairs';
import TypeAnswer from './exercises/TypeAnswer';
import AksaraQuiz from './exercises/AksaraQuiz';
import CompletionScreen from './CompletionScreen';
import { cn } from '@/lib/utils';

interface ExerciseEngineProps {
  lesson: Lesson;
  onComplete: (lessonId: string, stars: number, xpEarned: number, correct: number, total: number) => void;
  onExit: () => void;
}

type FeedbackState = 'none' | 'correct' | 'wrong';

export default function ExerciseEngine({ lesson, onComplete, onExit }: ExerciseEngineProps) {
  const exercises = lesson.exercises;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState>('none');
  const [selected, setSelected] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [matchingComplete, setMatchingComplete] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentExercise = exercises[currentIdx];
  const progress = exercises.length > 0 ? ((currentIdx) / exercises.length) * 100 : 0;
  const isMatchingPairs = currentExercise?.type === 'matching-pairs';

  function getCurrentAnswer(): string {
    if (currentExercise.type === 'word-bank') return typedAnswer;
    if (currentExercise.type === 'type-answer') return typedAnswer;
    return selected ?? '';
  }

  function checkAnswer(): boolean {
    const answer = getCurrentAnswer().trim();
    const correct = currentExercise.correctAnswer.trim();
    if (isMatchingPairs) return matchingComplete;
    return answer.toLowerCase() === correct.toLowerCase();
  }

  function handleCheck() {
    if (feedback !== 'none') return;
    if (isMatchingPairs) {
      if (!matchingComplete) return;
      setFeedback('correct');
      setCorrectCount(c => c + 1);
      return;
    }

    const answer = getCurrentAnswer();
    if (!answer) return;

    const correct = checkAnswer();
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setCorrectCount(c => c + 1);
  }

  function handleNext() {
    const nextIdx = currentIdx + 1;
    if (nextIdx >= exercises.length) {
      setDone(true);
    } else {
      setCurrentIdx(nextIdx);
      setFeedback('none');
      setSelected(null);
      setTypedAnswer('');
      setMatchingComplete(false);
    }
  }

  function handleMatchingComplete(correct: boolean) {
    setMatchingComplete(true);
  }

  const stars = correctCount >= exercises.length
    ? 3
    : correctCount >= Math.ceil(exercises.length * 0.7)
    ? 2
    : 1;

  const xpEarned = lesson.xpReward;

  if (done) {
    return (
      <div className="fixed inset-0 z-50 bg-[#F6F9FC] flex flex-col overflow-auto">
        <div className="max-w-[640px] w-full mx-auto flex-1 flex flex-col justify-center">
          <CompletionScreen
            xpEarned={xpEarned}
            stars={stars}
            correct={correctCount}
            total={exercises.length}
            lessonTitle={lesson.title}
            onContinue={() => onComplete(lesson.id, stars, xpEarned, correctCount, exercises.length)}
          />
        </div>
      </div>
    );
  }

  if (!currentExercise) return null;

  const canCheck = isMatchingPairs
    ? matchingComplete && feedback === 'none'
    : feedback === 'none' && (selected !== null || typedAnswer.trim() !== '');

  const footerBg =
    feedback === 'correct' ? 'bg-[#E1F7EC] border-transparent' :
    feedback === 'wrong' ? 'bg-[#FDE9E7] border-transparent' :
    'bg-[#F6F9FC] border-[#DAE5EF]';

  return (
    <div className="fixed inset-0 z-50 bg-[#F6F9FC] flex flex-col" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      {/* Header */}
      <div className="flex items-center gap-4 w-full max-w-[1000px] mx-auto px-4 py-5">
        <button
          onClick={() => setShowConfirm(true)}
          className="text-[#8AA0B4] hover:text-[#56708A] transition-colors p-1"
          aria-label="Keluar pelajaran"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        <ProgressBar value={progress + (100 / exercises.length)} className="flex-1" />
        <div className="flex items-center gap-1.5 text-[#F0576A] font-black text-sm tabular-nums">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>5</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto px-4 pb-6">
        <div className="max-w-[640px] mx-auto">
          {/* Exercise type label */}
          <div className="mb-5 inline-flex items-center gap-2 font-black text-xs tracking-widest uppercase text-[#1273BC]">
            <div className="w-6 h-6 rounded-full bg-[#DDEFFC] grid place-items-center text-[#1273BC]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            {currentExercise.type === 'multiple-choice' && 'Pilih Jawaban'}
            {currentExercise.type === 'word-bank' && 'Susun Kata'}
            {currentExercise.type === 'matching-pairs' && 'Cocokkan Pasangan'}
            {currentExercise.type === 'type-answer' && 'Tulis Jawaban'}
            {currentExercise.type === 'aksara-quiz' && 'Aksara Bali'}
          </div>

          {/* Exercise renderer */}
          {(currentExercise.type === 'multiple-choice') && (
            <MultipleChoice
              exercise={currentExercise}
              selected={selected}
              onSelect={setSelected}
              showResult={feedback !== 'none'}
            />
          )}

          {currentExercise.type === 'aksara-quiz' && (
            <AksaraQuiz
              exercise={currentExercise}
              selected={selected}
              onSelect={setSelected}
              showResult={feedback !== 'none'}
            />
          )}

          {currentExercise.type === 'word-bank' && (
            <WordBank
              exercise={currentExercise}
              onAnswerChange={setTypedAnswer}
              showResult={feedback !== 'none'}
              isCorrect={feedback === 'correct'}
            />
          )}

          {currentExercise.type === 'matching-pairs' && (
            <MatchingPairs
              exercise={currentExercise}
              onComplete={handleMatchingComplete}
              showResult={feedback !== 'none'}
            />
          )}

          {currentExercise.type === 'type-answer' && (
            <TypeAnswer
              exercise={currentExercise}
              onAnswerChange={setTypedAnswer}
              showResult={feedback !== 'none'}
              isCorrect={feedback === 'correct'}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className={cn(
          'border-t-2 px-4 transition-colors',
          footerBg
        )}
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4 min-h-[72px] py-4">
          {/* Feedback */}
          {feedback !== 'none' ? (
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
              <div
                className={cn(
                  'flex-none w-13 h-13 rounded-full grid place-items-center bg-white w-[52px] h-[52px]',
                )}
              >
                {feedback === 'correct' ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#23995F">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#C74B44">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                )}
              </div>
              <div className="min-w-0">
                <h3
                  className={cn(
                    'font-display font-bold text-xl',
                    feedback === 'correct' ? 'text-[#137A4B]' : 'text-[#B02F28]'
                  )}
                >
                  {feedback === 'correct' ? 'Benar!' : 'Salah'}
                </h3>
                {currentExercise.explanation && (
                  <p className={cn(
                    'text-sm font-bold mt-0.5 overflow-wrap-anywhere',
                    feedback === 'correct' ? 'text-[#137A4B]' : 'text-[#B02F28]'
                  )}>
                    {currentExercise.explanation}
                  </p>
                )}
                {feedback === 'wrong' && currentExercise.correctAnswer !== 'matched' && (
                  <p className="text-sm font-bold text-[#B02F28] mt-0.5">
                    Jawaban: <strong>{currentExercise.correctAnswer}</strong>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* Action button */}
          {feedback === 'none' ? (
            <Button
              onClick={handleCheck}
              disabled={!canCheck}
              size="md"
              className="min-w-[130px]"
              style={canCheck ? { background: '#5DB8F5', color: '#08263F', boxShadow: '0 4px 0 #2E8FD6' } : {}}
            >
              Periksa
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              size="md"
              className="min-w-[130px]"
              style={
                feedback === 'correct'
                  ? { background: '#3CC48A', color: '#08263F', boxShadow: '0 4px 0 #23995F' }
                  : { background: '#EF6B63', color: '#2A0A0A', boxShadow: '0 4px 0 #C74B44' }
              }
            >
              Lanjut
            </Button>
          )}
        </div>
      </div>

      {/* Exit confirm modal */}
      {showConfirm && (
        <div className="absolute inset-0 bg-[rgba(8,24,40,.5)] grid place-items-center p-4 z-10">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
            <h2 className="font-display font-bold text-2xl text-[#14304A]">Keluar pelajaran?</h2>
            <p className="text-[#56708A] font-bold">Progres kamu di pelajaran ini tidak akan tersimpan.</p>
            <Button variant="bad" block onClick={onExit}>Keluar</Button>
            <Button variant="soft" block onClick={() => setShowConfirm(false)}>Lanjutkan Belajar</Button>
          </div>
        </div>
      )}
    </div>
  );
}

