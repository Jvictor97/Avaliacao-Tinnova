require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const { connection } = mongoose;

connection.on('open', () => {
	console.log('Connected to MongoDB');
});

connection.on('error', () => {
	console.error('Connection Error');
});

const port = process.env.PORT || '3333';

app.listen(port, function () {
	console.log(`App listening on port ${port}`);
});
