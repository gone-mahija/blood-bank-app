const BloodStock = require('../models/BloodStock');

//GET
const getBloodStock = async (req, res) => {
    try {
        const stock = await BloodStock.find();
        res.json(stock);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

//POST
const addBloodStock = async (req, res) => {
    const { bloodType, quantity } = req.body;
    try {
        const newStock = new BloodStock({ bloodType, quantity });
        await newStock.save();
        res.status(201).json(newStock);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//DELETE
const updateBloodStock = async (req, res) => {
    try {
        const updatedStock = await BloodStock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStock) {
            return res.status(404).json({ message: 'Blood stock not found' });
        }
        res.json(updatedStock);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getBloodStock, addBloodStock, updateBloodStock };