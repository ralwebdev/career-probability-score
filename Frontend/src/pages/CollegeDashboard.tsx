import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Image as ImageIcon, Building2, Users, BarChart3,
  MessageSquare, Plus, Pencil, Trash2, Eye, TrendingUp,
  GraduationCap, Target, IndianRupee, MapPin, Search, Star,
  Clock, ExternalLink, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { colleges, courseDetails, type CourseDetail, type CollegeProfile } from "@/lib/collegeCourseData";

type Tab = "courses" | "gallery" | "profile" | "leads" | "analytics" | "testimonials";

// Generate leads from actual course titles
function generateLeadsFromCourses(courses: CourseDetail[]) {
  const names = ["Arjun Kumar", "Priya Das", "Rahul Sharma", "Sneha Gupta", "Vikram Roy", "Anita Jain", "Sourav Dey", "Kavitha Nair", "Deepak Sahu", "Meera Singh"];
  const cities = ["Kolkata", "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai", "Jaipur"];
  const statuses = ["new", "contacted", "converted"] as const;
  return names.map((name, i) => {
    const course = courses[i % courses.length];
    return {
      id: i + 1,
      name,
      email: `${name.split(" ")[0].toLowerCase()}@email.com`,
      phone: `+91-98765${43210 + i}`,
      course: course.title,
      budget: `₹${(course.coursePrice - 10000).toLocaleString()}–₹${(course.coursePrice + 10000).toLocaleString()}`,
      location: cities[i % cities.length],
      date: `2026-03-${String(18 - i).padStart(2, "0")}`,
      status: statuses[i % 3],
    };
  });
}

function StatCard({ label, value, icon, change }: { label: string; value: string | number; icon: React.ReactNode; change?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="rounded-lg bg-primary/10 p-1.5">{icon}</div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold font-mono-data">{value}</p>
      {change && <p className="text-[10px] text-success mt-1">{change}</p>}
    </div>
  );
}

