import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Folder, 
  Activity, 
  FileText, 
  Settings, 
  ShieldCheck,
  Users,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/app/auth-actions";
import { LogoutButton } from "@/components/auth/logout-button";

export async function Sidebar() {
  const user = await getCurrentUser();
  
  const sidebarItems = [
    {
      title: "Resumen",
      href: "/overview",
      icon: LayoutDashboard,
      roles: ['ADMIN_PMD', 'CONSULTANT', 'CLIENT_VIEWER']
    },
    {
      title: "Proyectos",
      href: "/projects",
      icon: Folder,
      roles: ['ADMIN_PMD', 'CONSULTANT', 'CLIENT_VIEWER']
    },
    {
      title: "Actividades",
      href: "/activities",
      icon: Activity,
      roles: ['ADMIN_PMD', 'CONSULTANT', 'CLIENT_VIEWER']
    },
    {
      title: "Documentos",
      href: "/documents",
      icon: FileText,
      roles: ['ADMIN_PMD', 'CONSULTANT', 'CLIENT_VIEWER']
    },
    {
      title: "Usuarios",
      href: "/users",
      icon: Users,
      roles: ['ADMIN_PMD']
    },
    {
      title: "Configuración",
      href: "/settings",
      icon: Settings,
      roles: ['ADMIN_PMD', 'CONSULTANT']
    },
    {
      title: "Ayuda y Soporte",
      href: "/help",
      icon: HelpCircle,
      roles: ['ADMIN_PMD', 'CONSULTANT', 'CLIENT_VIEWER']
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r border-zinc-800 bg-black text-white">
      <div className="flex flex-col items-center border-b border-zinc-800 py-6 px-4 bg-black">
        <div className="rounded-xl bg-white p-[14px] border-2 border-[#D4AF37] shadow-sm w-full max-w-[200px] flex justify-center items-center">
          <div className="relative h-10 w-full">
            <Image src="/img/logo.jpeg" alt="PMD Logo" fill className="object-contain" priority />
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item) => {
          if (user && !item.roles.includes(user.role)) return null;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "text-gray-400 hover:bg-zinc-900 hover:text-[#D4AF37]"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
        <div className="pt-4 mt-4 border-t border-zinc-800">
           <LogoutButton />
        </div>
      </nav>
      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center">
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name || 'Usuario'}</p>
            <p className="text-xs text-gray-500 truncate" title={user?.email}>{user?.email || 'No conectado'}</p>
            <p className="text-xs text-[#D4AF37] mt-1">
              {user?.role === 'ADMIN_PMD' ? 'Administrador' : 
               user?.role === 'CONSULTANT' ? 'Consultor' : 'Cliente'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
