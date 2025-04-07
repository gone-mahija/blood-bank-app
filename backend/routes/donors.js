const express = require('express');
const router = express.Router();
const { getDonors, addDonor, deleteDonor } = require('../controllers/donorController');

//Get
router.get('/', getDonors);

//POST
router.post('/', addDonor);

//DELETE
router.delete('/:id', deleteDonor);

module.exports = router;