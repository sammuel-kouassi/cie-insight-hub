import { useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import Participants from "./Participants";
import Contacts from "./Contacts";
import RendezVous from "./RendezVous";
import Gadgets from "./Gadgets";

const tabs = [
  { key: "participants", label: "Participants" },
  { key: "contacts", label: "Prises de contact" },
  { key: "rdv", label: "Rendez-vous" },
  { key: "gadgets", label: "Gadgets" },
];

const Activite = () => {
  const [activeTab, setActiveTab] = useState("participants");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
          <Activity className="inline w-6 h-6 mr-2 text-primary" />
          Activité
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">Suivi des activités terrain</p>
      </motion.div>

      {/* Tabs nav */}
      <div className="flex gap-1 bg-dashboard-card border border-dashboard-border rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-dashboard-card-foreground/60 hover:text-dashboard-card-foreground hover:bg-dashboard-card/80"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {activeTab === "participants" && <Participants />}
        {activeTab === "contacts" && <Contacts />}
        {activeTab === "rdv" && <RendezVous />}
        {activeTab === "gadgets" && <Gadgets />}
      </div>
    </div>
  );
};

export default Activite;
