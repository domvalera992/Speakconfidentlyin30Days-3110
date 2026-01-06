import { useState, useEffect, useRef, useCallback } from "react";

interface AudioPhrase {
  id: string;
  english: string;
  spanish: string;
}

interface AudioPlayerProps {
  currentPhrase?: AudioPhrase;
  phrases: AudioPhrase[];
  onPhraseChange?: (phrase: AudioPhrase) => void;
  onClose?: () => void;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export default function AudioPlayer({ 
  currentPhrase, 
  phrases, 
  onPhraseChange,
  onClose,
  onToggleFavorite,
  isFavorite = false,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(3.5);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showDownloadToast, setShowDownloadToast] = useState(false);
  
  const progressRef = useRef<HTMLDivElement>(null);
  const currentIndex = currentPhrase ? phrases.findIndex(p => p.id === currentPhrase.id) : 0;

  const speedOptions = [0.5, 0.75, 1, 1.25];

  const handleNext = useCallback(() => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * phrases.length);
      onPhraseChange?.(phrases[randomIndex]);
    } else if (currentIndex < phrases.length - 1) {
      onPhraseChange?.(phrases[currentIndex + 1]);
    } else if (isRepeat) {
      onPhraseChange?.(phrases[0]);
    }
    setCurrentTime(0);
  }, [isShuffle, currentIndex, phrases, onPhraseChange, isRepeat]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onPhraseChange?.(phrases[currentIndex - 1]);
      setCurrentTime(0);
    }
  }, [currentIndex, phrases, onPhraseChange]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          handlePrevious();
          break;
        case "KeyR":
          if (!e.metaKey && !e.ctrlKey) {
            setIsRepeat(prev => !prev);
          }
          break;
        case "KeyS":
          if (!e.metaKey && !e.ctrlKey) {
            setIsShuffle(prev => !prev);
          }
          break;
        case "KeyF":
          if (!e.metaKey && !e.ctrlKey && currentPhrase) {
            onToggleFavorite?.(currentPhrase.id);
          }
          break;
        case "Escape":
          onClose?.();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePlayPause, handleNext, handlePrevious, currentPhrase, onToggleFavorite, onClose]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const next = prev + (0.1 * playbackSpeed);
        if (next >= duration) {
          if (isRepeat) {
            return 0;
          } else {
            handleNext();
            return 0;
          }
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, isRepeat, duration, handleNext]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * duration);
  };

  const handleDownload = () => {
    setShowDownloadToast(true);
    setTimeout(() => setShowDownloadToast(false), 2000);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  // Generate waveform bars
  const waveformBars = Array.from({ length: 40 }, (_, i) => ({
    height: 20 + Math.sin(i * 0.3) * 15 + Math.random() * 10,
    active: (i / 40) * 100 <= progress,
  }));

  if (!currentPhrase) return null;

  return (
    <>
      {/* Download Toast */}
      {showDownloadToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-3 bg-emerald-500/90 text-white rounded-xl shadow-lg backdrop-blur-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Saved for offline use</span>
          </div>
        </div>
      )}

      <div className="fixed bottom-20 left-0 right-0 z-40 px-3">
        <div className="max-w-lg mx-auto bg-gradient-to-br from-[#1a1a24] to-[#0f0f18] rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
          {/* Collapse Handle */}
          <button 
            onClick={onClose}
            className="w-full py-2 flex justify-center"
          >
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </button>

          {/* Current Phrase Display */}
          <div className="px-5 pb-4">
            <div className="text-center mb-4">
              <p className="text-lg font-semibold text-white mb-1">{currentPhrase.english}</p>
              <p className="text-amber-400">{currentPhrase.spanish}</p>
              <p className="text-white/40 text-xs mt-2">
                {currentIndex + 1} of {phrases.length}
              </p>
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-center gap-[2px] h-12 mb-4">
              {waveformBars.map((bar, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    bar.active 
                      ? "bg-gradient-to-t from-violet-500 to-cyan-400" 
                      : "bg-white/10"
                  }`}
                  style={{ 
                    height: `${bar.height}px`,
                    transform: isPlaying && bar.active ? `scaleY(${1 + Math.sin(Date.now() * 0.01 + i) * 0.2})` : 'scaleY(1)'
                  }}
                />
              ))}
            </div>

            {/* Progress Scrubber */}
            <div className="mb-4">
              <div 
                ref={progressRef}
                onClick={handleProgressClick}
                className="h-1.5 bg-white/10 rounded-full cursor-pointer group"
              >
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/40">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              {/* Shuffle */}
              <button
                onClick={() => setIsShuffle(!isShuffle)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isShuffle ? "bg-cyan-500/20 text-cyan-400" : "text-white/40 hover:text-white/70"
                }`}
                title="Shuffle (S)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
                </svg>
              </button>

              {/* Previous */}
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                title="Previous (←)"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30 hover:scale-105 active:scale-95 transition-transform duration-200"
                title="Play/Pause (Space)"
              >
                {isPlaying ? (
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                disabled={currentIndex === phrases.length - 1 && !isRepeat && !isShuffle}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                title="Next (→)"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
              </button>

              {/* Repeat */}
              <button
                onClick={() => setIsRepeat(!isRepeat)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRepeat ? "bg-violet-500/20 text-violet-400" : "text-white/40 hover:text-white/70"
                }`}
                title="Repeat (R)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
                </svg>
              </button>
            </div>

            {/* Secondary Controls */}
            <div className="flex items-center justify-center gap-3">
              {/* Speed Control */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z"/>
                  </svg>
                  {playbackSpeed}x
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-full mb-2 left-0 bg-[#1a1a24] rounded-xl border border-white/10 overflow-hidden shadow-xl">
                    {speedOptions.map(speed => (
                      <button
                        key={speed}
                        onClick={() => {
                          setPlaybackSpeed(speed);
                          setShowSpeedMenu(false);
                        }}
                        className={`block w-full px-6 py-2 text-sm text-left transition-all duration-200 ${
                          playbackSpeed === speed 
                            ? "bg-violet-500/20 text-violet-400" 
                            : "text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => onToggleFavorite?.(currentPhrase.id)}
                className={`px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-2 ${
                  isFavorite ? "text-rose-400" : "text-white/70"
                }`}
                title="Favorite (F)"
              >
                <svg 
                  className="w-4 h-4" 
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
                {isFavorite ? "Saved" : "Save"}
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                title="Download for offline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Offline
              </button>
            </div>

            {/* Keyboard Shortcuts Hint */}
            <div className="mt-4 text-center">
              <p className="text-white/30 text-xs">
                ⌨️ Space: Play | ← → : Skip | R: Repeat | S: Shuffle | F: Favorite
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
