// Recruiter Intelligence Engine — rule-based, no AI
// Integrates with existing CPS/QPi data and Integrity Engine

export type TrustBadgeStatus = "High Trust" | "Moderate Trust" | "Low Trust";

export type CandidateUserType = "student" | "fresher" | "professional";
export type CandidatePool = "Fresher Pool" | "Entry-Level Pool" | "Mid-Level Pool" | "Senior Pool";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  education: string;
  fieldOfStudy: string;
  domain: string;
  cps: number;
  qpi: number;
  skills: Record<string, number>;
  topSkills: string[];
  weakSkills: string[];
  location: string;
  availability: "immediate" | "1_month" | "3_months";
  testPassed: boolean;
  interviewPassed: boolean;
  lastAssessment: string; // ISO date
  // Talent spectrum fields
  userType: CandidateUserType;
  experienceYears: number;
  currentRole: string;
  industry: string;
  // Integrity Engine fields
  cpsRaw: number;
  cpsFinalAdjusted: number;
  integrityMultiplier: number;
  trustBadgeStatus: TrustBadgeStatus;
  integrityPenaltiesTriggered: string[];
}

export type CandidateLevel = "Not Qualified" | "CPS Qualified" | "Interview Ready" | "Pre-Screened";

export interface RankedCandidate extends Candidate {
  level: CandidateLevel;
  levelWeight: number;
  matchPercentage: number;
  rankingScore: number;
  strengthLine: string;
  weaknessLine: string;
  readinessLine: string;
}

export interface Shortlist {
  id: string;
  name: string;
  candidates: ShortlistedCandidate[];
  createdAt: string;
}

export interface ShortlistedCandidate {
  candidateId: string;
  fitScore: number;
  notes: string;
  addedAt: string;
}

export interface RecruiterActivity {
  candidatesViewed: number;
  candidatesShortlisted: number;
  candidatesSaved: number;
}

// ── Level Logic ──
const CPS_THRESHOLD = 55;

export function getCandidateLevel(c: Candidate): CandidateLevel {
  if (c.cps < CPS_THRESHOLD) return "Not Qualified";
  if (c.testPassed && c.interviewPassed) return "Pre-Screened";
  if (c.interviewPassed) return "Interview Ready";
  return "CPS Qualified";
}

const LEVEL_WEIGHTS: Record<CandidateLevel, number> = {
  "Pre-Screened": 100,
  "Interview Ready": 80,
  "CPS Qualified": 60,
  "Not Qualified": 0,
};

// ── Match % ──
export function calcMatchPercentage(
  candidate: Candidate,
  requiredSkills: string[],
  requiredDomain: string
): number {
  const skillMatch = requiredSkills.length > 0
    ? candidate.topSkills.filter(s => requiredSkills.includes(s)).length / requiredSkills.length
    : 0.5;
  const domainMatch = candidate.domain.toLowerCase() === requiredDomain.toLowerCase() ? 1 : 0.3;
  return Math.round(
    (skillMatch * 0.4 + domainMatch * 0.2 + (candidate.cps / 100) * 0.2 + (candidate.qpi / 100) * 0.2) * 100
  );
}

// ── Ranking ──
function recencyScore(dateStr: string): number {
  const days = (Date.now() - new Date(dateStr).getTime()) / 86400000;
  if (days <= 7) return 100;
  if (days <= 30) return 75;
  if (days <= 90) return 50;
  return 25;
}

export function calcRankingScore(c: Candidate, matchPct: number): number {
  const level = getCandidateLevel(c);
  return Math.round(
    c.cps * 0.35 +
    c.qpi * 0.20 +
    matchPct * 0.20 +
    LEVEL_WEIGHTS[level] * 0.15 +
    recencyScore(c.lastAssessment) * 0.10
  );
}

// ── Shortlist Fit Score ──
export function calcShortlistScore(
  c: Candidate,
  roleSkills: string[]
): number {
  const roleMatch = roleSkills.length > 0
    ? c.topSkills.filter(s => roleSkills.includes(s)).length / roleSkills.length
    : 0.5;
  const avgSkillDepth = Object.values(c.skills).reduce((a, b) => a + b, 0) / Math.max(Object.keys(c.skills).length, 1);
  const cpsAlign = c.cps / 100;
  const interviewReady = c.interviewPassed ? 1 : 0.4;
  return Math.round(
    (roleMatch * 0.4 + (avgSkillDepth / 100) * 0.25 + cpsAlign * 0.2 + interviewReady * 0.15) * 100
  );
}

