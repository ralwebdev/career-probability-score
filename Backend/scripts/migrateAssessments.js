const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Assessment = require('../models/Assessment');

// Load environment variables from ../.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const migrate = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database.');

    console.log('Starting migration...');

    // Find documents missing the new analytics fields or college fields
    const query = {
      $or: [
        { placementReadiness: { $exists: false } }, // Analytics
        { cpsHistory: { $exists: false } },         // History
        { collegeId: { $exists: false } },          // College tracking
        { skillGaps: { $exists: false } }           // Detailed insights
      ]
    };

    const update = {
      $set: {
        placementReadiness: "Needs Analysis",
        topCareerDomains: [],
        topCareerRoles: [],
        skillGaps: [],
        likelyIndustries: [],
        suggestedTraining: [],
        cpsHistory: [],
        collegeId: "CIEM",
        collegeName: "Calcutta Institute of Engineering and Management",
        department: null,
        course: null,
        year: null
      }
    };

    const result = await Assessment.updateMany(query, update);

    console.log(`Migration completed!`);
    console.log(`- Documents matched: ${result.matchedCount}`);
    console.log(`- Documents updated: ${result.modifiedCount}`);

    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();
