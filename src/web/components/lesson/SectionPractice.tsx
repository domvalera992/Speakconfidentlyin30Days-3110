import { useState, useRef, useEffect } from "react";

interface ColorClasses {
  accent: string;
  bg: string;
  border: string;
  gradient: string;
}

interface FlashCard {
  id: number;
  english: string;
  spanish: string;
  phonetic: string;
}

interface SectionPracticeProps {
  colorClasses: ColorClasses;
}

const flashcards: FlashCard[] = [
  { id: 1, english: "Hello, how are you?", spanish: "Hola, ¿cómo estás?", phonetic: "OH-lah, KOH-moh ehs-TAHS" },
  { id: 2, english: "Nice to meet you", spanish: "Mucho gusto", phonetic: "MOO-choh GOOS-toh" },
  { id: 3, english: "My name is...", spanish: "Me llamo...", phonetic: "meh YAH-moh" },
  { id: 4, english: "Where are you from?", spanish: "¿De dónde eres?", phonetic: "deh DOHN-deh EH-rehs" },
  { id: 5, english: "I don't understand", spanish: "No entiendo", phonetic: "noh ehn-TYEHN-doh" },
  { id: 6, english: "Thank you very much", spanish: "Muchas gracias", phonetic: "MOO-chahs GRAH-syahs" },
  { id: 7, english: "See you later", spanish: "Hasta luego", phonetic: "AHS-tah LWEH-goh" },
  { id: 8, english: "Can you help me?", spanish: "¿Puedes ayudarme?", phonetic: "PWEH-dehs ah-yoo-DAHR-meh" },
];