// ── Microcopy ──
function strengthLine(c: Candidate): string {
  const top = c.topSkills.slice(0, 2).join(" & ");
  return top ? `Strong ${top}` : "Balanced skill profile";
}
function weaknessLine(c: Candidate): string {
  const w = c.weakSkills[0];
  return w ? `Needs ${w} improvement` : "No major gaps detected";
}
function readinessLine(level: CandidateLevel): string {
  switch (level) {
    case "Pre-Screened": return "Ready for final-round interviews";
    case "Interview Ready": return "Ready for screening interviews";
    case "CPS Qualified": return "Good fit for entry-level roles";
    default: return "May require onboarding support";
  }
}

// ── Build ranked candidates ──
export function rankCandidates(
  candidates: Candidate[],
  requiredSkills: string[] = [],
  requiredDomain: string = ""
): RankedCandidate[] {
  return candidates
    .filter(c => c.cps >= CPS_THRESHOLD)
    .map(c => {
      const level = getCandidateLevel(c);
      const matchPercentage = calcMatchPercentage(c, requiredSkills, requiredDomain);
      const rankingScore = calcRankingScore(c, matchPercentage);
      return {
        ...c,
        level,
        levelWeight: LEVEL_WEIGHTS[level],
        matchPercentage,
        rankingScore,
        strengthLine: strengthLine(c),
        weaknessLine: weaknessLine(c),
        readinessLine: readinessLine(level),
      };
    })
    .sort((a, b) => b.rankingScore - a.rankingScore);
}

// ── Mock candidates ──
const NAMES = [
  "Aarav Sharma", "Priya Patel", "Rohan Mehta", "Sneha Reddy", "Vikram Singh",
  "Ananya Gupta", "Karan Joshi", "Diya Nair", "Arjun Das", "Meera Iyer",
  "Rahul Verma", "Pooja Kulkarni", "Amit Tiwari", "Neha Banerjee", "Siddharth Roy",
  "Kavya Menon", "Aditya Pandey", "Riya Choudhury", "Nikhil Rao", "Ishita Saxena",
  "Manish Kumar", "Shreya Agarwal", "Varun Malhotra", "Tanvi Deshmukh", "Harsh Chauhan",
];
const DOMAINS = ["Technology", "Data/AI", "Design", "Business", "Healthcare", "Engineering"];
const SKILLS_POOL = ["JavaScript", "Python", "SQL", "Communication", "Problem Solving", "Data Analysis", "UI/UX", "Machine Learning", "Leadership", "Excel", "React", "Java", "Cloud", "Teamwork", "Project Management"];
const LOCATIONS = ["Mumbai", "Bangalore", "Delhi", "Pune", "Hyderabad", "Chennai", "Kolkata"];
const EDUCATION = ["BTech", "BSc", "BCom", "BBA", "MCA", "MSc", "MBA"];
const FIELDS = ["Computer Science", "Mathematics", "Commerce", "Design", "Engineering", "Business"];
const INDUSTRIES = ["IT / Software", "Banking / Finance", "Healthcare", "E-Commerce", "Manufacturing", "Consulting", "Education"];
const ROLES = ["Developer", "Analyst", "Designer", "Manager", "Engineer", "Consultant", "Researcher"];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export function getCandidatePool(c: Candidate): CandidatePool {
  if (c.userType === "student" || (c.userType === "fresher" && c.experienceYears === 0)) return "Fresher Pool";
  if (c.experienceYears <= 2) return "Entry-Level Pool";
  if (c.experienceYears <= 5) return "Mid-Level Pool";
  return "Senior Pool";
}

export function filterByExperience(candidates: Candidate[], minYears: number, maxYears: number): Candidate[] {
  return candidates.filter(c => c.experienceYears >= minYears && c.experienceYears <= maxYears);
}

export function filterByIndustry(candidates: Candidate[], industry: string): Candidate[] {
  return candidates.filter(c => c.industry === industry);
}

