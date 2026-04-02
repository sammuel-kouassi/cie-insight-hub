import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    // Static login — no backend
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-card border rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: "Outfit" }}>
              <span className="text-primary">DLF</span>
              <span className="text-muted-foreground mx-1">|</span>
              <span className="text-accent">Sensibilisation</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2">Connectez-vous pour accéder à la plateforme</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Mot de passe</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full font-semibold" size="lg">
              <LogIn className="w-4 h-4 mr-2" /> Se connecter
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            © 2025 DLF — Sensibilisation. Tous droits réservés.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
