const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema(
	{
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
	},
	{
		timestamps: {
			createdAt: 'created',
			updatedAt: 'updated',
		},
	}
);

module.exports = mongoose.model('Veiculos', VehicleSchema);
