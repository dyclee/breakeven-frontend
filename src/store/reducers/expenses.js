import { LOAD_EXPENSES, REMOVE_EXPENSES, LIST_EXPENSES } from '../actions/expenses';

export default function expenseReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_EXPENSES: {
            return {
                ...state,
                expenses: action.expenses,
            };
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
