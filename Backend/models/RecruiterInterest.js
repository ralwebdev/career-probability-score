const mongoose = require('mongoose');

const recruiterInterestSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
  candidateName: { type: String },
  candidateCps: { type: Number },
  status: { 
    type: String, 
    enum: ['interested', 'cv_requested', 'approved', 'rejected'],
    default: 'interested'
  }
}, { timestamps: true });

module.exports = mongoose.model('RecruiterInterest', recruiterInterestSchema);
