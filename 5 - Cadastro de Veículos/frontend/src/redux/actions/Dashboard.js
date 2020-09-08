import { dashboard } from '../actionTypes';

export const updateData = (key, value) => ({
	type: dashboard.EDIT_DATA,
	data: { key, value },
});

export const resetData = () => ({
	type: dashboard.RESET_DATA,
});

export const getData = () => async (dispatch, getState, api) => {
	try {
		const soldResponse = await api.get('/find?q=sold');
		const lastWeekResponse = await api.get('/find?q=lastWeek');
		const decadeResponse = await api.get('/find?q=decadeDistribution');
		const manufacturerResponse = await api.get('/find?q=manufacturerDistribution');

		dispatch(updateData('sold', soldResponse.data));
		dispatch(updateData('lastWeek', lastWeekResponse.data));
		dispatch(updateData('decadeDistribution', decadeResponse.data));
		dispatch(updateData('manufacturerDistribution', manufacturerResponse.data));
	} catch (error) {
		return error.response;
	}
};
