// Career data and CPS calculation logic (Migrated from Frontend)

const scienceCareers = [
  {
    name: "Full-Stack Developer", domain: "Technology", subdomain: "Web Dev", stream: "Science",
    fieldsOfStudy: ["Science", "Engineering", "Computer Science"],
    skills: ["Java", "Python", "SQL", "React", "Node.js"],
    skillWeights: [8, 7, 6, 7, 7], demandScore: 9,
  },
  {
    name: "Data Scientist", domain: "Data/AI", subdomain: "Data Science", stream: "Science",
    fieldsOfStudy: ["Science", "Mathematics", "Computer Science", "Statistics"],
    skills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"],
    skillWeights: [8, 9, 8, 7, 7], demandScore: 10,
  },
  {
    name: "Mechanical Engineer", domain: "Engineering", subdomain: "Mechanical", stream: "Science",
    fieldsOfStudy: ["Science", "Engineering"],
    skills: ["Thermodynamics", "CAD", "MATLAB", "Mechanics"],
    skillWeights: [8, 7, 6, 7], demandScore: 8,
  },
  {
    name: "Civil Engineer", domain: "Engineering", subdomain: "Civil", stream: "Science",
    fieldsOfStudy: ["Science", "Engineering"],
    skills: ["AutoCAD", "Surveying", "Soil Mechanics", "MATLAB"],
    skillWeights: [8, 7, 6, 6], demandScore: 8,
  },
  {
    name: "Biomedical Engineer", domain: "Engineering", subdomain: "Biomedical", stream: "Science",
    fieldsOfStudy: ["Science", "Engineering", "Healthcare"],
    skills: ["Biology", "Electronics", "Mechanics", "MATLAB"],
    skillWeights: [7, 6, 6, 5], demandScore: 6,
  },
  {
    name: "Physician (MBBS)", domain: "Healthcare", subdomain: "Medicine", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare"],
    skills: ["Biology", "Chemistry", "Anatomy", "Physiology"],
    skillWeights: [9, 8, 7, 7], demandScore: 9,
  },
  {
    name: "Pharmacist", domain: "Healthcare", subdomain: "Pharmacy", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare"],
    skills: ["Chemistry", "Pharmacology", "Quality Control"],
    skillWeights: [8, 7, 6], demandScore: 7,
  },
  {
    name: "Registered Nurse", domain: "Healthcare", subdomain: "Nursing", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare"],
    skills: ["Biology", "Patient Care", "Anatomy", "CPR"],
    skillWeights: [8, 7, 6, 5], demandScore: 8,
  },
  {
    name: "Network Admin", domain: "Technology", subdomain: "Networking", stream: "Science",
    fieldsOfStudy: ["Science", "Computer Science"],
    skills: ["Networking", "Security", "Linux"],
    skillWeights: [7, 6, 5], demandScore: 8,
  },
  {
    name: "QA Engineer", domain: "Technology", subdomain: "QA", stream: "Science",
    fieldsOfStudy: ["Science", "Computer Science", "Engineering"],
    skills: ["Testing", "Automation", "SQL"],
    skillWeights: [7, 6, 5], demandScore: 7,
  },
  {
    name: "Pilot (Commercial)", domain: "Transport", subdomain: "Aviation", stream: "Science",
    fieldsOfStudy: ["Science"],
    skills: ["Physics", "Mathematics", "Geography"],
    skillWeights: [9, 8, 7], demandScore: 9,
  },
  {
    name: "Radiology Technician", domain: "Healthcare", subdomain: "Paramedical", stream: "Science",
    fieldsOfStudy: ["Science", "Healthcare"],
    skills: ["Biology", "Anatomy", "Physics"],
    skillWeights: [7, 7, 6], demandScore: 6,
  },
];

