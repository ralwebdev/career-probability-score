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
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center">
                        <GraduationCap className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">College Login</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Student Employability Intelligence System
                    </p>
                </div>

                <form onSubmit={handleLogin} className="rounded-2xl border bg-card p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="admin@college.edu"
                                className="pl-10"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pl-10 pr-10"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full gradient-primary text-primary-foreground" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>

                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-2">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Secure access · Role-based permissions · No student data export</span>
                    </div>
                </form>

                <div className="mt-6 rounded-xl border bg-muted/30 p-4">
                    <p className="text-xs font-semibold mb-2">Demo Credentials</p>
                    <div className="space-y-1.5 text-[11px] text-muted-foreground">
                        <p><span className="font-medium text-foreground">Admin:</span> admin@redapple.edu / admin123</p>
                        <p><span className="font-medium text-foreground">CS Faculty:</span> cs@redapple.edu / faculty123</p>
                        <p><span className="font-medium text-foreground">Commerce:</span> comm@redapple.edu / faculty123</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}