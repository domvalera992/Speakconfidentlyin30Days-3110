import { useState } from "react";
import WelcomeScreen from "../components/onboarding/WelcomeScreen";
import GoalSelectionScreen from "../components/onboarding/GoalSelectionScreen";
import LevelAssessmentScreen from "../components/onboarding/LevelAssessmentScreen";
import TimeCommitmentScreen from "../components/onboarding/TimeCommitmentScreen";
import PersonalizedPromiseScreen from "../components/onboarding/PersonalizedPromiseScreen";
import AccountCreationScreen from "../components/onboarding/AccountCreationScreen";
import Dashboard from "../components/dashboard/Dashboard";
import LessonPage from "../components/lesson/LessonPage";
import AudioPractice from "../components/audio/AudioPractice";
import Workbook from "../components/workbook/Workbook";
import ProgressSection from "../components/progress/ProgressSection";
import SettingsSection from "../components/settings/SettingsSection";
import BottomNav, { type TabId } from "../components/dashboard/BottomNav";
import UpgradeScreen from "../components/payment/UpgradeScreen";
import CheckoutScreen from "../components/payment/CheckoutScreen";
import PaymentSuccessScreen from "../components/payment/PaymentSuccessScreen";
import PaywallModal from "../components/payment/PaywallModal";
import UpgradeBanner from "../components/payment/UpgradeBanner";
import { usePaymentContext } from "../hooks/usePayment.js";

export interface UserSelections {
  language: "english" | "spanish" | null;
  goals: string[];
  level: string | null;
  dailyTime: string | null;
  name: string;
  email: string;
  password: string;
  receiveMotivation: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  current?: boolean;
  type: "lesson" | "quiz";
}

export interface Module {
  id: number;
  title: string;
  color: string;
}

interface ActiveLesson {
  lesson: Lesson;
  module: Module;
}

type PaymentFlow = "none" | "upgrade" | "checkout" | "success";

const initialSelections: UserSelections = {
  language: null,
  goals: [],
  level: null,
  dailyTime: null,
  name: "",
  email: "",
  password: "",
  receiveMotivation: false,
};