const commerceCareers = [
  {
    name: "Accountant", domain: "Business", subdomain: "Finance", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Accounting", "Taxation", "Excel"],
    skillWeights: [8, 7, 7], demandScore: 8,
  },
  {
    name: "Financial Analyst", domain: "Business", subdomain: "Finance", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Mathematics"],
    skills: ["Excel", "Financial Modeling", "Economics"],
    skillWeights: [8, 7, 6], demandScore: 7,
  },
  {
    name: "Bank Manager", domain: "Business", subdomain: "Banking", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Banking Operations", "Finance", "Customer Service"],
    skillWeights: [7, 6, 5], demandScore: 7,
  },
  {
    name: "Business Analyst", domain: "Business", subdomain: "Operations", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business", "Engineering"],
    skills: ["Analytics", "SQL", "Domain Knowledge"],
    skillWeights: [8, 7, 6], demandScore: 8,
  },
  {
    name: "HR Manager", domain: "Business", subdomain: "HR", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Recruitment", "Labor Law", "Communication"],
    skillWeights: [7, 6, 6], demandScore: 7,
  },
  {
    name: "Digital Marketer", domain: "Business", subdomain: "Marketing", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Media"],
    skills: ["SEO", "Analytics", "Content", "Social Media"],
    skillWeights: [7, 7, 6, 6], demandScore: 9,
  },
  {
    name: "Supply Chain Manager", domain: "Business", subdomain: "Operations", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Logistics", "ERP", "Analytics"],
    skillWeights: [7, 6, 6], demandScore: 7,
  },
  {
    name: "Retail Manager", domain: "Business", subdomain: "Sales", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Sales", "Customer Service", "Management"],
    skillWeights: [7, 6, 6], demandScore: 7,
  },
  {
    name: "Hotel Manager", domain: "Hospitality", subdomain: "Hotel Management", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Business", "Hospitality"],
    skills: ["Hospitality", "Management", "Finance"],
    skillWeights: [7, 6, 5], demandScore: 6,
  },
  {
    name: "Flight Attendant", domain: "Transport", subdomain: "Airlines", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Hospitality"],
    skills: ["Communication", "Safety Protocols", "Customer Service"],
    skillWeights: [8, 7, 6], demandScore: 7,
  },
  {
    name: "Economist", domain: "Business", subdomain: "Analysis", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Mathematics", "Statistics"],
    skills: ["Economics", "Statistics", "Research"],
    skillWeights: [8, 7, 6], demandScore: 5,
  },
  {
    name: "System Administrator", domain: "Technology", subdomain: "Infrastructure", stream: "Commerce",
    fieldsOfStudy: ["Commerce", "Computer Science"],
    skills: ["Networking", "OS Admin", "Security"],
    skillWeights: [7, 6, 6], demandScore: 7,
  },
];

