import React, { useState, useContext } from 'react';
import Context from './Context';
import {Route, Redirect} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import MenuButton from './MenuButton';

const useStyles = makeStyles((theme) => ({
    navbar: {
        fontFamily: theme.fontFamily,
        background: theme.palette.primary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    }
}))

const NavBar = () => {
    // const { token } = useContext(Context);
    const classes = useStyles();
    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
            Home
            </Typography>
            <MenuButton></MenuButton>
        </Toolbar>
        </AppBar>
    )
}


export default NavBar;
