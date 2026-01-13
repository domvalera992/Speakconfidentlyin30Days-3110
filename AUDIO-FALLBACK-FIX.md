# Audio Fallback for Non-Chrome Browsers

## Problem
Web Speech API only works in Chrome/Edge. Fails silently in Safari/Firefox.

## Quick Fix (Show Warning)

Add this to `AudioPlayer.tsx` at the top of component:

```typescript
useEffect(() => {
  // Check if browser supports speech synthesis
  const isSupported = 'speechSynthesis' in window;
  
  if (!isSupported) {
    toast.error('Audio not supported in this browser. Please use Chrome or Edge for full experience.');
  }
}, []);
```

## Better Fix (Audio Files)

Replace Web Speech API with real audio files:

### Option 1: Google Translate TTS API (Free)
```typescript
const playAudio = (text: string, lang: string) => {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(text)}`;
  const audio = new Audio(url);
  audio.play().catch(err => {
    console.error('Audio playback failed:', err);
    toast.error('Could not play audio');
  });
};
```

### Option 2: Pre-recorded Audio
1. Record all 269 phrases with native speakers
2. Host on Cloudinary/AWS S3
3. Replace synthesis with file playback

### Temporary Solution

Update `AudioPlayer.tsx`:

```typescript
const playPhrase = (phrase: string, language: string) => {
  // Check browser support
  if (!('speechSynthesis' in window)) {
    // Fallback to Google TTS
    const lang = language === 'spanish' ? 'es' : 'en';
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(phrase)}`;
    
    const audio = new Audio(url);
    audio.play().catch(err => {
      toast.error('Audio unavailable in this browser. Please use Chrome.');
    });
    return;
  }
  
  // Original Web Speech API code
  const utterance = new SpeechSynthesisUtterance(phrase);
  // ... rest of code
};
```

## Test in Safari

After implementing, test:
1. Open site in Safari
2. Click audio button
3. Should either play via Google TTS or show helpful error
4. Should NOT fail silently

## Long-term Solution

Budget for native speaker recordings:
- 269 phrases × 2 languages = 538 audio files
- Fiverr: ~$50-100 per language
- Total: ~$100-200 for professional audio
