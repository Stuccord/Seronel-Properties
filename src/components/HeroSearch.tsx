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
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl w-full max-w-5xl mx-auto transform z-30 relative animate-float">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex bg-black/40 rounded-full p-1 border border-white/5">
          <button 
            type="button"
            onClick={() => setTab("sale")} 
            className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${tab === "sale" ? "bg-primary text-primary-foreground shadow-lg" : "text-white/60 hover:text-white"}`}
          >
            For Sale
          </button>
          <button 
            type="button"
            onClick={() => setTab("rent")} 
            className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${tab === "rent" ? "bg-primary text-primary-foreground shadow-lg" : "text-white/60 hover:text-white"}`}
          >
            For Rent
          </button>
        </div>
        <button 
          type="button"
          onClick={scrollToFeatured} 
          className="flex items-center bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full text-orange-400 font-bold hover:bg-orange-500/20 hover:text-orange-300 transition-colors group"
        >
          <Flame className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          🔥 Hot Deals
        </button>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 relative hover:bg-white/10 transition-colors">
          <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest ml-3 mt-1">Property Type</label>
          <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-transparent text-white px-3 py-2 focus:outline-none appearance-none font-semibold cursor-pointer">
            <option value="all" className="text-black">All Types</option>
            <option value="house" className="text-black">Houses</option>
            <option value="apartment" className="text-black">Apartments</option>
            <option value="land" className="text-black">Land/Plots</option>
          </select>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 relative hover:bg-white/10 transition-colors">
          <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest ml-3 mt-1">Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-transparent text-white px-3 py-2 focus:outline-none appearance-none font-semibold cursor-pointer">
            <option value="" className="text-black">Any Location</option>
            <option value="accra" className="text-black">Accra</option>
            <option value="kumasi" className="text-black">Kumasi</option>
            <option value="prampram" className="text-black">Prampram</option>
            <option value="east_legon" className="text-black">East Legon</option>
          </select>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-2 relative hover:bg-white/10 transition-colors">
          <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest ml-3 mt-1">Budget Range</label>
          <select value={budget} onChange={e => setBudget(e.target.value)} className="w-full bg-transparent text-white px-3 py-2 focus:outline-none appearance-none font-semibold cursor-pointer">
            <option value="all" className="text-black">Any Price</option>
            <option value="under_100k" className="text-black">Under GH₵ 100k</option>
            <option value="100k_500k" className="text-black">GH₵ 100k - 500k</option>
            <option value="500k_1m" className="text-black">GH₵ 500k - 1M</option>
            <option value="over_1m" className="text-black">Over GH₵ 1M</option>
          </select>
        </div>
        <div className="flex items-stretch h-full">
          <button type="submit" className="w-full h-full min-h-[64px] flex items-center justify-center bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
            <Search className="w-5 h-5 mr-2" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
