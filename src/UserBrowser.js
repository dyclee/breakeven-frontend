import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
      margin: theme.spacing(0, 0, 2),
      textAlign: 'center',
    },
  }));

export default function UserBrowser () {
    const classes = useStyles();

    const userId = window.localStorage.getItem("userId");
    const user = useSelector(state => state.authReducer.user);
    // console.log("USER", userId, user);

    if (!user) return null;
    return (<>
        <div className="user-browser-container">
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>
            <div className="user-browser-contents">
                <div className="profile-column">
                    <img className="profile-image" alt={user.fullName} src={user.imageUrl}></img>
                    <div className="profile-userinfo">
                        <div className="profile-username">{user.fullName}</div>
                        <div className="profile-email">{user.email}</div>
                    </div>
                </div>
                <div className="profile-balance">
                    <div className="profile-balance-title">Balance</div>
                    {user.balance >= 0 ?
                        <div className="profile-balance-amount-positive">$ {user.balance.toFixed(2)}</div>
                        :
                        <div className="profile-balance-amount-negative">$ {user.balance.toFixed(2)}</div>
                    }
                </div>
                {/* <div>{user.</div> */}
            </div>
        </div>
    </>)
}