const artsCareers = [
  {
    name: "Graphic Designer", domain: "Design", subdomain: "Visual Design", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design"],
    skills: ["Photoshop", "Illustrator", "Typography", "Layout"],
    skillWeights: [8, 7, 6, 6], demandScore: 7,
  },
  {
    name: "UX/UI Designer", domain: "Design", subdomain: "UI/UX Design", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design", "Computer Science"],
    skills: ["Figma", "User Research", "Prototyping", "HTML", "CSS"],
    skillWeights: [9, 8, 7, 6, 6], demandScore: 8,
  },
  {
    name: "Animator", domain: "Animation & VFX", subdomain: "Animation", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design"],
    skills: ["3D Modeling", "Rigging", "Animation"],
    skillWeights: [8, 7, 6], demandScore: 6,
  },
  {
    name: "Video Editor", domain: "Media & Communications", subdomain: "Film/Video", stream: "Arts",
    fieldsOfStudy: ["Arts", "Media"],
    skills: ["Editing", "Cinematography", "Storytelling"],
    skillWeights: [7, 6, 5], demandScore: 6,
  },
  {
    name: "Fashion Designer", domain: "Design", subdomain: "Fashion", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design"],
    skills: ["Sketching", "Pattern Making", "Textiles"],
    skillWeights: [7, 6, 6], demandScore: 5,
  },
  {
    name: "Journalist", domain: "Media & Communications", subdomain: "Journalism", stream: "Arts",
    fieldsOfStudy: ["Arts", "Media"],
    skills: ["Writing", "Editing", "Research"],
    skillWeights: [7, 6, 6], demandScore: 7,
  },
  {
    name: "Content Writer", domain: "Media & Communications", subdomain: "Content", stream: "Arts",
    fieldsOfStudy: ["Arts", "Media"],
    skills: ["Writing", "SEO", "Social Media"],
    skillWeights: [7, 6, 5], demandScore: 7,
  },
  {
    name: "Psychologist", domain: "Healthcare", subdomain: "Counseling", stream: "Arts",
    fieldsOfStudy: ["Arts", "Healthcare", "Psychology"],
    skills: ["Counseling", "Psychology", "Communication"],
    skillWeights: [8, 7, 7], demandScore: 6,
  },
  {
    name: "Business Manager", domain: "Business", subdomain: "Management", stream: "Arts",
    fieldsOfStudy: ["Arts", "Business", "Commerce"],
    skills: ["Leadership", "Finance", "Strategy"],
    skillWeights: [7, 6, 6], demandScore: 7,
  },
  {
    name: "Interior Designer", domain: "Design", subdomain: "Interior Design", stream: "Arts",
    fieldsOfStudy: ["Arts", "Design", "Architecture"],
    skills: ["AutoCAD", "3D Design", "Color Theory"],
    skillWeights: [8, 7, 6], demandScore: 5,
  },
  {
    name: "Event Manager", domain: "Hospitality", subdomain: "Events", stream: "Arts",
    fieldsOfStudy: ["Arts", "Hospitality", "Business"],
    skills: ["Event Planning", "Logistics", "Communication"],
    skillWeights: [7, 6, 6], demandScore: 6,
  },
  {
    name: "Sales Manager", domain: "Business", subdomain: "Sales", stream: "Arts",
    fieldsOfStudy: ["Arts", "Commerce", "Business"],
    skills: ["Negotiation", "CRM", "Communication"],
    skillWeights: [8, 7, 7], demandScore: 6,
  },
];

