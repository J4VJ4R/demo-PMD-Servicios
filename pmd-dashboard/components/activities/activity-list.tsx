'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ActivityStatusActions } from "@/components/activities/activity-status-actions";
import { DocumentPreview } from "@/components/documents/document-preview";
import { toast } from "sonner";

interface ActivityListProps {
  activities: any[];
  userRole: string;
}

export function ActivityList({ activities, userRole }: ActivityListProps) {
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  const handlePreview = (activity: any) => {
    if (activity.documents && activity.documents.length > 0) {
      // Construct the document object structure expected by DocumentPreview
      const doc = {
        ...activity.documents[0], // Get the latest document
        activity: {
          title: activity.title,
          project: activity.project
        }
      };
      setSelectedDoc(doc);
    } else {
      toast.info("No hay documentos adjuntos a esta actividad");
    }
  };

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${selectedDoc ? 'w-1/2 pr-4' : 'w-full'}`}>
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Actividad</TableHead>
                  <TableHead>Proyecto</TableHead>
                  <TableHead>Asignado a</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id} className={selectedDoc?.activity?.title === activity.title ? "bg-slate-50" : ""}>
                    <TableCell className="font-medium">{activity.title}</TableCell>
                    <TableCell>{activity.project.name}</TableCell>
                    <TableCell>{activity.assignedTo?.name || 'Sin Asignar'}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          activity.status === 'APPROVED' ? 'default' : 
                          activity.status === 'IN_REVIEW' ? 'secondary' : 'outline'
                        }
                        className={
                          activity.status === 'APPROVED' ? 'bg-green-500 hover:bg-green-600' :
                          activity.status === 'IN_REVIEW' ? 'bg-blue-500 text-white hover:bg-blue-600' :
                          'text-amber-600 border-amber-200'
                        }
                      >
                        {activity.status === 'APPROVED' ? 'APROBADA' : 
                         activity.status === 'IN_REVIEW' ? 'EN REVISIÓN' : 'PENDIENTE'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {activity.documents && activity.documents.length > 0 && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handlePreview(activity)}
                            title="Ver Documento"
                            className="text-slate-500 hover:text-blue-600"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <ActivityStatusActions id={activity.id} status={activity.status} userRole={userRole} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {activities.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      No hay actividades registradas.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {selectedDoc && (
        <DocumentPreview 
          document={selectedDoc} 
          onClose={() => setSelectedDoc(null)} 
        />
      )}
    </div>
  );
}
