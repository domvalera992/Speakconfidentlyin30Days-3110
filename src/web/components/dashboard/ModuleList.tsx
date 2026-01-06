import { useState, useEffect } from "react";

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
  subtitle: string;
  days: string;
  icon: string;
  unlocked: boolean;
  lessons: Lesson[];
  color: string;
  unlockRequirement?: string;
}

const modules: Module[] = [
  {
    id: 1,
    title: "Core Phrases",
    subtitle: "Foundation essentials",
    days: "Day 1-3",
    icon: "💬",
    unlocked: true,
    color: "emerald",
    lessons: [
      { id: "1.1", title: "The 50 Power Phrases", completed: true, type: "lesson" },
      { id: "1.2", title: "Pronunciation Training", completed: true, type: "lesson" },
      { id: "1.3", title: "Daily Speaking Warmups", completed: false, current: true, type: "lesson" },
      { id: "quiz-1", title: "Core Phrases Check", completed: false, type: "quiz" },
    ],
  },
  {
    id: 2,
    title: "Real-Life Situations",
    subtitle: "Practical conversations",
    days: "Day 4-10",
    icon: "🌍",
    unlocked: true,
    color: "cyan",
    lessons: [
      { id: "2.1", title: "Travel & Transportation", completed: false, type: "lesson" },
      { id: "2.2", title: "Food & Restaurants", completed: false, type: "lesson" },
      { id: "2.3", title: "Shopping Essentials", completed: false, type: "lesson" },
      { id: "2.4", title: "Emergency Communication", completed: false, type: "lesson" },
      { id: "quiz-2", title: "Situation Mastery", completed: false, type: "quiz" },
    ],
  },
  {
    id: 3,
    title: "Building Confidence",
    subtitle: "Speak without fear",
    days: "Day 11-15",
    icon: "💪",
    unlocked: false,
    color: "violet",
    unlockRequirement: "Complete Module 2 to unlock",
    lessons: [
      { id: "3.1", title: "Overcoming Speaking Fear", completed: false, type: "lesson" },
      { id: "3.2", title: "The Confidence Loop Method", completed: false, type: "lesson" },
      { id: "3.3", title: "Accent Training", completed: false, type: "lesson" },
      { id: "quiz-3", title: "Confidence Check", completed: false, type: "quiz" },
    ],
  },
  {
    id: 4,
    title: "Real Conversations",
    subtitle: "Natural dialogue mastery",
    days: "Day 16-30",
    icon: "🗣️",
    unlocked: false,
    color: "rose",
    unlockRequirement: "Complete Module 3 to unlock",
    lessons: [
      { id: "4.1", title: "Meeting People", completed: false, type: "lesson" },
      { id: "4.2", title: "Asking Questions Naturally", completed: false, type: "lesson" },
      { id: "4.3", title: "Storytelling Basics", completed: false, type: "lesson" },
      { id: "4.4", title: "Practice Conversations", completed: false, type: "lesson" },
      { id: "final", title: "Final Assessment", completed: false, type: "quiz" },
    ],
  },
  {
    id: 5,
    title: "Everyday Life Mastery",
    subtitle: "Bonus content",
    days: "BONUS",
    icon: "⭐",
    unlocked: false,
    color: "amber",
    unlockRequirement: "Complete the 30-day program to unlock",
    lessons: [
      { id: "5.1", title: "Phone Calls", completed: false, type: "lesson" },
      { id: "5.2", title: "Workplace Basics", completed: false, type: "lesson" },
      { id: "5.3", title: "Appointments", completed: false, type: "lesson" },
      { id: "5.4", title: "Giving & Getting Directions", completed: false, type: "lesson" },
    ],
  },
];

interface ModuleForCallback {
  id: number;
  title: string;
  color: string;
}

interface ModuleListProps {
  onLessonClick?: (lesson: Lesson, moduleId: number) => void;
  onLessonOpen?: (lesson: Lesson, module: ModuleForCallback) => void;
}

