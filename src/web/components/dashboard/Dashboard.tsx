import { useState, useEffect } from "react";
import type { UserSelections } from "../../pages";
import ModuleList from "./ModuleList";
import BottomNav from "./BottomNav";

interface DashboardProps {
  selections: UserSelections;
}

export default function Dashboard({ selections }: DashboardProps) {
  const [mounted, setMounted] = useState(false);
  
  // Mock progress data
  const currentDay = 12;
  const totalDays = 30;
  const streak = 7;
  const lessonsCompletedToday = 0;
  const dailyGoal = 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  const progressPercentage = (currentDay / totalDays) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const getGreeting = () => {
    const name = selections.name || "Learner";
    return selections.language === "spanish" 
      ? `¡Hola, ${name}!` 
      : `Hey, ${name}!`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-rose-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/6 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-5 py-6 max-w-lg mx-auto">
        {/* Top Header Section */}
        <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          {/* Greeting Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                {getGreeting()}
              </h1>
              <p className="text-white/50 text-sm mt-1">Ready to learn today?</p>
            </div>
            
            {/* Streak Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/20">
              <span className="text-2xl animate-pulse">🔥</span>
              <div className="text-right">
                <p className="text-orange-300 font-bold text-lg leading-none">{streak}</p>
                <p className="text-orange-300/60 text-xs">Day Streak</p>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className={`bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center gap-6">
              {/* Circular Progress Ring */}
              <div className="relative flex-shrink-0">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                    style={{ transitionDelay: "0.5s" }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white">{currentDay}</span>
                  <span className="text-white/40 text-xs">of {totalDays}</span>
                </div>
              </div>

              {/* Progress Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">Day {currentDay} of 30</h3>
                <p className="text-white/50 text-sm mb-4">
                  {Math.round(progressPercentage)}% of your journey complete
                </p>
                
                {/* Daily Goal Status */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${lessonsCompletedToday >= dailyGoal ? "bg-emerald-500" : "bg-white/10"}`}>
                    {lessonsCompletedToday >= dailyGoal ? (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-white/60 text-sm font-medium">{lessonsCompletedToday}/{dailyGoal}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-white/80 text-sm font-medium">Today's lesson</p>
                    <p className="text-white/40 text-xs">
                      {lessonsCompletedToday >= dailyGoal 
                        ? "Completed! 🎉" 
                        : `${lessonsCompletedToday}/${dailyGoal} completed`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Quick Stats */}
          <div className={`grid grid-cols-3 gap-3 mb-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
              <p className="text-2xl font-bold text-emerald-400">42</p>
              <p className="text-white/40 text-xs mt-1">Words Learned</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
              <p className="text-2xl font-bold text-cyan-400">3.2<span className="text-sm">hrs</span></p>
              <p className="text-white/40 text-xs mt-1">Time Spent</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
              <p className="text-2xl font-bold text-amber-400">85%</p>
              <p className="text-white/40 text-xs mt-1">Accuracy</p>
            </div>
          </div>

          {/* Continue Learning CTA */}
          <div className={`transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button className="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3">
              <span>Continue Learning</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Course Modules */}
          <div className={`mt-8 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <ModuleList />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
