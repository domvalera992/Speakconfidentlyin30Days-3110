import { Metadata } from "./metadata";
import { ToastProvider } from "./notifications/ToastNotification";
import { GameificationProvider } from "./gamification/GameificationProvider";
import { PaymentProvider } from "../hooks/usePayment.js";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <>
      <Metadata />
      <ToastProvider>
        <PaymentProvider>
          <GameificationProvider>
            {children}
          </GameificationProvider>
        </PaymentProvider>
      </ToastProvider>
    </>
  );
}
