import React, { useEffect, useState } from 'react';
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
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CostPanels from 'components/CostPanels';

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
		height: 360,
	},
}));

export default function Vehicle({ updateVehicle, getAll, list, insert, update, patch, remove }) {
	const location = useLocation();
	const classes = useStyles();
	const [alertMessage, setAlertMessage] = useState('');
	const [isFormValid, setFormValid] = useState(false);

	useEffect(() => {
		getAll();
	}, [location, getAll]);

	const columns = [
		{ field: '_id', hidden: true },
		{ title: 'Veículo', field: 'veiculo' },
		{ title: 'Marca', field: 'marca' },
		{ title: 'Ano', field: 'ano', type: 'numeric' },
		{ title: 'Descrição', field: 'descricao' },
		{ title: 'Vendido?', field: 'vendido', type: 'boolean', initialEditValue: false },
		{ title: 'Criado em', field: 'created', type: 'datetime', editable: 'never' },
		{ title: 'Atualizado em', field: 'updated', type: 'datetime', editable: 'never' },
	];

	const validate = (data) => {
		const { veiculo, marca, ano, descricao, vendido } = data;

		if (!veiculo) throw new Error('Informe o veículo');
		if (!marca) throw new Error('Informe a marca');
		if (!ano) throw new Error('Informe o ano');
		const anoAtual = new Date().getFullYear();
		if (ano < 1700 || ano > new Date().getFullYear())
			throw new Error(`Ano inválido, o valor deve estar entre 1700 e ${anoAtual}`);

		if (!descricao) throw new Error('Informe a descrição');
		if (vendido === undefined || vendido === null) throw new Error('Informe se o veículo foi vendido');
	};

	const onRowAdd = (newData) =>
		new Promise(async (resolve, reject) => {
			const { veiculo, marca, ano, descricao, vendido } = newData;

			try {
				validate(newData);

				let vehicle = {
					veiculo,
					marca,
					ano: parseInt(ano),
					descricao,
					vendido,
				};

				updateVehicle('vehicle', vehicle);
				const response = await insert();

				if (response.status === 201) getAll();
				else throw new Error(response.data.message);
			} catch (error) {
				setFormValid(false);
				setAlertMessage(error.message);
				reject();
				return;
			}

			resolve();
		});

	const onRowUpdate = (newData, oldData) =>
		new Promise(async (resolve, reject) => {
			const { veiculo, marca, ano, descricao, vendido } = newData;
			const keys = ['veiculo', 'marca', 'ano', 'descricao', 'vendido'];

			let differences = 0;
			let data = {};
			for (const key of keys) {
				if (oldData[key] !== newData[key]) {
					differences++;
					data[key] = newData[key];
				}
			}

			let response = null;

			try {
				if (differences === 5) {
					validate(newData);

					let vehicle = {
						_id: oldData._id,
						veiculo,
						marca,
						ano: parseInt(ano),
						descricao,
						vendido,
					};

					updateVehicle('vehicle', vehicle);
					response = await update();
				} else {
					if (data.hasOwnProperty('ano')) data.ano = parseInt(data.ano);
					data._id = oldData._id;
					updateVehicle('vehicle', data);
					response = await patch();
				}

				if (response.status === 200) getAll();
				else throw new Error(response.data.message);
			} catch (error) {
				setFormValid(false);
				setAlertMessage(error.message);
				reject();
				return;
			}

			resolve();
		});

	const onRowDelete = (oldData) =>
		new Promise(async (resolve, reject) => {
			const { _id } = oldData;

			try {
				const response = await remove(_id);

				if (response.status === 200) getAll();
				else throw new Error(response.data.message);
			} catch (error) {
				setFormValid(false);
				setAlertMessage(error.message);
				reject();
				return;
			}

			resolve();
		});

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlertMessage('');
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Snackbar open={alertMessage !== ''} autoHideDuration={3000} onClose={handleClose}>
				<Alert severity={isFormValid ? 'success' : 'error'} variant="filled" onClose={handleClose}>
					{alertMessage}
				</Alert>
			</Snackbar>
			<LeftDrawer title="Cadastro de Veículos" />
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="xl" className={classes.container}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<MaterialTable
								editable={{
									onRowAdd,
									onRowUpdate,
									onRowDelete,
								}}
								columns={columns}
								style={{ paddingLeft: 20, paddingRight: 20 }}
								data={list}
								title="Veículos"
								localization={{
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
								}}
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
