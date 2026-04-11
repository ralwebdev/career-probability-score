import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, GraduationCap, ShieldCheck, LayoutDashboard, Database,
  TrendingUp, BarChart3, Award, Users, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getCollegeStudents } from "@/lib/api";
import { toast } from "sonner";
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Cell, AreaChart, Area 
} from "recharts";

// Import Admin components for consistency
import {
  AssessmentModal,
  StatsGrid,
  AssessmentsTable,
  AssessmentStats
} from "./Admin/components";

export default function EmployabilityDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("analytics");
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [selectedScoreRange, setSelectedScoreRange] = useState<{ min: number; max: number; label: string } | null>(null);
  const [selectedCareerRole, setSelectedCareerRole] = useState<string | null>(null);

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
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl border bg-card/80 backdrop-blur-md px-6 py-3 text-sm font-bold hover:bg-accent transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
                <LogOut className="h-4 w-4" /> Sign Out
            </button>
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
            <TabsList className="bg-card/40 border backdrop-blur-xl p-1.5 rounded-2xl shadow-sm">
              <TabsTrigger value="analytics" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all font-bold">
                <LayoutDashboard className="h-4 w-4 mr-2" /> Performance Analytics
              </TabsTrigger>
              <TabsTrigger value="assessments" className="px-8 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all font-bold">
                <Database className="h-4 w-4 mr-2" /> Student Database ({students.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <StatsGrid dashboardData={summaryData} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Popular Career Interests */}
                <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" /> Popular Career Interests
                        </h3>
                        <p className="text-[10px] text-muted-foreground ml-7 font-medium">Click a role to filter individual candidates</p>
                    </div>
                    {selectedCareerRole && (
                      <Button variant="ghost" size="sm" onClick={() => setSelectedCareerRole(null)} className="h-8 text-xs font-bold text-primary hover:text-primary hover:bg-primary/10">
                        Clear
                      </Button>
                    )}
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={popularInterests} layout="vertical" onClick={handleCareerClick}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={100} tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 700 }} stroke="none" />
                      <Tooltip 
                        contentStyle={{ 
                            background: "hsl(var(--card))", 
                            border: "1px solid hsl(var(--border))", 
                            borderRadius: "12px",
                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                            fontSize: "12px",
                            fontWeight: "600"
                        }}
                        cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                        itemStyle={{ color: "hsl(var(--primary))" }}
                      />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} barSize={20} className="cursor-pointer">
                        {popularInterests.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fillOpacity={selectedCareerRole ? (selectedCareerRole === entry.name ? 1 : 0.45) : 1}
                            stroke={selectedCareerRole === entry.name ? "hsl(var(--primary))" : "none"}
                            strokeWidth={2}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Score Distribution */}
                <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-8 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-accent" /> CPS Score Distribution
                      </h3>
                      <p className="text-[10px] text-muted-foreground ml-7 font-medium">Click a bar to filter institutional summary</p>
                    </div>
                    {selectedScoreRange && (
                      <Button variant="ghost" size="sm" onClick={() => setSelectedScoreRange(null)} className="h-8 text-xs font-bold text-accent hover:text-accent hover:bg-accent/10">
                        Clear
                      </Button>
                    )}
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={scoreDistribution} onClick={handleScoreClick}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                      <XAxis dataKey="range" tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 700 }} stroke="hsl(var(--border))" />
                      <YAxis tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 700 }} stroke="hsl(var(--border))" />
                      <Tooltip 
                        contentStyle={{ 
                            background: "hsl(var(--card))", 
                            border: "1px solid hsl(var(--border))", 
                            borderRadius: "12px",
                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                            fontSize: "12px",
                            fontWeight: "600"
                        }}
                        cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                      />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]} className="cursor-pointer">
                        {scoreDistribution.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            fillOpacity={selectedScoreRange ? (selectedScoreRange.label === entry.range ? 1 : 0.5) : 1}
                            stroke={selectedScoreRange?.label === entry.range ? entry.color : "none"}
                            strokeWidth={2}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="relative group space-y-4">
                <div className="flex items-center justify-between px-2">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" /> 
                      {selectedScoreRange || selectedCareerRole ? "Filtered Candidate Records" : "Institutional Talent Records"}
                    </h3>
                    <div className="flex items-center gap-2">
                       {selectedCareerRole && (
                         <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">
                           Role: {selectedCareerRole}
                         </span>
                       )}
                       {selectedScoreRange && (
                         <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-bold border border-accent/20">
                           Score: {selectedScoreRange.label}
                         </span>
                       )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[11px] font-bold text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border">
                      Viewing {filteredStudents.length} of {students.length} Total
                    </div>
                    {(selectedScoreRange || selectedCareerRole) && (
                      <Button variant="outline" size="sm" onClick={clearAllFilters} className="h-8 text-xs font-bold border-primary/20 hover:bg-primary/5">
                        Reset All
                      </Button>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {(selectedScoreRange || selectedCareerRole) && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest shadow-2xl border border-white/10"
                    >
                      <Database className="h-4 w-4" />
                      Dynamic Drill-Down Active
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <AssessmentsTable data={filteredStudents} onRowClick={setSelectedAssessment} />
              </div>
            </TabsContent>

            <TabsContent value="assessments" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <AssessmentsTable data={students} onRowClick={setSelectedAssessment} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      <AssessmentModal
        assessment={selectedAssessment}
        isOpen={!!selectedAssessment}
        onClose={() => setSelectedAssessment(null)}
      />
    </div>
  );
}
