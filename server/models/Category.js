const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    budget: { type: Number, default: 0 } // Monthly budget
});

module.exports = mongoose.model('Category', categorySchema);
