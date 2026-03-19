const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// @desc    Capture a new lead
// @route   POST /api/leads
router.post('/', async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

// @desc    Get all leads (Admin)
// @route   GET /api/leads
router.get('/', async (req, res, next) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    next(error);
  }
});

module.exports = router;