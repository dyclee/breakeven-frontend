import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import { useHistory, BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';


import {Button, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu'
import LogoutButton from './LogoutButton';


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

const MenuButton = () => {
    const classes = useStyles();

    const history = useHistory();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleRedirect = () => {
      history.push('/');
      handleClose();
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button> */}
        <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon />
        </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <MenuItem onClick={handleRedirect}>Profile</MenuItem>
        <LogoutButton />
      </Menu>
    </div>
  );

}
export default MenuButton;
