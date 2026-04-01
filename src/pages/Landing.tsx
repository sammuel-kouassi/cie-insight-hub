import { motion } from "framer-motion";
import { ArrowRight, Users, BarChart3, Smartphone, Shield, Zap, Globe, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-campaign.jpg";

const features = [
  { icon: Smartphone, title: "Collecte Mobile", desc: "Enregistrement terrain en mode hors ligne avec synchronisation automatique" },
  { icon: Users, title: "Gestion Participants", desc: "Suivi complet des participants aux campagnes de sensibilisation" },
  { icon: BarChart3, title: "Statistiques Avancées", desc: "Tableaux de bord dynamiques avec KPI et graphiques interactifs" },
  { icon: Shield, title: "Données Sécurisées", desc: "Protection des données personnelles avec consentement obligatoire" },
  { icon: Map, title: "Cartographie", desc: "Traçabilité des campagnes sur la carte de la Côte d'Ivoire en temps réel" },
  { icon: Globe, title: "Multi-Régions", desc: "Couverture de toutes les directions régionales et agences" },
];

const stats = [
  { value: "12+", label: "Directions Régionales" },
  { value: "50+", label: "Agents Terrain" },
  { value: "10K+", label: "Participants Enregistrés" },
  { value: "200+", label: "Campagnes Réalisées" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Outfit' }}>
              GS2E <span className="text-gradient-green-orange">Sensibilisation</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="default" size="sm">
                Tableau de bord <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Campagne de sensibilisation GS2E" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        <div className="relative container mx-auto px-4 py-32 md:py-44">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/90">Plateforme Digitale GS2E</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-6" style={{ fontFamily: 'Outfit' }}>
              Gestion des{" "}
              <span className="text-accent">Campagnes</span> de{" "}
              <span className="text-primary">Sensibilisation</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl">
              Digitalisez vos campagnes terrain, gérez vos participants et suivez vos KPI en temps réel grâce à notre plateforme intégrée.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/dashboard">
                <Button size="lg" className="font-semibold text-base px-8">
                  Accéder au Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-gradient-green-orange" style={{ fontFamily: 'Outfit' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Outfit' }}>
              Fonctionnalités <span className="text-gradient-green-orange">Clés</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Une solution complète pour la gestion de vos campagnes de sensibilisation</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 rounded-xl bg-card border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Outfit' }}>{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg gradient-green-orange flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold" style={{ fontFamily: 'Outfit' }}>GS2E Sensibilisation</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 GS2E — Gestion des Sensibilisations. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
