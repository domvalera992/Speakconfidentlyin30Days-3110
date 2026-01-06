import { useState, useEffect } from "react";

interface ConversationLine {
  speaker: "A" | "B" | "user";
  text: string;
  translation?: string;
}

interface ConversationScenario {
  id: number;
  title: string;
  icon: string;
  context: string;
  lines: ConversationLine[];
  userLineIndex: number;
  acceptedAnswers: string[];
  exampleAnswer: string;
  difficulty: "easy" | "medium" | "hard";
}

const conversationScenarios: ConversationScenario[] = [
  {
    id: 1,
    title: "Greeting a Neighbor",
    icon: "👋",
    context: "You meet your neighbor in the hallway",
    lines: [
      { speaker: "A", text: "¡Hola! ¿Cómo estás?", translation: "Hello! How are you?" },
      { speaker: "user", text: "", translation: "Reply with how you're doing" },
      { speaker: "A", text: "Me alegro. ¿Vas al trabajo?", translation: "I'm glad. Are you going to work?" },
    ],
    userLineIndex: 1,
    acceptedAnswers: ["bien", "muy bien", "estoy bien", "estoy muy bien", "bien gracias", "muy bien gracias"],
    exampleAnswer: "Muy bien, gracias. ¿Y tú?",
    difficulty: "easy",
  },
  {
    id: 2,
    title: "Ordering Coffee",
    icon: "☕",
    context: "You're at a coffee shop ordering a drink",
    lines: [
      { speaker: "A", text: "Buenos días. ¿Qué le puedo servir?", translation: "Good morning. What can I get you?" },
      { speaker: "user", text: "", translation: "Order a coffee" },
      { speaker: "A", text: "¿Para tomar aquí o para llevar?", translation: "For here or to go?" },
    ],
    userLineIndex: 1,
    acceptedAnswers: ["cafe", "un cafe", "quiero un cafe", "me gustaria un cafe", "un cafe por favor"],
    exampleAnswer: "Un café con leche, por favor.",
    difficulty: "easy",
  },
  {
    id: 3,
    title: "Asking for Help",
    icon: "🆘",
    context: "You're lost and need directions",
    lines: [
      { speaker: "B", text: "Disculpe, ¿necesita ayuda?", translation: "Excuse me, do you need help?" },
      { speaker: "user", text: "", translation: "Ask where the metro is" },
      { speaker: "B", text: "El metro está a dos calles de aquí.", translation: "The metro is two blocks from here." },
    ],
    userLineIndex: 1,
    acceptedAnswers: ["donde esta el metro", "donde queda el metro", "sabe donde esta el metro", "me puede decir donde esta el metro"],
    exampleAnswer: "Sí, ¿sabe dónde está el metro?",
    difficulty: "easy",
  },
  {
    id: 4,
    title: "At the Restaurant",
    icon: "🍝",
    context: "You're ready to order at a restaurant",
    lines: [
      { speaker: "A", text: "¿Están listos para ordenar?", translation: "Are you ready to order?" },
      { speaker: "B", text: "Sí, yo quiero la sopa del día.", translation: "Yes, I want the soup of the day." },
      { speaker: "user", text: "", translation: "Order the pasta" },
      { speaker: "A", text: "Excelente elección. ¿Algo de tomar?", translation: "Excellent choice. Anything to drink?" },
    ],
    userLineIndex: 2,
    acceptedAnswers: ["pasta", "la pasta", "quiero la pasta", "yo quiero pasta", "para mi la pasta", "voy a llevar la pasta"],
    exampleAnswer: "Y para mí, la pasta, por favor.",
    difficulty: "medium",
  },
  {
    id: 5,
    title: "Making Plans",
    icon: "📅",
    context: "A friend is asking you about weekend plans",
    lines: [
      { speaker: "A", text: "¿Qué vas a hacer este fin de semana?", translation: "What are you going to do this weekend?" },
      { speaker: "user", text: "", translation: "Say you're going to the beach" },
      { speaker: "A", text: "¡Qué bueno! ¿Puedo ir contigo?", translation: "How nice! Can I come with you?" },
    ],
    userLineIndex: 1,
    acceptedAnswers: ["voy a la playa", "vamos a la playa", "voy a ir a la playa", "pienso ir a la playa", "playa"],
    exampleAnswer: "Voy a ir a la playa con unos amigos.",
    difficulty: "medium",
  },
  {
    id: 6,
    title: "Phone Call",
    icon: "📞",
    context: "Someone calls your office",
    lines: [
      { speaker: "A", text: "¿Aló? ¿Está el señor García?", translation: "Hello? Is Mr. García there?" },
      { speaker: "user", text: "", translation: "Say he's not available" },
      { speaker: "A", text: "Está bien, lo llamaré más tarde.", translation: "Okay, I'll call later." },
    ],
    userLineIndex: 1,
    acceptedAnswers: ["no esta", "no esta disponible", "el no esta", "no se encuentra", "en este momento no esta"],
    exampleAnswer: "Lo siento, en este momento no está disponible. ¿Quiere dejar un mensaje?",
    difficulty: "medium",
  },
  {
    id: 7,
    title: "At the Doctor",
    icon: "🏥",
    context: "The doctor is asking about your symptoms",
    lines: [
      { speaker: "A", text: "¿Qué le pasa?", translation: "What's wrong?" },
      { speaker: "user", text: "", translation: "Say you have a stomachache" },
      { speaker: "A", text: "¿Desde cuándo tiene el dolor?", translation: "Since when have you had the pain?" },
    ],
    userLineIndex: 1,
    acceptedAnswers: ["me duele el estomago", "dolor de estomago", "tengo dolor de estomago", "me duele la barriga"],
    exampleAnswer: "Me duele mucho el estómago desde ayer.",
    difficulty: "medium",
  },
  {
    id: 8,
    title: "Job Interview",
    icon: "💼",
    context: "You're being interviewed for a job",
    lines: [
      { speaker: "A", text: "Cuénteme sobre su experiencia laboral.", translation: "Tell me about your work experience." },
      { speaker: "user", text: "", translation: "Describe your experience" },
      { speaker: "A", text: "Muy interesante. ¿Por qué quiere trabajar con nosotros?", translation: "Very interesting. Why do you want to work with us?" },
    ],
    userLineIndex: 1,
    acceptedAnswers: ["tengo experiencia", "trabaje en", "he trabajado", "mi experiencia"],
    exampleAnswer: "Tengo cinco años de experiencia en marketing digital. Trabajé en una agencia de publicidad.",
    difficulty: "hard",
  },
  {
    id: 9,
    title: "Apartment Hunting",
    icon: "🏠",
    context: "You're asking about an apartment for rent",
    lines: [
      { speaker: "A", text: "El apartamento tiene dos habitaciones y un baño.", translation: "The apartment has two bedrooms and one bathroom." },
      { speaker: "user", text: "", translation: "Ask about the monthly rent" },
      { speaker: "A", text: "Son $800 al mes, incluidos los servicios.", translation: "It's $800 per month, utilities included." },
    ],
    userLineIndex: 1,
    acceptedAnswers: ["cuanto cuesta", "cuanto es el alquiler", "cuanto es la renta", "precio", "cuanto sale por mes"],
    exampleAnswer: "¿Cuánto es el alquiler mensual?",
    difficulty: "hard",
  },
  {
    id: 10,
    title: "Emergency Situation",
    icon: "🚨",
    context: "You witness an accident and call for help",
    lines: [
      { speaker: "A", text: "Emergencias, ¿cuál es su emergencia?", translation: "Emergency services, what is your emergency?" },
      { speaker: "user", text: "", translation: "Report an accident" },
      { speaker: "A", text: "¿Dónde está ubicado exactamente?", translation: "Where are you located exactly?" },
    ],
    userLineIndex: 1,
    acceptedAnswers: ["accidente", "hubo un accidente", "hay un accidente", "necesitamos ayuda", "ambulancia"],
    exampleAnswer: "Hubo un accidente de carro. Una persona está herida. Necesitamos una ambulancia.",
    difficulty: "hard",
  },
];

