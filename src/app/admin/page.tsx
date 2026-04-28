"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Home, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    properties: 0,
    leads: 0,
    recentLeads: [] as any[]
  });

  useEffect(() => {
    async function fetchStats() {
      const { count: propCount } = await supabase.from('properties').select('*', { count: 'exact', head: true });
      const { count: leadCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });
      const { data: recentLeads } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5);

      setStats({
        properties: propCount || 0,
        leads: leadCount || 0,
        recentLeads: recentLeads || []
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-foreground/60">Welcome back. Here is what's happening with your properties today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card p-6 rounded-2xl border border-black/5 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <Home className="w-6 h-6" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-bold bg-green-500/10 px-2 py-1 rounded">
              <ArrowUpRight className="w-4 h-4 mr-1" /> Active
            </span>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{stats.properties}</h3>
          <p className="text-foreground/60">Total Properties</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-black/5 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-1">{stats.leads}</h3>
          <p className="text-foreground/60">Total Leads Captured</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-black/5 relative overflow-hidden group border-primary/20 shadow-lg">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Grow Your Portfolio</h3>
              <p className="text-foreground/60 text-sm">Add more listings to increase your lead volume.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-3xl border border-black/5 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-black/5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground">Recent Leads</h2>
          <Link href="/admin/leads" className="text-primary hover:text-foreground transition-colors text-sm font-medium bg-primary/10 px-4 py-2 rounded-lg">
            View All
          </Link>
        </div>
        {stats.recentLeads.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/5 text-foreground/40 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Interest</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                  <td className="px-6 py-4 text-foreground font-medium">{lead.name}</td>
                  <td className="px-6 py-4 text-foreground/70">{lead.interest}</td>
                  <td className="px-6 py-4 text-foreground/50">
                    <span className="inline-block px-2 py-1 bg-black/5 rounded text-xs border border-black/10">{lead.source}</span>
                  </td>
                  <td className="px-6 py-4 text-foreground/50">{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center text-foreground/40">No leads captured yet.</div>
        )}
      </div>
    </div>
  );
}
