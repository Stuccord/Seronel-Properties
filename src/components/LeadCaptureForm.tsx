"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface LeadCaptureFormProps {
  source?: string;
  defaultInterest?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function LeadCaptureForm({ 
  source = "Website", 
  defaultInterest = "", 
  title = "Send an Inquiry",
  subtitle = "Our team will get back to you shortly.",
  className = "bg-card border border-black/5 rounded-3xl p-8 shadow-2xl"
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: defaultInterest,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Store in Supabase 'leads' table
      const { error: dbError } = await supabase.from('leads').insert([
        {
          name: formData.name,
          phone: formData.phone,
          interest: formData.interest,
          source: source
        }
      ]);

      if (dbError) throw dbError;

      // NOTE: You can add an email notification hook here, e.g.:
      // await fetch('/api/notify-lead', { method: 'POST', body: JSON.stringify(formData) });

      setIsSuccess(true);
      setFormData({ name: "", phone: "", interest: "" });
      
      // Reset success state after a few seconds
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err: any) {
      console.error("Error submitting lead:", err);
      // Failsafe for users testing without Supabase configured
      setError("Failed to submit inquiry. (Check Supabase setup)");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <CheckCircle2 className="w-16 h-16 text-primary mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Inquiry Sent!</h3>
        <p className="text-foreground/70">Thank you for reaching out. A member of our team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      {subtitle && <p className="text-foreground/60 text-sm mb-6">{subtitle}</p>}
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-foreground/60 text-sm mb-2 font-medium">Full Name</label>
          <input 
            required
            type="text" 
            placeholder="John Doe" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-background border border-black/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors" 
          />
        </div>
        <div>
          <label className="block text-foreground/60 text-sm mb-2 font-medium">Phone Number</label>
          <input 
            required
            type="tel" 
            placeholder="+233 24 123 4567" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-background border border-black/10 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary transition-colors" 
          />
        </div>
        <div>
          <label className="block text-foreground/60 text-sm mb-2 font-medium">Primary Interest / Budget</label>
          {defaultInterest ? (
            <input 
              required
              type="text"
              value={formData.interest}
              onChange={(e) => setFormData({...formData, interest: e.target.value})}
              className="w-full bg-background border border-black/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors" 
            />
          ) : (
            <select 
              required
              value={formData.interest}
              onChange={(e) => setFormData({...formData, interest: e.target.value})}
              className="w-full bg-background border border-black/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-black/50">Select your budget</option>
              <option value="Under GH₵ 100k" className="text-black">Under GH₵ 100,000</option>
              <option value="GH₵ 100k - 500k" className="text-black">GH₵ 100,000 - 500,000</option>
              <option value="GH₵ 500k - 1M" className="text-black">GH₵ 500,000 - 1,000,000</option>
              <option value="Over GH₵ 1M" className="text-black">Over GH₵ 1,000,000</option>
            </select>
          )}
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center bg-primary text-white hover:bg-primary/90 px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
          {isSubmitting ? 'Sending...' : 'Send Request'}
        </button>
      </form>
    </div>
  );
}
