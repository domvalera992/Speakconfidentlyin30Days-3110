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
import BottomNav, { type TabId } from "../components/dashboard/BottomNav";

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

  const updateSelections = (updates: Partial<UserSelections>) => {
    setSelections((prev) => ({ ...prev, ...updates }));
  };

  const goNext = () => setCurrentScreen((prev) => Math.min(prev + 1, 6));
  const goBack = () => setCurrentScreen((prev) => Math.max(prev - 1, 1));

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
  };

  const handleLessonOpen = (lesson: Lesson, module: Module) => {
    setActiveLesson({ lesson, module });
  };

  const handleLessonClose = () => {
    setActiveLesson(null);
  };

  const handleLessonComplete = () => {
    // Mark lesson as complete (in a real app, this would update state/backend)
    console.log(`Lesson ${activeLesson?.lesson.id} completed!`);
  };

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    // Clear active lesson when switching tabs
    if (activeLesson) {
      setActiveLesson(null);
    }
  };

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
        </div>
      );
    }

    // Show dashboard (home tab and others for now)
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        <Dashboard 
          selections={selections} 
          onLessonOpen={handleLessonOpen} 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
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
