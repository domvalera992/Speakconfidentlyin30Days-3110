import { useState } from "react";

type TabId = "home" | "lessons" | "audio" | "workbook" | "progress" | "settings";

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "lessons", label: "Lessons", icon: "📚" },
  { id: "audio", label: "Audio", icon: "🎧" },
  { id: "workbook", label: "Workbook", icon: "📝" },
  { id: "progress", label: "Progress", icon: "🏆" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

interface BottomNavProps {
  activeTab?: TabId;
  onTabChange?: (tab: TabId) => void;
}

export default function BottomNav({ activeTab = "home", onTabChange }: BottomNavProps) {
  const [currentTab, setCurrentTab] = useState<TabId>(activeTab);

  const handleTabClick = (tabId: TabId) => {
    setCurrentTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-lg mx-auto px-2 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 min-w-[50px] ${
                  isActive
                    ? "bg-gradient-to-t from-amber-500/20 to-transparent"
                    : "hover:bg-white/5"
                }`}
              >
                <span
                  className={`text-xl mb-1 transition-transform duration-300 ${
                    isActive ? "scale-110" : ""
                  }`}
                >
                  {tab.icon}
                </span>
                <span
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    isActive ? "text-amber-400" : "text-white/40"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Safe area for mobile devices */}
      <div className="h-safe-area-inset-bottom bg-[#0a0a0f]" />
    </nav>
  );
}
