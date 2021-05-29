import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const Info = (props) => (
    <Grid
        container
        justify="center"
        alignContent="center"
        style={{ height: '100%', padding: '1%'}}
    >
        <Paper style={{ padding: 15 }} className="grid-aligned">
            <img alt={props.content.title} src={props.content.icon} />

            <Typography variant="title" paragraph>{props.content.name}</Typography>

            <Typography variant="subheading" paragraph style={{whiteSpace: 'pre-wrap'}}>
                {props.content.description}
            </Typography>

            <Divider />

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

export default Info;
