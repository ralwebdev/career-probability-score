const Counseling = require('../models/Counseling');

// @desc    Submit counseling form
// @route   POST /api/counseling
// @access  Public
const submitCounseling = async (req, res) => {
    try {
        const counselingData = new Counseling(req.body);
        const savedCounseling = await counselingData.save();
        res.status(201).json({
            success: true,
            message: 'Counseling request submitted successfully',
            data: savedCounseling
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get all counseling requests
// @route   GET /api/counseling
// @access  Private (Admin)
const getCounselingRequests = async (req, res) => {
    try {
        const counselingRequests = await Counseling.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: counselingRequests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    submitCounseling,
    getCounselingRequests
};