export default function ModuleList({ onLessonClick, onLessonOpen }: ModuleListProps) {
  const [mounted, setMounted] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [showTooltip, setShowTooltip] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{lesson: Lesson; moduleId: number} | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getColorClasses = (color: string, unlocked: boolean) => {
    if (!unlocked) return {
      bg: "bg-white/5",
      border: "border-white/10",
      accent: "text-white/30",
      glow: "",
    };

    const colors: Record<string, { bg: string; border: string; accent: string; glow: string }> = {
      emerald: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        accent: "text-emerald-400",
        glow: "shadow-emerald-500/10",
      },
      cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        accent: "text-cyan-400",
        glow: "shadow-cyan-500/10",
      },
      violet: {
        bg: "bg-violet-500/10",
        border: "border-violet-500/30",
        accent: "text-violet-400",
        glow: "shadow-violet-500/10",
      },
      rose: {
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        accent: "text-rose-400",
        glow: "shadow-rose-500/10",
      },
      amber: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
        accent: "text-amber-400",
        glow: "shadow-amber-500/10",
      },
    };
    return colors[color] || colors.emerald;
  };

  const getCompletedCount = (lessons: Lesson[]) => {
    return lessons.filter((l) => l.completed).length;
  };

  const handleModuleClick = (module: Module, isExpanded: boolean) => {
    if (module.unlocked) {
      setExpandedModule(isExpanded ? null : module.id);
      setShowTooltip(null);
    } else {
      setShowTooltip(showTooltip === module.id ? null : module.id);
    }
  };

  const handleLessonClick = (lesson: Lesson, module: Module) => {
    setSelectedLesson({ lesson, moduleId: module.id });
    onLessonClick?.(lesson, module.id);
    onLessonOpen?.(lesson, { id: module.id, title: module.title, color: module.color });
  };

  return (
    <div className="space-y-4">
      <h2 className={`text-lg font-semibold text-white/80 mb-4 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
        Your Learning Path
      </h2>

      {modules.map((module, idx) => {
        const colors = getColorClasses(module.color, module.unlocked);
        const completed = getCompletedCount(module.lessons);
        const total = module.lessons.length;
        const isExpanded = expandedModule === module.id;
        const showingTooltip = showTooltip === module.id;

        return (
          <div
            key={module.id}
            className={`rounded-2xl border overflow-hidden transition-all duration-500 hover:scale-[1.01] ${colors.border} ${colors.bg} ${colors.glow} shadow-lg ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${(idx + 1) * 100}ms` }}
          >
            {/* Module Header */}
            <div className="relative">
              <button
                onClick={() => handleModuleClick(module, isExpanded)}
                className={`w-full p-4 flex items-center gap-4 text-left ${module.unlocked ? "cursor-pointer hover:bg-white/5" : "cursor-pointer"} transition-all duration-300`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${module.unlocked ? colors.bg : "bg-white/5"} border ${colors.border} transition-transform duration-300 ${isExpanded ? "scale-105" : ""}`}>
                  {module.unlocked ? module.icon : "🔒"}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${module.unlocked ? `${colors.bg} ${colors.accent}` : "bg-white/5 text-white/30"}`}>
                      {module.days}
                    </span>
                    {!module.unlocked && (
                      <span className="text-xs text-white/30">Locked</span>
                    )}
                  </div>
                  <h3 className={`font-semibold ${module.unlocked ? "text-white" : "text-white/40"} truncate`}>
                    {module.title}
                  </h3>
                  <p className="text-white/40 text-sm">{module.subtitle}</p>
                </div>

                {/* Progress & Arrow */}
                <div className="flex items-center gap-3">
                  {module.unlocked && (
                    <div className="text-right">
                      <p className={`text-sm font-medium ${colors.accent}`}>{completed}/{total}</p>
                      <p className="text-white/30 text-xs">lessons</p>
                    </div>
                  )}
                  <svg
                    className={`w-5 h-5 text-white/30 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Locked Tooltip */}
              {!module.unlocked && showingTooltip && (
                <div className="absolute left-4 right-4 top-full z-20 mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-gray-900 border border-white/20 rounded-xl p-3 shadow-xl">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <span>🔐</span>
                      <span>{module.unlockRequirement}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Lessons List (Expandable) */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded && module.unlocked ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="px-4 pb-4 space-y-2">
                {module.lessons.map((lesson, lessonIdx) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson, module)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                      lesson.current
                        ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 shadow-lg shadow-amber-500/10"
                        : selectedLesson?.lesson.id === lesson.id && selectedLesson?.moduleId === module.id
                        ? "bg-white/15 border border-white/20"
                        : "bg-white/5 hover:bg-white/10 border border-transparent"
                    }`}
                    style={{ 
                      animationDelay: `${lessonIdx * 50}ms`,
                      animation: isExpanded ? "fadeSlideIn 0.3s ease-out forwards" : undefined 
                    }}
                  >
                    {/* Status Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        lesson.completed
                          ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                          : lesson.current
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 animate-pulse"
                          : "bg-white/10"
                      }`}
                    >
                      {lesson.completed ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : lesson.type === "quiz" ? (
                        <span className="text-xs">📝</span>
                      ) : lesson.current ? (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <span className="text-white/40 text-xs font-medium">{lesson.id}</span>
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-medium transition-colors ${lesson.completed ? "text-white/60 line-through" : lesson.current ? "text-white" : "text-white/70"}`}>
                        {lesson.type === "quiz" ? "Quiz: " : ""}{lesson.title}
                      </p>
                      {lesson.current && (
                        <p className="text-amber-400/80 text-xs flex items-center gap-1">
                          <span className="animate-bounce">▶</span>
                          Continue learning
                        </p>
                      )}
                    </div>

                    {/* Completed badge or arrow */}
                    {lesson.completed ? (
                      <span className="text-emerald-400 text-xs font-medium px-2 py-1 bg-emerald-500/10 rounded-full">Done ✓</span>
                    ) : (
                      <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Lesson Detail Modal - shows when a lesson is clicked */}
      {selectedLesson && !selectedLesson.lesson.completed && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedLesson(null)}
        >
          <div 
            className="w-full max-w-lg bg-[#12121a] border-t border-white/10 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
                {selectedLesson.lesson.type === "quiz" ? (
                  <span className="text-3xl">📝</span>
                ) : (
                  <span className="text-3xl">📖</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {selectedLesson.lesson.type === "quiz" ? "Quiz: " : ""}{selectedLesson.lesson.title}
              </h3>
              <p className="text-white/50 text-sm">
                {selectedLesson.lesson.type === "quiz" 
                  ? "Test your knowledge and earn your badge"
                  : "Interactive lesson • ~10 min"
                }
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                {selectedLesson.lesson.current ? "Continue Lesson" : "Start Lesson"}
              </button>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="w-full py-3 px-6 rounded-2xl font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