const advancedCareers = [
  {
    name: "Software Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Engineering", "Computer Science"],
    skills: ["Java", "Python", "SQL", "Data Structures", "Version Control"],
    skillWeights: [9, 8, 7, 8, 7], demandScore: 10,
  },
  {
    name: "Frontend Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Design"],
    skills: ["HTML", "CSS", "JavaScript", "React"],
    skillWeights: [7, 7, 7, 6], demandScore: 8,
  },
  {
    name: "Backend Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Node.js", "Express", "MongoDB"],
    skillWeights: [7, 6, 6], demandScore: 8,
  },
  {
    name: "Mobile Developer", domain: "Technology", subdomain: "Mobile Apps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["React Native", "Flutter", "Kotlin", "Swift", "REST APIs"],
    skillWeights: [7, 7, 6, 6, 6], demandScore: 8,
  },
  {
    name: "Cloud Engineer", domain: "Technology", subdomain: "Cloud/DevOps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["AWS", "Docker", "Kubernetes", "Linux"],
    skillWeights: [7, 6, 6, 5], demandScore: 9,
  },
  {
    name: "DevOps Engineer", domain: "Technology", subdomain: "Cloud/DevOps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Docker", "Kubernetes", "Jenkins", "Linux", "AWS"],
    skillWeights: [7, 7, 6, 6, 6], demandScore: 9,
  },
  {
    name: "Security Analyst", domain: "Cybersecurity", subdomain: "Security", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics"],
    skills: ["Network Security", "Python", "Firewall", "Ethical Hacking"],
    skillWeights: [7, 6, 5, 5], demandScore: 9,
  },
  {
    name: "Cybersecurity Analyst", domain: "Cybersecurity", subdomain: "Security", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Penetration Testing", "Network Security", "Incident Response", "SIEM"],
    skillWeights: [7, 6, 5, 5], demandScore: 9,
  },
  {
    name: "AI/ML Engineer", domain: "Data/AI", subdomain: "Machine Learning", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics", "Statistics"],
    skills: ["Python", "TensorFlow", "Statistics", "Data Analysis"],
    skillWeights: [8, 7, 6, 6], demandScore: 10,
  },
  {
    name: "Data Analyst", domain: "Data/AI", subdomain: "Data Science", stream: "All",
    fieldsOfStudy: ["Mathematics", "Computer Science", "Statistics", "Commerce"],
    skills: ["Python", "SQL", "Excel", "Tableau", "Statistics"],
    skillWeights: [8, 7, 6, 7, 6], demandScore: 9,
  },
  {
    name: "UX Designer", domain: "Design", subdomain: "UI/UX Design", stream: "All",
    fieldsOfStudy: ["Design", "Computer Science", "Arts"],
    skills: ["Figma", "User Research", "Prototyping", "CSS", "Illustrator"],
    skillWeights: [9, 8, 7, 5, 6], demandScore: 8,
  },
  {
    name: "UI Designer", domain: "Design", subdomain: "UI/UX Design", stream: "All",
    fieldsOfStudy: ["Design", "Computer Science", "Arts"],
    skills: ["Figma", "CSS", "Typography", "Color Theory", "Adobe XD"],
    skillWeights: [9, 7, 6, 6, 5], demandScore: 8,
  },
  {
    name: "Product Designer", domain: "Design", subdomain: "UI/UX Design", stream: "All",
    fieldsOfStudy: ["Design", "Computer Science", "Engineering"],
    skills: ["Figma", "Prototyping", "User Research", "Wireframing", "Design Systems"],
    skillWeights: [9, 8, 7, 7, 6], demandScore: 8,
  },
  {
    name: "Product Manager", domain: "Business", subdomain: "Operations", stream: "All",
    fieldsOfStudy: ["Engineering", "Business", "Computer Science"],
    skills: ["Product Strategy", "User Stories", "Roadmapping", "Analytics", "Agile"],
    skillWeights: [8, 7, 7, 6, 7], demandScore: 9,
  },
  {
    name: "SEO Specialist", domain: "Business", subdomain: "Marketing", stream: "All",
    fieldsOfStudy: ["Commerce", "Media", "Computer Science"],
    skills: ["SEO", "Google Analytics", "Keyword Research", "Content Strategy", "Technical SEO"],
    skillWeights: [8, 7, 7, 6, 6], demandScore: 7,
  },
  {
    name: "Marketing Analyst", domain: "Business", subdomain: "Marketing", stream: "All",
    fieldsOfStudy: ["Commerce", "Mathematics", "Statistics"],
    skills: ["Google Analytics", "Excel", "SQL", "Data Analysis", "Reporting"],
    skillWeights: [7, 7, 6, 7, 5], demandScore: 7,
  },
  {
    name: "Operations Manager", domain: "Business", subdomain: "Operations", stream: "All",
    fieldsOfStudy: ["Business", "Engineering", "Commerce"],
    skills: ["Process Optimization", "Supply Chain", "Excel", "Project Management", "Analytics"],
    skillWeights: [7, 6, 7, 6, 6], demandScore: 6,
  },
  {
    name: "Healthcare Admin", domain: "Healthcare", subdomain: "Administration", stream: "All",
    fieldsOfStudy: ["Healthcare", "Business"],
    skills: ["Operations", "Compliance", "Communication"],
    skillWeights: [5, 4, 4], demandScore: 5,
  },
  {
    name: "E-Learning Designer", domain: "Education", subdomain: "E-Learning", stream: "All",
    fieldsOfStudy: ["Education", "Media", "Design"],
    skills: ["Articulate", "Instructional Design", "Communication"],
    skillWeights: [6, 5, 5], demandScore: 4,
  },
  {
    name: "2D Animator", domain: "Animation & VFX", subdomain: "2D Animation", stream: "All",
    fieldsOfStudy: ["Design", "Arts", "Media"],
    skills: ["Animation Principles", "After Effects", "Photoshop", "Storyboarding", "Character Design"],
    skillWeights: [8, 7, 6, 7, 6], demandScore: 6,
  },
  {
    name: "3D Animator", domain: "Animation & VFX", subdomain: "3D Animation", stream: "All",
    fieldsOfStudy: ["Design", "Arts", "Engineering"],
    skills: ["Maya", "Blender", "3D Modeling", "Rigging", "Lighting"],
    skillWeights: [8, 7, 7, 6, 5], demandScore: 6,
  },
  {
    name: "3D Modeler", domain: "Design", subdomain: "3D Art", stream: "All",
    fieldsOfStudy: ["Design", "Engineering"],
    skills: ["Blender", "Maya", "Modeling", "Texturing"],
    skillWeights: [8, 7, 7, 6], demandScore: 6,
  },
  {
    name: "Compositor", domain: "Animation & VFX", subdomain: "Compositing", stream: "All",
    fieldsOfStudy: ["Design", "Arts", "Media"],
    skills: ["Nuke", "After Effects", "Color Grading", "Rotoscoping", "Keying"],
    skillWeights: [8, 7, 6, 6, 5], demandScore: 6,
  },
  {
    name: "Gameplay Programmer", domain: "Game Development", subdomain: "Game Programming", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["C++", "C#", "Unity", "Unreal Engine", "Physics"],
    skillWeights: [8, 7, 7, 6, 5], demandScore: 7,
  },
  {
    name: "Game Designer", domain: "Game Development", subdomain: "Game Design", stream: "All",
    fieldsOfStudy: ["Design", "Computer Science", "Arts"],
    skills: ["Game Mechanics", "Level Design", "Narrative Design", "Prototyping", "Unity"],
    skillWeights: [8, 7, 6, 6, 6], demandScore: 6,
  },
  {
    name: "AR/VR Developer", domain: "Game Development", subdomain: "Game Programming", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering", "Design"],
    skills: ["Unity", "C#", "3D Modeling", "Spatial Computing", "OpenXR"],
    skillWeights: [8, 7, 6, 6, 5], demandScore: 7,
  },
  {
    name: "Teacher", domain: "Education", subdomain: "Teaching", stream: "All",
    fieldsOfStudy: ["Science", "Commerce", "Arts", "Education"],
    skills: ["Subject Knowledge", "Pedagogy", "Communication"],
    skillWeights: [8, 7, 8], demandScore: 7,
  },
  {
    name: "AI Researcher", domain: "Data/AI", subdomain: "AI Research", stream: "All",
    fieldsOfStudy: ["Science", "Mathematics", "Computer Science"],
    skills: ["Mathematics", "Machine Learning", "Programming"],
    skillWeights: [9, 8, 7], demandScore: 8,
  },
  {
    name: "Lawyer", domain: "Law", subdomain: "Legal Practice", stream: "All",
    fieldsOfStudy: ["Arts", "Law"],
    skills: ["Law", "Analytical Thinking", "Communication"],
    skillWeights: [9, 7, 6], demandScore: 7,
  },
  {
    name: "Research Scientist", domain: "Technology", subdomain: "Research", stream: "All",
    fieldsOfStudy: ["Science", "Mathematics", "Statistics"],
    skills: ["Physics", "Mathematics", "Programming"],
    skillWeights: [8, 8, 7], demandScore: 6,
  },
  {
    name: "Sales Executive", domain: "Business", subdomain: "Sales", stream: "All",
    fieldsOfStudy: ["Commerce", "Business"],
    skills: ["Sales Strategy", "CRM", "Negotiation", "Lead Generation", "Communication"],
    skillWeights: [7, 6, 7, 6, 8], demandScore: 7,
  },
  {
    name: "Social Media Manager", domain: "Business", subdomain: "Marketing", stream: "All",
    fieldsOfStudy: ["Media", "Commerce"],
    skills: ["Social Media", "Content Creation", "Analytics", "Community Management", "Paid Ads"],
    skillWeights: [8, 7, 6, 6, 6], demandScore: 7,
  },
  {
    name: "Content Creator", domain: "Media & Communications", subdomain: "Content", stream: "All",
    fieldsOfStudy: ["Media", "Arts"],
    skills: ["Video Editing", "Copywriting", "Social Media", "Storytelling", "Analytics"],
    skillWeights: [7, 7, 6, 7, 5], demandScore: 7,
  },
];

