import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card text-foreground pt-16 pb-8 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-4 block">
              Seronel<span className="text-primary"> Properties</span>
            </Link>
            <p className="text-foreground/60 text-sm mb-6">
              Curating the finest properties for the modern buyer. TikTok's leading real estate platform.
            </p>
            <div className="flex space-x-4 text-sm font-medium">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">TikTok</a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">YouTube</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Properties</h3>
            <ul className="space-y-2">
              <li><Link href="/properties?type=villa" className="text-foreground/60 hover:text-foreground text-sm transition-colors">Luxury Villas</Link></li>
              <li><Link href="/properties?type=penthouse" className="text-foreground/60 hover:text-foreground text-sm transition-colors">Penthouses</Link></li>
              <li><Link href="/properties?type=apartment" className="text-foreground/60 hover:text-foreground text-sm transition-colors">Modern Apartments</Link></li>
              <li><Link href="/properties?type=off-plan" className="text-foreground/60 hover:text-foreground text-sm transition-colors">Off-Plan Projects</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-foreground/60 hover:text-foreground text-sm transition-colors">About Us</Link></li>
              <li><Link href="/invest" className="text-foreground/60 hover:text-foreground text-sm transition-colors">Invest with Us</Link></li>
              <li><Link href="/careers" className="text-foreground/60 hover:text-foreground text-sm transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-foreground/60 hover:text-foreground text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Newsletter</h3>
            <p className="text-foreground/60 text-sm mb-4">Subscribe to get the latest property updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-black/5 border border-black/10 rounded-l-md px-4 py-2 w-full text-sm focus:outline-none focus:border-primary text-foreground"
              />
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-r-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/40 text-sm">© {new Date().getFullYear()} Seronel Properties. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <Link href="/privacy" className="text-foreground/40 hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-foreground/40 hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
