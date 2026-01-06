import { useState, useEffect } from "react";

interface CheckoutScreenProps {
  onComplete: (email: string) => Promise<void>;
  onBack: () => void;
}

interface FormData {
  name: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  address?: string;
  city?: string;
  zip?: string;
}

const formatCardNumber = (value: string) => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

const formatExpiry = (value: string) => {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  if (v.length >= 2) {
    return v.substring(0, 2) + "/" + v.substring(2, 4);
  }
  return v;
};

export default function CheckoutScreen({ onComplete, onBack }: CheckoutScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Invalid card number";
    }
    if (!formData.expiry.trim()) {
      newErrors.expiry = "Expiry is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Invalid format (MM/YY)";
    }
    if (!formData.cvc.trim()) {
      newErrors.cvc = "CVC is required";
    } else if (formData.cvc.length < 3) {
      newErrors.cvc = "Invalid CVC";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !termsAccepted) return;

    setIsProcessing(true);
    try {
      await onComplete(formData.email);
    } catch (error) {
      console.error("Payment failed:", error);
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, "").length > 16) return;
    } else if (field === "expiry") {
      formattedValue = formatExpiry(value.replace("/", ""));
      if (formattedValue.replace("/", "").length > 4) return;
    } else if (field === "cvc") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getCardType = () => {
    const num = formData.cardNumber.replace(/\s/g, "");
    if (num.startsWith("4")) return "visa";
    if (num.startsWith("5")) return "mastercard";
    if (num.startsWith("37") || num.startsWith("34")) return "amex";
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-8 overflow-y-auto">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin" />
            </div>
            <p className="text-white text-xl font-bold mb-2">Processing Payment</p>
            <p className="text-white/60">Please wait while we secure your order...</p>
          </div>
        </div>
      )}

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-5 pt-6">
        {/* Header */}
        <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Secure Checkout</h1>
            <p className="text-white/50 text-sm">Complete your purchase</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className={`bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-400/20 p-4 mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <span className="text-xl">🗣️</span>
              </div>
              <div>
                <p className="text-white font-bold">30-Day Language Mastery</p>
                <p className="text-white/50 text-sm">Lifetime Access</p>
              </div>
            </div>
            <p className="text-white font-bold text-xl">$34.99</p>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Contact Info */}
          <div className={`bg-white/5 rounded-2xl border border-white/10 p-5 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h3 className="text-white font-bold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full bg-white/10 border ${errors.name ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors`}
                  placeholder="John Smith"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full bg-white/10 border ${errors.email ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Card Details */}
          <div className={`bg-white/5 rounded-2xl border border-white/10 p-5 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">Card Details</h3>
              <div className="flex gap-2">
                <span className={`text-lg transition-opacity ${getCardType() === "visa" ? "opacity-100" : "opacity-30"}`}>💳</span>
                <span className="text-white/30 text-xs flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  className={`w-full bg-white/10 border ${errors.cardNumber ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono`}
                  placeholder="4242 4242 4242 4242"
                />
                {errors.cardNumber && <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={(e) => handleInputChange("expiry", e.target.value)}
                    className={`w-full bg-white/10 border ${errors.expiry ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono`}
                    placeholder="MM/YY"
                  />
                  {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>}
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">CVC</label>
                  <input
                    type="text"
                    value={formData.cvc}
                    onChange={(e) => handleInputChange("cvc", e.target.value)}
                    className={`w-full bg-white/10 border ${errors.cvc ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors font-mono`}
                    placeholder="123"
                  />
                  {errors.cvc && <p className="text-red-400 text-xs mt-1">{errors.cvc}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className={`bg-white/5 rounded-2xl border border-white/10 p-5 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h3 className="text-white font-bold mb-4">Billing Address</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`w-full bg-white/10 border ${errors.address ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors`}
                  placeholder="123 Main Street"
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`w-full bg-white/10 border ${errors.city ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors`}
                    placeholder="New York"
                  />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => handleInputChange("zip", e.target.value)}
                    className={`w-full bg-white/10 border ${errors.zip ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors`}
                    placeholder="10001"
                  />
                  {errors.zip && <p className="text-red-400 text-xs mt-1">{errors.zip}</p>}
                </div>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                >
                  <option className="bg-[#0a0a0f]">United States</option>
                  <option className="bg-[#0a0a0f]">Canada</option>
                  <option className="bg-[#0a0a0f]">United Kingdom</option>
                  <option className="bg-[#0a0a0f]">Australia</option>
                  <option className="bg-[#0a0a0f]">Germany</option>
                  <option className="bg-[#0a0a0f]">France</option>
                  <option className="bg-[#0a0a0f]">Spain</option>
                  <option className="bg-[#0a0a0f]">Mexico</option>
                </select>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className={`transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 ${termsAccepted ? "bg-emerald-500 border-emerald-500" : "border-white/30"} transition-colors flex items-center justify-center`}>
                  {termsAccepted && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-white/60 text-sm">
                I agree to the <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a> and <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* Security Badges */}
          <div className={`flex items-center justify-center gap-6 py-4 transition-all duration-700 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Amex</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!termsAccepted || isProcessing}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
              termsAccepted && !isProcessing
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
          >
            {isProcessing ? "Processing..." : "Complete Purchase • $34.99"}
          </button>
        </form>
      </div>
    </div>
  );
}
