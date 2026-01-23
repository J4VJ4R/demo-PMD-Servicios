"use client"

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { approveActivity } from "@/app/actions";
import { useState } from "react";
import { ActivityStatus } from "@prisma/client";

interface ActivityActionCellProps {
  id: string;
  status: ActivityStatus;
}

export function ActivityActionCell({ id, status }: ActivityActionCellProps) {
  const [loading, setLoading] = useState(false);

  if (status === "APPROVED") {
    return <span className="text-green-600 font-medium">Aprobado</span>;
  }

  const handleApprove = async () => {
    setLoading(true);
    await approveActivity(id);
    setLoading(false);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50"
      onClick={handleApprove}
      disabled={loading}
    >
      <CheckCircle className="mr-2 h-4 w-4" />
      {loading ? "..." : "Aprobar"}
    </Button>
  );
}
