// Recruiter Access & Privacy Engine — localStorage-based, no AI
// Handles: Interest tracking, CV requests, admin approvals, candidate privacy, recruiter management, compliance

export type InterestStatus = "interested" | "cv_requested" | "approved" | "rejected";
export type RecruiterAccountStatus = "pending" | "approved" | "rejected" | "blacklisted";
export type FollowUpStatus = "pending" | "contacted" | "converted";
export type ComplianceFlag = "spam_activity" | "misuse_of_data" | "unethical_contact" | "policy_violation";

export interface ComplianceFlagEntry {
  recruiterId: string;
  flagType: ComplianceFlag;
  description: string;
  createdAt: string;
}

export interface RecruiterInterest {
  id: string;
  recruiterId: string;
  candidateId: string;
  candidateName: string;
  candidateCps: number;
  status: InterestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CandidateVisibility {
  candidateId: string;
  paymentStatus: "paid" | "unpaid";
  collegeTieup: boolean;
  profileComplete: boolean;
}

export interface RecruiterAccount {
  id: string;
  name: string;
  company: string;
  email: string;
  password: string;
  status: RecruiterAccountStatus;
  compliance_flags: ComplianceFlag[];
  rejection_reason: string;
  blacklist_reason: string;
  createdAt: string;
  approvedAt: string | null;
  rejectedAt: string | null;
  blacklistedAt: string | null;
}

export interface CandidateFollowUp {
  candidateId: string;
  lastContacted: string | null;
  followUpStatus: FollowUpStatus;
  notes: string;
}

export interface AdminAuditEntry {
  id: string;
  adminAction: string;
  targetRecruiterId: string;
  targetRecruiterName: string;
  details: string;
  createdAt: string;
}

// ── Storage keys ──
const INTERESTS_KEY = "recruiter_interests";
const VISIBILITY_KEY = "candidate_visibility";
const RECRUITER_ACCOUNTS_KEY = "recruiter_accounts";
const FOLLOW_UPS_KEY = "candidate_follow_ups";
const COMPLIANCE_FLAGS_KEY = "compliance_flags_log";
const AUDIT_LOG_KEY = "admin_audit_log";

// ── Audit Trail ──
export function getAuditLog(): AdminAuditEntry[] {
  try { return JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || "[]"); } catch { return []; }
}

function logAuditAction(action: string, recruiterId: string, recruiterName: string, details: string) {
  const log = getAuditLog();
  log.unshift({ id: `aud_${Date.now()}`, adminAction: action, targetRecruiterId: recruiterId, targetRecruiterName: recruiterName, details, createdAt: new Date().toISOString() });
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(log.slice(0, 200)));
}

// ── Compliance Flags Log ──
export function getComplianceFlagsLog(): ComplianceFlagEntry[] {
  try { return JSON.parse(localStorage.getItem(COMPLIANCE_FLAGS_KEY) || "[]"); } catch { return []; }
}

export function addComplianceFlag(recruiterId: string, flagType: ComplianceFlag, description: string) {
  const log = getComplianceFlagsLog();
  log.push({ recruiterId, flagType, description, createdAt: new Date().toISOString() });
  localStorage.setItem(COMPLIANCE_FLAGS_KEY, JSON.stringify(log));

  // Also add to account
  const accounts = getRecruiterAccounts();
  const idx = accounts.findIndex(a => a.id === recruiterId);
  if (idx !== -1 && !accounts[idx].compliance_flags.includes(flagType)) {
    accounts[idx].compliance_flags.push(flagType);
    saveRecruiterAccounts(accounts);
    logAuditAction("add_flag", recruiterId, accounts[idx].name, `Flag added: ${flagType} — ${description}`);
  }
}

export function removeComplianceFlag(recruiterId: string, flagType: ComplianceFlag) {
  const accounts = getRecruiterAccounts();
  const idx = accounts.findIndex(a => a.id === recruiterId);
  if (idx !== -1) {
    accounts[idx].compliance_flags = accounts[idx].compliance_flags.filter(f => f !== flagType);
    saveRecruiterAccounts(accounts);
    logAuditAction("remove_flag", recruiterId, accounts[idx].name, `Flag removed: ${flagType}`);
  }
}

