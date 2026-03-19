import { useState } from "react";
import { motion } from "framer-motion";
import { marketSignals } from "@/lib/marketSignalData";
import { TrendingUp, TrendingDown, Minus, Search, BarChart3, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const trendIcon = (t: string) =>
  t === "rising" ? <TrendingUp className="h-4 w-4 text-success" /> :
  t === "declining" ? <TrendingDown className="h-4 w-4 text-destructive" /> :
  <Minus className="h-4 w-4 text-accent" />;

export default function MarketSignals() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(marketSignals[0]);

  const filtered = marketSignals.filter(s =>
    s.career.toLowerCase().includes(search.toLowerCase())
  );

  const chartData = marketSignals.map(s => ({
    name: s.career.split(" ").slice(0, 2).join(" "),
    demand: s.demandIndex,
    listings: s.activeListings,
  }));

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-4">
            <BarChart3 className="h-4 w-4" /> Career Market Signal Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Live Job Market Intelligence</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Real-time demand tracking across LinkedIn, Indeed, and Glassdoor</p>
        </motion.div>

        {/* Demand Index Chart */}
        <div className="rounded-xl border bg-card/50 p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Demand Index by Career</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
              <XAxis dataKey="name" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }} angle={-30} textAnchor="end" height={80} />
              <YAxis domain={[0, 10]} tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: 8 }}
                labelStyle={{ color: "hsl(210, 40%, 96%)" }}
              />
              <Bar dataKey="demand" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={i % 2 === 0 ? "hsl(186, 100%, 50%)" : "hsl(186, 80%, 40%)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search careers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Career Cards with inline detail panel after selected card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filtered.map((signal, i) => {
            const isSelected = selected?.career === signal.career;
            return (
              <div key={signal.career} className="contents">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(signal)}
                  className={`cursor-pointer rounded-xl border p-5 transition-all hover:border-primary/50 ${
                    isSelected ? "border-primary bg-primary/5 box-glow" : "bg-card/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm">{signal.career}</h3>
                    {trendIcon(signal.growthTrend)}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-center">
                      <div className="font-mono text-2xl font-bold text-primary">{signal.demandIndex}</div>
                      <div className="text-[10px] text-muted-foreground">Demand</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-lg font-bold text-foreground">{(signal.activeListings / 1000).toFixed(1)}k</div>
                      <div className="text-[10px] text-muted-foreground">Jobs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-accent">{signal.avgSalary}</div>
                      <div className="text-[10px] text-muted-foreground">Salary</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {signal.topSkills.slice(0, 3).map(s => (
                      <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">{s}</span>
                    ))}
                  </div>
                </motion.div>

                {/* Inline detail panel — expands right below the selected card, spanning full grid width */}
                {isSelected && (
                  <motion.div
                    key={`detail-${signal.career}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="col-span-1 md:col-span-2 lg:col-span-3 rounded-xl border border-primary/30 bg-card/50 p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Briefcase className="h-6 w-6 text-primary" />
                      <div>
                        <h2 className="text-xl font-bold">{signal.career}</h2>
                        <p className="text-sm text-muted-foreground">Detailed Market Intelligence</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div className="rounded-lg bg-secondary/50 p-3 text-center">
                        <div className="font-mono text-2xl font-bold text-primary">{signal.demandIndex}/10</div>
                        <div className="text-xs text-muted-foreground">Demand Index</div>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-3 text-center">
                        <div className="font-mono text-2xl font-bold text-foreground">{signal.activeListings.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Active Listings</div>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {trendIcon(signal.growthTrend)}
                          <span className="font-semibold capitalize text-sm">{signal.growthTrend}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Growth Trend</div>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-3 text-center">
                        <div className="font-semibold text-accent text-sm">{signal.avgSalary}</div>
                        <div className="text-xs text-muted-foreground mt-1">Avg Salary</div>
                      </div>
                    </div>

                    <h3 className="text-sm font-semibold mb-2">Platform Breakdown</h3>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {Object.entries(signal.platforms).map(([platform, count]) => (
                        <div key={platform} className="rounded-lg border p-3 text-center">
                          <div className="font-mono text-lg font-bold">{(count / 1000).toFixed(1)}k</div>
                          <div className="text-xs text-muted-foreground capitalize">{platform}</div>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-sm font-semibold mb-2">Most In-Demand Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {signal.topSkills.map(s => (
                        <span key={s} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{s}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
