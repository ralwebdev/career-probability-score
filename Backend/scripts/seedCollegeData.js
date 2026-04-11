const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config({ path: './.env' });

const CollegeUser = require('../models/CollegeUser');
const Assessment = require('../models/Assessment');
const connectDB = require('../config/db');

// Data arrays from the frontend mock
const departments = ["Computer Science", "Life Sciences", "Commerce", "Arts & Humanities", "Mechanical Engineering", "Electronics"];

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

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const generateAssessments = () => {
  const rand = seededRandom(42);
  const assessments = [];

  for (const dept of departments) {
    const count = 10; // Generate 10 students per department

    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(rand() * firstNames.length)];
        const lastName = lastNames[Math.floor(rand() * lastNames.length)];
        
        const baseScore = Math.floor(rand() * 60) + 30; // 30-90
        
        // Detailed metrics
        const placementReadiness = baseScore > 70 ? "Ready for Placement" : baseScore >= 40 ? "Needs Training" : "Not Ready";
        const topCareerDomains = dept === "Computer Science" ? ["Technology", "Software Engineering"] : ["Business", dept];
        const topCareerRoles = [
            { role: "Software Developer", fit: baseScore > 70 ? "High" : "Medium" },
            { role: "Product Manager", fit: "Medium" }
        ];
        const skillGaps = [
            { skill: "System Design", level: baseScore < 60 ? "High" : "Medium" },
            { skill: "Leadership", level: "Low" }
        ];
        const likelyIndustries = ["FinTech", "EdTech", "E-commerce"];
        const suggestedTraining = ["Advanced JavaScript", "System Design Patterns"];

        assessments.push({
          name: `${firstName} ${lastName}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.edu`,
          phone: `9${Math.floor(rand() * 1000000000).toString().padStart(9, '0')}`,
          city: "Kolkata",
          state: "West Bengal",
          country: "India",
          educationLevel: "Undergraduate",
          fieldOfStudy: dept,
          careerDomain: "Technology",
          careerRole: "Software Engineer",
          
          collegeName: "Red Apple Learning",
          department: dept,
          course: dept === "Computer Science" ? "BTech CSE" : "BSc",
          year: (Math.floor(rand() * 4) + 1),
          
          placementReadiness,
          topCareerDomains,
          topCareerRoles,
          skillGaps,
          likelyIndustries,
          suggestedTraining,

          scores: {
             total: baseScore,
             technical: Math.floor(baseScore * 0.4),
             softSkill: Math.floor(baseScore * 0.15),
             communication: Math.floor(baseScore * 0.15),
             ei: Math.floor(baseScore * 0.1),
             experience: 5,
             portfolio: 5,
             marketDemand: 8,
             qpi: baseScore + 2
          },
          cpsHistory: [baseScore - 10, baseScore - 5, baseScore]
        });
      }
  }
  return assessments;
}

const collegeUsersMock = [
  { email: "admin@redapple.edu", password: "admin123", name: "Dr. Rajesh Sharma", role: "admin", collegeName: "Red Apple Learning" },
  { email: "cs@redapple.edu", password: "faculty123", name: "Prof. Anita Das", role: "faculty", department: "Computer Science", collegeName: "Red Apple Learning" },
];

const seedData = async () => {
    try {
        await connectDB();
        
        // Clear existing
        await CollegeUser.deleteMany();
        await Assessment.deleteMany({ collegeName: "Red Apple Learning" });
        
        console.log('Cleared existing college users and Red Apple assessments...');

        // Hash passwords
        const usersToInsert = [];
        for (const u of collegeUsersMock) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(u.password, salt);
            usersToInsert.push({ ...u, password: hashed });
        }
        
        await CollegeUser.insertMany(usersToInsert);
        console.log('College Users Seeded!');

        // Insert assessments
        const assessments = generateAssessments();
        await Assessment.insertMany(assessments);
        console.log(`Assessments Seeded! (Count: ${assessments.length})`);

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

seedData();
