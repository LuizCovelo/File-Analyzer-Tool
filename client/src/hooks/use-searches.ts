import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertSearch } from "@shared/routes";

export function useSearches() {
  return useQuery({
    queryKey: [api.searches.list.path],
    queryFn: async () => {
      const res = await fetch(api.searches.list.path);
      if (!res.ok) throw new Error("Failed to fetch searches");
      return api.searches.list.responses[200].parse(await res.json());
    },
    // Poll every 5 seconds to update status of pending searches
    refetchInterval: 5000, 
  });
}

export function useSearch(id: number) {
  return useQuery({
    queryKey: [api.searches.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.searches.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch search details");
      return api.searches.get.responses[200].parse(await res.json());
    },
    refetchInterval: (query) => {
      const data = query.state.data;
      // Continue polling if status is pending or processing
      if (data && (data.status === 'pending' || data.status === 'processing')) {
        return 3000;
      }
      return false;
    },
  });
}

export function useCreateSearch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertSearch) => {
      const res = await fetch(api.searches.create.path, {
        method: api.searches.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create search");
      }
      
      return api.searches.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.searches.list.path] });
    },
  });
}
