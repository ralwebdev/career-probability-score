import { format } from "date-fns";
import { ChevronRight, Download, Eye, ChevronLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/csvUtils";
import { 
    Pagination, 
    PaginationContent, 
    PaginationEllipsis, 
    PaginationItem, 
    PaginationLink, 
    PaginationNext, 
    PaginationPrevious 
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

function TablePagination({ pagination }: { pagination: PaginationProps }) {
    const { page, limit, total, onPageChange, onLimitChange } = pagination;
    const totalPages = Math.ceil(total / limit);

    if (total === 0) return null;

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 border-t bg-muted/5 mt-auto">
            <div className="flex items-center gap-4">
                <div className="text-[11px] text-muted-foreground font-medium">
                    Showing <span className="text-foreground font-bold">{start}-{end}</span> of <span className="text-foreground font-bold">{total}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground font-medium whitespace-nowrap">Rows per page</span>
                    <Select
                        value={limit.toString()}
                        onValueChange={(v) => onLimitChange(parseInt(v))}
                    >
                        <SelectTrigger className="h-7 w-[70px] text-[11px] font-bold bg-background/50">
                            <SelectValue placeholder={limit} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="75">75</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Pagination className="justify-end w-auto mx-0">
                <PaginationContent>
                    <PaginationItem>
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => onPageChange(page - 1)}
                            className="gap-1 h-8 px-2 text-[11px] font-bold"
                        >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            Prev
                        </Button>
                    </PaginationItem>
                    
                    {/* Page numbers could be added here if many pages, but simple Prev/Next + Current is often cleaner for large datasets */}
                    <PaginationItem>
                        <div className="flex items-center gap-1 mx-2">
                            <span className="text-[11px] font-bold">Page</span>
                            <div className="h-8 min-w-[32px] flex items-center justify-center rounded-md border bg-background/50 text-[11px] font-bold px-2">
                                {page}
                            </div>
                            <span className="text-[11px] font-medium text-muted-foreground text-nowrap">of {totalPages || 1}</span>
                        </div>
                    </PaginationItem>

                    <PaginationItem>
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={page >= totalPages}
                            onClick={() => onPageChange(page + 1)}
                            className="gap-1 h-8 px-2 text-[11px] font-bold"
                        >
                            Next
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export function CounselingTable({ data, onRowClick, pagination }: { data: any[]; onRowClick: (req: any) => void; pagination: PaginationProps }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportToCSV(data, "counseling_requests.csv")}
                    className="gap-2 text-xs font-bold"
                >
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                </Button>
            </div>
            <div className="rounded-xl border bg-card/50 overflow-hidden flex flex-col min-h-[400px]">
                <div className="flex-1">
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
                <TablePagination pagination={pagination} />
            </div>
        </div>
    );
}

export function AssessmentsTable({ data, onRowClick, pagination }: { data: any[]; onRowClick?: (assessment: any) => void; pagination: PaginationProps }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportToCSV(data, "assessments.csv")}
                    className="gap-2 text-xs font-bold"
                >
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                </Button>
            </div>
            <div className="rounded-xl border bg-card/50 overflow-hidden flex flex-col min-h-[400px]">
                <div className="flex-1">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Current Education</TableHead>
                                <TableHead>Target Domain</TableHead>
                                <TableHead>Target Role</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
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
                                            {format(new Date(assessment.createdAt), "MMM dd, HH:mm")}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 px-2 text-[10px] font-bold gap-1 hover:bg-primary/10 hover:text-primary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(`/results?id=${assessment._id}`, '_blank');
                                                    }}
                                                >
                                                    <Eye className="h-3 w-3" />
                                                    View Results
                                                </Button>
                                                {onRowClick && <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination pagination={pagination} />
            </div>
        </div>
    );
}

export function LeadsTable({ data, onRowClick, pagination }: { data: any[]; onRowClick: (lead: any) => void; pagination: PaginationProps }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportToCSV(data, "leads.csv")}
                    className="gap-2 text-xs font-bold"
                >
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                </Button>
            </div>
            <div className="rounded-xl border bg-card/50 overflow-hidden flex flex-col min-h-[400px]">
                <div className="flex-1">
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
                                                {onRowClick && <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination pagination={pagination} />
            </div>
        </div>
    );
}
