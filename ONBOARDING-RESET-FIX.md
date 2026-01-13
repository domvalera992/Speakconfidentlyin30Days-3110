# Add Onboarding Reset Option

## Problem
User picks wrong language → stuck forever, no way to restart.

## Fix

Add reset button in Settings:

Update `src/web/components/settings/SettingsSection.tsx`:

```typescript
const handleResetOnboarding = () => {
  const confirmed = window.confirm(
    'This will reset your onboarding and allow you to choose a different language. Your progress will NOT be deleted. Continue?'
  );
  
  if (confirmed) {
    // Clear onboarding completion flag
    localStorage.removeItem('onboarding_completed');
    localStorage.removeItem('selected_language');
    localStorage.removeItem('user_name');
    
    // Reload to show onboarding again
    window.location.reload();
  }
};

// Add to Settings UI:
<div className="border-t border-white/10 pt-6">
  <h3 className="text-lg font-semibold text-white mb-3">
    Onboarding
  </h3>
  <button
    onClick={handleResetOnboarding}
    className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30"
  >
    🔄 Restart Onboarding
  </button>
  <p className="text-xs text-gray-500 mt-2">
    Change your language selection or redo the setup
  </p>
</div>
```

## Also Add Confirmation Dialog

Better UX with a custom modal instead of browser confirm:

```typescript
const [showResetModal, setShowResetModal] = useState(false);

// Modal component
{showResetModal && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 max-w-md">
      <h3 className="text-xl font-bold text-white mb-2">
        Reset Onboarding?
      </h3>
      <p className="text-gray-400 mb-6">
        You'll be able to choose a different language. Your progress and XP will be kept.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setShowResetModal(false)}
          className="flex-1 px-4 py-2 bg-white/5 text-white rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleResetOnboarding();
            setShowResetModal(false);
          }}
          className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
)}
```

## Result

- Users can change language choice
- No data loss
- Clear confirmation before reset
