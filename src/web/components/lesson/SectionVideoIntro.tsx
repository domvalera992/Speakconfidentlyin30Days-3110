import { useState, useRef, useEffect } from "react";

interface ColorClasses {
  accent: string;
  bg: string;
  border: string;
  gradient: string;
}

interface SectionVideoIntroProps {
  colorClasses: ColorClasses;
  lessonTitle: string;
}

export default function SectionVideoIntro({ colorClasses, lessonTitle }: SectionVideoIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration] = useState(120); // 2 minutes = 120 seconds
  const [currentTime, setCurrentTime] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  useEffect(() => {
    setProgress((currentTime / duration) * 100);
  }, [currentTime, duration]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    setCurrentTime(Math.floor(percentage * duration));
  };

  const learningGoals = [
    "Master essential greetings and introductions",
    "Learn pronunciation tips for common sounds",
    "Practice natural conversation starters",
  ];

  return (
    <section className="mb-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
      {/* Section Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r ${colorClasses.gradient} shadow-lg`}>
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Video Introduction</h2>
            <p className="text-white/40 text-sm">Meet your instructor & learn what's ahead</p>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Video Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, ${colorClasses.accent.includes('emerald') ? '#10b981' : colorClasses.accent.includes('cyan') ? '#06b6d4' : '#f59e0b'} 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        {/* Instructor Avatar / Video Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {/* Instructor Avatar */}
            <div className="relative inline-block mb-4">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${colorClasses.gradient} p-1`}>
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-4xl">👩‍🏫</span>
                </div>
              </div>
              {isPlaying && (
                <div className="absolute -inset-2 rounded-full animate-ping opacity-30">
                  <div className={`w-full h-full rounded-full bg-gradient-to-r ${colorClasses.gradient}`} />
                </div>
              )}
            </div>
            
            {/* Instructor Info */}
            <p className="text-white font-medium mb-1">María García</p>
            <p className="text-white/40 text-sm mb-4">Native Spanish Speaker & Language Coach</p>
            
            {/* Lesson Preview */}
            {!isPlaying && (
              <div className="max-w-xs mx-auto">
                <p className={`${colorClasses.accent} text-sm font-medium mb-1`}>Today's Lesson</p>
                <p className="text-white/70 text-sm">{lessonTitle}</p>
              </div>
            )}

            {/* Audio Waveform Animation (when playing) */}
            {isPlaying && (
              <div className="flex items-end justify-center gap-1 h-12 mt-4">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full bg-gradient-to-t ${colorClasses.gradient}`}
                    style={{
                      height: `${20 + Math.random() * 80}%`,
                      animation: `audioWave ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Play/Pause Overlay Button */}
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying
                ? "bg-white/10 backdrop-blur-sm scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                : `bg-gradient-to-r ${colorClasses.gradient} shadow-2xl hover:scale-110`
            }`}
          >
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </button>

        {/* Progress Bar & Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          {/* Progress Scrubber */}
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer group mb-3"
          >
            <div
              className={`h-full rounded-full bg-gradient-to-r ${colorClasses.gradient} relative transition-all duration-100`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Time & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlayPause}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Time Display */}
              <span className="text-white/60 text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Volume & Speed */}
            <div className="flex items-center gap-2">
              <button className="text-white/60 hover:text-white transition-colors text-sm font-medium px-2 py-1 rounded bg-white/5 hover:bg-white/10">
                1x
              </button>
              <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="p-5 border-t border-white/10">
        <h3 className="text-white font-medium mb-3 flex items-center gap-2">
          <span className="text-lg">🎯</span>
          What you'll learn today...
        </h3>
        <ul className="space-y-2">
          {learningGoals.map((goal, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-r ${colorClasses.gradient}`}>
                <span className="text-white text-xs font-bold">{idx + 1}</span>
              </div>
              <span className="text-white/70 text-sm">{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Audio Wave Animation Styles */}
      <style>{`
        @keyframes audioWave {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
