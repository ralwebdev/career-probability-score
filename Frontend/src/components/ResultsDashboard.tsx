import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadarChart } from "./RadarChart";
import { calculateCPS, careerRoles, type AssessmentData, getCPSBand, calculateSkillGaps } from "@/lib/careerData";
import { getAssessment, type CPSScores } from "@/lib/api";
import { ArrowLeft, TrendingUp, AlertTriangle, Building2, BookOpen, Share2, Wrench } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function ScoreRing({ score, label }: { score: number; label: string }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "hsl(160, 84%, 39%)" : score >= 45 ? "hsl(42, 100%, 50%)" : "hsl(0, 84%, 60%)";

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" className="drop-shadow-lg">
        <circle cx="70" cy="70" r="54" fill="none" stroke="hsl(222, 30%, 18%)" strokeWidth="10" />
        <motion.circle
          cx="70" cy="70" r="54" fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          transform="rotate(-90 70 70)"
        />
        <text x="70" y="65" textAnchor="middle" fill={color} fontSize="28" fontWeight="bold" fontFamily="JetBrains Mono">{score}</text>
        <text x="70" y="85" textAnchor="middle" fill="hsl(215, 20%, 55%)" fontSize="11">/ 100</text>
      </svg>
      <span className="mt-2 text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function MetricCard({ label, value, max, icon }: { label: string; value: number; max: number; icon: React.ReactNode }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="rounded-xl border bg-card/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm font-medium">{icon}{label}</div>
        <span className="font-mono text-primary font-bold">{value}/{max}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
    </div>
  );
}

