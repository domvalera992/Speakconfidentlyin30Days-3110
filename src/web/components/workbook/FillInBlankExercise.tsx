import { useState, useEffect } from "react";

interface FillInBlankQuestion {
  id: number;
  sentence: string;
  answer: string;
  options?: string[];
  hint?: string;
  difficulty: "easy" | "medium" | "hard";
}

const fillInBlankQuestions: FillInBlankQuestion[] = [
  // Easy - Single word blanks
  { id: 1, sentence: "Buenos _____", answer: "días", options: ["días", "noches", "tardes", "mañanas"], hint: "Morning greeting", difficulty: "easy" },
  { id: 2, sentence: "Mucho _____", answer: "gusto", options: ["gusto", "gracias", "tiempo", "amor"], hint: "Nice to meet you", difficulty: "easy" },
  { id: 3, sentence: "Por _____", answer: "favor", options: ["favor", "supuesto", "ejemplo", "fin"], hint: "Please", difficulty: "easy" },
  { id: 4, sentence: "De _____", answer: "nada", options: ["nada", "todo", "verdad", "vuelta"], hint: "You're welcome", difficulty: "easy" },
  { id: 5, sentence: "Lo _____", answer: "siento", options: ["siento", "tengo", "veo", "pido"], hint: "Sorry", difficulty: "easy" },
  { id: 6, sentence: "Hasta _____", answer: "luego", options: ["luego", "pronto", "mañana", "nunca"], hint: "See you later", difficulty: "easy" },
  { id: 7, sentence: "¿Cómo te _____?", answer: "llamas", options: ["llamas", "sientes", "encuentras", "va"], hint: "What's your name?", difficulty: "easy" },
  
  // Medium - Verb conjugations and phrases
  { id: 8, sentence: "Yo _____ español", answer: "hablo", options: ["hablo", "hablas", "habla", "hablan"], hint: "First person singular of 'hablar'", difficulty: "medium" },
  { id: 9, sentence: "¿Dónde _____ el baño?", answer: "está", options: ["está", "es", "son", "están"], hint: "Location 'ser' vs 'estar'", difficulty: "medium" },
  { id: 10, sentence: "Tengo mucha _____", answer: "hambre", options: ["hambre", "sed", "sueño", "prisa"], hint: "I'm very hungry", difficulty: "medium" },
  { id: 11, sentence: "Me _____ la pizza", answer: "gusta", options: ["gusta", "gusto", "gustan", "gustas"], hint: "I like pizza", difficulty: "medium" },
  { id: 12, sentence: "¿_____ hora es?", answer: "Qué", options: ["Qué", "Cuál", "Cuándo", "Cómo"], hint: "What time is it?", difficulty: "medium" },
  { id: 13, sentence: "Necesito _____ un taxi", answer: "tomar", options: ["tomar", "coger", "agarrar", "buscar"], hint: "I need to take a taxi", difficulty: "medium" },
  { id: 14, sentence: "¿Puede _____ más despacio?", answer: "hablar", options: ["hablar", "decir", "repetir", "explicar"], hint: "Can you speak slower?", difficulty: "medium" },
  { id: 15, sentence: "No _____ muy bien", answer: "entiendo", options: ["entiendo", "comprendo", "hablo", "escucho"], hint: "I don't understand well", difficulty: "medium" },
  
  // Medium-Hard - More complex sentences
  { id: 16, sentence: "¿Cuánto _____ esto?", answer: "cuesta", options: ["cuesta", "vale", "es", "tiene"], hint: "How much does this cost?", difficulty: "medium" },
  { id: 17, sentence: "Me _____ probar esto", answer: "gustaría", options: ["gustaría", "quiero", "puedo", "necesito"], hint: "I would like to try this", difficulty: "medium" },
  { id: 18, sentence: "¿_____ aceptan tarjeta?", answer: "Ustedes", options: ["Ustedes", "Ellos", "Nosotros", "Tú"], hint: "Do you (formal) accept cards?", difficulty: "medium" },
  { id: 19, sentence: "La cuenta, por _____", answer: "favor", hint: "The check, please", difficulty: "medium" },
  
  // Hard - Full phrase completion
  { id: 20, sentence: "¿Podría _____ la ventana?", answer: "abrir", options: ["abrir", "cerrar", "mirar", "limpiar"], hint: "Could you open the window?", difficulty: "hard" },
  { id: 21, sentence: "Tengo una _____ para dos personas", answer: "reservación", options: ["reservación", "habitación", "mesa", "cita"], hint: "I have a reservation for two", difficulty: "hard" },
  { id: 22, sentence: "¿Me puede _____ el menú?", answer: "traer", options: ["traer", "dar", "mostrar", "llevar"], hint: "Can you bring me the menu?", difficulty: "hard" },
  { id: 23, sentence: "Quisiera _____ una habitación", answer: "reservar", options: ["reservar", "alquilar", "comprar", "pedir"], hint: "I would like to book a room", difficulty: "hard" },
  { id: 24, sentence: "¿A qué hora _____ el vuelo?", answer: "sale", options: ["sale", "llega", "va", "viene"], hint: "What time does the flight depart?", difficulty: "hard" },
  { id: 25, sentence: "Estoy _____ de encontrar trabajo", answer: "buscando", hint: "I'm looking for work", difficulty: "hard" },
];

