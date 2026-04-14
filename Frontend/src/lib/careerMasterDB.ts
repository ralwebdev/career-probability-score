// Career Master Database — hierarchical mapping from uploaded career_master_database.json
// Hierarchy: Education Level → Field of Study → Domain → Subdomain → Role

// ============================================================================
// DISPLAY LABEL HELPER
// ============================================================================
const specialLabels: Record<string, string> = {
  "12_science": "Class 12 - Science",
  "12_commerce": "Class 12 - Commerce",
  "12_arts": "Class 12 - Arts",
  "self_taught": "Self-Taught",
  "data_science_ai": "Data Science & AI",
  "uiux": "UI/UX",
  "uiux_design": "UI/UX Design",
  "3d_design": "3D Design",
  "ar_vr": "AR/VR",
  "btech": "B.Tech",
  "bca": "BCA",
  "bba": "BBA",
  "bcom": "B.Com",
  "ba": "BA",
  "bsc": "B.Sc",
  "bdes": "B.Des",
  "bpharma": "B.Pharma",
  "law_llb": "Law (LLB)",
  "nlp": "NLP",
  "seo": "SEO",
  "api_engineering": "API Engineering",
  "web3": "Web3",
  "soc": "SOC",
  "ecommerce": "E-Commerce",
  "3d_modeler": "3D Modeler",
  "supply_chain": "Supply Chain",
  "international_business": "International Business",
  "retail_management": "Retail Management",
  "media_communication": "Media & Communication",
  "education_teaching": "Education & Teaching",
  "fine_arts": "Fine Arts",
  "performing_arts": "Performing Arts",
  "social_sciences": "Social Sciences",
  "political_science": "Political Science",
  "pure_sciences": "Pure Sciences",
  "computer_science": "Computer Science",
  "environmental_science": "Environmental Science",
  "forensic_science": "Forensic Science",
  "food_technology": "Food Technology",
  "sports_science": "Sports Science",
  "accounting_finance": "Accounting & Finance",
  "business_management": "Business Management",
  "hotel_management": "Hotel Management",
  "mass_communication": "Mass Communication",
  "animation_multimedia": "Animation & Multimedia",
  "game_design": "Game Design",
  "fashion_design": "Fashion Design",
  "interior_design": "Interior Design",
  "web_development": "Web Development",
  "data_science": "Data Science",
  "graphic_design": "Graphic Design",
  "digital_marketing": "Digital Marketing",
  "video_editing": "Video Editing",
  "game_development": "Game Development",
  "cloud_computing": "Cloud Computing",
  "content_creation": "Content Creation",
  "trading_investing": "Trading & Investing",
  "creator_economy": "Creator Economy",
  "software_engineering": "Software Engineering",
  "industrial_engineering": "Industrial Engineering",
  "mobile_app": "Mobile App",
  "machine_learning": "Machine Learning",
  "deep_learning": "Deep Learning",
  "computer_vision": "Computer Vision",
  "ai_research": "AI Research",
  "big_data": "Big Data",
  "business_intelligence": "Business Intelligence",
  "ethical_hacking": "Ethical Hacking",
  "penetration_testing": "Penetration Testing",
  "network_security": "Network Security",
  "cloud_security": "Cloud Security",
  "forensics_security": "Forensics Security",
  "game_programming": "Game Programming",
  "game_art": "Game Art",
  "technical_art": "Technical Art",
  "game_testing": "Game Testing",
  "level_design": "Level Design",
  "motion_graphics": "Motion Graphics",
  "visual_design": "Visual Design",
  "product_design": "Product Design",
  "interaction_design": "Interaction Design",
  "game_art_design": "Game Art Design",
  "video_production": "Video Production",
  "performance_marketing": "Performance Marketing",
  "social_media": "Social Media",
  "growth_marketing": "Growth Marketing",
  "content_marketing": "Content Marketing",
  "risk_management": "Risk Management",
  "financial_planning": "Financial Planning",
  "food_beverage": "Food & Beverage",
  "event_management": "Event Management",
  "luxury_management": "Luxury Management",
  "hotel_operations": "Hotel Operations",
  "data_analytics": "Data Analytics",
  // New fields
  "zoology": "Zoology",
  "botany": "Botany",
  "microbiology": "Microbiology",
  "genetics": "Genetics",
  "molecular_biology": "Molecular Biology",
  "marine_biology_domain": "Marine Biology",
  "immunology_domain": "Immunology",
  "virology_domain": "Virology",
  "neuroscience": "Neuroscience",
  "nanotechnology": "Nanotechnology",
  "nanotechnology_domain": "Nanotechnology",
  "mathematics_stats": "Mathematics & Statistics",
  "business_analytics": "Business Analytics",
  "taxation": "Taxation",
  "mass_comm_arts": "Mass Communication",
  "english_literature": "English Literature",
  "wildlife_research": "Wildlife Research",
  "animal_behavior": "Animal Behavior",
  "plant_research": "Plant Research",
  "horticulture": "Horticulture",
  "forest_management": "Forest Management",
  "clinical_microbiology": "Clinical Microbiology",
  "industrial_microbiology": "Industrial Microbiology",
  "genetic_research": "Genetic Research",
  "neuroscience_research": "Neuroscience Research",
  "materials_science": "Materials Science",
  "astrophysics": "Astrophysics",
  "bsc_zoology": "B.Sc Zoology",
  "bsc_botany": "B.Sc Botany",
  "bsc_microbiology": "B.Sc Microbiology",
  "bsc_biotechnology": "B.Sc Biotechnology",
  "bsc_chemistry": "B.Sc Chemistry",
  "bsc_physics": "B.Sc Physics",
  "bsc_mathematics": "B.Sc Mathematics",
  "bsc_psychology": "B.Sc Psychology",
  "bsc_agriculture": "B.Sc Agriculture",
  "bsc_food_technology": "B.Sc Food Technology",
  "bsc_environmental_science": "B.Sc Environmental Science",
  "msc_zoology": "M.Sc Zoology",
  "msc_botany": "M.Sc Botany",
  "msc_microbiology": "M.Sc Microbiology",
  "msc_biotechnology": "M.Sc Biotechnology",
  "msc_chemistry": "M.Sc Chemistry",
  "msc_physics": "M.Sc Physics",
  "msc_mathematics": "M.Sc Mathematics",
  "msc_psychology": "M.Sc Psychology",
  "msc_data_science": "M.Sc Data Science",
  "msc_environmental_science": "M.Sc Environmental Science",
  "phd_sciences": "PhD Sciences",
  "phd_engineering": "PhD Engineering",
  "phd_arts": "PhD Arts",
  "phd_commerce": "PhD Commerce",
  "phd_life_sciences": "PhD Life Sciences",
  "phd_social_sciences": "PhD Social Sciences",
  "phd_computer_science": "PhD Computer Science",
  "diploma": "Diploma",
  "phd": "PhD",
  // Roles
  "zoologist": "Zoologist",
  "wildlife_biologist": "Wildlife Biologist",
  "conservation_biologist": "Conservation Biologist",
  "marine_biologist": "Marine Biologist",
  "oceanographer": "Oceanographer",
  "botanist": "Botanist",
  "plant_geneticist": "Plant Geneticist",
  "horticulturist": "Horticulturist",
  "landscape_designer": "Landscape Designer",
  "forest_officer": "Forest Officer",
  "clinical_microbiologist": "Clinical Microbiologist",
  "industrial_microbiologist": "Industrial Microbiologist",
  "fermentation_technologist": "Fermentation Technologist",
  "virologist": "Virologist",
  "vaccine_researcher": "Vaccine Researcher",
  "immunologist": "Immunologist",
  "geneticist": "Geneticist",
  "genetic_counselor": "Genetic Counselor",
  "nanotech_engineer": "Nanotech Engineer",
  "nanotech_researcher": "Nanotech Researcher",
  "materials_scientist": "Materials Scientist",
  "astrophysicist": "Astrophysicist",
  "neuroscientist": "Neuroscientist",
  "cognitive_scientist": "Cognitive Scientist",
  "pharmacologist": "Pharmacologist",
  "physicist": "Physicist",
  "chemist": "Chemist",
  "statistician": "Statistician",
  "animal_behaviorist": "Animal Behaviorist",
  // Existing roles
  "frontend_developer": "Frontend Developer",
  "react_developer": "React Developer",
  "ui_engineer": "UI Engineer",
  "backend_developer": "Backend Developer",
  "api_developer": "API Developer",
  "database_engineer": "Database Engineer",
  "fullstack_developer": "Fullstack Developer",
  "software_engineer": "Software Engineer",
  "cloud_engineer": "Cloud Engineer",
  "aws_engineer": "AWS Engineer",
  "cloud_architect": "Cloud Architect",
  "devops_engineer": "DevOps Engineer",
  "site_reliability_engineer": "Site Reliability Engineer",
  "ml_engineer": "ML Engineer",
  "ai_engineer": "AI Engineer",
  "data_scientist": "Data Scientist",
  "nlp_engineer": "NLP Engineer",
  "chatbot_developer": "Chatbot Developer",
  "cv_engineer": "Computer Vision Engineer",
  "image_processing_engineer": "Image Processing Engineer",
  "game_developer": "Game Developer",
  "unity_developer": "Unity Developer",
  "unreal_developer": "Unreal Developer",
  "gameplay_programmer": "Gameplay Programmer",
  "physics_programmer": "Physics Programmer",
  "ar_developer": "AR Developer",
  "vr_developer": "VR Developer",
  "xr_engineer": "XR Engineer",
  "graphic_designer": "Graphic Designer",
  "brand_designer": "Brand Designer",
  "layout_artist": "Layout Artist",
  "packaging_designer": "Packaging Designer",
  "ui_designer": "UI Designer",
  "ux_designer": "UX Designer",
  "ux_researcher": "UX Researcher",
  "product_designer": "Product Designer",
  "texturing_artist": "Texturing Artist",
  "lighting_artist": "Lighting Artist",
  "rigging_artist": "Rigging Artist",
  "compositing_artist": "Compositing Artist",
  "video_editor": "Video Editor",
  "motion_graphics_artist": "Motion Graphics Artist",
  "color_grader": "Color Grader",
  "post_production_artist": "Post Production Artist",
  "content_creator": "Content Creator",
  "youtuber": "YouTuber",
  "influencer": "Influencer",
  "accountant": "Accountant",
  "chartered_accountant": "Chartered Accountant",
  "tax_consultant": "Tax Consultant",
  "investment_banker": "Investment Banker",
  "equity_analyst": "Equity Analyst",
  "portfolio_manager": "Portfolio Manager",
  "hotel_manager": "Hotel Manager",
  "front_office_manager": "Front Office Manager",
  "chef": "Chef",
  "pastry_chef": "Pastry Chef",
  "air_hostess": "Air Hostess",
  "cabin_crew": "Cabin Crew",
  "ground_staff": "Ground Staff",
  "digital_marketer": "Digital Marketer",
  "aviation_service": "Aviation Service",
  // Language domains
  "english_domain": "English",
  "bengali_domain": "Bengali",
  "hindi_domain": "Hindi",
  "sanskrit_domain": "Sanskrit",
  "regional_languages_domain": "Regional Languages",
  // Geography
  "geography_domain": "Geography",
  // General Pass
  "general_pass": "General (Pass)",
  // New roles
  "gis_analyst": "GIS Analyst",
  "customer_service_exec": "Customer Service Executive",
  "content_strategist_role": "Content Strategist",
  "upsc_aspirant_coach": "UPSC Coaching Mentor",
  "historian": "Historian",
  "geographer": "Geographer",
  "bibliographer": "Bibliographer",
};

