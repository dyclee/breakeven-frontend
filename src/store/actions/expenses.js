import { baseUrl } from '../../config';

export const LOAD_EXPENSES = 'expenses/LOAD_EXPENSES';
export const REMOVE_EXPENSES = 'expenses/REMOVE_EXPENSES';

export const loadExpenses = expenses => ({ type: LOAD_EXPENSES, expenses });
export const removeExpenses = () => ({ type: REMOVE_EXPENSES });

export const createExpense = ({
    members,
    totalAmount,
    userId,
    header,
    requirements,
    categoryId
}) => async dispatch => {
    const res = await fetch(`${baseUrl}/expenses`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members, totalAmount, userId, header, requirements, categoryId }),
    });

    if (res.ok) {
        const expense = await res.json();
        // console.log(expense);
        return;
    }
    const errorRes = await res.json();
    console.log(errorRes);
}

export const getExpenses = (userId) => async dispatch => {
    const res = await fetch(`${baseUrl}/expenses`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
    });

    if (res.ok) {
        const expenses = await res.json();
        dispatch(loadExpenses(expenses))
        // const { owedExpenses, createdExpenses } = expenses;
        // const owedExpenseObjs = owedExpenses.map((expense) => {
        //     let obj = {};
        //     obj.expenseId = expense.Expense
        // })
        return
    }
    const errorRes = await res.json();
    return errorRes;
}
