export type ExerciseType = 'multiple-choice' | 'word-bank' | 'matching-pairs' | 'type-answer' | 'aksara-quiz';
export type NodeType = 'lesson' | 'chest' | 'trophy';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  questionBali?: string;    // Balinese script version
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  imageKey?: string;
  wordBank?: string[];      // for word-bank type
  pairs?: [string, string][]; // for matching-pairs
}

export interface Lesson {
  id: string;
  title: string;
  titleBali?: string;
  nodeType: NodeType;
  exercises: Exercise[];
  xpReward: number;
  gemReward?: number;
}

export interface Unit {
  id: string;
  title: string;
  titleBali?: string;
  description: string;
  color: string;
  lessons: Lesson[];
  part: number;
  no: number;
}

export interface UserProgress {
  xp: number;
  gems: number;
  hearts: number;
  streak: number;
  lastDay: string;
  shield: number;
  completedLessons: Record<string, number>; // lessonId -> stars (1-3)
  openedChests: Record<string, boolean>;
  totalLessons: number;
  totalCorrect: number;
  totalAnswered: number;
  dailyXp: number;
  dailyLessons: number;
  dailyCorrect: number;
  dailyGoal: number;
  claimedMissions: Record<string, boolean>;
  sound: boolean;
  name: string;
}

