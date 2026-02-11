import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Clean up existing data
  await prisma.document.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany(); // Start fresh with users

  const passwordAdmin = await hash('admin', 10);
  const password123 = await hash('123', 10);

  // 1. Create Users (Auditor, Consultant, Client)
  // Password for all: "123456"
  const auditor = await prisma.user.upsert({
    where: { email: 'admin@pmd.com' },
    update: {
      password: passwordAdmin,
    },
    create: {
      email: 'admin@pmd.com',
      name: 'Administrador PMD',
      role: 'ADMIN_PMD',
      password: passwordAdmin,
    },
  });

  const consultant = await prisma.user.upsert({
    where: { email: 'consultor@pmd.com' },
    update: {
      password: password123,
    },
    create: {
      email: 'consultor@pmd.com',
      name: 'Consultor PMD',
      role: 'CONSULTANT',
      password: password123,
    },
  });

  const client = await prisma.user.upsert({
    where: { email: 'cliente@empresa.com' },
    update: {
      password: password123,
    },
    create: {
      email: 'cliente@empresa.com',
      name: 'Cliente Empresa',
      role: 'CLIENT_VIEWER',
      password: password123,
    },
  });

  console.log('Created users:', { auditor, consultant, client });

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
      status: 'APPROVED',
      assignedToId: auditor.id,
    },
    {
      title: 'Evaluación de Riesgos',
      status: 'IN_REVIEW',
      assignedToId: consultant.id,
    },
    {
      title: 'Redacción de Política de Seguridad',
      status: 'PENDING',
      assignedToId: consultant.id,
    },
    {
      title: 'Capacitación del Personal',
      status: 'PENDING',
      assignedToId: consultant.id,
    },
    {
      title: 'Revisión Final',
      status: 'PENDING',
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
