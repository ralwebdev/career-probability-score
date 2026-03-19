const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');

// @desc    Create new assessment
// @route   POST /api/assessments
router.post('/', async (req, res, next) => {
  try {
    // You can either compute the CPS score here on the backend 
    // or accept the frontend's calculation to speed up migration.
    const assessment = await Assessment.create(req.body);
    res.status(201).json(assessment);
  } catch (error) {
    res.status(400);
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

// @desc    Get analytics for admin dashboard
// @route   GET /api/assessments/analytics/stats
router.get('/analytics/stats', async (req, res, next) => {
  try {
    const totalUsers = await Assessment.countDocuments();
    // Aggregation for Average CPS
    const avgStats = await Assessment.aggregate([
      { $group: { _id: null, avgCps: { $avg: "$scores.total" } } }
    ]);
    
    res.json({
      totalUsers,
      avgCPS: avgStats[0]?.avgCps ? Math.round(avgStats[0].avgCps) : 0,
      // Add other mock data aggregations here natively in MongoDB
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;