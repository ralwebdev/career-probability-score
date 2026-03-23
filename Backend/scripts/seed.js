const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Course = require('../models/Course');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'courses_seed.json'), 'utf-8'));

    // Clear existing courses
    await Course.deleteMany();
    console.log('Existing courses removed.');

    // Insert new courses
    await Course.insertMany(data);
    console.log('Database seeded successfully!');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
