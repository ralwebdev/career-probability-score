const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'blacklisted'], default: 'pending' },
  role: { type: String, enum: ['recruiter', 'admin'], default: 'recruiter' },
  complianceFlags: [{ type: String }],
  rejectionReason: { type: String },
  blacklistReason: { type: String },
  approvedAt: { type: Date },
  rejectedAt: { type: Date },
  blacklistedAt: { type: Date },
  trustScore: { type: Number, default: 50 },
  riskScore: { type: Number, default: 0 },
  savedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
  activity: {
    candidatesViewed: { type: Number, default: 0 },
    candidatesShortlisted: { type: Number, default: 0 },
    candidatesSaved: { type: Number, default: 0 }
  }
}, { timestamps: true });

recruiterSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

recruiterSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Recruiter', recruiterSchema);
