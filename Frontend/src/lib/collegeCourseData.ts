// Mock data for dynamic course landing pages and college CMS

import { courses as allBaseCourses, type Course } from "@/lib/courseData";

export type CollegeProfile = {
  id: string;
  name: string;
  location: string;
  established: number;
  accreditation: string[];
  logo: string;
  vision: string;
  mission: string;
  achievements: string[];
  industryCollaborations: string[];
  facultyHighlights: { name: string; designation: string; expertise: string }[];
  galleryImages: { url: string; category: "campus" | "classrooms" | "labs" | "events" }[];
  recruiters: string[];
};

export type CourseDetail = {
  id: string;
  collegeId: string;
  title: string;
  domain: string;
  description: string;
  duration: string;
  mode: "online" | "offline" | "hybrid";
  schedule: "weekday" | "weekend" | "flexible";
  marketPrice: number;
  coursePrice: number;
  emiOptions: string;
  scholarships: string;
  limitedOffer: string;
  modules: { name: string; topics: string[] }[];
  tools: string[];
  projects: string[];
  skillsCovered: string[];
  careerRoles: string[];
  careerOutcomes: { role: string; salaryRange: string; growthTrajectory: string }[];
  testimonials: { name: string; feedback: string; rating: number; image: string }[];
  nextBatchDate: string;
  seatsLeft: number;
  expectedSalary: string;
};

