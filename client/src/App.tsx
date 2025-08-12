import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Workouts from "@/pages/workouts";
import Calendar from "@/pages/calendar";
import Marketplace from "@/pages/marketplace";
import Progress from "@/pages/progress";
import Financeiro from "@/pages/financeiro";
import Header from "@/components/layout/header";
import MobileNav from "@/components/layout/mobile-nav";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/workouts" component={Workouts} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/progress" component={Progress} />
      <Route path="/financeiro" component={Financeiro} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Header />
          <main className="pb-20 md:pb-8 min-h-[calc(100vh-80px)] overflow-x-hidden">
            <Router />
          </main>
          <MobileNav />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
