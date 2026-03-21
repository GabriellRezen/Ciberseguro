import {
  Home,
  Phone,
  BookOpen,
  MessageCircle,
  User,
  LogOut,
  LifeBuoy,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/content/AuthContent";
import pspLogo from "@/assets/psp.jpg";

const navItems = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/aprender", icon: BookOpen, label: "Aprender" },
  { path: "/analisar", icon: MessageCircle, label: "Analisar" },
  { path: "/apoio", icon: LifeBuoy, label: "Apoio" },
  { path: "/contactos", icon: Phone, label: "Contactos" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActivePath = (path) => location.pathname === path;

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
            const isActive = isActivePath(item.path);

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

                <span
                  className={`relative z-10 flex items-center gap-1.5 ${
                    isActive
                      ? "text-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Lado direito */}
        <div className="flex items-center justify-end gap-2 min-w-[160px]">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/perfil")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                  isActivePath("/perfil")
                    ? "bg-secondary/10 text-secondary"
                    : "hover:bg-muted text-foreground"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate">
                  {user?.name}
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition"
                title="Terminar sessão"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/analisar")}
              className="text-sm px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
