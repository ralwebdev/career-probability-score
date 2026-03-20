const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const { calculateCPS } = require('../utils/careerData');

// @desc    Create new assessment
// @route   POST /api/assessments
router.post('/', async (req, res, next) => {
  try {
    // Calculate CPS score on the backend for data integrity
    const scores = calculateCPS(req.body);
    const assessment = await Assessment.create({
      ...req.body,
      scores
    });
    res.status(201).json(assessment);
  } catch (error) {
    res.status(400);
    next(error);
  }
});

// @desc    Get analytics for admin dashboard
// @route   GET /api/assessments/analytics/stats
router.get('/analytics/stats', async (req, res, next) => {
  try {
    const totalUsers = await Assessment.countDocuments();
    
    // Aggregation for Average CPS
    const avgStats = await Assessment.aggregate([
      { $group: { _id: null, avgCps: { $avg: "$scores.total" } } }
    ]);

    // Popular Careers (by careerRole)
    const popularCareers = await Assessment.aggregate([
      { $group: { _id: "$careerRole", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
      { $project: { name: "$_id", count: 1, _id: 0 } }
    ]);

    // Score Distribution
    const scoreDistribution = await Assessment.aggregate([
      {
        $bucket: {
          groupBy: "$scores.total",
          boundaries: [0, 21, 41, 61, 81, 101],
          default: "Other",
          output: {
            count: { $sum: 1 }
          }
        }
      },
      {
        $project: {
          range: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 0] }, then: "0-20" },
                { case: { $eq: ["$_id", 21] }, then: "21-40" },
                { case: { $eq: ["$_id", 41] }, then: "41-60" },
                { case: { $eq: ["$_id", 61] }, then: "61-80" },
                { case: { $eq: ["$_id", 81] }, then: "81-100" }
              ],
              default: "Other"
            }
          },
          color: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 0] }, then: "hsl(0, 84%, 60%)" },
                { case: { $eq: ["$_id", 21] }, then: "hsl(20, 84%, 55%)" },
                { case: { $eq: ["$_id", 41] }, then: "hsl(42, 100%, 50%)" },
                { case: { $eq: ["$_id", 61] }, then: "hsl(120, 60%, 45%)" },
                { case: { $eq: ["$_id", 81] }, then: "hsl(160, 84%, 39%)" }
              ],
              default: "hsl(215, 20%, 40%)"
            }
          },
          count: 1,
          _id: 0
        }
      }
    ]);

    // Top Countries
    const topCountries = await Assessment.aggregate([
      { $group: { _id: "$country", users: { $sum: 1 } } },
      { $sort: { users: -1 } },
      { $limit: 5 },
      { $project: { name: "$_id", users: 1, _id: 0 } }
    ]);

    // Assessments Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const assessmentsToday = await Assessment.countDocuments({
      createdAt: { $gte: today }
    });
    
    res.json({
      totalUsers,
      avgCPS: avgStats[0]?.avgCps ? Math.round(avgStats[0].avgCps) : 0,
      popularCareers,
      scoreDistribution,
      topCountries,
      assessmentsToday
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all assessments
// @route   GET /api/assessments
router.get('/', async (req, res, next) => {
  try {
    const assessments = await Assessment.find({}).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    next(error);
  }
});

// @desc    Get assessment by ID (for results page)
// @route   GET /api/assessments/:id
router.get('/:id', async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      res.status(404);
      throw new Error('Assessment not found');
    }
    res.json(assessment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;