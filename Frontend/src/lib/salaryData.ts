// Average salary data (Entry / Mid / Senior) by career role — India market (INR LPA)
// Source-aligned with industry benchmarks for the Indian job market

export type SalaryTier = { entry: string; mid: string; senior: string };

// Comprehensive salary map keyed by career role name (case-insensitive lookup)
const salaryMap: Record<string, SalaryTier> = {
  // Technology
  "software developer": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–45 LPA" },
  "full-stack developer": { entry: "₹5–9 LPA", mid: "₹12–22 LPA", senior: "₹25–50 LPA" },
  "frontend developer": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "backend developer": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–45 LPA" },
  "mobile developer": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },
  "devops engineer": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "cloud engineer": { entry: "₹5–10 LPA", mid: "₹14–28 LPA", senior: "₹30–60 LPA" },
  "qa/test engineer": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–30 LPA" },
  "security analyst": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "cybersecurity analyst": { entry: "₹4–9 LPA", mid: "₹12–24 LPA", senior: "₹28–55 LPA" },
  "network engineer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "systems administrator": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–30 LPA" },
  "database administrator": { entry: "₹4–7 LPA", mid: "₹9–18 LPA", senior: "₹20–38 LPA" },
  "site reliability engineer": { entry: "₹6–12 LPA", mid: "₹15–28 LPA", senior: "₹30–60 LPA" },
  "embedded systems engineer": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "blockchain developer": { entry: "₹5–10 LPA", mid: "₹14–28 LPA", senior: "₹30–60 LPA" },
  "solutions architect": { entry: "₹8–15 LPA", mid: "₹18–35 LPA", senior: "₹40–80 LPA" },
  "technical writer": { entry: "₹3–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },
  "iot developer": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },

  // Data / AI
  "data scientist": { entry: "₹6–12 LPA", mid: "₹15–30 LPA", senior: "₹35–70 LPA" },
  "data analyst": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–38 LPA" },
  "data engineer": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "ai/ml engineer": { entry: "₹6–12 LPA", mid: "₹16–32 LPA", senior: "₹35–75 LPA" },
  "machine learning engineer": { entry: "₹6–12 LPA", mid: "₹16–32 LPA", senior: "₹35–70 LPA" },
  "nlp engineer": { entry: "₹6–12 LPA", mid: "₹15–28 LPA", senior: "₹30–60 LPA" },
  "computer vision engineer": { entry: "₹6–12 LPA", mid: "₹15–28 LPA", senior: "₹30–60 LPA" },
  "business intelligence analyst": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },
  "ai researcher": { entry: "₹8–15 LPA", mid: "₹18–35 LPA", senior: "₹40–80 LPA" },
  "deep learning engineer": { entry: "₹7–14 LPA", mid: "₹16–30 LPA", senior: "₹35–65 LPA" },
  "big data engineer": { entry: "₹5–10 LPA", mid: "₹14–28 LPA", senior: "₹30–55 LPA" },
  "statistician": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },

  // Design
  "ux designer": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "ui designer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "graphic designer": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },
  "product designer": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–50 LPA" },
  "interaction designer": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },
  "motion graphics designer": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–30 LPA" },
  "3d modeler": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "video editor": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–28 LPA" },
  "visual designer": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–30 LPA" },
  "brand designer": { entry: "₹3–6 LPA", mid: "₹8–16 LPA", senior: "₹18–35 LPA" },
  "ux researcher": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },
  "design lead": { entry: "₹8–15 LPA", mid: "₹18–30 LPA", senior: "₹32–55 LPA" },

  // Business & Finance
  "product manager": { entry: "₹8–15 LPA", mid: "₹18–35 LPA", senior: "₹40–80 LPA" },
  "business analyst": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },
  "digital marketer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "financial analyst": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "investment banker": { entry: "₹8–15 LPA", mid: "₹20–45 LPA", senior: "₹50–1.2 Cr" },
  "management consultant": { entry: "₹8–15 LPA", mid: "₹18–40 LPA", senior: "₹45–1 Cr" },
  "chartered accountant": { entry: "₹6–10 LPA", mid: "₹12–25 LPA", senior: "₹28–60 LPA" },
  "content writer": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },
  "content strategist": { entry: "₹4–7 LPA", mid: "₹8–16 LPA", senior: "₹18–32 LPA" },
  "seo specialist": { entry: "₹2.5–5 LPA", mid: "₹6–14 LPA", senior: "₹16–30 LPA" },
  "social media manager": { entry: "₹2.5–5 LPA", mid: "₹6–14 LPA", senior: "₹16–28 LPA" },
  "market research analyst": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–38 LPA" },
  "hr manager": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "supply chain manager": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "operations manager": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "project manager": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "sales manager": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "equity research analyst": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "wealth manager": { entry: "₹5–10 LPA", mid: "₹14–28 LPA", senior: "₹30–65 LPA" },
  "actuary": { entry: "₹8–15 LPA", mid: "₹18–35 LPA", senior: "₹40–80 LPA" },
  "risk analyst": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–50 LPA" },
  "tax consultant": { entry: "₹4–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "corporate lawyer": { entry: "₹6–12 LPA", mid: "₹15–30 LPA", senior: "₹35–75 LPA" },
  "public relations manager": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "event manager": { entry: "₹2.5–5 LPA", mid: "₹6–14 LPA", senior: "₹16–30 LPA" },

  // Healthcare
  "healthcare admin": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "clinical researcher": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "pharmacist": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "biomedical engineer": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "medical coder": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },
  "nutritionist": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },
  "physiotherapist": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–32 LPA" },
  "health data analyst": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },
  "hospital administrator": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "public health specialist": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },

  // Education
  "e-learning designer": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },
  "instructional designer": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–28 LPA" },
  "education consultant": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "curriculum developer": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–28 LPA" },
  "academic researcher": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },
  "edtech product manager": { entry: "₹6–12 LPA", mid: "₹15–28 LPA", senior: "₹30–55 LPA" },

  // Engineering
  "mechanical engineer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–38 LPA" },
  "civil engineer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–38 LPA" },
  "electrical engineer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–38 LPA" },
  "chemical engineer": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–45 LPA" },
  "aerospace engineer": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "robotics engineer": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "automation engineer": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },
  "structural engineer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–38 LPA" },
  "environmental engineer": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "materials engineer": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–38 LPA" },
  "industrial engineer": { entry: "₹3.5–7 LPA", mid: "₹8–16 LPA", senior: "₹18–35 LPA" },

  // Game Development
  "game designer": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "gameplay programmer": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "ar/vr developer": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "game artist": { entry: "₹2.5–5 LPA", mid: "₹6–14 LPA", senior: "₹16–32 LPA" },
  "level designer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "technical artist": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },

  // Animation & VFX
  "2d animator": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–28 LPA" },
  "3d animator": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "vfx artist": { entry: "₹3–6 LPA", mid: "₹7–16 LPA", senior: "₹18–38 LPA" },
  "compositor": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "rigging artist": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–32 LPA" },
  "storyboard artist": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },

  // Media & Communications
  "journalist": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "broadcast producer": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "documentary filmmaker": { entry: "₹2.5–5 LPA", mid: "₹6–14 LPA", senior: "₹16–35 LPA" },
  "podcast producer": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–28 LPA" },
  "media planner": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–32 LPA" },
  "advertising manager": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "copywriter": { entry: "₹2.5–5 LPA", mid: "₹6–14 LPA", senior: "₹16–30 LPA" },

  // Law
  "litigation lawyer": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–60 LPA" },
  "intellectual property lawyer": { entry: "₹6–12 LPA", mid: "₹15–30 LPA", senior: "₹35–70 LPA" },
  "cyber law consultant": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "legal analyst": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },
  "compliance officer": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "paralegal": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },
  "company secretary": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },

  // Hospitality
  "hotel manager": { entry: "₹3–6 LPA", mid: "₹7–16 LPA", senior: "₹18–38 LPA" },
  "food & beverage manager": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "travel consultant": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },
  "chef": { entry: "₹2.5–5 LPA", mid: "₹6–14 LPA", senior: "₹16–35 LPA" },
  "resort manager": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–42 LPA" },

  // Sustainability & Green Tech
  "sustainability consultant": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "renewable energy engineer": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–45 LPA" },
  "climate analyst": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },
  "esg analyst": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "green building consultant": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },

  // Fintech
  "fintech product manager": { entry: "₹8–15 LPA", mid: "₹18–35 LPA", senior: "₹40–75 LPA" },
  "payment systems engineer": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "quantitative analyst": { entry: "₹8–15 LPA", mid: "₹18–40 LPA", senior: "₹45–90 LPA" },
  "algorithmic trader": { entry: "₹8–15 LPA", mid: "₹20–45 LPA", senior: "₹50–1 Cr" },

  // Architecture & Urban Planning
  "architect": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–45 LPA" },
  "urban planner": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },
  "interior designer": { entry: "₹2.5–5 LPA", mid: "₹6–14 LPA", senior: "₹16–35 LPA" },
  "landscape architect": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "bim specialist": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },

  // Agriculture & AgriTech
  "agri data scientist": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–50 LPA" },
  "precision agriculture specialist": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },
  "food technologist": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "agricultural engineer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "farm manager": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–30 LPA" },

  // Biotechnology & Pharma
  "biotechnologist": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–42 LPA" },
  "bioinformatics scientist": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "pharmaceutical scientist": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "quality assurance (pharma)": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "regulatory affairs specialist": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },
  "drug safety associate": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–38 LPA" },

  // Social Sciences & Psychology
  "psychologist": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "counselor": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–28 LPA" },
  "sociologist": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–30 LPA" },
  "policy analyst": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "social worker": { entry: "₹2.5–5 LPA", mid: "₹6–12 LPA", senior: "₹14–25 LPA" },
  "ux researcher (psychology)": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },

  // Robotics & IoT
  "robotics engineer (industrial)": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "iot solutions architect": { entry: "₹6–12 LPA", mid: "₹15–30 LPA", senior: "₹35–65 LPA" },
  "drone engineer": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },
  "plc programmer": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },

  // Transport & Logistics
  "logistics manager": { entry: "₹3.5–7 LPA", mid: "₹8–18 LPA", senior: "₹20–40 LPA" },
  "transport planner": { entry: "₹3.5–7 LPA", mid: "₹8–16 LPA", senior: "₹18–35 LPA" },
  "fleet manager": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "aviation manager": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },

  // Miscellaneous / Niche
  "technical recruiter": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–32 LPA" },
  "scrum master": { entry: "₹6–12 LPA", mid: "₹15–28 LPA", senior: "₹30–55 LPA" },
  "customer success manager": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–40 LPA" },
  "growth hacker": { entry: "₹4–8 LPA", mid: "₹10–22 LPA", senior: "₹25–50 LPA" },
  "ethical hacker": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "penetration tester": { entry: "₹5–10 LPA", mid: "₹12–25 LPA", senior: "₹28–55 LPA" },
  "forensic investigator": { entry: "₹4–8 LPA", mid: "₹10–20 LPA", senior: "₹22–42 LPA" },
  "museum curator": { entry: "₹3–6 LPA", mid: "₹7–14 LPA", senior: "₹16–30 LPA" },
  "fashion designer": { entry: "₹2.5–5 LPA", mid: "₹6–14 LPA", senior: "₹16–35 LPA" },
  "sports analyst": { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" },
  "voice artist": { entry: "₹2–4 LPA", mid: "₹5–12 LPA", senior: "₹14–28 LPA" },
};

/**
 * Look up salary tiers for a career role name.
 * Uses fuzzy matching: lowercased, trimmed.
 * Falls back to a reasonable generic range if not found.
 */
export function getSalaryForRole(roleName: string): SalaryTier {
  const key = roleName.trim().toLowerCase();
  if (salaryMap[key]) return salaryMap[key];

  // Partial match fallback
  const partial = Object.keys(salaryMap).find(k => key.includes(k) || k.includes(key));
  if (partial) return salaryMap[partial];

  return { entry: "₹3–6 LPA", mid: "₹7–15 LPA", senior: "₹18–35 LPA" };
}
