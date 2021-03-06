import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { inviteFriend } from './store/actions/friends';
import { Dialog, DialogTitle, DialogContent, Button, TextField, DialogActions, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';


const AddFriendForm = ({handleFriendClick, openFriendForm, setOpenFriendForm}) => {
    const [email, setEmail] = useState("");
    // const token = useSelector(state => state.authReducer.token);
    const userId = window.localStorage.getItem("userId");

    const dispatch = useDispatch();

    const handleFriendFormClose = () => {
        setEmail("");
        setOpenFriendForm(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = dispatch(inviteFriend({userId, email}));
        // console.log("RES", res);
        // alert("Friend request sent");
        setEmail("");
        handleFriendFormClose();
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    return (<>
        <Dialog
            open={openFriendForm}
            onClose={handleFriendFormClose}
            PaperProps={{
                style: { backgroundColor: "#000", color: "#f5d45e"}
            }}
        >
            <DialogTitle id="friendForm-dialog-title">Add a friend</DialogTitle>
            <DialogContent>
                <TextField
                    color="secondary"
                    autoFocus
                    value={email}
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    onChange={updateEmail}
                    required
                />
                <DialogActions>
                    <Button onClick={handleFriendFormClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Send
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    </>)
}

export default AddFriendForm;
