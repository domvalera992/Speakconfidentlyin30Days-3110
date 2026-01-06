import { useState, useEffect, useRef } from "react";

interface SpeakingPrompt {
  id: number;
  scenario: string;
  icon: string;
  prompt: string;
  suggestedResponse: string;
  tips: string[];
  difficulty: "easy" | "medium" | "hard";
}

const speakingPrompts: SpeakingPrompt[] = [
  {
    id: 1,
    scenario: "Meeting Someone New",
    icon: "👋",
    prompt: "Introduce yourself and say where you're from",
    suggestedResponse: "Hola, me llamo [Name]. Soy de [Country/City]. Mucho gusto.",
    tips: ["Keep it simple", "Speak clearly", "Smile while speaking"],
    difficulty: "easy",
  },
  {
    id: 2,
    scenario: "At a Restaurant",
    icon: "🍽️",
    prompt: "Order a coffee and a sandwich",
    suggestedResponse: "Buenos días. Me gustaría un café con leche y un sándwich, por favor.",
    tips: ["Use polite phrases", "Specify what type if needed"],
    difficulty: "easy",
  },
  {
    id: 3,
    scenario: "Asking for Directions",
    icon: "🗺️",
    prompt: "Ask how to get to the train station",
    suggestedResponse: "Disculpe, ¿cómo puedo llegar a la estación de tren?",
    tips: ["Start with 'disculpe' to be polite", "Listen carefully to the response"],
    difficulty: "easy",
  },
  {
    id: 4,
    scenario: "At a Hotel",
    icon: "🏨",
    prompt: "Check in and ask about wifi",
    suggestedResponse: "Buenas tardes. Tengo una reservación a nombre de [Name]. ¿Cuál es la contraseña del wifi?",
    tips: ["Have your reservation info ready", "Ask about breakfast too"],
    difficulty: "medium",
  },
  {
    id: 5,
    scenario: "Shopping",
    icon: "🛍️",
    prompt: "Ask if they have this shirt in a different size",
    suggestedResponse: "¿Tiene esta camisa en una talla más grande/pequeña?",
    tips: ["Point to the item", "Know basic size terms"],
    difficulty: "medium",
  },
  {
    id: 6,
    scenario: "Making a Phone Call",
    icon: "📞",
    prompt: "Call to make a reservation for dinner",
    suggestedResponse: "Buenas tardes. Quisiera hacer una reservación para esta noche a las ocho, para dos personas.",
    tips: ["Speak slowly on the phone", "Confirm the details"],
    difficulty: "medium",
  },
  {
    id: 7,
    scenario: "At the Doctor",
    icon: "🏥",
    prompt: "Explain that you have a headache and fever",
    suggestedResponse: "Doctor, me duele la cabeza y tengo fiebre desde ayer.",
    tips: ["Describe symptoms clearly", "Mention how long you've had them"],
    difficulty: "medium",
  },
  {
    id: 8,
    scenario: "Emergency",
    icon: "🚨",
    prompt: "Call for help - someone is injured",
    suggestedResponse: "¡Ayuda! ¡Necesitamos una ambulancia! Hay una persona herida en [location].",
    tips: ["Stay calm", "Give your location clearly"],
    difficulty: "hard",
  },
  {
    id: 9,
    scenario: "Job Interview",
    icon: "💼",
    prompt: "Explain your work experience",
    suggestedResponse: "Tengo cinco años de experiencia en [field]. Trabajé en [company] como [position].",
    tips: ["Be specific about your experience", "Highlight achievements"],
    difficulty: "hard",
  },
  {
    id: 10,
    scenario: "Making Friends",
    icon: "🤝",
    prompt: "Invite someone to grab coffee sometime",
    suggestedResponse: "Oye, ¿te gustaría tomar un café algún día? Me caes muy bien.",
    tips: ["Be casual and friendly", "Suggest a specific day if possible"],
    difficulty: "medium",
  },
  {
    id: 11,
    scenario: "At the Bank",
    icon: "🏦",
    prompt: "Ask to open a bank account",
    suggestedResponse: "Buenos días. Me gustaría abrir una cuenta de ahorros. ¿Qué documentos necesito?",
    tips: ["Bring your passport/ID", "Ask about fees"],
    difficulty: "hard",
  },
  {
    id: 12,
    scenario: "Taxi Ride",
    icon: "🚕",
    prompt: "Tell the driver your destination and ask how long it will take",
    suggestedResponse: "Buenas tardes. ¿Me puede llevar al aeropuerto, por favor? ¿Cuánto tiempo tarda?",
    tips: ["Have the address ready", "Confirm the price beforehand"],
    difficulty: "easy",
  },
  {
    id: 13,
    scenario: "Complaining",
    icon: "😤",
    prompt: "Politely complain that your food is cold",
    suggestedResponse: "Disculpe, pero mi comida está fría. ¿Podría calentarla, por favor?",
    tips: ["Stay polite", "Be specific about the issue"],
    difficulty: "medium",
  },
  {
    id: 14,
    scenario: "Telling a Story",
    icon: "📖",
    prompt: "Tell someone about your weekend",
    suggestedResponse: "El fin de semana pasado fui a la playa con mis amigos. Nadamos y comimos mariscos. ¡Fue increíble!",
    tips: ["Use past tense", "Add details for interest"],
    difficulty: "hard",
  },
  {
    id: 15,
    scenario: "Apologizing",
    icon: "🙏",
    prompt: "Apologize for being late to a meeting",
    suggestedResponse: "Lo siento mucho por llegar tarde. Había mucho tráfico. No volverá a pasar.",
    tips: ["Be sincere", "Give a brief explanation"],
    difficulty: "medium",
  },
];

