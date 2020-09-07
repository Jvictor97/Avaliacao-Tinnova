import { vehicle } from '../actionTypes';

const initialState = {
	vehicles: {
		veiculo: '',
		marca: '',
		ano: null,
		descricao: '',
		vendido: false,
	},
	list: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case vehicle.EDIT_DATA:
			return { ...state, [action.data.key]: action.data.value };
		case vehicle.RESET_DATA:
			return initialState;
		default:
			return state;
	}
};
