import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Lock, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginCollege } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function CollegeLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = await loginCollege({ email, password });
            sessionStorage.setItem("collegeUser", JSON.stringify(user));
            toast({ title: "Login successful", description: `Welcome, ${user.name}` });
            navigate("/employability-dashboard");
        } catch (error: any) {
            toast({ title: "Login failed", description: error.message || "Invalid email or password", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background relative overflow-hidden">
            {/* Premium background effects */}
            <div className="absolute inset-0 gradient-mesh opacity-60 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg box-glow">
                        <GraduationCap className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Institutional Access</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Student Employability Intelligence System
                    </p>
                </div>

                <form onSubmit={handleLogin} className="rounded-2xl border bg-card/80 backdrop-blur-xl p-8 space-y-5 shadow-xl">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground/80">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="admin@college.edu"
                                className="pl-10 h-11 bg-background/50 border-muted"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground/80">Secure Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10 h-11 bg-background/50 border-muted"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-11 gradient-primary text-primary-foreground font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all" disabled={loading}>
                        {loading ? "Authenticating..." : "Sign In to Dashboard"}
                    </Button>

                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-2 justify-center border-t border-border/50">
                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                        <span>Authenticated Access · Role-Based Security · CPS v2.0</span>
                    </div>
                </form>

                {/* <div className="mt-8 rounded-xl border border-primary/10 bg-primary/5 p-4 backdrop-blur-sm">
                    <p className="text-xs font-bold text-primary mb-2 flex items-center gap-2">
                        <Lock className="h-3 w-3" /> Demo Credentials
                    </p>
                    <div className="grid grid-cols-1 gap-1.5 text-[11px] text-muted-foreground">
                        <div className="flex justify-between border-b border-primary/5 pb-1">
                            <span className="font-medium text-foreground">Principal/Admin</span>
                            <span>admin@redapple.edu / admin123</span>
                        </div>
                        <div className="flex justify-between border-b border-primary/5 pb-1">
                            <span className="font-medium text-foreground">CS Department</span>
                            <span>cs@redapple.edu / faculty123</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-foreground">Commerce</span>
                            <span>comm@redapple.edu / faculty123</span>
                        </div>
                    </div>
                </div> */}
            </motion.div>
        </div>
    );
}