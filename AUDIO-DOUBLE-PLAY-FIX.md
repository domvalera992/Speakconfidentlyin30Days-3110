# Fix Multiple Audio Playing at Once

## Problem
User clicks multiple phrases rapidly → 5 audio clips play simultaneously.

## Fix

Update `src/web/hooks/useAudioState.ts`:

```typescript
// Add at the top of the file
let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

export const useAudioState = () => {
  const playPhrase = (text: string, language: string) => {
    // STOP any currently playing audio first
    stopAllAudio();
    
    // Now play the new audio
    if ('speechSynthesis' in window) {
      currentUtterance = new SpeechSynthesisUtterance(text);
      currentUtterance.lang = language === 'spanish' ? 'es-ES' : 'en-US';
      currentUtterance.rate = playbackSpeed;
      
      // Clear reference when done
      currentUtterance.onend = () => {
        currentUtterance = null;
      };
      
      window.speechSynthesis.speak(currentUtterance);
    }
  };
  
  const stopAllAudio = () => {
    // Stop speech synthesis
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    currentUtterance = null;
    
    // Stop any HTML5 audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);
};
```

## Also Update AudioPlayer.tsx

Add a global stop button:

```typescript
<button
  onClick={stopAllAudio}
  className="p-3 bg-red-500/20 rounded-full"
  title="Stop all audio"
>
  ⏹️ Stop All
</button>
```

## Result

- Only one audio plays at a time
- Previous audio stops when new one starts
- Clean stop button for emergencies
