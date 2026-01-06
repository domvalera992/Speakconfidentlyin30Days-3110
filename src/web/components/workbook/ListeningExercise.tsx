import { useState, useEffect, useRef } from "react";

interface ListeningQuestion {
  id: number;
  phrase: string;
  audio: string; // Simulated audio identifier
  options: string[];
  correctIndex: number;
  difficulty: "easy" | "medium" | "hard";
}

const listeningQuestions: ListeningQuestion[] = [
  // Easy
  { id: 1, phrase: "Hola", audio: "hola", options: ["Hello", "Goodbye", "Thank you", "Please"], correctIndex: 0, difficulty: "easy" },
  { id: 2, phrase: "Gracias", audio: "gracias", options: ["Sorry", "Thank you", "Hello", "Goodbye"], correctIndex: 1, difficulty: "easy" },
  { id: 3, phrase: "Adiós", audio: "adios", options: ["Hello", "Please", "Goodbye", "Yes"], correctIndex: 2, difficulty: "easy" },
  { id: 4, phrase: "Por favor", audio: "porfavor", options: ["Thank you", "Sorry", "Yes", "Please"], correctIndex: 3, difficulty: "easy" },
  { id: 5, phrase: "Sí", audio: "si", options: ["Yes", "No", "Maybe", "Never"], correctIndex: 0, difficulty: "easy" },
  { id: 6, phrase: "No", audio: "no", options: ["Yes", "No", "Maybe", "Always"], correctIndex: 1, difficulty: "easy" },
  
  // Medium
  { id: 7, phrase: "Buenos días", audio: "buenosdias", options: ["Good night", "Good afternoon", "Good morning", "Good evening"], correctIndex: 2, difficulty: "medium" },
  { id: 8, phrase: "Buenas noches", audio: "buenasnoches", options: ["Good morning", "Good night", "Good afternoon", "Goodbye"], correctIndex: 1, difficulty: "medium" },
  { id: 9, phrase: "¿Cómo estás?", audio: "comoestas", options: ["What's your name?", "How old are you?", "How are you?", "Where are you?"], correctIndex: 2, difficulty: "medium" },
  { id: 10, phrase: "Mucho gusto", audio: "muchogusto", options: ["Thank you very much", "Nice to meet you", "You're welcome", "I'm sorry"], correctIndex: 1, difficulty: "medium" },
  { id: 11, phrase: "¿Dónde está el baño?", audio: "dondeelbaño", options: ["Where is the exit?", "Where is the hotel?", "Where is the bathroom?", "Where is the restaurant?"], correctIndex: 2, difficulty: "medium" },
  { id: 12, phrase: "No entiendo", audio: "noentiendo", options: ["I understand", "I don't know", "I don't understand", "I don't remember"], correctIndex: 2, difficulty: "medium" },
  { id: 13, phrase: "¿Cuánto cuesta?", audio: "cuantocuesta", options: ["What time is it?", "How much does it cost?", "How many are there?", "How do you say?"], correctIndex: 1, difficulty: "medium" },
  { id: 14, phrase: "La cuenta, por favor", audio: "lacuenta", options: ["The menu, please", "The check, please", "The table, please", "The waiter, please"], correctIndex: 1, difficulty: "medium" },
  
  // Hard
  { id: 15, phrase: "¿Podría hablar más despacio?", audio: "masdespadio", options: ["Could you speak louder?", "Could you repeat that?", "Could you speak slower?", "Could you help me?"], correctIndex: 2, difficulty: "hard" },
  { id: 16, phrase: "Tengo una reservación", audio: "reservacion", options: ["I have a question", "I have a problem", "I have a reservation", "I have a recommendation"], correctIndex: 2, difficulty: "hard" },
  { id: 17, phrase: "¿Me puede recomendar algo?", audio: "recomendar", options: ["Can you help me?", "Can you recommend something?", "Can you repeat that?", "Can you bring me the menu?"], correctIndex: 1, difficulty: "hard" },
  { id: 18, phrase: "Soy alérgico a los mariscos", audio: "alergico", options: ["I'm allergic to nuts", "I'm allergic to dairy", "I'm allergic to seafood", "I'm allergic to gluten"], correctIndex: 2, difficulty: "hard" },
  { id: 19, phrase: "¿A qué hora sale el vuelo?", audio: "vuelo", options: ["When does the bus arrive?", "When does the flight depart?", "When does the train leave?", "When is check-out?"], correctIndex: 1, difficulty: "hard" },
  { id: 20, phrase: "Necesito llamar a un doctor", audio: "doctor", options: ["I need to call a taxi", "I need to call the police", "I need to call a doctor", "I need to call my family"], correctIndex: 2, difficulty: "hard" },
];

interface ListeningExerciseProps {
  onBack: () => void;
}

