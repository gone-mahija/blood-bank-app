const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String
    },
    availability: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Donor', DonorSchema);