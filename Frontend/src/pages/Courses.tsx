import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { courses as mockCourses, getSegmentedRecommendations, type Course } from "@/lib/courseData";
import { getCourses } from "@/lib/api";
import { type AssessmentData } from "@/lib/careerData";
import { getSkillsForRole, formatLabel, rolesByDomain } from "@/lib/careerMasterDB";
import { BookOpen, Star, Clock, Award, ExternalLink, Filter, AlertTriangle, GraduationCap, Target, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function CourseCard({ course, matchingSkills, rank }: { course: Course; matchingSkills?: string[]; rank?: number }) {
  if (!course) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card/50 p-5 flex flex-col justify-between relative"
    >
      {rank !== undefined && rank < 3 && (
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
          {rank + 1}
        </div>
      )}
      <div>
        <div className="flex items-start justify-between mb-2">
          <Badge variant={course.providerType === "redapple" ? "default" : "secondary"} className={course.providerType === "redapple" ? "gradient-primary text-primary-foreground text-[10px]" : "text-[10px]"}>
            {course.providerType === "redapple" ? "⭐ Red Apple Learning" : "External"}
          </Badge>
          <div className="flex items-center gap-1 text-accent text-xs">
            <Star className="h-3 w-3 fill-accent" />{course.rating || 0}
          </div>
        </div>
        <h3 className="font-semibold text-sm mb-1">{course.title || "Untitled Course"}</h3>
        <p className="text-xs text-muted-foreground mb-3">{course.provider}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {course.skills.slice(0, 5).map(s => (
            <span key={s} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
              matchingSkills?.includes(s) ? "bg-destructive/15 text-destructive border border-destructive/30" : "bg-secondary text-secondary-foreground"
            }`}>{s}{matchingSkills?.includes(s) ? " ⚡" : ""}</span>
          ))}
          {course.skills.length > 5 && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">+{course.skills.length - 5}</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
          <span className="capitalize">{course.mode}</span>
          <span className="font-semibold text-foreground">{course.price}</span>
        </div>
      </div>

      <Button size="sm" variant="outline" className="mt-4 w-full gap-2 text-xs" asChild>
        <a href={`/course/${course.id}`}>
          <ExternalLink className="h-3 w-3" />Explore Course
        </a>
      </Button>
    </motion.div>
  );
}

function CourseGrid({ title, icon, description, courses: courseList, skillGaps, ranked, accentColor }: {
  title: string;
  icon: React.ReactNode;
  description: string;
  courses: Course[];
  skillGaps: string[];
  ranked: boolean;
  accentColor: string;
}) {
  const [filter, setFilter] = useState<"all" | "redapple" | "external">("all");
  const filtered = filter === "all" ? courseList : courseList.filter(c => c.providerType === filter);

  if (courseList.length === 0) return null;

  return (
    <div className="mb-10">
      <div className={`flex items-center gap-3 mb-1 ${accentColor}`}>
        {icon}
        <h2 className="text-lg font-bold">{title}</h2>
        <span className="ml-auto text-[10px] font-mono bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
          {courseList.length} course{courseList.length !== 1 ? "s" : ""}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-4 ml-8">{description}</p>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4 ml-8">
        <Filter className="h-3 w-3 text-muted-foreground" />
        {(["all", "redapple", "external"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-2.5 py-1 text-[10px] font-medium transition-all ${
              filter === f ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}
          >
            {f === "all" ? "All" : f === "redapple" ? "Red Apple" : "External"}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-muted-foreground">
          {filtered.length} shown
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course, i) => (
          <CourseCard
            key={course.id}
            course={course}
            matchingSkills={skillGaps}
            rank={ranked ? i : undefined}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-xs">No courses match this filter.</p>
        </div>
      )}
    </div>
  );
}

export default function Courses() {
  const [dbCourses, setDbCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const raw = sessionStorage.getItem("cps-assessment");
  const data: AssessmentData | null = raw ? JSON.parse(raw) : null;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const rawData = await getCourses();
        if (rawData && rawData.length > 0) {
          // Map database fields to frontend structure
          const mappedData = rawData.map((c: any) => ({
            ...c,
            skills: c.skillsCovered || c.skills || [],
            price: c.coursePrice ? `₹${c.coursePrice.toLocaleString()}` : (c.price || "Free"),
            providerType: c.collegeId === "redapple" ? "redapple" : (c.providerType || "external"),
            provider: c.collegeId === "redapple" ? "Red Apple Learning" : (c.provider || "Partner"),
            careers: c.careerRoles || c.careers || [],
            rating: c.rating || 4.5
          }));
          setDbCourses(mappedData);
        } else {
          setDbCourses(mockCourses);
        }
      } catch (error) {
        console.error("Failed to fetch courses, using mock data", error);
        setDbCourses(mockCourses);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const coursesToDisplay = dbCourses.length > 0 ? dbCourses : mockCourses;

  // Resolve role ID from display name using master DB
  const selectedRoleId = useMemo(() => {
    if (!data?.careerRole) return "";
    for (const [, roles] of Object.entries(rolesByDomain)) {
      for (const roleId of roles) {
        if (formatLabel(roleId) === data.careerRole) return roleId;
      }
    }
    return "";
  }, [data?.careerRole]);

  // Get skills from master DB
  const roleSkills = useMemo(() => getSkillsForRole(selectedRoleId), [selectedRoleId]);

  // Identify skill gaps: skills rated below 2
  const skillGaps = useMemo(() => {
    if (!data || roleSkills.length === 0) return [];
    return roleSkills.filter(s => (data.technicalSkills[s] ?? 0) < 2);
  }, [data, roleSkills]);

  // Segmented recommendations
  const { primary, secondary } = useMemo(() => {
    if (!data || roleSkills.length === 0) return { primary: [], secondary: [] };
    return getSegmentedRecommendations(skillGaps, "", data.careerRole, coursesToDisplay);
  }, [data, skillGaps, roleSkills, coursesToDisplay]);

  const hasAssessment = !!data?.careerRole;
  const gapCount = skillGaps.length;
  const totalSkills = roleSkills.length;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-4">
            <BookOpen className="h-4 w-4" /> Course Recommendation Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            {hasAssessment ? "Your Personalized Learning Path" : "Explore Career Courses"}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            {hasAssessment
              ? `Tailored for ${data!.careerRole} — ${gapCount} skill gap${gapCount !== 1 ? "s" : ""} detected out of ${totalSkills} required skills`
              : "Take the assessment first for personalized recommendations"}
          </p>
        </motion.div>

        {/* Assessment context banner */}
        {hasAssessment && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4"
          >
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Education:</span>
                <span className="font-semibold">{data!.educationLevel}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Career:</span>
                <span className="font-semibold">{data!.careerRole}</span>
              </div>
              {data!.fieldOfStudy && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Field:</span>
                  <span className="font-semibold">{formatLabel(data!.fieldOfStudy)}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Skill gaps breakdown */}
        {skillGaps.length > 0 && (
          <div className="mb-8 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-semibold">Skills to Strengthen</span>
              <span className="ml-auto text-[10px] font-mono bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">
                {gapCount}/{totalSkills} need work
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillGaps.map(s => {
                const level = data?.technicalSkills[s] ?? 0;
                const isWeak = level <= 0;
                return (
                  <span key={s} className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    isWeak
                      ? "border-destructive/40 bg-destructive/15 text-destructive"
                      : "border-accent/30 bg-accent/10 text-accent"
                  }`}>
                    {s} {isWeak ? "🔴" : "🟡"}
                  </span>
                );
              })}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              🔴 No experience · 🟡 Beginner — courses below are ranked to fill these gaps first
            </p>
          </div>
        )}

        {hasAssessment && skillGaps.length === 0 && roleSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center"
          >
            <Award className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-semibold text-primary">You're already proficient in all required skills! 🎉</p>
            <p className="text-xs text-muted-foreground mt-1">Browse courses below to level up even further.</p>
          </motion.div>
        )}

        {/* Segmented course display */}
        {hasAssessment && primary.length > 0 ? (
          <>
            <CourseGrid
              title={`Primary — ${data!.careerRole} Pathway`}
              icon={<Target className="h-5 w-5" />}
              description={`Courses directly aligned with a career in ${data!.careerRole}. These build the exact skills employers look for.`}
              courses={primary}
              skillGaps={skillGaps}
              ranked={true}
              accentColor="text-primary"
            />

            {secondary.length > 0 && (
              <CourseGrid
                title="Secondary — Complementary Skills"
                icon={<Layers className="h-5 w-5" />}
                description="These courses cover adjacent skills that can strengthen your profile and broaden career flexibility."
                courses={secondary}
                skillGaps={skillGaps}
                ranked={false}
                accentColor="text-muted-foreground"
              />
            )}
          </>
        ) : (
          /* No assessment — show all courses with a single filter */
          <CourseGrid
            title="All Available Courses"
            icon={<BookOpen className="h-5 w-5" />}
            description="Take the assessment for personalized recommendations tailored to your career path."
            courses={coursesToDisplay}
            skillGaps={[]}
            ranked={false}
            accentColor="text-foreground"
          />
        )}
      </div>
    </div>
  );
}
