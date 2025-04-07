const express = require('express');
const { getBloodStock, addBloodStock, updateBloodStock } = require('../controllers/bloodStockController');
const router = express.Router();


//GET
router.get('/', getBloodStock);

//POST
router.post('/', addBloodStock);

//UPDATE
router.put('/:id', updateBloodStock);

module.exports = router;