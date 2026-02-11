'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateActivityStatus } from "@/app/actions";
import { toast } from "sonner";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";

interface ActivityStatusActionsProps {
  id: string;
  status: string;
  userRole: string;
}

export function ActivityStatusActions({ id, status, userRole }: ActivityStatusActionsProps) {
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(newStatus: string) {
    setLoading(true);
    const result = await updateActivityStatus(id, newStatus);
    setLoading(false);
    
    if (result.success) {
      toast.success("Estado actualizado exitosamente");
    } else {
      toast.error("Error al actualizar estado");
    }
  }

  // Client Viewer: Read only
  if (userRole === 'CLIENT_VIEWER') {
    return null;
  }

  if (status === 'APPROVED') {
    return <span className="text-green-600 font-medium flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Aprobada</span>;
  }

  return (
    <div className="flex gap-2">
      {/* Consultant and Admin can mark as In Review */}
      {status === 'PENDING' && (userRole === 'CONSULTANT' || userRole === 'ADMIN_PMD') && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleStatusChange('IN_REVIEW')}
          disabled={loading}
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          <ArrowRight className="mr-1 h-3 w-3" /> Revisar
        </Button>
      )}
      
      {/* Only Admin can Approve */}
      {status === 'IN_REVIEW' && userRole === 'ADMIN_PMD' && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleStatusChange('APPROVED')}
          disabled={loading}
          className="text-green-600 border-green-200 hover:bg-green-50"
        >
          <CheckCircle className="mr-1 h-3 w-3" /> Aprobar
        </Button>
      )}

      {/* If Consultant sees IN_REVIEW, show status but no action */}
      {status === 'IN_REVIEW' && userRole === 'CONSULTANT' && (
        <span className="text-blue-600 font-medium flex items-center text-sm">
          <Clock className="w-3 h-3 mr-1" /> En Revisión
        </span>
      )}
    </div>
  );
}
