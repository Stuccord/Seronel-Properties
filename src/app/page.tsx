import PropertyCard from "@/components/PropertyCard";
import { ArrowRight, MapPin, Building2, Home as HomeIcon, Star, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PROPERTIES } from "@/lib/data";
import HeroSearch from "@/components/HeroSearch";

const FEATURED_PROPERTIES = PROPERTIES.slice(0, 4);
const LATEST_PROPERTIES = PROPERTIES.slice(4, 7);

const CATEGORIES = [
  { title: "Apartments", count: "24", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", icon: Building2 },
  { title: "Villas", count: "12", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", icon: HomeIcon },
  { title: "Commercial", count: "8", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", icon: Building2 },
  { title: "Land / Plots", count: "45", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", icon: MapPin },
];

const BLOGS = [
  {
    title: "10 Reasons to Invest in Real Estate Now",
    category: "Investment",
    date: "April 24, 2026",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "How to Choose the Perfect Neighborhood",
    category: "Buying Guide",
    date: "April 18, 2026",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Interior Design Trends for 2026",
    category: "Design",
    date: "April 10, 2026",
    img: "https://images.unsplash.com/photo-1600566753086-00f18efc2291?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const TESTIMONIALS = [
  {
    name: "Kwame Mensah",
    role: "First-Time Homebuyer",
    text: "LuxeEstates made buying my first plot completely stress-free. Highly recommended!",
    rating: 5
  },
  {
    name: "Abena Osei",
    role: "Real Estate Investor",
    text: "The flexible payment plans allowed me to secure two prime properties without breaking the bank.",
    rating: 5
  },
  {
    name: "Daniel Addo",
    role: "Diaspora Investor",
    text: "Living in the UK, I was worried about fraud, but their verification process gave me 100% peace of mind.",
    rating: 5
  }
];

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (Centered Search) */}
      <section className="relative h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center h-full text-center mt-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-[fade-in-up_1s_ease-out_forwards]">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-2xl drop-shadow-lg animate-[fade-in-up_1s_ease-out_0.2s_forwards] opacity-0">
            From cozy apartments to luxury villas, we have something for everyone.
          </p>
          
          <div className="w-full max-w-4xl animate-[fade-in-up_1s_ease-out_0.4s_forwards] opacity-0">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* 2. Property Categories */}
      <section className="py-32 bg-background border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Explore Categories</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Browse our wide selection of properties by type.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map((cat, idx) => (
              <Link href="/properties" key={idx} className="group relative h-80 rounded-3xl overflow-hidden block">
                <Image src={cat.img} alt={cat.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <cat.icon className="w-8 h-8 text-white mb-4 transform group-hover:-translate-y-2 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-1">{cat.title}</h3>
                  <p className="text-white/70">{cat.count} Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Properties */}
      <section className="py-32 bg-card border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Discover Our Featured Listings</h2>
              <p className="text-foreground/60 text-lg">Handpicked prime properties just for you.</p>
            </div>
            <Link href="/properties" className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors flex items-center shrink-0 shadow-lg">
              See All Listings <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PROPERTIES.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Properties */}
      <section className="py-32 bg-background border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Recently Added</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">Be the first to view our newest inventory.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {LATEST_PROPERTIES.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-32 bg-card border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-16">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-background p-10 rounded-[2rem] border border-black/5 relative hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                <div className="flex justify-center mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-primary fill-primary mx-1" />
                  ))}
                </div>
                <p className="text-foreground/80 text-xl font-light italic mb-8 leading-relaxed">"{t.text}"</p>
                <div>
                  <h4 className="text-foreground font-bold text-lg">{t.name}</h4>
                  <p className="text-primary font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Blog / News Preview */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Real Estate Insights</h2>
              <p className="text-foreground/60 text-lg">Stay updated with market trends and buying guides.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOGS.map((blog, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative w-full h-72 rounded-3xl overflow-hidden mb-6 shadow-xl">
                  <Image src={blog.img} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-md">
                    {blog.category}
                  </div>
                </div>
                <p className="text-foreground/40 text-sm mb-3">{blog.date}</p>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{blog.title}</h3>
                <span className="text-primary font-bold flex items-center">Read More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687959-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-md">Looking to Sell or Rent Your Property?</h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium drop-shadow-sm leading-relaxed">
            We provide full-service property management and marketing. Let us connect you with our global network of verified buyers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/admin/properties" className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-transform transform hover:scale-105 shadow-2xl flex items-center justify-center">
              Submit Property
            </Link>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="glass text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-transform transform hover:scale-105 border border-white/20 flex items-center justify-center">
              Contact an Agent
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
