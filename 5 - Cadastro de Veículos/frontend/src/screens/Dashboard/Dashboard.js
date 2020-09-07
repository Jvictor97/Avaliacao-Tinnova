import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import LeftDrawer from 'components/LeftDrawer';
import Chart from 'components/Chart';
import TotalCost from 'components/TotalCost';
// import Orders from './Orders';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="http://www.tinnova.com.br/">
				Tinnova
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 400,
	},
}));

export default function Dashboard({ fetchData, cost, staff }) {
	const location = useLocation();
	const classes = useStyles();

	useEffect(() => {
		fetchData();
	}, [location, fetchData]);

	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<LeftDrawer title="Dashboard" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						{/* Chart */}
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={fixedHeightPaper}>
								<Chart />
							</Paper>
						</Grid>
						{/* Total Cost */}
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>
								<TotalCost cost={cost} staff={staff} />
							</Paper>
						</Grid>
					</Grid>
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	);
}
