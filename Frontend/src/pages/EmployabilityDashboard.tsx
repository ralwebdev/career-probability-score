import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, BarChart3, TrendingUp, Search, Filter, GraduationCap,
  ShieldCheck, Flame, Zap, Snowflake, Target, BookOpen, Building2,
  ArrowRight, ChevronRight, LogOut, BriefcaseBusiness, AlertTriangle,
  Lightbulb, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadarChart } from "@/components/RadarChart";
import { useQuery } from "@tanstack/react-query";
import { getCollegeStudents } from "@/lib/api";
import {
  type CollegeUser,
  type StudentRecord
} from "@/lib/collegeAuthData";

function getEmployabilityLabel(cps: number) {
  if (cps > 70) return { label: "High Employability", color: "text-success", icon: Flame, bg: "bg-success/10" };
  if (cps >= 40) return { label: "Moderate", color: "text-warning", icon: Zap, bg: "bg-warning/10" };
  return { label: "Needs Improvement", color: "text-destructive", icon: Snowflake, bg: "bg-destructive/10" };
}

function getReadinessInfo(r: string) {
  if (r === "Ready for Placement") return { icon: "🔥", color: "text-success", bg: "bg-success/10 border-success/20" };
  if (r === "Needs Training") return { icon: "⚡", color: "text-warning", bg: "bg-warning/10 border-warning/20" };
  return { icon: "❄️", color: "text-destructive", bg: "bg-destructive/10 border-destructive/20" };
}

