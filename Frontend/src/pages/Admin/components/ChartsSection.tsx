import { Award, BarChart3, Globe, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

const PIE_COLORS = ["hsl(186, 100%, 50%)", "hsl(186, 80%, 40%)", "hsl(186, 60%, 35%)", "hsl(42, 100%, 50%)", "hsl(42, 80%, 40%)", "hsl(215, 20%, 40%)"];

export function ChartsSection({ dashboardData, assessmentsCount, counselingCount, leadsCount }: { 
    dashboardData: any;
    assessmentsCount: number;
    counselingCount: number;
    leadsCount: number;
}) {
    if (!dashboardData) return null;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Careers */}
                <div className="rounded-xl border bg-card/50 p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary" /> Popular Career Interests
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dashboardData.popularCareers} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="hsla(220, 26%, 93%, 1.00)" />
                            <XAxis type="number" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                            <YAxis dataKey="name" type="category" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} width={100} />
                            <Tooltip 
                                contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }} 
                                itemStyle={{ color: "white" }}
                                labelStyle={{ color: "white" }}
                            />
                            <Bar dataKey="count" fill="hsl(186, 100%, 50%)" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Score Distribution */}
                <div className="rounded-xl border bg-card/50 p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" /> CPS Score Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dashboardData.scoreDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                            <XAxis dataKey="range" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                            <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} />
                            <Tooltip 
                                contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }} 
                                itemStyle={{ color: "white" }}
                                labelStyle={{ color: "white" }}
                            />
                            <Bar dataKey="count" fill="hsl(186, 100%, 50%)" radius={[4, 4, 0, 0]}>
                                {dashboardData.scoreDistribution.map((entry: any, i: number) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Countries */}
                <div className="rounded-xl border bg-card/50 p-6">
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
                                    contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }} 
                                    itemStyle={{ color: "white" }}
                                    labelStyle={{ color: "white" }}
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
                <div className="rounded-xl border bg-card/50 p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-accent" /> System Notice
                    </h3>
                    <div className="space-y-4">
                        <div className="rounded-lg bg-accent/10 p-4 border border-accent/20">
                            <p className="text-sm text-accent font-semibold">Growth Tip</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Career interests in {dashboardData.popularCareers[0]?.name || "Tech"} are trending up this week.
                            </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Total data records: {assessmentsCount + counselingCount + leadsCount}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