export function generateMockCandidates(count: number = 25): Candidate[] {
  const rand = seededRandom(42);
  const userTypes: CandidateUserType[] = ["student", "fresher", "professional"];
  const PENALTY_REASONS = [
    "Expert claim on React exceeds possible experience window",
    "Expert-level confidence across all skills contradicts realistic proficiency distribution",
    "Self-assessment adjusted after expert verification challenge",
    "Assessment completed too quickly — below cognitive reading minimum",
    "Identical maximum rating on every question — no variance detected",
    "3 Expert-level claims with only 1 year(s) of experience",
    "Missing fundamental skills for target role — only 20% core coverage",
    "Claimed proficiency in fabricated technology: DataLoom",
  ];
  return Array.from({ length: count }, (_, i) => {
    const userType = userTypes[Math.floor(rand() * 3)];
    const experienceYears = userType === "professional" ? Math.round(1 + rand() * 12) : userType === "fresher" ? 0 : 0;
    const cpsRaw = Math.round(35 + rand() * 65);
    const qpi = Math.round(30 + rand() * 70);
    const shuffled = [...SKILLS_POOL].sort(() => rand() - 0.5);
    const topSkills = shuffled.slice(0, 3);
    const weakSkills = shuffled.slice(10, 12);
    const skills: Record<string, number> = {};
    topSkills.forEach(s => skills[s] = Math.round(60 + rand() * 40));
    weakSkills.forEach(s => skills[s] = Math.round(10 + rand() * 35));

    // Generate integrity data
    const integrityRoll = rand();
    const integrityMultiplier = integrityRoll > 0.7 ? 1.0 :
      integrityRoll > 0.3 ? Math.round((0.65 + rand() * 0.20) * 100) / 100 :
      Math.round((0.30 + rand() * 0.30) * 100) / 100;
    const trustBadgeStatus: TrustBadgeStatus = integrityMultiplier >= 0.85 ? "High Trust" :
      integrityMultiplier >= 0.60 ? "Moderate Trust" : "Low Trust";
    const penaltyCount = integrityMultiplier >= 0.85 ? 0 : integrityMultiplier >= 0.60 ? Math.floor(1 + rand() * 2) : Math.floor(2 + rand() * 3);
    const integrityPenaltiesTriggered = PENALTY_REASONS.sort(() => rand() - 0.5).slice(0, penaltyCount);
    const cpsFinalAdjusted = Math.round(cpsRaw * integrityMultiplier);

    const daysAgo = Math.round(rand() * 120);
    const date = new Date(Date.now() - daysAgo * 86400000).toISOString();

    return {
      id: `cand_${i + 1}`,
      name: NAMES[i % NAMES.length],
      email: `${NAMES[i % NAMES.length].toLowerCase().replace(" ", ".")}@email.com`,
      education: EDUCATION[Math.floor(rand() * EDUCATION.length)],
      fieldOfStudy: FIELDS[Math.floor(rand() * FIELDS.length)],
      domain: DOMAINS[Math.floor(rand() * DOMAINS.length)],
      cps: cpsFinalAdjusted,
      qpi,
      skills,
      topSkills,
      weakSkills,
      location: LOCATIONS[Math.floor(rand() * LOCATIONS.length)],
      availability: (["immediate", "1_month", "3_months"] as const)[Math.floor(rand() * 3)],
      testPassed: rand() > 0.4,
      interviewPassed: rand() > 0.5,
      lastAssessment: date,
      userType,
      experienceYears,
      currentRole: userType === "professional" ? ROLES[Math.floor(rand() * ROLES.length)] : "",
      industry: userType === "professional" ? INDUSTRIES[Math.floor(rand() * INDUSTRIES.length)] : "",
      cpsRaw,
      cpsFinalAdjusted,
      integrityMultiplier,
      trustBadgeStatus,
      integrityPenaltiesTriggered,
    };
  });
}

// ── Local storage helpers ──
const SHORTLISTS_KEY = "recruiter_shortlists";
const SAVED_KEY = "recruiter_saved";
const ACTIVITY_KEY = "recruiter_activity";

export function getShortlists(): Shortlist[] {
  try { return JSON.parse(localStorage.getItem(SHORTLISTS_KEY) || "[]"); } catch { return []; }
}
export function saveShortlists(lists: Shortlist[]) {
  localStorage.setItem(SHORTLISTS_KEY, JSON.stringify(lists));
}
export function getSavedCandidates(): string[] {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); } catch { return []; }
}
export function saveSavedCandidates(ids: string[]) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}
export function getActivity(): RecruiterActivity {
  try { return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '{"candidatesViewed":0,"candidatesShortlisted":0,"candidatesSaved":0}'); } catch { return { candidatesViewed: 0, candidatesShortlisted: 0, candidatesSaved: 0 }; }
}
export function updateActivity(update: Partial<RecruiterActivity>) {
  const a = getActivity();
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify({ ...a, ...update }));
}
