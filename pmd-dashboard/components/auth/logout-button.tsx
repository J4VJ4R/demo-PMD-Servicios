'use client'

import { LogOut } from "lucide-react";
import { logout } from "@/app/auth-actions";

export function LogoutButton() {
  return (
    <button 
      onClick={() => logout()}
      className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors mt-2"
    >
      <LogOut className="mr-3 h-5 w-5" />
      Cerrar Sesión
    </button>
  );
}
