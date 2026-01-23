'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateActivityStatus } from "@/app/actions";
import { ActivityStatus } from "@prisma/client";
import { toast } from "sonner";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";

interface ActivityStatusActionsProps {
  id: string;
  status: ActivityStatus;
}

export function ActivityStatusActions({ id, status }: ActivityStatusActionsProps) {
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(newStatus: ActivityStatus) {
    setLoading(true);
    const result = await updateActivityStatus(id, newStatus);
    setLoading(false);
    
    if (result.success) {
      toast.success("Estado actualizado exitosamente");
    } else {
      toast.error("Error al actualizar estado");
    }
  }

  if (status === 'APPROVED') {
    return <span className="text-green-600 font-medium flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Aprobada</span>;
  }

  return (
    <div className="flex gap-2">
      {status === 'PENDING' && (
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
      
      {status === 'IN_REVIEW' && (
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
    </div>
  );
}
