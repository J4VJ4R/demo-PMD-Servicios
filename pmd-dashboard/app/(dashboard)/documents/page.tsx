import prisma from "@/lib/prisma";
import { DocumentList } from "@/components/documents/document-list";

export default async function DocumentsPage() {
  const documents = await prisma.document.findMany({
    include: {
      activity: {
        include: {
          project: true
        }
      }
    },
    orderBy: { uploadedAt: 'desc' },
  });

  // Convert dates to simple objects/strings if needed, but Next.js Server Components pass Date objects fine to Client Components in latest versions.
  // However, explicit mapping is safer for "Plain Object" warnings if they occur.
  // For now we pass directly.

  const activities = await prisma.activity.findMany({
    select: { id: true, title: true },
    orderBy: { title: 'asc' }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">Documentos</h2>
      <DocumentList documents={documents} activities={activities} />
    </div>
  );
}
