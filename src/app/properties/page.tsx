"use client";

import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PROPERTIES, PropertyType } from "@/lib/data";

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<PropertyType | "all">("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bedroomsFilter, setBedroomsFilter] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<"featured" | "price_asc" | "price_desc">("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProperties = PROPERTIES.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || p.type === typeFilter;
    
    let matchesPrice = true;
    if (priceRange === "under_100k") matchesPrice = p.price < 100000;
    else if (priceRange === "100k_500k") matchesPrice = p.price >= 100000 && p.price <= 500000;
    else if (priceRange === "500k_1m") matchesPrice = p.price > 500000 && p.price <= 1000000;
    else if (priceRange === "over_1m") matchesPrice = p.price > 1000000;

    const matchesBeds = bedroomsFilter === "all" || p.beds >= parseInt(bedroomsFilter);
    const matchesStatus = true; // Since data doesn't have status yet, assume all match

    return matchesSearch && matchesType && matchesPrice && matchesBeds && matchesStatus;
  });

  if (priceSort === "price_asc") {
    filteredProperties.sort((a, b) => a.price - b.price);
  } else if (priceSort === "price_desc") {
    filteredProperties.sort((a, b) => b.price - a.price);
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">Search Keywords</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Location, Title..." 
            className="w-full bg-background border border-black/10 rounded-xl pl-12 pr-4 py-3.5 text-foreground focus:outline-none focus:border-primary transition-colors font-medium"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">Status</label>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-background border border-black/10 px-4 py-3.5 rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors appearance-none font-medium cursor-pointer"
        >
          <option value="all" className="text-black">Any Status</option>
          <option value="sale" className="text-black">For Sale</option>
          <option value="rent" className="text-black">For Rent</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">Property Type</label>
        <select 
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as PropertyType | "all")}
          className="w-full bg-background border border-black/10 px-4 py-3.5 rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors appearance-none font-medium cursor-pointer"
        >
          <option value="all" className="text-black">All Types</option>
          <option value="house" className="text-black">Houses</option>
          <option value="apartment" className="text-black">Apartments</option>
          <option value="land" className="text-black">Land/Plots</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">Budget Range</label>
        <select 
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full bg-background border border-black/10 px-4 py-3.5 rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors appearance-none font-medium cursor-pointer"
        >
          <option value="all" className="text-black">Any Price</option>
          <option value="under_100k" className="text-black">Under GH₵ 100k</option>
          <option value="100k_500k" className="text-black">GH₵ 100k - 500k</option>
          <option value="500k_1m" className="text-black">GH₵ 500k - 1M</option>
          <option value="over_1m" className="text-black">Over GH₵ 1M</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">Bedrooms</label>
        <select 
          value={bedroomsFilter}
          onChange={(e) => setBedroomsFilter(e.target.value)}
          className="w-full bg-background border border-black/10 px-4 py-3.5 rounded-xl text-foreground focus:outline-none focus:border-primary transition-colors appearance-none font-medium cursor-pointer"
        >
          <option value="all" className="text-black">Any Beds</option>
          <option value="1" className="text-black">1+ Bedrooms</option>
          <option value="2" className="text-black">2+ Bedrooms</option>
          <option value="3" className="text-black">3+ Bedrooms</option>
          <option value="4" className="text-black">4+ Bedrooms</option>
          <option value="5" className="text-black">5+ Bedrooms</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background w-full pt-12">
      {/* Header */}
      <section className="bg-card py-12 border-b border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Exclusive Properties</h1>
          <p className="text-foreground/60 text-lg max-w-2xl">Find your dream home or next investment from our verified portfolio.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex justify-between items-center bg-card p-4 rounded-2xl border border-black/5">
               <button 
                  onClick={() => setShowMobileFilters(true)}
                  className="flex items-center text-foreground font-bold"
               >
                  <SlidersHorizontal className="w-5 h-5 mr-2 text-primary" />
                  Filters
               </button>
               <div className="flex items-center gap-2">
                 <select 
                   value={priceSort}
                   onChange={(e) => setPriceSort(e.target.value as any)}
                   className="bg-transparent border-none text-foreground focus:outline-none text-sm font-semibold cursor-pointer appearance-none"
                 >
                   <option value="featured" className="text-black">Featured</option>
                   <option value="price_asc" className="text-black">Price: Low to High</option>
                   <option value="price_desc" className="text-black">Price: High to Low</option>
                 </select>
               </div>
            </div>

            {/* Mobile Filter Modal */}
            {showMobileFilters && (
              <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm lg:hidden">
                <div className="bg-card w-full sm:w-[400px] rounded-t-3xl sm:rounded-3xl p-6 border border-black/10 animate-[fade-in-up_0.3s_ease-out]">
                  <div className="flex justify-between items-center mb-6 border-b border-black/10 pb-4">
                    <h3 className="text-xl font-bold text-foreground">Filters</h3>
                    <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-black/5 rounded-full text-foreground/60 hover:text-foreground">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterContent />
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full mt-8 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Show Results ({filteredProperties.length})
                  </button>
                </div>
              </div>
            )}

            {/* Left Column: Filters (Desktop) */}
            <div className="hidden lg:block w-1/4 shrink-0">
               <div className="sticky top-28 bg-card border border-black/5 p-8 rounded-3xl shadow-xl">
                  <div className="flex items-center text-foreground font-bold text-xl mb-8 border-b border-black/10 pb-4">
                    <SlidersHorizontal className="w-5 h-5 mr-3 text-primary" />
                    Advanced Search
                  </div>
                  <FilterContent />
               </div>
            </div>
            
            {/* Right Column: Property Grid */}
            <div className="w-full lg:w-3/4 flex flex-col">
              <div className="hidden lg:flex justify-between items-center mb-8 bg-card border border-black/5 p-4 rounded-2xl">
                <p className="text-foreground/60 font-medium">Showing <span className="text-foreground font-bold">{filteredProperties.length}</span> luxury properties</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground/40 uppercase tracking-widest">Sort by</span>
                  <select 
                    value={priceSort}
                    onChange={(e) => setPriceSort(e.target.value as any)}
                    className="bg-background border border-black/10 text-foreground focus:outline-none text-sm font-bold cursor-pointer rounded-xl px-4 py-2 appearance-none"
                  >
                    <option value="featured" className="text-black">Featured</option>
                    <option value="price_asc" className="text-black">Price: Low to High</option>
                    <option value="price_desc" className="text-black">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {filteredProperties.map((prop, idx) => (
                    <PropertyCard key={prop.id} property={prop} featured={idx === 0 && priceSort === "featured"} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-card border border-black/5 rounded-3xl">
                  <p className="text-foreground/40 text-xl font-bold">No properties found matching your criteria.</p>
                  <button 
                    onClick={() => { setSearchTerm(""); setTypeFilter("all"); setPriceRange("all"); }}
                    className="mt-6 text-primary hover:text-foreground font-medium transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
