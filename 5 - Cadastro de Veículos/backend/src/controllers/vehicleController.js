const vehicleService = require('../services/vehicleService');

exports.get = async (req, res) => {
	try {
		const vehicles = await vehicleService.get();
		return res.send(vehicles);
	} catch (error) {
		return res.status(400).send({ message: error.message });
	}
};
exports.find = async (req, res) => {};
exports.getById = async (req, res) => {};
exports.add = async (req, res) => {};
exports.update = async (req, res) => {};
exports.patch = async (req, res) => {};
exports.remove = async (req, res) => {};
