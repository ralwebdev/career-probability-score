const express = require('express');
const router = express.Router();
const {
  createAssessment,
  getAnalytics,
  getAssessments,
  getAssessmentById,
  getCourseScoreStats,
  exportAssessmentsToCSV
} = require('../controllers/assessmentController');

// @desc    Create new assessment
// @route   POST /api/assessments
router.post('/', createAssessment);

// @desc    Get analytics for admin dashboard
// @route   GET /api/assessments/analytics/stats
router.get('/analytics/stats', getAnalytics);

// @desc    Get detailed score stats grouped by career role
// @route   GET /api/assessments/stats/course-scores
router.get('/stats/course-scores', getCourseScoreStats);

// @desc    Get all assessments
// @route   GET /api/assessments
router.get('/', getAssessments);

// @desc    Export all assessments to CSV
// @route   GET /api/assessments/export/csv
router.get('/export/csv', exportAssessmentsToCSV);

// @desc    Get assessment by ID (for results page)
// @route   GET /api/assessments/:id
router.get('/:id', getAssessmentById);

module.exports = router;