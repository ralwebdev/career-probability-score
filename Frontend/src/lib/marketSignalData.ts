// Market signal data — aligned with PDF CMSE spec
// DemandIndex formula: ROUND(10 * log(active_listings+1) / log(max_listings+1), 1)

export type MarketSignal = {
  career: string;
  demandIndex: number;
  activeListings: number;
  growthTrend: "rising" | "stable" | "declining";
  topSkills: string[];
  avgSalary: string;
  platforms: { linkedin: number; indeed: number; glassdoor: number };
};

export const marketSignals: MarketSignal[] = [
  // Technology domain
  {
    career: "Software Developer", demandIndex: 10, activeListings: 48250, growthTrend: "rising",
    topSkills: ["Java", "Python", "SQL", "Git", "REST APIs"],
    avgSalary: "₹8-25 LPA",
    platforms: { linkedin: 22100, indeed: 15400, glassdoor: 10750 },
  },
  {
    career: "Full-Stack Developer", demandIndex: 9, activeListings: 38500, growthTrend: "rising",
    topSkills: ["JavaScript", "React", "Node.js", "SQL", "Docker"],
    avgSalary: "₹8-28 LPA",
    platforms: { linkedin: 17500, indeed: 12600, glassdoor: 8400 },
  },
  {
    career: "Frontend Developer", demandIndex: 8, activeListings: 28900, growthTrend: "rising",
    topSkills: ["React", "JavaScript", "CSS", "HTML"],
    avgSalary: "₹6-22 LPA",
    platforms: { linkedin: 13100, indeed: 9400, glassdoor: 6400 },
  },
  {
    career: "Backend Developer", demandIndex: 8, activeListings: 26400, growthTrend: "rising",
    topSkills: ["Node.js", "Express", "MongoDB", "SQL"],
    avgSalary: "₹7-24 LPA",
    platforms: { linkedin: 12000, indeed: 8600, glassdoor: 5800 },
  },
  {
    career: "Data Scientist", demandIndex: 10, activeListings: 24600, growthTrend: "rising",
    topSkills: ["Python", "Machine Learning", "TensorFlow", "Statistics"],
    avgSalary: "₹10-35 LPA",
    platforms: { linkedin: 11200, indeed: 8100, glassdoor: 5300 },
  },
  {
    career: "Data Analyst", demandIndex: 9, activeListings: 31200, growthTrend: "rising",
    topSkills: ["Python", "SQL", "Tableau", "Excel", "Statistics"],
    avgSalary: "₹5-18 LPA",
    platforms: { linkedin: 14200, indeed: 10300, glassdoor: 6700 },
  },
  {
    career: "Cloud Engineer", demandIndex: 9, activeListings: 35800, growthTrend: "rising",
    topSkills: ["AWS", "Docker", "Kubernetes", "Linux"],
    avgSalary: "₹10-30 LPA",
    platforms: { linkedin: 16200, indeed: 11800, glassdoor: 7800 },
  },
  {
    career: "DevOps Engineer", demandIndex: 9, activeListings: 29400, growthTrend: "rising",
    topSkills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Linux"],
    avgSalary: "₹10-32 LPA",
    platforms: { linkedin: 13400, indeed: 9600, glassdoor: 6400 },
  },
  {
    career: "Security Analyst", demandIndex: 9, activeListings: 14200, growthTrend: "rising",
    topSkills: ["Network Security", "Python", "Ethical Hacking", "Wireshark"],
    avgSalary: "₹8-28 LPA",
    platforms: { linkedin: 6500, indeed: 4600, glassdoor: 3100 },
  },
  {
    career: "Cybersecurity Analyst", demandIndex: 9, activeListings: 12800, growthTrend: "rising",
    topSkills: ["Penetration Testing", "Network Security", "SIEM"],
    avgSalary: "₹8-28 LPA",
    platforms: { linkedin: 5800, indeed: 4200, glassdoor: 2800 },
  },
  {
    career: "Mobile Developer", demandIndex: 8, activeListings: 21300, growthTrend: "rising",
    topSkills: ["React Native", "Flutter", "Kotlin", "Swift"],
    avgSalary: "₹7-25 LPA",
    platforms: { linkedin: 9800, indeed: 6900, glassdoor: 4600 },
  },
  {
    career: "QA/Test Engineer", demandIndex: 7, activeListings: 18200, growthTrend: "stable",
    topSkills: ["Selenium", "Python", "API Testing", "JIRA"],
    avgSalary: "₹5-16 LPA",
    platforms: { linkedin: 8300, indeed: 6000, glassdoor: 3900 },
  },
  // Design domain
  {
    career: "UX Designer", demandIndex: 8, activeListings: 18600, growthTrend: "rising",
    topSkills: ["Figma", "User Research", "Prototyping"],
    avgSalary: "₹5-20 LPA",
    platforms: { linkedin: 8500, indeed: 6100, glassdoor: 4000 },
  },
  {
    career: "UI Designer", demandIndex: 8, activeListings: 15400, growthTrend: "rising",
    topSkills: ["Figma", "CSS", "Typography", "Adobe XD"],
    avgSalary: "₹5-18 LPA",
    platforms: { linkedin: 7000, indeed: 5100, glassdoor: 3300 },
  },
  {
    career: "Graphic Designer", demandIndex: 7, activeListings: 11500, growthTrend: "stable",
    topSkills: ["Photoshop", "Illustrator", "Typography"],
    avgSalary: "₹3-12 LPA",
    platforms: { linkedin: 5200, indeed: 3800, glassdoor: 2500 },
  },
  {
    career: "3D Modeler", demandIndex: 6, activeListings: 6400, growthTrend: "stable",
    topSkills: ["Blender", "Maya", "Modeling", "Texturing"],
    avgSalary: "₹4-18 LPA",
    platforms: { linkedin: 2900, indeed: 2100, glassdoor: 1400 },
  },
  {
    career: "Video Editor", demandIndex: 6, activeListings: 9100, growthTrend: "rising",
    topSkills: ["Premiere Pro", "After Effects", "Storytelling"],
    avgSalary: "₹3-14 LPA",
    platforms: { linkedin: 4100, indeed: 3000, glassdoor: 2000 },
  },
  {
    career: "Motion Graphics Designer", demandIndex: 7, activeListings: 8200, growthTrend: "rising",
    topSkills: ["After Effects", "Premiere Pro", "Animation Principles"],
    avgSalary: "₹4-15 LPA",
    platforms: { linkedin: 3700, indeed: 2700, glassdoor: 1800 },
  },
  // Business domain
  {
    career: "Digital Marketer", demandIndex: 8, activeListings: 21300, growthTrend: "stable",
    topSkills: ["SEO", "Google Ads", "Analytics", "Content Marketing"],
    avgSalary: "₹4-15 LPA",
    platforms: { linkedin: 9600, indeed: 7200, glassdoor: 4500 },
  },
  {
    career: "Financial Analyst", demandIndex: 7, activeListings: 12800, growthTrend: "stable",
    topSkills: ["Excel", "Financial Modeling", "Accounting"],
    avgSalary: "₹6-22 LPA",
    platforms: { linkedin: 5800, indeed: 4200, glassdoor: 2800 },
  },
  {
    career: "Product Manager", demandIndex: 9, activeListings: 15700, growthTrend: "rising",
    topSkills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
    avgSalary: "₹12-35 LPA",
    platforms: { linkedin: 7200, indeed: 5100, glassdoor: 3400 },
  },
  {
    career: "Business Analyst", demandIndex: 8, activeListings: 19400, growthTrend: "rising",
    topSkills: ["Excel", "SQL", "Data Analysis", "JIRA"],
    avgSalary: "₹6-20 LPA",
    platforms: { linkedin: 8800, indeed: 6400, glassdoor: 4200 },
  },
  {
    career: "Content Writer", demandIndex: 7, activeListings: 14200, growthTrend: "stable",
    topSkills: ["Copywriting", "SEO Writing", "Storytelling"],
    avgSalary: "₹3-12 LPA",
    platforms: { linkedin: 6500, indeed: 4600, glassdoor: 3100 },
  },
  // Data/AI domain
  {
    career: "AI/ML Engineer", demandIndex: 10, activeListings: 22400, growthTrend: "rising",
    topSkills: ["Python", "TensorFlow", "Statistics", "Data Analysis"],
    avgSalary: "₹12-40 LPA",
    platforms: { linkedin: 10800, indeed: 6900, glassdoor: 4700 },
  },
  // Healthcare & Education
  {
    career: "Healthcare Admin", demandIndex: 5, activeListings: 4200, growthTrend: "stable",
    topSkills: ["Operations", "Compliance", "Communication"],
    avgSalary: "₹4-12 LPA",
    platforms: { linkedin: 1900, indeed: 1400, glassdoor: 900 },
  },
  {
    career: "E-Learning Designer", demandIndex: 4, activeListings: 2800, growthTrend: "rising",
    topSkills: ["Articulate", "Instructional Design", "Communication"],
    avgSalary: "₹3-10 LPA",
    platforms: { linkedin: 1300, indeed: 900, glassdoor: 600 },
  },
  // Game Development
  {
    career: "Game Designer", demandIndex: 6, activeListings: 4200, growthTrend: "rising",
    topSkills: ["Game Mechanics", "Unity", "Level Design"],
    avgSalary: "₹5-20 LPA",
    platforms: { linkedin: 1900, indeed: 1400, glassdoor: 900 },
  },
  {
    career: "Gameplay Programmer", demandIndex: 7, activeListings: 5100, growthTrend: "rising",
    topSkills: ["C++", "Unity", "Unreal Engine", "C#"],
    avgSalary: "₹6-25 LPA",
    platforms: { linkedin: 2300, indeed: 1700, glassdoor: 1100 },
  },
  {
    career: "AR/VR Developer", demandIndex: 7, activeListings: 4800, growthTrend: "rising",
    topSkills: ["Unity", "C#", "3D Modeling", "Spatial Computing"],
    avgSalary: "₹8-30 LPA",
    platforms: { linkedin: 2200, indeed: 1600, glassdoor: 1000 },
  },
];
