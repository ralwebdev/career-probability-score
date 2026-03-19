import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, BarChart3, Globe, TrendingUp, Award, AlertTriangle, Lock, LogOut } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { adminLogin, verifyAdmin } from "@/lib/api";
import { toast } from "sonner";

// Simulated admin data
const stats = {
  totalUsers: 12847,
  avgCPS: 58,
  assessmentsToday: 342,
  countries: 16,
};

const popularCareers = [
  { name: "Software Dev", count: 3240 },
  { name: "Data Analyst", count: 2180 },
  { name: "UI/UX Designer", count: 1650 },
  { name: "AI/ML Engineer", count: 1420 },
  { name: "Cloud Engineer", count: 1100 },
  { name: "Digital Marketer", count: 980 },
  { name: "Product Manager", count: 870 },
  { name: "Frontend Dev", count: 750 },
];

const skillGaps = [
  { skill: "Python", percentage: 68 },
  { skill: "SQL", percentage: 62 },
  { skill: "Git", percentage: 58 },
  { skill: "Figma", percentage: 55 },
  { skill: "React", percentage: 52 },
  { skill: "Docker", percentage: 48 },
];

const scoreDistribution = [
  { range: "0-20", count: 420, color: "hsl(0, 84%, 60%)" },
  { range: "21-40", count: 1850, color: "hsl(20, 84%, 55%)" },
  { range: "41-60", count: 4200, color: "hsl(42, 100%, 50%)" },
  { range: "61-80", count: 4800, color: "hsl(120, 60%, 45%)" },
  { range: "81-100", count: 1577, color: "hsl(160, 84%, 39%)" },
];

const topCountries = [
  { name: "India", users: 8420 },
  { name: "USA", users: 1250 },
  { name: "UK", users: 680 },
  { name: "Canada", users: 540 },
  { name: "UAE", users: 480 },
  { name: "Others", users: 1477 },
];

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

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          await verifyAdmin(token);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const data = await adminLogin({ username, password });
      localStorage.setItem("adminToken", data.token);
      setIsAuthenticated(true);
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

            {/* Top Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Users" value={stats.totalUsers.toLocaleString()} icon={<Users className="h-5 w-5 text-primary" />} sub="+127 this week" />
              <StatCard label="Average CPS" value={stats.avgCPS} icon={<BarChart3 className="h-5 w-5 text-primary" />} sub="Out of 100" />
              <StatCard label="Assessments Today" value={stats.assessmentsToday} icon={<TrendingUp className="h-5 w-5 text-primary" />} sub="+18% from yesterday" />
              <StatCard label="Countries" value={stats.countries} icon={<Globe className="h-5 w-5 text-primary" />} sub="Global reach" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Popular Careers */}
              <div className="rounded-xl border bg-card/50 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Popular Careers</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={popularCareers} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                    <XAxis type="number" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} width={100} />
                    <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }} />
                    <Bar dataKey="count" fill="hsl(186, 100%, 50%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Score Distribution */}
              <div className="rounded-xl border bg-card/50 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-primary" /> CPS Score Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={scoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                    <XAxis dataKey="range" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                    <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {scoreDistribution.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Skill Gaps */}
              <div className="rounded-xl border bg-card/50 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-accent" /> Top Skill Gaps (% users lacking)</h3>
                <div className="space-y-3">
                  {skillGaps.map(sg => (
                    <div key={sg.skill}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{sg.skill}</span>
                        <span className="font-mono text-xs text-destructive">{sg.percentage}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-destructive/70"
                          initial={{ width: 0 }}
                          animate={{ width: `${sg.percentage}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div className="rounded-xl border bg-card/50 p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Globe className="h-5 w-5 text-primary" /> Users by Country</h3>
                <div className="flex items-center gap-8">
                  <ResponsiveContainer width="50%" height={220}>
                    <PieChart>
                      <Pie data={topCountries} dataKey="users" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={0}>
                        {topCountries.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {topCountries.map((c, i) => (
                      <div key={c.name} className="flex items-center gap-2 text-sm">
                        <div className="h-3 w-3 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                        <span className="text-muted-foreground">{c.name}</span>
                        <span className="font-mono text-xs font-bold ml-auto">{c.users.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
