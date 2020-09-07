import axios from 'axios';
import config from './config';

const api = axios.create({
	baseURL: config.BASE_URL,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
	async (config) => {
		console.log('-> Request: ', config);
		return config;
	},
	(error) => {
		return Promise.reject(error.response);
	}
);

api.interceptors.response.use(
	(response) => {
		console.log('-> Response: ', response.data);
		return response;
	},
	(error) => {
		console.log('-> Error', error.response);
		throw error;
	}
);

export default api;
