import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Globe,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";

const supportEntities = [
  {
    name: "Linha SOS Criança",
    description: "Apoio a crianças e jovens em situação de risco",
    phone: "116 111",
    website: "www.iac.pt",
  },
  {
    name: "Internet Segura",
    description: "Linha de denúncia e apoio sobre segurança online",
    phone: "800 219 090",
    website: "www.internetsegura.pt",
  },
  {
    name: "APAV - Vítimas de Crime",
    description: "Apoio a vítimas de crime, incluindo crimes online",
    phone: "116 006",
    website: "www.apav.pt",
  },
];

const checklist = [
  "Capturas de ecrã de todas as mensagens, publicações ou comentários ofensivos",
  "Datas e horas em que ocorreram os incidentes",
  "Informação sobre o agressor (nome, perfil, contacto, se disponível)",
  "Descrição detalhada do que aconteceu e como se sente",
];

const QuickCard = ({ icon: Icon, title, description, primary, secondary }) => (
  <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
    <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
      <Icon size={20} className="text-secondary" />
    </div>

    <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
      {description}
    </p>

    <div className="space-y-2">
      {primary && (
        <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors">
          {primary.icon && <primary.icon size={16} />}
          {primary.label}
        </button>
      )}

      {secondary && (
        <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-foreground text-sm font-semibold hover:bg-muted transition-colors">
          {secondary.icon && <secondary.icon size={16} />}
          {secondary.label}
        </button>
      )}
    </div>
  </div>
);

const InfoItem = ({ icon: Icon, label, value, helper }) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
      <Icon size={18} className="text-secondary" />
    </div>
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground mt-1">{value}</p>
      {helper && <p className="text-xs text-muted-foreground mt-1">{helper}</p>}
    </div>
  </div>
);

const ApoioPage = () => {
  return (
    <div className="min-h-screen pt-4 md:pt-20">
      <div className="container py-8 max-w-5xl mx-auto px-4">
        <PageHeader
          icon={Phone}
          title="Apoio e Contactos"
          subtitle="Não está sozinho. Escolha o canal de apoio mais adequado à sua situação."
        />

        <div className="space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg p-6 md:p-7"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                <AlertTriangle size={22} />
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Situação urgente?</h2>
                <p className="text-sm md:text-base text-white/90 leading-relaxed mb-5">
                  Se está em perigo imediato ou a situação é grave, contacte
                  imediatamente os serviços de emergência ou a linha direta da
                  PSP.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:112"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-red-600 font-semibold text-sm hover:bg-white/95 transition-colors"
                  >
                    <Phone size={16} />
                    Ligar 112
                  </a>

                  <a
                    href="tel:+351217654242"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    <Phone size={16} />
                    PSP: 217 654 242
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <QuickCard
              icon={MessageCircle}
              title="Falar com alguém"
              description="Converse com o nosso assistente virtual ou contacte-nos diretamente."
              primary={{ icon: MessageCircle, label: "Assistente Virtual" }}
              secondary={{ icon: Mail, label: "Email PSP" }}
            />

            <QuickCard
              icon={Phone}
              title="Ajuda urgente"
              description="Contactos diretos para situações que requerem atenção imediata."
              primary={{ icon: Phone, label: "Emergência 112" }}
              secondary={{ icon: Phone, label: "Linha Direta PSP" }}
            />

            <QuickCard
              icon={MapPin}
              title="Esquadras PSP"
              description="Encontre a esquadra mais próxima para atendimento presencial."
              primary={{ icon: MapPin, label: "Ver no mapa" }}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-7">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#0A2A43] flex items-center justify-center shrink-0">
                <Shield size={24} className="text-white" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Polícia de Segurança Pública
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Departamento de Cibersegurança
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem
                icon={Phone}
                label="Telefone"
                value="+351 217 654 242"
                helper="Dias úteis, 9h–18h"
              />

              <InfoItem
                icon={Mail}
                label="Email"
                value="ciberbullying@psp.pt"
                helper="Resposta em 24–48h"
              />

              <InfoItem
                icon={Globe}
                label="Website"
                value="www.psp.pt/ciberseguranca"
                helper="Informação e recursos"
              />

              <InfoItem
                icon={Clock}
                label="Horário"
                value="Segunda a Sexta, 9h–18h"
                helper="Urgências 24/7"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Outras Entidades de Apoio
            </h2>

            <div className="space-y-4">
              {supportEntities.map((entity) => (
                <motion.div
                  key={entity.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl border border-border shadow-sm p-5"
                >
                  <h3 className="text-base font-bold text-foreground">
                    {entity.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    {entity.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-2 text-secondary font-medium">
                      <Phone size={14} />
                      {entity.phone}
                    </span>

                    <span className="inline-flex items-center gap-2 text-secondary font-medium">
                      <Globe size={14} />
                      {entity.website}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Ao contactar, tenha preparado:
            </h2>

            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <CheckCircle2
                    size={18}
                    className="text-blue-500 shrink-0 mt-0.5"
                  />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-wrap gap-3">
            <a
              href="/assistente"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/90 transition-colors"
            >
              Falar com assistente
              <ArrowRight size={16} />
            </a>

            <a
              href="/analisar"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors"
            >
              Analisar situação
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApoioPage;