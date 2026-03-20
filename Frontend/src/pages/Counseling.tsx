import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, MessageCircle, CalendarIcon, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// UTC offsets for common countries (IST = +5:30)
const countryTimezones: Record<string, { label: string; offsetMinutes: number }> = {
  India: { label: "IST (UTC+5:30)", offsetMinutes: 330 },
  "United States": { label: "EST (UTC-5)", offsetMinutes: -300 },
  "United Kingdom": { label: "GMT (UTC+0)", offsetMinutes: 0 },
  Canada: { label: "EST (UTC-5)", offsetMinutes: -300 },
  Australia: { label: "AEST (UTC+10)", offsetMinutes: 600 },
  Germany: { label: "CET (UTC+1)", offsetMinutes: 60 },
  Singapore: { label: "SGT (UTC+8)", offsetMinutes: 480 },
  UAE: { label: "GST (UTC+4)", offsetMinutes: 240 },
  Japan: { label: "JST (UTC+9)", offsetMinutes: 540 },
  "South Korea": { label: "KST (UTC+9)", offsetMinutes: 540 },
  China: { label: "CST (UTC+8)", offsetMinutes: 480 },
  France: { label: "CET (UTC+1)", offsetMinutes: 60 },
  Netherlands: { label: "CET (UTC+1)", offsetMinutes: 60 },
  "New Zealand": { label: "NZST (UTC+12)", offsetMinutes: 720 },
  Bangladesh: { label: "BST (UTC+6)", offsetMinutes: 360 },
  Nepal: { label: "NPT (UTC+5:45)", offsetMinutes: 345 },
  "Sri Lanka": { label: "SLST (UTC+5:30)", offsetMinutes: 330 },
};

// Generate IST time slots from 7:00 to 21:00 in 15-min intervals
function generateISTSlots(): { istMinutes: number; label: string }[] {
  const slots: { istMinutes: number; label: string }[] = [];
  for (let m = 7 * 60; m <= 21 * 60; m += 15) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
    slots.push({ istMinutes: m, label: `${h12}:${min.toString().padStart(2, "0")} ${ampm}` });
  }
  return slots;
}

function convertToLocalLabel(istMinutes: number, countryOffset: number): string {
  const IST_OFFSET = 330;
  const diff = countryOffset - IST_OFFSET;
  let localMin = istMinutes + diff;
  // Wrap around midnight
  if (localMin < 0) localMin += 24 * 60;
  if (localMin >= 24 * 60) localMin -= 24 * 60;
  const h = Math.floor(localMin / 60);
  const min = localMin % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${min.toString().padStart(2, "0")} ${ampm}`;
}

const IST_SLOTS = generateISTSlots();

import { submitCounseling } from "@/lib/api";

export default function Counseling() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preferredDate, setPreferredDate] = useState<Date>();
  const [form, setForm] = useState({
    name: "", phone: "", email: "", careerInterest: "",
    budget: "", time: "", mode: "", schedule: "", country: "India", preferredTime: "",
  });

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitCounseling({ ...form, preferredDate });
      setSubmitted(true);
      toast({ title: "Request Submitted!", description: "A counselor will reach out within 24 hours." });
    } catch (error: any) {
      toast({ 
        title: "Submission Failed", 
        description: error.message || "There was an error submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-success">
          <CheckCircle className="h-16 w-16" />
        </motion.div>
        <h2 className="text-2xl font-bold">Thank You!</h2>
        <p className="text-muted-foreground text-center max-w-md">Your counseling request has been submitted. A career advisor from Red Apple Learning will contact you within 24 hours.</p>
        <div className="flex gap-3 mt-4">
          <Button onClick={() => navigate("/")} variant="outline">Home</Button>
          <Button onClick={() => navigate("/assessment")} className="gradient-primary text-primary-foreground">Take Assessment</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> Home
        </Button>
        <div className="text-center mb-8">
          <MessageCircle className="h-10 w-10 mx-auto text-primary mb-3" />
          <h1 className="text-3xl font-bold">Career Counseling</h1>
          <p className="text-muted-foreground mt-2">Get personalized guidance from experts</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label>Name</Label><Input value={form.name} onChange={e => update("name", e.target.value)} required /></div>
          <div><Label>Phone</Label><Input value={form.phone} onChange={e => update("phone", e.target.value)} required /></div>
          <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => update("email", e.target.value)} required /></div>
          <div><Label>Career Interest</Label><Input value={form.careerInterest} onChange={e => update("careerInterest", e.target.value)} placeholder="e.g. UI Design, Data Science" /></div>
          <div>
            <Label>Budget</Label>
            <Select value={form.budget} onValueChange={v => update("budget", v)}>
              <SelectTrigger><SelectValue placeholder="Select budget range" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0-10k">₹0 - ₹10,000</SelectItem>
                <SelectItem value="10-50k">₹10,000 - ₹50,000</SelectItem>
                <SelectItem value="50k-1L">₹50,000 - ₹1,00,000</SelectItem>
                <SelectItem value="1L+">₹1,00,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Time Commitment</Label>
            <Select value={form.time} onValueChange={v => update("time", v)}>
              <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3">1-3 months</SelectItem>
                <SelectItem value="3-6">3-6 months</SelectItem>
                <SelectItem value="6-12">6-12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Training Mode</Label>
            <Select value={form.mode} onValueChange={v => update("mode", v)}>
              <SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Preferred Schedule</Label>
            <Select value={form.schedule} onValueChange={v => update("schedule", v)}>
              <SelectTrigger><SelectValue placeholder="Select schedule" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="weekdays">Weekdays</SelectItem>
                <SelectItem value="weekends">Weekends</SelectItem>
                <SelectItem value="before-office">Before Office Hours</SelectItem>
                <SelectItem value="after-office">After Office Hours</SelectItem>
                <SelectItem value="during-office">During Office Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Country</Label>
            <Select value={form.country} onValueChange={v => update("country", v)}>
              <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
              <SelectContent className="max-h-60">
                {Object.keys(countryTimezones).map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Preferred Counseling Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-10",
                    !preferredDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {preferredDate ? format(preferredDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={preferredDate}
                  onSelect={setPreferredDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Preferred Time
              {form.country && countryTimezones[form.country] && (
                <span className="text-[10px] text-muted-foreground font-normal ml-1">
                  ({countryTimezones[form.country].label})
                </span>
              )}
            </Label>
            <Select value={form.preferredTime} onValueChange={v => update("preferredTime", v)}>
              <SelectTrigger><SelectValue placeholder="Select time slot" /></SelectTrigger>
              <SelectContent className="max-h-60">
                {IST_SLOTS.map(slot => {
                  const tz = countryTimezones[form.country] ?? countryTimezones["India"];
                  const isIST = tz.offsetMinutes === 330;
                  const localLabel = isIST ? slot.label : convertToLocalLabel(slot.istMinutes, tz.offsetMinutes);
                  return (
                    <SelectItem key={slot.istMinutes} value={String(slot.istMinutes)}>
                      {isIST ? slot.label : `${localLabel} (${slot.label} IST)`}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground mt-4">
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </div>
    </div>
  );
}
