const Vehicle = require('../models/Vehicle');

exports.get = async () => {
	return await Vehicle.find();
};
exports.find = async (id) => {};
exports.getById = async (req, res) => {};
exports.add = async (req, res) => {};
exports.update = async (req, res) => {};
exports.patch = async (req, res) => {};
exports.remove = async (req, res) => {};
