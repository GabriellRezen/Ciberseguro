import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  AlertTriangle,
  Shield,
  ArrowRight,
  Users,
  Eye,
  MessageSquareWarning,
} from "lucide-react";
import ActionCard from "@/components/ActionCard";
//import heroIllustration from "@/assets/hero-illustration.png";

const stats = [
  { value: "37%", label: "dos jovens portugueses já sofreram ciberbullying" },
  { value: "1 em 3", label: "não conta a ninguém o que está a passar" },
  { value: "24/7", label: "apoio disponível através da PSP" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(211_100%_65%/0.15),transparent_60%)]" />
        <div className="container relative py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
                <Shield size={14} className="text-accent" />
                <span className="text-xs font-medium text-primary-foreground/80">
                  Plataforma oficial PSP
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground leading-tight mb-4">
                Sabe identificar e agir perante o{" "}
                <span className="text-accent">ciberbullying</span>?
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/70 leading-relaxed mb-8 max-w-lg">
                Estamos aqui para ajudar. Aprenda a reconhecer situações de
                ciberbullying, analise casos e encontre o apoio de que precisa.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="/aprender"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-colors"
                >
                  Saiba mais
                  <ArrowRight size={16} />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex justify-center"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-5 card-shadow border border-border text-center"
            >
              <div className="text-2xl font-extrabold text-secondary mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Action Cards */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Como podemos ajudar?
          </h2>
          <p className="text-muted-foreground">
            Escolha a opção que melhor se aplica à sua situação
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <ActionCard
            icon={BookOpen}
            title="Aprender"
            description="Descubra o que é o ciberbullying, como identificar e como se proteger."
            to="/aprender"
            variant="default"
            delay={0.5}
          />
          <ActionCard
            icon={Search}
            title="Analisar situação"
            description="Envie uma mensagem ou descreva o que aconteceu. Vamos ajudar a classificar."
            to="/analisar"
            variant="accent"
            delay={0.6}
          />
          <ActionCard
            icon={AlertTriangle}
            title="Preciso de ajuda"
            description="Aceda a apoio imediato, contacte a PSP ou fale com o nosso assistente."
            to="/apoio"
            variant="warning"
            delay={0.7}
          />
        </div>
      </section>

      {/* Types Preview */}
      <section className="bg-card border-y border-border">
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Tipos de ciberbullying
            </h2>
            <p className="text-muted-foreground">
              Conheça as formas mais comuns de agressão online
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                icon: MessageSquareWarning,
                title: "Insultos e humilhação",
                desc: "Mensagens ofensivas, comentários depreciativos ou ridicularização pública.",
              },
              {
                icon: AlertTriangle,
                title: "Ameaças e intimidação",
                desc: "Mensagens ameaçadoras, chantagem emocional ou coerção online.",
              },
              {
                icon: Eye,
                title: "Exposição e partilha",
                desc: "Divulgação de fotos, vídeos ou informações pessoais sem consentimento.",
              },
            ].map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-background card-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <type.icon size={20} className="text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {type.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {type.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hero-gradient rounded-2xl p-8 md:p-12 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-5">
            <Users size={28} className="text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Não estás sozinho/a
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
            Se estás a passar por uma situação difícil, estamos aqui para
            ajudar. Fala connosco de forma segura e confidencial.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.a
              href="/assistente"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-primary font-semibold text-sm"
            >
              Falar com assistente
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="/apoio"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-foreground/10 text-primary-foreground font-semibold text-sm border border-primary-foreground/20"
            >
              Ver apoio disponível
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield size={18} className="text-secondary" />
            <span className="text-sm font-semibold text-foreground">
              CiberSeguro
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Plataforma de prevenção ao ciberbullying · Polícia de Segurança
            Pública
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
