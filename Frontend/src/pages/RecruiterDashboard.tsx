import { useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Users, Filter, BarChart3, ListChecks, UserCheck, X, Plus, ChevronRight, Briefcase, MapPin, GraduationCap, Clock, Star, TrendingUp, Eye, Lock, Send, FileText, CheckCircle2, XCircle, Sparkles, LogOut, Building2, ShieldCheck, Shield, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import {
  generateMockCandidates, rankCandidates, calcShortlistScore,
  getCandidateLevel, getCandidatePool, getShortlists, saveShortlists, getSavedCandidates,
  saveSavedCandidates, getActivity, updateActivity,
  type Candidate, type RankedCandidate, type Shortlist, type CandidateLevel, type CandidatePool, type TrustBadgeStatus,
} from "@/lib/recruiterEngine";
import {
  isRevenueCleared,
  type InterestStatus,
} from "@/lib/recruiterAccessEngine";
import { getRecruiterSession, type RecruiterUser } from "@/pages/RecruiterLogin";
import {
  getRecruiterShortlists, createRecruiterShortlist, addToRecruiterShortlist,
  removeFromRecruiterShortlist, toggleSavedCandidate, getRecruiterInterests,
  expressRecruiterInterest, requestCandidateCV, trackCandidateView as apiTrackView,
  getRecruiterCandidates
} from "@/lib/api";

const LEVEL_COLORS: Record<CandidateLevel, string> = {
  "Pre-Screened": "bg-emerald-500/15 text-emerald-700 border-emerald-200",
  "Interview Ready": "bg-blue-500/15 text-blue-700 border-blue-200",
  "CPS Qualified": "bg-amber-500/15 text-amber-700 border-amber-200",
  "Not Qualified": "bg-red-500/15 text-red-700 border-red-200",
};

const STATUS_COLORS: Record<InterestStatus, string> = {
  interested: "bg-blue-500/15 text-blue-700",
  cv_requested: "bg-amber-500/15 text-amber-700",
  approved: "bg-emerald-500/15 text-emerald-700",
  rejected: "bg-red-500/15 text-red-700",
};

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [recruiterUser, setRecruiterUser] = useState<RecruiterUser | null>(null);

  useEffect(() => {
    const session = getRecruiterSession();
    if (!session) {
      navigate("/recruiter-login");
    } else {
      setRecruiterUser(session);
    }
  }, [navigate]);

  const [apiInterests, setApiInterests] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    if (recruiterUser?.token) {
      getRecruiterShortlists(recruiterUser.token).then(setShortlists).catch(console.error);
      getRecruiterInterests(recruiterUser.token).then(setApiInterests).catch(console.error);
      
      getRecruiterCandidates(recruiterUser.token).then((rawCandidates: any[]) => {
        const mappedCandidates: Candidate[] = rawCandidates.map((a: any) => {
          const skills: Record<string, number> = {
            ...(a.technicalSkills || {}),
            ...(a.softSkills || {}),
            ...(a.communicationSkills || {})
          };
          const sortedSkills = Object.entries(skills).sort(([, v1], [, v2]) => Number(v2) - Number(v1));
          const topSkills = sortedSkills.slice(0, 3).map(([k]) => k);
          const weakSkills = sortedSkills.slice(-3).map(([k]) => k).reverse();

          return {
            id: a._id,
            name: a.name || 'Unknown',
            email: a.email || '',
            education: a.educationLevel || 'N/A',
            fieldOfStudy: a.fieldOfStudy || 'N/A',
            domain: a.careerDomain || 'Technology',
            cps: a.scores?.total || 50,
            qpi: a.scores?.qpi || 50,
            skills: Object.keys(skills).length > 0 ? skills : { "Communication": 70, "Problem Solving": 65 },
            topSkills: topSkills.length ? topSkills : ["Communication"],
            weakSkills: weakSkills.length ? weakSkills : ["Leadership"],
            location: `${a.city || ''}, ${a.state || ''}`.replace(/^, |, $/g, '') || "Unknown",
            availability: "immediate",
            testPassed: true,
            interviewPassed: (a.scores?.total || 0) > 60,
            lastAssessment: a.createdAt || new Date().toISOString(),
            userType: "student",
            experienceYears: 0,
            currentRole: a.careerRole || '',
            industry: (a.likelyIndustries && a.likelyIndustries[0]) || 'IT',
            cpsRaw: a.scores?.total || 50,
            cpsFinalAdjusted: a.scores?.total || 50,
            integrityMultiplier: 1.0,
            trustBadgeStatus: "High Trust",
            integrityPenaltiesTriggered: [],
          };
        });
        setCandidates(mappedCandidates);
      }).catch(console.error);
    }
  }, [recruiterUser]);

  const [locationSearch, setLocationSearch] = useState("");
  const [cpsRange, setCpsRange] = useState([0, 100]);
  const [detailCandidate, setDetailCandidate] = useState<RankedCandidate | null>(null);
  const [saved, setSaved] = useState<string[]>(() => getSavedCandidates());
  const [shortlists, setShortlists] = useState<Shortlist[]>(() => getShortlists());
  const [newListName, setNewListName] = useState("");
  const [activity, setActivity] = useState(() => getActivity());
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [interestRefresh, setInterestRefresh] = useState(0);

  useState(() => {
    setTimeout(() => setLoading(false), 800);
  });

  const ranked = useMemo(() => {
    let filtered = candidates.filter(c => {
      if (c.cps < cpsRange[0] || c.cps > cpsRange[1]) return false;
      if (locationSearch && !c.location.toLowerCase().includes(locationSearch.toLowerCase())) return false;
      return true;
    });
    return rankCandidates(filtered, [], "");
  }, [candidates, locationSearch, cpsRange]);

  const toggleSave = useCallback(async (id: string) => {
    if (recruiterUser?.token) {
      try {
        const newSaved = await toggleSavedCandidate(id, recruiterUser.token);
        setSaved(newSaved);
        const a = { ...activity, candidatesSaved: newSaved.length };
        setActivity(a);
      } catch (e) {
        console.error("Save candidate failed", e);
      }
    } else {
      // Fallback if no token (shouldn't happen)
      setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }
  }, [activity, recruiterUser]);

  const viewCandidate = useCallback(async (c: RankedCandidate) => {
    setDetailCandidate(c);
    const a = { ...activity, candidatesViewed: activity.candidatesViewed + 1 };
    setActivity(a);
    if (recruiterUser?.token) {
      apiTrackView(recruiterUser.token).catch(console.error);
    }
  }, [activity, recruiterUser]);

  const createShortlist = useCallback(async () => {
    if (!newListName.trim() || !recruiterUser?.token) return;
    try {
      const newList = await createRecruiterShortlist(newListName.trim(), recruiterUser.token);
      setShortlists([...shortlists, newList]);
      setNewListName("");
    } catch (e) {
      console.error("Create shortlist failed", e);
    }
  }, [newListName, shortlists, recruiterUser]);

  const addToShortlist = useCallback(async (listId: string, candidateId: string) => {
    const cand = candidates.find(c => c.id === candidateId);
    if (!cand || !recruiterUser?.token) return;
    try {
      const fitScore = calcShortlistScore(cand, []);
      const updatedList = await addToRecruiterShortlist(listId, { candidateId, fitScore, notes: "" }, recruiterUser.token);
      setShortlists(shortlists.map(sl => sl._id === listId || sl.id === listId ? updatedList : sl));
      const a = { ...activity, candidatesShortlisted: activity.candidatesShortlisted + 1 };
      setActivity(a);
    } catch (e) {
      console.error("Add to shortlist failed", e);
    }
  }, [shortlists, candidates, activity, recruiterUser]);

  const removeFromShortlist = useCallback(async (listId: string, candidateId: string) => {
    if (!recruiterUser?.token) return;
    try {
      const updatedList = await removeFromRecruiterShortlist(listId, candidateId, recruiterUser.token);
      setShortlists(shortlists.map(sl => sl._id === listId || sl.id === listId ? updatedList : sl));
    } catch (e) {
      console.error("Remove from shortlist failed", e);
    }
  }, [shortlists, recruiterUser]);

  const handleInterest = useCallback(async (candidateId: string, candidateName: string, candidateCps: number) => {
    if (!recruiterUser?.token) return;
    try {
      await expressRecruiterInterest({ candidateId, candidateName, candidateCps }, recruiterUser.token);
      setInterestRefresh(p => p + 1);
      toast({ title: "Interest Expressed", description: "Express interest to request candidate details" });
      const interests = await getRecruiterInterests(recruiterUser.token);
      setApiInterests(interests);
    } catch (e) {
      console.error("Express interest failed", e);
    }
  }, [recruiterUser]);

  const handleCVRequest = useCallback(async (candidateId: string) => {
    if (!recruiterUser?.token) return;
    try {
      await requestCandidateCV(candidateId, recruiterUser.token);
      setInterestRefresh(p => p + 1);
      toast({ title: "CV Requested", description: "Request submitted to admin for approval" });
      const interests = await getRecruiterInterests(recruiterUser.token);
      setApiInterests(interests);
    } catch (e) {
      console.error("CV request failed", e);
    }
  }, [recruiterUser]);

  const conversionRate = activity.candidatesViewed > 0
    ? Math.round((activity.candidatesShortlisted / activity.candidatesViewed) * 100)
    : 0;

  const savedCandidates = useMemo(() =>
    ranked.filter(c => saved.includes(c.id)),
    [ranked, saved]
  );

  const getStatus = (candidateId: string) => {
    const interest = apiInterests.find(i => i.candidateId === candidateId);
    return interest ? interest.status : null;
  };
  const isApproved = (candidateId: string) => getStatus(candidateId) === "approved";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _refresh = interestRefresh;

  const CandidateCard = ({ c, i }: { c: RankedCandidate; i: number }) => {
    const status = getStatus(c.id);
    const approved = isApproved(c.id);
    const revenueOk = isRevenueCleared(c.id);
    const displayName = c.name;

    return (
      <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
        <Card className="group hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer" onClick={() => viewCandidate(c)}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                  {displayName}
                  {!approved && <Lock className="h-3 w-3 text-muted-foreground" />}
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</p>
              </div>
              <div className="flex items-center gap-1">
                {!revenueOk && <Badge variant="outline" className="text-[9px] border-amber-300 text-amber-600">Restricted</Badge>}
                <button onClick={e => { e.stopPropagation(); toggleSave(c.id); }} className="transition-transform hover:scale-125">
                  <Heart className={`h-5 w-5 ${saved.includes(c.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <div className="text-2xl font-bold text-primary">{c.cpsFinalAdjusted}</div>
              <span className="text-xs text-muted-foreground">CPS</span>
              {/* Trust Badge */}
              {c.trustBadgeStatus === "High Trust" && (
                <span className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold bg-emerald-500/15 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="h-3 w-3" />Verified
                </span>
              )}
              {c.trustBadgeStatus === "Moderate Trust" && (
                <span className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold bg-yellow-500/15 text-yellow-700 border border-yellow-200">
                  <Shield className="h-3 w-3" />Moderate
                </span>
              )}
              {c.trustBadgeStatus === "Low Trust" && (
                <span className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold bg-red-500/15 text-red-700 border border-red-200">
                  <ShieldAlert className="h-3 w-3" />Flagged
                </span>
              )}
              <Badge variant="outline" className="text-[9px]">{getCandidatePool(c)}</Badge>
              <Badge className={`ml-auto text-[10px] ${LEVEL_COLORS[c.level]}`}>{c.level}</Badge>
            </div>
            {c.userType === "professional" && c.currentRole && (
              <p className="text-[10px] text-muted-foreground mb-2 flex items-center gap-1">
                <Briefcase className="h-3 w-3" />{c.currentRole} · {c.experienceYears}yr · {c.industry || "—"}
              </p>
            )}

            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-xs text-muted-foreground">Match</span>
              <Progress value={c.matchPercentage} className="flex-1 h-2" />
              <span className="text-xs font-semibold text-foreground">{c.matchPercentage}%</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {c.topSkills.map(s => (
                <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground">{c.strengthLine} | {c.weaknessLine}</p>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              {!status ? (
                <Button size="sm" variant="outline" className="text-[10px] h-7 gap-1" onClick={e => { e.stopPropagation(); handleInterest(c.id, c.name, c.cps); }}>
                  <Sparkles className="h-3 w-3" />Show Interest
                </Button>
              ) : (
                <Badge className={`text-[10px] ${STATUS_COLORS[status]}`}>
                  {status === "interested" ? "Interested" : status === "cv_requested" ? "CV Requested" : status === "approved" ? "Approved" : "Rejected"}
                </Badge>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (!recruiterUser) return null;

  const handleLogout = () => {
    sessionStorage.removeItem("recruiterUser");
    navigate("/recruiter-login");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Recruiter Dashboard</h1>
                <p className="text-sm text-muted-foreground">{recruiterUser.name} · {recruiterUser.company}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1 text-xs">
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </Button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            <span>Candidate identities are protected until admin approval. Express interest to unlock profiles.</span>
          </div>
        </motion.div>

        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12">
            <TabsTrigger value="discover" className="gap-1.5 text-xs sm:text-sm"><Search className="h-4 w-4" />Discover</TabsTrigger>
            <TabsTrigger value="shortlists" className="gap-1.5 text-xs sm:text-sm"><ListChecks className="h-4 w-4" />Shortlists</TabsTrigger>
            <TabsTrigger value="saved" className="gap-1.5 text-xs sm:text-sm"><Heart className="h-4 w-4" />Saved</TabsTrigger>
            <TabsTrigger value="filters" className="gap-1.5 text-xs sm:text-sm"><Filter className="h-4 w-4" />Filters</TabsTrigger>
            <TabsTrigger value="insights" className="gap-1.5 text-xs sm:text-sm"><BarChart3 className="h-4 w-4" />Insights</TabsTrigger>
          </TabsList>

          {/* ── TAB 1: DISCOVER ── */}
          <TabsContent value="discover" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Filter by location (e.g. Bangalore, Delhi)" value={locationSearch} onChange={e => setLocationSearch(e.target.value)} className="pl-10" />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2"><Filter className="h-4 w-4" />CPS Filter</Button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <Card>
                    <CardContent className="p-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-2 block">CPS Range: {cpsRange[0]}–{cpsRange[1]}</label>
                        <Slider min={0} max={100} step={5} value={cpsRange} onValueChange={setCpsRange} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{ranked.length} candidates found</p>
              <p className="text-[10px] text-muted-foreground">Limited verified candidates available</p>
            </div>

            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i}><CardContent className="p-5 space-y-3"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-8 w-full" /><Skeleton className="h-4 w-2/3" /></CardContent></Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ranked.map((c, i) => <CandidateCard key={c.id} c={c} i={i} />)}
              </div>
            )}

            {!loading && ranked.length === 0 && (
              <Card><CardContent className="p-12 text-center"><UserCheck className="h-12 w-12 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">No candidates match your filters. Try adjusting your criteria.</p></CardContent></Card>
            )}
          </TabsContent>

          {/* ── TAB 2: SHORTLISTS ── */}
          <TabsContent value="shortlists" className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="New shortlist name (e.g. Frontend Hiring)" value={newListName} onChange={e => setNewListName(e.target.value)} />
              <Button onClick={createShortlist} className="gap-2"><Plus className="h-4 w-4" />Create</Button>
            </div>

            {shortlists.length === 0 && (
              <Card><CardContent className="p-12 text-center"><ListChecks className="h-12 w-12 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">No shortlists yet. Create one to start organizing candidates.</p></CardContent></Card>
            )}

            {shortlists.map(sl => (
              <Card key={sl._id || sl.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2"><ListChecks className="h-5 w-5 text-primary" />{sl.name}<Badge variant="secondary" className="ml-auto">{sl.candidates.length} candidates</Badge></CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sl.candidates.length === 0 && <p className="text-sm text-muted-foreground">No candidates added yet. Go to Discover tab to add candidates.</p>}
                  {sl.candidates.map(sc => {
                    const cand = candidates.find(c => c.id === sc.candidateId);
                    if (!cand) return null;
                    const approved = isApproved(sc.candidateId);
                    return (
                      <motion.div key={sc.candidateId} layout className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">{cand.name[0]}</div>
                          <div>
                            <p className="text-sm font-medium text-foreground flex items-center gap-1">{cand.name} {!approved && <Lock className="h-3 w-3 text-muted-foreground" />}</p>
                            <p className="text-xs text-muted-foreground">CPS {cand.cps} · Fit Score: {sc.fitScore}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={sc.fitScore >= 70 ? "default" : "secondary"} className="text-[10px]">{sc.fitScore >= 70 ? "Highly suitable" : "Moderate fit"}</Badge>
                          <Button variant="ghost" size="icon" onClick={() => removeFromShortlist(sl._id || sl.id, sc.candidateId)}><X className="h-4 w-4" /></Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ── TAB 3: SAVED ── */}
          <TabsContent value="saved" className="space-y-4">
            {savedCandidates.length === 0 && (
              <Card><CardContent className="p-12 text-center"><Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">No saved candidates. Click the heart icon to bookmark candidates.</p></CardContent></Card>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              {savedCandidates.map(c => {
                const approved = isApproved(c.id);
                return (
                  <Card key={c.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => viewCandidate(c)}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">{c.name[0]}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate flex items-center gap-1">{c.name} {!approved && <Lock className="h-3 w-3 text-muted-foreground" />}</h3>
                        <p className="text-xs text-muted-foreground">{c.domain} · CPS {c.cps} · {c.level}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{c.matchPercentage}%</div>
                        <p className="text-[10px] text-muted-foreground">Match</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* ── TAB 4: FILTERS & PREFERENCES ── */}
          <TabsContent value="filters" className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Filter Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">CPS Range: {cpsRange[0]}–{cpsRange[1]}</label>
                  <Slider min={0} max={100} step={5} value={cpsRange} onValueChange={setCpsRange} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Only CPS score is used in filtering.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── TAB 5: ACTIVITY INSIGHTS ── */}
          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Candidates Viewed", value: activity.candidatesViewed, icon: Eye, color: "text-blue-600" },
                { label: "Candidates Shortlisted", value: activity.candidatesShortlisted, icon: ListChecks, color: "text-emerald-600" },
                { label: "Conversion Rate", value: `${conversionRate}%`, icon: TrendingUp, color: "text-primary" },
              ].map(m => (
                <motion.div key={m.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-xl bg-muted flex items-center justify-center ${m.color}`}><m.icon className="h-6 w-6" /></div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{m.value}</p>
                        <p className="text-sm text-muted-foreground">{m.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  You shortlisted <span className="font-semibold text-foreground">{conversionRate}%</span> of viewed candidates.
                  {conversionRate > 30 ? " Great engagement — you're finding relevant talent." : conversionRate > 10 ? " Consider refining your filters for better matches." : " Try broadening your search criteria to discover more talent."}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-lg">Saved Candidates</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center"><Heart className="h-6 w-6 text-red-500" /></div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{saved.length}</p>
                    <p className="text-sm text-muted-foreground">Bookmarked candidates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ── DETAIL SLIDE-IN WITH PRIVACY ── */}
        <Sheet open={!!detailCandidate} onOpenChange={open => !open && setDetailCandidate(null)}>
          <SheetContent className="overflow-y-auto w-full sm:max-w-lg">
            {detailCandidate && (() => {
              const status = getStatus(detailCandidate.id);
              const approved = isApproved(detailCandidate.id);
              const revenueOk = isRevenueCleared(detailCandidate.id);
              const displayName = detailCandidate.name;

              return (
                <>
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      {displayName}
                      {!approved && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </SheetTitle>
                    <SheetDescription>{detailCandidate.readinessLine}</SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-6">
                    {/* Privacy Notice */}
                    {!approved && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:bg-amber-950/30 dark:border-amber-800">
                        <p className="text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                          <Lock className="h-3.5 w-3.5" />
                          Candidate identity is protected. Express interest and request CV for admin approval to unlock full profile.
                        </p>
                      </div>
                    )}

                    {approved && (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:bg-emerald-950/30 dark:border-emerald-800">
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Full profile unlocked — contact details and resume available.
                        </p>
                      </div>
                    )}

                    {/* Snapshot */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "CPS Score", value: detailCandidate.cps },
                        { label: "Match %", value: `${detailCandidate.matchPercentage}%` },
                        { label: "Ranking", value: detailCandidate.rankingScore },
                      ].map(s => (
                        <div key={s.label} className="rounded-lg bg-muted/50 p-3 text-center">
                          <p className="text-xl font-bold text-primary">{s.value}</p>
                          <p className="text-[10px] text-muted-foreground">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    <Badge className={LEVEL_COLORS[detailCandidate.level]}>{detailCandidate.level}</Badge>

                    {/* Contact — only if approved */}
                    {approved && (
                      <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                        <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5"><FileText className="h-4 w-4" />Contact Details</h4>
                        <p className="text-sm text-foreground">{detailCandidate.name}</p>
                        <p className="text-sm text-muted-foreground">{detailCandidate.email}</p>
                        <Button size="sm" variant="outline" className="gap-1.5 mt-2"><FileText className="h-3.5 w-3.5" />Download Resume</Button>
                      </div>
                    )}

                    {/* Info */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground"><GraduationCap className="h-4 w-4" />{detailCandidate.education} — {detailCandidate.fieldOfStudy}</div>
                      <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" />{detailCandidate.location}</div>
                      <div className="flex items-center gap-2 text-muted-foreground"><Briefcase className="h-4 w-4" />{detailCandidate.domain}</div>
                      <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" />{detailCandidate.availability.replace("_", " ")}</div>
                    </div>

                    {/* Skill Breakdown */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Skill Breakdown</h4>
                      <div className="space-y-2">
                        {Object.entries(detailCandidate.skills).map(([skill, val]) => (
                          <div key={skill} className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-28 truncate">{skill}</span>
                            <Progress value={val as number} className="flex-1 h-2" />
                            <span className="text-xs font-medium text-foreground w-8 text-right">{val as number}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gap Analysis */}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Gap Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Needs improvement in: <span className="font-medium text-foreground">{detailCandidate.weakSkills.slice(0, 2).join(" & ")}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{detailCandidate.weaknessLine}</p>
                    </div>

                    {/* Interest + CV Actions */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-border">
                      {!status && (
                        <Button onClick={() => handleInterest(detailCandidate.id, detailCandidate.name, detailCandidate.cps)} className="gap-2">
                          <Sparkles className="h-4 w-4" />Show Interest
                        </Button>
                      )}
                      {status === "interested" && (
                        <Button onClick={() => handleCVRequest(detailCandidate.id)} variant="default" className="gap-2">
                          <Send className="h-4 w-4" />Request CV
                        </Button>
                      )}
                      {status === "cv_requested" && (
                        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-3 text-center">
                          <p className="text-xs text-amber-700 dark:text-amber-400">CV request pending admin approval</p>
                        </div>
                      )}
                      {status === "approved" && (
                        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-3 text-center">
                          <p className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" />Access granted — full profile available above</p>
                        </div>
                      )}
                      {status === "rejected" && (
                        <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-3 text-center">
                          <p className="text-xs text-red-700 dark:text-red-400 flex items-center justify-center gap-1"><XCircle className="h-3.5 w-3.5" />Request rejected — candidate not eligible</p>
                        </div>
                      )}

                      <Button onClick={() => toggleSave(detailCandidate.id)} variant={saved.includes(detailCandidate.id) ? "secondary" : "outline"} className="gap-2">
                        <Heart className={`h-4 w-4 ${saved.includes(detailCandidate.id) ? "fill-red-500 text-red-500" : ""}`} />
                        {saved.includes(detailCandidate.id) ? "Saved" : "Save Candidate"}
                      </Button>

                      {shortlists.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {shortlists.map(sl => (
                            <Button key={sl._id || sl.id} size="sm" variant="outline" className="text-xs gap-1" onClick={() => addToShortlist(sl._id || sl.id, detailCandidate.id)} disabled={sl.candidates.some(c => c.candidateId === detailCandidate.id)}>
                              <Plus className="h-3 w-3" />
                              {sl.candidates.some(c => c.candidateId === detailCandidate.id) ? `In ${sl.name}` : sl.name}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
