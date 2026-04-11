// College Authentication & Student Mock Data
// This is a demo system - in production, use Lovable Cloud with proper auth

export type CollegeRole = "admin" | "faculty";

export interface CollegeUser {
  id: string;
  email: string;
  password: string; // Demo only - never store plain passwords in production
  name: string;
  role: CollegeRole;
  department?: string;
  collegeName: string;
}

export interface StudentRecord {
  id: string;
  _id?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  educationLevel: string;
  fieldOfStudy: string;
  careerDomain: string;
  careerRole: string;
  department: string;
  course: string;
  year: 1 | 2 | 3 | 4;
  cpsScore: number;
  cpsHistory: number[];
  dimensions: {
    technical: number;
    analytical: number;
    communication: number;
    emotional_intelligence: number;
  };
  topCareerDomains: string[];
  topCareerRoles: { role: string; fit: "High" | "Medium" | "Low" }[];
  skillGaps: { skill: string; level: "High" | "Medium" | "Low" }[];
  placementReadiness: "Ready for Placement" | "Needs Training" | "Not Ready";
  likelyIndustries: string[];
  suggestedTraining: string[];
  scores?: any;
  createdAt: string;
}

// Demo college users
export const collegeUsers: CollegeUser[] = [
  { id: "cu1", email: "admin@redapple.edu", password: "admin123", name: "Dr. Rajesh Sharma", role: "admin", collegeName: "Red Apple Learning" },
  { id: "cu2", email: "cs@redapple.edu", password: "faculty123", name: "Prof. Anita Das", role: "faculty", department: "Computer Science", collegeName: "Red Apple Learning" },
  { id: "cu3", email: "bio@redapple.edu", password: "faculty123", name: "Prof. Sunil Roy", role: "faculty", department: "Life Sciences", collegeName: "Red Apple Learning" },
  { id: "cu4", email: "comm@redapple.edu", password: "faculty123", name: "Prof. Kavitha Nair", role: "faculty", department: "Commerce", collegeName: "Red Apple Learning" },
  { id: "cu5", email: "arts@redapple.edu", password: "faculty123", name: "Prof. Meera Singh", role: "faculty", department: "Arts & Humanities", collegeName: "Red Apple Learning" },
];

const departments = ["Computer Science", "Life Sciences", "Commerce", "Arts & Humanities", "Mechanical Engineering", "Electronics"];
const courses: Record<string, string[]> = {
  "Computer Science": ["BTech CSE", "BCA", "BSc CS"],
  "Life Sciences": ["BSc Microbiology", "BSc Biotechnology", "BSc Zoology"],
  "Commerce": ["BCom General", "BCom Honours", "BBA"],
  "Arts & Humanities": ["BA English", "BA Psychology", "BA History"],
  "Mechanical Engineering": ["BTech Mechanical", "BTech Automobile"],
  "Electronics": ["BTech ECE", "BTech EEE"],
};

const careerDomainsByDept: Record<string, string[]> = {
  "Computer Science": ["Software Development", "Data Science", "Cybersecurity", "Cloud & DevOps", "AI/ML"],
  "Life Sciences": ["Research & R&D", "Pharma & Biotech", "Healthcare", "Environmental Science", "Data Analytics"],
  "Commerce": ["Finance & Accounting", "Business Analytics", "Digital Marketing", "Banking & Insurance", "Entrepreneurship"],
  "Arts & Humanities": ["Content & Media", "Education & Training", "Public Policy", "UX Research", "Counseling"],
  "Mechanical Engineering": ["Core Mechanical", "Manufacturing", "Automotive", "Product Management", "Renewable Energy"],
  "Electronics": ["Electronics Core", "Embedded Systems", "IoT & Robotics", "VLSI Design", "Telecom"],
};

