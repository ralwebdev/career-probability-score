const Webinar = require('../models/Webinar');

// @desc    Get all webinars
// @route   GET /api/webinars
// @access  Public
const getWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find({}).sort({ createdAt: -1 });
    res.json(webinars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a webinar
// @route   POST /api/webinars
// @access  Private/Admin
const createWebinar = async (req, res) => {
  const { title, speaker, date, time, registrationLink } = req.body;

  try {
    const webinar = new Webinar({
      title,
      speaker,
      date,
      time,
      registrationLink,
    });

    const createdWebinar = await webinar.save();
    res.status(201).json(createdWebinar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a webinar
// @route   DELETE /api/webinars/:id
// @access  Private/Admin
const deleteWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id);

    if (webinar) {
      await Webinar.deleteOne({ _id: req.params.id });
      res.json({ message: 'Webinar removed' });
    } else {
      res.status(404).json({ message: 'Webinar not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWebinars,
  createWebinar,
  deleteWebinar,
};