export function ResultsDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assessmentId = searchParams.get("id");

  const [backendData, setBackendData] = useState<{ data: AssessmentData, scores: CPSScores } | null>(null);
  const [loading, setLoading] = useState(!!assessmentId);

  const raw = sessionStorage.getItem("cps-assessment");
  const localData: AssessmentData | null = raw ? JSON.parse(raw) : null;
  const localScores = useMemo(() => localData ? calculateCPS(localData) : null, [raw]);

  useEffect(() => {
    if (assessmentId) {
      getAssessment(assessmentId)
        .then(res => {
          setBackendData({
            data: res,
            scores: res.scores
          });
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch assessment from backend:", err);
          setLoading(false);
        });
    }
  }, [assessmentId]);

  const data = backendData?.data || localData;
  const scores = backendData?.scores || localScores;
  const [simBoost, setSimBoost] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Fetching your results...</p>
      </div>
    );
  }

  if (!data || !scores) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No assessment data found.</p>
        <Button onClick={() => navigate("/assessment")}>Take Assessment</Button>
      </div>
    );
  }

  const role = careerRoles.find(r => r.name === data.careerRole);
  const skillGaps = role ? calculateSkillGaps(role.skills, data.technicalSkills) : [];
  const cpsBand = getCPSBand(scores.total);
  const trajectoryData = [
    { month: "Now", score: scores.total },
    { month: "+2 Skills", score: Math.min(100, scores.total + 10 + simBoost) },
    { month: "+Internship", score: Math.min(100, scores.total + 16 + simBoost * 2) },
    { month: "+Portfolio", score: Math.min(100, scores.total + 24 + simBoost * 3) },
  ];

  const radarData = [
    { subject: "Technical", score: scores.technical, fullMark: 30 },
    { subject: "Soft Skills", score: scores.softSkill, fullMark: 10 },
    { subject: "Communication", score: scores.communication, fullMark: 10 },
    { subject: "Emotional IQ", score: scores.ei, fullMark: 10 },
    { subject: "Experience", score: scores.experience, fullMark: 15 },
    { subject: "Portfolio", score: scores.portfolio, fullMark: 15 },
  ];

  const verdict = scores.total >= 75 ? "Highly Employable" : scores.total >= 50 ? "Moderately Ready" : "Needs Development";
  const verdictColor = scores.total >= 75 ? "text-success" : scores.total >= 50 ? "text-accent" : "text-destructive";

  const alerts: string[] = [];
  if (scores.softSkill < 4) alerts.push("⚠️ Soft Skill Development Required");
  if (scores.communication < 5) alerts.push("⚠️ Communication skill training recommended");
  if (scores.ei < 5) alerts.push("⚠️ Emotional intelligence development suggested");

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> Home
        </Button>

        {/* Hero score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-muted-foreground mb-2">Your probability of getting hired as</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary text-glow">{data.careerRole}</h1>
          {role && <p className="text-sm text-muted-foreground mt-1">{role.domain} · {role.subdomain}</p>}
          <div className="mt-6 flex justify-center flex-col items-center gap-3">
            <ScoreRing score={scores.total} label={verdict} />
            <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              cpsBand === "advanced" ? "bg-success/20 text-success border border-success/30" :
              cpsBand === "growth" ? "bg-accent/20 text-accent border border-accent/30" :
              "bg-muted text-muted-foreground border border-border"
            }`}>
              {cpsBand} Band
            </div>
          </div>
          <p className={`mt-4 text-lg font-semibold ${verdictColor}`}>{verdict}</p>
        </motion.div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="mb-8 space-y-2">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/5 px-4 py-2 text-sm text-accent">
                <AlertTriangle className="h-4 w-4 shrink-0" />{a}
              </div>
            ))}
          </div>
        )}

        {/* Score breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-3">Score Breakdown</h3>
            <MetricCard label="Technical Skills" value={scores.technical} max={30} icon={<span>💻</span>} />
            <MetricCard label="Portfolio" value={scores.portfolio} max={15} icon={<span>📁</span>} />
            <MetricCard label="Experience" value={scores.experience} max={15} icon={<span>🏢</span>} />
            <MetricCard label="Soft Skills" value={scores.softSkill} max={10} icon={<span>🤝</span>} />
            <MetricCard label="Communication" value={scores.communication} max={10} icon={<span>🗣️</span>} />
            <MetricCard label="Emotional IQ" value={scores.ei} max={10} icon={<span>🧠</span>} />
            <MetricCard label="Market Demand" value={scores.marketDemand} max={10} icon={<span>📈</span>} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Skill Radar</h3>
            <div className="rounded-xl border bg-card/50 p-4">
              <RadarChart data={radarData} />
            </div>
          </div>
        </div>

        {/* Skill Gap */}
        {skillGaps.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" /> Skill Gap Analysis
            </h3>
            <div className="rounded-xl border bg-card/50 p-6">
              <p className="text-sm text-muted-foreground mb-4">Priority skills to improve for <span className="text-primary">{data.careerRole}</span>:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillGaps.map(gap => (
                  <div key={gap.skill} className="flex items-center justify-between p-3 rounded-lg border bg-background/50">
                    <span className="text-sm font-medium">{gap.skill}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      gap.severity === "critical" ? "bg-destructive/20 text-destructive" :
                      gap.severity === "moderate" ? "bg-orange-500/20 text-orange-600" :
                      "bg-yellow-500/20 text-yellow-600"
                    }`}>
                      {gap.severity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground">Recommended by <span className="font-semibold text-accent">Red Apple Learning</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Tools for the role */}
        {role && role.tools.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" /> Tools for {data.careerRole}
            </h3>
            <div className="flex flex-wrap gap-3">
              {role.tools.map(t => (
                <div key={t} className="rounded-lg border bg-secondary/50 px-4 py-2 text-sm font-medium">{t}</div>
              ))}
            </div>
          </div>
        )}

        {/* Recruiter Intelligence */}
        {role && (
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" /> Top Recruiters Hiring {data.careerRole}s
            </h3>
            <div className="flex flex-wrap gap-3">
              {role.topRecruiters.map(r => (
                <div key={r} className="rounded-lg border bg-card/50 px-4 py-2 text-sm font-medium">{r}</div>
              ))}
            </div>
          </div>
        )}

        {/* Career Trajectory Simulator */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Career Trajectory Simulator
          </h3>
          <div className="rounded-xl border bg-card/50 p-6">
            <p className="text-sm text-muted-foreground mb-4">See how improving skills, adding internships, and building portfolio raises your score</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm">Improvement effort:</span>
              {[
                { label: "Low", val: 0 },
                { label: "Medium", val: 3 },
                { label: "High", val: 6 },
              ].map(opt => (
                <button
                  key={opt.label}
                  onClick={() => setSimBoost(opt.val)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${simBoost === opt.val ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                >{opt.label}</button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }}
                  labelStyle={{ color: "hsl(210, 40%, 96%)" }}
                />
                <Line type="monotone" dataKey="score" stroke="hsl(186, 100%, 50%)" strokeWidth={3} dot={{ fill: "hsl(186, 100%, 50%)", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* QPi Score - using document formula */}
        <div className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-6">
          <h3 className="text-lg font-semibold text-accent mb-2">QPi Score — {scores.qpi}%</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Quantified Placement Index by <span className="font-semibold">Red Apple Learning</span>
            <br />
            <span className="font-mono">QPi = 0.4×(CPS/100) + 0.3×(Demand/10) + 0.15×(Portfolio/15) + 0.15×(Skill/30)</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Placement Readiness", val: Math.round(scores.total * 0.4 / 100 * 100 * 2.5) },
              { label: "Industry Demand", val: scores.marketDemand * 10 },
              { label: "Skill Strength", val: Math.round((scores.technical / 30) * 100) },
              { label: "Portfolio Strength", val: Math.round((scores.portfolio / 15) * 100) },
            ].map(q => (
              <div key={q.label} className="text-center">
                <div className="font-mono text-2xl font-bold text-accent">{q.val}%</div>
                <div className="text-xs text-muted-foreground mt-1">{q.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button onClick={() => navigate("/report")} variant="outline" className="gap-2 px-8">
            <Share2 className="h-4 w-4" /> View Full Report
          </Button>
          {/* <Button onClick={() => navigate("/courses")} className="gradient-primary text-primary-foreground gap-2 px-8">
            <BookOpen className="h-4 w-4" /> View Recommended Courses
          </Button> */}
        </div>
      </div>
    </div>
  );
}
