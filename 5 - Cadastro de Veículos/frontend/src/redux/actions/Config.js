import { config } from '../actionTypes';

export const editConfig = (key, value) => ({
	type: config.EDIT_DATA,
	data: { key, value },
});

export const resetData = () => ({
	type: config.RESET_DATA,
});
