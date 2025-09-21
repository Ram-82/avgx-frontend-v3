import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import IndexPage from "@/pages/index";
import CoinPage from "@/pages/coin";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";
import AvgxIndexPage from "@/pages/avgx-index";
import PricesPage from "@/pages/prices";
import { useThemeStore } from "@/stores/theme-store";
import { useEffect } from "react";

function Router() {
  return (
    <div className="min-h-screen bg-avgx-primary dark:bg-avgx-primary light:bg-white">
      <Header />
      <main className="pt-24">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/avgx-index" component={AvgxIndexPage} />
          <Route path="/prices" component={PricesPage} />
          <Route path="/index" component={IndexPage} />
          <Route path="/coin" component={CoinPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply theme to document element
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

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
