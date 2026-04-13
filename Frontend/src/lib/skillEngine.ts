// Skill Engine v2.0.0 — Comprehensive Skill Engine with CPS Integration, Scoring, and Recruiter Visibility
// Deterministic, rule-based — no AI dependency (AI module hooks are structural placeholders)

// ═══════════════════════════════════════════════════════════════
// PART 1: Skills Taxonomy (role → core/tools/advanced)
// ═══════════════════════════════════════════════════════════════

export interface SkillTaxonomy {
    core: string[];
    tools: string[];
    advanced: string[];
}

export const skillsTaxonomy: Record<string, SkillTaxonomy> = {
    // ── Technology & IT ──
    "Software Engineer": {
        core: ["Data Structures", "Algorithms", "Object-Oriented Programming"],
        tools: ["Java", "Python", "Git", "Docker"],
        advanced: ["System Design", "Microservices", "Cloud Architecture"],
    },
    "Frontend Developer": {
        core: ["DOM Manipulation", "Responsive Design", "Web Accessibility"],
        tools: ["React.js", "JavaScript/TypeScript", "CSS/SASS", "Webpack"],
        advanced: ["State Management", "Server-Side Rendering (SSR)", "WebGL"],
    },
    "Backend Developer": {
        core: ["Database Management", "API Design", "Authentication/Authorization"],
        tools: ["Node.js", "PostgreSQL", "MongoDB", "Redis"],
        advanced: ["Distributed Systems", "Message Queues", "GraphQL"],
    },
    "Full Stack Developer": {
        core: ["Client-Server Architecture", "RESTful APIs", "Database Design"],
        tools: ["MERN/MEAN Stack", "Git", "Postman", "Linux"],
        advanced: ["CI/CD pipelines", "Application Scaling", "Infrastructure as Code"],
    },
    "Mobile App Developer": {
        core: ["Mobile UI/UX Principles", "App Lifecycle", "State Management"],
        tools: ["Flutter", "React Native", "Swift", "Kotlin"],
        advanced: ["Native Modules", "Offline Sync", "Memory Profiling"],
    },
    "QA Engineer": {
        core: ["Test Planning", "Defect Tracking", "Manual Testing"],
        tools: ["Selenium", "Jira", "Postman", "Cypress"],
        advanced: ["Automated Test Scripts", "Performance Testing", "Security Testing"],
    },
    "DevOps Engineer": {
        core: ["Continuous Integration", "Continuous Deployment", "Networking Basics"],
        tools: ["Jenkins", "Docker", "Kubernetes", "Ansible"],
        advanced: ["Infrastructure as Code (Terraform)", "Site Reliability", "FinOps"],
    },
    "System Administrator": {
        core: ["Hardware Management", "Network Configuration", "Troubleshooting"],
        tools: ["Linux/Unix", "Windows Server", "Active Directory", "Bash/PowerShell"],
        advanced: ["Disaster Recovery", "Advanced Shell Scripting", "Virtualization"],
    },
    "Cloud Engineer": {
        core: ["Cloud Computing Models", "Storage Solutions", "Identity Management"],
        tools: ["AWS", "Azure", "Google Cloud Platform", "Terraform"],
        advanced: ["Serverless Architecture", "Cloud Security", "Cost Optimization"],
    },
    "IT Support Engineer": {
        core: ["Troubleshooting", "Customer Service", "Hardware Diagnostics"],
        tools: ["Ticketing Systems (ServiceNow)", "Remote Desktop Tools", "OS Administration"],
        advanced: ["Network Diagnostics", "ITIL Framework", "Automated Provisioning"],
    },

    // ── Data & AI ──
    "Data Analyst": {
        core: ["Statistical Analysis", "Data Cleaning", "Data Storytelling"],
        tools: ["Excel", "SQL", "Tableau", "Power BI"],
        advanced: ["A/B Testing", "Predictive Modeling", "Python/Pandas"],
    },
    "Data Scientist": {
        core: ["Probability & Statistics", "Machine Learning Basics", "Hypothesis Testing"],
        tools: ["Python", "R", "Jupyter", "Scikit-Learn"],
        advanced: ["Deep Learning", "NLP", "Time Series Analysis"],
    },
    "Machine Learning Engineer": {
        core: ["Algorithm Optimization", "Data Pipelines", "Model Evaluation"],
        tools: ["TensorFlow", "PyTorch", "MLflow", "CUDA"],
        advanced: ["Model Deployment (MLOps)", "Neural Network Architecture", "Distributed Training"],
    },
    "AI Engineer": {
        core: ["Cognitive Computing", "Logic Programming", "Search Algorithms"],
        tools: ["OpenAI API", "Hugging Face", "LangChain", "Python"],
        advanced: ["Generative AI", "LLM Fine-tuning", "Reinforcement Learning"],
    },
    "Data Engineer": {
        core: ["ETL Processes", "Data Warehousing", "Database Architecture"],
        tools: ["Apache Spark", "Hadoop", "Snowflake", "Airflow"],
        advanced: ["Real-time Data Streaming (Kafka)", "Data Lake Architecture", "Data Governance"],
    },
    "Business Analyst": {
        core: ["Requirements Gathering", "Process Mapping", "Stakeholder Management"],
        tools: ["Jira", "Confluence", "Visio", "Excel"],
        advanced: ["Financial Modeling", "Agile Methodologies", "Enterprise Architecture"],
    },

    // ── Cybersecurity ──
    "Cybersecurity Analyst": {
        core: ["Threat Intelligence", "Vulnerability Assessment", "Risk Management"],
        tools: ["Wireshark", "Nmap", "SIEM Tools", "Nessus"],
        advanced: ["Incident Response", "Forensics", "Malware Analysis"],
    },
    "Information Security Analyst": {
        core: ["Security Auditing", "Compliance Frameworks", "Access Control"],
        tools: ["Splunk", "IAM Tools", "Firewall Configuration"],
        advanced: ["Zero Trust Architecture", "ISO 27001 Compliance", "Cryptography"],
    },
    "Security Engineer": {
        core: ["Network Security", "Secure Coding Practices", "Encryption"],
        tools: ["Burp Suite", "Metasploit", "Snort", "Linux"],
        advanced: ["Cloud Security Architecture", "DevSecOps", "Intrusion Prevention Systems"],
    },
    "Penetration Tester": {
        core: ["Vulnerability Exploitation", "Social Engineering", "Reconnaissance"],
        tools: ["Kali Linux", "Metasploit", "Burp Suite Pro", "Hashcat"],
        advanced: ["Custom Exploit Development", "Red Teaming", "Reverse Engineering"],
    },
    "Ethical Hacker": {
        core: ["Network Mapping", "System Bypassing", "Vulnerability Scanning"],
        tools: ["Nmap", "Aircrack-ng", "SQLmap", "John the Ripper"],
        advanced: ["0-day Vulnerability Research", "Web App Exploitation", "IoT Security"],
    },
    "SOC Analyst": {
        core: ["Log Analysis", "Event Monitoring", "Alert Triage"],
        tools: ["Splunk", "QRadar", "CrowdStrike", "AlienVault"],
        advanced: ["Threat Hunting", "Advanced Malware Triage", "SOAR Automation"],
    },

    // ── Banking, Finance & Insurance ──
    "Accountant": {
        core: ["Bookkeeping", "Ledger Management", "Taxation Basics"],
        tools: ["Tally", "QuickBooks", "Excel", "SAP FICO"],
        advanced: ["Financial Auditing", "IFRS Compliance", "Forensic Accounting"],
    },
    "Financial Analyst": {
        core: ["Financial Modeling", "Variance Analysis", "Forecasting"],
        tools: ["Advanced Excel", "Bloomberg Terminal", "SQL", "Power BI"],
        advanced: ["Mergers & Acquisitions (M&A)", "Portfolio Management", "Macroeconomic Analysis"],
    },
    "Investment Analyst": {
        core: ["Asset Valuation", "Market Research", "Risk Assessment"],
        tools: ["FactSet", "Morningstar", "Excel", "Python"],
        advanced: ["Quantitative Analysis", "Algorithmic Trading Strategies", "Private Equity Valuation"],
    },
    "Auditor": {
        core: ["Compliance Checking", "Risk Mitigation", "Internal Controls"],
        tools: ["ACL", "Idea", "Excel", "Teammate"],
        advanced: ["IT Auditing", "Fraud Investigation", "Regulatory Reporting"],
    },
    "Relationship Manager": {
        core: ["Client Acquisition", "Wealth Management", "Portfolio Pitching"],
        tools: ["Salesforce", "CRM Software", "Banking Core Systems"],
        advanced: ["High Net Worth (HNI) Advisory", "Cross-selling Strategies", "Behavioral Finance"],
    },
    "Insurance Advisor": {
        core: ["Risk Profiling", "Policy Underwriting Basics", "Claim Processing"],
        tools: ["CRM Tools", "Insurance Quoting Software"],
        advanced: ["Actuarial Data Analysis", "Corporate Risk Management", "Estate Planning"],
    },

    // ── FinTech ──
    "FinTech Product Analyst": {
        core: ["User Journey Mapping", "Financial Regulatory Knowledge", "Market Benchmarking"],
        tools: ["Jira", "Mixpanel", "Figma", "SQL"],
        advanced: ["API Economics", "Open Banking Standards", "Tokenomics"],
    },
    "Risk Analyst": {
        core: ["Credit Risk Assessment", "Fraud Detection", "KYC/AML Compliance"],
        tools: ["Python", "SAS", "SQL", "Tableau"],
        advanced: ["Machine Learning for Fraud", "Stress Testing Models", "Basel Accords"],
    },
    "Payment Systems Specialist": {
        core: ["Transaction Routing", "Payment Gateways", "Settlement Processes"],
        tools: ["Stripe API", "ISO 8583", "Postman", "Splunk"],
        advanced: ["Blockchain Payments", "Cross-Border Remittance Networks", "PCI-DSS Compliance"],
    },
    "FinTech Developer": {
        core: ["Secure Coding", "API Integration", "High-Availability Systems"],
        tools: ["Java/Go", "AWS", "Kafka", "Docker"],
        advanced: ["Smart Contracts (Solidity)", "Ledger Databases", "Low Latency Trading Systems"],
    },

    // ── Sales & Business Development ──
    "Sales Executive": {
        core: ["Lead Generation", "Cold Calling", "Objection Handling"],
        tools: ["HubSpot", "Salesforce", "LinkedIn Sales Navigator"],
        advanced: ["B2B Enterprise Sales", "Value-Based Selling", "Contract Negotiation"],
    },
    "Business Development Executive": {
        core: ["Market Expansion", "Partnership Building", "Pitch Deck Creation"],
        tools: ["CRM", "PowerPoint", "ZoomInfo"],
        advanced: ["Strategic Alliances", "Go-To-Market Strategy", "International Expansion"],
    },
    "Account Manager": {
        core: ["Client Retention", "Upselling", "Relationship Building"],
        tools: ["Gainsight", "Salesforce", "Zendesk"],
        advanced: ["Key Account Management", "Churn Prediction", "Revenue Forecasting"],
    },
    "Sales Manager": {
        core: ["Pipeline Management", "Team Leadership", "Quota Setting"],
        tools: ["Tableau", "Salesforce Dashboards", "Gong.io"],
        advanced: ["Sales Enablement Strategy", "Territory Mapping", "Compensation Modeling"],
    },

    // ── Marketing & Advertising ──
    "Digital Marketing Executive": {
        core: ["Campaign Management", "Social Media Strategy", "Email Marketing"],
        tools: ["Mailchimp", "Hootsuite", "Google Analytics", "Canva"],
        advanced: ["Marketing Automation", "Omnichannel Strategy", "A/B Testing"],
    },
    "SEO Specialist": {
        core: ["Keyword Research", "On-Page SEO", "Link Building"],
        tools: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog"],
        advanced: ["Technical SEO", "Log File Analysis", "Local SEO Optimization"],
    },
    "Performance Marketer": {
        core: ["PPC Campaigns", "Media Buying", "Conversion Tracking"],
        tools: ["Google Ads", "Meta Ads Manager", "Google Tag Manager", "Excel"],
        advanced: ["ROAS Optimization", "Programmatic Advertising", "Attribution Modeling"],
    },
    "Brand Manager": {
        core: ["Brand Positioning", "Market Research", "Public Relations"],
        tools: ["Brandwatch", "Mention", "Qualtrics"],
        advanced: ["Brand Equity Measurement", "Crisis Communication", "Consumer Psychology"],
    },
    "Marketing Analyst": {
        core: ["Data Visualization", "Campaign Reporting", "Customer Segmentation"],
        tools: ["Google Analytics 4", "Tableau", "SQL", "Looker"],
        advanced: ["Marketing Mix Modeling", "Predictive Customer LTV", "Data Warehousing"],
    },

    // ── Media & Content ──
    "Content Writer": {
        core: ["Copy Editing", "Research", "SEO Writing"],
        tools: ["Grammarly", "WordPress", "Google Docs"],
        advanced: ["Technical Writing", "Long-form Journalism", "Content Localization"],
    },
    "Copywriter": {
        core: ["Persuasive Writing", "Ad Copy", "Brand Voice matching"],
        tools: ["Hemingway App", "Figma (for layout)", "A/B Testing Tools"],
        advanced: ["Direct Response Copywriting", "Psychological Triggers", "Conversion Rate Optimization"],
    },
    "Content Strategist": {
        core: ["Content Auditing", "Editorial Calendars", "Audience Personas"],
        tools: ["Airtable", "Trello", "Google Analytics"],
        advanced: ["Content Governance", "Information Architecture", "Multichannel Content Distribution"],
    },
    "Social Media Manager": {
        core: ["Community Management", "Trend Analysis", "Visual Curation"],
        tools: ["Buffer", "Sprout Social", "CapCut", "Canva"],
        advanced: ["Influencer Marketing Strategies", "Social Commerce", "Viral Mechanics Analysis"],
    },
    "Video Producer": {
        core: ["Storyboarding", "Video Editing", "Audio Mixing"],
        tools: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve"],
        advanced: ["Motion Graphics (After Effects)", "Color Grading", "Live Broadcast Production"],
    },

    // ── E-commerce & Retail ──
    "E-commerce Manager": {
        core: ["Store Operations", "Inventory Management", "Conversion Optimization"],
        tools: ["Shopify", "Magento", "WooCommerce", "Google Analytics"],
        advanced: ["Headless Commerce", "Cross-border E-commerce", "Pricing Algorithms"],
    },
    "Category Manager": {
        core: ["Vendor Management", "Product Assortment", "Pricing Strategy"],
        tools: ["SAP", "Excel", "Nielsen/IRI Data"],
        advanced: ["Demand Forecasting", "Private Label Development", "Supply Chain Integration"],
    },
    "Retail Manager": {
        core: ["Store Operations", "Staff Scheduling", "Visual Merchandising"],
        tools: ["POS Systems", "Square", "Workday"],
        advanced: ["Omnichannel Fulfillment (BOPIS)", "Loss Prevention Analytics", "Retail Footfall Analysis"],
    },
    "Merchandiser": {
        core: ["Inventory Tracking", "Trend Forecasting", "Space Allocation"],
        tools: ["Planogram Software", "Excel", "ERP Systems"],
        advanced: ["Assortment Optimization Modeling", "Margin Engineering", "Seasonal Buy Planning"],
    },

    // ── Human Resources ──
    "HR Executive": {
        core: ["Onboarding", "Employee Relations", "Payroll Processing"],
        tools: ["BambooHR", "Workday", "Gusto", "Excel"],
        advanced: ["Labor Law Compliance", "Conflict Resolution", "Benefits Administration"],
    },
    "Recruiter": {
        core: ["Sourcing", "Interviewing", "Candidate Assessment"],
        tools: ["LinkedIn Recruiter", "Greenhouse", "Lever"],
        advanced: ["Employer Branding", "Diversity & Inclusion Strategies", "Compensation Benchmarking"],
    },
    "HR Manager": {
        core: ["Policy Development", "Performance Management", "Retention Strategies"],
        tools: ["HRIS Systems", "LMS Systems", "Culture Amp"],
        advanced: ["Organizational Design", "HR Analytics", "Change Management"],
    },
    "Talent Acquisition Specialist": {
        core: ["Boolean Search", "Pipeline Management", "Offer Negotiation"],
        tools: ["ATS Tools", "Gem", "Hired"],
        advanced: ["Headhunting Execs", "Talent Market Mapping", "Predictive Hiring Models"],
    },

    // ── Education & Training ──
    "Teacher": {
        core: ["Lesson Planning", "Classroom Management", "Student Assessment"],
        tools: ["Google Classroom", "Canvas", "Kahoot!"],
        advanced: ["Special Education Needs (SEN)", "Differentiated Instruction", "Pedagogical Theory"],
    },
    "Trainer": {
        core: ["Presentation Skills", "Workshop Facilitation", "Feedback Delivery"],
        tools: ["PowerPoint", "Mentimeter", "Zoom"],
        advanced: ["Adult Learning Theory (Andragogy)", "Gamification", "Training ROI Measurement"],
    },
    "Academic Coordinator": {
        core: ["Curriculum Alignment", "Scheduling", "Faculty Evaluation"],
        tools: ["School Management Systems", "Excel"],
        advanced: ["Accreditation Compliance", "Educational Leadership", "Budgeting"],
    },
    "Instructional Designer": {
        core: ["Storyboarding", "Learning Objectives creation", "Assessments"],
        tools: ["Articulate Storyline", "Adobe Captivate", "LMS Platforms"],
        advanced: ["ADDIE/SAM Models", "SCORM Compliance", "Microlearning Design"],
    },

    // ── EdTech ──
    "Learning Experience Designer": {
        core: ["UX Research for Education", "Cognitive Load Theory", "Prototyping"],
        tools: ["Figma", "Miro", "Camtasia"],
        advanced: ["Adaptive Learning Algorithms", "Data-Driven Iteration", "Immersive Learning (VR/AR)"],
    },
    "Course Developer": {
        core: ["Scriptwriting", "Video Production Basics", "Quiz Creation"],
        tools: ["Moodle", "Coursera Partner Platform", "Thinkific"],
        advanced: ["Interactive Video Authoring", "Subject Matter Expert (SME) Extraction", "Localization"],
    },

    // ── Healthcare & Medical ──
    "Doctor": {
        core: ["Patient Diagnosis", "Treatment Planning", "Anatomy/Physiology"],
        tools: ["Electronic Health Records (EHR)", "Epic", "Cerner"],
        advanced: ["Surgical Procedures", "Clinical Research", "Telemedicine protocols"],
    },
    "Nurse": {
        core: ["Patient Care", "Vitals Monitoring", "Medication Administration"],
        tools: ["EHR Systems", "Infusion Pumps", "Telemetry Monitors"],
        advanced: ["Triage", "Critical Care Nursing (ICU)", "Advanced Life Support (ACLS)"],
    },
    "Medical Officer": {
        core: ["Healthcare Administration", "Public Health Protocols", "Staff Coordination"],
        tools: ["Hospital Management Systems", "Compliance Software"],
        advanced: ["Epidemiology", "Healthcare Policy Making", "Quality Assurance (JCI/NABH)"],
    },
    "Lab Technician": {
        core: ["Sample Collection", "Microscopy", "Sterilization"],
        tools: ["Centrifuges", "LIMS (Lab Information Management Systems)", "Spectrophotometers"],
        advanced: ["Molecular Diagnostics (PCR)", "Histopathology", "Quality Control Calibration"],
    },

    // ── Design & Creative ──
    "Graphic Designer": {
        core: ["Color Theory", "Typography", "Composition Layout"],
        tools: ["Adobe Photoshop", "Adobe Illustrator", "InDesign"],
        advanced: ["Print Production", "Brand Identity Systems", "3D Rendering"],
    },
    "UI Designer": {
        core: ["Visual Hierarchy", "Component Design", "Responsive Grids"],
        tools: ["Figma", "Sketch", "Zeplin", "Framer"],
        advanced: ["Design System Architecture", "Micro-interactions", "Advanced Prototyping"],
    },
    "UX Designer": {
        core: ["User Research", "Wireframing", "Usability Testing", "Information Architecture"],
        tools: ["Miro", "Optimal Workshop", "Balsamiq", "Figma"],
        advanced: ["Behavioral Psychology", "A/B Testing Analytics", "Service Design"],
    },
    "Product Designer": {
        core: ["End-to-End Design", "Business Logic Integration", "Cross-functional Collaboration"],
        tools: ["Figma", "Jira", "Notion", "Amplitude"],
        advanced: ["Product Strategy", "Design Metrics tracking", "Hardware/Software interaction"],
    },
    "UI/UX Designer": {
        core: ["User Research", "Wireframing", "Visual Hierarchy", "Information Architecture"],
        tools: ["Figma", "Adobe XD", "ProtoPie", "Miro"],
        advanced: ["Design Systems", "Usability Testing", "Accessibility (WCAG)"],
    },

    // ── Gaming & Animation ──
    "Game Designer": {
        core: ["Level Design", "Game Mechanics", "Economy Balancing", "Player Psychology"],
        tools: ["Unity", "Unreal Engine", "Twine", "Excel"],
        advanced: ["Systemic Design", "Monetization Strategy", "Live-Ops Design"],
    },
    "Game Developer": {
        core: ["3D Math", "Physics Simulation", "Game Loop Architecture", "Memory Management"],
        tools: ["Unity", "Unreal Engine", "C#", "C++", "Blender"],
        advanced: ["Multiplayer Networking", "Graphics Programming/Shaders", "AI Behavior Trees"],
    },
    "Animator": {
        core: ["Keyframing", "The 12 Principles of Animation", "Rigging basics"],
        tools: ["Maya", "Spine 2D", "Blender", "Toon Boom Harmony"],
        advanced: ["Motion Capture Cleanup", "Facial Animation", "Procedural Animation"],
    },
    "3D Artist": {
        core: ["Low/High Poly Modeling", "UV Mapping", "Texturing"],
        tools: ["ZBrush", "Substance Painter", "Blender", "3ds Max"],
        advanced: ["PBR Material Creation", "Shader Graph Optimization", "Photogrammetry"],
    },

    // ── Other ──
    "Generalist Role": {
        core: ["Communication", "Problem Solving", "Adaptability"],
        tools: ["Microsoft Office", "Google Workspace", "Trello"],
        advanced: ["Cross-functional Leadership", "Project Management basics", "Data Interpretation"],
    },
};

