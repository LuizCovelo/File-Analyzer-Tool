import { useSearch } from "@/hooks/use-searches";
import { Layout } from "@/components/Layout";
import { SearchResults } from "@/components/SearchResults";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, MapPin, Target, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function SearchDetail() {
  const [, params] = useRoute("/search/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: search, isLoading } = useSearch(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="h-64 bg-slate-200 rounded-xl"></div>
        </div>
      </Layout>
    );
  }

  if (!search) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Busca não encontrada</h2>
          <Link href="/">
            <Button variant="outline">Voltar para Dashboard</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold font-display text-slate-900">Detalhes da Prospecção</h1>
              <Badge variant={
                search.status === 'completed' ? 'default' : 
                search.status === 'processing' ? 'secondary' : 'outline'
              }>
                {search.status === 'completed' ? 'Concluído' : 
                 search.status === 'processing' ? 'Em Andamento' : 
                 search.status === 'failed' ? 'Falha' : 'Pendente'}
              </Badge>
            </div>
            <p className="text-slate-500 text-sm mt-1">
              ID: #{search.id} • Criado em {search.createdAt && format(new Date(search.createdAt), "dd 'de' MMMM, HH:mm", { locale: ptBR })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Categoria</p>
              <p className="font-medium text-slate-900">{search.category}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Região</p>
              <p className="font-medium text-slate-900">{search.region}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold">Total Leads</p>
              <p className="font-medium text-slate-900">{search.totalLeads} encontrados</p>
            </div>
          </div>
        </div>

        <SearchResults searchId={search.id} region={search.region} category={search.category} />
      </div>
    </Layout>
  );
}