// Mock colleges
export const colleges: CollegeProfile[] = [
  {
    id: "redapple",
    name: "Red Apple Learning",
    location: "Kolkata, West Bengal",
    established: 2012,
    accreditation: ["UGC Approved", "NSDC Partner", "ISO 9001:2015", "NASSCOM Certified"],
    logo: "",
    vision: "To be the most trusted career transformation institute in India, empowering millions with job-ready skills through industry-aligned education.",
    mission: "We bridge the gap between academic education and industry requirements through practical, project-based learning programs. India's Premium Designing & Development Institute.",
    achievements: [
      "15,000+ students trained since 2012",
      "92% placement rate across all programs",
      "40+ industry partnerships",
      "Government recognized skill development center",
      "Best Ed-Tech Startup Award 2023",
      "UGC Approved B.Voc programs",
      "100% Placement Guarantee on select programs"
    ],
    industryCollaborations: ["Google", "Microsoft", "TCS", "Infosys", "Wipro", "Accenture", "HCL Technologies", "Cognizant", "Tech Mahindra"],
    facultyHighlights: [
      { name: "Rajesh Kumar", designation: "Head of Technology", expertise: "15+ years in Full-Stack Development, ex-TCS" },
      { name: "Priya Sharma", designation: "Design Lead", expertise: "12+ years in UX/UI, ex-Flipkart" },
      { name: "Amit Das", designation: "Data Science Faculty", expertise: "10+ years in ML/AI, ex-IBM Research" },
      { name: "Sneha Roy", designation: "Marketing Faculty", expertise: "8+ years in Digital Marketing, Google Certified" },
      { name: "Saurav Banerjee", designation: "Game Development Lead", expertise: "10+ years in Unity/Unreal, ex-Ubisoft" },
      { name: "Ritu Ghosh", designation: "3D Animation Faculty", expertise: "12+ years in VFX & Animation, ex-DNEG" },
    ],
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1562774053-701939374585?w=600", category: "campus" },
      { url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600", category: "classrooms" },
      { url: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600", category: "labs" },
      { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", category: "events" },
      { url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600", category: "campus" },
      { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600", category: "classrooms" },
    ],
    recruiters: ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "HCL", "Tech Mahindra", "Capgemini", "IBM", "Amazon", "Flipkart", "Byju's"],
  },
  {
    id: "techacademy",
    name: "TechVista Academy",
    location: "Bangalore, Karnataka",
    established: 2015,
    accreditation: ["UGC Recognized", "AICTE Approved", "NASSCOM Partner"],
    logo: "",
    vision: "Creating next-generation tech leaders through immersive, industry-aligned education.",
    mission: "Deliver cutting-edge technology education with strong emphasis on hands-on projects and real-world problem solving.",
    achievements: [
      "10,000+ alumni in tech companies",
      "88% placement rate",
      "25+ corporate training partnerships",
      "Top 10 Coding Bootcamp in India 2024"
    ],
    industryCollaborations: ["Amazon", "Google", "Meta", "Flipkart", "Swiggy", "Razorpay"],
    facultyHighlights: [
      { name: "Vikram Singh", designation: "CTO & Lead Instructor", expertise: "18+ years, ex-Google Engineer" },
      { name: "Ananya Reddy", designation: "AI/ML Lead", expertise: "12+ years in Deep Learning, ex-Amazon" },
      { name: "Karthik Iyer", designation: "Cloud Architect", expertise: "14+ years in AWS/GCP, ex-Microsoft" },
    ],
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600", category: "campus" },
      { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600", category: "labs" },
      { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600", category: "events" },
    ],
    recruiters: ["Google", "Amazon", "Meta", "Flipkart", "Swiggy", "Razorpay", "PhonePe", "Paytm", "Ola", "Uber"],
  },
  {
    id: "generic",
    name: "Partner Institute",
    location: "India",
    established: 2018,
    accreditation: ["Accredited"],
    logo: "",
    vision: "Empowering careers through quality education.",
    mission: "Providing industry-relevant skills training.",
    achievements: ["1000+ students trained", "80% placement rate"],
    industryCollaborations: ["Various Industry Partners"],
    facultyHighlights: [
      { name: "Expert Faculty", designation: "Lead Instructor", expertise: "10+ years industry experience" },
    ],
    galleryImages: [
      { url: "https://images.unsplash.com/photo-1562774053-701939374585?w=600", category: "campus" },
    ],
    recruiters: ["Top Companies"],
  },
];

// ========================
// ALL RED APPLE LEARNING COURSES (from redapplelearning.in)
// Pricing: Certificate (3mo) = ₹45,000 | Adv Certificate (6mo) = ₹90,000 | Diploma (12mo) = ₹1,80,000
// ========================
export const courseDetails: CourseDetail[] = [
  // ========== CERTIFICATE COURSES (3 months — ₹45,000) ==========
  {
    id: "ra-uiux", collegeId: "redapple", title: "Certificate in Graphic & UI/UX Designing", domain: "Design",
    description: "Master graphic design fundamentals along with modern UI/UX design principles. Learn Figma, Adobe Suite, wireframing, prototyping, and user research.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Merit-based scholarship up to 20%", limitedOffer: "Early bird discount ₹5,000 off",
    modules: [
      { name: "Graphic Design Fundamentals", topics: ["Typography", "Color Theory", "Layout Design", "Branding"] },
      { name: "Adobe Suite Mastery", topics: ["Photoshop", "Illustrator", "InDesign", "Creative Cloud"] },
      { name: "UI Design", topics: ["Figma", "Design Systems", "Component Libraries", "Responsive Design"] },
      { name: "UX Design", topics: ["User Research", "Wireframing", "Prototyping", "Usability Testing"] },
    ],
    tools: ["Figma", "Photoshop", "Illustrator", "Adobe XD", "InDesign", "Miro"],
    projects: ["Brand Identity Design", "Mobile App UI", "E-commerce UX Redesign", "Portfolio Website"],
    skillsCovered: ["Figma", "User Research", "Prototyping", "CSS", "Illustrator", "Wireframing", "Adobe XD", "Typography"],
    careerRoles: ["UX Designer", "UI Designer", "Product Designer", "UX Researcher", "Interaction Designer"],
    careerOutcomes: [
      { role: "UI/UX Designer", salaryRange: "₹4–10 LPA", growthTrajectory: "Senior Designer in 2-3 years" },
      { role: "Product Designer", salaryRange: "₹8–18 LPA", growthTrajectory: "Design Lead in 4 years" },
    ],
    testimonials: [
      { name: "Kavitha Nair", feedback: "My portfolio from this course landed me a Product Designer role at a top startup!", rating: 5, image: "" },
      { name: "Deepak Sahu", feedback: "The faculty's industry experience shows. Every concept was taught with real examples.", rating: 4, image: "" },
      { name: "Riya Mukherjee", feedback: "Best design course in Kolkata. Placement support was excellent.", rating: 5, image: "" },
    ],
    nextBatchDate: "April 10, 2026", seatsLeft: 15, expectedSalary: "₹4–18 LPA",
  },
  {
    id: "ra-graphic", collegeId: "redapple", title: "Certificate in Graphic & Motion Graphics", domain: "Design",
    description: "Learn graphic design combined with motion graphics. Master After Effects, Photoshop, Illustrator for stunning animated content.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "10% early enrollment discount", limitedOffer: "Free Adobe CC subscription for 3 months",
    modules: [
      { name: "Graphic Design", topics: ["Typography", "Layout", "Branding", "Print Design"] },
      { name: "Adobe Mastery", topics: ["Photoshop Advanced", "Illustrator Pro", "InDesign"] },
      { name: "Motion Graphics", topics: ["After Effects Basics", "Animation Principles", "Kinetic Typography"] },
      { name: "Portfolio & Industry", topics: ["Portfolio Building", "Client Projects", "Industry Standards"] },
    ],
    tools: ["Photoshop", "Illustrator", "After Effects", "InDesign", "Premiere Pro"],
    projects: ["Brand Campaign", "Animated Logo", "Social Media Kit", "Motion Reel"],
    skillsCovered: ["Photoshop", "Illustrator", "Typography", "Layout", "After Effects", "Branding", "Color Theory"],
    careerRoles: ["Graphic Designer", "Motion Graphics Artist", "Brand Designer", "Visual Designer"],
    careerOutcomes: [
      { role: "Graphic Designer", salaryRange: "₹3–8 LPA", growthTrajectory: "Senior in 2 years" },
      { role: "Motion Graphics Artist", salaryRange: "₹5–12 LPA", growthTrajectory: "Lead in 3 years" },
    ],
    testimonials: [
      { name: "Suman Das", feedback: "Landed a motion graphics role at a media agency right after the course!", rating: 5, image: "" },
      { name: "Ankita Pal", feedback: "Excellent hands-on training. The projects are industry-level.", rating: 5, image: "" },
    ],
    nextBatchDate: "April 15, 2026", seatsLeft: 20, expectedSalary: "₹3–12 LPA",
  },
  {
    id: "ra-graphicdesign", collegeId: "redapple", title: "Certificate in Graphics Designing", domain: "Design",
    description: "Focused graphic design program covering Photoshop, Illustrator, typography, layout design, and branding fundamentals.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Student discount 15%", limitedOffer: "Free design toolkit included",
    modules: [
      { name: "Design Principles", topics: ["Color Theory", "Typography", "Composition", "Visual Hierarchy"] },
      { name: "Adobe Photoshop", topics: ["Photo Editing", "Compositing", "Retouching", "Digital Painting"] },
      { name: "Adobe Illustrator", topics: ["Vector Graphics", "Logo Design", "Icon Design", "Illustrations"] },
      { name: "Print & Digital", topics: ["Brochure Design", "Social Media Graphics", "Packaging", "Portfolio"] },
    ],
    tools: ["Photoshop", "Illustrator", "Canva", "InDesign"],
    projects: ["Logo & Brand Identity", "Marketing Collateral", "Social Media Campaign", "Print Portfolio"],
    skillsCovered: ["Photoshop", "Illustrator", "Typography", "Layout", "Branding", "Color Theory"],
    careerRoles: ["Graphic Designer", "Brand Designer", "Visual Designer", "Layout Artist", "Packaging Designer"],
    careerOutcomes: [{ role: "Graphic Designer", salaryRange: "₹3–7 LPA", growthTrajectory: "Senior in 2 years" }],
    testimonials: [{ name: "Pankaj Roy", feedback: "Great foundation course. Got placed in a design agency within a month.", rating: 5, image: "" }],
    nextBatchDate: "April 20, 2026", seatsLeft: 25, expectedSalary: "₹3–7 LPA",
  },
  {
    id: "ra-uiux-cert", collegeId: "redapple", title: "Certificate in UI/UX Designing", domain: "Design",
    description: "Specialized UI/UX program focused on user-centered design, Figma mastery, prototyping, and usability testing.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Portfolio excellence award 15% refund", limitedOffer: "Free Figma Pro license for 1 year",
    modules: [
      { name: "UX Research", topics: ["User Personas", "Journey Mapping", "Competitive Analysis", "Surveys"] },
      { name: "Information Architecture", topics: ["Sitemaps", "User Flows", "Card Sorting", "Navigation Design"] },
      { name: "UI Design in Figma", topics: ["Components", "Auto Layout", "Design Tokens", "Responsive Design"] },
      { name: "Prototyping & Testing", topics: ["Interactive Prototypes", "Micro-interactions", "Usability Testing", "Iteration"] },
    ],
    tools: ["Figma", "Adobe XD", "Miro", "Maze", "Notion"],
    projects: ["Mobile App Design", "SaaS Dashboard", "Design System", "UX Case Study"],
    skillsCovered: ["Figma", "User Research", "Prototyping", "Wireframing", "Usability Testing", "Adobe XD"],
    careerRoles: ["UX Designer", "UI Designer", "Product Designer", "UX Researcher"],
    careerOutcomes: [
      { role: "UX Designer", salaryRange: "₹5–12 LPA", growthTrajectory: "Senior UX in 2-3 years" },
      { role: "Product Designer", salaryRange: "₹8–18 LPA", growthTrajectory: "Design Lead in 4 years" },
    ],
    testimonials: [{ name: "Shreya Bose", feedback: "The UX case study approach helped me crack interviews at top startups.", rating: 5, image: "" }],
    nextBatchDate: "April 12, 2026", seatsLeft: 18, expectedSalary: "₹5–18 LPA",
  },
  {
    id: "ra-motiongfx", collegeId: "redapple", title: "Certificate in Motion Graphics", domain: "Design",
    description: "Focused motion graphics program covering After Effects, animation principles, kinetic typography, and visual effects.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Creative portfolio scholarship 10%", limitedOffer: "Free stock footage library access",
    modules: [
      { name: "Animation Principles", topics: ["12 Principles of Animation", "Timing & Spacing", "Easing", "Storyboarding"] },
      { name: "After Effects", topics: ["Keyframe Animation", "Shape Layers", "Masks & Mattes", "Expressions"] },
      { name: "Advanced Motion", topics: ["3D Layers", "Camera Animation", "Particle Effects", "Character Animation"] },
      { name: "Industry Projects", topics: ["Explainer Videos", "Title Sequences", "Social Media Ads", "Showreel"] },
    ],
    tools: ["After Effects", "Premiere Pro", "Cinema 4D Lite", "Illustrator"],
    projects: ["Animated Explainer Video", "Title Sequence", "Social Ad Campaign", "Motion Showreel"],
    skillsCovered: ["After Effects", "Animation", "Motion Graphics", "Visual Effects", "Storyboarding"],
    careerRoles: ["Motion Graphics Artist", "Video Editor", "VFX Artist", "Content Creator"],
    careerOutcomes: [{ role: "Motion Graphics Artist", salaryRange: "₹4–10 LPA", growthTrajectory: "Senior in 2-3 years" }],
    testimonials: [{ name: "Aman Sinha", feedback: "Amazing course! My showreel got me freelance clients immediately.", rating: 5, image: "" }],
    nextBatchDate: "April 18, 2026", seatsLeft: 20, expectedSalary: "₹4–10 LPA",
  },
  {
    id: "ra-3dmodel", collegeId: "redapple", title: "Certificate in 3D Modeling & Sculpting", domain: "Design",
    description: "Learn 3D modeling and digital sculpting using Blender and Maya. Create game assets, characters, and environments.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "10% for existing students", limitedOffer: "Free Substance Painter license for 6 months",
    modules: [
      { name: "3D Fundamentals", topics: ["Polygon Modeling", "Edge Flow", "Topology", "Reference Setup"] },
      { name: "Blender Mastery", topics: ["Modeling Tools", "Modifiers", "UV Unwrapping", "Sculpting"] },
      { name: "Maya Essentials", topics: ["Maya Interface", "NURBS", "Polygonal Modeling", "Rigging Basics"] },
      { name: "Portfolio Projects", topics: ["Character Model", "Environment Art", "Game Asset", "Showreel"] },
    ],
    tools: ["Blender", "Maya", "ZBrush", "Substance Painter"],
    projects: ["Character Model", "Game Environment", "Product Visualization", "3D Showreel"],
    skillsCovered: ["Blender", "Maya", "Modeling", "Texturing", "3D Modeling", "Sculpting"],
    careerRoles: ["3D Modeler", "3D Animator", "Game Artist", "Texturing Artist"],
    careerOutcomes: [
      { role: "3D Modeler", salaryRange: "₹4–10 LPA", growthTrajectory: "Senior in 2-3 years" },
      { role: "Game Artist", salaryRange: "₹5–14 LPA", growthTrajectory: "Lead in 4 years" },
    ],
    testimonials: [{ name: "Vikash Mondal", feedback: "Incredible 3D training. Got a game art role right after completion.", rating: 5, image: "" }],
    nextBatchDate: "April 22, 2026", seatsLeft: 14, expectedSalary: "₹4–14 LPA",
  },
  {
    id: "ra-texture", collegeId: "redapple", title: "Certificate in 3D Texturing & Mapping", domain: "Design",
    description: "Specialized course in 3D texturing, UV mapping, and material creation using Substance Painter and industry tools.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "10% bundle discount with 3D Modeling", limitedOffer: "Free texture library worth ₹5,000",
    modules: [
      { name: "UV Mapping", topics: ["UV Unwrapping", "UV Layouts", "UDIM", "Optimization"] },
      { name: "Substance Painter", topics: ["Smart Materials", "Hand Painting", "Baking Maps", "Export Settings"] },
      { name: "Material Creation", topics: ["PBR Workflow", "Procedural Textures", "Weathering", "Detailing"] },
      { name: "Industry Pipeline", topics: ["Game Texturing", "Film Texturing", "Optimization", "Portfolio"] },
    ],
    tools: ["Substance Painter", "Blender", "Maya", "Photoshop"],
    projects: ["Game Weapon Texturing", "Character Skin", "Environment Textures", "Portfolio Piece"],
    skillsCovered: ["Texturing", "Blender", "Maya", "Substance Painter", "UV Mapping", "PBR"],
    careerRoles: ["Texturing Artist", "3D Modeler", "Game Artist", "Look Dev Artist"],
    careerOutcomes: [{ role: "Texturing Artist", salaryRange: "₹4–10 LPA", growthTrajectory: "Senior in 2 years" }],
    testimonials: [{ name: "Ritika Sen", feedback: "Substance Painter training was top-notch. Working as a texture artist now!", rating: 5, image: "" }],
    nextBatchDate: "April 25, 2026", seatsLeft: 16, expectedSalary: "₹4–10 LPA",
  },
  {
    id: "ra-editing", collegeId: "redapple", title: "Certificate in Editing & Cinematography", domain: "Media",
    description: "Learn professional video editing and cinematography. Master Premiere Pro, After Effects, color grading, and storytelling.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Student discount 15%", limitedOffer: "Free camera workshop included",
    modules: [
      { name: "Cinematography", topics: ["Camera Angles", "Lighting", "Shot Composition", "Storytelling"] },
      { name: "Premiere Pro", topics: ["Timeline Editing", "Transitions", "Audio Editing", "Multi-cam"] },
      { name: "Color & VFX", topics: ["Color Grading", "DaVinci Resolve Basics", "After Effects", "Green Screen"] },
      { name: "Final Project", topics: ["Short Film", "Music Video", "Documentary", "Showreel"] },
    ],
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Audition"],
    projects: ["Short Film Edit", "Music Video", "Commercial Ad", "Cinematography Reel"],
    skillsCovered: ["Premiere Pro", "After Effects", "Storytelling", "Color Grading", "Cinematography"],
    careerRoles: ["Video Editor", "Content Creator", "Color Grader", "Cinematographer"],
    careerOutcomes: [
      { role: "Video Editor", salaryRange: "₹3–8 LPA", growthTrajectory: "Senior in 2 years" },
      { role: "Cinematographer", salaryRange: "₹5–15 LPA", growthTrajectory: "DOP in 4-5 years" },
    ],
    testimonials: [{ name: "Rajat Ghosh", feedback: "Started my YouTube channel and freelancing after this course!", rating: 5, image: "" }],
    nextBatchDate: "April 8, 2026", seatsLeft: 22, expectedSalary: "₹3–15 LPA",
  },
  {
    id: "ra-htmlcss", collegeId: "redapple", title: "Certificate in HTML & CSS (Web Designing)", domain: "Technology",
    description: "Foundation web design course covering HTML5, CSS3, responsive design, and modern web standards.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Student discount 20%", limitedOffer: "Free domain & hosting for 1 year",
    modules: [
      { name: "HTML5", topics: ["Semantic HTML", "Forms", "Tables", "Multimedia"] },
      { name: "CSS3", topics: ["Flexbox", "Grid", "Animations", "Responsive Design"] },
      { name: "Modern Web", topics: ["Bootstrap", "Tailwind CSS", "Accessibility", "SEO Basics"] },
      { name: "Projects", topics: ["Portfolio Site", "Landing Page", "Blog Template", "Multi-page Website"] },
    ],
    tools: ["VS Code", "Chrome DevTools", "Bootstrap", "Tailwind CSS", "Git"],
    projects: ["Personal Portfolio", "Business Landing Page", "Blog Template", "Responsive Website"],
    skillsCovered: ["HTML", "CSS", "Responsive Design", "Bootstrap", "Tailwind CSS"],
    careerRoles: ["Web Designer", "Frontend Developer", "UI Developer"],
    careerOutcomes: [{ role: "Web Designer", salaryRange: "₹2.5–6 LPA", growthTrajectory: "Frontend Dev in 1-2 years" }],
    testimonials: [{ name: "Siddharth Pal", feedback: "Perfect starting point for web development. Clear, structured teaching.", rating: 4, image: "" }],
    nextBatchDate: "April 5, 2026", seatsLeft: 30, expectedSalary: "₹2.5–6 LPA",
  },
  {
    id: "ra-wordpress", collegeId: "redapple", title: "Certificate in WordPress Development", domain: "Technology",
    description: "Build professional websites with WordPress. Learn theme customization, plugins, WooCommerce, and SEO.",
    duration: "3 months", mode: "hybrid", schedule: "flexible",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Freelancer discount 10%", limitedOffer: "Free premium theme bundle worth ₹3,000",
    modules: [
      { name: "WordPress Basics", topics: ["Installation", "Dashboard", "Pages & Posts", "Themes"] },
      { name: "Customization", topics: ["Theme Customizer", "Elementor", "Custom CSS", "Widgets"] },
      { name: "E-commerce", topics: ["WooCommerce Setup", "Payment Gateways", "Product Management", "Shipping"] },
      { name: "Advanced", topics: ["SEO (Yoast)", "Speed Optimization", "Security", "Maintenance"] },
    ],
    tools: ["WordPress", "Elementor", "WooCommerce", "cPanel", "FileZilla"],
    projects: ["Business Website", "E-commerce Store", "Blog Site", "Portfolio"],
    skillsCovered: ["WordPress", "PHP Basics", "WooCommerce", "SEO", "Web Hosting"],
    careerRoles: ["WordPress Developer", "Web Designer", "Freelance Developer"],
    careerOutcomes: [{ role: "WordPress Developer", salaryRange: "₹3–8 LPA", growthTrajectory: "Senior in 2 years" }],
    testimonials: [{ name: "Neha Gupta", feedback: "Built my first client website during the course. Now running a freelance business!", rating: 5, image: "" }],
    nextBatchDate: "April 12, 2026", seatsLeft: 25, expectedSalary: "₹3–8 LPA",
  },
  {
    id: "ra-frontend", collegeId: "redapple", title: "Certificate in Front End (React.js) Development", domain: "Technology",
    description: "Master modern frontend development with React.js, JavaScript ES6+, and industry best practices.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Merit-based 20% scholarship", limitedOffer: "Early bird discount ₹5,000 off",
    modules: [
      { name: "JavaScript Mastery", topics: ["ES6+", "Async/Await", "DOM Manipulation", "Closures"] },
      { name: "React Fundamentals", topics: ["Components", "Props & State", "Hooks", "React Router"] },
      { name: "Advanced React", topics: ["Context API", "Redux Toolkit", "TypeScript", "Testing"] },
      { name: "Capstone", topics: ["Full App Build", "API Integration", "Deployment", "Portfolio"] },
    ],
    tools: ["VS Code", "React", "TypeScript", "Git", "Vercel", "Redux"],
    projects: ["E-commerce Frontend", "Dashboard App", "Real-time Chat UI", "Capstone Project"],
    skillsCovered: ["React", "JavaScript", "HTML", "CSS", "TypeScript", "Git", "Redux"],
    careerRoles: ["Frontend Developer", "React Developer", "UI Engineer", "Fullstack Developer"],
    careerOutcomes: [
      { role: "React Developer", salaryRange: "₹4–12 LPA", growthTrajectory: "Senior in 2-3 years" },
      { role: "Frontend Developer", salaryRange: "₹6–15 LPA", growthTrajectory: "Lead in 3-4 years" },
    ],
    testimonials: [
      { name: "Arjun Patel", feedback: "Went from zero to a ₹7 LPA React developer job in 5 months!", rating: 5, image: "" },
      { name: "Meera Singh", feedback: "Project-based approach is incredible. Got 3 interview calls in week one.", rating: 5, image: "" },
    ],
    nextBatchDate: "April 15, 2026", seatsLeft: 12, expectedSalary: "₹4–15 LPA",
  },
  {
    id: "ra-backend", collegeId: "redapple", title: "Certificate in Back End (Node.js) Development", domain: "Technology",
    description: "Build scalable server-side applications with Node.js, Express, MongoDB, and SQL.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Bundle discount with Frontend 25%", limitedOffer: "Free cloud hosting credit ₹5,000",
    modules: [
      { name: "Node.js Core", topics: ["Node Runtime", "Modules", "File System", "Streams"] },
      { name: "Express & APIs", topics: ["REST Architecture", "Middleware", "Authentication", "JWT"] },
      { name: "Databases", topics: ["MongoDB", "Mongoose", "SQL Basics", "PostgreSQL"] },
      { name: "Deployment", topics: ["Docker Basics", "AWS EC2", "CI/CD", "Production Best Practices"] },
    ],
    tools: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "Postman"],
    projects: ["RESTful API", "Auth System", "E-commerce Backend", "Real-time App"],
    skillsCovered: ["Node.js", "Express", "MongoDB", "SQL", "REST APIs", "Docker"],
    careerRoles: ["Backend Developer", "API Developer", "Fullstack Developer", "Software Engineer"],
    careerOutcomes: [
      { role: "Backend Developer", salaryRange: "₹5–12 LPA", growthTrajectory: "Senior in 2-3 years" },
      { role: "Fullstack Developer", salaryRange: "₹8–18 LPA", growthTrajectory: "Lead in 3-4 years" },
    ],
    testimonials: [{ name: "Rahul Verma", feedback: "Best backend course. Faculty support is outstanding.", rating: 4, image: "" }],
    nextBatchDate: "April 15, 2026", seatsLeft: 14, expectedSalary: "₹5–18 LPA",
  },
  {
    id: "ra-digimkt", collegeId: "redapple", title: "Google Certified Digital Marketing", domain: "Marketing",
    description: "Comprehensive digital marketing program covering SEO, Google Ads, social media, analytics, and growth strategies.",
    duration: "3 months", mode: "hybrid", schedule: "flexible",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Startup founder discount 20%", limitedOffer: "Free Google Ads ₹10,000 credit",
    modules: [
      { name: "SEO & Content", topics: ["On-Page SEO", "Off-Page SEO", "Content Strategy", "Keyword Research"] },
      { name: "Paid Advertising", topics: ["Google Ads", "Facebook Ads", "Instagram Marketing", "LinkedIn Ads"] },
      { name: "Social Media & Analytics", topics: ["Platform Strategy", "Community Building", "Google Analytics 4", "Tracking"] },
      { name: "Growth Hacking", topics: ["Funnel Optimization", "A/B Testing", "Email Marketing", "Automation"] },
    ],
    tools: ["Google Ads", "Google Analytics", "SEMrush", "Canva", "Mailchimp", "HubSpot"],
    projects: ["SEO Audit", "Live Ad Campaign", "Social Media Calendar", "Growth Experiment"],
    skillsCovered: ["SEO", "Google Ads", "Google Analytics", "Content Marketing", "Social Media", "Analytics"],
    careerRoles: ["Digital Marketer", "SEO Specialist", "Social Media Manager", "Growth Hacker"],
    careerOutcomes: [
      { role: "Digital Marketing Executive", salaryRange: "₹3–7 LPA", growthTrajectory: "Manager in 2 years" },
      { role: "Performance Marketer", salaryRange: "₹6–15 LPA", growthTrajectory: "VP Marketing in 5 years" },
    ],
    testimonials: [
      { name: "Pooja Chatterjee", feedback: "Started freelancing immediately. Making ₹50K/month within 3 months!", rating: 5, image: "" },
      { name: "Nikhil Rajan", feedback: "The live ad campaign project was incredible. Real budget, real results.", rating: 5, image: "" },
    ],
    nextBatchDate: "April 5, 2026", seatsLeft: 22, expectedSalary: "₹3–15 LPA",
  },
  {
    id: "ra-aiml", collegeId: "redapple", title: "Certificate in AI-ML", domain: "Data/AI",
    description: "Learn AI and Machine Learning fundamentals. Cover Python, data analysis, ML algorithms, and deep learning basics.",
    duration: "3 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Women in Tech scholarship 25%", limitedOffer: "Free Python bootcamp worth ₹8,000",
    modules: [
      { name: "Python for AI", topics: ["Python Programming", "NumPy", "Pandas", "Matplotlib"] },
      { name: "Machine Learning", topics: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Evaluation"] },
      { name: "Deep Learning", topics: ["Neural Networks", "TensorFlow", "CNN", "RNN Basics"] },
      { name: "AI Applications", topics: ["NLP Basics", "Computer Vision", "Chatbot Building", "Deployment"] },
    ],
    tools: ["Python", "Jupyter", "TensorFlow", "Scikit-learn", "OpenCV", "Git"],
    projects: ["Sentiment Analyzer", "Image Classifier", "Chatbot", "ML Pipeline"],
    skillsCovered: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "Data Analysis", "NLP"],
    careerRoles: ["AI Engineer", "ML Engineer", "Data Scientist", "Data Analyst"],
    careerOutcomes: [
      { role: "ML Engineer", salaryRange: "₹6–18 LPA", growthTrajectory: "Senior in 3 years" },
      { role: "Data Scientist", salaryRange: "₹8–25 LPA", growthTrajectory: "Lead in 4 years" },
    ],
    testimonials: [{ name: "Sanjay Gupta", feedback: "Moved from BPO to Data Analyst at ₹8.5 LPA. Life-changing!", rating: 5, image: "" }],
    nextBatchDate: "April 1, 2026", seatsLeft: 10, expectedSalary: "₹6–25 LPA",
  },
  {
    id: "ra-devops", collegeId: "redapple", title: "Certificate in DevOps", domain: "Technology",
    description: "Master DevOps practices including Docker, Kubernetes, CI/CD pipelines, cloud deployment, and infrastructure automation.",
    duration: "3 months", mode: "hybrid", schedule: "weekend",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Working professionals 10% off", limitedOffer: "Free AWS certification voucher ₹12,000",
    modules: [
      { name: "Linux & Cloud", topics: ["Linux Administration", "AWS Core Services", "IAM", "VPC"] },
      { name: "Containerization", topics: ["Docker", "Docker Compose", "Container Registry", "Networking"] },
      { name: "Orchestration", topics: ["Kubernetes", "Helm", "Service Mesh", "Monitoring"] },
      { name: "CI/CD & IaC", topics: ["Jenkins", "GitHub Actions", "Terraform", "Ansible"] },
    ],
    tools: ["Docker", "Kubernetes", "Jenkins", "Terraform", "AWS", "Ansible", "Git"],
    projects: ["CI/CD Pipeline", "Microservices Deployment", "Infrastructure as Code", "Production Cluster"],
    skillsCovered: ["Docker", "Kubernetes", "CI/CD", "AWS", "Linux", "Terraform", "Jenkins"],
    careerRoles: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"],
    careerOutcomes: [
      { role: "DevOps Engineer", salaryRange: "₹6–18 LPA", growthTrajectory: "Senior in 2-3 years" },
      { role: "Cloud Engineer", salaryRange: "₹8–22 LPA", growthTrajectory: "Architect in 4 years" },
    ],
    testimonials: [{ name: "Rohan Mehta", feedback: "Got AWS certified and a ₹12 LPA role in 2 months!", rating: 5, image: "" }],
    nextBatchDate: "May 1, 2026", seatsLeft: 15, expectedSalary: "₹6–22 LPA",
  },
  {
    id: "ra-blockchain", collegeId: "redapple", title: "Certificate in Blockchain", domain: "Technology",
    description: "Learn blockchain fundamentals, Solidity programming, smart contracts, and decentralized application development.",
    duration: "3 months", mode: "hybrid", schedule: "weekend",
    marketPrice: 85000, coursePrice: 45000,
    emiOptions: "₹7,500/month for 6 months (0% interest)", scholarships: "Tech scholarship 15%", limitedOffer: "Free testnet ETH & development tools",
    modules: [
      { name: "Blockchain Basics", topics: ["Distributed Ledger", "Consensus", "Cryptography", "Bitcoin"] },
      { name: "Ethereum & Solidity", topics: ["EVM", "Solidity Syntax", "Data Types", "Functions"] },
      { name: "Smart Contracts", topics: ["Contract Design", "Testing", "Security", "Deployment"] },
      { name: "DApp Development", topics: ["Web3.js", "Ethers.js", "IPFS", "Frontend Integration"] },
    ],
    tools: ["Solidity", "Hardhat", "MetaMask", "Ethers.js", "IPFS", "Remix IDE"],
    projects: ["Token Creation (ERC-20)", "NFT Marketplace", "DeFi Protocol", "Voting DApp"],
    skillsCovered: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js", "Blockchain", "DApp Development"],
    careerRoles: ["Blockchain Developer", "Smart Contract Developer", "Web3 Developer"],
    careerOutcomes: [
      { role: "Blockchain Developer", salaryRange: "₹8–25 LPA", growthTrajectory: "Senior in 2-3 years" },
      { role: "Web3 Developer", salaryRange: "₹10–30 LPA", growthTrajectory: "Lead in 3 years" },
    ],
    testimonials: [{ name: "Kunal Roy", feedback: "Built my first DApp during the course. Got hired at a Web3 startup!", rating: 5, image: "" }],
    nextBatchDate: "April 20, 2026", seatsLeft: 12, expectedSalary: "₹8–30 LPA",
  },

  // ========== ADVANCED CERTIFICATE (6 months — ₹90,000) ==========
  {
    id: "ra-gamedesign", collegeId: "redapple", title: "Advanced Certificate in Game Design", domain: "Technology",
    description: "Comprehensive game design program covering game mechanics, level design, narrative design, and game art.",
    duration: "6 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 175000, coursePrice: 90000,
    emiOptions: "₹15,000/month for 6 months (0% interest)", scholarships: "Gaming portfolio scholarship 20%", limitedOffer: "Free Unity Pro license for 1 year",
    modules: [
      { name: "Game Design Theory", topics: ["Game Mechanics", "Player Psychology", "Balancing", "Monetization"] },
      { name: "Level Design", topics: ["Environmental Storytelling", "Pacing", "Playtesting", "Iteration"] },
      { name: "Game Art", topics: ["2D Art", "3D Assets", "Animation", "UI/HUD Design"] },
      { name: "Production", topics: ["Game Document", "Pipeline", "Prototyping", "Publishing"] },
    ],
    tools: ["Unity", "Unreal Engine", "Blender", "Photoshop", "Figma"],
    projects: ["2D Platformer Design", "3D Level Design", "Board Game Prototype", "Full Game Design Document"],
    skillsCovered: ["Game Design", "Level Design", "Unity", "Game Art", "Prototyping"],
    careerRoles: ["Game Designer", "Level Designer", "Narrative Designer", "Game Producer"],
    careerOutcomes: [
      { role: "Game Designer", salaryRange: "₹5–15 LPA", growthTrajectory: "Senior in 3 years" },
      { role: "Level Designer", salaryRange: "₹6–14 LPA", growthTrajectory: "Lead in 4 years" },
    ],
    testimonials: [{ name: "Arnab Chakraborty", feedback: "Dream course! Working at a game studio in Bangalore now.", rating: 5, image: "" }],
    nextBatchDate: "April 1, 2026", seatsLeft: 10, expectedSalary: "₹5–15 LPA",
  },
  {
    id: "ra-gamedev", collegeId: "redapple", title: "Advanced Certificate in Game Development", domain: "Technology",
    description: "Learn game programming with Unity and C#. Build 2D and 3D games from concept to deployment.",
    duration: "6 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 175000, coursePrice: 90000,
    emiOptions: "₹15,000/month for 6 months (0% interest)", scholarships: "Early enrollment 15% off", limitedOffer: "Free Game Assets Pack worth ₹10,000",
    modules: [
      { name: "C# Programming", topics: ["OOP", "Data Structures", "Algorithms", "Design Patterns"] },
      { name: "Unity 2D", topics: ["Sprites", "Physics 2D", "Tilemaps", "2D Animation"] },
      { name: "Unity 3D", topics: ["3D Physics", "Lighting", "Shaders", "AI Navigation"] },
      { name: "Advanced & Deploy", topics: ["Multiplayer", "VR/AR Basics", "Optimization", "Store Publishing"] },
    ],
    tools: ["Unity", "C#", "Visual Studio", "Git", "Blender"],
    projects: ["2D Platformer", "3D FPS Game", "Mobile Game", "Multiplayer Prototype"],
    skillsCovered: ["Unity", "C#", "Game Physics", "3D Modeling", "Game AI", "Multiplayer"],
    careerRoles: ["Game Developer", "Unity Developer", "Gameplay Programmer", "Technical Designer"],
    careerOutcomes: [
      { role: "Game Developer", salaryRange: "₹5–15 LPA", growthTrajectory: "Senior in 3 years" },
      { role: "Unity Developer", salaryRange: "₹6–18 LPA", growthTrajectory: "Lead in 4 years" },
    ],
    testimonials: [{ name: "Sourav Dey", feedback: "Published my first game on Steam during the course!", rating: 5, image: "" }],
    nextBatchDate: "April 5, 2026", seatsLeft: 8, expectedSalary: "₹5–18 LPA",
  },
  {
    id: "ra-gamedev-pro", collegeId: "redapple", title: "Advanced Certificate in Game Development Pro", domain: "Technology",
    description: "Elite game development with Unreal Engine 5, advanced C++, multiplayer systems, and AAA pipeline.",
    duration: "6 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 175000, coursePrice: 90000,
    emiOptions: "₹15,000/month for 6 months (0% interest)", scholarships: "Portfolio merit scholarship 25%", limitedOffer: "Free UE Marketplace credits ₹15,000",
    modules: [
      { name: "C++ for Games", topics: ["Advanced C++", "Memory Management", "Templates", "Multithreading"] },
      { name: "Unreal Engine", topics: ["Blueprints", "C++ Integration", "Materials", "Landscapes"] },
      { name: "Advanced Systems", topics: ["Multiplayer Networking", "AI Systems", "Physics", "Animation"] },
      { name: "AAA Pipeline", topics: ["Performance Profiling", "LOD Systems", "Cinematic Tools", "Shipping"] },
    ],
    tools: ["Unreal Engine 5", "C++", "Visual Studio", "Perforce", "Blender", "Substance"],
    projects: ["AAA-quality Demo", "Multiplayer Game", "VR Experience", "Portfolio Piece"],
    skillsCovered: ["Unreal Engine", "C++", "Blueprints", "Multiplayer", "VR", "Game AI"],
    careerRoles: ["Unreal Developer", "Game Programmer", "Engine Developer", "Technical Artist"],
    careerOutcomes: [
      { role: "Unreal Developer", salaryRange: "₹8–25 LPA", growthTrajectory: "Senior in 2-3 years" },
      { role: "Game Programmer", salaryRange: "₹10–30 LPA", growthTrajectory: "Lead in 4 years" },
    ],
    testimonials: [{ name: "Aniket Sarkar", feedback: "AAA-level training! Got placed at an international game studio.", rating: 5, image: "" }],
    nextBatchDate: "April 10, 2026", seatsLeft: 6, expectedSalary: "₹8–30 LPA",
  },
  {
    id: "ra-mernstack", collegeId: "redapple", title: "Advanced Certificate in MERN Stack Development", domain: "Technology",
    description: "Full-stack web development with MongoDB, Express, React, and Node.js.",
    duration: "6 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 175000, coursePrice: 90000,
    emiOptions: "₹15,000/month for 6 months (0% interest)", scholarships: "Merit-based 20% scholarship", limitedOffer: "Free cloud hosting for 1 year",
    modules: [
      { name: "Frontend (React)", topics: ["React Hooks", "Redux", "TypeScript", "Testing"] },
      { name: "Backend (Node/Express)", topics: ["REST APIs", "Authentication", "Middleware", "Error Handling"] },
      { name: "Database (MongoDB)", topics: ["Mongoose", "Aggregation", "Indexing", "Data Modeling"] },
      { name: "Full Stack & Deploy", topics: ["Full App Build", "Docker", "AWS/Vercel", "CI/CD"] },
    ],
    tools: ["React", "Node.js", "Express", "MongoDB", "TypeScript", "Docker", "Git"],
    projects: ["E-commerce Platform", "Social Media App", "Project Management Tool", "Capstone"],
    skillsCovered: ["React", "Node.js", "Express", "MongoDB", "TypeScript", "REST APIs", "Docker"],
    careerRoles: ["Fullstack Developer", "MERN Developer", "Software Engineer"],
    careerOutcomes: [
      { role: "MERN Developer", salaryRange: "₹6–15 LPA", growthTrajectory: "Senior in 2-3 years" },
      { role: "Fullstack Developer", salaryRange: "₹8–22 LPA", growthTrajectory: "Lead in 4 years" },
    ],
    testimonials: [{ name: "Priyank Joshi", feedback: "Built a production app during the course. Got ₹10 LPA offer!", rating: 5, image: "" }],
    nextBatchDate: "April 8, 2026", seatsLeft: 10, expectedSalary: "₹6–22 LPA",
  },
  {
    id: "ra-mernstack-pro", collegeId: "redapple", title: "Advanced Certificate in MERN Stack Pro", domain: "Technology",
    description: "Professional MERN Stack with microservices, system design, DevOps, and enterprise patterns.",
    duration: "6 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 175000, coursePrice: 90000,
    emiOptions: "₹15,000/month for 6 months (0% interest)", scholarships: "Top coder scholarship 25%", limitedOffer: "Free AWS + GCP credits ₹20,000",
    modules: [
      { name: "Advanced React", topics: ["Server Components", "Next.js", "Performance", "Testing"] },
      { name: "Advanced Backend", topics: ["Microservices", "GraphQL", "WebSockets", "Message Queues"] },
      { name: "System Design", topics: ["Scalability", "Caching", "Load Balancing", "Database Design"] },
      { name: "DevOps & Enterprise", topics: ["Docker/K8s", "CI/CD", "Monitoring", "Security"] },
    ],
    tools: ["React", "Next.js", "Node.js", "GraphQL", "Docker", "Kubernetes", "Redis", "AWS"],
    projects: ["Microservices Platform", "Real-time Collaboration App", "Enterprise Dashboard", "Capstone"],
    skillsCovered: ["React", "Node.js", "Microservices", "GraphQL", "Docker", "System Design", "AWS"],
    careerRoles: ["Senior Fullstack Developer", "Software Architect", "Tech Lead"],
    careerOutcomes: [
      { role: "Senior Fullstack Developer", salaryRange: "₹12–28 LPA", growthTrajectory: "Architect in 3 years" },
      { role: "Tech Lead", salaryRange: "₹18–35 LPA", growthTrajectory: "CTO track in 5 years" },
    ],
    testimonials: [{ name: "Ankit Sharma", feedback: "Enterprise-level training. Got a ₹18 LPA senior developer role!", rating: 5, image: "" }],
    nextBatchDate: "April 15, 2026", seatsLeft: 8, expectedSalary: "₹12–35 LPA",
  },
  {
    id: "ra-blockchain-pro", collegeId: "redapple", title: "Advanced Certificate in Blockchain Pro", domain: "Technology",
    description: "Advanced blockchain: DeFi protocols, cross-chain development, smart contract auditing, enterprise blockchain.",
    duration: "6 months", mode: "hybrid", schedule: "weekend",
    marketPrice: 175000, coursePrice: 90000,
    emiOptions: "₹15,000/month for 6 months (0% interest)", scholarships: "Web3 builder scholarship 20%", limitedOffer: "Free Blockchain hackathon access",
    modules: [
      { name: "Advanced Solidity", topics: ["Assembly", "Gas Optimization", "Upgradeable Contracts", "Proxy Patterns"] },
      { name: "DeFi Development", topics: ["AMM", "Lending Protocols", "Yield Farming", "Flash Loans"] },
      { name: "Cross-Chain & L2", topics: ["Polygon", "Arbitrum", "Bridges", "Rollups"] },
      { name: "Security & Enterprise", topics: ["Smart Contract Auditing", "Formal Verification", "Hyperledger", "Enterprise Use Cases"] },
    ],
    tools: ["Solidity", "Hardhat", "Foundry", "The Graph", "Chainlink", "OpenZeppelin"],
    projects: ["DeFi Protocol", "Cross-Chain Bridge", "DAO Governance", "Security Audit Report"],
    skillsCovered: ["Solidity", "DeFi", "Smart Contract Security", "Cross-Chain", "Ethereum", "Web3"],
    careerRoles: ["Senior Blockchain Developer", "Smart Contract Auditor", "DeFi Developer"],
    careerOutcomes: [
      { role: "Smart Contract Auditor", salaryRange: "₹15–40 LPA", growthTrajectory: "Senior in 2 years" },
      { role: "DeFi Developer", salaryRange: "₹12–35 LPA", growthTrajectory: "Lead in 3 years" },
    ],
    testimonials: [{ name: "Debashis Sen", feedback: "Working as a smart contract auditor now!", rating: 5, image: "" }],
    nextBatchDate: "May 1, 2026", seatsLeft: 8, expectedSalary: "₹12–40 LPA",
  },

  // ========== DIPLOMA (12 months — ₹1,80,000) ==========
  {
    id: "ra-diploma-graphics", collegeId: "redapple", title: "Diploma in Graphics Design", domain: "Design",
    description: "Comprehensive diploma covering graphic design, UI/UX, and visual communication. Industry-recognized certification.",
    duration: "12 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 350000, coursePrice: 180000,
    emiOptions: "₹15,000/month for 12 months (0% interest)", scholarships: "Merit scholarship up to 30%", limitedOffer: "Free Adobe CC for full duration",
    modules: [
      { name: "Design Foundations", topics: ["Visual Communication", "Color Theory", "Typography", "Layout"] },
      { name: "Adobe Suite", topics: ["Photoshop", "Illustrator", "InDesign", "After Effects"] },
      { name: "UI/UX Design", topics: ["Figma", "User Research", "Prototyping", "Design Systems"] },
      { name: "Portfolio & Industry", topics: ["Brand Projects", "Client Work", "Portfolio", "Interview Prep"] },
    ],
    tools: ["Photoshop", "Illustrator", "Figma", "After Effects", "InDesign", "Canva"],
    projects: ["Complete Brand Identity", "Mobile App Design", "Marketing Campaign", "Portfolio Website", "Client Project"],
    skillsCovered: ["Photoshop", "Illustrator", "Figma", "Typography", "Branding", "UI/UX", "Motion Graphics"],
    careerRoles: ["Graphic Designer", "UI/UX Designer", "Brand Designer", "Visual Designer"],
    careerOutcomes: [
      { role: "Graphic Designer", salaryRange: "₹4–10 LPA", growthTrajectory: "Senior in 2 years" },
      { role: "UI/UX Designer", salaryRange: "₹6–15 LPA", growthTrajectory: "Lead in 3-4 years" },
    ],
    testimonials: [{ name: "Tanushree Roy", feedback: "12-month program gave me a solid foundation. Placed at a top agency!", rating: 5, image: "" }],
    nextBatchDate: "April 1, 2026", seatsLeft: 20, expectedSalary: "₹4–15 LPA",
  },
  {
    id: "ra-diploma-uiux", collegeId: "redapple", title: "Diploma in UI/UX Designing", domain: "Design",
    description: "In-depth diploma in UI/UX design with focus on research, interaction design, and portfolio building.",
    duration: "12 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 350000, coursePrice: 180000,
    emiOptions: "₹15,000/month for 12 months (0% interest)", scholarships: "Portfolio scholarship 25%", limitedOffer: "Free UX conference pass ₹15,000",
    modules: [
      { name: "UX Foundations", topics: ["Design Thinking", "User Psychology", "Accessibility", "IA"] },
      { name: "Research & Strategy", topics: ["User Interviews", "Surveys", "Analytics", "Competitive Analysis"] },
      { name: "Visual & Interaction", topics: ["Visual Design", "Micro-interactions", "Animation", "Design Systems"] },
      { name: "Advanced UX", topics: ["Service Design", "Design Ops", "Leadership", "Client Management"] },
    ],
    tools: ["Figma", "Sketch", "Adobe XD", "Miro", "Maze", "Notion", "Principle"],
    projects: ["Enterprise App Redesign", "Mobile App from Scratch", "Design System", "Service Blueprint", "Client Project"],
    skillsCovered: ["Figma", "User Research", "Interaction Design", "Prototyping", "Design Systems", "Accessibility"],
    careerRoles: ["UX Designer", "Product Designer", "Interaction Designer", "UX Researcher", "Design Lead"],
    careerOutcomes: [
      { role: "UX Designer", salaryRange: "₹6–15 LPA", growthTrajectory: "Senior in 2 years" },
      { role: "Product Designer", salaryRange: "₹10–22 LPA", growthTrajectory: "Design Lead in 3-4 years" },
    ],
    testimonials: [{ name: "Ishita Banerjee", feedback: "Got a Product Designer role at ₹12 LPA!", rating: 5, image: "" }],
    nextBatchDate: "April 1, 2026", seatsLeft: 15, expectedSalary: "₹6–22 LPA",
  },
  {
    id: "ra-diploma-3danim", collegeId: "redapple", title: "Diploma in 3D Animation & VFX", domain: "Design",
    description: "Professional diploma in 3D animation, visual effects, and post-production with industry-standard tools.",
    duration: "12 months", mode: "hybrid", schedule: "weekday",
    marketPrice: 350000, coursePrice: 180000,
    emiOptions: "₹15,000/month for 12 months (0% interest)", scholarships: "Creative excellence scholarship 30%", limitedOffer: "Free Wacom tablet worth ₹8,000",
    modules: [
      { name: "3D Fundamentals", topics: ["Modeling", "Texturing", "Lighting", "Rendering"] },
      { name: "Animation", topics: ["Character Animation", "Rigging", "Motion Capture", "Facial Animation"] },
      { name: "VFX & Compositing", topics: ["Nuke", "After Effects", "Particle Systems", "Fluid Simulation"] },
      { name: "Industry Pipeline", topics: ["Pipeline Workflow", "Showreel", "Studio Internship", "Portfolio"] },
    ],
    tools: ["Maya", "Blender", "ZBrush", "Nuke", "After Effects", "Substance Painter", "Houdini"],
    projects: ["Animated Short Film", "VFX Sequence", "Character Reel", "Compositing Demo", "Studio Project"],
    skillsCovered: ["Maya", "Blender", "3D Animation", "VFX", "Compositing", "Character Animation"],
    careerRoles: ["3D Animator", "VFX Artist", "Compositor", "Character Animator", "Lighting Artist"],
    careerOutcomes: [
      { role: "3D Animator", salaryRange: "₹4–12 LPA", growthTrajectory: "Senior in 3 years" },
      { role: "VFX Artist", salaryRange: "₹6–18 LPA", growthTrajectory: "Lead in 4-5 years" },
    ],
    testimonials: [{ name: "Aritra Basu", feedback: "Working at a VFX studio in Mumbai now! World-class training.", rating: 5, image: "" }],
    nextBatchDate: "April 1, 2026", seatsLeft: 12, expectedSalary: "₹4–18 LPA",
  },

  // ========== DEGREE ==========
  {
    id: "ra-bvoc", collegeId: "redapple", title: "B.Voc in Animation & Multimedia", domain: "Design",
    description: "UGC Approved Bachelor's degree in Animation & Multimedia. 3-year program with industry internships.",
    duration: "3 years", mode: "offline", schedule: "weekday",
    marketPrice: 600000, coursePrice: 350000,
    emiOptions: "Education loan assistance available", scholarships: "Government scholarships for eligible students", limitedOffer: "100% Placement Guarantee",
    modules: [
      { name: "Year 1: Foundations", topics: ["Drawing", "Design Principles", "2D Animation", "Digital Art"] },
      { name: "Year 2: Specialization", topics: ["3D Modeling", "Character Animation", "VFX", "Game Art"] },
      { name: "Year 3: Industry", topics: ["Advanced Projects", "Studio Internship", "Thesis", "Placement"] },
    ],
    tools: ["Maya", "Blender", "After Effects", "Premiere Pro", "Photoshop", "Unity", "Nuke"],
    projects: ["2D Animation Film", "3D Short Film", "VFX Showreel", "Game Demo", "Thesis Project"],
    skillsCovered: ["2D Animation", "3D Animation", "VFX", "Multimedia", "Game Art", "Video Editing"],
    careerRoles: ["Animator", "VFX Artist", "Multimedia Designer", "Game Artist", "Video Editor"],
    careerOutcomes: [
      { role: "Animator", salaryRange: "₹4–12 LPA", growthTrajectory: "Senior in 2-3 years" },
      { role: "VFX Artist", salaryRange: "₹5–15 LPA", growthTrajectory: "Lead in 4 years" },
    ],
    testimonials: [{ name: "Rupam Dutta", feedback: "UGC degree + practical skills = best combination. Working at DNEG now!", rating: 5, image: "" }],
    nextBatchDate: "July 2026 (Academic Year)", seatsLeft: 30, expectedSalary: "₹4–15 LPA",
  },
];

// ========================
// HELPER FUNCTIONS
// ========================

export function getCourseById(id: string): CourseDetail | undefined {
  const detailed = courseDetails.find(c => c.id === id);
  if (detailed) return detailed;

  // Fallback: auto-generate from courseData.ts base courses
  const baseCourse = allBaseCourses.find(c => c.id === id);
  if (!baseCourse) return undefined;

  const collegeId = baseCourse.providerType === "redapple" ? "redapple" : "generic";
  const priceNum = parseInt(baseCourse.price.replace(/[^\d]/g, "")) || 25000;

  return {
    id: baseCourse.id, collegeId, title: baseCourse.title, domain: baseCourse.domain,
    description: `${baseCourse.title} — a comprehensive program by ${baseCourse.provider} covering ${baseCourse.skills.slice(0, 4).join(", ")} and more.`,
    duration: baseCourse.duration, mode: baseCourse.mode, schedule: "flexible",
    marketPrice: Math.round(priceNum * 2), coursePrice: priceNum,
    emiOptions: "EMI available", scholarships: "Merit-based scholarships available", limitedOffer: "Limited seats — enroll now",
    modules: [
      { name: "Core Curriculum", topics: baseCourse.skills.slice(0, 4) },
      { name: "Advanced Topics", topics: baseCourse.skills.slice(4, 8) },
      { name: "Projects & Portfolio", topics: ["Real-world Projects", "Portfolio Building", "Industry Exposure"] },
    ],
    tools: baseCourse.skills.slice(0, 6), projects: ["Industry Project", "Capstone Project", "Portfolio Piece"],
    skillsCovered: baseCourse.skills, careerRoles: baseCourse.careers,
    careerOutcomes: baseCourse.careers.slice(0, 3).map(role => ({ role, salaryRange: "₹4–15 LPA", growthTrajectory: "Growth in 2-3 years" })),
    testimonials: [{ name: "Student", feedback: "Great learning experience with practical projects.", rating: 5, image: "" }],
    nextBatchDate: "April 2026", seatsLeft: 20, expectedSalary: "₹4–15 LPA",
  };
}

export function getCollegeById(id: string): CollegeProfile | undefined {
  return colleges.find(c => c.id === id);
}

export function getCollegeForCourse(courseId: string): CollegeProfile | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  return getCollegeById(course.collegeId);
}

export function getAllCoursesForCollege(collegeId: string): CourseDetail[] {
  return courseDetails.filter(c => c.collegeId === collegeId);
}
