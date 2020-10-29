import React, { useState, useContext } from 'react';
import Context from './Context';
import {Route, Redirect} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import MenuButton from './MenuButton';
import SignUpButton from './SignUpButton';

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
    const { token } = useContext(Context);

    const classes = useStyles();
    if (token) {
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
    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className={classes.title} color="secondary">
            SplitWiser
            </Typography>
            <SignUpButton />
        </Toolbar>
        </AppBar>
    )
}


export default NavBar;
