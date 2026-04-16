const express = require('express');
const router = express.Router();
const { loginAdmin, verifyAdmin, createCollege, getColleges, updateCollege, deleteCollege } = require('../controllers/adminController');
const { getDuplicateAssessments } = require('../controllers/assessmentController');
const { protectAdmin } = require('../utils/authMiddleware');

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post('/login', loginAdmin);

// @desc    Verify token
// @route   GET /api/admin/verify
// @access  Private
router.get('/verify', verifyAdmin);

// College management
router.route('/colleges')
  .post(protectAdmin, createCollege)
  .get(protectAdmin, getColleges);

router.route('/colleges/:id')
  .put(protectAdmin, updateCollege)
  .delete(protectAdmin, deleteCollege);

router.get('/assessments/duplicates', protectAdmin, getDuplicateAssessments);

module.exports = router;
