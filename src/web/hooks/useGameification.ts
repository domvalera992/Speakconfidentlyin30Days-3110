import { useState, useEffect, createContext, useContext, ReactNode } from "react";

// XP amounts for different actions
const XP_REWARDS = {
  lesson_complete: 25,
  perfect_quiz: 50,
  daily_login: 10,
  streak_7_day: 100,
  record_speaking: 15,
  workbook_exercise: 20,
  module_complete: 200,
};

// Level thresholds
const LEVELS = [
  { name: "Beginner", minXP: 0, maxXP: 500 },
  { name: "Explorer", minXP: 501, maxXP: 1500 },
  { name: "Communicator", minXP: 1501, maxXP: 3000 },
  { name: "Confident Speaker", minXP: 3001, maxXP: 5000 },
  { name: "Bilingual Master", minXP: 5001, maxXP: 999999 },
];

// Badge definitions
const BADGE_DEFINITIONS = {
  first_flame: { name: "First Flame", requirement: "Complete first lesson" },
  week_warrior: { name: "Week Warrior", requirement: "7-day streak" },
  voice_activated: { name: "Voice Activated", requirement: "Record 10 speaking exercises" },
  food_fluent: { name: "Food Fluent", requirement: "Complete Restaurant module" },
  ready_to_travel: { name: "Ready to Travel", requirement: "Complete Travel lessons" },
  confidence_builder: { name: "Confidence Builder", requirement: "Complete Module 3" },
  graduate: { name: "Graduate", requirement: "Finish all modules" },
  perfectionist: { name: "Perfectionist", requirement: "100% on 5 quizzes" },
  bilingual_boss: { name: "Bilingual Boss", requirement: "Reach 5000+ XP" },
};

interface UserProgress {
  totalXP: number;
  todayXP: number;
  streak: number;
  lastLoginDate: string;
  lessonsCompleted: string[];
  quizScores: Record<string, number>;
  speakingRecordings: number;
  workbookExercisesCompleted: number;
  modulesCompleted: string[];
  badges: string[];
  perfectQuizCount: number;
}

interface GameificationContextType {
  progress: UserProgress;
  awardXP: (type: keyof typeof XP_REWARDS, metadata?: Record<string, unknown>) => number;
  getCurrentLevel: () => typeof LEVELS[number];
  getNextLevel: () => typeof LEVELS[number] | null;
  getProgressToNextLevel: () => number;
  checkAndAwardBadges: () => string[];
  recordDailyLogin: () => boolean;
  completeLsson: (lessonId: string) => void;
  recordQuizScore: (quizId: string, score: number) => void;
  recordSpeakingExercise: () => void;
  completeWorkbookExercise: () => void;
  completeModule: (moduleId: string) => void;
}

const STORAGE_KEY = "language_app_progress";

const getStoredProgress = (): UserProgress => {
  if (typeof window === "undefined") return getDefaultProgress();
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Reset today's XP if it's a new day
      const today = new Date().toDateString();
      if (parsed.lastLoginDate !== today) {
        parsed.todayXP = 0;
      }
      return parsed;
    }
  } catch (e) {
    console.error("Error loading progress:", e);
  }
  return getDefaultProgress();
};

const getDefaultProgress = (): UserProgress => ({
  totalXP: 0,
  todayXP: 0,
  streak: 0,
  lastLoginDate: "",
  lessonsCompleted: [],
  quizScores: {},
  speakingRecordings: 0,
  workbookExercisesCompleted: 0,
  modulesCompleted: [],
  badges: [],
  perfectQuizCount: 0,
});

const saveProgress = (progress: UserProgress) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }
};

