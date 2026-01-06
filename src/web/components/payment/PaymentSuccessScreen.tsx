import { useState, useEffect, useRef } from "react";

interface PaymentSuccessScreenProps {
  email: string;
  receiptNumber: string;
  onContinue: () => void;
}

// Simple confetti animation
const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ["#10b981", "#14b8a6", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"];

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size / 2);
        ctx.restore();

        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;

        if (particle.y > canvas.height) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default function PaymentSuccessScreen({ email, receiptNumber, onContinue }: PaymentSuccessScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Stop confetti after a while
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden flex items-center justify-center">
      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 py-10 text-center">
        {/* Success Icon */}
        <div className={`mb-8 transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-[#0a0a0f] flex items-center justify-center">
              <svg
                className="w-16 h-16 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: mounted ? 0 : 100,
                  transition: "stroke-dashoffset 1s ease-out 0.5s",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className={`mb-8 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Lifetime Access!
            </span>
          </h1>
          <p className="text-white/60 text-lg">
            Your learning journey begins—take all the time you need 🚀
          </p>
        </div>

        {/* Order Confirmation */}
        <div className={`bg-white/5 rounded-3xl border border-white/10 p-6 mb-8 text-left transition-all duration-700 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📧</span>
            <h3 className="text-white font-bold">Order Confirmation</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-white/60">Receipt Number</span>
              <span className="text-white font-mono font-medium">{receiptNumber}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-white/60">Amount Paid</span>
              <span className="text-white font-bold">$34.99</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <span className="text-white/60">Email</span>
              <span className="text-white">{email}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-white/60">Access</span>
              <span className="text-emerald-400 font-medium">Lifetime</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-lg">✉️</span>
              <p className="text-emerald-300 text-sm">
                A confirmation email has been sent to your inbox
              </p>
            </div>
          </div>
        </div>

        {/* What's Unlocked */}
        <div className={`bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-400/20 p-5 mb-8 transition-all duration-700 delay-900 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-white font-bold mb-4">🎉 You've Unlocked:</h3>
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span className="text-white/80 text-sm">5 Complete Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span className="text-white/80 text-sm">20+ Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span className="text-white/80 text-sm">250+ Audio Phrases</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span className="text-white/80 text-sm">Full Workbook</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span className="text-white/80 text-sm">Listen & Repeat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              <span className="text-white/80 text-sm">All Achievements</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 mt-2">
              <span className="text-emerald-400">✓</span>
              <span className="text-white/80 text-sm">All future updates included free</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onContinue}
          className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg hover:opacity-90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/25 mb-4 ${mounted ? "opacity-100 translate-y-0 delay-1000" : "opacity-0 translate-y-8"}`}
        >
          Start Learning Now
        </button>

        {/* Support */}
        <p className={`text-white/40 text-sm transition-all duration-700 delay-1100 ${mounted ? "opacity-100" : "opacity-0"}`}>
          Questions? Contact us at{" "}
          <a href="mailto:support@speakconfidently.app" className="text-emerald-400 hover:underline">
            support@speakconfidently.app
          </a>
        </p>
      </div>
    </div>
  );
}
