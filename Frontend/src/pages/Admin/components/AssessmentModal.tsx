import { format } from "date-fns";
import { Info, Mail, Phone, MapPin, GraduationCap, BarChart3 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function AssessmentModal({ assessment, isOpen, onClose }: {
    assessment: any;
    isOpen: boolean;
    onClose: () => void
}) {
    if (!assessment) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        Assessment Details
                        <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            ID: {assessment._id?.slice(-6)}
                        </span>
                    </DialogTitle>
                    <DialogDescription>
                        Full profile and scoring data for {assessment.name}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-8 py-4">
                    {/* Section: Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                                <Info className="h-4 w-4" /> Personal Information
                            </h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{assessment.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{assessment.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{assessment.city}, {assessment.state}, {assessment.country}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                                <GraduationCap className="h-4 w-4" /> Education & Career
                            </h4>
                            <div className="space-y-2">
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Education:</span> {assessment.educationLevel} ({assessment.fieldOfStudy})
                                </div>
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Domain:</span> {assessment.careerDomain}
                                </div>
                                <div className="text-sm">
                                    <span className="text-muted-foreground">Target Role:</span> <span className="font-bold">{assessment.careerRole}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Section: Scores */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-primary flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" /> Assessment Scores
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="rounded-lg border p-3 bg-muted/30">
                                <div className="text-[10px] uppercase text-muted-foreground font-bold">Total CPS</div>
                                <div className="text-2xl font-mono font-bold text-primary">{assessment.scores?.total || 0} <span className="text-sm font-normal text-muted-foreground">/ 100</span></div>
                            </div>
                            <div className="rounded-lg border p-3 bg-muted/30">
                                <div className="text-[10px] uppercase text-muted-foreground font-bold">QPI Score</div>
                                <div className="text-2xl font-mono font-bold text-primary">{assessment.scores?.qpi || 0} <span className="text-sm font-normal text-muted-foreground">/ 100</span></div>
                            </div>
                            <div className="rounded-lg border p-3 bg-muted/30">
                                <div className="text-[10px] uppercase text-muted-foreground font-bold">Technical</div>
                                <div className="text-2xl font-mono font-bold text-primary">{assessment.scores?.technical || 0} <span className="text-sm font-normal text-muted-foreground">/ 30</span></div>
                            </div>
                            <div className="rounded-lg border p-3 bg-muted/30">
                                <div className="text-[10px] uppercase text-muted-foreground font-bold">Soft Skills</div>
                                <div className="text-2xl font-mono font-bold text-primary">{assessment.scores?.softSkill || 0} <span className="text-sm font-normal text-muted-foreground">/ 10</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Section: Secondary Scores */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="text-xs p-2 rounded-md border flex flex-col items-center justify-center text-center">
                            <span className="text-muted-foreground mb-1">Communication</span>
                            <span className="font-bold">{assessment.scores?.communication || 0} / 10</span>
                        </div>
                        <div className="text-xs p-2 rounded-md border flex flex-col items-center justify-center text-center">
                            <span className="text-muted-foreground mb-1">Emotional Intel.</span>
                            <span className="font-bold">{assessment.scores?.ei || 0} / 10</span>
                        </div>
                        <div className="text-xs p-2 rounded-md border flex flex-col items-center justify-center text-center">
                            <span className="text-muted-foreground mb-1">Market Demand</span>
                            <span className="font-bold">{assessment.scores?.marketDemand || 0} / 10</span>
                        </div>
                        <div className="text-xs p-2 rounded-md border flex flex-col items-center justify-center text-center">
                            <span className="text-muted-foreground mb-1">Experience</span>
                            <span className="font-bold">{assessment.scores?.experience || 0} / 15</span>
                        </div>
                        <div className="text-xs p-2 rounded-md border flex flex-col items-center justify-center text-center">
                            <span className="text-muted-foreground mb-1">Portfolio</span>
                            <span className="font-bold">{assessment.scores?.portfolio || 0} / 15</span>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Section: Details Table */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-primary">Skill Input Data</h4>
                        <div className="rounded-md border overflow-hidden">
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-xs font-medium py-2">Specialization</TableCell>
                                        <TableCell className="text-xs py-2">{assessment.specialization || "N/A"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-xs font-medium py-2">Portfolio Level</TableCell>
                                        <TableCell className="text-xs py-2 capitalize">{assessment.portfolioLevel || "None"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-xs font-medium py-2">Completion Date</TableCell>
                                        <TableCell className="text-xs py-2">
                                            {format(new Date(assessment.createdAt), "PPPP 'at' p")}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
