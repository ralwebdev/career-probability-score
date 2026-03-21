const express = require('express');
const router = express.Router();
const {
  createAssessment,
  getAnalytics,
  getAssessments,
  getAssessmentById
} = require('../controllers/assessmentController');

// @desc    Create new assessment
// @route   POST /api/assessments
router.post('/', createAssessment);

// @desc    Get analytics for admin dashboard
// @route   GET /api/assessments/analytics/stats
router.get('/analytics/stats', getAnalytics);

// @desc    Get all assessments
// @route   GET /api/assessments
router.get('/', getAssessments);

// @desc    Get assessment by ID (for results page)
// @route   GET /api/assessments/:id
router.get('/:id', getAssessmentById);

module.exports = router;