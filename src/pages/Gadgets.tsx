import { motion } from "framer-motion";
import { Gift, Search } from "lucide-react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { gadgetsList, gadgetsByCategory, gadgetDistribution } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Gadgets = () => {
  const [search, setSearch] = useState("");
  const filtered = gadgetsList.filter(
    (g) => g.nom.toLowerCase().includes(search.toLowerCase()) || g.categorie.toLowerCase().includes(search.toLowerCase())
  );

  const totalStock = gadgetsList.reduce((a, g) => a + g.stock, 0);
  const totalDistribues = gadgetsList.reduce((a, g) => a + g.distribues, 0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
          <Gift className="inline w-6 h-6 mr-2 text-primary" />
          Gadgets
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">Suivi du stock et de la distribution des gadgets</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Distribués", value: totalDistribues.toLocaleString(), color: "text-primary" },
          { label: "Stock Restant", value: totalStock.toLocaleString(), color: "text-success" },
          { label: "Articles", value: gadgetsList.length, color: "text-info" },
          { label: "Catégories", value: gadgetsByCategory.length, color: "text-warning" },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`} style={{ fontFamily: "Outfit" }}>{s.value}</p>
            <p className="text-xs text-dashboard-card-foreground/50">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Distribution chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Distribution Mensuelle</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={gadgetDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 13%, 91%, 0.8)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220, 13%, 91%)", borderRadius: 8, color: "hsl(220, 20%, 14%)" }} />
              <Bar dataKey="distribues" fill="hsl(152, 60%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="stock" fill="hsl(210, 100%, 56%)" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Par Catégorie</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={gadgetsByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                {gadgetsByCategory.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220, 13%, 91%)", borderRadius: 8, color: "hsl(220, 20%, 14%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {gadgetsByCategory.map((t) => (
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
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>Inventaire des Gadgets</h3>
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
                <th className="text-left py-3 px-2 font-medium">Catégorie</th>
                <th className="text-right py-3 px-2 font-medium">Stock</th>
                <th className="text-right py-3 px-2 font-medium">Distribués</th>
                <th className="text-left py-3 px-2 font-medium">Campagne</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g) => (
                <tr key={g.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-card/50 transition-colors">
                  <td className="py-3 px-2 text-dashboard-card-foreground font-medium">{g.nom}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{g.categorie}</td>
                  <td className="py-3 px-2 text-right text-dashboard-card-foreground font-semibold">{g.stock}</td>
                  <td className="py-3 px-2 text-right text-dashboard-card-foreground font-semibold">{g.distribues}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{g.campagne}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Gadgets;
