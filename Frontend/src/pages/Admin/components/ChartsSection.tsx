import { Award, BarChart3, Globe, AlertTriangle, Database } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

const PIE_COLORS = ["hsl(186, 100%, 50%)", "hsl(186, 80%, 40%)", "hsl(186, 60%, 35%)", "hsl(42, 100%, 50%)", "hsl(42, 80%, 40%)", "hsl(215, 20%, 40%)"];

export function ChartsSection({ 
    dashboardData, 
    assessmentsCount, 
    counselingCount, 
    leadsCount,
    onScoreClick,
    onCareerClick,
    selectedScoreRange,
    selectedCareerRole
}: { 
    dashboardData: any;
    assessmentsCount: number;
    counselingCount: number;
    leadsCount: number;
    onScoreClick?: (data: any) => void;
    onCareerClick?: (data: any) => void;
    selectedScoreRange?: string | null;
    selectedCareerRole?: string | null;
}) {
    if (!dashboardData) return null;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Careers */}
                <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" /> Popular Career Interests
                        </h3>
                        {selectedCareerRole && (
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                                Filter Active
                            </span>
                        )}
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dashboardData.popularCareers} layout="vertical" onClick={onCareerClick}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 600 }} width={100} axisLine={false} tickLine={false} />
                            <Tooltip 
                                cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                                contentStyle={{ 
                                    background: "hsl(var(--card))", 
                                    border: "1px solid hsl(var(--border))", 
                                    borderRadius: "12px",
                                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                    fontSize: "12px",
                                    fontWeight: "600"
                                }} 
                                itemStyle={{ color: "hsl(var(--primary))" }}
                            />
                            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} className="cursor-pointer">
                                {dashboardData.popularCareers.map((entry: any, i: number) => (
                                    <Cell 
                                        key={i} 
                                        fillOpacity={selectedCareerRole ? (selectedCareerRole === entry.name ? 1 : 0.4) : 1}
                                        stroke={selectedCareerRole === entry.name ? "hsl(var(--primary))" : "none"}
                                        strokeWidth={2}
                                        fill="hsl(var(--primary))"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Score Distribution */}
                <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" /> CPS Score Distribution
                        </h3>
                        {selectedScoreRange && (
                           <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                               Filter Active
                           </span>
                        )}
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dashboardData.scoreDistribution} onClick={onScoreClick}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" vertical={false} />
                            <XAxis dataKey="range" tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                            <Tooltip 
                                cursor={{ fill: "hsl(var(--primary) / 0.05)" }}
                                contentStyle={{ 
                                    background: "hsl(var(--card))", 
                                    border: "1px solid hsl(var(--border))", 
                                    borderRadius: "12px",
                                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                    fontSize: "12px",
                                    fontWeight: "600"
                                }} 
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={35} className="cursor-pointer">
                                {dashboardData.scoreDistribution.map((entry: any, i: number) => (
                                    <Cell 
                                        key={i} 
                                        fill={entry.color} 
                                        fillOpacity={selectedScoreRange ? (selectedScoreRange === entry.range ? 1 : 0.45) : 1}
                                        stroke={selectedScoreRange === entry.range ? entry.color : "none"}
                                        strokeWidth={2}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Countries */}
                <div className="rounded-xl border bg-card p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" /> Users by Country
                    </h3>
                    <div className="flex items-center gap-8">
                        <ResponsiveContainer width="50%" height={220}>
                            <PieChart>
                                <Pie data={dashboardData.topCountries} dataKey="users" nameKey="name" cx="50%" cy="50%" outerRadius={80} strokeWidth={0}>
                                    {dashboardData.topCountries.map((_: any, i: number) => (
                                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        background: "hsl(var(--card))", 
                                        border: "1px solid hsl(var(--border))", 
                                        borderRadius: "12px",
                                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
                                    }} 
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 flex-1">
                            {dashboardData.topCountries.map((c: any, i: number) => (
                                <div key={c.name} className="flex items-center gap-2 text-sm">
                                    <div className="h-3 w-3 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                                    <span className="text-muted-foreground">{c.name}</span>
                                    <span className="font-mono text-xs font-bold ml-auto">{c.users.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Info */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-accent" /> System Notice
                    </h3>
                    <div className="space-y-4">
                        <div className="rounded-lg bg-accent/10 p-4 border border-accent/20 shadow-inner">
                            <p className="text-sm text-accent font-semibold">Growth Tip</p>
                            <p className="text-xs text-muted-foreground mt-1 font-medium">
                                Career interests in {dashboardData.popularCareers[0]?.name || "Tech"} are trending up this week.
                            </p>
                        </div>
                        <div className="text-sm text-muted-foreground font-semibold flex items-center gap-2">
                            <Database className="h-4 w-4 text-primary/60" /> Total platform records: <span className="text-foreground">{(assessmentsCount + counselingCount + leadsCount).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
