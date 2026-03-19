import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LiveCounter } from "./LiveCounter";
import {
  ArrowRight, GraduationCap, Target, TrendingUp, Users, Shield,
  Sparkles, BookOpen, Briefcase, Award, CheckCircle2, Clock,
  BarChart3, Zap, Heart, Star, ChevronRight, MessageCircle
} from "lucide-react";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Animated score counter */
function AnimatedScore() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const target = 78;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView]);

  return (
    <div ref={ref} className="relative">
      <span className="font-mono-data text-7xl sm:text-8xl md:text-[120px] font-extrabold leading-none tracking-tighter bg-gradient-to-b from-primary via-primary to-primary/40 bg-clip-text text-transparent">
        {count}
      </span>
      <span className="font-mono-data text-3xl sm:text-4xl md:text-5xl font-bold text-primary/60">%</span>
    </div>
  );
}

/* Subtle grid background */
function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* Radial fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      {/* Accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/[0.03] blur-[80px]" />
    </div>
  );
}

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden">
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        <GridBackground />

        <div className="relative z-10 max-w-4xl w-full">
          {/* Top: Small badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Career Intelligence Platform
            </span>
          </motion.div>

          {/* Center: Score + Headline — the hook */}
          <div className="flex flex-col items-center text-center">
            {/* Animated score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            >
              <AnimatedScore />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
            >
              Preparing for your career?{" "}
              <br />
              <span className="relative inline-block">
                Measure your employability
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full gradient-primary origin-left"
                />
              </span>{" "}
              <span className="text-muted-foreground font-bold">before you apply.</span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              A <span className="text-foreground font-semibold">5-minute assessment</span> that tells you exactly where you stand —
              powered by 2M+ hiring signals across 150+ careers.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Button
                size="lg"
                onClick={() => navigate("/assessment")}
                className="gradient-primary text-primary-foreground font-bold px-10 py-6 text-base gap-2 box-glow hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 rounded-xl shadow-xl"
              >
                Find Your Score
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => navigate("/counseling")}
                className="text-muted-foreground hover:text-foreground gap-2 text-base"
              >
                <MessageCircle className="h-4 w-4" />
                Talk to a Counselor
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mt-6 flex items-center gap-4 text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> No signup</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Instant results</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> 100% free</span>
            </motion.div>
          </div>

          {/* Bottom: Live counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="mt-16"
          >
            <LiveCounter />
          </motion.div>

          {/* Data sources */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-10 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">Signals from</p>
            <div className="flex items-center justify-center gap-6 opacity-30">
              {["LinkedIn", "Indeed", "Glassdoor", "NSDC"].map((name) => (
                <span key={name} className="font-mono text-[11px] font-bold tracking-wider uppercase">{name}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="py-24 px-4 bg-card">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">Simple 3-Step Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Your Career Clarity in <span className="text-primary">5 Minutes</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              No guesswork. No bias. Just data-driven insights about your employability.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: BookOpen, title: "Take the Assessment", desc: "Answer questions about your skills, education, and experience. Our AI adapts questions to your career path.", color: "primary" },
              { step: "02", icon: BarChart3, title: "Get Your CPS Score", desc: "Receive a precise Career Probability Score based on 800+ skills mapped across 150+ career roles.", color: "accent" },
              { step: "03", icon: Target, title: "Act on Insights", desc: "Get personalized roadmaps, skill gap analysis, course recommendations, and recruiter matches.", color: "success" },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.15}>
                <div className="relative rounded-2xl border border-border bg-card p-8 hover-lift group">
                  <span className="text-6xl font-extrabold text-muted/60 absolute top-4 right-6 select-none group-hover:text-primary/10 transition-colors duration-300">
                    {item.step}
                  </span>
                  <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl mb-5 ${
                    item.color === "primary" ? "bg-primary/10 text-primary" :
                    item.color === "accent" ? "bg-accent/10 text-accent" :
                    "bg-success/10 text-success"
                  }`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHAT YOU GET ═══════ */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3">Your Deliverables</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What You'll Get — <span className="text-primary">Absolutely Free</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A comprehensive career intelligence package that would cost ₹5,000+ from a traditional career counselor.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, title: "Career Probability Score", desc: "A precise 0–100% employability score based on 7 weighted dimensions" },
              { icon: Target, title: "Skill Gap Analysis", desc: "Exact skills you're missing and their importance for your dream role" },
              { icon: TrendingUp, title: "QPi Placement Index", desc: "Your placement readiness combining CPS, demand, and portfolio strength" },
              { icon: Briefcase, title: "Top Recruiter Matches", desc: "Companies actively hiring for your role with matching requirements" },
              { icon: BookOpen, title: "Course Recommendations", desc: "Prioritized learning paths from Red Apple and top platforms" },
              { icon: Award, title: "Career Intelligence Report", desc: "Downloadable PDF with full breakdown, roadmap, and action steps" },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 hover-lift">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ WHO IT'S FOR ═══════ */}
      <section className="py-24 px-4 bg-card">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">Who Benefits</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Built for Students & <span className="text-primary">Job Seekers</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "🎓 Students (Class 12 to PG)",
                points: [
                  "Discover which careers match your education and skills",
                  "Know exactly what to learn before graduating",
                  "Get beginner-friendly pathways for creative/vocational careers",
                  "Build a portfolio strategy that impresses recruiters"
                ]
              },
              {
                title: "💼 Job Seekers & Career Changers",
                points: [
                  "Understand your real market value with data, not opinions",
                  "Identify skill gaps costing you interview calls",
                  "Get matched with companies hiring your exact profile",
                  "Simulate how upskilling impacts your placement chances"
                ]
              }
            ].map((group, i) => (
              <AnimatedSection key={group.title} delay={i * 0.15}>
                <div className="rounded-2xl border border-border bg-background p-8 h-full">
                  <h3 className="text-xl font-bold mb-6">{group.title}</h3>
                  <ul className="space-y-4">
                    {group.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3">Student Success</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Real Results from <span className="text-primary">Real Students</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Priya Sharma", role: "UX Designer at Accenture", score: 78, quote: "CPS showed me exactly which design skills to focus on. Within 3 months of following the roadmap, I landed my dream role.", avatar: "PS" },
              { name: "Rahul Verma", role: "Full-Stack Dev at TCS", score: 82, quote: "I was applying blindly. The skill gap analysis revealed I needed Docker and AWS — two courses later, my interview rate tripled.", avatar: "RV" },
              { name: "Ananya Iyer", role: "Data Analyst at Wipro", score: 71, quote: "The Career Trajectory Simulator helped me plan my entire final year. I went from CPS 45 to 71 in 6 months.", avatar: "AI" },
            ].map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.12}>
                <div className="rounded-2xl border border-border bg-card p-6 hover-lift h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-bold text-primary font-mono">{t.score}%</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">CPS</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.quote}"</p>
                  <div className="flex gap-0.5 mt-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-3.5 w-3.5 fill-warning text-warning" />)}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT US ═══════ */}
      <section className="py-24 px-4 bg-card">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">About Us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                Bridging the Gap Between <span className="text-primary">Education & Employment</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Career Probability Score is built by education researchers and data scientists who believe every student deserves transparent, unbiased career guidance. We aggregate data from NSDC frameworks, LinkedIn hiring trends, and 150+ industry sources to give you the most accurate picture of your employability.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Ethical & Transparent", desc: "No hidden agendas. Pure data." },
                  { icon: Heart, label: "Student-First", desc: "Built for learners, not recruiters." },
                  { icon: Zap, label: "AI-Powered", desc: "800+ skills mapped with ML." },
                  { icon: Users, label: "Community Driven", desc: "Join 10,000+ career seekers." },
                ].map(item => (
                  <div key={item.label} className="flex gap-3">
                    <item.icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl border border-border bg-background p-8 space-y-6">
                <h3 className="text-lg font-bold">Our Impact</h3>
                {[
                  { label: "Career Roles Mapped", value: "150+", bar: 85 },
                  { label: "Skills in Database", value: "800+", bar: 92 },
                  { label: "Assessments Completed", value: "25,000+", bar: 78 },
                  { label: "Student Satisfaction", value: "94%", bar: 94 },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-bold font-mono text-primary">{item.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full gradient-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════ KEY STATS ═══════ */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection>
            <div className="rounded-2xl gradient-primary p-12 text-primary-foreground text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">The Numbers Speak for Themselves</h2>
              <p className="text-primary-foreground/70 mb-10 text-sm">Backed by real market data, not opinions</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: "2M+", label: "Data Points Analyzed" },
                  { value: "150+", label: "Career Roles" },
                  { value: "94%", label: "Accuracy Rate" },
                  { value: "25K+", label: "Students Assessed" },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="text-3xl sm:text-4xl font-extrabold font-mono">{stat.value}</p>
                    <p className="text-xs text-primary-foreground/70 mt-1 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ AD / PARTNER SPACE ═══════ */}
      <section className="py-16 px-4 bg-card border-y border-border">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">Trusted by Leading Institutions</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-40">
              {["Red Apple Learning", "NSDC", "NASSCOM", "Coursera", "Udemy", "Google"].map(brand => (
                <span key={brand} className="font-mono text-sm font-bold tracking-wider uppercase text-foreground">{brand}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent px-4 py-1.5 text-sm font-medium mb-6">
              <Clock className="h-4 w-4" />
              Limited: Free assessments available this month
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Every Day Without Clarity
              <br />
              <span className="text-primary">Is a Day Wasted</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed">
              Students who know their skill gaps before graduating are <span className="text-foreground font-bold">3x more likely</span> to receive placement offers. Don't be the last to know where you stand.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/assessment")}
              className="gradient-primary text-primary-foreground font-bold px-10 py-7 text-lg gap-3 box-glow hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 rounded-xl"
            >
              <GraduationCap className="h-6 w-6" />
              Start Your Free Assessment Now
              <ChevronRight className="h-5 w-5" />
            </Button>
            <p className="mt-5 text-xs text-muted-foreground">
              Join 25,000+ students who already know their Career Probability Score
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-border py-12 px-4 bg-card">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-bold mb-3">Platform</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="/assessment" className="hover:text-foreground transition-colors">Assessment</a></li>
                <li><a href="/market-signals" className="hover:text-foreground transition-colors">Market Signals</a></li>
                <li><a href="/courses" className="hover:text-foreground transition-colors">Courses</a></li>
                <li><a href="/workshops" className="hover:text-foreground transition-colors">Workshops</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3">Resources</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="/counseling" className="hover:text-foreground transition-colors">Career Counseling</a></li>
                <li><a href="/results" className="hover:text-foreground transition-colors">Results Dashboard</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3">Company</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3">Connect</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">WhatsApp Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2026 Career Probability Score. All rights reserved.</p>
            <p>An initiative for ethical, transparent career guidance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
