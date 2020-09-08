import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { getData } from 'redux/actions/Dashboard';

const mapStateToProps = ({ dashboard }) => ({
	sold: dashboard.sold,
	lastWeek: dashboard.lastWeek,
	manufacturerDistribution: dashboard.manufacturerDistribution,
	decadeDistribution: dashboard.decadeDistribution,
});

const mapDispatchToProps = (dispatch) => ({
	fetchData: () => dispatch(getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
