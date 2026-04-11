const express = require('express');
const router = express.Router();
const { loginCollegeUser, getStudents, protect } = require('../controllers/collegeController');

router.post('/login', loginCollegeUser);
router.get('/students', protect, getStudents);

module.exports = router;