interface ConversationsExerciseProps {
  onBack: () => void;
}

export default function ConversationsExercise({ onBack }: ConversationsExerciseProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentScenario = conversationScenarios[currentIndex];
  const totalScenarios = conversationScenarios.length;
  const progress = (completedScenarios.size / totalScenarios) * 100;

  const normalizeAnswer = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[¿?¡!.,]/g, "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const checkAnswer = () => {
    const normalized = normalizeAnswer(userInput);
    const isAccepted = currentScenario.acceptedAnswers.some(answer => 
      normalized.includes(normalizeAnswer(answer))
    );
    
    setIsCorrect(isAccepted);
    setSubmitted(true);
    
    if (isAccepted) {
      setCompletedScenarios(prev => new Set([...prev, currentScenario.id]));
    }
  };

  const nextScenario = () => {
    if (currentIndex < totalScenarios - 1) {
      setCurrentIndex(currentIndex + 1);
      resetState();
    }
  };

  const previousScenario = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetState();
    }
  };

  const resetState = () => {
    setUserInput("");
    setSubmitted(false);
    setIsCorrect(false);
    setShowExample(false);
  };

  const tryAgain = () => {
    setUserInput("");
    setSubmitted(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && userInput.trim() && !submitted) {
      e.preventDefault();
      checkAnswer();
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

  const getSpeakerStyle = (speaker: string) => {
    switch (speaker) {
      case "A": return "bg-indigo-500/20 border-indigo-500/30";
      case "B": return "bg-teal-500/20 border-teal-500/30";
      case "user": return "bg-rose-500/10 border-rose-500/30 border-dashed";
      default: return "bg-white/5 border-white/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl" />
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center border border-indigo-500/20">
              <span className="text-2xl">💬</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Conversations</h1>
              <p className="text-white/50 text-sm">Complete dialogue exercises</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Scenario {currentIndex + 1} of {totalScenarios}</span>
            <span className="text-indigo-400 text-sm font-medium">Completed: {completedScenarios.size}/{totalScenarios}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
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
                <span className="text-3xl">{currentScenario.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-white">{currentScenario.title}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getDifficultyColor(currentScenario.difficulty)}`}>
                    {currentScenario.difficulty}
                  </span>
                </div>
              </div>
              {completedScenarios.has(currentScenario.id) && (
                <span className="text-emerald-400 text-2xl">✓</span>
              )}
            </div>

            {/* Context */}
            <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/60 text-sm">📍 {currentScenario.context}</p>
            </div>

            {/* Conversation */}
            <div className="space-y-3 mb-6">
              {currentScenario.lines.map((line, idx) => {
                const isUserLine = line.speaker === "user";
                const isBeforeUserLine = idx < currentScenario.userLineIndex;
                const isAfterUserLine = idx > currentScenario.userLineIndex;
                const shouldShow = isBeforeUserLine || (isUserLine) || (isAfterUserLine && submitted && isCorrect);

                if (!shouldShow) return null;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${getSpeakerStyle(line.speaker)} ${isUserLine ? "" : ""}`}
                  >
                    {isUserLine ? (
                      <div>
                        <p className="text-white/40 text-xs mb-2">YOUR TURN: {line.translation}</p>
                        {!submitted ? (
                          <textarea
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your response in Spanish..."
                            className="w-full bg-transparent border-none text-white placeholder-white/30 focus:outline-none resize-none"
                            rows={2}
                          />
                        ) : (
                          <div>
                            <p className={`font-medium ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                              {userInput}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-white/40 font-medium">
                            {line.speaker === "A" ? "Person A" : "Person B"}
                          </span>
                        </div>
                        <p className="text-white font-medium">{line.text}</p>
                        <p className="text-white/40 text-sm mt-1">{line.translation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Result Feedback */}
            {submitted && (
              <div className={`p-4 rounded-xl ${isCorrect ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-rose-500/10 border border-rose-500/20"}`}>
                {isCorrect ? (
                  <div>
                    <p className="text-emerald-400 font-medium mb-1">🎉 Great response!</p>
                    <p className="text-white/60 text-sm">Your answer fits the conversation well.</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-rose-400 font-medium mb-1">Not quite right</p>
                    <p className="text-white/60 text-sm mb-2">Try to include key phrases related to the prompt.</p>
                    <button
                      onClick={() => setShowExample(!showExample)}
                      className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
                    >
                      {showExample ? "Hide" : "Show"} example answer
                    </button>
                    {showExample && (
                      <div className="mt-2 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                        <p className="text-white font-medium">{currentScenario.exampleAnswer}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-3 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {!submitted ? (
            <button
              onClick={checkAnswer}
              disabled={!userInput.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                userInput.trim()
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              Submit Response
            </button>
          ) : (
            <div className="space-y-3">
              {!isCorrect && (
                <button
                  onClick={tryAgain}
                  className="w-full py-4 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={nextScenario}
                disabled={currentIndex >= totalScenarios - 1}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  currentIndex >= totalScenarios - 1
                    ? "bg-white/10 text-white/30 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600"
                }`}
              >
                {currentIndex >= totalScenarios - 1 ? "All Scenarios Complete!" : "Next Scenario →"}
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={previousScenario}
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
              onClick={() => { nextScenario(); }}
              disabled={currentIndex === totalScenarios - 1}
              className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                currentIndex === totalScenarios - 1 
                  ? "bg-white/5 text-white/30 cursor-not-allowed" 
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Skip →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
