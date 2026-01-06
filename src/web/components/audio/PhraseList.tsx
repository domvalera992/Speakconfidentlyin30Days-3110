import { useState } from "react";
import type { AudioPhrase } from "../../data/audioPhrases";

interface PhraseListProps {
  phrases: AudioPhrase[];
  title: string;
  icon: string;
  onPhraseSelect?: (phrase: AudioPhrase) => void;
  onBack: () => void;
}

export default function PhraseList({ 
  phrases, 
  title, 
  icon, 
  onPhraseSelect,
  onBack 
}: PhraseListProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handlePlay = (phrase: AudioPhrase) => {
    setPlayingId(phrase.id);
    onPhraseSelect?.(phrase);
    // Simulate audio playing for 2 seconds
    setTimeout(() => setPlayingId(null), 2000);
  };

  const toggleFavorite = (phraseId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(phraseId)) {
        newFavorites.delete(phraseId);
      } else {
        newFavorites.add(phraseId);
      }
      return newFavorites;
    });
  };

  // Group phrases by subcategory
  const groupedPhrases = phrases.reduce((acc, phrase) => {
    if (!acc[phrase.category]) {
      acc[phrase.category] = [];
    }
    acc[phrase.category].push(phrase);
    return acc;
  }, {} as Record<string, AudioPhrase[]>);

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      greetings: "👋 Greetings",
      polite: "🙏 Polite Phrases",
      responses: "💬 Basic Responses",
      help: "🆘 Help Phrases",
      questions: "❓ Questions",
      numbers: "🔢 Numbers",
      days: "📅 Days of the Week",
      time: "⏰ Time Expressions",
      verbs: "🏃 Basic Verbs",
      adjectives: "✨ Common Adjectives",
      restaurant: "🍽️ Restaurant",
      travel: "✈️ Travel",
      emergency: "🚨 Emergency",
      shopping: "🛍️ Shopping",
      workplace: "💼 Workplace",
      phone: "📞 Phone",
      meeting: "👋 Meeting People",
      conversation: "💭 Conversations",
    };
    return labels[cat] || cat;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-5 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/20">
              <span className="text-2xl">{icon}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{title}</h1>
              <p className="text-white/50 text-sm">{phrases.length} phrases</p>
            </div>
          </div>
        </div>

        {/* Phrase Groups */}
        {Object.entries(groupedPhrases).map(([category, categoryPhrases]) => (
          <div key={category} className="mb-6">
            <h2 className="text-sm font-semibold text-white/60 mb-3 px-1">
              {getCategoryLabel(category)}
            </h2>
            <div className="space-y-2">
              {categoryPhrases.map((phrase) => {
                const isPlaying = playingId === phrase.id;
                const isFavorite = favorites.has(phrase.id);
                
                return (
                  <div
                    key={phrase.id}
                    className={`p-4 rounded-2xl bg-white/5 border transition-all duration-300 ${
                      isPlaying 
                        ? "border-amber-500/40 shadow-lg shadow-amber-500/10" 
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Play Button */}
                      <button
                        onClick={() => handlePlay(phrase)}
                        className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isPlaying
                            ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {isPlaying ? (
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3].map((i) => (
                              <div 
                                key={i}
                                className="w-0.5 bg-white rounded-full animate-pulse"
                                style={{ 
                                  height: `${10 + Math.random() * 8}px`,
                                  animationDelay: `${i * 100}ms`
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        )}
                      </button>

                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium leading-snug">
                          {phrase.english}
                        </p>
                        <p className="text-amber-400/80 text-sm mt-1">
                          {phrase.spanish}
                        </p>
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(phrase.id)}
                        className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isFavorite
                            ? "text-rose-400"
                            : "text-white/30 hover:text-white/50"
                        }`}
                      >
                        <svg 
                          className="w-5 h-5" 
                          fill={isFavorite ? "currentColor" : "none"} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
