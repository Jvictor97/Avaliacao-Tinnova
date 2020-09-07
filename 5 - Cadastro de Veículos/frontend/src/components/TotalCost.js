import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		verticalAlign: 'center',
		textAlign: 'center',
	},
});

export default function TotalCost({ cost, staff }) {
	const classes = useStyles();
	const perMemberCost = cost / staff;

	const formattedCost = cost.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
	const perMemberFormattedCost = perMemberCost.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

	return (
		<div className={classes.container}>
			<div style={{ marginBottom: 40 }}>
				<Typography component="h2" variant="h6" color="primary" gutterBottom>
					Custo do mês
				</Typography>
				<Typography component="p" variant="h4">
					{formattedCost}
				</Typography>
			</div>
			<Divider style={{ width: '100%', marginBottom: 40 }} />
			<div>
				<Typography component="h2" variant="h6" color="primary" gutterBottom>
					Custo médio por funcionário
				</Typography>
				<Typography component="p" variant="h4">
					{perMemberFormattedCost}
				</Typography>
			</div>
		</div>
	);
}
