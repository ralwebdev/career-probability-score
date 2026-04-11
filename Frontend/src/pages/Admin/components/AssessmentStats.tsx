import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutDashboard, Target, BarChart3 } from "lucide-react";

export function AssessmentStats({ data, hideCharts = false }: { data: any[], hideCharts?: boolean }) {
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (data && data.length > 0 && !selectedRole) {
      setSelectedRole(data[0].role);
    }
  }, [data]);

  const roleData = data.find(d => d.role === selectedRole);

  const radarData = roleData ? [
    { subject: "Technical", value: roleData.technical },
    { subject: "Soft Skills", value: roleData.softSkill },
    { subject: "Communication", value: roleData.communication },
    { subject: "Emotional Intelligence", value: roleData.ei },
    { subject: "Experience", value: roleData.experience },
    { subject: "Portfolio", value: roleData.portfolio },
    { subject: "Market Demand", value: roleData.marketDemand },
    { subject: "QPI", value: roleData.qpi },
  ] : [];

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border rounded-2xl bg-card/50 backdrop-blur-sm">
        <LayoutDashboard className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
        <h3 className="text-xl font-semibold opacity-50">No Data Available</h3>
        <p className="text-muted-foreground max-w-xs text-center mt-2">
          Assessment performance statistics will appear here once candidates complete tests.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-card/30 p-6 rounded-2xl border backdrop-blur-md">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Target className="h-3 w-3" /> Talent Analytics
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Performance Statistics</h2>
          <p className="text-muted-foreground">Deep dive into candidate capabilities by career path.</p>
        </div>

        <div className="flex flex-col gap-2 min-w-[280px]">
          <span className="text-sm font-semibold opacity-70 ml-1">Filter by Career Role</span>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="bg-background/50 border-primary/20 h-11">
              <SelectValue placeholder="Choose a career role" />
            </SelectTrigger>
            <SelectContent>
              {data.map(d => (
                <SelectItem key={d.role} value={d.role}>{d.role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!hideCharts && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Radar Chart for holistic view */}
          <Card className="bg-card/50 border-none shadow-xl backdrop-blur-lg overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:w-2 transition-all" />
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-primary" /> Multi-Dimensional Profile
              </CardTitle>
              <p className="text-xs text-muted-foreground">Holistic view of {selectedRole} competencies</p>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="rgba(148, 163, 184, 0.15)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Avg Score"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.4}
                      strokeWidth={3}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(8px)',
                        color: '#fff',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart for direct comparison */}
          <Card className="bg-card/50 border-none shadow-xl backdrop-blur-lg overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:w-2 transition-all" />
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" /> Metrics Comparison
              </CardTitle>
              <p className="text-xs text-muted-foreground">Standardized score distribution</p>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={radarData} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      dataKey="subject"
                      type="category"
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 500 }}
                      width={100}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(15, 23, 42, 0.9)',
                        backdropFilter: 'blur(8px)',
                        color: '#fff'
                      }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar
                      dataKey="value"
                      fill="hsl(var(--primary))"
                      radius={[0, 6, 6, 0]}
                      barSize={32}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Aggregate Overview Table */}
      <Card className="bg-card/40 border-none shadow-xl backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xl">Career Role Performance Summary</CardTitle>
          <p className="text-xs text-muted-foreground">Consolidated average scores across all assessment categories.</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/30 text-muted-foreground">
                  <th className="text-left py-4 px-6 font-semibold">Career Role</th>
                  <th className="text-center py-4 px-3 font-semibold">Volume</th>
                  <th className="text-center py-4 px-3 font-semibold">Technical</th>
                  <th className="text-center py-4 px-3 font-semibold">Soft Skills</th>
                  <th className="text-center py-4 px-3 font-semibold">Communication</th>
                  <th className="text-center py-4 px-3 font-semibold">Emotional Intelligence</th>
                  <th className="text-center py-4 px-3 font-semibold">Experience</th>
                  <th className="text-center py-4 px-3 font-semibold">QPI</th>
                  <th className="text-center py-4 px-6 font-bold text-primary">Avg Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {data.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-primary/5 cursor-pointer ${selectedRole === item.role ? 'bg-primary/10' : ''}`}
                    onClick={() => setSelectedRole(item.role)}
                  >
                    <td className="py-4 px-6 font-bold">{item.role}</td>
                    <td className="py-4 px-3 text-center">
                      <span className="px-2 py-1 rounded-md bg-secondary/50 text-xs font-medium">
                        {item.count}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center opacity-80">{item.technical}</td>
                    <td className="py-4 px-3 text-center opacity-80">{item.softSkill}</td>
                    <td className="py-4 px-3 text-center opacity-80">{item.communication}</td>
                    <td className="py-4 px-3 text-center opacity-80">{item.ei}</td>
                    <td className="py-4 px-3 text-center opacity-80">{item.experience}</td>
                    <td className="py-4 px-3 text-center opacity-80">{item.qpi}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="font-black text-primary bg-primary/5 py-1 rounded-lg">
                        {item.total}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
