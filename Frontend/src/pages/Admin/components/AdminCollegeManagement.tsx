import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Check, Save, Copy, ExternalLink, School, Eye, EyeOff } from "lucide-react";
import { getColleges, createCollege, updateCollege, deleteCollege } from "@/lib/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCollegeManagement({ token }: { token: string }) {
  const [colleges, setColleges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCollege, setEditingCollege] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    collegeId: "",
    location: "",
    email: "",
    password: "",
    active: true,
  });


  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const data = await getColleges(token);
      setColleges(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch colleges");
    } finally {
      setIsLoading(false);
    }
  };

  const generateId = (name: string) => {
    if (!name) return "";
    const prefix = name.split(" ").map(word => word[0]).join("").toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${random}`;
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      collegeId: prev.collegeId || generateId(name)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCollege) {
        // Update existing college
        await updateCollege(editingCollege._id, formData, token);
        toast.success("College updated successfully");
      } else {
        // Create new college
        await createCollege(formData, token);
        toast.success("College added successfully");
      }
      
      closeModal();
      fetchColleges();

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      try {
        await deleteCollege(id, token);
        toast.success("College deleted successfully");
        fetchColleges();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const toggleActive = async (college: any) => {
    try {
      const updatedCollege = { ...college, active: !college.active };
      await updateCollege(college._id, { active: !college.active }, token);
      toast.success(`College ${!college.active ? "shown" : "hidden"} successfully`);
      fetchColleges();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openEditModal = (college: any) => {
    setEditingCollege(college);
    setFormData({
      name: college.name,
      collegeId: college.collegeId,
      location: college.location || "",
      email: college.email,
      password: "",
      active: college.active ?? true,
    });
    setIsAdding(true);
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingCollege(null);
    setFormData({ name: "", collegeId: "", location: "", email: "", password: "", active: true });
  };

  const copyLink = (collegeId: string) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/${collegeId}/assessment`;
    navigator.clipboard.writeText(link);
    toast.success("Assessment link copied to clipboard!");
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">College Management</h2>
          <p className="text-sm text-muted-foreground">Manage affiliated colleges and their assessment links</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all shadow-lg active:scale-95"
        >
          <Plus className="h-4 w-4" /> Add College
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colleges.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl">
            <School className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
            <p className="text-muted-foreground text-lg font-medium">No colleges registered yet</p>
            <button
              onClick={() => setIsAdding(true)}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Add your first college
            </button>
          </div>
        ) : (
          colleges.map((college) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={college._id}
              className="group rounded-2xl border bg-card/40 backdrop-blur-md p-5 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 relative"
            >
              <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleActive(college)}
                  className={`p-1.5 h-8 w-8 flex items-center justify-center bg-background border rounded-lg transition-all shadow-sm ${college.active ? "text-muted-foreground hover:text-amber-500 hover:border-amber-500" : "text-amber-500 border-amber-500 hover:text-primary hover:border-primary"}`}
                  title={college.active ? "Hide from Dropdown" : "Show in Dropdown"}
                >
                  {college.active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => openEditModal(college)}
                  className="p-1.5 h-8 w-8 flex items-center justify-center bg-background border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm"
                  title="Edit Credentials"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(college._id, college.name)}
                  className="p-1.5 h-8 w-8 flex items-center justify-center bg-background border rounded-lg text-muted-foreground hover:text-destructive hover:border-destructive transition-all shadow-sm"
                  title="Delete College"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex justify-between items-start mb-4 pr-12">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <School className="h-5 w-5" />
                  </div>
                  {!college.active && (
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-bold font-mono text-primary px-2 py-1 bg-primary/5 rounded-full border border-primary/20">
                  {college.collegeId}
                </div>
              </div>

              <h3 className="font-bold text-lg leading-tight mb-1">{college.name}</h3>
              <p className="text-xs text-muted-foreground mb-1">{college.location || "Location not specified"}</p>
              <p className="text-[10px] font-medium text-muted-foreground/60 break-all">{college.email}</p>

              <div className="space-y-3 pt-4 border-t border-muted/30 mt-4">
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Assessment Track Link</div>
                  <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-lg text-[11px] font-mono break-all line-clamp-1 border">
                    {window.location.origin}/{college.collegeId}/assessment
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => copyLink(college.collegeId)}
                    className="flex-1 flex items-center justify-center gap-2 bg-secondary/50 text-secondary-foreground px-3 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy Link
                  </button>
                  <a
                    href={`/${college.collegeId}/assessment`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 rounded-lg border hover:bg-muted transition-colors text-muted-foreground"
                    title="Open Assessment"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{editingCollege ? "Edit College" : "Register New College"}</h3>
                <button onClick={closeModal} className="p-2 hover:bg-muted rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">College Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full bg-background border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g. Harvard University"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Unique College ID</label>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, collegeId: generateId(prev.name) }))}
                      className="text-[10px] text-primary hover:underline font-bold"
                    >
                      Regenerate
                    </button>
                  </div>
                  <input
                    required
                    value={formData.collegeId}
                    onChange={(e) => setFormData({ ...formData, collegeId: e.target.value.toUpperCase() })}
                    className="w-full bg-background border font-mono rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g. HU2024"
                  />
                  <p className="text-[10px] text-muted-foreground italic">Students will see this in their assessment URL.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-background border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="e.g. Cambridge, MA"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">Login Credentials</div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Email Address (Username)</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="admin@college.edu"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-medium">Password {editingCollege && <span className="text-[9px] text-muted-foreground font-normal">(Leave blank to keep current)</span>}</label>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, password: Math.random().toString(36).slice(-8) }))}
                        className="text-[10px] text-primary hover:underline font-bold"
                      >
                        Generate
                      </button>
                    </div>
                    <input
                      required={!editingCollege}
                      type="text"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-background border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder={editingCollege ? "••••••••" : "Enter password"}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-dashed">
                  <div className="flex-1">
                    <div className="text-sm font-bold leading-none mb-1">Public Visibility</div>
                    <p className="text-[10px] text-muted-foreground italic">If disabled, this college won't appear in the assessment selection dropdown.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                    className={`w-12 h-6 rounded-full relative transition-colors ${formData.active ? "bg-primary" : "bg-muted-foreground/30"}`}
                  >
                    <motion.div
                      animate={{ x: formData.active ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>
                </div>


                <div className="flex flex-col gap-3 pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 shadow-lg active:scale-[0.98] transition-all"
                  >
                    <Save className="h-4 w-4" /> {editingCollege ? "Update College" : "Save College"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full py-2.5 border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
