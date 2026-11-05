'use client';

import { UserProgress, Lesson, Unit } from '@/types';
import { CURRICULUM } from '@/modules/curriculum/data';
import { isLessonComplete, isLessonUnlocked, getCurrentLessonIndex } from '@/lib/store';
import Mascot from '@/components/ui/Mascot';
import { cn } from '@/lib/utils';

interface LearningPathProps {
  progress: UserProgress;
  onStartLesson: (lesson: Lesson) => void;
  onOpenAiTutor: () => void;
}

function NodeIcon({ type, done, locked }: { type: string; done: boolean; locked: boolean }) {
  if (type === 'chest') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6H4c-1.1 0-2 .9-2 2v3h2V8h16v3h2V8c0-1.1-.9-2-2-2zM2 19c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-7H2v7zm8-5h4v2h-4v-2z" />
      </svg>
    );
  }
  if (type === 'trophy') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM7 10.82C5.84 10.4 5 9.3 5 8V7h2v3.82zM19 8c0 1.3-.84 2.4-2 2.82V7h2v1z" />
      </svg>
    );
  }
  if (done) {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    );
  }
  if (locked) {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
    );
  }
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
  );
}

function LessonNode({
  lesson,
  done,
  locked,
  isCurrent,
  offset,
  showMascot,
  mascotSide,
  onClick,
  isChestOpened,
}: {
  lesson: Lesson;
  done: boolean;
  locked: boolean;
  isCurrent: boolean;
  offset: number;
  showMascot: boolean;
  mascotSide: 'left' | 'right';
  onClick: () => void;
  isChestOpened: boolean;
}) {
  const isChest = lesson.nodeType === 'chest';
  const isTrophy = lesson.nodeType === 'trophy';
  const stars = 0; // placeholder

  let btnBg = '#5DB8F5';
  let btnShadow = '#2E8FD6';
  let btnColor = '#08263F';

  if (done) {
    btnBg = '#2E8FD6';
    btnShadow = '#1F6CAA';
    btnColor = '#fff';
  } else if (locked) {
    btnBg = '#EDF3F9';
    btnShadow = '#C2D3E3';
    btnColor = '#8AA0B4';
  } else if (isChest) {
    btnBg = isChestOpened ? '#EDF3F9' : '#F59A3D';
    btnShadow = isChestOpened ? '#C2D3E3' : '#D4832A';
    btnColor = isChestOpened ? '#8AA0B4' : '#fff';
  } else if (isTrophy) {
    btnBg = done ? '#9B59B6' : (locked ? '#EDF3F9' : '#E8D5F5');
    btnShadow = done ? '#7D3C98' : (locked ? '#C2D3E3' : '#C9A8E8');
    btnColor = done ? '#fff' : (locked ? '#8AA0B4' : '#5B2C6F');
  }

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {/* Mascot */}
      {showMascot && !locked && (
        <div
          className={cn(
            'absolute top-[-14px] w-[92px] pointer-events-none animate-bob',
            mascotSide === 'right' ? 'left-[calc(100%+34px)]' : 'right-[calc(100%+34px)]'
          )}
        >
          <Mascot mood="happy" size={72} />
          {/* Bubble */}
          <div className="absolute left-1/2 bottom-[calc(100%+12px)] -translate-x-1/2 bg-white border-2 border-[#DAE5EF] rounded-xl px-3 py-1.5 font-black text-sm text-[#1273BC] whitespace-nowrap animate-bobx">
            Lanjutkan!
            <div className="absolute left-1/2 top-full w-3 h-3 bg-white border-2 border-[#DAE5EF] border-t-0 border-l-0 -translate-x-1/2 -translate-y-1.5 rotate-45" />
          </div>
        </div>
      )}

      {/* Node button */}
      <button
        onClick={onClick}
        disabled={locked}
        className={cn(
          'relative grid place-items-center w-[76px] h-[68px] rounded-full border-0 transition-transform duration-75',
          'active:translate-y-1.5',
          isCurrent && 'before:absolute before:inset-[-9px] before:rounded-full before:border-[5px] before:border-[#DDEFFC] before:pointer-events-none'
        )}
        style={{
          background: btnBg,
          color: btnColor,
          boxShadow: locked ? `0 6px 0 ${btnShadow}` : `0 6px 0 ${btnShadow}`,
        }}
        aria-label={lesson.title}
      >
        <NodeIcon type={lesson.nodeType} done={done} locked={locked} />
      </button>

      {/* Label */}
      <div
        className={cn(
          'mt-2 text-xs font-black text-center max-w-[90px] leading-tight',
          locked ? 'text-[#8AA0B4]' : 'text-[#56708A]'
        )}
      >
        {lesson.title}
      </div>
    </div>
  );
}

