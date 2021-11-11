import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import _ from 'lodash';

import { DEFINITIONS } from '../constants';
import { ALL_EVENTS } from '../data/events';
import { formatPercentage, formatCurrency } from '../utils';

const storeResults = (results) => {
    const url = 'https://simfinanceiro-default-rtdb.firebaseio.com/results.json';
    const data = {results, datetime: new Date(), device: navigator.appVersion || ''};

    return fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
  };

const EndSimulationSummary = (props) => {
    const walletSum = formatCurrency(
        _.sum(Object.values(props.wallet))
    );
    const walletVariation = formatPercentage(
        ((100 * _.sum(Object.values(props.wallet)) / 10000) - 100) / 100
    );

    useEffect(() => {
        if (!props.resultsSubmitted) {
            storeResults({
                name: props.userName,
                walletSum,
                walletVariation,
                simulationResults: props.world.simulationResults,
                eventsOcurred: props.world.eventsOccurred
            }).then(() => props.submitResultsSuccess())
        }
    }, []);

    return <Grid
        container
        justify="center"
        alignContent="center"
        style={{ height: '100%', padding: '5%'}}
    >
        <Paper style={{ padding: 10, height: '90%' }} className="grid-aligned">
            <Typography variant="title" gutterBottom style={{ padding: 5 }}>
                Você completou a simulação :)
            </Typography>
            <Typography variant="body2">
                Durante o período, esse foi o resultado acumulado do mercado:
            </Typography>
            <Grid item xs={12}>
                <Table aria-label="spanning table">
                    <TableBody>
                        {Object.keys(props.world.simulationResults).map(
                            (key) => (
                                <TableRow key={key} style={{height: 35}}>
                                    <TableCell style={{ padding: 1 }}>
                                        <img
                                            width="30"
                                            alt={DEFINITIONS.world[key].name}
                                            src={DEFINITIONS.world[key].icon}
                                        />
                                    </TableCell>
                                    <TableCell padding='dense'>
                                        {DEFINITIONS.world[key].name}
                                    </TableCell>
                                    <TableCell numeric>
                                        {formatPercentage(
                                            _.sum(
                                                props.world.simulationResults[
                                                    key
                                                ]
                                            )
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </Grid>
            <br/>
            <Typography variant="title" gutterBottom>
                Sobre a sua carteira:
            </Typography>
            <Grid item xs={12}>
                <Table>
                    <TableBody>
                        <TableRow style={{height: 25}}>
                            <TableCell>Inicial</TableCell>
                            <TableCell>$10.000,00</TableCell>
                        </TableRow>
                        <TableRow style={{height: 25}}>
                            <TableCell>Final</TableCell>
                            <TableCell>
                                { walletSum }
                            </TableCell>
                        </TableRow>
                        <TableRow style={{height: 25}}>
                            <TableCell>Variação</TableCell>
                            <TableCell>
                                { walletVariation }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>

            <Typography variant="subheading" gutterBottom>
                Eventos históricos simulados:
            </Typography>
            <Grid alignItems="left" item xs={12}>
                {
                    props.world.eventsOccurred.map(event => <Typography variant="body1" align="left">
                        {ALL_EVENTS[event].name}
                    </Typography>
                )}
            </Grid>

            <Grid item xs={12} style={{ marginTop: 5, textAlign: 'center' }}>
                <Button
                    type="button"
                    color="primary"
                    variant="raised"
                    onClick={props.close}
                >
                    Fechar
                </Button>
            </Grid>
        </Paper>
    </Grid>
};

export default EndSimulationSummary;
