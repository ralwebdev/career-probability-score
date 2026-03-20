import { format } from "date-fns";
import { Info, Phone, Calendar, BookOpen, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function LeadsModal({ lead, isOpen, onClose }: { 
    lead: any; 
    isOpen: boolean; 
    onClose: () => void 
}) {
    if (!lead) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        Lead Details
                    </DialogTitle>
                    <DialogDescription>
                        Full details for lead from {lead.name || "Anonymous"}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                            <Info className="h-4 w-4" /> Basic Information
                        </h4>
                        <div className="space-y-3">
                            <div className="text-lg font-bold">{lead.name || "Anonymous User"}</div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{lead.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                                <BookOpen className="h-3 w-3" /> Interested In
                            </h4>
                            <div className="text-sm font-medium">{lead.courseTitle || "General Interest"}</div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                                <Share2 className="h-3 w-3" /> Source
                            </h4>
                            <div className="text-sm">
                                <span className="capitalize px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 text-[10px]">
                                    {lead.source}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground italic">
                        <Calendar className="h-3 w-3" />
                        Lead captured on {format(new Date(lead.createdAt || new Date()), "PPP p")}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