export function useGameification(): GameificationContextType {
  const [progress, setProgress] = useState<UserProgress>(getDefaultProgress);

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const awardXP = (type: keyof typeof XP_REWARDS, _metadata?: Record<string, unknown>) => {
    const xpAmount = XP_REWARDS[type];
    setProgress((prev) => ({
      ...prev,
      totalXP: prev.totalXP + xpAmount,
      todayXP: prev.todayXP + xpAmount,
    }));
    return xpAmount;
  };

  const getCurrentLevel = () => {
    return LEVELS.find((level) => progress.totalXP >= level.minXP && progress.totalXP <= level.maxXP) || LEVELS[0];
  };

  const getNextLevel = () => {
    const currentIndex = LEVELS.findIndex((level) => progress.totalXP >= level.minXP && progress.totalXP <= level.maxXP);
    return currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;
  };

  const getProgressToNextLevel = () => {
    const current = getCurrentLevel();
    const next = getNextLevel();
    if (!next) return 100;
    const progressInLevel = progress.totalXP - current.minXP;
    const levelRange = next.minXP - current.minXP;
    return Math.min((progressInLevel / levelRange) * 100, 100);
  };

  const checkAndAwardBadges = () => {
    const newBadges: string[] = [];

    // First Flame - Complete first lesson
    if (progress.lessonsCompleted.length >= 1 && !progress.badges.includes("first_flame")) {
      newBadges.push("first_flame");
    }

    // Week Warrior - 7-day streak
    if (progress.streak >= 7 && !progress.badges.includes("week_warrior")) {
      newBadges.push("week_warrior");
    }

    // Voice Activated - 10 speaking recordings
    if (progress.speakingRecordings >= 10 && !progress.badges.includes("voice_activated")) {
      newBadges.push("voice_activated");
    }

    // Perfectionist - 5 perfect quizzes
    if (progress.perfectQuizCount >= 5 && !progress.badges.includes("perfectionist")) {
      newBadges.push("perfectionist");
    }

    // Bilingual Boss - 5000+ XP
    if (progress.totalXP >= 5000 && !progress.badges.includes("bilingual_boss")) {
      newBadges.push("bilingual_boss");
    }

    if (newBadges.length > 0) {
      setProgress((prev) => ({
        ...prev,
        badges: [...prev.badges, ...newBadges],
      }));
    }

    return newBadges;
  };

  const recordDailyLogin = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (progress.lastLoginDate === today) {
      return false; // Already logged in today
    }

    let newStreak = 1;
    if (progress.lastLoginDate === yesterday) {
      newStreak = progress.streak + 1;
    }

    setProgress((prev) => ({
      ...prev,
      lastLoginDate: today,
      streak: newStreak,
      todayXP: prev.lastLoginDate === today ? prev.todayXP : 0,
    }));

    awardXP("daily_login");

    // Check for 7-day streak bonus
    if (newStreak === 7) {
      awardXP("streak_7_day");
    }

    return true;
  };

  const completeLsson = (lessonId: string) => {
    if (!progress.lessonsCompleted.includes(lessonId)) {
      setProgress((prev) => ({
        ...prev,
        lessonsCompleted: [...prev.lessonsCompleted, lessonId],
      }));
      awardXP("lesson_complete");
    }
  };

  const recordQuizScore = (quizId: string, score: number) => {
    setProgress((prev) => {
      const newScores = { ...prev.quizScores, [quizId]: score };
      const newPerfectCount = score === 100 ? prev.perfectQuizCount + 1 : prev.perfectQuizCount;
      return {
        ...prev,
        quizScores: newScores,
        perfectQuizCount: newPerfectCount,
      };
    });

    if (score === 100) {
      awardXP("perfect_quiz");
    }
  };

  const recordSpeakingExercise = () => {
    setProgress((prev) => ({
      ...prev,
      speakingRecordings: prev.speakingRecordings + 1,
    }));
    awardXP("record_speaking");
  };

  const completeWorkbookExercise = () => {
    setProgress((prev) => ({
      ...prev,
      workbookExercisesCompleted: prev.workbookExercisesCompleted + 1,
    }));
    awardXP("workbook_exercise");
  };

  const completeModule = (moduleId: string) => {
    if (!progress.modulesCompleted.includes(moduleId)) {
      setProgress((prev) => ({
        ...prev,
        modulesCompleted: [...prev.modulesCompleted, moduleId],
      }));
      awardXP("module_complete");
    }
  };

  return {
    progress,
    awardXP,
    getCurrentLevel,
    getNextLevel,
    getProgressToNextLevel,
    checkAndAwardBadges,
    recordDailyLogin,
    completeLsson,
    recordQuizScore,
    recordSpeakingExercise,
    completeWorkbookExercise,
    completeModule,
  };
}

// Export constants for use elsewhere
export { XP_REWARDS, LEVELS, BADGE_DEFINITIONS };
