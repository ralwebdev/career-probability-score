import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  careerRoles,
  softSkills, communicationSkills, eiSkills, experienceTypes,
  type AssessmentData,
  calculateCPS,
} from "@/lib/careerData";
import { submitAssessment } from "@/lib/api";
import {
  masterEducationLevels, fieldsByEducation, domainsByField,
  rolesByDomain, formatLabel, hasSubdomains, getSubdomains,
  hasRoles, getRolesForDomain, getAllDomainsForFieldAndEducation,
  getSkillsForRole,
} from "@/lib/careerMasterDB";
import { countries, getStatesForCountry, getCitiesForState } from "@/lib/geoData";
import { getSalaryForRole } from "@/lib/salaryData";
import { ArrowLeft, ArrowRight, Sparkles, Zap, Trophy, Target, User, GraduationCap, Briefcase, Brain, Rocket, TrendingUp, TrendingDown, Minus, IndianRupee, Clock, Building2, Wifi, Award, FolderOpen, FolderCheck, Medal, AlertTriangle, Info } from "lucide-react";

const TOTAL_STEPS = 5;

// Behavioral science: motivational messages per step
const stepMeta = [
  { icon: User, title: "About You", subtitle: "Takes 30 seconds", nudge: "You're already 20% done just by starting!" },
  { icon: GraduationCap, title: "Education & Career", subtitle: "1 minute", nudge: "Great choice — this unlocks your personalized skill map" },
  { icon: Zap, title: "Technical Skills", subtitle: "Quick self-rating", nudge: "No right answers — just honest self-assessment" },
  { icon: Brain, title: "People Skills", subtitle: "Almost there!", nudge: "These skills predict 85% of career success" },
  { icon: Rocket, title: "Experience & Portfolio", subtitle: "Final step!", nudge: "You're about to see your employability score" },
];

// Endowed progress: start at 20%, accelerate near end (goal gradient effect)
function getProgress(step: number) {
  const progressMap = [20, 40, 60, 82, 100];
  return progressMap[step] ?? 100;
}

// Confetti particles for celebration micro-interaction
function CelebrationBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${45 + Math.random() * 10}%`,
            top: "40%",
            background: `hsl(${Math.random() * 360} 80% 60%)`,
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0.5],
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// Skill level — segmented signal bar (like Wi-Fi/signal strength — universally understood)
const ratingLabels = ["None", "Beginner", "Proficient", "Expert"];

function SkillLevelBar({ level, active }: { level: number; active: boolean }) {
  return (
    <div className="flex gap-[2px] items-end h-[14px]">
      {[0, 1, 2, 3].map(i => (
        <div
          key={i}
          className="rounded-[1px] transition-all duration-200"
          style={{
            width: 3,
            height: 5 + i * 3,
            backgroundColor: i <= level && active
              ? "hsl(var(--primary-foreground))"
              : i <= level && !active
                ? "hsl(var(--muted-foreground) / 0.35)"
                : "hsl(var(--muted-foreground) / 0.12)",
          }}
        />
      ))}
    </div>
  );
}

function SkillPill({ label, value, onChange, compact }: { label: string; value: number; onChange: (v: number) => void; compact?: boolean }) {
  return (
    <motion.div
      layout
      className="flex items-center justify-between gap-3 rounded-xl border bg-card/60 backdrop-blur-sm px-4 py-2.5 hover:border-primary/30 transition-colors"
      whileHover={{ scale: 1.005 }}
    >
      <span className={`font-medium ${compact ? "text-xs" : "text-sm"} truncate max-w-[160px]`}>{label}</span>
      <div className="flex gap-1">
        {[0, 1, 2, 3].map(level => (
          <Tooltip key={level}>
            <TooltipTrigger asChild>
              <motion.button
                type="button"
                onClick={() => onChange(level)}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                className={`rounded-lg px-2 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 ${value === level
                    ? "gradient-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-secondary"
                  }`}
              >
                <SkillLevelBar level={level} active={value === level} />
                {!compact && <span className="hidden sm:inline">{ratingLabels[level]}</span>}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 text-white border-slate-800">
              <p>{ratingLabels[level]}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </motion.div>
  );
}

// Animated circular progress ring
function ProgressRing({ progress, size = 56 }: { progress: number; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold font-mono-data text-primary">{progress}%</span>
      </div>
    </div>
  );
}

// Skills completion indicator
function CompletionChip({ filled, total }: { filled: number; total: number }) {
  const pct = total > 0 ? Math.round((filled / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <div className="flex gap-0.5">
        {Array.from({ length: Math.min(total, 10) }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-4 rounded-full transition-all duration-300 ${i < Math.ceil((filled / total) * Math.min(total, 10))
                ? "bg-primary"
                : "bg-muted"
              }`}
          />
        ))}
      </div>
      <span>{pct}% rated</span>
    </div>
  );
}

