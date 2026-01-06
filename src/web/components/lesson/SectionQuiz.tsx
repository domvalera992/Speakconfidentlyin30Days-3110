import { useState } from "react";

interface ColorClasses {
  accent: string;
  bg: string;
  border: string;
  gradient: string;
}

interface QuizQuestion {
  id: number;
  type: "multiple-choice" | "fill-blank";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

interface SectionQuizProps {
  colorClasses: ColorClasses;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "How do you say 'Nice to meet you' in Spanish?",
    options: ["Hasta luego", "Mucho gusto", "Lo siento", "Gracias"],
    correctAnswer: "Mucho gusto",
    explanation: "'Mucho gusto' literally means 'much pleasure' and is the common way to say 'Nice to meet you' in Spanish.",
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "What does '¿Cómo estás?' mean?",
    options: ["What's your name?", "Where are you from?", "How are you?", "How old are you?"],
    correctAnswer: "How are you?",
    explanation: "'¿Cómo estás?' is the informal way to ask 'How are you?' in Spanish. Use '¿Cómo está?' for formal situations.",
  },
  {
    id: 3,
    type: "fill-blank",
    question: "Complete: 'Me _____ María' (My name is María)",
    correctAnswer: "llamo",
    explanation: "'Me llamo' means 'I am called' or 'My name is'. It comes from the verb 'llamarse'.",
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Which phrase would you use to apologize?",
    options: ["De nada", "Por favor", "Lo siento", "Con permiso"],
    correctAnswer: "Lo siento",
    explanation: "'Lo siento' means 'I'm sorry' or 'I feel it'. It's used to apologize in Spanish.",
  },
  {
    id: 5,
    type: "fill-blank",
    question: "Complete: 'Muchas _____' (Thank you very much)",
    correctAnswer: "gracias",
    explanation: "'Muchas gracias' means 'Thank you very much'. 'Gracias' alone means 'Thank you'.",
  },
];

export default function SectionQuiz({ colorClasses }: SectionQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [fillAnswer, setFillAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];

  const checkAnswer = () => {
    const answer = question.type === "fill-blank" ? fillAnswer.toLowerCase().trim() : selectedAnswer;
    const correct = answer === question.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setFillAnswer("");
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setFillAnswer("");
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <section className="mb-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${colorClasses.gradient} shadow-lg`}>
              <span className="text-white font-bold">E</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Quick Quiz</h2>
              <p className="text-white/40 text-sm">Quiz completed!</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? "🏆" : percentage >= 60 ? "🌟" : "💪"}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
          </h3>
          <p className="text-white/60 mb-6">You scored {score} out of {questions.length}</p>
          
          {/* Score Ring */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={percentage >= 80 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 283} 283`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{percentage}%</span>
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className={`px-6 py-3 rounded-xl font-medium bg-gradient-to-r ${colorClasses.gradient} text-white hover:scale-105 active:scale-95 transition-transform`}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      {/* Section Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${colorClasses.gradient} shadow-lg`}>
              <span className="text-white font-bold">E</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Quick Quiz</h2>
              <p className="text-white/40 text-sm">Test your knowledge</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-medium">{currentQuestion + 1} / {questions.length}</p>
            <p className="text-white/40 text-xs">Score: {score}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${colorClasses.gradient} transition-all duration-500`}
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <div className="mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.accent} border ${colorClasses.border}`}>
            {question.type === "multiple-choice" ? "Multiple Choice" : "Fill in the Blank"}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-white mb-6">{question.question}</h3>

        {/* Answer Options */}
        {question.type === "multiple-choice" ? (
          <div className="space-y-3">
            {question.options?.map((option, idx) => (
              <button
                key={idx}
                onClick={() => !showResult && setSelectedAnswer(option)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  showResult
                    ? option === question.correctAnswer
                      ? "bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400"
                      : option === selectedAnswer && !isCorrect
                      ? "bg-red-500/20 border-2 border-red-500 text-red-400"
                      : "bg-white/5 border border-white/10 text-white/40"
                    : selectedAnswer === option
                    ? `${colorClasses.bg} border-2 ${colorClasses.border} ${colorClasses.accent}`
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    showResult && option === question.correctAnswer
                      ? "border-emerald-500 bg-emerald-500"
                      : showResult && option === selectedAnswer && !isCorrect
                      ? "border-red-500 bg-red-500"
                      : selectedAnswer === option
                      ? `${colorClasses.border} ${colorClasses.bg}`
                      : "border-white/20"
                  }`}>
                    {showResult && option === question.correctAnswer ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : showResult && option === selectedAnswer && !isCorrect ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{String.fromCharCode(65 + idx)}</span>
                    )}
                  </span>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mb-6">
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              disabled={showResult}
              placeholder="Type your answer..."
              className={`w-full p-4 rounded-xl bg-white/5 border-2 text-white placeholder:text-white/30 focus:outline-none transition-all ${
                showResult
                  ? isCorrect
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-red-500 bg-red-500/10"
                  : `border-white/10 focus:${colorClasses.border}`
              }`}
            />
            {showResult && !isCorrect && (
              <p className="mt-2 text-emerald-400">
                Correct answer: <span className="font-medium">{question.correctAnswer}</span>
              </p>
            )}
          </div>
        )}

        {/* Result Feedback */}
        {showResult && (
          <div
            className={`mt-6 p-4 rounded-xl ${
              isCorrect ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-red-500/10 border border-red-500/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{isCorrect ? "✓" : "✗"}</span>
              <span className={`font-medium ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                {isCorrect ? "Correct!" : "Not quite right"}
              </span>
            </div>
            <p className="text-white/70 text-sm">{question.explanation}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6">
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={!selectedAnswer && !fillAnswer}
              className={`w-full py-4 rounded-xl font-medium transition-all ${
                selectedAnswer || fillAnswer
                  ? `bg-gradient-to-r ${colorClasses.gradient} text-white hover:scale-[1.02] active:scale-[0.98]`
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className={`w-full py-4 rounded-xl font-medium bg-gradient-to-r ${colorClasses.gradient} text-white hover:scale-[1.02] active:scale-[0.98] transition-all`}
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
