"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { PROPERTIES } from "@/lib/data";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  
  // Default message
  let message = "Hello, I’m interested in your properties. Please send details.";
  
  // Dynamically inject the property name if on a property detail page
  if (pathname && pathname.startsWith("/properties/")) {
    const id = pathname.split("/").pop();
    const property = PROPERTIES.find(p => p.id === id);
    if (property) {
      message = `Hello, I’m interested in ${property.title}. Please send details.`;
    } else {
      // Fallback literal requested by user
      message = "Hello, I’m interested in [Property Name]. Please send details.";
    }
  }

  const encodedMessage = encodeURIComponent(message);
  // Using a placeholder number. The user can update this later.
  const whatsappNumber = "1234567890"; 
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:bg-[#128C7E] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-md border border-white/10 text-white text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        Need help? Chat with us!
      </span>
      {/* Notification dot to catch attention */}
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-[#25D366]"></span>
      </span>
    </a>
  );
}
