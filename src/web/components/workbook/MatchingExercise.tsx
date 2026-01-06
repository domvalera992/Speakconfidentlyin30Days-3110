import { useState, useEffect, useRef } from "react";

interface MatchPair {
  id: number;
  english: string;
  spanish: string;
}

const matchingSets: MatchPair[][] = [
  // Set 1: Basic Greetings
  [
    { id: 1, english: "Hello", spanish: "Hola" },
    { id: 2, english: "Goodbye", spanish: "Adiós" },
    { id: 3, english: "Good morning", spanish: "Buenos días" },
    { id: 4, english: "Good night", spanish: "Buenas noches" },
    { id: 5, english: "See you later", spanish: "Hasta luego" },
    { id: 6, english: "Welcome", spanish: "Bienvenido" },
    { id: 7, english: "How are you?", spanish: "¿Cómo estás?" },
    { id: 8, english: "Nice to meet you", spanish: "Mucho gusto" },
    { id: 9, english: "See you tomorrow", spanish: "Hasta mañana" },
    { id: 10, english: "Good afternoon", spanish: "Buenas tardes" },
  ],
  // Set 2: Common Phrases
  [
    { id: 11, english: "Thank you", spanish: "Gracias" },
    { id: 12, english: "You're welcome", spanish: "De nada" },
    { id: 13, english: "Please", spanish: "Por favor" },
    { id: 14, english: "Excuse me", spanish: "Disculpe" },
    { id: 15, english: "Sorry", spanish: "Lo siento" },
    { id: 16, english: "Yes", spanish: "Sí" },
    { id: 17, english: "No", spanish: "No" },
    { id: 18, english: "Maybe", spanish: "Quizás" },
    { id: 19, english: "Of course", spanish: "Por supuesto" },
    { id: 20, english: "Help", spanish: "Ayuda" },
  ],
  // Set 3: Questions
  [
    { id: 21, english: "What?", spanish: "¿Qué?" },
    { id: 22, english: "Where?", spanish: "¿Dónde?" },
    { id: 23, english: "When?", spanish: "¿Cuándo?" },
    { id: 24, english: "How?", spanish: "¿Cómo?" },
    { id: 25, english: "Why?", spanish: "¿Por qué?" },
    { id: 26, english: "Who?", spanish: "¿Quién?" },
    { id: 27, english: "How much?", spanish: "¿Cuánto?" },
    { id: 28, english: "Which?", spanish: "¿Cuál?" },
    { id: 29, english: "How many?", spanish: "¿Cuántos?" },
    { id: 30, english: "What time?", spanish: "¿Qué hora?" },
  ],
  // Set 4: Numbers
  [
    { id: 31, english: "One", spanish: "Uno" },
    { id: 32, english: "Two", spanish: "Dos" },
    { id: 33, english: "Three", spanish: "Tres" },
    { id: 34, english: "Four", spanish: "Cuatro" },
    { id: 35, english: "Five", spanish: "Cinco" },
    { id: 36, english: "Ten", spanish: "Diez" },
    { id: 37, english: "Twenty", spanish: "Veinte" },
    { id: 38, english: "Fifty", spanish: "Cincuenta" },
    { id: 39, english: "One hundred", spanish: "Cien" },
    { id: 40, english: "One thousand", spanish: "Mil" },
  ],
  // Set 5: Food & Drinks
  [
    { id: 41, english: "Water", spanish: "Agua" },
    { id: 42, english: "Coffee", spanish: "Café" },
    { id: 43, english: "Bread", spanish: "Pan" },
    { id: 44, english: "Chicken", spanish: "Pollo" },
    { id: 45, english: "Fish", spanish: "Pescado" },
    { id: 46, english: "Rice", spanish: "Arroz" },
    { id: 47, english: "Meat", spanish: "Carne" },
    { id: 48, english: "Fruit", spanish: "Fruta" },
    { id: 49, english: "Wine", spanish: "Vino" },
    { id: 50, english: "Beer", spanish: "Cerveza" },
  ],
  // Set 6: Travel
  [
    { id: 51, english: "Airport", spanish: "Aeropuerto" },
    { id: 52, english: "Hotel", spanish: "Hotel" },
    { id: 53, english: "Taxi", spanish: "Taxi" },
    { id: 54, english: "Bus", spanish: "Autobús" },
    { id: 55, english: "Train", spanish: "Tren" },
    { id: 56, english: "Ticket", spanish: "Boleto" },
    { id: 57, english: "Passport", spanish: "Pasaporte" },
    { id: 58, english: "Luggage", spanish: "Equipaje" },
    { id: 59, english: "Map", spanish: "Mapa" },
    { id: 60, english: "Street", spanish: "Calle" },
  ],
];

