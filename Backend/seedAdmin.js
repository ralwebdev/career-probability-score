const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    await Admin.deleteMany({ username: process.env.ADMIN_USERNAME });
    console.log('Admin user deleted successfully');
    const admin = new Admin({
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    });

    await admin.save();

    console.log('Admin user seeded successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