const masterDBRoles = [
  {
    name: "React Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["React", "JavaScript", "TypeScript", "CSS", "Redux"],
    skillWeights: [9, 8, 7, 7, 6], demandScore: 9,
  },
  {
    name: "UI Engineer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Design"],
    skills: ["React", "CSS", "JavaScript", "Design Systems", "Accessibility"],
    skillWeights: [8, 8, 7, 7, 6], demandScore: 8,
  },
  {
    name: "API Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["REST APIs", "GraphQL", "Node.js", "Python", "SQL"],
    skillWeights: [8, 7, 7, 7, 7], demandScore: 8,
  },
  {
    name: "Database Engineer", domain: "Technology", subdomain: "Data Infrastructure", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["SQL", "PostgreSQL", "MongoDB", "Database Design", "Performance Tuning"],
    skillWeights: [9, 8, 7, 7, 6], demandScore: 7,
  },
  {
    name: "Fullstack Developer", domain: "Technology", subdomain: "Web Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["React", "Node.js", "SQL", "TypeScript", "Docker"],
    skillWeights: [8, 8, 7, 7, 6], demandScore: 9,
  },
  {
    name: "Software Engineer", domain: "Technology", subdomain: "Software Development", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["Java", "Python", "Data Structures", "System Design", "SQL"],
    skillWeights: [8, 8, 9, 7, 7], demandScore: 10,
  },
  {
    name: "AWS Engineer", domain: "Technology", subdomain: "Cloud/DevOps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["AWS", "CloudFormation", "Lambda", "S3", "VPC"],
    skillWeights: [9, 7, 7, 6, 6], demandScore: 9,
  },
  {
    name: "Cloud Architect", domain: "Technology", subdomain: "Cloud/DevOps", stream: "All",
    fieldsOfStudy: ["Computer Science", "Engineering"],
    skills: ["AWS", "Azure", "GCP", "System Design", "Networking"],
    skillWeights: [8, 7, 7, 8, 6], demandScore: 9,
  },
  {
    name: "ML Engineer", domain: "Data/AI", subdomain: "Machine Learning", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics", "Statistics"],
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps", "Statistics"],
    skillWeights: [8, 8, 7, 7, 7], demandScore: 10,
  },
  {
    name: "AI Engineer", domain: "Data/AI", subdomain: "AI Engineering", stream: "All",
    fieldsOfStudy: ["Computer Science", "Mathematics"],
    skills: ["Python", "Deep Learning", "NLP", "Computer Vision", "MLOps"],
    skillWeights: [8, 8, 7, 7, 6], demandScore: 10,
  },
];

