import { getCurrentUser } from "@/app/auth-actions";
import { helpArticles } from "@/lib/help-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, ArrowRight, BookOpen, Video } from "lucide-react";

export default async function HelpCenterPage() {
  const user = await getCurrentUser();
  
  if (!user) return null;

  // Filter articles based on user role
  const allowedArticles = helpArticles.filter(article => 
    article.roles.includes(user.role)
  );

  return (
    <div className="flex flex-col space-y-8 p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Centro de Ayuda y Soporte
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl">
          Encuentre guías, tutoriales y respuestas a sus preguntas sobre la plataforma PMD.
        </p>
        
        {/* Search Bar */}
        <div className="relative w-full max-w-xl mt-4">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          <Input 
            placeholder="Buscar ayuda..." 
            className="pl-10 h-12 bg-white border-zinc-200 focus:border-[#D4AF37] text-slate-900 shadow-sm"
          />
        </div>
      </div>

      {/* Featured Categories/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {allowedArticles.map((article) => {
          const Icon = article.icon || BookOpen;
          
          return (
            <Card key={article.slug} className="bg-zinc-900 border-zinc-800 hover:border-[#D4AF37] transition-all group overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-black border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-[#D4AF37]/50 transition-colors">
                  <Icon className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-white group-hover:text-[#D4AF37] transition-colors">
                    {article.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400 mt-2 line-clamp-2">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                  <span className="px-2 py-1 rounded-full bg-black border border-zinc-800">
                    {article.category}
                  </span>
                  {article.videoUrl && (
                    <span className="flex items-center text-[#D4AF37]">
                      <Video className="h-3 w-3 mr-1" /> Video
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/help/${article.slug}`} className="w-full">
                  <Button variant="ghost" className="w-full justify-between hover:bg-zinc-800 hover:text-[#D4AF37] text-white group-hover:translate-x-1 transition-all">
                    Leer más
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Contact Support Section */}
      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">¿No encuentra lo que busca?</h2>
        <p className="text-gray-400 mb-6">Nuestro equipo de soporte está disponible para ayudarle con cualquier consulta técnica.</p>
        <div className="flex justify-center gap-4">
          <Button className="bg-[#D4AF37] text-black hover:bg-[#B59530]">
            Contactar Soporte
          </Button>
          <Button variant="outline" className="bg-transparent border-zinc-700 text-white hover:bg-zinc-800 hover:text-white">
            Enviar Ticket
          </Button>
        </div>
      </div>
    </div>
  );
}
