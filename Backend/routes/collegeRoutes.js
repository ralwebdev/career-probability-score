const express = require('express');
const router = express.Router();
const { loginCollegeUser, getStudents, getPublicColleges, getPublicCollegeByCid, changePassword, protect } = require('../controllers/collegeController');

router.post('/login', loginCollegeUser);
router.get('/students', protect, getStudents);
router.get('/public', getPublicColleges);
router.get('/public/:cid', getPublicCollegeByCid);
router.post('/change-password', protect, changePassword);

module.exports = router;