// ── Recruiter Account Management ──
export function getRecruiterAccounts(): RecruiterAccount[] {
  try {
    const raw: any[] = JSON.parse(localStorage.getItem(RECRUITER_ACCOUNTS_KEY) || "[]");
    // Migrate old accounts missing new fields
    return raw.map(a => ({
      ...a,
      compliance_flags: a.compliance_flags || [],
      rejection_reason: a.rejection_reason || "",
      blacklist_reason: a.blacklist_reason || "",
      rejectedAt: a.rejectedAt || null,
      blacklistedAt: a.blacklistedAt || null,
    }));
  } catch { return []; }
}

function saveRecruiterAccounts(accounts: RecruiterAccount[]) {
  localStorage.setItem(RECRUITER_ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function seedDefaultRecruiters() {
  const existing = getRecruiterAccounts();
  if (existing.length > 0) return;
  const defaults: RecruiterAccount[] = [
    { id: "rec_1", name: "Amit Verma", company: "TechCorp India", email: "recruiter@techcorp.com", password: "recruiter123", status: "approved", compliance_flags: [], rejection_reason: "", blacklist_reason: "", createdAt: new Date(Date.now() - 30 * 86400000).toISOString(), approvedAt: new Date(Date.now() - 29 * 86400000).toISOString(), rejectedAt: null, blacklistedAt: null },
    { id: "rec_2", name: "Priya Nair", company: "StartupX", email: "hr@startupx.io", password: "recruiter123", status: "approved", compliance_flags: [], rejection_reason: "", blacklist_reason: "", createdAt: new Date(Date.now() - 20 * 86400000).toISOString(), approvedAt: new Date(Date.now() - 19 * 86400000).toISOString(), rejectedAt: null, blacklistedAt: null },
    { id: "rec_3", name: "Rahul Gupta", company: "Global Inc.", email: "talent@globalinc.com", password: "recruiter123", status: "pending", compliance_flags: [], rejection_reason: "", blacklist_reason: "", createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), approvedAt: null, rejectedAt: null, blacklistedAt: null },
    { id: "rec_4", name: "Sneha Patel", company: "InnovateTech", email: "sneha@innovatetech.com", password: "recruiter123", status: "pending", compliance_flags: [], rejection_reason: "", blacklist_reason: "", createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), approvedAt: null, rejectedAt: null, blacklistedAt: null },
    { id: "rec_5", name: "Vikram Desai", company: "DataFlow Labs", email: "vikram@dataflow.io", password: "recruiter123", status: "rejected", compliance_flags: ["policy_violation"], rejection_reason: "Incomplete verification documents", blacklist_reason: "", createdAt: new Date(Date.now() - 10 * 86400000).toISOString(), approvedAt: null, rejectedAt: new Date(Date.now() - 8 * 86400000).toISOString(), blacklistedAt: null },
  ];
  saveRecruiterAccounts(defaults);
}

export function registerRecruiter(name: string, company: string, email: string, password: string): RecruiterAccount | null {
  const accounts = getRecruiterAccounts();
  const existing = accounts.find(a => a.email === email);
  // Block blacklisted re-registration
  if (existing) {
    if (existing.status === "blacklisted") return null; // permanently blocked
    return null; // already exists
  }
  const account: RecruiterAccount = {
    id: `rec_${Date.now()}`, name, company, email, password,
    status: "pending", compliance_flags: [], rejection_reason: "", blacklist_reason: "",
    createdAt: new Date().toISOString(), approvedAt: null, rejectedAt: null, blacklistedAt: null,
  };
  saveRecruiterAccounts([...accounts, account]);
  return account;
}

export function authenticateRecruiterAccount(email: string, password: string): RecruiterAccount | null {
  seedDefaultRecruiters();
  const accounts = getRecruiterAccounts();
  return accounts.find(a => a.email === email && a.password === password) || null;
}

