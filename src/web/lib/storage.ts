// Safe localStorage wrapper with error handling

export const safeStorage = {
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  },

  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        // Storage is full - clear old data
        console.warn('localStorage quota exceeded, clearing old data...');
        safeStorage.clearOldData();
        
        // Try again
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (retryError) {
          console.error('Still failed after clearing:', retryError);
          alert('Storage is full. Please clear your browser data or use a different browser.');
          return false;
        }
      }
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  },

  clearOldData: (): void => {
    // Clear least important data first
    const keysToTry = [
      'audio_history',
      'practice_log_entries',
      'audio_favorites',
      'recent_phrases',
    ];
    
    keysToTry.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error clearing ${key}:`, error);
      }
    });
  },

  getSize: (): number => {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  },

  getSizeMB: (): string => {
    return (safeStorage.getSize() / (1024 * 1024)).toFixed(2);
  }
};
