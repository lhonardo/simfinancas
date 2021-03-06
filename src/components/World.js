import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import { DEFINITIONS, infoIcon, infoCheckedIcon, requiredInfoModalsToStart } from '../constants';
import {
    changeWorld,
    openEndMonthInfo,
    changeWallet,
    openInfoModal,
    openEndSimulationSummary,
    openMustOpenAllInfos,
    logout,
} from '../store/actions';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.zoomline';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fint';

import {
    formatPercentage,
    formatCurrency,
    eventWillHappenWithProbability,
    generateRegularMonthMarket,
} from '../utils';
import globe from '../assets/img/globe.gif';
import monthIcon from '../assets/img/month.png';

import { ALL_EVENTS } from '../data/events';
import _ from 'lodash';

// Pass fusioncharts as a dependency of charts
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class World extends React.Component {
    state = {
        editing: false,
        showLoading: false,
    };

    handleKeyDown = (event) => {
        switch( event.keyCode ) {
            case 32:
                this.nextMonth();
                break;
            default: 
                break;
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    nextMonth = () => {
        const {
            world,
            changeWorld,
            changeWallet,
            openEndMonthInfo,
            openEndSimulationSummary,
            openMustOpenAllInfos,
            wallet,
        } = this.props;

        if(_.isEqual(_.uniq(requiredInfoModalsToStart).sort(), _.uniq(this.props.viewedInfos).sort())) {
            if (world.year <= 2) {
                this.setState({ showLoading: true });
                const newWorld = { ...world };
                const newWallet = { ...wallet };
    
                let simulatedValues = {};
                const availableEvents = Object.keys(ALL_EVENTS).filter(
                    (value) => !world.eventsOccurred.includes(value)
                );
    
                // Currently running event
                if (
                    world.activeEvent &&
                    newWorld.activeEventMonth <
                        ALL_EVENTS[world.activeEvent].months.length
                ) {
                    simulatedValues = {
                        ...DEFINITIONS.endMonthInfo[
                            ALL_EVENTS[world.activeEvent].type
                        ],
                        ...ALL_EVENTS[world.activeEvent].months[
                            world.activeEventMonth
                        ],
                    };
    
                    // Will show end event summary
                    if ((
                        newWorld.activeEventMonth ==
                        ALL_EVENTS[world.activeEvent].months.length - 1) ||
                        world.year == 2 && world.month == 11
                    ) {
                        newWorld.activeEventMonth = 99;
                    } else {
                        newWorld.activeEventMonth += 1;
                    }
                } else {
                    // New event month
                    if (
                        availableEvents.length &&
                        !(world.year === 2 && world.month >= 10) &&
                        eventWillHappenWithProbability()
                    ) {
                        const event =
                            availableEvents[
                                Math.floor(Math.random() * availableEvents.length)
                            ];
                        newWorld.activeEvent = event;
                        newWorld.activeEventMonth = 1;
                        newWorld.eventsOccurred.push(event);
                        simulatedValues = {
                            ...DEFINITIONS.endMonthInfo[ALL_EVENTS[event].type],
                            ...ALL_EVENTS[event].months[0],
                        };
                    } else {
                        // Regular month
                        newWorld.activeEvent = null;
                        newWorld.activeEventMonth = 1;
    
                        simulatedValues = {
                            ...DEFINITIONS.endMonthInfo.regular,
                            ...generateRegularMonthMarket(),
                        };
                    }
                }
    
                if (newWorld.month == 12) {
                    newWorld.year += 1;
                    newWorld.month = 0;
                }
    
                newWorld.month += 1;
    
                // Adjust world values
                ['stockMarketPoints', 'rareMaterial'].forEach((key) => {
                    newWorld[key] = parseFloat(
                        (
                            newWorld[key] +
                            newWorld[key] * simulatedValues[key]
                        ).toFixed(0)
                    );
    
                    newWorld.simulationResults[key].push(simulatedValues[key]);
                });
                ['inflation', 'interestRate'].forEach((key) => {
                    newWorld[key] = simulatedValues[key];
    
                    newWorld.simulationResults[key].push(simulatedValues[key]);
                });
    
                // Adjust wallet values
                ['fixedIncome', 'stockMarket', 'rareMaterial'].forEach((key) => {
                    const affectedBy = DEFINITIONS.wallet[key].affectedBy;
    
                    if (wallet[key] > 0) {
                        newWallet[key] = parseFloat(
                            (
                                wallet[key] +
                                wallet[key] * simulatedValues[affectedBy]
                            ).toFixed(0)
                        );
                    }
                });
    
                setTimeout(() => {
                    this.setState({ showLoading: false });
                    changeWallet(newWallet);
                    changeWorld(newWorld);
                    if (newWorld.year > 2) {
                        openEndSimulationSummary();
                    }
                    openEndMonthInfo(simulatedValues);
                }, 500);
            } else {
                openEndSimulationSummary();
            }
        } else {
            openMustOpenAllInfos();
        }
    };

    render() {
        const { world } = this.props;
        const zoomLineConfig = {
            type: 'ZoomLine',
            width: '100%',
            height: '400',
            dataFormat: 'JSON',
            dataSource: {
                chart: {
                    caption: 'Varia????o do mercado',
                    subcaption: '??timo m??s',
                    pixelsPerPoint: '0',
                    pixelsPerLabel: '30',
                    lineThickness: '2',
                    compactdatamode: '1',
                    dataseparator: '|',
                    labelHeight: '30',
                    scrollheight: '10',
                    flatScrollBars: '1',
                    scrollShowButtons: '0',
                    scrollColor: '#cccccc',
                    theme: 'fint',
                    yAxisValueFontSize: 0,
                    showShadow: true,
                },
                categories: [
                    {
                        category:
                            'Jan 01|Fev 01|Mar 01|Abr 01|Mai 01|Jun 01|Jul 01|Ago 01|Set 01|Out 01|Nov 01|Dec 01|Jan 02|Fev 02|Mar 02|Abr 02|Mai 02|Jun 02|Jul 02|Ago 02|Set 02|Out 02|Nov 02|Dec 02|',
                    },
                ],
                dataset: Object.keys(world.simulationResults).map((key) => {
                    return {
                        seriesname: DEFINITIONS.world[key].name,
                        data: world.simulationResults[key].join('|'),
                    };
                }),
            },
        };

        return (
            <Grid container>
                <Grid container alignItems="baseline" justify="center" xs={8}>
                    <Typography variant="title" gutterBottom align="center">
                        Seu Mundo
                    </Typography>
                    <Grid justify="space-evenly" container>
                        <img
                            width="40"
                            height="40"
                            style={{ marginRight: 5, float: 'left' }}
                            alt="M??s"
                            src={monthIcon}
                        />
                        { this.props.isSimulationCompleted 
                            ? <p>
                                Simula????o conclu??da!
                            </p>
                            : <div>
                                <Typography
                                    variant="headline"
                                    align="center"
                                    style={{ lineHeight: '45px' }}
                                >
                                    M??s: {world.month} / 12
                                </Typography>
                                <Typography
                                    variant="headline"
                                    align="center"
                                    style={{ lineHeight: '45px' }}
                                >
                                    Ano: {world.year} / 2
                                </Typography>
                            </div>
                        }
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <img src={globe} alt="globe" width="100%" height="auto" />
                </Grid>
                {/* <Grid item xs={12}>
                    <ReactFC {...zoomLineConfig} />
                </Grid> */}
                <Grid item xs={12}>
                    <Table aria-label="spanning table">
                        <TableBody>
                            {[
                                'inflation',
                                'interestRate',
                                'rareMaterial',
                                'stockMarketPoints',
                            ].map((key) => (
                                <TableRow key={key}>
                                    <TableCell style={{ padding: 1 }}>
                                        <img
                                            width="30"
                                            alt={DEFINITIONS.world[key].name}
                                            src={DEFINITIONS.world[key].icon}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {DEFINITIONS.world[key].name}
                                    </TableCell>
                                    <TableCell numeric>
                                        {['inflation', 'interestRate'].includes(
                                            key
                                        )
                                            ? formatPercentage(world[key])
                                            : key == 'rareMaterial'
                                            ? formatCurrency(world[key])
                                            : world[key].toLocaleString() +
                                              ' pt'}
                                    </TableCell>
                                    <TableCell style={{ padding: 1 }}>
                                        <a
                                            onClick={() =>
                                                this.props.openInfoModal(
                                                    'world',
                                                    key
                                                )
                                            }
                                        >
                                            <img
                                                atl="Info"
                                                src={this.props.viewedInfos.includes(key) ? infoCheckedIcon : infoIcon}
                                                width="20"
                                                style={{ marginLeft: 5 }}
                                            />
                                        </a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid container justify="center" style={{ marginTop: 10 }}>
                    <Button
                        type="button"
                        color="primary"
                        variant="extendedFab"
                        size="large"
                        onClick={this.nextMonth}
                    >
                        Avan??ar M??s <SkipNextIcon />
                    </Button>
                    <br/>
                    {
                        this.props.isSimulationCompleted &&
                        <Button
                            type="button"
                            color="primary"
                            variant="extendedFab"
                            size="large"
                            onClick={this.props.startLogout}
                            style={{ marginTop: 20 }}
                        >
                            Come??ar de novo! <AutorenewIcon />
                        </Button>
                    }
                </Grid>
                <Modal open={this.state.showLoading}>
                    <div className="grid-aligned" style={{ height: '100%' }}>
                        <Paper className="grid-aligned" style={{ padding: 20 }}>
                            <Typography variant="display1">
                                Simulando m??s..
                            </Typography>
                            <br />
                            <CircularProgress size={100} />
                        </Paper>
                    </div>
                </Modal>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    world: state.world,
    wallet: state.wallet,
    isSimulationCompleted: state.isSimulationCompleted,
    viewedInfos: state.viewedInfos,
});

const mapDispatchToProps = (dispatch) => ({
    changeWorld: (world) => dispatch(changeWorld(world)),
    changeWallet: (wallet) => dispatch(changeWallet(wallet)),
    openEndMonthInfo: (content) => dispatch(openEndMonthInfo(content)),
    openInfoModal: (key, name) => dispatch(openInfoModal(key, name)),
    openEndSimulationSummary: () => dispatch(openEndSimulationSummary()),
    openMustOpenAllInfos: () => dispatch(openMustOpenAllInfos()),
    startLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(World);
