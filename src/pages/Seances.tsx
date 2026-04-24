import { motion } from "framer-motion";
import { Megaphone, Search, Plus, X } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { recentCampaigns, monthlyParticipants } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusColor: Record<string, string> = {
  "Terminée": "bg-success/20 text-success",
  "En cours": "bg-warning/20 text-warning",
  "Planifiée": "bg-info/20 text-info",
};

const zones = ["Abidjan", "Bouaké", "Yamoussoukro", "San Pedro", "Korhogo", "Daloa", "Man", "Gagnoa", "Abengourou"];

const cibles = [
  "Quartiers non structurés (ou quartiers péri urbain)",
  "Quartiers Structurés",
  "Groupes Ordonnés et Associations",
  "Collectivités Territoriales",
  "Administrations Publics et Privées",
  "Structures CIE SODECI",
  "Lieux de Cultes",
  "Lieux publics (Marchés, Gares, ...)",
];

const Seances = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [logistiqueItems, setLogistiqueItems] = useState<{ nom: string; cout: number }[]>([]);
  const [newItem, setNewItem] = useState("");
  const [newItemCout, setNewItemCout] = useState("");
  const [nbAssistants, setNbAssistants] = useState(0);
  const [assistants, setAssistants] = useState<string[]>([]);

  const handleNbAssistantsChange = (value: string) => {
    const n = Math.max(0, Math.min(20, Number(value) || 0));
    setNbAssistants(n);
    setAssistants((prev) => {
      const next = [...prev];
      if (n > prev.length) {
        for (let i = prev.length; i < n; i++) next.push("");
      } else {
        next.length = n;
      }
      return next;
    });
  };

  const filtered = recentCampaigns.filter(
    (c) => c.nom.toLowerCase().includes(search.toLowerCase()) || c.zone.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: recentCampaigns.length,
    terminees: recentCampaigns.filter((c) => c.statut === "Terminée").length,
    enCours: recentCampaigns.filter((c) => c.statut === "En cours").length,
    planifiees: recentCampaigns.filter((c) => c.statut === "Planifiée").length,
  };

  const totalLogistique = logistiqueItems.reduce((a, b) => a + b.cout, 0);

  const addLogistiqueItem = () => {
    if (newItem.trim()) {
      setLogistiqueItems([...logistiqueItems, { nom: newItem, cout: Number(newItemCout) || 0 }]);
      setNewItem("");
      setNewItemCout("");
    }
  };

  const removeLogistiqueItem = (index: number) => {
    setLogistiqueItems(logistiqueItems.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
            <Megaphone className="inline w-6 h-6 mr-2 text-primary" />
            Séances
          </h1>
          <p className="text-sm text-dashboard-card-foreground/50">Suivi des séances de sensibilisation</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Nouvelle séance
        </Button>
      </motion.div>

      {/* Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>Nouvelle Séance</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Bloc 1: Informations */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">Informations de la séance</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Nom de la séance *</label>
                <Input placeholder="Ex: Sensibilisation Abobo" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Zone *</label>
                <Select>
                  <SelectTrigger className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground">
                    <SelectValue placeholder="Sélectionner une zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {zones.map((z) => <SelectItem key={z} value={z}>{z}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Cible *</label>
                <Select>
                  <SelectTrigger className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground">
                    <SelectValue placeholder="Sélectionner une cible" />
                  </SelectTrigger>
                  <SelectContent>
                    {cibles.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Motif *</label>
                <textarea className="w-full rounded-md border border-dashboard-border bg-dashboard-card text-dashboard-card-foreground px-3 py-2 text-sm min-h-[80px]" placeholder="Décrire le motif de la séance..." />
              </div>
            </div>
          </div>

          {/* Bloc 2: Planification */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">Planification & Équipe</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Objectif participants *</label>
                <Input type="number" placeholder="Ex: 150" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Organisateur</label>
                <Input placeholder="Nom de l'organisateur" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Présentateur *</label>
                <Input placeholder="Nom du présentateur" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Nombre d'assistants</label>
                <Input
                  type="number"
                  min={0}
                  max={20}
                  value={nbAssistants}
                  onChange={(e) => handleNbAssistantsChange(e.target.value)}
                  placeholder="Ex: 3"
                  className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground"
                />
              </div>
            </div>
            {nbAssistants > 0 && (
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                {assistants.map((val, i) => (
                  <div key={i}>
                    <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">
                      Assistant {i + 1}
                    </label>
                    <Input
                      placeholder={`Nom de l'assistant ${i + 1}`}
                      value={val}
                      onChange={(e) => {
                        const next = [...assistants];
                        next[i] = e.target.value;
                        setAssistants(next);
                      }}
                      className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bloc 3: Date et Heures */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">Date et Heures</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Date prévue *</label>
                <Input type="date" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Heure de début *</label>
                <Input type="time" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Heure de fin *</label>
                <Input type="time" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              </div>
            </div>
          </div>

          {/* Bloc 4: Besoins logistiques */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">Besoins logistiques</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Nombre de gadgets</label>
                <Input type="number" placeholder="Ex: 200" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              </div>
            </div>
            <div className="flex gap-2 mb-3">
              <Input placeholder="Élément (Bâches, Chaises...)" value={newItem} onChange={(e) => setNewItem(e.target.value)} className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              <Input type="number" placeholder="Coût" value={newItemCout} onChange={(e) => setNewItemCout(e.target.value)} className="w-32 bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
              <Button variant="outline" onClick={addLogistiqueItem} type="button">Ajouter</Button>
            </div>
            {logistiqueItems.length > 0 && (
              <div className="space-y-2 mb-3">
                {logistiqueItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-dashboard-card/50 rounded-lg px-3 py-2 text-sm">
                    <span className="text-dashboard-card-foreground">{item.nom}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-dashboard-card-foreground font-medium">{item.cout.toLocaleString()} FCFA</span>
                      <button onClick={() => removeLogistiqueItem(i)} className="text-destructive hover:text-destructive/80">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-primary/10 rounded-lg px-4 py-2 text-sm font-semibold text-primary">
              Total Logistique : {totalLogistique.toLocaleString()} FCFA
            </div>
          </div>

          {/* Bloc 5: Enregistrement */}
          <div className="flex justify-end">
            <Button className="font-semibold px-8" size="lg">
              Enregistrer la séance
            </Button>
          </div>
        </motion.div>
      )}

      {/* Mini KPIs */}
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

      {/* Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>Évolution Mensuelle des Séances</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyParticipants}>
            <defs>
              <linearGradient id="gradSeance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(152, 60%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 13%, 91%, 0.8)" />
            <XAxis dataKey="month" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} axisLine={false} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220, 13%, 91%)", borderRadius: 8, color: "hsl(220, 20%, 14%)" }} />
            <Area type="monotone" dataKey="participants" stroke="hsl(152, 60%, 45%)" fill="url(#gradSeance)" strokeWidth={2} name="Participants" />
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Table */}
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
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-dashboard-border/50 hover:bg-dashboard-card/50 transition-colors">
                  <td className="py-3 px-2 text-dashboard-card-foreground font-medium whitespace-nowrap">{c.nom}</td>
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

export default Seances;
