"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  User, 
  Phone, 
  Mail, 
  Home, 
  Heart, 
  Clock, 
  Loader2, 
  Settings, 
  ChevronRight, 
  Trash2, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Bell
} from "lucide-react";
import Link from "next/link";
import { PROPERTIES, Property } from "@/lib/data";
import { supabase } from "@/lib/supabase";

type Tab = 'overview' | 'saved' | 'inquiries' | 'settings';

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  
  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      // Fetch favorites from Supabase
      fetchFavorites();

      // Fetch inquiries from Supabase
      fetchInquiries();

      // Set initial settings form
      setSettingsForm({
        name: profile?.full_name || "",
        phone: profile?.phone || "",
        email: user.email || "",
      });
    }
  }, [user, profile]);

  const fetchFavorites = async () => {
    if (!user) return;
    setFavoritesLoading(true);
    const { data, error } = await supabase
      .from('favorites')
      .select('property_id')
      .eq('user_id', user.id);
    
    if (!error && data) {
      setSavedIds(data.map(f => f.property_id));
    }
    setFavoritesLoading(false);
  };

  const fetchInquiries = async () => {
    if (!user) return;
    setInquiriesLoading(true);
    // Find inquiries by phone or email (matching profile)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .or(`phone.eq.${profile?.phone},name.eq.${profile?.full_name}`)
      .order('created_at', { ascending: false });

    if (!error) setInquiries(data || []);
    setInquiriesLoading(false);
  };

  const removeSaved = async (id: string) => {
    if (!user) return;
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('property_id', id);
    
    if (!error) {
      setSavedIds(prev => prev.filter(s => s !== id));
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateMsg(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user?.id,
          full_name: settingsForm.name,
          phone: settingsForm.phone,
          email: user?.email, // Email shouldn't be changed here easily in Supabase without re-auth
        });

      if (error) throw error;
      setUpdateMsg({ type: 'success', text: "Profile updated successfully!" });
    } catch (err: any) {
      setUpdateMsg({ type: 'error', text: err.message || "Failed to update profile." });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const savedProperties = PROPERTIES.filter(p => savedIds.includes(p.id));

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs / Back */}
        <div className="flex items-center text-sm text-foreground/40 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-foreground/80 font-medium">Dashboard</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card rounded-3xl border border-black/5 p-2 shadow-xl">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/60 hover:bg-black/5'}`}
              >
                <LayoutDashboardIcon className="w-5 h-5 mr-3" />
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('saved')}
                className={`w-full flex items-center px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'saved' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/60 hover:bg-black/5'}`}
              >
                <Heart className="w-5 h-5 mr-3" />
                Saved Properties
                {savedIds.length > 0 && (
                  <span className={`ml-auto w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${activeTab === 'saved' ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                    {savedIds.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'inquiries' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/60 hover:bg-black/5'}`}
              >
                <Clock className="w-5 h-5 mr-3" />
                My Inquiries
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-6 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/60 hover:bg-black/5'}`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Profile Settings
              </button>
            </div>

            <button 
              onClick={signOut}
              className="w-full flex items-center px-6 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-500/5 transition-all"
            >
              <LogOutIcon className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-primary/10 border border-primary/20 rounded-3xl p-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Hello, {profile?.full_name?.split(' ')[0] || 'User'}!</h2>
                    <p className="text-foreground/60 max-w-md">Welcome back to your dashboard. You have {savedIds.length} saved properties and {inquiries.length} active inquiries.</p>
                  </div>
                  <div className="absolute top-1/2 right-8 -translate-y-1/2 w-32 h-32 opacity-10">
                    <ShieldCheck className="w-full h-full text-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-card p-6 rounded-3xl border border-black/5 shadow-lg">
                      <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-4">
                        <Heart className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{savedIds.length}</div>
                      <div className="text-xs text-foreground/40 uppercase font-bold tracking-wider">Favorites</div>
                   </div>
                   <div className="bg-card p-6 rounded-3xl border border-black/5 shadow-lg">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4">
                        <MessageSquareIcon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{inquiries.length}</div>
                      <div className="text-xs text-foreground/40 uppercase font-bold tracking-wider">Total Inquiries</div>
                   </div>
                   <div className="bg-card p-6 rounded-3xl border border-black/5 shadow-lg">
                      <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-4">
                        <Bell className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">0</div>
                      <div className="text-xs text-foreground/40 uppercase font-bold tracking-wider">Alerts</div>
                   </div>
                </div>

                {/* Profile Snapshot */}
                <div className="bg-card rounded-3xl border border-black/5 p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-foreground">Account Summary</h3>
                    <button onClick={() => setActiveTab('settings')} className="text-primary text-sm font-bold hover:underline">Edit Info</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center p-4 bg-background rounded-2xl border border-black/5">
                      <Mail className="w-5 h-5 text-primary mr-4" />
                      <div>
                        <p className="text-xs text-foreground/40 uppercase font-bold">Email</p>
                        <p className="text-foreground font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-background rounded-2xl border border-black/5">
                      <Phone className="w-5 h-5 text-primary mr-4" />
                      <div>
                        <p className="text-xs text-foreground/40 uppercase font-bold">Phone</p>
                        <p className="text-foreground font-medium">{profile?.phone || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-foreground text-background rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="text-center md:text-left">
                     <h3 className="text-2xl font-bold mb-2">Ready to find your dream home?</h3>
                     <p className="text-background/60">Our new listings are updated daily.</p>
                   </div>
                   <Link href="/properties" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl shadow-primary/20 flex items-center">
                     Browse More Properties
                     <ArrowRight className="ml-2 w-5 h-5" />
                   </Link>
                </div>
              </div>
            )}

            {/* TAB: SAVED PROPERTIES */}
            {activeTab === 'saved' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">Saved Properties</h2>
                    <p className="text-foreground/60">Manage your favorite listings in one place.</p>
                  </div>
                </div>

                {favoritesLoading ? (
                  <div className="flex justify-center py-24">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  </div>
                ) : savedProperties.length === 0 ? (
                  <div className="bg-card rounded-3xl border border-black/5 p-16 text-center shadow-xl">
                    <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 text-foreground/10" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">Your wishlist is empty</h4>
                    <p className="text-foreground/40 mb-8 max-w-sm mx-auto">Found a property you love? Click the heart icon to save it for later.</p>
                    <Link href="/properties" className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all">
                      Explore Properties
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedProperties.map(prop => (
                      <div key={prop.id} className="bg-card rounded-3xl border border-black/5 shadow-xl overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                          <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <button 
                            onClick={() => removeSaved(prop.id)}
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                            title="Remove from favorites"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="p-6">
                          <h4 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{prop.title}</h4>
                          <div className="flex items-center text-foreground/40 text-sm mb-4">
                            <MapPin className="w-4 h-4 mr-1" />
                            {prop.location}
                          </div>
                          <div className="flex justify-between items-center pt-4 border-t border-black/5">
                            <span className="text-primary font-bold">{prop.formattedPrice}</span>
                            <Link href={`/properties/${prop.id}`} className="text-primary text-sm font-bold flex items-center hover:underline">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">My Inquiries</h2>
                  <p className="text-foreground/60">Track the status of properties you've asked about.</p>
                </div>

                {inquiriesLoading ? (
                  <div className="flex justify-center py-24">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="bg-card rounded-3xl border border-black/5 p-16 text-center shadow-xl">
                    <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Clock className="w-10 h-10 text-foreground/10" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">No active inquiries</h4>
                    <p className="text-foreground/40 max-w-sm mx-auto">Your inquiry history will appear here once you reach out about a property.</p>
                  </div>
                ) : (
                  <div className="bg-card rounded-3xl border border-black/5 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-black/5 text-foreground/40 text-[10px] uppercase font-bold tracking-widest border-b border-black/5">
                            <th className="px-8 py-6">Date</th>
                            <th className="px-8 py-6">Property / Interest</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                          {inquiries.map(item => (
                            <tr key={item.id} className="hover:bg-black/5 transition-colors group">
                              <td className="px-8 py-6 text-sm text-foreground/60">
                                {new Date(item.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-8 py-6">
                                <p className="font-bold text-foreground">{item.interest}</p>
                                <p className="text-xs text-foreground/40">{item.source}</p>
                              </td>
                              <td className="px-8 py-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 uppercase tracking-wider border border-blue-500/20">
                                  Processing
                                </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <button className="text-primary text-sm font-bold hover:underline">View Status</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h2>
                  <p className="text-foreground/60">Keep your contact information up to date.</p>
                </div>

                <div className="bg-card rounded-3xl border border-black/5 p-8 shadow-xl">
                  {updateMsg && (
                    <div className={`p-4 rounded-xl text-sm mb-6 ${updateMsg.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                      {updateMsg.text}
                    </div>
                  )}

                  <form onSubmit={handleUpdateSettings} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-foreground/60 text-sm mb-2 font-medium">Full Name</label>
                        <input 
                          type="text" 
                          value={settingsForm.name}
                          onChange={(e) => setSettingsForm({...settingsForm, name: e.target.value})}
                          className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-foreground/60 text-sm mb-2 font-medium">Phone Number</label>
                        <input 
                          type="tel" 
                          value={settingsForm.phone}
                          onChange={(e) => setSettingsForm({...settingsForm, phone: e.target.value})}
                          className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-foreground/60 text-sm mb-2 font-medium">Email Address (Read-only)</label>
                      <input 
                        disabled
                        type="email" 
                        value={settingsForm.email}
                        className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-4 text-foreground/40 cursor-not-allowed"
                      />
                      <p className="mt-2 text-[10px] text-foreground/40">Email change requires security verification. Contact support for updates.</p>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button 
                        type="submit" 
                        disabled={isUpdating}
                        className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl shadow-primary/20 flex items-center disabled:opacity-50"
                      >
                        {isUpdating ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : null}
                        {isUpdating ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8">
                   <h4 className="text-red-500 font-bold mb-2">Danger Zone</h4>
                   <p className="text-foreground/40 text-sm mb-6">Once you delete your account, there is no going back. Please be certain.</p>
                   <button className="text-red-500 text-sm font-bold px-6 py-3 bg-red-500/10 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                     Delete Account
                   </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-icons for clarity
function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}

function MessageSquareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function LogOutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}
