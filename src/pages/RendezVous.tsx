import { motion } from "framer-motion";
import { CalendarCheck, Search, Plus, X } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { rdvList, rdvByStatus, recentCampaigns } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statutColor: Record<string, string> = {
  "Confirmé": "bg-success/20 text-success",
  "En attente": "bg-warning/20 text-warning",
  "Annulé": "bg-destructive/20 text-destructive",
};

const RendezVous = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const filtered = rdvList.filter(
    (r) => r.participant.toLowerCase().includes(search.toLowerCase()) || r.agent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
            <CalendarCheck className="inline w-6 h-6 mr-2 text-primary" />
            Rendez-vous
          </h1>
          <p className="text-sm text-dashboard-card-foreground/50">Suivi des rendez-vous planifiés</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Prendre un rendez-vous
        </Button>
      </motion.div>

      {/* Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>Nouveau Rendez-vous</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <h4 className="text-sm font-semibold text-primary">Informations du rendez-vous</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Titre *</label>
              <Input placeholder="Titre du rendez-vous" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Contact *</label>
              <Input placeholder="Nom du contact" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Date *</label>
              <Input type="date" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Heure *</label>
              <Input type="time" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Lieu</label>
              <Input placeholder="Lieu du rendez-vous" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Séance associée</label>
              <Select>
                <SelectTrigger className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground">
                  <SelectValue placeholder="Sélectionner une séance" />
                </SelectTrigger>
                <SelectContent>
                  {recentCampaigns.map((c) => <SelectItem key={c.id} value={c.nom}>{c.nom}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="font-semibold px-8">Planifier le RDV</Button>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Statut des RDV</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={rdvByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {rdvByStatus.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220, 13%, 91%)", borderRadius: 8, color: "hsl(220, 20%, 14%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {rdvByStatus.map((t) => (
              <div key={t.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.fill }} />
                  <span className="text-dashboard-card-foreground/70">{t.name}</span>
                </div>
                <span className="font-semibold text-dashboard-card-foreground">{t.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass-card rounded-xl p-5">
          <div className="grid grid-cols-3 gap-4 h-full">
            {[
              { label: "Confirmés", value: rdvList.filter((r) => r.statut === "Confirmé").length, color: "text-success" },
              { label: "En attente", value: rdvList.filter((r) => r.statut === "En attente").length, color: "text-warning" },
              { label: "Annulés", value: rdvList.filter((r) => r.statut === "Annulé").length, color: "text-destructive" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center">
                <p className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: "Outfit" }}>{s.value}</p>
                <p className="text-xs text-dashboard-card-foreground/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>Liste des Rendez-vous</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dashboard-card-foreground/40" />
            <Input placeholder="Rechercher..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-dashboard-card border-dashboard-border text-dashboard-card-foreground text-sm" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dashboard-border text-dashboard-card-foreground/50">
                <th className="text-left py-3 px-2 font-medium">Participant</th>
                <th className="text-left py-3 px-2 font-medium">Agent</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
                <th className="text-left py-3 px-2 font-medium">Heure</th>
                <th className="text-left py-3 px-2 font-medium">Lieu</th>
                <th className="text-center py-3 px-2 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-card/50 transition-colors">
                  <td className="py-3 px-2 text-dashboard-card-foreground font-medium">{r.participant}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{r.agent}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{r.date}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{r.heure}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{r.lieu}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statutColor[r.statut]}`}>{r.statut}</span>
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

export default RendezVous;
