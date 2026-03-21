import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const variants = {
  default: {
    card: "bg-card border border-border hover:border-primary/40",
    icon: "bg-primary/10",
    iconColor: "text-primary",
    title: "text-foreground",
    desc: "text-muted-foreground",
    arrow: "text-primary",
  },
  accent: {
    card: "bg-secondary border border-secondary hover:border-secondary/80",
    icon: "bg-white/20",
    iconColor: "text-white",
    title: "text-white",
    desc: "text-white/70",
    arrow: "text-white",
  },
  warning: {
    card: "bg-card border border-orange-200 hover:border-orange-400",
    icon: "bg-orange-100",
    iconColor: "text-orange-500",
    title: "text-foreground",
    desc: "text-muted-foreground",
    arrow: "text-orange-500",
  },
};

const ActionCard = ({ icon: Icon, title, description, to, variant = "default", delay = 0 }) => {
  const v = variants[variant];

  return (
    <motion.a
      href={to}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`block p-6 rounded-xl card-shadow transition-colors cursor-pointer ${v.card}`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${v.icon}`}>
        <Icon size={20} className={v.iconColor} />
      </div>
      <h3 className={`font-semibold text-base mb-2 ${v.title}`}>{title}</h3>
      <p className={`text-sm leading-relaxed mb-4 ${v.desc}`}>{description}</p>
      <div className={`flex items-center gap-1 text-sm font-medium ${v.arrow}`}>
        Saber mais <ArrowRight size={14} />
      </div>
    </motion.a>
  );
};

export default ActionCard;