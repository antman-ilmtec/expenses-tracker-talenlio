const Expense = require('../models/Expense');
const Category = require('../models/Category');

// @desc    Get dashboard summary (Current Month)
// @route   GET /api/reports/summary
// @access  Private
const getSummary = async (req, res) => {
    // Current month summary
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    try {
        const expenses = await Expense.find({
            userId: req.user.id,
            date: { $gte: startOfMonth }
        });

        const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

        const categoryStats = await Expense.aggregate([
            {
                $match: {
                    userId: req.user._id,
                    date: { $gte: startOfMonth }
                }
            },
            {
                $group: {
                    _id: '$categoryId',
                    total: { $sum: '$amount' }
                }
            }
        ]);

        const categories = await Category.find({ userId: req.user.id });
        const categoryMap = {};
        categories.forEach(cat => categoryMap[cat._id.toString()] = cat);

        const summaryByCategory = categoryStats.map(stat => ({
            category: categoryMap[stat._id.toString()] || { name: 'Uncategorized' },
            total: stat.total
        }));

        res.json({
            totalExpenses: total,
            categoryBreakdown: summaryByCategory
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get monthly reports (Last 12 months)
// @route   GET /api/reports/monthly
// @access  Private
const getMonthlyReports = async (req, res) => {
    try {
        const stats = await Expense.aggregate([
            { $match: { userId: req.user._id } },
            {
                $group: {
                    _id: {
                        month: { $month: '$date' },
                        year: { $year: '$date' }
                    },
                    total: { $sum: '$amount' }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSummary, getMonthlyReports };