const rolesByDept: Record<string, { role: string; fit: "High" | "Medium" | "Low" }[]> = {
  "Computer Science": [
    { role: "Software Engineer", fit: "High" }, { role: "Data Analyst", fit: "High" }, { role: "Frontend Developer", fit: "Medium" },
    { role: "DevOps Engineer", fit: "Medium" }, { role: "Cybersecurity Analyst", fit: "Low" },
  ],
  "Life Sciences": [
    { role: "Research Associate", fit: "High" }, { role: "Lab Technician", fit: "High" }, { role: "Biotech Analyst", fit: "Medium" },
    { role: "Quality Control Officer", fit: "Medium" }, { role: "Health Data Analyst", fit: "Low" },
  ],
  "Commerce": [
    { role: "Financial Analyst", fit: "High" }, { role: "Accountant", fit: "High" }, { role: "Business Analyst", fit: "Medium" },
    { role: "Tax Consultant", fit: "Medium" }, { role: "Digital Marketer", fit: "Low" },
  ],
  "Arts & Humanities": [
    { role: "Content Writer", fit: "High" }, { role: "Journalist", fit: "High" }, { role: "UX Researcher", fit: "Medium" },
    { role: "Policy Analyst", fit: "Medium" }, { role: "Counselor", fit: "Low" },
  ],
  "Mechanical Engineering": [
    { role: "Design Engineer", fit: "High" }, { role: "Production Manager", fit: "High" }, { role: "CAD Engineer", fit: "Medium" },
    { role: "Quality Engineer", fit: "Medium" }, { role: "Sustainability Analyst", fit: "Low" },
  ],
  "Electronics": [
    { role: "Embedded Engineer", fit: "High" }, { role: "VLSI Designer", fit: "High" }, { role: "IoT Engineer", fit: "Medium" },
    { role: "Telecom Engineer", fit: "Medium" }, { role: "Robotics Engineer", fit: "Low" },
  ],
};

const skillGapsByDept: Record<string, { skill: string; level: "High" | "Medium" | "Low" }[]> = {
  "Computer Science": [
    { skill: "Python", level: "High" }, { skill: "System Design", level: "Medium" }, { skill: "Communication", level: "Medium" },
  ],
  "Life Sciences": [
    { skill: "Data Analysis", level: "High" }, { skill: "Lab Techniques", level: "Medium" }, { skill: "Scientific Writing", level: "Low" },
  ],
  "Commerce": [
    { skill: "Financial Modeling", level: "High" }, { skill: "Excel Advanced", level: "Medium" }, { skill: "Presentation Skills", level: "Low" },
  ],
  "Arts & Humanities": [
    { skill: "Digital Tools", level: "High" }, { skill: "Research Methods", level: "Medium" }, { skill: "Portfolio Building", level: "Medium" },
  ],
  "Mechanical Engineering": [
    { skill: "CAD/CAM", level: "High" }, { skill: "Problem Solving", level: "Medium" }, { skill: "Project Management", level: "Low" },
  ],
  "Electronics": [
    { skill: "Verilog/VHDL", level: "High" }, { skill: "PCB Design", level: "Medium" }, { skill: "Communication", level: "Medium" },
  ],
};

const industriesByDept: Record<string, string[]> = {
  "Computer Science": ["IT Services", "Product Companies", "Startups", "Consulting Firms", "E-Commerce"],
  "Life Sciences": ["Pharmaceuticals", "Biotech Firms", "Research Labs", "Healthcare", "Environmental Agencies"],
  "Commerce": ["Banking & Finance", "Big 4 Accounting", "Insurance", "FMCG", "Consulting"],
  "Arts & Humanities": ["Media Houses", "Publishing", "EdTech", "NGOs", "Government"],
  "Mechanical Engineering": ["Manufacturing", "Automotive", "Aerospace", "Energy", "Infrastructure"],
  "Electronics": ["Semiconductor", "Telecom", "Consumer Electronics", "Defense", "IoT Startups"],
};

const trainingByDept: Record<string, string[]> = {
  "Computer Science": ["Full Stack Bootcamp", "DSA Masterclass", "Cloud Certification", "Soft Skills Workshop"],
  "Life Sciences": ["Data Analytics for Bio", "Lab Safety Certification", "Research Methodology", "Scientific Communication"],
  "Commerce": ["Tally & GST Training", "Financial Modeling Course", "Business Analytics", "Mock Interview Prep"],
  "Arts & Humanities": ["Digital Marketing Basics", "Content Writing Workshop", "UX Research Fundamentals", "Public Speaking"],
  "Mechanical Engineering": ["AutoCAD/SolidWorks", "Lean Six Sigma", "Industry 4.0 Awareness", "Technical Communication"],
  "Electronics": ["Embedded C Programming", "VLSI Design Tools", "IoT Prototyping", "Industry Readiness"],
};

