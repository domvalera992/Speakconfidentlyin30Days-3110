import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import type { UserSelections } from "../../pages";

interface PersonalizedPromiseScreenProps {
  selections: UserSelections;
  onNext: () => void;
  onBack: () => void;
  currentScreen: number;
  onUpgrade?: () => void;
}

const goalLabels: Record<string, string> = {
  travel: "Travel confidently",
  work: "Excel in your career",
  family: "Connect with loved ones",
  move: "Thrive in your new home",
  confident: "Speak without fear",
  children: "Support your children",
};

const levelToWeek: Record<string, { start: string; focus: string }> = {
  beginner: { start: "Week 1-2", focus: "Essential foundations & first phrases" },
  "some-words": { start: "Week 1", focus: "Activating your passive vocabulary" },
  basic: { start: "Week 1", focus: "Building conversation confidence" },
  intermediate: { start: "Week 1", focus: "Breaking through speaking anxiety" },
};

const timeToSpeed: Record<string, string> = {
  "5min": "Steady progress",
  "10min": "Solid momentum",
  "15-20min": "Accelerated growth",
  "30+min": "Rapid transformation",
};

export default function PersonalizedPromiseScreen({
  selections,
  onNext,
  onBack,
  currentScreen,
  onUpgrade,
}: PersonalizedPromiseScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowRoadmap(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const languageLabel = selections.language === "english" ? "English" : "Spanish";
  const levelInfo = levelToWeek[selections.level || "beginner"];
  const speedLabel = timeToSpeed[selections.dailyTime || "10min"];

  const roadmapItems = [
    {
      week: "Week 1-2",
      title: levelInfo.focus,
      icon: "🌱",
      color: "from-emerald-400 to-emerald-500",
    },
    {
      week: "Week 2-3",
      title: "Real conversation practice",
      icon: "💬",
      color: "from-cyan-400 to-cyan-500",
    },
    {
      week: "Week 3-4",
      title: selections.goals.includes("travel")
        ? "Travel scenarios & cultural tips"
        : selections.goals.includes("work")
        ? "Professional communication skills"
        : "Everyday fluency building",
      icon: selections.goals.includes("travel") ? "✈️" : selections.goals.includes("work") ? "💼" : "🎯",
      color: "from-violet-400 to-violet-500",
    },
    {
      week: "Day 30",
      title: "Confident speaker milestone! 🎉",
      icon: "🏆",
      color: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen relative flex flex-col px-6 py-8">
      {/* Background with celebration vibe */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className={`relative z-10 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <ProgressBar currentScreen={currentScreen} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full py-8">
        {/* Personalized header */}
        <div className={`text-center mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-emerald-400 font-medium mb-2">Based on your goals</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Your personalized learning path
          </h1>
          <p className="text-white/60">
            to <span className="text-white font-semibold">{languageLabel}</span> mastery—at your own pace, forever
          </p>
        </div>

        {/* Goal summary badges */}
        <div className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {selections.goals.slice(0, 3).map((goalId) => (
            <span
              key={goalId}
              className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm"
            >
              {goalLabels[goalId]}
            </span>
          ))}
          {selections.goals.length > 3 && (
            <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-sm">
              +{selections.goals.length - 3} more
            </span>
          )}
        </div>

        {/* Roadmap timeline */}
        <div className={`w-full max-w-md mb-8 transition-all duration-700 delay-300 ${showRoadmap ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-400 via-cyan-400 to-amber-400" />

            {roadmapItems.map((item, index) => (
              <div
                key={item.week}
                className="relative flex items-start gap-4 mb-6 last:mb-0"
                style={{
                  opacity: showRoadmap ? 1 : 0,
                  transform: showRoadmap ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.5s ease-out ${300 + index * 150}ms`,
                }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg relative z-10`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-white/50 text-sm mb-1">{item.week}</p>
                  <p className="text-white font-medium">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Speed indicator */}
        <div className={`w-full max-w-md p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 transition-all duration-700 delay-500 ${showRoadmap ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-white/50 text-sm">Your pace</p>
                <p className="text-white font-semibold">{speedLabel}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-sm">Daily commitment</p>
              <p className="text-emerald-400 font-semibold">
                {selections.dailyTime === "30+min" ? "30+ min" : selections.dailyTime?.replace("min", " min")}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`w-full max-w-md space-y-4 ${showRoadmap ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "600ms" }}>
          <button
            onClick={onNext}
            className="w-full py-5 px-8 rounded-2xl font-bold text-lg bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-500 text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Get Lifetime Access – $34.99 ✨
          </button>
          
          {onUpgrade && (
            <button
              onClick={onUpgrade}
              className="w-full py-4 px-8 rounded-2xl font-bold text-base bg-white/5 border border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>🔓</span>
              <span>Unlock Full Access Forever</span>
              <span className="text-emerald-400 text-sm">$34.99</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