export default function ListeningExercise({ onBack }: ListeningExerciseProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [playCount, setPlayCount] = useState(0);
  
  const audioTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
    };
  }, []);

  const currentQuestion = listeningQuestions[currentIndex];
  const totalQuestions = listeningQuestions.length;
  const progress = (answeredQuestions.length / totalQuestions) * 100;

  const playAudio = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setPlayCount(playCount + 1);
    
    // Simulate audio playback with Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.phrase);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
      };
      
      speechSynthesis.speak(utterance);
    } else {
      // Fallback: simulate audio duration
      audioTimeoutRef.current = setTimeout(() => {
        setIsPlaying(false);
      }, 1500);
    }
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (showResult) return;
    
    setSelectedOption(optionIndex);
    setShowResult(true);
    
    const isCorrect = optionIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
      setPlayCount(0);
    }
  };

  const resetExercise = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    setPlayCount(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "text-emerald-400 bg-emerald-500/20";
      case "medium": return "text-amber-400 bg-amber-500/20";
      case "hard": return "text-rose-400 bg-rose-500/20";
      default: return "text-white/50 bg-white/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl" />
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-violet-500/20">
              <span className="text-2xl">👂</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Listening</h1>
              <p className="text-white/50 text-sm">Identify phrases from audio</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="text-violet-400 text-sm font-medium">Score: {score}/{answeredQuestions.length}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`mb-6 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            {/* Difficulty Badge */}
            <div className="flex justify-between items-center mb-6">
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-white/40 text-xs">Played: {playCount}x</span>
            </div>

            {/* Audio Player */}
            <div className="text-center mb-8">
              <p className="text-white/50 text-sm mb-4">Listen and select the correct translation</p>
              
              <button
                onClick={playAudio}
                disabled={isPlaying}
                className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
                  isPlaying 
                    ? "bg-violet-500/30 border-2 border-violet-500 animate-pulse" 
                    : "bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-2 border-violet-500/50 hover:border-violet-400 hover:scale-105"
                }`}
              >
                {isPlaying ? (
                  <div className="flex gap-1">
                    <div className="w-1 h-8 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-8 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-8 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <svg className="w-12 h-12 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              <p className="text-white/40 text-sm mt-3">
                {isPlaying ? "Playing..." : "Tap to play audio"}
              </p>
              
              {/* Replay Button */}
              {playCount > 0 && !isPlaying && (
                <button
                  onClick={playAudio}
                  className="mt-2 text-violet-400 text-sm hover:text-violet-300 transition-colors flex items-center justify-center gap-1 mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Replay
                </button>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                const showCorrectHighlight = showResult && isCorrect;
                const showWrongHighlight = showResult && isSelected && !isCorrect;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all duration-300 flex items-center gap-3 ${
                      showCorrectHighlight
                        ? "bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400"
                        : showWrongHighlight
                          ? "bg-rose-500/20 border-2 border-rose-500/50 text-rose-400"
                          : isSelected
                            ? "bg-violet-500/20 border-2 border-violet-500/50 text-white"
                            : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      showCorrectHighlight ? "bg-emerald-500/30" : showWrongHighlight ? "bg-rose-500/30" : "bg-white/10"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {showCorrectHighlight && (
                      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                    {showWrongHighlight && (
                      <svg className="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className={`mt-4 p-4 rounded-xl ${
                selectedOption === currentQuestion.correctIndex 
                  ? "bg-emerald-500/10 border border-emerald-500/20" 
                  : "bg-rose-500/10 border border-rose-500/20"
              }`}>
                {selectedOption === currentQuestion.correctIndex ? (
                  <p className="text-emerald-400 font-medium">🎉 Correct!</p>
                ) : (
                  <div>
                    <p className="text-rose-400 font-medium mb-1">Not quite right</p>
                    <p className="text-white/60 text-sm">
                      The phrase was: <span className="text-white font-medium">&ldquo;{currentQuestion.phrase}&rdquo;</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {showResult && (
          <div className={`space-y-3 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button
              onClick={nextQuestion}
              disabled={currentIndex >= totalQuestions - 1}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                currentIndex >= totalQuestions - 1
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600"
              }`}
            >
              {currentIndex >= totalQuestions - 1 ? "Exercise Complete!" : "Next Question →"}
            </button>
            
            {currentIndex >= totalQuestions - 1 && (
              <button
                onClick={resetExercise}
                className="w-full py-4 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              >
                Start Over
              </button>
            )}
          </div>
        )}

        {/* Tip */}
        {!showResult && playCount === 0 && (
          <p className="text-center text-white/30 text-sm mt-4">
            💡 Listen carefully, you can replay as many times as needed
          </p>
        )}
      </div>
    </div>
  );
}
