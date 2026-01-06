import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import type { UserSelections } from "../../pages";

interface GoalSelectionScreenProps {
  selections: UserSelections;
  updateSelections: (updates: Partial<UserSelections>) => void;
  onNext: () => void;
  onBack: () => void;
  currentScreen: number;
}

const goals = [
  { id: "travel", label: "Travel", emoji: "✈️", description: "Explore new places with confidence" },
  { id: "work", label: "Work / Career", emoji: "💼", description: "Advance your professional opportunities" },
  { id: "family", label: "Talk to family / friends", emoji: "❤️", description: "Connect with loved ones" },
  { id: "move", label: "Move to a new country", emoji: "🌍", description: "Start a new chapter abroad" },
  { id: "confident", label: "Feel more confident", emoji: "💪", description: "Overcome the fear of speaking" },
  { id: "children", label: "Help my children", emoji: "👨‍👩‍👧‍👦", description: "Support your kids' education" },
];

export default function GoalSelectionScreen({
  selections,
  updateSelections,
  onNext,
  onBack,
  currentScreen,
}: GoalSelectionScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleGoal = (goalId: string) => {
    const current = selections.goals;
    const updated = current.includes(goalId)
      ? current.filter((g) => g !== goalId)
      : [...current, goalId];
    updateSelections({ goals: updated });
  };

  return (
    <div className="min-h-screen relative flex flex-col px-6 py-8">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header with back button and progress */}
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
        <h1 className={`text-3xl md:text-4xl font-bold text-center mb-3 transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Why do you want to learn?
        </h1>
        <p className={`text-white/60 text-center mb-10 transition-all duration-500 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Select all that apply — this helps us personalize your journey
        </p>

        {/* Goal checkboxes */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10 transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {goals.map((goal, index) => {
            const isSelected = selections.goals.includes(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`group relative p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  isSelected
                    ? "border-emerald-400 bg-emerald-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{goal.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{goal.label}</h3>
                    <p className="text-sm text-white/50">{goal.description}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-emerald-400 bg-emerald-400"
                        : "border-white/30"
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
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
          disabled={selections.goals.length === 0}
          className={`w-full max-w-md py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            selections.goals.length > 0
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
