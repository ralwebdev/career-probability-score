import { motion } from "framer-motion";
import { Users, BarChart3, TrendingUp, Globe } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    sub?: string;
}

export function StatCard({ label, value, icon, sub }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border bg-card/50 p-5"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">{icon}</div>
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <div className="font-mono text-3xl font-bold text-foreground">{value}</div>
            {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
        </motion.div>
    );
}

export function StatsGrid({ dashboardData }: { dashboardData: any }) {
    if (!dashboardData) return null;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                label="Total Users"
                value={dashboardData.totalUsers.toLocaleString()}
                icon={<Users className="h-5 w-5 text-primary" />}
                sub="Lifetime assessments"
            />
            <StatCard
                label="Average CPS"
                value={dashboardData.avgCPS}
                icon={<BarChart3 className="h-5 w-5 text-primary" />}
                sub="Out of 100"
            />
            <StatCard
                label="Assessments Today"
                value={dashboardData.assessmentsToday}
                icon={<TrendingUp className="h-5 w-5 text-primary" />}
                sub="New entries"
            />
            <StatCard
                label="Countries"
                value={dashboardData.topCountries.length}
                icon={<Globe className="h-5 w-5 text-primary" />}
                sub="Global reach"
            />
        </div>
    );
}
