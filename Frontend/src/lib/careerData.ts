import { getStreamCPSWeights, getDomainCPSModifier, isGeneralPass as checkGeneralPass, getGeneralPassPenalty } from "@/lib/careerMasterDB";
import { getTaxonomyForRole, calculateSkillScore, normalizeSkillScore, type UserSkill, type Proficiency } from "@/lib/skillEngine";

export const educationLevels = [
  "Class 12 - Science", "Class 12 - Commerce", "Class 12 - Arts",
  "Diploma", "Undergraduate", "Graduate", "Postgraduate", "PhD",
  "Bootcamp", "Self-Taught"
] as const;

export const fieldsOfStudy = [
  "Science", "Commerce", "Arts",
  "Engineering", "Computer Science", "Design", "Media",
  "Mathematics", "Statistics", "Healthcare", "Business",
  "Education", "Law", "Hospitality",
  "Environmental Science", "Psychology", "Architecture",
  "Agriculture", "Pharmacy", "Biotechnology"
] as const;

export const careerDomains = [
  "Technology", "Design", "Business", "Data/AI",
  "Healthcare", "Education", "Engineering",
  "Animation & VFX", "Game Development",
  "Media & Communications", "Transport", "Law",
  "Hospitality", "Fintech", "Cybersecurity",
  "Sustainability & Green Tech", "Robotics & IoT",
  "Social Sciences", "Architecture & Urban Planning",
  "Agriculture & AgriTech", "Biotechnology & Pharma"
] as const;

export type CareerRole = {
  name: string;
  domain: string;
  subdomain: string;
  stream?: "Science" | "Commerce" | "Arts" | "All";
  fieldsOfStudy: string[];
  skills: string[];
  skillWeights: number[];
  tools: string[];
  demandScore: number;
  topRecruiters: string[];
  portfolioRequirement: string;
  typicalExperience: string;
  avgCost: string;
  avgTimeToJob: string;
  sector: ("Private" | "Public" | "Freelance" | "Startup")[];
  trend: "Rising" | "Stable" | "Declining";
  certifications?: string[];
  remoteEligibility?: "High" | "Medium" | "Low";
};

// ============================================================================
// 36 PDF CAREER PATHWAYS (12 per stream) — Class 12 entry-level
// ============================================================================

