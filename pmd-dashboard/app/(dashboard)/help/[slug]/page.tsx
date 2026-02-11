import { getCurrentUser } from "@/app/auth-actions";
import { helpArticles } from "@/lib/help-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, PlayCircle, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';

export default async function HelpArticlePage({ params }: { params: { slug: string } }) {
  const user = await getCurrentUser();
  const article = helpArticles.find(a => a.slug === params.slug);

  if (!article) return notFound();

  // Role check
  if (user && !article.roles.includes(user.role)) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-8">
        <h1 className="text-2xl font-bold text-white mb-4">Acceso Restringido</h1>
        <p className="text-gray-400 mb-8">No tiene permisos para ver este contenido de ayuda.</p>
        <Link href="/help">
          <Button>Volver al Centro de Ayuda</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Back Navigation */}
      <Link href="/help" className="inline-flex items-center text-gray-400 hover:text-[#D4AF37] mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a Ayuda
      </Link>

      {/* Article Header */}
      <div className="mb-10">
        <div className="flex items-center space-x-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm border border-[#D4AF37]/20">
            {article.category}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">{article.title}</h1>
        <p className="text-xl text-gray-400">{article.description}</p>
      </div>

      {/* Video Placeholder (if exists) */}
      {article.videoUrl && (
        <div className="mb-10 rounded-2xl overflow-hidden border border-zinc-800 bg-black aspect-video flex items-center justify-center group relative cursor-pointer hover:border-[#D4AF37]/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="text-center z-10 p-6">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform text-black shadow-lg shadow-[#D4AF37]/20">
              <PlayCircle className="h-8 w-8 fill-black text-white" />
            </div>
            <h3 className="text-lg font-medium text-white">Ver Video Tutorial</h3>
            <p className="text-sm text-gray-400">Duración estimada: 3 min</p>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[#D4AF37] prose-strong:text-white prose-blockquote:border-l-[#D4AF37] prose-blockquote:bg-zinc-900/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
        {/* We're handling markdown rendering simply here. For production, a proper markdown parser is ideal.
            Since we're using simple strings in data.ts, we'll map lines or use a library if available. 
            For this demo, we'll assume the content is safe and render basic paragraphs.
         */}
         <div className="whitespace-pre-wrap font-sans">
            {article.content.split('\n').map((line, i) => {
                if (line.trim().startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>
                if (line.trim().startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{line.replace('### ', '')}</h3>
                if (line.trim().startsWith('- ')) return <li key={i} className="ml-4 list-disc text-gray-300 my-1">{line.replace('- ', '')}</li>
                if (line.trim().startsWith('1. ')) return <li key={i} className="ml-4 list-decimal text-gray-300 my-1">{line.replace(/^\d+\.\s/, '')}</li>
                if (line.trim().startsWith('> ')) return <blockquote key={i} className="border-l-4 border-[#D4AF37] pl-4 italic my-4 text-gray-400">{line.replace('> ', '')}</blockquote>
                return <p key={i} className="my-2 leading-relaxed">{line}</p>
            })}
         </div>
      </div>

      {/* Related Resources / Placeholder for Images */}
      <div className="mt-12 pt-8 border-t border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-4">Recursos Adicionales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center space-x-3 hover:border-[#D4AF37] transition-colors cursor-pointer">
            <FileText className="h-5 w-5 text-[#D4AF37]" />
            <div>
              <p className="text-sm font-medium text-white">Manual en PDF</p>
              <p className="text-xs text-gray-500">Descargar versión imprimible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
