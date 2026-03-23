const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protectAdmin } = require('../utils/authMiddleware');

router.route('/')
  .get(getCourses)
  .post(protectAdmin, createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(protectAdmin, updateCourse)
  .delete(protectAdmin, deleteCourse);

module.exports = router;
