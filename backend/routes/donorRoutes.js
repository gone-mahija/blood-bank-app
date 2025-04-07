const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// Get all donors
router.get('/', async (req, res) => {
    try {
        const donors = await Donor.find().sort({ createdAt: -1 }); // latest first
        res.json(donors);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch donors' });
    }
});

module.exports = router;
