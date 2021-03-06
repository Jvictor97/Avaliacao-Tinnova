import { dashboard } from '../actionTypes';

const initialState = {
	sold: [],
	lastWeek: [],
	decadeDistribution: [],
	manufacturerDistribution: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case dashboard.EDIT_DATA:
			return { ...state, [action.data.key]: action.data.value };
		case dashboard.RESET_DATA:
			return initialState;
		default:
			return state;
	}
};
