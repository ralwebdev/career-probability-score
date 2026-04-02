import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCourseById as getMockCourseById, getCollegeForCourse } from "@/lib/collegeCourseData";
import { getApiCourseById } from "@/lib/api";
import { calculateCPS, careerRoles, type AssessmentData } from "@/lib/careerData";
import {
  Target, TrendingUp, AlertTriangle, BookOpen, Wrench, FolderOpen,
  Clock, MapPin, IndianRupee, GraduationCap, Building2, Image as ImageIcon,
  Info, Briefcase, Building, BarChart3, MessageSquare, Timer, PiggyBank,
  Phone, MessageCircle, Star, ChevronRight, Shield, Award, Users, Zap,
  CheckCircle2, XCircle, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import {
  MicroCommitmentCTA,
  ExitIntentPopup,
  ScrollNudge,
  InlineLeadCapture,
  FloatingCTABar,
} from "@/components/LeadCapture";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.section id={id} {...fadeUp} className={`mb-12 ${className}`}>
      {children}
    </motion.section>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="rounded-lg bg-primary/10 p-2">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-muted-foreground ml-12">{subtitle}</p>}
    </div>
  );
}

export default function CourseLanding() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const college = getCollegeForCourse(courseId || "");
  const [galleryFilter, setGalleryFilter] = useState<string>("all");

  const raw = sessionStorage.getItem("cps-assessment");
  const userData: AssessmentData | null = raw ? JSON.parse(raw) : null;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (courseId) {
          const data = await getApiCourseById(courseId);
          if (data) {
            setCourse(data);
          } else {
            setCourse(getMockCourseById(courseId));
          }
        }
      } catch (error) {
        console.error("Failed to fetch course from API, using mock data", error);
        if (courseId) {
          setCourse(getMockCourseById(courseId));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course || !college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <p className="text-muted-foreground">The requested course doesn't exist.</p>
          <Button className="mt-4" asChild><a href="/courses">Browse Courses</a></Button>
        </div>
      </div>
    );
  }

  // Use the SAME calculateCPS function as Results page for consistency
  const scores = userData ? calculateCPS(userData) : null;
  const role = userData ? careerRoles.find(r => r.name === userData.careerRole) : null;
  const isRedApple = college?.id === "redapple" || (course && course.providerType === "redapple");

  const userName = userData?.careerRole ? "You" : "Student";
  const careerRole = userData?.careerRole || course.careerRoles[0];
  const currentCPS = scores?.total ?? 42;
  const currentQPi = scores?.qpi ?? 35;
  const projectedCPS = Math.min(currentCPS + 28, 95);
  const projectedQPi = Math.min(currentQPi + 20, 90);
  const gapCoverage = Math.round((course.skillsCovered.length / Math.max(course.skillsCovered.length + 2, 1)) * 100);

  // Skill gap analysis — use actual scores breakdown
  const weakSkills = userData && role
    ? course.skillsCovered.filter(s => (userData.technicalSkills[s] ?? 0) < 2)
    : course.skillsCovered.slice(0, 5);

  const strongSkills = userData && role
    ? course.skillsCovered.filter(s => (userData.technicalSkills[s] ?? 0) >= 2)
    : course.skillsCovered.slice(5);

  // Score breakdowns for dynamic display
  const technicalPct = scores ? Math.round((scores.technical / 30) * 100) : 40;
  const softSkillPct = scores ? Math.round((scores.softSkill / 10) * 100) : 50;
  const portfolioPct = scores ? Math.round((scores.portfolio / 15) * 100) : 30;
  const experiencePct = scores ? Math.round((scores.experience / 15) * 100) : 25;

  const savings = course.marketPrice - course.coursePrice;
  const savingsPercent = Math.round((savings / course.marketPrice) * 100);

  const filteredGallery = galleryFilter === "all"
    ? college.galleryImages
    : college.galleryImages.filter(img => img.category === galleryFilter);

  return (
    <div className="min-h-screen pb-16">
      {/* ===== BEHAVIORAL: Exit-Intent Popup ===== */}
      {isRedApple && <ExitIntentPopup courseTitle={course.title} coursePrice={course.coursePrice} careerRole={careerRole} />}

      {/* ===== BEHAVIORAL: Scroll-triggered nudge ===== */}
      {isRedApple && <ScrollNudge courseTitle={course.title} seatsLeft={course.seatsLeft} />}

      {/* ===== SECTION 1: HERO ===== */}
      <section className="gradient-hero py-12 sm:py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp}>
            <Badge className="mb-4 gradient-primary text-primary-foreground">
              <Zap className="h-3 w-3 mr-1" /> Personalized for {userName}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              This is the Fastest Path for You to Become a{" "}
              <span className="text-primary">{careerRole}</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
              {scores
                ? `Your CPS is ${currentCPS}/100 and QPi is ${currentQPi}%. This program can boost your placement readiness significantly.`
                : "Take the assessment first to see your personalized career metrics, or explore this program below."}
            </p>

            {/* CPS & QPi Metrics — synced with Results page */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mb-8">
              <div className="rounded-xl border bg-card p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Your CPS</p>
                <p className="text-2xl font-bold font-mono-data text-destructive">{currentCPS}</p>
                <p className="text-[9px] text-muted-foreground">/100</p>
              </div>
              <div className="rounded-xl border bg-card p-4 text-center border-primary/30">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">After Course</p>
                <p className="text-2xl font-bold font-mono-data text-primary">{projectedCPS}</p>
                <p className="text-[9px] text-primary">+{projectedCPS - currentCPS} pts</p>
              </div>
              <div className="rounded-xl border bg-card p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Your QPi</p>
                <p className="text-2xl font-bold font-mono-data text-accent">{currentQPi}%</p>
                <p className="text-[9px] text-muted-foreground">Placement Index</p>
              </div>
              <div className="rounded-xl border bg-card p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Gap Coverage</p>
                <p className="text-2xl font-bold font-mono-data text-success">{gapCoverage}%</p>
                <p className="text-[9px] text-muted-foreground">Skills covered</p>
              </div>
            </div>

            {/* Score breakdown chips */}
            {scores && (
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="text-[10px] gap-1">💻 Technical: {scores.technical}/30</Badge>
                <Badge variant="outline" className="text-[10px] gap-1">📁 Portfolio: {scores.portfolio}/15</Badge>
                <Badge variant="outline" className="text-[10px] gap-1">🏢 Experience: {scores.experience}/15</Badge>
                <Badge variant="outline" className="text-[10px] gap-1">🤝 Soft Skills: {scores.softSkill}/10</Badge>
                <Badge variant="outline" className="text-[10px] gap-1">📈 Demand: {scores.marketDemand}/10</Badge>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {isRedApple ? (
                <>
                  <Button size="lg" className="gradient-primary text-primary-foreground gap-2"
                    onClick={() => document.getElementById("lead-capture-main")?.scrollIntoView({ behavior: "smooth" })}>
                    <Target className="h-4 w-4" /> Get Personalized Career Plan
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2"
                    onClick={() => document.getElementById("lead-capture-main")?.scrollIntoView({ behavior: "smooth" })}>
                    <Phone className="h-4 w-4" /> Talk to Senior Counselor
                  </Button>
                </>
              ) : (
                <Button size="lg" className="gradient-primary text-primary-foreground gap-2" asChild>
                  <a href={course.url} target="_blank" rel="noopener noreferrer">
                    <Target className="h-4 w-4" /> Visit Course Website <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* ===== SECTION 2: CAREER DIAGNOSIS ===== */}
        <Section id="diagnosis">
          <SectionTitle icon={<AlertTriangle className="h-5 w-5 text-accent" />} title="Your Career Diagnosis" subtitle="Where you stand vs. where you need to be" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {weakSkills.map(skill => (
              <div key={skill} className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                <XCircle className="h-4 w-4 text-destructive shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{skill}</p>
                  <p className="text-[10px] text-muted-foreground">Needs improvement</p>
                </div>
                <Badge variant="destructive" className="text-[10px]">Weak</Badge>
              </div>
            ))}
            {strongSkills.map(skill => (
              <div key={skill} className="flex items-center gap-3 rounded-lg border border-success/20 bg-success/5 p-3">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{skill}</p>
                  <p className="text-[10px] text-muted-foreground">You're on track</p>
                </div>
                <Badge className="text-[10px] bg-success/10 text-success border-success/30">Strong</Badge>
              </div>
            ))}
          </div>

          {/* ===== BEHAVIORAL: Inline lead capture after diagnosis (reciprocity) ===== */}
          {isRedApple && <InlineLeadCapture careerRole={careerRole} />}
        </Section>

        {/* ===== SECTION 3: WHY THIS COURSE ===== */}
        <Section id="why-this-course">
          <SectionTitle icon={<Target className="h-5 w-5 text-primary" />} title="Why This Course" subtitle="This program helps you build exactly what you're missing" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {weakSkills.map(skill => (
              <div key={skill} className="rounded-xl border bg-card p-4 flex items-start gap-3 hover-lift">
                <div className="rounded-lg bg-primary/10 p-1.5"><Zap className="h-4 w-4 text-primary" /></div>
                <div>
                  <p className="font-semibold text-sm">{skill}</p>
                  <p className="text-[10px] text-muted-foreground">Covered in this program</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== SECTION 4: COURSE BREAKDOWN ===== */}
        <Section id="course-breakdown">
          <SectionTitle icon={<BookOpen className="h-5 w-5 text-primary" />} title="Course Breakdown" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-semibold">{course.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Mode</p>
                <p className="text-sm font-semibold capitalize">{course.mode}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Schedule</p>
                <p className="text-sm font-semibold capitalize">{course.schedule}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Projects</p>
                <p className="text-sm font-semibold">{course.projects.length} Real-World Projects</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {course.modules.map((mod, i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold">{i + 1}</span>
                  <h4 className="font-semibold text-sm">{mod.name}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 ml-8">
                  {mod.topics.map(t => (
                    <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] text-secondary-foreground">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-semibold text-sm">Tools & Technologies</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.tools.map(t => (
                <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== BEHAVIORAL: MAIN LEAD CAPTURE (Micro-commitment ladder) ===== */}
        {isRedApple && (
          <div id="lead-capture-main">
            <Section id="get-started">
              <SectionTitle icon={<Target className="h-5 w-5 text-primary" />} title="Get Your Free Career Report" subtitle="Takes 30 seconds — unlock your personalized roadmap" />
              <MicroCommitmentCTA
                courseTitle={course.title}
                careerRole={careerRole}
                currentCPS={currentCPS}
                projectedCPS={projectedCPS}
              />
            </Section>
          </div>
        )}

        {/* ===== SECTION 5: PRICE COMPARISON ===== */}
        <Section id="pricing">
          <SectionTitle icon={<IndianRupee className="h-5 w-5 text-primary" />} title="Expected Investment & ROI" subtitle="Transparent pricing with guaranteed value" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border bg-card p-5 text-center">
              <p className="text-xs text-muted-foreground mb-1">Market Average</p>
              <p className="text-2xl font-bold font-mono-data line-through text-muted-foreground">₹{course.marketPrice.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border-2 border-primary bg-primary/5 p-5 text-center relative">
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 gradient-primary text-primary-foreground text-[10px]">
                Save {savingsPercent}%
              </Badge>
              <p className="text-xs text-muted-foreground mb-1">This Course</p>
              <p className="text-3xl font-bold font-mono-data text-primary">₹{course.coursePrice.toLocaleString()}</p>
            </div>
            <div className="rounded-xl border bg-card p-5 text-center">
              <p className="text-xs text-muted-foreground mb-1">Expected Salary</p>
              <p className="text-2xl font-bold font-mono-data text-success">{course.expectedSalary}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <div className="rounded-lg border bg-card p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">EMI Options</p>
              <p className="text-xs font-medium mt-1">{course.emiOptions}</p>
            </div>
            <div className="rounded-lg border bg-card p-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Scholarships</p>
              <p className="text-xs font-medium mt-1">{course.scholarships}</p>
            </div>
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-3">
              <p className="text-[10px] text-accent uppercase tracking-wider font-semibold">Limited Offer 🔥</p>
              <p className="text-xs font-medium mt-1">{course.limitedOffer}</p>
            </div>
          </div>
        </Section>

        {/* ===== SECTION 6: COLLEGE PROFILE ===== */}
        {/* <Section id="college-profile">
          <SectionTitle icon={<Building2 className="h-5 w-5 text-primary" />} title={college.name} subtitle={college.location} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="rounded-lg border bg-card p-3 text-center">
              <p className="text-[10px] text-muted-foreground">Established</p>
              <p className="text-lg font-bold font-mono-data">{college.established}</p>
            </div>
            <div className="rounded-lg border bg-card p-3 text-center">
              <p className="text-[10px] text-muted-foreground">Experience</p>
              <p className="text-lg font-bold font-mono-data">{2026 - college.established}+ Years</p>
            </div>
            <div className="rounded-lg border bg-card p-3 text-center col-span-2">
              <p className="text-[10px] text-muted-foreground">Accreditation</p>
              <div className="flex flex-wrap gap-1 justify-center mt-1">
                {college.accreditation.map(a => (
                  <Badge key={a} variant="secondary" className="text-[9px]">{a}</Badge>
                ))}
              </div>
            </div>
          </div>
          <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Faculty Highlights</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {college.facultyHighlights.map((f, i) => (
              <div key={i} className="rounded-lg border bg-card p-3">
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="text-[10px] text-primary font-medium">{f.designation}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{f.expertise}</p>
              </div>
            ))}
          </div>
        </Section> */}

        {/* ===== SECTION 7: GALLERY ===== */}
        {/* <Section id="gallery">
          <SectionTitle icon={<ImageIcon className="h-5 w-5 text-primary" />} title="Campus Gallery" />
          <div className="flex gap-2 mb-4">
            {["all", "campus", "classrooms", "labs", "events"].map(cat => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all capitalize ${galleryFilter === cat ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredGallery.map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden aspect-video bg-muted">
                <img src={img.url} alt={img.category} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
              </div>
            ))}
          </div>
        </Section> */}

        {/* ===== SECTION 8: ABOUT INSTITUTE ===== */}
        {/* <Section id="about">
          <SectionTitle icon={<Info className="h-5 w-5 text-primary" />} title="About the Institute" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border bg-card p-5">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Target className="h-4 w-4 text-primary" /> Vision</h4>
              <p className="text-sm text-muted-foreground">{college.vision}</p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Mission</h4>
              <p className="text-sm text-muted-foreground">{college.mission}</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border bg-card p-5">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Award className="h-4 w-4 text-accent" /> Achievements</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {college.achievements.map((a, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-xl border bg-card p-5">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Building className="h-4 w-4 text-primary" /> Industry Collaborations</h4>
            <div className="flex flex-wrap gap-2">
              {college.industryCollaborations.map(c => (
                <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
              ))}
            </div>
          </div>
        </Section> */}

        {/* ===== SECTION 9: CAREER OUTCOMES ===== */}
        <Section id="outcomes">
          <SectionTitle icon={<Briefcase className="h-5 w-5 text-primary" />} title="Career Outcomes" subtitle="Where this program can take you" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {course.careerOutcomes.map((co, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 hover-lift">
                <h4 className="font-semibold text-sm mb-2">{co.role}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Salary Range</p>
                    <p className="text-sm font-bold font-mono-data text-primary">{co.salaryRange}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Growth</p>
                    <p className="text-xs text-muted-foreground">{co.growthTrajectory}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== SECTION 10: RECRUITERS ===== */}
        <Section id="recruiters">
          <SectionTitle icon={<Building className="h-5 w-5 text-primary" />} title="Top Recruiters" subtitle="Companies hiring in this domain" />
          <div className="flex flex-wrap gap-3">
            {college.recruiters.map(r => (
              <div key={r} className="rounded-xl border bg-card px-5 py-3 text-sm font-medium hover-lift">{r}</div>
            ))}
          </div>
        </Section>

        {/* ===== SECTION 11: BEFORE vs AFTER ===== */}
        <Section id="comparison">
          <SectionTitle icon={<BarChart3 className="h-5 w-5 text-primary" />} title="Before vs After" subtitle="Your scores now vs. projected after completing this course" />
          <div className="rounded-xl border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="p-3 text-left text-muted-foreground font-medium text-xs">Metric</th>
                  <th className="p-3 text-center text-destructive font-medium text-xs">Now</th>
                  <th className="p-3 text-center text-success font-medium text-xs">After Course</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium text-xs">CPS Score</td>
                  <td className="p-3 text-center font-mono-data text-destructive">{currentCPS}/100</td>
                  <td className="p-3 text-center font-mono-data text-success font-bold">{projectedCPS}/100</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium text-xs">QPi (Placement Index)</td>
                  <td className="p-3 text-center font-mono-data text-destructive">{currentQPi}%</td>
                  <td className="p-3 text-center font-mono-data text-success font-bold">{projectedQPi}%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium text-xs">Technical Skills</td>
                  <td className="p-3 text-center font-mono-data text-destructive">{technicalPct}%</td>
                  <td className="p-3 text-center font-mono-data text-success font-bold">{Math.min(technicalPct + 35, 95)}%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium text-xs">Portfolio Strength</td>
                  <td className="p-3 text-center font-mono-data text-destructive">{portfolioPct}%</td>
                  <td className="p-3 text-center font-mono-data text-success font-bold">{Math.min(portfolioPct + 45, 100)}%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium text-xs">Experience</td>
                  <td className="p-3 text-center font-mono-data text-destructive">{experiencePct}%</td>
                  <td className="p-3 text-center font-mono-data text-success font-bold">{Math.min(experiencePct + 40, 95)}%</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-xs">Job Readiness</td>
                  <td className="p-3 text-center text-destructive text-xs">{currentCPS >= 50 ? "Moderate" : "Not Ready"}</td>
                  <td className="p-3 text-center text-success text-xs font-bold">Industry Ready</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* ===== SECTION 12: TESTIMONIALS ===== */}
        <Section id="testimonials">
          <SectionTitle icon={<MessageSquare className="h-5 w-5 text-primary" />} title="Student Success Stories" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {course.testimonials.map((t, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 hover-lift">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className={`h-3.5 w-3.5 ${si < t.rating ? "fill-accent text-accent" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic mb-3">"{t.feedback}"</p>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <p className="text-sm font-semibold">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== SECTION 13: URGENCY ===== */}
        {isRedApple && (
          <Section id="urgency">
            <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-6 text-center">
              <Timer className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Don't Miss Out!</h3>
              <div className="flex items-center justify-center gap-8 mb-4">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Next Batch</p>
                  <p className="text-lg font-bold font-mono-data">{course.nextBatchDate}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Seats Left</p>
                  <p className="text-lg font-bold font-mono-data text-destructive">{course.seatsLeft} only</p>
                </div>
              </div>
              <Progress value={((30 - course.seatsLeft) / 30) * 100} className="h-2 max-w-xs mx-auto mb-4" />
              <p className="text-xs text-muted-foreground mb-4">Filling fast — {Math.round(((30 - course.seatsLeft) / 30) * 100)}% seats taken</p>
              <Button className="gradient-primary text-primary-foreground gap-2"
                onClick={() => document.getElementById("lead-capture-main")?.scrollIntoView({ behavior: "smooth" })}>
                <ArrowRight className="h-4 w-4" /> Reserve My Seat Now
              </Button>
            </div>
          </Section>
        )}

        {/* ===== SECTION 14: FINAL ROI ===== */}
        <Section id="roi">
          <SectionTitle icon={<PiggyBank className="h-5 w-5 text-primary" />} title="Your ROI Breakdown" />
          <div className="rounded-xl border bg-card p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Course Investment</p>
                <p className="text-2xl font-bold font-mono-data">₹{course.coursePrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expected First Year Salary</p>
                <p className="text-2xl font-bold font-mono-data text-success">{course.expectedSalary}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">ROI</p>
                <p className="text-2xl font-bold font-mono-data text-primary">{Math.round((parseInt(course.expectedSalary.replace(/[^\d]/g, "")) * 100000 / course.coursePrice))}x</p>
                <p className="text-[10px] text-muted-foreground">Return on Investment</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="final-cta">
          <div className="rounded-xl gradient-primary p-8 text-center text-primary-foreground">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Transform Your Career?</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
              {isRedApple
                ? `Join ${30 - course.seatsLeft} students already enrolled. Your career as a ${careerRole} starts here.`
                : `Take the next step in your career. Your path to becoming a ${careerRole} starts here.`}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {isRedApple ? (
                <>
                  <Button size="lg" variant="secondary" className="gap-2"
                    onClick={() => document.getElementById("lead-capture-main")?.scrollIntoView({ behavior: "smooth" })}>
                    <Phone className="h-4 w-4" /> Talk to Counselor
                  </Button>
                  <Button size="lg" variant="secondary" className="gap-2"
                    onClick={() => document.getElementById("lead-capture-main")?.scrollIntoView({ behavior: "smooth" })}>
                    <Target className="h-4 w-4" /> Get Career Roadmap
                  </Button>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
                    onClick={() => document.getElementById("lead-capture-main")?.scrollIntoView({ behavior: "smooth" })}>
                    <ArrowRight className="h-4 w-4" /> Apply Now
                  </Button>
                </>
              ) : (
                <Button size="lg" variant="secondary" className="gap-2" asChild>
                  <a href={course.url} target="_blank" rel="noopener noreferrer">
                    <ArrowRight className="h-4 w-4" /> View Course on {college?.name || "Partner Site"}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Section>
      </div>

      {/* ===== WhatsApp Button ===== */}
      {isRedApple && (
        <a
          href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I'm interested in the ${course.title} course`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 right-4 z-50 flex items-center gap-2 rounded-full bg-[hsl(142,70%,45%)] text-white px-4 py-3 shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium hidden sm:inline">Chat on WhatsApp</span>
        </a>
      )}

      {/* ===== BEHAVIORAL: Enhanced Floating CTA Bar ===== */}
      {isRedApple && <FloatingCTABar courseTitle={course.title} coursePrice={course.coursePrice} seatsLeft={course.seatsLeft} />}
    </div>
  );
}
