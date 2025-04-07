const BloodRequest = require('../models/BloodRequest');

// GET all blood requests (admin view)
const getRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find().sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// POST a new blood request
const addRequest = async (req, res) => {
    const { name, bloodGroup, unitsRequired, hospital, contact } = req.body;

    try {
        const newRequest = new BloodRequest({
            name,
            bloodGroup,
            unitsRequired,
            hospital,
            contact,
        });

        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(400).json({ error: 'Invalid data' });
    }
};

// PUT - update status (admin approval)
const updateRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const request = await BloodRequest.findById(id);
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        request.status = status;
        await request.save();

        res.json({ message: 'Status updated', request });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getRequests,
    addRequest,
    updateRequestStatus,
};
