import { motion } from "framer-motion";
import { Settings, Bell, Shield, Database, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const Administration = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
          <Settings className="inline w-6 h-6 mr-2 text-primary" />
          Administration
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">Paramètres et configuration de la plateforme</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profil */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
            <Users className="w-4 h-4 text-primary" /> Profil Utilisateur
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Nom complet</label>
              <Input defaultValue="Administrateur DLF" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Email</label>
              <Input defaultValue="admin@dlf-ci.com" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
            </div>
            <Button className="font-semibold">Mettre à jour</Button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
            <Bell className="w-4 h-4 text-primary" /> Notifications
          </h3>
          <div className="space-y-4">
            {[
              { label: "Notifications par email", desc: "Recevoir les alertes par email" },
              { label: "Nouvelles séances", desc: "Être notifié des nouvelles séances créées" },
              { label: "Rappels RDV", desc: "Recevoir des rappels de rendez-vous" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-dashboard-card-foreground">{item.label}</p>
                  <p className="text-xs text-dashboard-card-foreground/50">{item.desc}</p>
                </div>
                <Switch />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sécurité */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
            <Shield className="w-4 h-4 text-primary" /> Sécurité
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Mot de passe actuel</label>
              <Input type="password" placeholder="••••••••" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium text-dashboard-card-foreground mb-1 block">Nouveau mot de passe</label>
              <Input type="password" placeholder="••••••••" className="bg-dashboard-card border-dashboard-border text-dashboard-card-foreground" />
            </div>
            <Button className="font-semibold">Changer le mot de passe</Button>
          </div>
        </motion.div>

        {/* Données */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
            <Database className="w-4 h-4 text-primary" /> Données
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dashboard-card-foreground">Synchronisation automatique</p>
                <p className="text-xs text-dashboard-card-foreground/50">Synchroniser les données de l'app mobile</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-dashboard-card-foreground">Export des données</p>
                <p className="text-xs text-dashboard-card-foreground/50">Exporter en CSV ou Excel</p>
              </div>
              <Button variant="outline" size="sm">Exporter</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Administration;
