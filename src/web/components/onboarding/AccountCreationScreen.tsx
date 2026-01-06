import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import type { UserSelections } from "../../pages";

interface AccountCreationScreenProps {
  selections: UserSelections;
  updateSelections: (updates: Partial<UserSelections>) => void;
  onBack: () => void;
  currentScreen: number;
  onComplete: () => void;
}

export default function AccountCreationScreen({
  selections,
  updateSelections,
  onBack,
  currentScreen,
  onComplete,
}: AccountCreationScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selections.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!selections.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selections.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!selections.password) {
      newErrors.password = "Please create a password";
    } else if (selections.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    onComplete();
  };

  const handleSocialSignup = (provider: string) => {
    alert(`${provider} sign up would be implemented here`);
  };

  return (
    <div className="min-h-screen relative flex flex-col px-6 py-8">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className={`relative z-10 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <ProgressBar currentScreen={currentScreen} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full py-8">
        <div className={`text-center mb-8 transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="text-5xl mb-4">🚀</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            You're almost there!
          </h1>
          <p className="text-white/60">
            Create your account to start learning
          </p>
        </div>

        {/* Social signup buttons */}
        <div className={`w-full space-y-3 mb-6 transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button
            onClick={() => handleSocialSignup("Google")}
            className="w-full py-3.5 px-6 rounded-xl bg-white text-gray-800 font-medium flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>

          <button
            onClick={() => handleSocialSignup("Apple")}
            className="w-full py-3.5 px-6 rounded-xl bg-white text-gray-800 font-medium flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Sign up with Apple
          </button>
        </div>

        {/* Divider */}
        <div className={`w-full flex items-center gap-4 mb-6 transition-all duration-500 delay-250 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/40 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={`w-full space-y-4 transition-all duration-500 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Name */}
          <div>
            <label className="block text-white/60 text-sm mb-2">Name</label>
            <input
              type="text"
              value={selections.name}
              onChange={(e) => updateSelections({ name: e.target.value })}
              placeholder="What should we call you?"
              className={`w-full py-3.5 px-4 rounded-xl bg-white/5 border ${
                errors.name ? "border-red-400" : "border-white/10"
              } text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-white/60 text-sm mb-2">Email</label>
            <input
              type="email"
              value={selections.email}
              onChange={(e) => updateSelections({ email: e.target.value })}
              placeholder="your@email.com"
              className={`w-full py-3.5 px-4 rounded-xl bg-white/5 border ${
                errors.email ? "border-red-400" : "border-white/10"
              } text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/60 text-sm mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={selections.password}
                onChange={(e) => updateSelections({ password: e.target.value })}
                placeholder="At least 8 characters"
                className={`w-full py-3.5 px-4 pr-12 rounded-xl bg-white/5 border ${
                  errors.password ? "border-red-400" : "border-white/10"
                } text-white placeholder-white/30 focus:outline-none focus:border-emerald-400 transition-colors`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Motivation checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={selections.receiveMotivation}
                onChange={(e) => updateSelections({ receiveMotivation: e.target.checked })}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 transition-all ${
                  selections.receiveMotivation
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-white/30 group-hover:border-white/50"
                }`}
              >
                {selections.receiveMotivation && (
                  <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-white/60 text-sm">
              Receive daily motivation texts & emails to stay on track
            </span>
          </label>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-8 rounded-2xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 mt-6"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating your account...
              </span>
            ) : (
              "Get Started 🎉"
            )}
          </button>
        </form>

        {/* Terms */}
        <p className={`text-center text-white/40 text-xs mt-6 transition-all duration-500 delay-400 ${mounted ? "opacity-100" : "opacity-0"}`}>
          By signing up, you agree to our{" "}
          <a href="#" className="text-white/60 hover:text-white underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-white/60 hover:text-white underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
