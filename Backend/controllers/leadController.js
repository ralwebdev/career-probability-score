const Lead = require('../models/Lead');

// @desc    Capture a new lead
// @route   POST /api/leads
const createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

// @desc    Get all leads (Admin)
// @route   GET /api/leads
const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getLeads
};
