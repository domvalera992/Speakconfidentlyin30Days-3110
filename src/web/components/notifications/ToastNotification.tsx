import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface Toast {
  id: string;
  type: "xp" | "level_up" | "badge" | "streak" | "perfect_quiz" | "info";
  title: string;
  message?: string;
  icon?: string;
  xpAmount?: number;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
  toasts: Toast[];
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { ...toast, id, duration: toast.duration || 5000 };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => onRemove(toast.id)} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Slide in
    requestAnimationFrame(() => setIsVisible(true));

    // Auto dismiss
    const dismissTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onRemove, 300);
    }, toast.duration || 5000);

    return () => clearTimeout(dismissTimer);
  }, [toast.duration, onRemove]);

  const getStyles = () => {
    switch (toast.type) {
      case "xp":
        return {
          bg: "from-amber-500/90 to-orange-500/90",
          border: "border-amber-400/50",
          icon: toast.icon || "⚡",
        };
      case "level_up":
        return {
          bg: "from-purple-500/90 to-indigo-600/90",
          border: "border-purple-400/50",
          icon: toast.icon || "🆙",
        };
      case "badge":
        return {
          bg: "from-emerald-500/90 to-green-600/90",
          border: "border-emerald-400/50",
          icon: toast.icon || "🏅",
        };
      case "streak":
        return {
          bg: "from-orange-500/90 to-red-500/90",
          border: "border-orange-400/50",
          icon: toast.icon || "🔥",
        };
      case "perfect_quiz":
        return {
          bg: "from-pink-500/90 to-rose-500/90",
          border: "border-pink-400/50",
          icon: toast.icon || "💯",
        };
      default:
        return {
          bg: "from-slate-700/90 to-slate-800/90",
          border: "border-slate-500/50",
          icon: toast.icon || "ℹ️",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`pointer-events-auto transform transition-all duration-300 ease-out ${
        isVisible && !isLeaving
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`bg-gradient-to-r ${styles.bg} backdrop-blur-xl rounded-2xl p-4 border ${styles.border} shadow-2xl flex items-center gap-4`}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{styles.icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm">{toast.title}</p>
          {toast.message && (
            <p className="text-white/80 text-xs mt-0.5">{toast.message}</p>
          )}
          {toast.xpAmount && (
            <p className="text-xl font-black text-white mt-1 animate-pulse">
              +{toast.xpAmount} XP
            </p>
          )}
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => {
            setIsLeaving(true);
            setTimeout(onRemove, 300);
          }}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Demo component to trigger toast notifications
export function ToastDemo() {
  const { showToast } = useToast();

  const triggerXPToast = () => {
    showToast({
      type: "xp",
      title: "XP Earned!",
      message: "Lesson completed",
      xpAmount: 25,
    });
  };

  const triggerLevelUpToast = () => {
    showToast({
      type: "level_up",
      title: "LEVEL UP!",
      message: "You reached Communicator level!",
      icon: "💬",
    });
  };

  const triggerBadgeToast = () => {
    showToast({
      type: "badge",
      title: "Badge Unlocked!",
      message: "First Flame - Complete your first lesson",
      icon: "🔥",
    });
  };

  const triggerStreakToast = () => {
    showToast({
      type: "streak",
      title: "Streak Milestone!",
      message: "7-day streak achieved!",
      xpAmount: 100,
    });
  };

  const triggerPerfectQuizToast = () => {
    showToast({
      type: "perfect_quiz",
      title: "Perfect Score!",
      message: "100% on Core Phrases Quiz",
      xpAmount: 50,
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <span>🔔</span> Test Notifications
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={triggerXPToast}
          className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-xl text-amber-300 text-sm font-medium transition-colors"
        >
          +XP
        </button>
        <button
          onClick={triggerLevelUpToast}
          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-300 text-sm font-medium transition-colors"
        >
          Level Up
        </button>
        <button
          onClick={triggerBadgeToast}
          className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm font-medium transition-colors"
        >
          Badge
        </button>
        <button
          onClick={triggerStreakToast}
          className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-xl text-orange-300 text-sm font-medium transition-colors"
        >
          Streak
        </button>
        <button
          onClick={triggerPerfectQuizToast}
          className="px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 rounded-xl text-pink-300 text-sm font-medium transition-colors"
        >
          Perfect Quiz
        </button>
      </div>
    </div>
  );
}
