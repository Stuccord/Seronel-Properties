"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowRight, User, Phone } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Sign up user
    const { data, error: signupError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
          phone: formData.phone,
        }
      }
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // 2. Create profile entry in the profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: data.user.id,
            full_name: formData.name,
            phone: formData.phone,
            email: formData.email,
          },
        ]);

      if (profileError) {
        console.error("Error creating profile:", profileError);
        // We continue anyway as the auth account is created
      }
      
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-foreground/60">Join Seronel Properties to find your perfect property.</p>
        </div>

        <div className="bg-card p-8 rounded-3xl border border-black/5 shadow-2xl">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-foreground/60 text-sm mb-2 font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe" 
                  className="w-full bg-background border border-black/10 rounded-xl px-12 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" 
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground/60 text-sm mb-2 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com" 
                  className="w-full bg-background border border-black/10 rounded-xl px-12 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" 
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground/60 text-sm mb-2 font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+233 24 123 4567" 
                  className="w-full bg-background border border-black/10 rounded-xl px-12 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" 
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground/60 text-sm mb-2 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                <input 
                  required
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="w-full bg-background border border-black/10 rounded-xl px-12 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full flex items-center justify-center bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-foreground/60">
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
