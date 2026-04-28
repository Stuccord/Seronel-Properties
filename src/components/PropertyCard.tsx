"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bed, Bath, Square, MapPin, MessageCircle, Heart, Loader2 } from "lucide-react";
import { Property } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AuthModal from "./AuthModal";

export default function PropertyCard({ property, featured = false }: { property: Property, featured?: boolean }) {
  const router = useRouter();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const whatsappMessage = encodeURIComponent(`Hello, I'm interested in ${property.title} (Ref: ${property.id}). Please send more details.`);

  useEffect(() => {
    if (user) {
      checkIfSaved();
    }
  }, [user, property.id]);

  const checkIfSaved = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user?.id)
      .eq('property_id', property.id)
      .single();
    
    if (data && !error) setIsSaved(true);
    else setIsSaved(false);
  };

  const toggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsSaving(true);
    try {
      if (isSaved) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', property.id);
        
        if (!error) setIsSaved(false);
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert([
            { user_id: user.id, property_id: property.id }
          ]);
        
        if (!error) setIsSaved(true);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div 
      onClick={() => router.push(`/properties/${property.id}`)} 
      className="group block rounded-3xl overflow-hidden bg-card border border-black/5 hover:border-primary/50 transition-all duration-500 flex flex-col h-full shadow-lg hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)] transform hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden shrink-0">
        <Image 
          src={property.images[0]} 
          alt={property.title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 w-fit">
              <span className="text-white text-xs font-bold uppercase tracking-wider">{property.type}</span>
            </div>
            {featured && (
              <div className="bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20 w-fit">
                <span className="text-primary-foreground text-xs font-bold uppercase tracking-wider">Featured</span>
              </div>
            )}
        </div>
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
           <button 
              onClick={toggleSave}
              disabled={isSaving}
              className={`p-3 rounded-full flex items-center justify-center shadow-xl transition-all transform hover:scale-110 disabled:opacity-50 ${isSaved ? 'bg-primary text-white' : 'bg-white/90 backdrop-blur-md text-foreground hover:text-red-500'}`}
              title={isSaved ? "Remove from favorites" : "Save to favorites"}
           >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />}
           </button>
           <a 
              href={`https://wa.me/1234567890?text=${whatsappMessage}`} 
              target="_blank" 
              rel="noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white p-3 rounded-full flex items-center justify-center shadow-xl transition-all transform hover:scale-110"
              title="Quick WhatsApp Inquiry"
           >
              <MessageCircle className="w-5 h-5" />
           </a>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
           <p className="text-2xl font-bold text-white drop-shadow-md">{property.formattedPrice}</p>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1 bg-gradient-to-b from-card to-background relative z-0">
        <div className="flex items-center text-primary mb-2 text-sm font-bold tracking-wide">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{property.title}</h3>
        
        <p className="text-foreground/60 text-sm mb-4 line-clamp-2 leading-relaxed">
          {property.description}
        </p>
        
        {property.type !== 'land' ? (
          <div className="grid grid-cols-3 gap-4 border-t border-black/10 pt-4 mt-auto mb-5">
            <div className="flex items-center text-foreground/80 text-sm font-semibold">
              <Bed className="w-4 h-4 mr-2 text-foreground/40" />
              {property.beds}
            </div>
            <div className="flex items-center text-foreground/80 text-sm font-semibold">
              <Bath className="w-4 h-4 mr-2 text-foreground/40" />
              {property.baths}
            </div>
            <div className="flex items-center text-foreground/80 text-sm font-semibold whitespace-nowrap">
              <Square className="w-4 h-4 mr-2 text-foreground/40" />
              {property.sqft}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 border-t border-black/10 pt-4 mt-auto mb-5">
            <div className="flex items-center text-foreground/80 text-sm font-semibold">
              <Square className="w-4 h-4 mr-2 text-foreground/40" />
              {property.sqft} sqft Plot Size
            </div>
          </div>
        )}

        <div className="mt-auto">
          <span className="flex items-center justify-center w-full bg-black/5 group-hover:bg-primary group-hover:text-primary-foreground text-foreground border border-black/10 px-4 py-3 rounded-xl transition-all duration-300 font-bold uppercase tracking-wider text-sm">
            View Details
          </span>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        title="Save Your Favorites"
        subtitle="Sign in to save properties to your wishlist and access them from any device."
      />
    </div>
  );
}
