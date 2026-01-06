import { useState, useRef, useEffect } from "react";

interface ColorClasses {
  accent: string;
  bg: string;
  border: string;
  gradient: string;
}

interface DialogueLine {
  id: number;
  speaker: "waiter" | "you";
  english: string;
  spanish: string;
  isUserResponse: boolean;
}

interface SectionScenarioProps {
  colorClasses: ColorClasses;
}

const dialogue: DialogueLine[] = [
  { id: 1, speaker: "waiter", english: "Good evening! Welcome to La Casa.", spanish: "¡Buenas noches! Bienvenido a La Casa.", isUserResponse: false },
  { id: 2, speaker: "you", english: "Hello, I have a reservation for two.", spanish: "Hola, tengo una reservación para dos.", isUserResponse: true },
  { id: 3, speaker: "waiter", english: "Of course! Under what name?", spanish: "¡Por supuesto! ¿A qué nombre?", isUserResponse: false },
  { id: 4, speaker: "you", english: "Under my name, García.", spanish: "A mi nombre, García.", isUserResponse: true },
  { id: 5, speaker: "waiter", english: "Perfect! Here is your menu. The special today is paella.", spanish: "¡Perfecto! Aquí está su menú. El especial de hoy es paella.", isUserResponse: false },
  { id: 6, speaker: "you", english: "Thank you. Could I also get some water please?", spanish: "Gracias. ¿Podría traerme agua también, por favor?", isUserResponse: true },
];

export default function SectionScenario({ colorClasses }: SectionScenarioProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState<Record<number, boolean>>({});
  const [playingRecording, setPlayingRecording] = useState<number | null>(null);
  const [audioPaused, setAudioPaused] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startDialogue = () => {
    setIsPlaying(true);
    setCurrentLine(0);
    playNextLine(0);
  };

  const playNextLine = (lineIndex: number) => {
    if (lineIndex >= dialogue.length) {
      setIsPlaying(false);
      return;
    }

    setCurrentLine(lineIndex);
    const line = dialogue[lineIndex];
    
    // Simulate audio duration based on text length
    const duration = line.isUserResponse ? 4000 : 2500 + line.spanish.length * 30;
    
    if (line.isUserResponse) {
      // Pause for user response
      setAudioPaused(true);
    } else {
      intervalRef.current = setTimeout(() => {
        playNextLine(lineIndex + 1);
      }, duration);
    }
  };

  const continueDialogue = () => {
    setAudioPaused(false);
    playNextLine(currentLine + 1);
  };

  const pauseDialogue = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    setIsPlaying(false);
    setAudioPaused(false);
  };

  const toggleRecording = (lineId: number) => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecording({ ...hasRecording, [lineId]: true });
    } else {
      setIsRecording(true);
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        setHasRecording({ ...hasRecording, [lineId]: true });
      }, 3000);
    }
  };

  const playRecording = (lineId: number) => {
    setPlayingRecording(lineId);
    setTimeout(() => {
      setPlayingRecording(null);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="mb-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      {/* Section Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${colorClasses.gradient} shadow-lg`}>
            <span className="text-white font-bold">D</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Real-Life Scenario</h2>
            <p className="text-white/40 text-sm">Practice a restaurant conversation</p>
          </div>
        </div>
      </div>

      {/* Scenario Illustration */}
      <div className="relative h-48 bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-red-900/40 overflow-hidden">
        {/* Restaurant Scene Decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 text-4xl">🍷</div>
          <div className="absolute top-8 right-8 text-4xl">🍽️</div>
          <div className="absolute bottom-4 left-12 text-4xl">🥘</div>
          <div className="absolute bottom-6 right-4 text-3xl">🌿</div>
        </div>
        
        {/* Central Scene */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-8 mb-4">
              {/* Waiter */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-1 border-2 border-white/20">
                  👨‍🍳
                </div>
                <p className="text-white/60 text-xs">Waiter</p>
              </div>
              {/* Table */}
              <div className="text-4xl">🍽️</div>
              {/* You */}
              <div className="text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${colorClasses.gradient} flex items-center justify-center text-3xl mb-1 border-2 border-white/30`}>
                  👤
                </div>
                <p className={`${colorClasses.accent} text-xs font-medium`}>You</p>
              </div>
            </div>
            <h3 className="text-white text-lg font-medium">At the Restaurant</h3>
            <p className="text-white/50 text-sm">La Casa - A Spanish Restaurant</p>
          </div>
        </div>
      </div>

      {/* Dialogue Script */}
      <div className="p-5 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-medium flex items-center gap-2">
            <span>📜</span> Dialogue Script
          </h4>
          {!isPlaying ? (
            <button
              onClick={startDialogue}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${colorClasses.gradient} text-white text-sm font-medium hover:scale-105 transition-transform`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Dialogue
            </button>
          ) : (
            <button
              onClick={pauseDialogue}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
              Pause
            </button>
          )}
        </div>

        {/* Dialogue Lines */}
        <div className="space-y-4">
          {dialogue.map((line, idx) => (
            <div
              key={line.id}
              className={`transition-all duration-300 ${
                isPlaying && idx === currentLine
                  ? "scale-[1.02]"
                  : isPlaying && idx < currentLine
                  ? "opacity-50"
                  : isPlaying && idx > currentLine
                  ? "opacity-30"
                  : ""
              }`}
            >
              <div
                className={`p-4 rounded-xl ${
                  line.speaker === "you"
                    ? `${colorClasses.bg} border ${colorClasses.border}`
                    : "bg-white/5 border border-white/10"
                } ${isPlaying && idx === currentLine ? "ring-2 ring-white/30" : ""}`}
              >
                {/* Speaker Label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{line.speaker === "you" ? "👤" : "👨‍🍳"}</span>
                  <span className={`text-sm font-medium ${line.speaker === "you" ? colorClasses.accent : "text-white/60"}`}>
                    {line.speaker === "you" ? "You" : "Waiter"}
                  </span>
                  {line.isUserResponse && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">Your turn</span>
                  )}
                </div>

                {/* Bilingual Text */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/40 text-xs mb-1">English</p>
                    <p className="text-white">{line.english}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Español</p>
                    <p className={colorClasses.accent}>{line.spanish}</p>
                  </div>
                </div>

                {/* User Response Actions */}
                {line.isUserResponse && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3 flex-wrap">
                    {/* Record Button */}
                    <button
                      onClick={() => toggleRecording(line.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                        isRecording
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-white/40"}`} />
                      <span className="text-sm">{isRecording ? "Recording..." : "Record yourself"}</span>
                    </button>

                    {/* Play Recording Button */}
                    {hasRecording[line.id] && (
                      <button
                        onClick={() => playRecording(line.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                          playingRecording === line.id
                            ? `${colorClasses.bg} ${colorClasses.accent}`
                            : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span className="text-sm">Play recording</span>
                      </button>
                    )}

                    {/* Continue Button (when paused for response) */}
                    {audioPaused && currentLine === idx && (
                      <button
                        onClick={continueDialogue}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${colorClasses.gradient} text-white text-sm font-medium hover:scale-105 transition-transform ml-auto`}
                      >
                        Continue
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