export default function SectionPractice({ colorClasses }: SectionPracticeProps) {
  const [cards, setCards] = useState<FlashCard[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const currentCard = cards[currentIndex];
  const progress = ((knownCount + practiceCount) / cards.length) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY * 0.3 });
    
    if (deltaX > 50) {
      setSwipeDirection("right");
    } else if (deltaX < -50) {
      setSwipeDirection("left");
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(swipeDirection === "right" ? "known" : "practice");
    } else {
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startPos.current.x;
    const deltaY = e.touches[0].clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY * 0.3 });
    
    if (deltaX > 50) {
      setSwipeDirection("right");
    } else if (deltaX < -50) {
      setSwipeDirection("left");
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleSwipe = (action: "known" | "practice") => {
    if (action === "known") {
      setKnownCount((prev) => prev + 1);
      setDragOffset({ x: 300, y: 0 });
    } else {
      setPracticeCount((prev) => prev + 1);
      setDragOffset({ x: -300, y: 0 });
    }

    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setDragOffset({ x: 0, y: 0 });
        setSwipeDirection(null);
        setIsFlipped(false);
      } else {
        setCompleted(true);
      }
    }, 300);
  };

  const playAudio = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1500);
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setKnownCount(0);
    setPracticeCount(0);
    setCompleted(false);
    setDragOffset({ x: 0, y: 0 });
    setSwipeDirection(null);
    setIsFlipped(false);
  };

  if (completed) {
    return (
      <section className="mb-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${colorClasses.gradient} shadow-lg`}>
              <span className="text-white font-bold">C</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Practice Activity</h2>
              <p className="text-white/40 text-sm">Flashcard practice completed!</p>
            </div>
          </div>
        </div>

        {/* Completion Screen */}
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-white mb-2">Great Job!</h3>
          <p className="text-white/60 mb-6">You've completed all flashcards</p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">{knownCount}</p>
              <p className="text-white/40 text-sm">I know this ✓</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-400">{practiceCount}</p>
              <p className="text-white/40 text-sm">Need practice</p>
            </div>
          </div>

          <button
            onClick={resetPractice}
            className={`px-6 py-3 rounded-xl font-medium bg-gradient-to-r ${colorClasses.gradient} text-white hover:scale-105 active:scale-95 transition-transform`}
          >
            Practice Again
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
              <span className="text-white font-bold">C</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Practice Activity</h2>
              <p className="text-white/40 text-sm">Swipe to sort flashcards</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-medium">{currentIndex + 1} / {cards.length}</p>
            <p className="text-white/40 text-xs">cards</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${colorClasses.gradient} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard Area */}
      <div className="p-6 relative min-h-[400px]">
        {/* Swipe Indicators */}
        <div className="absolute inset-x-6 top-6 flex justify-between pointer-events-none z-10">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              swipeDirection === "left" ? "bg-orange-500/30 border-2 border-orange-500" : "bg-white/5 border border-white/10"
            }`}
          >
            <span className="text-lg">👈</span>
            <span className={swipeDirection === "left" ? "text-orange-400" : "text-white/40"}>Practice again</span>
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              swipeDirection === "right" ? "bg-emerald-500/30 border-2 border-emerald-500" : "bg-white/5 border border-white/10"
            }`}
          >
            <span className={swipeDirection === "right" ? "text-emerald-400" : "text-white/40"}>I know this</span>
            <span className="text-lg">👉</span>
          </div>
        </div>

        {/* Flashcard */}
        {currentCard && (
          <div
            ref={cardRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={() => !isDragging && setIsFlipped(!isFlipped)}
            className={`relative mt-16 cursor-grab active:cursor-grabbing select-none`}
            style={{
              transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${dragOffset.x * 0.05}deg)`,
              transition: isDragging ? "none" : "all 0.3s ease-out",
            }}
          >
            <div
              className={`relative w-full aspect-[4/3] preserve-3d transition-transform duration-500 ${isFlipped ? "rotate-y-180" : ""}`}
              style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "" }}
            >
              {/* Front of Card */}
              <div
                className={`absolute inset-0 p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 ${
                  swipeDirection === "right"
                    ? "border-emerald-500 shadow-lg shadow-emerald-500/20"
                    : swipeDirection === "left"
                    ? "border-orange-500 shadow-lg shadow-orange-500/20"
                    : "border-white/10"
                } backface-hidden flex flex-col items-center justify-center text-center`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="text-white/40 text-sm mb-2">ENGLISH</p>
                <p className="text-white text-2xl md:text-3xl font-bold mb-6">{currentCard.english}</p>
                
                <button
                  onClick={(e) => { e.stopPropagation(); playAudio(); }}
                  className={`p-3 rounded-full transition-all ${
                    isPlaying
                      ? `bg-gradient-to-r ${colorClasses.gradient} animate-pulse`
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                
                <p className="text-white/30 text-sm mt-6">Tap to flip</p>
              </div>

              {/* Back of Card */}
              <div
                className={`absolute inset-0 p-8 rounded-2xl bg-gradient-to-br ${colorClasses.gradient} border-2 ${
                  swipeDirection === "right"
                    ? "border-emerald-300"
                    : swipeDirection === "left"
                    ? "border-orange-300"
                    : "border-white/20"
                } backface-hidden flex flex-col items-center justify-center text-center`}
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <p className="text-white/60 text-sm mb-2">ESPAÑOL</p>
                <p className="text-white text-2xl md:text-3xl font-bold mb-2">{currentCard.spanish}</p>
                <p className="text-white/70 text-sm italic mb-6">{currentCard.phonetic}</p>
                
                <button
                  onClick={(e) => { e.stopPropagation(); playAudio(); }}
                  className={`p-3 rounded-full transition-all ${
                    isPlaying ? "bg-white animate-pulse" : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <svg className={`w-6 h-6 ${isPlaying ? "text-gray-800" : "text-white"}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                
                <p className="text-white/50 text-sm mt-6">Swipe to continue</p>
              </div>
            </div>
          </div>
        )}

        {/* Manual Swipe Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleSwipe("practice")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30 transition-all"
          >
            <span>Practice again</span>
          </button>
          <button
            onClick={() => handleSwipe("known")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-all"
          >
            <span>I know this</span>
          </button>
        </div>
      </div>

      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
