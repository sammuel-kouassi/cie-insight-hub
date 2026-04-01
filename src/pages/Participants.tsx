import { motion } from "framer-motion";
import { Users, Search } from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { participantsList, participantsByType, participantsByRegion } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Participants = () => {
  const [search, setSearch] = useState("");
  const filtered = participantsList.filter(
    (p) =>
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.region.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
          <Users className="inline w-6 h-6 mr-2 text-primary" />
          Participants
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">
          Consultation des participants enregistrés via l'application mobile
        </p>
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Répartition par Typologie</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={participantsByType} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {participantsByType.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220, 13%, 91%)", borderRadius: 8, color: "hsl(220, 20%, 14%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {participantsByType.map((t) => (
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Participants par Région</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={participantsByRegion} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 13%, 91%, 0.8)" />
              <XAxis type="number" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis dataKey="region" type="category" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} width={100} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220, 13%, 91%)", borderRadius: 8, color: "hsl(220, 20%, 14%)" }} />
              <Bar dataKey="participants" radius={[0, 6, 6, 0]}>
                {participantsByRegion.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>Liste des Participants</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dashboard-card-foreground/40" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-dashboard-card border-dashboard-border text-dashboard-card-foreground text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dashboard-border text-dashboard-card-foreground/50">
                <th className="text-left py-3 px-2 font-medium">Nom</th>
                <th className="text-left py-3 px-2 font-medium">Type</th>
                <th className="text-left py-3 px-2 font-medium">Région</th>
                <th className="text-left py-3 px-2 font-medium">Téléphone</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
                <th className="text-left py-3 px-2 font-medium">Campagne</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-card/50 transition-colors">
                  <td className="py-3 px-2 text-dashboard-card-foreground font-medium">{p.nom}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{p.type}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{p.region}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{p.telephone}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{p.date}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{p.campagne}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Participants;
