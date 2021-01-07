import React, { useEffect, useState } from 'react';
import {Route, Redirect, NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


import {makeStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import MenuButton from './MenuButton';
import SignUpButton from './SignUpButton';
import { loadToken } from './store/actions/auth';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
      },
    navbar: {
        fontFamily: theme.fontFamily,
        background: theme.palette.primary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontFamily: "sans-serif",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: "black",
      },
}))


const NavBar = ({needLogin, loadToken}) => {
    const [token, setToken] = useState(null)
    const classes = useStyles();

    useEffect(() => {
        setToken(true);
        loadToken();
    }, []);
    if (!needLogin) {
        return (
            <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <NavLink to="/" exact={true} className="homelink" activeClassName="active">
                    <Typography variant="h6" noWrap color="secondary" className={classes.title}>
                    BreakEven
                    </Typography>
                </NavLink>
                <div className={classes.grow} />
                <MenuButton className={classes.menuButton}></MenuButton>
            </Toolbar>
            </AppBar>
        )
    }
    return (
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Typography variant="h6" className={classes.title} noWrap color="secondary">
            BreakEven
            </Typography>
            <SignUpButton />
        </Toolbar>
        </AppBar>
    )
}


const NavBarContainer = () => {
    const needLogin = useSelector((state) => !state.authReducer.token);
    const dispatch = useDispatch();
    return <NavBar needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
}


export default NavBarContainer;
