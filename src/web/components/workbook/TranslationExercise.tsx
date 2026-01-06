import { useState, useEffect } from "react";

interface TranslationQuestion {
  id: number;
  english: string;
  spanish: string;
  difficulty: "easy" | "medium" | "hard";
}

const englishToSpanishQuestions: TranslationQuestion[] = [
  // Easy
  { id: 1, english: "Hello", spanish: "Hola", difficulty: "easy" },
  { id: 2, english: "Goodbye", spanish: "Adiós", difficulty: "easy" },
  { id: 3, english: "Thank you", spanish: "Gracias", difficulty: "easy" },
  { id: 4, english: "Please", spanish: "Por favor", difficulty: "easy" },
  { id: 5, english: "Yes", spanish: "Sí", difficulty: "easy" },
  { id: 6, english: "No", spanish: "No", difficulty: "easy" },
  { id: 7, english: "Good morning", spanish: "Buenos días", difficulty: "easy" },
  { id: 8, english: "Good night", spanish: "Buenas noches", difficulty: "easy" },
  { id: 9, english: "How are you?", spanish: "¿Cómo estás?", difficulty: "easy" },
  { id: 10, english: "I am fine", spanish: "Estoy bien", difficulty: "easy" },
  // Medium
  { id: 11, english: "What is your name?", spanish: "¿Cómo te llamas?", difficulty: "medium" },
  { id: 12, english: "My name is...", spanish: "Me llamo...", difficulty: "medium" },
  { id: 13, english: "Where is the bathroom?", spanish: "¿Dónde está el baño?", difficulty: "medium" },
  { id: 14, english: "I don't understand", spanish: "No entiendo", difficulty: "medium" },
  { id: 15, english: "Can you help me?", spanish: "¿Puede ayudarme?", difficulty: "medium" },
  { id: 16, english: "How much does it cost?", spanish: "¿Cuánto cuesta?", difficulty: "medium" },
  { id: 17, english: "I would like...", spanish: "Me gustaría...", difficulty: "medium" },
  { id: 18, english: "The check, please", spanish: "La cuenta, por favor", difficulty: "medium" },
  { id: 19, english: "I need help", spanish: "Necesito ayuda", difficulty: "medium" },
  { id: 20, english: "Excuse me", spanish: "Disculpe", difficulty: "medium" },
  // Hard
  { id: 21, english: "Could you speak more slowly?", spanish: "¿Podría hablar más despacio?", difficulty: "hard" },
  { id: 22, english: "I have a reservation", spanish: "Tengo una reservación", difficulty: "hard" },
  { id: 23, english: "What do you recommend?", spanish: "¿Qué recomienda?", difficulty: "hard" },
  { id: 24, english: "I'm allergic to...", spanish: "Soy alérgico a...", difficulty: "hard" },
  { id: 25, english: "Can I pay with credit card?", spanish: "¿Puedo pagar con tarjeta?", difficulty: "hard" },
];

const spanishToEnglishQuestions: TranslationQuestion[] = [
  { id: 101, english: "Welcome", spanish: "Bienvenido", difficulty: "easy" },
  { id: 102, english: "See you later", spanish: "Hasta luego", difficulty: "easy" },
  { id: 103, english: "You're welcome", spanish: "De nada", difficulty: "easy" },
  { id: 104, english: "Sorry", spanish: "Lo siento", difficulty: "easy" },
  { id: 105, english: "Of course", spanish: "Por supuesto", difficulty: "easy" },
  { id: 106, english: "Maybe", spanish: "Quizás", difficulty: "medium" },
  { id: 107, english: "I love you", spanish: "Te quiero", difficulty: "easy" },
  { id: 108, english: "Water", spanish: "Agua", difficulty: "easy" },
  { id: 109, english: "Food", spanish: "Comida", difficulty: "easy" },
  { id: 110, english: "Money", spanish: "Dinero", difficulty: "easy" },
  { id: 111, english: "What time is it?", spanish: "¿Qué hora es?", difficulty: "medium" },
  { id: 112, english: "I'm hungry", spanish: "Tengo hambre", difficulty: "medium" },
  { id: 113, english: "I'm tired", spanish: "Estoy cansado", difficulty: "medium" },
  { id: 114, english: "Let's go", spanish: "Vamos", difficulty: "medium" },
  { id: 115, english: "Wait a moment", spanish: "Espera un momento", difficulty: "medium" },
  { id: 116, english: "It doesn't matter", spanish: "No importa", difficulty: "medium" },
  { id: 117, english: "I miss you", spanish: "Te extraño", difficulty: "medium" },
  { id: 118, english: "Take care", spanish: "Cuídate", difficulty: "medium" },
  { id: 119, english: "Nice to meet you", spanish: "Mucho gusto", difficulty: "medium" },
  { id: 120, english: "Have a good day", spanish: "Que tengas un buen día", difficulty: "hard" },
];

