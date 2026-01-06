import { useState, useEffect } from "react";

interface Quote {
  text: string;
  translation?: string;
  author: string;
  language: "en" | "es" | "both";
}

const QUOTES: Quote[] = [
  {
    text: "One language sets you in a corridor for life. Two languages open every door along the way.",
    author: "Frank Smith",
    language: "en",
  },
  {
    text: "El que no arriesga, no gana.",
    translation: "Nothing ventured, nothing gained.",
    author: "Spanish Proverb",
    language: "both",
  },
  {
    text: "The limits of my language mean the limits of my world.",
    author: "Ludwig Wittgenstein",
    language: "en",
  },
  {
    text: "Cada día es una nueva oportunidad para aprender.",
    translation: "Every day is a new opportunity to learn.",
    author: "Unknown",
    language: "both",
  },
  {
    text: "A different language is a different vision of life.",
    author: "Federico Fellini",
    language: "en",
  },
  {
    text: "No hay camino, se hace camino al andar.",
    translation: "There is no path, the path is made by walking.",
    author: "Antonio Machado",
    language: "both",
  },
  {
    text: "You can never understand one language until you understand at least two.",
    author: "Geoffrey Willans",
    language: "en",
  },
  {
    text: "La práctica hace al maestro.",
    translation: "Practice makes perfect.",
    author: "Spanish Proverb",
    language: "both",
  },
  {
    text: "To have another language is to possess a second soul.",
    author: "Charlemagne",
    language: "en",
  },
  {
    text: "Quien tiene un amigo, tiene un tesoro.",
    translation: "He who has a friend, has a treasure.",
    author: "Spanish Proverb",
    language: "both",
  },
  {
    text: "Learning is a treasure that will follow its owner everywhere.",
    author: "Chinese Proverb",
    language: "en",
  },
  {
    text: "Poco a poco se va lejos.",
    translation: "Little by little, one goes far.",
    author: "Spanish Proverb",
    language: "both",
  },
  {
    text: "Language is the road map of a culture.",
    author: "Rita Mae Brown",
    language: "en",
  },
  {
    text: "El que lee mucho y anda mucho, ve mucho y sabe mucho.",
    translation: "He who reads much and travels much, sees much and knows much.",
    author: "Miguel de Cervantes",
    language: "both",
  },
  {
    text: "If you talk to a man in a language he understands, that goes to his head. If you talk to him in his language, that goes to his heart.",
    author: "Nelson Mandela",
    language: "en",
  },
  {
    text: "Más vale tarde que nunca.",
    translation: "Better late than never.",
    author: "Spanish Proverb",
    language: "both",
  },
  {
    text: "Language is not a genetic gift, it is a social gift. Learning a new language is becoming a member of the club.",
    author: "Frank Smith",
    language: "en",
  },
  {
    text: "Querer es poder.",
    translation: "Where there's a will, there's a way.",
    author: "Spanish Proverb",
    language: "both",
  },
  {
    text: "With languages, you are at home anywhere.",
    author: "Edmund de Waal",
    language: "en",
  },
  {
    text: "No dejes para mañana lo que puedas hacer hoy.",
    translation: "Don't leave for tomorrow what you can do today.",
    author: "Spanish Proverb",
    language: "both",
  },
  {
    text: "The beautiful thing about learning is that nobody can take it away from you.",
    author: "B.B. King",
    language: "en",
  },
  {
    text: "En boca cerrada no entran moscas.",
    translation: "A closed mouth catches no flies. (Think before you speak)",
    author: "Spanish Proverb",
    language: "both",
  },
];

const getDailyQuote = (): Quote => {
  // Use the date to get a consistent quote for the day
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return QUOTES[dayOfYear % QUOTES.length];
};

export function DailyQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setQuote(getDailyQuote());
    setMounted(true);
  }, []);

  if (!quote) return null;

  return (
    <div className={`bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-5 border border-purple-400/20 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="flex items-start gap-3">
        <span className="text-3xl">💭</span>
        <div className="flex-1">
          <p className="text-white/90 text-sm italic leading-relaxed">
            "{quote.text}"
          </p>
          {quote.translation && (
            <p className="text-white/50 text-xs mt-2 italic">
              "{quote.translation}"
            </p>
          )}
          <p className="text-white/40 text-xs mt-3">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
}

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-colors">
      <p className="text-white/90 text-sm italic leading-relaxed">
        "{quote.text}"
      </p>
      {quote.translation && (
        <p className="text-white/50 text-xs mt-2 italic">
          "{quote.translation}"
        </p>
      )}
      <p className="text-white/40 text-xs mt-3">— {quote.author}</p>
    </div>
  );
}

export function QuoteGallery() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`space-y-4 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        <span>💬</span> Inspirational Quotes
      </h2>
      <div className="space-y-3">
        {QUOTES.slice(0, 5).map((quote, index) => (
          <div 
            key={index}
            className="transition-all duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <QuoteCard quote={quote} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RandomQuoteWidget() {
  const [quote, setQuote] = useState<Quote>(QUOTES[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * QUOTES.length);
      setQuote(QUOTES[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-2xl p-5 border border-cyan-400/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/50 text-xs uppercase tracking-wider">Daily Inspiration</span>
        <button
          onClick={getRandomQuote}
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-1"
        >
          <svg className={`w-4 h-4 transition-transform ${isAnimating ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      <div className={`transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
        <p className="text-white/90 text-sm italic leading-relaxed">
          "{quote.text}"
        </p>
        {quote.translation && (
          <p className="text-white/50 text-xs mt-2 italic">
            "{quote.translation}"
          </p>
        )}
        <p className="text-white/40 text-xs mt-3">— {quote.author}</p>
      </div>
    </div>
  );
}

export { QUOTES, getDailyQuote };
