import { useState, useEffect } from "react";
import SectionVideoIntro from "./SectionVideoIntro";
import SectionCoreContent from "./SectionCoreContent";
import SectionPractice from "./SectionPractice";
import SectionScenario from "./SectionScenario";
import SectionQuiz from "./SectionQuiz";
import SectionComplete from "./SectionComplete";

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  current?: boolean;
  type: "lesson" | "quiz";
}

interface Module {
  id: number;
  title: string;
  color: string;
}

interface LessonPageProps {
  lesson: Lesson;
  module: Module;
  onBack: () => void;
  onComplete?: () => void;
}

export default function LessonPage({ lesson, module, onBack, onComplete }: LessonPageProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const estimatedTime = lesson.type === "quiz" ? 5 : 10;

  useEffect(() => {
    setMounted(true);
    // Simulate progress loading
    const timer = setTimeout(() => setProgress(15), 500);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(Math.round((scrollTop / docHeight) * 100), 100);
      setProgress(Math.max(scrollPercent, 15));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getModuleColor = (color: string) => {
    const colors: Record<string, { accent: string; bg: string; border: string; gradient: string }> = {
      emerald: {
        accent: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        gradient: "from-emerald-500 to-teal-500",
      },
      cyan: {
        accent: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        gradient: "from-cyan-500 to-blue-500",
      },
      violet: {
        accent: "text-violet-400",
        bg: "bg-violet-500/10",
        border: "border-violet-500/30",
        gradient: "from-violet-500 to-purple-500",
      },
      rose: {
        accent: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        gradient: "from-rose-500 to-pink-500",
      },
      amber: {
        accent: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        gradient: "from-amber-500 to-orange-500",
      },
    };
    return colors[color] || colors.emerald;
  };

  const colorClasses = getModuleColor(module.color);

  const handleMarkComplete = () => {
    setIsCompleted(true);
    setProgress(100);
    onComplete?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinue = () => {
    onBack();
  };

  const handlePracticeMore = () => {
    setIsCompleted(false);
    setProgress(50);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white">
        {/* Background gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-rose-500/8 rounded-full blur-3xl" />
        </div>

        {/* Simple Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-white/60">Back to Dashboard</span>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-2xl mx-auto px-4 py-8">
          <SectionComplete
            colorClasses={colorClasses}
            lessonTitle={lesson.title}
            onContinue={handleContinue}
            onPracticeMore={handlePracticeMore}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-rose-500/8 rounded-full blur-3xl" />
      </div>

      {/* Sticky Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/10 transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Top Row: Back button & Module name */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <svg
                className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.accent} border ${colorClasses.border}`}
              >
                Module {module.id}
              </span>
              <span className="text-white/50 text-sm">{module.title}</span>
            </div>
          </div>

          {/* Lesson Title */}
          <h1 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
            {lesson.type === "quiz" ? "📝 Quiz: " : ""}
            {lesson.title}
          </h1>

          {/* Progress Bar and Time Badge */}
          <div className="flex items-center gap-4">
            {/* Progress Bar */}
            <div className="flex-1">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${colorClasses.gradient} transition-all duration-700 ease-out`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-white/40 text-xs">{progress}% complete</span>
                <span className="text-white/40 text-xs">
                  {Math.ceil((100 - progress) / 20)} sections left
                </span>
              </div>
            </div>

            {/* Time Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${colorClasses.bg} border ${colorClasses.border}`}
            >
              <span className="text-base">⏱️</span>
              <span className={`text-sm font-medium ${colorClasses.accent}`}>{estimatedTime} min</span>
            </div>
          </div>
        </div>
      </header>

      {/* Lesson Content Area */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <div
          className={`transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Section A: Video/Audio Introduction */}
          <SectionVideoIntro colorClasses={colorClasses} lessonTitle={lesson.title} />

          {/* Section B: Core Content with Phrase Cards */}
          <SectionCoreContent colorClasses={colorClasses} />

          {/* Section C: Practice Activity - Swipeable Flashcards */}
          <SectionPractice colorClasses={colorClasses} />

          {/* Section D: Real-Life Scenario */}
          <SectionScenario colorClasses={colorClasses} />

          {/* Section E: Quick Quiz */}
          <SectionQuiz colorClasses={colorClasses} />

          {/* Mark as Complete Button */}
          <div className="mt-8 mb-16">
            <button
              onClick={handleMarkComplete}
              className={`w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r ${colorClasses.gradient} text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Mark as Complete</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
