import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSearchSchema, type InsertSearch } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { useCreateSearch } from "@/hooks/use-searches";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function SearchForm() {
  const { toast } = useToast();
  const createSearch = useCreateSearch();
  
  const form = useForm<InsertSearch>({
    resolver: zodResolver(insertSearchSchema),
    defaultValues: {
      region: "",
      category: "",
      radius: 5000,
      limit: 20,
      status: "pending",
      totalLeads: 0
    },
  });

  async function onSubmit(data: InsertSearch) {
    try {
      await createSearch.mutateAsync(data);
      toast({
        title: "Busca iniciada!",
        description: `Procurando por ${data.category} em ${data.region}.`,
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Erro ao iniciar busca",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-0 shadow-lg shadow-blue-900/5 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-display flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-500" />
            Nova Prospecção
          </CardTitle>
          <CardDescription>
            Configure os parâmetros para encontrar novos leads qualificados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-slate-700">Categoria / Nicho</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Restaurantes, Dentistas, Oficinas..." 
                          className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-slate-700">Região / Cidade</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: São Paulo, Centro, Copacabana..." 
                          className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="radius"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-slate-700">Raio de Busca (metros)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg transition-all"
                          {...field} 
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-slate-700">Limite de Resultados</FormLabel>
                      <Select 
                        onValueChange={(val) => field.onChange(parseInt(val))} 
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg">
                            <SelectValue placeholder="Selecione o limite" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10">10 Leads</SelectItem>
                          <SelectItem value="20">20 Leads</SelectItem>
                          <SelectItem value="30">30 Leads</SelectItem>
                          <SelectItem value="40">40 Leads</SelectItem>
                          <SelectItem value="50">50 Leads</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={createSearch.isPending}
                  className="
                    px-8 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                    shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 
                    hover:-translate-y-0.5 transition-all duration-200 font-semibold text-white
                  "
                >
                  {createSearch.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Iniciando...
                    </>
                  ) : (
                    "Iniciar Prospecção"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