type TranslationMode = "en-to-es" | "es-to-en";

interface TranslationExerciseProps {
  onBack: () => void;
}

export default function TranslationExercise({ onBack }: TranslationExerciseProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<TranslationMode>("en-to-es");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const questions = mode === "en-to-es" ? englishToSpanishQuestions : spanishToEnglishQuestions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = (answeredQuestions.length / totalQuestions) * 100;

  const normalizeAnswer = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[¿?¡!.,]/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const checkAnswer = () => {
    const expected = mode === "en-to-es" ? currentQuestion.spanish : currentQuestion.english;
    const normalized = normalizeAnswer(userAnswer);
    const normalizedExpected = normalizeAnswer(expected);
    
    const correct = normalized === normalizedExpected;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setShowResult(false);
    }
  };

  const retryQuestion = () => {
    setUserAnswer("");
    setShowResult(false);
  };

  const resetExercise = () => {
    setCurrentIndex(0);
    setUserAnswer("");
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !showResult && userAnswer.trim()) {
      checkAnswer();
    } else if (e.key === "Enter" && showResult) {
      nextQuestion();
    }
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
        <div className="absolute top-20 right-0 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/20">
              <span className="text-2xl">🔄</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Translation</h1>
              <p className="text-white/50 text-sm">Translate between English & Spanish</p>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="bg-white/5 rounded-2xl p-1 flex">
            <button
              onClick={() => { setMode("en-to-es"); resetExercise(); }}
              className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 ${
                mode === "en-to-es" 
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" 
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              🇬🇧 → 🇪🇸 English to Spanish
            </button>
            <button
              onClick={() => { setMode("es-to-en"); resetExercise(); }}
              className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 ${
                mode === "es-to-en" 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              🇪🇸 → 🇬🇧 Spanish to English
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`mb-6 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="text-amber-400 text-sm font-medium">Score: {score}/{answeredQuestions.length}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`mb-6 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            {/* Difficulty Badge */}
            <div className="flex justify-between items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-white/40 text-xs">#{currentQuestion.id}</span>
            </div>

            {/* Phrase to Translate */}
            <div className="text-center mb-6">
              <p className="text-white/40 text-sm mb-2">
                {mode === "en-to-es" ? "Translate to Spanish:" : "Translate to English:"}
              </p>
              <p className="text-2xl font-bold text-white">
                {mode === "en-to-es" ? currentQuestion.english : currentQuestion.spanish}
              </p>
            </div>

            {/* Answer Input */}
            <div className="relative">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={showResult}
                placeholder={mode === "en-to-es" ? "Type in Spanish..." : "Type in English..."}
                className={`w-full px-4 py-4 rounded-xl bg-white/5 border text-lg text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
                  showResult 
                    ? isCorrect 
                      ? "border-emerald-500/50 bg-emerald-500/10" 
                      : "border-rose-500/50 bg-rose-500/10"
                    : "border-white/10 focus:border-amber-500/50"
                }`}
              />
              
              {showResult && (
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                  {isCorrect ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  )}
                </div>
              )}
            </div>

            {/* Result Feedback */}
            {showResult && (
              <div className={`mt-4 p-4 rounded-xl ${isCorrect ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-rose-500/10 border border-rose-500/20"}`}>
                {isCorrect ? (
                  <p className="text-emerald-400 font-medium">🎉 Correct! Great job!</p>
                ) : (
                  <div>
                    <p className="text-rose-400 font-medium mb-2">Not quite right</p>
                    <p className="text-white/60 text-sm">
                      Correct answer: <span className="text-white font-medium">{mode === "en-to-es" ? currentQuestion.spanish : currentQuestion.english}</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-3 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                userAnswer.trim()
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              Check Answer
            </button>
          ) : (
            <div className="flex gap-3">
              {!isCorrect && (
                <button
                  onClick={retryQuestion}
                  className="flex-1 py-4 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={nextQuestion}
                disabled={currentIndex >= totalQuestions - 1}
                className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  currentIndex >= totalQuestions - 1
                    ? "bg-white/10 text-white/30 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600"
                }`}
              >
                Next Question →
              </button>
            </div>
          )}
        </div>

        {/* Keyboard Hint */}
        <p className="text-center text-white/30 text-sm mt-4">
          Press <kbd className="px-2 py-1 bg-white/10 rounded text-white/50">Enter</kbd> to submit
        </p>
      </div>
    </div>
  );
}
