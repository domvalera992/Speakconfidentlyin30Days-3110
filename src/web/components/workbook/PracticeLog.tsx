import { useState, useEffect } from "react";

interface PracticeEntry {
  id: number;
  date: Date;
  phrases: string[];
  confidenceRating: number;
  notes: string;
  tomorrowGoal: string;
  duration: number; // in minutes
}

// Sample data
const sampleEntries: PracticeEntry[] = [
  {
    id: 1,
    date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
    phrases: ["Hola", "Gracias", "Por favor", "¿Cómo estás?"],
    confidenceRating: 4,
    notes: "Felt good about greetings today. Need to work on pronunciation.",
    tomorrowGoal: "Practice restaurant vocabulary",
    duration: 15,
  },
  {
    id: 2,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    phrases: ["Buenos días", "Buenas noches", "Hasta luego"],
    confidenceRating: 3,
    notes: "Struggled with 'luego' pronunciation. Will practice more.",
    tomorrowGoal: "Review greetings and add new ones",
    duration: 10,
  },
  {
    id: 3,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    phrases: ["¿Dónde está el baño?", "¿Cuánto cuesta?", "La cuenta, por favor"],
    confidenceRating: 4,
    notes: "Great session! Finally getting comfortable with questions.",
    tomorrowGoal: "Practice ordering food",
    duration: 20,
  },
  {
    id: 4,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    phrases: ["Uno", "Dos", "Tres", "Cuatro", "Cinco"],
    confidenceRating: 5,
    notes: "Numbers are easy! Feeling confident.",
    tomorrowGoal: "Learn numbers 6-10",
    duration: 8,
  },
  {
    id: 5,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    phrases: ["Me llamo...", "Soy de...", "Mucho gusto"],
    confidenceRating: 3,
    notes: "Introduction phrases are getting better.",
    tomorrowGoal: "Practice with a partner",
    duration: 12,
  },
];

const phraseLibrary = [
  "Hola", "Adiós", "Gracias", "Por favor", "De nada", "Lo siento",
  "Buenos días", "Buenas tardes", "Buenas noches", "Hasta luego",
  "¿Cómo estás?", "Estoy bien", "¿Cómo te llamas?", "Me llamo...",
  "Mucho gusto", "¿Dónde está el baño?", "¿Cuánto cuesta?",
  "La cuenta, por favor", "No entiendo", "¿Puede repetir?",
  "Sí", "No", "Quizás", "Por supuesto", "Ayuda",
];

interface PracticeLogProps {
  onBack: () => void;
}

