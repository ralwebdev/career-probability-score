import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MessageCircle, ExternalLink, Video, Megaphone, Bell } from "lucide-react";

const upcomingWebinars = [
  { title: "How to Build a Job-Ready Portfolio in 30 Days", date: "Mar 22, 2026", time: "6:00 PM IST", speaker: "Ankit Sharma, Red Apple Learning" },
  { title: "Cracking Product Interviews: Strategy & Frameworks", date: "Mar 29, 2026", time: "7:00 PM IST", speaker: "Priya Mehta, Ex-Google PM" },
  { title: "AI/ML Career Roadmap 2026", date: "Apr 5, 2026", time: "5:30 PM IST", speaker: "Dr. Ravi Kumar, IIT Delhi" },
  { title: "From Fresher to Frontend Developer in 6 Months", date: "Apr 12, 2026", time: "6:00 PM IST", speaker: "Sneha Reddy, Red Apple Learning" },
];

const communityBenefits = [
  { icon: Megaphone, title: "Job Alerts", desc: "Daily curated job openings matching your skill profile" },
  { icon: Video, title: "Free Webinars", desc: "Weekly expert sessions on career growth & skill building" },
  { icon: Bell, title: "Career Updates", desc: "Industry trends, salary reports, and hiring insights" },
  { icon: Users, title: "Peer Network", desc: "Connect with 5,000+ job seekers and professionals" },
];

export default function Workshops() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/5 px-4 py-1.5 text-sm text-success mb-4">
            <Users className="h-4 w-4" /> Workshops & Community
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Level Up Together</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Join free webinars, workshops, and our career community</p>
        </motion.div>

        {/* WhatsApp Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-2xl border border-success/30 bg-gradient-to-br from-success/10 to-success/5 p-8 text-center"
        >
          <MessageCircle className="h-12 w-12 mx-auto text-success mb-4" />
          <h2 className="text-2xl font-bold mb-2">Join Our WhatsApp Job Community</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get daily job alerts, career advice, and connect with 5,000+ professionals — completely free.
          </p>
          <Button size="lg" className="bg-success text-success-foreground hover:bg-success/90 gap-2 px-8">
            <MessageCircle className="h-5 w-5" />
            Join WhatsApp Community
            <ExternalLink className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Community Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {communityBenefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border bg-card/50 p-5 flex items-start gap-4"
            >
              <div className="rounded-lg bg-primary/10 p-2.5">
                <b.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{b.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Webinars */}
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" /> Upcoming Webinars
        </h2>
        <div className="space-y-3 mb-12">
          {upcomingWebinars.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border bg-card/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h3 className="font-semibold text-sm">{w.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{w.speaker}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs font-medium text-primary">{w.date}</div>
                  <div className="text-[10px] text-muted-foreground">{w.time}</div>
                </div>
                <Button size="sm" variant="outline" className="text-xs shrink-0">Register Free</Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Unlock */}
        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
          <h2 className="text-xl font-bold text-accent mb-2">🎁 Unlock a Free Career Workshop</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Share your CPS Score on LinkedIn and get instant access to an exclusive career planning workshop by Red Apple Learning.
          </p>
          <Button size="lg" className="gradient-primary text-primary-foreground gap-2 px-8">
            Share on LinkedIn & Unlock
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
