# Randomize Quiz Answer Order

## Problem
Multiple choice answers always in same order → easy to memorize pattern.

## Fix

Update `src/web/components/lesson/SectionQuiz.tsx`:

Add this shuffle function at the top:

```typescript
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
```

Then when loading questions:

```typescript
const [questions, setQuestions] = useState(() => {
  return quizQuestions.map(q => ({
    ...q,
    // Shuffle options for each question
    options: shuffleArray(q.options)
  }));
});
```

## Important

Make sure to track the CORRECT ANSWER after shuffling:

```typescript
const checkAnswer = (selectedOption: string, question: Question) => {
  // Check against original correct answer, not position
  const isCorrect = selectedOption === question.correctAnswer;
  // ... rest of logic
};
```

## Result

- Answer order randomized for each user
- Different every time quiz is attempted
- Prevents pattern memorization
