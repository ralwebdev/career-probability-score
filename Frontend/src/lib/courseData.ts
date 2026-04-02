// Course data aligned with PDF Table 3 and course recommendations
// Red Apple Learning courses prioritized per spec

export type Course = {
  id: string;
  title: string;
  provider: string;
  providerType: "redapple" | "external";
  skills: string[];
  careers: string[];
  domain: string;
  duration: string;
  price: string;
  mode: "online" | "offline" | "hybrid";
  url: string;
  rating: number;
};

export const courses: Course[] = [
  // ============================
  // Red Apple Learning — Certificate (3 months = ₹45,000)
  // ============================
  {
    id: "ra-uiux", title: "Graphic & UI/UX Designing", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Figma", "User Research", "Prototyping", "CSS", "Illustrator", "Wireframing", "Adobe XD", "Typography"],
    careers: ["UX Designer", "UI Designer", "Product Designer", "UX Researcher", "Interaction Designer"],
    domain: "Design", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.8,
  },
  {
    id: "ra-graphic", title: "Graphic & Motion Graphics", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Photoshop", "Illustrator", "Typography", "Layout", "After Effects", "Branding", "Color Theory"],
    careers: ["Graphic Designer", "Motion Graphics Artist", "Brand Designer", "Visual Designer", "Layout Artist", "Packaging Designer"],
    domain: "Design", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.7,
  },
  {
    id: "ra-graphicdesign", title: "Graphics Designing", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Photoshop", "Illustrator", "Typography", "Layout", "Branding", "Color Theory", "InDesign"],
    careers: ["Graphic Designer", "Brand Designer", "Visual Designer", "Layout Artist", "Packaging Designer"],
    domain: "Design", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.7,
  },
  {
    id: "ra-uiux-cert", title: "UI/UX Designing", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Figma", "User Research", "Prototyping", "Wireframing", "Usability Testing", "Adobe XD", "Interaction Design"],
    careers: ["UX Designer", "UI Designer", "Product Designer", "UX Researcher", "Interaction Designer"],
    domain: "Design", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.8,
  },
  {
    id: "ra-motiongfx", title: "Motion Graphics", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["After Effects", "Premiere Pro", "Animation", "Motion Graphics", "Storyboarding", "Cinema 4D Lite"],
    careers: ["Motion Graphics Artist", "Video Editor", "VFX Artist", "Content Creator"],
    domain: "Design", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.7,
  },
  {
    id: "ra-3dmodel", title: "3D Modeling & Sculpting", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Blender", "Maya", "Modeling", "Texturing", "3D Modeling", "ZBrush"],
    careers: ["3D Modeler", "3D Animator", "Game Artist", "Texturing Artist", "Lighting Artist"],
    domain: "Design", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.7,
  },
  {
    id: "ra-texture", title: "3D Texturing & Mapping", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Texturing", "Blender", "Maya", "Substance Painter", "UV Mapping", "PBR"],
    careers: ["3D Modeler", "Texturing Artist", "Game Artist", "Lighting Artist", "Look Dev Artist"],
    domain: "Design", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.6,
  },
  {
    id: "ra-editing", title: "Editing & Cinematography", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Premiere Pro", "After Effects", "Storytelling", "Color Grading", "Cinematography", "DaVinci Resolve"],
    careers: ["Video Editor", "Content Creator", "Color Grader", "Post Production Artist", "Cinematographer"],
    domain: "Media", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.5,
  },
  {
    id: "ra-htmlcss", title: "HTML & CSS (Web Designing)", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["HTML", "CSS", "Responsive Design", "Bootstrap", "Tailwind CSS", "JavaScript Basics"],
    careers: ["Web Designer", "Frontend Developer", "UI Developer"],
    domain: "Technology", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.6,
  },
  {
    id: "ra-wordpress", title: "WordPress Development", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["WordPress", "PHP Basics", "WooCommerce", "SEO", "Elementor", "Web Hosting"],
    careers: ["WordPress Developer", "Web Designer", "Freelance Developer"],
    domain: "Technology", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.5,
  },
  {
    id: "ra-digimkt", title: "Google Certified Digital Marketing", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["SEO", "Google Ads", "Google Analytics", "Content Marketing", "Social Media", "Analytics"],
    careers: ["Digital Marketer", "SEO Specialist", "Social Media Manager", "Performance Marketer", "Content Strategist", "Growth Hacker"],
    domain: "Marketing", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.6,
  },
  {
    id: "ra-frontend", title: "Front End (React.js) Development", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Redux"],
    careers: ["Frontend Developer", "React Developer", "UI Engineer", "Fullstack Developer"],
    domain: "Technology", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.8,
  },
  {
    id: "ra-backend", title: "Back End (Node.js) Development", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Node.js", "Express", "MongoDB", "SQL", "REST APIs", "Docker"],
    careers: ["Backend Developer", "API Developer", "Database Engineer", "Fullstack Developer", "Software Engineer"],
    domain: "Technology", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.7,
  },
  {
    id: "ra-aiml", title: "AI-ML", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "Deep Learning", "NLP"],
    careers: ["AI Engineer", "ML Engineer", "Data Scientist", "Data Analyst"],
    domain: "Data/AI", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.7,
  },
  {
    id: "ra-devops", title: "DevOps", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Docker", "Kubernetes", "CI/CD", "AWS", "Linux", "Terraform", "Jenkins"],
    careers: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"],
    domain: "Technology", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.6,
  },
  {
    id: "ra-blockchain", title: "Blockchain", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "DApp Development"],
    careers: ["Blockchain Developer", "Smart Contract Developer", "Web3 Developer"],
    domain: "Technology", duration: "3 months", price: "₹45,000", mode: "hybrid", url: "#", rating: 4.5,
  },

  // ============================
  // Red Apple Learning — Advanced Certificate (6 months = ₹90,000)
  // ============================
  {
    id: "ra-gamedesign", title: "Game Design (Advanced)", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Game Design", "Level Design", "Unity", "Game Art", "Prototyping", "Narrative Design"],
    careers: ["Game Designer", "Level Designer", "Narrative Designer", "Game Producer"],
    domain: "Technology", duration: "6 months", price: "₹90,000", mode: "hybrid", url: "#", rating: 4.7,
  },
  {
    id: "ra-gamedev", title: "Game Development (Advanced)", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Unity", "C#", "Game Physics", "3D Modeling", "Game AI", "Multiplayer"],
    careers: ["Game Developer", "Unity Developer", "Gameplay Programmer", "Technical Designer"],
    domain: "Technology", duration: "6 months", price: "₹90,000", mode: "hybrid", url: "#", rating: 4.7,
  },
  {
    id: "ra-gamedev-pro", title: "Game Development Pro (Advanced)", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Unreal Engine", "C++", "Blueprints", "Multiplayer", "VR", "Game AI"],
    careers: ["Unreal Developer", "Game Programmer", "Engine Developer", "Technical Artist"],
    domain: "Technology", duration: "6 months", price: "₹90,000", mode: "hybrid", url: "#", rating: 4.8,
  },
  {
    id: "ra-mernstack", title: "MERN Stack Development (Advanced)", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["React", "Node.js", "Express", "MongoDB", "TypeScript", "REST APIs", "Docker"],
    careers: ["Fullstack Developer", "MERN Developer", "Software Engineer"],
    domain: "Technology", duration: "6 months", price: "₹90,000", mode: "hybrid", url: "#", rating: 4.8,
  },
  {
    id: "ra-mernstack-pro", title: "MERN Stack Development Pro (Advanced)", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["React", "Next.js", "Node.js", "GraphQL", "Docker", "Kubernetes", "System Design", "AWS"],
    careers: ["Senior Fullstack Developer", "Software Architect", "Tech Lead"],
    domain: "Technology", duration: "6 months", price: "₹90,000", mode: "hybrid", url: "#", rating: 4.9,
  },
  {
    id: "ra-blockchain-pro", title: "Blockchain Pro (Advanced)", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Solidity", "DeFi", "Smart Contract Security", "Cross-Chain", "Ethereum", "Web3"],
    careers: ["Senior Blockchain Developer", "Smart Contract Auditor", "DeFi Developer", "Blockchain Architect"],
    domain: "Technology", duration: "6 months", price: "₹90,000", mode: "hybrid", url: "#", rating: 4.7,
  },

  // ============================
  // Red Apple Learning — Diploma (12 months = ₹1,80,000)
  // ============================
  {
    id: "ra-diploma-graphics", title: "Diploma in Graphics Design", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Photoshop", "Illustrator", "Figma", "Typography", "Branding", "UI/UX", "Motion Graphics"],
    careers: ["Graphic Designer", "UI/UX Designer", "Brand Designer", "Visual Designer"],
    domain: "Design", duration: "12 months", price: "₹1,80,000", mode: "hybrid", url: "#", rating: 4.8,
  },
  {
    id: "ra-diploma-uiux", title: "Diploma in UI/UX Designing", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Figma", "User Research", "Interaction Design", "Prototyping", "Design Systems", "Accessibility"],
    careers: ["UX Designer", "Product Designer", "Interaction Designer", "UX Researcher", "Design Lead"],
    domain: "Design", duration: "12 months", price: "₹1,80,000", mode: "hybrid", url: "#", rating: 4.9,
  },
  {
    id: "ra-diploma-3danim", title: "Diploma in 3D Animation & VFX", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["Maya", "Blender", "3D Animation", "VFX", "Compositing", "Character Animation", "Texturing"],
    careers: ["3D Animator", "VFX Artist", "Compositor", "Character Animator", "Lighting Artist"],
    domain: "Design", duration: "12 months", price: "₹1,80,000", mode: "hybrid", url: "#", rating: 4.8,
  },

  // ============================
  // Red Apple Learning — B.Voc Degree
  // ============================
  {
    id: "ra-bvoc", title: "B.Voc in Animation & Multimedia", provider: "Red Apple Learning",
    providerType: "redapple", skills: ["2D Animation", "3D Animation", "VFX", "Multimedia", "Game Art", "Video Editing"],
    careers: ["Animator", "VFX Artist", "Multimedia Designer", "Game Artist", "Video Editor"],
    domain: "Design", duration: "3 years", price: "₹3,50,000", mode: "offline", url: "#", rating: 4.9,
  },


  // ============================
  // TECHNOLOGY — Software Engineering
  // ============================
  {
    id: "ext-fullstack", title: "Full-Stack Web Dev Bootcamp", provider: "Partner Institute",
    providerType: "external", skills: ["JavaScript", "React", "Node.js", "SQL", "Git"],
    careers: ["Fullstack Developer", "Frontend Developer", "Backend Developer", "Software Engineer"],
    domain: "Technology", duration: "6 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.7,
  },
  {
    id: "ext-metafe", title: "Meta Front-End Developer", provider: "Partner Institute",
    providerType: "external", skills: ["React", "JavaScript", "HTML", "CSS"],
    careers: ["Frontend Developer", "React Developer", "UI Engineer", "Fullstack Developer"],
    domain: "Technology", duration: "7 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.7,
  },
  {
    id: "ext-mobile", title: "Meta React Native Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["React Native", "JavaScript", "Mobile Development", "REST APIs"],
    careers: ["Mobile Developer", "iOS Developer", "Android Developer", "React Developer"],
    domain: "Technology", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.6,
  },
  {
    id: "ext-cloud", title: "AWS Cloud Practitioner Essentials", provider: "Partner Institute",
    providerType: "external", skills: ["AWS", "Docker", "Kubernetes", "Linux", "Cloud Architecture"],
    careers: ["Cloud Engineer", "AWS Engineer", "Cloud Architect", "DevOps Engineer"],
    domain: "Technology", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.7,
  },
  {
    id: "ext-devops", title: "DevOps & CI/CD Certification", provider: "Partner Institute",
    providerType: "external", skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform"],
    careers: ["DevOps Engineer", "Site Reliability Engineer", "Cloud Engineer"],
    domain: "Technology", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.6,
  },
  {
    id: "ext-blockchain", title: "Blockchain Developer Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"],
    careers: ["Blockchain Developer", "Smart Contract Developer", "Web3 Developer"],
    domain: "Technology", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-sysdesign", title: "Software Architecture & Design", provider: "Partner Institute",
    providerType: "external", skills: ["System Design", "Microservices", "REST APIs", "Architecture"],
    careers: ["Software Architect", "Backend Developer", "Software Engineer", "Integration Engineer"],
    domain: "Technology", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.7,
  },

  // ============================
  // TECHNOLOGY — Data Science & AI
  // ============================
  {
    id: "ext-ibmds", title: "IBM Data Science Professional Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Python", "SQL", "Machine Learning", "Statistics", "Data Analysis"],
    careers: ["Data Scientist", "Data Analyst", "Business Analyst"],
    domain: "Data/AI", duration: "6 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.8,
  },
  {
    id: "ext-ml", title: "Machine Learning Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["Python", "TensorFlow", "Machine Learning", "Statistics"],
    careers: ["ML Engineer", "AI Engineer", "Data Scientist", "Deep Learning Engineer"],
    domain: "Data/AI", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.9,
  },
  {
    id: "ext-googledata", title: "Google Data Analytics Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["SQL", "Excel", "Tableau", "Statistics", "Python"],
    careers: ["Data Analyst", "Business Analyst", "BI Analyst", "BI Developer"],
    domain: "Data/AI", duration: "6 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.8,
  },
  {
    id: "ext-aiml", title: "AI/ML Engineering Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Python", "TensorFlow", "Deep Learning", "NLP"],
    careers: ["AI Engineer", "ML Engineer", "NLP Engineer", "AI Researcher", "Deep Learning Engineer"],
    domain: "Data/AI", duration: "5 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.7,
  },
  {
    id: "ext-nlp", title: "Natural Language Processing Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["Python", "NLP", "Transformers", "Text Analytics"],
    careers: ["NLP Engineer", "Chatbot Developer", "AI Researcher"],
    domain: "Data/AI", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.6,
  },
  {
    id: "ext-cv", title: "Computer Vision with Deep Learning", provider: "Partner Institute",
    providerType: "external", skills: ["Python", "OpenCV", "Computer Vision", "Deep Learning"],
    careers: ["Computer Vision Engineer", "Image Processing Engineer", "AI Engineer"],
    domain: "Data/AI", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.5,
  },
  {
    id: "ext-bigdata", title: "Big Data Engineering with Spark", provider: "Partner Institute",
    providerType: "external", skills: ["Apache Spark", "Hadoop", "Python", "SQL", "Data Pipelines"],
    careers: ["Big Data Engineer", "Data Architect", "Data Scientist"],
    domain: "Data/AI", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.6,
  },

  // ============================
  // TECHNOLOGY — Cybersecurity
  // ============================
  {
    id: "ext-cyber", title: "Google Cybersecurity Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Network Security", "Penetration Testing", "Incident Response", "SIEM"],
    careers: ["SOC Analyst", "Incident Responder", "Network Security Engineer", "Security Consultant"],
    domain: "Technology", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.6,
  },
  {
    id: "ext-ethicalhack", title: "Ethical Hacking & Penetration Testing", provider: "Partner Institute",
    providerType: "external", skills: ["Kali Linux", "Penetration Testing", "Network Security", "OWASP"],
    careers: ["Ethical Hacker", "Penetration Tester", "Security Consultant"],
    domain: "Technology", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.7,
  },
  {
    id: "ext-cloudsec", title: "Cloud Security Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["AWS Security", "Cloud Security", "IAM", "Compliance"],
    careers: ["Cloud Security Engineer", "Security Architect", "Firewall Engineer"],
    domain: "Technology", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-forensics", title: "Digital Forensics & Incident Response", provider: "Partner Institute",
    providerType: "external", skills: ["Digital Forensics", "Incident Response", "Evidence Analysis", "SIEM"],
    careers: ["Forensics Analyst", "Cyber Forensics Investigator", "Forensic Investigator"],
    domain: "Technology", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.4,
  },

  // ============================
  // TECHNOLOGY — Game Development
  // ============================
  {
    id: "ext-unity", title: "Unity Game Developer Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Unity", "C#", "Game Physics", "3D Modeling"],
    careers: ["Game Developer", "Unity Developer", "Gameplay Programmer"],
    domain: "Technology", duration: "6 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.6,
  },
  {
    id: "ext-unreal", title: "Unreal Engine 5 Masterclass", provider: "Partner Institute",
    providerType: "external", skills: ["Unreal Engine", "C++", "Blueprints", "Level Design"],
    careers: ["Unreal Developer", "Game Developer", "Level Designer", "World Builder"],
    domain: "Technology", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.7,
  },
  {
    id: "ext-xr", title: "AR/VR Development with Unity", provider: "Partner Institute",
    providerType: "external", skills: ["Unity", "AR", "VR", "3D Modeling", "C#"],
    careers: ["AR Developer", "VR Developer", "XR Engineer"],
    domain: "Technology", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-gamedesign", title: "Game Design & Narrative Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["Game Design", "Narrative Design", "Level Design", "Prototyping"],
    careers: ["Game Designer", "Narrative Designer", "Level Designer"],
    domain: "Technology", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },

  // ============================
  // DESIGN
  // ============================
  {
    id: "ext-uiux", title: "UI/UX Design Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["Figma", "User Research", "Prototyping", "Wireframing"],
    careers: ["UX Designer", "UI Designer", "UX Researcher", "Interaction Designer"],
    domain: "Design", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.7,
  },
  {
    id: "ext-googleux", title: "Google UX Design Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Figma", "User Research", "Prototyping", "Usability Testing"],
    careers: ["UX Designer", "UI Designer", "Product Designer", "UX Researcher"],
    domain: "Design", duration: "6 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.8,
  },
  {
    id: "ext-3d", title: "3D Asset Creation Course", provider: "Partner Institute",
    providerType: "external", skills: ["Blender", "Maya", "3D Modeling", "Texturing"],
    careers: ["3D Modeler", "3D Animator", "Game Artist", "Concept Artist", "Character Artist"],
    domain: "Design", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.6,
  },
  {
    id: "ext-graphic", title: "Graphic Design Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["Photoshop", "Illustrator", "Typography", "Layout"],
    careers: ["Graphic Designer", "Brand Designer", "Visual Designer", "Layout Artist"],
    domain: "Design", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.6,
  },
  {
    id: "ext-video", title: "Video Production (Partner Institute)", provider: "Partner Institute",
    providerType: "external", skills: ["Premiere Pro", "After Effects", "Storytelling", "Color Grading"],
    careers: ["Video Editor", "Content Creator", "Color Grader", "Post Production Artist"],
    domain: "Media", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },

  // ============================
  // FINANCE & BANKING
  // ============================
  {
    id: "ext-finance", title: "Finance & Accounting Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["Excel", "Financial Modeling", "Accounting", "Financial Analysis"],
    careers: ["Financial Analyst", "Accountant", "Chartered Accountant", "Tax Consultant"],
    domain: "Finance", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.6,
  },
  {
    id: "ext-invbank", title: "Investment Banking & Valuation", provider: "Partner Institute",
    providerType: "external", skills: ["Financial Modeling", "Valuation", "M&A", "Excel", "DCF Analysis"],
    careers: ["Investment Banker", "Equity Analyst", "Portfolio Manager", "Financial Planner"],
    domain: "Finance", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.7,
  },
  {
    id: "ext-cfa", title: "CFA Level 1 Preparation", provider: "Partner Institute",
    providerType: "external", skills: ["Financial Analysis", "Portfolio Management", "Ethics", "Fixed Income"],
    careers: ["Investment Banker", "Equity Analyst", "Portfolio Manager", "Wealth Advisor"],
    domain: "Finance", duration: "Self-paced", price: "₹4,999", mode: "online", url: "https://udemy.com", rating: 4.6,
  },
  {
    id: "ext-riskm", title: "Financial Risk Management (FRM)", provider: "Partner Institute",
    providerType: "external", skills: ["Risk Analysis", "Statistics", "Financial Modeling", "Derivatives"],
    careers: ["Risk Analyst", "Risk Manager", "Investment Banker"],
    domain: "Finance", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-finplan", title: "Financial Planning & Wealth Management", provider: "Partner Institute",
    providerType: "external", skills: ["Financial Planning", "Tax Planning", "Insurance", "Mutual Funds"],
    careers: ["Financial Planner", "Wealth Advisor", "Tax Consultant", "Tax Advisor"],
    domain: "Finance", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-fintech", title: "FinTech: Finance & Technology", provider: "Partner Institute",
    providerType: "external", skills: ["Blockchain", "Digital Payments", "Python", "Financial APIs"],
    careers: ["Fintech Developer", "Product Manager Fintech"],
    domain: "Finance", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },
  {
    id: "ext-banking", title: "Retail Banking Operations", provider: "Partner Institute",
    providerType: "external", skills: ["Banking Operations", "KYC", "Compliance", "Customer Relations"],
    careers: ["Bank Manager", "Relationship Manager"],
    domain: "Finance", duration: "Self-paced", price: "₹2,499", mode: "online", url: "https://udemy.com", rating: 4.3,
  },
  {
    id: "ext-audit", title: "Auditing & Assurance Fundamentals", provider: "Partner Institute",
    providerType: "external", skills: ["Auditing", "Internal Controls", "Compliance", "Excel"],
    careers: ["Auditor", "Internal Auditor", "Chartered Accountant"],
    domain: "Finance", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },
  {
    id: "ext-insurance", title: "Insurance & Actuarial Science", provider: "Partner Institute",
    providerType: "external", skills: ["Actuarial Science", "Risk Assessment", "Statistics", "Insurance"],
    careers: ["Actuary", "Actuarial Analyst", "Underwriter", "Risk Assessor", "Claims Manager"],
    domain: "Finance", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.3,
  },

  // ============================
  // MARKETING
  // ============================
  {
    id: "ext-digimkt", title: "Digital Marketing Nanodegree", provider: "Udacity",
    providerType: "external", skills: ["SEO", "Google Ads", "Content Marketing", "Social Media", "Analytics"],
    careers: ["Digital Marketer", "SEO Specialist", "Social Media Manager", "Content Strategist"],
    domain: "Marketing", duration: "3 months", price: "₹15,000", mode: "online", url: "https://udacity.com", rating: 4.5,
  },
  {
    id: "ext-seo", title: "Advanced SEO Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["SEO", "Google Analytics", "Keyword Research", "Technical SEO"],
    careers: ["SEO Specialist", "SEO Analyst", "Digital Marketer"],
    domain: "Marketing", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-perfmkt", title: "Performance Marketing & Growth", provider: "Partner Institute",
    providerType: "external", skills: ["Google Ads", "Facebook Ads", "A/B Testing", "Analytics"],
    careers: ["Performance Marketer", "Growth Hacker", "Growth Marketer"],
    domain: "Marketing", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.5,
  },
  {
    id: "ext-socialmedia", title: "Social Media Marketing Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Social Media", "Content Strategy", "Community Management", "Analytics"],
    careers: ["Social Media Manager", "Community Manager", "Content Creator", "Influencer"],
    domain: "Marketing", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-contentmkt", title: "Content Marketing Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["Content Marketing", "Copywriting", "SEO", "Storytelling"],
    careers: ["Content Strategist", "Content Marketer", "Copywriter", "Content Writer"],
    domain: "Marketing", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },
  {
    id: "ext-brand", title: "Brand Management & Strategy", provider: "Partner Institute",
    providerType: "external", skills: ["Branding", "Market Research", "Strategy", "Communication"],
    careers: ["Brand Strategist", "Brand Designer", "Marketing Analyst"],
    domain: "Marketing", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },

  // ============================
  // LAW
  // ============================
  {
    id: "ext-corplaw", title: "Corporate Law & Governance", provider: "Partner Institute",
    providerType: "external", skills: ["Corporate Law", "Compliance", "Contract Drafting", "Governance"],
    careers: ["Corporate Lawyer", "Legal Advisor", "Compliance Officer"],
    domain: "Law", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-iplaw", title: "Intellectual Property Law", provider: "Partner Institute",
    providerType: "external", skills: ["IP Law", "Patent Filing", "Trademark", "Copyright"],
    careers: ["IP Lawyer", "Patent Attorney"],
    domain: "Law", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },
  {
    id: "ext-cyberlaw", title: "Cyber Law & Digital Privacy", provider: "Partner Institute",
    providerType: "external", skills: ["Cyber Law", "Data Privacy", "GDPR", "IT Act"],
    careers: ["Cyber Lawyer", "Legal Tech Consultant"],
    domain: "Law", duration: "Self-paced", price: "₹2,499", mode: "online", url: "https://udemy.com", rating: 4.3,
  },
  {
    id: "ext-litigation", title: "Litigation & Trial Advocacy", provider: "Partner Institute",
    providerType: "external", skills: ["Litigation", "Legal Research", "Oral Advocacy", "Case Analysis"],
    careers: ["Litigator", "Trial Lawyer"],
    domain: "Law", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },

  // ============================
  // HEALTHCARE & MEDICAL
  // ============================
  {
    id: "ext-healthcare", title: "Healthcare Management Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Operations", "Compliance", "Communication", "Healthcare Policy"],
    careers: ["Healthcare Administrator", "Hospital Manager", "Public Health Officer"],
    domain: "Healthcare", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },
  {
    id: "ext-clinres", title: "Clinical Research & Trials", provider: "Partner Institute",
    providerType: "external", skills: ["Clinical Trials", "Biostatistics", "Regulatory Affairs", "GCP"],
    careers: ["Clinical Researcher", "Research Associate", "Pharma Researcher"],
    domain: "Healthcare", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-pubhealth", title: "Public Health & Epidemiology", provider: "Partner Institute",
    providerType: "external", skills: ["Epidemiology", "Biostatistics", "Public Health", "Data Analysis"],
    careers: ["Epidemiologist", "Public Health Officer"],
    domain: "Healthcare", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-pharma", title: "Pharmaceutical Sciences & Drug Development", provider: "Partner Institute",
    providerType: "external", skills: ["Drug Development", "Pharmacology", "Regulatory Affairs", "GMP"],
    careers: ["Pharma Researcher", "Drug Development Scientist", "Regulatory Affairs Specialist"],
    domain: "Healthcare", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },

  // ============================
  // ENGINEERING (Non-Software)
  // ============================
  {
    id: "ext-mecheng", title: "Mechanical Engineering Fundamentals", provider: "Partner Institute",
    providerType: "external", skills: ["CAD", "SolidWorks", "Thermodynamics", "Manufacturing"],
    careers: ["Mechanical Engineer", "Design Engineer", "Manufacturing Engineer"],
    domain: "Engineering", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-civileng", title: "Civil Engineering & Structural Analysis", provider: "Partner Institute",
    providerType: "external", skills: ["AutoCAD", "Structural Analysis", "Project Management", "BIM"],
    careers: ["Civil Engineer", "Structural Engineer", "Site Engineer"],
    domain: "Engineering", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },
  {
    id: "ext-eleceng", title: "Electrical & Electronics Engineering", provider: "Partner Institute",
    providerType: "external", skills: ["Circuit Design", "MATLAB", "Power Systems", "PCB Design"],
    careers: ["Electrical Engineer", "Power Systems Engineer", "Electronics Engineer", "Embedded Systems Engineer"],
    domain: "Engineering", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },
  {
    id: "ext-robotics", title: "Robotics & Automation Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["ROS", "Python", "Computer Vision", "Automation", "PLC"],
    careers: ["Robotics Engineer", "Automation Engineer"],
    domain: "Engineering", duration: "5 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.6,
  },
  {
    id: "ext-aeroeng", title: "Aerospace Engineering Essentials", provider: "Partner Institute",
    providerType: "external", skills: ["Aerodynamics", "Flight Mechanics", "MATLAB", "Propulsion"],
    careers: ["Aerospace Engineer", "Flight Test Engineer"],
    domain: "Engineering", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },

  // ============================
  // HOSPITALITY & TOURISM
  // ============================
  {
    id: "ext-hotelmgmt", title: "Hotel Management & Operations", provider: "Partner Institute",
    providerType: "external", skills: ["Hospitality", "Guest Relations", "Operations", "Revenue Management"],
    careers: ["Hotel Manager", "Front Office Manager", "Event Manager", "Concierge Manager"],
    domain: "Hospitality", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },
  {
    id: "ext-culinary", title: "Culinary Arts & Food Science", provider: "Partner Institute",
    providerType: "external", skills: ["Culinary Arts", "Food Safety", "Menu Planning", "Kitchen Management"],
    careers: ["Chef", "Pastry Chef", "F&B Manager", "Restaurant Manager"],
    domain: "Hospitality", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.3,
  },
  {
    id: "ext-eventmgmt", title: "Event Management & Planning", provider: "Partner Institute",
    providerType: "external", skills: ["Event Planning", "Budgeting", "Vendor Management", "Marketing"],
    careers: ["Event Manager", "Event Coordinator"],
    domain: "Hospitality", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.3,
  },
  {
    id: "ext-tourism", title: "Travel & Tourism Management", provider: "Partner Institute",
    providerType: "external", skills: ["Tourism Management", "Customer Service", "Itinerary Planning", "GDS"],
    careers: ["Travel Consultant", "Tour Operator"],
    domain: "Hospitality", duration: "Self-paced", price: "₹2,499", mode: "online", url: "https://udemy.com", rating: 4.2,
  },
  {
    id: "ext-aviation", title: "Aviation & Cabin Crew Training", provider: "Partner Institute",
    providerType: "external", skills: ["Customer Service", "Safety Procedures", "Communication", "Grooming"],
    careers: ["Air Hostess", "Cabin Crew", "Ground Staff"],
    domain: "Hospitality", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.3,
  },

  // ============================
  // BUSINESS & MANAGEMENT
  // ============================
  {
    id: "ext-prodmgmt", title: "Product Management Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
    careers: ["Product Manager", "Product Owner", "Product Manager Fintech"],
    domain: "Business", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.7,
  },
  {
    id: "ext-projmgmt", title: "Google Project Management Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Project Management", "Agile", "Scrum", "Stakeholder Management"],
    careers: ["Operations Manager", "Supply Chain Manager", "Program Coordinator"],
    domain: "Business", duration: "6 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.8,
  },
  {
    id: "ext-hr", title: "Human Resource Management", provider: "Partner Institute",
    providerType: "external", skills: ["Talent Acquisition", "HR Analytics", "Labor Law", "HRIS"],
    careers: ["HR Manager", "Talent Acquisition Specialist", "HR Consultant"],
    domain: "Business", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-consulting", title: "Management Consulting Specialization", provider: "Partner Institute",
    providerType: "external", skills: ["Strategy", "Business Analysis", "Frameworks", "Presentation"],
    careers: ["Management Consultant", "Strategy Analyst", "International Business Consultant"],
    domain: "Business", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.6,
  },
  {
    id: "ext-supplychain", title: "Supply Chain Management", provider: "Partner Institute",
    providerType: "external", skills: ["Logistics", "Procurement", "Inventory Management", "ERP"],
    careers: ["Logistics Manager", "Supply Chain Analyst", "Procurement Manager", "Warehouse Manager"],
    domain: "Business", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-ecomm", title: "E-Commerce & Marketplace Strategy", provider: "Partner Institute",
    providerType: "external", skills: ["E-Commerce", "Digital Marketing", "Analytics", "Marketplace Ops"],
    careers: ["Ecommerce Manager", "Marketplace Analyst", "Store Manager"],
    domain: "Business", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.4,
  },
  {
    id: "ext-intlbiz", title: "International Business & Trade", provider: "Partner Institute",
    providerType: "external", skills: ["Global Trade", "Export Management", "Compliance", "Strategy"],
    careers: ["Trade Compliance Officer", "Export Manager", "International Business Consultant", "Global Strategy Analyst"],
    domain: "Business", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },

  // ============================
  // EDUCATION & E-LEARNING
  // ============================
  {
    id: "ext-elearning", title: "E-Learning Design Certificate", provider: "Partner Institute",
    providerType: "external", skills: ["Articulate", "Instructional Design", "Communication"],
    careers: ["E-Learning Designer", "Curriculum Designer"],
    domain: "Education", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.3,
  },
  {
    id: "ext-edtech", title: "EdTech & Curriculum Design", provider: "Partner Institute",
    providerType: "external", skills: ["Instructional Design", "EdTech Tools", "Pedagogy", "Assessment Design"],
    careers: ["Curriculum Designer", "Training Developer", "Professor", "Lecturer"],
    domain: "Education", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },

  // ============================
  // PSYCHOLOGY & COUNSELING
  // ============================
  {
    id: "ext-psychology", title: "Psychology & Mental Health", provider: "Partner Institute",
    providerType: "external", skills: ["Counseling", "CBT", "Psychometrics", "Assessment"],
    careers: ["Clinical Psychologist", "Therapist", "Counselor", "Guidance Counselor"],
    domain: "Psychology", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-orgpsych", title: "Organizational Psychology & HR", provider: "Partner Institute",
    providerType: "external", skills: ["Organizational Behavior", "HR Analytics", "Team Dynamics", "Leadership"],
    careers: ["Organizational Psychologist", "HR Consultant", "HR Manager"],
    domain: "Psychology", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },

  // ============================
  // SCIENCES & RESEARCH
  // ============================
  {
    id: "ext-biotech", title: "Biotechnology & Genetic Engineering", provider: "Partner Institute",
    providerType: "external", skills: ["Molecular Biology", "Bioinformatics", "CRISPR", "Lab Techniques"],
    careers: ["Biotech Researcher", "Genetic Engineer", "Bioinformatics Analyst", "Computational Biologist"],
    domain: "Sciences", duration: "5 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-envscience", title: "Environmental Science & Sustainability", provider: "Partner Institute",
    providerType: "external", skills: ["Environmental Impact", "Sustainability", "GIS", "Climate Science"],
    careers: ["Environmental Consultant", "Sustainability Analyst", "Sustainability Manager", "Conservation Officer"],
    domain: "Sciences", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },
  {
    id: "ext-agri", title: "Agricultural Science & Agribusiness", provider: "Partner Institute",
    providerType: "external", skills: ["Agronomy", "Farm Management", "Soil Science", "AgriTech"],
    careers: ["Agricultural Scientist", "Agronomist", "Agri Business Manager", "Farm Manager"],
    domain: "Sciences", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.3,
  },
  {
    id: "ext-foodtech", title: "Food Technology & Safety", provider: "Partner Institute",
    providerType: "external", skills: ["Food Processing", "HACCP", "Quality Control", "Food Safety"],
    careers: ["Food Technologist", "Food Engineer", "QA Manager", "Food Safety Officer"],
    domain: "Sciences", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.3,
  },

  // ============================
  // SPORTS & FITNESS
  // ============================
  {
    id: "ext-sportsmgmt", title: "Sports Management & Coaching", provider: "Partner Institute",
    providerType: "external", skills: ["Sports Management", "Coaching", "Fitness Training", "Nutrition"],
    careers: ["Sports Coach", "Fitness Trainer", "Sports Manager", "Sports Agent", "Wellness Coach"],
    domain: "Sports", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },

  // ============================
  // MEDIA & CONTENT
  // ============================
  {
    id: "ext-journalism", title: "Journalism & News Reporting", provider: "Partner Institute",
    providerType: "external", skills: ["News Writing", "Investigative Journalism", "Media Ethics", "Editing"],
    careers: ["Journalist", "Reporter", "Editor", "News Anchor"],
    domain: "Media", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-podcast", title: "Podcasting & Audio Production", provider: "Partner Institute",
    providerType: "external", skills: ["Audio Editing", "Storytelling", "Audio Engineering", "Distribution"],
    careers: ["Podcast Producer", "Audio Engineer"],
    domain: "Media", duration: "Self-paced", price: "₹2,499", mode: "online", url: "https://udemy.com", rating: 4.3,
  },
  {
    id: "ext-screenwriting", title: "Screenwriting & Scriptwriting", provider: "Partner Institute",
    providerType: "external", skills: ["Screenwriting", "Story Structure", "Dialogue", "Script Analysis"],
    careers: ["Scriptwriter", "Screenwriter", "Content Writer"],
    domain: "Media", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },

  // ============================
  // ARCHITECTURE & INTERIOR
  // ============================
  {
    id: "ext-arch", title: "Architecture & Urban Planning", provider: "Partner Institute",
    providerType: "external", skills: ["AutoCAD", "Revit", "Urban Design", "BIM"],
    careers: ["Architect", "Architectural Designer", "Urban Planner", "City Planner"],
    domain: "Architecture", duration: "5 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
  {
    id: "ext-interior", title: "Interior Design Fundamentals", provider: "Partner Institute",
    providerType: "external", skills: ["SketchUp", "Space Planning", "Color Theory", "AutoCAD"],
    careers: ["Interior Stylist", "Space Planner"],
    domain: "Architecture", duration: "Self-paced", price: "₹3,499", mode: "online", url: "https://udemy.com", rating: 4.3,
  },

  // ============================
  // FASHION
  // ============================
  {
    id: "ext-fashion", title: "Fashion Design & Merchandising", provider: "Partner Institute",
    providerType: "external", skills: ["Fashion Illustration", "Textile Design", "Trend Forecasting", "Merchandising"],
    careers: ["Fashion Stylist", "Textile Designer", "Fashion Merchandiser"],
    domain: "Fashion", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.3,
  },

  // ============================
  // DEFENCE & SECURITY
  // ============================
  {
    id: "ext-defence", title: "Defence Studies & Strategic Analysis", provider: "Partner-Institute",
    providerType: "external", skills: ["Strategic Analysis", "Geopolitics", "Security Studies", "Leadership"],
    careers: ["Defence Officer", "Military Strategist", "Defence Analyst", "Security Consultant"],
    domain: "Defence", duration: "Self-paced", price: "₹2,499", mode: "online", url: "https://udemy.com", rating: 4.2,
  },

  // ============================
  // ARTS & CULTURE
  // ============================
  {
    id: "ext-finearts", title: "Fine Arts & Creative Expression", provider: "Partner Institute",
    providerType: "external", skills: ["Drawing", "Painting", "Art History", "Composition"],
    careers: ["Painter", "Visual Artist", "Sculptor", "Art Curator"],
    domain: "Arts", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.3,
  },
  {
    id: "ext-museum", title: "Museum Studies & Art Curation", provider: "Partner Institute",
    providerType: "external", skills: ["Art Curation", "Exhibition Design", "Art History", "Conservation"],
    careers: ["Art Curator", "Gallery Manager"],
    domain: "Arts", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.3,
  },

  // ============================
  // POLITICAL SCIENCE & PUBLIC ADMIN
  // ============================
  {
    id: "ext-publicpolicy", title: "Public Policy & Administration", provider: "Partner Institute",
    providerType: "external", skills: ["Policy Analysis", "Public Administration", "Research", "Data Analysis"],
    careers: ["Policy Analyst", "Public Policy Researcher", "Public Health Officer"],
    domain: "Government", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.4,
  },

  // ============================
  // SOCIAL SCIENCES & NGO
  // ============================
  {
    id: "ext-ngo", title: "NGO Management & Social Impact", provider: "Partner Institute",
    providerType: "external", skills: ["Program Management", "Fundraising", "Impact Assessment", "Community Dev"],
    careers: ["NGO Manager", "Program Coordinator", "Community Organizer", "NGO Worker"],
    domain: "Social", duration: "3 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.3,
  },

  // ============================
  // ECONOMICS & RESEARCH
  // ============================
  {
    id: "ext-economics", title: "Economics & Econometrics", provider: "Partner Institute",
    providerType: "external", skills: ["Econometrics", "Statistics", "R", "Microeconomics"],
    careers: ["Economist", "Research Analyst"],
    domain: "Economics", duration: "4 months", price: "Free", mode: "online", url: "https://Partner Institute.org", rating: 4.5,
  },
];

