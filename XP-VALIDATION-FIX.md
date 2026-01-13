# Add XP Validation

## Problem
No validation on XP values → could go negative, break level calculations.

## Fix

Update `src/web/hooks/useGameification.ts`:

```typescript
const addXP = (amount: number) => {
  setUserData(prev => {
    // Validate amount
    if (typeof amount !== 'number' || isNaN(amount)) {
      console.error('Invalid XP amount:', amount);
      return prev;
    }
    
    // Ensure amount is positive
    const validAmount = Math.max(0, Math.floor(amount));
    
    // Calculate new XP
    const newXP = Math.max(0, prev.xp + validAmount); // Never go below 0
    
    // Calculate new level
    const newLevel = calculateLevel(newXP);
    
    // Check for level up
    if (newLevel > prev.level) {
      // Level up celebration
      toast.success(`🎉 Level Up! You're now a ${getLevelName(newLevel)}!`);
    }
    
    return {
      ...prev,
      xp: newXP,
      level: newLevel
    };
  });
};

const calculateLevel = (xp: number): number => {
  // Ensure XP is valid
  const validXP = Math.max(0, xp);
  
  if (validXP < 500) return 1;
  if (validXP < 1500) return 2;
  if (validXP < 3000) return 3;
  if (validXP < 5000) return 4;
  return 5;
};

const getXPForNextLevel = (currentXP: number): number => {
  const validXP = Math.max(0, currentXP);
  
  if (validXP < 500) return 500;
  if (validXP < 1500) return 1500;
  if (validXP < 3000) return 3000;
  if (validXP < 5000) return 5000;
  return 5000; // Max level
};

const getProgressToNextLevel = (currentXP: number): number => {
  const validXP = Math.max(0, currentXP);
  const nextLevelXP = getXPForNextLevel(validXP);
  const currentLevelXP = getCurrentLevelStartXP(validXP);
  
  if (nextLevelXP === currentLevelXP) return 100; // Max level
  
  const progress = ((validXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  
  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, progress));
};

const getCurrentLevelStartXP = (xp: number): number => {
  const validXP = Math.max(0, xp);
  
  if (validXP < 500) return 0;
  if (validXP < 1500) return 500;
  if (validXP < 3000) return 1500;
  if (validXP < 5000) return 3000;
  return 5000;
};
```

## Add XP Cap (Optional)

Prevent infinite XP exploits:

```typescript
const MAX_XP_PER_ACTION = 500;
const MAX_DAILY_XP = 2000;

const addXP = (amount: number) => {
  // Cap single action XP
  const cappedAmount = Math.min(amount, MAX_XP_PER_ACTION);
  
  // Check daily limit
  const today = new Date().toDateString();
  const dailyXP = getDailyXP(today);
  
  if (dailyXP >= MAX_DAILY_XP) {
    toast.warning('Daily XP limit reached! Come back tomorrow 🌟');
    return;
  }
  
  const finalAmount = Math.min(cappedAmount, MAX_DAILY_XP - dailyXP);
  
  // ... rest of addXP logic
};
```

## Result

- XP never goes negative
- Level calculations always work
- Progress bars never break
- Optional: prevents XP exploits
