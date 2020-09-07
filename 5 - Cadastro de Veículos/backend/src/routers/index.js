const express = require('express');
const router = express.Router();
const vehicleRouter = require('./vehicleRouter');

router.use('/veiculos', vehicleRouter);

module.exports = router;
