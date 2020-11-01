export const HIDE_FORM = "auth/ui/HIDE_FORM";
export const SHOW_FORM = "auth/ui/SHOW_FORM";
export const HIDE_EXPENSE_FORM = "auth/ui/HIDE_EXPENSE_FORM";
export const SHOW_EXPENSE_FORM = "auth/ui/SHOW_EXPENSE_FORM";

export const hideForm = () => ({ type: HIDE_FORM });
export const showForm = () => ({ type: SHOW_FORM });
export const hideExpenseForm = () => ({ type: HIDE_EXPENSE_FORM });
export const showExpenseForm = () => ({ type: SHOW_EXPENSE_FORM });
