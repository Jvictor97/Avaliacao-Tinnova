const vehicleService = require('../services/vehicleService');

exports.get = async (req, res) => {
	try {
		const vehicles = await vehicleService.get();
		return res.send(vehicles);
	} catch (error) {
		return res.status(400).send({ message: error.message, error: true });
	}
};
exports.find = async (req, res) => {
	try {
		const { q } = req.query;
		const vehicles = await vehicleService.find(q);
		return res.send(vehicles);
	} catch (error) {
		return res.status(404).send({ message: error.message, error: true });
	}
};
exports.getById = async (req, res) => {
	try {
		const { id } = req.params;
		const vehicles = await vehicleService.getById(id);
		return res.send(vehicles);
	} catch (error) {
		return res.status(404).send({ message: error.message, error: true });
	}
};
exports.add = async (req, res) => {
	try {
		const vehicle = req.body;
		const document = await vehicleService.add(vehicle);
		return res.status(201).send({ message: 'Veículo criado com sucesso', vehicle: document });
	} catch (error) {
		return res.status(409).send({ message: error.message, error: true });
	}
};
exports.update = async (req, res) => {
	try {
		const { id } = req.params;
		const vehicle = req.body;
		const document = await vehicleService.update(id, vehicle);

		return res.status(200).send({ message: 'Veículo atualizado com sucesso', vehicle: document });
	} catch (error) {
		return res.status(404).send({ message: error.message, error: true });
	}
};
exports.patch = async (req, res) => {
	try {
		const { id } = req.params;
		const attributes = req.body;
		const document = await vehicleService.patch(id, attributes);

		return res.status(200).send({ message: 'Veículo atualizado com sucesso', vehicle: document });
	} catch (error) {
		return res.status(404).send({ message: error.message, error: true });
	}
};
exports.remove = async (req, res) => {
	try {
		const { id } = req.params;
		await vehicleService.remove(id);
		return res.status(200).send({ message: 'Veículo removido com sucesso' });
	} catch (error) {
		return res.status(404).send({ message: error.message, error: true });
	}
};
