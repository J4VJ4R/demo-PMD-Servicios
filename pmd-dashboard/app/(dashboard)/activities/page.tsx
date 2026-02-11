import prisma from "@/lib/prisma";
import { ActivityList } from "@/components/activities/activity-list";
import { getCurrentUser } from "@/app/auth-actions";

export default async function ActivitiesPage() {
  const user = await getCurrentUser();
  const activities = await prisma.activity.findMany({
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

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">Actividades</h2>
      <ActivityList activities={activities} userRole={user?.role || 'CLIENT_VIEWER'} />
    </div>
  );
}
