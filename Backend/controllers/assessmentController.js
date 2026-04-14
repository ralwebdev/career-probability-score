const Assessment = require('../models/Assessment');
const { calculateCPS, getCareerInsights } = require('../utils/careerData');


// @desc    Create new assessment
// @route   POST /api/assessments
const createAssessment = async (req, res, next) => {
  try {
    // Calculate CPS score on the backend for data integrity
    const scores = calculateCPS(req.body);
    
    // Calculate intelligent insights for the dashboard
    const insights = getCareerInsights(req.body.fieldOfStudy, scores.total);

    const assessment = await Assessment.create({
      ...req.body,
      scores,
      ...insights
    });
    res.status(201).json(assessment);

  } catch (error) {
    res.status(400);
    next(error);
  }
};

// @desc    Get analytics for admin dashboard
// @route   GET /api/assessments/analytics/stats
const getAnalytics = async (req, res, next) => {
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
};

// @desc    Get detailed score stats grouped by career role
// @route   GET /api/assessments/stats/course-scores
const getCourseScoreStats = async (req, res, next) => {
  try {
    const stats = await Assessment.aggregate([
      {
        $group: {
          _id: "$careerRole",
          avgTotal: { $avg: "$scores.total" },
          avgTechnical: { $avg: "$scores.technical" },
          avgSoftSkill: { $avg: "$scores.softSkill" },
          avgCommunication: { $avg: "$scores.communication" },
          avgEi: { $avg: "$scores.ei" },
          avgExperience: { $avg: "$scores.experience" },
          avgPortfolio: { $avg: "$scores.portfolio" },
          avgMarketDemand: { $avg: "$scores.marketDemand" },
          avgQpi: { $avg: "$scores.qpi" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          role: "$_id",
          total: { $round: ["$avgTotal", 1] },
          technical: { $round: ["$avgTechnical", 1] },
          softSkill: { $round: ["$avgSoftSkill", 1] },
          communication: { $round: ["$avgCommunication", 1] },
          ei: { $round: ["$avgEi", 1] },
          experience: { $round: ["$avgExperience", 1] },
          portfolio: { $round: ["$avgPortfolio", 1] },
          marketDemand: { $round: ["$avgMarketDemand", 1] },
          qpi: { $round: ["$avgQpi", 1] },
          count: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all assessments
// @route   GET /api/assessments
const getAssessments = async (req, res, next) => {
  try {
    const assessments = await Assessment.find({}).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    next(error);
  }
};

// @desc    Get assessment by ID (for results page)
// @route   GET /api/assessments/:id
const getAssessmentById = async (req, res, next) => {
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
};

// @desc    Export all assessments to CSV
// @route   GET /api/assessments/export/csv
const exportAssessmentsToCSV = async (req, res, next) => {
  try {
    const { jsonToCsv } = require('../utils/csvHelper');
    const assessments = await Assessment.find({}).sort({ createdAt: -1 });

    const fields = [
      { label: 'Name', path: 'name' },
      { label: 'Email', path: 'email' },
      { label: 'Phone', path: 'phone' },
      { label: 'City', path: 'city' },
      { label: 'State', path: 'state' },
      { label: 'Country', path: 'country' },
      { label: 'Education Level', path: 'educationLevel' },
      { label: 'Field of Study', path: 'fieldOfStudy' },
      { label: 'Domain', path: 'careerDomain' },
      { label: 'Specialization', path: 'specialization' },
      { label: 'Target Role', path: 'careerRole' },
      { label: 'Year', path: 'year' },
      { label: 'QPI Score', path: 'scores.qpi' },
      { label: 'Technical Score', path: 'scores.technical' },
      { label: 'Soft Skills Score', path: 'scores.softSkill' },
      { label: 'Communication Score', path: 'scores.communication' },
      { label: 'EI Score', path: 'scores.ei' },
      { label: 'Experience Score', path: 'scores.experience' },
      { label: 'Portfolio Score', path: 'scores.portfolio' },
      { label: 'Market Demand', path: 'scores.marketDemand' },
      { label: 'Date', path: 'createdAt' }
    ];

    const csv = jsonToCsv(assessments, fields);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=assessments_export.csv');
    res.status(200).send(csv);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAssessment,
  getAnalytics,
  getAssessments,
  getAssessmentById,
  getCourseScoreStats,
  exportAssessmentsToCSV
};
