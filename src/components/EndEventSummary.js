import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ALL_EVENTS } from '../data/events';
import historic from "../assets/img/historic.png";
import Image from "material-ui-image";

const EndEventSummary = (props) => (
    <Grid
        container
        justify="center"
        alignContent="center"
        style={{ height: '100%' }}
    >
        <Paper style={{ padding: 10 }} className="grid-aligned">
            <Grid item xs={12}>
                <Image
                    src={historic}
                    color="inherit"
                    style={{ width: 60 }}
                    imageStyle={{ width: "60", height: "60" }}
                />
            </Grid>
            <br/>
            <Typography variant="title" gutterBottom style={{ padding: 5 }}>
                Fim do evento simulado!
            </Typography>

            <Typography variant="subheading">
                Você acabou de passar por uma simulação de um evento histórico do mundo real nessa simulação.
            </Typography>

            <br/>

            <Typography variant="title">
                {ALL_EVENTS[props.event].name} de {ALL_EVENTS[props.event].year}
            </Typography>

            <br/>

            <Typography variant="subheading">
                {ALL_EVENTS[props.event].description}
            </Typography>

            <Grid item xs={12} style={{ marginTop: 10, textAlign: 'center' }}>
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
);

export default EndEventSummary;
