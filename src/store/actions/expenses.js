import { baseUrl } from '../../config';

export const LOAD_EXPENSES = 'expenses/LOAD_EXPENSES';
export const LIST_EXPENSES = 'expenses/LIST_EXPENSES';
export const REMOVE_EXPENSES = 'expenses/REMOVE_EXPENSES';

export const loadExpenses = expenses => ({ type: LOAD_EXPENSES, expenses });
export const listExpenses = listExpenses => ({ type: LIST_EXPENSES, listExpenses });
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
        dispatch(getExpenses(userId));
        alert(`Expense created`);
        return;
    }
    const errorRes = await res.json();
    alert(`Error: Expense was not created. Please check the input fields`)
    return errorRes;
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

        let listExpensesArr = [];
        const { owedExpenses, createdExpenses } = expenses;
        owedExpenses.forEach((owedExpense) => {
            let obj = {};
            obj.type = "toPay";
            obj.expenseId = owedExpense.expenseId;
            obj.amount = owedExpense.amount;
            obj.paidStatus = owedExpense.paidStatus;
            obj.createdAt = owedExpense.Expense.createdAt;
            obj.header = owedExpense.Expense.header;
            obj.payUser = owedExpense.Expense.createdBy;
            obj.members = owedExpense.Expense.members

            listExpensesArr.push(obj);
        })

        createdExpenses.forEach((createdExpense) => {
            let obj = {};
            obj.type = "toReceive";
            obj.expenseId = createdExpense.id;
            obj.amount = createdExpense.totalAmount;
            obj.paidStatus = createdExpense.paidStatus;
            obj.createdAt = createdExpense.createdAt;
            obj.header = createdExpense.header;
            obj.receiveUser = createdExpense.members;
            obj.members = createdExpense.members;

            listExpensesArr.push(obj);
        })
        dispatch(listExpenses(listExpensesArr))
        return;
    }
    const errorRes = await res.json();
    return errorRes;
}
