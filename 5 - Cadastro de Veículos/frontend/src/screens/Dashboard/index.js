import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { getData } from 'redux/actions/Dashboard';

const mapStateToProps = ({ dashboard }) => ({
	staff: dashboard.staff,
	cost: dashboard.cost,
});

const mapDispatchToProps = (dispatch) => ({
	fetchData: () => dispatch(getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
