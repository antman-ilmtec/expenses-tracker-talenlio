const express = require('express');
const router = express.Router();
const { getSummary, getMonthlyReports } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

router.get('/summary', protect, getSummary);
router.get('/monthly', protect, getMonthlyReports);

module.exports = router;
