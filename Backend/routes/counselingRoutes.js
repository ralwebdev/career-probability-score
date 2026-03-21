const express = require('express');
const router = express.Router();
const { submitCounseling, getCounselingRequests } = require('../controllers/counselingController');

// @desc    Submit counseling form
// @route   POST /api/counseling
// @access  Public
router.post('/', submitCounseling);

// @desc    Get all counseling requests
// @route   GET /api/counseling
// @access  Private (Admin)
router.get('/', getCounselingRequests);

module.exports = router;
