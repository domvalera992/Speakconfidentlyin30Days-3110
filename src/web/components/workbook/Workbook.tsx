import { useState, useEffect } from "react";
import TranslationExercise from "./TranslationExercise";
import FillInBlankExercise from "./FillInBlankExercise";
import MatchingExercise from "./MatchingExercise";
import ListeningExercise from "./ListeningExercise";
import SpeakingExercise from "./SpeakingExercise";
import ConversationsExercise from "./ConversationsExercise";
import PracticeLog from "./PracticeLog";
import WorkbookPDF from "./WorkbookPDF";

export type WorkbookTab = 
  | "overview" 
  | "translation" 
  | "fill-in-blank" 
  | "matching" 
  | "listening" 
  | "speaking" 
  | "conversations" 
  | "practice-log";

interface TabInfo {
  id: WorkbookTab;
  label: string;
  icon: string;
  description: string;
  progress: number;
  totalExercises: number;
  completedExercises: number;
  color: string;
}

const workbookTabs: TabInfo[] = [
  {
    id: "translation",
    label: "Translation",
    icon: "🔄",
    description: "English ↔ Spanish translations",
    progress: 35,
    totalExercises: 40,
    completedExercises: 14,
    color: "amber",
  },
  {
    id: "fill-in-blank",
    label: "Fill-in-Blank",
    icon: "✏️",
    description: "Complete the missing words",
    progress: 20,
    totalExercises: 25,
    completedExercises: 5,
    color: "cyan",
  },
  {
    id: "matching",
    label: "Matching",
    icon: "🔗",
    description: "Match phrases with translations",
    progress: 50,
    totalExercises: 8,
    completedExercises: 4,
    color: "emerald",
  },
  {
    id: "listening",
    label: "Listening",
    icon: "👂",
    description: "Identify phrases from audio",
    progress: 15,
    totalExercises: 20,
    completedExercises: 3,
    color: "violet",
  },
  {
    id: "speaking",
    label: "Speaking",
    icon: "🎤",
    description: "Record yourself in scenarios",
    progress: 10,
    totalExercises: 15,
    completedExercises: 2,
    color: "rose",
  },
  {
    id: "conversations",
    label: "Conversations",
    icon: "💬",
    description: "Complete dialogue exercises",
    progress: 0,
    totalExercises: 10,
    completedExercises: 0,
    color: "indigo",
  },
  {
    id: "practice-log",
    label: "Practice Log",
    icon: "📓",
    description: "Track your daily practice",
    progress: 45,
    totalExercises: 30,
    completedExercises: 14,
    color: "fuchsia",
  },
];

interface WorkbookProps {
  onExerciseStart?: (tab: WorkbookTab) => void;
}

