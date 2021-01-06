import React from 'react';
import { Button } from '@material-ui/core';

export default function ReminderButton ({expense, handleReminder}) {
    // console.log("EXPENSE", expense);
    return (<>
        {expense.reminder ?
            <Button variant="outlined" color="white">Reminded</Button>
            :
            <Button variant="contained" color="secondary" value={[expense.receiveUser.id, expense.expenseId]} onClick={handleReminder}>Remind</Button>
        }
    </>)
}
