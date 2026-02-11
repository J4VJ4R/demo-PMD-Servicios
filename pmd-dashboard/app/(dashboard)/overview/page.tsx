import prisma from "@/lib/prisma";
import { OverviewContent } from "@/components/dashboard/overview-content";

export default async function OverviewPage() {
  // 1. Fetch KPI Data
  const totalProjects = await prisma.project.count();
  const totalActivities = await prisma.activity.count();
  
  const pendingActivities = await prisma.activity.count({
    where: { status: "PENDING" },
  });
  
  const inReviewActivities = await prisma.activity.count({
    where: { status: "IN_REVIEW" },
  });
  
  const approvedActivities = await prisma.activity.count({
    where: { status: "APPROVED" },
  });

  // 2. Fetch Recent Activities
  const recentActivities = await prisma.activity.findMany({
    take: 5,
    include: {
      project: true,
      assignedTo: true,
      documents: {
        orderBy: { uploadedAt: 'desc' },
        take: 1
      }
    },
    orderBy: { updatedAt: 'desc' },
  });

  // 3. Prepare Chart Data
  const chartData = [
    { name: 'Pendiente', value: pendingActivities },
    { name: 'En Revisión', value: inReviewActivities },
    { name: 'Aprobada', value: approvedActivities },
  ];

  const kpiData = {
    totalProjects,
    pendingActivities,
    inReviewActivities,
    approvedActivities
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">Resumen del Panel</h2>
      <OverviewContent 
        kpiData={kpiData} 
        chartData={chartData} 
        recentActivities={recentActivities} 
      />
    </div>
  );
}
