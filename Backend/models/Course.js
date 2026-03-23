const mongoose = require('mongoose');

const courseDetailSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  collegeId: { type: String, required: true },
  title: { type: String, required: true },
  domain: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  mode: { type: String, enum: ['online', 'offline', 'hybrid'], required: true },
  schedule: { type: String, enum: ['weekday', 'weekend', 'flexible'], required: true },
  marketPrice: { type: Number, required: true },
  coursePrice: { type: Number, required: true },
  emiOptions: { type: String },
  scholarships: { type: String },
  limitedOffer: { type: String },
  modules: [{
    name: { type: String, required: true },
    topics: [{ type: String }]
  }],
  tools: [{ type: String }],
  projects: [{ type: String }],
  skillsCovered: [{ type: String }],
  careerRoles: [{ type: String }],
  careerOutcomes: [{
    role: { type: String },
    salaryRange: { type: String },
    growthTrajectory: { type: String }
  }],
  testimonials: [{
    name: { type: String },
    feedback: { type: String },
    rating: { type: Number },
    image: { type: String }
  }],
  nextBatchDate: { type: String },
  seatsLeft: { type: Number },
  expectedSalary: { type: String }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseDetailSchema);

module.exports = Course;
