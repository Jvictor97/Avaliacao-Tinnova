import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function NavBarItems() {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();

	return (
		<>
			<ListItem
				button
				onClick={() => location.pathname !== '/dashboard' && history.push('/dashboard')}
				style={{ backgroundColor: location.pathname === '/dashboard' ? '#DDD' : '#FFF' }}>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
			</ListItem>
			<ListItem
				button
				onClick={() => location.pathname !== '/vehicles' && history.push('vehicles')}
				style={{ backgroundColor: location.pathname === '/vehicles' ? '#DDD' : '#FFF' }}>
				<ListItemIcon>
					<DirectionsCarIcon />
				</ListItemIcon>
				<ListItemText primary="Veículos" />
			</ListItem>
		</>
	);
}
