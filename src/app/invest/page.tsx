"use client";

import { ArrowRight, TrendingUp, ShieldCheck, Building, BarChart3, CheckCircle2, Wallet, MessageCircle, MapPin } from "lucide-react";
import Image from "next/image";
import LeadCaptureForm from "@/components/LeadCaptureForm";

export default function InvestPage() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden flex items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background z-10" />
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Business Investment" 
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-8 border-primary/50 border animate-[fade-in-up_1s_ease-out_forwards]">
            <TrendingUp className="w-4 h-4 text-primary mr-2" />
            <span className="text-white text-sm font-bold tracking-wide uppercase">Real Estate Investments</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl animate-[fade-in-up_1s_ease-out_0.2s_forwards] opacity-0">
            Build Generational Wealth in <span className="text-primary italic">Ghana</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 font-light animate-[fade-in-up_1s_ease-out_0.4s_forwards] opacity-0">
            Secure high-yield properties in Africa's fastest-growing real estate market. Enjoy 15-25% annual appreciation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[fade-in-up_1s_ease-out_0.6s_forwards] opacity-0">
            <a href="#invest-form" className="inline-flex bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all items-center justify-center transform hover:scale-105 shadow-lg shadow-primary/20">
              Start Investing Today
            </a>
            <a href="https://wa.me/1234567890?text=Hello%20LuxeEstates,%20I'm%20interested%20in%20investment%20opportunities." target="_blank" rel="noreferrer" className="inline-flex glass text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all items-center justify-center transform hover:scale-105 border border-white/20">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Why Invest in Ghana */}
      <section className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Ghana Real Estate?</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">A stable economy, growing diaspora demand, and massive infrastructure developments make Ghana the ultimate investment destination.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Unmatched ROI</h3>
              <p className="text-foreground/60 leading-relaxed">Prime lands in Accra and surrounding areas appreciate between 15% and 25% annually. Build equity faster than traditional markets.</p>
            </div>
            
            <div className="bg-background p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform relative z-10">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 relative z-10">Political Stability</h3>
              <p className="text-foreground/60 leading-relaxed relative z-10">Ranked among the safest countries in Africa. Secure your investments in a robust democracy with strong property rights.</p>
            </div>
            
            <div className="bg-background p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Diaspora Boom</h3>
              <p className="text-foreground/60 leading-relaxed">Initiatives like "Year of Return" have fueled massive demand for high-quality housing and verified lands from international buyers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Appreciation Chart Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Visualizing Your <span className="text-primary">Returns</span></h2>
              <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
                Land in emerging prime areas like Prampram and East Legon Hills is not just a purchase; it's a wealth multiplier. While global stock markets fluctuate, Ghanaian real estate offers consistent, compounding growth.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                  <span className="text-foreground/80">Average <strong className="text-foreground">20% annual appreciation</strong> on serviced plots.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                  <span className="text-foreground/80">Rental yields for modern apartments average <strong className="text-foreground">8-12%</strong> per year.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                  <span className="text-foreground/80">Hedge against inflation with tangible, dollar-pegged assets.</span>
                </li>
              </ul>
            </div>

            {/* CSS Simulated Chart */}
            <div className="w-full lg:w-1/2">
              <div className="bg-card p-8 rounded-3xl border border-white/10 shadow-2xl relative">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h4 className="text-foreground font-bold text-xl">Property Appreciation Example</h4>
                    <p className="text-foreground/40 text-sm">Based on a $50,000 initial land investment</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-primary opacity-50" />
                </div>

                <div className="flex items-end justify-between h-64 gap-2 sm:gap-4 relative border-b border-white/10 pb-4">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 bottom-4 flex flex-col justify-between text-xs text-foreground/40 font-mono hidden sm:flex">
                    <span>$100k</span>
                    <span>$75k</span>
                    <span>$50k</span>
                  </div>

                  {/* Bars */}
                  <div className="flex-1 flex flex-col items-center justify-end group sm:ml-12">
                    <div className="w-full bg-primary/20 rounded-t-lg relative transition-all duration-500 group-hover:bg-primary/40 h-[20%]">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-foreground font-bold opacity-0 group-hover:opacity-100 transition-opacity">$50k</div>
                    </div>
                    <span className="text-foreground/60 text-sm mt-4 font-medium">Year 1</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-end group">
                    <div className="w-full bg-primary/40 rounded-t-lg relative transition-all duration-500 group-hover:bg-primary/60 h-[45%]">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-foreground font-bold opacity-0 group-hover:opacity-100 transition-opacity">$62k</div>
                    </div>
                    <span className="text-foreground/60 text-sm mt-4 font-medium">Year 3</span>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-end group">
                    <div className="w-full bg-primary/60 rounded-t-lg relative transition-all duration-500 group-hover:bg-primary/80 h-[70%]">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-foreground font-bold opacity-0 group-hover:opacity-100 transition-opacity">$80k</div>
                    </div>
                    <span className="text-foreground/60 text-sm mt-4 font-medium">Year 5</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-end group">
                    <div className="w-full bg-primary rounded-t-lg relative transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)] h-[100%]">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary font-bold drop-shadow-md">$103k</div>
                    </div>
                    <span className="text-foreground font-bold text-sm mt-4 text-primary">Year 7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Land vs House Comparison */}
      <section className="py-24 bg-card border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Where Should You Invest?</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Compare your options to find the strategy that fits your portfolio goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-background rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-colors">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-primary mr-4" />
                <h3 className="text-3xl font-bold text-foreground">Serviced Land</h3>
              </div>
              <ul className="space-y-4 mb-8 text-foreground/70">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> Low barrier to entry (starting ~$5,000)</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> Zero maintenance costs</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> Extremely high appreciation rate (20%+)</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> Flexibility to build later or flip for profit</li>
              </ul>
              <div className="bg-primary/10 text-primary p-4 rounded-xl border border-primary/20 text-sm font-semibold">
                Best for: Long-term wealth creation, portfolio diversification, and diaspora planning to build in the future.
              </div>
            </div>

            <div className="bg-background rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-colors">
              <div className="flex items-center mb-6">
                <Building className="w-8 h-8 text-orange-500 mr-4" />
                <h3 className="text-3xl font-bold text-foreground">Completed Homes</h3>
              </div>
              <ul className="space-y-4 mb-8 text-foreground/70">
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 shrink-0" /> Immediate passive income through rent</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 shrink-0" /> Ready for personal occupation</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 shrink-0" /> Airbnb potential in prime tourist areas</li>
                <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-orange-500 mr-3 shrink-0" /> Moderate appreciation (8-12%)</li>
              </ul>
              <div className="bg-orange-500/10 text-orange-400 p-4 rounded-xl border border-orange-500/20 text-sm font-semibold">
                Best for: Immediate cash flow, Airbnb hosts, and those seeking a ready-to-move-in vacation home.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Wallet className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-foreground mb-6">Flexible Payment Plans</h2>
          <p className="text-xl text-foreground/70 mb-10 leading-relaxed">
            We believe wealth creation should be accessible. That's why we offer structured, interest-free payment plans tailored to your financial flow.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl border border-black/10">
              <h4 className="text-foreground font-bold text-xl mb-2">Outright Payment</h4>
              <p className="text-foreground/60 text-sm">Enjoy up to 10% discount for immediate full settlement.</p>
            </div>
            <div className="glass p-6 rounded-2xl border border-black/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 z-0" />
              <div className="relative z-10">
                <div className="absolute -top-3 -right-3 bg-primary text-xs font-bold px-2 py-1 rounded">Popular</div>
                <h4 className="text-foreground font-bold text-xl mb-2">6-12 Months</h4>
                <h4 className="text-foreground font-bold text-xl mb-2">6-12 Months</h4>
                <p className="text-foreground/60 text-sm">Spread the balance comfortably over a year with zero interest.</p>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl border border-black/10">
              <h4 className="text-foreground font-bold text-xl mb-2">24 Months</h4>
              <p className="text-foreground/60 text-sm">Extended mortgage-style payments for premium properties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Lead Form */}
      <section id="invest-form" className="py-24 relative overflow-hidden bg-card border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-card to-card z-0" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Start Your Investment Journey</h2>
          <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
            Ready to secure your piece of Ghana? Our experts are standing by to guide you through available properties and tailor a plan for you.
          </p>
          
          <div className="w-full max-w-md mx-auto mb-10 text-left">
            <LeadCaptureForm 
              source="Investment Page" 
              title="Request Investment Guide" 
              subtitle="Drop your details and an advisor will contact you within 24 hours."
            />
          </div>

          <div className="flex justify-center">
            <a href="https://wa.me/1234567890?text=Hello%20Seronel%20Properties,%20I'm%20ready%20to%20invest." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center glass text-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-black/5 transition-all border border-black/10">
              <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" />
              Chat on WhatsApp instead
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
