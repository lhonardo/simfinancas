import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

import Ranking from './Ranking';

export const LoginPage = (props) => {
    const [userName, setUserName] = useState(props.userName || '');
    const [hasError, setHasError] = useState(false);

    const OnClickLogin = (e) => {
        e.preventDefault();
        if (userName.length) {
            props.startLogin(userName);
            props.history.push('/home');
        } else {
            setHasError(true);
        }
    };

    return (
        <div className="login-page-class">
            <Paper className="loginPaper">
                <div className="loginheaderpart">
                    <Typography
                        variant="display1"
                        gutterBottom
                        className="loginpageheader"
                    >
                        SimFinanças
                    </Typography>
                </div>
                <div style={{padding: 10}}>
                    <Typography variant="subheading" component="h3" paragraph align="left">
                        Este estudo é uma simulação de uma representação simplificada do 
                        mercado financeiro.
                    </Typography>
                    <Typography variant="subheading" component="h3" paragraph align="left">
                        Tem como objetivo ensinar de forma prática sobre os
                        principais fatores que influênciam o mercado, através de eventos simulados
                        criados baseando-se em acontecimentos reais do passado. 
                    </Typography>
                    <Typography variant="subheading" component="h3" paragraph align="left">
                        Você vai ter a oportunidade de montar a sua carteira e simular 24 meses de variações do mercado, crises e também grandes oportunidades podem surgir, fique atento!
                    </Typography>
                    <Typography variant="headline" component="h3" paragraph align="left">
                        Para começar insira seu nome:
                    </Typography>
                    <form onSubmit={OnClickLogin}>
                        <div className="loginformgroup">
                            <AccountCircle />
                            <TextField
                                id="input-username"
                                label="Nome"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                error={hasError}
                                helperText={
                                    hasError && <span>Campo obrigatório</span>
                                }
                            />
                        </div>
                    </form>
                </div>

                <Button variant="raised" color="primary" onClick={OnClickLogin}>
                    <Typography
                        variant="button"
                        gutterBottom
                        className="logintypography"
                    >
                        Começar
                    </Typography>
                </Button>
            </Paper>

            <Ranking />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: (userName) => dispatch(login(userName)),
});

const mapStateToProps = (state) => ({
    userName: state.auth.userName,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
