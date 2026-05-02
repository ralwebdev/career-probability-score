const Recruiter = require('../models/Recruiter');
const Shortlist = require('../models/Shortlist');
const RecruiterInterest = require('../models/RecruiterInterest');
const Assessment = require('../models/Assessment');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new recruiter
// @route   POST /api/recruiter/register
// @access  Public
const registerRecruiter = async (req, res) => {
  try {
    const { name, company, email, password } = req.body;

    const recruiterExists = await Recruiter.findOne({ email });

    if (recruiterExists) {
      if (recruiterExists.status === 'blacklisted') {
        return res.status(403).json({ message: 'Account permanently restricted.' });
      }
      return res.status(400).json({ message: 'Recruiter already exists' });
    }

    const recruiter = await Recruiter.create({
      name,
      company,
      email,
      password,
    });

    if (recruiter) {
      res.status(201).json({
        _id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
        company: recruiter.company,
        status: recruiter.status,
        role: recruiter.role,
        token: generateToken(recruiter._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid recruiter data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth recruiter & get token
// @route   POST /api/recruiter/login
// @access  Public
const loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email });

    if (recruiter && (await recruiter.matchPassword(password))) {
      if (recruiter.status === 'blacklisted') {
        return res.status(403).json({ message: 'Your account has been permanently restricted.' });
      }
      if (recruiter.status === 'rejected') {
        return res.status(403).json({ message: 'Your account has been temporarily restricted.' });
      }
      if (recruiter.status === 'pending') {
        return res.status(403).json({ message: 'Your account is not yet activated.' });
      }

      res.json({
        _id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
        company: recruiter.company,
        status: recruiter.status,
        role: recruiter.role,
        token: generateToken(recruiter._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get mock candidates for recruiter
// @route   GET /api/recruiter/candidates
// @access  Private/Recruiter
const getCandidates = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 9, 1);
    const skip = (page - 1) * limit;

    const totalCandidates = await Assessment.countDocuments({});
    const candidates = await Assessment.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      candidates,
      page,
      limit,
      totalCandidates,
      totalPages: Math.max(1, Math.ceil(totalCandidates / limit))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get shortlists
// @route   GET /api/recruiter/shortlists
// @access  Private/Recruiter
const getShortlists = async (req, res) => {
  try {
    const shortlists = await Shortlist.find({ recruiterId: req.recruiter._id }).populate('candidates.candidateId', 'name email cpsHistory careerRole');
    res.json(shortlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a shortlist
// @route   POST /api/recruiter/shortlists
// @access  Private/Recruiter
const createShortlist = async (req, res) => {
  try {
    const { name } = req.body;
    const shortlist = await Shortlist.create({
      name,
      recruiterId: req.recruiter._id,
      candidates: []
    });
    res.status(201).json(shortlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add candidate to shortlist
// @route   POST /api/recruiter/shortlists/:id/add
// @access  Private/Recruiter
const addToShortlist = async (req, res) => {
  try {
    const { candidateId, fitScore, notes } = req.body;
    const shortlist = await Shortlist.findOne({ _id: req.params.id, recruiterId: req.recruiter._id });

    if (!shortlist) {
      return res.status(404).json({ message: 'Shortlist not found' });
    }

    const exists = shortlist.candidates.find(c => c.candidateId.toString() === candidateId);
    if (exists) {
      return res.status(400).json({ message: 'Candidate already in shortlist' });
    }

    shortlist.candidates.push({ candidateId, fitScore, notes });
    await shortlist.save();

    // Update recruiter activity
    req.recruiter.activity.candidatesShortlisted += 1;
    await req.recruiter.save();

    res.json(shortlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove candidate from shortlist
// @route   DELETE /api/recruiter/shortlists/:id/remove/:candidateId
// @access  Private/Recruiter
const removeFromShortlist = async (req, res) => {
  try {
    const shortlist = await Shortlist.findOne({ _id: req.params.id, recruiterId: req.recruiter._id });

    if (!shortlist) {
      return res.status(404).json({ message: 'Shortlist not found' });
    }

    shortlist.candidates = shortlist.candidates.filter(
      c => c.candidateId.toString() !== req.params.candidateId
    );
    await shortlist.save();

    res.json(shortlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle save candidate
// @route   POST /api/recruiter/saved/:candidateId
// @access  Private/Recruiter
const toggleSaveCandidate = async (req, res) => {
  try {
    const recruiter = req.recruiter;
    const candidateId = req.params.candidateId;

    const index = recruiter.savedCandidates.indexOf(candidateId);
    if (index > -1) {
      recruiter.savedCandidates.splice(index, 1);
    } else {
      recruiter.savedCandidates.push(candidateId);
      recruiter.activity.candidatesSaved += 1;
    }

    await recruiter.save();
    res.json(recruiter.savedCandidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recruiter interests
// @route   GET /api/recruiter/interests
// @access  Private/Recruiter
const getInterests = async (req, res) => {
  try {
    const interests = await RecruiterInterest.find({ recruiterId: req.recruiter._id });
    res.json(interests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Express interest in a candidate
// @route   POST /api/recruiter/interests
// @access  Private/Recruiter
const expressInterest = async (req, res) => {
  try {
    const { candidateId, candidateName, candidateCps } = req.body;
    let interest = await RecruiterInterest.findOne({ recruiterId: req.recruiter._id, candidateId });

    if (!interest) {
      interest = await RecruiterInterest.create({
        recruiterId: req.recruiter._id,
        candidateId,
        candidateName,
        candidateCps,
        status: 'interested'
      });
    }
    res.json(interest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Request CV for candidate
// @route   POST /api/recruiter/interests/cv
// @access  Private/Recruiter
const requestCV = async (req, res) => {
  try {
    const { candidateId } = req.body;
    let interest = await RecruiterInterest.findOne({ recruiterId: req.recruiter._id, candidateId });

    if (!interest) {
      return res.status(404).json({ message: 'Interest not found. Please express interest first.' });
    }

    if (interest.status === 'interested') {
      interest.status = 'cv_requested';
      await interest.save();
    }

    res.json(interest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Track candidate view
// @route   POST /api/recruiter/activity/view
// @access  Private/Recruiter
const trackCandidateView = async (req, res) => {
  try {
    req.recruiter.activity.candidatesViewed += 1;
    await req.recruiter.save();
    res.json({ success: true, activity: req.recruiter.activity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerRecruiter,
  loginRecruiter,
  getCandidates,
  getShortlists,
  createShortlist,
  addToShortlist,
  removeFromShortlist,
  toggleSaveCandidate,
  getInterests,
  expressInterest,
  requestCV,
  trackCandidateView
};