export default function LearningPath({ progress, onStartLesson, onOpenAiTutor }: LearningPathProps) {
  const allLessons = CURRICULUM.flatMap(u => u.lessons);
  const currentIdx = getCurrentLessonIndex(CURRICULUM, progress);

  // Build zigzag offsets
  const zigzagOffsets = [0, 70, 110, 70, 0, -70, -110, -70];

  let lessonGlobalIdx = 0;

  return (
    <div className="pt-4 pb-10">
      {CURRICULUM.map((unit, unitIdx) => {
        const isFirstUnit = unitIdx === 0;

        return (
          <div key={unit.id}>
            {/* Unit separator for non-first units */}
            {!isFirstUnit && (
              <div className="flex items-center gap-3.5 my-7 text-[#56708A] font-black text-xs tracking-widest uppercase">
                <div className="flex-1 h-0.5 bg-[#DAE5EF] rounded" />
                <span className="text-center">Bagian {unit.part} · {unit.title}</span>
                <div className="flex-1 h-0.5 bg-[#DAE5EF] rounded" />
              </div>
            )}

            {/* Unit banner */}
            <div
              className="sticky z-10 mt-1 rounded-2xl px-5 py-4 flex items-center justify-between gap-3 shadow-[0_4px_0_var(--sky-edge)] mb-0"
              style={{ top: '0', background: unit.color, boxShadow: `0 4px 0 ${unit.color}bb` }}
            >
              <div>
                <div className="flex items-center gap-1.5 font-black text-xs tracking-widest uppercase opacity-80 text-[#08263F] mb-1">
                  <span>BAGIAN {unit.part} · UNIT {unit.no}</span>
                </div>
                <h2 className="font-display font-bold text-xl text-[#08263F]">{unit.title}</h2>
                {unit.titleBali && (
                  <p className="text-sm opacity-70 text-[#08263F] mt-0.5">{unit.description}</p>
                )}
              </div>
              <button
                onClick={onOpenAiTutor}
                className="flex-none flex items-center gap-1.5 bg-white/30 text-[#08263F] border-2 border-[#08263F]/25 shadow-[0_4px_0_rgba(8,38,63,.2)] rounded-xl px-3.5 py-2.5 font-black text-xs tracking-widest uppercase hover:bg-white/40 transition-colors active:translate-y-1 active:shadow-none"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
                <span>Guru Wayan</span>
              </button>
            </div>

            {/* Lesson path */}
            <div className="flex flex-col items-center gap-6 pt-20 pb-8">
              {unit.lessons.map((lesson, lessonIdx) => {
                const globalIdx = lessonGlobalIdx++;
                const done = isLessonComplete(lesson.id, progress);
                const unlocked = isLessonUnlocked(lesson.id, CURRICULUM, progress);
                const locked = !unlocked;
                const isCurrent = globalIdx === currentIdx;
                const offset = zigzagOffsets[globalIdx % zigzagOffsets.length];
                const mascotSide: 'left' | 'right' = offset >= 0 ? 'right' : 'left';

                return (
                  <LessonNode
                    key={lesson.id}
                    lesson={lesson}
                    done={done}
                    locked={locked}
                    isCurrent={isCurrent}
                    offset={offset}
                    showMascot={isCurrent}
                    mascotSide={mascotSide}
                    onClick={() => onStartLesson(lesson)}
                    isChestOpened={!!progress.openedChests[lesson.id]}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      {/* AI Tutor CTA */}
      <div className="mt-6 mx-4">
        <button
          onClick={onOpenAiTutor}
          className="w-full bg-white border-2 border-[#DAE5EF] rounded-2xl p-5 flex items-center gap-4 hover:bg-[#EDF6FD] hover:border-[#5DB8F5] transition-colors group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#EDF6FD] group-hover:bg-[#DDEFFC] flex items-center justify-center text-2xl transition-colors">
            🧑‍🏫
          </div>
          <div className="text-left">
            <div className="font-black text-[#14304A]">Tanya Guru Wayan</div>
            <div className="text-sm text-[#56708A] font-bold">AI tutor Bahasa Bali siap membantu</div>
          </div>
          <svg className="ml-auto text-[#8AA0B4]" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

