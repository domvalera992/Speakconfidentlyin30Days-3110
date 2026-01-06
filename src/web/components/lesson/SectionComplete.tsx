import { useState, useEffect } from "react";

interface ColorClasses {
  accent: string;
  bg: string;
  border: string;
  gradient: string;
}

interface SectionCompleteProps {
  colorClasses: ColorClasses;
  lessonTitle: string;
  onContinue: () => void;
  onPracticeMore: () => void;
}

export default function SectionComplete({ colorClasses, lessonTitle, onContinue, onPracticeMore }: SectionCompleteProps) {
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [xpAnimated, setXpAnimated] = useState(false);
  const xpEarned = 25;
  const newStreak = 8;

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setXpAnimated(true), 500);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  const learnedItems = [
    "15 essential greeting phrases",
    "Pronunciation of common sounds",
    "Restaurant conversation basics",
    "How to introduce yourself",
  ];

  return (
    <section className="mb-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 overflow-hidden relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}px`,
                width: `${8 + Math.random() * 12}px`,
                height: `${8 + Math.random() * 12}px`,
                background: ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6", "#06b6d4"][Math.floor(Math.random() * 6)],
                borderRadius: Math.random() > 0.5 ? "50%" : "0",
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Section Header */}
      <div className="p-5 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${colorClasses.gradient} shadow-lg`}>
            <span className="text-white font-bold">🎉</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Lesson Complete!</h2>
            <p className="text-white/40 text-sm">Great work today!</p>
          </div>
        </div>
      </div>

      {/* Celebration Content */}
      <div className="p-8 relative z-10">
        {/* Trophy & XP */}
        <div className={`text-center mb-8 transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <div className="relative inline-block mb-4">
            <span className="text-8xl">🏆</span>
            <div className={`absolute -right-4 -top-2 transition-all duration-500 ${xpAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full text-white font-bold text-lg shadow-lg animate-bounce">
                +{xpEarned} XP
              </div>
            </div>
          </div>
          
          <h3 className="text-3xl font-bold text-white mb-2">Amazing Job!</h3>
          <p className="text-white/60">You completed "{lessonTitle}"</p>
        </div>

        {/* Stats Row */}
        <div className={`grid grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* XP Earned */}
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
            <p className="text-3xl font-bold text-amber-400 mb-1">+{xpEarned}</p>
            <p className="text-white/50 text-xs">XP Earned</p>
          </div>

          {/* Streak */}
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/30">
            <p className="text-3xl font-bold text-rose-400 mb-1">🔥 {newStreak}</p>
            <p className="text-white/50 text-xs">Day Streak</p>
          </div>

          {/* Accuracy */}
          <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
            <p className="text-3xl font-bold text-emerald-400 mb-1">85%</p>
            <p className="text-white/50 text-xs">Quiz Score</p>
          </div>
        </div>

        {/* What You Learned */}
        <div className={`mb-8 p-5 rounded-xl bg-white/5 border border-white/10 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h4 className="text-white font-medium mb-4 flex items-center gap-2">
            <span className="text-lg">📚</span>
            What you learned today
          </h4>
          <ul className="space-y-2">
            {learnedItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/70 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className={`space-y-3 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button
            onClick={onContinue}
            className={`w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r ${colorClasses.gradient} text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3`}
          >
            <span>Continue to Next Lesson</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <button
            onClick={onPracticeMore}
            className="w-full py-4 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Practice More</span>
          </button>
        </div>

        {/* Share Achievement */}
        <div className={`mt-6 text-center transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <p className="text-white/40 text-sm mb-3">Share your achievement</p>
          <div className="flex justify-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <span className="text-lg">𝕏</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <span className="text-lg">📱</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all">
              <span className="text-lg">💬</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confetti Animation CSS */}
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
