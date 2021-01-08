import React from 'react';
import { Button } from '@material-ui/core';

export default function ReminderButton ({classes, expense, handleReminder}) {
    // console.log("EXPENSE", expense);
    return (<>
        {expense.reminder ?
            <Button variant="outlined" className={classes} >Notified</Button>
            :
            <Button variant="contained" className={classes}  color="primary" value={[expense.receiveUser.id, expense.expenseId]} onClick={handleReminder}>Notify User</Button>
        }
    </>)
}
