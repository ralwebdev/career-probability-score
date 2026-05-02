const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/recruiterController');
const { protectRecruiter } = require('../utils/authMiddleware');

// Public routes
router.post('/register', registerRecruiter);
router.post('/login', loginRecruiter);

// Protected routes
router.use(protectRecruiter);

router.get('/candidates', getCandidates);

// Shortlists
router.route('/shortlists')
  .get(getShortlists)
  .post(createShortlist);

router.post('/shortlists/:id/add', addToShortlist);
router.delete('/shortlists/:id/remove/:candidateId', removeFromShortlist);

// Saved Candidates
router.post('/saved/:candidateId', toggleSaveCandidate);

// Interests
router.route('/interests')
  .get(getInterests)
  .post(expressInterest);

router.post('/interests/cv', requestCV);

// Activity Tracking
router.post('/activity/view', trackCandidateView);

module.exports = router;
