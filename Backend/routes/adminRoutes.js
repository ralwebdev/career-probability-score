const express = require('express');
const router = express.Router();
const { loginAdmin, verifyAdmin } = require('../controllers/adminController');

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post('/login', loginAdmin);

// @desc    Verify token
// @route   GET /api/admin/verify
// @access  Private
router.get('/verify', verifyAdmin);

module.exports = router;
