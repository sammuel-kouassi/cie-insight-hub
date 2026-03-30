import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  conversionFunnel, performanceByAgent, monthlyParticipants,
  participantsByRegion, contactsByResult,
} from "@/data/mockData";
import { PieChart, Pie, Cell } from "recharts";

const Statistiques = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
          <BarChart3 className="inline w-6 h-6 mr-2 text-primary" />
          Statistiques
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">Analyses détaillées et indicateurs de performance</p>
      </motion.div>

      {/* Funnel */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Entonnoir de Conversion</h3>
        <div className="flex items-end justify-center gap-3 h-64">
          {conversionFunnel.map((step, i) => {
            const maxVal = conversionFunnel[0].count;
            const height = (step.count / maxVal) * 100;
            return (
              <div key={step.etape} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-xs font-bold text-dashboard-card-foreground">{step.count.toLocaleString()}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="w-full max-w-16 rounded-t-lg"
                  style={{
                    background: `hsl(${24 + i * 30}, ${100 - i * 10}%, ${50 + i * 3}%)`,
                  }}
                />
                <span className="text-[10px] text-dashboard-card-foreground/60 text-center">{step.etape}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Performance agents */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Performance par Agent</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={performanceByAgent}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 20%, 25%, 0.5)" />
              <XAxis dataKey="agent" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220, 22%, 14%)", border: "1px solid hsl(220, 20%, 22%)", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="participants" fill="hsl(152, 60%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="contacts" fill="hsl(210, 100%, 56%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="conversions" fill="hsl(152, 60%, 45%)" radius={[4, 4, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Tendance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Tendance Annuelle</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyParticipants}>
              <defs>
                <linearGradient id="gradStats" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 20%, 25%, 0.5)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220, 22%, 14%)", border: "1px solid hsl(220, 20%, 22%)", borderRadius: 8, color: "#fff" }} />
              <Area type="monotone" dataKey="participants" stroke="hsl(24, 100%, 50%)" fill="url(#gradStats)" strokeWidth={2} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Regions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Répartition Régionale</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={participantsByRegion} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 20%, 25%, 0.5)" />
              <XAxis type="number" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis dataKey="region" type="category" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} width={100} />
              <Tooltip contentStyle={{ background: "hsl(220, 22%, 14%)", border: "1px solid hsl(220, 20%, 22%)", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="participants" radius={[0, 6, 6, 0]}>
                {participantsByRegion.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Contacts result */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Résultats des Prises de Contact</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={contactsByResult} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3}>
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
      </div>
    </div>
  );
};

export default Statistiques;
