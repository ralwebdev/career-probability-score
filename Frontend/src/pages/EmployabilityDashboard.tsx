import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, GraduationCap, ShieldCheck, Lock, Save, X, Key, RefreshCw
} from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getCollegeStudents, changeCollegePassword } from "@/lib/api";
import { toast } from "sonner";

// Admin components
import {
  AssessmentsTable,
} from "./Admin/components";

export default function EmployabilityDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("assessments");

  // Password modal
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Last updated timer
  const [lastUpdated, setLastUpdated] = useState("just now");

  useEffect(() => {
    const stored = sessionStorage.getItem("collegeUser");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      navigate("/college-login");
    }
  }, [navigate]);

  // ✅ React Query with refresh support
  const {
    data: students = [],
    isLoading,
    error,
    refetch,
    isFetching,
    dataUpdatedAt
  } = useQuery({
    queryKey: ["collegeStudents"],
    queryFn: () => {
      const stored = sessionStorage.getItem("collegeUser");
      if (!stored) throw new Error("No token");
      const u = JSON.parse(stored);
      return getCollegeStudents(u.token);
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Live "Updated X sec ago"
  useEffect(() => {
    if (!dataUpdatedAt) return;

    const updateTime = () => {
      const seconds = Math.floor((Date.now() - dataUpdatedAt) / 1000);

      if (seconds < 5) setLastUpdated("just now");
      else if (seconds < 60) setLastUpdated(`${seconds}s ago`);
      else if (seconds < 3600) setLastUpdated(`${Math.floor(seconds / 60)}m ago`);
      else setLastUpdated(`${Math.floor(seconds / 3600)}h ago`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [dataUpdatedAt]);

  const handleLogout = () => {
    sessionStorage.removeItem("collegeUser");
    toast.success("Logged out successfully");
    navigate("/college-login");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      await changeCollegePassword(
        {
          previousPassword: passwordForm.previousPassword,
          newPassword: passwordForm.newPassword
        },
        user.token
      );

      toast.success("Password updated successfully!");
      setIsChangingPassword(false);
      setPasswordForm({
        previousPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen px-4 py-8 bg-background">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold">Institutional Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {user.name} | {user.collegeId}
              </p>
            </div>
          </div>

          {/* ✅ Actions */}
          <div className="flex items-center gap-3">

            {/* Last Updated */}
            <div className="text-xs text-muted-foreground">
              Updated {lastUpdated}
            </div>

            {/* Refresh */}
            <button
              onClick={() => {
                refetch();
                toast.info("Refreshing data...");
              }}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            >
              {isFetching ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </button>

            {/* Change Password */}
            <button
              onClick={() => setIsChangingPassword(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            >
              <Lock className="h-4 w-4" />
              Password
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>

          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="h-40 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Failed to load data
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="assessments">
              <AssessmentsTable data={students} />
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {isChangingPassword && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-xl w-full max-w-md"
            >
              <div className="flex justify-between mb-4">
                <h3 className="font-bold text-lg">Change Password</h3>
                <button onClick={() => setIsChangingPassword(false)}>
                  <X />
                </button>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordForm.previousPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, previousPassword: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-2 rounded"
                >
                  {isSubmitting ? "Updating..." : "Change Password"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}