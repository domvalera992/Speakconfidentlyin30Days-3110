import { useState, useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import ListenRepeatMode from "./ListenRepeatMode";
import PhraseList from "./PhraseList";
import { useAudioState } from "../../hooks/useAudioState";
import { 
  getPhrasesByCategory, 
  getAllPhrases,
  type AudioPhrase 
} from "../../data/audioPhrases";

interface AudioCategory {
  id: string;
  title: string;
  icon: string;
  phraseCount: number;
  duration: string;
  color: string;
  gradient: string;
}

const audioCategories: AudioCategory[] = [
  {
    id: "core-phrases",
    title: "Core Phrases",
    icon: "💬",
    phraseCount: 100,
    duration: "45 min",
    color: "amber",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: "restaurant-food",
    title: "Restaurant & Food",
    icon: "🍽️",
    phraseCount: 25,
    duration: "15 min",
    color: "rose",
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    id: "travel-hotels",
    title: "Travel & Hotels",
    icon: "✈️",
    phraseCount: 28,
    duration: "18 min",
    color: "sky",
    gradient: "from-sky-500/20 to-cyan-500/20",
  },
  {
    id: "shopping",
    title: "Shopping",
    icon: "🛍️",
    phraseCount: 22,
    duration: "12 min",
    color: "violet",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: "emergencies",
    title: "Emergencies",
    icon: "🚨",
    phraseCount: 18,
    duration: "10 min",
    color: "red",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    id: "workplace",
    title: "Workplace",
    icon: "💼",
    phraseCount: 24,
    duration: "14 min",
    color: "emerald",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: "phone-calls",
    title: "Phone Calls",
    icon: "📞",
    phraseCount: 18,
    duration: "10 min",
    color: "indigo",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    id: "meeting-people",
    title: "Meeting People",
    icon: "👋",
    phraseCount: 22,
    duration: "13 min",
    color: "fuchsia",
    gradient: "from-fuchsia-500/20 to-pink-500/20",
  },
  {
    id: "full-conversations",
    title: "Full Conversations",
    icon: "💭",
    phraseCount: 12,
    duration: "25 min",
    color: "cyan",
    gradient: "from-cyan-500/20 to-teal-500/20",
  },
];

interface AudioPracticeProps {
  onCategorySelect?: (categoryId: string) => void;
}

export default function AudioPractice({ onCategorySelect }: AudioPracticeProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<AudioCategory | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showListenRepeat, setShowListenRepeat] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState<AudioPhrase | null>(null);
  const [currentPhrases, setCurrentPhrases] = useState<AudioPhrase[]>([]);
  
  const { 
    favorites, 
    history, 
    toggleFavorite, 
    addToHistory, 
    isFavorite 
  } = useAudioState();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCategoryClick = (category: AudioCategory) => {
    const phrases = getPhrasesByCategory(category.id);
    setSelectedCategory(category);
    setCurrentPhrases(phrases);
    onCategorySelect?.(category.id);
  };

  const handlePhraseSelect = (phrase: AudioPhrase) => {
    setCurrentPhrase(phrase);
    setShowPlayer(true);
    addToHistory(phrase);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
  };

  const handleBackFromList = () => {
    setSelectedCategory(null);
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { border: string; text: string; glow: string }> = {
      amber: { border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-amber-500/10" },
      rose: { border: "border-rose-500/30", text: "text-rose-400", glow: "shadow-rose-500/10" },
      sky: { border: "border-sky-500/30", text: "text-sky-400", glow: "shadow-sky-500/10" },
      violet: { border: "border-violet-500/30", text: "text-violet-400", glow: "shadow-violet-500/10" },
      red: { border: "border-red-500/30", text: "text-red-400", glow: "shadow-red-500/10" },
      emerald: { border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/10" },
      indigo: { border: "border-indigo-500/30", text: "text-indigo-400", glow: "shadow-indigo-500/10" },
      fuchsia: { border: "border-fuchsia-500/30", text: "text-fuchsia-400", glow: "shadow-fuchsia-500/10" },
      cyan: { border: "border-cyan-500/30", text: "text-cyan-400", glow: "shadow-cyan-500/10" },
    };
    return colorMap[color] || colorMap.amber;
  };

  // Show phrase list if a category is selected
  if (selectedCategory) {
    return (
      <>
        <PhraseList
          phrases={currentPhrases}
          title={selectedCategory.title}
          icon={selectedCategory.icon}
          onPhraseSelect={handlePhraseSelect}
          onBack={handleBackFromList}
        />
        {/* Audio Player */}
        {showPlayer && currentPhrase && (
          <AudioPlayer
            currentPhrase={currentPhrase}
            phrases={currentPhrases}
            onPhraseChange={(phrase) => {
              setCurrentPhrase(phrase);
              addToHistory(phrase);
            }}
            onClose={handleClosePlayer}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(currentPhrase.id)}
          />
        )}
      </>
    );
  }

  return (
    <div className={`min-h-screen bg-[#0a0a0f] text-white ${showPlayer ? "pb-64" : "pb-24"}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-amber-500/6 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center border border-violet-500/20">
              <span className="text-2xl">🎧</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                Audio Practice
              </h1>
              <p className="text-white/50 text-sm">Listen, repeat & master</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <span className="text-lg">📊</span>
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">{getAllPhrases().length} phrases</p>
              <p className="text-white/40 text-xs">Total library</p>
            </div>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl p-3 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <span className="text-lg">⏱️</span>
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">~2.5 hours</p>
              <p className="text-white/40 text-xs">Of content</p>
            </div>
          </div>
        </div>

        {/* Listen & Repeat Mode Card */}
        <div className={`mb-8 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button 
            onClick={() => setShowListenRepeat(true)}
            className="w-full p-5 rounded-2xl bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-emerald-500/10 border border-violet-500/20 hover:border-violet-400/40 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-white mb-1">Listen & Repeat Mode</h3>
                <p className="text-white/50 text-sm">Guided practice with auto-pause intervals</p>
              </div>
              <svg className="w-6 h-6 text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Categories Section */}
        <div className={`transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-lg font-semibold text-white/80 mb-4 flex items-center gap-2">
            <span>Browse Categories</span>
            <span className="text-xs text-white/40 font-normal">• 9 packs</span>
          </h2>

          {/* Category Grid */}
          <div className="grid grid-cols-1 gap-3">
            {audioCategories.map((category, index) => {
              const colors = getColorClasses(category.color);
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className={`p-4 rounded-2xl bg-gradient-to-r ${category.gradient} border ${colors.border} ${colors.glow} shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-left">
                      <h3 className="text-white font-semibold mb-1">{category.title}</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className={`${colors.text}`}>{category.phraseCount} phrases</span>
                        <span className="text-white/30">•</span>
                        <span className="text-white/50">{category.duration}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <svg className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`mt-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white/80">Recently Played</h2>
            {favorites.size > 0 && (
              <span className="text-xs text-rose-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                {favorites.size} saved
              </span>
            )}
          </div>
          
          {history.length > 0 ? (
            <div className="space-y-2">
              {history.slice(0, 3).map((phrase) => (
                <button
                  key={phrase.id}
                  onClick={() => {
                    const cat = audioCategories.find(c => getPhrasesByCategory(c.id).some(p => p.id === phrase.id));
                    if (cat) {
                      handleCategoryClick(cat);
                      setTimeout(() => handlePhraseSelect(phrase), 100);
                    }
                  }}
                  className="w-full bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 font-medium truncate">{phrase.english}</p>
                      <p className="text-amber-400/70 text-sm truncate">{phrase.spanish}</p>
                    </div>
                    {isFavorite(phrase.id) && (
                      <svg className="w-4 h-4 text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎵</span>
              </div>
              <p className="text-white/50 text-sm">No recent activity</p>
              <p className="text-white/30 text-xs mt-1">Start practicing to see your history</p>
            </div>
          )}
        </div>
        
        {/* Background Play Indicator */}
        <div className={`mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-sm font-medium">Background Play Ready</p>
              <p className="text-white/40 text-xs">Audio continues when you switch apps</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Listen & Repeat Mode */}
      {showListenRepeat && (
        <ListenRepeatMode
          phrases={getAllPhrases().slice(0, 20)} // Use first 20 phrases for practice
          onClose={() => setShowListenRepeat(false)}
        />
      )}
    </div>
  );
}