export function approveRecruiterAccount(recruiterId: string): boolean {
  const accounts = getRecruiterAccounts();
  const idx = accounts.findIndex(a => a.id === recruiterId);
  if (idx === -1) return false;
  if (accounts[idx].status === "blacklisted") return false; // Cannot un-blacklist
  accounts[idx].status = "approved";
  accounts[idx].approvedAt = new Date().toISOString();
  accounts[idx].rejection_reason = "";
  accounts[idx].rejectedAt = null;
  saveRecruiterAccounts(accounts);
  logAuditAction("approve", recruiterId, accounts[idx].name, "Account approved");
  return true;
}

export function rejectRecruiterAccount(recruiterId: string, reason: string = ""): boolean {
  const accounts = getRecruiterAccounts();
  const idx = accounts.findIndex(a => a.id === recruiterId);
  if (idx === -1) return false;
  if (accounts[idx].status === "blacklisted") return false;
  accounts[idx].status = "rejected";
  accounts[idx].rejection_reason = reason;
  accounts[idx].rejectedAt = new Date().toISOString();
  saveRecruiterAccounts(accounts);
  logAuditAction("reject", recruiterId, accounts[idx].name, `Account rejected: ${reason || "No reason provided"}`);
  return true;
}

export function blacklistRecruiterAccount(recruiterId: string, reason: string): boolean {
  const accounts = getRecruiterAccounts();
  const idx = accounts.findIndex(a => a.id === recruiterId);
  if (idx === -1) return false;
  accounts[idx].status = "blacklisted";
  accounts[idx].blacklist_reason = reason;
  accounts[idx].blacklistedAt = new Date().toISOString();
  saveRecruiterAccounts(accounts);
  logAuditAction("blacklist", recruiterId, accounts[idx].name, `Account permanently blacklisted: ${reason}`);
  return true;
}

export function getRecruiterAccountStats() {
  const accounts = getRecruiterAccounts();
  return {
    total: accounts.length,
    pending: accounts.filter(a => a.status === "pending").length,
    approved: accounts.filter(a => a.status === "approved").length,
    rejected: accounts.filter(a => a.status === "rejected").length,
    blacklisted: accounts.filter(a => a.status === "blacklisted").length,
  };
}

// ── Follow-Up Tracking ──
export function getFollowUps(): CandidateFollowUp[] {
  try { return JSON.parse(localStorage.getItem(FOLLOW_UPS_KEY) || "[]"); } catch { return []; }
}

function saveFollowUps(followUps: CandidateFollowUp[]) {
  localStorage.setItem(FOLLOW_UPS_KEY, JSON.stringify(followUps));
}

export function getFollowUp(candidateId: string): CandidateFollowUp {
  const all = getFollowUps();
  const existing = all.find(f => f.candidateId === candidateId);
  if (existing) return existing;
  return { candidateId, lastContacted: null, followUpStatus: "pending", notes: "" };
}

export function markFollowUp(candidateId: string, status: FollowUpStatus, notes?: string): CandidateFollowUp {
  const all = getFollowUps();
  const idx = all.findIndex(f => f.candidateId === candidateId);
  const updated: CandidateFollowUp = {
    candidateId, lastContacted: new Date().toISOString(), followUpStatus: status,
    notes: notes || (idx >= 0 ? all[idx].notes : ""),
  };
  if (idx >= 0) { all[idx] = updated; } else { all.push(updated); }
  saveFollowUps(all);
  return updated;
}

// ── Interest CRUD ──
export function getInterests(): RecruiterInterest[] {
  try { return JSON.parse(localStorage.getItem(INTERESTS_KEY) || "[]"); } catch { return []; }
}

function saveInterests(interests: RecruiterInterest[]) {
  localStorage.setItem(INTERESTS_KEY, JSON.stringify(interests));
}

export function expressInterest(recruiterId: string, candidateId: string, candidateName: string, candidateCps: number): RecruiterInterest {
  const interests = getInterests();
  const existing = interests.find(i => i.recruiterId === recruiterId && i.candidateId === candidateId);
  if (existing) return existing;
  const interest: RecruiterInterest = {
    id: `int_${Date.now()}`, recruiterId, candidateId, candidateName, candidateCps,
    status: "interested", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  };
  saveInterests([...interests, interest]);
  return interest;
}