const careerRoles = [
  ...scienceCareers,
  ...commerceCareers,
  ...artsCareers,
  ...advancedCareers,
  ...masterDBRoles,
];

function calculateCPS(data) {
  const role = careerRoles.find(r => r.name === data.careerRole);

  // Technical (max 30) - weighted by skill importance per PDF formula
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
  const technical = techWeightedMax > 0 ? Math.round((techWeightedSum / techWeightedMax) * 30) : 0;

  // Soft Skills (max 10)
  const ssValues = Object.values(data.softSkills);
  const ssMax = ssValues.length * 3;
  const ssSum = ssValues.reduce((a, b) => a + b, 0);
  const softSkill = ssMax > 0 ? Math.round((ssSum / ssMax) * 10) : 0;

  // Communication (max 10)
  const commValues = Object.values(data.communicationSkills);
  const commMax = commValues.length * 3;
  const commSum = commValues.reduce((a, b) => a + b, 0);
  const communication = commMax > 0 ? Math.round((commSum / commMax) * 10) : 0;

  // EI (max 10)
  const eiValues = Object.values(data.eiSkills);
  const eiMax = eiValues.length * 3;
  const eiSum = eiValues.reduce((a, b) => a + b, 0);
  const ei = eiMax > 0 ? Math.round((eiSum / eiMax) * 10) : 0;

  // Experience (max 15) - PDF: +5 per internship, +3 per project
  const internships = data.experience["Internships"] ?? 0;
  const projects = data.experience["Projects"] ?? 0;
  const freelance = data.experience["Freelance Work"] ?? 0;
  const hackathons = data.experience["Hackathons"] ?? 0;
  const openSource = data.experience["Open Source"] ?? 0;
  const experience = Math.min(15, internships * 5 + projects * 3 + (freelance + hackathons + openSource) * 2);

  // Portfolio (max 15)
  const portfolio = data.portfolioLevel === "none" ? 0 : data.portfolioLevel === "basic" ? 7 : 15;

  // Market Demand (max 10)
  const marketDemand = role?.demandScore ?? 5;

  const total = technical + softSkill + communication + ei + experience + portfolio + marketDemand;

  // QPi per PDF: 0.4*(CPS/100) + 0.3*(DemandScore/10) + 0.15*(PortfolioScore/15) + 0.15*(SkillScore/30)
  const qpi = Math.round(
    (0.4 * (total / 100) + 0.3 * (marketDemand / 10) + 0.15 * (portfolio / 15) + 0.15 * (technical / 30)) * 100
  );

  return { total, technical, softSkill, communication, ei, experience, portfolio, marketDemand, qpi };
}

