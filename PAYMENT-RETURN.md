# Payment Return Flow Fix

## Problem
After users pay on Stripe, they return to the site but it still shows "Free" status.

## Quick Fix (Manual Toggle)

Add a prominent message on the dashboard for returning users:

1. Create a URL parameter handler to detect returning from Stripe
2. Show a modal saying "Payment successful! Click here to activate your account"
3. Button toggles Pro status

## Better Fix (Stripe Webhooks)

For production, you need:

1. **Stripe Webhook Endpoint:**
   - Receives payment confirmation from Stripe
   - Verifies payment
   - Updates user status in database

2. **Backend Required:**
   - Node.js/Python server
   - Database (PostgreSQL, MongoDB)
   - Stripe webhook secret

## Temporary Solution for Launch

Add this to your Stripe Payment Link success URL:
```
https://yoursite.com?payment=success
```

Then in your app, detect this parameter and show activation instructions.

---

## Implementation (Quick Fix)

Add this to `src/web/pages/index.tsx` after imports:

```typescript
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('payment') === 'success') {
    // Show success modal
    toast.success('Payment successful! Activating your account...');
    
    // Auto-activate (or show manual button)
    setTimeout(() => {
      setIsPro(true); // Your payment state setter
    }, 2000);
    
    // Clean URL
    window.history.replaceState({}, '', window.location.pathname);
  }
}, []);
```

Update your Stripe Payment Link:
- Success URL: `https://yoursite.vercel.app?payment=success`
- Cancel URL: `https://yoursite.vercel.app`
