import { motion } from "framer-motion";
import { Phone, Search } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { contactsList, contactsByResult } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Contacts = () => {
  const [search, setSearch] = useState("");
  const filtered = contactsList.filter(
    (c) => c.nomComplet.toLowerCase().includes(search.toLowerCase()) || c.directionRegionale.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
          <Phone className="inline w-6 h-6 mr-2 text-primary" />
          Prises de Contact
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">Historique des contacts effectués sur le terrain</p>
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
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220, 13%, 91%)", borderRadius: 8, color: "hsl(220, 20%, 14%)" }} />
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
              { label: "Directions", value: new Set(contactsList.map(c => c.directionRegionale)).size, color: "text-success" },
              { label: "Sites visités", value: new Set(contactsList.map(c => c.site)).size, color: "text-info" },
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
                <th className="text-left py-3 px-2 font-medium">Nom complet</th>
                <th className="text-left py-3 px-2 font-medium">Téléphone</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
                <th className="text-left py-3 px-2 font-medium">Objet de mission</th>
                <th className="text-left py-3 px-2 font-medium">Direction rég.</th>
                <th className="text-left py-3 px-2 font-medium">Agence</th>
                <th className="text-left py-3 px-2 font-medium">Quartier</th>
                <th className="text-left py-3 px-2 font-medium">Site</th>
                <th className="text-left py-3 px-2 font-medium">Points abordés</th>
                <th className="text-left py-3 px-2 font-medium">Observations</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-card/50 transition-colors">
                  <td className="py-3 px-2 text-dashboard-card-foreground font-medium whitespace-nowrap">{c.nomComplet}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 whitespace-nowrap">{c.telephone}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 whitespace-nowrap">{c.date}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.objetMission}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 whitespace-nowrap">{c.directionRegionale}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 whitespace-nowrap">{c.agence}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.quartier}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.site}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 text-xs">{c.pointsAbordes}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 text-xs">{c.observations}</td>
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