const skillGapsByField = {
  "computer_science": [
    { skill: "Python", level: "High" }, { skill: "System Design", level: "Medium" }, { skill: "Communication", level: "Medium" },
  ],
  "medical": [
    { skill: "Data Analysis", level: "High" }, { skill: "Lab Techniques", level: "Medium" }, { skill: "Scientific Writing", level: "Low" },
  ],
  "accounting_finance": [
    { skill: "Financial Modeling", level: "High" }, { skill: "Excel Advanced", level: "Medium" }, { skill: "Presentation Skills", level: "Low" },
  ],
  "design": [
    { skill: "Digital Tools", level: "High" }, { skill: "Research Methods", level: "Medium" }, { skill: "Portfolio Building", level: "Medium" },
  ],
};

const industriesByField = {
  "computer_science": ["IT Services", "Product Companies", "Startups", "Consulting Firms", "E-Commerce"],
  "medical": ["Pharmaceuticals", "Biotech Firms", "Research Labs", "Healthcare", "Environmental Agencies"],
  "accounting_finance": ["Banking & Finance", "Big 4 Accounting", "Insurance", "FMCG", "Consulting"],
  "design": ["Media Houses", "Publishing", "EdTech", "NGOs", "Government"],
};

const trainingByField = {
  "computer_science": ["Full Stack Bootcamp", "DSA Masterclass", "Cloud Certification", "Soft Skills Workshop"],
  "medical": ["Data Analytics for Bio", "Lab Safety Certification", "Research Methodology", "Scientific Communication"],
  "accounting_finance": ["Tally & GST Training", "Financial Modeling Course", "Business Analytics", "Mock Interview Prep"],
  "design": ["Digital Marketing Basics", "Content Writing Workshop", "UX Research Fundamentals", "Public Speaking"],
};

function getCareerInsights(fieldOfStudy, totalScore) {
  // Normalize field name to match our mapping keys
  const fieldKey = fieldOfStudy?.toLowerCase().replace(/ /g, '_') || 'computer_science';
  
  const skillGaps = skillGapsByField[fieldKey] || skillGapsByField["computer_science"];
  const likelyIndustries = industriesByField[fieldKey] || industriesByField["computer_science"];
  const suggestedTraining = trainingByField[fieldKey] || trainingByField["computer_science"];
  
  let placementReadiness = "Not Ready";
  if (totalScore > 70) placementReadiness = "Ready for Placement";
  else if (totalScore >= 40) placementReadiness = "Needs Training";

  return {
    skillGaps,
    likelyIndustries,
    suggestedTraining,
    placementReadiness
  };
}

module.exports = {
  careerRoles,
  calculateCPS,
  getCareerInsights
};

