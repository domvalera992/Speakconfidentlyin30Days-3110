import { useState, useEffect } from "react";
import BadgeGallery from "./BadgeGallery";
import { ToastDemo } from "../notifications/ToastNotification";
import { WeeklySummaryButton } from "./WeeklySummary";

interface XPEvent {
  type: string;
  points: number;
  label: string;
}

interface Level {
  name: string;
  minXP: number;
  maxXP: number;
  icon: string;
  color: string;
  gradient: string;
  benefit: string;
}

const XP_EVENTS: XPEvent[] = [
  { type: "lesson_complete", points: 25, label: "Lesson Complete" },
  { type: "perfect_quiz", points: 50, label: "Perfect Quiz" },
  { type: "daily_login", points: 10, label: "Daily Login" },
  { type: "streak_7_day", points: 100, label: "7-Day Streak Bonus" },
  { type: "record_speaking", points: 15, label: "Speaking Exercise" },
  { type: "workbook_exercise", points: 20, label: "Workbook Exercise" },
  { type: "module_complete", points: 200, label: "Module Complete" },
];

const LEVELS: Level[] = [
  { 
    name: "Beginner", 
    minXP: 0, 
    maxXP: 500, 
    icon: "🌱", 
    color: "emerald",
    gradient: "from-emerald-500 to-green-600",
    benefit: "Access to Core Phrases module"
  },
  { 
    name: "Explorer", 
    minXP: 501, 
    maxXP: 1500, 
    icon: "🧭", 
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    benefit: "Unlock Audio Practice mode"
  },
  { 
    name: "Communicator", 
    minXP: 1501, 
    maxXP: 3000, 
    icon: "💬", 
    color: "purple",
    gradient: "from-purple-500 to-indigo-600",
    benefit: "Advanced conversation exercises"
  },
  { 
    name: "Confident Speaker", 
    minXP: 3001, 
    maxXP: 5000, 
    icon: "🎙️", 
    color: "orange",
    gradient: "from-orange-500 to-amber-600",
    benefit: "Premium pronunciation feedback"
  },
  { 
    name: "Bilingual Master", 
    minXP: 5001, 
    maxXP: 999999, 
    icon: "👑", 
    color: "amber",
    gradient: "from-amber-400 to-yellow-500",
    benefit: "All features unlocked forever"
  },
];

// Mock user XP data
const mockUserData = {
  totalXP: 1847,
  todayXP: 95,
  streak: 7,
  lessonsCompleted: 8,
  quizzesCompleted: 3,
  speakingRecorded: 12,
  todayEvents: [
    { type: "daily_login", time: "8:30 AM" },
    { type: "lesson_complete", time: "9:15 AM" },
    { type: "lesson_complete", time: "10:42 AM" },
    { type: "record_speaking", time: "11:00 AM" },
    { type: "workbook_exercise", time: "11:30 AM" },
  ],
};

const getCurrentLevel = (xp: number): Level => {
  return LEVELS.find((level) => xp >= level.minXP && xp <= level.maxXP) || LEVELS[0];
};

const getNextLevel = (xp: number): Level | null => {
  const currentIndex = LEVELS.findIndex((level) => xp >= level.minXP && xp <= level.maxXP);
  return currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;
};

const getProgressToNextLevel = (xp: number): number => {
  const current = getCurrentLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const progressInLevel = xp - current.minXP;
  const levelRange = next.minXP - current.minXP;
  return Math.min((progressInLevel / levelRange) * 100, 100);
};

