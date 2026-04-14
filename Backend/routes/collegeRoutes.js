const express = require('express');
const router = express.Router();
const { loginCollegeUser, getStudents, getPublicCollegeByCid, protect } = require('../controllers/collegeController');

router.post('/login', loginCollegeUser);
router.get('/students', protect, getStudents);
router.get('/public/:cid', getPublicCollegeByCid);

module.exports = router;
