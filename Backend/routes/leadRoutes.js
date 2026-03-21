const express = require('express');
const router = express.Router();
const { createLead, getLeads } = require('../controllers/leadController');

// @desc    Capture a new lead
// @route   POST /api/leads
router.post('/', createLead);

// @desc    Get all leads (Admin)
// @route   GET /api/leads
router.get('/', getLeads);

module.exports = router;