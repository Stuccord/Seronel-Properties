"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Show for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500">
      <div className="relative flex flex-col items-center">
        {/* Animated Rings - Centered behind logo */}
        <div className="absolute inset-0 flex items-center justify-center -translate-y-8">
          <div className="w-36 h-36 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
        </div>
        
        {/* Logo Container */}
        <div className="relative w-24 h-24 rounded-3xl overflow-hidden border border-black/5 shadow-2xl bg-white animate-pulse z-10">
          <img 
            src="https://p16-common-sign.tiktokcdn.com/tos-maliva-avt-0068/8fc4a4987f117ff838ed1213c0f0c632~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=53c09265&x-expires=1777521600&x-signature=XbzRgu49N0JWKQzxfVTZ3YLnQzw%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my3" 
            alt="Loading..."
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Brand Name */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-black text-foreground tracking-tighter">
            Seronel<span className="text-primary"> Properties</span>
          </h2>
          <div className="mt-2 h-1 w-24 bg-black/5 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-primary animate-[loading_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
