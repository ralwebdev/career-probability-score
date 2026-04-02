import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  X, ArrowRight, Phone, Target, Users, Clock, Zap,
  CheckCircle2, Gift, Shield, Sparkles, MessageCircle
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { submitLead } from "@/lib/api";
import { toast } from "sonner";

// ─── Behavioral UX Lead Gen System ───
// Principles used:
// 1. Micro-commitment ladder (small yes → big yes)
// 2. Endowed progress effect (show what they already have)
// 3. Loss aversion (show what they'll miss)
// 4. Social proof (live counters, recent activity)
// 5. Reciprocity (free value first)
// 6. Scarcity + urgency (seats, timer)
// 7. Zeigarnik effect (incomplete profile nudge)

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  interest: string;
}

// ─── 1. MICRO-COMMITMENT CTA (Value-first, no form initially) ───
export function MicroCommitmentCTA({
  courseTitle,
  careerRole,
  currentCPS,
  projectedCPS,
}: {
  courseTitle: string;
  careerRole: string;
  currentCPS: number;
  projectedCPS: number;
}) {
  const [step, setStep] = useState<"hook" | "value" | "form" | "success">("hook");
  const [formData, setFormData] = useState<LeadFormData>({ name: "", phone: "", email: "", interest: careerRole });

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!/^[6789]\d{9}$/.test(formData.phone)) {
      toast.error("Enter a valid 10-digit number starting with 6-9");
      return;
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const leadData = { ...formData, courseTitle, source: "micro-commitment" };
      await submitLead(leadData);
      const leads = JSON.parse(localStorage.getItem("course-leads") || "[]");
      leads.push({ ...leadData, timestamp: Date.now() });
      localStorage.setItem("course-leads", JSON.stringify(leads));
      setStep("success");
    } catch (error) {
      console.error("Lead submission failed:", error);
      toast.error("Failed to submit lead. Please try again.");
    }
  };

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-card overflow-hidden">
      <AnimatePresence mode="wait">
        {step === "hook" && (
          <motion.div key="hook" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3 shrink-0">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Want to see your personalized career roadmap?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We'll show you exactly how to go from CPS {currentCPS} → {projectedCPS} in the shortest time
                </p>
                {/* Endowed progress — they already have some data */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Your profile completeness</span>
                    <span className="font-semibold text-primary">60% done</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-[10px] text-muted-foreground mt-1">Just your name & phone to unlock your full report</p>
                </div>
                <Button onClick={() => setStep("value")} className="gradient-primary text-primary-foreground gap-2">
                  <Target className="h-4 w-4" /> Yes, Show My Roadmap <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "value" && (
          <motion.div key="value" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
            {/* Reciprocity — show free value they're about to get */}
            <h3 className="font-bold mb-4">Here's what you'll get FREE:</h3>
            <div className="space-y-2 mb-5">
              {[
                "Personalized career roadmap based on your CPS",
                "Skill gap analysis with priority action items",
                "Salary projection for next 3 years",
                "1-on-1 counselor call (₹2,000 value — FREE)"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <p className="text-sm">{item}</p>
                  {i === 3 && <Badge className="bg-accent/10 text-accent text-[9px]">₹2,000 FREE</Badge>}
                </div>
              ))}
            </div>
            <Button onClick={() => setStep("form")} className="w-full gradient-primary text-primary-foreground gap-2">
              Unlock My Free Report <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {/* Endowed progress bar at top */}
            <div className="bg-primary/5 px-6 py-3 border-b">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Almost there!</span>
                <span className="font-bold text-primary">90% complete</span>
              </div>
              <Progress value={90} className="h-1.5" />
            </div>
            <div className="p-6 space-y-3">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                className="h-11"
              />
              <Input
                placeholder="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                className="h-11"
              />
              <Input
                placeholder="Email (optional)"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                className="h-11"
              />
              <Button onClick={handleSubmit} className="w-full gradient-primary text-primary-foreground gap-2 h-11">
                <Gift className="h-4 w-4" /> Get My Free Career Report
              </Button>
              <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> No spam</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Callback in 30 min</span>
              </div>
              {/* Social proof */}
              <SocialProofTicker />
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center">
            <div className="rounded-full bg-primary/10 p-4 w-fit mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">You're In, {formData.name}! 🎉</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A senior counselor will call you within 30 minutes with your personalized career roadmap.
            </p>
            <Button variant="outline" className="gap-2" asChild>
              <a href={`https://wa.me/919999999999?text=Hi%2C+I+just+signed+up+for+${encodeURIComponent(courseTitle)}+career+report.+My+name+is+${encodeURIComponent(formData.name)}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp for faster response
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 2. SOCIAL PROOF TICKER ───
function SocialProofTicker() {
  const names = ["Arjun from Delhi", "Priya from Bangalore", "Rahul from Kolkata", "Sneha from Mumbai", "Vikram from Pune", "Ananya from Chennai"];
  const actions = ["enrolled just now", "got a career report", "enrolled 5 min ago", "booked a counselor call", "joined 12 min ago"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrent(p => (p + 1) % names.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2"
      >
        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
          {names[current].charAt(0)}
        </div>
        <p className="text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">{names[current]}</span>{" "}
          {actions[current % actions.length]}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── 3. EXIT-INTENT POPUP ───
export function ExitIntentPopup({
  courseTitle,
  coursePrice,
  careerRole,
}: {
  courseTitle: string;
  coursePrice: number;
  careerRole: string;
}) {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const triggered = useRef(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered.current && !localStorage.getItem("exit-lead-captured")) {
        triggered.current = true;
        setShow(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Also trigger after 45 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!triggered.current && !localStorage.getItem("exit-lead-captured")) {
        triggered.current = true;
        setShow(true);
      }
    }, 45000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!/^[6789]\d{9}$/.test(phone)) {
      toast.error("Enter a valid 10-digit number starting with 6-9");
      return;
    }

    try {
      const leadData = { name, phone, courseTitle, source: "exit-intent" };
      await submitLead(leadData);
      const leads = JSON.parse(localStorage.getItem("course-leads") || "[]");
      leads.push({ ...leadData, timestamp: Date.now() });
      localStorage.setItem("course-leads", JSON.stringify(leads));
      localStorage.setItem("exit-lead-captured", "true");
      setSubmitted(true);
    } catch (error) {
      console.error("Exit lead submission failed:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {submitted ? "🎉 You're all set!" : "Wait! Don't miss this..."}
          </DialogTitle>
          <DialogDescription>
            {submitted
              ? "We'll call you within 30 minutes."
              : `Get a FREE counselor call worth ₹2,000 for the ${courseTitle} program`}
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <div className="space-y-4">
            {/* Loss aversion framing */}
            <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
              <p className="text-sm font-medium text-destructive">
                ⚠️ Students who leave without speaking to a counselor are 4x less likely to start their career transformation
              </p>
            </div>

            {/* Minimal form — just phone (lowest friction) */}

            <div className="flex gap-2 flex-col">
              <Input
                placeholder="Your Full Name"
                type="te t"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 flex-1"
              />
              <Input
                placeholder="Your phone number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 flex-1"
              />
              <Button onClick={handleSubmit} className="gradient-primary text-primary-foreground h-11 gap-1">
                <Phone className="h-4 w-4" /> Call Me
              </Button>
            </div>

            <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> 100% private</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 30 min callback</span>
              <span className="flex items-center gap-1"><Gift className="h-3 w-3" /> Absolutely free</span>
            </div>

            <SocialProofTicker />
          </div>
        ) : (
          <div className="text-center py-4">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">A career counselor will reach out within 30 minutes to discuss your path to becoming a <span className="font-semibold text-foreground">{careerRole}</span>.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── 4. SCROLL-TRIGGERED SLIDE-IN NUDGE ───
export function ScrollNudge({ courseTitle, seatsLeft }: { courseTitle: string; seatsLeft: number }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 40 && !dismissed) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      className="fixed top-1/3 right-4 z-40 w-72 rounded-xl border-2 border-primary/20 bg-card shadow-2xl overflow-hidden"
    >
      <div className="bg-primary/5 px-4 py-2 flex items-center justify-between border-b">
        <span className="text-xs font-semibold flex items-center gap-1"><Zap className="h-3 w-3 text-accent" /> Quick Insight</span>
        <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm font-medium">
          🔥 <span className="text-destructive font-bold">{seatsLeft}</span> seats left for the next batch
        </p>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span>{30 - seatsLeft} students already enrolled this week</span>
        </div>
        <Button
          size="sm"
          className="w-full gradient-primary text-primary-foreground gap-1 text-xs"
          onClick={() => {
            document.getElementById("lead-capture-main")?.scrollIntoView({ behavior: "smooth" });
            setDismissed(true);
          }}
        >
          <ArrowRight className="h-3 w-3" /> Reserve My Seat
        </Button>
      </div>
    </motion.div>
  );
}

// ─── 5. INLINE LEAD CAPTURE (Lightweight — after career diagnosis section) ───
export function InlineLeadCapture({ careerRole }: { careerRole: string }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [captured, setCaptured] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!/^[6789]\d{9}$/.test(phone)) {
      toast.error("Enter a valid 10-digit number starting with 6-9");
      return;
    }

    try {
      const leadData = { name, phone, courseTitle: careerRole, source: "inline-diagnosis" };
      await submitLead(leadData);
      const leads = JSON.parse(localStorage.getItem("course-leads") || "[]");
      leads.push({ ...leadData, timestamp: Date.now() });
      localStorage.setItem("course-leads", JSON.stringify(leads));
      setCaptured(true);
    } catch (error) {
      console.error("Inline lead submission failed:", error);
      toast.error("Failed to submit request.");
    }
  };

  if (captured) {
    return (
      <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 flex items-center gap-3 mt-4">
        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
        <p className="text-sm">Great! A counselor will call you soon to discuss your path to becoming a <span className="font-semibold">{careerRole}</span>.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-accent/5 border border-accent/20 p-4 mt-4">
      <p className="text-sm font-medium mb-3">
        📞 Want an expert to walk you through your skill gaps? <span className="text-accent font-semibold">Free 15-min call</span>
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-9 flex-1 text-sm font-medium"
        />
        <Input
          placeholder="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-9 flex-1 text-sm"
        />
        <Button size="sm" onClick={handleSubmit} className="gap-1 bg-accent text-accent-foreground hover:bg-accent/90">
          <Phone className="h-3 w-3" /> Call Me
        </Button>
      </div>
    </div>
  );
}

// ─── 6. FLOATING CTA BAR (Enhanced with urgency + micro-CTA) ───
export function FloatingCTABar({
  courseTitle,
  coursePrice,
  seatsLeft,
}: {
  courseTitle: string;
  coursePrice: number;
  seatsLeft: number;
}) {
  const [showQuickForm, setShowQuickForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [captured, setCaptured] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!/^[6789]\d{9}$/.test(phone)) {
      toast.error("Enter a valid 10-digit number starting with 6-9");
      return;
    }

    try {
      const leadData = { name, phone, courseTitle, source: "floating-bar" };
      await submitLead(leadData);
      const leads = JSON.parse(localStorage.getItem("course-leads") || "[]");
      leads.push({ ...leadData, timestamp: Date.now() });
      localStorage.setItem("course-leads", JSON.stringify(leads));
      setCaptured(true);
      setTimeout(() => { setShowQuickForm(false); setCaptured(false); }, 3000);
    } catch (error) {
      console.error("Floating lead submission failed:", error);
      toast.error("Failed to submit request.");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-xl">
      <AnimatePresence>
        {showQuickForm && !captured && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b bg-card overflow-hidden"
          >
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 max-w-[180px] text-sm"
                autoFocus
              />
              <Input
                placeholder="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-9 max-w-[180px] text-sm"
              />
              <Button size="sm" onClick={handleSubmit} className="gradient-primary text-primary-foreground gap-1 text-xs">
                <Phone className="h-3 w-3" /> Get Callback
              </Button>
              <button onClick={() => setShowQuickForm(false)} className="text-muted-foreground hover:text-foreground ml-auto"><X className="h-4 w-4" /></button>
            </div>
          </motion.div>
        )}
        {captured && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b bg-primary/5 overflow-hidden"
          >
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="font-medium">Done! Expect a call within 30 minutes.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
        <div className="hidden sm:block">
          <p className="text-sm font-semibold">{courseTitle}</p>
          <p className="text-xs text-muted-foreground">
            ₹{coursePrice.toLocaleString()} · <span className="text-destructive font-semibold">{seatsLeft} seats left</span>
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-1 text-xs" onClick={() => setShowQuickForm(true)}>
            <Phone className="h-3 w-3" /> Request Callback
          </Button>
          <Button
            size="sm"
            className="flex-1 sm:flex-none gradient-primary text-primary-foreground gap-1 text-xs"
            onClick={() => document.getElementById("lead-capture-main")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ArrowRight className="h-3 w-3" /> Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}
