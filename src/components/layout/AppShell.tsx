'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ProgressRail from './ProgressRail';
import LearningPath from '@/modules/lessons/LearningPath';
import ExerciseEngine from '@/modules/lessons/ExerciseEngine';
import AksaraChart from '@/modules/aksara/AksaraChart';
import MissionView from '@/modules/lessons/MissionView';
import LeaderboardView from '@/modules/lessons/LeaderboardView';
import ProfileView from '@/modules/lessons/ProfileView';
import AiTutor from '@/modules/ai-tutor/AiTutor';
import { useProgress, completeLesson, openChest, isLessonUnlocked } from '@/lib/store';
import { CURRICULUM } from '@/modules/curriculum/data';
import { Lesson } from '@/types';

type View = 'belajar' | 'aksara' | 'misi' | 'papan-skor' | 'profil' | 'ai-tutor';

export default function AppShell() {
  const [activeView, setActiveView] = useState<View>('belajar');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [progress, updateProgress] = useProgress();

  function handleStartLesson(lesson: Lesson) {
    if (lesson.nodeType === 'chest') {
      if (!progress.openedChests[lesson.id]) {
        updateProgress(p => openChest(lesson.id, lesson.gemReward ?? 0, p));
      }
      return;
    }
    if (lesson.exercises.length === 0) return;
    setActiveLesson(lesson);
  }

  function handleLessonComplete(lessonId: string, stars: number, xpEarned: number, correct: number, total: number) {
    updateProgress(p => completeLesson(lessonId, stars, xpEarned, correct, total, p));
    setActiveLesson(null);
  }

  function handleLessonExit() {
    setActiveLesson(null);
  }

  function handleNavigate(view: string) {
    setActiveView(view as View);
    setActiveLesson(null);
  }

  const showRail = activeView === 'belajar' || activeView === 'aksara';

  return (
    <div className="min-h-dvh bg-[#F6F9FC]">
      {/* Exercise overlay — full screen */}
      {activeLesson && (
        <ExerciseEngine
          lesson={activeLesson}
          onComplete={handleLessonComplete}
          onExit={handleLessonExit}
        />
      )}

      {/* Top/Bottom bars for mobile/tablet */}
      <TopBar activeView={activeView} onNavigate={handleNavigate} progress={progress} />

      {/* 3-column layout */}
      <div
        className="max-w-[1280px] mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: showRail
            ? 'clamp(0px, 248px, 248px) minmax(0, 1fr) clamp(0px, 360px, 360px)'
            : 'clamp(0px, 248px, 248px) minmax(0, 1fr)',
        }}
      >
        {/* Left sidebar — hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar activeView={activeView} onNavigate={handleNavigate} progress={progress} />
        </div>

        {/* Main content */}
        <main className="min-w-0 px-0 md:px-6 pb-24 md:pb-12">
          <div className="max-w-[640px] mx-auto">
            {activeView === 'belajar' && (
              <LearningPath
                progress={progress}
                onStartLesson={handleStartLesson}
                onOpenAiTutor={() => setActiveView('ai-tutor')}
              />
            )}
            {activeView === 'aksara' && <AksaraChart />}
            {activeView === 'misi' && <MissionView progress={progress} onUpdateProgress={updateProgress} />}
            {activeView === 'papan-skor' && <LeaderboardView progress={progress} />}
            {activeView === 'profil' && <ProfileView progress={progress} onUpdateProgress={updateProgress} />}
            {activeView === 'ai-tutor' && <AiTutor onBack={() => setActiveView('belajar')} />}
          </div>
        </main>

        {/* Right rail — hidden on tablet and below */}
        {showRail && (
          <div className="hidden xl:block">
            <ProgressRail progress={progress} />
          </div>
        )}
      </div>
    </div>
  );
}

