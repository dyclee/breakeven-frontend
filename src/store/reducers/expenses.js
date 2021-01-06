import { REMOVE_NOTIFICATION, LOAD_NOTIFICATIONS, LOAD_EXPENSES, REMOVE_EXPENSES, LIST_EXPENSES } from '../actions/expenses';

export default function expenseReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_EXPENSES: {
            return {
                ...state,
                expenses: action.expenses,
            };
        }
        case LOAD_NOTIFICATIONS: {
            return {
                ...state,
                notifications: action.notifications,
            };
        }
        case REMOVE_NOTIFICATION: {
            const newState = { ...state };
            for (let i = 0; i < newState.notifications.length; i++) {
                // console.log("HITTING THIS?", action.payArray)
                let note = newState.notifications[i];
                // console.log("NOTE", note);
                if (note.userId === Number(action.payArray[2]) && note.expenseId === Number(action.payArray[1])) {
                    // console.log("HITTING THIS?")
                    // delete newState.notifications[i]
                    newState.notifications.splice(i, 1);
                    return newState;
                }
            }
            return newState;
        }
        case LIST_EXPENSES: {
            return {
                ...state,
                listExpenses: action.listExpenses
            };
        }

        case REMOVE_EXPENSES: {
            const newState = { ...state };
            delete newState.expenses;
            delete newState.listExpenses;
            return newState;
        }
         default: return state;
    }
}