function Index() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selections, setSelections] = useState<UserSelections>(initialSelections);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [activeLesson, setActiveLesson] = useState<ActiveLesson | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  
  // Payment state
  const [paymentFlow, setPaymentFlow] = useState<PaymentFlow>("none");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallContentType, setPaywallContentType] = useState("lesson");
  const [purchaseEmail, setPurchaseEmail] = useState("");
  const [purchaseReceipt, setPurchaseReceipt] = useState("");
  const [flashSale, setFlashSale] = useState(false);

  const { isPro, isLiveMode, completePurchase, openExternalPayment } = usePaymentContext();

  const updateSelections = (updates: Partial<UserSelections>) => {
    setSelections((prev) => ({ ...prev, ...updates }));
  };

  const goNext = () => setCurrentScreen((prev) => Math.min(prev + 1, 6));
  const goBack = () => setCurrentScreen((prev) => Math.max(prev - 1, 1));

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
  };

  const handleLessonOpen = (lesson: Lesson, module: Module) => {
    // Free users can only access first lesson as preview
    if (!isPro && lesson.id !== "1.1") {
      setPaywallContentType("lesson");
      setPaywallOpen(true);
      return;
    }
    setActiveLesson({ lesson, module });
  };

  const handleLessonClose = () => {
    setActiveLesson(null);
  };

  const handleLessonComplete = () => {
    console.log(`Lesson ${activeLesson?.lesson.id} completed!`);
  };

  const handleTabChange = (tab: TabId) => {
    // Free users can only access home and settings fully
    if (!isPro && (tab === "audio" || tab === "workbook")) {
      setPaywallContentType(tab);
      setPaywallOpen(true);
      return;
    }
    
    setActiveTab(tab);
    if (activeLesson) {
      setActiveLesson(null);
    }
  };

  const handleUpgradeClick = () => {
    if (isLiveMode) {
      openExternalPayment();
      setPaywallOpen(false);
    } else {
      setPaymentFlow("upgrade");
      setPaywallOpen(false);
    }
  };

  const handlePurchaseClick = () => {
    if (isLiveMode) {
      openExternalPayment();
    } else {
      setPaymentFlow("checkout");
    }
  };

  const handleCheckoutComplete = async (email: string) => {
    const result = await completePurchase(email);
    if (result.success) {
      setPurchaseEmail(email);
      setPurchaseReceipt(result.receiptNumber);
      setPaymentFlow("success");
    }
  };

  const handlePaymentFlowClose = () => {
    setPaymentFlow("none");
  };

  const handleSuccessContinue = () => {
    setPaymentFlow("none");
    setActiveTab("home");
  };

  // Show payment screens
  if (paymentFlow === "upgrade") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        <UpgradeScreen
          onPurchase={handlePurchaseClick}
          onClose={handlePaymentFlowClose}
          flashSale={flashSale}
        />
      </div>
    );
  }

  if (paymentFlow === "checkout") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        <CheckoutScreen
          onComplete={handleCheckoutComplete}
          onBack={() => setPaymentFlow("upgrade")}
        />
      </div>
    );
  }

  if (paymentFlow === "success") {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        <PaymentSuccessScreen
          email={purchaseEmail}
          receiptNumber={purchaseReceipt}
          onContinue={handleSuccessContinue}
        />
      </div>
    );
  }

  if (onboardingComplete) {
    // Show lesson page if a lesson is active
    if (activeLesson) {
      return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
          <LessonPage
            lesson={activeLesson.lesson}
            module={activeLesson.module}
            onBack={handleLessonClose}
            onComplete={handleLessonComplete}
          />
        </div>
      );
    }

    // Show Audio Practice section
    if (activeTab === "audio") {
      return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
          <AudioPractice />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          <PaywallModal
            isOpen={paywallOpen}
            onClose={() => setPaywallOpen(false)}
            onUpgrade={handleUpgradeClick}
            contentType={paywallContentType}
          />
        </div>
      );
    }

    // Show Workbook section
    if (activeTab === "workbook") {
      return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
          <Workbook />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          <PaywallModal
            isOpen={paywallOpen}
            onClose={() => setPaywallOpen(false)}
            onUpgrade={handleUpgradeClick}
            contentType={paywallContentType}
          />
        </div>
      );
    }

    // Show Progress/Achievements section
    if (activeTab === "progress") {
      return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
          <ProgressSection />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          <PaywallModal
            isOpen={paywallOpen}
            onClose={() => setPaywallOpen(false)}
            onUpgrade={handleUpgradeClick}
            contentType={paywallContentType}
          />
        </div>
      );
    }

    // Show Settings section
    if (activeTab === "settings") {
      return (
        <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
          <SettingsSection 
            onUpgrade={handleUpgradeClick}
            flashSale={flashSale}
            onToggleFlashSale={() => setFlashSale(!flashSale)}
          />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      );
    }

    // Show dashboard (home tab and others for now)
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        {/* Upgrade Banner for free users */}
        {!isPro && (
          <div className="fixed top-0 left-0 right-0 z-40 px-4 py-3 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-white/5">
            <div className="max-w-lg mx-auto">
              <UpgradeBanner onUpgrade={handleUpgradeClick} />
            </div>
          </div>
        )}
        
        <div className={!isPro ? "pt-20" : ""}>
          <Dashboard 
            selections={selections} 
            onLessonOpen={handleLessonOpen} 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isPro={isPro}
          />
        </div>
        
        <PaywallModal
          isOpen={paywallOpen}
          onClose={() => setPaywallOpen(false)}
          onUpgrade={handleUpgradeClick}
          contentType={paywallContentType}
        />
      </div>
    );
  }

  // Onboarding screens - Screen 5 shows upgrade CTA for transformation
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {currentScreen === 1 && (
        <WelcomeScreen
          onSelectLanguage={(lang) => {
            updateSelections({ language: lang });
            goNext();
          }}
        />
      )}
      {currentScreen === 2 && (
        <GoalSelectionScreen
          selections={selections}
          updateSelections={updateSelections}
          onNext={goNext}
          onBack={goBack}
          currentScreen={currentScreen}
        />
      )}
      {currentScreen === 3 && (
        <LevelAssessmentScreen
          selections={selections}
          updateSelections={updateSelections}
          onNext={goNext}
          onBack={goBack}
          currentScreen={currentScreen}
        />
      )}
      {currentScreen === 4 && (
        <TimeCommitmentScreen
          selections={selections}
          updateSelections={updateSelections}
          onNext={goNext}
          onBack={goBack}
          currentScreen={currentScreen}
        />
      )}
      {currentScreen === 5 && (
        <PersonalizedPromiseScreen
          selections={selections}
          onNext={goNext}
          onBack={goBack}
          currentScreen={currentScreen}
          onUpgrade={handleUpgradeClick}
        />
      )}
      {currentScreen === 6 && (
        <AccountCreationScreen
          selections={selections}
          updateSelections={updateSelections}
          onBack={goBack}
          currentScreen={currentScreen}
          onComplete={handleOnboardingComplete}
        />
      )}
    </div>
  );
}

export default Index;
