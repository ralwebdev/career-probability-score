const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const College = require('../models/College');


// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
      });

      res.json({
        _id: admin._id,
        username: admin.username,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify token
// @route   GET /api/admin/verify
// @access  Private
const verifyAdmin = async (req, res) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

      const admin = await Admin.findById(decoded.id).select('-password');

      if (admin) {
        res.json({ success: true, admin });
      } else {
        res.status(401).json({ success: false, message: 'Not authorized' });
      }
    } catch (error) {
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

// @desc    Create new college
// @route   POST /api/admin/colleges
// @access  Private
const createCollege = async (req, res) => {
  const { name, collegeId, location, email, password } = req.body;

  try {
    const collegeExists = await College.findOne({ 
      $or: [{ collegeId }, { email }] 
    });

    if (collegeExists) {
      const field = collegeExists.collegeId === collegeId ? 'College ID' : 'Email';
      return res.status(400).json({ message: `${field} already exists` });
    }

    const college = await College.create({
      name,
      collegeId,
      location,
      email,
      password,
    });

    res.status(201).json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all colleges
// @route   GET /api/admin/colleges
// @access  Private
const getColleges = async (req, res) => {
  try {
    const colleges = await College.find({}).sort({ createdAt: -1 });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update college
// @route   PUT /api/admin/colleges/:id
// @access  Private
const updateCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    // Check if new email or collegeId is already taken by ANOTHER college
    if (req.body.email && req.body.email !== college.email) {
      const emailExists = await College.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      college.email = req.body.email;
    }

    if (req.body.collegeId && req.body.collegeId !== college.collegeId) {
      const idExists = await College.findOne({ collegeId: req.body.collegeId });
      if (idExists) {
        return res.status(400).json({ message: 'College ID already exists' });
      }
      college.collegeId = req.body.collegeId;
    }

    college.name = req.body.name || college.name;
    college.location = req.body.location || college.location;
    
    if (req.body.password) {
      college.password = req.body.password;
    }

    const updatedCollege = await college.save();
    res.json(updatedCollege);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete college
// @route   DELETE /api/admin/colleges/:id
// @access  Private
const deleteCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    await college.deleteOne();
    res.json({ message: 'College removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginAdmin,
  verifyAdmin,
  createCollege,
  getColleges,
  updateCollege,
  deleteCollege,
};

