import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Button, TextField, DialogActions, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';

import { cashout } from './store/actions/auth';
export default function CashoutForm ({handleCashoutClick, openCashoutForm, setOpenCashoutForm }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    const handleCashoutFormClose = () => {
        setOpenCashoutForm(false);
    }

    const handleSubmit = () => {
        if (user.balance <= 0) {
            alert("No funds in balance to cash out")
            handleCashoutFormClose();
            return;
        }
        dispatch(cashout(user.id));
        handleCashoutFormClose();
    }

    if (!user) return null;
    return (<>
        <Dialog
            open={openCashoutForm}
            onClose={handleCashoutFormClose}
            PaperProps={{
                style: { backgroundColor: "#000", color: "#FFFFFF"}
            }}
        >
            <DialogTitle id="cashoutForm-title">Would you like to transfer <strong className="monies">${user.balance.toFixed(2)}</strong> to your account?</DialogTitle>
            <DialogContent>
                <DialogActions>
                    <Button onClick={handleCashoutFormClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Confirm
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    </>)
}
