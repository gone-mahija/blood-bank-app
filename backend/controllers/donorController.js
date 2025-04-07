const Donor = require('../models/Donor');

//Get all donors
const getDonors = async (req, res) => {
    try {
        const donors = await Donor.find();
        res.json(donors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Add a new donor
const addDonor = async (req, res) => {
    const { name, bloodType, contact, location, availability } = req.body;
    try {
        const newDonor = new Donor({ name, bloodType, contact, location, availability });
        await newDonor.save();
        res.status(201).json({ newDonor })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//Delete a donor by ID
const deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findByIdAndDelete(req.params.id);
        if (!donor) {
            return res.status(400).json({ message: 'Donor not found' });
        }
        res.json({ message: 'Donor deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getDonors, addDonor, deleteDonor };