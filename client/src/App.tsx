import { Suspense, lazy, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FavoritesDrawer } from "@/components/favorites/FavoritesDrawer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Offers from "@/pages/Offers";
import Campaigns from "@/pages/Campaigns";
import BestSellers from "@/pages/BestSellers";
import Recommendations from "@/pages/Recommendations";
import Interactive from "@/pages/Interactive";
import Social from "@/pages/Social";
import Community from "@/pages/Community";
import NotFound from "@/pages/NotFound";

const Analytics = lazy(() => import("@/pages/Analytics"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  return null;
}

function PageLoader() {
  return (
    <div className="grid min-h-[60vh] place-items-center bg-paper">
      <div className="flex flex-col items-center gap-3">
        <span className="size-6 animate-spin rounded-full border-2 border-line border-t-jarir" />
        <span className="text-[11px] text-muted-ink">جارٍ التحميل…</span>
      </div>
    </div>
  );
}

function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FavoritesDrawer />
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  if (location.startsWith("/dashboard")) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Dashboard />
      </Suspense>
    );
  }

  return (
    <MarketingShell>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/offers" component={Offers} />
          <Route path="/campaigns" component={Campaigns} />
          <Route path="/best-sellers" component={BestSellers} />
          <Route path="/recommendations" component={Recommendations} />
          <Route path="/interactive" component={Interactive} />
          <Route path="/social" component={Social} />
          <Route path="/community" component={Community} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </MarketingShell>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <FavoritesProvider>
          <ScrollToTop />
          <Router />
          <Toaster
            position="top-center"
            closeButton
            toastOptions={{
              style: {
                fontFamily: "IBM Plex Sans Arabic, sans-serif",
                direction: "rtl",
              },
            }}
          />
        </FavoritesProvider>
      </TooltipProvider>
    </ErrorBoundary>
  );
}
