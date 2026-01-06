import { useState, useEffect } from "react";

interface UpgradeScreenProps {
  onPurchase: () => void;
  onClose?: () => void;
  flashSale?: boolean;
}

const TESTIMONIALS = [
  {
    name: "Maria G.",
    location: "California, USA",
    quote: "I went from barely understanding to having full conversations with my in-laws in just 3 weeks!",
    stars: 5,
  },
  {
    name: "James K.",
    location: "London, UK",
    quote: "The 30-day structure kept me accountable. Now I confidently order in Spanish restaurants!",
    stars: 5,
  },
  {
    name: "Sofia R.",
    location: "Toronto, Canada",
    quote: "Finally a program that focuses on speaking, not just grammar. Worth every penny.",
    stars: 5,
  },
];

const FEATURES = [
  { icon: "📚", text: "Full 30-Day Curriculum", detail: "5 complete modules with 20+ lessons" },
  { icon: "🎧", text: "250+ Audio Phrases", detail: "Native speaker recordings for perfect pronunciation" },
  { icon: "📝", text: "Complete Workbook", detail: "Translation, matching, and speaking exercises" },
  { icon: "🏆", text: "Achievement System", detail: "Track progress with XP, badges, and levels" },
  { icon: "🔊", text: "Listen & Repeat Mode", detail: "Guided practice sessions for immersion" },
  { icon: "💬", text: "Real Conversations", detail: "Practice dialogues for real-life situations" },
];

export default function UpgradeScreen({ onPurchase, onClose, flashSale = false }: UpgradeScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 59, seconds: 47 });

  useEffect(() => {
    setMounted(true);
    
    // Testimonial rotation
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    // Countdown timer for flash sale
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(testimonialInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-8 overflow-y-auto">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-teal-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 pt-6">
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Flash Sale Banner */}
        {flashSale && (
          <div className={`bg-gradient-to-r from-rose-600 to-orange-500 rounded-2xl p-4 mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl animate-pulse">⚡</span>
                <div>
                  <p className="text-white font-bold text-sm uppercase tracking-wider">24-Hour Flash Sale</p>
                  <p className="text-white/90 text-xs">Extra bonuses included!</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-xs">Expires in</p>
                <p className="text-white font-mono font-bold text-lg">
                  {String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Headline */}
        <div className={`text-center mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            30 Days to Confident
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Spanish Speaking
            </span>
          </h1>
          <p className="text-white/60 text-lg">
            Unlock your full transformation journey
          </p>
        </div>

        {/* Pricing Card */}
        <div className={`relative bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 rounded-3xl border border-emerald-400/30 overflow-hidden mb-6 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Popular badge */}
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
              MOST POPULAR
            </div>
          </div>

          <div className="p-6 pt-10">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-white/40 line-through text-2xl">$79.99</span>
                <span className="bg-emerald-500/30 text-emerald-300 text-sm font-bold px-3 py-1 rounded-full">
                  SAVE 56%
                </span>
              </div>
              <div className="flex items-start justify-center gap-1">
                <span className="text-white/70 text-2xl mt-2">$</span>
                <span className="text-6xl font-bold text-white">34</span>
                <span className="text-2xl text-white mt-2">.99</span>
              </div>
              <p className="text-white/50 text-sm mt-2">One-time payment • Lifetime access</p>
            </div>

            {/* CTA Button */}
            <button
              onClick={onPurchase}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:opacity-90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25"
            >
              Get Full Access Now
            </button>

            {/* Flash sale bonus */}
            {flashSale && (
              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-400/30 rounded-xl">
                <p className="text-amber-300 text-sm text-center font-medium">
                  🎁 Includes Bonus: Extra Audio Pack + Printable Workbook
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Money-back guarantee */}
        <div className={`flex items-center justify-center gap-3 mb-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <div>
            <p className="text-white font-medium">30-Day Money-Back Guarantee</p>
            <p className="text-white/50 text-sm">Not satisfied? Get a full refund, no questions asked</p>
          </div>
        </div>

        {/* Features List */}
        <div className={`bg-white/5 rounded-3xl border border-white/10 p-5 mb-6 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h3 className="text-lg font-bold text-white mb-4">Everything You Get:</h3>
          <div className="space-y-4">
            {FEATURES.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{feature.icon}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{feature.text}</p>
                  <p className="text-white/50 text-sm">{feature.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className={`mb-8 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h3 className="text-lg font-bold text-white mb-4 text-center">What Our Students Say</h3>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-1">
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-5">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.stars)].map((_, j) => (
                        <span key={j} className="text-amber-400">★</span>
                      ))}
                    </div>
                    <p className="text-white/80 italic mb-3">"{testimonial.quote}"</p>
                    <div>
                      <p className="text-white font-medium text-sm">{testimonial.name}</p>
                      <p className="text-white/40 text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === activeTestimonial ? "bg-emerald-400" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className={`flex items-center justify-center gap-6 mb-8 transition-all duration-700 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span className="text-lg">💳</span>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span className="text-lg">🔒</span>
            <span>256-bit Encryption</span>
          </div>
        </div>

        {/* Final CTA */}
        <button
          onClick={onPurchase}
          className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:opacity-90 transition-all duration-700 delay-700 hover:scale-[1.02] active:scale-[0.98] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Start My 30-Day Transformation
        </button>
      </div>
    </div>
  );
}
