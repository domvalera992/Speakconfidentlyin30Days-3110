import { useState, useEffect } from "react";

interface WelcomeScreenProps {
  onSelectLanguage: (lang: "english" | "spanish") => void;
}

export default function WelcomeScreen({ onSelectLanguage }: WelcomeScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-6 py-12">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center text-center transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-xl shadow-emerald-500/25">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
        </div>

        {/* Tagline */}
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
            Master a New Language
          </span>
          <br />
          <span className="text-white/90">For Life</span>
        </h1>

        <p className="text-lg text-white/60 max-w-md mb-12">
          Lifetime access to our proven method—learn at your own pace, forever
        </p>

        {/* Animated illustration of diverse people talking */}
        <div className={`mb-12 transition-all duration-1000 delay-300 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative w-80 h-48">
            {/* Person 1 - left */}
            <div className="absolute left-4 top-8 animate-float">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                <span className="text-2xl">👩🏽</span>
              </div>
              <div className="absolute -right-2 top-0 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-sm animate-float-delayed">
                Hola! 👋
              </div>
            </div>

            {/* Person 2 - center */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 animate-float-delayed">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-3xl">👨🏻</span>
              </div>
              <div className="absolute -left-8 -top-2 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-sm animate-float">
                Hello! ✨
              </div>
            </div>

            {/* Person 3 - right */}
            <div className="absolute right-4 top-10 animate-float">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                <span className="text-xl">👩🏿</span>
              </div>
              <div className="absolute -left-4 -top-1 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2 text-sm animate-float-delayed">
                ¡Hola!
              </div>
            </div>

            {/* Speech lines connecting them */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 192">
              <path
                d="M80 60 Q160 100 240 50"
                fill="none"
                stroke="url(#line-gradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="animate-dash"
              />
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Language Selection Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 w-full max-w-lg transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <button
            onClick={() => onSelectLanguage("english")}
            className="group relative flex-1 py-5 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">🇬🇧</span>
              <div className="text-left">
                <p className="text-white/70 text-sm">I want to learn</p>
                <p className="text-white font-bold text-xl tracking-wide">ENGLISH</p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => onSelectLanguage("spanish")}
            className="group relative flex-1 py-5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">🇪🇸</span>
              <div className="text-left">
                <p className="text-white/70 text-sm">Quiero aprender</p>
                <p className="text-white font-bold text-xl tracking-wide">ESPAÑOL</p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3.5s ease-in-out infinite;
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
