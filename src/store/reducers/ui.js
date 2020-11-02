import { HIDE_FORM,
      SHOW_FORM,
      HIDE_EXPENSE_FORM,
      SHOW_EXPENSE_FORM } from "../actions/ui";

export default function uiReducer(state = { formVisible: false, expenseFormVisible: false }, action) {
  switch (action.type) {
    case HIDE_FORM: {
      return {
        ...state,
        formVisible: false,
      };
    }

    case SHOW_FORM: {
      return {
        ...state,
        formVisible: true,
      };
    }

    case HIDE_EXPENSE_FORM: {
      return {
        ...state,
        expenseFormVisible: false,
      };
    }
    case SHOW_EXPENSE_FORM: {
      return {
        ...state,
        expenseFormVisible: true,
      };
    }

    default:
      return state;
  }
}
