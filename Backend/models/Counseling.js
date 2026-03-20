const mongoose = require('mongoose');

const counselingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    careerInterest: { type: String },
    budget: { type: String },
    time: { type: String },
    mode: { type: String },
    schedule: { type: String },
    country: { type: String },
    preferredDate: { type: Date },
    preferredTime: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Counseling', counselingSchema);
