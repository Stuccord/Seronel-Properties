"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, Users, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Properties", href: "/admin/properties", icon: Home },
    { name: "Leads", href: "/admin/leads", icon: Users },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-black/5 flex-shrink-0 flex flex-col">
        <div className="p-6 flex-1">
          <h2 className="text-xl font-bold text-foreground mb-8">Admin Portal</h2>
          <nav className="space-y-2 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    isActive 
                      ? "bg-primary/10 text-primary font-semibold border border-primary/20" 
                      : "text-foreground/60 hover:bg-black/5 hover:text-foreground"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-foreground/40"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-6 mt-auto hidden md:block border-t border-black/5">
          <Link href="/" className="flex items-center space-x-3 text-foreground/40 hover:text-foreground transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Exit Admin</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden min-h-screen">
        {children}
      </main>
    </div>
  );
}
