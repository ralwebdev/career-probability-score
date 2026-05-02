import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Lock, Mail, Eye, EyeOff, ShieldCheck, Building2, User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  authenticateRecruiterAccount, registerRecruiter, seedDefaultRecruiters,
  type RecruiterAccount,
} from "@/lib/recruiterAccessEngine";
import { recordConsent } from "@/lib/recruiterTrustEngine";

export type RecruiterRole = "recruiter" | "admin";

export interface RecruiterUser {
  id: string;
  email: string;
  name: string;
  company: string;
  role: RecruiterRole;
  verified: boolean;
}

const ADMIN_CREDENTIALS = { email: "admin@cps.platform", password: "admin123" };

export function authenticateRecruiter(email: string, password: string): { user: RecruiterUser | null; statusMessage?: string } {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return { user: { id: "adm_1", email, name: "Platform Admin", company: "CPS Platform", role: "admin", verified: true } };
  }
  const account = authenticateRecruiterAccount(email, password);
  if (!account) return { user: null };

  if (account.status === "blacklisted") {
    return { user: null, statusMessage: "Your account has been permanently restricted due to violation of platform policies." };
  }
  if (account.status === "rejected") {
    return { user: null, statusMessage: "Your account has been temporarily restricted due to compliance concerns. Please contact support for resolution." };
  }
  if (account.status === "pending") {
    return { user: null, statusMessage: "Your account is not yet activated. You will be notified upon approval." };
  }

  return {
    user: {
      id: account.id, email: account.email, name: account.name,
      company: account.company, role: "recruiter", verified: true,
    },
  };
}

export function getRecruiterSession(): RecruiterUser | null {
  try {
    const stored = sessionStorage.getItem("recruiterUser");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function RecruiterLogin() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [complianceConsent, setComplianceConsent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Seed defaults on mount
  useState(() => { seedDefaultRecruiters(); });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = authenticateRecruiter(email, password);
      if (result.statusMessage) {
        toast({ title: "Access Denied", description: result.statusMessage, variant: "destructive" });
      } else if (result.user) {
        sessionStorage.setItem("recruiterUser", JSON.stringify(result.user));
        toast({ title: "Login successful", description: `Welcome, ${result.user.name}` });
        navigate("/recruiter-dashboard");
      } else {
        toast({ title: "Login failed", description: "Invalid email or password", variant: "destructive" });
      }
      setLoading(false);
    }, 600);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) {
      toast({ title: "Missing fields", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (!complianceConsent) {
      toast({ title: "Consent Required", description: "You must accept the compliance and ethical standards to continue", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const account = registerRecruiter(name.trim(), company.trim(), email.trim(), password);
      if (account) {
        recordConsent(account.id, "recruiter", { terms: true, privacy: true, dataSharing: true, recruiterAgreement: true });
        toast({ title: "Registration Submitted", description: "Your account is under review. You will be notified upon approval." });
        setMode("login");
        setName("");
        setCompany("");
      } else {
        toast({ title: "Email already registered", description: "Try logging in instead", variant: "destructive" });
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center">
            <Briefcase className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">{mode === "login" ? "Recruiter Login" : "Recruiter Sign Up"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Access verified talent with CPS intelligence" : "Register to discover top candidates"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-muted p-0.5 mb-6">
          <button onClick={() => setMode("login")} className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${mode === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>Sign In</button>
          <button onClick={() => setMode("signup")} className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${mode === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>Sign Up</button>
        </div>

        <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="rounded-2xl border bg-card p-6 space-y-4">
          {mode === "signup" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Your full name" className="pl-10" value={name} onChange={e => setName(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Company name" className="pl-10" value={company} onChange={e => setCompany(e.target.value)} required />
                </div>
              </div>
            </>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="email" placeholder="recruiter@company.com" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading || (mode === "signup" && !complianceConsent)}>
            {loading ? (mode === "login" ? "Signing in..." : "Submitting...") : (mode === "login" ? "Sign In" : "Submit Registration")}
          </Button>

          {mode === "signup" && (
            <>
              {/* Compliance & Ethical Standards */}
              <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-sm font-semibold">Recruiter Compliance & Ethical Standards</h3>
                </div>
                <ul className="space-y-1.5 text-[11px] text-muted-foreground list-disc pl-4">
                  <li>You agree to use candidate data only for legitimate hiring purposes</li>
                  <li>You will not share, sell, or misuse candidate information under any circumstance</li>
                  <li>You will not spam, harass, or repeatedly contact candidates without relevance</li>
                  <li>You will ensure all communication is professional, respectful, and job-related</li>
                  <li>You will not misrepresent job roles, salary, or company details</li>
                  <li>You will not collect any form of payment from candidates at any stage</li>
                  <li>You will comply with all applicable hiring laws and data protection standards</li>
                  <li>You acknowledge that candidate access is granted conditionally and can be revoked</li>
                  <li>You understand that all activities are monitored for quality and compliance</li>
                  <li>You accept that violations may result in account restriction, rejection, or permanent blacklisting</li>
                </ul>

                <label className="flex items-start gap-2 cursor-pointer pt-2 border-t border-border">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    animate={!complianceConsent ? {} : { scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.25 }}
                  >
                    <input
                      type="checkbox"
                      checked={complianceConsent}
                      onChange={e => setComplianceConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-primary accent-primary"
                    />
                  </motion.div>
                  <span className="text-xs leading-relaxed">
                    I agree to abide by the platform's compliance and ethical standards. I understand that any violation may result in restriction or permanent removal from the platform.
                  </span>
                </label>
                <p className="text-[10px] text-muted-foreground italic">Your trust score and platform access depend on compliance.</p>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 p-3">
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  Your account will be reviewed by the admin team. You will be notified upon approval.
                </p>
              </div>
            </>
          )}

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified access · Role-based permissions · Privacy-first</span>
          </div>
        </form>

        {mode === "login" && (
          <div className="mt-6 rounded-xl border bg-muted/30 p-4">
            <p className="text-xs font-semibold mb-2">Demo Credentials</p>
            <div className="space-y-1.5 text-[11px] text-muted-foreground">
              <p><span className="font-medium text-foreground">Recruiter:</span> recruiter@techcorp.com / recruiter123</p>
              <p><span className="font-medium text-foreground">HR Lead:</span> hr@startupx.io / recruiter123</p>
              <p><span className="font-medium text-foreground">Pending:</span> talent@globalinc.com / recruiter123</p>
              <p><span className="font-medium text-foreground">Admin:</span> admin@cps.platform / admin123</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
