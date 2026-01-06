import { useState, useEffect, createContext, useContext, ReactNode } from "react";

const PAYMENT_STORAGE_KEY = "language_app_payment_status";
const PAYMENT_CONFIG_KEY = "language_app_payment_config";

interface PaymentStatus {
  isPro: boolean;
  purchaseDate: string | null;
  receiptNumber: string | null;
  email: string | null;
}

interface PaymentConfig {
  mode: "demo" | "live";
  externalPaymentUrl: string;
}

interface PaymentContextType {
  paymentStatus: PaymentStatus;
  paymentConfig: PaymentConfig;
  isPro: boolean;
  isLiveMode: boolean;
  completePurchase: (email: string) => Promise<{ success: boolean; receiptNumber: string }>;
  clearPaymentStatus: () => void;
  toggleDemoMode: () => void;
  setPaymentMode: (mode: "demo" | "live") => void;
  setExternalPaymentUrl: (url: string) => void;
  openExternalPayment: () => void;
}

const defaultPaymentStatus: PaymentStatus = {
  isPro: false,
  purchaseDate: null,
  receiptNumber: null,
  email: null,
};

const defaultPaymentConfig: PaymentConfig = {
  mode: "demo",
  externalPaymentUrl: "",
};

const getStoredPaymentStatus = (): PaymentStatus => {
  if (typeof window === "undefined") return defaultPaymentStatus;
  
  try {
    const stored = localStorage.getItem(PAYMENT_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading payment status:", e);
  }
  return defaultPaymentStatus;
};

const getStoredPaymentConfig = (): PaymentConfig => {
  if (typeof window === "undefined") return defaultPaymentConfig;
  
  try {
    const stored = localStorage.getItem(PAYMENT_CONFIG_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading payment config:", e);
  }
  return defaultPaymentConfig;
};

const savePaymentStatus = (status: PaymentStatus) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(status));
  }
};

const savePaymentConfig = (config: PaymentConfig) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(PAYMENT_CONFIG_KEY, JSON.stringify(config));
  }
};

const generateReceiptNumber = () => {
  const date = new Date();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SL${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${random}`;
};

export function usePayment(): PaymentContextType {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(defaultPaymentStatus);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(defaultPaymentConfig);

  useEffect(() => {
    setPaymentStatus(getStoredPaymentStatus());
    setPaymentConfig(getStoredPaymentConfig());
  }, []);

  useEffect(() => {
    savePaymentStatus(paymentStatus);
  }, [paymentStatus]);

  useEffect(() => {
    savePaymentConfig(paymentConfig);
  }, [paymentConfig]);

  const completePurchase = async (email: string): Promise<{ success: boolean; receiptNumber: string }> => {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const receiptNumber = generateReceiptNumber();
    const newStatus: PaymentStatus = {
      isPro: true,
      purchaseDate: new Date().toISOString(),
      receiptNumber,
      email,
    };
    
    setPaymentStatus(newStatus);
    return { success: true, receiptNumber };
  };

  const clearPaymentStatus = () => {
    setPaymentStatus(defaultPaymentStatus);
  };

  const toggleDemoMode = () => {
    if (paymentStatus.isPro) {
      setPaymentStatus(defaultPaymentStatus);
    } else {
      const receiptNumber = generateReceiptNumber();
      setPaymentStatus({
        isPro: true,
        purchaseDate: new Date().toISOString(),
        receiptNumber,
        email: "demo@example.com",
      });
    }
  };

  const setPaymentMode = (mode: "demo" | "live") => {
    setPaymentConfig(prev => ({ ...prev, mode }));
  };

  const setExternalPaymentUrl = (url: string) => {
    setPaymentConfig(prev => ({ ...prev, externalPaymentUrl: url }));
  };

  const openExternalPayment = () => {
    if (paymentConfig.externalPaymentUrl) {
      window.open(paymentConfig.externalPaymentUrl, "_blank", "noopener,noreferrer");
    }
  };

  const isLiveMode = paymentConfig.mode === "live" && paymentConfig.externalPaymentUrl.trim() !== "";

  return {
    paymentStatus,
    paymentConfig,
    isPro: paymentStatus.isPro,
    isLiveMode,
    completePurchase,
    clearPaymentStatus,
    toggleDemoMode,
    setPaymentMode,
    setExternalPaymentUrl,
    openExternalPayment,
  };
}

// Context for sharing payment state across components
const PaymentContext = createContext<PaymentContextType | null>(null);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const payment = usePayment();
  
  return (
    <PaymentContext.Provider value={payment}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
}