// Fallback categories when role isn't in taxonomy
export const fallbackSkillCategories = [
    "Core Technical Skills",
    "Software & Tools",
    "Domain Expertise",
    "Soft Skills",
] as const;

// ═══════════════════════════════════════════════════════════════
// PART 2: Proficiency & Scoring
// ═══════════════════════════════════════════════════════════════

export type Proficiency = "Beginner" | "Intermediate" | "Advanced";
export type SkillCategory = "core" | "tools" | "advanced";

export interface UserSkill {
    skillName: string;
    category: SkillCategory;
    proficiency: Proficiency;
    projectVolume?: string | null; // "1-2" | "3-5" | "6+" — only for Advanced
}

const BASE_POINTS: Record<Proficiency, number> = {
    Beginner: 30,
    Intermediate: 60,
    Advanced: 90,
};

const CATEGORY_MULTIPLIERS: Record<SkillCategory, number> = {
    core: 1.0,
    tools: 0.8,
    advanced: 1.2,
};

export function calculateSkillScore(skills: UserSkill[]): number {
    if (skills.length === 0) return 0;
    const total = skills.reduce((sum, s) => {
        return sum + BASE_POINTS[s.proficiency] * CATEGORY_MULTIPLIERS[s.category];
    }, 0);
    return Math.round(total / skills.length);
}

