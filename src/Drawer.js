import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';

import FriendBrowser from './FriendBrowser';
import ExpenseBrowser from './ExpenseBrowser';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SideDrawer =  () => {
    const classes = useStyles();
    const history = useHistory();

    const handleExpenseClick = () => {
        history.push('/expenses')
    }
    const handleFriendClick = () => {
        history.push('/friends')
    }
    return (

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
                <ListItem button key="Expenses" onClick={handleExpenseClick}>
                  <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                  <ListItemText primary="Expenses" />
                </ListItem>
                <ListItem button key="Friends" onClick={handleFriendClick}>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Friends" />
                </ListItem>
                <ListItem button key="Groups">
                  <ListItemIcon><PeopleIcon /></ListItemIcon>
                  <ListItemText primary="Groups" />
                </ListItem>
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
    );
  }

  export default SideDrawer;
