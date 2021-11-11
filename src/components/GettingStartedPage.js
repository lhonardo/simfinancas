import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { infoIcon } from '../constants';

const GettingStarted = (props) => (
    <Grid
        container
        justify="center"
        alignContent="center"
        style={{ height: '100%', padding: '2%' }}
    >
        <Paper style={{ padding: 5, height: '90%', transform: 'scale(0.9)' }} className="grid-aligned">
            <Typography variant="title" gutterBottom style={{ padding: 10 }}>
                Antes de começar
            </Typography>
            <Typography variant="subheading" paragraph align="left">
                Esta ferramenta foi desenvolvida exclusivamente para estudo
                de alguns conceitos do mercado financeiro, qualquer evento, valor, possíveis ganhos ou perdas
                são ficticios.
            </Typography>
            <Typography variant="subheading" paragraph align="left">
                <b>Importante:</b> antes de avançar o mês aperte nos ícones
                <img atl='Info' src={infoIcon} width="20" style={{margin: '0 5px'}}/>
                próximos aos conceitos apresentados para abrir a explicação detalhada e obter mais detalhes de como funcionará a simulação. 
            </Typography>
            <Typography variant="subheading" paragraph align="left">
                Você pode fechar esse site a qualquer momento e continuar depois, seu progresso ficará armazenado.
            </Typography>
            <Typography variant="subheading" paragraph align="left">
                Espero que a experiência seja válida e educativa.
            </Typography>
            <Typography variant="subheading" paragraph align="left">
                Boa simulação :)
            </Typography>

            <Grid item xs={12} style={{ marginTop: 10, textAlign: 'center' }}>
                <Button
                    type="button"
                    color="primary"
                    variant="raised"
                    onClick={props.close}
                >
                    Começar!
                </Button>
            </Grid>
        </Paper>
    </Grid>
);

export default GettingStarted;
