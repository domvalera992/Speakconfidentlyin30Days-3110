import { useState, useEffect } from "react";

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

export default function SettingsSection({ }: SettingsSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_SETTINGS);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | "unsupported">("default");
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
      new Notification("Daily Reminders Enabled!", {
        body: "You'll receive your daily learning reminders at your chosen time.",
        icon: "/favicon.ico",
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-24">
      {/* Permission Request Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f15] rounded-3xl p-6 max-w-sm w-full border border-white/10">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
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
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </h1>
          <p className="text-white/50 text-sm mt-1">Customize your learning experience</p>
        </div>

        {/* Account Status Section - Free with Ads */}
        <div className={`bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-400/30 rounded-3xl border overflow-hidden mb-6 transition-all duration-700 delay-50 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white">Account Status</h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-bold">
                      FREE
                    </span>
                  </div>
                  <p className="text-white/50 text-sm">
                    Full access - ad supported
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-white/60 text-sm">Content Access</span>
                <span className="text-emerald-400 text-sm font-medium">Full Access</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-white/60 text-sm">Modules</span>
                <span className="text-emerald-400 text-sm font-medium">All Unlocked</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-white/60 text-sm">Audio Library</span>
                <span className="text-emerald-400 text-sm font-medium">250+ Phrases</span>
              </div>
              <div className="pt-3 border-t border-white/10">
                <p className="text-white/40 text-xs">
                  This app is free and supported by ads. Thank you for using SpeakUp!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Reminders Section */}
        <div className={`bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5 border-b border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Daily Reminders
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
                      Extra reminder if you haven&apos;t practiced by evening
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
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wider mb-1">Preview</p>
                <p className="text-white font-bold text-sm">Time to learn!</p>
                <p className="text-white/70 text-xs mt-1">
                  7 day streak! Don&apos;t break it now. Just 5 minutes of practice keeps your momentum going.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Account Section */}
        <div className={`bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-6 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5 border-b border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account
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

        {/* About Section */}
        <div className={`bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-6 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-5 border-b border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About
            </h2>
          </div>

          <div className="divide-y divide-white/5">
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <span className="text-white/80">Privacy Policy</span>
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <span className="text-white/80">Terms of Service</span>
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <span className="text-white/80">Contact Support</span>
              <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <div className="p-4">
              <p className="text-white/30 text-sm text-center">
                SpeakUp v1.0.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
