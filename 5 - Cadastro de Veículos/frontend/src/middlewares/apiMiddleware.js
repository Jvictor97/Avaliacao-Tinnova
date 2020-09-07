import api from 'config/api';

const apiMiddleware = ({ getState, dispatch }) => (next) => (action) => {
	if (typeof action === 'function') {
		return action(dispatch, getState, api);
	}

	return next(action);
};

export default apiMiddleware;
