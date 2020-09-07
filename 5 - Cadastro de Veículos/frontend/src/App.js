import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from 'screens/Dashboard';
import Vehicles from 'screens/Vehicles';

function App() {
	return (
		<Switch>
			<Route exact path="/">
				<Redirect to="/dashboard" />
			</Route>
			<Route path="/dashboard">
				<Dashboard />
			</Route>
			<Route path="/vehicles">
				<Vehicles />
			</Route>
			<Route path="*">
				<h2>404</h2>
			</Route>
		</Switch>
	);
}

export default App;
