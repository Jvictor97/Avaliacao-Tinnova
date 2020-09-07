const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();

exports.connect = async () => {
	const uri = await mongod.getConnectionString();

	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	};

	await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
exports.closeDatabase = async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
exports.clearDatabase = async () => {
	const collections = mongoose.connection.collections;

	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany();
	}
};
