import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, BarChart3, Globe, TrendingUp, Award, AlertTriangle, Lock, LogOut } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { adminLogin, verifyAdmin, getDashboardStats, getCounselingRequests, getLeads, getAssessments } from "@/lib/api";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

const PIE_COLORS = ["hsl(186, 100%, 50%)", "hsl(186, 80%, 40%)", "hsl(186, 60%, 35%)", "hsl(42, 100%, 50%)", "hsl(42, 80%, 40%)", "hsl(215, 20%, 40%)"];

function StatCard({ label, value, icon, sub }: { label: string; value: string | number; icon: React.ReactNode; sub?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-card/50 p-5"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">{icon}</div>
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <div className="font-mono text-3xl font-bold text-foreground">{value}</div>
            {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
        </motion.div>
    );
}

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
                            </TabsList>

                            <TabsContent value="dashboard" className="space-y-8">
                                {dataLoading || !dashboardData ? (
                                    <div className="h-[400px] flex items-center justify-center">
                                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                                    </div>
                                ) : (
                                    <>
                                        {/* Top Stats */}
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                            <StatCard
                                                label="Total Users"
                                                value={dashboardData.totalUsers.toLocaleString()}
                                                icon={<Users className="h-5 w-5 text-primary" />}
                                                sub="Lifetime assessments"
                                            />
                                            <StatCard
                                                label="Average CPS"
                                                value={dashboardData.avgCPS}
                                                icon={<BarChart3 className="h-5 w-5 text-primary" />}
                                                sub="Out of 100"
                                            />
                                            <StatCard
                                                label="Assessments Today"
                                                value={dashboardData.assessmentsToday}
                                                icon={<TrendingUp className="h-5 w-5 text-primary" />}
                                                sub="New entries"
                                            />
                                            <StatCard
                                                label="Countries"
                                                value={dashboardData.topCountries.length}
                                                icon={<Globe className="h-5 w-5 text-primary" />}
                                                sub="Global reach"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Popular Careers */}
                                            <div className="rounded-xl border bg-card/50 p-6">
                                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                    <Award className="h-5 w-5 text-primary" /> Popular Career Interests
                                                </h3>
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <BarChart data={dashboardData.popularCareers} layout="vertical">
                                                        <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 26%, 93%, 1.00)" />
                                                        <XAxis type="number" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                                                        <YAxis dataKey="name" type="category" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} width={100} />
                                                        <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }} />
                                                        <Bar dataKey="count" fill="hsl(186, 100%, 50%)" radius={[0, 4, 4, 0]} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>

                                            {/* Score Distribution */}
                                            <div className="rounded-xl border bg-card/50 p-6">
                                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                    <BarChart3 className="h-5 w-5 text-primary" /> CPS Score Distribution
                                                </h3>
                                                <ResponsiveContainer width="100%" height={300}>
                                                    <BarChart data={dashboardData.scoreDistribution}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                                                        <XAxis dataKey="range" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                                                        <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                                                        <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }} />
                                                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                                            {dashboardData.scoreDistribution.map((entry: any, i: number) => (
                                                                <Cell key={i} fill={entry.color} />
                                                            ))}
                                                        </Bar>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Top Countries */}
                                            <div className="rounded-xl border bg-card/50 p-6">
                                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                    <Globe className="h-5 w-5 text-primary" /> Users by Country
                                                </h3>
                                                <div className="flex items-center gap-8">
                                                    <ResponsiveContainer width="50%" height={220}>
                                                        <PieChart>
                                                            <Pie data={dashboardData.topCountries} dataKey="users" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={0}>
                                                                {dashboardData.topCountries.map((_: any, i: number) => (
                                                                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                                                ))}
                                                            </Pie>
                                                            <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }} />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                    <div className="space-y-2 flex-1">
                                                        {dashboardData.topCountries.map((c: any, i: number) => (
                                                            <div key={c.name} className="flex items-center gap-2 text-sm">
                                                                <div className="h-3 w-3 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                                                                <span className="text-muted-foreground">{c.name}</span>
                                                                <span className="font-mono text-xs font-bold ml-auto">{c.users.toLocaleString()}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick Info */}
                                            <div className="rounded-xl border bg-card/50 p-6">
                                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                    <AlertTriangle className="h-5 w-5 text-accent" /> System Notice
                                                </h3>
                                                <div className="space-y-4">
                                                    <div className="rounded-lg bg-accent/10 p-4 border border-accent/20">
                                                        <p className="text-sm text-accent-foreground font-medium">Growth Tip</p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Career interests in {dashboardData.popularCareers[0]?.name || "Tech"} are trending up this week.
                                                        </p>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        Total data records: {assessmentsData.length + counselingData.length + leadsData.length}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </TabsContent>

                            <TabsContent value="counseling">
                                <div className="rounded-xl border bg-card/50 overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-muted/50">
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Contact</TableHead>
                                                <TableHead>Interest</TableHead>
                                                <TableHead>Schedule</TableHead>
                                                <TableHead>Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {counselingData.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                                        No counseling requests found
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                counselingData.map((req: any) => (
                                                    <TableRow key={req._id}>
                                                        <TableCell className="font-medium">{req.name}</TableCell>
                                                        <TableCell>
                                                            <div className="text-xs">{req.email}</div>
                                                            <div className="text-[10px] text-muted-foreground">{req.phone}</div>
                                                        </TableCell>
                                                        <TableCell className="text-xs">{req.careerInterest}</TableCell>
                                                        <TableCell>
                                                            <span className="capitalize text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                                                {req.mode}
                                                            </span>
                                                            <div className="text-[10px] text-muted-foreground mt-1">{req.schedule}</div>
                                                        </TableCell>
                                                        <TableCell className="text-xs">
                                                            {req.preferredDate ? format(new Date(req.preferredDate), "MMM dd, yyyy") : "N/A"}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            {/* <TabsContent value="leads">
                                <div className="rounded-xl border bg-card/50 overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-muted/50">
                                            <TableRow>
                                                <TableHead>User</TableHead>
                                                <TableHead>Location</TableHead>
                                                <TableHead>Education</TableHead>
                                                <TableHead>Career Role</TableHead>
                                                <TableHead>Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {leadsData.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                                        No assessment leads found
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                leadsData.map((lead: any) => (
                                                    <TableRow key={lead._id}>
                                                        <TableCell>
                                                            <div className="font-medium text-xs">{lead.name}</div>
                                                            <div className="text-[10px] text-muted-foreground">{lead.email}</div>
                                                        </TableCell>
                                                        <TableCell className="text-xs">{lead.city}, {lead.country}</TableCell>
                                                        <TableCell className="text-xs">{lead.educationLevel}</TableCell>
                                                        <TableCell className="text-xs font-semibold">{lead.careerRole}</TableCell>
                                                        <TableCell className="text-xs">
                                                            {format(new Date(lead.createdAt), "MMM dd, HH:mm")}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent> */}

                            <TabsContent value="assessments">
                                <div className="rounded-xl border bg-card/50 overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-muted/50">
                                            <TableRow>
                                                <TableHead>User</TableHead>
                                                <TableHead>Location</TableHead>
                                                <TableHead>Education</TableHead>
                                                <TableHead>Career Role</TableHead>
                                                <TableHead>Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {assessmentsData.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                                        No assessments found
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                assessmentsData.map((assessment: any) => (
                                                    <TableRow key={assessment._id}>
                                                        <TableCell>
                                                            <div className="font-medium text-xs">{assessment.name}</div>
                                                            <div className="text-[10px] text-muted-foreground">{assessment.email}</div>
                                                        </TableCell>
                                                        <TableCell className="text-xs">{assessment.city}, {assessment.country}</TableCell>
                                                        <TableCell className="text-xs">{assessment.educationLevel}</TableCell>
                                                        <TableCell className="text-xs font-semibold">{assessment.careerRole}</TableCell>
                                                        <TableCell className="text-xs">
                                                            {format(new Date(assessment.createdAt), "MMM dd, HH:mm")}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <TabsContent value="leads">
                                <div className="rounded-xl border bg-card/50 overflow-hidden">
                                    <Table>
                                        <TableHeader className="bg-muted/50">
                                            <TableRow>
                                                <TableHead>User</TableHead>
                                                <TableHead>Phone</TableHead>
                                                <TableHead>Course</TableHead>
                                                <TableHead>Source</TableHead>
                                                <TableHead>Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {leadsData.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                                        No general leads found
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                leadsData.map((lead: any) => (
                                                    <TableRow key={lead._id}>
                                                        <TableCell>
                                                            <div className="font-medium text-xs">{lead.name || "Anonymous"}</div>
                                                        </TableCell>
                                                        <TableCell className="text-xs">{lead.phone}</TableCell>
                                                        <TableCell className="text-xs">{lead.courseTitle}</TableCell>
                                                        <TableCell>
                                                            <span className="capitalize text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                                                                {lead.source}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-xs">
                                                            {format(new Date(lead.createdAt), "MMM dd, HH:mm")}
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
