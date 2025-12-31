import { useLeads, useExportLeads } from "@/hooks/use-leads";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileSpreadsheet, MapPin, Phone, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface SearchResultsProps {
  searchId: number;
  region: string;
  category: string;
}

export function SearchResults({ searchId, region, category }: SearchResultsProps) {
  const { data: leads, isLoading } = useLeads(searchId);
  const { mutate: exportLeads, isPending: isExporting } = useExportLeads();
  const { toast } = useToast();

  const handleExport = () => {
    exportLeads(searchId, {
      onSuccess: (data) => {
        toast({
          title: "Sucesso!",
          description: data.message,
          variant: "default",
        });
      },
      onError: (err) => {
        toast({
          title: "Erro na exportação",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Carregando leads...</p>
      </div>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
          <MapPin className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Nenhum lead encontrado</h3>
        <p className="text-slate-500">Tente ajustar os parâmetros de busca.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div>
            <CardTitle className="text-xl font-display">Resultados da Busca</CardTitle>
            <CardDescription className="mt-1">
              {leads.length} leads encontrados em <span className="font-semibold text-slate-700">{region}</span> para <span className="font-semibold text-slate-700">{category}</span>
            </CardDescription>
          </div>
          <Button 
            onClick={handleExport}
            disabled={isExporting}
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileSpreadsheet className="mr-2 h-4 w-4" />
            )}
            Exportar Google Sheets
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-semibold text-slate-700">Nome do Negócio</TableHead>
                  <TableHead className="font-semibold text-slate-700">Contato</TableHead>
                  <TableHead className="font-semibold text-slate-700">Localização</TableHead>
                  <TableHead className="font-semibold text-slate-700">Avaliação</TableHead>
                  <TableHead className="font-semibold text-slate-700 text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      <div className="font-medium text-slate-900">{lead.name}</div>
                      <div className="text-xs text-slate-500">{lead.category}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-600 max-w-[200px] truncate" title={lead.address}>
                        {lead.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-slate-900">{lead.rating}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-slate-400">({lead.reviewCount})</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <a 
                        href={lead.googleMapsLink || '#'} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        Ver no Maps
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
