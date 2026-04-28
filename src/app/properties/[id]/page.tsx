import { Bed, Bath, Square, MapPin, Heart, Check, ArrowRight, PlayCircle, Calendar, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data";
import { notFound } from "next/navigation";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export async function generateStaticParams() {
  return PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = PROPERTIES.find(p => p.id === id);

  if (!property) {
    return notFound();
  }

  // Pre-filled WhatsApp message
  const whatsappMessage = encodeURIComponent(`Hello, I'm interested in the ${property.title} (Ref: ${property.id}). Can we schedule a viewing?`);

  return (
    <div className="bg-background w-full min-h-screen pb-24">
      {/* Image Gallery Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 h-[60vh] gap-2 md:gap-4 p-2 md:p-4">
        <div className="col-span-1 md:col-span-2 row-span-2 relative rounded-2xl overflow-hidden group">
          <Image 
            src={property.images[0]} 
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-sm font-medium capitalize">
              {property.type} For Sale
            </div>
            <button className="bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10 text-white hover:text-primary hover:bg-black/60 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group hidden md:block">
          {property.images[1] ? (
             <Image src={property.images[1]} alt={`${property.title} Interior`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
             <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20">No Image</div>
          )}
        </div>
        <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group hidden md:block bg-card">
          {property.videoUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white cursor-pointer hover:bg-white/5 transition-colors border border-white/5 hover:border-primary/50">
               <PlayCircle className="w-12 h-12 mb-2 text-primary" />
               <span className="font-medium text-sm">Watch Video Tour</span>
            </div>
          ) : property.images[2] ? (
             <Image src={property.images[2]} alt={`${property.title} View`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
          ) : (
             <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20 border border-white/5">No Image</div>
          )}
        </div>
        <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden hidden md:block bg-card hover:border-white/20 border border-white/5 transition-colors cursor-pointer">
          <span className="text-white font-medium flex items-center justify-center h-full w-full">
            View All Media <ArrowRight className="w-4 h-4 ml-2" />
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Details */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{property.title}</h1>
                <div className="flex items-center text-foreground/60 text-lg">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  {property.location}
                </div>
              </div>
              <p className="text-4xl font-bold text-primary hidden md:block">{property.formattedPrice}</p>
            </div>
            
            <p className="text-4xl font-bold text-primary mb-8 md:hidden">{property.formattedPrice}</p>

            {property.type !== 'land' ? (
              <div className="flex flex-wrap gap-8 py-6 border-y border-black/10 mb-8">
                <div className="flex items-center">
                  <Bed className="w-6 h-6 mr-3 text-foreground/40" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{property.beds}</p>
                    <p className="text-foreground/40 text-sm uppercase tracking-wider">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="w-6 h-6 mr-3 text-foreground/40" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{property.baths}</p>
                    <p className="text-foreground/40 text-sm uppercase tracking-wider">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Square className="w-6 h-6 mr-3 text-foreground/40" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{property.sqft.toLocaleString()}</p>
                    <p className="text-foreground/40 text-sm uppercase tracking-wider">Square Feet</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-8 py-6 border-y border-black/10 mb-8">
                <div className="flex items-center">
                  <Square className="w-6 h-6 mr-3 text-foreground/40" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{property.sqft.toLocaleString()}</p>
                    <p className="text-foreground/40 text-sm uppercase tracking-wider">Total Plot Area</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">About this property</h2>
              <p className="text-foreground/70 text-lg leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Features & Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-foreground/80">
                    <Check className="w-5 h-5 mr-3 text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            
            {property.videoUrl && (
               <div className="mb-12">
                 <h2 className="text-2xl font-bold text-white mb-6">Video Tour</h2>
                 <div className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 relative">
                   <iframe 
                     src={property.videoUrl} 
                     title={`${property.title} Video Tour`}
                     className="absolute inset-0 w-full h-full"
                     allowFullScreen
                   ></iframe>
                 </div>
               </div>
            )}

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Location</h2>
              <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-black/10 relative bg-black/5 shadow-inner">
                <iframe 
                   src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                   className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-70"
                   allowFullScreen
                   loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Sidebar / CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              
              <div className="bg-card border border-black/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                
                <div className="mb-8 border-b border-black/10 pb-6 relative z-10">
                  <p className="text-foreground/60 mb-2 font-medium">Asking Price</p>
                  <p className="text-4xl font-bold text-primary tracking-tight">{property.formattedPrice}</p>
                </div>

                <div className="space-y-4 relative z-10">
                  <a href={`https://wa.me/1234567890?text=${whatsappMessage}`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center bg-[#25D366] text-white px-6 py-4 rounded-2xl font-bold hover:bg-[#128C7E] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#25D366]/20">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp Inquiry
                  </a>
                  <button className="w-full flex items-center justify-center bg-primary text-primary-foreground px-6 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Viewing
                  </button>
                </div>
              </div>

              {/* Agent Card */}
              <div className="bg-card border border-black/10 rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-foreground mb-6">Meet the Agent</h3>
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
                    <Image 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Kwame Osei" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold">Kwame Osei</h4>
                    <p className="text-primary text-sm font-medium">Senior Property Consultant</p>
                  </div>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed mb-6 italic">
                  "I specialize in high-value investments in the Accra region. Let me help you find the perfect match."
                </p>
                <div className="flex items-center text-foreground/80 text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  Available for tours today
                </div>
              </div>

              <LeadCaptureForm 
                source={`Property Detail - ${property.title}`} 
                defaultInterest={property.title} 
                className="bg-card border border-white/10 rounded-3xl p-8 shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-24 pt-16 border-t border-black/5">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Similar Properties</h2>
              <p className="text-foreground/60">Handpicked listings you might also be interested in.</p>
            </div>
            <Link href="/properties" className="text-primary hover:text-white transition-colors flex items-center font-bold">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.filter(p => p.id !== property.id && p.type === property.type).slice(0, 3).map(prop => (
              <div key={prop.id} className="group relative bg-card rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <Image src={prop.images[0]} alt={prop.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    {prop.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{prop.title}</h3>
                  <div className="flex items-center text-foreground/60 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-primary" />
                    {prop.location}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-black/10">
                    <p className="text-primary font-bold text-lg">{prop.formattedPrice}</p>
                    <Link href={`/properties/${prop.id}`} className="text-foreground/40 group-hover:text-white group-hover:bg-primary transition-all p-2 bg-black/5 rounded-full">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
