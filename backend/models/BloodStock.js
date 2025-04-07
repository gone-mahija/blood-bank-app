const mongoose = require('mongoose');

const BloodStockSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('BloodStock', BloodStockSchema);