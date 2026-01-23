'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { uploadDocument } from "@/app/actions";
import { toast } from "sonner";
import { Upload, FileText, CheckCircle } from "lucide-react";

interface UploadZoneProps {
  activities: { id: string; title: string }[];
}

export function UploadZone({ activities }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [activityId, setActivityId] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !activityId) {
      toast.error("Por favor seleccione un archivo y una actividad");
      return;
    }

    setIsUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate network delay and call server action
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = await uploadDocument(activityId, file.name);
    
    clearInterval(interval);
    setProgress(100);
    setIsUploading(false);

    if (result.success) {
      toast.success("Documento subido exitosamente");
      setFile(null);
      setProgress(0);
    } else {
      toast.error("Error al subir el documento");
    }
  };

  return (
    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 bg-slate-50 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex justify-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium">Subir Documento</h3>
        
        <div className="space-y-4 text-left">
          <div className="space-y-2">
            <Label>Seleccionar Actividad</Label>
            <Select onValueChange={setActivityId} value={activityId}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una actividad..." />
              </SelectTrigger>
              <SelectContent>
                {activities.map((activity) => (
                  <SelectItem key={activity.id} value={activity.id}>
                    {activity.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Seleccionar Archivo</Label>
            <Input type="file" onChange={handleFileChange} disabled={isUploading} />
          </div>

          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Subiendo...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button 
            className="w-full" 
            onClick={handleUpload} 
            disabled={!file || !activityId || isUploading}
          >
            {isUploading ? "Subiendo..." : "Subir Documento"}
          </Button>
        </div>
      </div>
    </div>
  );
}
