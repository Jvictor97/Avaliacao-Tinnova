import { vehicle } from '../actionTypes';

export const updateVehicle = (key, value) => ({
	type: vehicle.EDIT_DATA,
	data: { key, value },
});

export const getAll = () => async (dispatch, getState, api) => {
	try {
		const response = await api.get('/');
		const vehicles = response.data;

		dispatch(updateVehicle('list', vehicles));
	} catch (error) {
		return error.response;
	}
};

export const getOne = () => (dispatch, getState, api) => {
	const { vehicle } = getState().vehicle;

	api.get(`/${vehicle.id}`).then((resp) => {});
};

export const insert = () => async (dispatch, getState, api) => {
	const { vehicle } = getState().vehicle;

	try {
		const response = await api.post('/', vehicle);
		return response;
	} catch (error) {
		return error.response;
	}
};

export const update = () => async (dispatch, getState, api) => {
	const { vehicle } = getState().vehicle;
	const { _id } = vehicle;

	try {
		return await api.put(`/${_id}`, vehicle);
	} catch (error) {
		return error.response;
	}
};

export const patch = () => async (dispatch, getState, api) => {
	const { vehicle } = getState().vehicle;
	const { _id } = vehicle;
	try {
		return await api.patch(`/${_id}`, vehicle);
	} catch (error) {
		return error.response;
	}
};

export const remove = (id) => async (dispatch, getState, api) => {
	try {
		return await api.delete(`/${id}`);
	} catch (error) {
		return error.response;
	}
};