// Normalize to 0–100 scale
export function normalizeSkillScore(raw: number): number {
    // Max possible = 90 * 1.2 = 108, min = 30 * 0.8 = 24
    return Math.min(100, Math.round(((raw - 24) / (108 - 24)) * 100));
}

// ═══════════════════════════════════════════════════════════════
// PART 3: CPS Integration (weight = 0.35)
// ═══════════════════════════════════════════════════════════════

export function getSkillCPSContribution(skills: UserSkill[]): number {
    const raw = calculateSkillScore(skills);
    const normalized = normalizeSkillScore(raw);
    return Math.round(normalized * 0.35); // 35% weight
}

// ═══════════════════════════════════════════════════════════════
// PART 4: Skill Gap Analysis (CSP integration)
// ═══════════════════════════════════════════════════════════════

export function getSkillGapPercentage(
    userSkills: UserSkill[],
    targetRole: string
): number {
    const taxonomy = skillsTaxonomy[targetRole];
    if (!taxonomy) return 50; // default mid-gap

    const allRequired = [...taxonomy.core, ...taxonomy.tools, ...taxonomy.advanced];
    const userSkillNames = new Set(userSkills.map(s => s.skillName));
    const covered = allRequired.filter(s => userSkillNames.has(s)).length;

    return allRequired.length > 0
        ? Math.round(((allRequired.length - covered) / allRequired.length) * 100)
        : 0;
}

