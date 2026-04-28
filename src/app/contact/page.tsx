"use client";

import { MessageCircle, Phone, MapPin, Mail, Building2, Map, TrendingUp } from "lucide-react";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function ContactPage() {
  const whatsappNumber = "1234567890";

  return (
    <div className="flex flex-col min-h-screen bg-background w-full pt-16">
      {/* Hero / Header */}
      <section className="bg-card py-24 border-b border-black/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight drop-shadow-lg animate-[fade-in-up_1s_ease-out_forwards]">
            Let's Talk <span className="text-primary italic">Real Estate</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto font-light leading-relaxed animate-[fade-in-up_1s_ease-out_0.2s_forwards] opacity-0">
            Whether you're buying, selling, or investing, our team is ready to guide you every step of the way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Column: Info & Quick Actions */}
            <div className="w-full lg:w-5/12 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Get in Touch</h2>
                
                {/* High Priority WhatsApp CTA */}
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Hi!%20I'm%20looking%20for%20property.`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center p-6 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl mb-8 group hover:bg-[#25D366]/20 transition-all cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.2)]"
                >
                  <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <h4 className="text-foreground font-bold text-xl mb-1">Chat on WhatsApp</h4>
                    <p className="text-foreground/60">Fastest response time.</p>
                  </div>
                </a>

                {/* Quick Buttons */}
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Inquiries</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=Hi!%20I'm%20interested%20in%20buying%20land.`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center p-4 bg-card border border-black/5 rounded-xl hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <Map className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Buy Land</span>
                  </a>
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=Hi!%20I'm%20interested%20in%20buying%20a%20house.`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center p-4 bg-card border border-black/5 rounded-xl hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Buy House</span>
                  </a>
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=Hi!%20I'd%20like%20to%20discuss%20investment%20opportunities.`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center p-4 bg-card border border-black/5 rounded-xl hover:border-primary/50 transition-colors group sm:col-span-2"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">Investment Opportunities</span>
                  </a>
                </div>

                {/* Contact Details */}
                <div className="space-y-6 bg-card p-8 rounded-3xl border border-black/5">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h4 className="text-foreground font-bold">Call Us</h4>
                      <p className="text-foreground/60">+233 24 123 4567</p>
                      <p className="text-foreground/60">+1 (555) 000-0000</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h4 className="text-foreground font-bold">Email</h4>
                      <p className="text-foreground/60">hello@luxeestates.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-primary mr-4 mt-1" />
                    <div>
                      <h4 className="text-foreground font-bold">Office Location</h4>
                      <p className="text-foreground/60">12 Independence Ave<br/>Ridge, Accra, Ghana</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form & Map */}
            <div className="w-full lg:w-7/12 flex flex-col gap-8">
               {/* Form */}
               <LeadCaptureForm 
                 source="Contact Page" 
                 title="Send a Direct Message" 
                 subtitle="Prefer email? Fill out the form below and we'll contact you within 24 hours."
                 className="bg-card border border-black/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
               />
               
               {/* Map Placeholder */}
               <a 
                 href="https://maps.google.com" 
                 target="_blank" 
                 rel="noreferrer"
                 className="w-full h-64 bg-card rounded-3xl border border-black/5 overflow-hidden relative group block"
               >
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors z-10">
                    <div className="bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-bold flex items-center shadow-2xl group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5 mr-2" />
                      View on Google Maps
                    </div>
                 </div>
                 <img 
                   src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                   alt="Map Location" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                 />
               </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
