import { Metadata } from "./metadata";
import { ToastProvider } from "./notifications/ToastNotification";
import { GameificationProvider } from "./gamification/GameificationProvider";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <>
      <Metadata />
      <ToastProvider>
        <GameificationProvider>
          {children}
        </GameificationProvider>
      </ToastProvider>
    </>
  );
}
