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
  const initial = getInitialProgress();
  if (typeof window === 'undefined') return initial;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return initial;

    const merged: UserProgress = {
      ...initial,
      ...parsed,
      completedLessons: parsed.completedLessons || {},
      openedChests: parsed.openedChests || {},
      claimedMissions: parsed.claimedMissions || {},
    };

    // Reset daily stats if new day
    const today = getTodayString();
    if (merged.lastDay !== today) {
      merged.dailyXp = 0;
      merged.dailyLessons = 0;
      merged.dailyCorrect = 0;
      merged.claimedMissions = {};
      merged.lastDay = today;
    }
    return merged;
  } catch (err) {
    console.error('Error loading progress:', err);
    return initial;
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
  if (!progress) return false;
  if (progress.openedChests && progress.openedChests[id]) return true;
  if (progress.completedLessons && (progress.completedLessons[id] ?? 0) > 0) return true;
  return false;
}

export function isLessonUnlocked(id: string, curriculum: Unit[], progress: UserProgress): boolean {
  if (!progress) return false;
  const allLessons = curriculum.flatMap(u => u.lessons);
  const idx = allLessons.findIndex(l => l.id === id);
  if (idx <= 0) return true; // First lesson is always unlocked
  const prev = allLessons[idx - 1];
  if (!prev) return true;
  return isLessonComplete(prev.id, progress);
}

export function getCurrentLessonIndex(curriculum: Unit[], progress: UserProgress): number {
  if (!progress) return 0;
  const allLessons = curriculum.flatMap(u => u.lessons);
  for (let i = 0; i < allLessons.length; i++) {
    if (!isLessonComplete(allLessons[i].id, progress)) return i;
  }
  return Math.max(0, allLessons.length - 1);
}

export function getLevel(xp: number): number {
  return Math.floor((xp || 0) / 100) + 1;
}

export function getXpInLevel(xp: number): number {
  return (xp || 0) % 100;
}

export function getLevelProgress(xp: number): number {
  return (xp || 0) % 100;
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
        next.streak = prev.lastDay === yd ? (prev.streak || 0) + 1 : 1;
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
  const completedLessons = { ...(progress?.completedLessons || {}) };
  const existing = completedLessons[lessonId] ?? 0;
  completedLessons[lessonId] = Math.max(existing, stars);

  return {
    ...progress,
    xp: (progress?.xp || 0) + xpEarned,
    dailyXp: (progress?.dailyXp || 0) + xpEarned,
    dailyLessons: (progress?.dailyLessons || 0) + 1,
    dailyCorrect: (progress?.dailyCorrect || 0) + correctCount,
    totalLessons: (progress?.totalLessons || 0) + 1,
    totalCorrect: (progress?.totalCorrect || 0) + correctCount,
    totalAnswered: (progress?.totalAnswered || 0) + totalCount,
    completedLessons,
    lastDay: getTodayString(),
  };
}

export function openChest(
  chestId: string,
  gemReward: number,
  progress: UserProgress
): UserProgress {
  const openedChests = { ...(progress?.openedChests || {}) };
  if (openedChests[chestId]) return progress;
  openedChests[chestId] = true;

  const completedLessons = { ...(progress?.completedLessons || {}) };
  completedLessons[chestId] = 1;

  return {
    ...progress,
    gems: (progress?.gems || 0) + gemReward,
    openedChests,
    completedLessons,
  };
}

export { CURRICULUM };
