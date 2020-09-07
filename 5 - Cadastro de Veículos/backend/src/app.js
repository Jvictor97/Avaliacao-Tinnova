require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routers');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const { connection } = mongoose;

connection.on('open', () => {
	console.log('Connected to MongoDB');
});

connection.on('error', () => {
	console.error('Connection Error');
});

app.use('/', router);

const port = process.env.PORT || '3333';

app.listen(port, function () {
	console.log(`App listening on port ${port}`);
});