// SCIENCE STREAM (12 careers)
const scienceCareers: CareerRole[] = [
  {
    name: "Full-Stack Developer", domain: "Technology", subdomain: "Web Dev", stream: "Science",
    fieldsOfStudy: ["Science", "Engineering", "Computer Science"],
    skills: ["Java", "Python", "SQL", "React", "Node.js"],
    skillWeights: [8, 7, 6, 7, 7], tools: ["VS Code", "Git", "Docker"],
    demandScore: 9, topRecruiters: ["Google", "TCS", "Infosys"],
    portfolioRequirement: "Web apps on GitHub", typicalExperience: "2 internships; 3 projects",
    avgCost: "₹2-8 Lakh (B.Tech)", avgTimeToJob: "4 years (degree) + 6 months",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising",
    certifications: ["AWS Certified", "Meta Full-Stack"], remoteEligibility: "High",
  },
  {
    name: "Data Scientist", domain: "Data/AI", subdomain: "Data Science", stream: "Science",
    fieldsOfStudy: ["Science", "Mathematics", "Computer Science", "Statistics"],
    skills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"],
    skillWeights: [8, 9, 8, 7, 7], tools: ["Jupyter", "TensorFlow", "Tableau"],
    demandScore: 10, topRecruiters: ["Amazon", "Microsoft", "IBM"],
    portfolioRequirement: "Data analysis notebooks", typicalExperience: "1 internship; 5 projects",
    avgCost: "₹3-12 Lakh (B.Tech/M.Sc)", avgTimeToJob: "4-5 years + 3 months",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["Google Data Analytics", "IBM Data Science"], remoteEligibility: "High",
  },
  {
    name: "Mechanical Engineer", domain: "Engineering", subdomain: "Mechanical", stream: "Science",
    fieldsOfStudy: ["Science", "Engineering"],
    skills: ["Thermodynamics", "CAD", "MATLAB", "Mechanics"],
    skillWeights: [8, 7, 6, 7], tools: ["SolidWorks", "ANSYS", "AutoCAD"],
    demandScore: 8, topRecruiters: ["L&T", "Tata Motors", "Siemens", "BHEL"],
    portfolioRequirement: "CAD designs", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-10 Lakh (B.Tech)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Public"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "Civil Engineer", domain: "Engineering", subdomain: "Civil", stream: "Science",
    fieldsOfStudy: ["Science", "Engineering"],
    skills: ["AutoCAD", "Surveying", "Soil Mechanics", "MATLAB"],
    skillWeights: [8, 7, 6, 6], tools: ["AutoCAD", "Civil 3D"],
    demandScore: 8, topRecruiters: ["DMRC", "AECOM", "GMR", "L&T"],
    portfolioRequirement: "Bridge design model", typicalExperience: "1 internship; 1 site project",
    avgCost: "₹2-8 Lakh (B.Tech)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Public"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "Biomedical Engineer", domain: "Engineering", subdomain: "Biomedical", stream: "Science",
    fieldsOfStudy: ["Science", "Engineering", "Healthcare"],
    skills: ["Biology", "Electronics", "Mechanics", "MATLAB"],
    skillWeights: [7, 6, 6, 5], tools: ["LabVIEW", "MATLAB"],
    demandScore: 6, topRecruiters: ["Siemens Healthineers", "Medtronic", "GE Healthcare"],
    portfolioRequirement: "Biomechanical device prototype", typicalExperience: "0 internships; 1 project",
    avgCost: "₹3-12 Lakh (B.Tech)", avgTimeToJob: "4 years + 12 months",
    sector: ["Private", "Public"], trend: "Rising",
    remoteEligibility: "Low",
  },
  {
    name: "Physician (MBBS)", domain: "Healthcare", subdomain: "Medicine", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare"],
    skills: ["Biology", "Chemistry", "Anatomy", "Physiology"],
    skillWeights: [9, 8, 7, 7], tools: ["Medical Equipment"],
    demandScore: 9, topRecruiters: ["AIIMS", "Apollo", "Fortis", "Max Healthcare"],
    portfolioRequirement: "Case studies", typicalExperience: "Internship at hospital",
    avgCost: "₹10-60 Lakh (MBBS)", avgTimeToJob: "5.5 years + 1 year internship",
    sector: ["Public", "Private"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "Pharmacist", domain: "Healthcare", subdomain: "Pharmacy", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare"],
    skills: ["Chemistry", "Pharmacology", "Quality Control"],
    skillWeights: [8, 7, 6], tools: ["Lab Instruments"],
    demandScore: 7, topRecruiters: ["Apollo Pharmacy", "MedPlus", "Cipla", "Sun Pharma"],
    portfolioRequirement: "Pharma report", typicalExperience: "0 internships; 1 clinical placement",
    avgCost: "₹2-6 Lakh (B.Pharm)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Public"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "Registered Nurse", domain: "Healthcare", subdomain: "Nursing", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare"],
    skills: ["Biology", "Patient Care", "Anatomy", "CPR"],
    skillWeights: [8, 7, 6, 5], tools: ["Hospital Equipment"],
    demandScore: 8, topRecruiters: ["Apollo", "Fortis", "Max Healthcare"],
    portfolioRequirement: "Patient care log", typicalExperience: "0 internships; 1 clinical stint",
    avgCost: "₹1-4 Lakh (B.Sc Nursing)", avgTimeToJob: "4 years + immediate",
    sector: ["Public", "Private"], trend: "Rising",
    remoteEligibility: "Low",
  },
  {
    name: "Network Admin", domain: "Technology", subdomain: "Networking", stream: "Science",
    fieldsOfStudy: ["Science", "Computer Science"],
    skills: ["Networking", "Security", "Linux"],
    skillWeights: [7, 6, 5], tools: ["Cisco PacketTracer", "Wireshark"],
    demandScore: 8, topRecruiters: ["Cisco", "Wipro", "TCS"],
    portfolioRequirement: "Network configuration", typicalExperience: "1 internship; 1 project",
    avgCost: "₹2-6 Lakh (B.Tech/Diploma)", avgTimeToJob: "3-4 years + 3 months",
    sector: ["Private", "Public"], trend: "Stable",
    certifications: ["CCNA", "CompTIA Network+"], remoteEligibility: "Medium",
  },
  {
    name: "QA Engineer", domain: "Technology", subdomain: "QA", stream: "Science",
    fieldsOfStudy: ["Science", "Computer Science", "Engineering"],
    skills: ["Testing", "Automation", "SQL"],
    skillWeights: [7, 6, 5], tools: ["Selenium", "JIRA"],
    demandScore: 7, topRecruiters: ["Infosys", "Accenture", "IBM"],
    portfolioRequirement: "Test scripts", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-6 Lakh (B.Tech)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private"], trend: "Stable",
    certifications: ["ISTQB"], remoteEligibility: "High",
  },
  {
    name: "Pilot (Commercial)", domain: "Transport", subdomain: "Aviation", stream: "Science",
    fieldsOfStudy: ["Science"],
    skills: ["Physics", "Mathematics", "Geography"],
    skillWeights: [9, 8, 7], tools: ["Flight Simulator"],
    demandScore: 9, topRecruiters: ["Air India", "IndiGo", "Vistara", "SpiceJet"],
    portfolioRequirement: "Simulator hours", typicalExperience: "0 internships; Flight school",
    avgCost: "₹25-50 Lakh (CPL)", avgTimeToJob: "2-3 years training",
    sector: ["Private", "Public"], trend: "Rising",
    remoteEligibility: "Low",
  },
  {
    name: "Radiology Technician", domain: "Healthcare", subdomain: "Paramedical", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare"],
    skills: ["Biology", "Anatomy", "Physics"],
    skillWeights: [7, 7, 6], tools: ["X-ray", "MRI"],
    demandScore: 6, topRecruiters: ["AIIMS", "Fortis", "Max Healthcare"],
    portfolioRequirement: "X-ray analysis", typicalExperience: "0 internships; 1 lab placement",
    avgCost: "₹1-3 Lakh (Diploma/B.Sc)", avgTimeToJob: "2-3 years + immediate",
    sector: ["Public", "Private"], trend: "Stable",
    remoteEligibility: "Low",
  },
];

// COMMERCE STREAM (12 careers)
const commerceCareers: CareerRole[] = [
  {
    name: "Accountant", domain: "Business", subdomain: "Finance", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Accounting", "Taxation", "Excel"],
    skillWeights: [8, 7, 7], tools: ["Tally", "QuickBooks"],
    demandScore: 8, topRecruiters: ["Deloitte", "EY", "KPMG", "PwC"],
    portfolioRequirement: "Tax filing", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹1-4 Lakh (B.Com + CA)", avgTimeToJob: "3-5 years",
    sector: ["Private", "Public", "Freelance"], trend: "Stable",
    certifications: ["CA", "CMA"], remoteEligibility: "High",
  },
  {
    name: "Financial Analyst", domain: "Business", subdomain: "Finance", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Mathematics"],
    skills: ["Excel", "Financial Modeling", "Economics"],
    skillWeights: [8, 7, 6], tools: ["MS Excel", "Bloomberg"],
    demandScore: 7, topRecruiters: ["Goldman Sachs", "Morgan Stanley", "Citi"],
    portfolioRequirement: "Financial models", typicalExperience: "1 internship; 2 analyses",
    avgCost: "₹3-15 Lakh (MBA/CFA)", avgTimeToJob: "3-5 years",
    sector: ["Private"], trend: "Rising",
    certifications: ["CFA", "FRM"], remoteEligibility: "Medium",
  },
  {
    name: "Bank Manager", domain: "Business", subdomain: "Banking", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Banking Operations", "Finance", "Customer Service"],
    skillWeights: [7, 6, 5], tools: ["Core Banking Software"],
    demandScore: 7, topRecruiters: ["HDFC Bank", "SBI", "ICICI Bank"],
    portfolioRequirement: "Branch operations", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹1-3 Lakh (B.Com + Exam)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Public"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "Business Analyst", domain: "Business", subdomain: "Operations", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business", "Engineering"],
    skills: ["Analytics", "SQL", "Domain Knowledge"],
    skillWeights: [8, 7, 6], tools: ["PowerBI", "MS Excel"],
    demandScore: 8, topRecruiters: ["Accenture", "EY", "Capgemini"],
    portfolioRequirement: "Market research", typicalExperience: "1 internship; 3 case studies",
    avgCost: "₹2-8 Lakh (BBA/MBA)", avgTimeToJob: "3-5 years",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["CBAP", "PMI-PBA"], remoteEligibility: "High",
  },
  {
    name: "HR Manager", domain: "Business", subdomain: "HR", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Recruitment", "Labor Law", "Communication"],
    skillWeights: [7, 6, 6], tools: ["HRIS (SAP)"],
    demandScore: 7, topRecruiters: ["TCS", "Wipro", "Accenture"],
    portfolioRequirement: "Interview simulations", typicalExperience: "0 internships; 1 project",
    avgCost: "₹2-8 Lakh (MBA HR)", avgTimeToJob: "3-5 years",
    sector: ["Private", "Public"], trend: "Stable",
    certifications: ["SHRM-CP", "PHR"], remoteEligibility: "Medium",
  },
  {
    name: "Digital Marketer", domain: "Business", subdomain: "Marketing", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Media"],
    skills: ["SEO", "Analytics", "Content", "Social Media"],
    skillWeights: [7, 7, 6, 6], tools: ["Google Ads", "Google Analytics"],
    demandScore: 9, topRecruiters: ["Flipkart", "Deloitte", "Wipro"],
    portfolioRequirement: "Campaign plans", typicalExperience: "0 internships; 2 campaigns",
    avgCost: "₹0.5-3 Lakh (Certification)", avgTimeToJob: "6-12 months",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising",
    certifications: ["Google Ads", "HubSpot Inbound"], remoteEligibility: "High",
  },
  {
    name: "Supply Chain Manager", domain: "Business", subdomain: "Operations", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Logistics", "ERP", "Analytics"],
    skillWeights: [7, 6, 6], tools: ["SAP", "ERP Systems"],
    demandScore: 7, topRecruiters: ["Amazon", "FedEx", "BlueDart"],
    portfolioRequirement: "Logistics plan", typicalExperience: "1 internship; 1 project",
    avgCost: "₹2-8 Lakh (MBA Operations)", avgTimeToJob: "3-5 years",
    sector: ["Private"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "Retail Manager", domain: "Business", subdomain: "Sales", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Sales", "Customer Service", "Management"],
    skillWeights: [7, 6, 6], tools: ["POS Software"],
    demandScore: 7, topRecruiters: ["Reliance Retail", "Big Bazaar", "Aditya Birla Retail"],
    portfolioRequirement: "Store layout design", typicalExperience: "0 internships; 1 internship",
    avgCost: "₹1-5 Lakh (BBA/MBA)", avgTimeToJob: "3-4 years",
    sector: ["Private"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "Hotel Manager", domain: "Hospitality", subdomain: "Hotel Management", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business", "Hospitality"],
    skills: ["Hospitality", "Management", "Finance"],
    skillWeights: [7, 6, 5], tools: ["Hotel PMS"],
    demandScore: 6, topRecruiters: ["Taj Hotels", "Oberoi", "ITC Hotels"],
    portfolioRequirement: "Operations plan", typicalExperience: "0 internships; 1 project",
    avgCost: "₹3-10 Lakh (BHM)", avgTimeToJob: "3-4 years",
    sector: ["Private"], trend: "Rising",
    remoteEligibility: "Low",
  },
  {
    name: "Flight Attendant", domain: "Transport", subdomain: "Airlines", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Hospitality"],
    skills: ["Communication", "Safety Protocols", "Customer Service"],
    skillWeights: [8, 7, 6], tools: ["Safety Equipment"],
    demandScore: 7, topRecruiters: ["IndiGo", "Air India", "SpiceJet"],
    portfolioRequirement: "Safety drill log", typicalExperience: "0 internships; Training",
    avgCost: "₹1-3 Lakh (Training)", avgTimeToJob: "6-12 months",
    sector: ["Private", "Public"], trend: "Rising",
    remoteEligibility: "Low",
  },
  {
    name: "Economist", domain: "Business", subdomain: "Analysis", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Mathematics", "Statistics"],
    skills: ["Economics", "Statistics", "Research"],
    skillWeights: [8, 7, 6], tools: ["Statistical Software"],
    demandScore: 5, topRecruiters: ["NITI Aayog", "IMF", "RBI"],
    portfolioRequirement: "Market analysis", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-8 Lakh (MA Economics)", avgTimeToJob: "5-6 years",
    sector: ["Public", "Private"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "System Administrator", domain: "Technology", subdomain: "Infrastructure", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Computer Science"],
    skills: ["Networking", "OS Admin", "Security"],
    skillWeights: [7, 6, 6], tools: ["Windows Server", "Linux"],
    demandScore: 7, topRecruiters: ["Microsoft", "IBM", "Tech Mahindra"],
    portfolioRequirement: "Server configs", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-6 Lakh (BCA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private"], trend: "Stable",
    certifications: ["CompTIA A+", "Microsoft AZ-900"], remoteEligibility: "Medium",
  },
];

// ARTS STREAM (12 careers)
const artsCareers: CareerRole[] = [
  {
    name: "Graphic Designer", domain: "Design", subdomain: "Visual Design", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design"],
    skills: ["Photoshop", "Illustrator", "Typography", "Layout"],
    skillWeights: [8, 7, 6, 6], tools: ["Adobe Photoshop", "Adobe Illustrator"],
    demandScore: 7, topRecruiters: ["Ogilvy", "Marico", "Dell"],
    portfolioRequirement: "Design portfolio", typicalExperience: "0 internships; 3 projects",
    avgCost: "₹1-5 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance", "Startup"], trend: "Stable",
    remoteEligibility: "High",
  },
  {
    name: "UX/UI Designer", domain: "Design", subdomain: "UI/UX Design", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design", "Computer Science"],
    skills: ["Figma", "User Research", "Prototyping", "HTML", "CSS"],
    skillWeights: [9, 8, 7, 6, 6], tools: ["Figma", "Sketch", "Adobe XD"],
    demandScore: 8, topRecruiters: ["Adobe", "Accenture", "IBM"],
    portfolioRequirement: "UX case studies", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹1-6 Lakh (BDes/Bootcamp)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising",
    certifications: ["Google UX Design"], remoteEligibility: "High",
  },
  {
    name: "Animator", domain: "Animation & VFX", subdomain: "Animation", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design"],
    skills: ["3D Modeling", "Rigging", "Animation"],
    skillWeights: [8, 7, 6], tools: ["Blender", "Maya", "After Effects"],
    demandScore: 6, topRecruiters: ["Pixar", "GreenGold", "DreamWorks"],
    portfolioRequirement: "Animation reel", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-8 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Video Editor", domain: "Media & Communications", subdomain: "Film/Video", stream: "Arts",
    fieldsOfStudy: ["Arts", "Media"],
    skills: ["Editing", "Cinematography", "Storytelling"],
    skillWeights: [7, 6, 5], tools: ["Adobe Premiere", "After Effects"],
    demandScore: 6, topRecruiters: ["Eros", "SunTV", "Netflix"],
    portfolioRequirement: "Demo reel", typicalExperience: "0 internships; 2 short films",
    avgCost: "₹1-5 Lakh (Diploma/BA)", avgTimeToJob: "2-3 years",
    sector: ["Private", "Freelance", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Fashion Designer", domain: "Design", subdomain: "Fashion", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design"],
    skills: ["Sketching", "Pattern Making", "Textiles"],
    skillWeights: [7, 6, 6], tools: ["CLO3D", "Illustrator"],
    demandScore: 5, topRecruiters: ["Zara", "FabIndia", "Lakme", "NIFT"],
    portfolioRequirement: "Fashion sketches", typicalExperience: "0 internships; 1 collection",
    avgCost: "₹3-15 Lakh (BDes NIFT)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Freelance"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "Journalist", domain: "Media & Communications", subdomain: "Journalism", stream: "Arts",
    fieldsOfStudy: ["Arts", "Media"],
    skills: ["Writing", "Editing", "Research"],
    skillWeights: [7, 6, 6], tools: ["WordPress", "SEO Tools"],
    demandScore: 7, topRecruiters: ["Times Group", "NDTV", "CNN", "India Today"],
    portfolioRequirement: "Published articles", typicalExperience: "0 internships; 1 article",
    avgCost: "₹1-5 Lakh (BA Mass Comm)", avgTimeToJob: "3 years + 3 months",
    sector: ["Private", "Public"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "Content Writer", domain: "Media & Communications", subdomain: "Content", stream: "Arts",
    fieldsOfStudy: ["Arts", "Media"],
    skills: ["Writing", "SEO", "Social Media"],
    skillWeights: [7, 6, 5], tools: ["WordPress", "Google Analytics"],
    demandScore: 7, topRecruiters: ["Contently", "LinkedIn", "HubSpot"],
    portfolioRequirement: "Blog portfolio", typicalExperience: "0 internships; 3 blogs",
    avgCost: "₹0.5-3 Lakh (BA/Online)", avgTimeToJob: "1-3 years",
    sector: ["Private", "Freelance", "Startup"], trend: "Stable",
    remoteEligibility: "High",
  },
  {
    name: "Psychologist", domain: "Healthcare", subdomain: "Counseling", stream: "Arts",
    fieldsOfStudy: ["Arts", "Healthcare", "Psychology"],
    skills: ["Counseling", "Psychology", "Communication"],
    skillWeights: [8, 7, 7], tools: ["SPSS", "Counseling Tools"],
    demandScore: 6, topRecruiters: ["NIMHANS", "Fortis", "AIIMS"],
    portfolioRequirement: "Case reports", typicalExperience: "0 internships; 1 case study",
    avgCost: "₹2-8 Lakh (BA + MA Psychology)", avgTimeToJob: "5-6 years",
    sector: ["Private", "Public", "Freelance"], trend: "Rising",
    remoteEligibility: "Medium",
  },
  {
    name: "Business Manager", domain: "Business", subdomain: "Management", stream: "Arts",
    fieldsOfStudy: ["Arts", "Business", "Commerce"],
    skills: ["Leadership", "Finance", "Strategy"],
    skillWeights: [7, 6, 6], tools: ["MS Excel", "ERP Systems"],
    demandScore: 7, topRecruiters: ["Tata Group", "Reliance", "Aditya Birla"],
    portfolioRequirement: "Business plan", typicalExperience: "0 internships; 1 project",
    avgCost: "₹2-15 Lakh (BBA + MBA)", avgTimeToJob: "5-6 years",
    sector: ["Private"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "Interior Designer", domain: "Design", subdomain: "Interior Design", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design", "Architecture"],
    skills: ["AutoCAD", "3D Design", "Color Theory"],
    skillWeights: [8, 7, 6], tools: ["AutoCAD", "3ds Max"],
    demandScore: 5, topRecruiters: ["Oberoi", "Hilton", "IKEA"],
    portfolioRequirement: "Room layouts", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-10 Lakh (BDes/Diploma)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Freelance"], trend: "Rising",
    remoteEligibility: "Medium",
  },
  {
    name: "Event Manager", domain: "Hospitality", subdomain: "Events", stream: "Arts",
    fieldsOfStudy: ["Arts", "Hospitality", "Business"],
    skills: ["Event Planning", "Logistics", "Communication"],
    skillWeights: [7, 6, 6], tools: ["Event Software"],
    demandScore: 6, topRecruiters: ["Taj Hotels", "ITC", "Marriott"],
    portfolioRequirement: "Event proposal", typicalExperience: "0 internships; 1 event",
    avgCost: "₹1-5 Lakh (BA/Diploma)", avgTimeToJob: "3 years + 3 months",
    sector: ["Private", "Freelance"], trend: "Rising",
    remoteEligibility: "Low",
  },
  {
    name: "Sales Manager", domain: "Business", subdomain: "Sales", stream: "Arts",
    fieldsOfStudy: ["Arts", "Commerce", "Business"],
    skills: ["Negotiation", "CRM", "Communication"],
    skillWeights: [8, 7, 7], tools: ["Salesforce", "Excel"],
    demandScore: 6, topRecruiters: ["P&G", "Nestle", "Coca-Cola"],
    portfolioRequirement: "Sales pitch samples", typicalExperience: "0 internships; 1 sales project",
    avgCost: "₹1-5 Lakh (BBA)", avgTimeToJob: "3 years + 3 months",
    sector: ["Private"], trend: "Stable",
    remoteEligibility: "Medium",
  },
];

// ============================================================================
// ADVANCED ROLES (for UG/PG/Bootcamp/Self-taught — all domains open)
// ============================================================================

const advancedCareers: CareerRole[] = [
  {
    name: "Software Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Engineering", "Computer Science"],
    skills: ["Java", "Python", "SQL", "Data Structures", "Version Control"],
    skillWeights: [9, 8, 7, 8, 7], tools: ["Git", "VS Code", "IntelliJ"],
    demandScore: 10, topRecruiters: ["Google", "Microsoft", "Amazon", "Infosys", "TCS"],
    portfolioRequirement: "GitHub projects", typicalExperience: "2 internships; 3 projects",
    avgCost: "₹2-8 Lakh (B.Tech)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["AWS Developer", "Oracle Java"], remoteEligibility: "High",
  },
  {
    name: "Frontend Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Design"],
    skills: ["HTML", "CSS", "JavaScript", "React"],
    skillWeights: [7, 7, 7, 6], tools: ["VS Code", "Chrome DevTools"],
    demandScore: 8, topRecruiters: ["Google", "Amazon", "IBM"],
    portfolioRequirement: "Live websites", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹1-6 Lakh (B.Tech/Bootcamp)", avgTimeToJob: "3-4 years or 6 months bootcamp",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Backend Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Node.js", "Express", "MongoDB"],
    skillWeights: [7, 6, 6], tools: ["Node.js", "Postman"],
    demandScore: 8, topRecruiters: ["Flipkart", "Cognizant", "Microsoft"],
    portfolioRequirement: "APIs on GitHub", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-6 Lakh (B.Tech/Bootcamp)", avgTimeToJob: "3-4 years or 6 months bootcamp",
    sector: ["Private", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Mobile Developer", domain: "Technology", subdomain: "Mobile Apps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["React Native", "Flutter", "Kotlin", "Swift", "REST APIs"],
    skillWeights: [7, 7, 6, 6, 6], tools: ["Android Studio", "Xcode", "VS Code"],
    demandScore: 8, topRecruiters: ["Google", "Apple", "Flipkart", "Swiggy", "PhonePe"],
    portfolioRequirement: "Published apps", typicalExperience: "1 internship; 2 apps",
    avgCost: "₹2-8 Lakh (B.Tech)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Cloud Engineer", domain: "Technology", subdomain: "Cloud/DevOps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["AWS", "Docker", "Kubernetes", "Linux"],
    skillWeights: [7, 6, 6, 5], tools: ["AWS", "Docker", "Kubernetes"],
    demandScore: 9, topRecruiters: ["Accenture", "IBM", "Infosys"],
    portfolioRequirement: "Deployed cloud solution", typicalExperience: "0 internships; 1 project",
    avgCost: "₹2-8 Lakh (B.Tech + Cert)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["AWS Solutions Architect", "GCP Associate"], remoteEligibility: "High",
  },
  {
    name: "DevOps Engineer", domain: "Technology", subdomain: "Cloud/DevOps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Docker", "Kubernetes", "Jenkins", "Linux", "AWS"],
    skillWeights: [7, 7, 6, 6, 6], tools: ["Docker", "Jenkins", "Terraform"],
    demandScore: 9, topRecruiters: ["Google", "Amazon", "Netflix", "Atlassian", "IBM"],
    portfolioRequirement: "CI/CD pipelines", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (B.Tech + Cert)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["Docker Certified", "Kubernetes CKAD"], remoteEligibility: "High",
  },
  {
    name: "Security Analyst", domain: "Cybersecurity", subdomain: "Security", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics"],
    skills: ["Network Security", "Python", "Firewall", "Ethical Hacking"],
    skillWeights: [7, 6, 5, 5], tools: ["Kali Linux", "Wireshark"],
    demandScore: 9, topRecruiters: ["TCS", "HCL", "RSA"],
    portfolioRequirement: "Security audit report", typicalExperience: "0 internships; 1 CTF contest",
    avgCost: "₹2-8 Lakh (B.Tech + Cert)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Public"], trend: "Rising",
    certifications: ["CEH", "CompTIA Security+"], remoteEligibility: "Medium",
  },
  {
    name: "Cybersecurity Analyst", domain: "Cybersecurity", subdomain: "Security", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Penetration Testing", "Network Security", "Incident Response", "SIEM"],
    skillWeights: [7, 6, 5, 5], tools: ["Kali Linux", "Wireshark", "Nmap"],
    demandScore: 9, topRecruiters: ["CrowdStrike", "Palo Alto", "IBM", "Deloitte"],
    portfolioRequirement: "Security audit report", typicalExperience: "0 internships; 1 CTF",
    avgCost: "₹2-10 Lakh (B.Tech + Cert)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Public"], trend: "Rising",
    certifications: ["CISSP", "OSCP"], remoteEligibility: "Medium",
  },
  {
    name: "AI/ML Engineer", domain: "Data/AI", subdomain: "Machine Learning", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics", "Statistics"],
    skills: ["Python", "TensorFlow", "Statistics", "Data Analysis"],
    skillWeights: [8, 7, 6, 6], tools: ["Jupyter", "TensorFlow"],
    demandScore: 10, topRecruiters: ["Google", "Microsoft", "NVIDIA"],
    portfolioRequirement: "ML model demos", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹3-15 Lakh (B.Tech/M.Tech)", avgTimeToJob: "4-6 years",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["Google ML Engineer", "Deep Learning Specialization"], remoteEligibility: "High",
  },
  {
    name: "Data Analyst", domain: "Data/AI", subdomain: "Data Science", stream: "All",
    fieldsOfStudy: ["Mathematics", "Computer Science", "Statistics", "Commerce"],
    skills: ["Python", "SQL", "Excel", "Tableau", "Statistics"],
    skillWeights: [8, 7, 6, 7, 6], tools: ["Jupyter", "Tableau", "Power BI"],
    demandScore: 9, topRecruiters: ["Deloitte", "Accenture", "EY", "KPMG", "Amazon"],
    portfolioRequirement: "Data analysis projects", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹1-6 Lakh (B.Sc/BCA + Cert)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["Google Data Analytics", "Tableau Desktop"], remoteEligibility: "High",
  },
  {
    name: "UX Designer", domain: "Design", subdomain: "UI/UX Design", stream: "All",
    fieldsOfStudy: ["Design", "Computer Science", "Arts"],
    skills: ["Figma", "User Research", "Prototyping", "CSS", "Illustrator"],
    skillWeights: [9, 8, 7, 5, 6], tools: ["Figma", "Sketch", "Adobe XD"],
    demandScore: 8, topRecruiters: ["Adobe", "Accenture", "Capgemini"],
    portfolioRequirement: "UX case studies", typicalExperience: "0 internships; 2 portfolio projects",
    avgCost: "₹1-8 Lakh (BDes/Bootcamp)", avgTimeToJob: "3-4 years or 6 months bootcamp",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising",
    certifications: ["Google UX Design"], remoteEligibility: "High",
  },
  {
    name: "UI Designer", domain: "Design", subdomain: "UI/UX Design", stream: "All",
    fieldsOfStudy: ["Design", "Computer Science", "Arts"],
    skills: ["Figma", "CSS", "Typography", "Color Theory", "Adobe XD"],
    skillWeights: [9, 7, 6, 6, 5], tools: ["Figma", "Adobe XD", "Sketch"],
    demandScore: 8, topRecruiters: ["Adobe", "Accenture", "Flipkart", "TCS"],
    portfolioRequirement: "UI design case studies", typicalExperience: "0 internships; 2 portfolio projects",
    avgCost: "₹1-6 Lakh (BDes/Online)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Product Designer", domain: "Design", subdomain: "UI/UX Design", stream: "All",
    fieldsOfStudy: ["Design", "Computer Science", "Engineering"],
    skills: ["Figma", "Prototyping", "User Research", "Wireframing", "Design Systems"],
    skillWeights: [9, 8, 7, 7, 6], tools: ["Figma", "Sketch", "Miro"],
    demandScore: 8, topRecruiters: ["Google", "Uber", "Razorpay", "Swiggy", "Flipkart"],
    portfolioRequirement: "Product case studies", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹2-10 Lakh (BDes/MDes)", avgTimeToJob: "4-5 years",
    sector: ["Private", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Product Manager", domain: "Business", subdomain: "Operations", stream: "All",
    fieldsOfStudy: ["Engineering", "Business", "Computer Science"],
    skills: ["Product Strategy", "User Stories", "Roadmapping", "Analytics", "Agile"],
    skillWeights: [8, 7, 7, 6, 7], tools: ["JIRA", "Mixpanel", "Miro"],
    demandScore: 9, topRecruiters: ["Google", "Amazon", "Microsoft", "Uber", "Razorpay"],
    portfolioRequirement: "Product specs & PRDs", typicalExperience: "2 internships; 2 projects",
    avgCost: "₹5-20 Lakh (B.Tech + MBA)", avgTimeToJob: "4-6 years",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["PMP", "Scrum Master"], remoteEligibility: "High",
  },
  {
    name: "SEO Specialist", domain: "Business", subdomain: "Marketing", stream: "All",
    fieldsOfStudy: ["Commerce", "Media", "Computer Science"],
    skills: ["SEO", "Google Analytics", "Keyword Research", "Content Strategy", "Technical SEO"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["Ahrefs", "SEMrush", "Google Search Console"],
    demandScore: 7, topRecruiters: ["Dentsu", "Ogilvy", "iProspect", "GroupM"],
    portfolioRequirement: "SEO case studies", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹0.5-2 Lakh (Certification)", avgTimeToJob: "3-6 months",
    sector: ["Private", "Freelance", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Marketing Analyst", domain: "Business", subdomain: "Marketing", stream: "All",
    fieldsOfStudy: ["Commerce", "Mathematics", "Statistics"],
    skills: ["Google Analytics", "Excel", "SQL", "Data Analysis", "Reporting"],
    skillWeights: [7, 7, 6, 7, 5], tools: ["Google Analytics", "Excel", "Tableau"],
    demandScore: 7, topRecruiters: ["Accenture", "Deloitte", "HubSpot", "GroupM"],
    portfolioRequirement: "Analytics reports", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (BBA/MBA)", avgTimeToJob: "3-5 years",
    sector: ["Private", "Startup"], trend: "Stable",
    remoteEligibility: "High",
  },
  {
    name: "Operations Manager", domain: "Business", subdomain: "Operations", stream: "All",
    fieldsOfStudy: ["Business", "Engineering", "Commerce"],
    skills: ["Process Optimization", "Supply Chain", "Excel", "Project Management", "Analytics"],
    skillWeights: [7, 6, 7, 6, 6], tools: ["SAP", "Excel", "JIRA"],
    demandScore: 6, topRecruiters: ["Amazon", "Flipkart", "TCS", "Accenture"],
    portfolioRequirement: "Process improvement docs", typicalExperience: "1 internship; 1 project",
    avgCost: "₹2-12 Lakh (B.Tech/MBA)", avgTimeToJob: "4-6 years",
    sector: ["Private"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "Healthcare Admin", domain: "Healthcare", subdomain: "Administration", stream: "All",
    fieldsOfStudy: ["Healthcare", "Business"],
    skills: ["Operations", "Compliance", "Communication"],
    skillWeights: [5, 4, 4], tools: ["Hospital MIS"],
    demandScore: 5, topRecruiters: ["Fortis", "Apollo", "Max Healthcare"],
    portfolioRequirement: "Hospital workflow report", typicalExperience: "0 internships; 1 project",
    avgCost: "₹2-8 Lakh (MHA/MBA)", avgTimeToJob: "4-5 years",
    sector: ["Private", "Public"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "E-Learning Designer", domain: "Education", subdomain: "E-Learning", stream: "All",
    fieldsOfStudy: ["Education", "Media", "Design"],
    skills: ["Articulate", "Instructional Design", "Communication"],
    skillWeights: [6, 5, 5], tools: ["Articulate 360"],
    demandScore: 4, topRecruiters: ["NIIT", "Educomp", "BYJU'S"],
    portfolioRequirement: "eLearning module", typicalExperience: "0 internships; 2 samples",
    avgCost: "₹1-4 Lakh (MA Education/Cert)", avgTimeToJob: "2-4 years",
    sector: ["Private", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  // Animation & VFX advanced
  {
    name: "2D Animator", domain: "Animation & VFX", subdomain: "2D Animation", stream: "All",
    fieldsOfStudy: ["Design", "Arts", "Media"],
    skills: ["Animation Principles", "After Effects", "Photoshop", "Storyboarding", "Character Design"],
    skillWeights: [8, 7, 6, 7, 6], tools: ["After Effects", "Toon Boom", "Photoshop"],
    demandScore: 6, topRecruiters: ["DreamWorks", "Toonz", "Green Gold", "Cosmos Maya"],
    portfolioRequirement: "Animation reel", typicalExperience: "0 internships; 2 short films",
    avgCost: "₹2-8 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable",
    remoteEligibility: "High",
  },
  {
    name: "3D Animator", domain: "Animation & VFX", subdomain: "3D Animation", stream: "All",
    fieldsOfStudy: ["Design", "Arts", "Engineering"],
    skills: ["Maya", "Blender", "3D Modeling", "Rigging", "Lighting"],
    skillWeights: [8, 7, 7, 6, 5], tools: ["Maya", "Blender", "Houdini"],
    demandScore: 6, topRecruiters: ["DNEG", "Framestore", "MPC", "Prime Focus"],
    portfolioRequirement: "3D animation reel", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹3-10 Lakh (BFA/MDes)", avgTimeToJob: "3-5 years",
    sector: ["Private", "Freelance"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "3D Modeler", domain: "Design", subdomain: "3D Art", stream: "All",
    fieldsOfStudy: ["Design", "Engineering"],
    skills: ["Blender", "Maya", "Modeling", "Texturing"],
    skillWeights: [8, 7, 7, 6], tools: ["Blender", "Autodesk Maya"],
    demandScore: 6, topRecruiters: ["GameAcc", "Zynga"],
    portfolioRequirement: "3D model renders", typicalExperience: "1 internship; 2 portfolio pieces",
    avgCost: "₹2-8 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable",
    remoteEligibility: "High",
  },
  {
    name: "Compositor", domain: "Animation & VFX", subdomain: "Compositing", stream: "All",
    fieldsOfStudy: ["Design", "Arts", "Media"],
    skills: ["Nuke", "After Effects", "Color Grading", "Rotoscoping", "Keying"],
    skillWeights: [8, 7, 6, 6, 5], tools: ["Nuke", "After Effects", "Fusion"],
    demandScore: 6, topRecruiters: ["DNEG", "Framestore", "MPC", "Prime Focus"],
    portfolioRequirement: "VFX breakdown reel", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-8 Lakh (Diploma/BFA)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable",
    remoteEligibility: "High",
  },
  // Game Development
  {
    name: "Gameplay Programmer", domain: "Game Development", subdomain: "Game Programming", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["C++", "C#", "Unity", "Unreal Engine", "Physics"],
    skillWeights: [8, 7, 7, 6, 5], tools: ["Unity", "Unreal Engine", "Visual Studio"],
    demandScore: 7, topRecruiters: ["Ubisoft", "EA", "Rockstar", "Supercell"],
    portfolioRequirement: "Game demos", typicalExperience: "0 internships; 2 game jams",
    avgCost: "₹2-10 Lakh (B.Tech/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Game Designer", domain: "Game Development", subdomain: "Game Design", stream: "All",
    fieldsOfStudy: ["Design", "Computer Science", "Arts"],
    skills: ["Game Mechanics", "Level Design", "Narrative Design", "Prototyping", "Unity"],
    skillWeights: [8, 7, 6, 6, 6], tools: ["Unity", "Unreal Engine", "Figma"],
    demandScore: 6, topRecruiters: ["Ubisoft", "EA", "Rockstar", "Supercell"],
    portfolioRequirement: "Game design documents", typicalExperience: "0 internships; 1 published game",
    avgCost: "₹2-10 Lakh (BDes/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "AR/VR Developer", domain: "Game Development", subdomain: "Game Programming", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering", "Design"],
    skills: ["Unity", "C#", "3D Modeling", "Spatial Computing", "OpenXR"],
    skillWeights: [8, 7, 6, 6, 5], tools: ["Unity", "Unreal Engine", "Blender"],
    demandScore: 7, topRecruiters: ["Meta", "Apple", "Google", "Microsoft"],
    portfolioRequirement: "AR/VR demos", typicalExperience: "0 internships; 2 prototypes",
    avgCost: "₹3-10 Lakh (B.Tech)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["Unity Certified Developer"], remoteEligibility: "High",
  },
  // Cross-stream careers
  {
    name: "Teacher", domain: "Education", subdomain: "Teaching", stream: "All",
    fieldsOfStudy: ["Science", "Commerce", "Arts", "Education"],
    skills: ["Subject Knowledge", "Pedagogy", "Communication"],
    skillWeights: [8, 7, 8], tools: ["Zoom", "Smart Board", "Google Classroom"],
    demandScore: 7, topRecruiters: ["CBSE Schools", "ICSE Schools", "IB Schools", "BYJU'S"],
    portfolioRequirement: "Teaching demo & lesson plans", typicalExperience: "B.Ed + demo lessons",
    avgCost: "₹1-4 Lakh (B.Ed)", avgTimeToJob: "4-5 years (degree + B.Ed)",
    sector: ["Public", "Private"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "AI Researcher", domain: "Data/AI", subdomain: "AI Research", stream: "All",
    fieldsOfStudy: ["Science", "Mathematics", "Computer Science"],
    skills: ["Mathematics", "Machine Learning", "Programming"],
    skillWeights: [9, 8, 7], tools: ["PyTorch", "TensorFlow"],
    demandScore: 8, topRecruiters: ["IIT Delhi", "IBM Research", "Google Brain"],
    portfolioRequirement: "Research papers", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹5-20 Lakh (M.Tech/PhD)", avgTimeToJob: "6-8 years",
    sector: ["Private", "Public"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Lawyer", domain: "Law", subdomain: "Legal Practice", stream: "All",
    fieldsOfStudy: ["Arts", "Law"],
    skills: ["Law", "Analytical Thinking", "Communication"],
    skillWeights: [9, 7, 6], tools: ["LexisNexis"],
    demandScore: 7, topRecruiters: ["SC", "Bar Council", "AZB & Partners", "Cyril Amarchand"],
    portfolioRequirement: "Case studies & moot court", typicalExperience: "Moot court competitions",
    avgCost: "₹3-15 Lakh (BA LLB/LLB)", avgTimeToJob: "5 years (integrated) or 3 years",
    sector: ["Private", "Public", "Freelance"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "Research Scientist", domain: "Technology", subdomain: "Research", stream: "All",
    fieldsOfStudy: ["Science", "Mathematics", "Statistics"],
    skills: ["Physics", "Mathematics", "Programming"],
    skillWeights: [8, 8, 7], tools: ["Python", "Jupyter"],
    demandScore: 6, topRecruiters: ["TIFR", "ISRO", "DRDO", "IISc"],
    portfolioRequirement: "Lab reports & papers", typicalExperience: "0 internships; 3 experiments",
    avgCost: "₹3-15 Lakh (M.Sc/PhD)", avgTimeToJob: "5-8 years",
    sector: ["Public", "Private"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "Sales Executive", domain: "Business", subdomain: "Sales", stream: "All",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Sales Strategy", "CRM", "Negotiation", "Lead Generation", "Communication"],
    skillWeights: [7, 6, 7, 6, 8], tools: ["Salesforce", "HubSpot", "Excel"],
    demandScore: 7, topRecruiters: ["Amazon", "Flipkart", "HDFC", "ICICI"],
    portfolioRequirement: "Sales records", typicalExperience: "1 internship",
    avgCost: "₹1-5 Lakh (BBA/Diploma)", avgTimeToJob: "3 years + immediate",
    sector: ["Private"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "Social Media Manager", domain: "Business", subdomain: "Marketing", stream: "All",
    fieldsOfStudy: ["Media", "Commerce"],
    skills: ["Social Media", "Content Creation", "Analytics", "Community Management", "Paid Ads"],
    skillWeights: [8, 7, 6, 6, 6], tools: ["Hootsuite", "Buffer", "Canva"],
    demandScore: 7, topRecruiters: ["Dentsu", "Ogilvy", "WPP", "Swiggy", "Zomato"],
    portfolioRequirement: "Social campaigns", typicalExperience: "0 internships; 1 brand managed",
    avgCost: "₹0.5-3 Lakh (Certification/Diploma)", avgTimeToJob: "6-12 months",
    sector: ["Private", "Freelance", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Content Creator", domain: "Media & Communications", subdomain: "Content", stream: "All",
    fieldsOfStudy: ["Media", "Arts"],
    skills: ["Video Editing", "Copywriting", "Social Media", "Storytelling", "Analytics"],
    skillWeights: [7, 7, 6, 7, 5], tools: ["Premiere Pro", "Canva", "Instagram"],
    demandScore: 7, topRecruiters: ["YouTube", "Instagram", "Netflix", "Pocket Aces", "TVF"],
    portfolioRequirement: "Content portfolio", typicalExperience: "0 internships; 5 content pieces",
    avgCost: "₹0.5-3 Lakh (Self-taught/Online)", avgTimeToJob: "3-6 months",
    sector: ["Freelance", "Startup", "Private"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Brand Designer", domain: "Design", subdomain: "Visual Design", stream: "All",
    fieldsOfStudy: ["Design", "Arts"],
    skills: ["Illustrator", "Photoshop", "Branding", "Typography", "Color Theory"],
    skillWeights: [8, 7, 8, 7, 6], tools: ["Illustrator", "Photoshop", "InDesign"],
    demandScore: 6, topRecruiters: ["Ogilvy", "Dentsu", "Lowe Lintas", "WPP"],
    portfolioRequirement: "Brand identity projects", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-8 Lakh (BDes/BFA)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable",
    remoteEligibility: "High",
  },
  {
    name: "Motion Graphics Designer", domain: "Design", subdomain: "Visual Design", stream: "All",
    fieldsOfStudy: ["Design", "Arts", "Media"],
    skills: ["After Effects", "Premiere Pro", "Photoshop", "Animation Principles", "Typography"],
    skillWeights: [8, 7, 6, 7, 5], tools: ["After Effects", "Premiere Pro", "Cinema 4D"],
    demandScore: 7, topRecruiters: ["Ogilvy", "Dentsu", "WPP", "Pocket Aces", "TVF"],
    portfolioRequirement: "Motion reel", typicalExperience: "0 internships; 3 projects",
    avgCost: "₹2-6 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Nutritionist", domain: "Healthcare", subdomain: "Allied Health", stream: "All",
    fieldsOfStudy: ["Science", "Healthcare"],
    skills: ["Biology", "Nutrition", "Biochemistry"],
    skillWeights: [7, 7, 6], tools: ["Dietary Analysis Tools"],
    demandScore: 5, topRecruiters: ["Fortis", "Apollo", "HealthifyMe"],
    portfolioRequirement: "Diet plans", typicalExperience: "0 internships; 1 study",
    avgCost: "₹1-5 Lakh (B.Sc Nutrition)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Rising",
    remoteEligibility: "Medium",
  },
  // ============================================================================
  // NEW ADVANCED ROLES — Extended domains
  // ============================================================================
  // Fintech
  {
    name: "Blockchain Developer", domain: "Fintech", subdomain: "Blockchain", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering", "Mathematics"],
    skills: ["Solidity", "Smart Contracts", "Ethereum", "Web3.js", "Cryptography"],
    skillWeights: [8, 8, 7, 6, 7], tools: ["Hardhat", "Truffle", "MetaMask"],
    demandScore: 8, topRecruiters: ["Coinbase", "Polygon", "ConsenSys", "WazirX"],
    portfolioRequirement: "Deployed smart contracts", typicalExperience: "0 internships; 2 DApps",
    avgCost: "₹2-8 Lakh (B.Tech + Online Cert)", avgTimeToJob: "4 years + 3 months",
    sector: ["Startup", "Private"], trend: "Rising",
    certifications: ["Certified Blockchain Developer"], remoteEligibility: "High",
  },
  {
    name: "Fintech Product Analyst", domain: "Fintech", subdomain: "Product Analytics", stream: "All",
    fieldsOfStudy: ["Commerce", "Business", "Computer Science", "Mathematics"],
    skills: ["SQL", "Product Analytics", "Financial Modeling", "Python", "A/B Testing"],
    skillWeights: [7, 8, 7, 6, 6], tools: ["Mixpanel", "Amplitude", "Excel"],
    demandScore: 8, topRecruiters: ["Razorpay", "PhonePe", "Paytm", "CRED"],
    portfolioRequirement: "Product analysis case studies", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹3-12 Lakh (B.Tech/MBA)", avgTimeToJob: "4-5 years",
    sector: ["Private", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Quantitative Analyst", domain: "Fintech", subdomain: "Quantitative Finance", stream: "All",
    fieldsOfStudy: ["Mathematics", "Statistics", "Computer Science"],
    skills: ["Python", "Statistics", "Financial Modeling", "Machine Learning", "Stochastic Calculus"],
    skillWeights: [8, 9, 8, 7, 7], tools: ["Python", "R", "MATLAB", "Bloomberg"],
    demandScore: 8, topRecruiters: ["Goldman Sachs", "JPMorgan", "Tower Research", "Citadel"],
    portfolioRequirement: "Quant models & backtests", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹5-25 Lakh (M.Sc/MFE)", avgTimeToJob: "5-6 years",
    sector: ["Private"], trend: "Rising",
    certifications: ["CQF", "FRM"], remoteEligibility: "Medium",
  },
  // Sustainability & Green Tech
  {
    name: "Sustainability Consultant", domain: "Sustainability & Green Tech", subdomain: "ESG Consulting", stream: "All",
    fieldsOfStudy: ["Environmental Science", "Business", "Science"],
    skills: ["ESG Reporting", "Carbon Accounting", "Data Analysis", "Policy Research", "Communication"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["GRI Standards", "Excel", "Tableau"],
    demandScore: 8, topRecruiters: ["Deloitte", "EY", "BCG", "McKinsey"],
    portfolioRequirement: "ESG audit reports", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹3-12 Lakh (MBA/M.Sc Env)", avgTimeToJob: "4-5 years",
    sector: ["Private", "Public"], trend: "Rising",
    certifications: ["GRI Certified", "CFA ESG"], remoteEligibility: "High",
  },
  {
    name: "Renewable Energy Engineer", domain: "Sustainability & Green Tech", subdomain: "Clean Energy", stream: "All",
    fieldsOfStudy: ["Engineering", "Science", "Environmental Science"],
    skills: ["Solar PV Design", "Energy Modeling", "AutoCAD", "Project Management", "Grid Integration"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["PVsyst", "AutoCAD", "HOMER"],
    demandScore: 9, topRecruiters: ["Adani Green", "Tata Power", "ReNew Power", "Suzlon"],
    portfolioRequirement: "Solar plant design", typicalExperience: "1 internship; 1 project",
    avgCost: "₹2-10 Lakh (B.Tech)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Public"], trend: "Rising",
    remoteEligibility: "Low",
  },
  {
    name: "Environmental Data Analyst", domain: "Sustainability & Green Tech", subdomain: "Environmental Analytics", stream: "All",
    fieldsOfStudy: ["Environmental Science", "Statistics", "Computer Science"],
    skills: ["Python", "GIS", "Remote Sensing", "Data Analysis", "Climate Modeling"],
    skillWeights: [7, 8, 7, 7, 6], tools: ["QGIS", "Python", "R", "Google Earth Engine"],
    demandScore: 7, topRecruiters: ["TERI", "WRI India", "UNDP", "World Bank"],
    portfolioRequirement: "Environmental impact studies", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (M.Sc/B.Tech)", avgTimeToJob: "4-5 years",
    sector: ["Public", "Private"], trend: "Rising",
    remoteEligibility: "High",
  },
  // Robotics & IoT
  {
    name: "Robotics Engineer", domain: "Robotics & IoT", subdomain: "Robotics", stream: "All",
    fieldsOfStudy: ["Engineering", "Computer Science", "Science"],
    skills: ["ROS", "Python", "C++", "Control Systems", "Computer Vision"],
    skillWeights: [8, 7, 7, 7, 6], tools: ["ROS", "Gazebo", "MATLAB", "Arduino"],
    demandScore: 8, topRecruiters: ["Bosch", "ABB", "ISRO", "DRDO", "GreyOrange"],
    portfolioRequirement: "Robot demos & videos", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹3-12 Lakh (B.Tech/M.Tech)", avgTimeToJob: "4-6 years",
    sector: ["Private", "Public", "Startup"], trend: "Rising",
    remoteEligibility: "Low",
  },
  {
    name: "IoT Developer", domain: "Robotics & IoT", subdomain: "IoT", stream: "All",
    fieldsOfStudy: ["Engineering", "Computer Science"],
    skills: ["Embedded C", "Python", "MQTT", "Arduino", "Sensor Integration"],
    skillWeights: [8, 7, 6, 7, 6], tools: ["Arduino", "Raspberry Pi", "AWS IoT"],
    demandScore: 7, topRecruiters: ["Bosch", "Samsung", "Wipro", "TCS"],
    portfolioRequirement: "IoT prototypes", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-8 Lakh (B.Tech)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["AWS IoT Specialist"], remoteEligibility: "Medium",
  },
  {
    name: "Embedded Systems Engineer", domain: "Robotics & IoT", subdomain: "Embedded Systems", stream: "All",
    fieldsOfStudy: ["Engineering", "Computer Science"],
    skills: ["Embedded C", "RTOS", "Microcontrollers", "PCB Design", "Linux"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["Keil", "STM32", "Altium Designer"],
    demandScore: 7, topRecruiters: ["Intel", "Qualcomm", "Samsung", "Texas Instruments"],
    portfolioRequirement: "Embedded system projects", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (B.Tech ECE)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private"], trend: "Stable",
    remoteEligibility: "Low",
  },
  // Social Sciences
  {
    name: "Clinical Psychologist", domain: "Social Sciences", subdomain: "Psychology", stream: "All",
    fieldsOfStudy: ["Psychology", "Arts", "Healthcare"],
    skills: ["Clinical Assessment", "Therapy Techniques", "Research", "Communication", "Ethics"],
    skillWeights: [8, 8, 7, 7, 6], tools: ["SPSS", "Assessment Tools"],
    demandScore: 7, topRecruiters: ["NIMHANS", "Fortis", "Practo", "BetterHelp"],
    portfolioRequirement: "Clinical case studies", typicalExperience: "Clinical internship; 3 case studies",
    avgCost: "₹3-12 Lakh (BA + MA + MPhil)", avgTimeToJob: "7-8 years",
    sector: ["Private", "Public", "Freelance"], trend: "Rising",
    remoteEligibility: "Medium",
  },
  {
    name: "Public Policy Analyst", domain: "Social Sciences", subdomain: "Policy", stream: "All",
    fieldsOfStudy: ["Arts", "Law", "Statistics", "Business"],
    skills: ["Policy Research", "Data Analysis", "Writing", "Economics", "Communication"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["STATA", "Excel", "NVivo"],
    demandScore: 6, topRecruiters: ["NITI Aayog", "World Bank", "UNDP", "CPR"],
    portfolioRequirement: "Policy briefs & reports", typicalExperience: "1 internship; 2 research papers",
    avgCost: "₹3-15 Lakh (MA/MPP)", avgTimeToJob: "5-6 years",
    sector: ["Public", "Private"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "Sociologist / Social Researcher", domain: "Social Sciences", subdomain: "Social Research", stream: "All",
    fieldsOfStudy: ["Arts", "Psychology", "Statistics"],
    skills: ["Research Methodology", "Data Analysis", "Survey Design", "Writing", "SPSS"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["SPSS", "NVivo", "SurveyMonkey"],
    demandScore: 5, topRecruiters: ["TISS", "JNU", "UNDP", "Oxfam"],
    portfolioRequirement: "Published research", typicalExperience: "0 internships; 2 field studies",
    avgCost: "₹2-8 Lakh (MA/PhD)", avgTimeToJob: "5-8 years",
    sector: ["Public", "Private"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  // Architecture & Urban Planning
  {
    name: "Architect", domain: "Architecture & Urban Planning", subdomain: "Architecture", stream: "All",
    fieldsOfStudy: ["Architecture", "Design", "Engineering"],
    skills: ["AutoCAD", "Revit", "SketchUp", "Building Design", "Sustainability"],
    skillWeights: [8, 8, 7, 7, 6], tools: ["AutoCAD", "Revit", "SketchUp", "Lumion"],
    demandScore: 7, topRecruiters: ["Hafeez Contractor", "RSP Architects", "CP Kukreja", "HOK"],
    portfolioRequirement: "Design portfolio with plans", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹5-15 Lakh (B.Arch)", avgTimeToJob: "5 years + 1 year internship",
    sector: ["Private", "Public", "Freelance"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "Urban Planner", domain: "Architecture & Urban Planning", subdomain: "Urban Planning", stream: "All",
    fieldsOfStudy: ["Architecture", "Environmental Science", "Engineering"],
    skills: ["GIS", "Urban Design", "Policy Research", "AutoCAD", "Data Analysis"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["ArcGIS", "AutoCAD", "QGIS"],
    demandScore: 6, topRecruiters: ["NIUA", "Smart City Mission", "CEPT", "Arup"],
    portfolioRequirement: "Urban design proposals", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹3-12 Lakh (B.Plan/M.Plan)", avgTimeToJob: "4-6 years",
    sector: ["Public", "Private"], trend: "Rising",
    remoteEligibility: "Medium",
  },
  // Agriculture & AgriTech
  {
    name: "Agricultural Scientist", domain: "Agriculture & AgriTech", subdomain: "Agricultural Research", stream: "All",
    fieldsOfStudy: ["Agriculture", "Science", "Biotechnology"],
    skills: ["Crop Science", "Soil Analysis", "Research Methodology", "Statistics", "Biotechnology"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["SPSS", "Lab Equipment", "GIS"],
    demandScore: 6, topRecruiters: ["ICAR", "IARI", "Syngenta", "Bayer CropScience"],
    portfolioRequirement: "Research papers", typicalExperience: "1 internship; 2 field studies",
    avgCost: "₹2-8 Lakh (B.Sc Agri/M.Sc)", avgTimeToJob: "4-6 years",
    sector: ["Public", "Private"], trend: "Stable",
    remoteEligibility: "Low",
  },
  {
    name: "AgriTech Product Manager", domain: "Agriculture & AgriTech", subdomain: "AgriTech", stream: "All",
    fieldsOfStudy: ["Agriculture", "Business", "Computer Science"],
    skills: ["Product Management", "Agronomy", "Data Analysis", "User Research", "Agile"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["JIRA", "Mixpanel", "Excel"],
    demandScore: 7, topRecruiters: ["DeHaat", "Ninjacart", "CropIn", "Agrostar"],
    portfolioRequirement: "Product case studies", typicalExperience: "1 internship; 1 project",
    avgCost: "₹3-12 Lakh (B.Sc Agri + MBA)", avgTimeToJob: "5-6 years",
    sector: ["Startup", "Private"], trend: "Rising",
    remoteEligibility: "Medium",
  },
  // Biotechnology & Pharma
  {
    name: "Biotech Research Scientist", domain: "Biotechnology & Pharma", subdomain: "Biotech Research", stream: "All",
    fieldsOfStudy: ["Biotechnology", "Science", "Pharmacy"],
    skills: ["Molecular Biology", "Genomics", "Bioinformatics", "Lab Techniques", "Research"],
    skillWeights: [8, 7, 7, 7, 6], tools: ["BLAST", "R", "Lab Equipment"],
    demandScore: 7, topRecruiters: ["Biocon", "Serum Institute", "Dr. Reddy's", "Bharat Biotech"],
    portfolioRequirement: "Research papers & lab reports", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹3-12 Lakh (B.Tech Biotech/M.Sc)", avgTimeToJob: "4-6 years",
    sector: ["Private", "Public"], trend: "Rising",
    remoteEligibility: "Low",
  },
  {
    name: "Regulatory Affairs Specialist", domain: "Biotechnology & Pharma", subdomain: "Pharma Regulation", stream: "All",
    fieldsOfStudy: ["Pharmacy", "Biotechnology", "Healthcare"],
    skills: ["Drug Regulations", "Quality Assurance", "Documentation", "GMP", "Communication"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["eCTD Software", "Document Management"],
    demandScore: 6, topRecruiters: ["Cipla", "Sun Pharma", "Lupin", "CDSCO"],
    portfolioRequirement: "Regulatory submission samples", typicalExperience: "1 internship; 1 submission",
    avgCost: "₹2-8 Lakh (B.Pharm/M.Pharm)", avgTimeToJob: "4-5 years",
    sector: ["Private", "Public"], trend: "Stable",
    remoteEligibility: "Medium",
  },
  {
    name: "Clinical Research Associate", domain: "Biotechnology & Pharma", subdomain: "Clinical Research", stream: "All",
    fieldsOfStudy: ["Pharmacy", "Healthcare", "Biotechnology", "Science"],
    skills: ["Clinical Trials", "GCP", "Data Management", "Medical Writing", "Regulatory Knowledge"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["CTMS", "EDC Systems", "Excel"],
    demandScore: 7, topRecruiters: ["Covance", "IQVIA", "Parexel", "Cipla"],
    portfolioRequirement: "Clinical trial reports", typicalExperience: "1 internship; 1 trial monitored",
    avgCost: "₹2-8 Lakh (B.Pharm + PG Diploma)", avgTimeToJob: "4-5 years",
    sector: ["Private"], trend: "Rising",
    certifications: ["ACRP Certified"], remoteEligibility: "Medium",
  },
  // Additional Technology
  {
    name: "Site Reliability Engineer", domain: "Technology", subdomain: "Cloud/DevOps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Linux", "Python", "Kubernetes", "Monitoring", "Incident Management"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["Prometheus", "Grafana", "Terraform", "PagerDuty"],
    demandScore: 9, topRecruiters: ["Google", "Amazon", "LinkedIn", "Uber"],
    portfolioRequirement: "SRE runbooks & dashboards", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (B.Tech)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["Google SRE", "AWS DevOps"], remoteEligibility: "High",
  },
  {
    name: "Data Engineer", domain: "Data/AI", subdomain: "Data Engineering", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering", "Mathematics"],
    skills: ["Python", "SQL", "Spark", "Airflow", "Data Modeling"],
    skillWeights: [8, 8, 7, 6, 7], tools: ["Apache Spark", "Airflow", "AWS Redshift"],
    demandScore: 9, topRecruiters: ["Amazon", "Google", "Flipkart", "Uber"],
    portfolioRequirement: "Data pipeline projects", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (B.Tech)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["Databricks Certified", "GCP Data Engineer"], remoteEligibility: "High",
  },
  {
    name: "NLP Engineer", domain: "Data/AI", subdomain: "NLP", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics", "Statistics"],
    skills: ["Python", "NLP", "Transformers", "Deep Learning", "Linguistics"],
    skillWeights: [8, 8, 7, 7, 5], tools: ["Hugging Face", "PyTorch", "spaCy"],
    demandScore: 9, topRecruiters: ["Google", "OpenAI", "Microsoft", "Amazon"],
    portfolioRequirement: "NLP model demos", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹3-15 Lakh (M.Tech/PhD)", avgTimeToJob: "5-7 years",
    sector: ["Private", "Startup"], trend: "Rising",
    remoteEligibility: "High",
  },
  {
    name: "Technical Writer", domain: "Technology", subdomain: "Documentation", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering", "Media", "Arts"],
    skills: ["Technical Writing", "API Documentation", "Markdown", "Information Architecture", "Editing"],
    skillWeights: [8, 7, 6, 6, 6], tools: ["Confluence", "GitBook", "Swagger"],
    demandScore: 6, topRecruiters: ["Google", "Microsoft", "Atlassian", "Razorpay"],
    portfolioRequirement: "Documentation samples", typicalExperience: "0 internships; 3 docs",
    avgCost: "₹1-4 Lakh (Any degree + Online)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable",
    remoteEligibility: "High",
  },
];

// ============================================================================
// NEW ROLES from Career Master Database (not in original data)
// ============================================================================
const masterDBRoles: CareerRole[] = [
  {
    name: "React Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["React", "JavaScript", "TypeScript", "CSS", "Redux"],
    skillWeights: [9, 8, 7, 7, 6], tools: ["VS Code", "Chrome DevTools", "Git"],
    demandScore: 9, topRecruiters: ["Google", "Meta", "Flipkart", "Razorpay"],
    portfolioRequirement: "React web apps", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹2-8 Lakh (B.Tech/Bootcamp)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "UI Engineer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Design"],
    skills: ["React", "CSS", "JavaScript", "Design Systems", "Accessibility"],
    skillWeights: [8, 8, 7, 7, 6], tools: ["VS Code", "Figma", "Storybook"],
    demandScore: 8, topRecruiters: ["Google", "Apple", "Microsoft"],
    portfolioRequirement: "UI component libraries", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (B.Tech/BDes)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "API Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["REST APIs", "GraphQL", "Node.js", "Python", "SQL"],
    skillWeights: [8, 7, 7, 7, 7], tools: ["Postman", "Swagger", "VS Code"],
    demandScore: 8, topRecruiters: ["Flipkart", "Amazon", "Razorpay"],
    portfolioRequirement: "API documentation & demos", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-6 Lakh (B.Tech)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Database Engineer", domain: "Technology", subdomain: "Data Infrastructure", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["SQL", "PostgreSQL", "MongoDB", "Database Design", "Performance Tuning"],
    skillWeights: [9, 8, 7, 7, 6], tools: ["pgAdmin", "MongoDB Compass", "DataGrip"],
    demandScore: 7, topRecruiters: ["Oracle", "Microsoft", "Amazon"],
    portfolioRequirement: "Database design projects", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (B.Tech)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "Fullstack Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["React", "Node.js", "SQL", "TypeScript", "Docker"],
    skillWeights: [8, 8, 7, 7, 6], tools: ["VS Code", "Git", "Docker"],
    demandScore: 9, topRecruiters: ["Google", "Amazon", "Flipkart"],
    portfolioRequirement: "Full-stack web apps", typicalExperience: "2 internships; 3 projects",
    avgCost: "₹2-8 Lakh (B.Tech/Bootcamp)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Software Engineer", domain: "Technology", subdomain: "Software Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Java", "Python", "Data Structures", "System Design", "SQL"],
    skillWeights: [8, 8, 9, 7, 7], tools: ["IntelliJ", "Git", "JIRA"],
    demandScore: 10, topRecruiters: ["Google", "Microsoft", "Amazon", "Meta"],
    portfolioRequirement: "GitHub projects", typicalExperience: "2 internships; 4 projects",
    avgCost: "₹2-10 Lakh (B.Tech)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "AWS Engineer", domain: "Technology", subdomain: "Cloud/DevOps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["AWS", "CloudFormation", "Lambda", "S3", "VPC"],
    skillWeights: [9, 7, 7, 6, 6], tools: ["AWS Console", "Terraform", "CloudWatch"],
    demandScore: 9, topRecruiters: ["Amazon", "Accenture", "Wipro"],
    portfolioRequirement: "AWS deployed projects", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (B.Tech + Cert)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Startup"], trend: "Rising",
    certifications: ["AWS Solutions Architect", "AWS Developer"], remoteEligibility: "High",
  },
  {
    name: "Cloud Architect", domain: "Technology", subdomain: "Cloud/DevOps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["AWS", "Azure", "GCP", "System Design", "Networking"],
    skillWeights: [8, 7, 7, 8, 6], tools: ["AWS", "Azure", "Terraform"],
    demandScore: 9, topRecruiters: ["Google", "Microsoft", "Amazon"],
    portfolioRequirement: "Cloud architecture diagrams", typicalExperience: "3+ years experience",
    avgCost: "₹5-15 Lakh (B.Tech + Cert)", avgTimeToJob: "5-7 years",
    sector: ["Private"], trend: "Rising",
    certifications: ["AWS SA Professional", "GCP Professional"], remoteEligibility: "High",
  },
  {
    name: "ML Engineer", domain: "Data/AI", subdomain: "Machine Learning", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics", "Statistics"],
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Statistics"],
    skillWeights: [8, 8, 7, 7, 7], tools: ["Jupyter", "MLflow", "Kubeflow"],
    demandScore: 10, topRecruiters: ["Google", "OpenAI", "NVIDIA", "Microsoft"],
    portfolioRequirement: "ML model deployments", typicalExperience: "1 internship; 4 projects",
    avgCost: "₹3-15 Lakh (M.Tech)", avgTimeToJob: "5-6 years",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "AI Engineer", domain: "Data/AI", subdomain: "AI Engineering", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics"],
    skills: ["Python", "Deep Learning", "NLP", "Computer Vision", "MLOps"],
    skillWeights: [8, 8, 7, 7, 6], tools: ["TensorFlow", "PyTorch", "HuggingFace"],
    demandScore: 10, topRecruiters: ["OpenAI", "Google", "Microsoft", "NVIDIA"],
    portfolioRequirement: "AI application demos", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹3-15 Lakh (M.Tech/PhD)", avgTimeToJob: "5-7 years",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Chatbot Developer", domain: "Data/AI", subdomain: "NLP", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics"],
    skills: ["Python", "NLP", "Dialogflow", "Rasa", "LLMs"],
    skillWeights: [8, 8, 7, 6, 7], tools: ["Dialogflow", "Rasa", "Langchain"],
    demandScore: 8, topRecruiters: ["Google", "Microsoft", "Yellow.ai"],
    portfolioRequirement: "Chatbot demos", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-8 Lakh (B.Tech)", avgTimeToJob: "4 years + 3 months",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Computer Vision Engineer", domain: "Data/AI", subdomain: "Computer Vision", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics"],
    skills: ["Python", "OpenCV", "Deep Learning", "Image Processing", "TensorFlow"],
    skillWeights: [8, 8, 7, 7, 6], tools: ["OpenCV", "TensorFlow", "PyTorch"],
    demandScore: 8, topRecruiters: ["Google", "Tesla", "Apple"],
    portfolioRequirement: "CV model demos", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹3-15 Lakh (M.Tech)", avgTimeToJob: "5-6 years",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Image Processing Engineer", domain: "Data/AI", subdomain: "Computer Vision", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Python", "MATLAB", "OpenCV", "Signal Processing", "Deep Learning"],
    skillWeights: [8, 7, 7, 7, 6], tools: ["MATLAB", "OpenCV", "Python"],
    demandScore: 7, topRecruiters: ["Qualcomm", "Samsung", "Intel"],
    portfolioRequirement: "Image processing projects", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹3-10 Lakh (B.Tech/M.Tech)", avgTimeToJob: "4-5 years",
    sector: ["Private"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "Game Developer", domain: "Game Development", subdomain: "Game Programming", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["C++", "C#", "Unity", "Game Physics", "3D Math"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["Unity", "Unreal Engine"],
    demandScore: 7, topRecruiters: ["Ubisoft", "EA", "Supercell"],
    portfolioRequirement: "Published games", typicalExperience: "0 internships; 2 game jams",
    avgCost: "₹2-10 Lakh (B.Tech/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Unity Developer", domain: "Game Development", subdomain: "Game Programming", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["C#", "Unity", "3D Math", "Physics", "Shaders"],
    skillWeights: [8, 8, 6, 6, 5], tools: ["Unity", "Visual Studio", "Blender"],
    demandScore: 7, topRecruiters: ["Ubisoft", "Zynga", "nCore Games"],
    portfolioRequirement: "Unity games/demos", typicalExperience: "0 internships; 3 projects",
    avgCost: "₹2-8 Lakh (B.Tech/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Unreal Developer", domain: "Game Development", subdomain: "Game Programming", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["C++", "Unreal Engine", "Blueprints", "3D Math", "Rendering"],
    skillWeights: [8, 8, 7, 6, 6], tools: ["Unreal Engine", "Visual Studio"],
    demandScore: 7, topRecruiters: ["Epic Games", "Ubisoft", "Rockstar"],
    portfolioRequirement: "Unreal projects", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-10 Lakh (B.Tech)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Physics Programmer", domain: "Game Development", subdomain: "Game Programming", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering", "Science"],
    skills: ["C++", "Physics Simulation", "Mathematics", "Optimization"],
    skillWeights: [8, 8, 7, 6], tools: ["Havok", "PhysX", "Custom Engines"],
    demandScore: 6, topRecruiters: ["EA", "Rockstar", "Ubisoft"],
    portfolioRequirement: "Physics simulation demos", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹3-10 Lakh (B.Tech)", avgTimeToJob: "4-5 years",
    sector: ["Private"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "XR Engineer", domain: "Game Development", subdomain: "AR/VR", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Unity", "OpenXR", "3D Math", "Spatial Computing", "C#"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["Unity", "Unreal", "Meta SDK"],
    demandScore: 7, topRecruiters: ["Meta", "Apple", "Google", "Microsoft"],
    portfolioRequirement: "XR prototypes", typicalExperience: "0 internships; 2 demos",
    avgCost: "₹3-10 Lakh (B.Tech)", avgTimeToJob: "4 years + 6 months",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Layout Artist", domain: "Design", subdomain: "Visual Design", stream: "All",
    fieldsOfStudy: ["Design", "Arts"],
    skills: ["InDesign", "Typography", "Layout Design", "Photoshop"],
    skillWeights: [8, 7, 7, 6], tools: ["InDesign", "Illustrator"],
    demandScore: 5, topRecruiters: ["Penguin", "HarperCollins", "Times Group"],
    portfolioRequirement: "Layout samples", typicalExperience: "0 internships; 3 projects",
    avgCost: "₹1-5 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "Packaging Designer", domain: "Design", subdomain: "Visual Design", stream: "All",
    fieldsOfStudy: ["Design", "Arts"],
    skills: ["Illustrator", "3D Mockups", "Branding", "Print Production"],
    skillWeights: [8, 7, 7, 6], tools: ["Illustrator", "Photoshop", "Cinema 4D"],
    demandScore: 5, topRecruiters: ["P&G", "Nestlé", "ITC"],
    portfolioRequirement: "Packaging mockups", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-6 Lakh (BDes)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable", remoteEligibility: "Medium",
  },
  {
    name: "UX Researcher", domain: "Design", subdomain: "UI/UX Design", stream: "All",
    fieldsOfStudy: ["Design", "Psychology", "Arts"],
    skills: ["User Research", "Usability Testing", "Data Analysis", "Survey Design", "Interviewing"],
    skillWeights: [9, 8, 7, 6, 7], tools: ["Maze", "Hotjar", "UserTesting", "Miro"],
    demandScore: 7, topRecruiters: ["Google", "Microsoft", "Flipkart"],
    portfolioRequirement: "Research case studies", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-10 Lakh (BDes/MA Psychology)", avgTimeToJob: "4-5 years",
    sector: ["Private", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Texturing Artist", domain: "Design", subdomain: "3D Art", stream: "All",
    fieldsOfStudy: ["Design", "Arts"],
    skills: ["Substance Painter", "Photoshop", "UV Mapping", "PBR Materials"],
    skillWeights: [8, 7, 7, 6], tools: ["Substance Painter", "Mari", "Photoshop"],
    demandScore: 5, topRecruiters: ["DNEG", "Framestore", "MPC"],
    portfolioRequirement: "Texture portfolio", typicalExperience: "0 internships; 3 projects",
    avgCost: "₹2-8 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "Lighting Artist", domain: "Design", subdomain: "3D Art", stream: "All",
    fieldsOfStudy: ["Design", "Arts"],
    skills: ["3D Lighting", "Arnold", "V-Ray", "Compositing"],
    skillWeights: [8, 7, 6, 6], tools: ["Maya", "Arnold", "Nuke"],
    demandScore: 5, topRecruiters: ["DNEG", "Framestore", "Prime Focus"],
    portfolioRequirement: "Lighting reel", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-8 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "Rigging Artist", domain: "Animation & VFX", subdomain: "Rigging", stream: "All",
    fieldsOfStudy: ["Design", "Arts", "Engineering"],
    skills: ["Maya Rigging", "Python Scripting", "Anatomy", "MEL"],
    skillWeights: [8, 7, 6, 5], tools: ["Maya", "Blender", "Python"],
    demandScore: 5, topRecruiters: ["DNEG", "Framestore", "MPC"],
    portfolioRequirement: "Rig demos", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹2-8 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "Motion Graphics Artist", domain: "Design", subdomain: "Visual Design", stream: "All",
    fieldsOfStudy: ["Design", "Arts", "Media"],
    skills: ["After Effects", "Cinema 4D", "Animation", "Typography"],
    skillWeights: [8, 7, 7, 6], tools: ["After Effects", "Cinema 4D", "Premiere Pro"],
    demandScore: 7, topRecruiters: ["Ogilvy", "Dentsu", "WPP"],
    portfolioRequirement: "Motion reel", typicalExperience: "0 internships; 3 projects",
    avgCost: "₹2-6 Lakh (BFA/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private", "Freelance"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Color Grader", domain: "Media & Communications", subdomain: "Post Production", stream: "All",
    fieldsOfStudy: ["Media", "Arts", "Design"],
    skills: ["DaVinci Resolve", "Color Theory", "Cinematography", "LUT Creation"],
    skillWeights: [8, 7, 6, 5], tools: ["DaVinci Resolve", "Baselight"],
    demandScore: 5, topRecruiters: ["Netflix", "Amazon Studios", "Yash Raj Films"],
    portfolioRequirement: "Before/after color grades", typicalExperience: "0 internships; 2 projects",
    avgCost: "₹1-5 Lakh (Diploma)", avgTimeToJob: "2-3 years",
    sector: ["Private", "Freelance"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "Post Production Artist", domain: "Media & Communications", subdomain: "Post Production", stream: "All",
    fieldsOfStudy: ["Media", "Arts", "Design"],
    skills: ["Premiere Pro", "After Effects", "Audio Mixing", "Editing"],
    skillWeights: [7, 7, 6, 6], tools: ["Premiere Pro", "After Effects", "Audition"],
    demandScore: 6, topRecruiters: ["Netflix", "TVF", "Excel Entertainment"],
    portfolioRequirement: "Post production reel", typicalExperience: "0 internships; 3 projects",
    avgCost: "₹1-5 Lakh (Diploma/BA)", avgTimeToJob: "2-3 years",
    sector: ["Private", "Freelance"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "YouTuber", domain: "Media & Communications", subdomain: "Content Creation", stream: "All",
    fieldsOfStudy: ["Media", "Arts"],
    skills: ["Video Production", "Editing", "SEO", "Storytelling", "Audience Building"],
    skillWeights: [7, 7, 6, 7, 6], tools: ["Premiere Pro", "YouTube Studio", "Canva"],
    demandScore: 6, topRecruiters: ["Self-employed", "MCNs"],
    portfolioRequirement: "YouTube channel", typicalExperience: "Self-taught; 10+ videos",
    avgCost: "₹0.5-2 Lakh (Self-taught)", avgTimeToJob: "6-18 months",
    sector: ["Freelance", "Startup"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Influencer", domain: "Media & Communications", subdomain: "Content Creation", stream: "All",
    fieldsOfStudy: ["Media", "Arts"],
    skills: ["Content Strategy", "Social Media", "Photography", "Copywriting", "Community Building"],
    skillWeights: [7, 7, 6, 6, 6], tools: ["Instagram", "TikTok", "Canva"],
    demandScore: 6, topRecruiters: ["Self-employed", "Agencies"],
    portfolioRequirement: "Social media profiles", typicalExperience: "Self-taught; Active profiles",
    avgCost: "₹0.5-1 Lakh (Self-taught)", avgTimeToJob: "3-12 months",
    sector: ["Freelance"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Chartered Accountant", domain: "Business", subdomain: "Finance", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Accounting", "Auditing", "Taxation", "Financial Reporting", "Company Law"],
    skillWeights: [9, 8, 8, 7, 7], tools: ["Tally", "SAP", "Excel"],
    demandScore: 9, topRecruiters: ["Deloitte", "EY", "KPMG", "PwC"],
    portfolioRequirement: "Articleship experience", typicalExperience: "3 years articleship",
    avgCost: "₹1-3 Lakh (CA Course)", avgTimeToJob: "4-5 years",
    sector: ["Private", "Public", "Freelance"], trend: "Stable",
    certifications: ["CA (ICAI)"], remoteEligibility: "High",
  },
  {
    name: "Tax Consultant", domain: "Business", subdomain: "Finance", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Taxation", "GST", "Income Tax", "Compliance", "Excel"],
    skillWeights: [9, 8, 7, 7, 6], tools: ["Tally", "ClearTax", "Excel"],
    demandScore: 7, topRecruiters: ["EY", "KPMG", "BDO"],
    portfolioRequirement: "Tax filing experience", typicalExperience: "2 years practice",
    avgCost: "₹1-3 Lakh (CA/CS)", avgTimeToJob: "3-5 years",
    sector: ["Private", "Freelance"], trend: "Stable", remoteEligibility: "High",
  },
  {
    name: "Investment Banker", domain: "Business", subdomain: "Investment Banking", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Mathematics", "Business"],
    skills: ["Financial Modeling", "Valuation", "M&A", "Excel", "Pitch Decks"],
    skillWeights: [9, 8, 8, 7, 6], tools: ["Bloomberg", "Excel", "FactSet"],
    demandScore: 8, topRecruiters: ["Goldman Sachs", "JPMorgan", "Morgan Stanley"],
    portfolioRequirement: "Financial models", typicalExperience: "2 internships; 3 models",
    avgCost: "₹5-25 Lakh (MBA/CFA)", avgTimeToJob: "5-7 years",
    sector: ["Private"], trend: "Stable",
    certifications: ["CFA"], remoteEligibility: "Low",
  },
  {
    name: "Equity Analyst", domain: "Business", subdomain: "Research", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Mathematics", "Statistics"],
    skills: ["Equity Research", "Financial Analysis", "Valuation", "Excel"],
    skillWeights: [8, 8, 7, 7], tools: ["Bloomberg", "Excel", "Reuters"],
    demandScore: 7, topRecruiters: ["Goldman Sachs", "HDFC Securities", "ICICI Securities"],
    portfolioRequirement: "Equity research reports", typicalExperience: "1 internship; 3 reports",
    avgCost: "₹3-15 Lakh (MBA/CFA)", avgTimeToJob: "5-6 years",
    sector: ["Private"], trend: "Stable", remoteEligibility: "Medium",
  },
  {
    name: "Portfolio Manager", domain: "Business", subdomain: "Asset Management", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Mathematics"],
    skills: ["Portfolio Theory", "Risk Management", "Financial Analysis", "Asset Allocation"],
    skillWeights: [8, 8, 7, 7], tools: ["Bloomberg", "Excel", "Python"],
    demandScore: 7, topRecruiters: ["HDFC AMC", "SBI MF", "Nippon AMC"],
    portfolioRequirement: "Investment thesis", typicalExperience: "3+ years experience",
    avgCost: "₹5-20 Lakh (MBA/CFA)", avgTimeToJob: "6-8 years",
    sector: ["Private"], trend: "Stable",
    certifications: ["CFA", "CAIA"], remoteEligibility: "Medium",
  },
  {
    name: "Front Office Manager", domain: "Hospitality", subdomain: "Hotel Management", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business", "Hospitality"],
    skills: ["Guest Relations", "PMS Software", "Revenue Management", "Communication"],
    skillWeights: [7, 6, 6, 7], tools: ["Opera PMS", "Fidelio"],
    demandScore: 6, topRecruiters: ["Taj Hotels", "Marriott", "Hilton"],
    portfolioRequirement: "Operations reports", typicalExperience: "1 internship; Hotel training",
    avgCost: "₹3-10 Lakh (BHM)", avgTimeToJob: "3-4 years",
    sector: ["Private"], trend: "Stable", remoteEligibility: "Low",
  },
  {
    name: "Chef", domain: "Hospitality", subdomain: "Culinary", stream: "All",
    fieldsOfStudy: ["Hospitality", "Commerce"],
    skills: ["Culinary Arts", "Kitchen Management", "Food Safety", "Menu Planning"],
    skillWeights: [8, 7, 7, 6], tools: ["Kitchen Equipment"],
    demandScore: 6, topRecruiters: ["Taj Hotels", "ITC Hotels", "Marriott"],
    portfolioRequirement: "Recipe portfolio", typicalExperience: "Culinary school + internship",
    avgCost: "₹3-10 Lakh (BHM/Diploma)", avgTimeToJob: "3-4 years",
    sector: ["Private"], trend: "Stable", remoteEligibility: "Low",
  },
  {
    name: "Pastry Chef", domain: "Hospitality", subdomain: "Culinary", stream: "All",
    fieldsOfStudy: ["Hospitality"],
    skills: ["Pastry Making", "Baking", "Food Presentation", "Creativity"],
    skillWeights: [8, 7, 6, 6], tools: ["Baking Equipment"],
    demandScore: 5, topRecruiters: ["Le Cordon Bleu", "Taj Hotels", "Bakeries"],
    portfolioRequirement: "Pastry portfolio photos", typicalExperience: "Culinary school",
    avgCost: "₹3-12 Lakh (Diploma)", avgTimeToJob: "2-4 years",
    sector: ["Private", "Freelance"], trend: "Stable", remoteEligibility: "Low",
  },
  {
    name: "Air Hostess", domain: "Transport", subdomain: "Airlines", stream: "All",
    fieldsOfStudy: ["Commerce", "Hospitality", "Arts"],
    skills: ["Communication", "Safety Protocols", "Customer Service", "First Aid"],
    skillWeights: [8, 7, 7, 6], tools: ["Safety Equipment"],
    demandScore: 7, topRecruiters: ["IndiGo", "Air India", "Vistara"],
    portfolioRequirement: "Safety drill certification", typicalExperience: "Airline training",
    avgCost: "₹1-3 Lakh (Training)", avgTimeToJob: "6-12 months",
    sector: ["Private", "Public"], trend: "Rising", remoteEligibility: "Low",
  },
  {
    name: "Cabin Crew", domain: "Transport", subdomain: "Airlines", stream: "All",
    fieldsOfStudy: ["Commerce", "Hospitality", "Arts"],
    skills: ["Communication", "Safety Protocols", "Customer Service", "Teamwork"],
    skillWeights: [8, 7, 7, 6], tools: ["Safety Equipment"],
    demandScore: 7, topRecruiters: ["Emirates", "IndiGo", "Air India"],
    portfolioRequirement: "Airline training certification", typicalExperience: "Airline training",
    avgCost: "₹1-3 Lakh (Training)", avgTimeToJob: "6-12 months",
    sector: ["Private", "Public"], trend: "Rising", remoteEligibility: "Low",
  },
  {
    name: "Ground Staff", domain: "Transport", subdomain: "Airlines", stream: "All",
    fieldsOfStudy: ["Commerce", "Hospitality"],
    skills: ["Customer Service", "Communication", "Ticketing", "Operations"],
    skillWeights: [7, 7, 6, 6], tools: ["Amadeus", "Sabre"],
    demandScore: 6, topRecruiters: ["IndiGo", "Air India", "SpiceJet"],
    portfolioRequirement: "Training certification", typicalExperience: "Ground handling training",
    avgCost: "₹0.5-2 Lakh (Training)", avgTimeToJob: "3-6 months",
    sector: ["Private"], trend: "Stable", remoteEligibility: "Low",
  },
  {
    name: "Digital Marketer", domain: "Business", subdomain: "Marketing", stream: "All",
    fieldsOfStudy: ["Commerce", "Media", "Business"],
    skills: ["SEO", "Google Ads", "Social Media", "Analytics", "Content Marketing"],
    skillWeights: [7, 7, 6, 7, 6], tools: ["Google Ads", "Google Analytics", "SEMrush"],
    demandScore: 9, topRecruiters: ["Dentsu", "Ogilvy", "GroupM"],
    portfolioRequirement: "Campaign case studies", typicalExperience: "1 internship; 2 campaigns",
    avgCost: "₹0.5-3 Lakh (Certification)", avgTimeToJob: "3-6 months",
    sector: ["Private", "Startup", "Freelance"], trend: "Rising", remoteEligibility: "High",
  },
];

// ============================================================================
// LIFE SCIENCE & PHYSICAL SCIENCE ROLES
// ============================================================================
const lifeScienceRoles: CareerRole[] = [
  {
    name: "Zoologist", domain: "Agriculture & AgriTech", subdomain: "Wildlife Research", stream: "Science",
    fieldsOfStudy: ["Science", "Biotechnology", "Environmental Science"],
    skills: ["Zoology", "Field Research", "Animal Taxonomy", "Ecology", "Scientific Writing"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["SPSS", "GIS", "Field Equipment"],
    demandScore: 5, topRecruiters: ["Wildlife Institute of India", "WWF", "ZSI", "National Parks"],
    portfolioRequirement: "Field research reports", typicalExperience: "1 fieldwork; 2 research papers",
    avgCost: "₹2-6 Lakh (B.Sc + M.Sc)", avgTimeToJob: "5-6 years",
    sector: ["Public", "Private"], trend: "Stable", remoteEligibility: "Low",
  },
  {
    name: "Wildlife Biologist", domain: "Agriculture & AgriTech", subdomain: "Wildlife Research", stream: "Science",
    fieldsOfStudy: ["Science", "Environmental Science", "Biotechnology"],
    skills: ["Wildlife Biology", "Field Research", "GIS", "Data Analysis", "Conservation"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["ArcGIS", "Camera Traps", "R"],
    demandScore: 6, topRecruiters: ["WII", "BNHS", "WWF India", "UNDP"],
    portfolioRequirement: "Wildlife surveys", typicalExperience: "1 internship; 2 field studies",
    avgCost: "₹2-8 Lakh (M.Sc Wildlife)", avgTimeToJob: "5-6 years",
    sector: ["Public", "Private"], trend: "Rising", remoteEligibility: "Low",
  },
  {
    name: "Marine Biologist", domain: "Agriculture & AgriTech", subdomain: "Marine Biology", stream: "Science",
    fieldsOfStudy: ["Science", "Environmental Science"],
    skills: ["Marine Biology", "Field Research", "Ecology", "Data Analysis", "Diving Skills"],
    skillWeights: [8, 7, 6, 6, 5], tools: ["Lab Equipment", "GIS", "R"],
    demandScore: 5, topRecruiters: ["NIO", "CMFRI", "NIOT", "WWF"],
    portfolioRequirement: "Marine research reports", typicalExperience: "1 fieldwork; 1 dive log",
    avgCost: "₹2-8 Lakh (M.Sc Marine Biology)", avgTimeToJob: "5-7 years",
    sector: ["Public", "Private"], trend: "Stable", remoteEligibility: "Low",
  },
  {
    name: "Clinical Microbiologist", domain: "Healthcare", subdomain: "Microbiology", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare", "Biotechnology"],
    skills: ["Clinical Microbiology", "Lab Techniques", "Infection Control", "Diagnostics", "Quality Control"],
    skillWeights: [8, 8, 7, 7, 6], tools: ["Microscope", "VITEK", "Lab Equipment"],
    demandScore: 7, topRecruiters: ["AIIMS", "Apollo", "Fortis", "Metropolis"],
    portfolioRequirement: "Lab reports", typicalExperience: "1 internship; Hospital lab placement",
    avgCost: "₹2-8 Lakh (M.Sc Microbiology)", avgTimeToJob: "5-6 years",
    sector: ["Public", "Private"], trend: "Rising", remoteEligibility: "Low",
  },
  {
    name: "Virologist", domain: "Biotechnology & Pharma", subdomain: "Virology", stream: "Science",
    fieldsOfStudy: ["Science", "Biotechnology", "Healthcare"],
    skills: ["Virology", "Lab Techniques", "Molecular Biology", "PCR", "Scientific Writing"],
    skillWeights: [8, 8, 7, 7, 6], tools: ["BSL Labs", "PCR Machines", "Bioinformatics Tools"],
    demandScore: 8, topRecruiters: ["ICMR", "NIV Pune", "Bharat Biotech", "Serum Institute"],
    portfolioRequirement: "Research papers", typicalExperience: "1 internship; 2 lab projects",
    avgCost: "₹3-12 Lakh (M.Sc/PhD)", avgTimeToJob: "6-8 years",
    sector: ["Public", "Private"], trend: "Rising", remoteEligibility: "Low",
  },
  {
    name: "Immunologist", domain: "Biotechnology & Pharma", subdomain: "Immunology", stream: "Science",
    fieldsOfStudy: ["Science", "Biotechnology", "Healthcare"],
    skills: ["Immunology", "Lab Techniques", "Flow Cytometry", "Research Methods", "Scientific Writing"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["Flow Cytometer", "ELISA", "Lab Equipment"],
    demandScore: 7, topRecruiters: ["ICMR", "Biocon", "Serum Institute", "AIIMS"],
    portfolioRequirement: "Research publications", typicalExperience: "1 internship; 3 lab projects",
    avgCost: "₹3-12 Lakh (M.Sc/PhD)", avgTimeToJob: "6-8 years",
    sector: ["Public", "Private"], trend: "Rising", remoteEligibility: "Low",
  },
  {
    name: "Vaccine Researcher", domain: "Biotechnology & Pharma", subdomain: "Vaccine Development", stream: "Science",
    fieldsOfStudy: ["Science", "Biotechnology", "Healthcare"],
    skills: ["Vaccine Development", "Immunology", "Clinical Trials", "Lab Techniques", "Regulatory Knowledge"],
    skillWeights: [9, 8, 7, 7, 6], tools: ["BSL Labs", "Clinical Trial Software", "Lab Equipment"],
    demandScore: 9, topRecruiters: ["Bharat Biotech", "Serum Institute", "Biological E", "Panacea Biotec"],
    portfolioRequirement: "Clinical trial reports", typicalExperience: "2 internships; 2 research papers",
    avgCost: "₹5-15 Lakh (PhD)", avgTimeToJob: "7-9 years",
    sector: ["Private", "Public"], trend: "Rising", remoteEligibility: "Low",
  },
  {
    name: "Geneticist", domain: "Biotechnology & Pharma", subdomain: "Genetics", stream: "Science",
    fieldsOfStudy: ["Science", "Biotechnology"],
    skills: ["Genetics", "Bioinformatics", "Molecular Biology", "Statistics", "Lab Techniques"],
    skillWeights: [9, 7, 7, 6, 7], tools: ["BLAST", "R", "Lab Equipment"],
    demandScore: 7, topRecruiters: ["CCMB", "IISc", "Biocon", "Strand Life Sciences"],
    portfolioRequirement: "Research papers", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹3-12 Lakh (M.Sc/PhD)", avgTimeToJob: "6-8 years",
    sector: ["Public", "Private"], trend: "Rising", remoteEligibility: "Medium",
  },
  {
    name: "Pharmacologist", domain: "Healthcare", subdomain: "Pharmacology", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare", "Pharmacy"],
    skills: ["Pharmacology", "Drug Interactions", "Lab Techniques", "Research", "Toxicology"],
    skillWeights: [8, 7, 7, 7, 6], tools: ["Lab Equipment", "SPSS", "Drug Databases"],
    demandScore: 7, topRecruiters: ["Cipla", "Sun Pharma", "Dr. Reddy's", "Lupin"],
    portfolioRequirement: "Research reports", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹3-10 Lakh (M.Pharm)", avgTimeToJob: "5-6 years",
    sector: ["Private", "Public"], trend: "Stable", remoteEligibility: "Low",
  },
  {
    name: "Botanist", domain: "Agriculture & AgriTech", subdomain: "Plant Research", stream: "Science",
    fieldsOfStudy: ["Science", "Agriculture"],
    skills: ["Botany", "Plant Taxonomy", "Field Research", "Lab Techniques", "Scientific Writing"],
    skillWeights: [8, 7, 7, 6, 6], tools: ["Herbarium Tools", "Microscope", "GIS"],
    demandScore: 5, topRecruiters: ["BSI", "NBPGR", "IARI", "CSIR"],
    portfolioRequirement: "Plant surveys", typicalExperience: "1 fieldwork; 2 projects",
    avgCost: "₹2-6 Lakh (M.Sc Botany)", avgTimeToJob: "5-7 years",
    sector: ["Public", "Private"], trend: "Stable", remoteEligibility: "Low",
  },
  {
    name: "Neuroscientist", domain: "Healthcare", subdomain: "Neuroscience", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare", "Psychology"],
    skills: ["Neuroscience", "Brain Imaging", "Statistics", "Lab Techniques", "Research Methods"],
    skillWeights: [9, 7, 7, 7, 6], tools: ["fMRI", "EEG", "MATLAB", "SPSS"],
    demandScore: 7, topRecruiters: ["NIMHANS", "IISc", "NBRC", "AIIMS"],
    portfolioRequirement: "Research publications", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹5-15 Lakh (PhD)", avgTimeToJob: "7-9 years",
    sector: ["Public", "Private"], trend: "Rising", remoteEligibility: "Medium",
  },
  {
    name: "Nanotech Engineer", domain: "Engineering", subdomain: "Nanotechnology", stream: "Science",
    fieldsOfStudy: ["Science", "Engineering"],
    skills: ["Nanotechnology", "Materials Science", "Characterization Techniques", "Research", "Lab Techniques"],
    skillWeights: [8, 7, 7, 7, 6], tools: ["SEM", "TEM", "XRD", "AFM"],
    demandScore: 6, topRecruiters: ["IIT", "DRDO", "CSIR", "Tata Steel"],
    portfolioRequirement: "Research papers", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹5-15 Lakh (M.Tech/PhD)", avgTimeToJob: "6-8 years",
    sector: ["Public", "Private"], trend: "Rising", remoteEligibility: "Low",
  },
  {
    name: "Physicist", domain: "Technology", subdomain: "Research", stream: "Science",
    fieldsOfStudy: ["Science", "Mathematics"],
    skills: ["Physics", "Mathematics", "MATLAB", "Research Methods", "Data Analysis"],
    skillWeights: [9, 8, 7, 7, 6], tools: ["MATLAB", "Python", "Lab Equipment"],
    demandScore: 6, topRecruiters: ["ISRO", "BARC", "DRDO", "TIFR"],
    portfolioRequirement: "Research papers", typicalExperience: "1 internship; 3 experiments",
    avgCost: "₹3-12 Lakh (M.Sc/PhD)", avgTimeToJob: "6-9 years",
    sector: ["Public", "Private"], trend: "Stable", remoteEligibility: "Medium",
  },
  {
    name: "Chemist", domain: "Healthcare", subdomain: "Chemistry", stream: "Science",
    fieldsOfStudy: ["Science"],
    skills: ["Chemistry", "Lab Techniques", "Analytical Chemistry", "Instrumentation", "Research"],
    skillWeights: [9, 8, 7, 7, 6], tools: ["HPLC", "GC-MS", "NMR", "Lab Equipment"],
    demandScore: 6, topRecruiters: ["Cipla", "Reliance", "CSIR", "Dr. Reddy's"],
    portfolioRequirement: "Lab reports", typicalExperience: "1 internship; 2 projects",
    avgCost: "₹2-8 Lakh (M.Sc Chemistry)", avgTimeToJob: "5-7 years",
    sector: ["Private", "Public"], trend: "Stable", remoteEligibility: "Low",
  },
  {
    name: "Statistician", domain: "Data/AI", subdomain: "Data Science", stream: "Science",
    fieldsOfStudy: ["Mathematics", "Statistics", "Science"],
    skills: ["Statistics", "R/Python", "Data Analysis", "Probability", "Research Methods"],
    skillWeights: [9, 8, 7, 7, 6], tools: ["R", "Python", "SAS", "SPSS"],
    demandScore: 7, topRecruiters: ["RBI", "NSSO", "ISI", "McKinsey"],
    portfolioRequirement: "Statistical analyses", typicalExperience: "1 internship; 3 projects",
    avgCost: "₹2-8 Lakh (M.Sc Statistics)", avgTimeToJob: "5-6 years",
    sector: ["Public", "Private"], trend: "Rising", remoteEligibility: "High",
  },
  {
    name: "Genetic Counselor", domain: "Healthcare", subdomain: "Genetics", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare", "Biotechnology"],
    skills: ["Genetic Counseling", "Medical Genetics", "Patient Communication", "Ethics", "Pedigree Analysis"],
    skillWeights: [8, 7, 7, 7, 6], tools: ["Genetic Databases", "Patient Management Software"],
    demandScore: 7, topRecruiters: ["Medgenome", "Strand Life Sciences", "Apollo", "AIIMS"],
    portfolioRequirement: "Case studies", typicalExperience: "1 clinical placement",
    avgCost: "₹3-10 Lakh (M.Sc Genetics)", avgTimeToJob: "5-6 years",
    sector: ["Private", "Public"], trend: "Rising", remoteEligibility: "Medium",
  },
];

// Combined career roles — all Class 12 pathways + advanced + master DB roles + life science
export const careerRoles: CareerRole[] = [
  ...scienceCareers,
  ...commerceCareers,
  ...artsCareers,
  ...advancedCareers,
  ...masterDBRoles,
  ...lifeScienceRoles,
];

// Deduplicate by name (keep first occurrence)
const seen = new Set<string>();
const deduped: CareerRole[] = [];
for (const role of careerRoles) {
  if (!seen.has(role.name)) {
    seen.add(role.name);
    deduped.push(role);
  }
}
// Replace export with deduped version
export { deduped as careerRolesDeduped };

// Stream-specific career name lists for Class 12 filtering
export const streamCareers = {
  Science: scienceCareers.map(c => c.name),
  Commerce: commerceCareers.map(c => c.name),
  Arts: artsCareers.map(c => c.name),
} as const;

// Education Level → allowed Fields of Study mapping (legacy, kept for compatibility)
export const educationFieldMapping: Record<string, string[]> = {
  "Class 12 - Science": ["Science", "Mathematics", "Healthcare"],
  "Class 12 - Commerce": ["Commerce", "Business", "Mathematics"],
  "Class 12 - Arts": ["Arts", "Design", "Media", "Education", "Psychology"],
  "Diploma": ["Science", "Engineering", "Computer Science", "Design", "Healthcare", "Hospitality"],
  "Undergraduate": [...fieldsOfStudy],
  "Graduate": [...fieldsOfStudy],
  "Postgraduate": [...fieldsOfStudy],
  "PhD": [...fieldsOfStudy],
  "Bootcamp": ["Computer Science", "Design", "Business", "Media"],
  "Self-Taught": ["Computer Science", "Design", "Business", "Media", "Arts"],
};

// Diploma-eligible roles
export const diplomaEligibleDomains = [
  "Technology", "Design", "Engineering", "Healthcare", "Hospitality",
  "Business", "Agriculture & AgriTech", "Animation & VFX",
] as const;

// ============================================================================
// CPS-BASED ROLE RECOMMENDATION HELPERS
// ============================================================================

export type CPSBand = "beginner" | "growth" | "advanced";

export function getCPSBand(cpsScore: number): CPSBand {
  if (cpsScore < 40) return "beginner";
  if (cpsScore <= 70) return "growth";
  return "advanced";
}

/**
 * Filter career roles based on CPS band.
 * < 40: beginner-friendly roles (demand ≤ 7, simpler skill requirements)
 * 40-70: growth roles (mid-demand, skill upgrades recommended)
 * > 70: specialized / high-paying roles (demand ≥ 7)
 */
export function getRecommendedRolesByBand(band: CPSBand, domain?: string): CareerRole[] {
  let filtered = careerRoles;
  if (domain) {
    filtered = filtered.filter(r => r.domain === domain);
  }
  switch (band) {
    case "beginner":
      return filtered.filter(r => r.demandScore <= 7 && r.skills.length <= 5);
    case "growth":
      return filtered.filter(r => r.demandScore >= 5 && r.demandScore <= 9);
    case "advanced":
      return filtered.filter(r => r.demandScore >= 7);
    default:
      return filtered;
  }
}

/**
 * Get cross-domain career suggestions based on field of study.
 * Returns alternative career paths for students who want to explore.
 */
export function getCrossDomainSuggestions(fieldOfStudy: string, currentRole: string): CareerRole[] {
  const crossMap: Record<string, string[]> = {
    "Microbiology": ["Data Scientist", "Biotech Research Scientist", "Clinical Research Associate", "Data Analyst", "Bioinformatics Analyst"],
    "Psychology": ["UX Researcher", "UX/UI Designer", "HR Manager", "Clinical Psychologist", "Organizational Psychologist"],
    "Commerce": ["Digital Marketer", "Business Analyst", "Product Manager", "Data Analyst", "Fintech Product Analyst"],
    "Zoology": ["Data Analyst", "Environmental Data Analyst", "Wildlife Biologist", "Sustainability Consultant"],
    "Botany": ["Agricultural Scientist", "Environmental Data Analyst", "Sustainability Consultant"],
    "Biotechnology": ["Data Scientist", "Biotech Research Scientist", "Geneticist", "Clinical Research Associate"],
    "Arts": ["UX/UI Designer", "Content Writer", "Digital Marketer", "Graphic Designer", "Content Creator"],
    // New cross-domain maps
    "History": ["Content Writer", "Public Policy Analyst", "Journalist", "Teacher", "Museum Curator"],
    "English": ["Content Writer", "Journalist", "Copywriter", "UX Researcher", "SEO Specialist"],
    "Bengali": ["Translator", "Content Writer", "Journalist", "Teacher"],
    "Hindi": ["Translator", "Content Writer", "Journalist", "Teacher"],
    "Geography": ["Urban Planner", "Environmental Data Analyst", "GIS Analyst", "Sustainability Consultant"],
    "General": ["Digital Marketer", "Content Writer", "Data Analyst", "Social Media Manager", "HR Manager"],
  };
  const suggestions = crossMap[fieldOfStudy] ?? [];
  return careerRoles.filter(r => suggestions.includes(r.name) && r.name !== currentRole).slice(0, 5);
}

/**
 * Calculate skill gap with severity levels.
 */
export function calculateSkillGaps(
  requiredSkills: string[],
  userSkills: Record<string, number>
): { skill: string; gap: number; severity: "critical" | "moderate" | "minor" }[] {
  return requiredSkills
    .map(skill => {
      const userLevel = userSkills[skill] ?? 0;
      const requiredLevel = 3; // Expert level
      const gap = requiredLevel - userLevel;
      return {
        skill,
        gap,
        severity: (userLevel === 0 ? "critical" : userLevel === 1 ? "moderate" : "minor") as "critical" | "moderate" | "minor",
      };
    })
    .filter(s => s.gap > 0)
    .sort((a, b) => b.gap - a.gap);
}

export const softSkills = [
  "Communication", "Leadership", "Teamwork", "Problem Solving", "Adaptability", "Decision Making"
] as const;

export const communicationSkills = [
  "Clarity of Explanation", "Presentation Confidence", "Writing Clarity", "Listening Ability"
] as const;

export const eiSkills = [
  "Self Awareness", "Empathy", "Conflict Management", "Emotional Regulation", "Social Awareness"
] as const;

export const experienceTypes = [
  "Internships", "Projects", "Freelance Work", "Hackathons", "Open Source"
] as const;

export type UserType = "student" | "fresher" | "professional";

export const industries = [
  "Technology & IT",
  "Data & AI",
  "Cybersecurity",
  "Banking, Finance & Insurance",
  "FinTech",
  "Sales & Business Development",
  "Marketing & Advertising",
  "Media & Content",
  "E-commerce & Retail",
  "Human Resources",
  "Education & Training",
  "EdTech",
  "Healthcare & Medical",
  "Pharmaceuticals",
  "Biotechnology & Life Sciences",
  "Manufacturing & Production",
  "Automobile",
  "Electronics & Semiconductor",
  "Construction & Real Estate",
  "Infrastructure",
  "Logistics & Supply Chain",
  "Hospitality & Tourism",
  "Aviation",
  "Legal & Compliance",
  "Energy & Utilities",
  "Oil & Gas",
  "Renewable Energy",
  "Telecommunications",
  "Design & Creative",
  "Gaming & Animation",
  "Research & Development",
  "Agriculture & AgriTech",
  "Government & Public Administration",
  "NGO & Social Impact",
  "Other"
] as const;

export const rolesByIndustry: Record<string, string[]> = {
  "Technology & IT": ["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile App Developer", "QA Engineer", "DevOps Engineer", "System Administrator", "Cloud Engineer", "IT Support Engineer"],
  "Data & AI": ["Data Analyst", "Data Scientist", "Machine Learning Engineer", "AI Engineer", "Data Engineer", "Business Analyst"],
  "Cybersecurity": ["Cybersecurity Analyst", "Information Security Analyst", "Security Engineer", "Penetration Tester", "Ethical Hacker", "SOC Analyst"],
  "Banking, Finance & Insurance": ["Accountant", "Financial Analyst", "Investment Analyst", "Auditor", "Relationship Manager", "Insurance Advisor"],
  "FinTech": ["FinTech Product Analyst", "Risk Analyst", "Payment Systems Specialist", "FinTech Developer"],
  "Sales & Business Development": ["Sales Executive", "Business Development Executive", "Account Manager", "Sales Manager"],
  "Marketing & Advertising": ["Digital Marketing Executive", "SEO Specialist", "Performance Marketer", "Brand Manager", "Marketing Analyst"],
  "Media & Content": ["Content Writer", "Copywriter", "Content Strategist", "Social Media Manager", "Video Producer"],
  "E-commerce & Retail": ["E-commerce Manager", "Category Manager", "Retail Manager", "Merchandiser"],
  "Human Resources": ["HR Executive", "Recruiter", "HR Manager", "Talent Acquisition Specialist"],
  "Education & Training": ["Teacher", "Trainer", "Academic Coordinator", "Instructional Designer"],
  "EdTech": ["Learning Experience Designer", "Course Developer", "Instructional Designer"],
  "Healthcare & Medical": ["Doctor", "Nurse", "Medical Officer", "Lab Technician"],
  "Pharmaceuticals": ["Pharmacist", "Medical Representative", "Drug Safety Associate"],
  "Biotechnology & Life Sciences": ["Research Scientist", "Lab Analyst", "Biotech Associate"],
  "Manufacturing & Production": ["Production Engineer", "Plant Manager", "Quality Control Engineer"],
  "Automobile": ["Automobile Engineer", "Service Engineer", "Design Engineer"],
  "Electronics & Semiconductor": ["Electronics Engineer", "Embedded Engineer", "Chip Design Engineer"],
  "Construction & Real Estate": ["Civil Engineer", "Site Engineer", "Project Manager"],
  "Infrastructure": ["Project Engineer", "Infrastructure Planner"],
  "Logistics & Supply Chain": ["Supply Chain Analyst", "Logistics Manager", "Warehouse Manager"],
  "Hospitality & Tourism": ["Hotel Manager", "Front Office Executive", "Travel Consultant"],
  "Aviation": ["Ground Staff", "Cabin Crew", "Aviation Operations Executive"],
  "Legal & Compliance": ["Legal Associate", "Corporate Lawyer", "Compliance Officer"],
  "Energy & Utilities": ["Electrical Engineer", "Energy Analyst"],
  "Oil & Gas": ["Petroleum Engineer", "Drilling Engineer"],
  "Renewable Energy": ["Solar Engineer", "Wind Energy Specialist"],
  "Telecommunications": ["Network Engineer", "Telecom Engineer"],
  "Design & Creative": ["Graphic Designer", "UI Designer", "UX Designer", "Product Designer", "UI/UX Designer"],
  "Gaming & Animation": ["Game Designer", "Game Developer", "Animator", "3D Artist"],
  "Research & Development": ["Research Analyst", "R&D Engineer"],
  "Agriculture & AgriTech": ["Agronomist", "AgriTech Specialist"],
  "Government & Public Administration": ["Civil Servant", "Policy Analyst"],
  "NGO & Social Impact": ["Program Manager", "Field Coordinator"],
  "Other": ["Generalist Role"],
};

export const targetDomains = [
  "Not Sure Yet",
  "Software Development",
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  "Mobile App Development",
  "Data Analytics",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps Engineering",
  "UI/UX Design",
  "Product Design",
  "Graphic Design",
  "Digital Marketing",
  "Performance Marketing",
  "SEO & Content Marketing",
  "Social Media Marketing",
  "Brand Management",
  "Product Management",
  "Project Management",
  "Business Analysis",
  "Sales",
  "Business Development",
  "Account Management",
  "Finance",
  "Investment Banking",
  "Financial Analysis",
  "Accounting",
  "FinTech",
  "Human Resources",
  "Talent Acquisition",
  "HR Analytics",
  "Operations Management",
  "Supply Chain Management",
  "Logistics",
  "Entrepreneurship",
  "Startup Operations",
  "Teaching & Training",
  "EdTech Roles",
  "Healthcare Services",
  "Clinical Research",
  "Pharmaceutical Roles",
  "Legal",
  "Corporate Law",
  "Compliance",
  "Media & Content Creation",
  "Journalism",
  "Public Relations",
  "Animation & VFX",
  "Game Development",
  "3D Design",
  "Research & Development",
  "Government Jobs",
  "Public Policy",
  "Hospitality & Tourism",
  "Aviation Careers",
  "Agriculture & AgriTech",
  "NGO & Social Impact",
  "Other"
] as const;

export const employmentStatusOptions = [
  "Employed",
  "Serving Notice Period",
  "Unemployed (Actively Looking)",
  "Unemployed (Not Looking)",
  "Freelancer / Self-Employed"
] as const;

export type EmploymentStatus = typeof employmentStatusOptions[number];

// Career Timeline Node for professionals
export type SeniorityLevel = "Intern" | "Junior" | "Mid-Level" | "Senior" | "Lead" | "Director";
export type OwnershipLevel = "Individual Contributor" | "Team Lead" | "Department Head" | "P&L Owner";
export type GapReason = "Sabbatical" | "Upskilling" | "Health" | "Layoff" | "Other";

export interface CareerNode {
  id: string;
  companyName: string;
  industry: string;
  roleTitle: string;
  seniorityLevel: SeniorityLevel;
  startDate: string; // MM/YYYY
  endDate: string; // MM/YYYY or "Present"
  isCurrent: boolean;
  teamSizeManaged: number;
  ownership: OwnershipLevel;
}

export interface CareerGapEntry {
  startDate: string;
  endDate: string;
  reason: GapReason;
}

export interface TransitionIntent {
  employmentStatus: EmploymentStatus | "";
  lastWorkingDay: string; // date string, required only if "Serving Notice Period"
  currentCtc: string;
  expectedCtc: string;
  willingnessToRelocate: boolean;
}

export type AssessmentData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  // User type
  userType: UserType;
  // Student fields
  educationLevel: string;
  fieldOfStudy: string;
  careerDomain: string;
  specialization: string;
  careerRole: string;
  // Fresher fields
  passoutYear: string;
  hadInternships: boolean;
  // Professional fields
  totalExperience: number;
  currentRole: string;
  industry: string;
  employmentStatus: EmploymentStatus | "";
  careerGap: boolean;
  jobSwitchIntent: boolean;
  // Career Timeline (professionals)
  careerTimeline: CareerNode[];
  careerGapLog: CareerGapEntry[];
  transitionIntent: TransitionIntent;
  // Career Switch fields — CSPM
  switchIntent: boolean;
  targetDomain: string;
  switchType: "minor" | "major";
  gapDuration: number; // months
  timeToSwitch: number; // months
  learningWillingness: number; // 1–5
  // Shared
  technicalSkills: Record<string, number>;
  softSkills: Record<string, number>;
  communicationSkills: Record<string, number>;
  eiSkills: Record<string, number>;
  experience: Record<string, number>;
  portfolioLevel: "none" | "basic" | "strong";
};

// Career Timeline derived intelligence
export function calculateTotalActiveMonths(timeline: CareerNode[]): number {
  let total = 0;
  for (const node of timeline) {
    const [sm, sy] = node.startDate.split("/").map(Number);
    const isPresent = node.endDate === "Present";
    const [em, ey] = isPresent
      ? [new Date().getMonth() + 1, new Date().getFullYear()]
      : node.endDate.split("/").map(Number);
    if (sy && ey) total += (ey - sy) * 12 + (em - sm);
  }
  return Math.max(0, total);
}

export function getRoleProgressionIndicator(timeline: CareerNode[]): "Upward" | "Lateral" | "Stagnant" {
  if (timeline.length < 2) return "Lateral";
  const levels: SeniorityLevel[] = ["Intern", "Junior", "Mid-Level", "Senior", "Lead", "Director"];
  const first = levels.indexOf(timeline[timeline.length - 1].seniorityLevel);
  const last = levels.indexOf(timeline[0].seniorityLevel);
  if (last > first) return "Upward";
  if (last < first) return "Stagnant";
  return "Lateral";
}

export function getAverageTenureMonths(timeline: CareerNode[]): number {
  if (timeline.length === 0) return 0;
  return Math.round(calculateTotalActiveMonths(timeline) / timeline.length);
}

export function getTenureStabilityMultiplier(avgTenure: number): number {
  if (avgTenure < 12) return 0.8;
  if (avgTenure > 24) return 1.2;
  return 1.0;
}

export function getResponsibilityScore(timeline: CareerNode[]): number {
  if (timeline.length === 0) return 0;
  const current = timeline.find(n => n.isCurrent) ?? timeline[0];
  const ownershipScores: Record<OwnershipLevel, number> = {
    "Individual Contributor": 40,
    "Team Lead": 60,
    "Department Head": 80,
    "P&L Owner": 100,
  };
  const teamBonus = Math.min(20, current.teamSizeManaged * 2);
  return Math.min(100, ownershipScores[current.ownership] + teamBonus);
}

// Experience scoring for professionals
export function calculateExperienceScore(years: number): number {
  if (years >= 5) return 90;
  if (years >= 3) return 80;
  if (years >= 1) return 60;
  return 30;
}

// Employment status urgency bonus (added to CSP urgency)
export function getEmploymentUrgencyBonus(status: EmploymentStatus | ""): number {
  switch (status) {
    case "Serving Notice Period": return 10;
    case "Unemployed (Actively Looking)": return 15;
    case "Unemployed (Not Looking)": return -5;
    default: return 0;
  }
}

// ERS (Employment Readiness Score) by user type
export function getERS(data: AssessmentData): { level: "very_high" | "high" | "moderate" | "low"; label: string } {
  if (data.userType === "fresher") return { level: "very_high", label: "Very High Urgency" };
  if (data.userType === "professional") {
    if (data.employmentStatus === "Serving Notice Period") return { level: "very_high", label: "Notice Period — Immediate" };
    if (data.employmentStatus === "Unemployed (Actively Looking)") return { level: "very_high", label: "Actively Looking — High Urgency" };
    if (data.jobSwitchIntent && data.totalExperience >= 3) return { level: "high", label: "Active Job Seeker" };
    if (data.careerGap) return { level: "very_high", label: "Career Gap — High Urgency" };
    if (data.employmentStatus === "Unemployed (Not Looking)") return { level: "low", label: "Not Actively Looking" };
    return { level: "moderate", label: "Upskilling Mode" };
  }
  return { level: "moderate", label: "Building Foundation" };
}

export function calculateCPS(data: AssessmentData): {
  total: number;
  technical: number;
  softSkill: number;
  communication: number;
  ei: number;
  experience: number;
  portfolio: number;
  marketDemand: number;
  qpi: number;
  isGeneralPass: boolean;
  streamWeights: { technical: number; logical: number; communication: number; emotional_intelligence: number };
  userType: UserType;
  experienceScore: number;
} {
  const role = careerRoles.find(r => r.name === data.careerRole);
  const userType = data.userType || "student";

  // ── Common skill calculations ──
  // For professionals with structured taxonomy, use skill engine scoring
  const proTaxonomy = (userType === "professional" && data.currentRole) ? getTaxonomyForRole(data.currentRole) : null;
  let technical: number;

  if (proTaxonomy) {
    // Build UserSkill array from technicalSkills ratings + taxonomy categories
    const profMap: Record<number, Proficiency> = { 1: "Beginner", 2: "Intermediate", 3: "Advanced" };
    const allSkillsByCategory: { skill: string; cat: "core" | "tools" | "advanced" }[] = [
      ...proTaxonomy.core.map(s => ({ skill: s, cat: "core" as const })),
      ...proTaxonomy.tools.map(s => ({ skill: s, cat: "tools" as const })),
      ...proTaxonomy.advanced.map(s => ({ skill: s, cat: "advanced" as const })),
    ];
    const userSkills: UserSkill[] = allSkillsByCategory
      .filter(s => (data.technicalSkills[s.skill] ?? 0) > 0)
      .map(s => ({
        skillName: s.skill,
        category: s.cat,
        proficiency: profMap[data.technicalSkills[s.skill]] ?? "Beginner",
      }));
    const rawScore = calculateSkillScore(userSkills);
    const normalized = normalizeSkillScore(rawScore);
    technical = Math.round((normalized / 100) * 30);
  } else {
    // Original flat skill calculation
    const techSkills = role?.skills ?? [];
    const techWeights = role?.skillWeights ?? [];
    let techWeightedSum = 0;
    let techWeightedMax = 0;
    techSkills.forEach((skill, i) => {
      const weight = techWeights[i] ?? 5;
      const proficiency = data.technicalSkills[skill] ?? 0;
      techWeightedSum += proficiency * weight;
      techWeightedMax += 3 * weight;
    });
    technical = techWeightedMax > 0 ? Math.round((techWeightedSum / techWeightedMax) * 30) : 0;
  }

  const ssValues = Object.values(data.softSkills);
  const ssMax = ssValues.length * 3;
  const ssSum = ssValues.reduce((a, b) => a + b, 0);
  const softSkill = ssMax > 0 ? Math.round((ssSum / ssMax) * 10) : 0;

  const commValues = Object.values(data.communicationSkills);
  const commMax = commValues.length * 3;
  const commSum = commValues.reduce((a, b) => a + b, 0);
  const communication = commMax > 0 ? Math.round((commSum / commMax) * 10) : 0;

  const eiValues = Object.values(data.eiSkills);
  const eiMax = eiValues.length * 3;
  const eiSum = eiValues.reduce((a, b) => a + b, 0);
  const ei = eiMax > 0 ? Math.round((eiSum / eiMax) * 10) : 0;

  const portfolio = data.portfolioLevel === "none" ? 0 : data.portfolioLevel === "basic" ? 7 : 15;
  const marketDemand = role?.demandScore ?? 5;

  // ── Experience calculation (varies by user type) ──
  let experience = 0;
  let experienceScore = 0;

  if (userType === "professional") {
    // Professional: experience_score dominates (mapped to 15-point scale)
    experienceScore = calculateExperienceScore(data.totalExperience);
    experience = Math.round((experienceScore / 100) * 15);
  } else if (userType === "fresher") {
    // Fresher: internship bonus + passout recency
    const internships = data.hadInternships ? 8 : 0;
    const passoutYear = parseInt(data.passoutYear) || new Date().getFullYear();
    const yearsSincePassout = Math.max(0, new Date().getFullYear() - passoutYear);
    const recencyBonus = yearsSincePassout <= 1 ? 5 : yearsSincePassout <= 2 ? 3 : 0;
    experience = Math.min(15, internships + recencyBonus + (data.experience["Projects"] ?? 0) * 2);
    experienceScore = Math.round((experience / 15) * 100);
  } else {
    // Student: original formula
    const internships = data.experience["Internships"] ?? 0;
    const projects = data.experience["Projects"] ?? 0;
    const freelance = data.experience["Freelance Work"] ?? 0;
    const hackathons = data.experience["Hackathons"] ?? 0;
    const openSource = data.experience["Open Source"] ?? 0;
    experience = Math.min(15, internships * 5 + projects * 3 + (freelance + hackathons + openSource) * 2);
    experienceScore = Math.round((experience / 15) * 100);
  }

  // ── Total CPS calculation (varies by user type) ──
  let total: number;

  if (userType === "professional") {
    // Professional CPS: experience(40%) + skills(30%) + role_relevance(20%) + portfolio(10%)
    const skillsComponent = (technical / 30) * 100;
    const roleRelevance = role ? (marketDemand / 10) * 100 : 50;
    const portfolioComponent = (portfolio / 15) * 100;
    total = Math.round(
      experienceScore * 0.40 +
      skillsComponent * 0.30 +
      roleRelevance * 0.20 +
      portfolioComponent * 0.10
    );
    // Career gap penalty
    if (data.careerGap) {
      total = Math.round(total * 0.85); // 15% penalty
    }
  } else {
    // Student/Fresher: original formula
    const streamWeights = getStreamCPSWeights(data.fieldOfStudy);
    const domainMod = getDomainCPSModifier(data.careerDomain);
    const generalPass = checkGeneralPass(data.careerDomain);

    total = technical + softSkill + communication + ei + experience + portfolio + marketDemand;

    if (generalPass) {
      const penalty = getGeneralPassPenalty();
      total = Math.round(total * penalty.cpsPenalty);
    }
  }

  // Clamp
  total = Math.max(0, Math.min(100, total));

  // ── Stream weights (for display) ──
  const streamWeights = getStreamCPSWeights(data.fieldOfStudy);
  const domainMod = getDomainCPSModifier(data.careerDomain);
  const effectiveWeights = { ...streamWeights };
  if (domainMod.technical) effectiveWeights.technical += domainMod.technical;
  if (domainMod.logical) effectiveWeights.logical += domainMod.logical;
  if (domainMod.communication) effectiveWeights.communication += domainMod.communication;
  if (domainMod.emotional_intelligence) effectiveWeights.emotional_intelligence += domainMod.emotional_intelligence;

  const generalPass = checkGeneralPass(data.careerDomain);

  // ── QPi ──
  let qpi = Math.round(
    (0.4 * (total / 100) + 0.3 * (marketDemand / 10) + 0.15 * (portfolio / 15) + 0.15 * (technical / 30)) * 100
  );
  if (generalPass && userType !== "professional") {
    const penalty = getGeneralPassPenalty();
    qpi = Math.round(qpi * penalty.qpiPenalty);
  }

  return { total, technical, softSkill, communication, ei, experience, portfolio, marketDemand, qpi, isGeneralPass: generalPass, streamWeights: effectiveWeights, userType, experienceScore };
}