"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, PlusCircle, MessageCircle, Home, Building2, Info, Phone, User, LayoutDashboard, LogOut } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, signOut } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" onClick={handleLogoClick} className="flex items-center space-x-2 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-black/10 shadow-sm bg-white group-hover:scale-105 transition-transform">
                <Image 
                  src="https://p16-common-sign.tiktokcdn.com/tos-maliva-avt-0068/8fc4a4987f117ff838ed1213c0f0c632~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=53c09265&x-expires=1777521600&x-signature=XbzRgu49N0JWKQzxfVTZ3YLnQzw%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my3" 
                  alt="Seronel Properties Logo"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tighter">
                Seronel<span className="text-primary"> Properties</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="text-foreground/40 hover:text-[#25D366] transition-colors p-2">
              <MessageCircle className="w-6 h-6" />
            </a>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center text-foreground/60 hover:text-primary transition-colors font-medium text-sm">
                  <User className="w-5 h-5 mr-1" />
                  {profile?.full_name?.split(' ')[0] || 'Account'}
                </Link>
                <Link href="/admin/properties" className="bg-primary text-white hover:bg-primary/90 flex items-center px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/20 text-sm">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Submit Property
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-foreground/60 hover:text-primary transition-colors px-4 py-2 text-sm font-bold">
                  Sign In
                </Link>
                <Link href="/signup" className="bg-foreground text-background hover:bg-foreground/90 px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 text-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleMenu}
              className="text-foreground hover:text-primary p-2 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-black/10 animate-[fade-in-up_0.3s_ease-out] shadow-2xl overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center text-foreground hover:bg-primary/5 hover:text-primary px-4 py-4 rounded-2xl text-lg font-bold transition-all"
              >
                <link.icon className="w-6 h-6 mr-4 text-primary/60" />
                {link.name}
              </Link>
            ))}
            
            <div className="pt-6 mt-6 border-t border-black/5 space-y-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center text-foreground hover:bg-primary/5 hover:text-primary px-4 py-4 rounded-2xl text-lg font-bold transition-all"
                  >
                    <LayoutDashboard className="w-6 h-6 mr-4 text-primary/60" />
                    User Dashboard
                  </Link>
                  <Link
                    href="/admin/properties"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20"
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Submit Property
                  </Link>
                  <button
                    onClick={() => { signOut(); setIsOpen(false); }}
                    className="flex items-center justify-center w-full bg-black/5 text-foreground/60 py-4 rounded-2xl font-bold"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center bg-black/5 text-foreground py-4 rounded-2xl font-bold"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center bg-foreground text-background py-4 rounded-2xl font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
