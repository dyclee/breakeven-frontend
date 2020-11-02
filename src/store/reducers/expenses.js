import { LOAD_EXPENSES } from '../actions/expenses';

export default function expenseReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_EXPENSES: {
            return {
                ...state,
                expenses: action.expenses,
            };
        }

        case REMOVE_EXPENSES: {
            const newState = { ...state };
            delete newState.expenses;
            return newState;
        }
         default: return state;
    }
}
