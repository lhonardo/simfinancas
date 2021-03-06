import React from 'react';
import AppBar from '@material-ui/core/AppBar';

import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { logout, openGettingStarted } from '../store/actions';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    state = { value: 1, open: false, componentsmenuopen: false };

    handleChange = (event, index, value) => this.setState({ value });
    onLeftIconButtonClick = (event, index, value) => {
        this.setState({ open: !this.state.open });
    };

    toggleDrawer = (open) => () => {
        this.setState({
            open: open,
        });
    };

    handleClick = () => {
        this.setState({ componentsmenuopen: !this.state.componentsmenuopen });
    };

    handleClose = (event) => {
        if (
            this.target1.contains(event.target) ||
            this.target2.contains(event.target)
        ) {
            return;
        }

        this.setState({ componentsmenuopen: false });
    };

    render() {
        const { open } = this.state.componentsmenuopen;
        const publicNavs = [
            {
                url: '/home',
                name: 'Home',
                icon: <HomeIcon />,
            },
            {
                url: '#',
                name: 'Antes de come??ar',
                icon: <PlayArrowIcon />,
                onClick: () => this.props.openGettingStarted(),
            },
            {
                url: '/ranking',
                name: 'Ranking',
                icon: <ListIcon />,
            },
            {
                url: '/about',
                name: 'Sobre',
                icon: <PersonIcon />,
            },
            {
                url: '#',
                name: 'Sair',
                icon: <AutorenewIcon />,
                onClick: () => this.props.startLogout(),
            },
        ];
        return (
            <div>
                <Drawer
                    open={this.state.open}
                    onClose={this.toggleDrawer(false)}
                >
                    <div tabIndex={0} role="button">
                        <div className="sidelistwrapper">
                            {this.props.userName && (
                                <React.Fragment>
                                    {publicNavs.map((navItem) => {
                                        return (
                                            <NavLink
                                                to={navItem.url}
                                                className="NavLinkItem"
                                                key={navItem.url}
                                                activeClassName="NavLinkItem-selected"
                                                onClick={'onClick' in navItem ? navItem.onClick : e=>e}
                                            >
                                                {' '}
                                                <List component="nav">
                                                    {' '}
                                                    <ListItem button>
                                                        <ListItemIcon className="innernavitem">
                                                            {navItem.icon}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={navItem.name}
                                                            className="innernavitem"
                                                            color="black"
                                                        />
                                                    </ListItem>
                                                </List>{' '}
                                            </NavLink>
                                        );
                                    })}
                                </React.Fragment>
                            )}
                            {/* end of testing */}
                        </div>
                    </div>
                </Drawer>
                <div className="appbarwrapper">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                className="iconbuttonsyle"
                                color="inherit"
                                aria-label="Menu"
                                onClick={this.onLeftIconButtonClick}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="title"
                                color="inherit"
                                className="headertypoclass"
                            >
                                SimFinan??as
                            </Typography>

                            <Button
                              color="inherit"
                              align="right"
                              onClick={this.props.startLogout}
                            >
                              {}
                              Sair
                            </Button>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userName: state.auth.userName,
});

const mapDispatchToProps = (dispatch, props) => ({
    startLogout: () => dispatch(logout()),
    openGettingStarted: () => dispatch(openGettingStarted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
