import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Users, Mail, Phone, Calendar } from "lucide-react";
import { getDuplicateAssessments } from "@/lib/api";
import { toast } from "sonner";
import { format } from "date-fns";

interface DuplicateRecord {
    id: string;
    name: string;
    date: string;
}

interface DuplicateGroup {
    _id: string;
    count: number;
    records: DuplicateRecord[];
}

export default function DuplicatesSection({ token }: { token: string }) {
    const [data, setData] = useState<{ emailDuplicates: DuplicateGroup[], phoneDuplicates: DuplicateGroup[] } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDuplicates = async () => {
            try {
                const results = await getDuplicateAssessments(token);
                setData(results);
            } catch (error) {
                toast.error("Failed to fetch duplicate records");
            } finally {
                setLoading(false);
            }
        };
        fetchDuplicates();
    }, [token]);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    const totalDuplicates = (data?.emailDuplicates.length || 0) + (data?.phoneDuplicates.length || 0);

    if (totalDuplicates === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 rounded-2xl border border-dashed bg-card/30">
                <Users className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No duplicates found</h3>
                <p className="text-sm text-muted-foreground px-12 text-center">Your candidate database is clean! All email addresses and phone numbers are unique.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
                <AlertTriangle className="h-5 w-5 text-accent" />
                <p className="text-sm text-accent">
                    Found <strong>{totalDuplicates}</strong> groups of potential duplicate records. These represent students who may have submitted multiple assessments.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Email Duplicates */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-bold">Email Duplicates</h3>
                    </div>
                    
                    <div className="grid gap-4">
                        {data?.emailDuplicates.map((group) => (
                            <DuplicateGroupCard key={group._id} group={group} icon={<Mail className="h-3 w-3" />} />
                        ))}
                    </div>
                </div>

                {/* Phone Duplicates */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-bold">Phone Duplicates</h3>
                    </div>
                    
                    <div className="grid gap-4">
                        {data?.phoneDuplicates.map((group) => (
                            <DuplicateGroupCard key={group._id} group={group} icon={<Phone className="h-3 w-3" />} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DuplicateGroupCard({ group, icon }: { group: DuplicateGroup, icon: React.ReactNode }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl border bg-card/50 overflow-hidden"
        >
            <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {icon}
                    </div>
                    <span className="font-mono text-xs font-bold">{group._id}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider">
                    {group.count} Occurrences
                </span>
            </div>
            <div className="p-4 space-y-3">
                {group.records.map((record, i) => (
                    <div key={record.id} className="flex items-center justify-between text-xs">
                        <div className="flex flex-col">
                            <span className="font-semibold text-foreground">{record.name}</span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                <Calendar className="h-2.5 w-2.5" />
                                {format(new Date(record.date), "MMM dd, yyyy · hh:mm a")}
                            </span>
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">ID: {record.id.slice(-6)}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
