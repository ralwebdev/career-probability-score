import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, GraduationCap, ShieldCheck, LayoutDashboard, Database,
  TrendingUp, BarChart3, Award, Users, ArrowRight, Key, X, Lock, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getCollegeStudents, changeCollegePassword } from "@/lib/api";
import { toast } from "sonner";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell, AreaChart, Area
} from "recharts";

// Import Admin components for consistency
import {
  StatsGrid,
  AssessmentsTable,
  AssessmentStats
} from "./Admin/components";

export default function EmployabilityDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("assessments");
  const [selectedScoreRange, setSelectedScoreRange] = useState<{ min: number; max: number; label: string } | null>(null);
  const [selectedCareerRole, setSelectedCareerRole] = useState<string | null>(null);
  
  // Password Change State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("collegeUser");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      navigate("/college-login");
    }
  }, [navigate]);

  const { data: students = [], isLoading, error } = useQuery({
    queryKey: ['collegeStudents'],
    queryFn: () => {
      const stored = sessionStorage.getItem("collegeUser");
      if (!stored) throw new Error("No token");
      const u = JSON.parse(stored);
      return getCollegeStudents(u.token);
    },
    enabled: !!user,
  });

  // Derived filtered students based on active score range and career role filters
  const filteredStudents = useMemo(() => {
    let result = students;

    if (selectedScoreRange) {
      result = result.filter(s => {
        const score = s.scores?.total || 0;
        return score >= selectedScoreRange.min && score <= selectedScoreRange.max;
      });
    }

    if (selectedCareerRole) {
      result = result.filter(s => s.careerRole === selectedCareerRole);
    }

    return result;
  }, [students, selectedScoreRange, selectedCareerRole]);

  // Calculate aggregated scores based on filtered results
  const aggregatedStats = useMemo(() => {
    if (!filteredStudents || filteredStudents.length === 0) return [];

    const stats: Record<string, any> = {};
    filteredStudents.forEach((s: any) => {
      const role = s.careerRole;
      if (!stats[role]) {
        stats[role] = {
          role, count: 0, technical: 0, softSkill: 0,
          communication: 0, ei: 0, experience: 0,
          portfolio: 0, marketDemand: 0, qpi: 0, total: 0
        };
      }
      const st = stats[role];
      const scores = s.scores || {};
      st.count++;
      st.technical += scores.technical || 0;
      st.softSkill += scores.softSkill || 0;
      st.communication += scores.communication || 0;
      st.ei += scores.ei || 0;
      st.experience += scores.experience || 0;
      st.portfolio += scores.portfolio || 0;
      st.marketDemand += scores.marketDemand || 0;
      st.qpi += scores.qpi || 0;
      st.total += scores.total || 0;
    });

    return Object.values(stats).map(s => ({
      ...s,
      technical: Math.round(s.technical / s.count),
      softSkill: Math.round(s.softSkill / s.count),
      communication: Math.round(s.communication / s.count),
      ei: Math.round(s.ei / s.count),
      experience: Math.round(s.experience / s.count),
      portfolio: Math.round(s.portfolio / s.count),
      marketDemand: Math.round(s.marketDemand / s.count),
      qpi: Math.round(s.qpi / s.count),
      total: Math.round(s.total / s.count),
    }));
  }, [filteredStudents]);

  // Calculate CPS Distribution for the bar chart (always shows institutional scale)
  const scoreDistribution = useMemo(() => {
    const bins = [
      { range: "0-20", count: 0, color: "hsl(0, 70%, 65%)", min: 0, max: 20 },
      { range: "21-40", count: 0, color: "hsl(30, 80%, 60%)", min: 21, max: 40 },
      { range: "41-60", count: 0, color: "hsl(45, 90%, 55%)", min: 41, max: 60 },
      { range: "61-80", count: 0, color: "hsl(142, 70%, 45%)", min: 61, max: 80 },
      { range: "81-100", count: 0, color: "hsl(235, 72%, 50%)", min: 81, max: 100 },
    ];
    students.forEach(s => {
      const score = s.scores?.total || 0;
      if (score <= 20) bins[0].count++;
      else if (score <= 40) bins[1].count++;
      else if (score <= 60) bins[2].count++;
      else if (score <= 80) bins[3].count++;
      else bins[4].count++;
    });
    return bins;
  }, [students]);

  const handleScoreClick = (data: any) => {
    if (data && data.activePayload && data.activePayload.length > 0) {
      const payload = data.activePayload[0].payload;
      if (selectedScoreRange?.label === payload.range) {
        setSelectedScoreRange(null);
      } else {
        setSelectedScoreRange({ min: payload.min, max: payload.max, label: payload.range });
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

  const clearAllFilters = () => {
    setSelectedScoreRange(null);
    setSelectedCareerRole(null);
    toast.success("All filters cleared");
  };

  // Calculate Popular Career Interests
  const popularInterests = useMemo(() => {
    const counts: Record<string, number> = {};
    students.forEach(s => {
      const role = s.careerRole;
      counts[role] = (counts[role] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [students]);

  const summaryData = useMemo(() => {
    if (!students || students.length === 0) return null;
    const totalUsers = students.length;
    const avgCPS = Math.round(students.reduce((acc: number, s: any) => acc + (s.scores?.total || 0), 0) / totalUsers);

    const today = new Date().toISOString().split('T')[0];
    const assessmentsToday = students.filter((s: any) => {
      const created = s.createdAt?.split('T')[0];
      return today === created;
    }).length;

    const depts = [...new Set(students.map((s: any) => s.department))];

    return {
      totalUsers,
      avgCPS,
      assessmentsToday,
      topCountries: depts
    };
  }, [students]);

  const handleLogout = () => {
    sessionStorage.removeItem("collegeUser");
    toast.success("Logged out successfully");
    navigate("/college-login");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      await changeCollegePassword({
        previousPassword: passwordForm.previousPassword,
        newPassword: passwordForm.newPassword
      }, user.token);
      
      toast.success("Password updated successfully!");
      setIsChangingPassword(false);
      setPasswordForm({ previousPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen px-4 py-8 bg-background relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center border border-primary/20 shadow-lg box-glow">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Institutional Dashboard</h1>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{user.role} Portal</span>
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  {user.name} <span className="mx-1 text-border">|</span> {user.collegeId}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button
              onClick={() => setIsChangingPassword(true)}
              className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-md px-4 py-3 text-sm font-bold text-primary hover:bg-primary/10 transition-all shadow-sm active:scale-[0.98]"
              title="Change Password"
            >
              <Lock className="h-4 w-4" /> Password
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border bg-card/80 backdrop-blur-md px-6 py-3 text-sm font-bold hover:bg-accent transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="p-20 text-center rounded-2xl border bg-destructive/5 text-destructive font-bold border-destructive/20 backdrop-blur-sm">
            Failed to fetch dashboard records. Please check your connection.
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">Student Database ({students.length})</h2>
            <TabsContent value="assessments" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AssessmentsTable data={students} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      <AnimatePresence>
        {isChangingPassword && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Change Password</h3>
                </div>
                <button 
                  onClick={() => setIsChangingPassword(false)} 
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <input
                    required
                    type="password"
                    value={passwordForm.previousPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, previousPassword: e.target.value })}
                    className="w-full bg-background border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Enter current password"
                  />
                </div>

                <div className="space-y-2 border-t pt-4 mt-2">
                  <label className="text-sm font-medium">New Password</label>
                  <input
                    required
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full bg-background border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Minimum 6 characters recommended"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <input
                    required
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full bg-background border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Repeat new password"
                  />
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Change Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(false)}
                    className="w-full py-2.5 border rounded-lg text-sm font-medium hover:bg-muted transition-colors font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
