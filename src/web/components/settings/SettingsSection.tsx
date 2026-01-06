import { useState, useEffect } from "react";
import { usePaymentContext } from "../../hooks/usePayment.js";

interface ReminderSettings {
  enabled: boolean;
  time: string;
  streakWarning: boolean;
  motivationalMessages: boolean;
}

interface SettingsSectionProps {
  onUpgrade?: () => void;
  flashSale?: boolean;
  onToggleFlashSale?: () => void;
}

const DEFAULT_SETTINGS: ReminderSettings = {
  enabled: true,
  time: "09:00",
  streakWarning: true,
  motivationalMessages: true,
};

const TIME_OPTIONS = [
  { value: "06:00", label: "6:00 AM" },
  { value: "07:00", label: "7:00 AM" },
  { value: "08:00", label: "8:00 AM" },
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "18:00", label: "6:00 PM" },
  { value: "19:00", label: "7:00 PM" },
  { value: "20:00", label: "8:00 PM" },
  { value: "21:00", label: "9:00 PM" },
];

export default function SettingsSection({ onUpgrade, flashSale = false, onToggleFlashSale }: SettingsSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_SETTINGS);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | "unsupported">("default");
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { isPro, paymentStatus, paymentConfig, toggleDemoMode, setPaymentMode, setExternalPaymentUrl, isLiveMode } = usePaymentContext();

  useEffect(() => {
    setMounted(true);
    
    // Check notification permission
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission);
    } else {
      setPermissionStatus("unsupported");
    }
  }, []);

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications");
      return;
    }

    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    
    if (permission === "granted") {
      setShowPermissionModal(false);
      new Notification("Daily Reminders Enabled! 🎉", {
        body: "You'll receive your daily learning reminders at your chosen time.",
        icon: "🗣️",
      });
    }
  };

  const updateSettings = (updates: Partial<ReminderSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const toggleReminders = () => {
    if (!settings.enabled && permissionStatus !== "granted") {
      setShowPermissionModal(true);
    } else {
      updateSettings({ enabled: !settings.enabled });
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Permission Request Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f15] rounded-3xl p-6 max-w-sm w-full border border-white/10">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                <span className="text-4xl">🔔</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Enable Notifications</h3>
              <p className="text-white/60 text-sm mb-6">
                Get daily reminders to keep your streak alive and stay motivated on your language learning journey!
              </p>
              <div className="space-y-3">
                <button
                  onClick={requestNotificationPermission}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Allow Notifications
                </button>
                <button
                  onClick={() => setShowPermissionModal(false)}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 font-medium transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-xl animate-pulse">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Settings saved!</span>
          </div>
        </div>
      )}

      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-5 py-6 max-w-lg mx-auto">
        {/* Header */}
        <div className={`mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            ⚙️ Settings
          </h1>
          <p className="text-white/50 text-sm mt-1">Customize your learning experience</p>
        </div>

        {/* Account Status Section */}
        <div className={`bg-gradient-to-br ${isPro ? "from-emerald-500/20 to-teal-500/20 border-emerald-400/30" : "from-white/5 to-white/5 border-white/10"} rounded-3xl border overflow-hidden mb-6 transition-all duration-700 delay-50 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${isPro ? "bg-gradient-to-br from-emerald-500 to-teal-500" : "bg-white/10"} flex items-center justify-center`}>
                  <span className="text-2xl">{isPro ? "⭐" : "👤"}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">Account Status</h2>
                    {isPro && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm">
                    {isPro ? "Full access unlocked" : "Free account"}
                  </p>
                </div>
              </div>
            </div>

            {isPro ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-white/60 text-sm">Purchase Date</span>
                  <span className="text-white text-sm">{formatDate(paymentStatus.purchaseDate)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-white/60 text-sm">Receipt Number</span>
                  <span className="text-white text-sm font-mono">{paymentStatus.receiptNumber}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-white/60 text-sm">Access</span>
                  <span className="text-emerald-400 text-sm font-medium">Lifetime</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white/40 text-xs">
                    Need help? Contact us at support@speakconfidently.app
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={onUpgrade}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:opacity-90 transition-opacity"
              >
                Get Lifetime Access • $34.99
              </button>
            )}
          </div>
        </div>

        {/* Daily Reminders Section */}
        <div className={`bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5 border-b border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🔔</span> Daily Reminders
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Get notified to keep your streak alive
            </p>
          </div>

          <div className="p-5 space-y-4">
            {/* Enable Reminders Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable reminders</p>
                <p className="text-white/40 text-xs mt-0.5">
                  {permissionStatus === "granted" 
                    ? "Notifications enabled" 
                    : permissionStatus === "denied"
                      ? "Notifications blocked"
                      : "Permission required"}
                </p>
              </div>
              <button
                onClick={toggleReminders}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  settings.enabled ? "bg-emerald-500" : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    settings.enabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Reminder Time */}
            {settings.enabled && (
              <>
                <div className="pt-4 border-t border-white/5">
                  <p className="text-white font-medium mb-2">Reminder time</p>
                  <select
                    value={settings.time}
                    onChange={(e) => updateSettings({ time: e.target.value })}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                  >
                    {TIME_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#0a0a0f]">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Streak Warning */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-white font-medium">Streak warning</p>
                    <p className="text-white/40 text-xs mt-0.5">
                      Extra reminder if you haven't practiced by evening
                    </p>
                  </div>
                  <button
                    onClick={() => updateSettings({ streakWarning: !settings.streakWarning })}
                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                      settings.streakWarning ? "bg-orange-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        settings.streakWarning ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Motivational Messages */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-white font-medium">Motivational messages</p>
                    <p className="text-white/40 text-xs mt-0.5">
                      Inspirational quotes with your reminders
                    </p>
                  </div>
                  <button
                    onClick={() => updateSettings({ motivationalMessages: !settings.motivationalMessages })}
                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                      settings.motivationalMessages ? "bg-purple-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        settings.motivationalMessages ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Preview Notification */}
        {settings.enabled && permissionStatus === "granted" && (
          <div className={`bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-4 border border-amber-400/30 mb-6 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wider mb-1">Preview</p>
                <p className="text-white font-bold text-sm">Time to learn! 🗣️</p>
                <p className="text-white/70 text-xs mt-1">
                  🔥 7 day streak! Don't break it now. Just 5 minutes of practice keeps your momentum going.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Account Section */}
        <div className={`bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-6 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5 border-b border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>👤</span> Account
            </h2>
          </div>

          <div className="divide-y divide-white/5">
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <span className="text-white/80">Edit Profile</span>
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <span className="text-white/80">Learning Language</span>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">Spanish</span>
                <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <span className="text-white/80">Daily Goal</span>
              <div className="flex items-center gap-2">
                <span className="text-white/40 text-sm">10 min</span>
                <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Payment Configuration Section */}
        <div className={`bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-3xl border border-indigo-400/20 overflow-hidden mb-6 transition-all duration-700 delay-350 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💳</span>
              <h2 className="text-lg font-bold text-white">Payment Settings</h2>
            </div>
            <p className="text-white/50 text-sm mb-4">
              Configure how purchases are handled in the app.
            </p>
            
            <div className="space-y-4">
              {/* Payment Mode Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Live Mode</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {isLiveMode ? "External payment link active" : "Using demo checkout"}
                  </p>
                </div>
                <button
                  onClick={() => setPaymentMode(paymentConfig.mode === "live" ? "demo" : "live")}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                    paymentConfig.mode === "live" ? "bg-emerald-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      paymentConfig.mode === "live" ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* External Payment URL */}
              <div className="pt-4 border-t border-white/5">
                <label className="block">
                  <p className="text-white font-medium mb-1">External Payment Link</p>
                  <p className="text-white/40 text-xs mb-3">
                    Paste your Stripe Payment Link, Gumroad, or other checkout URL
                  </p>
                  <input
                    type="url"
                    value={paymentConfig.externalPaymentUrl}
                    onChange={(e) => setExternalPaymentUrl(e.target.value)}
                    placeholder="https://buy.stripe.com/..."
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors font-mono text-sm"
                  />
                </label>
                {paymentConfig.mode === "live" && !paymentConfig.externalPaymentUrl.trim() && (
                  <p className="text-amber-400 text-xs mt-2 flex items-center gap-1">
                    <span>⚠️</span> Add a payment link to enable live mode
                  </p>
                )}
              </div>

              {/* Status indicator */}
              <div className="pt-4 border-t border-white/5">
                <div className={`flex items-center gap-2 p-3 rounded-xl ${isLiveMode ? "bg-emerald-500/20 border border-emerald-400/30" : "bg-white/5 border border-white/10"}`}>
                  <span className={`w-2 h-2 rounded-full ${isLiveMode ? "bg-emerald-400 animate-pulse" : "bg-white/40"}`} />
                  <span className={`text-sm font-medium ${isLiveMode ? "text-emerald-300" : "text-white/60"}`}>
                    {isLiveMode ? "Live: Purchases open external link" : "Demo: Simulated checkout flow"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Mode Section */}
        <div className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl border border-purple-400/20 overflow-hidden mb-6 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🧪</span>
              <h2 className="text-lg font-bold text-white">Demo Controls</h2>
            </div>
            <p className="text-white/50 text-sm mb-4">
              Toggle between free and paid user views for testing purposes.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Pro Mode</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    Switch between free and paid views
                  </p>
                </div>
                <button
                  onClick={toggleDemoMode}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                    isPro ? "bg-emerald-500" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      isPro ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {onToggleFlashSale && (
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-white font-medium">Flash Sale Mode</p>
                    <p className="text-white/40 text-xs mt-0.5">
                      Show countdown timer and bonuses
                    </p>
                  </div>
                  <button
                    onClick={onToggleFlashSale}
                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                      flashSale ? "bg-orange-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        flashSale ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className={`bg-white/5 rounded-3xl border border-white/10 overflow-hidden transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5 border-b border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>💬</span> Support
            </h2>
          </div>

          <div className="divide-y divide-white/5">
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <span className="text-white/80">Help Center</span>
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <span className="text-white/80">Contact Us</span>
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <span className="text-white/80">Privacy Policy</span>
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Version */}
        <p className={`text-center text-white/30 text-sm mt-8 transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}
