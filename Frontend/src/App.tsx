import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import Report from "./pages/Report";
import Counseling from "./pages/Counseling";
import MarketSignals from "./pages/MarketSignals";
import Courses from "./pages/Courses";
import Workshops from "./pages/Workshops";
import Admin from "./pages/Admin/index";
import CourseLanding from "./pages/CourseLanding";
import CollegeDashboard from "./pages/CollegeDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            <Route path="/report" element={<Report />} />
            <Route path="/counseling" element={<Counseling />} />
            <Route path="/market-signals" element={<MarketSignals />} />
            {/* <Route path="/courses" element={<Courses />} /> */}
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/course/:courseId" element={<CourseLanding />} />
            {/* <Route path="/college-dashboard" element={<CollegeDashboard />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