export default function ProgressSection() {
  const [mounted, setMounted] = useState(false);
  const [animatedXP, setAnimatedXP] = useState(0);
  const [animatedTodayXP, setAnimatedTodayXP] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const currentLevel = getCurrentLevel(mockUserData.totalXP);
  const nextLevel = getNextLevel(mockUserData.totalXP);
  const progressPercent = getProgressToNextLevel(mockUserData.totalXP);
  const xpToNextLevel = nextLevel ? nextLevel.minXP - mockUserData.totalXP : 0;

  useEffect(() => {
    setMounted(true);
    
    // Animate total XP counter
    const xpDuration = 1500;
    const xpSteps = 60;
    const xpIncrement = mockUserData.totalXP / xpSteps;
    let xpCurrent = 0;
    const xpInterval = setInterval(() => {
      xpCurrent += xpIncrement;
      if (xpCurrent >= mockUserData.totalXP) {
        setAnimatedXP(mockUserData.totalXP);
        clearInterval(xpInterval);
      } else {
        setAnimatedXP(Math.floor(xpCurrent));
      }
    }, xpDuration / xpSteps);

    // Animate today's XP counter
    const todayDuration = 1000;
    const todaySteps = 30;
    const todayIncrement = mockUserData.todayXP / todaySteps;
    let todayCurrent = 0;
    const todayInterval = setInterval(() => {
      todayCurrent += todayIncrement;
      if (todayCurrent >= mockUserData.todayXP) {
        setAnimatedTodayXP(mockUserData.todayXP);
        clearInterval(todayInterval);
      } else {
        setAnimatedTodayXP(Math.floor(todayCurrent));
      }
    }, todayDuration / todaySteps);

    return () => {
      clearInterval(xpInterval);
      clearInterval(todayInterval);
    };
  }, []);

  const triggerLevelUpDemo = () => {
    setShowLevelUp(true);
    setTimeout(() => setShowLevelUp(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Level Up Celebration Overlay */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center animate-bounce">
            <div className="text-8xl mb-4">{currentLevel.icon}</div>
            <h2 className="text-4xl font-black bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent mb-2">
              LEVEL UP!
            </h2>
            <p className="text-2xl text-white/90 font-bold">{currentLevel.name}</p>
            <p className="text-white/60 mt-2">{currentLevel.benefit}</p>
            <div className="mt-6 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className="text-3xl animate-pulse" 
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  ✨
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/6 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-5 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className={`mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            🏆 Your Progress
          </h1>
          <p className="text-white/50 text-sm mt-1">Track your learning journey</p>
        </div>

        {/* Current Level Card */}
        <div 
          className={`bg-gradient-to-br ${currentLevel.gradient} rounded-3xl p-6 mb-6 relative overflow-hidden transition-all duration-700 delay-75 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          onClick={triggerLevelUpDemo}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <span className="text-5xl">{currentLevel.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Current Level</p>
                <h2 className="text-2xl font-black text-white">{currentLevel.name}</h2>
                <p className="text-white/70 text-xs mt-1">{currentLevel.benefit}</p>
              </div>
            </div>

            {/* Progress to next level */}
            {nextLevel && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Progress to {nextLevel.name}</span>
                  <span className="text-white font-bold text-sm">{xpToNextLevel} XP to go</span>
                </div>
                <div className="h-3 bg-black/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/90 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progressPercent}%`, transitionDelay: "0.3s" }}
                  />
                </div>
                <p className="text-white/60 text-xs mt-2 text-center">
                  Tap to preview level-up celebration! ✨
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main XP Card */}
        <div className={`bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-rose-500/20 backdrop-blur-sm rounded-3xl p-6 border border-amber-400/30 mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-amber-300/70 text-sm font-medium uppercase tracking-wider">Total Experience</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-5xl font-black bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                  {animatedXP.toLocaleString()}
                </span>
                <span className="text-amber-300/60 text-xl font-bold">XP</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/30">
                <span className="text-4xl">⚡</span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 px-2 py-0.5 rounded-full text-xs font-bold text-white">
                +{animatedTodayXP}
              </div>
            </div>
          </div>

          {/* Today's XP Bar */}
          <div className="bg-black/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Today's earnings</span>
              <span className="text-emerald-400 font-bold">+{mockUserData.todayXP} XP</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min((mockUserData.todayXP / 100) * 100, 100)}%`, transitionDelay: "0.5s" }}
              />
            </div>
            <p className="text-white/40 text-xs mt-2">Goal: 100 XP daily</p>
          </div>
        </div>

        {/* Level Progression */}
        <div className={`mb-6 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📊</span> Level Progression
          </h2>
          <div className="space-y-3">
            {LEVELS.map((level, index) => {
              const isCurrentLevel = level.name === currentLevel.name;
              const isUnlocked = mockUserData.totalXP >= level.minXP;
              const isPastLevel = mockUserData.totalXP > level.maxXP;
              
              return (
                <div 
                  key={level.name}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    isCurrentLevel 
                      ? `bg-gradient-to-r ${level.gradient}/20 border-white/30` 
                      : isUnlocked 
                        ? "bg-white/5 border-white/10" 
                        : "bg-white/[0.02] border-white/5 opacity-50"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    isCurrentLevel 
                      ? `bg-gradient-to-br ${level.gradient}` 
                      : isUnlocked 
                        ? "bg-white/10" 
                        : "bg-white/5"
                  }`}>
                    <span className="text-2xl">{level.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-bold ${isCurrentLevel ? "text-white" : isUnlocked ? "text-white/80" : "text-white/40"}`}>
                        {level.name}
                      </h3>
                      {isPastLevel && (
                        <span className="text-emerald-400 text-sm">✓ Complete</span>
                      )}
                      {isCurrentLevel && (
                        <span className="bg-amber-400/20 text-amber-400 text-xs px-2 py-0.5 rounded-full font-bold">CURRENT</span>
                      )}
                    </div>
                    <p className={`text-xs ${isUnlocked ? "text-white/50" : "text-white/30"}`}>
                      {level.minXP.toLocaleString()} - {level.maxXP === 999999 ? "∞" : level.maxXP.toLocaleString()} XP
                    </p>
                    <p className={`text-xs mt-1 ${isUnlocked ? "text-white/60" : "text-white/30"}`}>
                      {level.benefit}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className={`grid grid-cols-2 gap-3 mb-6 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/30 to-amber-500/30 flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-400">{mockUserData.streak}</p>
                <p className="text-white/40 text-xs">Day Streak</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">{mockUserData.lessonsCompleted}</p>
                <p className="text-white/40 text-xs">Lessons Done</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-400">{mockUserData.quizzesCompleted}</p>
                <p className="text-white/40 text-xs">Quizzes Passed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/30 to-red-500/30 flex items-center justify-center">
                <span className="text-2xl">🎤</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-rose-400">{mockUserData.speakingRecorded}</p>
                <p className="text-white/40 text-xs">Recordings</p>
              </div>
            </div>
          </div>
        </div>

        {/* XP Earning Guide */}
        <div className={`transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>💎</span> How to Earn XP
          </h2>
          <div className="space-y-2">
            {XP_EVENTS.map((event, index) => (
              <div 
                key={event.type}
                className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:bg-white/10 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-white/80 text-sm">{event.label}</span>
                <span className="text-amber-400 font-bold text-sm">+{event.points} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Activity */}
        <div className={`mt-8 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>📅</span> Today's Activity
          </h2>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            {mockUserData.todayEvents.map((event, index) => {
              const eventInfo = XP_EVENTS.find((e) => e.type === event.type);
              return (
                <div 
                  key={index}
                  className={`flex items-center justify-between px-4 py-3 ${index !== mockUserData.todayEvents.length - 1 ? "border-b border-white/5" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm">{eventInfo?.label}</p>
                      <p className="text-white/40 text-xs">{event.time}</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-medium text-sm">+{eventInfo?.points} XP</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badge Gallery */}
        <div className={`mt-8 transition-all duration-700 delay-450 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <BadgeGallery />
        </div>

        {/* Toast Demo */}
        <div className={`mt-8 transition-all duration-700 delay-475 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <ToastDemo />
        </div>

        {/* Weekly Summary Button */}
        <div className={`mt-8 transition-all duration-700 delay-480 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <WeeklySummaryButton />
        </div>

        {/* Motivational Footer */}
        <div className={`mt-8 text-center transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 rounded-2xl p-6 border border-purple-400/20">
            <p className="text-xl font-bold text-white mb-2">Keep it up! 🚀</p>
            <p className="text-white/60 text-sm">
              Only <span className="text-amber-400 font-bold">{xpToNextLevel} XP</span> until you reach{" "}
              <span className="text-amber-400 font-bold">{nextLevel?.name || "the top"}</span>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
