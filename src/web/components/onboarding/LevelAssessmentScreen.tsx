import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import type { UserSelections } from "../../pages";

interface LevelAssessmentScreenProps {
  selections: UserSelections;
  updateSelections: (updates: Partial<UserSelections>) => void;
  onNext: () => void;
  onBack: () => void;
  currentScreen: number;
}

const levels = [
  {
    id: "beginner",
    label: "Complete beginner",
    emoji: "🌱",
    description: "Starting from zero — that's perfectly fine!",
  },
  {
    id: "some-words",
    label: "I know some words but can't speak",
    emoji: "📚",
    description: "You understand bits but conversation feels hard",
  },
  {
    id: "basic",
    label: "I can have basic conversations",
    emoji: "💬",
    description: "Simple topics work, complex ones are tricky",
  },
  {
    id: "intermediate",
    label: "I'm intermediate but not confident",
    emoji: "🎯",
    description: "You know a lot but freeze when speaking",
  },
];

export default function LevelAssessmentScreen({
  selections,
  updateSelections,
  onNext,
  onBack,
  currentScreen,
}: LevelAssessmentScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col px-6 py-8">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full py-8">
        <h1 className={`text-3xl md:text-4xl font-bold text-center mb-3 transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          How much do you know?
        </h1>
        <p className={`text-white/60 text-center mb-10 transition-all duration-500 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          No judgment here — we'll meet you exactly where you are
        </p>

        {/* Level options */}
        <div className={`flex flex-col gap-4 w-full mb-10 transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {levels.map((level, index) => {
            const isSelected = selections.level === level.id;
            return (
              <button
                key={level.id}
                onClick={() => updateSelections({ level: level.id })}
                className={`group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                  isSelected
                    ? "border-emerald-400 bg-emerald-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{level.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{level.label}</h3>
                    <p className="text-sm text-white/50">{level.description}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-emerald-400 bg-emerald-400"
                        : "border-white/30"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Continue button */}
        <button
          onClick={onNext}
          disabled={!selections.level}
          className={`w-full max-w-md py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            selections.level
              ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
