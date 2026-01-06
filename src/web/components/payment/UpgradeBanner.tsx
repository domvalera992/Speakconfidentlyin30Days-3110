interface UpgradeBannerProps {
  onUpgrade: () => void;
  compact?: boolean;
}

export default function UpgradeBanner({ onUpgrade, compact = false }: UpgradeBannerProps) {
  if (compact) {
    return (
      <button
        onClick={onUpgrade}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <span>⭐</span>
        <span>Upgrade</span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-2xl p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">⭐</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Get Lifetime Access</p>
            <p className="text-white/50 text-xs">All lessons, audio & workbooks—forever</p>
          </div>
        </div>
        <button
          onClick={onUpgrade}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
        >
          $34.99
        </button>
      </div>
    </div>
  );
}