// ============================
// RECOMMENDATION ENGINE
// ============================

export type CourseRecommendation = {
  primary: Course[];
  secondary: Course[];
};

export function getRecommendedCourses(skillGaps: string[], domain: string, careerRole?: string): Course[] {
  const { primary, secondary } = getSegmentedRecommendations(skillGaps, domain, careerRole);
  return [...primary, ...secondary];
}

export function getSegmentedRecommendations(skillGaps: string[], domain: string, careerRole?: string, availableCourses: Course[] = courses): CourseRecommendation {
  const scored = availableCourses.map(course => {
    const matchingSkills = course.skills.filter(s => skillGaps.includes(s));
    const skillScore = matchingSkills.length;
    const careerMatch = careerRole && course.careers.includes(careerRole) ? 10 : 0;
    const providerBoost = course.providerType === "redapple" ? 3 : 0; // Red Apple priority per PDF
    return { course, score: skillScore + careerMatch + providerBoost, careerMatch, matchingSkills };
  });

  // Primary: courses that directly match the career role
  const primary = scored
    .filter(s => s.careerMatch > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.course);

  // Secondary: courses that match skills but NOT the career role
  const primaryIds = new Set(primary.map(c => c.id));
  const secondary = scored
    .filter(s => s.careerMatch === 0 && s.matchingSkills.length > 0 && !primaryIds.has(s.course.id))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6) // limit secondary suggestions
    .map(s => s.course);

  return { primary, secondary };
}
