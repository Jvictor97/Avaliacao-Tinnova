const Vehicle = require('../models/Vehicle');
const { ObjectId } = require('mongoose').Types;
const axios = require('axios');

exports.get = async () => {
	return await Vehicle.find();
};

async function getDecadeDistribution() {
	const vehicles = await Vehicle.find();
	const years = vehicles.map((vehicle) => vehicle.ano).sort();

	const distribution = years.reduce((distribution, year) => {
		const decade = year - (year % 10);

		if (!distribution[decade]) distribution[decade] = 0;

		distribution[decade]++;
		return distribution;
	}, {});

	return distribution;
}

async function getManufacturerDistribution() {
	const vehicles = await Vehicle.find();
	const manufacturers = vehicles.map((vehicle) => vehicle.marca).sort();

	const distribution = manufacturers.reduce((distribution, brand) => {
		if (!distribution[brand]) distribution[brand] = 0;

		distribution[brand]++;
		return distribution;
	}, {});

	return distribution;
}

async function getFromLastWeek() {
	const date = new Date();
	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() - 7);

	return await Vehicle.find({ created: { $gte: date } });
}

exports.find = async (query) => {
	switch (query) {
		case 'sold':
			return await Vehicle.find({ vendido: true });
		case 'decadeDistribution':
			return await getDecadeDistribution();
		case 'manufacturerDistribution':
			return await getManufacturerDistribution();
		case 'lastWeek':
			return await getFromLastWeek();
		default:
			throw new Error('Parâmetro não reconhecido');
	}
};
exports.getById = async (id) => {
	return await Vehicle.findById(id);
};

/**
 * Validates if brand exists in FIPE table
 * @param {string} brand - The brand which will be validated
 * @throws Will throw and error if received brand is invalid
 */
async function validateBrand(brand) {
	const fipeUri = 'https://fipeapi.appspot.com/api/1/carros/marcas.json';

	const response = await axios.get(fipeUri);
	const brands = response.data;

	const brandExists = brands.find((item) => item.name === brand.toUpperCase());

	if (!brandExists) throw new Error('A marca informada é inválida');
}

async function validateRequiredData(vehicle) {
	const { veiculo, marca, ano, descricao, vendido } = vehicle;

	if (!veiculo) throw new Error('Informe o veículo');
	if (!marca) throw new Error('Informe a marca');
	await validateBrand(marca);
	if (!ano) throw new Error('Informe o ano');

	const anoAtual = new Date().getFullYear();
	if (ano < 1700 || ano > new Date().getFullYear())
		throw new Error(`Ano inválido, o valor deve estar entre 1700 e ${anoAtual}`);

	if (!descricao) throw new Error('Informe a descrição');
	if (vendido === undefined || vendido === null) throw new Error('Informe se o veículo foi vendido');
}

exports.add = async (vehicle) => {
	await validateRequiredData(vehicle);
	return await Vehicle.create(vehicle);
};
exports.update = async (id, vehicle) => {
	await validateRequiredData(vehicle);
	if (!ObjectId.isValid(id)) throw new Error('Id do veículo inválido');

	const document = await Vehicle.findOneAndUpdate({ _id: ObjectId(id) }, vehicle, { new: true });

	if (!document) throw new Error('Veículo não encontrado');
	return document;
};
exports.patch = async (id, attributes) => {
	const { veiculo, marca, ano, descricao, vendido } = attributes;

	if (!veiculo && !marca && !ano && !descricao && (vendido === undefined || vendido === null))
		throw new Error('Nenhum parâmetro foi informado');

	if (!ObjectId.isValid(id)) throw new Error('Id do veículo inválido');
	if (marca) await validateBrand(marca);

	const document = await Vehicle.findOneAndUpdate({ _id: ObjectId(id) }, { $set: attributes }, { new: true });

	if (!document) throw new Error('Veículo não encontrado');
	return document;
};
exports.remove = async (id) => {
	if (!ObjectId.isValid(id)) throw new Error('Id do veículo inválido');

	const document = await Vehicle.findOneAndDelete({ _id: ObjectId(id) });
	if (!document) throw new Error('Veículo não encontrado');
};