// ═══════════════════════════════════════════════════════════════
// PART 5: Recruiter Visibility Flags
// ═══════════════════════════════════════════════════════════════

export interface RecruiterFlag {
    tag: string;
    action: string;
}

export function getRecruiterFlags(skills: UserSkill[]): RecruiterFlag[] {
    const flags: RecruiterFlag[] = [];
    const score = calculateSkillScore(skills);
    const advancedCount = skills.filter(s => s.proficiency === "Advanced").length;
    const projectCount = skills.filter(s =>
        s.projectVolume === "3-5" || s.projectVolume === "6+"
    ).length;

    if (score >= 80 && projectCount >= 3) {
        flags.push({ tag: "Top 10% Talent", action: "pin_to_top_of_search" });
    }
    if (advancedCount >= 2) {
        flags.push({ tag: "Specialist", action: "highlight_in_filtering" });
    }

    return flags;
}

// ═══════════════════════════════════════════════════════════════
// PART 6: AI Module Hooks (structural — deterministic fallbacks)
// ═══════════════════════════════════════════════════════════════

export interface SkillGapPrediction {
    suggestedLearningPath: string[];
    nextLevelRole: string;
    gapAreas: string[];
}

export function predictSkillGap(
    currentRole: string,
    userSkills: UserSkill[]
): SkillGapPrediction {
    const taxonomy = skillsTaxonomy[currentRole];
    if (!taxonomy) {
        return {
            suggestedLearningPath: ["Explore foundational courses in your domain"],
            nextLevelRole: "Senior " + currentRole,
            gapAreas: ["Domain-specific skills"],
        };
    }

    const userSkillNames = new Set(userSkills.map(s => s.skillName));
    const gapAreas = [...taxonomy.core, ...taxonomy.advanced].filter(
        s => !userSkillNames.has(s)
    );

    return {
        suggestedLearningPath: gapAreas.slice(0, 5).map(s => `Master "${s}" through structured courses`),
        nextLevelRole: "Senior " + currentRole,
        gapAreas,
    };
}