function CoursesTab({ courses, college }: { courses: CourseDetail[]; college: CollegeProfile }) {
  const [filter, setFilter] = useState<"all" | "3 months" | "6 months" | "12 months">("all");
  const filtered = filter === "all" ? courses : courses.filter(c => c.duration === filter);

  // Group courses by category
  const categories = useMemo(() => {
    const groups: Record<string, CourseDetail[]> = {};
    filtered.forEach(c => {
      const cat = c.duration === "3 months" ? "Certificate (3 months — ₹45,000)" :
                  c.duration === "6 months" ? "Advanced Certificate (6 months — ₹90,000)" :
                  c.duration === "12 months" ? "Diploma (12 months — ₹1,80,000)" :
                  "Degree Programs";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(c);
    });
    return groups;
  }, [filtered]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Your Courses ({courses.length})</h3>
        <Button size="sm" className="gradient-primary text-primary-foreground gap-1 text-xs">
          <Plus className="h-3 w-3" /> Add Course
        </Button>
      </div>
      <div className="flex gap-2 mb-6">
        {(["all", "3 months", "6 months", "12 months"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all capitalize ${
              filter === f ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}
          >
            {f === "all" ? `All (${courses.length})` : f}
          </button>
        ))}
      </div>

      {Object.entries(categories).map(([cat, catCourses]) => (
        <div key={cat} className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold">{cat}</h4>
            <Badge variant="secondary" className="text-[9px]">{catCourses.length}</Badge>
          </div>
          <div className="space-y-2">
            {catCourses.map(c => (
              <div key={c.id} className="rounded-xl border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h4 className="font-semibold text-sm">{c.title}</h4>
                      <Badge variant="secondary" className="text-[9px] capitalize">{c.mode}</Badge>
                      <Badge variant="outline" className="text-[9px]">{c.domain}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{c.description.slice(0, 120)}...</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />₹{c.coursePrice.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.duration}</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.seatsLeft} seats</span>
                      <span className="flex items-center gap-1"><Target className="h-3 w-3" />{c.skillsCovered.length} skills</span>
                      <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{c.modules.length} modules</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {c.skillsCovered.slice(0, 5).map(s => (
                        <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-[9px] text-secondary-foreground">{s}</span>
                      ))}
                      {c.skillsCovered.length > 5 && <span className="text-[9px] text-muted-foreground">+{c.skillsCovered.length - 5}</span>}
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4 shrink-0">
                    <Link to={`/course/${c.id}`}>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-3.5 w-3.5" /></Button>
                    </Link>
                    <Button size="icon" variant="ghost" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GalleryTab({ college }: { college: CollegeProfile }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? college.galleryImages : college.galleryImages.filter(i => i.category === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Gallery ({college.galleryImages.length} images)</h3>
        <Button size="sm" className="gradient-primary text-primary-foreground gap-1 text-xs">
          <Plus className="h-3 w-3" /> Upload Image
        </Button>
      </div>
      <div className="flex gap-2 mb-4">
        {["all", "campus", "classrooms", "labs", "events"].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all capitalize ${
              filter === cat ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}>{cat}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filtered.map((img, i) => (
          <div key={i} className="rounded-xl overflow-hidden aspect-video bg-muted relative group">
            <img src={img.url} alt={img.category} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button size="icon" variant="secondary" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
              <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
            <Badge className="absolute top-2 left-2 text-[9px] capitalize bg-background/80 text-foreground">{img.category}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab({ college }: { college: CollegeProfile }) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Institute Profile</h3>
          <Button size="sm" variant="outline" className="gap-1 text-xs"><Pencil className="h-3 w-3" /> Edit</Button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-xs text-muted-foreground">Name</p><p className="font-medium">{college.name}</p></div>
          <div><p className="text-xs text-muted-foreground">Location</p><p className="font-medium">{college.location}</p></div>
          <div><p className="text-xs text-muted-foreground">Established</p><p className="font-medium">{college.established}</p></div>
          <div><p className="text-xs text-muted-foreground">Accreditation</p><div className="flex flex-wrap gap-1 mt-0.5">{college.accreditation.map(a => <Badge key={a} variant="secondary" className="text-[9px]">{a}</Badge>)}</div></div>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h4 className="font-semibold text-sm mb-2">Vision</h4>
        <p className="text-sm text-muted-foreground">{college.vision}</p>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h4 className="font-semibold text-sm mb-2">Mission</h4>
        <p className="text-sm text-muted-foreground">{college.mission}</p>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm">Faculty ({college.facultyHighlights.length})</h4>
          <Button size="sm" variant="outline" className="gap-1 text-xs"><Plus className="h-3 w-3" /> Add</Button>
        </div>
        <div className="space-y-2">
          {college.facultyHighlights.map((f, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">{f.name}</p>
                <p className="text-[10px] text-primary">{f.designation} — {f.expertise}</p>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h4 className="font-semibold text-sm mb-3">Achievements</h4>
        <div className="space-y-1.5">
          {college.achievements.map((a, i) => (
            <p key={i} className="text-xs text-muted-foreground flex items-start gap-2"><span className="text-success">✓</span> {a}</p>
          ))}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <h4 className="font-semibold text-sm mb-3">Recruiters</h4>
        <div className="flex flex-wrap gap-2">
          {college.recruiters.map(r => <Badge key={r} variant="outline" className="text-xs">{r}</Badge>)}
        </div>
      </div>
    </div>
  );
}

function LeadsTab({ courses }: { courses: CourseDetail[] }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const leads = useMemo(() => generateLeadsFromCourses(courses), [courses]);

  const filtered = leads.filter(l => {
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    const matchesSearch = search === "" || l.name.toLowerCase().includes(search.toLowerCase()) || l.course.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Leads ({leads.length})</h3>
        <Button size="sm" variant="outline" className="gap-1 text-xs">Export CSV</Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search by name or course..." className="pl-8 h-9 text-xs" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1">
          {["all", "new", "contacted", "converted"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all capitalize ${
                statusFilter === s ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="rounded-xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="p-3 text-left text-xs text-muted-foreground font-medium">Name</th>
              <th className="p-3 text-left text-xs text-muted-foreground font-medium hidden sm:table-cell">Course</th>
              <th className="p-3 text-left text-xs text-muted-foreground font-medium hidden md:table-cell">Location</th>
              <th className="p-3 text-left text-xs text-muted-foreground font-medium hidden lg:table-cell">Budget</th>
              <th className="p-3 text-left text-xs text-muted-foreground font-medium">Status</th>
              <th className="p-3 text-left text-xs text-muted-foreground font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-3"><p className="text-xs font-medium">{l.name}</p><p className="text-[10px] text-muted-foreground">{l.email}</p></td>
                <td className="p-3 text-xs text-muted-foreground hidden sm:table-cell max-w-[200px] truncate">{l.course}</td>
                <td className="p-3 text-xs text-muted-foreground hidden md:table-cell">{l.location}</td>
                <td className="p-3 text-xs text-muted-foreground hidden lg:table-cell">{l.budget}</td>
                <td className="p-3">
                  <Badge className={`text-[9px] capitalize ${
                    l.status === "new" ? "bg-info/10 text-info border-info/30" :
                    l.status === "contacted" ? "bg-warning/10 text-warning border-warning/30" :
                    "bg-success/10 text-success border-success/30"
                  }`} variant="outline">{l.status}</Badge>
                </td>
                <td className="p-3 text-xs text-muted-foreground font-mono-data">{l.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center p-8 text-xs text-muted-foreground">No leads match your filters.</div>}
      </div>
    </div>
  );
}

function AnalyticsTab({ courses }: { courses: CourseDetail[] }) {
  // Derive analytics from actual course data
  const totalSeats = courses.reduce((s, c) => s + (30 - c.seatsLeft), 0);
  const avgPrice = Math.round(courses.reduce((s, c) => s + c.coursePrice, 0) / courses.length);
  const totalRevenue = courses.reduce((s, c) => s + c.coursePrice * (30 - c.seatsLeft), 0);
  const topCoursesByEnrollment = [...courses]
    .sort((a, b) => (30 - b.seatsLeft) - (30 - a.seatsLeft))
    .slice(0, 6);

  const domainStats = useMemo(() => {
    const domains: Record<string, { count: number; enrolled: number; revenue: number }> = {};
    courses.forEach(c => {
      if (!domains[c.domain]) domains[c.domain] = { count: 0, enrolled: 0, revenue: 0 };
      domains[c.domain].count++;
      domains[c.domain].enrolled += 30 - c.seatsLeft;
      domains[c.domain].revenue += c.coursePrice * (30 - c.seatsLeft);
    });
    return Object.entries(domains).sort((a, b) => b[1].enrolled - a[1].enrolled);
  }, [courses]);

  return (
    <div>
      <h3 className="font-semibold mb-4">Analytics Overview</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Courses" value={courses.length} icon={<BookOpen className="h-4 w-4 text-primary" />} />
        <StatCard label="Total Enrollments" value={totalSeats} icon={<Users className="h-4 w-4 text-primary" />} change="+12% this month" />
        <StatCard label="Avg. Course Fee" value={`₹${avgPrice.toLocaleString()}`} icon={<IndianRupee className="h-4 w-4 text-primary" />} />
        <StatCard label="Est. Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={<TrendingUp className="h-4 w-4 text-primary" />} change="+24% this month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card p-5">
          <h4 className="font-semibold text-sm mb-4">Top Courses by Enrollment</h4>
          <div className="space-y-3">
            {topCoursesByEnrollment.map((c, i) => {
              const enrolled = 30 - c.seatsLeft;
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium truncate max-w-[60%]">{c.title}</span>
                    <span className="text-[10px] text-muted-foreground font-mono-data">{enrolled} enrolled · ₹{c.coursePrice.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full gradient-primary"
                      initial={{ width: 0 }} animate={{ width: `${(enrolled / 30) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h4 className="font-semibold text-sm mb-4">Revenue by Domain</h4>
          <div className="space-y-3">
            {domainStats.map(([domain, stats], i) => (
              <div key={domain} className="flex items-center gap-4">
                <span className="text-xs font-medium w-20">{domain}</span>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full gradient-primary"
                      initial={{ width: 0 }} animate={{ width: `${(stats.revenue / Math.max(...domainStats.map(d => d[1].revenue))) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.15 }} />
                  </div>
                </div>
                <span className="text-[10px] font-mono-data text-muted-foreground w-16 text-right">₹{(stats.revenue / 100000).toFixed(1)}L</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center">
            {domainStats.map(([domain, stats]) => (
              <div key={domain}>
                <p className="text-[10px] text-muted-foreground">{domain}</p>
                <p className="text-xs font-semibold">{stats.count} courses</p>
                <p className="text-[10px] text-muted-foreground">{stats.enrolled} students</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing tiers overview */}
      <div className="mt-6 rounded-xl border bg-card p-5">
        <h4 className="font-semibold text-sm mb-4">Pricing Tiers</h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { label: "Certificate", duration: "3 months", price: "₹45,000", count: courses.filter(c => c.duration === "3 months").length },
            { label: "Advanced Certificate", duration: "6 months", price: "₹90,000", count: courses.filter(c => c.duration === "6 months").length },
            { label: "Diploma", duration: "12 months", price: "₹1,80,000", count: courses.filter(c => c.duration === "12 months").length },
            { label: "B.Voc Degree", duration: "3 years", price: "₹3,50,000", count: courses.filter(c => c.duration === "3 years").length },
          ].map(tier => (
            <div key={tier.label} className="rounded-lg border p-3 text-center">
              <p className="text-xs font-semibold">{tier.label}</p>
              <p className="text-lg font-bold font-mono-data text-primary">{tier.price}</p>
              <p className="text-[10px] text-muted-foreground">{tier.duration} · {tier.count} course{tier.count !== 1 ? "s" : ""}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsTab({ courses }: { courses: CourseDetail[] }) {
  const allTestimonials = courses.flatMap(c => c.testimonials.map(t => ({ ...t, courseName: c.title, courseId: c.id })));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Testimonials ({allTestimonials.length})</h3>
        <Button size="sm" className="gradient-primary text-primary-foreground gap-1 text-xs">
          <Plus className="h-3 w-3" /> Add Testimonial
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allTestimonials.map((t, i) => (
          <div key={i} className="rounded-xl border bg-card p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.courseName}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7"><Pencil className="h-3 w-3" /></Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive"><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} className={`h-3 w-3 ${si < t.rating ? "fill-accent text-accent" : "text-muted"}`} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic">"{t.feedback}"</p>
            <Link to={`/course/${t.courseId}`} className="text-[10px] text-primary mt-2 flex items-center gap-1 hover:underline">
              <ExternalLink className="h-3 w-3" /> View Course Page
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CollegeDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("courses");
  const college = colleges[0]; // Red Apple Learning
  const collegeCourses = courseDetails.filter(c => c.collegeId === college.id);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "courses", label: "Courses", icon: <BookOpen className="h-4 w-4" />, count: collegeCourses.length },
    { id: "gallery", label: "Gallery", icon: <ImageIcon className="h-4 w-4" />, count: college.galleryImages.length },
    { id: "profile", label: "Profile", icon: <Building2 className="h-4 w-4" /> },
    { id: "leads", label: "Leads", icon: <Users className="h-4 w-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "testimonials", label: "Reviews", icon: <MessageSquare className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold">
              {college.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{college.name}</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />{college.location}
                <span className="mx-1">·</span>
                <GraduationCap className="h-3 w-3" />{collegeCourses.length} courses
                <span className="mx-1">·</span>
                Est. {college.established}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? "gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}>
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && <span className="text-[10px] opacity-70">({tab.count})</span>}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === "courses" && <CoursesTab courses={collegeCourses} college={college} />}
          {activeTab === "gallery" && <GalleryTab college={college} />}
          {activeTab === "profile" && <ProfileTab college={college} />}
          {activeTab === "leads" && <LeadsTab courses={collegeCourses} />}
          {activeTab === "analytics" && <AnalyticsTab courses={collegeCourses} />}
          {activeTab === "testimonials" && <TestimonialsTab courses={collegeCourses} />}
        </motion.div>
      </div>
    </div>
  );
}
