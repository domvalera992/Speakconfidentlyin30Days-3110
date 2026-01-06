import { useState, useEffect } from "react";

interface WeeklyStats {
  totalXP: number;
  previousWeekXP: number;
  lessonsCompleted: number;
  previousLessons: number;
  quizAverage: number;
  previousQuizAverage: number;
  speakingExercises: number;
  previousSpeaking: number;
  workbookCompletion: number;
  previousWorkbook: number;
  currentStreak: number;
  badgesEarned: string[];
  timeSpent: number; // minutes
  previousTimeSpent: number;
}

const MOCK_WEEKLY_STATS: WeeklyStats = {
  totalXP: 485,
  previousWeekXP: 320,
  lessonsCompleted: 7,
  previousLessons: 5,
  quizAverage: 92,
  previousQuizAverage: 85,
  speakingExercises: 12,
  previousSpeaking: 8,
  workbookCompletion: 68,
  previousWorkbook: 52,
  currentStreak: 7,
  badgesEarned: ["Week Warrior", "Voice Activated"],
  timeSpent: 145,
  previousTimeSpent: 98,
};

interface WeeklySummaryProps {
  isOpen: boolean;
  onClose: () => void;
}

const getTrendIcon = (current: number, previous: number) => {
  if (current > previous) return { icon: "↑", color: "text-emerald-400" };
  if (current < previous) return { icon: "↓", color: "text-rose-400" };
  return { icon: "→", color: "text-white/50" };
};

const getPercentChange = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? "+100%" : "0%";
  const change = ((current - previous) / previous) * 100;
  return change > 0 ? `+${Math.round(change)}%` : `${Math.round(change)}%`;
};

export default function WeeklySummary({ isOpen, onClose }: WeeklySummaryProps) {
  const [mounted, setMounted] = useState(false);
  const stats = MOCK_WEEKLY_STATS;

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        className={`bg-[#0a0a0f] rounded-3xl max-w-md w-full border border-white/10 overflow-hidden transition-all duration-500 ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center">
            <span className="text-5xl mb-3 block">📊</span>
            <h2 className="text-2xl font-black text-white">Weekly Summary</h2>
            <p className="text-white/60 text-sm mt-1">Dec 3 - Dec 9, 2024</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6 space-y-4">
          {/* XP Earned */}
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-4 border border-amber-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-300/70 text-xs uppercase tracking-wider">XP Earned</p>
                <p className="text-3xl font-black text-amber-300 mt-1">+{stats.totalXP}</p>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${getTrendIcon(stats.totalXP, stats.previousWeekXP).color}`}>
                  {getTrendIcon(stats.totalXP, stats.previousWeekXP).icon} {getPercentChange(stats.totalXP, stats.previousWeekXP)}
                </span>
                <p className="text-white/40 text-xs">vs last week</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Lessons */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📚</span>
                <span className="text-white/50 text-xs">Lessons</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.lessonsCompleted}</p>
              <p className={`text-xs ${getTrendIcon(stats.lessonsCompleted, stats.previousLessons).color}`}>
                {getTrendIcon(stats.lessonsCompleted, stats.previousLessons).icon} {getPercentChange(stats.lessonsCompleted, stats.previousLessons)}
              </p>
            </div>

            {/* Quiz Average */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎯</span>
                <span className="text-white/50 text-xs">Quiz Avg</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.quizAverage}%</p>
              <p className={`text-xs ${getTrendIcon(stats.quizAverage, stats.previousQuizAverage).color}`}>
                {getTrendIcon(stats.quizAverage, stats.previousQuizAverage).icon} {getPercentChange(stats.quizAverage, stats.previousQuizAverage)}
              </p>
            </div>

            {/* Speaking */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎤</span>
                <span className="text-white/50 text-xs">Speaking</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.speakingExercises}</p>
              <p className={`text-xs ${getTrendIcon(stats.speakingExercises, stats.previousSpeaking).color}`}>
                {getTrendIcon(stats.speakingExercises, stats.previousSpeaking).icon} {getPercentChange(stats.speakingExercises, stats.previousSpeaking)}
              </p>
            </div>

            {/* Workbook */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📝</span>
                <span className="text-white/50 text-xs">Workbook</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.workbookCompletion}%</p>
              <p className={`text-xs ${getTrendIcon(stats.workbookCompletion, stats.previousWorkbook).color}`}>
                {getTrendIcon(stats.workbookCompletion, stats.previousWorkbook).icon} {getPercentChange(stats.workbookCompletion, stats.previousWorkbook)}
              </p>
            </div>
          </div>

          {/* Time Spent & Streak */}
          <div className="flex gap-3">
            <div className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏱️</span>
                <div>
                  <p className="text-white/50 text-xs">Time Spent</p>
                  <p className="text-lg font-bold text-white">{formatTime(stats.timeSpent)}</p>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/20">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <div>
                  <p className="text-orange-300/70 text-xs">Streak</p>
                  <p className="text-lg font-bold text-orange-300">{stats.currentStreak} days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Badges Earned */}
          {stats.badgesEarned.length > 0 && (
            <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl p-4 border border-emerald-500/20">
              <p className="text-emerald-300/70 text-xs uppercase tracking-wider mb-2">Badges Earned This Week</p>
              <div className="flex flex-wrap gap-2">
                {stats.badgesEarned.map((badge) => (
                  <span 
                    key={badge}
                    className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium"
                  >
                    🏅 {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Motivational Message */}
          <div className="text-center pt-2">
            <p className="text-xl">🎉</p>
            <p className="text-white font-medium mt-2">Incredible progress this week!</p>
            <p className="text-white/50 text-sm mt-1">
              You're {Math.round((stats.totalXP / stats.previousWeekXP - 1) * 100)}% ahead of last week. Keep going!
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold hover:opacity-90 transition-opacity"
            >
              Continue Learning
            </button>
            <button
              onClick={() => {
                // Share functionality would go here
                if (navigator.share) {
                  navigator.share({
                    title: "My Weekly Learning Summary",
                    text: `I earned ${stats.totalXP} XP and completed ${stats.lessonsCompleted} lessons this week! 🎉`,
                  });
                }
              }}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Button to trigger weekly summary
export function WeeklySummaryButton() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSummary(true)}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-purple-400/30 hover:border-purple-400/50 transition-colors"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl">📊</span>
          <div className="text-left">
            <p className="text-white font-bold">View Weekly Summary</p>
            <p className="text-white/50 text-xs">See your progress this week</p>
          </div>
        </div>
      </button>
      <WeeklySummary isOpen={showSummary} onClose={() => setShowSummary(false)} />
    </>
  );
}
