import { config } from '../actionTypes';

const initialState = {
	isDrawerOpen: true,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case config.EDIT_DATA:
			return { ...state, [action.data.key]: action.data.value };
		case config.RESET_DATA:
			return initialState;
		default:
			return state;
	}
};
