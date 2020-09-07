const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routers');

app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});
app.use('/', router);

module.exports = app;
