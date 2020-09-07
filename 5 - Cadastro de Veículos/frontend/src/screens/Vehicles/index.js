import { connect } from 'react-redux';
import { getAll, insert, update, patch, remove, updateVehicle } from 'redux/actions/Vehicle';
import Vehicles from './Vehicles';

const mapStateToProps = ({ vehicle }) => ({
	list: vehicle.list,
});

const mapDispatchToProps = (dispatch) => {
	return {
		updateVehicle: (key, value) => dispatch(updateVehicle(key, value)),
		getAll: () => dispatch(getAll()),
		insert: () => dispatch(insert()),
		update: () => dispatch(update()),
		patch: () => dispatch(patch()),
		remove: (id) => dispatch(remove(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Vehicles);
