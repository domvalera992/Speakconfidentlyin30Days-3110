import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Set this to true once you have configured your AdSense account
const ADSENSE_ENABLED = false;
// Replace with your actual publisher ID from Google AdSense
const PUBLISHER_ID = "ca-pub-YOUR_PUBLISHER_ID";

export default function AdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  style,
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // Skip if AdSense is not enabled or already loaded
    if (!ADSENSE_ENABLED || isAdLoaded.current) return;

    try {
      // Check if adsbygoogle is available
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  // Show placeholder when AdSense is not configured
  if (!ADSENSE_ENABLED) {
    return (
      <div className={`ad-container ${className}`} style={style}>
        <div 
          className="flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-white/40 text-xs"
          style={{ minHeight: "90px", ...style }}
        >
          Ad Space - Configure AdSense to display ads
        </div>
      </div>
    );
  }

  return (
    <div ref={adRef} className={`ad-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

// Banner ad component for top/bottom of pages
export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full bg-[#0a0a0f]/50 py-2 ${className}`}>
      <div className="max-w-lg mx-auto px-4">
        <AdSense
          adSlot="XXXXXXXXXX" // Replace with your ad slot ID
          adFormat="horizontal"
          className="min-h-[90px]"
        />
      </div>
    </div>
  );
}

// In-content ad component
export function AdInContent({ className = "" }: { className?: string }) {
  return (
    <div className={`my-6 ${className}`}>
      <AdSense
        adSlot="XXXXXXXXXX" // Replace with your ad slot ID
        adFormat="fluid"
        className="min-h-[250px]"
      />
    </div>
  );
}

// Sidebar/rectangle ad component
export function AdRectangle({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <AdSense
        adSlot="XXXXXXXXXX" // Replace with your ad slot ID
        adFormat="rectangle"
        className="min-h-[250px]"
        style={{ width: "300px", height: "250px" }}
      />
    </div>
  );
}
