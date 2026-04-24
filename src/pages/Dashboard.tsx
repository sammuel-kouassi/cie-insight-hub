import { motion } from "framer-motion";
import { Users, Megaphone, Phone, Gift, TrendingUp, MapPin } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import KpiCard from "@/components/KpiCard";
import {
  monthlyParticipants,
  participantsByRegion,
  participantsByType,
  recentCampaigns,
} from "@/data/mockData";

const kpis = [
  { title: "Total Participants", value: "10,420", change: "+12.5%", changeType: "up" as const, icon: Users },
  { title: "Séances Actives", value: "23", change: "+3 ce mois", changeType: "up" as const, icon: Megaphone },
  { title: "Prises de Contact", value: "1,847", change: "+8.2%", changeType: "up" as const, icon: Phone },
  { title: "Gadgets Distribués", value: "3,550", change: "-5% stock", changeType: "down" as const, icon: Gift },
];

const statusColor: Record<string, string> = {
  "Terminée": "bg-success/20 text-success",
  "En cours": "bg-warning/20 text-warning",
  "Planifiée": "bg-info/20 text-info",
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: 'Outfit' }}>
          Tableau de bord
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">
          Vue d'ensemble des séances de sensibilisation
        </p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <KpiCard key={kpi.title} {...kpi} index={i} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4 flex items-center gap-2" style={{ fontFamily: 'Outfit' }}>
            <TrendingUp className="w-4 h-4 text-primary" /> Évolution Mensuelle
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyParticipants}>
              <defs>
                <linearGradient id="gradParticipants" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradObjectif" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(24, 100%, 50%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(24, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 13%, 91%, 0.8)" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid hsl(220, 13%, 91%)', borderRadius: 8, color: 'hsl(220, 20%, 14%)' }} />
              <Area type="monotone" dataKey="participants" stroke="hsl(152, 60%, 45%)" fill="url(#gradParticipants)" strokeWidth={2} name="Participants enregistrés" />
              <Area type="monotone" dataKey="objectif" stroke="hsl(24, 100%, 50%)" fill="url(#gradObjectif)" strokeWidth={2} strokeDasharray="5 5" name="Objectif proraté" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-5"
        >
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: 'Outfit' }}>
            Répartition par Typologie
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={participantsByType} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {participantsByType.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid hsl(220, 13%, 91%)', borderRadius: 8, color: 'hsl(220, 20%, 14%)' }} />
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
      </div>

      {/* Bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4 flex items-center gap-2" style={{ fontFamily: 'Outfit' }}>
          <MapPin className="w-4 h-4 text-primary" /> Participants par Région
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={participantsByRegion} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 13%, 91%, 0.8)" />
            <XAxis type="number" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 12 }} axisLine={false} />
            <YAxis dataKey="region" type="category" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 12 }} axisLine={false} width={100} />
            <Tooltip contentStyle={{ background: '#fff', border: '1px solid hsl(220, 13%, 91%)', borderRadius: 8, color: 'hsl(220, 20%, 14%)' }} />
            <Bar dataKey="participants" radius={[0, 6, 6, 0]}>
              {participantsByRegion.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent séances table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: 'Outfit' }}>
          Séances Récentes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dashboard-border text-dashboard-card-foreground/50">
                <th className="text-left py-3 px-2 font-medium">Nom</th>
                <th className="text-left py-3 px-2 font-medium">Type</th>
                <th className="text-left py-3 px-2 font-medium">Motif</th>
                <th className="text-left py-3 px-2 font-medium">Cible</th>
                <th className="text-left py-3 px-2 font-medium">Zone</th>
                <th className="text-right py-3 px-2 font-medium">Obj. participants</th>
                <th className="text-left py-3 px-2 font-medium">Organisateur</th>
                <th className="text-left py-3 px-2 font-medium">Présentateur</th>
                <th className="text-center py-3 px-2 font-medium">Assistants</th>
                <th className="text-left py-3 px-2 font-medium">Date prévue</th>
                <th className="text-left py-3 px-2 font-medium">Début</th>
                <th className="text-left py-3 px-2 font-medium">Fin</th>
                <th className="text-center py-3 px-2 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentCampaigns.map((c) => (
                <tr key={c.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-card/50 transition-colors">
                  <td className="py-3 px-2 text-dashboard-card-foreground font-medium whitespace-nowrap">{c.nom}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 whitespace-nowrap">{c.typeSeance}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 text-xs max-w-[200px] truncate">{c.motif}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 text-xs max-w-[180px] truncate">{c.cible}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.zone}</td>
                  <td className="py-3 px-2 text-right text-dashboard-card-foreground font-semibold">{c.objectifParticipants}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.organisateur}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.presentateur}</td>
                  <td className="py-3 px-2 text-center text-dashboard-card-foreground/70" title={c.assistants.join(", ")}>{c.assistants.length}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70 whitespace-nowrap">{c.datePrevue}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.heureDebut}</td>
                  <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.heureFin}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor[c.statut]}`}>
                      {c.statut}
                    </span>
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

export default Dashboard;
