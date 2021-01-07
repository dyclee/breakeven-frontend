import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import CashoutForm from './CashoutForm';
import ExpenseForm from './ExpenseForm';
import AddFriendForm from './AddFriendForm';
import { logout } from './store/actions/auth';


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

const SideDrawer = ({needLogin}) => {
    const classes = useStyles();
    const history = useHistory();
    const [openExpenseForm, setOpenExpenseForm] = useState(false);
    const [openFriendForm, setOpenFriendForm] = useState(false);
    const [openCashoutForm, setOpenCashoutForm] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
          dispatch(logout());
    }

    const handleNotifications = () => {
      history.push('/notifications');
    }

    const handleExpenseClick = () => {
        setOpenExpenseForm(true);
    }
    const handleFriendClick = () => {
        setOpenFriendForm(true);
    }
    const handleCashoutClick = () => {
        setOpenCashoutForm(true);
    }
    const requests = useSelector(state => state.friendReducer.friendRequests);
    const notifs = useSelector(state => state.expenseReducer.notifications);
    if (needLogin || !requests || !notifs) return null;

    return (

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
            <ExpenseForm
              handleExpenseClick={handleExpenseClick}
              openExpenseForm={openExpenseForm}
              setOpenExpenseForm={setOpenExpenseForm} />
            <AddFriendForm
              handleFriendClick={handleFriendClick}
              openFriendForm={openFriendForm}
              setOpenFriendForm={setOpenFriendForm}
              />
            <CashoutForm
              handleCashoutClick={handleCashoutClick}
              openCashoutForm={openCashoutForm}
              setOpenCashoutForm={setOpenCashoutForm}
              />
            <div className={classes.drawerContainer}>
              <List>
                  <ListItem button key="Expenses" onClick={handleExpenseClick}>
                    <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                    <ListItemText primary="Add Expense" />
                  </ListItem>
                  <ListItem button key="Friends" onClick={handleFriendClick}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Add Friend" />
                  </ListItem>
                  <ListItem button key="Cashout" onClick={handleCashoutClick}>
                    <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
                    <ListItemText primary="Cash Out" />
                  </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button key="Notifications" onClick={handleNotifications}>
                  <ListItemIcon>
                    <Badge badgeContent={notifs.length + requests.length} color="secondary">
                      <InboxIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem button key="Logout" onClick={handleLogout}>
                  <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </div>
            <div className="developer-container">
              <div className="developer-card">
                <div className="dev-intro">Developed by:</div>
                <div className="dev-name">David Lee</div>
                <div className='dev-icons'>
                  <a target='_blank' href="https://github.com/dyclee/breakeven-frontend">
                    <i class="fa fa-github fa-3x" aria-hidden="true"></i>
                  </a>
                  <a target='_blank' href="https://www.linkedin.com/in/daveyclee/">
                    <i class="fa fa-linkedin-square fa-3x" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
        </Drawer>
    );
  }

  export default SideDrawer;
