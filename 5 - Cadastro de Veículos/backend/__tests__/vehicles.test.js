const { connect, clearDatabase, closeDatabase } = require('./utils/dbHandler');
const request = require('supertest');
const app = require('../src/app');
// const vehicleFactory = require('./utils/vehicleFactory');
const Vehicle = require('../src/models/Vehicle');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

function vehicleFactory() {
	return {
		veiculo: 'Fiesta',
		marca: 'FORD',
		ano: 2010,
		descricao: 'Carro seminovo',
		vendido: false,
	};
}

describe('Vehicles', () => {
	it('creates a vehicle', async () => {
		const vehicle = vehicleFactory();

		const response = await request(app).post('/veiculos').send(vehicle);
		expect(response.status).toBe(201);
	});

	it('finds a vehicle by its id', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const { _id } = document;
		const response = await request(app).get(`/veiculos/${_id}`);

		expect(response.status).toBe(200);
	});

	it('updates a vehicle', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const { _id } = document;

		const newVehicle = {
			veiculo: 'Ka',
			marca: 'Ford',
			ano: 2000,
			descricao: 'Carro seminovo',
			vendido: false,
		};
		const response = await request(app).put(`/veiculos/${_id}`).send(newVehicle);
		expect(response.status).toBe(200);
	});

	it('patches a vehicle', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const { _id } = document;

		const patch = {
			descricao: 'Veículo Novo',
			ano: 2020,
		};

		const response = await request(app).patch(`/veiculos/${_id}`).send(patch);
		expect(response.status).toBe(200);
	});

	it('deletes a vehicle', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const { _id } = document;

		const response = await request(app).delete(`/veiculos/${_id}`);
		expect(response.status).toBe(200);
	});

	it('should not allow invalid brands', async () => {
		const vehicle = vehicleFactory();
		vehicle.marca = 'Abcd';

		const response = await request(app).post('/veiculos').send(vehicle);
		expect(response.status).toBe(409);
	});

	it('should not insert without vehicle attribute', async () => {
		const vehicle = vehicleFactory();
		vehicle.veiculo = '';

		const response = await request(app).post('/veiculos').send(vehicle);
		expect(response.status).toBe(409);
	});

	it('should not insert without brand attribute', async () => {
		const vehicle = vehicleFactory();
		vehicle.marca = '';

		const response = await request(app).post('/veiculos').send(vehicle);
		expect(response.status).toBe(409);
	});

	it('should not insert without year attribute', async () => {
		const vehicle = vehicleFactory();
		vehicle.ano = null;

		const response = await request(app).post('/veiculos').send(vehicle);
		expect(response.status).toBe(409);
	});

	it('should not insert with invalid year', async () => {
		const vehicle = vehicleFactory();
		vehicle.ano = 1500;

		const response = await request(app).post('/veiculos').send(vehicle);
		expect(response.status).toBe(409);
	});

	it('should not insert without a description', async () => {
		const vehicle = vehicleFactory();
		vehicle.descricao = '';

		const response = await request(app).post('/veiculos').send(vehicle);
		expect(response.status).toBe(409);
	});

	it('should not insert without sold flag', async () => {
		const vehicle = vehicleFactory();
		vehicle.vendido = null;

		const response = await request(app).post('/veiculos').send(vehicle);
		expect(response.status).toBe(409);
	});

	it('should not update with invalid id', async () => {
		const newVehicle = {
			veiculo: 'Ka',
			marca: 'Ford',
			ano: 2000,
			descricao: 'Carro seminovo',
			vendido: false,
		};
		const response = await request(app).put(`/veiculos/abcd`).send(newVehicle);
		expect(response.status).toBe(404);
	});

	it('should not update if document is not found', async () => {
		const newVehicle = {
			veiculo: 'Ka',
			marca: 'Ford',
			ano: 2000,
			descricao: 'Carro seminovo',
			vendido: false,
		};
		const response = await request(app).put(`/veiculos/5f56755b1c33b420fc9789f8`).send(newVehicle);
		expect(response.status).toBe(404);
	});

	it('should not patch if no parameter was sent', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const { _id } = document;

		const newVehicle = {
			veiculo: '',
			marca: '',
			ano: null,
			descricao: '',
			vendido: null,
		};

		const response = await request(app).put(`/veiculos/${_id}`).send(newVehicle);
		expect(response.status).toBe(404);
	});

	it('returns all vehicles', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const response = await request(app).get('/veiculos');

		expect(response.status).toBe(200);
	});

	it('returns distribution by manufacturer', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const response = await request(app).get('/veiculos/find?q=manufacturerDistribution');

		expect(response.status).toBe(200);
	});

	it('returns distribution by decade', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const response = await request(app).get('/veiculos/find?q=decadeDistribution');

		expect(response.status).toBe(200);
	});

	it('returns last week vehicles', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const response = await request(app).get('/veiculos/find?q=lastWeek');

		expect(response.status).toBe(200);
	});

	it('returns sold vehicles', async () => {
		const vehicle = vehicleFactory();
		const document = await Vehicle.create(vehicle);
		const response = await request(app).get('/veiculos/find?q=sold');

		expect(response.status).toBe(200);
	});

	it('should return an error if find parameter is unknown', async () => {
		const response = await request(app).get('/veiculos/find?q=abc');

		expect(response.status).toBe(404);
	});
});