export default function PracticeLog({ onBack }: PracticeLogProps) {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<PracticeEntry[]>(sampleEntries);
  const [view, setView] = useState<"list" | "calendar" | "new">("list");
  const [selectedEntry, setSelectedEntry] = useState<PracticeEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New entry form state
  const [newPhrases, setNewPhrases] = useState<string[]>([]);
  const [newRating, setNewRating] = useState(3);
  const [newNotes, setNewNotes] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [newDuration, setNewDuration] = useState(15);
  const [phraseInput, setPhraseInput] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const getRelativeDate = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return formatDate(date);
  };

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      checkDate.setHours(0, 0, 0, 0);

      const hasEntry = sortedEntries.some(e => {
        const entryDate = new Date(e.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === checkDate.getTime();
      });

      if (hasEntry) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  };

  // Weekly stats
  const getWeeklyStats = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekEntries = entries.filter(e => e.date >= weekAgo);
    
    const totalMinutes = weekEntries.reduce((sum, e) => sum + e.duration, 0);
    const totalPhrases = weekEntries.reduce((sum, e) => sum + e.phrases.length, 0);
    const avgConfidence = weekEntries.length > 0 
      ? weekEntries.reduce((sum, e) => sum + e.confidenceRating, 0) / weekEntries.length 
      : 0;

    return { totalMinutes, totalPhrases, avgConfidence, daysActive: weekEntries.length };
  };

  const addPhrase = (phrase: string) => {
    if (phrase && !newPhrases.includes(phrase)) {
      setNewPhrases([...newPhrases, phrase]);
      setPhraseInput("");
    }
  };

  const removePhrase = (phrase: string) => {
    setNewPhrases(newPhrases.filter(p => p !== phrase));
  };

  const submitNewEntry = () => {
    if (newPhrases.length === 0) return;

    const newEntry: PracticeEntry = {
      id: Date.now(),
      date: new Date(),
      phrases: newPhrases,
      confidenceRating: newRating,
      notes: newNotes,
      tomorrowGoal: newGoal,
      duration: newDuration,
    };

    setEntries([newEntry, ...entries]);
    setView("list");
    resetForm();
  };

  const resetForm = () => {
    setNewPhrases([]);
    setNewRating(3);
    setNewNotes("");
    setNewGoal("");
    setNewDuration(15);
    setPhraseInput("");
  };

  const filteredEntries = entries.filter(entry => 
    searchQuery === "" || 
    entry.phrases.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
    entry.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const weeklyStats = getWeeklyStats();
  const streak = calculateStreak();

  const filteredPhrases = phraseLibrary.filter(p => 
    p.toLowerCase().includes(phraseInput.toLowerCase()) && 
    !newPhrases.includes(p)
  );

  // Render new entry form
  if (view === "new") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-80 h-80 bg-fuchsia-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-0 w-96 h-96 bg-pink-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 px-5 py-6 max-w-lg mx-auto">
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Cancel
          </button>

          <h1 className="text-2xl font-bold text-white mb-6">New Practice Entry</h1>

          {/* Phrases */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">Phrases Practiced</label>
            <div className="relative">
              <input
                type="text"
                value={phraseInput}
                onChange={(e) => setPhraseInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPhrase(phraseInput)}
                placeholder="Search or type a phrase..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-fuchsia-500/50"
              />
              {phraseInput && filteredPhrases.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a2e] border border-white/10 rounded-xl overflow-hidden z-10 max-h-40 overflow-y-auto">
                  {filteredPhrases.slice(0, 5).map(phrase => (
                    <button
                      key={phrase}
                      onClick={() => addPhrase(phrase)}
                      className="w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 transition-colors"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {newPhrases.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {newPhrases.map(phrase => (
                  <span key={phrase} className="px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-sm flex items-center gap-2">
                    {phrase}
                    <button onClick={() => removePhrase(phrase)} className="text-fuchsia-400 hover:text-white">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">Duration (minutes)</label>
            <div className="flex gap-2">
              {[5, 10, 15, 20, 30].map(min => (
                <button
                  key={min}
                  onClick={() => setNewDuration(min)}
                  className={`flex-1 py-2 rounded-lg transition-all ${
                    newDuration === min 
                      ? "bg-fuchsia-500/20 border border-fuchsia-500/50 text-fuchsia-300" 
                      : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {min}
                </button>
              ))}
            </div>
          </div>

          {/* Confidence Rating */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">Confidence Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setNewRating(rating)}
                  className={`flex-1 py-3 rounded-xl text-2xl transition-all ${
                    rating <= newRating ? "scale-110" : "opacity-40"
                  }`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">Notes & Reflections</label>
            <textarea
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="How did today's practice go?"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-fuchsia-500/50 resize-none"
              rows={3}
            />
          </div>

          {/* Tomorrow's Goal */}
          <div className="mb-8">
            <label className="block text-white/60 text-sm mb-2">Tomorrow's Goal</label>
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="What will you focus on next?"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-fuchsia-500/50"
            />
          </div>

          {/* Submit */}
          <button
            onClick={submitNewEntry}
            disabled={newPhrases.length === 0}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              newPhrases.length > 0
                ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white hover:from-fuchsia-600 hover:to-pink-600"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            Save Entry
          </button>
        </div>
      </div>
    );
  }

  // Render entry detail
  if (selectedEntry) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-80 h-80 bg-fuchsia-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-0 w-96 h-96 bg-pink-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 px-5 py-6 max-w-lg mx-auto">
          <button
            onClick={() => setSelectedEntry(null)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{getRelativeDate(selectedEntry.date)}</h2>
              <span className="text-white/40 text-sm">{selectedEntry.duration} min</span>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <p className="text-white/40 text-sm mb-1">Confidence</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className={star <= selectedEntry.confidenceRating ? "" : "opacity-20"}>⭐</span>
                ))}
              </div>
            </div>

            {/* Phrases */}
            <div className="mb-4">
              <p className="text-white/40 text-sm mb-2">Phrases Practiced</p>
              <div className="flex flex-wrap gap-2">
                {selectedEntry.phrases.map(phrase => (
                  <span key={phrase} className="px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-sm">
                    {phrase}
                  </span>
                ))}
              </div>
            </div>

            {/* Notes */}
            {selectedEntry.notes && (
              <div className="mb-4">
                <p className="text-white/40 text-sm mb-1">Notes</p>
                <p className="text-white/80">{selectedEntry.notes}</p>
              </div>
            )}

            {/* Goal */}
            {selectedEntry.tomorrowGoal && (
              <div>
                <p className="text-white/40 text-sm mb-1">Goal for Next Session</p>
                <p className="text-emerald-400">{selectedEntry.tomorrowGoal}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-fuchsia-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-pink-500/8 rounded-full blur-3xl" />
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 flex items-center justify-center border border-fuchsia-500/20">
                <span className="text-2xl">📓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Practice Log</h1>
                <p className="text-white/50 text-sm">Track your learning journey</p>
              </div>
            </div>
            <button
              onClick={() => setView("new")}
              className="w-12 h-12 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-2 gap-3 mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🔥</span>
              <span className="text-2xl font-bold text-amber-400">{streak}</span>
            </div>
            <p className="text-white/50 text-sm">Day streak</p>
          </div>
          
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">⏱️</span>
              <span className="text-2xl font-bold text-emerald-400">{weeklyStats.totalMinutes}</span>
            </div>
            <p className="text-white/50 text-sm">Minutes this week</p>
          </div>
          
          <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">💬</span>
              <span className="text-2xl font-bold text-violet-400">{weeklyStats.totalPhrases}</span>
            </div>
            <p className="text-white/50 text-sm">Phrases practiced</p>
          </div>
          
          <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">⭐</span>
              <span className="text-2xl font-bold text-rose-400">{weeklyStats.avgConfidence.toFixed(1)}</span>
            </div>
            <p className="text-white/50 text-sm">Avg confidence</p>
          </div>
        </div>

        {/* Search */}
        <div className={`mb-6 transition-all duration-700 delay-150 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search entries..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-fuchsia-500/50"
            />
          </div>
        </div>

        {/* Entries List */}
        <div className={`space-y-3 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-lg font-semibold text-white/80">Recent Entries</h2>
          
          {filteredEntries.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-3 block">📝</span>
              <p className="text-white/40">No entries found</p>
            </div>
          ) : (
            filteredEntries.map(entry => (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{getRelativeDate(entry.date)}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-sm">{entry.duration} min</span>
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={`text-sm ${star <= entry.confidenceRating ? "" : "opacity-20"}`}>⭐</span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {entry.phrases.slice(0, 3).map(phrase => (
                    <span key={phrase} className="px-2 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 text-xs">
                      {phrase}
                    </span>
                  ))}
                  {entry.phrases.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/40 text-xs">
                      +{entry.phrases.length - 3} more
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
