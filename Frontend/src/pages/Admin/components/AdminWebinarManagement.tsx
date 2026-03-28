import { useState, useEffect } from "react";
import { Plus, Trash2, Calendar, User, Clock, Link as LinkIcon, Loader2 } from "lucide-react";
import { getWebinars, createWebinar, deleteWebinar } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface Webinar {
  _id: string;
  title: string;
  speaker: string;
  date: string;
  time: string;
  registrationLink: string;
}

export default function AdminWebinarManagement({ token }: { token: string }) {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    speaker: "",
    date: "",
    time: "",
    registrationLink: "",
  });

  useEffect(() => {
    fetchWebinars();
  }, []);

  const fetchWebinars = async () => {
    try {
      const data = await getWebinars();
      setWebinars(data);
    } catch (error: any) {
      toast.error("Failed to fetch webinars");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createWebinar(formData, token);
      toast.success("Webinar added successfully");
      setFormData({ title: "", speaker: "", date: "", time: "", registrationLink: "" });
      setShowAddForm(false);
      fetchWebinars();
    } catch (error: any) {
      toast.error(error.message || "Failed to add webinar");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this webinar?")) return;
    try {
      await deleteWebinar(id, token);
      toast.success("Webinar deleted");
      fetchWebinars();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete webinar");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Manage Upcoming Webinars</h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} variant={showAddForm ? "outline" : "default"} className="gap-2">
          {showAddForm ? "Cancel" : <><Plus className="h-4 w-4" /> Add Webinar</>}
        </Button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="rounded-xl border bg-card/50 p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Webinar Title</label>
                  <input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. How to Build a Portfolio"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Speaker Name</label>
                  <input
                    required
                    value={formData.speaker}
                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                    className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. John Doe, Senior Dev"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <input
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. Mar 22, 2026"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <input
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. 6:00 PM IST"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-sm font-medium">Registration Link (Optional)</label>
                  <input
                    value={formData.registrationLink}
                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                    className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Adding..." : "Confirm & Add Webinar"}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {webinars.length === 0 ? (
          <div className="text-center py-12 border rounded-xl bg-card/50 text-muted-foreground">
            No upcoming webinars found. Add one to get started.
          </div>
        ) : (
          webinars.map((webinar) => (
            <div key={webinar._id} className="rounded-xl border bg-card/50 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold">{webinar.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" /> {webinar.speaker}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {webinar.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {webinar.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {webinar.registrationLink !== "#" && (
                  <a href={webinar.registrationLink} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-accent/50 hover:bg-accent text-accent-foreground transition-colors">
                    <LinkIcon className="h-4 w-4" />
                  </a>
                )}
                <Button variant="destructive" size="sm" onClick={() => handleDelete(webinar._id)} className="gap-2">
                  <Trash2 className="h-4 w-4" /> Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