export default function Workbook({ onExerciseStart }: WorkbookProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<WorkbookTab>("overview");
  const [showPDFModal, setShowPDFModal] = useState<"pdf" | "print" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalExercises = workbookTabs.reduce((acc, tab) => acc + tab.totalExercises, 0);
  const completedExercises = workbookTabs.reduce((acc, tab) => acc + tab.completedExercises, 0);
  const overallProgress = Math.round((completedExercises / totalExercises) * 100);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
      amber: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30", gradient: "from-amber-500/20 to-orange-500/20" },
      cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30", gradient: "from-cyan-500/20 to-blue-500/20" },
      emerald: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30", gradient: "from-emerald-500/20 to-teal-500/20" },
      violet: { bg: "bg-violet-500/20", text: "text-violet-400", border: "border-violet-500/30", gradient: "from-violet-500/20 to-purple-500/20" },
      rose: { bg: "bg-rose-500/20", text: "text-rose-400", border: "border-rose-500/30", gradient: "from-rose-500/20 to-pink-500/20" },
      indigo: { bg: "bg-indigo-500/20", text: "text-indigo-400", border: "border-indigo-500/30", gradient: "from-indigo-500/20 to-blue-500/20" },
      fuchsia: { bg: "bg-fuchsia-500/20", text: "text-fuchsia-400", border: "border-fuchsia-500/30", gradient: "from-fuchsia-500/20 to-pink-500/20" },
    };
    return colorMap[color] || colorMap.amber;
  };

  const handleTabClick = (tabId: WorkbookTab) => {
    if (tabId !== "overview") {
      setActiveTab(tabId);
      onExerciseStart?.(tabId);
    }
  };

  const handleBackToOverview = () => {
    setActiveTab("overview");
  };

  // Render exercise views based on active tab
  if (activeTab === "translation") {
    return <TranslationExercise onBack={handleBackToOverview} />;
  }

  if (activeTab === "fill-in-blank") {
    return <FillInBlankExercise onBack={handleBackToOverview} />;
  }

  if (activeTab === "matching") {
    return <MatchingExercise onBack={handleBackToOverview} />;
  }

  if (activeTab === "listening") {
    return <ListeningExercise onBack={handleBackToOverview} />;
  }

  if (activeTab === "speaking") {
    return <SpeakingExercise onBack={handleBackToOverview} />;
  }

  if (activeTab === "conversations") {
    return <ConversationsExercise onBack={handleBackToOverview} />;
  }

  if (activeTab === "practice-log") {
    return <PracticeLog onBack={handleBackToOverview} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-0 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/6 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className={`mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 flex items-center justify-center border border-amber-500/20">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 via-rose-300 to-violet-300 bg-clip-text text-transparent">
                Workbook
              </h1>
              <p className="text-white/50 text-sm">Practice & perfect your skills</p>
            </div>
          </div>
        </div>

        {/* Overall Progress Card */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-violet-500/10 to-cyan-500/10 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-semibold text-lg">Your Progress</h2>
                <p className="text-white/50 text-sm">{completedExercises} of {totalExercises} exercises completed</p>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${overallProgress * 0.88} 100`}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{overallProgress}%</span>
                </div>
              </div>
            </div>

            {/* Mini Progress Bars for each type */}
            <div className="grid grid-cols-4 gap-2">
              {workbookTabs.slice(0, 4).map((tab) => {
                const colors = getColorClasses(tab.color);
                return (
                  <div key={tab.id} className="text-center">
                    <span className="text-lg mb-1 block">{tab.icon}</span>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors.bg} rounded-full transition-all duration-500`}
                        style={{ width: `${tab.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-white/40 mt-1">{tab.progress}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Exercise Types */}
        <div className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white/80">Exercise Types</h2>
            <span className="text-xs text-white/40">7 categories</span>
          </div>

          <div className="space-y-3">
            {workbookTabs.map((tab, index) => {
              const colors = getColorClasses(tab.color);
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full p-4 rounded-2xl bg-gradient-to-r ${colors.gradient} border ${colors.border} hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group text-left`}
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                      {tab.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{tab.label}</h3>
                      <p className="text-white/50 text-sm mb-2">{tab.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700`}
                            style={{ 
                              width: `${tab.progress}%`,
                              background: `linear-gradient(90deg, ${tab.color === 'amber' ? '#f59e0b' : tab.color === 'cyan' ? '#06b6d4' : tab.color === 'emerald' ? '#10b981' : tab.color === 'violet' ? '#8b5cf6' : tab.color === 'rose' ? '#f43f5e' : tab.color === 'indigo' ? '#6366f1' : '#d946ef'}, ${tab.color === 'amber' ? '#ea580c' : tab.color === 'cyan' ? '#0284c7' : tab.color === 'emerald' ? '#059669' : tab.color === 'violet' ? '#7c3aed' : tab.color === 'rose' ? '#e11d48' : tab.color === 'indigo' ? '#4f46e5' : '#c026d3'})`
                            }}
                          />
                        </div>
                        <span className={`text-xs ${colors.text} font-medium`}>
                          {tab.completedExercises}/{tab.totalExercises}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`mt-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-lg font-semibold text-white/80 mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setShowPDFModal("pdf")}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl">📥</span>
              </div>
              <h3 className="text-white font-medium text-sm mb-1">Download PDF</h3>
              <p className="text-white/40 text-xs">All exercises + answers</p>
            </button>

            <button 
              onClick={() => setShowPDFModal("print")}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl">🖨️</span>
              </div>
              <h3 className="text-white font-medium text-sm mb-1">Print Workbook</h3>
              <p className="text-white/40 text-xs">Print-friendly format</p>
            </button>

            <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-white font-medium text-sm mb-1">Random Quiz</h3>
              <p className="text-white/40 text-xs">Test your knowledge</p>
            </button>

            <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-left">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="text-white font-medium text-sm mb-1">Progress Report</h3>
              <p className="text-white/40 text-xs">View detailed stats</p>
            </button>
          </div>
        </div>

        {/* Streak Reminder */}
        <div className={`mt-8 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center text-2xl animate-pulse">
                🔥
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold">Keep your streak alive!</h3>
                <p className="text-white/50 text-sm">Complete 3 more exercises today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF/Print Modal */}
      {showPDFModal && (
        <WorkbookPDF 
          mode={showPDFModal} 
          onClose={() => setShowPDFModal(null)} 
        />
      )}
    </div>
  );
}
