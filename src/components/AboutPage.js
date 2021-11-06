import React from 'React';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export class ContactPage extends React.Component{
    render(){
        return (
            <div className="contact-page-wrapper">
                <Paper className="loginPaper">
                    <Typography
                        variant="display1"
                        gutterBottom
                        className="loginpageheader"
                    >
                        Sobre
                    </Typography>
                    <div style={{padding: 10}}>
                        <Typography variant="subheading" component="h3" paragraph align="left">
                            Está simulação foi desenvolvida como parte do trabalho de conclusão de curso de Sistemas de Informação na Unisinos.
                        </Typography>
                        <Typography variant="subheading" component="h3" paragraph align="left">
                            Qualquer dúvida ou sugestão entre em contato pelo meu e-mail!
                        </Typography>
                        <Typography variant="title" component="h2" paragraph align="center">
                            leonardosaints@gmail.com
                        </Typography>
                        <Typography variant="title" component="h2" paragraph align="center">
                            Leonardo Lorbicki
                        </Typography>
                    </div>
                </Paper>
            </div>
        )
    }
}


    

export default ContactPage;
