import { motion } from "framer-motion";
import { BookOpen, MessageSquareWarning, AlertTriangle, Eye, ArrowRight, Shield, CheckCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ChatBubble from "@/components/ChatBubble";

const sections = [
  {
    id: "what",
    icon: Shield,
    title: "O que é o ciberbullying?",
    content: "O ciberbullying é uma forma de agressão que acontece através de meios digitais — redes sociais, mensagens, jogos online ou qualquer plataforma digital. Pode incluir insultos, ameaças, humilhação pública, ou partilha de informações pessoais sem consentimento.",
    highlight: "Ao contrário do bullying tradicional, o ciberbullying pode acontecer a qualquer hora e em qualquer lugar, tornando difícil escapar.",
  },
  {
    id: "types",
    icon: MessageSquareWarning,
    title: "Tipos de ciberbullying",
    types: [
      {
        icon: MessageSquareWarning,
        name: "Insultos e humilhação",
        desc: "Comentários ofensivos, ridicularização em grupos ou publicações humilhantes.",
        example: { bully: "És tão estúpido, ninguém gosta de ti 😂", victim: "Porque é que me dizes isso? O que é que eu te fiz?" },
      },
      {
        icon: AlertTriangle,
        name: "Ameaças e intimidação",
        desc: "Mensagens ameaçadoras, chantagem ou coerção para fazer algo contra a vontade.",
        example: { bully: "Se não fazes o que eu digo, vou espalhar aquela foto tua", victim: "Por favor não faças isso... eu não fiz nada de mal" },
      },
      {
        icon: Eye,
        name: "Exposição e partilha",
        desc: "Divulgação de fotos, vídeos ou informações privadas sem autorização.",
        example: { bully: "Olhem todos para esta foto 😂 @todos", victim: "Isso era privado! Tira isso agora!" },
      },
    ],
  },
];

const whatToDo = [
  { step: "1", title: "Não responder", desc: "Evita responder às provocações. Isso pode piorar a situação." },
  { step: "2", title: "Guardar provas", desc: "Faz capturas de ecrã de tudo. Estas provas são importantes." },
  { step: "3", title: "Bloquear e reportar", desc: "Bloqueia o agressor e reporta o conteúdo à plataforma." },
  { step: "4", title: "Falar com alguém", desc: "Conta a um adulto de confiança ou contacta a PSP." },
];

const LearnPage = () => {
  return (
    <div className="min-h-screen pt-4 md:pt-20">
      <div className="container py-8 max-w-3xl">
        <PageHeader
          icon={BookOpen}
          title="Aprender"
          subtitle="Tudo o que precisas saber sobre ciberbullying"
        />

        {/* What is cyberbullying */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="bg-card rounded-xl border border-border p-6 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} className="text-secondary" />
              <h2 className="text-lg font-bold text-foreground">{sections[0].title}</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{sections[0].content}</p>
            <div className="bg-secondary/5 border border-secondary/15 rounded-lg p-4">
              <p className="text-sm text-foreground font-medium">{sections[0].highlight}</p>
            </div>
          </div>
        </motion.section>

        {/* Types */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <MessageSquareWarning size={20} className="text-secondary" />
            Tipos de ciberbullying
          </h2>
          
          <div className="space-y-6">
            {sections[1].types.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 card-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <type.icon size={16} className="text-destructive" />
                  </div>
                  <h3 className="font-semibold text-foreground">{type.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{type.desc}</p>
                
                {/* Chat Example */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Exemplo real</p>
                  <ChatBubble message={type.example.bully} sender="bully" delay={0} />
                  <ChatBubble message={type.example.victim} sender="user" delay={0} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* What to do */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <CheckCircle size={20} className="text-secondary" />
            O que fazer?
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {whatToDo.map((item, i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-5 card-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="/frontend/src/pages/Analyze"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/90 transition-colors"
          >
            Analisar uma situação
            <ArrowRight size={16} />
          </a>
          <a
            href="/assistente"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
          >
            Falar com assistente
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnPage;