const setNames = [
  "Basic Greetings",
  "Common Phrases",
  "Questions",
  "Numbers",
  "Food & Drinks",
  "Travel",
];

interface MatchingExerciseProps {
  onBack: () => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function MatchingExercise({ onBack }: MatchingExerciseProps) {
  const [mounted, setMounted] = useState(false);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [shuffledEnglish, setShuffledEnglish] = useState<MatchPair[]>([]);
  const [shuffledSpanish, setShuffledSpanish] = useState<MatchPair[]>([]);
  const [selectedEnglish, setSelectedEnglish] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [correctMatches, setCorrectMatches] = useState<Set<number>>(new Set());
  const [wrongMatch, setWrongMatch] = useState<{english: number, spanish: number} | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [completedSets, setCompletedSets] = useState<Set<number>>(new Set());
  
  const dragRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    shuffleCurrentSet();
  }, []);

  useEffect(() => {
    shuffleCurrentSet();
  }, [currentSetIndex]);

  const shuffleCurrentSet = () => {
    const currentSet = matchingSets[currentSetIndex];
    setShuffledEnglish(shuffleArray(currentSet));
    setShuffledSpanish(shuffleArray(currentSet));
    setSelectedEnglish(null);
    setMatches(new Map());
    setCorrectMatches(new Set());
    setWrongMatch(null);
    setShowResults(false);
  };

  const handleEnglishClick = (id: number) => {
    if (correctMatches.has(id)) return;
    setSelectedEnglish(id);
    setWrongMatch(null);
  };

  const handleSpanishClick = (id: number) => {
    if (!selectedEnglish) return;
    if (correctMatches.has(selectedEnglish)) return;
    
    // Check if match is correct
    if (selectedEnglish === id) {
      // Correct match!
      setCorrectMatches(prev => new Set([...prev, id]));
      setMatches(prev => new Map([...prev, [selectedEnglish, id]]));
      setSelectedEnglish(null);
      
      // Check if all matches are complete
      if (correctMatches.size + 1 === shuffledEnglish.length) {
        setShowResults(true);
        setCompletedSets(prev => new Set([...prev, currentSetIndex]));
      }
    } else {
      // Wrong match
      setWrongMatch({ english: selectedEnglish, spanish: id });
      setTimeout(() => {
        setWrongMatch(null);
        setSelectedEnglish(null);
      }, 800);
    }
  };

  const handleDragStart = (id: number) => {
    dragRef.current = id;
    setSelectedEnglish(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (id: number) => {
    if (dragRef.current !== null) {
      setSelectedEnglish(dragRef.current);
      handleSpanishClick(id);
      dragRef.current = null;
    }
  };

  const nextSet = () => {
    if (currentSetIndex < matchingSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
    }
  };

  const previousSet = () => {
    if (currentSetIndex > 0) {
      setCurrentSetIndex(currentSetIndex - 1);
    }
  };

  const progress = (correctMatches.size / shuffledEnglish.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl" />
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/20">
              <span className="text-2xl">🔗</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Matching</h1>
              <p className="text-white/50 text-sm">Match phrases with translations</p>
            </div>
          </div>
        </div>

        {/* Set Selector */}
        <div className={`mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={previousSet}
              disabled={currentSetIndex === 0}
              className={`p-2 rounded-lg transition-all ${currentSetIndex === 0 ? "text-white/20" : "text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="text-center">
              <span className="text-lg font-semibold text-white">{setNames[currentSetIndex]}</span>
              <span className="text-white/40 text-sm ml-2">Set {currentSetIndex + 1}/{matchingSets.length}</span>
            </div>
            
            <button
              onClick={nextSet}
              disabled={currentSetIndex === matchingSets.length - 1}
              className={`p-2 rounded-lg transition-all ${currentSetIndex === matchingSets.length - 1 ? "text-white/20" : "text-white/60 hover:text-white hover:bg-white/10"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Set Progress Dots */}
          <div className="flex justify-center gap-2">
            {matchingSets.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSetIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSetIndex 
                    ? "bg-emerald-400 scale-125" 
                    : completedSets.has(idx)
                      ? "bg-emerald-500/50"
                      : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`mb-6 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Matched: {correctMatches.size}/{shuffledEnglish.length}</span>
            <button
              onClick={shuffleCurrentSet}
              className="text-white/40 hover:text-white text-sm flex items-center gap-1 transition-colors"
            >
              🔀 Shuffle
            </button>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Matching Area */}
        <div className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex gap-3">
            {/* English Column */}
            <div className="flex-1 space-y-2">
              <div className="text-center text-white/40 text-sm mb-3 font-medium">🇬🇧 English</div>
              {shuffledEnglish.map((pair) => {
                const isMatched = correctMatches.has(pair.id);
                const isSelected = selectedEnglish === pair.id;
                const isWrong = wrongMatch?.english === pair.id;
                
                return (
                  <button
                    key={pair.id}
                    onClick={() => handleEnglishClick(pair.id)}
                    draggable={!isMatched}
                    onDragStart={() => handleDragStart(pair.id)}
                    className={`w-full p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isMatched
                        ? "bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 cursor-default"
                        : isWrong
                          ? "bg-rose-500/20 border-2 border-rose-500/50 text-rose-400 animate-shake"
                          : isSelected
                            ? "bg-emerald-500/20 border-2 border-emerald-500/50 text-white scale-105"
                            : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 cursor-grab active:cursor-grabbing"
                    }`}
                  >
                    {isMatched && <span className="mr-1">✓</span>}
                    {pair.english}
                  </button>
                );
              })}
            </div>

            {/* Spanish Column */}
            <div className="flex-1 space-y-2">
              <div className="text-center text-white/40 text-sm mb-3 font-medium">🇪🇸 Spanish</div>
              {shuffledSpanish.map((pair) => {
                const isMatched = correctMatches.has(pair.id);
                const isWrong = wrongMatch?.spanish === pair.id;
                
                return (
                  <button
                    key={pair.id}
                    onClick={() => handleSpanishClick(pair.id)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(pair.id)}
                    className={`w-full p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isMatched
                        ? "bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 cursor-default"
                        : isWrong
                          ? "bg-rose-500/20 border-2 border-rose-500/50 text-rose-400 animate-shake"
                          : selectedEnglish
                            ? "bg-white/5 border border-white/20 text-white hover:bg-teal-500/20 hover:border-teal-500/50 cursor-pointer"
                            : "bg-white/5 border border-white/10 text-white/60 cursor-default"
                    }`}
                  >
                    {isMatched && <span className="mr-1">✓</span>}
                    {pair.spanish}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className={`mt-6 text-center transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {!showResults && (
            <p className="text-white/40 text-sm">
              {selectedEnglish 
                ? "Now click the matching Spanish translation" 
                : "Click an English phrase or drag it to match"
              }
            </p>
          )}
        </div>

        {/* Completion Celebration */}
        {showResults && (
          <div className={`mt-6 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-white mb-2">Perfect Match!</h3>
            <p className="text-white/60 mb-4">You completed the {setNames[currentSetIndex]} set</p>
            
            <div className="flex gap-3">
              <button
                onClick={shuffleCurrentSet}
                className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
              >
                Practice Again
              </button>
              {currentSetIndex < matchingSets.length - 1 && (
                <button
                  onClick={nextSet}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 transition-all"
                >
                  Next Set →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