interface FillInBlankExerciseProps {
  onBack: () => void;
}

export default function FillInBlankExercise({ onBack }: FillInBlankExerciseProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"dropdown" | "type">("dropdown");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentQuestion = fillInBlankQuestions[currentIndex];
  const totalQuestions = fillInBlankQuestions.length;
  const progress = (answeredQuestions.length / totalQuestions) * 100;

  const normalizeAnswer = (str: string) => {
    return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const checkAnswer = () => {
    const normalized = normalizeAnswer(userAnswer);
    const normalizedExpected = normalizeAnswer(currentQuestion.answer);
    
    const correct = normalized === normalizedExpected;
    setIsCorrect(correct);
    setShowResult(true);
    setShowHint(false);
    
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
      setShowHint(false);
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
    setShowHint(false);
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

  // Split sentence into parts around the blank
  const renderSentence = () => {
    const parts = currentQuestion.sentence.split("_____");
    return (
      <span>
        {parts[0]}
        <span className="inline-block min-w-[80px] mx-1 border-b-2 border-cyan-400/50 text-cyan-400">
          {showResult ? currentQuestion.answer : userAnswer || "______"}
        </span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20">
              <span className="text-2xl">✏️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Fill-in-the-Blank</h1>
              <p className="text-white/50 text-sm">Complete the missing words</p>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="bg-white/5 rounded-2xl p-1 flex">
            <button
              onClick={() => { setMode("dropdown"); resetExercise(); }}
              className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 ${
                mode === "dropdown" 
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              📋 Multiple Choice
            </button>
            <button
              onClick={() => { setMode("type"); resetExercise(); }}
              className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 ${
                mode === "type" 
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              ⌨️ Type Answer
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`mb-6 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Question {currentIndex + 1} of {totalQuestions}</span>
            <span className="text-cyan-400 text-sm font-medium">Score: {score}/{answeredQuestions.length}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
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
              {currentQuestion.hint && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-white/40 hover:text-white/80 text-xs flex items-center gap-1 transition-colors"
                >
                  💡 {showHint ? "Hide" : "Show"} hint
                </button>
              )}
            </div>

            {/* Hint */}
            {showHint && currentQuestion.hint && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                💡 {currentQuestion.hint}
              </div>
            )}

            {/* Sentence with Blank */}
            <div className="text-center mb-6">
              <p className="text-2xl font-bold text-white leading-relaxed">
                {renderSentence()}
              </p>
            </div>

            {/* Answer Input */}
            {mode === "dropdown" && currentQuestion.options ? (
              <div className="grid grid-cols-2 gap-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setUserAnswer(option);
                      if (!showResult) {
                        setTimeout(() => {
                          const normalized = normalizeAnswer(option);
                          const normalizedExpected = normalizeAnswer(currentQuestion.answer);
                          const correct = normalized === normalizedExpected;
                          setIsCorrect(correct);
                          setShowResult(true);
                          if (correct) setScore(score + 1);
                          setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
                        }, 100);
                      }
                    }}
                    disabled={showResult}
                    className={`p-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                      showResult
                        ? option === currentQuestion.answer
                          ? "bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400"
                          : userAnswer === option
                            ? "bg-rose-500/20 border-2 border-rose-500/50 text-rose-400"
                            : "bg-white/5 border border-white/10 text-white/30"
                        : userAnswer === option
                          ? "bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-400"
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="relative">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={showResult}
                  placeholder="Type your answer..."
                  className={`w-full px-4 py-4 rounded-xl bg-white/5 border text-lg text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
                    showResult 
                      ? isCorrect 
                        ? "border-emerald-500/50 bg-emerald-500/10" 
                        : "border-rose-500/50 bg-rose-500/10"
                      : "border-white/10 focus:border-cyan-500/50"
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
            )}

            {/* Result Feedback */}
            {showResult && (
              <div className={`mt-4 p-4 rounded-xl ${isCorrect ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-rose-500/10 border border-rose-500/20"}`}>
                {isCorrect ? (
                  <p className="text-emerald-400 font-medium">🎉 Excellent! That's correct!</p>
                ) : (
                  <div>
                    <p className="text-rose-400 font-medium mb-2">Not quite right</p>
                    <p className="text-white/60 text-sm">
                      Correct answer: <span className="text-white font-medium">{currentQuestion.answer}</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-3 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {mode === "type" && !showResult ? (
            <button
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                userAnswer.trim()
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              Check Answer
            </button>
          ) : showResult ? (
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
                    : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
                }`}
              >
                Next Question →
              </button>
            </div>
          ) : null}
        </div>

        {/* Keyboard Hint */}
        {mode === "type" && (
          <p className="text-center text-white/30 text-sm mt-4">
            Press <kbd className="px-2 py-1 bg-white/10 rounded text-white/50">Enter</kbd> to submit
          </p>
        )}
      </div>
    </div>
  );
}
