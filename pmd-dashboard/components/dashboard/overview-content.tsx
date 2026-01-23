'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ActivityActionCell } from "@/components/dashboard/activity-action-cell";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { DocumentPreview } from "@/components/documents/document-preview";
import { toast } from "sonner";

interface OverviewContentProps {
  kpiData: {
    totalProjects: number;
    pendingActivities: number;
    inReviewActivities: number;
    approvedActivities: number;
  };
  chartData: any[];
  recentActivities: any[];
}

export function OverviewContent({ kpiData, chartData, recentActivities }: OverviewContentProps) {
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  const handlePreview = (activity: any) => {
    if (activity.documents && activity.documents.length > 0) {
      // Construct the document object structure expected by DocumentPreview
      const doc = {
        ...activity.documents[0],
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
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Proyectos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpiData.totalProjects}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actividades Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">{kpiData.pendingActivities}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Revisión</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{kpiData.inReviewActivities}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{kpiData.approvedActivities}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
            {/* Recent Activities Table */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Actividades Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Actividad</TableHead>
                      <TableHead>Proyecto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Asignado a</TableHead>
                      <TableHead>Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivities.map((activity) => (
                      <TableRow key={activity.id} className={selectedDoc?.activity?.title === activity.title ? "bg-slate-50" : ""}>
                        <TableCell className="font-medium">{activity.title}</TableCell>
                        <TableCell>{activity.project.name}</TableCell>
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
                          {activity.assignedTo?.name || 'Sin Asignar'}
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
                            <ActivityActionCell id={activity.id} status={activity.status} />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Status Chart */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Distribución de Estados</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart data={chartData} />
              </CardContent>
            </Card>
          </div>
        </div>
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
