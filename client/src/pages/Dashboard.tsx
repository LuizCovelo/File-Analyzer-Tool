import { useSearches } from "@/hooks/use-searches";
import { Layout } from "@/components/Layout";
import { SearchForm } from "@/components/SearchForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, MapPin, Database, Activity } from "lucide-react";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: searches } = useSearches();

  const totalLeads = searches?.reduce((acc, curr) => acc + (curr.totalLeads || 0), 0) || 0;
  const recentSearches = searches?.slice(0, 5) || [];

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-lg shadow-blue-100">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total de Leads</p>
                <h3 className="text-3xl font-bold text-slate-900 font-display">{totalLeads}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg shadow-emerald-100">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Buscas Realizadas</p>
                <h3 className="text-3xl font-bold text-slate-900 font-display">{searches?.length || 0}</h3>
              </div>
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-0 shadow-lg shadow-purple-100">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Taxa de Sucesso</p>
                <h3 className="text-3xl font-bold text-slate-900 font-display">98%</h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SearchForm />
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4 font-display">Buscas Recentes</h3>
            <div className="space-y-4">
              {recentSearches.map((search) => (
                <div 
                  key={search.id}
                  className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${search.status === 'completed' ? 'bg-green-100 text-green-600' : 
                          search.status === 'processing' ? 'bg-blue-100 text-blue-600 animate-pulse' : 
                          'bg-slate-100 text-slate-500'}
                      `}>
                        {search.status === 'processing' ? (
                          <Activity className="w-5 h-5 animate-spin" />
                        ) : (
                          <MapPin className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{search.category}</h4>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          {search.region} 
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          {search.totalLeads} leads
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge variant={
                        search.status === 'completed' ? 'default' : 
                        search.status === 'processing' ? 'secondary' : 'outline'
                      } className={`
                        ${search.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                      `}>
                        {search.status === 'completed' ? 'Concluído' : 
                         search.status === 'processing' ? 'Processando' : 
                         search.status === 'failed' ? 'Falhou' : 'Pendente'}
                      </Badge>
                      
                      <Link href={`/search/${search.id}`}>
                        <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {recentSearches.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
                  <p className="text-slate-500">Nenhuma busca realizada ainda.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
            <CardHeader>
              <CardTitle className="text-white">Dicas Pro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium mb-1">🎯 Especifique a Cidade</p>
                <p className="text-xs text-blue-100">Inclua o nome do bairro para resultados mais precisos.</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium mb-1">⚡ Nichos Lucrativos</p>
                <p className="text-xs text-blue-100">Restaurantes, Clínicas e Oficinas costumam ter mais dados públicos.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
             <CardHeader>
               <CardTitle className="text-lg">Atividade Recente</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="relative border-l border-slate-200 ml-3 space-y-6 pb-2">
                 {recentSearches.map((search, idx) => (
                   <div key={idx} className="mb-6 ml-6 relative">
                     <span className="absolute -left-[2.4rem] w-3 h-3 bg-blue-500 rounded-full ring-4 ring-white"></span>
                     <h5 className="text-sm font-medium text-slate-900">Busca por {search.category}</h5>
                     <p className="text-xs text-slate-500 mt-1">
                       {search.createdAt ? formatDistanceToNow(new Date(search.createdAt), { addSuffix: true, locale: ptBR }) : 'Agora'}
                     </p>
                   </div>
                 ))}
               </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