interface SpeakingExerciseProps {
  onBack: () => void;
}

export default function SpeakingExercise({ onBack }: SpeakingExerciseProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSuggested, setShowSuggested] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [completedPrompts, setCompletedPrompts] = useState<Set<number>>(new Set());
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioUrlRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    };
  }, []);

  const currentPrompt = speakingPrompts[currentIndex];
  const totalPrompts = speakingPrompts.length;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = URL.createObjectURL(audioBlob);
        setHasRecording(true);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Unable to access microphone. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const playRecording = () => {
    if (audioUrlRef.current && !isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(audioUrlRef.current);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const reRecord = () => {
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    audioUrlRef.current = null;
    setHasRecording(false);
    setShowSuggested(false);
  };

  const markComplete = () => {
    setCompletedPrompts(prev => new Set([...prev, currentPrompt.id]));
    nextPrompt();
  };

  const nextPrompt = () => {
    if (currentIndex < totalPrompts - 1) {
      setCurrentIndex(currentIndex + 1);
      reRecord();
    }
  };

  const previousPrompt = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      reRecord();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-emerald-400 bg-emerald-500/20";
      case "medium": return "text-amber-400 bg-amber-500/20";
      case "hard": return "text-rose-400 bg-rose-500/20";
      default: return "text-white/50 bg-white/10";
    }
  };

  const progress = (completedPrompts.size / totalPrompts) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-rose-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-pink-500/8 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className={`mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Workbook
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center border border-rose-500/20">
              <span className="text-2xl">🎤</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Speaking</h1>
              <p className="text-white/50 text-sm">Practice real-life scenarios</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Prompt {currentIndex + 1} of {totalPrompts}</span>
            <span className="text-rose-400 text-sm font-medium">Completed: {completedPrompts.size}/{totalPrompts}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Scenario Card */}
        <div className={`mb-6 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentPrompt.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-white">{currentPrompt.scenario}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getDifficultyColor(currentPrompt.difficulty)}`}>
                    {currentPrompt.difficulty}
                  </span>
                </div>
              </div>
              {completedPrompts.has(currentPrompt.id) && (
                <span className="text-emerald-400 text-2xl">✓</span>
              )}
            </div>

            {/* Prompt */}
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 mb-6">
              <p className="text-white/40 text-xs mb-1">YOUR TASK:</p>
              <p className="text-white font-medium text-lg">{currentPrompt.prompt}</p>
            </div>

            {/* Tips */}
            <div className="mb-6">
              <p className="text-white/40 text-sm mb-2">💡 Tips:</p>
              <div className="flex flex-wrap gap-2">
                {currentPrompt.tips.map((tip, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-sm">
                    {tip}
                  </span>
                ))}
              </div>
            </div>

            {/* Recording Area */}
            <div className="text-center py-6">
              {!isRecording && !hasRecording && (
                <button
                  onClick={startRecording}
                  className="w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-rose-500/30"
                >
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93h2c0 2.76 2.24 5 5 5s5-2.24 5-5h2c0 4.08-3.06 7.44-7 7.93V22h-2v-6.07z"/>
                  </svg>
                </button>
              )}

              {isRecording && (
                <div>
                  <button
                    onClick={stopRecording}
                    className="w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-rose-500 animate-pulse transition-all duration-300"
                  >
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="6" width="12" height="12" rx="2"/>
                    </svg>
                  </button>
                  <p className="text-rose-400 font-mono text-xl mt-4">{formatTime(recordingTime)}</p>
                  <p className="text-white/40 text-sm mt-1">Recording... Tap to stop</p>
                </div>
              )}

              {hasRecording && !isRecording && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={isPlaying ? stopPlaying : playRecording}
                      className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300"
                    >
                      {isPlaying ? (
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="5" width="4" height="14" rx="1"/>
                          <rect x="14" y="5" width="4" height="14" rx="1"/>
                        </svg>
                      ) : (
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={reRecord}
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all duration-300"
                    >
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-white/40 text-sm">
                    {isPlaying ? "Playing..." : `Recording: ${formatTime(recordingTime)}`}
                  </p>
                </div>
              )}

              {!isRecording && !hasRecording && (
                <p className="text-white/40 text-sm mt-3">Tap the microphone to start recording</p>
              )}
            </div>

            {/* Suggested Response */}
            {hasRecording && (
              <div className="mt-4">
                <button
                  onClick={() => setShowSuggested(!showSuggested)}
                  className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">📝 View suggested response</span>
                    <svg className={`w-5 h-5 text-white/40 transition-transform ${showSuggested ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {showSuggested && (
                  <div className="mt-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <p className="text-white/40 text-xs mb-2">SUGGESTED RESPONSE:</p>
                    <p className="text-white font-medium">{currentPrompt.suggestedResponse}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-3 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {hasRecording && (
            <button
              onClick={markComplete}
              className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 transition-all duration-300"
            >
              {completedPrompts.has(currentPrompt.id) ? "Completed ✓" : "Mark as Complete"}
            </button>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={previousPrompt}
              disabled={currentIndex === 0}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                currentIndex === 0 
                  ? "bg-white/5 text-white/30 cursor-not-allowed" 
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              ← Previous
            </button>
            <button
              onClick={nextPrompt}
              disabled={currentIndex === totalPrompts - 1}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                currentIndex === totalPrompts - 1 
                  ? "bg-white/5 text-white/30 cursor-not-allowed" 
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
