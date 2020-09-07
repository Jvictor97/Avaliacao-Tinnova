import { dashboard } from '../actionTypes';

export const updateData = (key, value) => ({
	type: dashboard.EDIT_DATA,
	data: { key, value },
});

export const resetData = () => ({
	type: dashboard.RESET_DATA,
});

export const getData = () => async (dispatch, getState, api) => {
	// try {
	// 	const countResponse = await api.get(dashboardEndpoints.count);
	// 	const wageResponse = await api.get(dashboardEndpoints.totalWage);
	// 	const { count } = countResponse.data;
	// 	const { totalWage } = wageResponse.data;
	// 	const avgWorkHours = 21 * 8; // 21 work days per month and 8 work hours per day
	// 	dispatch(updateData('staff', count));
	// 	dispatch(updateData('cost', totalWage * avgWorkHours));
	// } catch (error) {
	// 	return error.response;
	// }
};

export const getChartData = () => async (dispatch, getState, api) => {
	// try {
	// 	const response = await api.get(dashboardEndpoints.cost);
	// 	dispatch(updateData('chartData', response.data));
	// 	return response;
	// } catch (error) {
	// 	return error.response;
	// }
};
