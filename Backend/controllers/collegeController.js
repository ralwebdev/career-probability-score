const jwt = require('jsonwebtoken');
const College = require('../models/College');
const Assessment = require('../models/Assessment');


// @desc    Auth college user & get token
// @route   POST /api/college/login
// @access  Public
const loginCollegeUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await College.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
      });

      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        collegeId: user.collegeId,
        role: user.role,
        token: token,
      });

    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get college students based on role
// @route   GET /api/college/students
// @access  Private
const getStudents = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await College.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let filter = {
      collegeId: user.collegeId
    };


    // If faculty, restrict to their department
    if (user.role === 'faculty') {
      filter.department = user.department;
    }

    const assessments = await Assessment.find(filter).sort({ createdAt: -1 });

    // UNIFIED MAPPING: This function pulls ALL data strictly from the Assessment document
    const transformedStudents = assessments.map(doc => {
      const a = doc.toObject();
      
      // Map scores to dimensions for Radar Chart
      const dimensions = {
        technical: a.scores?.technical || 0,
        analytical: a.scores?.softSkill || 0,
        communication: a.scores?.communication || 0,
        emotional_intelligence: a.scores?.ei || 0
      };

      // Return unified record pulling from all Assessment collection fields
      return {
        _id: a._id.toString(), // Support both id and _id
        id: a._id.toString(),
        name: a.name,
        email: a.email,
        phone: a.phone,
        city: a.city,
        state: a.state,
        country: a.country,
        educationLevel: a.educationLevel,
        fieldOfStudy: a.fieldOfStudy,
        careerDomain: a.careerDomain,
        specialization: a.specialization,
        careerRole: a.careerRole,
        department: a.department || a.fieldOfStudy || "General",
        course: a.course || a.specialization || "General",
        year: a.year || 1,
        cpsScore: a.scores?.total || 0,
        cpsHistory: a.cpsHistory && a.cpsHistory.length > 0 ? a.cpsHistory : [a.scores?.total || 0],
        dimensions,
        topCareerDomains: a.topCareerDomains && a.topCareerDomains.length > 0 
          ? a.topCareerDomains 
          : [a.careerDomain].filter(Boolean),
        topCareerRoles: a.topCareerRoles && a.topCareerRoles.length > 0
          ? a.topCareerRoles
          : [{ role: a.careerRole, fit: "High" }],
        skillGaps: a.skillGaps || [],
        placementReadiness: a.placementReadiness || (a.scores?.total > 70 ? "Ready for Placement" : a.scores?.total >= 40 ? "Needs Training" : "Not Ready"),
        likelyIndustries: a.likelyIndustries || [],
        suggestedTraining: a.suggestedTraining || [],
        portfolioLevel: a.portfolioLevel,
        scores: a.scores, // Raw scores for Analytics
        createdAt: a.createdAt
      };
    });

    res.json(transformedStudents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to verify JWT token and set req.user
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = await College.findById(decoded.id).select('-password');
      next();

    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = {
  loginCollegeUser,
  getStudents,
  protect
};
