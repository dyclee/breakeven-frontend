import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { receivedRequests, deleteRequest } from './store/actions/friends';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 900, //752
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

const NewRequestList = ({friendRequests, userId}) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const dispatch = useDispatch();

    const handleAddFriend = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const ele = e.target;
      console.log(ele);

    }

    const handleRemoveRequest = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const ele = e.target;
      console.log(ele.attributes.value)
      if (ele.value) {
        dispatch(deleteRequest({fromUserId: ele.value, userId}))
        return;
      }
      const iconButtonValue = ele.parentNode.attributes.frienderid.value
      console.log("ICON VALUE: ", iconButtonValue)
      dispatch(deleteRequest({fromUserId: iconButtonValue, userId}))
    }
    if (!friendRequests) {
      return null
    }
    // spacing={2}, xs={12}, md={6}
    return (
      <div className={classes.root}>

        <Grid container spacing={4}>
          <Grid item xs={16} md={8}>
            <Typography variant="h6" className={classes.title}>
              Friend Requests
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {friendRequests.map((obj) => {
                  // console.log("REQUEST: ", request)
                  return (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt={obj.user.fullname} src={obj.user.imageUrl}>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${obj.user.fullName} would like to be friends`}
                      secondary={`${obj.request.createdAt}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="confirm" onClick={handleAddFriend} value={`${obj.request.friender}`}>
                        <DoneIcon frienderid={`${obj.request.friender}`} />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={handleRemoveRequest} value={`${obj.request.friender}`}>
                        <DeleteIcon frienderid={`${obj.request.friender}`} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  )
                }
                  )}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }


  const NewRequestListContainer = ({friendRequests}) => {
    const userId = useSelector(state => state.authReducer.user.id)

    return (
        <NewRequestList
            friendRequests={friendRequests}
            userId={userId}
        />
    )
}

export default NewRequestListContainer;