export function requestCV(recruiterId: string, candidateId: string): RecruiterInterest | null {
  const interests = getInterests();
  const idx = interests.findIndex(i => i.recruiterId === recruiterId && i.candidateId === candidateId);
  if (idx === -1) return null;
  if (interests[idx].status === "cv_requested" || interests[idx].status === "approved") return interests[idx];
  interests[idx].status = "cv_requested";
  interests[idx].updatedAt = new Date().toISOString();
  saveInterests(interests);
  return interests[idx];
}

export function adminApprove(interestId: string): boolean {
  const interests = getInterests();
  const idx = interests.findIndex(i => i.id === interestId);
  if (idx === -1) return false;
  interests[idx].status = "approved";
  interests[idx].updatedAt = new Date().toISOString();
  saveInterests(interests);
  return true;
}

export function adminReject(interestId: string): boolean {
  const interests = getInterests();
  const idx = interests.findIndex(i => i.id === interestId);
  if (idx === -1) return false;
  interests[idx].status = "rejected";
  interests[idx].updatedAt = new Date().toISOString();
  saveInterests(interests);
  return true;
}

// ── Candidate visibility ──
export function getVisibility(): CandidateVisibility[] {
  try { return JSON.parse(localStorage.getItem(VISIBILITY_KEY) || "[]"); } catch { return []; }
}

function saveVisibility(vis: CandidateVisibility[]) {
  localStorage.setItem(VISIBILITY_KEY, JSON.stringify(vis));
}

export function getCandidateVisibility(candidateId: string): CandidateVisibility {
  const all = getVisibility();
  const existing = all.find(v => v.candidateId === candidateId);
  if (existing) return existing;
  const seeded = candidateId.charCodeAt(candidateId.length - 1);
  const vis: CandidateVisibility = {
    candidateId, paymentStatus: seeded % 3 === 0 ? "unpaid" : "paid",
    collegeTieup: seeded % 4 !== 0, profileComplete: seeded % 5 !== 0,
  };
  saveVisibility([...all, vis]);
  return vis;
}

// ── Privacy logic ──
export function isFullProfileVisible(candidateId: string, recruiterId: string): boolean {
  const interests = getInterests();
  const interest = interests.find(i => i.recruiterId === recruiterId && i.candidateId === candidateId);
  return interest?.status === "approved";
}

export function isCandidateDiscoverable(candidateId: string, cps: number, threshold: number = 55): boolean {
  const vis = getCandidateVisibility(candidateId);
  return cps >= threshold && vis.profileComplete;
}

export function isRevenueCleared(candidateId: string): boolean {
  const vis = getCandidateVisibility(candidateId);
  return vis.paymentStatus === "paid" || vis.collegeTieup;
}

export function getInterestStatus(recruiterId: string, candidateId: string): InterestStatus | null {
  const interests = getInterests();
  const interest = interests.find(i => i.recruiterId === recruiterId && i.candidateId === candidateId);
  return interest?.status || null;
}

// ── Masking helpers ──
export function maskName(name: string): string {
  const parts = name.split(" ");
  return parts.map(p => p[0] + "•".repeat(p.length - 1)).join(" ");
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  return local.slice(0, 2) + "•••@" + domain;
}

// ── Admin stats ──
export function getInterestStats() {
  const interests = getInterests();
  return {
    total: interests.length,
    interested: interests.filter(i => i.status === "interested").length,
    cvRequested: interests.filter(i => i.status === "cv_requested").length,
    approved: interests.filter(i => i.status === "approved").length,
    rejected: interests.filter(i => i.status === "rejected").length,
  };
}

// ── Seed mock interests for admin demo ──
export function seedMockInterests(candidateNames: { id: string; name: string; cps: number }[]) {
  const existing = getInterests();
  if (existing.length > 0) return;
  const statuses: InterestStatus[] = ["interested", "cv_requested", "cv_requested", "approved", "rejected", "interested", "cv_requested"];
  const mocks: RecruiterInterest[] = candidateNames.slice(0, 7).map((c, i) => ({
    id: `int_mock_${i}`, recruiterId: `rec_${(i % 3) + 1}`, candidateId: c.id,
    candidateName: c.name, candidateCps: c.cps, status: statuses[i],
    createdAt: new Date(Date.now() - (7 - i) * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - (7 - i) * 86400000).toISOString(),
  }));
  saveInterests(mocks);
}
