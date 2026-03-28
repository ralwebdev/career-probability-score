const express = require('express');
const router = express.Router();
const { getWebinars, createWebinar, deleteWebinar } = require('../controllers/webinarController');
const { protectAdmin } = require('../utils/authMiddleware');

router.route('/')
  .get(getWebinars)
  .post(protectAdmin, createWebinar);

router.route('/:id')
  .delete(protectAdmin, deleteWebinar);

module.exports = router;
