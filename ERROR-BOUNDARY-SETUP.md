# How to Add Error Boundaries

## Step 1: Wrap Main App

Update `src/web/main.tsx`:

```typescript
import { ErrorBoundary } from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
```

## Step 2: Wrap Critical Sections (Optional but recommended)

In `src/web/pages/index.tsx`, wrap major sections:

```typescript
import { ErrorBoundary } from '../components/ErrorBoundary';

// Wrap lesson page
<ErrorBoundary fallback={<div className="p-8 text-white">Lesson failed to load</div>}>
  <LessonPage />
</ErrorBoundary>

// Wrap workbook
<ErrorBoundary fallback={<div className="p-8 text-white">Workbook failed to load</div>}>
  <Workbook />
</ErrorBoundary>
```

## What This Does

- Catches React component errors
- Shows friendly error message instead of white screen
- Allows user to recover by returning home
- Logs errors to console (add Sentry later for production)

## Test It

Intentionally break a component to test:

```typescript
// Add this to any component
if (someCondition) {
  throw new Error('Test error');
}
```

Should show the error boundary UI instead of crashing.
