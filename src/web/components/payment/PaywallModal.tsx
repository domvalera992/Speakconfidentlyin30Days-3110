import { useState, useEffect } from "react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  contentType?: string;
}

export default function PaywallModal({ isOpen, onClose, onUpgrade, contentType = "lesson" }: PaywallModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = "";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  const contentMessages: Record<string, { title: string; desc: string }> = {
    lesson: {
      title: "Unlock Full Lessons",
      desc: "Get access to 20+ comprehensive lessons with audio, exercises, and quizzes.",
    },
    audio: {
      title: "Unlock Audio Library",
      desc: "Access 250+ native speaker audio phrases for immersive learning.",
    },
    workbook: {
      title: "Unlock Workbook",
      desc: "Practice with translation, matching, and speaking exercises.",
    },
    module: {
      title: "Unlock All Modules",
      desc: "Continue your journey with advanced conversation and confidence training.",
    },
  };

  const message = contentMessages[contentType] || contentMessages.lesson;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md bg-[#0f0f15] rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        >
          <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header gradient */}
        <div className="h-32 bg-gradient-to-br from-emerald-500/30 via-teal-500/20 to-cyan-500/30 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30">
            <span className="text-4xl">🔒</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{message.title}</h2>
          <p className="text-white/60 mb-6">{message.desc}</p>

          {/* Benefits */}
          <div className="bg-white/5 rounded-2xl p-4 mb-6 text-left">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Pro includes:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span className="text-white/80 text-sm">5 complete learning modules</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span className="text-white/80 text-sm">250+ audio phrases</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span className="text-white/80 text-sm">Full workbook access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-sm">✓</span>
                <span className="text-white/80 text-sm">Lifetime access</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-white/40 line-through text-lg">$79.99</span>
              <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold px-2 py-1 rounded-full">
                56% OFF
              </span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-white/70 text-xl">$</span>
              <span className="text-4xl font-bold text-white">34.99</span>
            </div>
            <p className="text-white/40 text-sm mt-1">One-time payment</p>
          </div>

          {/* CTA */}
          <button
            onClick={onUpgrade}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25 mb-3"
          >
            Upgrade to Pro
          </button>

          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/60 text-sm transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
