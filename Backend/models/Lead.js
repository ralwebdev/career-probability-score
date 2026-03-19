const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  interest: { type: String },
  courseTitle: { type: String, required: true },
  source: { 
    type: String, 
    enum: ['micro-commitment', 'exit-intent', 'scroll-nudge', 'inline', 'floating-cta'],
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);