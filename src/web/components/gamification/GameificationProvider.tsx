import { createContext, useContext, useEffect, ReactNode } from "react";
import { useGameification, XP_REWARDS, LEVELS, BADGE_DEFINITIONS } from "../../hooks/useGameification";
import { useToast } from "../notifications/ToastNotification";

interface GameificationContextType {
  progress: ReturnType<typeof useGameification>["progress"];
  awardXP: (type: keyof typeof XP_REWARDS) => void;
  getCurrentLevel: () => typeof LEVELS[number];
  getNextLevel: () => typeof LEVELS[number] | null;
  getProgressToNextLevel: () => number;
  completeLsson: (lessonId: string) => void;
  recordQuizScore: (quizId: string, score: number) => void;
  recordSpeakingExercise: () => void;
  completeWorkbookExercise: () => void;
  completeModule: (moduleId: string) => void;
}

const GameificationContext = createContext<GameificationContextType | null>(null);

export const useGameificationContext = () => {
  const context = useContext(GameificationContext);
  if (!context) {
    throw new Error("useGameificationContext must be used within a GameificationProvider");
  }
  return context;
};

interface GameificationProviderProps {
  children: ReactNode;
}

export function GameificationProvider({ children }: GameificationProviderProps) {
  const gameification = useGameification();
  const { showToast } = useToast();

  // Record daily login on mount
  useEffect(() => {
    const isNewLogin = gameification.recordDailyLogin();
    if (isNewLogin) {
      showToast({
        type: "xp",
        title: "Welcome back! 👋",
        message: `Day ${gameification.progress.streak} of your streak`,
        xpAmount: XP_REWARDS.daily_login,
      });

      // Check for streak milestone
      if (gameification.progress.streak === 7) {
        setTimeout(() => {
          showToast({
            type: "streak",
            title: "🔥 Week Warrior!",
            message: "7-day streak achieved!",
            xpAmount: XP_REWARDS.streak_7_day,
          });
        }, 1500);
      }
    }

    // Check for new badges
    const newBadges = gameification.checkAndAwardBadges();
    newBadges.forEach((badgeId, index) => {
      const badge = BADGE_DEFINITIONS[badgeId as keyof typeof BADGE_DEFINITIONS];
      setTimeout(() => {
        showToast({
          type: "badge",
          title: "Badge Unlocked! 🏅",
          message: badge.name,
        });
      }, 2000 + index * 1000);
    });
  }, []);

  const awardXP = (type: keyof typeof XP_REWARDS) => {
    const xpAmount = gameification.awardXP(type);
    
    // Show XP notification
    showToast({
      type: "xp",
      title: "XP Earned!",
      xpAmount,
    });

    // Check for level up
    const currentLevel = gameification.getCurrentLevel();
    const nextLevel = gameification.getNextLevel();
    if (nextLevel && gameification.progress.totalXP >= nextLevel.minXP) {
      setTimeout(() => {
        showToast({
          type: "level_up",
          title: "LEVEL UP! 🎉",
          message: `You reached ${nextLevel.name}!`,
        });
      }, 500);
    }

    // Check for new badges
    const newBadges = gameification.checkAndAwardBadges();
    newBadges.forEach((badgeId, index) => {
      const badge = BADGE_DEFINITIONS[badgeId as keyof typeof BADGE_DEFINITIONS];
      setTimeout(() => {
        showToast({
          type: "badge",
          title: "Badge Unlocked! 🏅",
          message: badge.name,
        });
      }, 1000 + index * 1000);
    });
  };

  const completeLsson = (lessonId: string) => {
    gameification.completeLsson(lessonId);
    showToast({
      type: "xp",
      title: "Lesson Complete! 📚",
      message: "Great job!",
      xpAmount: XP_REWARDS.lesson_complete,
    });
  };

  const recordQuizScore = (quizId: string, score: number) => {
    gameification.recordQuizScore(quizId, score);
    if (score === 100) {
      showToast({
        type: "perfect_quiz",
        title: "Perfect Score! 💯",
        message: "Flawless performance!",
        xpAmount: XP_REWARDS.perfect_quiz,
      });
    }
  };

  const recordSpeakingExercise = () => {
    gameification.recordSpeakingExercise();
    showToast({
      type: "xp",
      title: "Speaking Practice! 🎤",
      xpAmount: XP_REWARDS.record_speaking,
    });
  };

  const completeWorkbookExercise = () => {
    gameification.completeWorkbookExercise();
    showToast({
      type: "xp",
      title: "Exercise Complete! 📝",
      xpAmount: XP_REWARDS.workbook_exercise,
    });
  };

  const completeModule = (moduleId: string) => {
    gameification.completeModule(moduleId);
    showToast({
      type: "level_up",
      title: "Module Complete! 🎓",
      message: "Amazing progress!",
      xpAmount: XP_REWARDS.module_complete,
    });
  };

  const value: GameificationContextType = {
    progress: gameification.progress,
    awardXP,
    getCurrentLevel: gameification.getCurrentLevel,
    getNextLevel: gameification.getNextLevel,
    getProgressToNextLevel: gameification.getProgressToNextLevel,
    completeLsson,
    recordQuizScore,
    recordSpeakingExercise,
    completeWorkbookExercise,
    completeModule,
  };

  return (
    <GameificationContext.Provider value={value}>
      {children}
    </GameificationContext.Provider>
  );
}
