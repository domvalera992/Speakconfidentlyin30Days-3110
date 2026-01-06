interface ProgressBarProps {
  currentScreen: number;
  totalScreens?: number;
}

export default function ProgressBar({ currentScreen, totalScreens = 6 }: ProgressBarProps) {
  const progress = ((currentScreen - 1) / (totalScreens - 1)) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white/50">Step {currentScreen} of {totalScreens}</span>
        <span className="text-xs text-white/50">{Math.round(progress)}% complete</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
