import { NOTIFY, REMOVE_NOTIFICATION, LOAD_NOTIFICATIONS, LOAD_EXPENSES, REMOVE_EXPENSES, LIST_EXPENSES } from '../actions/expenses';

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
                let note = newState.notifications[i];
                if (note.userId === Number(action.payArray[2]) && note.expenseId === Number(action.payArray[1])) {
                    newState.notifications.splice(i, 1);
                    return newState;
                }
            }
            return newState;
        }
        case NOTIFY: {
            const newState = { ...state};
            // console.log("HITTING NOTIFY")
            for (let i = 0; i < newState.listExpenses.length; i++) {
                let expense = newState.listExpenses[i];
                // console.log("HITTING THIS?", expense)
                if ((expense.expenseId === action.expenseId) && (expense.receiveUser.id === action.userId)) {
                    expense.reminder = true;
                    return newState;
                }
            }
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
