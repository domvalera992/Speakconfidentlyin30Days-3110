# Add Loading States to Critical Buttons

## Files to Update

### 1. Payment Button (`CheckoutScreen.tsx`)

Find the submit button and update:

```typescript
const [isProcessing, setIsProcessing] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);
  
  // Your payment logic here
  await processPayment();
  
  setIsProcessing(false);
};

// Button:
<button 
  disabled={isProcessing}
  className={isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
>
  {isProcessing ? (
    <>
      <span className="animate-spin mr-2">⏳</span>
      Processing...
    </>
  ) : (
    'Complete Purchase'
  )}
</button>
```

### 2. Lesson Start Button (`Dashboard.tsx`)

```typescript
const [loadingLesson, setLoadingLesson] = useState<string | null>(null);

const handleStartLesson = (lessonId: string) => {
  setLoadingLesson(lessonId);
  // Navigate to lesson
  setTimeout(() => setLoadingLesson(null), 500);
};

// Button:
<button disabled={loadingLesson === lesson.id}>
  {loadingLesson === lesson.id ? 'Loading...' : 'Start Lesson'}
</button>
```

### 3. Quiz Submit Button (`SectionQuiz.tsx`)

```typescript
const [checking, setChecking] = useState(false);

const checkAnswer = () => {
  setChecking(true);
  setTimeout(() => {
    // Check logic
    setChecking(false);
  }, 500);
};

// Button:
<button disabled={checking}>
  {checking ? 'Checking...' : 'Submit Answer'}
</button>
```

### 4. Audio Play Buttons (`AudioPlayer.tsx`)

```typescript
const [loadingAudio, setLoadingAudio] = useState(false);

const playAudio = () => {
  setLoadingAudio(true);
  // Play audio
  setTimeout(() => setLoadingAudio(false), 300);
};

// Button shows spinning icon while loading
```

## Quick CSS Spinner

Add to `styles.css`:

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
```
