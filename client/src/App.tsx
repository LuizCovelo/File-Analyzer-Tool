import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/Dashboard";
import SearchDetail from "@/pages/SearchDetail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/search/:id" component={SearchDetail} />
      <Route path="/history" component={Dashboard} /> {/* Placeholder for now, can reuse dashboard */}
      <Route path="/analytics" component={Dashboard} /> {/* Placeholder */}
      <Route path="/settings" component={Dashboard} /> {/* Placeholder */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
