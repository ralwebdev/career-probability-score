import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";

export function CounselingTable({ data, onRowClick }: { data: any[]; onRowClick: (req: any) => void }) {
    return (
        <div className="rounded-xl border bg-card/50 overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                No counseling requests found
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((req: any) => (
                            <TableRow 
                                key={req._id} 
                                className="cursor-pointer hover:bg-muted/50 transition-colors group"
                                onClick={() => onRowClick(req)}
                            >
                                <TableCell className="font-medium group-hover:text-primary transition-colors">{req.name}</TableCell>
                                <TableCell>
                                    <div className="text-xs">{req.email}</div>
                                    <div className="text-[10px] text-muted-foreground">{req.phone}</div>
                                </TableCell>
                                <TableCell className="text-xs">{req.careerInterest}</TableCell>
                                <TableCell>
                                    <span className="capitalize text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                        {req.mode}
                                    </span>
                                    <div className="text-[10px] text-muted-foreground mt-1">{req.schedule}</div>
                                </TableCell>
                                <TableCell className="text-xs">
                                    <div className="flex items-center justify-between">
                                        {req.preferredDate ? format(new Date(req.preferredDate), "MMM dd, yyyy") : "N/A"}
                                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export function AssessmentsTable({ data, onRowClick }: { data: any[]; onRowClick?: (assessment: any) => void }) {
    return (
        <div className="rounded-xl border bg-card/50 overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Education</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead>Target Role</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                No assessments found
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((assessment: any) => (
                            <TableRow 
                                key={assessment._id} 
                                className={`transition-colors group ${onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}`}
                                onClick={() => onRowClick?.(assessment)}
                            >
                                <TableCell>
                                    <div className="font-medium text-xs group-hover:text-primary transition-colors">{assessment.name}</div>
                                    <div className="text-[10px] text-muted-foreground">{assessment.email}</div>
                                </TableCell>
                                <TableCell className="text-xs">{assessment.city}, {assessment.country}</TableCell>
                                <TableCell className="text-xs">{assessment.educationLevel}</TableCell>
                                <TableCell className="text-xs">{assessment.careerDomain || assessment.domain || "N/A"}</TableCell>
                                <TableCell className="text-xs font-semibold">{assessment.careerRole}</TableCell>
                                <TableCell className="text-xs">
                                    <div className="flex items-center justify-between">
                                        {format(new Date(assessment.createdAt), "MMM dd, HH:mm")}
                                        {onRowClick && <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}




export function LeadsTable({ data, onRowClick }: { data: any[]; onRowClick: (lead: any) => void }) {
    return (
        <div className="rounded-xl border bg-card/50 overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                No general leads found
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((lead: any) => (
                            <TableRow 
                                key={lead._id} 
                                className="cursor-pointer hover:bg-muted/50 transition-colors group"
                                onClick={() => onRowClick(lead)}
                            >
                                <TableCell>
                                    <div className="font-medium text-xs group-hover:text-primary transition-colors">{lead.name || "Anonymous"}</div>
                                </TableCell>
                                <TableCell className="text-xs">{lead.phone}</TableCell>
                                <TableCell className="text-xs">{lead.courseTitle}</TableCell>
                                <TableCell>
                                    <span className="capitalize text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                                        {lead.source}
                                    </span>
                                </TableCell>
                                <TableCell className="text-xs">
                                    <div className="flex items-center justify-between">
                                        {format(new Date(lead.createdAt), "MMM dd, HH:mm")}
                                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
