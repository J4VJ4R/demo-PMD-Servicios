import Link from "next/link";
import { 
  LayoutDashboard, 
  Folder, 
  Activity, 
  FileText, 
  Settings, 
  ShieldCheck 
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Resumen",
    href: "/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Proyectos",
    href: "/projects",
    icon: Folder,
  },
  {
    title: "Actividades",
    href: "/activities",
    icon: Activity,
  },
  {
    title: "Documentos",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Configuración",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-slate-900 text-white">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <ShieldCheck className="mr-2 h-6 w-6 text-blue-400" />
        <span className="text-lg font-bold">PMD Servicios</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors",
              "text-slate-300"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Consultant PMD</p>
            <p className="text-xs text-slate-400">consultant@pmd.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
