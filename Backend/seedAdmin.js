const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

dotenv.config();

connectDB();

const seedAdmin = async () => {
  try {
    await Admin.deleteMany({ username: 'admin' });

    const admin = new Admin({
      username: 'admin',
      password: 'Ral@12345',
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
