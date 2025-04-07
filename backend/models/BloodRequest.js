const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    unitsRequired: {
        type: Number,
        required: true,
    },
    hospital: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('BloodRequest', BloodRequestSchema);
