const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const collegeUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'faculty'],
    required: true
  },
  department: {
    type: String
  },
  collegeName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

collegeUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

collegeUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const CollegeUser = mongoose.model('CollegeUser', collegeUserSchema);

module.exports = CollegeUser;
