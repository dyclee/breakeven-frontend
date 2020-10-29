import React, { useState, useContext } from 'react';
import Context from './Context';

import {makeStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'

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
    return (
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Home
            </Typography>
            <Button color="inherit">Login</Button>
        </Toolbar>
        </AppBar>
    )
}


export default NavBar;
