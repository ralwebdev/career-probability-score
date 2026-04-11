const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
};

console.log("Allowed Frontend URL:", process.env.FRONTEND_URL);

app.use(cors(corsOptions));
app.use(express.json()); // Parses incoming JSON requests

// Route imports
const assessmentRoutes = require('./routes/assessmentRoutes');
const leadRoutes = require('./routes/leadRoutes');
const adminRoutes = require('./routes/adminRoutes');
const counselingRoutes = require('./routes/counselingRoutes');
const courseRoutes = require('./routes/courseRoutes');
const webinarRoutes = require('./routes/webinarRoutes');
const collegeRoutes = require('./routes/collegeRoutes');

// Mount routers
app.use('/api/assessments', assessmentRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/counseling', counselingRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/webinars', webinarRoutes);
app.use('/api/college', collegeRoutes);

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));