export interface SalaryEstimate {
    min: number;
    max: number;
    currency: string;
}

export function estimateSalary(
    skillScore: number,
    experienceYears: number,
    locationIndex: number = 1.0 // 1.0 = metro, 0.8 = tier-2, 0.6 = tier-3
): SalaryEstimate {
    // Base salary in LPA (lakhs per annum)
    const baseLow = 3;
    const baseHigh = 6;

    const skillMultiplier = 0.5 + (skillScore / 100) * 1.5; // 0.5x to 2.0x
    const expMultiplier = 1 + experienceYears * 0.15; // +15% per year

    const min = Math.round(baseLow * skillMultiplier * expMultiplier * locationIndex * 10) / 10;
    const max = Math.round(baseHigh * skillMultiplier * expMultiplier * locationIndex * 10) / 10;

    return { min, max, currency: "INR (LPA)" };
}

// ═══════════════════════════════════════════════════════════════
// PART 7: Course Recommendation Triggers
// ═══════════════════════════════════════════════════════════════

export function shouldRecommendCourses(gapPercentage: number): boolean {
    return gapPercentage > 20;
}

export function getCourseRecommendationType(
    userType: string,
    switchIntent: boolean,
    careerGap: boolean
): string {
    if (careerGap) return "restart_programs";
    if (switchIntent) return "bridge_transition_programs";
    if (userType === "student") return "foundational_skill_building";
    if (userType === "fresher") return "job_ready_programs";
    return "upskilling_specialization";
}

