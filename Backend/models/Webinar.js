const mongoose = require('mongoose');

const webinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  speaker: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  registrationLink: {
    type: String,
    default: '#',
  },
}, {
  timestamps: true,
});

const Webinar = mongoose.model('Webinar', webinarSchema);

module.exports = Webinar;
