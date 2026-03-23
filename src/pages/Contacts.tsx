import { motion } from "framer-motion";
import { Phone, Search } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { contactsList, contactsByResult } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const resultatColor: Record<string, string> = {
  "Converti": "bg-success/20 text-success",
  "Intéressé": "bg-warning/20 text-warning",
  "Rendez-vous pris": "bg-info/20 text-info",
  "Pas intéressé": "bg-muted text-muted-foreground",
};

const Contacts = () => {
  const [search, setSearch] = useState("");
  const filtered = contactsList.filter(
    (c) => c.participant.toLowerCase().includes(search.toLowerCase()) || c.agent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
          <Phone className="inline w-6 h-6 mr-2 text-primary" />
          Prises de Contact
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">Historique des contacts effectués par les agents</p>
      </motion.div>

      {/* Chart + stats */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Résultats des Contacts</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={contactsByResult} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {contactsByResult.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(220, 22%, 14%)", border: "1px solid hsl(220, 20%, 22%)", borderRadius: 8, color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {contactsByResult.map((t) => (
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
          <div className="grid grid-cols-2 gap-4 h-full">
            {[
              { label: "Total Contacts", value: contactsList.length, color: "text-primary" },
              { label: "Visites", value: contactsList.filter((c) => c.type === "Visite").length, color: "text-success" },
              { label: "Appels", value: contactsList.filter((c) => c.type === "Appel").length, color: "text-info" },
              { label: "Taux Conversion", value: "35%", color: "text-warning" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center">
                <p className={`text-3xl font-bold ${s.color}`} style={{ fontFamily: "Outfit" }}>{s.value}</p>
                <p className="text-xs text-dashboard-card-foreground/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>Historique des Contacts</h3>
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
                <th className="text-left py-3 px-2 font-medium">Type</th>
                <th className="text-left py-3 px-2 font-medium">Agent</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
                <th className="text-left py-3 px-2 font-medium">Région</th>
                <th className="text-center py-3 px-2 font-medium">Résultat</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-card/50 transition-colors">
                  <td className="py-3 px-2 text-dashboard-card-foreground font-medium">{c.participant}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.type}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.agent}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.date}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.region}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${resultatColor[c.resultat] || "bg-muted text-muted-foreground"}`}>{c.resultat}</span>
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

export default Contacts;
