"use client";

import Image from "next/image";
import { Play, Star, MessageCircle, ArrowRight, Quote } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background w-full">
      {/* 1. Hero / Mission & Vision */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-black/5 pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687931-cecebd802404?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/20 mb-8 border-primary/50 border-2 backdrop-blur-md">
            <span className="text-white text-sm font-black tracking-widest uppercase">Our Mission</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] max-w-5xl mx-auto">
            Redefining Trust in <span className="text-primary italic">Ghana Real Estate</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Our vision is to build the most transparent, reliable, and investor-friendly property platform in West Africa, bridging the gap between premium developments and global buyers.
          </p>
        </div>
      </section>

      {/* 2. Founder Story */}
      <section className="py-24 bg-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 relative h-[600px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
              {/* Realistic Founder Photo */}
              <Image 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Founder Story" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-bold text-white mb-2">Kwame Osei</h3>
                <p className="text-primary font-medium tracking-wide uppercase">Founder & CEO</p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-bold text-foreground mb-8">The Genesis of Seronel Properties</h2>
              <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
                <p>
                  "After spending a decade working in real estate across London and Dubai, I returned to Ghana to build a home. What I found was a market filled with massive potential, but plagued by opaque land titles, litigation issues, and a severe lack of trust."
                </p>
                <p>
                  "I realized that the diaspora and local professionals were eager to invest, but the friction was simply too high. That's why I founded Seronel Properties."
                </p>
                <p>
                  "We don't just list properties. We legally vet every single plot, structure flexible payment plans, and provide an end-to-end concierge service. We are your boots on the ground."
                </p>
              </div>
              <div className="mt-10 border-l-4 border-primary pl-6 py-2">
                <p className="text-xl text-foreground font-medium italic">"We sell peace of mind, disguised as real estate."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Meet Your Agent Video */}
      <section className="py-24 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet Your Dedicated Agent</h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto mb-16">
            Take a moment to virtually meet the person who will be guiding you through your property acquisition journey.
          </p>
          
          <div className="relative max-w-4xl mx-auto rounded-[2rem] overflow-hidden border-[8px] border-white/5 shadow-2xl aspect-video group cursor-pointer bg-black">
             <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
               {/* Using a placeholder professional video */}
               <source src="https://player.vimeo.com/external/409206405.sd.mp4?s=0eb45b736b416e91122a27ffae9024f0c4bb21e7&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
             
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transform group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                 <Play className="w-8 h-8 ml-1" />
               </div>
             </div>

             <div className="absolute bottom-8 left-8 text-left">
               <div className="flex items-center space-x-2 mb-2">
                 <span className="flex h-3 w-3 relative">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                 </span>
                 <p className="text-white text-sm font-bold uppercase tracking-wider">Video Intro</p>
               </div>
               <h3 className="text-3xl font-bold text-white drop-shadow-md">Hi, I'm Sarah!</h3>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Team Members */}
      <section className="py-24 bg-card border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">The Experts Behind Your Investment</h2>
          <p className="text-foreground/60 text-lg mb-16 max-w-2xl mx-auto">Our team combines decades of legal, construction, and sales experience.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: "Sarah Addo", role: "Lead Sales Agent", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { name: "David Mensah", role: "Head of Legal & Vetting", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { name: "Ama Serwaa", role: "Client Success Manager", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { name: "Michael Tetteh", role: "Chief Property Inspector", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
            ].map((person, i) => (
              <div key={i} className="bg-background rounded-[2rem] p-6 border border-black/5 hover:border-primary/30 transition-all group">
                <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-6">
                  <Image src={person.img} alt={person.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{person.name}</h3>
                <p className="text-primary font-medium text-sm">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Success Stories & Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Client Success Stories</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Don't just take our word for it. Hear from investors who have successfully acquired property through us.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Emmanuel K.",
                location: "London, UK",
                quote: "I tried buying land twice before and was scammed. LuxeEstates handled everything from vetting to the final deed transfer. Absolute lifesavers.",
              },
              {
                name: "Jessica & Mark",
                location: "Accra, Ghana",
                quote: "The 24-month payment plan allowed us to secure our dream home in East Legon Hills without emptying our business reserves. Highly recommended.",
              },
              {
                name: "Samuel B.",
                location: "Toronto, Canada",
                quote: "Sarah gave me a live video tour of the plots in Prampram. It felt like I was right there. Bought two plots and just received my land title.",
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-card p-8 rounded-3xl border border-black/5 relative">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-foreground/5" />
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary mr-1" />
                  ))}
                </div>
                <p className="text-foreground/80 text-lg italic mb-8 leading-relaxed relative z-10">"{t.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl mr-4">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold">{t.name}</h4>
                    <p className="text-foreground/40 text-sm">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-black/20 z-0" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">Ready to Make Your Move?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium drop-shadow-sm">
            Skip the automated emails and talk directly to a real human. Our agents are ready to answer all your questions via WhatsApp.
          </p>
          <div className="flex justify-center">
            <a 
              href="https://wa.me/1234567890?text=Hi!%20I'd%20like%20to%20talk%20to%20an%20agent." 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center bg-white text-primary px-10 py-5 rounded-full font-extrabold text-xl hover:bg-white/90 transition-transform transform hover:scale-105 shadow-2xl"
            >
              <MessageCircle className="w-6 h-6 mr-3 text-[#25D366]" />
              Talk to an Agent
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
