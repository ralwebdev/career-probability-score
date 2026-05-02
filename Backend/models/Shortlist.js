const mongoose = require('mongoose');

const shortlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  candidates: [{
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
    fitScore: { type: Number },
    notes: { type: String },
    addedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Shortlist', shortlistSchema);
