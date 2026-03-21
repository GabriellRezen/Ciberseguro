import { Home, Phone, BookOpen, MessageCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import pspLogo from "@/assets/psp.jpg";

const navItems = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/aprender", icon: BookOpen, label: "Aprender" },
  { path: "/analisar", icon: MessageCircle, label: "Analisar" },
  { path: "/contactos", icon: Phone, label: "Contactos" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="container h-16 flex items-center justify-between">

          {/* Logo PSP */}
          <button onClick={() => navigate("/")} className="flex items-center">
            <img
                src={pspLogo}
                alt="Polícia de Segurança Pública"
                className="h-16 w-auto object-contain"
            />
          </button>

          {/* Links centrados */}
          <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                  <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {isActive && (
                        <motion.div
                            layoutId="nav-indicator"
                            className="absolute inset-0 rounded-lg bg-secondary/10"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                    )}
                    <span className={`relative z-10 flex items-center gap-1.5 ${
                        isActive ? "text-secondary" : "text-muted-foreground hover:text-foreground"
                    }`}>
                  <item.icon size={16} />
                      {item.label}
                </span>
                  </button>
              );
            })}
          </nav>

          {/* Espaço direito para balancear */}
          <div className="w-[140px]" />

        </div>
      </header>
  );
};

export default Navbar;
