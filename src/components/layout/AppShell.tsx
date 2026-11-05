'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
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
import ChestModal from '@/components/ui/ChestModal';
import { useProgress, completeLesson, openChest } from '@/lib/store';
import { Lesson } from '@/types';

type View = 'belajar' | 'aksara' | 'misi' | 'papan-skor' | 'profil' | 'ai-tutor';

export default function AppShell() {
  const [activeView, setActiveView] = useState<View>('belajar');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [chestModalData, setChestModalData] = useState<{ lesson: Lesson; isAlreadyOpened: boolean } | null>(null);
  const [progress, updateProgress] = useProgress();

  function handleStartLesson(lesson: Lesson) {
    if (lesson.nodeType === 'chest') {
      const isAlreadyOpened = Boolean(progress?.openedChests?.[lesson.id]);
      setChestModalData({ lesson, isAlreadyOpened });
      return;
    }
    if (lesson.exercises.length === 0) return;
    setActiveLesson(lesson);
  }

  function handleClaimChest() {
    if (!chestModalData) return;
    const { lesson } = chestModalData;
    updateProgress(p => openChest(lesson.id, lesson.gemReward ?? 50, p));
    setChestModalData(null);
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
    <div className="min-h-screen bg-[#F6F9FC]">
      {/* Exercise overlay — full screen modal with highest z-index */}
      {activeLesson && (
        <div className="fixed inset-0 z-[200]">
          <ExerciseEngine
            lesson={activeLesson}
            onComplete={handleLessonComplete}
            onExit={handleLessonExit}
          />
        </div>
      )}

      {/* Chest Reward Modal */}
      {chestModalData && (
        <div className="fixed inset-0 z-[200]">
          <ChestModal
            isOpen={true}
            isAlreadyOpened={chestModalData.isAlreadyOpened}
            gemReward={chestModalData.lesson.gemReward ?? 50}
            onClaim={handleClaimChest}
            onClose={() => setChestModalData(null)}
          />
        </div>
      )}

      {/* Top bar for mobile/tablet */}
      <TopBar activeView={activeView} onNavigate={handleNavigate} progress={progress} />

      {/* App Layout: Left Sidebar + Main Content + Right ProgressRail */}
      <div className="max-w-[1280px] mx-auto flex flex-row">
        {/* Left sidebar — visible on tablet & desktop (md+) */}
        <div className="hidden md:flex flex-col w-[248px] flex-shrink-0">
          <Sidebar activeView={activeView} onNavigate={handleNavigate} progress={progress} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 md:px-6 pb-24 md:pb-12 pt-16 md:pt-4">
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

        {/* Right rail — visible on wide desktop (xl+) */}
        {showRail && (
          <div className="hidden xl:flex flex-col w-[360px] flex-shrink-0">
            <ProgressRail progress={progress} />
          </div>
        )}
      </div>
    </div>
  );
}