const firstNames = [
  "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan",
  "Ananya", "Diya", "Myra", "Sara", "Anika", "Aadhya", "Isha", "Navya", "Riya", "Pari",
  "Rohan", "Kabir", "Shaurya", "Atharv", "Advait", "Dhruv", "Ritvik", "Yash", "Pranav", "Arnav",
  "Saanvi", "Aanya", "Kiara", "Prisha", "Avni", "Mira", "Tanvi", "Nisha", "Shruti", "Pooja",
  "Rahul", "Vikram", "Suresh", "Deepak", "Amit", "Nikhil", "Gaurav", "Karan", "Rajat", "Mohit",
  "Sneha", "Kavya", "Pallavi", "Neha", "Divya", "Swati", "Megha", "Sonia", "Anjali", "Priyanka",
];
const lastNames = [
  "Sharma", "Verma", "Gupta", "Singh", "Kumar", "Das", "Roy", "Patel", "Jain", "Nair",
  "Reddy", "Iyer", "Mukherjee", "Chatterjee", "Banerjee", "Dey", "Ghosh", "Sen", "Bose", "Sahu",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateStudents(): StudentRecord[] {
  const rand = seededRandom(42);
  const students: StudentRecord[] = [];
  let id = 1;

  for (const dept of departments) {
    const deptCourses = courses[dept] || [];
    const count = dept === "Computer Science" ? 18 : dept === "Commerce" ? 15 : 12;

    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(rand() * firstNames.length)];
      const lastName = lastNames[Math.floor(rand() * lastNames.length)];
      const course = deptCourses[Math.floor(rand() * deptCourses.length)];
      const year = (Math.floor(rand() * 4) + 1) as 1 | 2 | 3 | 4;
      const baseCPS = Math.floor(rand() * 60) + 25; // 25-85
      const cpsVariation = Math.floor(rand() * 20) - 5;
      const cpsScore = Math.min(95, Math.max(15, baseCPS + cpsVariation));

      const historyLength = Math.floor(rand() * 3) + 1;
      const cpsHistory: number[] = [];
      let prev = Math.max(15, cpsScore - historyLength * 8 - Math.floor(rand() * 10));
      for (let h = 0; h < historyLength; h++) {
        cpsHistory.push(prev);
        prev = Math.min(95, prev + Math.floor(rand() * 12) + 2);
      }
      cpsHistory.push(cpsScore);

      const technical = Math.floor(rand() * 40) + 30;
      const analytical = Math.floor(rand() * 40) + 30;
      const communication = Math.floor(rand() * 40) + 25;
      const emotional_intelligence = Math.floor(rand() * 35) + 30;

      let placementReadiness: StudentRecord["placementReadiness"];
      const gaps = skillGapsByDept[dept] || [];
      const highGaps = gaps.filter(g => g.level === "High").length;
      if (cpsScore > 70 && highGaps === 0) placementReadiness = "Ready for Placement";
      else if (cpsScore >= 40) placementReadiness = "Needs Training";
      else placementReadiness = "Not Ready";

      students.push({
        id: `s${id++}`,
        name: `${firstName} ${lastName}`,
        department: dept,
        course,
        year,
        cpsScore,
        cpsHistory,
        dimensions: { technical, analytical, communication, emotional_intelligence },
        topCareerDomains: (careerDomainsByDept[dept] || []).slice(0, 3),
        topCareerRoles: (rolesByDept[dept] || []).slice(0, 5),
        skillGaps: skillGapsByDept[dept] || [],
        placementReadiness,
        likelyIndustries: industriesByDept[dept] || [],
        suggestedTraining: trainingByDept[dept] || [],
      });
    }
  }

  return students;
}

// Auth helpers
export function authenticateCollege(email: string, password: string): CollegeUser | null {
  return collegeUsers.find(u => u.email === email && u.password === password) || null;
}

export function getStudentsForUser(user: CollegeUser, allStudents: StudentRecord[]): StudentRecord[] {
  if (user.role === "admin") return allStudents;
  if (user.role === "faculty" && user.department) {
    return allStudents.filter(s => s.department === user.department);
  }
  return [];
}
