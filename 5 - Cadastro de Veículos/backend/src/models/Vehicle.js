const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
	veiculo: {
		type: String,
		required: true,
	},
	marca: {
		type: String,
		required: true,
	},
	ano: {
		type: Number,
		required: true,
	},
	descricao: {
		type: String,
		required: true,
	},
	vendido: {
		type: Boolean,
		required: true,
	},
	created: {
		type: Date,
		required: true,
		default: Date.now,
	},
	updated: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('Veiculos', VehicleSchema);
