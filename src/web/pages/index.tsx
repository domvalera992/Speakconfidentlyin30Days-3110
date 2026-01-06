import { useState } from "react";
import WelcomeScreen from "../components/onboarding/WelcomeScreen";
import GoalSelectionScreen from "../components/onboarding/GoalSelectionScreen";
import LevelAssessmentScreen from "../components/onboarding/LevelAssessmentScreen";
import TimeCommitmentScreen from "../components/onboarding/TimeCommitmentScreen";
import PersonalizedPromiseScreen from "../components/onboarding/PersonalizedPromiseScreen";
import AccountCreationScreen from "../components/onboarding/AccountCreationScreen";
import Dashboard from "../components/dashboard/Dashboard";

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

  const updateSelections = (updates: Partial<UserSelections>) => {
    setSelections((prev) => ({ ...prev, ...updates }));
  };

  const goNext = () => setCurrentScreen((prev) => Math.min(prev + 1, 6));
  const goBack = () => setCurrentScreen((prev) => Math.max(prev - 1, 1));

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
  };

  if (onboardingComplete) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        <Dashboard selections={selections} />
      </div>
    );
  }

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
