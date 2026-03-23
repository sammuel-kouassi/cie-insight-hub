import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: LucideIcon;
  index?: number;
}

const KpiCard = ({ title, value, change, changeType, icon: Icon, index = 0 }: KpiCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-card rounded-xl p-5 glow-orange hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            changeType === "up"
              ? "bg-success/20 text-success"
              : changeType === "down"
              ? "bg-destructive/20 text-destructive"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: 'Outfit' }}>
        {value}
      </div>
      <div className="text-xs text-dashboard-card-foreground/50 mt-1">{title}</div>
    </motion.div>
  );
};

export default KpiCard;
