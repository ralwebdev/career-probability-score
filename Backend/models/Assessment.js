const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  educationLevel: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  careerDomain: { type: String, required: true },
  specialization: { type: String },
  careerRole: { type: String, required: true },

  // College specific fields
  collegeName: { type: String },
  department: { type: String },
  course: { type: String },
  year: { type: Number, enum: [1, 2, 3, 4] },
  cpsHistory: [{ type: Number }],
  
  // Dashboard specific metrics (stored in Assessment for single source of truth)
  placementReadiness: { type: String },
  topCareerDomains: [{ type: String }],
  topCareerRoles: [{
    role: String,
    fit: { type: String, enum: ['High', 'Medium', 'Low'] }
  }],
  skillGaps: [{
    skill: String,
    level: { type: String, enum: ['High', 'Medium', 'Low'] }
  }],
  likelyIndustries: [{ type: String }],
  suggestedTraining: [{ type: String }],

  // Storing raw inputs
  technicalSkills: { type: Map, of: Number },
  softSkills: { type: Map, of: Number },
  communicationSkills: { type: Map, of: Number },
  eiSkills: { type: Map, of: Number },
  experience: { type: Map, of: Number },
  portfolioLevel: { type: String, enum: ['none', 'basic', 'strong'] },

  // Storing computed scores from the algorithm
  scores: {
    total: Number,
    technical: Number,
    softSkill: Number,
    communication: Number,
    ei: Number,
    experience: Number,
    portfolio: Number,
    marketDemand: Number,
    qpi: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);