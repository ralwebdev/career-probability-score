import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Database } from "lucide-react";
import { adminLogin, verifyAdmin, getDashboardStats, getCounselingRequests, getLeads, getAssessments, getAssessmentStats } from "@/lib/api";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    AssessmentModal,
    CounselingModal,
    LeadsModal,
    AdminCourseManagement,
    AdminWebinarManagement,
    AdminCollegeManagement,
    StatsGrid,

    ChartsSection,
    CounselingTable,
    AssessmentsTable,
    LeadsTable,
    AssessmentStats,
    DuplicatesSection
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
    const [assessmentStats, setAssessmentStats] = useState<any[]>([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [selectedScoreRange, setSelectedScoreRange] = useState<any>(null);
    const [selectedCareerRole, setSelectedCareerRole] = useState<string | null>(null);
    const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
    const [selectedCounseling, setSelectedCounseling] = useState<any>(null);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    
    // Pagination state
    const [counselingPage, setCounselingPage] = useState(1);
    const [counselingLimit, setCounselingLimit] = useState(25);
    const [counselingTotal, setCounselingTotal] = useState(0);

    const [assessmentsPage, setAssessmentsPage] = useState(1);
    const [assessmentsLimit, setAssessmentsLimit] = useState(25);
    const [assessmentsTotal, setAssessmentsTotal] = useState(0);

    const [leadsPage, setLeadsPage] = useState(1);
    const [leadsLimit, setLeadsLimit] = useState(25);
    const [leadsTotal, setLeadsTotal] = useState(0);

    // Derived filtered assessments based on active analytics filters
    const filteredAssessments = useMemo(() => {
        let result = assessmentsData;

        if (selectedScoreRange) {
            const [min, max] = selectedScoreRange.range.split('-').map(Number);
            result = result.filter(s => {
                const score = s.scores?.total || 0;
                return score >= min && score <= max;
            });
        }

        if (selectedCareerRole) {
            result = result.filter(s => s.careerRole === selectedCareerRole);
        }

        return result;
    }, [assessmentsData, selectedScoreRange, selectedCareerRole]);

    const handleScoreClick = (data: any) => {
        if (data && data.activePayload && data.activePayload.length > 0) {
            const payload = data.activePayload[0].payload;
            if (selectedScoreRange?.range === payload.range) {
                setSelectedScoreRange(null);
            } else {
                setSelectedScoreRange(payload);
                toast.info(`Filtering by ${payload.range} Score Range`);
            }
        }
    };

    const handleCareerClick = (data: any) => {
        if (data && data.activePayload && data.activePayload.length > 0) {
            const payload = data.activePayload[0].payload;
            if (selectedCareerRole === payload.name) {
                setSelectedCareerRole(null);
            } else {
                setSelectedCareerRole(payload.name);
                toast.info(`Filtering by ${payload.name} Role`);
            }
        }
    };

    const clearFilters = () => {
        setSelectedScoreRange(null);
        setSelectedCareerRole(null);
        setAssessmentsPage(1); // Reset to first page when filtering
        toast.success("Filters cleared");
    };

    useEffect(() => {
        if (selectedScoreRange || selectedCareerRole) {
            setAssessmentsPage(1);
        }
    }, [selectedScoreRange, selectedCareerRole]);

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
            // Initial load of stats and first pages
            const [stats, counseling, assessments, leads, aStats] = await Promise.all([
                getDashboardStats(token),
                getCounselingRequests(token, counselingPage, counselingLimit),
                getAssessments(token, assessmentsPage, assessmentsLimit, {
                    careerRole: selectedCareerRole,
                    minScore: selectedScoreRange ? selectedScoreRange.range.split('-')[0] : null,
                    maxScore: selectedScoreRange ? selectedScoreRange.range.split('-')[1] : null
                }),
                getLeads(token, leadsPage, leadsLimit),
                getAssessmentStats(token)
            ]);
            setDashboardData(stats);
            setCounselingData(counseling.data);
            setCounselingTotal(counseling.pagination.total);
            
            setAssessmentsData(assessments.data);
            setAssessmentsTotal(assessments.pagination.total);
            
            setLeadsData(leads.data);
            setLeadsTotal(leads.pagination.total);
            
            setAssessmentStats(aStats);
        } catch (error: any) {
            toast.error("Failed to fetch dashboard data");
        } finally {
            setDataLoading(false);
        }
    };

    // Granular fetchers for pagination changes
    const fetchCounseling = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;
        setDataLoading(true);
        try {
            const res = await getCounselingRequests(token, counselingPage, counselingLimit);
            setCounselingData(res.data);
            setCounselingTotal(res.pagination.total);
        } catch (error) {
            toast.error("Failed to fetch counseling requests");
        } finally {
            setDataLoading(false);
        }
    };

    const fetchAssessments = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;
        setDataLoading(true);
        try {
            const res = await getAssessments(token, assessmentsPage, assessmentsLimit, {
                careerRole: selectedCareerRole,
                minScore: selectedScoreRange ? selectedScoreRange.range.split('-')[0] : null,
                maxScore: selectedScoreRange ? selectedScoreRange.range.split('-')[1] : null
            });
            setAssessmentsData(res.data);
            setAssessmentsTotal(res.pagination.total);
        } catch (error) {
            toast.error("Failed to fetch assessments");
        } finally {
            setDataLoading(false);
        }
    };

    const fetchLeads = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;
        setDataLoading(true);
        try {
            const res = await getLeads(token, leadsPage, leadsLimit);
            setLeadsData(res.data);
            setLeadsTotal(res.pagination.total);
        } catch (error) {
            toast.error("Failed to fetch leads");
        } finally {
            setDataLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (isAuthenticated && token) {
            fetchCounseling();
        }
    }, [counselingPage, counselingLimit]);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (isAuthenticated && token) {
            fetchAssessments();
        }
    }, [assessmentsPage, assessmentsLimit, selectedScoreRange, selectedCareerRole]);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (isAuthenticated && token) {
            fetchLeads();
        }
    }, [leadsPage, leadsLimit]);

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
        <div className="min-h-screen px-4 py-8 bg-background relative overflow-hidden">
            {/* Premium background effects */}
            <div className="absolute inset-0 gradient-mesh opacity-60 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">

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
                                <TabsTrigger value="assessment-stats">Assessment Stats</TabsTrigger>
                                <TabsTrigger value="counseling">Counseling ({counselingTotal})</TabsTrigger>
                                <TabsTrigger value="assessments">Assessments ({assessmentsTotal})</TabsTrigger>
                                <TabsTrigger value="leads">Leads ({leadsTotal})</TabsTrigger>
                                <TabsTrigger value="courses">Courses</TabsTrigger>
                                <TabsTrigger value="webinars">Webinars</TabsTrigger>
                                <TabsTrigger value="colleges">Colleges</TabsTrigger>
                                <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
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
                                            assessmentsCount={assessmentsTotal}
                                            counselingCount={counselingTotal}
                                            leadsCount={leadsTotal}
                                            onScoreClick={handleScoreClick}
                                            onCareerClick={handleCareerClick}
                                            selectedScoreRange={selectedScoreRange?.range}
                                            selectedCareerRole={selectedCareerRole}
                                        />

                                        <div className="space-y-4 pt-4 border-t relative">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-xl font-bold"> Talent Drill-Down Records</h3>
                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                        {selectedScoreRange || selectedCareerRole ? "Filtered results based on chart selection" : "All platform assessment records"}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-[11px] font-bold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border">
                                                        Viewing {assessmentsData.length} of {assessmentsTotal} candidates
                                                    </div>
                                                    {(selectedScoreRange || selectedCareerRole) && (
                                                        <button 
                                                            onClick={clearFilters}
                                                            className="text-xs font-bold text-primary hover:underline"
                                                        >
                                                            Reset Filters
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {selectedScoreRange || selectedCareerRole ? (
                                                <div className="flex items-center gap-2 mb-2">
                                                    {selectedCareerRole && (
                                                        <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                                                            Role: {selectedCareerRole}
                                                        </span>
                                                    )}
                                                    {selectedScoreRange && (
                                                        <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-bold border border-accent/20">
                                                            Score: {selectedScoreRange.range}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : null}

                                            <AssessmentsTable 
                                                data={assessmentsData} 
                                                onRowClick={setSelectedAssessment} 
                                                pagination={{
                                                    page: assessmentsPage,
                                                    limit: assessmentsLimit,
                                                    total: assessmentsTotal,
                                                    onPageChange: setAssessmentsPage,
                                                    onLimitChange: setAssessmentsLimit
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </TabsContent>

                            <TabsContent value="assessment-stats">
                                <AssessmentStats data={assessmentStats} />
                            </TabsContent>

                            <TabsContent value="counseling">
                                <CounselingTable 
                                    data={counselingData} 
                                    onRowClick={setSelectedCounseling} 
                                    pagination={{
                                        page: counselingPage,
                                        limit: counselingLimit,
                                        total: counselingTotal,
                                        onPageChange: setCounselingPage,
                                        onLimitChange: setCounselingLimit
                                    }}
                                />
                            </TabsContent>

                            <TabsContent value="assessments">
                                <AssessmentsTable 
                                    data={assessmentsData} 
                                    onRowClick={setSelectedAssessment} 
                                    pagination={{
                                        page: assessmentsPage,
                                        limit: assessmentsLimit,
                                        total: assessmentsTotal,
                                        onPageChange: setAssessmentsPage,
                                        onLimitChange: setAssessmentsLimit
                                    }}
                                />
                            </TabsContent>

                            <TabsContent value="leads">
                                <LeadsTable 
                                    data={leadsData} 
                                    onRowClick={setSelectedLead} 
                                    pagination={{
                                        page: leadsPage,
                                        limit: leadsLimit,
                                        total: leadsTotal,
                                        onPageChange: setLeadsPage,
                                        onLimitChange: setLeadsLimit
                                    }}
                                />
                            </TabsContent>

                            <TabsContent value="courses">
                                <AdminCourseManagement token={localStorage.getItem("adminToken") || ""} />
                            </TabsContent>

                            <TabsContent value="webinars">
                                <AdminWebinarManagement token={localStorage.getItem("adminToken") || ""} />
                            </TabsContent>

                            <TabsContent value="colleges">
                                <AdminCollegeManagement token={localStorage.getItem("adminToken") || ""} />
                            </TabsContent>

                            <TabsContent value="duplicates">
                                <DuplicatesSection token={localStorage.getItem("adminToken") || ""} />
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
        </div>
    );
}
