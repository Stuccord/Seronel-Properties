"use client";

import { useState } from "react";
import { Search, Flame } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const router = useRouter();
  const [tab, setTab] = useState<"sale" | "rent">("sale");
  const [type, setType] = useState("all");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/properties");
  };

  const scrollToFeatured = () => {
    const el = document.getElementById("featured-properties");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] w-full max-w-5xl mx-auto transform z-30 relative animate-float">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex bg-white/10 rounded-full p-1.5 border border-white/10 backdrop-blur-md">
          <button 
            type="button"
            onClick={() => setTab("sale")} 
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${tab === "sale" ? "bg-white text-primary shadow-xl" : "text-white/70 hover:text-white"}`}
          >
            For Sale
          </button>
          <button 
            type="button"
            onClick={() => setTab("rent")} 
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${tab === "rent" ? "bg-white text-primary shadow-xl" : "text-white/70 hover:text-white"}`}
          >
            For Rent
          </button>
        </div>
        <button 
          type="button"
          onClick={scrollToFeatured} 
          className="flex items-center bg-orange-500/20 border border-orange-500/30 px-5 py-2.5 rounded-full text-orange-200 font-bold hover:bg-orange-500/30 transition-all group backdrop-blur-md"
        >
          <Flame className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Hot Deals
        </button>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-3 relative hover:bg-white/20 transition-all group backdrop-blur-md">
          <label className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] ml-3 mb-1">Property Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-transparent text-white px-3 py-1 focus:outline-none appearance-none font-bold cursor-pointer text-base">
            <option value="all" className="bg-white text-foreground">All Types</option>
            <option value="house" className="bg-white text-foreground">Houses</option>
            <option value="apartment" className="bg-white text-foreground">Apartments</option>
            <option value="land" className="bg-white text-foreground">Land/Plots</option>
          </select>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-2xl p-3 relative hover:bg-white/20 transition-all group backdrop-blur-md">
          <label className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] ml-3 mb-1">Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-transparent text-white px-3 py-1 focus:outline-none appearance-none font-bold cursor-pointer text-base">
            <option value="" className="bg-white text-foreground">Any Location</option>
            <option value="accra" className="bg-white text-foreground">Accra</option>
            <option value="kumasi" className="bg-white text-foreground">Kumasi</option>
            <option value="prampram" className="bg-white text-foreground">Prampram</option>
            <option value="east_legon" className="bg-white text-foreground">East Legon</option>
          </select>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-2xl p-3 relative hover:bg-white/20 transition-all group backdrop-blur-md">
          <label className="block text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] ml-3 mb-1">Budget Range</label>
          <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-transparent text-white px-3 py-1 focus:outline-none appearance-none font-bold cursor-pointer text-base">
            <option value="all" className="bg-white text-foreground">Any Price</option>
            <option value="under_100k" className="bg-white text-foreground">Under GH₵ 100k</option>
            <option value="100k_500k" className="bg-white text-foreground">GH₵ 100k - 500k</option>
            <option value="500k_1m" className="bg-white text-foreground">GH₵ 500k - 1M</option>
            <option value="over_1m" className="bg-white text-foreground">Over GH₵ 1M</option>
          </select>
        </div>
        <div className="flex items-stretch">
          <button type="submit" className="w-full min-h-[72px] flex items-center justify-center bg-primary text-white rounded-[1.25rem] font-black text-lg hover:bg-primary/90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.5)]">
            <Search className="w-6 h-6 mr-3" />
            Search Now
          </button>
        </div>
      </form>
    </div>
  );
}
