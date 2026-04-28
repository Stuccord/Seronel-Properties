"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Video, Loader2 } from "lucide-react";

type Property = {
  id: string;
  title: string;
  price: number;
  formatted_price: string;
  location: string;
  description: string;
  images: string[];
  video_url: string | null;
  type: string;
  beds: number;
  baths: number;
  sqft: number;
  features: string[];
};

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    type: "house",
    beds: "0",
    baths: "0",
    sqft: "0",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingVideo, setExistingVideo] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching properties:", error);
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  const handleOpenModal = (property?: Property) => {
    if (property) {
      setEditingId(property.id);
      setFormData({
        title: property.title,
        price: property.price?.toString() || "",
        location: property.location,
        description: property.description,
        type: property.type || "house",
        beds: property.beds?.toString() || "0",
        baths: property.baths?.toString() || "0",
        sqft: property.sqft?.toString() || "0",
      });
      setExistingImages(property.images || []);
      setExistingVideo(property.video_url || null);
    } else {
      setEditingId(null);
      setFormData({ title: "", price: "", location: "", description: "", type: "house", beds: "0", baths: "0", sqft: "0" });
      setExistingImages([]);
      setExistingVideo(null);
    }
    setImageFiles([]);
    setVideoFile(null);
    setIsModalOpen(true);
  };

  const uploadFile = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;
    
    const { error } = await supabase.storage.from('media').upload(filePath, file);
    if (error) throw error;
    
    const { data } = supabase.storage.from('media').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // 1. Upload Images
      const uploadedImages = [];
      for (const file of imageFiles) {
        const url = await uploadFile(file, 'images');
        uploadedImages.push(url);
      }
      
      // 2. Upload Video
      let videoUrl = existingVideo;
      if (videoFile) {
        videoUrl = await uploadFile(videoFile, 'videos');
      }

      const propertyData = {
        title: formData.title,
        price: parseFloat(formData.price),
        formatted_price: `GH₵ ${parseFloat(formData.price).toLocaleString()}`,
        location: formData.location,
        description: formData.description,
        type: formData.type,
        beds: parseInt(formData.beds) || 0,
        baths: parseInt(formData.baths) || 0,
        sqft: parseInt(formData.sqft) || 0,
        images: [...existingImages, ...uploadedImages],
        video_url: videoUrl,
        features: [] // Expandable in the future
      };

      if (editingId) {
        const { error } = await supabase.from('properties').update(propertyData).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('properties').insert([propertyData]);
        if (error) throw error;
      }
      
      setIsModalOpen(false);
      fetchProperties();
    } catch (error: any) {
      console.error("Error saving property:", error);
      alert(`Failed to save property. ${error.message || "Please check your Supabase DB/Storage configuration."}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this property? This cannot be undone.")) {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) {
        alert("Failed to delete property.");
        console.error(error);
      } else {
        fetchProperties();
      }
    }
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Property Management</h1>
            <p className="text-foreground/60">Manage your listings, prices, and media seamlessly.</p>
          </div>
          <button 
            onClick={() => handleOpenModal()} 
            className="flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-transform transform hover:scale-105 shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Property
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-24 bg-card border border-black/5 rounded-3xl shadow-xl">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-card border border-black/5 rounded-3xl p-16 text-center shadow-xl">
            <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-foreground/20" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">No properties listed</h3>
            <p className="text-foreground/60 mb-8 max-w-md mx-auto">You haven't added any properties to your portfolio yet. Click the button below to create your first listing.</p>
            <button onClick={() => handleOpenModal()} className="text-primary hover:text-foreground font-medium hover:underline transition-colors">
              + Add your first property
            </button>
          </div>
        ) : (
          <div className="bg-card border border-black/5 rounded-3xl overflow-hidden overflow-x-auto shadow-xl">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-black/5 border-b border-black/10 text-foreground/60 text-sm uppercase tracking-wider">
                  <th className="p-6 font-medium">Property Details</th>
                  <th className="p-6 font-medium">Price</th>
                  <th className="p-6 font-medium">Location</th>
                  <th className="p-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(p => (
                  <tr key={p.id} className="border-b border-black/5 hover:bg-black/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-xl bg-black/5 overflow-hidden mr-4 relative shrink-0 border border-black/10">
                          {p.images && p.images[0] ? (
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-foreground/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                          )}
                        </div>
                        <div>
                          <p className="text-foreground font-bold text-lg line-clamp-1 mb-1">{p.title}</p>
                          <span className="inline-block px-2 py-1 bg-black/5 rounded text-xs text-foreground/60 capitalize border border-black/10">{p.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-primary font-semibold">{p.formatted_price}</td>
                    <td className="p-6 text-foreground/70">{p.location}</td>
                    <td className="p-6 text-right space-x-3">
                      <button onClick={() => handleOpenModal(p)} className="p-3 bg-black/5 hover:bg-black/10 rounded-xl text-foreground/80 transition-colors group-hover:bg-black/10 border border-transparent hover:border-black/10">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-500 transition-colors border border-transparent hover:border-red-500/20">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto pt-24 pb-12">
          <div className="bg-card border border-black/10 rounded-3xl w-full max-w-3xl my-auto relative flex flex-col max-h-full shadow-2xl">
            <div className="flex justify-between items-center p-6 md:p-8 border-b border-black/10 shrink-0">
              <h2 className="text-2xl font-bold text-foreground">{editingId ? 'Edit Property' : 'Add New Property'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground bg-black/5 hover:bg-black/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
              <form id="property-form" onSubmit={handleSave} className="space-y-8">
                
                {/* Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-primary">Basic Details</h3>
                  <div>
                    <label className="block text-foreground/60 text-sm mb-2 font-medium">Property Title</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Luxury 4-Bedroom Villa" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-foreground/60 text-sm mb-2 font-medium">Price (in numbers)</label>
                      <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="150000" />
                    </div>
                    <div>
                      <label className="block text-foreground/60 text-sm mb-2 font-medium">Location</label>
                      <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="e.g. East Legon Hills, Accra" />
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-6 border-t border-black/10 pt-8">
                   <h3 className="text-lg font-semibold text-primary">Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-foreground/60 text-sm mb-2 font-medium">Property Type</label>
                      <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                        <option value="house" className="text-black">House</option>
                        <option value="apartment" className="text-black">Apartment</option>
                        <option value="land" className="text-black">Land</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-foreground/60 text-sm mb-2 font-medium">Bedrooms</label>
                      <input type="number" min="0" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-foreground/60 text-sm mb-2 font-medium">Bathrooms</label>
                      <input type="number" min="0" value={formData.baths} onChange={e => setFormData({...formData, baths: e.target.value})} className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-foreground/60 text-sm mb-2 font-medium">Area (Sqft)</label>
                      <input type="number" min="0" value={formData.sqft} onChange={e => setFormData({...formData, sqft: e.target.value})} className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="border-t border-black/10 pt-8">
                  <label className="block text-foreground/60 text-sm mb-2 font-medium">Detailed Description</label>
                  <textarea required rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-background border border-black/10 rounded-xl px-4 py-4 text-foreground focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Provide a detailed overview of the property's features and surroundings..."></textarea>
                </div>

                {/* Media */}
                <div className="border-t border-black/10 pt-8 pb-4">
                  <h3 className="text-lg font-semibold text-primary mb-6">Media Uploads</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-black/5 p-6 rounded-2xl border border-black/10 border-dashed hover:border-primary/50 transition-colors text-center relative cursor-pointer">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center text-primary">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-1">Property Images</p>
                      <p className="text-foreground/40 text-sm mb-4">Select multiple files (JPG, PNG)</p>
                      <input type="file" multiple accept="image/*" onChange={e => setImageFiles(Array.from(e.target.files || []))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      
                      {imageFiles.length > 0 ? (
                        <p className="text-sm text-primary font-medium">{imageFiles.length} new images selected</p>
                      ) : existingImages.length > 0 ? (
                        <p className="text-sm text-foreground/60">{existingImages.length} images already uploaded</p>
                      ) : null}
                    </div>

                    <div className="bg-black/5 p-6 rounded-2xl border border-black/10 border-dashed hover:border-primary/50 transition-colors text-center relative cursor-pointer">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center text-primary">
                          <Video className="w-6 h-6" />
                        </div>
                      </div>
                      <p className="text-foreground font-medium mb-1">Video Tour</p>
                      <p className="text-foreground/40 text-sm mb-4">Upload a vertical video (MP4)</p>
                      <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      
                      {videoFile ? (
                        <p className="text-sm text-primary font-medium">1 new video selected</p>
                      ) : existingVideo ? (
                        <p className="text-sm text-foreground/60">Video already uploaded</p>
                      ) : null}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-start p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    <p className="text-sm text-yellow-600/90 leading-relaxed">
                      <strong>Important:</strong> Media uploads require a configured Supabase project with a public storage bucket named <code>"media"</code>. If testing without Supabase credentials, uploads will fail.
                    </p>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 md:p-8 border-t border-black/10 shrink-0 bg-black/5 rounded-b-3xl flex justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-4 rounded-xl font-bold text-foreground hover:bg-black/5 transition-colors">
                Cancel
              </button>
              <button form="property-form" type="submit" disabled={isSaving} className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-transform transform hover:scale-105 flex items-center disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-primary/20">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {isSaving ? 'Processing...' : editingId ? 'Update Listing' : 'Publish Listing'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
