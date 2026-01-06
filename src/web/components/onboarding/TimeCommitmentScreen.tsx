import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import type { UserSelections } from "../../pages";

interface TimeCommitmentScreenProps {
  selections: UserSelections;
  updateSelections: (updates: Partial<UserSelections>) => void;
  onNext: () => void;
  onBack: () => void;
  currentScreen: number;
}

const timeOptions = [
  {
    id: "5min",
    label: "5 minutes",
    emoji: "⚡",
    description: "Quick daily practice",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "10min",
    label: "10 minutes",
    emoji: "☕",
    description: "Perfect coffee-break length",
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "15-20min",
    label: "15-20 minutes",
    emoji: "🚀",
    description: "Accelerated progress",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: "30+min",
    label: "30+ minutes",
    emoji: "🔥",
    description: "Maximum transformation",
    color: "from-violet-400 to-purple-500",
  },
];

export default function TimeCommitmentScreen({
  selections,
  updateSelections,
  onNext,
  onBack,
  currentScreen,
}: TimeCommitmentScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col px-6 py-8">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
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
        <div className={`text-6xl mb-6 transition-all duration-500 delay-100 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          ⏱️
        </div>
        <h1 className={`text-3xl md:text-4xl font-bold text-center mb-3 transition-all duration-500 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          How much time can you practice daily?
        </h1>
        <p className={`text-white/60 text-center mb-10 transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Consistency beats intensity — pick what you can actually stick to
        </p>

        {/* Time options */}
        <div className={`grid grid-cols-2 gap-4 w-full mb-10 transition-all duration-500 delay-250 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {timeOptions.map((option, index) => {
            const isSelected = selections.dailyTime === option.id;
            return (
              <button
                key={option.id}
                onClick={() => updateSelections({ dailyTime: option.id })}
                className={`group relative p-6 rounded-2xl border-2 text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  isSelected
                    ? `border-transparent bg-gradient-to-br ${option.color}`
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-4xl block mb-3">{option.emoji}</span>
                <h3 className={`font-bold text-lg mb-1 ${isSelected ? "text-white" : "text-white"}`}>
                  {option.label}
                </h3>
                <p className={`text-sm ${isSelected ? "text-white/80" : "text-white/50"}`}>
                  {option.description}
                </p>
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue button */}
        <button
          onClick={onNext}
          disabled={!selections.dailyTime}
          className={`w-full max-w-md py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            selections.dailyTime
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
