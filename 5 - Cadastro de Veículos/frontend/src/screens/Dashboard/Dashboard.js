import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LeftDrawer from 'components/LeftDrawer';
import MaterialTable from 'material-table';

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

const localization = {
	body: {
		emptyDataSourceMessage: 'Nenhum registro para exibir',
		editTooltip: 'Editar',
		deleteTooltip: 'Remover',
		addTooltip: 'Novo',
		editRow: {
			saveTooltip: 'Confirmar',
			cancelTooltip: 'Cancelar',
			deleteText: 'Tem certeza que deseja remover esse registro?',
		},
	},
	header: {
		actions: 'Opções',
	},
	toolbar: {
		searchTooltip: 'Pesquisar',
		searchPlaceholder: 'Pesquisar',
	},
	pagination: {
		labelRowsSelect: 'linhas',
		labelDisplayedRows: '{count} de {from}-{to}',
		firstTooltip: 'Primeira página',
		previousTooltip: 'Página anterior',
		nextTooltip: 'Próxima página',
		lastTooltip: 'Última página',
	},
};

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

export default function Dashboard({ fetchData, sold, lastWeek, decadeDistribution, manufacturerDistribution }) {
	const location = useLocation();
	const classes = useStyles();

	useEffect(() => {
		fetchData();
	}, [location, fetchData]);

	const decadeEntries = Object.entries(decadeDistribution);
	const decadeList = decadeEntries.map(([ano, quantidade]) => ({ ano, quantidade }));

	const manufacturerEntries = Object.entries(manufacturerDistribution);
	const manufacturerList = manufacturerEntries.map(([fabricante, quantidade]) => ({ fabricante, quantidade }));

	const options = {
		minBodyHeight: 250,
		maxBodyHeight: 250,
		pageSize: 3,
		pageSizeOptions: [3, 5, 10, 20],
	};

	const soldColumns = [
		{ title: 'Veículo', field: 'veiculo' },
		{ title: 'Marca', field: 'marca' },
		{ title: 'Ano', field: 'ano', type: 'numeric' },
		{ title: 'Descrição', field: 'descricao' },
	];

	const lastWeekColumns = [
		{ title: 'Veículo', field: 'veiculo' },
		{ title: 'Marca', field: 'marca' },
		{ title: 'Ano', field: 'ano', type: 'numeric' },
		{ title: 'Descrição', field: 'descricao' },
	];

	const decadeColumns = [
		{ title: 'Ano', field: 'ano' },
		{ title: 'Quantidade', field: 'quantidade' },
	];

	const manufacturerColumns = [
		{ title: 'Fabricante', field: 'fabricante' },
		{ title: 'Quantidade', field: 'quantidade' },
	];

	return (
		<div className={classes.root}>
			<CssBaseline />
			<LeftDrawer title="Dashboard" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="xl" className={classes.container}>
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<MaterialTable
								columns={soldColumns}
								style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}
								options={options}
								isLoading={!sold.length}
								data={sold}
								title="Veículos vendidos"
								localization={localization}
							/>
							<MaterialTable
								columns={lastWeekColumns}
								style={{ paddingLeft: 20, paddingRight: 20 }}
								options={options}
								data={lastWeek}
								isLoading={!lastWeek.length}
								title="Cadastrados na última semana"
								localization={localization}
							/>
						</Grid>
						<Grid item xs={6}>
							<MaterialTable
								columns={decadeColumns}
								style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}
								options={options}
								data={decadeList}
								isLoading={!decadeList.length}
								title="Distribuição por Década"
								localization={localization}
							/>
							<MaterialTable
								columns={manufacturerColumns}
								style={{ paddingLeft: 20, paddingRight: 20 }}
								options={options}
								data={manufacturerList}
								isLoading={!manufacturerList.length}
								title="Distribuição por Fabricante"
								localization={localization}
							/>
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
