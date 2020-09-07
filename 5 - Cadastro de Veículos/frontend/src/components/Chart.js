import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getChartData } from 'redux/actions/Dashboard';

export default function Chart() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const data = useSelector((store) => store.dashboard.chartData);

	useEffect(() => {
		dispatch(getChartData());
	}, [dispatch]);

	return (
		<>
			<Typography component="h2" variant="h6" color="primary" gutterBottom>
				Custo Mensal
			</Typography>
			<ResponsiveContainer>
				<LineChart
					data={data}
					margin={{
						top: 16,
						right: 20,
						bottom: 0,
						left: 24,
					}}>
					<XAxis dataKey="payday" stroke={theme.palette.text.secondary} angle={-30} textAnchor="end" height={60} />
					<YAxis stroke={theme.palette.text.secondary} name="Valor">
						<Label angle={270} position="left" style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}>
							Custo (R$)
						</Label>
					</YAxis>
					<Tooltip
						label="Valor"
						formatter={(value) => [value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }), 'Valor']}
						labelFormatter={(label) => `Dia ${label}`}
						isAnimationActive={false}
					/>
					<Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}
