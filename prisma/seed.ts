import { PrismaPg } from '@prisma/adapter-pg';
import { ContentType, PrismaClient, ReportType } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const contentCategory = await prisma.contentCategory.upsert({
    where: { slug: 'identificar-ciberbullying' },
    update: {},
    create: {
      name: 'Identificar Ciberbullying',
      slug: 'identificar-ciberbullying',
      description: 'Conteúdos para ajudar a reconhecer sinais de ciberbullying',
    },
  });

  await prisma.content.upsert({
    where: { slug: 'o-que-e-ciberbullying' },
    update: {},
    create: {
      title: 'O que é o ciberbullying?',
      slug: 'o-que-e-ciberbullying',
      summary:
        'Aprende a identificar comportamentos de bullying no meio digital.',
      body: 'O ciberbullying consiste em comportamentos repetidos de humilhação, intimidação, ameaça ou exposição através de meios digitais.',
      type: ContentType.article,
      categoryId: contentCategory.id,
    },
  });

  await prisma.content.upsert({
    where: { slug: 'como-preservar-provas-digitais' },
    update: {},
    create: {
      title: 'Como preservar provas digitais',
      slug: 'como-preservar-provas-digitais',
      summary: 'Passos simples para guardar evidências de uma situação online.',
      body: 'Guarda capturas de ecrã, links, nomes de utilizador, datas e contexto. Evita apagar conversas relevantes antes de preservar a informação.',
      type: ContentType.guide,
      categoryId: contentCategory.id,
    },
  });

  await prisma.pspCenter.createMany({
    data: [
      {
        name: 'Esquadra PSP Lisboa Centro',
        address: 'Rua Exemplo 123',
        city: 'Lisboa',
        district: 'Lisboa',
        latitude: 38.7223,
        longitude: -9.1393,
        phone: '217000000',
        email: 'lisboa.centro@psp.pt',
        openingHours: '24h',
        supportsCybercrime: true,
        notes: 'Atendimento com encaminhamento para apoio em crime digital.',
      },
      {
        name: 'Esquadra PSP Amadora',
        address: 'Avenida Exemplo 45',
        city: 'Amadora',
        district: 'Lisboa',
        latitude: 38.7597,
        longitude: -9.2395,
        phone: '214000000',
        email: 'amadora@psp.pt',
        openingHours: '24h',
        supportsCybercrime: true,
        notes: 'Apoio presencial e encaminhamento.',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.supportResource.createMany({
    data: [
      {
        title: 'Guia de segurança digital',
        slug: 'guia-seguranca-digital',
        description:
          'Boas práticas para proteger contas e preservar privacidade.',
        type: 'guide',
        content:
          'Usa palavras-passe fortes, ativa autenticação de dois fatores e evita partilhar dados pessoais em excesso.',
      },
      {
        title: 'Como denunciar numa plataforma social',
        slug: 'como-denunciar-redes-sociais',
        description: 'Passos gerais para reportar conteúdo abusivo.',
        type: 'guide',
        content:
          'Procura a opção de reportar, seleciona o motivo correto e guarda o comprovativo da denúncia.',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.faqItem.createMany({
    data: [
      {
        question: 'Como sei se isto é ciberbullying?',
        answer:
          'Se houver insultos, humilhação, ameaça, perseguição ou exposição repetida no meio digital, pode ser um caso de ciberbullying.',
        category: 'identificação',
        order: 1,
      },
      {
        question: 'Devo responder às mensagens ofensivas?',
        answer:
          'Em geral, evita responder de forma impulsiva. Preserva provas, bloqueia se necessário e procura apoio.',
        category: 'ação',
        order: 2,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.quickAction.createMany({
    data: [
      {
        label: 'Estou a ser ameaçado',
        slug: 'ameacado',
        description: 'Situação de ameaça direta ou intimidação',
        priority: 1,
        recommendedFlow: 'urgent_support',
      },
      {
        label: 'Partilharam fotos minhas',
        slug: 'partilha-fotos',
        description: 'Exposição de imagem sem consentimento',
        priority: 2,
        recommendedFlow: 'evidence_and_report',
      },
      {
        label: 'Criaram uma conta falsa',
        slug: 'conta-falsa',
        description: 'Impersonação ou perfil falso',
        priority: 3,
        recommendedFlow: 'report_and_support',
      },
    ],
    skipDuplicates: true,
  });

  const analysis = await prisma.analysisRequest.create({
    data: {
      inputType: 'text',
      originalText:
        'Criaram uma conta falsa com a minha foto e estão a gozar comigo.',
      status: 'processed',
      severity: 'medium',
      classification: 'possible_cyberbullying',
      aiSummary:
        'Foram identificados indícios de humilhação pública e possível usurpação de identidade.',
      recommendedActions: [
        'Guardar capturas de ecrã',
        'Reportar a conta na plataforma',
        'Procurar apoio de adulto ou autoridade',
      ],
    },
  });

  await prisma.report.create({
    data: {
      analysisRequestId: analysis.id,
      type: ReportType.impersonation,
      description:
        'Possível usurpação de identidade com uso indevido de imagem.',
      isAnonymous: true,
      status: 'draft',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
