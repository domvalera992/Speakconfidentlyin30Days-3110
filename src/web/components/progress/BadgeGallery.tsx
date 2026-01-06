import { useState } from "react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  unlocked: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  gradient: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const BADGES: Badge[] = [
  {
    id: "first_flame",
    name: "First Flame",
    description: "Complete your first lesson",
    icon: "🔥",
    requirement: "Complete 1 lesson",
    unlocked: true,
    earnedDate: "Dec 1, 2024",
    gradient: "from-orange-500 to-amber-500",
    rarity: "common",
  },
  {
    id: "week_warrior",
    name: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "⚔️",
    requirement: "7-day streak",
    unlocked: true,
    earnedDate: "Dec 7, 2024",
    gradient: "from-red-500 to-rose-600",
    rarity: "rare",
  },
  {
    id: "voice_activated",
    name: "Voice Activated",
    description: "Record 10 speaking exercises",
    icon: "🎙️",
    requirement: "Record 10 speaking exercises",
    unlocked: true,
    earnedDate: "Dec 5, 2024",
    progress: 12,
    maxProgress: 10,
    gradient: "from-violet-500 to-purple-600",
    rarity: "rare",
  },
  {
    id: "food_fluent",
    name: "Food Fluent",
    description: "Complete all Restaurant & Food lessons",
    icon: "🍽️",
    requirement: "Complete Restaurant module",
    unlocked: false,
    progress: 2,
    maxProgress: 4,
    gradient: "from-amber-500 to-yellow-500",
    rarity: "epic",
  },
  {
    id: "ready_to_travel",
    name: "Ready to Travel",
    description: "Complete all Travel & Hotels lessons",
    icon: "✈️",
    requirement: "Complete Travel lessons",
    unlocked: false,
    progress: 1,
    maxProgress: 4,
    gradient: "from-cyan-500 to-blue-500",
    rarity: "epic",
  },
  {
    id: "confidence_builder",
    name: "Confidence Builder",
    description: "Complete the Building Confidence module",
    icon: "💪",
    requirement: "Complete Module 3",
    unlocked: false,
    progress: 0,
    maxProgress: 4,
    gradient: "from-emerald-500 to-green-600",
    rarity: "epic",
  },
  {
    id: "graduate",
    name: "Graduate",
    description: "Complete all 5 course modules",
    icon: "🎓",
    requirement: "Finish all modules",
    unlocked: false,
    progress: 1,
    maxProgress: 5,
    gradient: "from-indigo-500 to-blue-600",
    rarity: "legendary",
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Achieve 100% on 5 different quizzes",
    icon: "💯",
    requirement: "Perfect score on 5 quizzes",
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    gradient: "from-pink-500 to-rose-500",
    rarity: "legendary",
  },
  {
    id: "bilingual_boss",
    name: "Bilingual Boss",
    description: "Reach 5000+ XP lifetime",
    icon: "👑",
    requirement: "Earn 5000+ XP total",
    unlocked: false,
    progress: 1847,
    maxProgress: 5000,
    gradient: "from-yellow-400 to-amber-500",
    rarity: "legendary",
  },
];

const RARITY_COLORS = {
  common: "border-gray-400/50 text-gray-300",
  rare: "border-blue-400/50 text-blue-300",
  epic: "border-purple-400/50 text-purple-300",
  legendary: "border-amber-400/50 text-amber-300",
};

const RARITY_LABELS = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

interface BadgeGalleryProps {
  onClose?: () => void;
}

export default function BadgeGallery({ onClose }: BadgeGalleryProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  
  const unlockedCount = BADGES.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🏅</span> Badge Collection
          </h2>
          <p className="text-white/50 text-sm mt-1">
            {unlockedCount} of {BADGES.length} badges earned
          </p>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-3 gap-3">
        {BADGES.map((badge) => (
          <button
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className={`relative aspect-square rounded-2xl p-3 flex flex-col items-center justify-center transition-all duration-300 ${
              badge.unlocked
                ? `bg-gradient-to-br ${badge.gradient}/20 border border-white/20 hover:scale-105 hover:shadow-xl`
                : "bg-white/5 border border-white/10 opacity-60"
            }`}
          >
            <span className={`text-4xl ${badge.unlocked ? "" : "grayscale"}`}>
              {badge.icon}
            </span>
            <p className="text-xs text-white/70 mt-2 text-center font-medium line-clamp-1">
              {badge.name}
            </p>
            
            {/* Progress indicator for locked badges */}
            {!badge.unlocked && badge.progress !== undefined && badge.maxProgress && (
              <div className="absolute bottom-2 left-2 right-2">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/40 rounded-full"
                    style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Unlocked indicator */}
            {badge.unlocked && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div 
            className={`bg-[#0f0f15] rounded-3xl p-6 max-w-sm w-full border ${RARITY_COLORS[selectedBadge.rarity].split(" ")[0]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              {/* Badge Icon */}
              <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center ${
                selectedBadge.unlocked 
                  ? `bg-gradient-to-br ${selectedBadge.gradient}` 
                  : "bg-white/10"
              }`}>
                <span className={`text-6xl ${selectedBadge.unlocked ? "" : "grayscale opacity-50"}`}>
                  {selectedBadge.icon}
                </span>
              </div>

              {/* Rarity Label */}
              <div className={`inline-block mt-4 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${RARITY_COLORS[selectedBadge.rarity]}`}>
                {RARITY_LABELS[selectedBadge.rarity]}
              </div>

              {/* Badge Name */}
              <h3 className="text-2xl font-black text-white mt-3">{selectedBadge.name}</h3>
              <p className="text-white/60 text-sm mt-2">{selectedBadge.description}</p>

              {/* Status */}
              {selectedBadge.unlocked ? (
                <div className="mt-4 bg-emerald-500/20 rounded-xl p-3">
                  <p className="text-emerald-400 font-bold text-sm">✓ Unlocked</p>
                  <p className="text-emerald-400/70 text-xs mt-1">Earned on {selectedBadge.earnedDate}</p>
                </div>
              ) : (
                <div className="mt-4 bg-white/5 rounded-xl p-3">
                  <p className="text-white/60 text-sm">{selectedBadge.requirement}</p>
                  {selectedBadge.progress !== undefined && selectedBadge.maxProgress && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white/40 text-xs">Progress</span>
                        <span className="text-white/70 text-xs font-medium">
                          {selectedBadge.progress.toLocaleString()} / {selectedBadge.maxProgress.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${selectedBadge.gradient} rounded-full`}
                          style={{ width: `${Math.min((selectedBadge.progress / selectedBadge.maxProgress) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setSelectedBadge(null)}
                className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
