import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { CompareProvider } from "@/context/CompareContext";
import { useCartSync } from "@/hooks/useCartSync";
import CompareBar from "@/components/CompareBar";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ComparePage from "./pages/ComparePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShopifyProductDetailPage from "./pages/ShopifyProductDetailPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import SupportPage from "./pages/SupportPage";
import BlogPage from "./pages/BlogPage";
import StoriesPage from "./pages/StoriesPage";
import WhySentorisePage from "./pages/WhySentorisePage";
import BatterySelectorPage from "./pages/BatterySelectorPage";
import WarrantyPage from "./pages/WarrantyPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";
import AIChatWidget from "./components/AIChatWidget";

const queryClient = new QueryClient();

// Cart sync wrapper component
const CartSyncProvider = ({ children }: { children: React.ReactNode }) => {
  useCartSync();
  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <CompareProvider>
            <CartSyncProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/shop/:handle" element={<ShopifyProductDetailPage />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/applications" element={<ApplicationsPage />} />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/stories" element={<StoriesPage />} />
                  <Route path="/why-sentorise" element={<WhySentorisePage />} />
                  <Route path="/battery-selector" element={<BatterySelectorPage />} />
                  <Route path="/warranty" element={<WarrantyPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <CompareBar />
                <AIChatWidget />
              </BrowserRouter>
            </CartSyncProvider>
          </CompareProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
