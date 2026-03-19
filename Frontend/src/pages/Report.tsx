import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { calculateCPS, careerRoles, type AssessmentData } from "@/lib/careerData";
import { getRecommendedCourses } from "@/lib/courseData";
import { marketSignals } from "@/lib/marketSignalData";
import { ArrowLeft, Download, FileText, TrendingUp, BookOpen, Building2, AlertTriangle, Award } from "lucide-react";

export default function Report() {
  const navigate = useNavigate();
  const raw = sessionStorage.getItem("cps-assessment");
  const data: AssessmentData | null = raw ? JSON.parse(raw) : null;
  const scores = useMemo(() => data ? calculateCPS(data) : null, [raw]);

  if (!data || !scores) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No assessment data found.</p>
        <Button onClick={() => navigate("/assessment")}>Take Assessment</Button>
      </div>
    );
  }

  const role = careerRoles.find(r => r.name === data.careerRole);
  const missingSkills = (role?.skills ?? []).filter(s => (data.technicalSkills[s] ?? 0) < 2);
  const signal = marketSignals.find(s => s.career === data.careerRole);
  const recommendedCourses = getRecommendedCourses(missingSkills, role?.domain ?? "", data.careerRole);
  const verdict = scores.total >= 75 ? "Highly Employable" : scores.total >= 50 ? "Moderately Ready" : "Needs Development";

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen px-4 py-8 print:py-2 print:px-2">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Button variant="ghost" onClick={() => navigate("/results")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Results
          </Button>
          <Button onClick={handlePrint} className="gradient-primary text-primary-foreground gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="text-center mb-8 rounded-xl border bg-card/50 p-8">
            <div className="inline-flex items-center gap-2 text-primary mb-3">
              <FileText className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wider">Career Intelligence Report</span>
            </div>
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <p className="text-muted-foreground text-sm mt-1">{data.email} · {data.city}, {data.state}</p>
            <div className="mt-4 inline-block rounded-full gradient-primary px-6 py-2">
              <span className="font-mono text-2xl font-bold text-primary-foreground">{scores.total}</span>
              <span className="text-primary-foreground/70 text-sm ml-1">/100 CPS</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-primary">{verdict}</p>
          </div>

          {/* Profile */}
          <Section icon={<Award className="h-5 w-5 text-primary" />} title="Profile Summary">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Target Career" value={data.careerRole} />
              <Info label="Domain" value={role?.domain ?? data.careerDomain} />
              <Info label="Subdomain" value={role?.subdomain ?? "—"} />
              <Info label="QPi Score" value={`${scores.qpi}%`} />
              <Info label="Education" value={`${data.educationLevel} — ${data.fieldOfStudy}`} />
              <Info label="Location" value={`${data.city}, ${data.country}`} />
              <Info label="Portfolio" value={data.portfolioLevel === "none" ? "None" : data.portfolioLevel === "basic" ? "Basic" : "Strong"} />
            </div>
          </Section>

          {/* Score Breakdown */}
          <Section icon={<TrendingUp className="h-5 w-5 text-primary" />} title="Score Breakdown">
            <div className="space-y-2">
              {[
                { label: "Technical Skills", val: scores.technical, max: 30 },
                { label: "Portfolio", val: scores.portfolio, max: 15 },
                { label: "Experience", val: scores.experience, max: 15 },
                { label: "Soft Skills", val: scores.softSkill, max: 10 },
                { label: "Communication", val: scores.communication, max: 10 },
                { label: "Emotional Intelligence", val: scores.ei, max: 10 },
                { label: "Market Demand", val: scores.marketDemand, max: 10 },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="text-sm w-40">{s.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full gradient-primary" style={{ width: `${(s.val / s.max) * 100}%` }} />
                  </div>
                  <span className="font-mono text-xs w-12 text-right">{s.val}/{s.max}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Skill Gaps */}
          {missingSkills.length > 0 && (
            <Section icon={<AlertTriangle className="h-5 w-5 text-accent" />} title="Skill Gap Analysis">
              <div className="flex flex-wrap gap-2">
                {missingSkills.map(s => (
                  <span key={s} className="rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">{s}</span>
                ))}
              </div>
            </Section>
          )}

          {/* Market Signal */}
          {signal && (
            <Section icon={<TrendingUp className="h-5 w-5 text-primary" />} title="Market Intelligence">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
                <Info label="Demand Index" value={`${signal.demandIndex}/10`} />
                <Info label="Active Jobs" value={signal.activeListings.toLocaleString()} />
                <Info label="Growth" value={signal.growthTrend} />
                <Info label="Avg Salary" value={signal.avgSalary} />
              </div>
            </Section>
          )}

          {/* Top Recruiters */}
          {role && (
            <Section icon={<Building2 className="h-5 w-5 text-primary" />} title="Top Recruiters">
              <div className="flex flex-wrap gap-2">
                {role.topRecruiters.map(r => (
                  <span key={r} className="rounded-lg border bg-secondary/50 px-3 py-1.5 text-xs font-medium">{r}</span>
                ))}
              </div>
            </Section>
          )}

          {/* Recommended Courses */}
          {recommendedCourses.length > 0 && (
            <Section icon={<BookOpen className="h-5 w-5 text-primary" />} title="Recommended Courses">
              <div className="space-y-2">
                {recommendedCourses.slice(0, 5).map(c => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <div className="text-sm font-medium">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.provider} · {c.duration} · {c.price}</div>
                    </div>
                    {c.providerType === "redapple" && (
                      <span className="rounded-full gradient-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">⭐ Recommended</span>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-muted-foreground border-t pt-4">
            <p>Career Intelligence Report powered by <span className="font-semibold text-accent">Red Apple Learning Pvt. Ltd.</span></p>
            <p className="mt-1">Generated on {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border bg-card/50 p-6">
      <h3 className="text-base font-semibold mb-4 flex items-center gap-2">{icon}{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium text-sm capitalize">{value}</div>
    </div>
  );
}
