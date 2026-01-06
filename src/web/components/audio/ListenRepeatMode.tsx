import { useState, useEffect, useRef } from "react";

interface AudioPhrase {
  id: string;
  english: string;
  spanish: string;
}

interface ListenRepeatModeProps {
  phrases: AudioPhrase[];
  onClose: () => void;
}

type Phase = "playing" | "pause" | "reinforcement";

const sessionOptions = [5, 10, 15, 20];

export default function ListenRepeatMode({ phrases, onClose }: ListenRepeatModeProps) {
  const [isActive, setIsActive] = useState(false);
  const [sessionLength, setSessionLength] = useState(10); // minutes
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [countdown, setCountdown] = useState(3);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(sessionLength * 60);
  const [completedPhrases, setCompletedPhrases] = useState(0);
  const [showSettings, setShowSettings] = useState(true);
  
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPhrase = phrases[currentPhraseIndex];

  // Session timer
  useEffect(() => {
    if (!isActive) return;

    sessionTimerRef.current = setInterval(() => {
      setSessionTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, [isActive]);

  // Phase transitions
  useEffect(() => {
    if (!isActive) return;

    const handlePhaseTransition = () => {
      if (phase === "playing") {
        // After playing, pause for user to repeat
        setPhase("pause");
        setCountdown(3);
      } else if (phase === "pause") {
        // Countdown during pause
        if (countdown > 1) {
          setCountdown(prev => prev - 1);
        } else {
          // After pause, play reinforcement
          setPhase("reinforcement");
        }
      } else if (phase === "reinforcement") {
        // After reinforcement, move to next phrase
        setCompletedPhrases(prev => prev + 1);
        if (currentPhraseIndex < phrases.length - 1) {
          setCurrentPhraseIndex(prev => prev + 1);
          setPhase("playing");
        } else {
          // Loop back to beginning
          setCurrentPhraseIndex(0);
          setPhase("playing");
        }
      }
    };

    const delay = phase === "pause" ? 1000 : 2000;
    phaseTimerRef.current = setTimeout(handlePhaseTransition, delay);

    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, [isActive, phase, countdown, currentPhraseIndex, phrases.length]);

  const startSession = () => {
    setShowSettings(false);
    setIsActive(true);
    setSessionTimeRemaining(sessionLength * 60);
    setCurrentPhraseIndex(0);
    setCompletedPhrases(0);
    setPhase("playing");
  };

  const pauseSession = () => {
    setIsActive(!isActive);
  };

  const stopSession = () => {
    setIsActive(false);
    setShowSettings(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((sessionLength * 60 - sessionTimeRemaining) / (sessionLength * 60)) * 100;

  if (showSettings) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0f]">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col h-full px-6 py-8 max-w-lg mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">Listen & Repeat</h1>
            <div className="w-10" />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center mb-8 border border-violet-500/30">
              <span className="text-6xl">🎧</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              Guided Practice Mode
            </h2>
            <p className="text-white/50 text-center mb-12 max-w-xs">
              Listen to each phrase, repeat during the pause, then hear it again for reinforcement
            </p>

            {/* Session Length Selection */}
            <div className="w-full mb-8">
              <p className="text-white/70 text-sm mb-4 text-center">Select session length</p>
              <div className="grid grid-cols-4 gap-3">
                {sessionOptions.map(mins => (
                  <button
                    key={mins}
                    onClick={() => setSessionLength(mins)}
                    className={`py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      sessionLength === mins
                        ? "bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/30"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {mins}<span className="text-sm ml-0.5">min</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Phrase count info */}
            <p className="text-white/40 text-sm mb-8">
              {phrases.length} phrases available
            </p>
          </div>

          {/* Start Button */}
          <button
            onClick={startSession}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-lg shadow-xl shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
          >
            Start Practice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0f]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-500 ${
            phase === "playing" ? "bg-violet-500/15" : 
            phase === "pause" ? "bg-amber-500/15" : "bg-cyan-500/15"
          }`} 
        />
        <div 
          className={`absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-500 ${
            phase === "playing" ? "bg-cyan-500/10" : 
            phase === "pause" ? "bg-orange-500/10" : "bg-violet-500/10"
          }`} 
        />
      </div>

      <div className="relative z-10 flex flex-col h-full px-6 py-8 max-w-lg mx-auto">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={stopSession}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Session Timer */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5">
            <span className="text-2xl">⏱️</span>
            <span className="text-white font-mono text-lg">{formatTime(sessionTimeRemaining)}</span>
          </div>
          
          <div className="w-10" />
        </div>

        {/* Session Progress Bar */}
        <div className="mb-8">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/40">
            <span>{completedPhrases} phrases completed</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Phase Indicator */}
          <div className={`mb-8 px-6 py-2 rounded-full transition-all duration-300 ${
            phase === "playing" 
              ? "bg-violet-500/20 text-violet-300" 
              : phase === "pause" 
                ? "bg-amber-500/20 text-amber-300" 
                : "bg-cyan-500/20 text-cyan-300"
          }`}>
            {phase === "playing" && "🔊 Listen"}
            {phase === "pause" && "🎤 Your turn - Repeat!"}
            {phase === "reinforcement" && "🔁 Listen again"}
          </div>

          {/* Countdown Circle (during pause) */}
          {phase === "pause" && (
            <div className="relative w-40 h-40 mb-8">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="url(#countdownGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - countdown / 3)}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="countdownGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-amber-400">{countdown}</span>
              </div>
            </div>
          )}

          {/* Current Phrase Card */}
          <div className={`w-full p-8 rounded-3xl bg-white/5 border transition-all duration-300 ${
            phase === "playing" 
              ? "border-violet-500/30 shadow-lg shadow-violet-500/10" 
              : phase === "pause" 
                ? "border-amber-500/30 shadow-lg shadow-amber-500/10" 
                : "border-cyan-500/30 shadow-lg shadow-cyan-500/10"
          }`}>
            <p className="text-2xl font-bold text-white text-center mb-4">
              {currentPhrase?.english}
            </p>
            <p className="text-xl text-amber-400 text-center">
              {currentPhrase?.spanish}
            </p>
          </div>

          {/* Phrase Counter */}
          <p className="mt-6 text-white/40 text-sm">
            Phrase {currentPhraseIndex + 1} of {phrases.length}
          </p>

          {/* Waveform Animation */}
          {(phase === "playing" || phase === "reinforcement") && (
            <div className="flex items-center justify-center gap-1 mt-8 h-12">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all ${
                    phase === "playing" ? "bg-violet-500" : "bg-cyan-500"
                  }`}
                  style={{
                    height: `${20 + Math.sin((Date.now() * 0.005) + i * 0.5) * 15}px`,
                    animation: isActive ? "pulse 0.5s ease-in-out infinite" : "none",
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 pt-8">
          {/* Skip Back */}
          <button
            onClick={() => setCurrentPhraseIndex(Math.max(0, currentPhraseIndex - 1))}
            className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={pauseSession}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30 hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            {isActive ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Skip Forward */}
          <button
            onClick={() => {
              setCurrentPhraseIndex(Math.min(phrases.length - 1, currentPhraseIndex + 1));
              setPhase("playing");
            }}
            className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
