import React, { useEffect } from "react";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '60ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

const FriendList = ({friends}) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
          {friends.map((user) => {
                  return (
                    <>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={user.fullName} src={user.imageUrl} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.fullName}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                {user.email}
                                </Typography>
                                {""}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </>
                  )
              })}
      </List>
    )
}

export default FriendList;
