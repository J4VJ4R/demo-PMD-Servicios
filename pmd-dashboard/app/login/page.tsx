'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/app/auth-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await login(formData);
    
    if (result.success) {
      toast.success("Inicio de sesión exitoso");
      router.push("/overview");
    } else {
      toast.error(result.error || "Error al iniciar sesión");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Branding/Image */}
      <div className="hidden lg:flex flex-col bg-black text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black opacity-50" />
        
        {/* Content Group */}
        <div className="flex-1 flex flex-col justify-center items-start z-10 space-y-10">
          {/* Logo */}
          <div className="inline-block rounded-2xl bg-white p-[14px] border-[3px] border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.2)]">
             <div className="relative h-20 w-64">
                <Image src="/img/logo.jpeg" alt="PMD Logo" fill className="object-contain" priority />
             </div>
          </div>
          
          {/* Text */}
          <div className="space-y-6 max-w-xl text-left">
            <h1 className="text-5xl font-bold leading-tight text-white tracking-tight">
              Gestión Integral de <br/>
              <span className="text-[#D4AF37]">Seguridad y Salud</span>
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              Plataforma centralizada para consultores y clientes. Supervise auditorías, gestione documentos y mantenga el cumplimiento normativo en un solo lugar.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 z-10 mt-auto">
          &copy; 2026 PMD Servicios. Todos los derechos reservados.
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Bienvenido de nuevo</h2>
            <p className="mt-2 text-muted-foreground">Ingrese sus credenciales para acceder a su cuenta.</p>
          </div>

          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="nombre@empresa.com" 
                className="h-11"
                required 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  className="h-11 pr-10"
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button className="w-full h-11 text-base" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Iniciar Sesión
            </Button>
          </form>

          <div className="bg-card p-4 rounded-lg border border-border">
            <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Credenciales Demo:</p>
            <div className="grid grid-cols-1 gap-2 text-xs text-foreground/90">
              <div className="flex justify-between">
                <span>Administrador:</span>
                <span className="font-mono bg-primary text-primary-foreground px-1 rounded">admin@pmd.com / admin</span>
              </div>
              <div className="flex justify-between">
                <span>Consultor:</span>
                <span className="font-mono bg-primary text-primary-foreground px-1 rounded">consultor@pmd.com / 123</span>
              </div>
              <div className="flex justify-between">
                <span>Cliente:</span>
                <span className="font-mono bg-primary text-primary-foreground px-1 rounded">cliente@empresa.com / 123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
