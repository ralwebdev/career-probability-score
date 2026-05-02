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
import CollegeLogin from "./pages/CollegeLogin";
import EmployabilityDashboard from "./pages/EmployabilityDashboard";
import NotFound from "./pages/NotFound";
import Downtime from "./pages/Downtime";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterDashboard from "./pages/RecruiterDashboard";

const queryClient = new QueryClient();

const isDowntimeActive = import.meta.env.VITE_DOWNTIME_ACTIVE === 'true';

const App = () => {
  if (isDowntimeActive) {
    return <Downtime />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/:collegeId/assessment" element={<Assessment />} />
              <Route path="/results" element={<Results />} />
              <Route path="/report" element={<Report />} />
              <Route path="/counseling" element={<Counseling />} />
              <Route path="/market-signals" element={<MarketSignals />} />
              {/* <Route path="/courses" element={<Courses />} /> */}
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/course/:courseId" element={<CourseLanding />} />
              {/* <Route path="/college-dashboard" element={<CollegeDashboard />} /> */}
              <Route path="/college-login" element={<CollegeLogin />} />
              <Route path="/employability-dashboard" element={<EmployabilityDashboard />} />
              <Route path="/recruiter-login" element={<RecruiterLogin />} />
              <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
