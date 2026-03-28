import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut } from "lucide-react";
import { adminLogin, verifyAdmin, getDashboardStats, getCounselingRequests, getLeads, getAssessments } from "@/lib/api";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    AssessmentModal,
    CounselingModal,
    LeadsModal,
    AdminCourseManagement,
    StatsGrid,
    ChartsSection,
    CounselingTable,
    AssessmentsTable,
    LeadsTable
} from "./components";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [activeTab, setActiveTab] = useState("dashboard");
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [counselingData, setCounselingData] = useState<any[]>([]);
    const [assessmentsData, setAssessmentsData] = useState<any[]>([]);
    const [leadsData, setLeadsData] = useState<any[]>([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
    const [selectedCounseling, setSelectedCounseling] = useState<any>(null);
    const [selectedLead, setSelectedLead] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("adminToken");
            if (token) {
                try {
                    await verifyAdmin(token);
                    setIsAuthenticated(true);
                    fetchData(token);
                } catch (error) {
                    localStorage.removeItem("adminToken");
                    setIsAuthenticated(false);
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, []);

    const fetchData = async (token: string) => {
        setDataLoading(true);
        try {
            const [stats, counseling, assessments, leads] = await Promise.all([
                getDashboardStats(token),
                getCounselingRequests(token),
                getAssessments(token),
                getLeads(token)
            ]);
            setDashboardData(stats);
            setCounselingData(counseling.data || counseling);
            setAssessmentsData(assessments.data || assessments);
            setLeadsData(leads.data || leads);
        } catch (error: any) {
            toast.error("Failed to fetch dashboard data");
        } finally {
            setDataLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            const data = await adminLogin({ username, password });
            localStorage.setItem("adminToken", data.token);
            setIsAuthenticated(true);
            fetchData(data.token);
            toast.success("Welcome back, Admin!");
        } catch (error: any) {
            toast.error(error.message || "Invalid credentials");
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
        toast.success("Logged out successfully");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-8">
            <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mx-auto max-w-md mt-20"
                    >
                        <div className="rounded-2xl border bg-card/50 p-8 backdrop-blur-sm">
                            <div className="mb-8 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                    <Lock className="h-6 w-6 text-primary" />
                                </div>
                                <h1 className="text-2xl font-bold">Admin Portal</h1>
                                <p className="text-sm text-muted-foreground">Please sign in to access the dashboard</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Username</label>
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        placeholder="Enter username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        placeholder="Enter password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                                >
                                    {isLoggingIn ? "Signing in..." : "Sign In"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mx-auto max-w-6xl"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                                <p className="text-muted-foreground text-sm mt-1">Platform analytics & user insights</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
                            >
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                            <TabsList className="bg-card/50 border backdrop-blur-sm">
                                <TabsTrigger value="dashboard">Analytics</TabsTrigger>
                                <TabsTrigger value="counseling">Counseling ({counselingData.length})</TabsTrigger>
                                <TabsTrigger value="assessments">Assessments ({assessmentsData.length})</TabsTrigger>
                                <TabsTrigger value="leads">Leads ({leadsData.length})</TabsTrigger>
                                <TabsTrigger value="courses">Courses</TabsTrigger>
                            </TabsList>

                            <TabsContent value="dashboard" className="space-y-8">
                                {dataLoading || !dashboardData ? (
                                    <div className="h-[400px] flex items-center justify-center">
                                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                                    </div>
                                ) : (
                                    <>
                                        <StatsGrid dashboardData={dashboardData} />
                                        <ChartsSection
                                            dashboardData={dashboardData}
                                            assessmentsCount={assessmentsData.length}
                                            counselingCount={counselingData.length}
                                            leadsCount={leadsData.length}
                                        />
                                    </>
                                )}
                            </TabsContent>

                            <TabsContent value="counseling">
                                <CounselingTable data={counselingData} onRowClick={setSelectedCounseling} />
                            </TabsContent>

                            <TabsContent value="assessments">
                                <AssessmentsTable data={assessmentsData} onRowClick={setSelectedAssessment} />
                            </TabsContent>

                            <TabsContent value="leads">
                                <LeadsTable data={leadsData} onRowClick={setSelectedLead} />
                            </TabsContent>

                            <TabsContent value="courses">
                                <AdminCourseManagement token={localStorage.getItem("adminToken") || ""} />
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                )}
            </AnimatePresence>

            <AssessmentModal
                assessment={selectedAssessment}
                isOpen={!!selectedAssessment}
                onClose={() => setSelectedAssessment(null)}
            />

            <CounselingModal
                request={selectedCounseling}
                isOpen={!!selectedCounseling}
                onClose={() => setSelectedCounseling(null)}
            />

            <LeadsModal
                lead={selectedLead}
                isOpen={!!selectedLead}
                onClose={() => setSelectedLead(null)}
            />
        </div>
    );
}
