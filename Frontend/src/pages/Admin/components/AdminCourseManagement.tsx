import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Check, Save } from "lucide-react";
import { getCourses, createCourse, updateCourse, deleteCourse } from "@/lib/api";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCourseManagement({ token }: { token: string }) {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setCurrentCourse({
      id: "",
      collegeId: "redapple",
      title: "",
      domain: "Technology",
      description: "",
      duration: "3 months",
      mode: "hybrid",
      schedule: "weekday",
      marketPrice: 0,
      coursePrice: 0,
      modules: [{ name: "Module 1", topics: ["Topic 1"] }],
      skillsCovered: [],
      careerRoles: [],
    });
    setIsEditing(true);
  };

  const handleEdit = (course: any) => {
    setCurrentCourse({ ...course });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteCourse(id, token);
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentCourse._id) {
        await updateCourse(currentCourse.id, currentCourse, token);
        toast.success("Course updated successfully");
      } else {
        await createCourse(currentCourse, token);
        toast.success("Course created successfully");
      }
      setIsEditing(false);
      fetchCourses();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading courses...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Management</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="border rounded-xl p-4 bg-card/50 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-primary mb-1">{course.id}</div>
              <h3 className="font-bold text-lg mb-2">{course.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
              <div className="flex gap-2 mb-4">
                <span className="text-xs bg-muted px-2 py-1 rounded">{course.domain}</span>
                <span className="text-xs bg-muted px-2 py-1 rounded">{course.duration}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-auto">
              <button
                onClick={() => handleEdit(course)}
                className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{currentCourse._id ? "Edit Course" : "Add New Course"}</h3>
                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-muted rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course ID (Slug)</label>
                    <input
                      required
                      value={currentCourse.id}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, id: e.target.value })}
                      className="w-full bg-background border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="e.g. ra-uiux"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <input
                      required
                      value={currentCourse.title}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                      className="w-full bg-background border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Course Title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={currentCourse.description}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                    className="w-full bg-background border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Short description"
                  />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Domain</label>
                    <select
                      value={currentCourse.domain}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, domain: e.target.value })}
                      className="w-full bg-background border rounded-lg px-3 py-2"
                    >
                      <option>Design</option>
                      <option>Technology</option>
                      <option>Marketing</option>
                      <option>Media</option>
                      <option>Data/AI</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Duration</label>
                    <input
                      value={currentCourse.duration}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, duration: e.target.value })}
                      className="w-full bg-background border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Market Price</label>
                    <input
                      type="number"
                      value={currentCourse.marketPrice}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, marketPrice: Number(e.target.value) })}
                      className="w-full bg-background border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Our Price</label>
                    <input
                      type="number"
                      value={currentCourse.coursePrice}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, coursePrice: Number(e.target.value) })}
                      className="w-full bg-background border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Schedule</label>
                    <select
                      value={currentCourse.schedule || "weekday"}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, schedule: e.target.value })}
                      className="w-full bg-background border rounded-lg px-3 py-2"
                    >
                      <option value="weekday">Weekday</option>
                      <option value="weekend">Weekend</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expected Salary</label>
                    <input
                      value={currentCourse.expectedSalary || ""}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, expectedSalary: e.target.value })}
                      className="w-full bg-background border rounded-lg px-3 py-2"
                      placeholder="e.g. ₹5-8 LPA"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Next Batch</label>
                    <input
                      value={currentCourse.nextBatchDate || ""}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, nextBatchDate: e.target.value })}
                      className="w-full bg-background border rounded-lg px-3 py-2"
                      placeholder="e.g. 15 Oct 2023"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Seats Left</label>
                    <input
                      type="number"
                      value={currentCourse.seatsLeft || 0}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, seatsLeft: Number(e.target.value) })}
                      className="w-full bg-background border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skills (comma separated)</label>
                    <textarea
                      value={currentCourse.skillsCovered?.join(", ") || ""}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, skillsCovered: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                      className="w-full bg-background border rounded-lg px-3 py-2 text-xs"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tools (comma separated)</label>
                    <textarea
                      value={currentCourse.tools?.join(", ") || ""}
                      onChange={(e) => setCurrentCourse({ ...currentCourse, tools: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                      className="w-full bg-background border rounded-lg px-3 py-2 text-xs"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Modules (JSON format)</label>
                  <textarea
                    value={JSON.stringify(currentCourse.modules, null, 2)}
                    onChange={(e) => {
                      try {
                        setCurrentCourse({ ...currentCourse, modules: JSON.parse(e.target.value) });
                      } catch (err) {
                        // Suppress parse error while typing
                      }
                    }}
                    className="w-full bg-background border rounded-lg px-3 py-2 font-mono text-[10px]"
                    rows={5}
                  />
                  <p className="text-[10px] text-muted-foreground">Example: [{"{ \"name\": \"Intro\", \"topics\": [\"T1\", \"T2\"] }"}]</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
                  >
                    <Save className="h-4 w-4" /> Save Course
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
