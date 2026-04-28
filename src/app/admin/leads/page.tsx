"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Download, Loader2, Users } from "lucide-react";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  interest: string;
  source: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Error fetching leads:", error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  const exportToCSV = () => {
    if (leads.length === 0) return;

    // Build CSV string
    const headers = ["Date", "Name", "Phone", "Interest", "Source"];
    const rows = leads.map(lead => [
      new Date(lead.created_at).toLocaleString(),
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.phone}"`,
      `"${lead.interest}"`,
      `"${lead.source}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    
    // Create Blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `luxeestates_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Lead Management</h1>
          <p className="text-foreground/60">View and export all inquiries captured across the site.</p>
        </div>
        <button 
          onClick={exportToCSV}
          disabled={leads.length === 0 || loading}
          className="flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-primary/20"
        >
          <Download className="w-5 h-5 mr-2" />
          Export CSV
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24 bg-card border border-black/5 rounded-3xl shadow-xl">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-card border border-black/5 rounded-3xl p-16 text-center shadow-xl">
          <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-foreground/20" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">No leads found</h3>
          <p className="text-foreground/60 max-w-md mx-auto">When users submit inquiries through the contact forms or property detail pages, they will appear here.</p>
        </div>
      ) : (
        <div className="bg-card border border-black/5 rounded-3xl overflow-hidden overflow-x-auto shadow-xl">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-black/5 border-b border-black/10 text-foreground/60 text-sm uppercase tracking-wider">
                <th className="p-6 font-medium">Date</th>
                <th className="p-6 font-medium">Name</th>
                <th className="p-6 font-medium">Contact</th>
                <th className="p-6 font-medium">Interest / Budget</th>
                <th className="p-6 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                  <td className="p-6 text-foreground/70 text-sm">
                    {new Date(lead.created_at).toLocaleDateString()}<br/>
                    <span className="text-foreground/40 text-xs">{new Date(lead.created_at).toLocaleTimeString()}</span>
                  </td>
                  <td className="p-6 text-foreground font-bold">{lead.name}</td>
                  <td className="p-6 text-primary font-medium">{lead.phone}</td>
                  <td className="p-6 text-foreground/80">{lead.interest}</td>
                  <td className="p-6">
                    <span className="inline-block px-2 py-1 bg-black/5 rounded text-xs text-foreground/60 border border-black/10">
                      {lead.source}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
