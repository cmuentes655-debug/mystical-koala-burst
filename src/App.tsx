import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PilarDetail from "./pages/PilarDetail";
import ResourcesNew from "./pages/ResourcesNew";
import ResourceDetail from "./pages/ResourceDetail";
import NotFound from "./pages/NotFound";
import { FilesProvider } from "./lib/filesStore";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        {/* Los documentos agregados se comparten entre rutas (pilar ↔ buscador). */}
        <FilesProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pilares/:id" element={<PilarDetail />} />
            <Route path="/recursos-nuevo" element={<ResourcesNew />} />
            <Route path="/recursos-nuevo/:id" element={<ResourceDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FilesProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
