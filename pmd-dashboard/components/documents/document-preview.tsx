import { X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentPreviewProps {
  document: {
    id: string;
    name: string;
    url: string;
    activity: {
      title: string;
      project: {
        name: string;
      }
    }
  } | null;
  onClose: () => void;
}

export function DocumentPreview({ document, onClose }: DocumentPreviewProps) {
  if (!document) return null;

  const isMock = document.url.startsWith('/mock-files/');

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-1/2 bg-white shadow-2xl border-l border-slate-200 transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{document.name}</h3>
            <p className="text-sm text-slate-500">
              {document.activity.project.name} - {document.activity.title}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-slate-50 p-6 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 h-full flex flex-col">
            {isMock ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="bg-blue-50 p-6 rounded-full">
                  <FileText className="h-16 w-16 text-blue-500" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-medium text-slate-900">Vista Previa Simulada</h4>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Este es un archivo de demostración ("{document.name}"). 
                    En un entorno de producción, aquí se mostraría el visor de PDF o la imagen real.
                  </p>
                </div>
                <div className="w-full max-w-2xl mt-8 p-8 border border-slate-100 rounded bg-slate-50 text-left space-y-4 font-mono text-sm text-slate-600">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
              </div>
            ) : (
              <iframe 
                src={document.url} 
                className="w-full h-full rounded-lg"
                title="Document Preview"
              />
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
          <Button asChild>
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              Descargar Archivo
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
