"use client";

import Image from "next/image";
import { X, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  title = "Unlock Premium Features", 
  subtitle = "Sign in to save properties, track inquiries, and more." 
}: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-card border border-black/10 rounded-[2.5rem] w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-foreground/40 hover:text-foreground transition-colors p-2 bg-black/5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10 text-center">
          <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-primary/10 overflow-hidden relative">
            <Image 
              src="https://p16-common-sign.tiktokcdn.com/tos-maliva-avt-0068/8fc4a4987f117ff838ed1213c0f0c632~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=53c09265&x-expires=1777521600&x-signature=XbzRgu49N0JWKQzxfVTZ3YLnQzw%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my3" 
              alt="Seronel Properties Logo"
              fill
              className="object-cover"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-4">{title}</h2>
          <p className="text-foreground/60 mb-10 leading-relaxed">{subtitle}</p>

          <div className="space-y-4">
            <Link 
              href="/login" 
              className="w-full flex items-center justify-center bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
              Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/signup" 
              className="w-full flex items-center justify-center bg-black text-white py-4 rounded-2xl font-bold hover:bg-black/90 transition-all"
            >
              Create Account
            </Link>
          </div>

          <p className="mt-8 text-sm text-foreground/40">
            By continuing, you agree to our <Link href="/terms" className="underline">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
