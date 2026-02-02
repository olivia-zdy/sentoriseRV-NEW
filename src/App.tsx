import { lazy, Suspense } from "react";
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

// Lazy load non-critical routes
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const ShopifyProductDetailPage = lazy(() => import("./pages/ShopifyProductDetailPage"));
const ApplicationsPage = lazy(() => import("./pages/ApplicationsPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const StoriesPage = lazy(() => import("./pages/StoriesPage"));
const WhySentorisePage = lazy(() => import("./pages/WhySentorisePage"));
const BatterySelectorPage = lazy(() => import("./pages/BatterySelectorPage"));
const WarrantyPage = lazy(() => import("./pages/WarrantyPage"));
const BluetoothGuidePage = lazy(() => import("./pages/BluetoothGuidePage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AIChatWidget = lazy(() => import("./components/AIChatWidget"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const LeadFollowUp = lazy(() => import("./pages/admin/LeadFollowUp"));
const FeedbackHub = lazy(() => import("./pages/admin/FeedbackHub"));
const BrandAssets = lazy(() => import("./pages/admin/BrandAssets"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

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
                <Suspense fallback={<div className="min-h-screen bg-background" />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:productId" element={<ProductDetailPage />} />
                    <Route path="/shop/:handle" element={<ShopifyProductDetailPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/applications" element={<ApplicationsPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:id" element={<BlogPostPage />} />
                    <Route path="/stories" element={<StoriesPage />} />
                    <Route path="/why-sentorise" element={<WhySentorisePage />} />
                    <Route path="/battery-selector" element={<BatterySelectorPage />} />
                    <Route path="/warranty" element={<WarrantyPage />} />
                    <Route path="/bluetooth-guide" element={<BluetoothGuidePage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/leads" element={<LeadFollowUp />} />
                    <Route path="/admin/feedback" element={<FeedbackHub />} />
                    <Route path="/admin/assets" element={<BrandAssets />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <CompareBar />
                <Suspense fallback={null}>
                  <AIChatWidget />
                </Suspense>
              </BrowserRouter>
            </CartSyncProvider>
          </CompareProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
