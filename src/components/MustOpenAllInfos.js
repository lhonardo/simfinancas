import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { infoIcon, infoCheckedIcon } from '../constants';

const MustOpenAllInfos = (props) => (
    <Grid
        container
        justify="center"
        alignContent="center"
        style={{ height: '100%', padding: '1%'}}
    >
        <Paper className="grid-aligned" style={{ padding: 15 }}>
            <Typography variant="headline">
                Atenção!
            </Typography>

            <br />

            <Typography variant="subheading">
                Antes de começar a simulação você deve, pelo menos uma vez, abrir o conteúdo sobre cada um dos conceitos apresentados.
            </Typography>

            <br />

            <Typography variant="subheading" paragraph align="left">
                Clique nos ícones
                <img atl='Info' src={infoIcon} width="20" style={{margin: '0 5px'}}/>
                próximo aos conceitos apresentados para abrir o conteúdo e obter mais detalhes de como funcionará a simulação.
            </Typography>

            <Typography variant="subheading" paragraph align="left">
                Após abrir o conceito o ícone ficará com um "check"
                <img atl='Info' src={infoCheckedIcon} width="20" style={{margin: '0 5px'}}/>
                informando que você já o abriu.
            </Typography>

            <br />

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

export default MustOpenAllInfos;
