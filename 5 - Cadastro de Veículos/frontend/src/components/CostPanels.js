import React from 'react';
import { useSelector } from 'react-redux';
import Panel from 'components/Panel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	panelContainer: {
		marginBottom: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
}));

export default function CostPanels() {
	const classes = useStyles();
	const list = useSelector((store) => store.vehicle.list);
	const count = list.length;

	let totalCost = 0;

	list.forEach((person) => {
		totalCost += person.wage * 8 * 21;
	});

	const formattedTotalCost = totalCost.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
	const averageCost = count > 0 ? totalCost / count : 0;
	const formattedAverageCost =
		averageCost > 0 ? averageCost.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0;

	return (
		<Grid container className={classes.panelContainer}>
			<Grid item xs={4}>
				<Panel style={{ marginRight: 10 }} title="Total de Pessoas" value={count} />
			</Grid>
			<Grid item xs={4}>
				<Panel style={{ marginLeft: 5, marginRight: 5 }} title="Custo Total" value={formattedTotalCost} />
			</Grid>
			<Grid item xs={4}>
				<Panel style={{ marginLeft: 10 }} title="Custo Médio por Pessoa" value={formattedAverageCost || 'R$ 0,00'} />
			</Grid>
		</Grid>
	);
}
