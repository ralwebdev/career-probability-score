import { format } from "date-fns";
import { Info, Mail, Phone, Calendar, Clock, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function CounselingModal({ request, isOpen, onClose }: { 
    request: any; 
    isOpen: boolean; 
    onClose: () => void 
}) {
    if (!request) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        Counseling Request Details
                    </DialogTitle>
                    <DialogDescription>
                        Full details for counseling request from {request.name}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                                <Info className="h-4 w-4" /> Student Information
                            </h4>
                            <div className="space-y-2">
                                <div className="text-sm font-bold">{request.name}</div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{request.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{request.phone}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Session Details
                            </h4>
                            <div className="space-y-2">
                                <div className="text-sm capitalize">
                                    <span className="text-muted-foreground">Mode:</span> {request.mode}
                                </div>
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Schedule:</span> {request.schedule}
                                </div>
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Preferred Date:</span> {request.preferredDate ? format(new Date(request.preferredDate), "PPPP") : "N/A"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-primary">Interest Area</h4>
                        <div className="rounded-lg bg-muted/30 p-4 border text-sm italic">
                            "{request.careerInterest}"
                        </div>
                    </div>

                    <div className="flex justify-end text-[10px] text-muted-foreground italic">
                        Received on {format(new Date(request.createdAt || new Date()), "PPP p")}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
