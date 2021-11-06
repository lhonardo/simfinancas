import React from 'React';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Image from 'material-ui-image';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { DEFINITIONS, infoIcon } from '../constants';
import { CurrencyFormatInput, formatCurrency } from '../utils';

export class WalletForm extends React.Component {
    state = {
        walletTempValues: this.props.wallet,
        messageopen: false,
        messageInfo: {},
        gender: 'male',
    };

    getAvailableValue = () => {
        const { getSumWallet } = this.props;

        return (
            getSumWallet(this.props.wallet) -
            getSumWallet(this.state.walletTempValues)
        );
    };

    giveSuccessMessage = (message) => {
        let newmsg = {
            message,
            key: new Date().getTime(),
        };

        this.setState({
            messageopen: true,
            messageInfo: newmsg,
        });
    };

    onSubmit = () => {
        this.props.changeWallet(this.state.walletTempValues);
        this.giveSuccessMessage('Carteira Alterada');
        this.props.closeModal();
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ messageopen: false });
    };

    handleInputChange = (value, field) => {
        this.setState({
            walletTempValues: {
                ...this.state.walletTempValues,
                [field]: String(value).length
                    ? parseFloat(value)
                    : 0,
            },
        });
    };

    render() {
        const { message, key } = this.state.messageInfo;
        const availableValue = this.getAvailableValue();

        return (
            <div className='grid-aligned' style={{ height: '100%' }}>
                <Snackbar
                    key={key}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.messageopen}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
                <Grid
                    container
                    justify="center"
                    alignContent="center"
                    style={{ height: '100%', padding: '5%' }}
                >
                    <Paper
                        className="contact-page-paper"
                        style={{ width: '100%', padding: 5 }}
                    >
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.props.closeModal}
                            style={{ float: 'right' }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            variant="display1"
                            gutterBottom
                            style={{ padding: 15 }}
                        >
                            Carteira
                        </Typography>
                        <Typography 
                            variant="title" 
                            gutterBottom 
                            align="center" 
                            color={availableValue ? 'error' : 'textPrimary'}
                            style={{minHeight: 80}}
                        >
                            Disponível para ser aplicado:{' '}
                            {formatCurrency(availableValue)}
                        </Typography>
                        <Grid container>
                                    {Object.keys(DEFINITIONS.wallet).map((key) => {
                                        return (
                                            <Grid container xs={12} key={key} style={{marginBottom: 10}}>
                                                <Grid xs={2}>
                                                    <img
                                                        src={DEFINITIONS.wallet[key].icon}
                                                        width='40'
                                                    />

                                                </Grid>
                                                <Grid xs={4}>
                                                    <TextField
                                                        id={key}
                                                        label={DEFINITIONS.wallet[key].name}
                                                        value={
                                                            this.state.walletTempValues[key]
                                                        }
                                                        onChange={(e) =>
                                                            this.handleInputChange(e.target.value, key)
                                                        }
                                                        required
                                                        InputProps={{
                                                            inputComponent: CurrencyFormatInput,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid xs={6}>
                                                    <Button
                                                        type="button"
                                                        color="primary"
                                                        variant="fab"
                                                        disabled={this.state.walletTempValues[key] <= 0}
                                                        style={{marginRight: 10}}
                                                        onClick={() =>
                                                            this.handleInputChange(
                                                                this.state.walletTempValues[key] < 500 
                                                                    ? 0 
                                                                    : this.state.walletTempValues[key] - 500, 
                                                            key)
                                                        }
                                                    >
                                                        - $500
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        color="primary"
                                                        variant="fab"
                                                        disabled={availableValue <= 0}
                                                        onClick={(e) => 
                                                            this.handleInputChange(
                                                                availableValue < 500
                                                                ? this.state.walletTempValues[key] + availableValue
                                                                : this.state.walletTempValues[key] + 500, 
                                                            key)
                                                        }
                                                    >
                                                        + $500
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        )
                                    })}
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={12}
                            md={12}
                            style={{ marginTop: 10 }}
                        >
                            <Tooltip 
                                title={<h2>
                                    Para salvar, valor disponível para ser aplicado deve ser 0
                                </h2>}
                                open={availableValue != 0}
                            >
                                <Button
                                    type="button"
                                    color="primary"
                                    variant="raised"
                                    onClick={this.onSubmit}
                                    disabled={availableValue != 0}
                                    label="Para salvar, valor disponível para ser aplicado deve ser 0"
                                >
                                    Salvar carteira
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    }
}

export default WalletForm;
