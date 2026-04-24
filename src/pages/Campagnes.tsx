import { motion } from "framer-motion";
import { Megaphone, Search } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { recentCampaigns, monthlyParticipants } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const statusColor: Record<string, string> = {
  "Terminée": "bg-success/20 text-success",
  "En cours": "bg-warning/20 text-warning",
  "Planifiée": "bg-info/20 text-info",
};

const Campagnes = () => {
  const [search, setSearch] = useState("");
  const filtered = recentCampaigns.filter(
    (c) => c.nom.toLowerCase().includes(search.toLowerCase()) || c.zone.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: recentCampaigns.length,
    terminees: recentCampaigns.filter((c) => c.statut === "Terminée").length,
    enCours: recentCampaigns.filter((c) => c.statut === "En cours").length,
    planifiees: recentCampaigns.filter((c) => c.statut === "Planifiée").length,
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
          <Megaphone className="inline w-6 h-6 mr-2 text-primary" />
          Campagnes
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">Suivi des campagnes de sensibilisation</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-primary" },
          { label: "Terminées", value: stats.terminees, color: "text-success" },
          { label: "En cours", value: stats.enCours, color: "text-warning" },
          { label: "Planifiées", value: stats.planifiees, color: "text-info" },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`} style={{ fontFamily: "Outfit" }}>{s.value}</p>
            <p className="text-xs text-dashboard-card-foreground/50">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Évolution Mensuelle</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyParticipants}>
            <defs>
              <linearGradient id="gradCamp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 13%, 91%, 0.8)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220, 13%, 91%)", borderRadius: 8, color: "hsl(220, 20%, 14%)" }} />
            <Area type="monotone" dataKey="participants" stroke="hsl(152, 60%, 45%)" fill="url(#gradCamp)" strokeWidth={2} name="Participants" />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>Liste des Séances</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dashboard-card-foreground/40" />
            <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-dashboard-card border-dashboard-border text-dashboard-card-foreground text-sm" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dashboard-border text-dashboard-card-foreground/50">
                <th className="text-left py-3 px-2 font-medium">Nom</th>
                <th className="text-left py-3 px-2 font-medium">Objectifs</th>
                <th className="text-left py-3 px-2 font-medium">Zone</th>
                <th className="text-right py-3 px-2 font-medium">Obj. participants</th>
                <th className="text-left py-3 px-2 font-medium">Organisateur</th>
                <th className="text-left py-3 px-2 font-medium">Date prévue</th>
                <th className="text-left py-3 px-2 font-medium">Début</th>
                <th className="text-left py-3 px-2 font-medium">Fin</th>
                <th className="text-center py-3 px-2 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-card/50 transition-colors">
                  <td className="py-3 px-2 text-dashboard-card-foreground font-medium whitespace-nowrap">{c.nom}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 text-xs max-w-[200px] truncate">{c.motif}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.zone}</td>
                  <td className="py-3 px-2 text-right text-dashboard-card-foreground font-semibold">{c.objectifParticipants}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.organisateur}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 whitespace-nowrap">{c.datePrevue}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.heureDebut}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.heureFin}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[c.statut]}`}>{c.statut}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Campagnes;
