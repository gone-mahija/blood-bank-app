const express = require('express');
const { getRequests, addRequest, updateRequestStatus } = require('../controllers/requestController');
const router = express.Router();

router.get('/', getRequests);
router.post('/', addRequest);
router.put('/:id', updateRequestStatus);

module.exports = router;
