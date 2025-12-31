import { useQuery, useMutation } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useLeads(searchId?: number) {
  return useQuery({
    queryKey: [api.leads.list.path, searchId],
    enabled: !!searchId,
    queryFn: async () => {
      if (!searchId) return [];
      const url = `${api.leads.list.path}?searchId=${searchId}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch leads");
      return api.leads.list.responses[200].parse(await res.json());
    },
  });
}

export function useExportLeads() {
  return useMutation({
    mutationFn: async (searchId: number) => {
      const res = await fetch(api.leads.export.path, {
        method: api.leads.export.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to export leads");
      }

      return api.leads.export.responses[200].parse(await res.json());
    },
  });
}
