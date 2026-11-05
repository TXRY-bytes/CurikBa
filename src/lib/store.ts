'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress, Unit } from '@/types';
import { CURRICULUM } from '@/modules/curriculum/data';

const STORAGE_KEY = 'curikba_progress';

export function getInitialProgress(): UserProgress {
  return {
    xp: 0,
    gems: 100,
    hearts: 5,
    streak: 0,
    lastDay: '',
    shield: 0,
    completedLessons: {},
    openedChests: {},
    totalLessons: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    dailyXp: 0,
    dailyLessons: 0,
    dailyCorrect: 0,
    dailyGoal: 50,
    claimedMissions: {},
    sound: true,
    name: 'Pelajar',
  };
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function loadProgress(): UserProgress {
  if (typeof window === 'undefined') return getInitialProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialProgress();
    const parsed = JSON.parse(raw) as UserProgress;
    // Reset daily stats if new day
    const today = getTodayString();
    if (parsed.lastDay !== today) {
      return {
        ...parsed,
        dailyXp: 0,
        dailyLessons: 0,
        dailyCorrect: 0,
        claimedMissions: {},
        lastDay: today,
      };
    }
    return parsed;
  } catch {
    return getInitialProgress();
  }
}

export function saveProgress(p: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // ignore storage errors
  }
}

export function isLessonComplete(id: string, progress: UserProgress): boolean {
  return (progress.completedLessons[id] ?? 0) > 0;
}

export function isLessonUnlocked(id: string, curriculum: Unit[], progress: UserProgress): boolean {
  const allLessons = curriculum.flatMap(u => u.lessons);
  const idx = allLessons.findIndex(l => l.id === id);
  if (idx === 0) return true;
  if (idx < 0) return false;
  const prev = allLessons[idx - 1];
  if (!prev) return true;
  // Chests unlock when previous lesson is complete
  return isLessonComplete(prev.id, progress);
}

export function getCurrentLessonIndex(curriculum: Unit[], progress: UserProgress): number {
  const allLessons = curriculum.flatMap(u => u.lessons);
  for (let i = 0; i < allLessons.length; i++) {
    if (!isLessonComplete(allLessons[i].id, progress)) return i;
  }
  return allLessons.length - 1;
}

export function getLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getXpInLevel(xp: number): number {
  return xp % 100;
}

export function getLevelProgress(xp: number): number {
  return (xp % 100);
}

// Hook
export function useProgress(): [UserProgress, (updater: (p: UserProgress) => UserProgress) => void] {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const updateProgress = useCallback((updater: (p: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const next = updater(prev);
      // Update streak
      const today = getTodayString();
      if (next.lastDay !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yd = yesterday.toISOString().split('T')[0];
        next.streak = prev.lastDay === yd ? prev.streak + 1 : 1;
        next.lastDay = today;
      }
      saveProgress(next);
      return next;
    });
  }, []);

  return [progress, updateProgress];
}

export function completeLesson(
  lessonId: string,
  stars: number,
  xpEarned: number,
  correctCount: number,
  totalCount: number,
  progress: UserProgress
): UserProgress {
  const existing = progress.completedLessons[lessonId] ?? 0;
  return {
    ...progress,
    xp: progress.xp + xpEarned,
    dailyXp: progress.dailyXp + xpEarned,
    dailyLessons: progress.dailyLessons + 1,
    dailyCorrect: progress.dailyCorrect + correctCount,
    totalLessons: progress.totalLessons + 1,
    totalCorrect: progress.totalCorrect + correctCount,
    totalAnswered: progress.totalAnswered + totalCount,
    completedLessons: {
      ...progress.completedLessons,
      [lessonId]: Math.max(existing, stars),
    },
    lastDay: getTodayString(),
  };
}

export function openChest(
  chestId: string,
  gemReward: number,
  progress: UserProgress
): UserProgress {
  if (progress.openedChests[chestId]) return progress;
  return {
    ...progress,
    gems: progress.gems + gemReward,
    openedChests: { ...progress.openedChests, [chestId]: true },
  };
}

export { CURRICULUM };

