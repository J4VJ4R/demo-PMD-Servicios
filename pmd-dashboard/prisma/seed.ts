import { PrismaClient, UserRole, ActivityStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Clean up existing data
  await prisma.document.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.project.deleteMany();
  // We keep users or upsert them

  // 1. Create Users (Auditor & Consultant)
  const auditor = await prisma.user.upsert({
    where: { email: 'auditor@pmd.com' },
    update: {},
    create: {
      email: 'auditor@pmd.com',
      name: 'Auditor PMD',
      role: UserRole.ADMIN_PMD,
    },
  });

  const consultant = await prisma.user.upsert({
    where: { email: 'consultant@pmd.com' },
    update: {},
    create: {
      email: 'consultant@pmd.com',
      name: 'Consultor PMD',
      role: UserRole.CONSULTANT,
    },
  });

  console.log('Created users:', { auditor, consultant });

  // 2. Create Project
  const project = await prisma.project.create({
    data: {
      name: 'Implementación ISO 45001',
      clientName: 'Cliente Corporativo A',
      description: 'Proyecto para implementar estándares de seguridad y salud.',
    },
  });

  console.log('Created project:', project);

  // 3. Create 5 Activities with different statuses
  const activitiesData = [
    {
      title: 'Auditoría Inicial',
      status: ActivityStatus.APPROVED,
      assignedToId: auditor.id,
    },
    {
      title: 'Evaluación de Riesgos',
      status: ActivityStatus.IN_REVIEW,
      assignedToId: consultant.id,
    },
    {
      title: 'Redacción de Política de Seguridad',
      status: ActivityStatus.PENDING,
      assignedToId: consultant.id,
    },
    {
      title: 'Capacitación del Personal',
      status: ActivityStatus.PENDING,
      assignedToId: consultant.id,
    },
    {
      title: 'Revisión Final',
      status: ActivityStatus.PENDING,
      assignedToId: auditor.id,
    },
  ];

  for (const activity of activitiesData) {
    await prisma.activity.create({
      data: {
        title: activity.title,
        status: activity.status,
        projectId: project.id,
        assignedToId: activity.assignedToId,
      },
    });
  }

  console.log('Created 5 activities.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