export function formatLabel(id: string): string {
  if (specialLabels[id]) return specialLabels[id];
  return id
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ============================================================================
// EDUCATION LEVELS
// ============================================================================
export const masterEducationLevels = [
  "12_science",
  "12_commerce",
  "12_arts",
  "diploma",
  "undergraduate",
  "graduate",
  "postgraduate",
  "phd",
  "bootcamp",
  "self_taught",
] as const;

// ============================================================================
// FIELD OF STUDY BY EDUCATION LEVEL
// ============================================================================
export const fieldsByEducation: Record<string, string[]> = {
  "12_science": [
    "engineering", "medical", "pure_sciences", "computer_science",
    "data_science_ai", "biotechnology", "pharmacy", "paramedical",
    "architecture", "aviation", "defence", "environmental_science",
    "forensic_science", "agriculture", "food_technology", "sports_science",
    "zoology", "botany", "microbiology", "genetics", "physics", "chemistry",
    "mathematics_stats", "nanotechnology", "neuroscience",
  ],
  "12_commerce": [
    "accounting_finance", "business_management", "economics", "banking",
    "marketing", "entrepreneurship", "law", "supply_chain",
    "retail_management", "insurance", "international_business", "ecommerce",
    "business_analytics", "taxation",
  ],
  "12_arts": [
    "design", "media_communication", "psychology", "law", "fine_arts",
    "performing_arts", "social_sciences", "languages", "education_teaching",
    "philosophy", "history", "political_science",
    "journalism", "mass_comm_arts", "english_literature",
  ],
  diploma: [
    "engineering", "computer_science", "design", "hotel_management",
    "pharmacy", "paramedical", "animation_multimedia", "fashion_design",
    "interior_design", "agriculture", "food_technology",
    "web_development", "digital_marketing", "video_editing",
    "graphic_design", "game_development", "cybersecurity",
    "biotechnology", "environmental_science",
  ],
  undergraduate: [
    "btech", "bca", "bba", "bcom", "ba", "bsc", "bdes", "bpharma",
    "nursing", "hotel_management", "mass_communication", "law_llb",
    "animation_multimedia", "game_design", "fashion_design", "interior_design",
    "bsc_zoology", "bsc_botany", "bsc_microbiology", "bsc_biotechnology",
    "bsc_chemistry", "bsc_physics", "bsc_mathematics", "bsc_psychology",
    "bsc_agriculture", "bsc_food_technology", "bsc_environmental_science",
  ],
  graduate: [
    "btech", "bca", "bba", "bcom", "ba", "bsc", "bdes", "bpharma",
    "nursing", "hotel_management", "mass_communication", "law_llb",
    "animation_multimedia", "game_design", "fashion_design", "interior_design",
    "bsc_zoology", "bsc_botany", "bsc_microbiology", "bsc_biotechnology",
    "bsc_chemistry", "bsc_physics", "bsc_mathematics", "bsc_psychology",
    "bsc_agriculture", "bsc_food_technology", "bsc_environmental_science",
  ],
  postgraduate: [
    "btech", "bca", "bba", "bcom", "ba", "bsc", "bdes", "bpharma",
    "nursing", "hotel_management", "mass_communication", "law_llb",
    "animation_multimedia", "game_design", "fashion_design", "interior_design",
    "msc_zoology", "msc_botany", "msc_microbiology", "msc_biotechnology",
    "msc_chemistry", "msc_physics", "msc_mathematics", "msc_psychology",
    "mba", "mca", "msc_data_science", "msc_environmental_science",
  ],
  phd: [
    "phd_sciences", "phd_engineering", "phd_arts", "phd_commerce",
    "phd_life_sciences", "phd_social_sciences", "phd_computer_science",
  ],
  bootcamp: [
    "web_development", "data_science", "uiux_design", "graphic_design",
    "digital_marketing", "video_editing", "game_development",
    "cybersecurity", "cloud_computing",
  ],
  self_taught: [
    "content_creation", "freelancing", "trading_investing",
    "startup", "creator_economy",
  ],
};

// ============================================================================
// DOMAINS BY FIELD (field_of_study → domains)
// ============================================================================
export const domainsByField: Record<string, string[]> = {
  // --- 12_science fields ---
  engineering: [
    "software_engineering", "mechanical", "civil", "electrical",
    "electronics", "robotics", "automobile", "aerospace",
    "marine", "industrial_engineering",
  ],
  medical: ["healthcare", "clinical_research", "public_health"],
  pure_sciences: ["research", "academics", "laboratory"],
  computer_science: ["software_engineering", "data_science_ai", "cybersecurity"],
  data_science_ai: [
    "data_analytics", "machine_learning", "deep_learning", "nlp",
    "computer_vision", "ai_research", "big_data", "business_intelligence",
  ],
  biotechnology: ["biotech_research", "bioinformatics", "pharma_rd"],
  pharmacy: ["pharma_rd", "clinical_research", "regulatory"],
  paramedical: ["healthcare", "diagnostics", "rehabilitation"],
  architecture: ["architectural_design", "urban_planning", "interior_design"],
  aviation: ["aviation_service", "aircraft_maintenance", "air_traffic"],
  defence: ["defence_services", "strategic_studies"],
  environmental_science: ["environmental_consulting", "sustainability", "conservation"],
  forensic_science: ["forensics_security", "criminal_investigation"],
  agriculture: ["agri_science", "agri_business", "food_technology"],
  food_technology: ["food_processing", "quality_assurance", "food_safety"],
  sports_science: ["sports_coaching", "sports_management", "fitness"],

  // --- New life science fields (12_science) ---
  zoology: ["wildlife_research", "conservation", "animal_behavior", "marine_biology_domain"],
  botany: ["plant_research", "horticulture", "forest_management", "agri_science"],
  microbiology: ["clinical_microbiology", "industrial_microbiology", "virology_domain", "immunology_domain"],
  genetics: ["genetic_research", "bioinformatics", "biotech_research", "pharma_rd"],
  physics: ["research", "academics", "nanotechnology_domain", "astrophysics"],
  chemistry: ["research", "pharma_rd", "materials_science", "quality_assurance"],
  mathematics_stats: ["data_analytics", "research", "actuarial", "machine_learning"],
  nanotechnology: ["nanotechnology_domain", "materials_science", "research"],
  neuroscience: ["neuroscience_research", "clinical_research", "pharma_rd"],

  // --- New commerce fields ---
  business_analytics: ["data_analytics", "business_intelligence", "machine_learning"],
  taxation: ["taxation", "audit", "accounting"],

  // --- New arts fields ---
  journalism: ["journalism", "content_creation", "broadcasting"],
  mass_comm_arts: ["journalism", "video_production", "content_creation", "broadcasting"],
  english_literature: ["content_creation", "copywriting", "academics", "translation"],

  // --- 12_commerce fields ---
  accounting_finance: [
    "accounting", "taxation", "audit", "investment",
    "risk_management", "financial_planning", "fintech",
  ],
  business_management: ["marketing", "operations", "human_resources", "strategy"],
  economics: ["economic_research", "policy_analysis", "financial_planning"],
  banking: ["retail_banking", "investment", "risk_management", "fintech"],
  marketing: [
    "digital_marketing", "seo", "performance_marketing", "social_media",
    "branding", "growth_marketing", "content_marketing",
  ],
  entrepreneurship: ["startup_ops", "product_management", "growth_marketing"],
  law: ["corporate_law", "litigation", "intellectual_property", "cyber_law"],
  supply_chain: ["logistics", "procurement", "warehouse_management"],
  retail_management: ["store_operations", "merchandising", "ecommerce"],
  insurance: ["underwriting", "actuarial", "claims_management"],
  international_business: ["trade_compliance", "global_strategy", "export_management"],
  ecommerce: ["ecommerce_ops", "digital_marketing", "product_management"],

  // --- 12_arts fields ---
  design: [
    "graphic_design", "uiux", "motion_graphics", "3d_design",
    "branding", "visual_design", "product_design",
    "interaction_design", "game_art_design",
  ],
  media_communication: [
    "journalism", "content_creation", "copywriting", "scriptwriting",
    "video_production", "podcasting", "broadcasting",
  ],
  psychology: ["clinical_psychology", "counseling", "organizational_psychology"],
  fine_arts: ["painting", "sculpture", "printmaking", "art_curation"],
  performing_arts: ["theatre", "dance", "music_performance"],
  social_sciences: ["social_research", "community_development", "ngo_management"],
  languages: ["translation", "interpretation", "linguistics", "content_creation"],
  education_teaching: ["curriculum_design", "edtech", "training_development"],
  philosophy: ["academics", "ethics_consulting", "content_creation"],
  history: ["academics", "archival_studies", "museum_curation"],
  political_science: ["policy_analysis", "public_administration", "diplomacy"],

  // --- Undergraduate fields ---
  btech: [
    "software_engineering", "data_science_ai", "mechanical", "civil", "electrical",
    "electronics", "robotics", "automobile", "aerospace",
    "marine", "industrial_engineering",
  ],
  bca: ["software_engineering", "data_science_ai", "cybersecurity", "game_development"],
  bba: ["marketing", "accounting_finance", "human_resources", "operations"],
  bcom: [
    // Core
    "accounting", "taxation", "audit",
    // Finance
    "investment", "risk_management", "financial_planning", "fintech",
    // Banking
    "retail_banking",
    // Business
    "marketing", "operations", "human_resources", "strategy",
    // Modern
    "data_analytics", "business_intelligence", "digital_marketing", "ecommerce_ops", "product_management",
    // General
    "general_pass",
  ],
  ba: [
    // Language domains
    "english_domain", "bengali_domain", "hindi_domain", "sanskrit_domain", "regional_languages_domain",
    // Humanities
    "academics", "policy_analysis", "social_research", "archival_studies", "museum_curation",
    "public_administration", "diplomacy", "geography_domain",
    // Psychology
    "clinical_psychology", "counseling", "organizational_psychology",
    // Media / Creative
    "journalism", "content_creation", "video_production", "broadcasting",
    // Fine / Performing Arts
    "painting", "sculpture", "theatre", "dance", "music_performance",
    // Cross-domain
    "uiux", "digital_marketing",
    // General
    "general_pass",
  ],
  bsc: [
    // Life Sciences
    "wildlife_research", "animal_behavior", "marine_biology_domain",
    "plant_research", "horticulture", "forest_management",
    "clinical_microbiology", "industrial_microbiology", "virology_domain", "immunology_domain",
    "genetic_research", "bioinformatics", "biotech_research",
    // Physical Sciences
    "research", "academics", "nanotechnology_domain", "astrophysics", "materials_science",
    "neuroscience_research", "pharma_rd", "quality_assurance", "laboratory",
    // Math / Stats
    "data_analytics", "machine_learning", "actuarial",
    // Applied / Environment
    "environmental_consulting", "sustainability", "conservation",
    // General
    "general_pass",
  ],
  bdes: ["design"],
  bpharma: ["pharma_rd", "clinical_research", "regulatory"],
  nursing: ["healthcare", "clinical_research", "public_health"],
  hotel_management: [
    "hotel_operations", "food_beverage", "culinary",
    "event_management", "tourism", "luxury_management",
  ],
  mass_communication: [
    "journalism", "content_creation", "video_production",
    "broadcasting", "copywriting",
  ],
  law_llb: ["corporate_law", "litigation", "intellectual_property", "cyber_law"],
  animation_multimedia: ["motion_graphics", "3d_design", "game_art", "visual_design"],
  game_design: ["game_programming", "game_art", "level_design", "ar_vr", "game_testing"],
  fashion_design: ["fashion_styling", "textile_design", "fashion_merchandising"],
  interior_design: ["interior_styling", "space_planning", "architectural_design"],

  // --- New BSc-specific undergraduate fields ---
  bsc_zoology: ["wildlife_research", "conservation", "animal_behavior", "marine_biology_domain"],
  bsc_botany: ["plant_research", "horticulture", "forest_management", "agri_science"],
  bsc_microbiology: ["clinical_microbiology", "industrial_microbiology", "virology_domain", "immunology_domain", "pharma_rd", "data_analytics"],
  bsc_biotechnology: ["biotech_research", "bioinformatics", "pharma_rd", "genetic_research"],
  bsc_chemistry: ["research", "pharma_rd", "materials_science", "quality_assurance"],
  bsc_physics: ["research", "academics", "nanotechnology_domain", "astrophysics"],
  bsc_mathematics: ["data_analytics", "machine_learning", "actuarial", "research"],
  bsc_psychology: ["clinical_psychology", "counseling", "organizational_psychology", "uiux"],
  bsc_agriculture: ["agri_science", "agri_business", "food_technology"],
  bsc_food_technology: ["food_processing", "quality_assurance", "food_safety"],
  bsc_environmental_science: ["environmental_consulting", "sustainability", "conservation"],

  // --- MSc postgraduate fields ---
  msc_zoology: ["wildlife_research", "conservation", "research", "academics"],
  msc_botany: ["plant_research", "research", "academics", "forest_management"],
  msc_microbiology: ["clinical_microbiology", "industrial_microbiology", "pharma_rd", "virology_domain"],
  msc_biotechnology: ["biotech_research", "bioinformatics", "genetic_research", "pharma_rd"],
  msc_chemistry: ["research", "pharma_rd", "materials_science"],
  msc_physics: ["research", "nanotechnology_domain", "astrophysics", "academics"],
  msc_mathematics: ["data_analytics", "machine_learning", "actuarial", "ai_research"],
  msc_psychology: ["clinical_psychology", "counseling", "organizational_psychology"],
  mba: ["marketing", "accounting_finance", "human_resources", "operations", "strategy", "product_management"],
  mca: ["software_engineering", "data_science_ai", "cybersecurity"],
  msc_data_science: ["data_analytics", "machine_learning", "deep_learning", "big_data", "ai_research"],
  msc_environmental_science: ["environmental_consulting", "sustainability", "conservation"],

  // --- PhD fields ---
  phd_sciences: ["research", "academics", "ai_research"],
  phd_engineering: ["research", "academics", "robotics"],
  phd_arts: ["academics", "social_research", "policy_analysis"],
  phd_commerce: ["academics", "economic_research", "policy_analysis"],
  phd_life_sciences: ["research", "biotech_research", "pharma_rd", "genetic_research"],
  phd_social_sciences: ["academics", "social_research", "policy_analysis"],
  phd_computer_science: ["ai_research", "research", "machine_learning", "deep_learning"],

  // --- Bootcamp fields ---
  web_development: [
    "frontend", "backend", "fullstack", "mobile_app",
    "devops", "cloud", "api_engineering",
  ],
  data_science: [
    "data_analytics", "machine_learning", "deep_learning",
    "big_data", "business_intelligence",
  ],
  uiux_design: ["uiux"],
  graphic_design: ["graphic_design"],
  digital_marketing: [
    "digital_marketing", "seo", "performance_marketing",
    "social_media", "content_marketing",
  ],
  video_editing: ["video_production"],
  cybersecurity: [
    "ethical_hacking", "penetration_testing", "soc", "network_security",
    "cloud_security", "forensics_security",
  ],
  cloud_computing: ["cloud", "devops"],

  // --- Self-taught fields ---
  content_creation: ["content_creation", "video_production", "podcasting"],
  freelancing: ["graphic_design", "uiux", "frontend", "content_creation", "copywriting"],
  trading_investing: ["investment", "financial_planning", "fintech"],
  startup: ["product_management", "growth_marketing", "startup_ops"],
  creator_economy: ["content_creation", "social_media", "video_production"],

  // --- Sub-domains of engineering ---
  software_engineering: [
    "frontend", "backend", "fullstack", "mobile_app",
    "devops", "cloud", "api_engineering", "microservices",
    "blockchain", "web3",
  ],

  // --- Sub-domains of game_development ---
  game_development: [
    "game_programming", "game_design", "level_design", "game_art",
    "technical_art", "ar_vr", "game_testing",
  ],
};

// ============================================================================
// ROLES BY DOMAIN/SUBDOMAIN (leaf domain → roles)
// ============================================================================
export const rolesByDomain: Record<string, string[]> = {
  // Software Engineering subdomains
  frontend: ["frontend_developer", "react_developer", "ui_engineer"],
  backend: ["backend_developer", "api_developer", "database_engineer"],
  fullstack: ["fullstack_developer", "software_engineer"],
  cloud: ["cloud_engineer", "aws_engineer", "cloud_architect"],
  devops: ["devops_engineer", "site_reliability_engineer"],
  mobile_app: ["mobile_developer", "ios_developer", "android_developer"],
  api_engineering: ["api_developer", "integration_engineer"],
  microservices: ["backend_developer", "software_architect"],
  blockchain: ["blockchain_developer", "smart_contract_developer"],
  web3: ["web3_developer", "blockchain_developer"],

  // Engineering branches (non-software)
  mechanical: ["mechanical_engineer", "design_engineer", "manufacturing_engineer"],
  civil: ["civil_engineer", "structural_engineer", "site_engineer"],
  electrical: ["electrical_engineer", "power_systems_engineer"],
  electronics: ["electronics_engineer", "embedded_systems_engineer"],
  robotics: ["robotics_engineer", "automation_engineer"],
  automobile: ["automobile_engineer", "automotive_designer"],
  aerospace: ["aerospace_engineer", "flight_test_engineer"],
  marine: ["marine_engineer", "naval_architect"],
  industrial_engineering: ["industrial_engineer", "process_engineer"],

  // Data Science & AI
  data_analytics: ["data_analyst", "business_analyst"],
  machine_learning: ["ml_engineer", "ai_engineer", "data_scientist"],
  deep_learning: ["deep_learning_engineer", "ai_researcher"],
  nlp: ["nlp_engineer", "chatbot_developer"],
  computer_vision: ["cv_engineer", "image_processing_engineer"],
  ai_research: ["ai_researcher", "research_scientist"],
  big_data: ["big_data_engineer", "data_architect"],
  business_intelligence: ["bi_analyst", "bi_developer"],

  // Cybersecurity
  ethical_hacking: ["ethical_hacker", "penetration_tester"],
  penetration_testing: ["penetration_tester", "security_consultant"],
  soc: ["soc_analyst", "incident_responder"],
  network_security: ["network_security_engineer", "firewall_engineer"],
  cloud_security: ["cloud_security_engineer", "security_architect"],
  forensics_security: ["forensics_analyst", "cyber_forensics_investigator"],

  // Game Development
  game_programming: [
    "game_developer", "unity_developer", "unreal_developer",
    "gameplay_programmer", "physics_programmer",
  ],
  game_design: ["game_designer", "narrative_designer"],
  level_design: ["level_designer", "world_builder"],
  game_art: ["game_artist", "concept_artist", "character_artist"],
  technical_art: ["technical_artist", "shader_programmer"],
  ar_vr: ["ar_developer", "vr_developer", "xr_engineer"],
  game_testing: ["qa_tester", "game_tester"],

  // Design
  graphic_design: [
    "graphic_designer", "brand_designer", "layout_artist", "packaging_designer",
  ],
  uiux: ["ui_designer", "ux_designer", "ux_researcher", "product_designer"],
  motion_graphics: ["motion_graphics_artist", "animator"],
  "3d_design": [
    "3d_modeler", "texturing_artist", "lighting_artist",
    "rigging_artist", "compositing_artist",
  ],
  branding: ["brand_strategist", "brand_designer"],
  visual_design: ["visual_designer", "creative_director"],
  product_design: ["product_designer", "ux_designer"],
  interaction_design: ["interaction_designer", "ux_engineer"],
  game_art_design: ["game_artist", "concept_artist"],

  // Media & Communication
  journalism: ["journalist", "reporter", "editor"],
  content_creation: ["content_creator", "youtuber", "influencer"],
  copywriting: ["copywriter", "content_writer"],
  scriptwriting: ["scriptwriter", "screenwriter"],
  video_production: [
    "video_editor", "motion_graphics_artist", "color_grader",
    "post_production_artist",
  ],
  podcasting: ["podcast_producer", "audio_engineer"],
  broadcasting: ["broadcaster", "radio_jockey", "news_anchor"],

  // Accounting & Finance
  accounting: ["accountant", "chartered_accountant", "tax_consultant"],
  taxation: ["tax_consultant", "tax_advisor"],
  audit: ["auditor", "internal_auditor"],
  investment: ["investment_banker", "equity_analyst", "portfolio_manager"],
  risk_management: ["risk_analyst", "risk_manager"],
  financial_planning: ["financial_planner", "wealth_advisor"],
  fintech: ["fintech_developer", "product_manager_fintech"],

  // Marketing
  digital_marketing: ["digital_marketer", "seo_specialist", "ppc_specialist"],
  seo: ["seo_specialist", "seo_analyst"],
  performance_marketing: ["performance_marketer", "growth_hacker"],
  social_media: ["social_media_manager", "community_manager"],
  growth_marketing: ["growth_marketer", "growth_hacker"],
  content_marketing: ["content_strategist", "content_marketer"],

  // Hotel Management
  hotel_operations: ["hotel_manager", "front_office_manager"],
  food_beverage: ["fb_manager", "restaurant_manager"],
  culinary: ["chef", "pastry_chef"],
  event_management: ["event_manager", "event_coordinator"],
  tourism: ["travel_consultant", "tour_operator"],
  luxury_management: ["luxury_brand_manager", "concierge_manager"],

  // Medical / Healthcare
  healthcare: ["healthcare_administrator", "hospital_manager"],
  clinical_research: ["clinical_researcher", "research_associate"],
  public_health: ["public_health_officer", "epidemiologist"],

  // Sciences
  research: ["research_scientist", "lab_researcher"],
  academics: ["professor", "lecturer", "academic_researcher"],
  laboratory: ["lab_technician", "research_assistant"],

  // Biotech / Pharma
  biotech_research: ["biotech_researcher", "genetic_engineer"],
  bioinformatics: ["bioinformatics_analyst", "computational_biologist"],
  pharma_rd: ["pharma_researcher", "drug_development_scientist"],
  regulatory: ["regulatory_affairs_specialist", "compliance_officer"],

  // Architecture
  architectural_design: ["architect", "architectural_designer"],
  urban_planning: ["urban_planner", "city_planner"],

  // Aviation
  aviation_service: ["air_hostess", "cabin_crew", "ground_staff"],
  aircraft_maintenance: ["aircraft_maintenance_engineer", "ame_technician"],
  air_traffic: ["air_traffic_controller"],

  // Defence
  defence_services: ["defence_officer", "military_strategist"],
  strategic_studies: ["defence_analyst", "security_consultant"],

  // Environment
  environmental_consulting: ["environmental_consultant", "sustainability_analyst"],
  sustainability: ["sustainability_manager", "green_energy_consultant"],
  conservation: ["conservation_officer", "wildlife_biologist"],

  // Forensic
  criminal_investigation: ["forensic_investigator", "crime_scene_analyst"],

  // Agriculture
  agri_science: ["agricultural_scientist", "agronomist"],
  agri_business: ["agri_business_manager", "farm_manager"],

  // Food Technology
  food_processing: ["food_technologist", "food_engineer"],
  quality_assurance: ["qa_manager", "quality_inspector"],
  food_safety: ["food_safety_officer", "regulatory_inspector"],

  // Sports
  sports_coaching: ["sports_coach", "fitness_trainer"],
  sports_management: ["sports_manager", "sports_agent"],
  fitness: ["fitness_trainer", "wellness_coach"],

  // Business Management subdomains
  operations: ["operations_manager", "supply_chain_manager"],
  human_resources: ["hr_manager", "talent_acquisition_specialist"],
  strategy: ["management_consultant", "strategy_analyst"],

  // Economics
  economic_research: ["economist", "research_analyst"],
  policy_analysis: ["policy_analyst", "public_policy_researcher"],

  // Banking
  retail_banking: ["bank_manager", "relationship_manager"],

  // Law
  corporate_law: ["corporate_lawyer", "legal_advisor"],
  litigation: ["litigator", "trial_lawyer"],
  intellectual_property: ["ip_lawyer", "patent_attorney"],
  cyber_law: ["cyber_lawyer", "legal_tech_consultant"],

  // Supply Chain
  logistics: ["logistics_manager", "supply_chain_analyst"],
  procurement: ["procurement_manager", "sourcing_specialist"],
  warehouse_management: ["warehouse_manager", "inventory_analyst"],

  // Retail
  store_operations: ["store_manager", "retail_operations_manager"],
  merchandising: ["merchandiser", "visual_merchandiser"],

  // Insurance
  underwriting: ["underwriter", "risk_assessor"],
  actuarial: ["actuary", "actuarial_analyst"],
  claims_management: ["claims_manager", "claims_adjuster"],

  // International Business
  trade_compliance: ["trade_compliance_officer", "export_manager"],
  global_strategy: ["international_business_consultant", "global_strategy_analyst"],
  export_management: ["export_manager", "trade_specialist"],

  // E-commerce
  ecommerce_ops: ["ecommerce_manager", "marketplace_analyst"],
  product_management: ["product_manager", "product_owner"],

  // Psychology
  clinical_psychology: ["clinical_psychologist", "therapist"],
  counseling: ["counselor", "guidance_counselor"],
  organizational_psychology: ["organizational_psychologist", "hr_consultant"],

  // Fine Arts
  painting: ["painter", "visual_artist"],
  sculpture: ["sculptor", "installation_artist"],
  printmaking: ["printmaker", "graphic_artist"],
  art_curation: ["art_curator", "gallery_manager"],

  // Performing Arts
  theatre: ["theatre_actor", "theatre_director"],
  dance: ["dancer", "choreographer"],
  music_performance: ["musician", "music_director"],

  // Social Sciences
  social_research: ["social_researcher", "survey_analyst"],
  community_development: ["community_organizer", "ngo_worker"],
  ngo_management: ["ngo_manager", "program_coordinator"],

  // Languages
  translation: ["translator", "localization_specialist"],
  interpretation: ["interpreter", "conference_interpreter"],
  linguistics: ["linguist", "language_researcher"],

  // Education
  curriculum_design: ["curriculum_designer", "instructional_designer"],
  edtech: ["edtech_product_manager", "learning_designer"],
  training_development: ["corporate_trainer", "training_manager"],

  // Philosophy / History / Political Science (academics path)
  ethics_consulting: ["ethics_consultant", "compliance_advisor"],
  archival_studies: ["archivist", "records_manager"],
  museum_curation: ["museum_curator", "heritage_manager"],
  public_administration: ["public_administrator", "civil_servant"],
  diplomacy: ["diplomat", "foreign_affairs_officer"],

  // Fashion
  fashion_styling: ["fashion_stylist", "wardrobe_consultant"],
  textile_design: ["textile_designer", "fabric_technologist"],
  fashion_merchandising: ["fashion_merchandiser", "buyer"],

  // Interior Design
  interior_styling: ["interior_designer", "interior_stylist"],
  space_planning: ["space_planner", "office_designer"],

  // Misc
  diagnostics: ["diagnostic_technician", "medical_lab_technician"],
  rehabilitation: ["physiotherapist", "occupational_therapist"],
  startup_ops: ["startup_founder", "coo"],

  // ============ NEW LIFE SCIENCE DOMAINS ============
  wildlife_research: ["zoologist", "wildlife_biologist", "conservation_biologist"],
  animal_behavior: ["animal_behaviorist", "zoologist"],
  marine_biology_domain: ["marine_biologist", "oceanographer"],
  plant_research: ["botanist", "plant_geneticist", "horticulturist"],
  horticulture: ["horticulturist", "landscape_designer"],
  forest_management: ["forest_officer", "environmental_consultant"],
  clinical_microbiology: ["clinical_microbiologist", "diagnostic_technician"],
  industrial_microbiology: ["industrial_microbiologist", "fermentation_technologist"],
  virology_domain: ["virologist", "vaccine_researcher"],
  immunology_domain: ["immunologist", "vaccine_researcher"],
  genetic_research: ["geneticist", "genetic_counselor", "genetic_engineer"],
  nanotechnology_domain: ["nanotech_engineer", "nanotech_researcher"],
  materials_science: ["materials_scientist", "nanotech_researcher"],
  astrophysics: ["astrophysicist", "research_scientist"],
  neuroscience_research: ["neuroscientist", "cognitive_scientist"],

  // ============ LANGUAGE DOMAINS (BA) ============
  english_domain: ["content_writer", "journalist", "editor", "translator", "professor", "lecturer", "copywriter"],
  bengali_domain: ["translator", "content_writer", "journalist", "professor", "lecturer"],
  hindi_domain: ["translator", "content_writer", "journalist", "professor", "lecturer"],
  sanskrit_domain: ["translator", "professor", "lecturer", "academic_researcher"],
  regional_languages_domain: ["translator", "interpreter", "content_writer", "professor", "lecturer"],

  // ============ GEOGRAPHY DOMAIN (BA) ============
  geography_domain: ["urban_planner", "environmental_consultant", "gis_analyst", "research_scientist"],

  // ============ GENERAL (PASS) DOMAIN ============
  general_pass: [
    "content_writer", "digital_marketer", "data_analyst", "social_media_manager",
    "hr_manager", "customer_service_exec", "community_organizer",
  ],
};

// ============================================================================
// CROSS-DOMAIN RULES
// ============================================================================
export const crossDomainRules = [
  { if: ["12_arts"], allow: ["uiux", "graphic_design", "content_creation", "frontend"] },
  { if: ["12_commerce"], allow: ["digital_marketing", "data_analytics", "product_management"] },
  { if: ["12_science"], allow: ["design", "animation_multimedia", "game_development"] },
  { if: ["diploma"], allow: ["frontend", "graphic_design", "digital_marketing", "uiux", "content_creation"] },
  { if: ["any"], allow: ["freelancing", "content_creation", "entrepreneurship"] },
  // Cross-domain transitions
  { if: ["bsc_microbiology"], allow: ["data_analytics", "pharma_rd", "bioinformatics", "machine_learning"] },
  { if: ["bsc_psychology"], allow: ["uiux", "counseling", "organizational_psychology", "human_resources"] },
  { if: ["bcom"], allow: ["digital_marketing", "data_analytics", "product_management", "startup_ops"] },
  { if: ["bsc_zoology"], allow: ["data_analytics", "environmental_consulting", "research"] },
  { if: ["bsc_botany"], allow: ["agri_science", "research", "environmental_consulting"] },
  { if: ["bsc_biotechnology"], allow: ["data_analytics", "pharma_rd", "machine_learning"] },
  { if: ["ba"], allow: ["uiux", "digital_marketing", "content_creation", "frontend"] },
];

// ============================================================================
// HIERARCHY NAVIGATION HELPERS
// ============================================================================

/** Get fields of study for an education level */
export function getFieldsForEducation(educationId: string): string[] {
  return fieldsByEducation[educationId] ?? [];
}

/** Get domains for a field of study (returns empty if field has no domain breakdown) */
export function getDomainsForField(fieldId: string): string[] {
  return domainsByField[fieldId] ?? [];
}

/** Check if a domain has sub-domains */
export function hasSubdomains(domainId: string): boolean {
  return domainId in domainsByField;
}

/** Get sub-domains for a domain */
export function getSubdomains(domainId: string): string[] {
  return domainsByField[domainId] ?? [];
}

/** Get roles for a leaf domain/subdomain */
export function getRolesForDomain(domainId: string): string[] {
  return rolesByDomain[domainId] ?? [];
}

/** Check if a domain has roles directly */
export function hasRoles(domainId: string): boolean {
  return domainId in rolesByDomain;
}

/**
 * Check if a domain eventually leads to roles (directly or through subdomains).
 */
export function domainLeadsToRoles(domainId: string): boolean {
  if (hasRoles(domainId)) return true;
  if (hasSubdomains(domainId)) {
    return getSubdomains(domainId).some(sub => domainLeadsToRoles(sub));
  }
  return false;
}

/**
 * Get cross-domain allowed domains for a given education level and optionally field.
 * Now supports field-level cross-domain rules in addition to education-level rules.
 */
export function getCrossDomainDomains(educationId: string, fieldId?: string): string[] {
  const allowed: string[] = [];
  for (const rule of crossDomainRules) {
    if (
      rule.if.includes(educationId) ||
      rule.if.includes("any") ||
      (fieldId && rule.if.includes(fieldId))
    ) {
      allowed.push(...rule.allow);
    }
  }
  return [...new Set(allowed)].filter(d => domainLeadsToRoles(d));
}

/**
 * Get ALL available career domains for a field + education combination.
 * Only returns domains that eventually lead to roles.
 */
export function getAllDomainsForFieldAndEducation(fieldId: string, educationId: string): string[] {
  const directDomains = domainsByField[fieldId] ?? [];
  const crossDomains = getCrossDomainDomains(educationId, fieldId);
  return [...new Set([...directDomains, ...crossDomains])].filter(d => domainLeadsToRoles(d));
}

// ============================================================================
// TECHNICAL SKILLS BY ROLE (role_id → skills list)
// ============================================================================
export const skillsByRole: Record<string, string[]> = {
  // Software Engineering
  frontend_developer: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Responsive Design"],
  react_developer: ["React", "TypeScript", "Redux", "Next.js", "CSS-in-JS"],
  ui_engineer: ["HTML/CSS", "JavaScript", "Design Systems", "Accessibility", "Figma-to-Code"],
  backend_developer: ["Node.js", "Python", "SQL", "REST APIs", "System Design"],
  api_developer: ["REST APIs", "GraphQL", "Node.js", "Authentication", "API Documentation"],
  database_engineer: ["SQL", "PostgreSQL", "MongoDB", "Data Modeling", "Query Optimization"],
  fullstack_developer: ["React", "Node.js", "SQL", "Git", "Docker"],
  software_engineer: ["Data Structures", "Algorithms", "System Design", "Python", "Git"],
  cloud_engineer: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux"],
  aws_engineer: ["AWS Services", "CloudFormation", "Lambda", "EC2", "S3"],
  cloud_architect: ["Cloud Architecture", "AWS/Azure/GCP", "Microservices", "Security", "Cost Optimization"],
  devops_engineer: ["CI/CD", "Docker", "Kubernetes", "Linux", "Terraform"],
  site_reliability_engineer: ["Monitoring", "Incident Management", "Linux", "Automation", "SLA Management"],
  mobile_developer: ["React Native", "Flutter", "iOS/Android", "REST APIs", "UI/UX"],
  ios_developer: ["Swift", "SwiftUI", "Xcode", "Core Data", "App Store Deployment"],
  android_developer: ["Kotlin", "Jetpack Compose", "Android SDK", "Firebase", "Material Design"],
  integration_engineer: ["API Integration", "Middleware", "ETL", "REST/SOAP", "Data Mapping"],
  software_architect: ["System Design", "Microservices", "Design Patterns", "Scalability", "Tech Leadership"],
  blockchain_developer: ["Solidity", "Web3.js", "Smart Contracts", "Ethereum", "DeFi"],
  smart_contract_developer: ["Solidity", "Hardhat", "Auditing", "Gas Optimization", "ERC Standards"],
  web3_developer: ["Web3.js", "Solidity", "IPFS", "DApps", "Wallet Integration"],

  // Mechanical / Civil / Other Engineering
  mechanical_engineer: ["Thermodynamics", "CAD", "MATLAB", "Mechanics", "Manufacturing"],
  design_engineer: ["SolidWorks", "CAD", "Product Design", "GD&T", "Prototyping"],
  manufacturing_engineer: ["Lean Manufacturing", "CNC", "Quality Control", "Process Design", "CAD"],
  civil_engineer: ["AutoCAD", "Surveying", "Structural Analysis", "Soil Mechanics", "STAAD Pro"],
  structural_engineer: ["Structural Analysis", "STAAD Pro", "RCC Design", "Steel Design", "ETABS"],
  site_engineer: ["Site Management", "AutoCAD", "Surveying", "Safety Standards", "Quality Control"],
  electrical_engineer: ["Circuit Design", "Power Systems", "PLC", "MATLAB", "Electrical Safety"],
  power_systems_engineer: ["Power Generation", "Grid Systems", "SCADA", "Protection Systems", "Load Analysis"],
  electronics_engineer: ["Circuit Design", "Embedded C", "PCB Design", "Microcontrollers", "VLSI"],
  embedded_systems_engineer: ["Embedded C", "RTOS", "ARM", "IoT Protocols", "Firmware Development"],
  robotics_engineer: ["ROS", "Python", "Control Systems", "Sensors", "Machine Vision"],
  automation_engineer: ["PLC", "SCADA", "Industrial Automation", "Python", "Process Control"],
  automobile_engineer: ["Automotive Design", "CAD", "IC Engines", "Vehicle Dynamics", "MATLAB"],
  automotive_designer: ["Car Design", "SolidWorks", "Aerodynamics", "Prototyping", "Sketching"],
  aerospace_engineer: ["Aerodynamics", "MATLAB", "Propulsion", "CFD", "Structural Analysis"],
  flight_test_engineer: ["Flight Testing", "Data Acquisition", "Aerodynamics", "Instrumentation", "Safety"],
  marine_engineer: ["Marine Systems", "Thermodynamics", "Ship Design", "Navigation", "Safety"],
  naval_architect: ["Ship Design", "Hydrodynamics", "CAD", "Structural Analysis", "Marine Systems"],
  industrial_engineer: ["Operations Research", "Lean Six Sigma", "Supply Chain", "Quality Management", "Statistics"],
  process_engineer: ["Process Optimization", "Six Sigma", "Chemical Engineering", "Data Analysis", "Quality"],

  // Data Science & AI
  data_analyst: ["SQL", "Excel", "Python", "Data Visualization", "Statistics"],
  business_analyst: ["SQL", "Excel", "PowerBI", "Requirements Gathering", "Domain Knowledge"],
  ml_engineer: ["Python", "TensorFlow", "Scikit-learn", "Feature Engineering", "Model Deployment"],
  ai_engineer: ["Python", "Deep Learning", "NLP", "Computer Vision", "MLOps"],
  data_scientist: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization"],
  deep_learning_engineer: ["PyTorch", "TensorFlow", "Neural Networks", "GPU Computing", "Research Papers"],
  ai_researcher: ["Research Methods", "Mathematics", "Python", "Paper Writing", "Experimentation"],
  nlp_engineer: ["NLP", "Python", "Transformers", "Text Processing", "LLMs"],
  chatbot_developer: ["NLP", "Dialog Systems", "Python", "API Integration", "UX Writing"],
  cv_engineer: ["OpenCV", "Deep Learning", "Image Processing", "Python", "Object Detection"],
  image_processing_engineer: ["Image Processing", "OpenCV", "MATLAB", "Computer Vision", "Signal Processing"],
  research_scientist: ["Research Methods", "Statistics", "Python", "Academic Writing", "Experimentation"],
  big_data_engineer: ["Hadoop", "Spark", "Kafka", "SQL", "Data Pipelines"],
  data_architect: ["Data Modeling", "SQL", "ETL", "Data Warehousing", "Cloud Platforms"],
  bi_analyst: ["PowerBI", "Tableau", "SQL", "Data Modeling", "DAX"],
  bi_developer: ["PowerBI", "SQL", "ETL", "Data Warehousing", "Report Design"],

  // Cybersecurity
  ethical_hacker: ["Penetration Testing", "Kali Linux", "Networking", "Web Security", "OWASP"],
  penetration_tester: ["Burp Suite", "Metasploit", "Kali Linux", "Web App Security", "Reporting"],
  security_consultant: ["Risk Assessment", "Security Auditing", "Compliance", "Network Security", "Incident Response"],
  soc_analyst: ["SIEM", "Threat Detection", "Incident Response", "Log Analysis", "Networking"],
  incident_responder: ["Incident Handling", "Forensics", "Malware Analysis", "SIEM", "Communication"],
  network_security_engineer: ["Firewalls", "VPN", "IDS/IPS", "Network Protocols", "Security Policies"],
  firewall_engineer: ["Firewall Configuration", "Network Security", "VPN", "Cisco/Palo Alto", "Policy Management"],
  cloud_security_engineer: ["Cloud Security", "AWS/Azure Security", "IAM", "Encryption", "Compliance"],
  security_architect: ["Security Architecture", "Zero Trust", "Cloud Security", "Risk Management", "Compliance"],
  forensics_analyst: ["Digital Forensics", "Evidence Collection", "Chain of Custody", "Tool Usage", "Report Writing"],
  cyber_forensics_investigator: ["Cyber Forensics", "Malware Analysis", "Evidence Recovery", "Legal Procedures", "EnCase"],

  // Game Development
  game_developer: ["C++", "Unity", "Game Physics", "3D Math", "Optimization"],
  unity_developer: ["C#", "Unity Engine", "Game Design", "Physics", "Animation"],
  unreal_developer: ["C++", "Unreal Engine", "Blueprints", "Level Design", "Optimization"],
  gameplay_programmer: ["C++/C#", "Game AI", "Physics", "Multiplayer", "Input Systems"],
  physics_programmer: ["Physics Simulation", "C++", "Mathematics", "Collision Detection", "Optimization"],
  game_designer: ["Game Mechanics", "Level Design", "Player Psychology", "Prototyping", "Documentation"],
  narrative_designer: ["Story Writing", "Dialog Systems", "World Building", "Player Agency", "Scriptwriting"],
  level_designer: ["Level Editors", "3D Tools", "Game Flow", "Player Experience", "Prototyping"],
  world_builder: ["Environment Design", "3D Modeling", "Terrain Tools", "Lighting", "Asset Placement"],
  game_artist: ["Digital Art", "Photoshop", "3D Modeling", "Texturing", "Character Design"],
  concept_artist: ["Illustration", "Photoshop", "Color Theory", "Anatomy", "Environment Design"],
  character_artist: ["3D Modeling", "ZBrush", "Texturing", "Anatomy", "Rigging"],
  technical_artist: ["Shaders", "VFX", "Python/MEL", "Pipeline Tools", "Performance Optimization"],
  shader_programmer: ["HLSL/GLSL", "Rendering Pipeline", "Mathematics", "GPU Programming", "VFX"],
  ar_developer: ["ARKit/ARCore", "Unity", "3D Math", "Computer Vision", "Mobile Dev"],
  vr_developer: ["VR SDKs", "Unity/Unreal", "3D Interaction", "Spatial Audio", "Performance"],
  xr_engineer: ["XR Frameworks", "Unity", "3D Math", "Interaction Design", "Prototyping"],
  qa_tester: ["Test Planning", "Bug Reporting", "Regression Testing", "Automation", "Communication"],
  game_tester: ["Game Testing", "Bug Reporting", "Playtesting", "Compliance Testing", "Attention to Detail"],

  // Design
  graphic_designer: ["Adobe Illustrator", "Photoshop", "Typography", "Color Theory", "Layout Design"],
  brand_designer: ["Branding", "Adobe Suite", "Typography", "Visual Identity", "Brand Guidelines"],
  layout_artist: ["InDesign", "Typography", "Grid Systems", "Print Design", "Editorial Design"],
  packaging_designer: ["Packaging Design", "Illustrator", "3D Mockups", "Print Production", "Branding"],
  ui_designer: ["Figma", "UI Design", "Design Systems", "Prototyping", "Typography"],
  ux_designer: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Information Architecture"],
  ux_researcher: ["User Research", "Surveys", "Usability Testing", "Data Analysis", "Interview Skills"],
  product_designer: ["Figma", "User Research", "Prototyping", "Design Systems", "Product Thinking"],
  motion_graphics_artist: ["After Effects", "Motion Design", "Animation Principles", "Cinema 4D", "Storyboarding"],
  animator: ["Animation Principles", "After Effects", "Maya/Blender", "Storyboarding", "Timing"],
  "3d_modeler": ["Blender", "Maya", "ZBrush", "Texturing", "UV Mapping"],
  texturing_artist: ["Substance Painter", "UV Mapping", "PBR Materials", "Photoshop", "Texturing"],
  lighting_artist: ["Lighting Design", "Maya/Blender", "Color Theory", "Rendering", "Compositing"],
  rigging_artist: ["Rigging", "Maya", "Skinning", "Python Scripting", "Character Animation"],
  compositing_artist: ["Nuke", "After Effects", "Compositing", "Color Grading", "VFX"],
  brand_strategist: ["Brand Strategy", "Market Research", "Positioning", "Storytelling", "Competitive Analysis"],
  visual_designer: ["Visual Design", "Adobe Suite", "Typography", "Color Theory", "UI Design"],
  creative_director: ["Creative Leadership", "Brand Strategy", "Art Direction", "Team Management", "Storytelling"],
  interaction_designer: ["Interaction Design", "Prototyping", "Micro-interactions", "Animation", "User Flows"],
  ux_engineer: ["Frontend Dev", "Design Systems", "Accessibility", "Prototyping", "CSS/HTML"],

  // Media & Communication
  journalist: ["News Writing", "Reporting", "Research", "Interviewing", "Ethics"],
  reporter: ["News Gathering", "Writing", "Fact-Checking", "Interviewing", "Deadlines"],
  editor: ["Editing", "Proofreading", "Content Strategy", "Style Guides", "Communication"],
  content_creator: ["Content Strategy", "Video Editing", "Social Media", "Copywriting", "Analytics"],
  youtuber: ["Video Production", "Editing", "Thumbnails", "SEO", "Audience Engagement"],
  influencer: ["Social Media Strategy", "Content Creation", "Brand Partnerships", "Analytics", "Community"],
  copywriter: ["Copywriting", "SEO Writing", "Brand Voice", "Research", "Editing"],
  content_writer: ["Content Writing", "SEO", "Research", "Grammar", "CMS Tools"],
  scriptwriter: ["Scriptwriting", "Story Structure", "Dialog Writing", "Formatting", "Research"],
  screenwriter: ["Screenplay Writing", "Story Structure", "Character Development", "Dialog", "Industry Knowledge"],
  video_editor: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design", "Storytelling"],
  color_grader: ["DaVinci Resolve", "Color Theory", "LUTs", "Scopes", "Cinematic Grading"],
  post_production_artist: ["After Effects", "Compositing", "Color Grading", "Sound Editing", "VFX"],
  podcast_producer: ["Audio Recording", "Editing", "Content Planning", "Distribution", "Interviewing"],
  audio_engineer: ["Audio Mixing", "DAW Tools", "Sound Design", "Mastering", "Acoustics"],
  broadcaster: ["Broadcasting", "Presentation", "Script Reading", "Live Production", "Communication"],
  radio_jockey: ["Voice Modulation", "Script Writing", "Music Knowledge", "Communication", "Improvisation"],
  news_anchor: ["News Reading", "Presentation", "Research", "Interviewing", "Live Broadcasting"],

  // Accounting & Finance
  accountant: ["Accounting", "Taxation", "Excel", "Tally", "Financial Reporting"],
  chartered_accountant: ["Auditing", "Taxation", "Financial Analysis", "Compliance", "Accounting Standards"],
  tax_consultant: ["Tax Planning", "Income Tax", "GST", "Compliance", "Tax Filing"],
  tax_advisor: ["Tax Strategy", "Wealth Planning", "Compliance", "Estate Planning", "Tax Law"],
  auditor: ["Auditing Standards", "Risk Assessment", "Internal Controls", "Compliance", "Report Writing"],
  internal_auditor: ["Internal Audit", "Risk Management", "Compliance", "Process Review", "Data Analysis"],
  investment_banker: ["Financial Modeling", "Valuation", "M&A", "Excel", "Due Diligence"],
  equity_analyst: ["Equity Research", "Financial Analysis", "Valuation", "Report Writing", "Industry Knowledge"],
  portfolio_manager: ["Portfolio Theory", "Risk Management", "Asset Allocation", "Financial Analysis", "Bloomberg"],
  risk_analyst: ["Risk Modeling", "Statistics", "Excel", "Regulatory Knowledge", "Reporting"],
  risk_manager: ["Risk Assessment", "Compliance", "Financial Regulations", "Data Analysis", "Strategy"],
  financial_planner: ["Financial Planning", "Insurance", "Mutual Funds", "Tax Planning", "Client Management"],
  wealth_advisor: ["Wealth Management", "Investment Advisory", "Tax Planning", "Estate Planning", "Client Relations"],
  fintech_developer: ["Python", "APIs", "Payment Systems", "Blockchain", "Security"],
  product_manager_fintech: ["Product Management", "Fintech Domain", "Agile", "Data Analysis", "UX"],

  // Marketing
  digital_marketer: ["SEO", "Google Ads", "Social Media", "Analytics", "Content Strategy"],
  seo_specialist: ["SEO", "Keyword Research", "Technical SEO", "Content Optimization", "Analytics"],
  seo_analyst: ["SEO Auditing", "Analytics", "Keyword Research", "Competitor Analysis", "Reporting"],
  ppc_specialist: ["Google Ads", "Facebook Ads", "Bid Management", "Analytics", "A/B Testing"],
  performance_marketer: ["Paid Ads", "Analytics", "Conversion Optimization", "A/B Testing", "ROI Analysis"],
  growth_hacker: ["Growth Strategies", "Analytics", "A/B Testing", "Product-Led Growth", "Automation"],
  social_media_manager: ["Social Media Strategy", "Content Creation", "Community Management", "Analytics", "Scheduling Tools"],
  community_manager: ["Community Building", "Engagement", "Content Moderation", "Communication", "Analytics"],
  growth_marketer: ["Growth Strategy", "Analytics", "SEO", "Email Marketing", "Conversion Optimization"],
  content_strategist: ["Content Strategy", "SEO", "Analytics", "Audience Research", "Editorial Planning"],
  content_marketer: ["Content Marketing", "SEO", "Copywriting", "Analytics", "Distribution"],

  // Hotel Management
  hotel_manager: ["Hotel Operations", "Guest Relations", "Revenue Management", "Leadership", "Budgeting"],
  front_office_manager: ["Front Desk Operations", "Guest Relations", "PMS Software", "Communication", "Conflict Resolution"],
  fb_manager: ["Food & Beverage Management", "Menu Planning", "Cost Control", "Hygiene Standards", "Team Management"],
  restaurant_manager: ["Restaurant Operations", "Customer Service", "Staff Management", "P&L Management", "Food Safety"],
  chef: ["Culinary Arts", "Menu Planning", "Food Safety", "Kitchen Management", "Creativity"],
  pastry_chef: ["Pastry Arts", "Baking Techniques", "Decoration", "Recipe Development", "Food Safety"],
  event_manager: ["Event Planning", "Vendor Management", "Budgeting", "Logistics", "Client Management"],
  event_coordinator: ["Event Coordination", "Communication", "Vendor Liaison", "Scheduling", "Problem Solving"],
  travel_consultant: ["Travel Planning", "Destination Knowledge", "Booking Systems", "Customer Service", "Sales"],
  tour_operator: ["Tour Planning", "Operations", "Customer Service", "Marketing", "Logistics"],
  luxury_brand_manager: ["Luxury Brand Management", "Client Relations", "Marketing", "Merchandising", "Trend Analysis"],
  concierge_manager: ["Guest Services", "Local Knowledge", "Communication", "Problem Solving", "Networking"],

  // Healthcare
  healthcare_administrator: ["Hospital Management", "Healthcare Policy", "Budgeting", "Compliance", "Leadership"],
  hospital_manager: ["Hospital Operations", "Staff Management", "Budgeting", "Quality Standards", "Patient Care"],
  clinical_researcher: ["Clinical Trials", "Research Methods", "Data Analysis", "Ethics", "Medical Writing"],
  research_associate: ["Lab Techniques", "Data Collection", "Research Methods", "Report Writing", "Statistics"],
  public_health_officer: ["Epidemiology", "Public Health Policy", "Data Analysis", "Communication", "Program Management"],
  epidemiologist: ["Epidemiology", "Biostatistics", "Research Design", "Data Analysis", "Public Health"],
  lab_researcher: ["Laboratory Techniques", "Research Methods", "Data Analysis", "Scientific Writing", "Safety"],
  lab_technician: ["Lab Equipment", "Sample Processing", "Quality Control", "Safety Protocols", "Documentation"],
  research_assistant: ["Research Support", "Data Entry", "Literature Review", "Lab Work", "Report Writing"],

  // Biotech / Pharma
  biotech_researcher: ["Biotechnology", "Molecular Biology", "Lab Techniques", "Data Analysis", "Scientific Writing"],
  genetic_engineer: ["Genetics", "CRISPR", "Molecular Biology", "Bioinformatics", "Lab Techniques"],
  bioinformatics_analyst: ["Bioinformatics", "Python/R", "Genomics", "Database Management", "Statistics"],
  computational_biologist: ["Computational Biology", "Python", "Machine Learning", "Genomics", "Statistics"],
  pharma_researcher: ["Drug Development", "Pharmacology", "Clinical Trials", "Lab Techniques", "Regulatory Affairs"],
  drug_development_scientist: ["Drug Discovery", "Pharmacology", "Chemistry", "Clinical Trials", "GMP"],
  regulatory_affairs_specialist: ["Regulatory Compliance", "FDA/CDSCO", "Documentation", "Quality Systems", "Drug Law"],
  compliance_officer: ["Regulatory Compliance", "Auditing", "Risk Management", "Documentation", "Policy"],

  // Architecture
  architect: ["Architectural Design", "AutoCAD", "Revit", "3D Modeling", "Building Codes"],
  architectural_designer: ["Design Thinking", "AutoCAD", "SketchUp", "Rendering", "Sustainability"],
  urban_planner: ["Urban Planning", "GIS", "Policy Analysis", "Community Engagement", "Sustainability"],
  city_planner: ["City Planning", "Zoning", "GIS", "Public Policy", "Transportation Planning"],

  // Aviation
  air_hostess: ["Customer Service", "Safety Procedures", "Communication", "First Aid", "Grooming"],
  cabin_crew: ["Safety Protocols", "Customer Service", "Emergency Procedures", "Communication", "Teamwork"],
  ground_staff: ["Airport Operations", "Customer Service", "Ticketing", "Baggage Handling", "Communication"],
  aircraft_maintenance_engineer: ["Aircraft Systems", "Maintenance Procedures", "Safety Standards", "Technical Skills", "Documentation"],
  ame_technician: ["Aircraft Maintenance", "Technical Documentation", "Safety Compliance", "Inspection", "Troubleshooting"],
  air_traffic_controller: ["Air Traffic Control", "Communication", "Decision Making", "Radar Systems", "Stress Management"],

  // Defence
  defence_officer: ["Leadership", "Strategy", "Physical Fitness", "Communication", "Decision Making"],
  military_strategist: ["Strategic Planning", "Intelligence Analysis", "Leadership", "Geopolitics", "Communication"],
  defence_analyst: ["Defence Analysis", "Research", "Geopolitics", "Report Writing", "Data Analysis"],

  // Environment
  environmental_consultant: ["Environmental Impact Assessment", "Sustainability", "Data Analysis", "Report Writing", "Regulations"],
  sustainability_analyst: ["Sustainability Reporting", "Data Analysis", "ESG Frameworks", "Research", "Communication"],
  sustainability_manager: ["Sustainability Strategy", "ESG Compliance", "Stakeholder Management", "Reporting", "Project Management"],
  green_energy_consultant: ["Renewable Energy", "Energy Auditing", "Sustainability", "Project Management", "Policy"],
  conservation_officer: ["Conservation Biology", "Wildlife Management", "Field Research", "Community Engagement", "Policy"],
  wildlife_biologist: ["Wildlife Biology", "Field Research", "Data Analysis", "GIS", "Scientific Writing"],

  // Forensic
  forensic_investigator: ["Crime Scene Investigation", "Evidence Collection", "Forensic Science", "Report Writing", "Legal Procedures"],
  crime_scene_analyst: ["Crime Scene Processing", "Evidence Analysis", "Photography", "Documentation", "Chain of Custody"],

  // Agriculture
  agricultural_scientist: ["Agronomy", "Soil Science", "Research Methods", "Data Analysis", "Crop Management"],
  agronomist: ["Crop Science", "Soil Management", "Pest Control", "Research", "Field Trials"],
  agri_business_manager: ["Agri-Business", "Supply Chain", "Marketing", "Finance", "Operations"],
  farm_manager: ["Farm Operations", "Crop Management", "Budgeting", "Equipment", "Labor Management"],

  // Food Technology
  food_technologist: ["Food Science", "Quality Control", "HACCP", "Product Development", "Food Safety"],
  food_engineer: ["Food Processing", "Equipment Design", "Quality Control", "R&D", "Food Safety"],
  qa_manager: ["Quality Assurance", "ISO Standards", "Auditing", "Process Improvement", "Documentation"],
  quality_inspector: ["Quality Inspection", "Standards Compliance", "Documentation", "Attention to Detail", "Reporting"],
  food_safety_officer: ["Food Safety", "FSSAI Regulations", "Auditing", "HACCP", "Training"],
  regulatory_inspector: ["Regulatory Compliance", "Inspection", "Documentation", "Standards Knowledge", "Reporting"],

  // Sports
  sports_coach: ["Coaching", "Sports Science", "Motivation", "Strategy", "Player Development"],
  fitness_trainer: ["Exercise Science", "Nutrition", "Client Assessment", "Program Design", "Motivation"],
  sports_manager: ["Sports Management", "Event Planning", "Marketing", "Budgeting", "Sponsorship"],
  sports_agent: ["Contract Negotiation", "Talent Scouting", "Marketing", "Legal Knowledge", "Networking"],
  wellness_coach: ["Wellness Planning", "Nutrition", "Mindfulness", "Client Coaching", "Holistic Health"],

  // Business Management
  operations_manager: ["Operations Management", "Process Improvement", "Budgeting", "Team Leadership", "Supply Chain"],
  supply_chain_manager: ["Supply Chain Management", "Logistics", "Inventory Management", "Procurement", "Analytics"],
  hr_manager: ["Recruitment", "Employee Relations", "Labor Law", "Performance Management", "HRIS"],
  talent_acquisition_specialist: ["Recruitment", "Sourcing", "Interviewing", "ATS Tools", "Employer Branding"],
  management_consultant: ["Business Analysis", "Strategy", "Problem Solving", "Presentations", "Client Management"],
  strategy_analyst: ["Strategic Analysis", "Market Research", "Financial Modeling", "Presentations", "Data Analysis"],

  // Economics
  economist: ["Economics", "Econometrics", "Data Analysis", "Research", "Report Writing"],
  research_analyst: ["Research", "Data Analysis", "Excel", "Report Writing", "Industry Knowledge"],
  policy_analyst: ["Policy Analysis", "Research", "Data Analysis", "Report Writing", "Public Policy"],
  public_policy_researcher: ["Public Policy", "Research Methods", "Data Analysis", "Academic Writing", "Governance"],

  // Banking
  bank_manager: ["Banking Operations", "Customer Service", "Risk Management", "Sales", "Compliance"],
  relationship_manager: ["Client Relations", "Financial Products", "Sales", "Portfolio Management", "Communication"],

  // Law
  corporate_lawyer: ["Corporate Law", "Contract Drafting", "M&A", "Compliance", "Negotiation"],
  legal_advisor: ["Legal Advisory", "Research", "Drafting", "Compliance", "Client Management"],
  litigator: ["Litigation", "Court Procedures", "Legal Research", "Argumentation", "Case Management"],
  trial_lawyer: ["Trial Advocacy", "Evidence", "Legal Research", "Cross-Examination", "Persuasion"],
  ip_lawyer: ["Intellectual Property", "Patent Filing", "Trademark Law", "Licensing", "Litigation"],
  patent_attorney: ["Patent Law", "Technical Writing", "Patent Prosecution", "IP Strategy", "Prior Art"],
  cyber_lawyer: ["Cyber Law", "Data Privacy", "IT Act", "Compliance", "Digital Rights"],
  legal_tech_consultant: ["Legal Tech", "Contract Automation", "AI in Law", "Process Improvement", "Compliance"],

  // Supply Chain
  logistics_manager: ["Logistics", "Supply Chain", "Warehouse Management", "Transportation", "Inventory"],
  supply_chain_analyst: ["Supply Chain Analytics", "Data Analysis", "Forecasting", "Excel", "Process Improvement"],
  procurement_manager: ["Procurement", "Vendor Management", "Negotiation", "Contract Management", "Cost Optimization"],
  sourcing_specialist: ["Sourcing", "Vendor Assessment", "Negotiation", "Market Research", "Cost Analysis"],
  warehouse_manager: ["Warehouse Operations", "Inventory Management", "WMS", "Safety", "Team Management"],
  inventory_analyst: ["Inventory Analysis", "Forecasting", "Excel", "ERP Systems", "Demand Planning"],

  // Retail
  store_manager: ["Store Operations", "Sales Management", "Customer Service", "Inventory", "Team Leadership"],
  retail_operations_manager: ["Retail Operations", "P&L Management", "Visual Merchandising", "Staff Management", "Strategy"],
  merchandiser: ["Merchandising", "Trend Analysis", "Inventory Planning", "Vendor Relations", "Visual Display"],
  visual_merchandiser: ["Visual Display", "Store Layout", "Brand Aesthetics", "Creativity", "Retail Knowledge"],

  // Insurance
  underwriter: ["Risk Assessment", "Policy Analysis", "Financial Analysis", "Regulations", "Decision Making"],
  risk_assessor: ["Risk Evaluation", "Data Analysis", "Insurance Products", "Compliance", "Reporting"],
  actuary: ["Actuarial Science", "Statistics", "Financial Modeling", "Risk Analysis", "Programming"],
  actuarial_analyst: ["Statistics", "Excel", "Actuarial Models", "Risk Analysis", "Data Visualization"],
  claims_manager: ["Claims Processing", "Investigation", "Negotiation", "Customer Service", "Compliance"],
  claims_adjuster: ["Claims Assessment", "Investigation", "Negotiation", "Documentation", "Communication"],

  // International Business
  trade_compliance_officer: ["Trade Compliance", "Import/Export Regulations", "Documentation", "Customs", "Risk Assessment"],
  export_manager: ["Export Operations", "Trade Documentation", "Logistics", "International Markets", "Compliance"],
  international_business_consultant: ["Global Strategy", "Market Research", "Cross-Cultural Communication", "Trade", "Consulting"],
  global_strategy_analyst: ["Global Markets", "Strategic Analysis", "Research", "Data Analysis", "Presentations"],
  trade_specialist: ["International Trade", "Market Analysis", "Documentation", "Logistics", "Regulations"],

  // E-commerce
  ecommerce_manager: ["E-Commerce Operations", "Digital Marketing", "Analytics", "Vendor Management", "Strategy"],
  marketplace_analyst: ["Marketplace Analytics", "Pricing Strategy", "Competitor Analysis", "Data Analysis", "Reporting"],
  product_manager: ["Product Strategy", "Roadmapping", "User Research", "Agile", "Analytics"],
  product_owner: ["Product Backlog", "Agile/Scrum", "Stakeholder Management", "User Stories", "Prioritization"],

  // Psychology
  clinical_psychologist: ["Clinical Assessment", "Therapy Techniques", "Psychometrics", "Ethics", "Case Formulation"],
  therapist: ["Counseling Techniques", "Active Listening", "CBT", "Ethics", "Case Management"],
  counselor: ["Counseling", "Active Listening", "Empathy", "Assessment", "Ethics"],
  guidance_counselor: ["Career Guidance", "Student Counseling", "Assessment", "Communication", "Program Design"],
  organizational_psychologist: ["Organizational Behavior", "HR Analytics", "Survey Design", "Training", "Research"],
  hr_consultant: ["HR Strategy", "Organizational Development", "Change Management", "Talent Management", "Analytics"],

  // Fine Arts
  painter: ["Painting Techniques", "Color Theory", "Composition", "Art History", "Portfolio Development"],
  visual_artist: ["Visual Art", "Mixed Media", "Conceptualization", "Exhibition", "Portfolio"],
  sculptor: ["Sculpting", "3D Form", "Materials", "Casting", "Exhibition"],
  installation_artist: ["Installation Art", "Spatial Design", "Conceptualization", "Materials", "Exhibition"],
  printmaker: ["Printmaking", "Etching", "Screen Printing", "Color Theory", "Edition Management"],
  graphic_artist: ["Graphic Art", "Digital Tools", "Typography", "Layout", "Print Production"],
  art_curator: ["Art Curation", "Exhibition Design", "Art History", "Research", "Collection Management"],
  gallery_manager: ["Gallery Operations", "Art Market", "Exhibition Planning", "Sales", "Client Relations"],

  // Performing Arts
  theatre_actor: ["Acting", "Voice Modulation", "Movement", "Script Analysis", "Improvisation"],
  theatre_director: ["Direction", "Script Interpretation", "Casting", "Staging", "Production Management"],
  dancer: ["Dance Techniques", "Choreography", "Musicality", "Physical Fitness", "Performance"],
  choreographer: ["Choreography", "Music Interpretation", "Creative Vision", "Teaching", "Production"],
  musician: ["Musical Instrument", "Music Theory", "Performance", "Composition", "Ear Training"],
  music_director: ["Music Direction", "Conducting", "Arrangement", "Team Leadership", "Production"],

  // Social Sciences
  social_researcher: ["Research Methods", "Survey Design", "Data Analysis", "Academic Writing", "Ethics"],
  survey_analyst: ["Survey Design", "Statistical Analysis", "SPSS/R", "Report Writing", "Sampling"],
  community_organizer: ["Community Engagement", "Advocacy", "Communication", "Leadership", "Program Planning"],
  ngo_worker: ["Fieldwork", "Community Development", "Report Writing", "Communication", "Project Management"],
  ngo_manager: ["NGO Management", "Fundraising", "Program Design", "Stakeholder Management", "Reporting"],
  program_coordinator: ["Program Coordination", "Planning", "Monitoring & Evaluation", "Communication", "Documentation"],

  // Languages
  translator: ["Translation", "Language Proficiency", "Cultural Knowledge", "CAT Tools", "Proofreading"],
  localization_specialist: ["Localization", "CAT Tools", "Cultural Adaptation", "QA", "Project Management"],
  interpreter: ["Interpretation", "Language Fluency", "Active Listening", "Note-Taking", "Cultural Sensitivity"],
  conference_interpreter: ["Simultaneous Interpretation", "Language Mastery", "Subject Expertise", "Concentration", "Ethics"],
  linguist: ["Linguistics", "Phonetics", "Syntax", "Research", "Academic Writing"],
  language_researcher: ["Language Research", "Data Collection", "Analysis", "Academic Writing", "Field Methods"],

  // Education
  curriculum_designer: ["Curriculum Design", "Pedagogy", "Assessment Design", "EdTech", "Content Development"],
  instructional_designer: ["Instructional Design", "E-Learning", "LMS", "Storyboarding", "Assessment"],
  edtech_product_manager: ["EdTech", "Product Management", "UX Research", "Learning Design", "Agile"],
  learning_designer: ["Learning Design", "E-Learning", "Content Creation", "Assessment", "LMS"],
  corporate_trainer: ["Training Delivery", "Curriculum Design", "Facilitation", "Assessment", "Communication"],
  training_manager: ["Training Strategy", "Program Management", "Budget", "Team Leadership", "Evaluation"],
  professor: ["Teaching", "Research", "Academic Writing", "Mentoring", "Curriculum Development"],
  lecturer: ["Teaching", "Subject Expertise", "Student Engagement", "Assessment", "Research"],
  academic_researcher: ["Research Methods", "Academic Writing", "Data Analysis", "Grant Writing", "Peer Review"],

  // Philosophy / History / Political Science
  ethics_consultant: ["Ethics", "Compliance", "Policy Analysis", "Communication", "Report Writing"],
  compliance_advisor: ["Compliance", "Regulatory Knowledge", "Auditing", "Risk Assessment", "Documentation"],
  archivist: ["Archival Science", "Cataloging", "Digital Preservation", "Research", "Documentation"],
  records_manager: ["Records Management", "Information Governance", "Digital Systems", "Compliance", "Organization"],
  museum_curator: ["Curation", "Art/History Knowledge", "Exhibition Design", "Research", "Collection Management"],
  heritage_manager: ["Heritage Management", "Conservation", "Research", "Public Engagement", "Policy"],
  public_administrator: ["Public Administration", "Policy Analysis", "Governance", "Budgeting", "Communication"],
  civil_servant: ["Administration", "Policy Implementation", "Public Service", "Communication", "Ethics"],
  diplomat: ["Diplomacy", "International Relations", "Negotiation", "Communication", "Cultural Awareness"],
  foreign_affairs_officer: ["Foreign Policy", "International Law", "Research", "Communication", "Negotiation"],

  // Fashion
  fashion_stylist: ["Fashion Styling", "Trend Forecasting", "Color Coordination", "Client Management", "Visual Merchandising"],
  wardrobe_consultant: ["Wardrobe Planning", "Fashion Knowledge", "Client Assessment", "Color Theory", "Shopping Skills"],
  textile_designer: ["Textile Design", "Fabric Knowledge", "Pattern Making", "CAD", "Color Theory"],
  fabric_technologist: ["Fabric Testing", "Quality Control", "Textile Science", "Standards", "R&D"],
  fashion_merchandiser: ["Fashion Merchandising", "Buying", "Trend Analysis", "Inventory", "Visual Display"],
  buyer: ["Buying", "Trend Forecasting", "Negotiation", "Vendor Management", "Budget Management"],

  // Interior Design
  interior_designer: ["Interior Design", "Space Planning", "AutoCAD", "Material Selection", "Color Theory"],
  interior_stylist: ["Interior Styling", "Aesthetics", "Furniture Selection", "Color Coordination", "Client Management"],
  space_planner: ["Space Planning", "CAD", "Ergonomics", "Building Codes", "Furniture Layout"],
  office_designer: ["Office Design", "Ergonomics", "Space Planning", "Sustainability", "Project Management"],

  // Misc
  diagnostic_technician: ["Diagnostic Equipment", "Patient Care", "Lab Techniques", "Safety", "Documentation"],
  medical_lab_technician: ["Lab Testing", "Equipment Operation", "Sample Processing", "Quality Control", "Safety"],
  physiotherapist: ["Physiotherapy", "Rehabilitation", "Patient Assessment", "Exercise Therapy", "Manual Therapy"],
  occupational_therapist: ["Occupational Therapy", "Patient Assessment", "Rehabilitation", "Activity Analysis", "Adaptive Equipment"],
  startup_founder: ["Business Strategy", "Fundraising", "Product Development", "Leadership", "Market Research"],
  coo: ["Operations Management", "Strategy", "Leadership", "Process Improvement", "Financial Management"],

  // ============ NEW LIFE SCIENCE & PHYSICAL SCIENCE ROLES ============
  zoologist: ["Zoology", "Field Research", "Animal Taxonomy", "Ecology", "Scientific Writing"],
  conservation_biologist: ["Conservation Biology", "Field Research", "GIS", "Data Analysis", "Grant Writing"],
  animal_behaviorist: ["Animal Behavior", "Research Methods", "Statistics", "Observation", "Scientific Writing"],
  marine_biologist: ["Marine Biology", "Field Research", "Ecology", "Data Analysis", "Diving Skills"],
  oceanographer: ["Oceanography", "Data Analysis", "Remote Sensing", "Climate Science", "Research"],
  botanist: ["Botany", "Plant Taxonomy", "Field Research", "Lab Techniques", "Scientific Writing"],
  plant_geneticist: ["Plant Genetics", "Molecular Biology", "Bioinformatics", "Lab Techniques", "Data Analysis"],
  horticulturist: ["Horticulture", "Plant Science", "Landscape Design", "Soil Science", "Pest Management"],
  landscape_designer: ["Landscape Design", "AutoCAD", "Plant Knowledge", "Sustainability", "Client Management"],
  forest_officer: ["Forest Management", "Conservation", "GIS", "Policy", "Field Research"],
  clinical_microbiologist: ["Clinical Microbiology", "Lab Techniques", "Infection Control", "Diagnostics", "Quality Control"],
  industrial_microbiologist: ["Industrial Microbiology", "Fermentation Technology", "Quality Control", "Lab Techniques", "Process Development"],
  fermentation_technologist: ["Fermentation Science", "Bioprocessing", "Quality Control", "Scale-up", "Microbiology"],
  virologist: ["Virology", "Lab Techniques", "Molecular Biology", "PCR", "Scientific Writing"],
  vaccine_researcher: ["Vaccine Development", "Immunology", "Clinical Trials", "Lab Techniques", "Regulatory Knowledge"],
  immunologist: ["Immunology", "Lab Techniques", "Flow Cytometry", "Research Methods", "Scientific Writing"],
  geneticist: ["Genetics", "Bioinformatics", "Molecular Biology", "Statistics", "Lab Techniques"],
  genetic_counselor: ["Genetic Counseling", "Medical Genetics", "Patient Communication", "Ethics", "Pedigree Analysis"],
  nanotech_engineer: ["Nanotechnology", "Materials Science", "Characterization Techniques", "Research", "Lab Techniques"],
  nanotech_researcher: ["Nanomaterials", "Characterization", "Electron Microscopy", "Research Methods", "Scientific Writing"],
  materials_scientist: ["Materials Science", "Characterization", "Lab Techniques", "Data Analysis", "Research"],
  astrophysicist: ["Astrophysics", "Python", "Data Analysis", "Mathematics", "Scientific Writing"],
  neuroscientist: ["Neuroscience", "Brain Imaging", "Statistics", "Lab Techniques", "Research Methods"],
  cognitive_scientist: ["Cognitive Science", "Research Methods", "Statistics", "Experimental Design", "Scientific Writing"],
  pharmacologist: ["Pharmacology", "Drug Interactions", "Lab Techniques", "Research", "Toxicology"],
  physicist: ["Physics", "Mathematics", "MATLAB", "Research Methods", "Data Analysis"],
  chemist: ["Chemistry", "Lab Techniques", "Analytical Chemistry", "Instrumentation", "Research"],
  statistician: ["Statistics", "R/Python", "Data Analysis", "Probability", "Research Methods"],

  // ============ NEW ROLES ============
  gis_analyst: ["GIS", "Remote Sensing", "Spatial Analysis", "Data Analysis", "QGIS/ArcGIS"],
  customer_service_exec: ["Communication", "Problem Solving", "CRM Tools", "Patience", "Conflict Resolution"],
};

// ============================================================================
// STREAM-WISE CPS WEIGHTS
// ============================================================================
export type StreamCPSWeights = {
  technical: number;
  logical: number;
  communication: number;
  emotional_intelligence: number;
};

export function getStreamCPSWeights(fieldOfStudy: string): StreamCPSWeights {
  // BA (Arts) streams
  const artsDomains = ["ba", "english_domain", "bengali_domain", "hindi_domain", "sanskrit_domain",
    "regional_languages_domain", "geography_domain", "journalism", "mass_comm_arts", "english_literature",
    "philosophy", "history", "political_science", "psychology", "fine_arts", "performing_arts",
    "social_sciences", "languages", "education_teaching"];
  if (artsDomains.includes(fieldOfStudy)) {
    return { technical: 0.20, logical: 0.20, communication: 0.35, emotional_intelligence: 0.25 };
  }

  // BCom (Commerce) streams
  const commerceDomains = ["bcom", "accounting_finance", "business_management", "economics", "banking",
    "marketing", "entrepreneurship", "taxation", "business_analytics", "supply_chain",
    "retail_management", "insurance", "international_business", "ecommerce"];
  if (commerceDomains.includes(fieldOfStudy)) {
    return { technical: 0.25, logical: 0.35, communication: 0.20, emotional_intelligence: 0.20 };
  }

  // BSc (Science) default
  return { technical: 0.45, logical: 0.25, communication: 0.15, emotional_intelligence: 0.15 };
}

// Domain-specific CPS modifiers
export function getDomainCPSModifier(domain: string): Partial<StreamCPSWeights> {
  const modifiers: Record<string, Partial<StreamCPSWeights>> = {
    research: { technical: 0.05 },
    academics: { technical: 0.05 },
    journalism: { communication: 0.05 },
    broadcasting: { communication: 0.05 },
    content_creation: { communication: 0.05 },
    investment: { logical: 0.05 },
    accounting: { logical: 0.05 },
    audit: { logical: 0.05 },
    clinical_psychology: { emotional_intelligence: 0.05 },
    counseling: { emotional_intelligence: 0.05 },
  };
  return modifiers[domain] ?? {};
}

// General Pass penalty
export function isGeneralPass(domain: string): boolean {
  return domain === "general_pass";
}

export function getGeneralPassPenalty(): { cpsPenalty: number; qpiPenalty: number } {
  return { cpsPenalty: 0.75, qpiPenalty: 0.70 }; // 25% CPS reduction, 30% QPi reduction
}

/** Get technical skills for a role ID */
export function getSkillsForRole(roleId: string): string[] {
  return skillsByRole[roleId] ?? [];
}

// ============================================================================
// COURSE MAPPING (role → recommended courses)
// ============================================================================
export const courseMapping: Record<string, string[]> = {
  frontend_developer: ["full_stack_development_program", "react_bootcamp"],
  ui_designer: ["uiux_design_course", "product_design_program"],
  data_scientist: ["data_science_program", "ai_ml_course"],
  digital_marketer: ["digital_marketing_course", "performance_marketing_program"],
  video_editor: ["video_editing_course", "motion_graphics_course"],
};