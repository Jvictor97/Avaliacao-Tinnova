const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.get('/', vehicleController.get);
router.get('/find', vehicleController.find);
router.get('/:id', vehicleController.getById);
router.post('/', vehicleController.add);
router.put('/:id', vehicleController.update);
router.patch('/:id', vehicleController.patch);
router.delete('/:id', vehicleController.remove);

module.exports = router;