function StatCard({ label, value, icon, sub }: { label: string; value: string | number; icon: React.ReactNode; sub?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="rounded-lg bg-primary/10 p-1.5">{icon}</div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold font-mono">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}

function StudentDetailPanel({ student, onClose }: { student: StudentRecord; onClose: () => void }) {
  const emp = getEmployabilityLabel(student.cpsScore);
  const readiness = getReadinessInfo(student.placementReadiness);
  const radarData = [
    { subject: "Technical", score: student.dimensions.technical, fullMark: 100 },
    { subject: "Analytical", score: student.dimensions.analytical, fullMark: 100 },
    { subject: "Communication", score: student.dimensions.communication, fullMark: 100 },
    { subject: "Emotional Int.", score: student.dimensions.emotional_intelligence, fullMark: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold">{student.name}</h2>
          <p className="text-xs text-muted-foreground">{student.course} · {student.department} · Year {student.year}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-xs">← Back</Button>
      </div>

      {/* CPS + Employability + Readiness */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-[10px] text-muted-foreground mb-1">CPS Score</p>
          <p className="text-3xl font-bold text-primary">{student.cpsScore}</p>
        </div>
        <div className={`rounded-xl border p-4 text-center ${emp.bg}`}>
          <p className="text-[10px] text-muted-foreground mb-1">Employability</p>
          <p className={`text-sm font-bold ${emp.color}`}>{emp.label}</p>
        </div>
        <div className={`rounded-xl border p-4 text-center ${readiness.bg}`}>
          <p className="text-[10px] text-muted-foreground mb-1">Placement</p>
          <p className={`text-sm font-bold ${readiness.color}`}>
            {readiness.icon} {student.placementReadiness}
          </p>
        </div>
      </div>

      {/* CPS Breakdown Radar */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" /> CPS Breakdown
        </h3>
        <RadarChart data={radarData} />
        <div className="grid grid-cols-4 gap-2 mt-3">
          {radarData.map(d => (
            <div key={d.subject} className="text-center">
              <p className="text-[10px] text-muted-foreground">{d.subject}</p>
              <p className="text-sm font-bold">{d.score}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CPS Trend */}
      {student.cpsHistory.length > 1 && (
        <div className="rounded-xl border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Employability Trend
          </h3>
          <div className="flex items-end gap-2 h-16">
            {student.cpsHistory.map((score, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-mono font-bold">{score}</span>
                <div
                  className="w-full rounded-t gradient-primary transition-all"
                  style={{ height: `${(score / 100) * 48}px` }}
                />
                <span className="text-[9px] text-muted-foreground">#{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Career Alignment */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" /> Career Alignment
        </h3>
        <div className="mb-3">
          <p className="text-[10px] text-muted-foreground mb-1.5">Top Career Domains</p>
          <div className="flex flex-wrap gap-1.5">
            {student.topCareerDomains.map(d => (
              <Badge key={d} variant="secondary" className="text-[10px]">{d}</Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground mb-1.5">Top Career Roles</p>
          <div className="space-y-1.5">
            {student.topCareerRoles.map(r => (
              <div key={r.role} className="flex items-center justify-between rounded-lg border px-3 py-2">
                <span className="text-xs font-medium">{r.role}</span>
                <Badge variant="outline" className={`text-[9px] ${
                  r.fit === "High" ? "border-success/40 text-success" :
                  r.fit === "Medium" ? "border-warning/40 text-warning" :
                  "border-destructive/40 text-destructive"
                }`}>{r.fit} Fit</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Gaps */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" /> Skill Gap Identification
        </h3>
        <div className="space-y-2">
          {student.skillGaps.map(g => (
            <div key={g.skill} className="flex items-center justify-between">
              <span className="text-xs font-medium">{g.skill}</span>
              <Badge variant="outline" className={`text-[9px] ${
                g.level === "High" ? "border-destructive/40 text-destructive" :
                g.level === "Medium" ? "border-warning/40 text-warning" :
                "border-success/40 text-success"
              }`}>{g.level} Gap</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Mapping */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" /> Likely Hiring Industries
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {student.likelyIndustries.map(ind => (
            <Badge key={ind} variant="outline" className="text-[10px]">{ind}</Badge>
          ))}
        </div>
      </div>

      {/* Training Recommendations */}
      <div className="rounded-xl border bg-card p-4">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" /> Suggested Training Path
        </h3>
        <div className="space-y-1.5">
          {student.suggestedTraining.map((t, i) => (
            <div key={t} className="flex items-center gap-2 text-xs">
              <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">{i + 1}</span>
              {t}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BatchAnalytics({ students }: { students: StudentRecord[] }) {
  const avgCPS = Math.round(students.reduce((s, st) => s + st.cpsScore, 0) / students.length);
  const readyPct = Math.round((students.filter(s => s.placementReadiness === "Ready for Placement").length / students.length) * 100);
  const needsTrainingPct = Math.round((students.filter(s => s.placementReadiness === "Needs Training").length / students.length) * 100);
  const notReadyPct = 100 - readyPct - needsTrainingPct;

  // Top skill gaps across batch
  const gapCount: Record<string, number> = {};
  students.forEach(s => s.skillGaps.forEach(g => {
    if (g.level === "High" || g.level === "Medium") {
      gapCount[g.skill] = (gapCount[g.skill] || 0) + 1;
    }
  }));
  const topGaps = Object.entries(gapCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Department breakdown
  const deptStats: Record<string, { count: number; avgCPS: number; ready: number }> = {};
  students.forEach(s => {
    if (!deptStats[s.department]) deptStats[s.department] = { count: 0, avgCPS: 0, ready: 0 };
    deptStats[s.department].count++;
    deptStats[s.department].avgCPS += s.cpsScore;
    if (s.placementReadiness === "Ready for Placement") deptStats[s.department].ready++;
  });

  const interventions: string[] = [];
  if (topGaps.length > 0) {
    const weakPct = Math.round((topGaps[0][1] / students.length) * 100);
    interventions.push(`${weakPct}% students weak in ${topGaps[0][0]} → Conduct targeted workshops`);
  }
  if (notReadyPct > 20) interventions.push(`${notReadyPct}% not placement-ready → Add technical bootcamps`);
  if (topGaps.find(g => g[0].toLowerCase().includes("communication"))) {
    interventions.push("Communication gap detected → Add mock interviews & presentation drills");
  }
  interventions.push("Schedule industry guest lectures for career exposure");

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" /> Batch / Class Analytics
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Average CPS" value={avgCPS} icon={<BarChart3 className="h-4 w-4 text-primary" />} />
        <StatCard label="Placement Ready" value={`${readyPct}%`} icon={<Flame className="h-4 w-4 text-success" />} sub={`${students.filter(s => s.placementReadiness === "Ready for Placement").length} students`} />
        <StatCard label="Needs Training" value={`${needsTrainingPct}%`} icon={<Zap className="h-4 w-4 text-warning" />} />
        <StatCard label="Not Ready" value={`${notReadyPct}%`} icon={<Snowflake className="h-4 w-4 text-destructive" />} />
      </div>

      {/* Department Breakdown */}
      <div className="rounded-xl border bg-card p-4">
        <h4 className="text-xs font-semibold mb-3">Department Breakdown</h4>
        <div className="space-y-3">
          {Object.entries(deptStats).map(([dept, stats]) => {
            const avg = Math.round(stats.avgCPS / stats.count);
            const readyRate = Math.round((stats.ready / stats.count) * 100);
            return (
              <div key={dept}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{dept}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {stats.count} students · Avg CPS {avg} · {readyRate}% ready
                  </span>
                </div>
                <Progress value={avg} className="h-2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Skill Gaps */}
      <div className="rounded-xl border bg-card p-4">
        <h4 className="text-xs font-semibold mb-3">Top Skill Gaps Across Batch</h4>
        <div className="space-y-2">
          {topGaps.map(([skill, count]) => {
            const pct = Math.round((count / students.length) * 100);
            return (
              <div key={skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{skill}</span>
                  <span className="text-[10px] text-muted-foreground">{pct}% students affected</span>
                </div>
                <Progress value={pct} className="h-2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Intervention Suggestions */}
      <div className="rounded-xl border bg-card p-4">
        <h4 className="text-xs font-semibold mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-accent" /> Intervention Suggestions
        </h4>
        <div className="space-y-2">
          {interventions.map((int, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <ArrowRight className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
              <span>{int}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EmployabilityDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<CollegeUser | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [readinessFilter, setReadinessFilter] = useState("all");
  const [view, setView] = useState<"students" | "analytics">("students");
  const [studentViewMode, setStudentViewMode] = useState<"snippet" | "list">("snippet");

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

  if (!user) return null;

  const departments = [...new Set(students.map((s: StudentRecord) => s.department))];

  const filtered = students.filter((s: StudentRecord) => {
    const matchSearch = search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || s.department === deptFilter;
    const matchReadiness = readinessFilter === "all" || s.placementReadiness === readinessFilter;
    return matchSearch && matchDept && matchReadiness;
  });

  const handleLogout = () => {
    sessionStorage.removeItem("collegeUser");
    navigate("/college-login");
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-background text-foreground">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Student Employability Intelligence System</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="h-3 w-3" />
                  {user.name} · {user.collegeId} · {user.role === "admin" ? "College Administrator" : "Faculty Account"}
                </p>

              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1 text-xs">
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
        </motion.div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setView("students"); setSelectedStudent(null); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
              view === "students" ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <Users className="h-4 w-4" /> Students
          </button>
          <button
            onClick={() => { setView("analytics"); setSelectedStudent(null); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
              view === "analytics" ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <BarChart3 className="h-4 w-4" /> Batch Analytics
          </button>
          {view === "students" && (
            <div className="ml-auto flex items-center gap-1 rounded-lg border bg-card p-1">
              <button
                onClick={() => setStudentViewMode("snippet")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  studentViewMode === "snippet" ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setStudentViewMode("list")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  studentViewMode === "list" ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                List
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 opacity-50">
             <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
             <p className="text-xs font-bold uppercase tracking-widest text-primary">Fetching Batch Analytics...</p>
          </div>
        ) : error ? (
           <div className="p-10 text-center text-destructive">
              <AlertTriangle className="h-8 w-8 mx-auto mb-3 opacity-50" />
              Failed to fetch records. 
           </div>
        ) : view === "analytics" ? (
          <BatchAnalytics students={students} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Student List */}
            <div className={`${selectedStudent ? "lg:col-span-4" : "lg:col-span-12"}`}>
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Search student or course..." className="pl-8 h-9 text-xs" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select
                  className="rounded-lg border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                  value={deptFilter}
                  onChange={e => setDeptFilter(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select
                  className="rounded-lg border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                  value={readinessFilter}
                  onChange={e => setReadinessFilter(e.target.value)}
                >
                  <option value="all">All Readiness</option>
                  <option value="Ready for Placement">🔥 Ready</option>
                  <option value="Needs Training">⚡ Needs Training</option>
                  <option value="Not Ready">❄️ Not Ready</option>
                </select>
              </div>

              <p className="text-[10px] text-muted-foreground mb-3">{filtered.length} students</p>

              {/* Student Cards / List */}
              {studentViewMode === "list" && !selectedStudent ? (
                <div className="rounded-xl border bg-card overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="p-3 text-left text-xs text-muted-foreground font-medium">Name</th>
                        <th className="p-3 text-left text-xs text-muted-foreground font-medium hidden sm:table-cell">Course</th>
                        <th className="p-3 text-left text-xs text-muted-foreground font-medium hidden md:table-cell">Department</th>
                        <th className="p-3 text-left text-xs text-muted-foreground font-medium">CPS</th>
                        <th className="p-3 text-left text-xs text-muted-foreground font-medium hidden lg:table-cell">Readiness</th>
                        <th className="p-3 text-left text-xs text-muted-foreground font-medium hidden lg:table-cell">Skill Gaps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(s => {
                        const emp = getEmployabilityLabel(s.cpsScore);
                        const readiness = getReadinessInfo(s.placementReadiness);
                        return (
                          <tr key={s.id} onClick={() => setSelectedStudent(s)} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="h-7 w-7 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold shrink-0">{s.name.charAt(0)}</div>
                                <div>
                                  <p className="text-xs font-medium">{s.name}</p>
                                  <p className="text-[10px] text-muted-foreground">Year {s.year}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-xs text-muted-foreground hidden sm:table-cell">{s.course}</td>
                            <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{s.department}</td>
                            <td className="p-3">
                              <span className={`text-sm font-bold ${emp.color}`}>{s.cpsScore}</span>
                            </td>
                            <td className="p-3 hidden lg:table-cell">
                              <Badge variant="outline" className={`text-[9px] ${readiness.bg} ${readiness.color}`}>
                                {readiness.icon} {s.placementReadiness}
                              </Badge>
                            </td>
                            <td className="p-3 hidden lg:table-cell">
                              <div className="flex flex-wrap gap-1">
                                {s.skillGaps.filter(g => g.level === "High").map(g => (
                                  <span key={g.skill} className="rounded-full bg-destructive/10 text-destructive px-2 py-0.5 text-[9px]">{g.skill} ↓</span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {filtered.length === 0 && <div className="text-center p-8 text-xs text-muted-foreground">No students match your filters.</div>}
                </div>
              ) : (
                <div className={`space-y-2 ${selectedStudent ? "max-h-[70vh] overflow-y-auto pr-1" : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"}`}>
                  {filtered.map(s => {
                    const emp = getEmployabilityLabel(s.cpsScore);
                    const readiness = getReadinessInfo(s.placementReadiness);
                    const EmpIcon = emp.icon;
                    return (
                      <motion.div
                        key={s.id}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setSelectedStudent(s)}
                        className={`rounded-xl border bg-card p-3 cursor-pointer transition-all hover:border-primary/30 ${
                          selectedStudent?.id === s.id ? "border-primary ring-1 ring-primary/20" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                              {s.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold truncate">{s.name}</p>
                              <p className="text-[10px] text-muted-foreground truncate">{s.course} · Year {s.year}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-lg font-bold text-primary">{s.cpsScore}</p>
                            <p className="text-[9px] text-muted-foreground">CPS</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <EmpIcon className={`h-3 w-3 ${emp.color}`} />
                            <span className={`text-[10px] font-medium ${emp.color}`}>{emp.label}</span>
                          </div>
                          <Badge variant="outline" className={`text-[9px] ${readiness.bg} ${readiness.color}`}>
                            {readiness.icon} {s.placementReadiness.split(" ")[0]}
                          </Badge>
                        </div>
                        {!selectedStudent && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {s.skillGaps.filter(g => g.level === "High").map(g => (
                              <span key={g.skill} className="rounded-full bg-destructive/10 text-destructive px-2 py-0.5 text-[9px]">
                                {g.skill} ↓
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Panel - Student Detail */}
            <AnimatePresence mode="wait">
              {selectedStudent && (
                <div className="lg:col-span-8">
                  <StudentDetailPanel
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
