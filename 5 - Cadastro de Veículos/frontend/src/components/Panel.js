import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		verticalAlign: 'center',
		textAlign: 'center',
		marginBottom: 5,
	},
	fixedHeightPaper: {
		flex: 1,
		padding: theme.spacing(0, 2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		justifyContent: 'center',
		height: 120,
	},
}));

export default function Panel({ title, value, style }) {
	const classes = useStyles();

	return (
		<Paper className={classes.fixedHeightPaper} style={style}>
			<div className={classes.container}>
				<Typography component="h2" variant="h6" color="primary" gutterBottom>
					{title}
				</Typography>
				<Typography component="p" variant="h4">
					{value}
				</Typography>
			</div>
		</Paper>
	);
}
