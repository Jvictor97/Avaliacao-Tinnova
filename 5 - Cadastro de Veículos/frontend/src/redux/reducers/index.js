import { combineReducers } from 'redux';
import vehicle from './Vehicle';
import dashboard from './Dashboard';
import config from './Config';

export default combineReducers({
	vehicle,
	dashboard,
	config,
});
