import { useState } from "react";

interface ColorClasses {
  accent: string;
  bg: string;
  border: string;
  gradient: string;
}

interface Phrase {
  id: number;
  english: string;
  spanish: string;
  phonetic: string;
  isFavorite: boolean;
}

interface SectionCoreContentProps {
  colorClasses: ColorClasses;
}

const phrases: Phrase[] = [
  { id: 1, english: "Hello, how are you?", spanish: "Hola, ¿cómo estás?", phonetic: "OH-lah, KOH-moh ehs-TAHS", isFavorite: false },
  { id: 2, english: "Nice to meet you", spanish: "Mucho gusto", phonetic: "MOO-choh GOOS-toh", isFavorite: false },
  { id: 3, english: "My name is...", spanish: "Me llamo...", phonetic: "meh YAH-moh", isFavorite: false },
  { id: 4, english: "Where are you from?", spanish: "¿De dónde eres?", phonetic: "deh DOHN-deh EH-rehs", isFavorite: false },
  { id: 5, english: "I don't understand", spanish: "No entiendo", phonetic: "noh ehn-TYEHN-doh", isFavorite: false },
  { id: 6, english: "Can you repeat that?", spanish: "¿Puedes repetir?", phonetic: "PWEH-dehs reh-peh-TEER", isFavorite: false },
  { id: 7, english: "How do you say...?", spanish: "¿Cómo se dice...?", phonetic: "KOH-moh seh DEE-seh", isFavorite: false },
  { id: 8, english: "Thank you very much", spanish: "Muchas gracias", phonetic: "MOO-chahs GRAH-syahs", isFavorite: false },
  { id: 9, english: "You're welcome", spanish: "De nada", phonetic: "deh NAH-dah", isFavorite: false },
  { id: 10, english: "Excuse me", spanish: "Disculpa / Perdón", phonetic: "dees-KOOL-pah / pehr-DOHN", isFavorite: false },
  { id: 11, english: "I'm sorry", spanish: "Lo siento", phonetic: "loh SYEHN-toh", isFavorite: false },
  { id: 12, english: "See you later", spanish: "Hasta luego", phonetic: "AHS-tah LWEH-goh", isFavorite: false },
  { id: 13, english: "Have a nice day", spanish: "Que tengas un buen día", phonetic: "keh TEHN-gahs oon bwehn DEE-ah", isFavorite: false },
  { id: 14, english: "Can you help me?", spanish: "¿Puedes ayudarme?", phonetic: "PWEH-dehs ah-yoo-DAHR-meh", isFavorite: false },
  { id: 15, english: "I speak a little Spanish", spanish: "Hablo un poco de español", phonetic: "AH-bloh oon POH-koh deh ehs-pah-NYOHL", isFavorite: false },
];

export default function SectionCoreContent({ colorClasses }: SectionCoreContentProps) {
  const [phraseList, setPhraseList] = useState<Phrase[]>(phrases);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<number | null>(null);

  const toggleFavorite = (id: number) => {
    setPhraseList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const playAudio = (id: number, language: "english" | "spanish") => {
    const audioId = `${id}-${language}`;
    setPlayingId(audioId);
    
    // Simulate audio playback
    setTimeout(() => {
      setPlayingId(null);
    }, 1500);
  };

  const startRecording = (id: number) => {
    if (recordingId === id) {
      setRecordingId(null);
    } else {
      setRecordingId(id);
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setRecordingId(null);
      }, 3000);
    }
  };

  return (
    <section className="mb-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      {/* Section Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${colorClasses.gradient} shadow-lg`}>
              <span className="text-white font-bold">B</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Core Content</h2>
              <p className="text-white/40 text-sm">15 essential phrases to master</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.accent} border ${colorClasses.border}`}>
            {phraseList.filter(p => p.isFavorite).length} saved
          </div>
        </div>
      </div>

      {/* Phrase Cards */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {phraseList.map((phrase, idx) => (
          <div
            key={phrase.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Phrase Number & Favorite */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/30 text-sm font-medium">#{phrase.id}</span>
              <button
                onClick={() => toggleFavorite(phrase.id)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  phrase.isFavorite
                    ? `${colorClasses.bg} ${colorClasses.accent}`
                    : "text-white/30 hover:text-white/60 hover:bg-white/5"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={phrase.isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>

            {/* English Phrase */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-white/40 uppercase tracking-wide">English</span>
                <button
                  onClick={() => playAudio(phrase.id, "english")}
                  className={`p-1.5 rounded-lg transition-all duration-300 ${
                    playingId === `${phrase.id}-english`
                      ? `${colorClasses.bg} ${colorClasses.accent} animate-pulse`
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
              </div>
              <p className="text-white text-xl font-medium">{phrase.english}</p>
            </div>

            {/* Spanish Phrase */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-white/40 uppercase tracking-wide">Español</span>
                <button
                  onClick={() => playAudio(phrase.id, "spanish")}
                  className={`p-1.5 rounded-lg transition-all duration-300 ${
                    playingId === `${phrase.id}-spanish`
                      ? `${colorClasses.bg} ${colorClasses.accent} animate-pulse`
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
              </div>
              <p className={`text-xl font-medium ${colorClasses.accent}`}>{phrase.spanish}</p>
              <p className="text-white/40 text-sm mt-1 italic">{phrase.phonetic}</p>
            </div>

            {/* Record Button */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <button
                onClick={() => startRecording(phrase.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  recordingId === phrase.id
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-transparent"
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${recordingId === phrase.id ? "bg-red-500 animate-pulse" : "bg-white/40"}`} />
                <span className="text-sm font-medium">
                  {recordingId === phrase.id ? "Recording..." : "Record yourself"}
                </span>
              </button>

              {/* Audio wave indicator when recording */}
              {recordingId === phrase.id && (
                <div className="flex items-end gap-0.5 h-5">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-red-400 rounded-full"
                      style={{
                        height: `${20 + Math.random() * 80}%`,
                        animation: `audioWave ${0.3 + Math.random() * 0.3}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        @keyframes audioWave {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