export function AssessmentSteps() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);

  const [celebrating, setCelebrating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<AssessmentData>({
    name: "", email: "", phone: "", city: "", state: "", country: "India",
    educationLevel: "", fieldOfStudy: "",
    careerDomain: "", careerRole: "",
    specialization: "",
    collegeId: searchParams.get("cid") || undefined,
    technicalSkills: {}, softSkills: {}, communicationSkills: {}, eiSkills: {},

    experience: {}, portfolioLevel: "none"
  });

  const update = (partial: Partial<AssessmentData>) => {
    setData(prev => ({ ...prev, ...partial }));
    // Clear error for updated field
    const updatedField = Object.keys(partial)[0];
    if (errors[updatedField]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[updatedField];
        return next;
      });
    }
  };
  const progress = getProgress(step);
  const StepIcon = stepMeta[step].icon;

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!data.name.trim()) newErrors.name = "Name is required";
      if (!data.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!data.phone.trim()) {
        newErrors.phone = "Phone is required";
      } else if (!/^[6789]\d{9}$/.test(data.phone)) {
        newErrors.phone = "Enter a valid 10-digit number starting with 6-9";
      }
      if (!data.country) newErrors.country = "Country is required";
      if (!data.state) newErrors.state = "State is required";
      if (!data.city) newErrors.city = "City is required";
    }

    if (currentStep === 1) {
      if (!data.educationLevel) newErrors.educationLevel = "Education level is required";
      if (!data.fieldOfStudy) newErrors.fieldOfStudy = "Field of study is required";

      if (data.educationLevel && data.fieldOfStudy) {
        if (availableDomains.length === 0) {
          newErrors.fieldOfStudy = "This field has no mapped career domains yet. Please choose another.";
        } else {
          if (!data.careerDomain) newErrors.careerDomain = "Please select a domain";
          if (needsSpecialization && !data.specialization) newErrors.specialization = "Specialization is required";
          if (!data.careerRole) newErrors.careerRole = "Please select a career role";
        }
      }
    }

    if (currentStep === 2) {
      const ratedCount = Object.values(data.technicalSkills).filter(v => v > 0).length;
      if (ratedCount < 3 && selectedRoleSkills.length >= 3) {
        newErrors.technicalSkills = `Please rate at least 3 skills (you've rated ${ratedCount})`;
      }
    }

    return newErrors;
  };

  const canNext = () => {
    const stepErrors = validateStep(step);
    return Object.keys(stepErrors).length === 0;
  };

  // Celebration on step advance
  const advanceStep = useCallback(() => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Scroll to top of form to see errors if needed
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCelebrating(true);
    setTimeout(() => {
      setCelebrating(false);
      setStep(s => s + 1);
      setErrors({}); // Clear errors for next step
    }, 400);
  }, [step, data, validateStep]);

  // ============================================================================
  // NEW CASCADING LOGIC: Education → Field → Domain → Specialization → Role
  // Uses careerMasterDB hierarchy
  // ============================================================================

  // Map display education level to master DB ID
  const eduDisplayToId: Record<string, string> = {
    "Class 12 - Science": "12_science",
    "Class 12 - Commerce": "12_commerce",
    "Class 12 - Arts": "12_arts",
    "Diploma": "diploma",
    "Undergraduate": "undergraduate",
    "Graduate": "graduate",
    "Postgraduate": "postgraduate",
    "PhD": "phd",
    "Bootcamp": "bootcamp",
    "Self-Taught": "self_taught",
  };

  const eduId = eduDisplayToId[data.educationLevel] ?? "";

  // Available fields for selected education
  const availableFields = eduId ? (fieldsByEducation[eduId] ?? []) : [];

  // Available domains: field's direct domains + cross-domain rules for this education level
  const availableDomains = (data.fieldOfStudy && eduId)
    ? getAllDomainsForFieldAndEducation(data.fieldOfStudy, eduId)
    : [];

  // Check if selected domain has sub-domains
  const needsSpecialization = data.careerDomain ? hasSubdomains(data.careerDomain) : false;

  // Available specializations (sub-domains of selected domain)
  const availableSpecializations = needsSpecialization ? getSubdomains(data.careerDomain) : [];

  // Available roles from the leaf domain/specialization
  const leafDomain = needsSpecialization ? data.specialization : data.careerDomain;
  const availableRoleIds = leafDomain ? getRolesForDomain(leafDomain) : [];

  // Map role IDs to CareerRole objects (for metadata display & scoring)
  const roleIdToCareerRole: Record<string, typeof careerRoles[number] | undefined> = {};
  for (const roleId of availableRoleIds) {
    const displayName = formatLabel(roleId);
    const match = careerRoles.find(r => r.name === displayName || r.name.toLowerCase() === displayName.toLowerCase());
    if (match) roleIdToCareerRole[roleId] = match;
  }

  // Resolve selected role — find role ID from display name
  const selectedRoleId = availableRoleIds.find(id => formatLabel(id) === data.careerRole) ?? "";
  const selectedRole = careerRoles.find(r => r.name === data.careerRole);

  // Get technical skills from master DB (primary source), fall back to careerData
  const selectedRoleSkills = selectedRoleId
    ? getSkillsForRole(selectedRoleId)
    : (selectedRole?.skills ?? []);

  // For subdomain chips display
  const subdomains = data.careerDomain
    ? [...new Set(careerRoles.filter(r => availableRoleIds.map(id => formatLabel(id)).includes(r.name)).map(r => r.subdomain))]
    : [];

  // All "people skills" combined
  const allPeopleSkills = [
    { group: "Soft Skills", items: [...softSkills] },
    { group: "Communication", items: [...communicationSkills] },
    { group: "Emotional Intelligence", items: [...eiSkills] },
  ];


  const handleSubmit = async () => {
    if (isSubmitting) return;

    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);

    const trimmedData = {
      ...data,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim()
    };

    try {
      const result = await submitAssessment(trimmedData);
      sessionStorage.setItem("cps-assessment", JSON.stringify(trimmedData));
      navigate(`/results?id=${result._id}`);
    } catch (error) {
      console.error("Submission failed:", error);
      // Fallback in case backend is down or connection fails
      sessionStorage.setItem("cps-assessment", JSON.stringify(trimmedData));
      navigate("/results");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Count rated skills for completion indicators
  const techRated = selectedRoleSkills.filter(s => (data.technicalSkills[s] ?? 0) > 0).length;
  const techTotal = selectedRoleSkills.length;
  const peopleRated = [
    ...softSkills.filter(s => (data.softSkills[s] ?? 0) > 0),
    ...communicationSkills.filter(s => (data.communicationSkills[s] ?? 0) > 0),
    ...eiSkills.filter(s => (data.eiSkills[s] ?? 0) > 0),
  ].length;
  const peopleTotal = softSkills.length + communicationSkills.length + eiSkills.length;

  const stepContent = [
    // Step 0: Profile (streamlined — just name, email, location in one clean card)
    <div key="profile" className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Full Name *</Label>
          <Input value={data.name} onChange={e => update({ name: e.target.value })} placeholder="Your name" className={`h-11 ${errors.name ? "border-destructive ring-1 ring-destructive/50" : ""}`} />
          {errors.name && <p className="text-[10px] font-medium text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email *</Label>
          <Input type="email" value={data.email} onChange={e => update({ email: e.target.value })} placeholder="you@email.com" className={`h-11 ${errors.email ? "border-destructive ring-1 ring-destructive/50" : ""}`} />
          {errors.email && <p className="text-[10px] font-medium text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Phone *</Label>
          <Input value={data.phone} onChange={e => update({ phone: e.target.value })} placeholder="10-digit mobile number" className={`h-11 ${errors.phone ? "border-destructive ring-1 ring-destructive/50" : ""}`} />
          {errors.phone && <p className="text-[10px] font-medium text-destructive">{errors.phone}</p>}
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Country *</Label>
          <Select value={data.country} onValueChange={v => update({ country: v, state: "", city: "" })}>
            <SelectTrigger className={`h-11 ${errors.country ? "border-destructive ring-1 ring-destructive/50" : ""}`}><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent className="max-h-60">{countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
          {errors.country && <p className="text-[10px] font-medium text-destructive">{errors.country}</p>}
        </div>
        {data.country && (
          <>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">State *</Label>
              <Select value={data.state} onValueChange={v => update({ state: v, city: "" })}>
                <SelectTrigger className={`h-11 ${errors.state ? "border-destructive ring-1 ring-destructive/50" : ""}`}><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>{getStatesForCountry(data.country).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
              {errors.state && <p className="text-[10px] font-medium text-destructive">{errors.state}</p>}
            </div>
            {data.state && (
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">City *</Label>
                <Select value={data.city} onValueChange={v => update({ city: v })}>
                  <SelectTrigger className={`h-11 ${errors.city ? "border-destructive ring-1 ring-destructive/50" : ""}`}><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{getCitiesForState(data.country, data.state).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
                {errors.city && <p className="text-[10px] font-medium text-destructive">{errors.city}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>,

    // Step 1: Education + Career (merged — progressive disclosure using Master DB hierarchy)
    <div key="edu-career" className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Current Education Level *</Label>
          <Select value={data.educationLevel} onValueChange={v => update({ educationLevel: v, fieldOfStudy: "", careerRole: "", careerDomain: "", specialization: "" })}>
            <SelectTrigger className={`h-11 ${errors.educationLevel ? "border-destructive ring-1 ring-destructive/50" : ""}`}><SelectValue placeholder="Select level" /></SelectTrigger>
            <SelectContent>{masterEducationLevels.map(id => <SelectItem key={id} value={formatLabel(id)}>{formatLabel(id)}</SelectItem>)}</SelectContent>
          </Select>
          {errors.educationLevel && <p className="text-[10px] font-medium text-destructive">{errors.educationLevel}</p>}
        </div>
        {data.educationLevel && availableFields.length > 0 && (
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Field of Study *</Label>
            <Select value={data.fieldOfStudy} onValueChange={v => update({ fieldOfStudy: v, careerRole: "", careerDomain: "", specialization: "" })}>
              <SelectTrigger className={`h-11 ${errors.fieldOfStudy ? "border-destructive ring-1 ring-destructive/50" : ""}`}><SelectValue placeholder="Select field" /></SelectTrigger>
              <SelectContent>{availableFields.map(f => <SelectItem key={f} value={f}>{formatLabel(f)}</SelectItem>)}</SelectContent>
            </Select>
            {errors.fieldOfStudy && <p className="text-[10px] font-medium text-destructive">{errors.fieldOfStudy}</p>}
          </div>
        )}
      </div>

      {/* Career Domain — shows when field+education have available domains */}
      {data.educationLevel && data.fieldOfStudy && availableDomains.length > 0 && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Career Domain * <span className="normal-case font-normal text-muted-foreground">({availableDomains.length} available)</span>
            </Label>
            <Select value={data.careerDomain} onValueChange={v => update({ careerDomain: v, careerRole: "", specialization: "" })}>
              <SelectTrigger className={`h-11 ${errors.careerDomain ? "border-destructive ring-1 ring-destructive/50" : ""}`}><SelectValue placeholder="Select domain" /></SelectTrigger>
              <SelectContent>
                {availableDomains.map(d => <SelectItem key={d} value={d}>{formatLabel(d)}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.careerDomain && <p className="text-[10px] font-medium text-destructive">{errors.careerDomain}</p>}
          </div>
        </motion.div>
      )}

      {/* Specialization — shows when domain has sub-domains */}
      {data.careerDomain && needsSpecialization && availableSpecializations.length > 0 && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Specialization * <span className="normal-case font-normal text-muted-foreground">({availableSpecializations.length} available)</span>
          </Label>
          <Select value={data.specialization} onValueChange={v => update({ specialization: v, careerRole: "" })}>
            <SelectTrigger className={`h-11 ${errors.specialization ? "border-destructive ring-1 ring-destructive/50" : ""}`}><SelectValue placeholder="Select specialization" /></SelectTrigger>
            <SelectContent>
              {availableSpecializations.map(s => <SelectItem key={s} value={s}>{formatLabel(s)}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.specialization && <p className="text-[10px] font-medium text-destructive">{errors.specialization}</p>}
        </motion.div>
      )}

      {/* Career Role — shows when we have a leaf domain with roles */}
      {((data.careerDomain && !needsSpecialization && availableRoleIds.length > 0) ||
        (needsSpecialization && data.specialization && availableRoleIds.length > 0)) && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-1.5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Career Role * <span className="normal-case font-normal text-muted-foreground">({availableRoleIds.length} available)</span>
            </Label>
            <Select value={data.careerRole} onValueChange={v => update({ careerRole: v, technicalSkills: {} })}>
              <SelectTrigger className={`h-11 ${errors.careerRole ? "border-destructive ring-1 ring-destructive/50" : ""}`}><SelectValue placeholder="Select career" /></SelectTrigger>
              <SelectContent>
                {availableRoleIds.map(roleId => (
                  <SelectItem key={roleId} value={formatLabel(roleId)}>
                    {formatLabel(roleId)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.careerRole && <p className="text-[10px] font-medium text-destructive">{errors.careerRole}</p>}
            {data.careerRole && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <Target className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs font-semibold text-primary">
                    {formatLabel(data.careerDomain)} {data.specialization ? `→ ${formatLabel(data.specialization)}` : ""} → {data.careerRole}
                  </span>
                </div>

                {/* Skills from master DB — always available */}
                {selectedRoleSkills.length > 0 && (
                  <div className="space-y-1.5 text-[11px] text-muted-foreground border-t border-primary/10 pt-2">
                    <p>
                      <span className="font-semibold text-foreground/80">Key Skills Required:</span>{" "}
                      {selectedRoleSkills.join(" · ")}
                    </p>
                  </div>
                )}

                {/* Average Salary — always shown */}
                {data.careerRole && (() => {
                  const sal = getSalaryForRole(data.careerRole);
                  return (
                    <div className="border-t border-primary/10 pt-2 space-y-1.5">
                      <p className="text-[11px] font-semibold text-foreground/80 flex items-center gap-1.5">
                        <IndianRupee className="w-3 h-3 text-muted-foreground" /> Average Salary (India)
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-md bg-secondary/50 p-2 text-center">
                          <div className="text-[10px] text-muted-foreground">Entry Level</div>
                          <div className="text-[11px] font-bold text-foreground/90">{sal.entry}</div>
                        </div>
                        <div className="rounded-md bg-secondary/50 p-2 text-center">
                          <div className="text-[10px] text-muted-foreground">Mid Level</div>
                          <div className="text-[11px] font-bold text-primary">{sal.mid}</div>
                        </div>
                        <div className="rounded-md bg-secondary/50 p-2 text-center">
                          <div className="text-[10px] text-muted-foreground">Senior Level</div>
                          <div className="text-[11px] font-bold text-accent">{sal.senior}</div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Extended metadata from careerData (if available) */}
                {selectedRole && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <IndianRupee className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">Avg Cost:</span>
                        <span className="font-semibold text-foreground/80">{selectedRole.avgCost}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">Time to Job:</span>
                        <span className="font-semibold text-foreground/80">{selectedRole.avgTimeToJob}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Building2 className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">Sector:</span>
                        <span className="font-semibold text-foreground/80">{selectedRole.sector.join(" · ")}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px]">
                        {selectedRole.trend === "Rising" ? <TrendingUp className="w-3 h-3 text-green-500 flex-shrink-0" /> :
                          selectedRole.trend === "Declining" ? <TrendingDown className="w-3 h-3 text-red-500 flex-shrink-0" /> :
                            <Minus className="w-3 h-3 text-yellow-500 flex-shrink-0" />}
                        <span className="text-muted-foreground">Trend:</span>
                        <span className={`font-semibold ${selectedRole.trend === "Rising" ? "text-green-600" : selectedRole.trend === "Declining" ? "text-red-500" : "text-yellow-600"}`}>
                          {selectedRole.trend}
                        </span>
                      </div>
                      {selectedRole.remoteEligibility && (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Wifi className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">Remote:</span>
                          <span className="font-semibold text-foreground/80">{selectedRole.remoteEligibility}</span>
                        </div>
                      )}
                      {selectedRole.certifications && selectedRole.certifications.length > 0 && (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Award className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">Certs:</span>
                          <span className="font-semibold text-foreground/80 truncate">{selectedRole.certifications.slice(0, 2).join(", ")}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <span className="text-muted-foreground">Demand:</span>
                        <span className="font-mono-data font-semibold text-primary">{selectedRole.demandScore}/10</span>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-[11px] text-muted-foreground border-t border-primary/10 pt-2">
                      <p><span className="font-semibold text-foreground/80">Tools & Technologies:</span> {selectedRole.tools.join(" · ")}</p>
                      <p><span className="font-semibold text-foreground/80">Top Recruiters:</span> {selectedRole.topRecruiters.slice(0, 4).join(" · ")}{selectedRole.topRecruiters.length > 4 ? ` +${selectedRole.topRecruiters.length - 4} more` : ""}</p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

      {/* Compassionate & humorous validation nudges */}
      {data.educationLevel && data.fieldOfStudy && availableDomains.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex items-start gap-3"
        >
          <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-destructive">Hmm, that's a dead end! 🛑</p>
            <p className="text-xs text-muted-foreground">
              We love the ambition, but <strong>{formatLabel(data.fieldOfStudy)}</strong> under <strong>{data.educationLevel}</strong> doesn't
              have mapped career domains yet. Think of it like GPS — we need a valid route! Try a different field of study above. 🗺️
            </p>
          </div>
        </motion.div>
      )}

      {data.educationLevel && data.fieldOfStudy && availableDomains.length > 0 && !data.careerDomain && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-accent/30 bg-accent/5 p-3 flex items-start gap-3"
        >
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Nice field! Now pick a <strong>Career Domain</strong> to narrow your trajectory. You've got {availableDomains.length} exciting options — no pressure, but also... pick one. 😄
          </p>
        </motion.div>
      )}

      {data.careerDomain && needsSpecialization && !data.specialization && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-accent/30 bg-accent/5 p-3 flex items-start gap-3"
        >
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            <strong>{formatLabel(data.careerDomain)}</strong> is a big world! Choose a <strong>Specialization</strong> to zoom in.
            Think of it as choosing your superpower. 🦸
          </p>
        </motion.div>
      )}

      {((data.careerDomain && !needsSpecialization) || (needsSpecialization && data.specialization)) && availableRoleIds.length > 0 && !data.careerRole && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-accent/30 bg-accent/5 p-3 flex items-start gap-3"
        >
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Almost there! Pick your <strong>Career Role</strong> — this is the job title you'll tell your parents about. 😏
            Choose wisely (or don't, you can always come back).
          </p>
        </motion.div>
      )}

      {data.careerRole && selectedRole && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-primary/20 bg-primary/5 p-3 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
          <p className="text-xs text-primary font-medium">
            Perfect trajectory locked in! 🚀 You're all set to continue.
          </p>
        </motion.div>
      )}

      {data.educationLevel && availableFields.length > 0 && availableDomains.length > 0 && (
        <div className="rounded-lg bg-accent/5 border border-accent/20 p-2.5">
          <p className="text-[11px] text-accent font-medium">
            {formatLabel(eduId)} → {formatLabel(data.fieldOfStudy || "")}: {availableDomains.length} career domains available
          </p>
        </div>
      )}
    </div>,

    // Step 2: Technical Skills — emoji-based quick rating
    <div key="tech" className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Rate yourself for <span className="text-primary font-semibold">{data.careerRole || "your career"}</span>
        </p>
        <div className="flex flex-col items-end gap-1">
          <CompletionChip filled={techRated} total={techTotal} />
          {errors.technicalSkills && <p className="text-[10px] font-medium text-destructive animate-pulse">{errors.technicalSkills}</p>}
        </div>
      </div>
      <div className="space-y-2">
        {selectedRoleSkills.map(skill => (
          <SkillPill
            key={skill}
            label={skill}
            value={data.technicalSkills[skill] ?? 0}
            onChange={v => update({ technicalSkills: { ...data.technicalSkills, [skill]: v } })}
          />
        ))}
        {selectedRoleSkills.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <Zap className="w-8 h-8 mx-auto mb-2 opacity-30" />
            Select a career role in the previous step to see relevant skills
          </div>
        )}
      </div>
    </div>,

    // Step 3: People Skills — grouped with collapsible sections
    <div key="people" className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Quick self-assessment across 3 areas</p>
        <CompletionChip filled={peopleRated} total={peopleTotal} />
      </div>
      {allPeopleSkills.map(({ group, items }) => (
        <div key={group} className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{group}</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          {items.map(skill => {
            const dataKey = group === "Soft Skills" ? "softSkills" : group === "Communication" ? "communicationSkills" : "eiSkills";
            const skillData = data[dataKey] as Record<string, number>;
            return (
              <SkillPill
                key={skill}
                label={skill}
                value={skillData[skill] ?? 0}
                onChange={v => update({ [dataKey]: { ...skillData, [skill]: v } })}
                compact
              />
            );
          })}
        </div>
      ))}
    </div>,

    // Step 4: Experience + Portfolio (merged)
    <div key="exp-portfolio" className="space-y-6">
      {/* Experience counters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Experience</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {experienceTypes.map(type => (
            <motion.div
              key={type}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl border bg-card/60 p-3 text-center space-y-2"
            >
              <span className="text-xs font-medium text-muted-foreground">{type}</span>
              <div className="flex items-center justify-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  onClick={() => update({ experience: { ...data.experience, [type]: Math.max(0, (data.experience[type] ?? 0) - 1) } })}
                  className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm font-bold hover:bg-secondary transition-colors"
                >−</motion.button>
                <motion.span
                  key={data.experience[type] ?? 0}
                  initial={{ scale: 1.4, color: "hsl(var(--primary))" }}
                  animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                  className="font-mono-data text-xl font-bold w-6 text-center"
                >
                  {data.experience[type] ?? 0}
                </motion.span>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  onClick={() => update({ experience: { ...data.experience, [type]: (data.experience[type] ?? 0) + 1 } })}
                  className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold hover:bg-primary/20 transition-colors"
                >+</motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Portfolio — visual cards */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Portfolio</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {([
            { value: "none", icon: FolderOpen, label: "None yet" },
            { value: "basic", icon: FolderCheck, label: "Basic" },
            { value: "strong", icon: Medal, label: "Strong" },
          ] as const).map(opt => (
            <motion.button
              key={opt.value}
              type="button"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => update({ portfolioLevel: opt.value })}
              className={`rounded-xl border-2 p-4 text-center transition-all ${data.portfolioLevel === opt.value
                  ? "border-primary box-glow bg-primary/5"
                  : "border-border hover:border-muted-foreground"
                }`}
            >
              <opt.icon className={`w-6 h-6 mx-auto mb-1 ${data.portfolioLevel === opt.value ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-xs font-semibold">{opt.label}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      <CelebrationBurst active={celebrating} />

      <div className="w-full max-w-2xl">
        {/* Header with progress ring + step info */}
        <div className="flex items-center gap-4 mb-6">
          <ProgressRing progress={progress} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <StepIcon className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-bold truncate">{stepMeta[step].title}</h2>
              <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5 ml-auto whitespace-nowrap">
                {stepMeta[step].subtitle}
              </span>
            </div>
            {/* Motivational nudge — behavioral science */}
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-muted-foreground mt-1"
            >
              {stepMeta[step].nudge}
            </motion.p>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex gap-1.5 mb-6">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <motion.div
              key={i}
              className={`h-1 rounded-full flex-1 transition-colors duration-500 ${i < step ? "bg-primary" : i === step ? "gradient-primary" : "bg-muted"
                }`}
              animate={i === step ? { scaleY: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {stepContent[step]}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => step > 0 ? setStep(step - 1) : navigate("/")}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === 0 ? "Home" : "Back"}
          </Button>

          {/* Step indicator: "2 of 5" */}
          <span className="text-xs text-muted-foreground font-mono-data">
            {step + 1}/{TOTAL_STEPS}
          </span>

          {step < TOTAL_STEPS - 1 ? (
            <Button
              onClick={advanceStep}
              className="gradient-primary text-primary-foreground gap-2 px-6"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gradient-primary text-primary-foreground gap-2 px-6 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-white/10"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <Trophy className="h-4 w-4 relative z-10" />
              <span className="relative z-10">{isSubmitting ? "Generating Score..." : "See My Score"}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
