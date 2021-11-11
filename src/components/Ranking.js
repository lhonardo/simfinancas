import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { formatPercentage } from '../utils';

const Ranking = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([])

    const getResults = () => {
        const url = 'https://simfinanceiro-default-rtdb.firebaseio.com/results.json';
    
        return fetch(url, {
            method: 'GET'
        })
    };

    React.useEffect(()=>{
        getResults().then((results)=>{
            results.json().then(
                (parsed) => {
                    const resultsParsed = Object.keys(parsed).map((key) => ({
                        name: parsed[key].results.name,
                        walletSum: parsed[key].results.walletSum,
                        walletVariation: parsed[key].results.walletVariation
                    }))

                    setResults(_.sortBy(resultsParsed, 
                        (result) => parseFloat(
                            result.walletSum.replace('$','').replace(',',''))).reverse().slice(0, 10))
                }
            )
            setIsLoading(false)
        })
    }, [])

    return <Paper style={{width: '90%', margin: 'auto'}}>
        <Typography variant="headline" component="h3" paragraph align="center" color="textSecondary">
            Ranking - Top 10
        </Typography>
        {isLoading
            ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> 
            : <Table padding="dense">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" numeric variant="head">Pos:</TableCell>
                        <TableCell padding="none" variant="head">Nome:</TableCell>
                        <TableCell padding="none" variant="head">Valor final:</TableCell>
                        <TableCell padding="none" variant="head">Variação:</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((result, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell padding="checkbox" numeric>{index + 1}</TableCell>
                                <TableCell padding="none">{result.name}</TableCell>
                                <TableCell padding="none">
                                    {result.walletSum}
                                </TableCell>
                                <TableCell padding="none">
                                    {formatPercentage(result.walletVariation)}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            }
    </Paper>
}

export default Ranking;