// ═══════════════════════════════════════════════════════════════
// PART 8: Validation
// ═══════════════════════════════════════════════════════════════

export const SKILL_VALIDATION = {
    minSkillsRequired: 3,
    maxSkillsAllowed: 20,
    requireAtLeastOneCore: true,
} as const;

export function validateSkillSelection(skills: UserSkill[]): {
    valid: boolean;
    error?: string;
} {
    if (skills.length < SKILL_VALIDATION.minSkillsRequired) {
        return { valid: false, error: "Please select at least 3 skills to calculate your baseline score." };
    }
    if (skills.length > SKILL_VALIDATION.maxSkillsAllowed) {
        return { valid: false, error: `Maximum ${SKILL_VALIDATION.maxSkillsAllowed} skills allowed.` };
    }
    if (SKILL_VALIDATION.requireAtLeastOneCore && !skills.some(s => s.category === "core")) {
        return { valid: false, error: "Please select at least one core competency." };
    }
    return { valid: true };
}

// ═══════════════════════════════════════════════════════════════
// PART 9: Helper — get taxonomy for a role (with fallback)
// ═══════════════════════════════════════════════════════════════

export function getTaxonomyForRole(role: string): SkillTaxonomy | null {
    return skillsTaxonomy[role] ?? null;
}

export function hasStructuredTaxonomy(role: string): boolean {
    return role in skillsTaxonomy;
}

// UX Microcopy
export const SKILL_ENGINE_COPY = {
    headerTitle: "Benchmark Your Technical Stack",
    subtitle: "Your skill depth directly drives your Career Probability Score (CPS) and recruiter visibility.",
    advancedTooltip: "Selecting 'Advanced' unlocks priority recruiter matching.",
    projectPrompt: "How many production-level projects have you shipped using this?",
} as const;