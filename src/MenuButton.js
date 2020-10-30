import React from 'react';
import { useDispatch } from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

import {Button, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu'
import { logout } from './store/actions/auth';

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
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
      dispatch(logout());

  }

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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );

}
export default MenuButton;
