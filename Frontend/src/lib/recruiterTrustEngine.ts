// Recruiter Trust Score, Risk Scoring & Legal Consent Engine
// Extends recruiterAccessEngine — localStorage-based, no AI

import {
  getRecruiterAccounts,
  getInterests,
  getComplianceFlagsLog,
  addComplianceFlag,
  type ComplianceFlag,
} from "./recruiterAccessEngine";

// ── Types ──

export type TrustLevel = "high" | "medium" | "low";
export type RiskLevel = "low" | "medium" | "high";
export type ConsentRole = "candidate" | "recruiter";

export interface TrustMetrics {
  approvalRate: number;
  responseRate: number;
  complaintCount: number;
  flagCount: number;
  successfulHires: number;
}

export interface RecruiterTrustProfile {
  recruiterId: string;
  trustScore: number;
  trustLevel: TrustLevel;
  riskScore: number;
  riskLevel: RiskLevel;
  metrics: TrustMetrics;
  lastUpdated: string;
}

export interface ConsentRecord {
  userId: string;
  role: ConsentRole;
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  dataSharingConsent: boolean;
  recruiterAgreement: boolean;
  timestamp: string;
}

// ── Storage Keys ──
const TRUST_KEY = "recruiter_trust_profiles";
const CONSENT_KEY = "user_consent_records";

// ── Trust Profile CRUD ──

export function getTrustProfiles(): RecruiterTrustProfile[] {
  try { return JSON.parse(localStorage.getItem(TRUST_KEY) || "[]"); } catch { return []; }
}

function saveTrustProfiles(profiles: RecruiterTrustProfile[]) {
  localStorage.setItem(TRUST_KEY, JSON.stringify(profiles));
}

// ── Trust Score Calculation ──

function calculateTrustScore(metrics: TrustMetrics): number {
  const score = 100
    - (metrics.complaintCount * 10)
    - (metrics.flagCount * 8)
    + (metrics.successfulHires * 5)
    + (metrics.responseRate * 0.2);
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getTrustLevel(score: number): TrustLevel {
  if (score >= 80) return "high";
  if (score >= 50) return "medium";
  return "low";
}

// ── Risk Score Calculation ──

function calculateRiskScore(metrics: TrustMetrics): number {
  const spamScore = metrics.flagCount > 2 ? 30 : metrics.flagCount * 10;
  const score = (metrics.flagCount * 15) + (metrics.complaintCount * 20) + spamScore;
  return Math.min(100, Math.round(score));
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

// ── Build/Update Trust Profile ──

export function computeTrustProfile(recruiterId: string): RecruiterTrustProfile {
  const interests = getInterests().filter(i => i.recruiterId === recruiterId);
  const flagsLog = getComplianceFlagsLog().filter(f => f.recruiterId === recruiterId);
  const accounts = getRecruiterAccounts();
  const account = accounts.find(a => a.id === recruiterId);

  const totalInterests = interests.length;
  const approved = interests.filter(i => i.status === "approved").length;
  const approvalRate = totalInterests > 0 ? Math.round((approved / totalInterests) * 100) : 100;

  // Simulated metrics based on available data
  const seeded = recruiterId.charCodeAt(recruiterId.length - 1);
  const responseRate = Math.min(100, 60 + (seeded % 40));
  const successfulHires = Math.max(0, Math.floor(approved * 0.4));
  const complaintCount = flagsLog.filter(f => f.flagType === "unethical_contact" || f.flagType === "misuse_of_data").length;

  const metrics: TrustMetrics = {
    approvalRate,
    responseRate,
    complaintCount,
    flagCount: account?.compliance_flags?.length || 0,
    successfulHires,
  };

  const trustScore = calculateTrustScore(metrics);
  const riskScore = calculateRiskScore(metrics);

  const profile: RecruiterTrustProfile = {
    recruiterId,
    trustScore,
    trustLevel: getTrustLevel(trustScore),
    riskScore,
    riskLevel: getRiskLevel(riskScore),
    metrics,
    lastUpdated: new Date().toISOString(),
  };

  // Persist
  const profiles = getTrustProfiles();
  const idx = profiles.findIndex(p => p.recruiterId === recruiterId);
  if (idx >= 0) profiles[idx] = profile; else profiles.push(profile);
  saveTrustProfiles(profiles);

  return profile;
}

export function getAllTrustProfiles(): RecruiterTrustProfile[] {
  const accounts = getRecruiterAccounts();
  return accounts.map(a => computeTrustProfile(a.id));
}

// ── Auto-Flagging Rules ──

export function runAutoFlagging(recruiterId: string): string[] {
  const interests = getInterests().filter(i => i.recruiterId === recruiterId);
  const triggered: string[] = [];

  // Rule: Excessive CV requests (>50/day simulated as >10 total for demo)
  const cvRequests = interests.filter(i => i.status === "cv_requested" || i.status === "approved").length;
  if (cvRequests > 10) {
    addComplianceFlag(recruiterId, "spam_activity", "Auto-flagged: excessive CV requests");
    triggered.push("spam_activity");
  }

  // Rule: Multiple rejections = suspicious
  const rejected = interests.filter(i => i.status === "rejected").length;
  if (rejected > 3) {
    addComplianceFlag(recruiterId, "policy_violation", "Auto-flagged: repeated rejections");
    triggered.push("suspicious_behavior");
  }

  return triggered;
}

// ── Consent System ──

export function getConsentRecords(): ConsentRecord[] {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || "[]"); } catch { return []; }
}

function saveConsentRecords(records: ConsentRecord[]) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(records));
}

export function getConsent(userId: string): ConsentRecord | null {
  return getConsentRecords().find(c => c.userId === userId) || null;
}

export function recordConsent(
  userId: string,
  role: ConsentRole,
  consents: { terms: boolean; privacy: boolean; dataSharing: boolean; recruiterAgreement?: boolean }
): ConsentRecord {
  const records = getConsentRecords();
  const record: ConsentRecord = {
    userId,
    role,
    termsAccepted: consents.terms,
    privacyPolicyAccepted: consents.privacy,
    dataSharingConsent: consents.dataSharing,
    recruiterAgreement: consents.recruiterAgreement || false,
    timestamp: new Date().toISOString(),
  };
  const idx = records.findIndex(c => c.userId === userId);
  if (idx >= 0) records[idx] = record; else records.push(record);
  saveConsentRecords(records);
  return record;
}

export function isConsentValid(userId: string): boolean {
  const consent = getConsent(userId);
  if (!consent) return false;
  return consent.termsAccepted && consent.privacyPolicyAccepted;
}

export function hasDataSharingConsent(userId: string): boolean {
  const consent = getConsent(userId);
  return consent?.dataSharingConsent || false;
}

// ── Trust Level Colors ──

export const TRUST_LEVEL_COLORS: Record<TrustLevel, string> = {
  high: "bg-emerald-500/15 text-emerald-700",
  medium: "bg-amber-500/15 text-amber-700",
  low: "bg-red-500/15 text-red-700",
};

export const RISK_LEVEL_COLORS: Record<RiskLevel, string> = {
  low: "bg-emerald-500/15 text-emerald-700",
  medium: "bg-amber-500/15 text-amber-700",
  high: "bg-red-500/15 text-red-700",
};
